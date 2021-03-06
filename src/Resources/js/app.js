require('./bootstrap');

window.Vue = require('vue');
window.eventHub = window.$bus = new Vue();
window.store = window.$store = require('./store/store').default;

import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import Fragment from 'vue-fragment'

import globalVueMixins from './mixins/globalVueMixins';
import componentMixins from './mixins/componentMixins';
import alertMixins from './mixins/alertMixins';
import modelMixins from './mixins/modelMixins';

//Uses
Vue.use(VueResource);
Vue.use(Fragment.Plugin);
Vue.use(VueRouter);

//Use Crudadmin translatable plugin
if ( window.Gettext ) {
    Vue.use(Gettext);
}

// Components
import BaseComponent from './components/BaseComponent.js';
import CrudAdmin from './components/Helpers/CrudAdmin.js';
import SiteTreeBuilder from './components/Extensions/SiteTreeBuilder/Builder.vue';
import VueChosen from './components/Partials/VueChosen.vue';

//Router
import Router from './router.js';

//Global components
Vue.component('vue-chosen', VueChosen);
Vue.component('SiteTreeBuilder', SiteTreeBuilder);

//Global methods
Vue.mixin(globalVueMixins);
Vue.mixin(CrudAdmin);
Vue.mixin(componentMixins);
Vue.mixin(alertMixins);
Vue.mixin(modelMixins);

//Create base VueApp instance
window.VueApp = window.$app = new Vue(
    BaseComponent(Router, store)
);