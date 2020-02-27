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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sprintf-js/src/sprintf.js":
/*!************************************************!*\
  !*** ./node_modules/sprintf-js/src/sprintf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                    break
                    case "c":
                        arg = String.fromCharCode(arg)
                    break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                    break
                    case "j":
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                    break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                    break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                    break
                    case "g":
                        arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                    break
                    case "o":
                        arg = arg.toString(8)
                    break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                    break
                    case "u":
                        arg = arg >>> 0
                    break
                    case "x":
                        arg = arg.toString(16)
                    break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                    break
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-"
                        arg = arg.toString().replace(re.sign, "")
                    }
                    else {
                        sign = ""
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                    output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (true) {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {}
})(typeof window === "undefined" ? this : window);


/***/ }),

/***/ "./src/Resources/js/plugins/Gettextable.js":
/*!*************************************************!*\
  !*** ./src/Resources/js/plugins/Gettextable.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * CrudAdmin Binder into global variables and VueJS 2
 * for simple global scope integration into VueJs use Vue.use(Gettext)
 */
(function () {
  var a = new Translator(CATranslates.translates),
      selectors = Object.keys(a.__proto__).concat(['_', 'Gettext']),
      getSelector = function getSelector(selector) {
    return function () {
      var s = selector in a ? selector : '__';
      return a[s].apply(a, arguments);
    };
  };

  selectors.map(function (selector) {
    //If window variable is used, for example by lodash library
    if (selector in window) {
      return;
    }

    var f = window[selector] = getSelector(selector); //Vue.js installation

    f.install = function (Vue, options) {
      for (var i = 0; i < selectors.length; i++) {
        Vue.prototype[selectors[i]] = getSelector(selectors[i]);
      }
    };
  });
  window.GettextTranslates = a;
})();

/***/ }),

/***/ "./src/Resources/js/plugins/Gettextable/Plugins.js":
/*!*********************************************************!*\
  !*** ./src/Resources/js/plugins/Gettextable/Plugins.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! sprintf-js v1.1.1 | Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro> | BSD-3-Clause */
