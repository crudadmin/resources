/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Resources/js/plugins/Editor/Editor.js":
/*!***************************************************!*\
  !*** ./src/Resources/js/plugins/Editor/Editor.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helpers */ "./src/Resources/js/plugins/Editor/Helpers.js");
/* harmony import */ var _Pencils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pencils */ "./src/Resources/js/plugins/Editor/Pencils.js");


var Editor = {
  inlineClass: 'CAE__InlineWrapper',
  isDisabledFormationAction: function isDisabledFormationAction(e) {
    //If edited text is raw HTML
    if (CAEditor.rawTranslates.indexOf(e.target._CAOriginTranslate) > -1) {
      //Enter single br on new line
      if (e.keyCode == 13) {
        document.execCommand('insertHTML', false, '<br>');
        e.preventDefault();
      }

      return true;
    }

    var ret = true; //Disable new line

    if (e.keyCode == 13) {
      this.turnOffEditor(element);
      return false;
    }

    if (e.ctrlKey || e.metaKey) {
      switch (e.keyCode) {
        case 66: //ctrl+B or ctrl+b

        case 98:
          ret = false;
          break;

        case 73: //ctrl+I or ctrl+i

        case 105:
          ret = false;
          break;

        case 85: //ctrl+U or ctrl+u

        case 117:
          ret = false;
          break;
      }
    }

    return ret;
  },
  allowFormatingByTranslateType: function allowFormatingByTranslateType(element) {
    var _this = this;

    element.addEventListener('keydown', function (e) {
      //Disable formating
      if (_this.isDisabledFormationAction(e, element) === false) {
        e.preventDefault();
      }
    });
  },
  fixEmptyStrings: function fixEmptyStrings(element) {
    //Add empty string when is neccesary
    element.addEventListener('keydown', function (e) {
      setTimeout(function () {
        //When first char will be typed, remove last empty chart
        if (e.target.innerHTML.length == 7 && e.target.innerHTML.substr(-6) == '&nbsp;') {
          e.target.innerHTML = e.target.innerHTML.substr(0, e.target.innerHTML.length - 6);
          CAEditor.pencils.placeCaretAtEnd(e.target);
        } //Add empty char when element is empty, because browser is buggy


        if (e.target.innerHTML === '') {
          e.target.innerHTML = '&nbsp;';
        }
      }, 1);
    });
  },
  disableRichPaste: function disableRichPaste(element) {
    //Paste as plain text
    element.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    });
  },
  enableAutoSave: function enableAutoSave(element) {
    element.addEventListener('keyup', function (e) {
      var pencil = element._CAPencil; //Remove saved classname

      pencil.className = pencil.className.replace(new RegExp(CAEditor.pencils.classNameSaved, 'g'), '');
      CAEditor.pencils.repaintPencils();
      CAEditor.pencils.updateTranslation(element);
    });
  },
  makeEditableNode: function makeEditableNode(element, actualValue) {
    //If given element is textNode, we need wrap it into inline div
    if (element.nodeName == '#text') {
      var wrapper = document.createElement('div');
      wrapper.className = this.inlineClass;
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      element = wrapper;
    }

    element.innerHTML = actualValue;
    element.contentEditable = true;
    CAEditor.pencils.placeCaretAtEnd(element); //Add active class

    _Helpers__WEBPACK_IMPORTED_MODULE_0__["default"].addClass(element._CAPencil, _Pencils__WEBPACK_IMPORTED_MODULE_1__["default"].classNameActive);

    if (element.hasBindedEvents) {
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
  onUnblur: function onUnblur(element) {
    var _this2 = this;

    element.addEventListener('blur', function (e) {
      _this2.turnOffEditor(element);
    });
  },
  onClick: function onClick(element) {
    element.addEventListener('click', function (e) {
      //If element is editable, disable redirects an all actions
      if (e.target.isContentEditable == true) {
        e.preventDefault();
      }
    });
  },
  turnOffAllEditors: function turnOffAllEditors() {
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      var element = CAEditor.matchedElements[i];
      this.turnOffEditor(element);
    }
  },
  turnOffEditor: function turnOffEditor(element) {
    //If is content editable
    if (element.isContentEditable == true) {
      element.contentEditable = false;
      _Helpers__WEBPACK_IMPORTED_MODULE_0__["default"].removeClass(element._CAPencil, _Pencils__WEBPACK_IMPORTED_MODULE_1__["default"].classNameActive);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Editor);

/***/ }),

