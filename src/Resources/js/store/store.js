import Vue from 'vue';
import Vuex from 'vuex';

//Uses
Vue.use(Vuex);

import header from './header';

export default new Vuex.Store({
    modules: {
        header,
    },

    state: {},

    mutations: {},

    actions: {},
});