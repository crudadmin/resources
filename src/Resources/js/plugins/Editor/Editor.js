import Helpers from './Helpers';
import Pencils from './Pencils';
import Translatable from './Translatable';

var Editor = {
    inlineClass : 'CAE__InlineWrapper',

    //Is ckeditor booted?
    ckEditorBooted : false,

    hasAllowedFormation(element){
        return CAEditor.translatable.rawTranslates.indexOf(element.getPointerSetting('originalTranslate', 'translatable')) > -1;
    },

    isDisabledFormationActionEvent(e, element){
        //If edited text is raw HTML
        if ( this.hasAllowedFormation(e.target) ) {

            //Enter single br on new line
            if ( e.keyCode == 13 ) {
                document.execCommand('insertHTML', false, '<br>');
                e.preventDefault();
            }

            return true;
        }

        var ret = true;

        //Disable new line
        if ( e.keyCode == 13 ) {
            this.turnOffEditor(element);

            return false;
        }

        if(e.ctrlKey || e.metaKey){
            switch(e.keyCode){
                case 66: //ctrl+B or ctrl+b
                case 98:
                    ret=false;
                break;
                case 73: //ctrl+I or ctrl+i
                case 105:
                    ret=false;
                break;
                case 85: //ctrl+U or ctrl+u
                case 117:
                    ret=false;
                break;
            }
        }
        return ret;
    },
    allowFormatingByTranslateType(element){
        element.addEventListener('keydown', (e) => {
            //Disable formating
            if ( this.isDisabledFormationActionEvent(e, element) === false ){
                e.preventDefault();
            }
        });
    },
    fixEmptyStrings(element){
        //Add empty string when is neccesary
        element.addEventListener('keydown', function(e){
            setTimeout(function(){
                //When first char will be typed, remove last empty chart
                if ( e.target.innerHTML.length == 7 && e.target.innerHTML.substr(-6) == '&nbsp;' ) {
                    e.target.innerHTML = e.target.innerHTML.substr(0, e.target.innerHTML.length - 6);
                    CAEditor.pencils.placeCaretAtEnd(e.target);
                }

                //Add empty char when element is empty, because browser is buggy
                if ( e.target.innerHTML === '' ) {
                    e.target.innerHTML = '&nbsp;';
                }
            }, 1);
        });
    },
    disableRichPaste(element){
        //Paste as plain text
        element.addEventListener('paste', (e) => {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
        });
    },
    enableAutoSave(element){
        element.addEventListener('keyup', function(e){
            var pencil = element._CAPencil;

            //Remove saved classname
            Helpers.removeClass(pencil, CAEditor.pencils.classNameSaved);

            CAEditor.pencils.repaintPencils();
            Translatable.updateTranslation(element);
        });
    },
    makeEditableNode(element, actualValue){
        //If given element is textNode, we need wrap it into inline div
        if ( element.nodeName == '#text' && element.getPointerSetting('originalTranslate', 'translatable') ) {
            var wrapper = document.createElement('div');
                wrapper.className = this.inlineClass;

            let origElement = element;

            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);

            element = wrapper;

            //We need reregister pencil to new element, and copy translatable properties
            element._CAPencil = origElement._CAPencil;
            element._CAPencil._CAElement = element;
            CAEditor.registerPointerProperties(element, 'translatable', origElement.getPointerSettings().translatable);
        }

        element.innerHTML = actualValue;
        element.contentEditable = true;
        CAEditor.pencils.placeCaretAtEnd(element);

        //Add active class
        Helpers.addClass(element._CAPencil, Pencils.classNameActive);

        if ( element.hasBindedEvents ) {
            return;
        }

        element.hasBindedEvents = true;

        this.allowFormatingByTranslateType(element);
        this.fixEmptyStrings(element);
        this.disableRichPaste(element);
        this.enableAutoSave(element);
        this.onUnblur(element);
        this.onClick(element);
    },
    onUnblur(element){
        element.addEventListener('blur', e => {
            this.turnOffEditor(element);
        })
    },
    onClick(element){
        element.addEventListener('click', e => {
            //If element is editable, disable redirects an all actions
            if ( e.target.isContentEditable == true ) {
                e.preventDefault();
            }
        })
    },
    turnOffAllEditors(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var element = CAEditor.matchedElements[i];

            this.turnOffEditor(element);
        }
    },
    turnOffEditor(element){
        //If is content editable
        if ( element.isContentEditable == true ) {
            element.contentEditable = false;

            Helpers.removeClass(element._CAPencil, Pencils.classNameActive);
        }
    },

    bootCkEditor(callback){
        if ( this.ckEditorBooted === true ){
            return callback();
        }

        var script = document.createElement('script');
        script.src = CAEditorConfig.ckeditor_path;
        script.type = 'text/javascript';

        document.getElementsByTagName('head')[0].appendChild(script);

        script.onload = () => {
            this.ckEditorBooted = true;

            callback();
        };
    },

    makeInlineCKEditor(element, onChange){
        this.bootCkEditor(() => {
            //If editor is already booted, we only want trigger focus event and allow editing
            if ( element.hasBootedCKEditor == true ){
                element.contentEditable = true;
                element.focus();
                return;
            }

            element.contentEditable = true;

            let editor = CKEDITOR.inline(element, {
                startupFocus: true,

                on : {
                    change(editor){
                        Pencils.refresh();

                        onChange(editor);
                    },
                }
            });

            element.hasBootedCKEditor = true;

            //Add active class
            Helpers.addClass(element._CAPencil, Pencils.classNameActive);
        });
    }
}

export default Editor;