/***/ "./src/Resources/js/plugins/Editor/Helpers.js":
/*!****************************************************!*\
  !*** ./src/Resources/js/plugins/Editor/Helpers.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Helpers = {
  hasClass: function hasClass(e, className) {
    var actualClasses = (e.className || '').split(' ');
    return actualClasses.indexOf(className) > -1;
  },
  addClass: function addClass(e, className) {
    //If element does not exists in array
    if (this.hasClass(e, className) === false) {
      e.className += ' ' + className;
    }
  },
  removeClass: function removeClass(e, className) {
    //If element does not exists in array
    if (this.hasClass(e, className) === true) {
      var actualClasses = (e.className || '').split(' ');
      actualClasses.splice(actualClasses.indexOf(className), 1);
      e.className = actualClasses.join(' ');
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Helpers);

/***/ }),

/***/ "./src/Resources/js/plugins/Editor/Navigation.js":
/*!*******************************************************!*\
  !*** ./src/Resources/js/plugins/Editor/Navigation.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Navigation = {
  wrapperClassName: 'CAE_Navigation',
  init: function init() {
    this.addNavigation();
    this.bindTranslatesToggle();
  },
  addNavigation: function addNavigation() {
    var node = document.createElement('div');
    node.className = this.wrapperClassName;
    node.innerHTML = "\n            <div class=\"CAE_Navigation_button\">\n                <button></button>\n                <div class=\"CAE_Navigation_navbar\">\n                    <ul>\n                        <li><a class=\"CAE_Icons\" href=\"".concat(CAEditor.config.requests.admin, "\" target=\"_blank\">Administr\xE1cia webu <i class=\"CAE_Icon--link\"></i></a></li>\n                        <li id=\"CAE_ToggleState\">\n                            <label class=\"CAE_Checkbox CAE_Icons\">\n                                Re\u017Eim prekladate\u013Ea\n                                <input type=\"checkbox\">\n                                <div><div></div></div>\n                            </label>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        ");
    document.getElementsByTagName('body')[0].appendChild(node);
  },
  bindTranslatesToggle: function bindTranslatesToggle() {
    var toggle = document.getElementById('CAE_ToggleState');
    toggle.getElementsByTagName('input')[0].checked = CAEditor.config.active;
    toggle.addEventListener('change', function (e) {
      CAEditor.toggle();
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Navigation);

/***/ }),

/***/ "./src/Resources/js/plugins/Editor/Observer.js":
/*!*****************************************************!*\
  !*** ./src/Resources/js/plugins/Editor/Observer.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Observer = {
  MutationObserver: window.MutationObserver || window.WebKitMutationObserver,
  observeDOM: function observeDOM(obj, originalCallback) {
    if (!obj || !obj.nodeType === 1) return;

    var timeout,
        callback = function callback(mutations) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        originalCallback(mutations);
      }, 1);
    };

    if (this.MutationObserver) {
      // define a new observer
      var obs = new this.MutationObserver(function (mutations, observer) {
        callback(mutations);
      }); // have the observer observe foo for changes in children

      obs.observe(obj, {
        childList: true,
        subtree: true
      });
    } else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  },
  observeNewElements: function observeNewElements() {
    this.observeDOM(document.body, function (e) {
      CAEditor.refresh(); //If removed element had pencil. We need remove pencil.

      for (var i = 0; i < e.length; i++) {
        for (var r = 0; r < e[i].removedNodes.length; r++) {
          if (e[i].removedNodes[r]._CAPencil) {
            e[i].removedNodes[r]._CAPencil.remove();
          }
        }
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Observer);

/***/ }),

/***/ "./src/Resources/js/plugins/Editor/Pencils.js":
/*!****************************************************!*\
  !*** ./src/Resources/js/plugins/Editor/Pencils.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observer */ "./src/Resources/js/plugins/Editor/Observer.js");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor */ "./src/Resources/js/plugins/Editor/Editor.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Helpers */ "./src/Resources/js/plugins/Editor/Helpers.js");



