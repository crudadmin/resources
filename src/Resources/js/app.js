require('./bootstrap');

window.Vue = require('vue');
window.eventHub = new Vue();

import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import Fragment from 'vue-fragment'

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

//Router
import Router from './router.js';

//Global methods
Vue.mixin(CrudAdmin);

//Create base VueApp instance
window.VueApp = new Vue(
    BaseComponent(Router)
);