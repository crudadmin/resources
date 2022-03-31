<template>
    <div :class="{ 'nav-tabs-custom' : hasTabsAvailable }">
        <ul class="nav nav-tabs" v-if="hasTabsAvailable">
            <li
                class="nav-item"
                :class="{ 'model-tab' : isModel(tab), active : activeTab == $index }"
                v-for="(tab, $index) in getTabs"
                v-if="isTab(tab) && !tab.model || isModel(tab)"
                v-show="isTabVisible(tab)"
                data-tabs
                :data-depth="model.getData('depth_level')"
                :default-tab="isModel(tab) && getModel(tab.model) ? false : ''"
                :data-model="isModel(tab) && getModel(tab.model) ? getModel(tab.model).slug : model.table"
                :data-tab-id="tab.id"
                @click="model.setActiveTab($index)">
                <a data-toggle="tab" class="nav-link" :class="{ active : activeTab == $index }" aria-expanded="true">
                    <i v-if="getTabIcon(tab)" class="fa nav-link--icon-left" :class="[faMigrator(getTabIcon(tab))]"></i>
                    {{ getTabName(tab)||trans('general-tab') }}

                    <span class="tab-count" v-if="isModel(tab)">{{ getTabNameCount(tab) }}</span>
                </a>
            </li>
        </ul>
        <div class="tab-content tab-content--form">
            <div
                v-for="(tab, $index) in getTabs"
                v-if="canRenderTab(tab)"
                class="tab-pane"
                :class="{ active : activeTab == $index }"
                :data-tab-model="isModel(tab) ? getModel(tab.model).slug : false"
                :data-tab-id="tab.id">
                <div class="row">
                    <div v-if="hasTabs(tab.fields) || isModel(tab)" :class="{ model : isModel(tab) }" class="col-lg-12">
                        <form-tabs-builder
                            v-if="hasTabs(tab.fields)"
                            :tabs="tabsFields(tab.fields)"
                            :model="model"
                            :inputlang="inputlang">
                        </form-tabs-builder>

                        <model-builder
                            dusk="model-builder"
                            :data-model="getModel(tab.model).table"
                            :key="getModel(tab.model).getData('uuid')"
                            v-if="isModel(tab)"
                            :langid="model.getSelectedLanguageId()"
                            :ischild="true"
                            :model_builder="getModel(tab.model)"
                            :activeTab="isLoadedModel(getModel(tab.model), $index, true)"
                            :parentActiveGridSize="model.activeGridSize()"
                            :parentrow="row">
                        </model-builder>
                    </div>

                    <form-group
                        v-for="(item, $index) in chunkGroups(tab.fields)"
                        :key="$index"
                        v-if="isGroup(item) && !isTab(item)"
                        :group="item"
                        :model="model"
                        :inputlang="inputlang">
                    </form-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormGroup from './FormGroup.vue';
import ModelBuilder from '../Views/ModelBuilder.vue';
import ModelHelper from '../Helpers/ModelHelper.js';
import { isTab, isGroup } from '../Helpers/TabsHelper.js';

