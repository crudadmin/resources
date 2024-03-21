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
                :default-tab="isModel(tab) && getTabModel(tab) ? false : ''"
                :data-model="isModel(tab) && getTabModel(tab) ? getTabModel(tab).slug : model.table"
                :data-tab-id="tab.id"
                @click="model.setActiveTab($index, level)"
                :title="isModel(tab) ? getTabModel(tab).title : null"
                data-toggle="tooltip">
                <a data-toggle="tab" class="nav-link" :class="{ active : activeTab == $index }" aria-expanded="true">
                    <i v-if="getTabIcon(tab)" class="fa nav-link--icon-left" :class="[faMigrator(getTabIcon(tab))]"></i>
                    {{ getTabName(tab)||trans('general-tab') }}

                    <span class="tab-count" v-if="isModel(tab)">{{ getTabNameCount(tab) }}</span>
                </a>
            </li>
        </ul>

        <div class="tab-content tab-content--form" :class="{ '--model-active' : isModel(getTabs[activeTab]) && !getTabModel(getTabs[activeTab]).inParent }" :data-active-index="activeTab">
            <div
                v-for="(tab, $index) in getTabs"
                v-if="canRenderTab(tab)"
                class="tab-pane"
                :class="{ active : activeTab == $index }"
                :data-tab-model="isModel(tab) ? getTabModel(tab).slug : false"
                :data-tab-id="tab.id">
                <div class="row">
                    <div v-if="hasTabs(tab.fields) || isModel(tab)" :class="{ model : isModel(tab) }" class="col-lg-12">
                        <form-tabs-builder
                            v-if="hasTabs(tab.fields)"
                            :level="addGroupLevel(level)"
                            :tabs="tabsFields(tab.fields)"
                            :model="model">
                        </form-tabs-builder>

                        <model-builder
                            dusk="model-builder"
                            :data-model="getTabModel(tab).table"
                            :key="getTabModel(tab).getData('uuid')"
                            v-if="isModel(tab)"
                            :langid="model.getSelectedLanguageId()"
                            :ischild="true"
                            :model_builder="getTabModel(tab)"
                            :parentRow="row">
                        </model-builder>
                    </div>

                    <form-group
                        v-for="(item, $index) in chunkGroups(tab.fields)"
                        :key="$index"
                        :level="addGroupLevel(level)"
                        v-if="isGroup(item) && !isTab(item)"
                        :group="item"
                        :model="model">
                    </form-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormGroup from './FormGroup.vue';
import ModelBuilder from '../Views/ModelBuilder.vue';
import { isTab, isGroup, addGroupLevel, getModel, isInlineModelTab } from '@components/Helpers/Model/ModelTabs.js';

export default {
    name : 'form-tabs-builder',

    props : ['model', 'group', 'tabs', 'withChilds', 'cansave', 'level'],

    components : { FormGroup },

    data(){
        return {};
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
                this.model.setActiveTab(0, true);
            }
        },
        activeTab(activeTab){
            let tab = this.getTabs[activeTab],
                isModel = this.isModel(tab),
                model = isModel ? this.getTabModel(tab) : null;

            //Set model tab as clicked.
            if ( model ){
                model.setData('load_child_tab_models', true);
            }

            //If tab is in subgroup of field, we do not want change save button state
            if ( typeof this.cansave == 'undefined' ) {
                return;
            }

            eventHub.$emit('changeFormSaveState', {
                model : this.model.slug,
                state : !(isModel && model.inParent !== true)
            });
        },
    },

    computed: {
        row(){
            return this.model.getRow();
        },
        activeTab(){
            return this.model.getActiveTab(this.level);
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
        getTabModel(tab){
            return getModel.bind(this)(tab.model, (model) => {
                if ( isInlineModelTab(tab) ){
                    return;
                }

                model.setData('load_child_tab_models', false);
            });
        },
        addGroupLevel,
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
         * Return tab name
         */
        getTabName(tab){
            if ( this.isModel(tab) ) {
                var model = this.getTabModel(tab),
                    name = tab.name||model.name;

                return name;
            }

            return tab.name;
        },
        getTabNameCount(tab){
            if ( !this.isModel(tab) ) {
                return;
            }

            var model = this.getTabModel(tab);

            //If is not single model, then show rows count
            if ( model.isSingle() || model.isInParent() ) {
                return;
            }

            let rows = (model.getData('rows')||{}),
                state = rows.refreshing ? '?' :  rows.count||0;

            return '('+(state)+')';
        },
        /*
         * Return tab icon
         */
        getTabIcon(tab){
            if ( this.isModel(tab) )
                return tab.icon||this.getTabModel(tab).icon;

            return tab.icon;
        },
        /*
         * Check if tabs is model type
         */
        isModel(tab){
            if ( !(tab.type == 'tab' && tab.model && this.getTabModel(tab).active == true) )
                return false;

            return this.model.isOpenedRow() || this.getTabModel(tab).without_parent == true;
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

            var items = data.map(function(item, index){
                if ( this.isGroup(item) ){
                    //We need generate group id, to be able switch tabs in groups
                    item.id = item.id||('group-'+index);

                    return item;
                }

                return {
                    type : 'default',
                    fields : item,
                    name : this.group ? this.group.name : null,
                }
            }.bind(this));

            return items;
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