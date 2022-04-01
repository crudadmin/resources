<template>
    <!-- Horizontal Form -->
    <component ref="form" :is="formType" method="post" action="" :id="model.getFormId()" :data-form="model.slug" @submit.prevent="model.saveForm($event)" class="form crudadmin-form">
        <div class="box" :class="{ 'box--active' : isActive }">
            <div data-header class="box-header" :class="{ visible : (model.hasLocaleFields() || canShowGettext || (model.isOpenedRow() && model.history)), '--opened' : model.isOpenedRow() }">
                <div class="box-header__actions">
                    <div class="box-header__left">
                        <h3 class="box-header__title">
                            <i
                                v-if="(model.isOpenedRow() || model.isOnlyFormOpened()) && model.isEnabledOnlyFormOrTableMode() && model.hasRows()"
                                @click="model.closeForm()"
                                class="goBackButton fa fa-chevron-left"
                                data-toggle="tooltip"
                                :title="__('Vrátiť sa bez uloženia')"
                                >
                            </i>
                            <span v-if="model.localization" data-toggle="tooltip" :data-original-title="trans('multilanguages')" class="--icon-left fa fa-globe-americas"></span>
                            {{ title }}
                        </h3>

                        <custom-components :model="model" type="form-header-left" />
                    </div>

                    <div class="box-header__right">
                        <custom-components :model="model" type="form-header-right" />

                        <button v-if="model.isOpenedRow() && canShowGettext" @click="openGettextEditor" type="button" class="btn--icon btn btn-default btn-sm"><i class="fa fa-globe-americas"></i>
                            {{ trans('gettext-open') }}
                        </button>
                        <button v-if="model.isOpenedRow() && model.history && model.isSingle()" type="button" @click="model.showHistory(row)" class="btn--icon btn btn-sm btn-default" data-toggle="tooltip" title="" :data-original-title="trans('history.changes')">
                            <i class="fa fa-history"></i>
                            {{ model.getSettings('buttons.show-history', trans('history.show')) }}
                        </button>

                        <model-language-switch :model="model" />

                        <button
                            v-if="(model.isOpenedRow() || model.isOnlyFormOpened()) && !model.isInParent() && !model.isSingle()"
                            data-toggle="tooltip"
                            :data-close-form="model.table"
                            :title="__('Zavrieť bez uloženia')"
                            @click="model.closeForm()"
                            type="button"
                            class="btn--icon btn btn-default btn-sm"
                        >
                            <i class="fa fa-times-circle"></i>
                            {{ __('Zavrieť') }}
                        </button>
                    </div>
                </div>

                <custom-components :model="model" type="form-header" />
            </div>

            <div class="box-body box-body--form" :class="{ cantadd : !cansave }">
                <custom-components :model="model" type="form-top" />

                <div class="box-body-wrapper">
                    <input v-for="(value, key) in model.getAdditionalFormData()" type="hidden" :name="key" :value="value">

                    <form-tabs-builder
                        :level="0"
                        :model="model"
                        :withChilds="true"
                        :inputlang="model.selectedLanguage()"
                        :cansave="cansave">
                    </form-tabs-builder>
                </div>

                <custom-components :model="model" type="form-bottom" />
            </div>

            <div :data-footer="model.table" class="box-footer" v-if="canShowFooter">
                <custom-components :model="model" type="form-footer" />

                <div class="box-footer__actions" v-if="canUpdateForm">
                    <div class="box-footer__right">
                        <button v-if="hasProgress" type="button" data-action-type="updating" :class="['btn', 'btn-' + ( model.isOpenedRow() ? 'success' : 'primary')]">
                            <i class="fa fa-spin fa-sync mr-1"></i> {{ sendingButtonText }}
                        </button>
                        <button v-if="!hasProgress" type="submit" :data-action-type="model.isOpenedRow() ? 'update' : 'create'" name="submit" class="btn btn-primary">
                            {{ model.isOpenedRow() ? saveButtonText : sendButtonText }}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </component>
    <!-- /.box -->
</template>
<script>
import FormTabsBuilder from '../Forms/FormTabsBuilder.vue';
import ModelLanguageSwitch from '@components/Partials/ModelLanguageSwitch.vue';
import CustomComponents from '@components/Partials/ModelBuilder/CustomComponents.vue';

