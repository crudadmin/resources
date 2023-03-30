<template>
    <div v-show="isGroupVisible(group)" class="fields-group fields-group__item" :group-id="group.id" :class="getGroupClass(group)" :data-fields="visibleFields.length">
        <div :class="{ card : canShowGroupName(group), 'fields-group__wrapper' : visibleFields.length > 0 || hasTabs(group.fields) === false, 'fields-tabs__wrapper' : hasTabs(group.fields) }">
            <h4 class="card-header" v-if="canShowGroupName(group)">
                <i v-if="group.icon" class="card-header--icon-left" :class="['fa', faMigrator(group.icon)]"></i>
                <span v-html="group.name"></span>
            </h4>

            <div :class="{ 'card-body' : canShowGroupName(group) }">
                <div class="row">
                    <div v-if="hasTabs(group.fields)" class="col-lg-12 tab--parent">
                        <form-tabs-builder
                            :level="level+'-'+group.id"
                            :tabs="tabsFields"
                            :model="model">
                        </form-tabs-builder>
                    </div>

                    <div v-else-if="canShowGroupName(group) && visibleFields.length == 0">
                        <div class="col-12">
                            <p class="empty-group-separator">...</p>
                        </div>
                    </div>

                    <fragment :key="index" v-for="(item, index) in group.fields">
                        <div
                            v-if="isField(item) && canRenderField(model.fields[item])"
                            v-show="canShowField(model.fields[item])"
                            class="fields-group__item col-12">
                            <form-input-builder
                                v-for="langslug in getFieldLangs(model.fields[item])"
                                v-show="canShowLanguageField(model.fields[item], langslug)"
                                :key="item+'-'+langslug"
                                :model="model"
                                :langslug="langslug"
                                :index="index"
                                :field_key="item"
                                :field="model.fields[item]">
                            </form-input-builder>
                        </div>

                        <form-group
                            v-if="isGroup(item) && !isTab(item)"
                            :level="addGroupLevel(level)"
                            :group="item"
                            :model="model">
                        </form-group>
                    </fragment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormInputBuilder from './FormInputBuilder.vue';
import { addGroupLevel } from '../Helpers/TabsHelper.js';

export default {
    name : 'form-group',

    props : ['model', 'group', 'level'],

    components : {
        FormInputBuilder,
        FormTabsBuilder : () => import('./FormTabsBuilder.vue'),
    },

    computed: {
        row(){
            return this.model.getRow();
        },
        tabsFields(){
            return this.group.fields.filter(item => {
                return this.isTab(item);
            });
        },
        visibleFields(){
            return this.getVisibleFields(this.group.fields);
        },
    },

    methods: {
        addGroupLevel,
        getVisibleFields(fields){
            return (fields||[]).filter(item => {
                if ( typeof item == 'string' ) {
                    var field = this.model.fields[item];

                    return !(
                        this.model.tryAttribute(field, 'invisible')
                        || this.canRemoveAttribute(field)
                        || ! this.canShowField(field)
                    );
                }

                //Check if subgroup has visible fields as well
                else if ( item && typeof item == 'object' && item.fields && typeof item.fields == 'object' ) {
                    return this.getVisibleFields(item.fields).length > 0;
                }

                return false;
            });
        },
        canRemoveAttribute(field){
            return this.model.tryAttribute(field, 'removeField')
                   || this.model.tryAttribute(field, 'removeFromForm')
                   || this.model.tryAttribute(field, 'inaccessible');
        },
        canHideAttribute(field){
            let visibleField = this.model.tryAttribute(field, 'visibleField');

            return this.model.tryAttribute(field, 'hideField')
                   || this.model.tryAttribute(field, 'hideFromForm')
                   || visibleField === false;
        },
        canRenderField(field){
            return !this.model.tryAttribute(field, 'invisible')
                   && !this.canRemoveAttribute(field);
        },
        canShowField(field){
            if ( this.canHideAttribute(field) )
                return false;

            if ( (field.ifExists === true || field.hideOnCreate === true) && ! this.model.isOpenedRow() )
                return false;

            if ( (field.ifDoesntExists === true || field.hideOnUpdate === true) && this.model.isOpenedRow() )
                return false;

            return true;
        },
        //Return group class
        getGroupClass(group){
            var width = (group.width+'').split('-');

            if ( width[0] == 'half' )
                width[0] = 6;
            else if ( width[0] == 'full' )
                width[0] = 12;
            else if ( width[0] == 'third' )
                width[0] = 4;

            if ( width.length == 2 && width[1] == 'inline' ) {
                return 'col-12 col-lg-'+width[0]+' fields-group--inline';
            }

            if ( $.isNumeric(width[0]) ) {
                return 'col-12 col-lg-' + width[0];
            }

            return 'col-12';
        },
        canShowGroupName(group){
            return group.name;
        },
        isField(field){
            return this.$parent.isField(field);
        },
        isGroup(group){
            return this.$parent.isGroup(group);
        },
        isTab(tab){
            return this.$parent.isTab(tab);
        },
        hasTabs(fields){
            return this.$parent.hasTabs(fields);
        },
        getFieldLangs(field){
            if ( ! field || !('locale' in field) )
                return 1;

            return _.map(this.$root.languages, 'slug');
        },
        canShowLanguageField(field, slug){
            if ( !('locale' in field) ) {
                return true;
            }

            return this.model.selectedLanguage()?.slug == slug;
        },
        isGroupVisible(group){
            if ( group.attributes && Object.keys(group.attributes).length > 0 ){
                if (
                    this.model.tryAttribute(group.attributes, 'hideField')
                    || this.model.tryAttribute(group.attributes, 'hideFromForm')
                ){
                    return false;
                }

                //Check if tab/group can be visible
                let visible = this.model.tryAttribute(group.attributes, 'visible');
                if ( _.isBoolean(visible) ){
                    return visible;
                }
            }

            if ( ! group.id ) {
                return true;
            }

            return (this.model.hidden_groups||[]).indexOf(group.id) === -1;
        }
    },
}
</script>