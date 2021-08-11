<template>
    <div>
        <!-- Additional top layouts -->
        <custom-components :model="model" type="top" />

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
                    <div>
                        <h3 v-if="ischild" class="admin-header__title">{{ model.name }}</h3>
                        <span class="admin-header__description" v-if="model.title && ischild" v-html="model.title"></span>
                    </div>
                </div>

                <div class="right" v-if="!model.isSingle()">
                    <div class="searchbar__wrapper" :class="{ '--hasMoreButton' : model.getData('searching') }" v-show="canShowSearchBar">
                        <div class="searchbar__wrapper__queries">
                            <search
                                v-for="(query, $index) in search.queries"
                                :key="$index"
                                :search="query"
                                :model="model"
                            ></search>
                        </div>
                        <button
                            data-toggle="tooltip"
                            :data-original-title="_('Pridať ďalšie vyhľadávacie pravidlo')"
                            v-if="model.getData('searching')"
                            type="button"
                            class="btn btn-primary --addQuery"
                            @click="addSearchQuery">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>

                    <!-- Grid size -->
                    <ul class="change-grid-size d-none d-lg-flex" v-if="isEnabledGrid">
                        <li
                            v-for="size in sizes"
                            :data-size="size.key"
                            v-if="!size.disabled"
                            :class="{ 'active' : size.active, 'disabled' : size.disabled }"
                            data-toggle="tooltip"
                            :data-original-title="size.name"
                            @click="changeSize(size)">
                            <img :src="asset('images/grid/grid-'+size.key+''+(size.active ? '-active' : '')+'.svg')">
                        </li>
                    </ul>

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
                        @click.prevent="addNewRow"
                        type="button"
                        class="btn--icon btn btn-primary">
                        <i class="fa fa-plus"></i>
                        {{ newRowTitle() }}
                    </button>
                </div>
            </div>

            <div class="admin-model__body">
                <div class="row grid-table" :class="{ 'grid-fullsize' : model.activeGridSize() == 0 }">
                    <!-- left column -->
                    <div class="col--rows col-12" :class="['col-lg-'+(12-(12-model.activeGridSize())), { '--noMargin' : !model.canShowForm() }]" v-show="model.canShowRows()">
                        <custom-components :model="model" type="table-before" />

                        <model-rows-builder
                            v-show="model.isSettingEnabled('table', true)"
                            :model="model"
                            :rows="rows"
                            :gettext_editor="gettext_editor">
                        </model-rows-builder>

                        <custom-components :model="model" type="table-after" />
                    </div>
                    <!--/.col (left) -->

                    <!-- right column -->
                    <div :class="['col-lg-'+(12 - model.activeGridSize())]" class="col--form col-12" v-show="model.canShowForm()" v-if="activetab!==false">
                        <custom-components :model="model" type="form-before" />

                        <form-builder
                            :rows="rows"
                            :model="model"
                            :gettext_editor="gettext_editor"
                        ></form-builder>

                        <custom-components :model="model" type="form-after" />
                    </div>
                    <!--/.col (right) -->
                </div>
            </div>
        </div>

        <custom-components :model="model" type="bottom" />

        <history
            v-if="model.getData('history').id"
            :model="model">
        </history>
        <gettext-extension
            v-if="gettext_editor"
            :gettext_editor="gettext_editor"
            :gettext_table="model.table"
            ></gettext-extension>
    </div>
</template>