!function () {
  "use strict";

  function e(e) {
    return r(n(e), arguments);
  }

  function t(t, r) {
    return e.apply(null, [t].concat(r || []));
  }

  function r(t, r) {
    var n,
        i,
        a,
        o,
        p,
        c,
        u,
        f,
        l,
        d = 1,
        g = t.length,
        b = "";

    for (i = 0; i < g; i++) {
      if ("string" == typeof t[i]) b += t[i];else if (Array.isArray(t[i])) {
        if ((o = t[i])[2]) for (n = r[d], a = 0; a < o[2].length; a++) {
          if (!n.hasOwnProperty(o[2][a])) throw new Error(e('[sprintf] property "%s" does not exist', o[2][a]));
          n = n[o[2][a]];
        } else n = o[1] ? r[o[1]] : r[d++];
        if (s.not_type.test(o[8]) && s.not_primitive.test(o[8]) && n instanceof Function && (n = n()), s.numeric_arg.test(o[8]) && "number" != typeof n && isNaN(n)) throw new TypeError(e("[sprintf] expecting number but found %T", n));

        switch (s.number.test(o[8]) && (f = n >= 0), o[8]) {
          case "b":
            n = parseInt(n, 10).toString(2);
            break;

          case "c":
            n = String.fromCharCode(parseInt(n, 10));
            break;

          case "d":
          case "i":
            n = parseInt(n, 10);
            break;

          case "j":
            n = JSON.stringify(n, null, o[6] ? parseInt(o[6]) : 0);
            break;

          case "e":
            n = o[7] ? parseFloat(n).toExponential(o[7]) : parseFloat(n).toExponential();
            break;

          case "f":
            n = o[7] ? parseFloat(n).toFixed(o[7]) : parseFloat(n);
            break;

          case "g":
            n = o[7] ? String(Number(n.toPrecision(o[7]))) : parseFloat(n);
            break;

          case "o":
            n = (parseInt(n, 10) >>> 0).toString(8);
            break;

          case "s":
            n = String(n), n = o[7] ? n.substring(0, o[7]) : n;
            break;

          case "t":
            n = String(!!n), n = o[7] ? n.substring(0, o[7]) : n;
            break;

          case "T":
            n = Object.prototype.toString.call(n).slice(8, -1).toLowerCase(), n = o[7] ? n.substring(0, o[7]) : n;
            break;

          case "u":
            n = parseInt(n, 10) >>> 0;
            break;

          case "v":
            n = n.valueOf(), n = o[7] ? n.substring(0, o[7]) : n;
            break;

          case "x":
            n = (parseInt(n, 10) >>> 0).toString(16);
            break;

          case "X":
            n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase();
        }

        s.json.test(o[8]) ? b += n : (!s.number.test(o[8]) || f && !o[3] ? l = "" : (l = f ? "+" : "-", n = n.toString().replace(s.sign, "")), c = o[4] ? "0" === o[4] ? "0" : o[4].charAt(1) : " ", u = o[6] - (l + n).length, p = o[6] && u > 0 ? c.repeat(u) : "", b += o[5] ? l + n + p : "0" === c ? l + p + n : p + l + n);
      }
    }

    return b;
  }

  function n(e) {
    if (i[e]) return i[e];

    for (var t, r = e, n = [], a = 0; r;) {
      if (null !== (t = s.text.exec(r))) n.push(t[0]);else if (null !== (t = s.modulo.exec(r))) n.push("%");else {
        if (null === (t = s.placeholder.exec(r))) throw new SyntaxError("[sprintf] unexpected placeholder");

        if (t[2]) {
          a |= 1;
          var o = [],
              p = t[2],
              c = [];
          if (null === (c = s.key.exec(p))) throw new SyntaxError("[sprintf] failed to parse named argument key");

          for (o.push(c[1]); "" !== (p = p.substring(c[0].length));) {
            if (null !== (c = s.key_access.exec(p))) o.push(c[1]);else {
              if (null === (c = s.index_access.exec(p))) throw new SyntaxError("[sprintf] failed to parse named argument key");
              o.push(c[1]);
            }
          }

          t[2] = o;
        } else a |= 2;

        if (3 === a) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
        n.push(t);
      }
      r = r.substring(t[0].length);
    }

    return i[e] = n;
  }

  var s = {
    not_string: /[^s]/,
    not_bool: /[^t]/,
    not_type: /[^T]/,
    not_primitive: /[^v]/,
    number: /[diefg]/,
    numeric_arg: /[bcdiefguxX]/,
    json: /[j]/,
    not_json: /[^j]/,
    text: /^[^\x25]+/,
    modulo: /^\x25{2}/,
    placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
    key: /^([a-z_][a-z_\d]*)/i,
    key_access: /^\.([a-z_][a-z_\d]*)/i,
    index_access: /^\[(\d+)\]/,
    sign: /^[\+\-]/
  },
      i = Object.create(null);
   true && (exports.sprintf = e, exports.vsprintf = t), "undefined" != typeof window && (window.sprintf = e, window.vsprintf = t,  true && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return {
      sprintf: e,
      vsprintf: t
    };
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
}();
/* https://github.com/oscarotero/Gettext */

!function (t, n) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (t) {
    return n(t.vsprintf);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (t) {
  function n(t) {
    this.dictionary = {}, this.plurals = {}, this.domain = null, t && this.loadTranslations(t);
  }

  function e(t, n, e, i) {
    return e = e || "", !!(t[n] && t[n][e] && t[n][e][i]) && t[n][e][i];
  }

  function i(n, e) {
    return e.length ? e[0] instanceof Array ? t(n, e[0]) : t(n, e) : n;
  }

  return n.prototype = {
    loadTranslations: function loadTranslations(t) {
      var n = t.domain || "";
      if (null === this.domain && (this.domain = n), this.dictionary[n]) return function (t, n) {
        for (var e in n) {
          if (t[e]) for (var i in n[e]) {
            t[e][i] = n[e][i];
          } else t[e] = n[e];
        }
      }(this.dictionary[n], t.messages), this;
      if (t.fn) this.plurals[n] = {
        fn: t.fn
      };else if (t["plural-forms"]) {
        var e = t["plural-forms"].split(";", 2);
        this.plurals[n] = {
          count: parseInt(e[0].replace("nplurals=", "")),
          code: e[1].replace("plural=", "return ") + ";"
        };
      }
      return this.dictionary[n] = t.messages, this;
    },
    defaultDomain: function defaultDomain(t) {
      return this.domain = t, this;
    },
    gettext: function gettext(t) {
      return this.dpgettext(this.domain, null, t);
    },
    ngettext: function ngettext(t, n, e) {
      return this.dnpgettext(this.domain, null, t, n, e);
    },
    dngettext: function dngettext(t, n, e, i) {
      return this.dnpgettext(t, null, n, e, i);
    },
    npgettext: function npgettext(t, n, e, i) {
      return this.dnpgettext(this.domain, t, n, e, i);
    },
    pgettext: function pgettext(t, n) {
      return this.dpgettext(this.domain, t, n);
    },
    dgettext: function dgettext(t, n) {
      return this.dpgettext(t, null, n);
    },
    dpgettext: function dpgettext(t, n, i) {
      var r = e(this.dictionary, t, n, i);
      return !1 !== r && "" !== r[0] ? r[0] : i;
    },
    dnpgettext: function dnpgettext(t, n, i, r, o) {
      var s = function (t, n, e) {
        if (!t[n]) return 1 == e ? 0 : 1;
        t[n].fn || (t[n].fn = new Function("n", t[n].code));
        return t[n].fn.call(this, e) + 0;
      }(this.plurals, t, o),
          u = e(this.dictionary, t, n, i);

      return u[s] && "" !== u[s] ? u[s] : 0 === s ? i : r;
    },
    __: function __(t) {
      return i(this.gettext(t), Array.prototype.slice.call(arguments, 1));
    },
    n__: function n__(t, n, e) {
      return i(this.ngettext(t, n, e), Array.prototype.slice.call(arguments, 3));
    },
    p__: function p__(t, n) {
      return i(this.pgettext(t, n), Array.prototype.slice.call(arguments, 2));
    },
    d__: function d__(t, n) {
      return i(this.dgettext(t, n), Array.prototype.slice.call(arguments, 2));
    },
    dp__: function dp__(t, n, e) {
      return i(this.dgettext(t, n, e), Array.prototype.slice.call(arguments, 3));
    },
    np__: function np__(t, n, e, r) {
      return i(this.npgettext(t, n, e, r), Array.prototype.slice.call(arguments, 4));
    },
    dnp__: function dnp__(t, n, e, r, o) {
      return i(this.dnpgettext(t, n, e, r, o), Array.prototype.slice.call(arguments, 5));
    }
  }, n;
});

/***/ }),

/***/ 1:
/*!*********************************************************************************************************!*\
  !*** multi ./src/Resources/js/plugins/Gettextable/Plugins.js ./src/Resources/js/plugins/Gettextable.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/js/plugins/Gettextable/Plugins.js */"./src/Resources/js/plugins/Gettextable/Plugins.js");
module.exports = __webpack_require__(/*! /Volumes/SSD/www/root/home/projects/admin/dependencies/resources/src/Resources/js/plugins/Gettextable.js */"./src/Resources/js/plugins/Gettextable.js");


/***/ })

/******/ });