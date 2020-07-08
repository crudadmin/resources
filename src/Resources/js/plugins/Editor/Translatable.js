import Editor from './Editor';
import Helpers from './Helpers';
import Pencils from './Pencils';

var Translatable = {
    allTranslates : null,
    rawTranslates : null,
    translatedTree : [],
    duplicates : [],
    maxTranslateLength : 0,

    boot(TAObject, onAjax){
        //Turn on translatable if translate object will returns
        if ( typeof TAObject === 'object' && TAObject.translates && onAjax == true ) {
            CAEditor.config.translatable = true;
        }

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
            element.hasPointer && element.hasPointer.indexOf('translatable') > -1
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
            onPointerHide : this.events.onPointerHide.bind(this),
        });
    },

    /*
     * We want build tree with keys as translations and values as original texts.
     * For better performance for searching elements.
     */
    getTranslationsTree(){
        //Debug given texts
        var debugText = [];

        //Build translates tree
        for ( var key in this.allTranslates ) {
            var translate = this.domPreparer.prepareTranslateHTML(this.allTranslates[key][0]||key);

            /*
             * DEBUG only given texts
             */
            if ( debugText.length > 0 && translate.indexOf(debugText) === -1 ) {
                continue;
            }

            if ( translate && translate.indexOf('je fiktívny text') > -1 ){
                console.log(translate)
            }

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
    /*
     * Change translates and HTML dom into same format
     * ig. we need sort all attributes by name order, because VueJS sorts attributes... then translates are not same with innerHTML
     */
    domPreparer: {
        prepared : {},

        prepareTranslateHTML(html, e){
            //We need cache prepared texts, because othervise it may have heavy performance impact on browser
            if ( html in this.prepared ){
                return this.prepared[html];
            }

            var vn = document.createElement('div');
                vn.innerHTML = html;

            this.modifyElements(vn);

            return this.prepared[html] = vn.innerHTML;
        },
        modifyElements(parentNode){
            //Element has no childnodes
            if ( !parentNode.childNodes ){
                return;
            }

            for ( var k = 0; k < parentNode.childNodes.length; k++ ) {
                let e = parentNode.childNodes[k];

                this.sortAttributes(e);

                //If childnode has another childs...
                if ( e.childNodes && e.childNodes.length > 0 ){
                    this.modifyElements(e)
                }
            }
        },
        sortAttributes(e){
            let defaultAttributes = [];

            //If childnode has attributes, we need sort them
            if ( e.attributes && e.attributes.length > 0 ){
                //Build attributes tree
                for ( let i = 0; i < e.attributes.length; i++ ){
                    defaultAttributes.push({
                        name : e.attributes[i].nodeName,
                        value : e.attributes[i].nodeValue
                    });
                }

                //Sort element attribues by tag name
                defaultAttributes = defaultAttributes.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });

                //Remove all attributes
                defaultAttributes.forEach(item => {
                    e.removeAttribute(item.name);
                });

                //Add attributes aggain in correct order
                defaultAttributes.forEach(item => {
                    item = this.updateAttribute(item);

                    e.setAttribute(item.name, item.value);
                });
            }
        },
        updateAttribute(item){
            //We want update style to format same as from vuejs render
            if ( item.name == 'style' ){
                let newValue = item.value.replace(/\:/g, ': ').replace(/\s\s/g, ' ');

                if ( newValue && newValue.substr(-1) != ';' ){
                    newValue += ';';
                }

                item.value = newValue;
            }

            return item;
        },
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
            }

            //Look for text childs
            else {
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

        return this.domPreparer.prepareTranslateHTML(value, e).trim();
    },
    /*
     * Check if given translation is in text block from editor field (type:editor)
     */
    isInEditorElement(element){
        if ( element ) {
            if ( element.hasPointer && element.hasPointer.indexOf('translatable') > -1 ) {
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

        //We need replace &nbsp; for empty spaces. Because if we push empty char it will change to this encoded value.
        //We need place empty char, when user will delete whole translation. This situation is buggy in some browsers..
        //So we need remove here this empty char at the end.
        if ( value.substr(-6) == '&nbsp;' ) {
            value = value.substr(0, -6);
        }

        //If is not raw text, we can save unencoded value
        //Because double encodion would be applied from laravel side
        if ( Editor.hasAllowedFormation(e) === false ) {
            value = Helpers.htmlspecialcharsDecode(value);
        }

        data.changes[e.getPointerSetting('originalTranslate', 'translatable')] = value;

        //Clear previous key change
        if ( this._ajaxSend ) {
            clearTimeout(this._ajaxSend);
        }

        //Remove error class before sending ajax
        Helpers.removeClass(e._CAPencil, Pencils.classNameError);

        //We need send ajax minimally once per second,
        //because gettext is cached on file timestamp. which in in seconds...
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
        }, 1000);
    },
    /*
     * Update all translates with same translation
     */
    updateSameTranslationElements(element){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            if ( CAEditor.matchedElements[i].getPointerSetting('originalTranslate', 'translatable') == element.getPointerSetting('originalTranslate', 'translatable') ) {
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
        if ( opacity <= 0.5 || css.visibility == 'hidden' || css.fontSize == 0 ) {
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

    isStaticEditor(element){
        return element.nodeName != '#text' && element.getAttribute('data-crudadmin-static-editor') === '';
    },

    /*
     * Pencil events
     */
    events : {
        onPointerCreate(pencil, element){
            if ( this.isStaticEditor(element) ){
                Helpers.addClass(pencil, Pencils.classNameIcon);
                Helpers.addClass(pencil, Pencils.classNameEditor);
            }

            pencil.setAttribute('data-translate', element.getPointerSetting('originalTranslate', 'translatable'));
        },
        onPointerClick(element, pencil){
            var actualValue = this.nodeValue(element);

            //We cant allow update duplicate translates. Because change may be updated on right source translate.
            if ( this.duplicates.indexOf(actualValue) > -1 ) {
                alert(CATranslates.texts.cannotUpdate);
                return;
            }

            //Invisible element cannot be edited in editor style
            if ( this.isInvisibleElement(element) ) {
                this.openAlertModal(element, actualValue);
            } else if ( this.isStaticEditor(element) ) {
                Editor.makeInlineCKEditor(element, () => {
                    Translatable.updateTranslation(element);
                });
            } else {
                Editor.makeEditableNode(element, actualValue);
            }

            //When pointer is clicked, we want remove all additional pointers
            Pencils.removeAdditionalPointers(element._CAPencil);
        },
        onPointerHide(element, pencil){
            //If element is beign edite state, we want open alert instead.
            //Because propably this elements has been hidden
            if ( element.isContentEditable !== true ){
                return;
            }

            var actualValue = this.nodeValue(element);

            Editor.turnOffEditor(element);

            //When element is hidden and is being editing state. We want open alert editor
            this.openAlertModal(element, actualValue);
        }
    }
}

export default Translatable;