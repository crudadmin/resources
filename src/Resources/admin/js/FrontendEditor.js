!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=7)}([function(e,t,n){"use strict";t.a={hasClass:function(e,t){return!(!e||!e.className)&&(e.className||"").split(" ").indexOf(t)>-1},addClass:function(e,t){e&&e.className&&!1===this.hasClass(e,t)&&(e.className+=" "+t)},removeClass:function(e,t){if(e&&e.className&&!0===this.hasClass(e,t)){var n=(e.className||"").split(" ");n.splice(n.indexOf(t),1),e.className=n.join(" ")}},htmlspecialchars:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))},htmlspecialcharsDecode:function(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g,(function(e){return t[e]}))}}},function(e,t,n){"use strict";var a={MutationObserver:window.MutationObserver||window.WebKitMutationObserver,observeDOM:function(e,t){if(e&&1!==!e.nodeType){var n,a=function(e){n&&clearTimeout(n),n=setTimeout((function(){t(e)}),1)};if(this.MutationObserver)new this.MutationObserver((function(e,t){a(e)})).observe(e,{childList:!0,subtree:!0});else window.addEventListener&&(e.addEventListener("DOMNodeInserted",a,!1),e.addEventListener("DOMNodeRemoved",a,!1))}},observeNewElements:function(){this.observeDOM(document.body,(function(e){CAEditor.refresh();for(var t=0;t<e.length;t++)for(var n=0;n<e[t].removedNodes.length;n++)e[t].removedNodes[n]._CAPencil&&e[t].removedNodes[n]._CAPencil.remove()}))}},i=n(0),r={wrapperId:"CAE_Pencils__wrapper",className:"CAE_Pencil",classNameSaved:"CAE_Pencil--saved",classNameHidden:"CAE_Pencil--hidden",classNameMoving:"CAE_Pencil--moving",classNameAppears:"CAE_Pencil--appears",classNameError:"CAE_Pencil--error",classNameActive:"CAE_Pencil--active",classNameLoading:"CAE_Pencil--loading",classNameImage:"CAE_Pencil--image",pointersWrapper:null,init:function(){this.createPointersWrapper(),this.initHovers(),this.registerClicks(),this.registerResize(),this.registerScroll(),this.buildPencils(),a.observeNewElements()},refresh:function(){this.buildPencils()},createPointersWrapper:function(){var e=document.createElement("div");e.id=r.wrapperId,document.getElementsByTagName("body")[0].appendChild(e),this.pointersWrapper=e},buildPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];t._CAPencil?this.bindPosition(t):(t._CAPencil=this.createPencil(t,e),this.bindPosition(t))}},initHovers:function(){for(var e=this,t=document.getElementsByTagName("*"),n=function(t){var n=t.target,a=n.getElementsByTagName("*"),i=[];n._CAPencil&&i.push(n);for(var r=0;r<a.length;r++)a[r]._CAPencil&&i.push(a[r]);for(r=0;r<i.length;r++)e.observePencilMovement(i[r])},a=0;a<t.length;a++)t[a].addEventListener("mouseenter",n),t[a].addEventListener("mouseleave",n)},observePencilMovement:function(e){var t=this,n=null;i.a.addClass(e._CAPencil,this.classNameMoving),function a(){var s;if("#text"==e.nodeName){var o=document.createRange();o.selectNodeContents(e),s=o.getClientRects()[0]}else s=e.getBoundingClientRect();var l=s?s.x+"-"+s.y:null;s&&n!=l?(r.bindPosition(e),n=l,setTimeout(a,100)):i.a.removeClass(e._CAPencil,t.classNameMoving)}()},placeCaretAtEnd:function(e){if(e.focus(),void 0!==window.getSelection&&void 0!==document.createRange){var t=document.createRange();t.selectNodeContents(e),t.collapse(!1);var n=window.getSelection();n.removeAllRanges(),n.addRange(t)}else if(void 0!==document.body.createTextRange){var a=document.body.createTextRange();a.moveToElementText(e),a.collapse(!1),a.select()}},registerClicks:function(){var e=this;document.body.addEventListener("click",(function(e){for(var t=e.pageX,n=e.pageY,a=document.getElementsByTagName("*"),s=[],o=0;o<a.length;o++){var l=a[o].getBoundingClientRect(),c={top:l.top+window.scrollY,left:l.left+window.scrollX},d={x:[c.left,c.left+a[o].offsetWidth],y:[c.top,c.top+a[o].offsetHeight]};t>=d.x[0]&&t<=d.x[1]&&n>=d.y[0]&&n<=d.y[1]&&s.push(a[o])}for(o=0;o<s.length;o++)if(i.a.hasClass(s[o],r.className)){r.onClick(s[o]),e.preventDefault();break}return!1})),document.body.addEventListener("mouseup",(function(t){CAEditor.allMatchedElements().forEach((function(t){e.observePencilMovement(t)}))}))},registerResize:function(){var e,t=this;window.addEventListener("resize",(function(){e&&clearTimeout(e),e=setTimeout(t.repaintPencils,100)}))},registerScroll:function(){var e,t=this;window.addEventListener("scroll",(function(){e&&clearTimeout(e),e=setTimeout(t.repaintPencils,30)}))},onClick:function(e){var t=e._CAElement,n=t.getPointerSetting("onPointerClick");i.a.removeClass(e,r.classNameError),n&&n(t,e)},repaintPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++)r.bindPosition(CAEditor.matchedElements[e])},createPencil:function(e,t){var n=document.createElement("div");n.setAttribute("data-key",t),n.className=r.className,n._CAElement=e;var a=e.getPointerSetting("onPointerCreate");return a&&a(n,e,t),this.pointersWrapper.appendChild(n),n},bindPosition:function(e){var t=e._CAPencil;if(void 0!==t){var n,a=!1,i=e.getBoundingClientRect?e.getBoundingClientRect():null,r=i?i.x:null,s=i?i.y:null,o="#text"==e.nodeName?e:1==e.childNodes.length?e.firstChild:null;if(o){var l=document.createRange();l.selectNodeContents(o),n=l.getClientRects()}if(n&&n.length>0)r=n[0].x+n[0].width,s=n[0].y;else if(i){var c=getComputedStyle(e),d=c["text-align"],u=parseFloat(c["padding-left"].replace("px","")),m=parseFloat(c["padding-right"].replace("px",""));if(r+=u,s+=parseFloat(c["padding-top"].replace("px","")),"IMG"===e.nodeName){r+=e.getBoundingClientRect().width;var p=window.outerWidth;r>=p&&r<=p+20&&(r=p-20)}else r-=20,"center"==d&&(r+=(e.offsetWidth-u-m)/2)}var f=this.isPositionFixed(e);a&&(a=!s||!r||0==s||0===r),t.style.position=f?"fixed":"absolute",t.style.left=(f?0:window.scrollX)+r+"px",t.style.top=(f?0:window.scrollY)+s-20+"px",t.style.display=a?"none":"block",this.setPencilZindex(e,t)}},isPositionFixed:function(e,t){for(var n=!1;e.parentElement;){if("fixed"==(1==e.nodeType?window.document.defaultView.getComputedStyle(e).position:null)){n=!0;break}e=e.parentElement}return n},setPencilZindex:function(e,t){for(var n="auto";e.parentElement;){var a=1==e.nodeType?parseInt(window.document.defaultView.getComputedStyle(e).zIndex):NaN;e=e.parentElement,isNaN(a)||a<0||(n=a)}t.style.zIndex=n},hideAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&i.a.addClass(t,r.classNameHidden)}},showAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&(i.a.removeClass(t,r.classNameHidden),this.bindPosition(CAEditor.matchedElements[e]))}}};t.a=r},function(e,t,n){"use strict";var a=n(3),i=n(0),r=n(1);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o={allTranslates:null,rawTranslates:null,translatedTree:[],duplicates:[],maxTranslateLength:0,boot:function(e,t){"object"===s(e)&&e.translates&&1==t&&(CAEditor.config.translatable=!0),!1!==CAEditor.config.translatable&&(this.allTranslates=e.translates.messages?e.translates.messages[""]:{},this.rawTranslates=e.rawTranslates,this.getTranslationsTree(),this.getTranslatableElements())},registerTranslatableElement:function(e,t){var n=!1;e.hasPointer||e._isInEditorElement||(n=this.isInEditorElement(e))?n&&(e._isInEditorElement=!0):CAEditor.pushPointerElement(e,"translatable",{originalTranslate:this.translatedTree[t],onPointerCreate:this.events.onPointerCreate.bind(this),onPointerClick:this.events.onPointerClick.bind(this)})},getTranslationsTree:function(){var e=[];for(var t in this.allTranslates){var n=this.allTranslates[t][0]||t;n in this.translatedTree&&this.duplicates.push(n),e.length>0&&-1===e.indexOf(n)||(this.translatedTree[n]=t,n.length>this.maxTranslateLength&&(this.maxTranslateLength=n.length))}},getTranslatableElements:function(){for(var e=document.querySelectorAll("*"),t=0;t<e.length;t++){var n=this.nodeValue(e[t]);if(!((n||"").length>1.5*this.maxTranslateLength))if(void 0!==this.translatedTree[n])this.registerTranslatableElement(e[t],n);else for(var a=0;a<e[t].childNodes.length;a++){var i=e[t].childNodes[a];"#text"===i.nodeName&&(n=this.nodeValue(i),1===e[t].childNodes.length&&(i=i.parentElement),void 0!==this.translatedTree[n]&&this.registerTranslatableElement(i,n))}}},nodeValue:function(e){return(("#text"==e.nodeName?e.data:e.innerHTML)||"").replace(new RegExp("&nbsp;","g")," ").trim()},isInEditorElement:function(e){if(e){if(e.hasPointer)return!0;if("#text"!=e.nodeName&&""===e.getAttribute("data-crudadmin-editor"))return!0;if(e.parentElement)return this.isInEditorElement(e.parentElement)}return!1},updateTranslation:function(e){var t=this,n={changes:{}},s=this.nodeValue(e);!1===a.a.hasAllowedFormation(e)&&(s=i.a.htmlspecialcharsDecode(s)),n.changes[e.getPointerSetting("originalTranslate")]=s,this._ajaxSend&&clearTimeout(this._ajaxSend),i.a.removeClass(e._CAPencil,r.a.classNameError),this._ajaxSend=setTimeout((function(){var a=CAEditor.config.requests.updateText;CAEditor.ajax.post(a,n,{success:function(t){i.a.addClass(e._CAPencil,r.a.classNameSaved)},error:function(t){i.a.addClass(e._CAPencil,r.a.classNameError)}}),t.updateSameTranslationElements(e)}),500)},updateSameTranslationElements:function(e){for(var t=0;t<CAEditor.matchedElements.length;t++)CAEditor.matchedElements[t].getPointerSetting("originalTranslate")==e.getPointerSetting("originalTranslate")&&CAEditor.matchedElements[t]!=e&&(CAEditor.matchedElements[t].innerHTML=e.innerHTML)},isInvisibleElement:function(e){"#text"==e.nodeName&&(e=e.parentElement);var t=window.getComputedStyle(e);return parseInt(t.opacity)<=.5},openAlertModal:function(e,t){var n=prompt(CATranslates.texts.update,t);null!=n&&("#text"==e.nodeName?e.data=n:e.innerHTML=n,CAEditor.pencils.repaintPencils(),this.updateTranslation(e))},events:{onPointerCreate:function(e,t){e.setAttribute("data-translate",t.getPointerSetting("originalTranslate"))},onPointerClick:function(e,t){var n=this.nodeValue(e);this.duplicates.indexOf(n)>-1?alert(CAEditor.texts.cannotUpdate):this.isInvisibleElement(e)?this.openAlertModal(e,n):a.a.makeEditableNode(e,n)}}};t.a=o},function(e,t,n){"use strict";var a=n(0),i=n(1),r=n(2),s={inlineClass:"CAE__InlineWrapper",hasAllowedFormation:function(e){return CAEditor.translatable.rawTranslates.indexOf(e.getPointerSetting("originalTranslate"))>-1},isDisabledFormationActionEvent:function(e,t){if(this.hasAllowedFormation(e.target))return 13==e.keyCode&&(document.execCommand("insertHTML",!1,"<br>"),e.preventDefault()),!0;var n=!0;if(13==e.keyCode)return this.turnOffEditor(t),!1;if(e.ctrlKey||e.metaKey)switch(e.keyCode){case 66:case 98:n=!1;break;case 73:case 105:n=!1;break;case 85:case 117:n=!1}return n},allowFormatingByTranslateType:function(e){var t=this;e.addEventListener("keydown",(function(n){!1===t.isDisabledFormationActionEvent(n,e)&&n.preventDefault()}))},fixEmptyStrings:function(e){e.addEventListener("keydown",(function(e){setTimeout((function(){7==e.target.innerHTML.length&&"&nbsp;"==e.target.innerHTML.substr(-6)&&(e.target.innerHTML=e.target.innerHTML.substr(0,e.target.innerHTML.length-6),CAEditor.pencils.placeCaretAtEnd(e.target)),""===e.target.innerHTML&&(e.target.innerHTML="&nbsp;")}),1)}))},disableRichPaste:function(e){e.addEventListener("paste",(function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)}))},enableAutoSave:function(e){e.addEventListener("keyup",(function(t){var n=e._CAPencil;a.a.removeClass(n,CAEditor.pencils.classNameSaved),CAEditor.pencils.repaintPencils(),r.a.updateTranslation(e)}))},makeEditableNode:function(e,t){if("#text"==e.nodeName&&e.getPointerSetting("originalTranslate")){var n=document.createElement("div");n.className=this.inlineClass,e.parentNode.insertBefore(n,e),n.appendChild(e),e=n}e.innerHTML=t,e.contentEditable=!0,CAEditor.pencils.placeCaretAtEnd(e),a.a.addClass(e._CAPencil,i.a.classNameActive),e.hasBindedEvents||(e.hasBindedEvents=!0,this.allowFormatingByTranslateType(e),this.fixEmptyStrings(e),this.disableRichPaste(e),this.enableAutoSave(e),this.onUnblur(e),this.onClick(e))},onUnblur:function(e){var t=this;e.addEventListener("blur",(function(n){t.turnOffEditor(e)}))},onClick:function(e){e.addEventListener("click",(function(e){1==e.target.isContentEditable&&e.preventDefault()}))},turnOffAllEditors:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];this.turnOffEditor(t)}},turnOffEditor:function(e){1==e.isContentEditable&&(e.contentEditable=!1,a.a.removeClass(e._CAPencil,i.a.classNameActive))}};t.a=s},function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i={post:function(e,t,n,i){var r=new XMLHttpRequest;r.open("POST",e,!0),r.setRequestHeader("X-CSRF-TOKEN",CAEditor.config.token),t instanceof FormData?r.send(t):(r.setRequestHeader("Content-type","application/json"),r.send(JSON.stringify(t))),r.onreadystatechange=function(){if(n&&4==r.readyState&&200==r.status){if("application/json"==r.getResponseHeader("Content-Type"))try{r.responseJSON=JSON.parse(r.response)}catch(e){console.error(e)}"function"==typeof n&&n(r),"object"==a(n)&&n.success&&n.success(r)}else 4==r.readyState&&("function"==typeof i&&i(r),"object"==a(n)&&n.error&&n.error(r))}}};t.a=i},function(e,t,n){"use strict";var a=n(4),i=n(1),r=n(0),s={queryKey:"ca_table_name",sizesKey:"sizes",classNameUploadableWrapper:"CAE_Uploadable_wrapper",uploadWrapper:null,imageElement:null,boot:function(){!1!==CAEditor.config.uploadable&&(this.registerAllImages(),this.buildUploadWrapper(),this.bindEvents())},isUploadableImage:function(e){return e&&(e.indexOf("?"+this.queryKey)>-1||e.indexOf("&"+this.queryKey)>-1)},registerAllImages:function(){for(var e=document.getElementsByTagName("img"),t=document.getElementsByTagName("*"),n=0;n<e.length;n++){var a=e[n].src;this.isUploadableImage(a)&&this.registerImageElement(e[n],a)}for(n=0;n<t.length;n++){var i=t[n];if(i.getAttribute("style")&&i.style.backgroundImage){var r=i.style.backgroundImage.replace(/^url\(["']?/,"").replace(/["']?\)$/,"");this.isUploadableImage(r)&&this.registerImageElement(i,r)}}},getQueryPart:function(e,t){var n=e.split(t+"=");return n.length>1?decodeURIComponent(n[1].split("&")[0]):null},registerImageElement:function(e,t){CAEditor.pushPointerElement(e,"uploadable",{defaultUrl:t,onPointerCreate:this.events.onPointerCreate.bind(this),onPointerClick:this.events.onPointerClick.bind(this)})},buildUploadWrapper:function(){if(!this.uploadWrapper){var e=document.createElement("input");e.type="file",e.className=this.classNameUploadableWrapper,document.getElementsByTagName("body")[0].appendChild(e),this.uploadWrapper=e}},buildRequest:function(e){var t=new FormData,n=s.imageElement.getPointerSetting("defaultUrl"),a=this.getQueryPart(n,"sizes");return t.append("table",this.getQueryPart(n,this.queryKey)),t.append("key",this.getQueryPart(n,"ca_field_name")),t.append("id",this.getQueryPart(n,"ca_row_id")),t.append(this.getQueryPart(n,"ca_field_name"),e.target.files[0]),t.append("hash",this.getQueryPart(n,"ca_hash")),a&&t.append("sizes",a),t},bindEvents:function(){var e=this;this.uploadWrapper.addEventListener("change",(function(t){0==t.target.files.length&&(s.imageElement=null);var n=s.imageElement._CAPencil;r.a.removeClass(n,i.a.classNameSaved),r.a.addClass(n,i.a.classNameLoading),s.imageElement.style.opacity=.5;var o=e.buildRequest(t),l=function(e){r.a.removeClass(e._CAPencil,i.a.classNameLoading),e.style.opacity=1},c=function(e){r.a.addClass(n,i.a.classNameError),l(s.imageElement),s.imageElement=null};a.a.post(CAEditor.config.requests.updateImage,o,{success:function(t){t.responseJSON?(e.updateImagesWithSameSrc(t,s.imageElement),r.a.addClass(n,i.a.classNameSaved),"IMG"==s.imageElement.nodeName?s.imageElement.onload=function(e){l(e.target),CAEditor.pencils.repaintPencils()}:l(s.imageElement),s.imageElement=null):c()},error:c})}))},updateImagesWithSameSrc:function(e,t){CAEditor.allMatchedElements("uploadable").forEach((function(n){n.getPointerSetting("defaultUrl")==t.getPointerSetting("defaultUrl")&&("IMG"==n.nodeName?(n.src=e.responseJSON.url,n.srcset&&(n.srcset=e.responseJSON.url+" 1x")):n.style.backgroundImage='url("'+e.responseJSON.url+'")')}))},events:{onPointerCreate:function(e,t){r.a.addClass(e,i.a.classNameImage)},onPointerClick:function(e,t){var n=document.createEvent("MouseEvents");n.initEvent("click",!1,!0),s.imageElement=e,this.uploadWrapper.dispatchEvent(n)}}};t.a=s},function(e,t,n){"use strict";var a={wrapperClassName:"CAE_Navigation",init:function(){this.addNavigation(),this.bindTranslatesToggle()},addNavigation:function(){var e=document.createElement("div"),t=__("Režim upravovania"),n=CAEditor.config.enabled?'<li id="CAE_ToggleState">\n                            <label class="CAE_Checkbox CAE_Icons">\n                                '.concat(t,'\n                                <input type="checkbox">\n                                <div><div></div></div>\n                            </label>\n                        </li>'):"";e.className=this.wrapperClassName,e.innerHTML='\n            <div class="CAE_Navigation_button">\n                <button></button>\n                <div class="CAE_Navigation_navbar">\n                    <ul>\n                        <li><a class="CAE_Icons" href="'.concat(CAEditor.config.requests.admin,'" target="_blank">').concat(__("Administrácia webu"),' <i class="CAE_Icon--link"></i></a></li>\n                        ').concat(n,"\n                    </ul>\n                </div>\n            </div>\n        "),document.getElementsByTagName("body")[0].appendChild(e)},bindTranslatesToggle:function(){var e=document.getElementById("CAE_ToggleState");e&&(e.getElementsByTagName("input")[0].checked=CAEditor.config.active,e.addEventListener("change",(function(e){CAEditor.toggle()})))}};t.a=a},function(e,t,n){n(8),e.exports=n(9)},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),_Editor_Helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3),_Editor_Ajax__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4),_Editor_Navigation__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(6),_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5);!function(){window.CAEditor={state:!1,config:window.CAEditorConfig,translatable:_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a,uploadable:_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__.a,matchedElements:[],pencils:_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a,init:function(e){_Editor_Navigation__WEBPACK_IMPORTED_MODULE_4__.a.init(),!1!==CAEditor.config.active&&this.boot(e)},boot:function(e,t){_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a.boot(e,t),_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__.a.boot(),this.pencils.init(),this.state=!0},enable:function enable(){var _this=this;!0===this.config.active?(_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.showAllPencils(),this.state=!0,this.ajax.post(this.config.requests.changeState,{state:!0})):(this.config.active=!0,this.ajax.post(this.config.requests.changeState,{state:!0,response:!0},(function(response){var JSONObject=eval(response.response);_this.boot(JSONObject,!0)})))},toggle:function(){!1===this.state?this.enable():this.destroy()},destroy:function(){_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.hideAllPencils(),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__.a.turnOffAllEditors(),this.state=!1,this.ajax.post(this.config.requests.changeState,{state:!1})},refresh:function(){_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a.getTranslatableElements(),this.pencils.refresh()},pushPointerElement:function(e,t,n){if(!e.hasPointer){for(var a in e.hasPointer=!0,e._pointerSettings={type:t},e.getPointerSetting=function(e){return this._pointerSettings[e]},e.setPointerSetting=function(e,t){this._pointerSettings[e]=t},n)e.setPointerSetting(a,n[a]);this.matchedElements.push(e)}},ajax:_Editor_Ajax__WEBPACK_IMPORTED_MODULE_3__.a,allMatchedElements:function(e){if(!e)return this.matchedElements;for(var t=[],n=0;n<this.matchedElements.length;n++)this.matchedElements[n].getPointerSetting("type")==e&&t.push(this.matchedElements[n]);return t}},window.addEventListener("load",(function(){CAEditor.init(window.CATranslates)}))}()},function(e,t){}]);