import Editor from './Editor';
import Helpers from './Helpers';
import Pencils from './Pencils';

var Translatable = {
    allTranslates : null,
    rawTranslates : null,
    translatedTree : [],
    duplicates : [],
    maxTranslateLength : 0,

    boot(TAObject){
        //If uploadable is not allowed
        if ( CAEditor.config.translatable === false ){
            return;
        }

        //Bind given translates
        this.allTranslates = TAObject.translates.messages ? TAObject.translates.messages[''] : {};
        this.rawTranslates = TAObject.rawTranslates;

        this.getTranslationsTree();
        this.getTranslatableElements();
    },

    /*
     * Register element pointer
     */
    registerTranslatableElement(element, html){
        var isTextFromEditor = false;

        //Element has been registered already
        if (
            element.hasPointer
            || element._isInEditorElement
            || (isTextFromEditor = this.isInEditorElement(element))
        ) {
            //Prevent check of editor type next time...
            if ( isTextFromEditor ) {
                element._isInEditorElement = true;
            }

            return;
        }

        CAEditor.pushPointerElement(element, 'translatable', {
            //Bind original translate into element property
            originalTranslate : this.translatedTree[html],

            onPointerCreate : this.events.onPointerCreate.bind(this),
            onPointerClick : this.events.onPointerClick.bind(this),
        });
    },

    /*
     * We want build tree with keys as translations and values as original texts.
     * For better performance for searching elements.
     */
    getTranslationsTree(){
        //Build translates tree
        for ( var key in this.allTranslates ) {
            var translate = this.allTranslates[key][0]||key;

            //We need save duplicate translates
            if ( translate in this.translatedTree ) {
                this.duplicates.push(translate);
            }

            this.translatedTree[translate] = key;

            if ( translate.length > this.maxTranslateLength ) {
                this.maxTranslateLength = translate.length;
            }
        }
    },
    getTranslatableElements(){
        var elements = document.querySelectorAll('*');

        //Get all elements with innerhtml from translates
        for ( var i = 0; i < elements.length; i++ ){
            var html = this.nodeValue(elements[i]);

            //We want skip longer texts than 50%
            //Because some tags may be encoded...
            if ( (html||'').length > this.maxTranslateLength * 1.5 ) {
                continue;
            }

            //Add element into array if has not been added already and has translation
            if ( this.translatedTree[html] !== undefined ) {
                this.registerTranslatableElement(elements[i], html);
            } else {
                for ( var n = 0; n < elements[i].childNodes.length; n++ ){
                    var node = elements[i].childNodes[n];
                    if ( node.nodeName !== '#text' ) {
                        continue;
                    }

                    html = this.nodeValue(node);

                    //If is only one textnode child in parent,
                    //then we want boot translation into parent element.
                    //This is because innerHTML in parent element may be escaped, and wont be matched
                    //with translation. But value in textNode is correct for this element.
                    if ( elements[i].childNodes.length === 1 ) {
                        node = node.parentElement;
                    }

                    if ( this.translatedTree[html] !== undefined ) {
                        this.registerTranslatableElement(node, html);
                    }
                }
            }
        }
    },
    /*
     * Get element or node value
     */
    nodeValue(e){
        var value = e.nodeName == '#text' ? e.data : e.innerHTML,
            value = value||'';

        //We need replace &nbsp; for empty spaces. Because if we push empty chart
        //it will change to this encoded value.
        value = value.replace(new RegExp('&nbsp;', 'g'), ' ');

        return value.trim();
    },
    /*
     * Check if given translation is in text block from editor field (type:editor)
     */
    isInEditorElement(element){
        if ( element ) {
            if ( element.hasPointer ) {
                return true;
            }

            if ( element.nodeName != '#text' && element.getAttribute('data-crudadmin-editor') === '' ) {
                return true;
            }

            if ( element.parentElement ) {
                return this.isInEditorElement(element.parentElement);
            }
        }

        return false;
    },
    /*
     * Update translation on change
     */
    updateTranslation(e){
        var data = { changes : {} },
            value = this.nodeValue(e);

        //If is not raw text, we can save unencoded value
        //Because double encodion would be applied from laravel side
        if ( Editor.hasAllowedFormation(e) === false ) {
            value = Helpers.htmlspecialcharsDecode(value);
        }

        data.changes[e.getPointerSetting('originalTranslate')] = value;

        //Clear previous key change
        if ( this._ajaxSend ) {
            clearTimeout(this._ajaxSend);
        }

        //Remove error class before sending ajax
        Helpers.removeClass(e._CAPencil, Pencils.classNameError);

        this._ajaxSend = setTimeout(() => {
            var url = CAEditor.config.requests.updateText;

            CAEditor.ajax.post(url, data, {
                success(response){
                    Helpers.addClass(e._CAPencil, Pencils.classNameSaved);
                },
                error(response){
                    //Add red pointer color
                    Helpers.addClass(e._CAPencil, Pencils.classNameError);
                }
            });

            this.updateSameTranslationElements(e);
        }, 500);
    },
    /*
     * Update all translates with same translation
     */
    updateSameTranslationElements(element){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            if ( CAEditor.matchedElements[i].getPointerSetting('originalTranslate') == element.getPointerSetting('originalTranslate') ) {
                if ( CAEditor.matchedElements[i] != element ) {
                    CAEditor.matchedElements[i].innerHTML = element.innerHTML;
                }
            }
        }
    },
    /*
     * Check if is translate visible
     */
    isInvisibleElement(element){
        //If is textNode
        if ( element.nodeName == '#text' ) {
            element = element.parentElement;
        }

        var css = window.getComputedStyle(element),
            opacity = parseInt(css.opacity);

        //If is invisible element
        if ( opacity <= 0.5 ) {
            return true;
        }

        return false;
    },
    /*
     * Edit hidden translate in promt modal message
     */
    openAlertModal(element, actualValue){
        var newText = prompt(CATranslates.texts.update, actualValue);

        //On cancel
        if ( newText == null ) {
            return;
        }

        //We need update node, or innerHTML tag value
        if ( element.nodeName == '#text' ) {
            element.data = newText;
        } else {
            element.innerHTML = newText;
        }

        CAEditor.pencils.repaintPencils();
        this.updateTranslation(element);
    },

    /*
     * Pencil events
     */
    events : {
        onPointerCreate(pencil, element){
            pencil.setAttribute('data-translate', element.getPointerSetting('originalTranslate'));
        },
        onPointerClick(element, pencil){
            var actualValue = this.nodeValue(element);

            //We cant allow update duplicate translates. Because change may be updated on right source translate.
            if ( this.duplicates.indexOf(actualValue) > -1 ) {
                alert(CAEditor.texts.cannotUpdate);
                return;
            }

            //Invisible element cannot be edited in editor style
            if ( this.isInvisibleElement(element) ) {
                this.openAlertModal(element, actualValue);
            } else {
                Editor.makeEditableNode(element, actualValue);
            }
        },
    }
}

export default Translatable;