<script>
    import _ from 'lodash';
    import FormBuilder from '../Forms/FormBuilder.vue';
    import ModelRowsBuilder from '../Rows/ModelRowsBuilder.vue';
    import GettextExtension from '../Partials/GettextExtension.vue';
    import Search from '../Partials/Search.vue';
    import History from '../Partials/History.vue';
    import { mapMutations } from 'vuex';
    import {defaultSearchQuery} from '../Helpers/Model/ModelData';
    import CustomComponents from '@components/Partials/ModelBuilder/CustomComponents.vue';

    export default {
        props : ['model_builder', 'langid', 'ischild', 'parentrow', 'activetab', 'hasparentmodel', 'parentActiveGridSize', 'scopes'],

        name : 'model-builder',

        components : { FormBuilder, ModelRowsBuilder, CustomComponents, GettextExtension, Search, History },

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

                gettext_editor: null,
            };
        },

        created() {
            //For file paths
            this.root = this.$root.$http.$options.root;

            //Store model and save his model-builder component
            this.storeModel(this.model);

            //Set empty model instance
            this.model.setRow(this.model.emptyRowInstance());

            //Set model properties
            this.model.setData('hasparentmodel', this.hasparentmodel);
            this.model.setData('parentrow', this.parentrow);

            this.model.setData('activetab', this.activetab);
            this.model.setData('langid', this.langid);
            this.model.setData('scopes', this.scopes||[]);
            this.model.setData('parentActiveGridSize', this.parentActiveGridSize);

            //Set default search query
            if ( this.model.getData('search').queries.length == 0 ) {
                this.model.getData('search').queries.push({
                    ..._.cloneDeep(defaultSearchQuery),
                    column : this.model.getSettings('search.column', null),
                });
            }

            //Set deep level of given model
            this.setDeepLevel();
        },

        mounted() {
            this.checkIfCanShowLanguages();

            this.updateParentChildData();

            this.setModelEvents();

            this.checkParentGridSize(this.parentActiveGridSize);

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
            parentActiveGridSize(parentSize){
                this.model.setData('parentActiveGridSize', parentSize);

                this.checkParentGridSize(parentSize);
            },
            langid(value){
                this.model.setData('langid', value);
            },
            scopes(value){
                this.model.setData('scopes', value);
            },
            activetab(value){
                //Update parent model active tab
                this.model.setData('activetab', value);

                if ( value === true ) {
                    this.sendRowsData();
                }
            },
            parentrow(row, oldrow){
                //When parent row has been changed, then load children rows
                if ( ! _.isEqual(row, oldrow) && (row.id != oldrow.id || this.model.isInParent()) ){
                    //We need rewrite parent model if has been changed
                    this.model.setData('parentrow', this.parentrow);

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
            addSearchQuery(){
                this.model.getData('search').queries.push(
                    _.cloneDeep(defaultSearchQuery),
                );
            },
            checkParentGridSize(parentSize){
                if ( [null, undefined].indexOf(parentSize) > -1 ) {
                    return;
                }

                for ( var key in this.sizes ){
                    //If grid parent size is on full width, then enable all grid sizes in this model
                    if ( parentSize == 0 && this.model.getData('depth_level') <= 1 ) {
                        this.sizes[key].disabled = false;
                    }

                    //If grid parent size has small form, or model is sub in third level, then disable all except full screen
                    else if ( (parentSize == 8 || this.model.getData('depth_level') >= 2) && [0].indexOf(this.sizes[key].size) === -1 ) {
                        this.sizes[key].disabled = true;
                    }

                    //Disable all small sizes
                    else if ( [0, 6].indexOf(this.sizes[key].size) === -1  ) {
                        this.sizes[key].disabled = true;
                    }

                    //Enable other options
                    else {
                        this.sizes[key].disabled = false;
                    }
                }
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
            setDeepLevel(){
                var parent = this.$parent,
                    depth = 0,
                    treeUuids = [];

                while(parent.$options.name != 'base-page-view') {
                    if ( parent.$options.name == 'model-builder' ) {
                        treeUuids.push(parent.model.getData('uuid'));

                        depth++;
                    }

                    parent = parent.$parent;
                }

                this.model.setData('depth_level', depth);
                this.model.setData('tree', treeUuids);
            },
            changeSize(row){
                if ( row.disabled == true )
                    return false;

                for ( var key in this.sizes )
                    this.sizes[key].active = false;

                row.active = true;
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
            newRowTitle(){
                return this.model.getSettings('buttons.create', this.trans('new-row'));
            },
            addNewRow(){
                if ( this.model.isEnabledOnlyFormOrTableMode() == true ){
                    this.model.setData('formOpened', true);
                }

                this.$nextTick(() => {
                    this.model.resetFormWithEvents(true, true, true);
                });
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
            search(){
                return this.model.getData('search');
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
                            this.isEnabledGrid
                            || this.canShowSearchBar
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
                return this.model.slug + '-' + this.model.getParentTableName();
            },
            //Checks if is enabled grid system
            isEnabledGrid(){
                var enabled = _.filter(this.sizes, { disabled : false }),
                    active = _.find(this.sizes, { active : true });

                if ( enabled.length <= 1 || (active && active.disabled == true) ) {
                    //Disable all active items
                    _.filter(this.sizes, { active : true }).forEach(item => {
                        item.active = false;
                    })

                    if ( enabled[0] ) {
                        enabled[0].active = true;
                    }

                    return false;
                }

                if ( this.model.isSettingDisabled('grid') ) {
                    return false;
                }

                return true;
            },
            canShowAddButton(){
                return this.model.canAddRow() && !this.model.isSingle() && this.model.hasAccess('insert') && !this.model.isOnlyFormOpened();
            },
            /*
             * Show search if has been at least one time used, or if is not single row, or if is more then 10 rows
             */
            canShowSearchBar(){
                if ( this.model.isEnabledOnlyFormOrTableMode() === true && this.model.canShowForm() === true ){
                    return false;
                }

                if ( this.model.isSettingDisabled('search') ){
                    return false;
                }

                //If is forced showing searchbar
                if ( this.model.isSettingEnabled('search') ) {
                    return true;
                }

                var minimum = 2;
                return this.model.getData('searching') === true || (this.model.maximum==0 || this.model.maximum >= minimum) && this.rows.count >= minimum;
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
        },
    }
</script>