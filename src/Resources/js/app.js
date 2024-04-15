require('./bootstrap');

window.Vue = require('vue').default;
window.eventHub = window.$bus = new Vue();
window.store = window.$store = require('./store/store').default;

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Fragment from 'vue-fragment';

import globalVueMixins from './mixins/globalVueMixins';
import componentMixins from './mixins/componentMixins';
import modelMixins from './mixins/modelMixins';

//Uses
Vue.use(VueResource);
Vue.use(Fragment.Plugin);
Vue.use(VueRouter);

//Use Crudadmin translatable plugin
if (window.Gettext) {
    Vue.use(Gettext);
}

// Components
import BaseComponent from '@components/BaseComponent.js';
import FormBuilder from '@components/Forms/FormBuilder.vue';
import FormInputBuilder from '@components/Forms//FormInputBuilder.vue';
import CrudAdmin from '@components/Helpers/CrudAdmin.js';
import SiteTreeBuilder from '@components/Extensions/SiteTreeBuilder/SiteTreeBuilder.vue';
import ModelBuilder from '@components/Views/ModelBuilder.vue';
import VueChosen from '@components/Partials/VueChosen.vue';
import ButtonsAction from '@components/Partials/ButtonsAction.vue';
import Modal from '@components/Modal/Modal.vue';
import ModalAddNewRow from '@components/Modal/ModalAddNewRow.vue';
import HistoryModal from '@components/Modal/HistoryModal.vue';
import RowsFilter from '@components/Rows/RowsFilter.vue';
import Refreshing from '@components/Partials/Refreshing.vue';
import Field from '@components/Partials/Field.vue';
import FieldLabel from '@components/Partials/FieldLabel.vue';
import AddNewRowModal from '@components/Partials/Actions/AddNewRowModal.vue';

//Router
import Router from './router.js';

//Global components
Vue.component('vue-chosen', VueChosen);

//Global model components
Vue.component('SiteTreeBuilder', SiteTreeBuilder);
Vue.component('form-builder', FormBuilder);
Vue.component('model-builder', ModelBuilder);
Vue.component('buttons-action', ButtonsAction);
Vue.component('Modal', Modal);
Vue.component('ModalAddNewRow', ModalAddNewRow);
Vue.component('HistoryModal', HistoryModal);
Vue.component('RowsFilter', RowsFilter);
Vue.component('Refreshing', Refreshing);
Vue.component('Field', Field);
Vue.component('FieldLabel', FieldLabel);
Vue.component('FormInputBuilder', FormInputBuilder);
Vue.component('AddNewRowModal', AddNewRowModal);

//Global methods
Vue.mixin(globalVueMixins);
Vue.mixin(CrudAdmin);
Vue.mixin(componentMixins);
Vue.mixin(modelMixins);

//Create base VueApp instance
window.VueApp = window.$app = new Vue(BaseComponent(Router, store));
