!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}([function(e,t,n){"use strict";t.a={hasClass:function(e,t){return!(!e||!e.className)&&(e.className||"").split(" ").indexOf(t)>-1},addClass:function(e,t){e&&e.className&&!1===this.hasClass(e,t)&&(e.className+=" "+t)},removeClass:function(e,t){if(e&&e.className&&!0===this.hasClass(e,t)){var n=(e.className||"").split(" ");n.splice(n.indexOf(t),1),e.className=n.join(" ")}},htmlspecialchars:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))},htmlspecialcharsDecode:function(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g,(function(e){return t[e]}))}}},function(e,t,n){"use strict";var i={MutationObserver:window.MutationObserver||window.WebKitMutationObserver,observeDOM:function(e,t){if(e&&1!==!e.nodeType){var n,i=function(e){n&&clearTimeout(n),n=setTimeout((function(){t(e)}),1)};if(this.MutationObserver)new this.MutationObserver((function(e,t){i(e)})).observe(e,{childList:!0,subtree:!0});else window.addEventListener&&(e.addEventListener("DOMNodeInserted",i,!1),e.addEventListener("DOMNodeRemoved",i,!1))}},observeNewElements:function(){this.observeDOM(document.body,(function(e){CAEditor.refresh();for(var t=0;t<e.length;t++)for(var n=0;n<e[t].removedNodes.length;n++)e[t].removedNodes[n]._CAPencil&&e[t].removedNodes[n]._CAPencil.remove()}))}},a=n(2),s=n(0),r={className:"CAE_Pencil",classNameSaved:"CAE_Pencil--saved",classNameHidden:"CAE_Pencil--hidden",classNameMoving:"CAE_Pencil--moving",classNameAppears:"CAE_Pencil--appears",classNameActive:"CAE_Pencil--active",init:function(){this.initHovers(),this.registerClicks(),this.registerResize(),this.buildPencils(),i.observeNewElements()},refresh:function(){this.buildPencils()},buildPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];t._CAPencil?this.bindPosition(t):(t._CAPencil=this.createPencil(t,e),this.bindPosition(t))}},initHovers:function(){for(var e=this,t=document.getElementsByTagName("*"),n=function(t){var n=t.target,i=n.getElementsByTagName("*"),a=[];n._CAPencil&&a.push(n);for(var s=0;s<i.length;s++)i[s]._CAPencil&&a.push(i[s]);for(s=0;s<a.length;s++)e.observePencilMovement(a[s])},i=0;i<t.length;i++)t[i].addEventListener("mouseenter",n),t[i].addEventListener("mouseleave",n)},observePencilMovement:function(e){var t=this,n=null;s.a.addClass(e._CAPencil,this.classNameMoving),function i(){var a=e.getBoundingClientRect(),o=a.x+"-"+a.y;n!=o?(r.bindPosition(e),n=o,setTimeout(i,100)):s.a.removeClass(e._CAPencil,t.classNameMoving)}()},placeCaretAtEnd:function(e){if(e.focus(),void 0!==window.getSelection&&void 0!==document.createRange){var t=document.createRange();t.selectNodeContents(e),t.collapse(!1);var n=window.getSelection();n.removeAllRanges(),n.addRange(t)}else if(void 0!==document.body.createTextRange){var i=document.body.createTextRange();i.moveToElementText(e),i.collapse(!1),i.select()}},registerClicks:function(){document.body.addEventListener("click",(function(e){for(var t=e.pageX,n=e.pageY,i=document.getElementsByTagName("*"),a=[],o=0;o<i.length;o++){var l=i[o].getBoundingClientRect(),d={top:l.top+window.scrollY,left:l.left+window.scrollX},c={x:[d.left,d.left+i[o].offsetWidth],y:[d.top,d.top+i[o].offsetHeight]};t>=c.x[0]&&t<=c.x[1]&&n>=c.y[0]&&n<=c.y[1]&&a.push(i[o])}for(o=0;o<a.length;o++)if(s.a.hasClass(a[o],r.className)){r.onClick(a[o]),e.preventDefault();break}return!1}))},registerResize:function(){var e,t=this;window.addEventListener("resize",(function(){e&&clearTimeout(e),e=setTimeout(t.repaintPencils,100)}))},isInvisibleElement:function(e){"#text"==e.nodeName&&(e=e.parentElement);var t=window.getComputedStyle(e);return parseInt(t.opacity)<=.5},onClick:function(e){var t=e._CAElement,n=CAEditor.nodeValue(t);CAEditor.duplicates.indexOf(n)>-1?alert(CAEditor.texts.cannotUpdate):this.isInvisibleElement(t)?this.openAlertModal(t,n):a.a.makeEditableNode(t,n)},openAlertModal:function(e,t){var n=prompt(CATranslates.texts.update,t);null!=n&&("#text"==e.nodeName?e.data=n:e.innerHTML=n,r.repaintPencils(),r.updateTranslation(e))},updateSameTranslationElements:function(e){for(var t=0;t<CAEditor.matchedElements.length;t++)CAEditor.matchedElements[t]._CAOriginTranslate==e._CAOriginTranslate&&CAEditor.matchedElements[t]!=e&&(CAEditor.matchedElements[t].innerHTML=e.innerHTML)},repaintPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++)r.bindPosition(CAEditor.matchedElements[e])},createPencil:function(e,t){var n=document.createElement("div");return n.setAttribute("data-key",t),n.setAttribute("data-translate",e._CAOriginTranslate),n.className=r.className,n._CAElement=e,document.getElementsByTagName("body")[0].appendChild(n),n},bindPosition:function(e){var t=e._CAPencil;if(void 0!==t){var n,i=e.getBoundingClientRect?e.getBoundingClientRect():null,a=i?i.x:null,s=i?i.y:null,r="#text"==e.nodeName?e:1==e.childNodes.length?e.firstChild:null;if(r){var o=document.createRange();o.selectNodeContents(r),n=o.getClientRects()}if(n&&n.length>0)a=n[0].x+n[0].width,s=n[0].y;else if(i){var l=getComputedStyle(e),d=l["text-align"],c=parseFloat(l["padding-left"].replace("px","")),u=parseFloat(l["padding-right"].replace("px",""));a+=c,s+=parseFloat(l["padding-top"].replace("px","")),a-=20,"center"==d&&(a+=(e.offsetWidth-c-u)/2)}var f=this.isPositionFixed(e),m=!s||!a||0==s||0===a;t.style.position=f?"fixed":"absolute",t.style.left=(f?0:window.scrollX)+a+"px",t.style.top=(f?0:window.scrollY)+s-20+"px",t.style.display=m?"none":"block",this.setPencilZindex(e,t)}},isPositionFixed:function(e,t){for(var n=!1;e.parentElement;){if("fixed"==(1==e.nodeType?window.document.defaultView.getComputedStyle(e).position:null)){n=!0;break}e=e.parentElement}return n},setPencilZindex:function(e,t){for(var n="auto";e.parentElement;){var i=1==e.nodeType?parseInt(window.document.defaultView.getComputedStyle(e).zIndex):NaN;e=e.parentElement,isNaN(i)||(n=i)}t.style.zIndex=n},updateTranslation:function(e){var t={changes:{}},n=CAEditor.nodeValue(e);!1===a.a.hasAllowedFormation(e)&&(n=s.a.htmlspecialcharsDecode(n)),t.changes[e._CAOriginTranslate]=n,this._ajaxSend&&clearTimeout(this._ajaxSend),this._ajaxSend=setTimeout((function(){var n=CAEditor.config.requests.updateText;CAEditor.ajax.post(n,t,(function(t){e._CAPencil.className+=" "+r.classNameSaved})),r.updateSameTranslationElements(e)}),500)},hideAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&s.a.addClass(t,r.classNameHidden)}},showAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&(s.a.removeClass(t,r.classNameHidden),this.bindPosition(CAEditor.matchedElements[e]))}}};t.a=r},function(e,t,n){"use strict";var i=n(0),a=n(1),s={inlineClass:"CAE__InlineWrapper",hasAllowedFormation:function(e){return CAEditor.rawTranslates.indexOf(e._CAOriginTranslate)>-1},isDisabledFormationActionEvent:function(e,t){if(this.hasAllowedFormation(e.target))return 13==e.keyCode&&(document.execCommand("insertHTML",!1,"<br>"),e.preventDefault()),!0;var n=!0;if(13==e.keyCode)return this.turnOffEditor(t),!1;if(e.ctrlKey||e.metaKey)switch(e.keyCode){case 66:case 98:n=!1;break;case 73:case 105:n=!1;break;case 85:case 117:n=!1}return n},allowFormatingByTranslateType:function(e){var t=this;e.addEventListener("keydown",(function(n){!1===t.isDisabledFormationActionEvent(n,e)&&n.preventDefault()}))},fixEmptyStrings:function(e){e.addEventListener("keydown",(function(e){setTimeout((function(){7==e.target.innerHTML.length&&"&nbsp;"==e.target.innerHTML.substr(-6)&&(e.target.innerHTML=e.target.innerHTML.substr(0,e.target.innerHTML.length-6),CAEditor.pencils.placeCaretAtEnd(e.target)),""===e.target.innerHTML&&(e.target.innerHTML="&nbsp;")}),1)}))},disableRichPaste:function(e){e.addEventListener("paste",(function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)}))},enableAutoSave:function(e){e.addEventListener("keyup",(function(t){var n=e._CAPencil;i.a.removeClass(n,CAEditor.pencils.classNameSaved),CAEditor.pencils.repaintPencils(),CAEditor.pencils.updateTranslation(e)}))},makeEditableNode:function(e,t){if("#text"==e.nodeName&&e._CAOriginTranslate){var n=document.createElement("div");n.className=this.inlineClass,e.parentNode.insertBefore(n,e),n.appendChild(e),e=n}e.innerHTML=t,e.contentEditable=!0,CAEditor.pencils.placeCaretAtEnd(e),i.a.addClass(e._CAPencil,a.a.classNameActive),e.hasBindedEvents||(e.hasBindedEvents=!0,this.allowFormatingByTranslateType(e),this.fixEmptyStrings(e),this.disableRichPaste(e),this.enableAutoSave(e),this.onUnblur(e),this.onClick(e))},onUnblur:function(e){var t=this;e.addEventListener("blur",(function(n){t.turnOffEditor(e)}))},onClick:function(e){e.addEventListener("click",(function(e){1==e.target.isContentEditable&&e.preventDefault()}))},turnOffAllEditors:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];this.turnOffEditor(t)}},turnOffEditor:function(e){1==e.isContentEditable&&(e.contentEditable=!1,i.a.removeClass(e._CAPencil,a.a.classNameActive))}};t.a=s},function(e,t,n){"use strict";var i={wrapperClassName:"CAE_Navigation",init:function(){this.addNavigation(),this.bindTranslatesToggle()},addNavigation:function(){var e=document.createElement("div");e.className=this.wrapperClassName,e.innerHTML='\n            <div class="CAE_Navigation_button">\n                <button></button>\n                <div class="CAE_Navigation_navbar">\n                    <ul>\n                        <li><a class="CAE_Icons" href="'.concat(CAEditor.config.requests.admin,'" target="_blank">Administrácia webu <i class="CAE_Icon--link"></i></a></li>\n                        <li id="CAE_ToggleState">\n                            <label class="CAE_Checkbox CAE_Icons">\n                                Režim prekladateľa\n                                <input type="checkbox">\n                                <div><div></div></div>\n                            </label>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        '),document.getElementsByTagName("body")[0].appendChild(e)},bindTranslatesToggle:function(){var e=document.getElementById("CAE_ToggleState");e.getElementsByTagName("input")[0].checked=CAEditor.config.active,e.addEventListener("change",(function(e){CAEditor.toggle()}))}};t.a=i},function(e,t,n){n(5),e.exports=n(6)},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),_Editor_Helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_Editor_Navigation__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(3);!function(){window.CAEditor={state:!1,config:window.CAEditorConfig,allTranslates:null,rawTranslates:null,translatedTree:[],duplicates:[],matchedElements:[],maxTranslateLength:0,init:function(e){_Editor_Navigation__WEBPACK_IMPORTED_MODULE_3__.a.init(),this.bootTranslates(e)},bootTranslates:function(e){this.allTranslates=e.translates.messages?e.translates.messages[""]:{},this.rawTranslates=e.rawTranslates,!1!==this.config.active&&(this.getTranslationsTree(),this.getTranslatableElements(),this.pencils.init(),this.state=!0)},enable:function enable(){!0===this.config.active?(_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.showAllPencils(),this.state=!0,this.ajax.post(this.config.requests.changeState,{state:!0})):(this.config.active=!0,this.ajax.post(this.config.requests.changeState,{state:!0,response:!0},(function(response){CAEditor.bootTranslates(eval(response.response))})))},toggle:function(){!1===this.state?this.enable():this.destroy()},destroy:function(){_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.hideAllPencils(),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__.a.turnOffAllEditors(),this.state=!1,this.ajax.post(this.config.requests.changeState,{state:!1})},refresh:function(){this.getTranslatableElements(),this.pencils.refresh()},getTranslationsTree:function(){for(var e in this.allTranslates){var t=this.allTranslates[e][0]||e;t in this.translatedTree&&this.duplicates.push(t),this.translatedTree[t]=e,t.length>this.maxTranslateLength&&(this.maxTranslateLength=t.length)}},nodeValue:function(e){return(("#text"==e.nodeName?e.data:e.innerHTML)||"").replace(new RegExp("&nbsp;","g")," ").trim()},getTranslatableElements:function(){for(var e=document.querySelectorAll("*"),t=0;t<e.length;t++){var n=this.nodeValue(e[t]);if(!((n||"").length>1.5*this.maxTranslateLength))if(void 0!==this.translatedTree[n])this.registerTranslatableElement(e[t],n);else for(var i=0;i<e[t].childNodes.length;i++){var a=e[t].childNodes[i];"#text"===a.nodeName&&(n=this.nodeValue(a),1===e[t].childNodes.length&&(a=a.parentElement),void 0!==this.translatedTree[n]&&this.registerTranslatableElement(a,n))}}},isInEditorElement:function(e){if(e){if(e._CAOriginTranslate)return!0;if("#text"!=e.nodeName&&""===e.getAttribute("data-crudadmin-editor"))return!0;if(e.parentElement)return this.isInEditorElement(e.parentElement)}return!1},registerTranslatableElement:function(e,t){var n=!1;e._CAOriginTranslate||(n=this.isInEditorElement(e))?n&&(e._CAOriginTranslate=!0):(e._CAOriginTranslate=this.translatedTree[t],this.matchedElements.push(e))},pencils:_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a,ajax:{post:function(e,t,n){var i=new XMLHttpRequest;i.open("POST",e,!0),i.setRequestHeader("Content-type","application/json"),i.setRequestHeader("X-CSRF-TOKEN",CAEditor.config.token),i.send(JSON.stringify(t)),i.onreadystatechange=function(){n&&4==i.readyState&&200==i.status&&n(i)}}}},window.addEventListener("load",(function(){CAEditor.init(window.CATranslates)}))}()},function(e,t){}]);