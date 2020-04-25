!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=8)}([function(e,t,n){"use strict";t.a={hasClass:function(e,t){return!(!e||!e.className)&&(e.className||"").split(" ").indexOf(t)>-1},addClass:function(e,t){e&&e.className&&!1===this.hasClass(e,t)&&(e.className+=" "+t)},removeClass:function(e,t){if(e&&e.className&&!0===this.hasClass(e,t)){var n=(e.className||"").split(" ");n.splice(n.indexOf(t),1),e.className=n.join(" ")}},htmlspecialchars:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))},htmlspecialcharsDecode:function(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g,(function(e){return t[e]}))}}},function(e,t,n){"use strict";var i={MutationObserver:window.MutationObserver||window.WebKitMutationObserver,observeDOM:function(e,t){if(e&&1!==!e.nodeType){var n,i=function(e){n&&clearTimeout(n),n=setTimeout((function(){t(e)}),1)};if(this.MutationObserver)new this.MutationObserver((function(e,t){i(e)})).observe(e,{attributes:!0,childList:!0,subtree:!0});else window.addEventListener&&(e.addEventListener("DOMNodeInserted",i,!1),e.addEventListener("DOMAttrModified",i,!1),e.addEventListener("DOMNodeRemoved",i,!1))}},observeNewElements:function(){this.observeDOM(document.body,(function(e){CAEditor.refresh();for(var t=0;t<e.length;t++)for(var n=0;n<e[t].removedNodes.length;n++)e[t].removedNodes[n]._CAPencil&&e[t].removedNodes[n]._CAPencil.remove()}))}},a=n(0),r=(n(5),{wrapperId:"CAE_Pencils__wrapper",wrapperTooltipNavbar:"CAE_Pencils__tooltip_wrapper",className:"CAE_Pencil",classNameMultiple:"CAE_Pencil--multiple",classNameSaved:"CAE_Pencil--saved",classNameHidden:"CAE_Pencil--hidden",classNameMoving:"CAE_Pencil--moving",classNameAppears:"CAE_Pencil--appears",classNameError:"CAE_Pencil--error",classNameActive:"CAE_Pencil--active",classNameLoading:"CAE_Pencil--loading",classNameIcon:"CAE_Pencil--icon",classNameImage:"CAE_Pencil--image",classNameLinkable:"CAE_Pencil--linkable",classNameSubmenu:"CAE_Pencil--subpointers",pointersWrapper:null,init:function(){this.createPointersWrapper(),this.initHovers(),this.registerClicks(),this.registerResize(),this.registerScroll(),this.buildPencils(),i.observeNewElements()},refresh:function(){this.buildPencils()},createPointersWrapper:function(){var e=document.createElement("div");e.id=r.wrapperId,document.getElementsByTagName("body")[0].appendChild(e),this.pointersWrapper=e},buildPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];t._CAPencil?this.bindPosition(t):(t._CAPencil=this.createPencil(t,e),this.bindPosition(t))}},initHovers:function(){for(var e=this,t=document.getElementsByTagName("*"),n=function(t){var n=t.target,i=n.getElementsByTagName("*"),a=[];n._CAPencil&&a.push(n);for(var r=0;r<i.length;r++)i[r]._CAPencil&&a.push(i[r]);for(r=0;r<a.length;r++)e.observePencilMovement(a[r])},i=0;i<t.length;i++)t[i].addEventListener("mouseenter",n),t[i].addEventListener("mouseleave",n)},observePencilMovement:function(e){var t=this,n=null;a.a.addClass(e._CAPencil,this.classNameMoving),function i(){var s,o;if("#text"==e.nodeName){var l=document.createRange();l.selectNodeContents(e),s=l.getClientRects()[0],o=e.parentElement?getComputedStyle(e.parentElement):{}}else s=e.getBoundingClientRect(),o=getComputedStyle(e);var d=s?[s.x,s.y,o.opacity,o.visibility].join("-"):null;s&&n!=d?(r.bindPosition(e),n=d,setTimeout(i,100)):a.a.removeClass(e._CAPencil,t.classNameMoving)}()},placeCaretAtEnd:function(e){if(e.focus(),void 0!==window.getSelection&&void 0!==document.createRange){var t=document.createRange();t.selectNodeContents(e),t.collapse(!1);var n=window.getSelection();n.removeAllRanges(),n.addRange(t)}else if(void 0!==document.body.createTextRange){var i=document.body.createTextRange();i.moveToElementText(e),i.collapse(!1),i.select()}},registerClicks:function(){var e=this;document.body.addEventListener("click",(function(t){for(var n=t.pageX,i=t.pageY,s=document.getElementsByTagName("*"),o=[],l=0;l<s.length;l++){var d=s[l].getBoundingClientRect(),c={top:d.top+window.scrollY,left:d.left+window.scrollX},u={x:[c.left,c.left+s[l].offsetWidth],y:[c.top,c.top+s[l].offsetHeight]};n>=u.x[0]&&n<=u.x[1]&&i>=u.y[0]&&i<=u.y[1]&&o.push(s[l])}for(l=0;l<o.length;l++)if(a.a.hasClass(o[l],r.className))return r.onClick(o[l]),t.preventDefault(),void e.removeAdditionalPointers(null,t.originalPointer||o[l]);return e.removeAdditionalPointers(),!1})),document.body.addEventListener("mouseup",(function(t){CAEditor.allMatchedElements().forEach((function(t){e.observePencilMovement(t)}))}))},registerResize:function(){var e,t=this;window.addEventListener("resize",(function(){e&&clearTimeout(e),e=setTimeout(t.repaintPencils,100)}))},registerScroll:function(){var e,t=this;window.addEventListener("scroll",(function(){e&&clearTimeout(e),e=setTimeout(t.repaintPencils,30)}))},onClick:function(e){var t=e._CAElement,n=Object.keys(t.getPointerSettings()),i=t.getPointerSetting("onPointerClick",e.pointerType||(1==n.length?n[0]:null));if(a.a.removeClass(e,r.classNameError),i)i(t,e);else if(n.length>1){if(this.removeAdditionalPointers(e))return;a.a.addClass(e,r.classNameSubmenu);for(var s=parseInt(e.offsetWidth/2)+10,o=0;o<n.length;o++){var l=this.createPencil(t,null,n[o]);e.additionalPointers.push(l),l.originalPointer=e,l.leftOffset=l.offsetWidth/2+s,l.style.left=e.style.left,l.pointerType=n[o],this.bindPosition(t,l),s+=l.offsetWidth+10}}},removeAdditionalPointers:function(e,t){var n=!1;if(!e)for(var i=0;i<CAEditor.matchedElements.length;i++){var s=CAEditor.matchedElements[i]._CAPencil.additionalPointers;if(s&&s.length>0){e=CAEditor.matchedElements[i]._CAPencil;break}}if(e&&e!==t){if(e.additionalPointers&&e.additionalPointers.length>0)for(i=0;i<e.additionalPointers.length;i++)e.additionalPointers[i].style.left=e.style.left,setTimeout(function(){this.remove()}.bind(e.additionalPointers[i]),200),n=!0;return e.additionalPointers=[],a.a.removeClass(e,r.classNameSubmenu),n}},repaintPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++)r.bindPosition(CAEditor.matchedElements[e])},createPencil:function(e,t,n){var i=Object.keys(e.getPointerSettings()),a=document.createElement("div");return a.setAttribute("data-key",t),a.className=r.className+(i.length>1&&!n?" "+r.classNameMultiple:""),a._CAElement=e,e.getAllPointerSetting("onPointerCreate",n).forEach((function(t){t&&t(a,e)})),this.pointersWrapper.appendChild(a),a},bindPosition:function(e,t){if(void 0!==(t=t||e._CAPencil)){var n,i=!1,a=!1,r=e.getBoundingClientRect?e.getBoundingClientRect():null,s=r?r.x:null,o=r?r.y:null,l="#text"==e.nodeName?e:1==e.childNodes.length?e.firstChild:null;if(l){var d=document.createRange();d.selectNodeContents(l),n=d.getClientRects()}if(n&&n.length>0)s=n[0].x+n[0].width,o=n[0].y;else if(r){var c=getComputedStyle(e),u=c["text-align"],m=parseFloat(c["padding-left"].replace("px","")),f=parseFloat(c["padding-right"].replace("px",""));if(s+=m,o+=parseFloat(c["padding-top"].replace("px","")),"IMG"===e.nodeName){s+=e.getBoundingClientRect().width;var p=window.outerWidth;s>=p&&s<=p+20&&(s=p-20)}else s-=20,"center"==u&&(s+=(e.offsetWidth-m-f)/2)}var _=this.isPositionFixed(e);if(i||(i=(a=!o||!s||0==o||0==s)||this.isHiddenElement(e)),t.leftOffset&&(s+=t.leftOffset),t.style.position=_?"fixed":"absolute",t.style.left=(_?0:window.scrollX)+s+"px",t.style.top=(_?0:window.scrollY)+o-20+"px",t.style.display&&"none"!=t.style.display&&i&&!a)e.getAllPointerSetting("onPointerHide").forEach((function(n){n(e,t)})),t.disappearTimaout&&clearTimeout(t.disappearTimaout),t.disappearTimaout=setTimeout((function(){t.style.display=i?"none":"block"}),750);else t.style.display=i?"none":"block",i||clearTimeout(t.disappearTimaout);if(this.setPencilZindex(e,t),t.additionalPointers&&t.additionalPointers.length)for(var h=0;h<t.additionalPointers.length;h++)this.bindPosition(e,t.additionalPointers[h])}},isPositionFixed:function(e,t){for(var n=!1;e.parentElement;){if("fixed"==(1==e.nodeType?window.document.defaultView.getComputedStyle(e).position:null)){n=!0;break}e=e.parentElement}return n},isHiddenElement:function(e,t){for(var n=this,a=!1;e.parentElement;){var r=1==e.nodeType?window.document.defaultView.getComputedStyle(e):null;if(r&&(r.opacity<.2||"hidden"==r.visibility)){a=!0,e.observer||(i.observeDOM(e,(function(){n.observePencilMovement(e)})),e.observer=!0);break}e=e.parentElement}return a},setPencilZindex:function(e,t){for(var n="auto";e.parentElement;){var i=1==e.nodeType?parseInt(window.document.defaultView.getComputedStyle(e).zIndex):NaN;e=e.parentElement,isNaN(i)||i<0||(n=i)}t.style.zIndex=n},hideAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&a.a.addClass(t,r.classNameHidden)}},showAllPencils:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e]._CAPencil;t&&(a.a.removeClass(t,r.classNameHidden),this.bindPosition(CAEditor.matchedElements[e]))}}});t.a=r},function(e,t,n){"use strict";var i=n(0),a=n(1),r=n(3),s={inlineClass:"CAE__InlineWrapper",hasAllowedFormation:function(e){return CAEditor.translatable.rawTranslates.indexOf(e.getPointerSetting("originalTranslate","translatable"))>-1},isDisabledFormationActionEvent:function(e,t){if(this.hasAllowedFormation(e.target))return 13==e.keyCode&&(document.execCommand("insertHTML",!1,"<br>"),e.preventDefault()),!0;var n=!0;if(13==e.keyCode)return this.turnOffEditor(t),!1;if(e.ctrlKey||e.metaKey)switch(e.keyCode){case 66:case 98:n=!1;break;case 73:case 105:n=!1;break;case 85:case 117:n=!1}return n},allowFormatingByTranslateType:function(e){var t=this;e.addEventListener("keydown",(function(n){!1===t.isDisabledFormationActionEvent(n,e)&&n.preventDefault()}))},fixEmptyStrings:function(e){e.addEventListener("keydown",(function(e){setTimeout((function(){7==e.target.innerHTML.length&&"&nbsp;"==e.target.innerHTML.substr(-6)&&(e.target.innerHTML=e.target.innerHTML.substr(0,e.target.innerHTML.length-6),CAEditor.pencils.placeCaretAtEnd(e.target)),""===e.target.innerHTML&&(e.target.innerHTML="&nbsp;")}),1)}))},disableRichPaste:function(e){e.addEventListener("paste",(function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)}))},enableAutoSave:function(e){e.addEventListener("keyup",(function(t){var n=e._CAPencil;i.a.removeClass(n,CAEditor.pencils.classNameSaved),CAEditor.pencils.repaintPencils(),r.a.updateTranslation(e)}))},makeEditableNode:function(e,t){if("#text"==e.nodeName&&e.getPointerSetting("originalTranslate","translatable")){var n=document.createElement("div");n.className=this.inlineClass,e.parentNode.insertBefore(n,e),n.appendChild(e),e=n}e.innerHTML=t,e.contentEditable=!0,CAEditor.pencils.placeCaretAtEnd(e),i.a.addClass(e._CAPencil,a.a.classNameActive),e.hasBindedEvents||(e.hasBindedEvents=!0,this.allowFormatingByTranslateType(e),this.fixEmptyStrings(e),this.disableRichPaste(e),this.enableAutoSave(e),this.onUnblur(e),this.onClick(e))},onUnblur:function(e){var t=this;e.addEventListener("blur",(function(n){t.turnOffEditor(e)}))},onClick:function(e){e.addEventListener("click",(function(e){1==e.target.isContentEditable&&e.preventDefault()}))},turnOffAllEditors:function(){for(var e=0;e<CAEditor.matchedElements.length;e++){var t=CAEditor.matchedElements[e];this.turnOffEditor(t)}},turnOffEditor:function(e){1==e.isContentEditable&&(e.contentEditable=!1,i.a.removeClass(e._CAPencil,a.a.classNameActive))}};t.a=s},function(e,t,n){"use strict";var i=n(2),a=n(0),r=n(1);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o={allTranslates:null,rawTranslates:null,translatedTree:[],duplicates:[],maxTranslateLength:0,boot:function(e,t){"object"===s(e)&&e.translates&&1==t&&(CAEditor.config.translatable=!0),!1!==CAEditor.config.translatable&&(this.allTranslates=e.translates.messages?e.translates.messages[""]:{},this.rawTranslates=e.rawTranslates,this.getTranslationsTree(),this.getTranslatableElements())},registerTranslatableElement:function(e,t){var n=!1;e.hasPointer&&e.hasPointer.indexOf("translatable")>-1||e._isInEditorElement||(n=this.isInEditorElement(e))?n&&(e._isInEditorElement=!0):CAEditor.pushPointerElement(e,"translatable",{originalTranslate:this.translatedTree[t],onPointerCreate:this.events.onPointerCreate.bind(this),onPointerClick:this.events.onPointerClick.bind(this),onPointerHide:this.events.onPointerHide.bind(this)})},getTranslationsTree:function(){var e=[];for(var t in this.allTranslates){var n=this.allTranslates[t][0]||t;n in this.translatedTree&&this.duplicates.push(n),e.length>0&&-1===e.indexOf(n)||(this.translatedTree[n]=t,n.length>this.maxTranslateLength&&(this.maxTranslateLength=n.length))}},getTranslatableElements:function(){for(var e=document.querySelectorAll("*"),t=0;t<e.length;t++){var n=this.nodeValue(e[t]);if(!((n||"").length>1.5*this.maxTranslateLength))if(void 0!==this.translatedTree[n])this.registerTranslatableElement(e[t],n);else for(var i=0;i<e[t].childNodes.length;i++){var a=e[t].childNodes[i];"#text"===a.nodeName&&(n=this.nodeValue(a),1===e[t].childNodes.length&&(a=a.parentElement),void 0!==this.translatedTree[n]&&this.registerTranslatableElement(a,n))}}},nodeValue:function(e){return(("#text"==e.nodeName?e.data:e.innerHTML)||"").replace(new RegExp("&nbsp;","g")," ").trim()},isInEditorElement:function(e){if(e){if(e.hasPointer&&elements.hasPointer.indexOf("translatable")>-1)return!0;if("#text"!=e.nodeName&&""===e.getAttribute("data-crudadmin-editor"))return!0;if(e.parentElement)return this.isInEditorElement(e.parentElement)}return!1},updateTranslation:function(e){var t=this,n={changes:{}},s=this.nodeValue(e);!1===i.a.hasAllowedFormation(e)&&(s=a.a.htmlspecialcharsDecode(s)),n.changes[e.getPointerSetting("originalTranslate","translatable")]=s,this._ajaxSend&&clearTimeout(this._ajaxSend),a.a.removeClass(e._CAPencil,r.a.classNameError),this._ajaxSend=setTimeout((function(){var i=CAEditor.config.requests.updateText;CAEditor.ajax.post(i,n,{success:function(t){a.a.addClass(e._CAPencil,r.a.classNameSaved)},error:function(t){a.a.addClass(e._CAPencil,r.a.classNameError)}}),t.updateSameTranslationElements(e)}),500)},updateSameTranslationElements:function(e){for(var t=0;t<CAEditor.matchedElements.length;t++)CAEditor.matchedElements[t].getPointerSetting("originalTranslate","translatable")==e.getPointerSetting("originalTranslate","translatable")&&CAEditor.matchedElements[t]!=e&&(CAEditor.matchedElements[t].innerHTML=e.innerHTML)},isInvisibleElement:function(e){"#text"==e.nodeName&&(e=e.parentElement);var t=window.getComputedStyle(e);return parseInt(t.opacity)<=.5||"hidden"==t.visibility||0==t.fontSize},openAlertModal:function(e,t){var n=prompt(CATranslates.texts.update,t);null!=n&&("#text"==e.nodeName?e.data=n:e.innerHTML=n,CAEditor.pencils.repaintPencils(),this.updateTranslation(e))},events:{onPointerCreate:function(e,t){e.setAttribute("data-translate",t.getPointerSetting("originalTranslate","translatable"))},onPointerClick:function(e,t){var n=this.nodeValue(e);this.duplicates.indexOf(n)>-1?alert(CATranslates.texts.cannotUpdate):(this.isInvisibleElement(e)?this.openAlertModal(e,n):i.a.makeEditableNode(e,n),r.a.removeAdditionalPointers(e._CAPencil))},onPointerHide:function(e,t){if(!0===e.isContentEditable){var n=this.nodeValue(e);i.a.turnOffEditor(e),this.openAlertModal(e,n)}}}};t.a=o},function(e,t,n){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var a={post:function(e,t,n,a){var r=new XMLHttpRequest;r.open("POST",e,!0),r.setRequestHeader("X-CSRF-TOKEN",CAEditor.config.token),t instanceof FormData?r.send(t):(r.setRequestHeader("Content-type","application/json"),r.send(JSON.stringify(t))),r.onreadystatechange=function(){if(n&&4==r.readyState&&200==r.status){if("application/json"==r.getResponseHeader("Content-Type"))try{r.responseJSON=JSON.parse(r.response)}catch(e){console.error(e)}"function"==typeof n&&n(r),"object"==i(n)&&n.success&&n.success(r)}else 4==r.readyState&&("function"==typeof a&&a(r),"object"==i(n)&&n.error&&n.error(r))}}};t.a=a},function(e,t,n){"use strict";var i={wrapperClassName:"CAE_Navigation",init:function(){this.addNavigation(),this.bindTranslatesToggle()},addNavigation:function(){var e=document.createElement("div"),t=__("Režim upravovania"),n=CAEditor.config.enabled?'<li id="CAE_ToggleState">\n                            <label class="CAE_Checkbox CAE_Icons">\n                                '.concat(t,'\n                                <input type="checkbox">\n                                <div><div></div></div>\n                            </label>\n                        </li>'):"";e.className=this.wrapperClassName,e.innerHTML='\n            <div class="CAE_Navigation_button">\n                <button></button>\n                <div class="CAE_Navigation_navbar">\n                    <ul>\n                        <li><a class="CAE_Icons" href="'.concat(CAEditor.config.requests.admin,'" target="_blank">').concat(__("Administrácia webu"),' <i class="CAE_Icon--link"></i></a></li>\n                        ').concat(n,"\n                    </ul>\n                </div>\n            </div>\n        "),document.getElementsByTagName("body")[0].appendChild(e)},bindTranslatesToggle:function(){var e=document.getElementById("CAE_ToggleState");e&&(e.getElementsByTagName("input")[0].checked=CAEditor.config.active,e.addEventListener("change",(function(e){CAEditor.toggle()})))}};t.a=i},function(e,t,n){"use strict";var i=n(4),a=n(1),r=n(0),s={queryKey:"ca_table_name",sizesKey:"sizes",classNameUploadableWrapper:"CAE_Uploadable_wrapper",uploadWrapper:null,imageElement:null,boot:function(){!1!==CAEditor.config.uploadable&&(this.registerAllImages(),this.buildUploadWrapper(),this.bindEvents())},isUploadableImage:function(e){return e&&(e.indexOf("?"+this.queryKey)>-1||e.indexOf("&"+this.queryKey)>-1)},registerAllImages:function(){for(var e=document.getElementsByTagName("img"),t=document.getElementsByTagName("*"),n=0;n<e.length;n++){var i=e[n].src;this.isUploadableImage(i)&&this.registerImageElement(e[n],i)}for(n=0;n<t.length;n++){var a=t[n];if(a.getAttribute("style")&&a.style.backgroundImage){var r=a.style.backgroundImage.replace(/^url\(["']?/,"").replace(/["']?\)$/,"");this.isUploadableImage(r)&&this.registerImageElement(a,r)}}},getQueryPart:function(e,t){var n=e.split(t+"=");return n.length>1?decodeURIComponent(n[1].split("&")[0]):null},registerImageElement:function(e,t){CAEditor.pushPointerElement(e,"uploadable",{defaultUrl:t,onPointerCreate:this.events.onPointerCreate.bind(this),onPointerClick:this.events.onPointerClick.bind(this)})},buildUploadWrapper:function(){if(!this.uploadWrapper){var e=document.createElement("input");e.type="file",e.className=this.classNameUploadableWrapper,document.getElementsByTagName("body")[0].appendChild(e),this.uploadWrapper=e}},buildRequest:function(e){var t=new FormData,n=s.imageElement.getPointerSetting("defaultUrl","uploadable"),i=this.getQueryPart(n,"sizes");return t.append("table",this.getQueryPart(n,this.queryKey)),t.append("key",this.getQueryPart(n,"ca_field_name")),t.append("id",this.getQueryPart(n,"ca_row_id")),t.append(this.getQueryPart(n,"ca_field_name"),e.target.files[0]),t.append("hash",this.getQueryPart(n,"ca_hash")),i&&t.append("sizes",i),t},bindEvents:function(){var e=this;this.uploadWrapper.addEventListener("change",(function(t){0==t.target.files.length&&(s.imageElement=null);var n=s.imageElement._CAPencil;r.a.removeClass(n,a.a.classNameSaved),r.a.addClass(n,a.a.classNameLoading),s.imageElement.style.opacity=.5;var o=e.buildRequest(t),l=function(e){r.a.removeClass(e._CAPencil,a.a.classNameLoading),e.style.opacity=1},d=function(e){r.a.addClass(n,a.a.classNameError),l(s.imageElement),s.imageElement=null};i.a.post(CAEditor.config.requests.updateImage,o,{success:function(t){t.responseJSON?(e.updateImagesWithSameSrc(t,s.imageElement),r.a.addClass(n,a.a.classNameSaved),"IMG"==s.imageElement.nodeName?s.imageElement.onload=function(e){l(e.target),CAEditor.pencils.repaintPencils()}:l(s.imageElement),s.imageElement=null):d()},error:d})}))},updateImagesWithSameSrc:function(e,t){CAEditor.allMatchedElements("uploadable").forEach((function(n){n.getPointerSetting("defaultUrl","uploadable")==t.getPointerSetting("defaultUrl","uploadable")&&("IMG"==n.nodeName?(n.src=e.responseJSON.url,n.srcset&&(n.srcset=e.responseJSON.url+" 1x")):n.style.backgroundImage='url("'+e.responseJSON.url+'")',a.a.removeAdditionalPointers(n._CAPencil))}))},events:{onPointerCreate:function(e,t){r.a.addClass(e,a.a.classNameIcon),r.a.addClass(e,a.a.classNameImage)},onPointerClick:function(e,t){var n=document.createEvent("MouseEvents");n.initEvent("click",!1,!0),s.imageElement=e,this.uploadWrapper.dispatchEvent(n)}}};t.a=s},function(e,t,n){"use strict";n(4);var i=n(1),a=n(0),r={querySeparator:"#ca-linkable=",boot:function(){!1!==CAEditor.config.Linkable&&this.registerAllLinks()},isLinkableUrl:function(e){return e.split(this.querySeparator).length>1},registerAllLinks:function(){for(var e=document.getElementsByTagName("a"),t=0;t<e.length;t++){var n=e[t].href;this.isLinkableUrl(n)&&this.registerLinkableElement(e[t],n)}},registerLinkableElement:function(e,t,n){var i=t.split(this.querySeparator);CAEditor.pushPointerElement(e,"linkable",{defaultUrl:t,rowId:i[i.length-1],onPointerCreate:this.events.onPointerCreate.bind(this),onPointerClick:this.events.onPointerClick.bind(this)})},updateLink:function(e,t){var n={id:e.getPointerSetting("rowId","linkable"),url:t};CAEditor.ajax.post(CAEditor.config.requests.updateLink,n,{success:function(t){a.a.addClass(e._CAPencil,i.a.classNameSaved),i.a.removeAdditionalPointers(e._CAPencil),e.href=t.responseText},error:function(t){a.a.addClass(e._CAPencil,i.a.classNameError)}})},events:{onPointerCreate:function(e,t){a.a.addClass(e,i.a.classNameIcon),a.a.addClass(e,i.a.classNameLinkable)},onPointerClick:function(e,t){document.createEvent("MouseEvents").initEvent("click",!1,!0);var n=e.href.split(this.querySeparator)[0],i=prompt(CATranslates.texts.updateLink,n);r.updateLink(e,i)}}};t.a=r},function(e,t,n){n(9),e.exports=n(10)},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),_Editor_Helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_Editor_Ajax__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4),_Editor_Navigation__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(5),_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(3),_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(6),_Editor_Linkable__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(7);!function(){window.CAEditor={state:!1,config:window.CAEditorConfig,translatable:_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a,uploadable:_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__.a,linkable:_Editor_Linkable__WEBPACK_IMPORTED_MODULE_7__.a,matchedElements:[],pencils:_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a,init:function(e){_Editor_Navigation__WEBPACK_IMPORTED_MODULE_4__.a.init(),!1!==CAEditor.config.active&&this.boot(e)},boot:function(e,t){_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a.boot(e,t),_Editor_Uploadable__WEBPACK_IMPORTED_MODULE_6__.a.boot(),_Editor_Linkable__WEBPACK_IMPORTED_MODULE_7__.a.boot(),this.pencils.init(),this.state=!0},enable:function enable(){var _this=this;!0===this.config.active?(_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.showAllPencils(),this.state=!0,this.ajax.post(this.config.requests.changeState,{state:!0})):(this.config.active=!0,this.ajax.post(this.config.requests.changeState,{state:!0,response:!0},(function(response){var JSONObject=eval(response.response);_this.boot(JSONObject,!0)})))},toggle:function(){!1===this.state?this.enable():this.destroy()},destroy:function(){_Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__.a.hideAllPencils(),_Editor_Editor__WEBPACK_IMPORTED_MODULE_2__.a.turnOffAllEditors(),this.state=!1,this.ajax.post(this.config.requests.changeState,{state:!1})},refresh:function(){_Editor_Translatable__WEBPACK_IMPORTED_MODULE_5__.a.getTranslatableElements(),this.pencils.refresh()},registerPointerProperties:function(e,t){e.hasPointer||(e.hasPointer=[]),e._pointerSettings||(e._pointerSettings={}),e.getPointerSetting||(e.getPointerSetting=function(e,t){if(this._pointerSettings&&this._pointerSettings[t])return this._pointerSettings[t][e]}),e.getAllPointerSetting||(e.getAllPointerSetting=function(e,t){var n=[];for(var i in this._pointerSettings)e in this._pointerSettings[i]&&(t&&t!=i||n.push(this._pointerSettings[i][e]));return n}),e.getPointerSettings||(e.getPointerSettings=function(){return this._pointerSettings}),e.setPointerSetting||(e.setPointerSetting=function(e,t,n){this._pointerSettings[n][e]=t}),e.hasPointer.push(t),e._pointerSettings[t]={}},pushPointerElement:function(e,t,n){if(!(e.hasPointer&&e.hasPointer.indexOf(t)>-1)){for(var i in this.registerPointerProperties(e,t),n)e.setPointerSetting(i,n[i],t);-1===this.matchedElements.indexOf(e)&&this.matchedElements.push(e)}},ajax:_Editor_Ajax__WEBPACK_IMPORTED_MODULE_3__.a,allMatchedElements:function(e){if(!e)return this.matchedElements;for(var t=[],n=0;n<this.matchedElements.length;n++)e in this.matchedElements[n].getPointerSettings()&&t.push(this.matchedElements[n]);return t}},window.addEventListener("load",(function(){CAEditor.init(window.CATranslates)}))}()},function(e,t){}]);