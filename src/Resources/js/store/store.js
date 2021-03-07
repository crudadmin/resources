import Vue from 'vue';
import Vuex from 'vuex';

//Uses
Vue.use(Vuex);

import header from './header';
import sitetree from './sitetree';
import models from './models';

export default new Vuex.Store({
    modules: {
        header,
        sitetree,
        models,
    },

    state: {},

    mutations: {},

    actions: {},
});