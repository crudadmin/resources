<template>
    <div>
        <!-- Additional top layouts -->
        <custom-components :model="model" type="top" />
        <custom-components :model="model" type="mutators" />

        <div class="alert alert-danger" v-if="languages.length == 0 && isLocaleModel">
            <strong>{{ trans('warning') }}!</strong>
            <p>{{ trans('languages-missing') }}</p>
        </div>

        <div class="alert alert-danger" v-if="!model.hasAccess('read') && !model.hasAccess('insert')">
            <strong>{{ trans('warning') }}!</strong>
            <p>{{ trans('no-permissions') }}</p>
        </div>

        <div class="admin-model" :data-depth="model.getData('depth_level')" :class="{ 'admin-model--single-mode' : model.isSingle(), 'admin-model--in-parent' : model.isInParent() }" v-show="model.canShowForm() || (model.canShowRows() || isSearching)">
            <div class="admin-model__header" :class="{ 'with-border' : model.isSingle() }" v-show="canShowAdminHeader">
                <div class="left">
                    <SearchWrapper :model="model"></SearchWrapper>

                    <RowsFilter :model="model" v-if="model.isSettingEnabled('filter', true) && (!model.isEnabledOnlyFormOrTableMode() || !model.canShowForm())" />
                </div>

                <div class="right" v-if="!model.isSingle()">
                    <custom-components :model="model" type="actions-grid-before" />

                    <GridChanger :model="model" />

                    <custom-components :model="model" type="actions-grid" />

                    <!-- Choose language -->
                    <div class="dropdown" v-if="hasLanguages && isActiveLanguageSwitch && (!model.canShowForm() || model.activeGridSize() != 0)" data-global-language-switch>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i class="--icon-left fa fa-globe-americas"></i>
                            {{ selectedRootLanguage ? getLangName(selectedRootLanguage) : trans('language-mutation') }}
                            <i class="--icon-right fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li v-for="language in languages" :class="{ active : langid == language.id }" @click="changeLanguage(language.id)">{{ getLangName(language) }}</li>
                        </ul>
                    </div>

                    <!-- Add new row -->
                    <button
                        v-if="canShowAddButton"
                        :data-create-new-row="model.table"
                        @click.prevent="model.createNewEntry()"
                        type="button"
                        class="btn--icon btn btn-primary">
                        <i class="fa fa-plus --icon-left"></i>
                        {{ model.getSettings('buttons.create', trans('new-row')) }}
                    </button>

                    <slot name="actions-grid-after"></slot>
                </div>
            </div>

            <div class="admin-model__body">
                <div class="row grid-table" :class="{ 'grid-fullsize' : model.activeGridSize() == 0 }">
                    <!-- left column -->
                    <div class="col--rows col-12" :class="['col-lg-'+(12-(12-model.activeGridSize())), { '--noMargin' : !model.canShowForm() }]" v-show="canDisplayRowsLayout">
                        <custom-components :model="model" type="table-before" />

                        <model-rows-builder
                            v-show="model.isSettingEnabled('table', true)"
                            :model="model"
                            :rows="rows">
                        </model-rows-builder>

                        <custom-components :model="model" type="table-after" />
                    </div>
                    <!--/.col (left) -->

                    <!-- right column -->
                    <div :class="['col-lg-'+(12 - model.activeGridSize())]" class="col--form col-12" v-show="model.canShowForm()">
                        <custom-components :model="model" type="form-before" />

                        <form-builder
                            v-if="model.isSettingEnabled('form', true)"
                            :model="model"
                        ></form-builder>

                        <custom-components :model="model" type="form-after" />
                    </div>
                    <!--/.col (right) -->
                </div>
            </div>
        </div>

        <custom-components :model="model" type="bottom" />
    </div>
</template>

