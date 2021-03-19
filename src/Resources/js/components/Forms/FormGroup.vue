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
                                v-show="canShowLanguageField(model.fields[item], langslug, inputlang)"
                                :key="item+'-'+langslug"
                                :model="model"
                                :inputlang="inputlang"
                                :langslug="langslug"
                                :index="index"
                                :field_key="item"
                                :field="model.fields[item]">
                            </form-input-builder>
                        </div>

                        <form-group
                            v-if="isGroup(item) && !isTab(item)"
                            :group="item"
                            :model="model"
                            :inputlang="inputlang">
                        </form-group>
                    </fragment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormTabsBuilder from './FormTabsBuilder.vue';
import FormInputBuilder from './FormInputBuilder.vue';

export default {
    name : 'form-group',

    props : ['model', 'group', 'inputlang'],

    components : { FormInputBuilder, FormTabsBuilder },

    created(){
        /*
         * Fir for double recursion in VueJS
         */
        this.$options.components['form-tabs-builder'] = Vue.extend(FormTabsBuilder);
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
        getVisibleFields(fields){
            return (fields||[]).filter(item => {
                if ( typeof item == 'string' ) {
                    var field = this.model.fields[item];

                    return !(
                        field.invisible && field.invisible == true
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
            return this.model.tryAttribute(field, 'removeField', this.row)
                   || this.model.tryAttribute(field, 'removeFromForm', this.row);
        },
        canHideAttribute(field){
            return this.model.tryAttribute(field, 'hideField', this.row)
                   || this.model.tryAttribute(field, 'hideFromForm', this.row);
        },
        canRenderField(field){
            return !('invisible' in field && field.invisible == true)
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
        canShowLanguageField(field, slug, inputlang){
            if ( !('locale' in field) )
                return true;

            return inputlang.slug == slug;
        },
        isGroupVisible(group){
            if ( group.attributes && Object.keys(group.attributes).length > 0 ){
                if (
                    this.model.tryAttribute(group.attributes, 'hideField', this.row)
                    || this.model.tryAttribute(group.attributes, 'hideFromForm', this.row)
                ){
                    return false;
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