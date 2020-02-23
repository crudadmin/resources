require('./Gettextable/Plugins');

/*
 * CrudAdmin Binder into global variables and VueJS 2
 * for simple global scope integration into VueJs use Vue.use(Gettext)
 */
(function(){
    var a = new Translator(CATranslates.translates),
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