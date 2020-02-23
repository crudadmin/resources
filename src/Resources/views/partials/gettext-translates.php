/*! sprintf-js v1.1.1 | Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro> | BSD-3-Clause */
!function(){"use strict";function e(e){return r(n(e),arguments)}function t(t,r){return e.apply(null,[t].concat(r||[]))}function r(t,r){var n,i,a,o,p,c,u,f,l,d=1,g=t.length,b="";for(i=0;i<g;i++)if("string"==typeof t[i])b+=t[i];else if(Array.isArray(t[i])){if((o=t[i])[2])for(n=r[d],a=0;a<o[2].length;a++){if(!n.hasOwnProperty(o[2][a]))throw new Error(e('[sprintf] property "%s" does not exist',o[2][a]));n=n[o[2][a]]}else n=o[1]?r[o[1]]:r[d++];if(s.not_type.test(o[8])&&s.not_primitive.test(o[8])&&n instanceof Function&&(n=n()),s.numeric_arg.test(o[8])&&"number"!=typeof n&&isNaN(n))throw new TypeError(e("[sprintf] expecting number but found %T",n));switch(s.number.test(o[8])&&(f=n>=0),o[8]){case"b":n=parseInt(n,10).toString(2);break;case"c":n=String.fromCharCode(parseInt(n,10));break;case"d":case"i":n=parseInt(n,10);break;case"j":n=JSON.stringify(n,null,o[6]?parseInt(o[6]):0);break;case"e":n=o[7]?parseFloat(n).toExponential(o[7]):parseFloat(n).toExponential();break;case"f":n=o[7]?parseFloat(n).toFixed(o[7]):parseFloat(n);break;case"g":n=o[7]?String(Number(n.toPrecision(o[7]))):parseFloat(n);break;case"o":n=(parseInt(n,10)>>>0).toString(8);break;case"s":n=String(n),n=o[7]?n.substring(0,o[7]):n;break;case"t":n=String(!!n),n=o[7]?n.substring(0,o[7]):n;break;case"T":n=Object.prototype.toString.call(n).slice(8,-1).toLowerCase(),n=o[7]?n.substring(0,o[7]):n;break;case"u":n=parseInt(n,10)>>>0;break;case"v":n=n.valueOf(),n=o[7]?n.substring(0,o[7]):n;break;case"x":n=(parseInt(n,10)>>>0).toString(16);break;case"X":n=(parseInt(n,10)>>>0).toString(16).toUpperCase()}s.json.test(o[8])?b+=n:(!s.number.test(o[8])||f&&!o[3]?l="":(l=f?"+":"-",n=n.toString().replace(s.sign,"")),c=o[4]?"0"===o[4]?"0":o[4].charAt(1):" ",u=o[6]-(l+n).length,p=o[6]&&u>0?c.repeat(u):"",b+=o[5]?l+n+p:"0"===c?l+p+n:p+l+n)}return b}function n(e){if(i[e])return i[e];for(var t,r=e,n=[],a=0;r;){if(null!==(t=s.text.exec(r)))n.push(t[0]);else if(null!==(t=s.modulo.exec(r)))n.push("%");else{if(null===(t=s.placeholder.exec(r)))throw new SyntaxError("[sprintf] unexpected placeholder");if(t[2]){a|=1;var o=[],p=t[2],c=[];if(null===(c=s.key.exec(p)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(o.push(c[1]);""!==(p=p.substring(c[0].length));)if(null!==(c=s.key_access.exec(p)))o.push(c[1]);else{if(null===(c=s.index_access.exec(p)))throw new SyntaxError("[sprintf] failed to parse named argument key");o.push(c[1])}t[2]=o}else a|=2;if(3===a)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");n.push(t)}r=r.substring(t[0].length)}return i[e]=n}var s={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/},i=Object.create(null);"undefined"!=typeof exports&&(exports.sprintf=e,exports.vsprintf=t),"undefined"!=typeof window&&(window.sprintf=e,window.vsprintf=t,"function"==typeof define&&define.amd&&define(function(){return{sprintf:e,vsprintf:t}}))}();

/* https://github.com/oscarotero/Gettext */
!function(t,n){"function"==typeof define&&define.amd?define(["sprintf-js"],function(t){return n(t.vsprintf)}):"object"==typeof module&&module.exports?module.exports=n(require("sprintf-js").vsprintf):t.Translator=n(window.vsprintf)}(this,function(t){function n(t){this.dictionary={},this.plurals={},this.domain=null,t&&this.loadTranslations(t)}function e(t,n,e,i){return e=e||"",!!(t[n]&&t[n][e]&&t[n][e][i])&&t[n][e][i]}function i(n,e){return e.length?e[0]instanceof Array?t(n,e[0]):t(n,e):n}return n.prototype={loadTranslations:function(t){var n=t.domain||"";if(null===this.domain&&(this.domain=n),this.dictionary[n])return function(t,n){for(var e in n)if(t[e])for(var i in n[e])t[e][i]=n[e][i];else t[e]=n[e]}(this.dictionary[n],t.messages),this;if(t.fn)this.plurals[n]={fn:t.fn};else if(t["plural-forms"]){var e=t["plural-forms"].split(";",2);this.plurals[n]={count:parseInt(e[0].replace("nplurals=","")),code:e[1].replace("plural=","return ")+";"}}return this.dictionary[n]=t.messages,this},defaultDomain:function(t){return this.domain=t,this},gettext:function(t){return this.dpgettext(this.domain,null,t)},ngettext:function(t,n,e){return this.dnpgettext(this.domain,null,t,n,e)},dngettext:function(t,n,e,i){return this.dnpgettext(t,null,n,e,i)},npgettext:function(t,n,e,i){return this.dnpgettext(this.domain,t,n,e,i)},pgettext:function(t,n){return this.dpgettext(this.domain,t,n)},dgettext:function(t,n){return this.dpgettext(t,null,n)},dpgettext:function(t,n,i){var r=e(this.dictionary,t,n,i);return!1!==r&&""!==r[0]?r[0]:i},dnpgettext:function(t,n,i,r,o){var s=function(t,n,e){if(!t[n])return 1==e?0:1;t[n].fn||(t[n].fn=new Function("n",t[n].code));return t[n].fn.call(this,e)+0}(this.plurals,t,o),u=e(this.dictionary,t,n,i);return u[s]&&""!==u[s]?u[s]:0===s?i:r},__:function(t){return i(this.gettext(t),Array.prototype.slice.call(arguments,1))},n__:function(t,n,e){return i(this.ngettext(t,n,e),Array.prototype.slice.call(arguments,3))},p__:function(t,n){return i(this.pgettext(t,n),Array.prototype.slice.call(arguments,2))},d__:function(t,n){return i(this.dgettext(t,n),Array.prototype.slice.call(arguments,2))},dp__:function(t,n,e){return i(this.dgettext(t,n,e),Array.prototype.slice.call(arguments,3))},np__:function(t,n,e,r){return i(this.npgettext(t,n,e,r),Array.prototype.slice.call(arguments,4))},dnp__:function(t,n,e,r,o){return i(this.dnpgettext(t,n,e,r,o),Array.prototype.slice.call(arguments,5))}},n});

/*
 * CrudAdmin Binder into global variables and VueJS 2
 * for simple global scope integration into VueJs use Vue.use(Gettext)
 */
(function(){
    window.CrudAdminTranslates = <?php echo $translations ?>;

    var a = new Translator(CrudAdminTranslates),
        selectors = Object.keys(a.__proto__).concat(['_', 'Gettext']),
        getSelector = function(selector){
            return function(){
                var s = (selector in a) ? selector : '__';

                return a[s].apply(a, arguments);
            };
        };

  selectors.map(function(selector){
    //If window variable is used, for example by lodash library
    if ( selector in window ) {
        return;
    }

    var f = window[selector] = getSelector(selector)

    //Vue.js installation
    f.install = function (Vue, options) {
        for ( var i = 0; i < selectors.length; i++ ) {
            Vue.prototype[selectors[i]] = getSelector(selectors[i]);
        }
    };
  });

  window.GettextTranslates = a;
})();

<?php if ( isAllowedEditorMode() ){ ?>
/*
 * CrudAdmin auto translatable
 */
(function(){
    var tEditor = {
        allTranslates : CrudAdminTranslates.messages ? CrudAdminTranslates.messages[''] : {},
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
        pencils : {
            className : 'CA-TEditor--Pencil',
            classNameSaved : 'CA-TEditor--Pencil--saved',

            init(){
                this.initHovers();
                this.initClicks();
                this.buildPencils();
                this.observeNewElements();
            },

            refresh(){
                this.buildPencils();
            },

            buildPencils(){
                //Add pencils
                for ( var i = 0; i < tEditor.matchedElements.length; i++ ) {
                    var element = tEditor.matchedElements[i];

                    //If element already has pencil, skip it.
                    //Also pdate position of pencil, because element may be deleted.
                    if ( element._CAPencil ) {
                        this.bindPositions(element);
                        continue;
                    }

                    element._CAPencil = this.createPencil(element, i);

                    this.bindPositions(element);
                }
            },
            /*
             * Check hovers of all elements for creating and hidding pencils.
             * Because on hover elements some pencil may dissapear or may be visible...
             */
            initHovers(){
                var allElements = document.getElementsByTagName('*');

                var checkHoverChanges = function(e){
                    var hoveredParent = e.target,
                        childs = hoveredParent.getElementsByTagName('*'),
                        elementsToMove = [];

                    //Add parent element if does have pencil
                    if ( hoveredParent._CAPencil ) {
                        elementsToMove.push(hoveredParent);
                    }

                    //Merge childs with parent
                    for ( var i = 0; i < childs.length; i++ ) {
                        //If child has pencil
                        if ( childs[i]._CAPencil ) {
                            elementsToMove.push(childs[i]);
                        }
                    }

                    //See for position changed of every element till position wont changes.
                    for ( var i = 0; i < elementsToMove.length; i++ ) {
                        (function(element){
                            var prevPositionKey = null,
                                checkPosition = function(){
                                    var position = element.getBoundingClientRect(),
                                        positionKey = position.x+'-'+position.y;

                                    if ( prevPositionKey != positionKey ) {
                                        tEditor.pencils.bindPositions(element);

                                        prevPositionKey = positionKey;

                                        setTimeout(checkPosition, 50);
                                    }
                                }

                            checkPosition();
                        })(elementsToMove[i]);
                    }
                };

                for ( var i = 0; i < allElements.length; i++ ) {
                    allElements[i].addEventListener('mouseenter', checkHoverChanges);
                    allElements[i].addEventListener('mouseleave', checkHoverChanges);
                }
            },
            placeCaretAtEnd(el) {
                el.focus();
                if (typeof window.getSelection != "undefined"
                        && typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            },
            initClicks(){
                document.body.addEventListener('click', function(e){
                    var clickX = e.pageX,
                        clickY = e.pageY,
                        allElements = document.getElementsByTagName('*'),
                        list = [];

                    for ( var i = 0; i < allElements.length; i++ ) {
                        var rect = allElements[i].getBoundingClientRect(),
                            offset = {
                              top: rect.top + window.scrollY,
                              left: rect.left + window.scrollX
                            },
                            range = {
                                x : [ offset.left, offset.left + allElements[i].offsetWidth ],
                                y : [ offset.top, offset.top + allElements[i].offsetHeight ]
                            };

                        if ( (clickX >= range.x[0] && clickX <= range.x[1]) && (clickY >= range.y[0] && clickY <= range.y[1]) ) {
                            list.push(allElements[i]);
                        }
                    }

                    for ( var i = 0; i < list.length; i++ ) {
                        if ( list[i].className.indexOf(tEditor.pencils.className) > -1 ) {
                            (function(pencil){
                                var element = pencil._CAElement,
                                    actualValue = tEditor.nodeValue(element);

                                //We cant allow update duplicate translates. Because change may be updated on right source translate.
                                if ( tEditor.duplicates.indexOf(actualValue) > -1 ) {
                                    alert('<?php echo _('Tento text je možné upraviť len z administrácie v sekcii Jazykové mutácie.') ?>');
                                    return;
                                }

                                //Text node can be edited in DOM
                                // tEditor.pencils.openAlertModal(element, actualValue);
                                tEditor.pencils.makeEditableNode(element, actualValue);
                            })(list[i]);

                            e.preventDefault();
                            break;
                        }
                    }

                    return false;
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
                tEditor.pencils.placeCaretAtEnd(element);

                if ( element.hasBindedEvents ) {
                    return;
                }

                element.hasBindedEvents = true;

                element.addEventListener('keydown', function(e){
                    setTimeout(function(){
                        //When first char will be typed, remove last empty chart
                        if ( e.target.innerHTML.length == 7 && e.target.innerHTML.substr(-6) == '&nbsp;' ) {
                            e.target.innerHTML = e.target.innerHTML.substr(0, e.target.innerHTML.length - 6);
                            tEditor.pencils.placeCaretAtEnd(e.target);
                        }

                        //Add empty char when element is empty, because browser is buggy
                        if ( e.target.innerHTML === '' ) {
                            e.target.innerHTML = '&nbsp;';
                        }
                    }, 1);
                });
                element.addEventListener('keyup', function(e){
                    var pencil = element._CAPencil;

                    //Remove saved classname
                    pencil.className = pencil.className.replace(new RegExp(tEditor.pencils.classNameSaved, 'g'), '')

                    tEditor.pencils.repaintPencils();
                    tEditor.pencils.updateTranslation(element);
                });

                //Paste as plain text
                element.addEventListener('paste', function(e) {
                    e.preventDefault();
                    var text = e.clipboardData.getData('text/plain');
                    document.execCommand('insertHTML', false, text);
                });
            },
            openAlertModal(element, actualValue){
                var newText = prompt('<?php echo _('Upravte preklad') ?>', actualValue);

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

                tEditor.pencils.repaintPencils();
                tEditor.pencils.updateTranslation(element);
            },
            updateSameTranslationElements(element){
                for ( var i = 0; i < tEditor.matchedElements.length; i++ ) {
                    if ( tEditor.matchedElements[i]._CAOriginTranslate == element._CAOriginTranslate ) {
                        if ( tEditor.matchedElements[i] != element ) {
                            tEditor.matchedElements[i].innerHTML = element.innerHTML;
                        }
                    }
                }
            },
            repaintPencils(){
                for ( var i = 0; i < tEditor.matchedElements.length; i++ ) {
                    tEditor.pencils.bindPositions(tEditor.matchedElements[i]);
                }
            },
            createPencil(element, key){
                var e = document.createElement('div');
                    e.setAttribute('data-key', key);
                    e.setAttribute('data-translate', element._CAOriginTranslate);
                    e.className = tEditor.pencils.className;
                    e._CAElement = element;

                document.getElementsByTagName('body')[0].appendChild(e);

                return e;
            },
            bindPositions : function(element){
                var pencil = element._CAPencil;

                //If element does not have pencil
                if ( pencil === undefined ){
                    return;
                }

                //textNode does not have getBoundingClientRect
                var position = element.getBoundingClientRect ? element.getBoundingClientRect() : null;
                    positionX = position ? position.x : null,
                    positionY = position ? position.y : null;

                //Get position of text node
                var textNode = element.nodeName == '#text' ? element : element.firstChild,
                    rects;

                //If textnode is present
                if ( textNode ) {
                    var range = document.createRange();
                        range.selectNodeContents(textNode);
                        rects = range.getClientRects();
                }

                //Get real position of textNode
                if (rects && rects.length > 0) {
                    positionX = rects[0].x + rects[0].width;
                    positionY = rects[0].y;
                }

                //Try guess position
                else if ( position ) {
                    var styles = getComputedStyle(element),
                        textAlign = styles['text-align'],
                        paddingLeft = parseFloat(styles['padding-left'].replace('px', '')),
                        paddingRight = parseFloat(styles['padding-right'].replace('px', '')),
                        paddingTop = parseFloat(styles['padding-top'].replace('px', ''));

                    //Add paddings offset
                    positionX += paddingLeft;
                    positionY += paddingTop;

                    //Icons are aligned on the left, so we need move pencil to the edge
                    positionX -= pencil.offsetWidth;

                    //Point pencil on center of text
                    if ( textAlign == 'center' ){
                        positionX += (element.offsetWidth - paddingLeft - paddingRight) / 2;
                    }
                }

                //Check if element is visible
                pencil.style.display = (!positionY || !positionX || positionY == 0 || positionX === 0) ? 'none' : 'block';

                pencil.style.left = (window.scrollX + positionX)+'px';
                pencil.style.top = (window.scrollY + positionY - pencil.offsetHeight)+'px';
            },
            observeNewElements(){
                tEditor.observer.observeDOM(document.body, function(e){
                    tEditor.refresh();

                    //If removed element had pencil
                    for ( var i = 0; i < e.length; i++ ) {
                        for ( var r = 0; r < e[i].removedNodes.length; r++ ) {
                            if ( e[i].removedNodes[r]._CAPencil ) {
                                e[i].removedNodes[r]._CAPencil.remove();
                            }
                        }
                    }
                });
            },
            htmlEntities(str) {
                return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            },
            updateTranslation(e){
                var data = { changes : {} };
                    data.changes[e._CAOriginTranslate] = tEditor.nodeValue(e);

                //Clear previous key change
                if ( this._ajaxSend ) {
                    clearTimeout(this._ajaxSend);
                }

                this._ajaxSend = setTimeout(function(){
                    var url = '<?php echo action('\Admin\Controllers\GettextController@updateTranslations', request('lang')) ?>';

                    tEditor.ajax.post(url, data, function(xhr){
                        e._CAPencil.className += ' '+tEditor.pencils.classNameSaved;
                    });

                    tEditor.pencils.updateSameTranslationElements(e);
                }, 500);

            }
        },
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
        tEditor.init();
    });
})();
<?php } ?>