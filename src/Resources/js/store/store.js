import Vue from 'vue';
import Vuex from 'vuex';

//Uses
Vue.use(Vuex);

import header from './header';
import sitetree from './sitetree';
import models from './models';
import modal from './modal';

export default new Vuex.Store({
    modules: {
        header,
        sitetree,
        models,
        modal,
    },

    state: {},

    mutations: {},

    actions: {},
});