export default {
    name : 'form-builder',

    props : ['model', 'rows', 'gettext_editor'],

    components: {
        FormTabsBuilder, ModelLanguageSwitch, CustomComponents
    },

    data(){
        return {
            submit : false,
            isActive : true,
            cansave : true,
        };
    },

    mounted() {
        eventHub.$on('changeFormSaveState', this.changeFormSaveStateEvent = data => {
            if ( data.model != this.model.slug )
                return;

            //Change if form can show send/save button
            //in other tab, button need to be hidden
            this.cansave = data.state;
        });

        /*
         * When row is updated, then bind data from incoming request/database into model row and his values
         */
        eventHub.$on('onUpdate', this.onUpdateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.model.getData('depth_level') )
                return;

            //Update model data of existing model on row update
            for ( var key in data.row ) {
                this.model.setValue(key, data.row[key]);

                //Update values in fields cause updating files in form
                if ( key in this.model.fields ) {
                    this.model.fields[key].value = data.row[key];
                }
            }
        });

        //On create form instance, we need initialize given row.
        //For example if single model is loaded from database as relation, but FormBuilder is not loaded yet
        //Then we need insert row data after FormBuilder initialization.
        //We also does not want sent empty event for single model. Because CKEditor will be buggy with content. So this event
        //can be triggered only when model is not single, or has any data.
        // if ( ! this.model.isSingle() || this.row.id ){
            this.model.initForm(this.row);
        // }
    },

    destroyed(){
        eventHub.$off('changeFormSaveState', this.changeFormSaveStateEvent);
        eventHub.$off('onUpdate', this.onUpdateEvent);
    },

    watch: {
        //After click on edit button, push data into form values
        row : {
            handler : function (row, oldRow) {
                //Form cannot be resetted if data has been synced from db
                var canResetForm = !this.model.isOpenedRow() || ! oldRow || row.id != oldRow.id;

                //Init new form after change row
                if ( !row || !oldRow || row.id != oldRow.id || this.model.getData('history').history_id )
                {
                    this.model.initForm(row, canResetForm);

                    this.model.sendRowData();
                }
            },
            deep: true,
        },
        //On change language reset editing form
        // langid(langid){
        //   this.model.resetFormWithEvents();
        // },
    },

    computed: {
        progress(){
            return this.model.getData('progress');
        },
        hasProgress(){
            return _.isNumber(this.progress) || this.progress === true;
        },
        row(){
            return this.model.getRow();
        },
        formType(){
            return this.model.isInParent() ? 'div' : 'form';
        },
        title(){
            var title;

            if ( this.model.isOpenedRow() ) {
                //If update title has not been set
                if ( !(title = this.model.getSettings('title.update')) ) {
                    if ( (this.model.fields.name || this.model.fields.title) && (this.row.name || this.row.title) ){
                        return this.getLocaleFieldValue(this.row.name || this.row.title);
                    }

                    if ( this.model.editable ) {
                        return this.trans('edit-row-n')+' ' + this.row.id;
                    } else {
                        return this._('Zobrazujete záznam č.')+' '+this.row.id;
                    }
                }

                //Bind value from row to title
                for ( var key in this.row ) {
                    var value = this.row[key];

                    if ( this.isFieldSelect(key) )
                    {
                        var values = this.$root.languageOptions(this.model.fields[key].options, key);

                        for ( var i = 0; i < values.length; i++ )
                            if ( values[i][0] == value )
                            {
                                value = values[i][1];
                                break;
                            }
                    }

                    //Return localized value
                    if ( value && typeof value == 'object' ) {
                        for ( var language of this.$root.languages ) {
                            if ( language.slug in value ){
                                value = value[language.slug];
                                break;
                            }
                        }
                    }

                    //If localized value has not been found for default country, we need select first object value
                    //and hope that it is string
                    if ( value && typeof value == 'object' ) {
                        for ( var k in value ) {
                            if ( value[k] ){
                                value = value[k];
                                break;
                            }
                        }
                    }

                    title = title.replace(':'+key, value||'');
                }

                return title;
            }

            //Insert title
            else if (
                (title = this.model.getSettings('title.insert'))
                || (title = this.model.getSettings('title.create'))
            ) {
                return title;
            }

            return this.trans('new-row');
        },
        newRowTitle(){
            return this.$parent.newRowTitle();
        },
        saveButtonText(){
            return this.model.getSettings('buttons.update') || this.trans('save');
        },
        sendButtonText(){
            return this.model.getSettings('buttons.insert') || this.trans('send');
        },
        sendingButtonText(){
            let text = this.model.isOpenedRow() ? this.trans('saving') : this.trans('sending');

            return text+(_.isNumber(this.progress) ? ' ('+this.progress+'%)' : '');
        },
        canShowFooter(){
            return this.canUpdateForm || this.model.getComponents('form-footer').length > 0;
        },
        canUpdateForm(){
            //We cant save form in history row is opened
            if ( this.model.getData('history').history_id ){
                return false;
            }

            if (
                this.model.isOpenedRow() && (
                    this.model.getSettings('editable') == false
                    || this.model.editable == false
                )
            ) {
                return false;
            }

            if ( ! this.model.hasAccess('update') ) {
                return false;
            }

            //Model cannot be updated, when is inParent relation
            if ( this.model.isInParent() ) {
                return false;
            }

            return this.cansave;
        },
        canShowGettext(){
            if (
                ['languages', 'admin_languages'].indexOf(this.model.slug) > -1
                && this.$root.gettext
                && this.model.hasAccess('update')
            ) {
                return true;
            }

            return false;
        },
    },

    methods: {
        openNewForm(){
            this.$parent.addNewRow();
        },
        openGettextEditor(){
            this.$parent.gettext_editor = this.row;
        },
        isFieldSelect(column){
            return column && column in this.model.fields && (['select', 'radio'].indexOf(this.model.fields[column].type) > -1) ? true : false;
        },
    },
}
</script>