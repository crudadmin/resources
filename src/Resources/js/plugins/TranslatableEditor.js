import Pencils from './Editor/Pencils';
import Helpers from './Editor/Helpers';
import Editor from './Editor/Editor';
import Navigation from './Editor/Navigation';

/*
 * CrudAdmin auto translatable
 */
(function(){
    window.CAEditor = {
        state : false,
        config : window.CAEditorConfig,
        allTranslates : null,
        rawTranslates : null,
        translatedTree : [],
        duplicates : [],
        matchedElements : [],
        maxTranslateLength : 0,

        init(TAObject){
            Navigation.init();

            this.bootTranslates(TAObject);
        },

        bootTranslates(TAObject){
            //Bind given translates
            this.allTranslates = TAObject.translates.messages ? TAObject.translates.messages[''] : {};
            this.rawTranslates = TAObject.rawTranslates;

            //Editor is not allowed
            if ( this.config.active === false ) {
                return;
            }

            this.getTranslationsTree();
            this.getTranslatableElements();
            this.pencils.init();

            this.state = true;
        },

        enable(){
            //If editor has been booted already, pencils are just hidden, so we need show them.
            if ( this.config.active === true ) {
                Pencils.showAllPencils();

                this.state = true;

                //Send ajax that state is on
                this.ajax.post(this.config.requests.changeState, { state : true });
            } else {
                //We need set active/boot status to true
                this.config.active = true;

                //Turn on state and get the newest translates with all raw texts
                this.ajax.post(this.config.requests.changeState, {
                    state : true,
                    response : true,
                }, (response) => {
                    CAEditor.bootTranslates(eval(response.response));
                })
            }
        },

        toggle(){
            if ( this.state === false ) {
                this.enable();
            } else {
                this.destroy();
            }
        },

        destroy(){
            Pencils.hideAllPencils();
            Editor.turnOffAllEditors();
            this.state = false;

            //Turn of state
            this.ajax.post(this.config.requests.changeState, {
                state : false,
            });
        },

        refresh(){
            this.getTranslatableElements();
            this.pencils.refresh();
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
        nodeValue(e){
            var value = e.nodeName == '#text' ? e.data : e.innerHTML,
                value = value||'';

            //We need replace &nbsp; for empty spaces. Because if we push empty chart
            //it will change to this encoded value.
            value = value.replace(new RegExp('&nbsp;', 'g'), ' ');

            return value.trim();
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
        isInEditorElement(element){
            if ( element ) {
                if ( element._CAOriginTranslate ) {
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
        registerTranslatableElement(element, html){
            var isTextFromEditor = false;

            //Element has been registered already
            if ( element._CAOriginTranslate || (isTextFromEditor = this.isInEditorElement(element)) ) {
                //Prevent check next time...
                if ( isTextFromEditor ) {
                    element._CAOriginTranslate = true;
                }

                return;
            }

            //Bind original translate into element property
            element._CAOriginTranslate = this.translatedTree[html];

            this.matchedElements.push(element);
        },
        pencils : Pencils,
        ajax : {
            post(url, data, callback){
                var request = new XMLHttpRequest();
                request.open('POST', url, true);
                request.setRequestHeader('Content-type', 'application/json');
                request.setRequestHeader('X-CSRF-TOKEN', CAEditor.config.token);
                request.send(JSON.stringify(data));

                request.onreadystatechange = () => {
                    if(callback && request.readyState == 4 && request.status == 200) {
                        callback(request)
                    }
                }
            }
        }
    };

    window.addEventListener('load', () => {
        CAEditor.init(window.CATranslates);
    });
})();