<script>
    import _ from 'lodash';
    import ModelRowsBuilder from '../Rows/ModelRowsBuilder.vue';
    import SearchWrapper from '../Partials/SearchWrapper.vue';
    import { mapMutations } from 'vuex';
    import CustomComponents from '@components/Partials/ModelBuilder/CustomComponents.vue';
    import GridChanger from '@components/Partials/GridChanger.vue';

    export default {
        props : ['model_builder', 'langid', 'ischild', 'parentRow', 'scopes'],

        name : 'model-builder',

        components : { ModelRowsBuilder, CustomComponents, SearchWrapper, GridChanger },

        data(){
            return {
                model : this.model_builder,

                sizes : this.model_builder.setData('sizes', [
                    { size : 4, key : 'small', name : this.trans('grid-small'), active : false, disabled : this.model_builder.isSettingDisabled('grid.small') },
                    { size : 8, key : 'big', name : this.trans('grid-big'), active : false, disabled : this.model_builder.isSettingDisabled('grid.big') },
                    { size : 6, key : 'medium', name : this.trans('grid-medium'), active : false, disabled : this.model_builder.isSettingDisabled('grid.medium') },
                    { size : 0, key : 'full', name : this.trans('grid-full'), active : false, disabled : this.model_builder.isSettingDisabled('grid.full') },
                ]).getData('sizes'),

                /*
                 * Loaded rows from db
                 */
                rows : this.model_builder.getData('rows'),

                language_id : null,
            };
        },

        created() {
            //Set deep level of given model
            this.model.setDepthLevelByComponent(this);

            //For file paths
            this.root = this.$root.$http.$options.root;

            //Set empty model instance
            this.model.setRow(this.model.emptyRowInstance());

            //Set model properties
            this.model.setData('parentRow', this.parentRow||this.model.getData('parentRow'));

            this.model.setData('langid', this.langid);
            this.model.setData('scopes', this.scopes||[]);
        },

        mounted() {
            this.checkIfCanShowLanguages();

            this.updateParentChildData();

            this.setModelEvents();

            this.onModelUpdate();
        },

        destroyed(){
            this.removeModelEvents();

            this.removeModel(this.model);
        },

        watch : {
            //We want model reactive, when something changed in root models list
            model_builder: {
                deep : true,
                handler(newObject, oldObject) {
                    //We does not want to rewrite data in any case.
                    let skipKeys = ['data'];

                    for ( var key in newObject ) {
                        if ( skipKeys.indexOf(key) === -1 && _.isEqual(newObject[key], oldObject[key]) === false ) {
                            this.$set(this.model, key, newObject[key]);
                        }
                    }
                },
            },
            langid(value){
                this.model.setData('langid', value);
            },
            scopes(value){
                this.model.setData('scopes', value);
            },
            'parentRow.id'(id, oldId){
                //When parent row has been changed, then load children rows
                if ( ! _.isEqual(id, oldId) ){
                    //We need rewrite parent model if has been changed
                    this.model.setData('parentRow', this.parentRow);

                    //If parent form has been changed, we need reset actual form
                    this.model.resetForm();
                }
            },
            isEnabledOnlyFullScreenMode(state){
                if ( state === false ){
                    this.model.exitFullScreenMode();
                } else if ( state === true ) {
                    this.model.enableOnlyFullScreen();
                }
            },
        },

        methods : {
            ...mapMutations('models', [
                'storeModel',
                'removeModel',
            ]),
            onModelUpdate(){
                this.$watch('model.single', (state, oldstate) => {
                    if ( state === true && oldstate !== true ){
                        this.model.setRow(this.rows.data[0]||this.model.emptyRowInstance());
                        this.model.sendRowData();
                    }
                });
            },
            changeLanguage(id){
                this.$root.language_id = id;
            },
            setModelEvents(){
                eventHub.$on('sendRow', this.sendRowEvent = (data) => {
                    this.model.emitRowData('getRow', data);
                });

                eventHub.$on('sendParentRow', this.sendParentRowEvent = (data) => {
                    //Skip child components
                    if ( !data || this.model.getData('depth_level') > data.depth_level ) {
                        return;
                    }

                    this.model.emitRowData('getParentRow', data);
                });
            },
            removeModelEvents(){
                eventHub.$off('sendRowEvent', this.sendRowEvent);
                eventHub.$off('sendParentRow', this.sendParentRowEvent);
            },
            /*
             * Send into parent model all actual row and data changes
             */
            updateParentChildData(){
                this.$watch('rows.data', function(data){
                    this.sendRowsData();
                });
            },
            sendRowsData(){
                this.model.emitRowData('rowsChanged');
            },
            checkIfCanShowLanguages(){
                var languages_active = false;

                for ( var i = 0; i < this.$parent.$children.length; i++ )
                {
                    var parent = this.$parent.$children[i];

                    while ( 'model' in parent ){
                        if ( parent.model.localization == true )
                        {
                            languages_active = true;
                        }
                        parent = parent.$parent;
                    }
                }

                //Show or hide languages menu
                this.$root.languages_active = languages_active ? true : false;
            },
        },

        computed: {
            isEnabledOnlyFullScreenMode(){
                return this.model.isEnabledOnlyFullScreenMode();
            },
            //Row unit testing, to receive model row data
            row(){
                return this.model.getData('row');
            },
            canShowAdminHeader(){
                if ( this.model.isSettingDisabled('header') ){
                    return false;
                }

                return (
                    //If is child, we can display header only in this cases
                    (
                        this.ischild
                        && !this.model.isSingle()
                    )

                    //For parent models, we can display header only if
                    || (
                        !this.model.isSingle()
                        && (
                            this.model.isEnabledGrid()
                            || this.model.canShowSearchBar()
                            || this.canShowAddButton
                        )
                    )
                );
            },
            selectedRootLanguage(){
                return _.find(this.languages, { id : parseInt(this.langid) });
            },
            hasLanguages(){
                return this.languages.length > 0;
            },
            isActiveLanguageSwitch(){
                return this.$root.languages_active == true ? 1 : 0;
            },
            /*
             * Return if acutal model can be added without parent row, and if parent row is not selected
             */
            getModelKey(){
                return this.model.slug + '-' + (this.model.getParentTableName()||0);
            },
            canShowAddButton(){
                return this.model.canAddRow() && !this.model.isSingle() && this.model.hasAccess('insert') && !this.model.isOnlyFormOpened() && this.model.isSettingEnabled('buttons.create', true);
            },
            isSearching(){
                return this.model.getData('searching') == true;
            },
            isLocaleModel(){
                if ( this.model.localization === true )
                    return true;

                for ( var key in this.model.fields )
                    if ( this.model.fields[key].locale == true )
                        return true;

                return false;
            },
            languages(){
                return this.$root.languages;
            },
            canDisplayRowsLayout(){
                if ( this.model.canShowRows() ){
                    if ( this.model.isSettingEnabled('table', true) ) {
                        return true;
                    }

                    //Check if layouts does exists
                    return this.model.layouts.filter(layout => ['table-before', 'table-after'].includes(layout.position)).length > 0;
                }

                return false;
            }
        },
    }
</script>