var Pencils = {
  className: 'CAE_Pencil',
  classNameSaved: 'CAE_Pencil--saved',
  classNameHidden: 'CAE_Pencil--hidden',
  classNameMoving: 'CAE_Pencil--moving',
  classNameActive: 'CAE_Pencil--active',
  init: function init() {
    this.initHovers();
    this.registerClicks();
    this.buildPencils();
    _Observer__WEBPACK_IMPORTED_MODULE_0__["default"].observeNewElements();
  },
  refresh: function refresh() {
    this.buildPencils();
  },
  buildPencils: function buildPencils() {
    //Add pencils
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      var element = CAEditor.matchedElements[i]; //If element already has pencil, skip it.
      //Also pdate position of pencil, because element may be deleted.

      if (element._CAPencil) {
        this.bindPosition(element);
        continue;
      }

      element._CAPencil = this.createPencil(element, i);
      this.bindPosition(element);
    }
  },

  /*
   * Check hovers of all elements for creating and hidding pencils.
   * Because on hover elements some pencil may dissapear or may be visible...
   */
  initHovers: function initHovers() {
    var _this = this;

    var allElements = document.getElementsByTagName('*');

    var checkHoverChanges = function checkHoverChanges(e) {
      var hoveredParent = e.target,
          childs = hoveredParent.getElementsByTagName('*'),
          elementsToMove = []; //Add parent element if does have pencil

      if (hoveredParent._CAPencil) {
        elementsToMove.push(hoveredParent);
      } //Add all childs with pencil into potentionaly moved elements


      for (var i = 0; i < childs.length; i++) {
        //If child has pencil
        if (childs[i]._CAPencil) {
          elementsToMove.push(childs[i]);
        }
      } //See for position changed of every element till position wont changes.


      for (var i = 0; i < elementsToMove.length; i++) {
        _this.observePencilMovement(elementsToMove[i]);
      }
    };

    for (var i = 0; i < allElements.length; i++) {
      allElements[i].addEventListener('mouseenter', checkHoverChanges);
      allElements[i].addEventListener('mouseleave', checkHoverChanges);
    }
  },
  observePencilMovement: function observePencilMovement(element) {
    var _this2 = this;

    var prevPositionKey = null,
        checkPosition = function checkPosition() {
      var position = element.getBoundingClientRect(),
          positionKey = position.x + '-' + position.y;

      if (prevPositionKey != positionKey) {
        Pencils.bindPosition(element);
        prevPositionKey = positionKey;
        setTimeout(checkPosition, 100);
      } //Position is not moving
      //We want remove moving class
      else {
          element._CAPencil.className = element._CAPencil.className.replace(_this2.classNameMoving, '').trim();
        }
    };

    if (element._CAPencil.className.indexOf(this.classNameMoving) === -1) {
      element._CAPencil.className += ' ' + this.classNameMoving;
    }

    checkPosition();
  },
  placeCaretAtEnd: function placeCaretAtEnd(el) {
    el.focus();

    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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

  /*
   * We need have this super complicated clics handler, because pencils may not be visible in some ceses.
   * That's why pencils are user-select none. And not all the time are on the top of z-index.
   */
  registerClicks: function registerClicks() {
    document.body.addEventListener('click', function (e) {
      var clickX = e.pageX,
          clickY = e.pageY,
          allElements = document.getElementsByTagName('*'),
          list = [];

      for (var i = 0; i < allElements.length; i++) {
        var rect = allElements[i].getBoundingClientRect(),
            offset = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        },
            range = {
          x: [offset.left, offset.left + allElements[i].offsetWidth],
          y: [offset.top, offset.top + allElements[i].offsetHeight]
        };

        if (clickX >= range.x[0] && clickX <= range.x[1] && clickY >= range.y[0] && clickY <= range.y[1]) {
          list.push(allElements[i]);
        }
      }

      for (var i = 0; i < list.length; i++) {
        //Check if is pencil element
        if (_Helpers__WEBPACK_IMPORTED_MODULE_2__["default"].hasClass(list[i], Pencils.className)) {
          Pencils.onClick(list[i]);
          e.preventDefault();
          break;
        }
      }

      return false;
    });
  },
  isInvisibleElement: function isInvisibleElement(element) {
    //If is textNode
    if (element.nodeName == '#text') {
      element = element.parentElement;
    }

    var css = window.getComputedStyle(element),
        opacity = parseInt(css.opacity); //If is invisible element

    if (opacity <= 0.5) {
      return true;
    }

    return false;
  },
  onClick: function onClick(pencil) {
    var element = pencil._CAElement,
        actualValue = CAEditor.nodeValue(element); //We cant allow update duplicate translates. Because change may be updated on right source translate.

    if (CAEditor.duplicates.indexOf(actualValue) > -1) {
      alert(CAEditor.texts.cannotUpdate);
      return;
    } //Invisible element cannot be edited in editor style


    if (this.isInvisibleElement(element)) {
      this.openAlertModal(element, actualValue);
    } else {
      _Editor__WEBPACK_IMPORTED_MODULE_1__["default"].makeEditableNode(element, actualValue);
    }
  },
  openAlertModal: function openAlertModal(element, actualValue) {
    var newText = prompt(CATranslates.texts.update, actualValue); //On cancel

    if (newText == null) {
      return;
    } //We need update node, or innerHTML tag value


    if (element.nodeName == '#text') {
      element.data = newText;
    } else {
      element.innerHTML = newText;
    }

    Pencils.repaintPencils();
    Pencils.updateTranslation(element);
  },
  updateSameTranslationElements: function updateSameTranslationElements(element) {
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      if (CAEditor.matchedElements[i]._CAOriginTranslate == element._CAOriginTranslate) {
        if (CAEditor.matchedElements[i] != element) {
          CAEditor.matchedElements[i].innerHTML = element.innerHTML;
        }
      }
    }
  },
  repaintPencils: function repaintPencils() {
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      Pencils.bindPosition(CAEditor.matchedElements[i]);
    }
  },
  createPencil: function createPencil(element, key) {
    var e = document.createElement('div');
    e.setAttribute('data-key', key);
    e.setAttribute('data-translate', element._CAOriginTranslate);
    e.className = Pencils.className;
    e._CAElement = element;
    document.getElementsByTagName('body')[0].appendChild(e);
    return e;
  },
  bindPosition: function bindPosition(element) {
    var pencil = element._CAPencil,
        pencilHeight = 20,
        pencilWidth = 20; //If element does not have pencil

    if (pencil === undefined) {
      return;
    } //textNode does not have getBoundingClientRect


    var position = element.getBoundingClientRect ? element.getBoundingClientRect() : null,
        positionX = position ? position.x : null,
        positionY = position ? position.y : null; //Get position of text node

    var textNode = element.nodeName == '#text' ? element : element.childNodes.length == 1 ? element.firstChild : null //we want position with elements with one textNode
    ,
        rects; //If textnode is present

    if (textNode) {
      var range = document.createRange();
      range.selectNodeContents(textNode);
      rects = range.getClientRects();
    } //Get real position of textNode


    if (rects && rects.length > 0) {
      positionX = rects[0].x + rects[0].width;
      positionY = rects[0].y;
    } //Try guess position
    else if (position) {
        var styles = getComputedStyle(element),
            textAlign = styles['text-align'],
            paddingLeft = parseFloat(styles['padding-left'].replace('px', '')),
            paddingRight = parseFloat(styles['padding-right'].replace('px', '')),
            paddingTop = parseFloat(styles['padding-top'].replace('px', '')); //Add paddings offset

        positionX += paddingLeft;
        positionY += paddingTop; //Icons are aligned on the left, so we need move pencil to the edge

        positionX -= pencilWidth; //Point pencil on center of text

        if (textAlign == 'center') {
          positionX += (element.offsetWidth - paddingLeft - paddingRight) / 2;
        }
      }

    pencil.style.left = window.scrollX + positionX + 'px';
    pencil.style.top = window.scrollY + positionY - pencilHeight + 'px'; //Check if element is visible

    pencil.style.display = !positionY || !positionX || positionY == 0 || positionX === 0 ? 'none' : 'block'; //Automatically set zIndex of point

    this.setPencilZindex(element, pencil);
  },
  setPencilZindex: function setPencilZindex(element, pencil) {
    var maxZindex = 'auto';

    while (element.parentElement) {
      var zIndex = element.nodeType == 1 ? parseInt(window.document.defaultView.getComputedStyle(element).zIndex) : NaN;
      element = element.parentElement;

      if (isNaN(zIndex)) {
        continue;
      }

      maxZindex = zIndex;
    }

    pencil.style.zIndex = maxZindex;
  },
  updateTranslation: function updateTranslation(e) {
    var data = {
      changes: {}
    };
    data.changes[e._CAOriginTranslate] = CAEditor.nodeValue(e); //Clear previous key change

    if (this._ajaxSend) {
      clearTimeout(this._ajaxSend);
    }

    this._ajaxSend = setTimeout(function () {
      var url = CAEditor.config.requests.updateText;
      CAEditor.ajax.post(url, data, function (xhr) {
        e._CAPencil.className += ' ' + Pencils.classNameSaved;
      });
      Pencils.updateSameTranslationElements(e);
    }, 500);
  },
  hideAllPencils: function hideAllPencils() {
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      var pencil = CAEditor.matchedElements[i]._CAPencil; //We need remove all pencils

      if (pencil) {
        pencil.className += ' ' + Pencils.classNameHidden;
      }
    }
  },
  showAllPencils: function showAllPencils() {
    for (var i = 0; i < CAEditor.matchedElements.length; i++) {
      var pencil = CAEditor.matchedElements[i]._CAPencil; //We need remove all pencils

      if (pencil) {
        pencil.className = pencil.className.replace(new RegExp(Pencils.classNameHidden, 'g'), '');
        this.bindPosition(CAEditor.matchedElements[i]);
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Pencils);

/***/ }),

