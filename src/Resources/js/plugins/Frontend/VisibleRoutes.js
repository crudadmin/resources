(function (selector) {
    var action = function (controller) {
        var routes = window.CAVisibleRoutes,
            actions = {};

        for (var key in routes || {}) {
            actions[decryptText(key)] = routes[key];
        }

        var regex = /{[a-z|A-Z|0-9|\_|\-]+}/g,
            action = actions[controller];

        if (!action) {
            console.error('Action not found ' + controller);
            return '';
        }

        var matches = action.match(regex) || [];

        //Replace action param
        for (let i = 0; i < matches.length; i++) {
            action = action.replace(matches[i], arguments[i + 1] || '');
        }

        return action;
    };

    //Vue.js installation
    action.install = (Vue, options) => {
        //Vuejs3
        if (Vue.config && Vue.config.globalProperties) {
            Vue.config.globalProperties[selector] = action;
        }

        //Vuejs 2
        else {
            Vue.prototype[selector] = action;
        }
    };

    window[selector] = action;
})('action');
