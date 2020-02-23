import Pencils from './Editor/Pencils';

/*
 * CrudAdmin auto translatable
 */
(function(){
    window.CAEditor = {
        allTranslates : CATranslates.translates.messages ? CATranslates.translates.messages[''] : {},
        translatedTree : [],
        duplicates : [],
        matchedElements : [],
        maxTranslateLength : 0,

        init : function(){
            this.getTranslationsTree();
            this.getTranslatableElements();
            this.pencils.init();
        },

        refresh : function(){
            this.getTranslatableElements();
            this.pencils.refresh();
        },

        /*
         * We want build tree with keys as translations and values as original texts.
         * For better performance for searching elements.
         */
        getTranslationsTree : function(){
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
        getTranslatableElements : function(){
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

                        if ( this.translatedTree[html] !== undefined ) {
                            this.registerTranslatableElement(node, html);
                        }
                    }
                }
            }
        },
        isInEditorElement(element){
            if ( element && element.nodeName != '#text' ) {
                if ( element.getAttribute('data-crudadmin-editor') === '' ) {
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
        observer : {
            MutationObserver : window.MutationObserver || window.WebKitMutationObserver,

            observeDOM : function(obj, originalCallback){
                if( !obj || !obj.nodeType === 1 )
                    return;

                var timeout,
                    callback = (mutations) => {
                        if ( timeout ) {
                            clearTimeout(timeout);
                        }

                        timeout = setTimeout(() => {
                            originalCallback(mutations);
                        }, 1);
                    };

                if( this.MutationObserver ){
                    // define a new observer
                    var obs = new this.MutationObserver(function(mutations, observer){
                        callback(mutations);
                    })
                    // have the observer observe foo for changes in children
                    obs.observe( obj, { childList:true, subtree:true });
                }

                else if( window.addEventListener ){
                    obj.addEventListener('DOMNodeInserted', callback, false);
                    obj.addEventListener('DOMNodeRemoved', callback, false);
                }
            }
        },
        pencils : Pencils,
        ajax : {
            post(url, data, callback){
                var request = new XMLHttpRequest();
                request.open('POST', url, true);
                request.setRequestHeader('Content-type', 'application/json');
                request.setRequestHeader('X-CSRF-TOKEN', window.CACSRFToken);
                request.send(JSON.stringify(data));

                request.onreadystatechange = function() {
                    if(callback && request.readyState == 4 && request.status == 200) {
                        callback(request)
                    }
                }
            }
        }
    };

    window.addEventListener('load', function(){
        CAEditor.init();
    });
})();