var Editor = {
    isDisabledFormationAction(e){
        var ret = true;

        //Disable new line
        if ( e.keyCode == 13 ) {
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
            if ( this.isDisabledFormationAction(e) === false ){
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
            pencil.className = pencil.className.replace(new RegExp(CAEditor.pencils.classNameSaved, 'g'), '')

            CAEditor.pencils.repaintPencils();
            CAEditor.pencils.updateTranslation(element);
        });
    },
    makeEditableNode(element, actualValue){
        //If given element is textNode, we need wrap it into inline div
        if ( element.nodeName == '#text' ) {
            var wrapper = document.createElement('div');
                wrapper.className = 'CA--InlineWrapper';

            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);

            element = wrapper;
        }

        element.innerHTML = actualValue;
        element.contentEditable = true;
        CAEditor.pencils.placeCaretAtEnd(element);

        if ( element.hasBindedEvents ) {
            return;
        }

        element.hasBindedEvents = true;

        this.allowFormatingByTranslateType(element);
        this.fixEmptyStrings(element);
        this.disableRichPaste(element);
        this.enableAutoSave(element);
    },
}

export default Editor;