export default {
    name : 'form-tabs-builder',

    props : ['model', 'group', 'tabs', 'withChilds', 'inputlang', 'cansave'],

    components : { FormGroup },

    data(){
        return {
            //Which child models has been loaded
            modelsLoaded : [],
        };
    },

    created() {
        /*
         * Fix for double recursion in VueJS
         */
        this.$options.components['model-builder'] = Vue.extend(ModelBuilder);
    },

    destroyed(){
        eventHub.$off('rowsChanged', this.rowsChangedEvent);
    },

    watch: {
        //Reset tabs on change id
        'row.id'(id, oldid){
            //If is created new row, or id does exists. We does not want reset active tab, because for will not be reseted
            if ( this.model.getSettings('autoreset') !== false || !id ) {
                this.model.setActiveTab(0);
            }

            this.modelsLoaded = [];
        },
        activeTab(tabid){
            //If tab is in subgroup of field, we do not want change save button state
            if ( typeof this.cansave == 'undefined' )
                return;

            eventHub.$emit('changeFormSaveState', {
                model : this.model.slug,
                state : !(this.isModel(this.getTabs[tabid]) && this.getModel(this.getTabs[tabid].model).inParent !== true)
            });
        },
    },

    computed: {
        row(){
            return this.model.getRow();
        },
        activeTab(){
            return this.model.getActiveTab();
        },
        getTabs(){
            return this.model.getTabs(this.tabs, this.group, this.withChilds||false);
        },
        hasTabsAvailable(){
            return !(this.getTabs.filter(function(item){
                if ( ! isTab(item) )
                    return false;

                if ( item.model && ! this.isModel(item) )
                    return false;

                return true;
            }.bind(this)).length == 1 && this.getTabs[0].default === true);
        },
    },

    methods: {
        checkRecursivityModelTab(tab){
            if ( this.model.table == tab.model ){
                return this.model.checkMaxRecursivity();
            }

            return true;
        },
        canRenderTab(tab, index){
            //If tab has fields or tab is model relation
            if ( this.hasTabs(tab.fields) || this.isModel(tab) )
                return true;

            //If tab has groups
            if ( this.chunkGroups(tab.fields).length > 0 )
                return true;

            return false;
        },
        tabsFields(fields){
            return fields.filter(item => {
                return isTab(item);
            });
        },
        /*
         * Return model from childs by model table
         */
        getModel(model){
            let cachedModel = () => {
                if ( typeof this.model.childs[model] == 'string' ) {
                    return this.getFreshModel(this.model.table);
                }

                if ( this.model.childs[model] ) {
                    return ModelHelper(this.model.childs[model]);
                } else {
                    return this.getFreshModel(model);
                }
            };

            if ( !this.cachedModel ){
                this.cachedModel = {};
            }

            if ( this.cachedModel[model] ){
                return this.cachedModel[model];
            }

            //We need create cached version of given model. To share UUID accross all model session
            //under this tab. We also need to create object observable from start. To be able retrieve data
            //after component mount.
            return this.cachedModel[model] = Vue.observable(cachedModel());
        },
        /*
         * Return tab name
         */
        getTabName(tab){
            if ( this.isModel(tab) ) {
                var model = this.getModel(tab.model),
                    name = tab.name||model.name;

                return name;
            }

            return tab.name;
        },
        getTabNameCount(tab){
            if ( !this.isModel(tab) ) {
                return;
            }

            var model = this.getModel(tab.model);

            //If is not single model, then show rows count
            if ( model.isSingle() || model.isInParent() ) {
                return;
            }

            return '('+((model.getData('rows')||{}).count||0)+')';
        },
        /*
         * Return tab icon
         */
        getTabIcon(tab){
            if ( this.isModel(tab) )
                return tab.icon||this.getModel(tab.model).icon;

            return tab.icon;
        },
        /*
         * Check if tabs is model type
         */
        isModel(tab){
            if ( !(tab.type == 'tab' && tab.model && this.getModel(tab.model).active == true) )
                return false;

            return this.model.isOpenedRow() || this.getModel(tab.model).without_parent == true;
        },
        isField(field){
            return typeof field == 'string' && field in this.model.fields;
        },
        isGroup,
        isTab,
        hasTabs(fields){
            return fields.filter(function(group) {
                return isTab(group);
            }.bind(this)).length > 0;
        },
        //Return group class
        getGroupClass(group){
            return this.$parent.getGroupClass(group);
        },
        canShowGroupName(group){
            return group.name;
        },
        chunkGroups(fields){
            var chunkSize = 2,
                    chunk = 0,
                    data = [];

            for ( var i = 0; i < fields.length; i++ )
            {
                if ( i > 0 && this.isGroup(data[data.length - 1]) && this.isField(fields[i]) || i == 0 && this.isField(fields[i]) )
                    data.push([]);

                if ( this.isField(fields[i]) )
                    data[data.length - 1].push(fields[i]);
                else {
                    data.push(fields[i]);
                }
            }

            var items = data.map(function(item){
                if ( this.isGroup(item) )
                    return item;

                return {
                    type : 'default',
                    fields : item,
                    name : this.group ? this.group.name : null,
                }
            }.bind(this));

            return items;
        },
        isLoadedModel(model, index, autoLoadModel = false){
            //Tab is active only when is selected, or when is inParentMode
            //because we need loaded fields also when tab is not opened. For proper validation errors.
            if ( autoLoadModel === true && ((index === this.activeTab || model.isInParent() || model.getSettings('tab_loaded')) && this.modelsLoaded.indexOf(model.slug) === -1) ) {
                this.modelsLoaded.push(model.slug);
            }

            return this.modelsLoaded.indexOf(model.slug) > -1;
        },
        isTabVisible(tab){
            if ( ! isTab(tab) )
                return false;

            if ( this.isModel(tab) && this.checkRecursivityModelTab(tab) === false ) {
                return false;
            }

            if ( tab.attributes ) {
                if ( this.model.tryAttribute(tab.attributes, 'hideField') || this.model.tryAttribute(tab.attributes, 'hideFromForm') ) {
                    return false;
                }

                //Check if tab/group can be visible
                let visible = this.model.tryAttribute(tab.attributes, 'visible');
                if ( _.isBoolean(visible) ){
                    return visible;
                }
            }

            return (this.model.hidden_tabs||[]).indexOf(tab.model||tab.id) === -1;
        },
    }
}
</script>

<style lang="scss" scoped></style>