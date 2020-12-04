/*
 * CrudAdmin Binder into global variables and VueJS 2
 * for simple global scope integration into VueJs use Vue.use(Gettext)
 */
(function (global, factory) {
    //amd
    if (typeof define === "function" && define.amd) {
        define(['gettext-translator'], function (translator) {
            return factory(global, translator.default);
        });
    //commonjs
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(global, require('gettext-translator').default);

    //global
    } else {
        global.GettextTranslates = factory(global, require('gettext-translator').default);
    }
}(typeof window !== 'undefined' ? window : this, function (window, Translator) {
    var a = new Translator(CATranslates.translates),
        selectors = ['_', '__', 'Gettext', 'd__', 'dgettext', 'dngettext', 'dnp__', 'dnpgettext', 'dp__', 'dpgettext', 'gettext', 'n__', 'ngettext', 'np__', 'npgettext', 'p__', 'pgettext',],
        getSelector = function(selector){
            return function(){
                var s = (selector in a) ? selector : '__';

                return a[s].apply(a, arguments);
            };
        },
        vuejsInstall = function (Vue, options) {
            for ( var i = 0; i < selectors.length; i++ ) {
                Vue.prototype[selectors[i]] = getSelector(selectors[i]);
            }
        };

    selectors.forEach(function(selector){
        var f = getSelector(selector)

        //If window variable is used, for example by lodash library
        if ( selector in window ) {
            return;
        }

        //Vue.js installation
        f.install = vuejsInstall;

        window[selector] = f;
    });

    window.GettextTranslates = a;

    return a;
}));