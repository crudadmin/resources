<template>
    <!-- Horizontal Form -->
    <component
        ref="form"
        :is="formType"
        method="post"
        action=""
        :id="model.getFormId()"
        :data-form="model.slug"
        @submit.prevent="model.saveForm($event)"
        class="form crudadmin-form"
        :data-state="model.isOpenedRow() ? 'update' : 'create'"
    >
        <div class="box" :class="{ 'box--active': isActive }">
            <div
                data-header
                class="box-header"
                v-show="model.isSettingDisabled('form.header') === false"
                :class="{ '--opened': model.isOpenedRow(), '--forceVisible': isBoxHeaderPermantlyVisible }"
            >
                <div class="box-header__actions">
                    <div class="box-header__left">
                        <button
                            class="btn btn-secondary btn--icon --no-margin --button-back --pr"
                            v-if="
                                (model.isOpenedRow() || model.isOnlyFormOpened()) && model.isEnabledOnlyFormOrTableMode() && !model.isStandaloneForm()
                            "
                            @click="model.closeForm()"
                            data-toggle="tooltip"
                            :title="__('Vrátiť sa bez uloženia')"
                            type="button"
                        >
                            <i class="fa fa-chevron-left"></i>
                        </button>

                        <h3 class="box-header__title">
                            <span
                                v-if="model.localization"
                                data-toggle="tooltip"
                                :data-original-title="trans('multilanguages')"
                                class="--icon-left fa fa-globe-americas"
                            ></span>
                            {{ model.getFormTitle() }}
                        </h3>

                        <custom-components :model="model" type="form-header-left" />
                    </div>

                    <div class="box-header__right">
                        <custom-components :model="model" type="form-header-right" />

                        <button
                            v-if="model.isOpenedRow() && canShowGettext"
                            @click="model.openGettextEditor(row)"
                            type="button"
                            class="btn--icon btn btn-secondary"
                        >
                            <i class="fa fa-globe-americas"></i>
                            {{ trans('gettext-open') }}
                        </button>
                        <button
                            v-if="model.isOpenedRow() && model.history && model.isSingle()"
                            type="button"
                            @click="model.showHistory(row)"
                            class="btn--icon btn btn-secondary"
                            data-toggle="tooltip"
                            title=""
                            :data-original-title="trans('history.changes')"
                        >
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
                            class="btn--icon btn btn-secondary --no-margin --button-back"
                        >
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>

                <custom-components :model="model" type="form-header" />
            </div>

            <div class="box-body box-body--form" :class="{ cantadd: !cansave }">
                <custom-components :model="model" type="form-top" />

                <div class="box-body-wrapper">
                    <input v-for="(value, key) in model.getAdditionalFormData()" type="hidden" :name="key" :value="value" />

                    <form-tabs-builder
                        v-if="model.canLoadSubTabs()"
                        :level="0"
                        :model="model"
                        :withChilds="true"
                        :cansave="cansave"
                    ></form-tabs-builder>
                </div>

                <custom-components :model="model" type="form-bottom" />
            </div>

            <div :data-footer="model.table" class="box-footer" v-if="canShowFooter">
                <custom-components :model="model" type="form-footer" />

                <div class="box-footer__actions" v-if="canUpdateForm">
                    <div class="box-footer__right">
                        <SubmitButton :model="model" />
                    </div>
                </div>
            </div>
        </div>
    </component>
    <!-- /.box -->
</template>
<script>
import FormTabsBuilder from '../Forms/FormTabsBuilder.vue';
import SubmitButton from '@components/Forms/SubmitButton.vue';
import ModelLanguageSwitch from '@components/Partials/ModelLanguageSwitch.vue';
import CustomComponents from '@components/Partials/ModelBuilder/CustomComponents.vue';

export default {
    name: 'form-builder',

    props: {
        model: {
            default: false,
        },
    },

    components: {
        FormTabsBuilder,
        ModelLanguageSwitch,
        CustomComponents,
        SubmitButton,
    },

    data() {
        return {
            submit: false,
            isActive: true,
            cansave: true,
        };
    },

    mounted() {
        eventHub.$on(
            'changeFormSaveState',
            (this.changeFormSaveStateEvent = (data) => {
                if (data.model != this.model.slug) return;

                //Change if form can show send/save button
                //in other tab, button need to be hidden
                this.cansave = data.state;
            })
        );

        //On create form instance, we need initialize given row.
        //For example if single model is loaded from database as relation, but FormBuilder is not loaded yet
        //Then we need insert row data after FormBuilder initialization.
        //We also does not want sent empty event for single model. Because CKEditor will be buggy with content. So this event
        //can be triggered only when model is not single, or has any data.
        // if ( ! this.model.isSingle() || this.row.id ){
        this.model.initForm(this.row);
        // }
    },

    destroyed() {
        eventHub.$off('changeFormSaveState', this.changeFormSaveStateEvent);
    },

    watch: {
        //After click on edit button, push data into form values
        'row.id': {
            handler: function (id, oldId) {
                //Form cannot be resetted if data has been synced from db
                var canResetForm = !this.model.isOpenedRow() || !oldId || id != oldId;

                //Init new form after change row
                if (!id || !oldId || id != oldId || this.model.getData('history').history_id) {
                    this.model.initForm(this.row, canResetForm);

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
        row() {
            return this.model.getRow();
        },
        formType() {
            return this.model.isInParent() ? 'div' : 'form';
        },
        canShowFooter() {
            if (this.model.isSettingDisabled('form.footer')) {
                return false;
            }

            return this.canUpdateForm || this.model.getComponents('form-footer').length > 0;
        },
        canUpdateForm() {
            //We cant save form in history row is opened
            if (this.model.getData('history').history_id) {
                return false;
            }

            if (this.model.isOpenedRow() && (this.model.getSettings('editable') == false || this.model.editable == false)) {
                return false;
            }

            if (!this.model.hasAccess('update')) {
                return false;
            }

            //Model cannot be updated, when is inParent relation
            if (this.model.isInParent()) {
                return false;
            }

            return this.cansave;
        },
        canShowGettext() {
            if (['languages', 'admin_languages'].indexOf(this.model.slug) > -1 && this.$root.gettext && this.model.hasAccess('update')) {
                return true;
            }

            return false;
        },
        isBoxHeaderPermantlyVisible() {
            if (this.model.getSettings('header.visiblePermanently', false) === true) {
                return true;
            }

            return this.model.hasLocaleFields() || this.canShowGettext || (this.model.isOpenedRow() && this.model.history);
        },
    },

    methods: {
        openNewForm() {
            this.$parent.addNewRow();
        },
    },
};
</script>