/***/ "./src/Resources/js/plugins/TranslatableEditor.js":
/*!********************************************************!*\
  !*** ./src/Resources/js/plugins/TranslatableEditor.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor/Pencils */ "./src/Resources/js/plugins/Editor/Pencils.js");
/* harmony import */ var _Editor_Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor/Editor */ "./src/Resources/js/plugins/Editor/Editor.js");
/* harmony import */ var _Editor_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Editor/Navigation */ "./src/Resources/js/plugins/Editor/Navigation.js");



/*
 * CrudAdmin auto translatable
 */

(function () {
  window.CAEditor = {
    state: false,
    config: window.CAEditorConfig,
    allTranslates: null,
    rawTranslates: null,
    translatedTree: [],
    duplicates: [],
    matchedElements: [],
    maxTranslateLength: 0,
    init: function init(TAObject) {
      _Editor_Navigation__WEBPACK_IMPORTED_MODULE_2__["default"].init();
      this.bootTranslates(TAObject);
    },
    bootTranslates: function bootTranslates(TAObject) {
      //Bind given translates
      this.allTranslates = TAObject.translates.messages ? TAObject.translates.messages[''] : {};
      this.rawTranslates = TAObject.rawTranslates; //Editor is not allowed

      if (this.config.active === false) {
        return;
      }

      this.getTranslationsTree();
      this.getTranslatableElements();
      this.pencils.init();
      this.state = true;
    },
    enable: function enable() {
      //If editor has been booted already, pencils are just hidden, so we need show them.
      if (this.config.active === true) {
        _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__["default"].showAllPencils();
        this.state = true; //Send ajax that state is on

        this.ajax.post(this.config.requests.changeState, {
          state: true
        });
      } else {
        //We need set active/boot status to true
        this.config.active = true; //Turn on state and get the newest translates with all raw texts

        this.ajax.post(this.config.requests.changeState, {
          state: true,
          response: true
        }, function (response) {
          CAEditor.bootTranslates(eval(response.response));
        });
      }
    },
    toggle: function toggle() {
      if (this.state === false) {
        this.enable();
      } else {
        this.destroy();
      }
    },
    destroy: function destroy() {
      _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__["default"].hideAllPencils();
      _Editor_Editor__WEBPACK_IMPORTED_MODULE_1__["default"].turnOffAllEditors();
      this.state = false; //Turn of state

      this.ajax.post(this.config.requests.changeState, {
        state: false
      });
    },
    refresh: function refresh() {
      this.getTranslatableElements();
      this.pencils.refresh();
    },

    /*
     * We want build tree with keys as translations and values as original texts.
     * For better performance for searching elements.
     */
    getTranslationsTree: function getTranslationsTree() {
      //Build translates tree
      for (var key in this.allTranslates) {
        var translate = this.allTranslates[key][0] || key; //We need save duplicate translates

        if (translate in this.translatedTree) {
          this.duplicates.push(translate);
        }

        this.translatedTree[translate] = key;

        if (translate.length > this.maxTranslateLength) {
          this.maxTranslateLength = translate.length;
        }
      }
    },
    nodeValue: function nodeValue(e) {
      var value = e.nodeName == '#text' ? e.data : e.innerHTML,
          value = value || ''; //We need replace &nbsp; for empty spaces. Because if we push empty chart
      //it will change to this encoded value.

      value = value.replace(new RegExp('&nbsp;', 'g'), ' ');
      return value.trim();
    },
    getTranslatableElements: function getTranslatableElements() {
      var elements = document.querySelectorAll('*'); //Get all elements with innerhtml from translates

      for (var i = 0; i < elements.length; i++) {
        var html = this.nodeValue(elements[i]); //We want skip longer texts than 50%
        //Because some tags may be encoded...

        if ((html || '').length > this.maxTranslateLength * 1.5) {
          continue;
        } //Add element into array if has not been added already and has translation


        if (this.translatedTree[html] !== undefined) {
          this.registerTranslatableElement(elements[i], html);
        } else {
          for (var n = 0; n < elements[i].childNodes.length; n++) {
            var node = elements[i].childNodes[n];

            if (node.nodeName !== '#text') {
              continue;
            }

            html = this.nodeValue(node);

            if (this.translatedTree[html] !== undefined) {
              this.registerTranslatableElement(node, html);
            }
          }
        }
      }
    },
    isInEditorElement: function isInEditorElement(element) {
      if (element) {
        if (element._CAOriginTranslate) {
          return true;
        }

        if (element.nodeName != '#text' && element.getAttribute('data-crudadmin-editor') === '') {
          return true;
        }

        if (element.parentElement) {
          return this.isInEditorElement(element.parentElement);
        }
      }

      return false;
    },
    registerTranslatableElement: function registerTranslatableElement(element, html) {
      var isTextFromEditor = false; //Element has been registered already

      if (element._CAOriginTranslate || (isTextFromEditor = this.isInEditorElement(element))) {
        //Prevent check next time...
        if (isTextFromEditor) {
          element._CAOriginTranslate = true;
        }

        return;
      } //Bind original translate into element property


      element._CAOriginTranslate = this.translatedTree[html];
      this.matchedElements.push(element);
    },
    pencils: _Editor_Pencils__WEBPACK_IMPORTED_MODULE_0__["default"],
    ajax: {
      post: function post(url, data, callback) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.setRequestHeader('X-CSRF-TOKEN', CAEditor.config.token);
        request.send(JSON.stringify(data));

        request.onreadystatechange = function () {
          if (callback && request.readyState == 4 && request.status == 200) {
            callback(request);
          }
        };
      }
    }
  };
  window.addEventListener('load', function () {
    CAEditor.init(window.CATranslates);
  });
})();

/***/ }),

/***/ "./src/Resources/sass/frontend.scss":
/*!******************************************!*\
  !*** ./src/Resources/sass/frontend.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************************************!*\
  !*** multi ./src/Resources/js/plugins/TranslatableEditor.js ./src/Resources/sass/frontend.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/js/plugins/TranslatableEditor.js */"./src/Resources/js/plugins/TranslatableEditor.js");
module.exports = __webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/sass/frontend.scss */"./src/Resources/sass/frontend.scss");


/***/ })

/******/ });