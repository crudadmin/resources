<template>
    <div>
        <!-- Additional top layouts -->
        <component
            v-for="name in getComponents('top')"
            :key="name"
            :model="model"
            :row="row"
            :rows="rows.data"
            :is="name">
        </component>

        <div class="alert alert-danger" v-if="languages.length == 0 && isLocaleModel">
            <strong>{{ trans('warning') }}!</strong>
            <p>{{ trans('languages-missing') }}</p>
        </div>

        <div class="alert alert-danger" v-if="!model.hasAccess('read') && !model.hasAccess('insert')">
            <strong>{{ trans('warning') }}!</strong>
            <p>{{ trans('no-permissions') }}</p>
        </div>

        <div class="admin-model" :data-depth="depth_level" :class="{ 'admin-model--single-mode' : model.isSingle(), 'admin-model--in-parent' : model.isInParent() }" v-show="canShowForm || (canShowRows || isSearching)">
            <div class="admin-model__header" :class="{ 'with-border' : model.isSingle() }" v-show="canShowAdminHeader">
                <div class="left">
                    <div>
                        <h3 v-if="ischild" class="admin-header__title">{{ model.name }}</h3>
                        <span class="admin-header__description" v-if="model.title && ischild" v-html="model.title"></span>
                    </div>
                </div>

                <div class="right" v-if="!model.isSingle()">
                    <div class="searchbar__wrapper" :class="{ '--hasMoreButton' : search.used }">
                        <div class="searchbar__wrapper__queries">
                            <search
                                v-for="(query, $index) in search.queries"
                                :key="$index"
                                v-show="canShowSearchBar"
                                :search="query"
                                :model="model"
                            ></search>
                        </div>
                        <button
                            data-toggle="tooltip"
                            :data-original-title="_('Pridať ďalšie vyhľadávacie pravidlo')"
                            v-if="search.used"
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

                    <!-- Choose language -->
                    <div class="dropdown" v-if="hasLanguages && isActiveLanguageSwitch && (!canShowForm || activeGridSize != 0)" data-global-language-switch>
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
                <div class="row grid-table" :class="{ 'grid-fullsize' : activeGridSize == 0 }">
                    <!-- left column -->
                    <div :class="['col-lg-'+(12 - activeGridSize)]" class="col--form col-12" v-show="canShowForm" v-if="activetab!==false">
                        <form-builder
                            :formID="formID"
                            :progress="progress"
                            :rows="rows"
                            :history="history"
                            :model="model"
                            :langid="selected_language_id ? selected_language_id : langid"
                            :selectedlangid="selected_language_id ? selected_language_id : langid"
                            :canaddrow="canAddRow"
                            :hasparentmodel="model.hasParentFormModel()"
                            :gettext_editor="gettext_editor"
                            :depth_level="depth_level"
                            :parentActiveGridSize="activeGridSize"
                            :isOnlyFormOpened="isOnlyFormOpened"
                            :isEnabledOnlyFormOrTableMode="isEnabledOnlyFormOrTableMode"
                            :hasRows="hasRows"
                            :row="row"
                        ></form-builder>
                    </div>
                    <!--/.col (left) -->

                    <!-- right column -->
                    <div class="col--rows col-12" :class="['col-lg-'+(12-(12-activeGridSize)), { '--noMargin' : !canShowForm }]" v-show="canShowRows">
                        <model-rows-builder
                            :model="model"
                            :rows="rows"
                            :row="row"
                            :scopes="scopes"
                            :langid="selected_language_id ? selected_language_id : langid"
                            :progress="progress"
                            :search="search"
                            :iswithoutparent="model.isWithoutParentRow()"
                            :activetab="activetab"
                            :gettext_editor="gettext_editor"
                            :depth_level="depth_level"
                            :allow_refreshing="allow_refreshing"
                            :history="history">
                        </model-rows-builder>
                    </div>
                    <!--/.col (right) -->
                </div>
            </div>
        </div>

        <component
            v-for="name in getComponents('bottom')"
            :key="name"
            :model="model"
            :row="row"
            :rows="rows.data"
            :is="name">
        </component>

        <history
            v-if="history.id"
            :model="model"
            :history="history">
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
    import ModelHelper from '../Helpers/ModelHelper.js';
    import { mapMutations } from 'vuex';

    var defaultSearchQuery = {
        column : null,
        query : null,
        query_to : null,
        interval : false,
    };

    export default {
        props : ['model_builder', 'langid', 'ischild', 'parentrow', 'activetab', 'hasparentmodel', 'parentActiveGridSize', 'scopes', 'allow_refreshing'],

        name : 'model-builder',

        components : { FormBuilder, ModelRowsBuilder, GettextExtension, Search, History },

        data(){
            return {
                model : this.model_builder,

                sizes : [
                    { size : 4, key : 'small', name : this.trans('grid-small'), active : false, disabled : this.model_builder.getSettings('grid.small.disabled', false) },
                    { size : 8, key : 'big', name : this.trans('grid-big'), active : false, disabled : this.model_builder.getSettings('grid.big.disabled', false) },
                    { size : 6, key : 'medium', name : this.trans('grid-medium'), active : false, disabled : this.model_builder.getSettings('grid.medium.disabled', false) },
                    { size : 0, key : 'full', name : this.trans('grid-full'), active : false, disabled : this.model_builder.getSettings('grid.full.disabled', false) },
                ],

                row : this.model_builder.setData('row', this.model_builder.emptyRowInstance()).getData('row'),

                /*
                 * Search engine
                 */
                search : {
                    used : false,
                    defaultQuery : defaultSearchQuery,
                    queries : [
                        {
                            ..._.cloneDeep(defaultSearchQuery),
                            column : this.model_builder.getModelProperty('settings.search.column', null),
                        },
                    ],
                },

                /*
                 * Loaded rows from db
                 */
                rows : this.model_builder.setData('rows', {
                    data : [],
                    buttons : {},
                    count : 0,
                    loaded : false,
                    save_children : [],
                }).getData('rows'),

                /*
                 * History for selected row
                 */
                history : {
                    history_id : null,
                    data : {},
                    id : null,
                    rows : [],
                    fields : [],
                },

                //Additional layouts/components for model
                layouts : [],
                registered_components : [],

                language_id : null,
                selected_language_id : null,

                progress : false,

                depth_level : 0,
                gettext_editor: null,

                formOpened : false,
            };
        },

        created() {
            //For file paths
            this.root = this.$root.$http.$options.root;

            //Store model and save his model-builder component
            this.storeModel(this.model);

            //Set model properties
            this.model.setData('hasparentmodel', this.hasparentmodel);
            this.model.setData('parentrow', this.parentrow);

            //We will map this model data values into this component
            this.model.mapData(['row'], this);

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
                this.checkParentGridSize(parentSize);
            },
            activetab(value){
                if ( value === true ) {
                    this.sendRowsData();
                }
            },
            parentrow(row, oldrow){
                //When parent row has been changed, then load children rows
                if ( ! _.isEqual(row, oldrow) && (row.id != oldrow.id || this.model.isInParent()) ){
                    //We need rewrite parent model if has been changed
                    this.model.setData('parentrow', this.parentrow);

                    var children = null;

                    //Get rows builder child
                    for ( var i = 0; i < this.$children.length; i++ ) {
                        if ( 'reloadRows' in this.$children[i] ){
                            children = this.$children[i];
                            break;
                        }
                    }

                    if ( children ){
                        children.reloadRows();
                        children.model.resetForm();
                    }
                }
            },
            /*
             * Register all layout components
             */
            layouts(layouts){
                var Vue = this;

                for ( var key in layouts )
                {
                    var layout = layouts[key];

                    this.registerComponents(layouts);

                    if ( layout.type == 'blade' ){
                        this.$root.runInlineScripts(layout.view);
                    }
                }
            }
        },

        methods : {
            ...mapMutations('models', [
                'storeModel',
            ]),
            onModelUpdate(){
                this.$watch('model.single', (state, oldstate) => {
                    if ( state === true && oldstate !== true ){
                        this.row = this.rows.data[0]||this.model.emptyRowInstance();

                        this.sendRowData();
                    }
                });
            },
            addSearchQuery(){
                this.search.queries.push(
                    _.cloneDeep(this.search.defaultQuery),
                );
            },
            checkParentGridSize(parentSize){
                if ( [null, undefined].indexOf(parentSize) > -1 ) {
                    return;
                }

                for ( var key in this.sizes ){
                    //If grid parent size is on full width, then enable all grid sizes in this model
                    if ( parentSize == 0 && this.depth_level <= 1 ) {
                        this.sizes[key].disabled = false;
                    }

                    //If grid parent size has small form, or model is sub in third level, then disable all except full screen
                    else if ( (parentSize == 8 || this.depth_level >= 2) && [0].indexOf(this.sizes[key].size) === -1 ) {
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
            getLangName(lang){
                return this.$root.getLangName(lang);
            },
            /*
             * Send all avaiable row events
             */
            sendRowData(){
                this.model.emitRowData('getRow');
                this.model.emitRowData('getParentRow');

                //We want assign row into model
                this.model.setData('row', this.row);
            },
            setModelEvents(){
                eventHub.$on('sendRow', this.sendRowEvent = (data) => {
                    this.model.emitRowData('getRow', data);
                });

                eventHub.$on('sendParentRow', this.sendParentRowEvent = (data) => {
                    //Skip child components
                    if ( !data || this.depth_level > data.depth_level ) {
                        return;
                    }

                    this.model.emitRowData('getParentRow', data);
                });
            },
            removeModelEvents(){
                eventHub.$off('sendRowEvent', this.sendRowEvent);
                eventHub.$off('sendParentRow', this.sendParentRowEvent);
            },
            showHistory(row){
                this.$http.get( this.$root.requests.get('getHistory', {
                    model : this.model.slug,
                    id : row.id,
                }))
                .then(function(response){
                    var data = response.data;

                    if ( data.length <= 1 )
                        return this.$root.openAlert(this.trans('info'), this.trans('no-changes'), 'warning');

                    this.history.id = row.id;
                    this.history.rows = data;
                })
                .catch(function(response){
                    this.$root.errorResponseLayer(response);
                });
            },
            getComponents(type){
                return this.layouts.filter(item => {
                    if ( this.registered_components.indexOf(item.name) === -1 && !Vue.options.components[item.component_name] ) {
                        return false;
                    }

                    return item.position == type;
                }).map(item => {
                    //We want register component from custom bundle. With all other events.
                    if ( this.isGlobalComponent(item.component_name) ){
                        return this.componentName(this.model, item.component_name);
                    }

                    return this.getComponentName(item.name);
                });
            },
            registerComponents(layouts){
                for ( var i = 0; i < layouts.length; i++ ) {
                    var name = layouts[i].name,
                        data = layouts[i].view,
                        obj;

                    if ( layouts[i].type == 'vuejs' )
                    {
                        try {
                            obj = this.getComponentObject(data);
                        } catch(error){
                            console.error('Syntax error in component ' + layouts[i].name + '.Vue' + "\n", error);
                            continue;
                        }
                    }

                    //Create blade component
                    else {
                        var data = $(data);
                            data.find('script').remove();
                            data.find('style').remove();

                        obj = {
                            template: '<div class="my-component" data-component="'+name+'">'+data.html()+'</div>',
                        };
                    }

                    if ( obj ) {
                        this.registered_components.push(name);

                        Vue.component(this.getComponentName(name), obj);
                    }
                }
            },
            getComponentName(name){
                return name + 'Layout';
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

                this.depth_level = depth;

                this.model.setData('depth_level', depth);
                this.model.setData('tree', treeUuids);
            },
            /*
             * Returns if model has next childs
             */
            hasChilds(){
                var length = 0;

                for ( var key in this.model.childs ) {
                    length++;
                }

                return length;
            },
            hasModelsInGroups(childs){
                for ( var i = 0 ; i < childs.length; i++ ) {
                    //Check if group field is tab
                    if ( typeof childs[i] != 'object' ) {
                        continue;
                    }

                    //If model is in recursive tabs or group
                    if ( childs[i].model ){
                        return true;
                    }

                    //If tab has other childs, then check recursive
                    if ( childs[i].fields.length > 0 ) {
                        if ( this.hasModelsInGroups(childs[i].fields) ) {
                            return true;
                        }
                    }
                }

                return false;
            },
            getStorage(){
                return $.parseJSON(localStorage.sizes||'{}')||{};
            },
            enableOnlyFullScreen(){
                for ( var key in this.sizes ) {
                    if ( key != 3 ) {
                        this.sizes[key].disabled = true;
                        this.sizes[key].active = false;
                    }
                }

                return this.sizes[3].active = true;
            },
            checkActiveGridSize(columns){
                var data = this.getStorage(),
                    defaultValue = this.model.getSettings('grid.default'),
                    columns = Object.keys(columns);

                //Disable big table
                if ( columns.length >= 5 )
                    this.sizes[0].disabled = true;

                //Full screen
                if ( ! this.canShowForm || this.model.isSingle() ) {
                    return this.enableOnlyFullScreen();
                }

                //Select size from storage
                if ( this.model.slug in data && data[this.model.slug + '_default'] == defaultValue ) {
                    for ( var key in this.sizes ) {
                        if ( this.sizes[key].size == data[ this.model.slug ] ) {
                            return this.sizes[key].active = true;
                        }
                    }
                } else if ( defaultValue !== null ){
                    // If model has default grid property
                    for ( var key in this.sizes ) {
                        if ( this.sizes[key].size == defaultValue || this.sizes[key].key == defaultValue ) {
                            return this.sizes[key].active = true;
                        }
                    }
                }

                /*
                 * When is localStorage value empty, then automatic chose the best grid value.
                 * In this case we need check for all full screen options
                 */
                if (
                    this.hasModelsInGroups(this.model.fields_groups)
                    || this.hasChilds() > 0
                    || columns.length > this.fullSizeByColumns()
                ) {
                    return this.sizes[3].active = true;
                }

                //50/50
                this.sizes[2].active = true;
            },
            fullSizeByColumns(){
                if ( window.innerWidth < 1500 ) {
                    return 4;
                }

                return 5;
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
            /*
             * Close history rows
             */
            closeHistory(with_fields){
                this.history.id = null;
                this.history.rows = [];

                if ( ! with_fields )
                {
                    this.history.fields = [];
                    this.history.history_id = null;
                }
            },
            newRowTitle(){
                return this.model.getSettings('buttons.create', this.trans('new-row'));
            },
            addNewRow(){
                if ( this.isEnabledOnlyFormOrTableMode == true ){
                    this.formOpened = true;
                }

                this.$nextTick(() => {
                    this.resetForm(true, true, true);
                });
            },
            closeForm(){
                this.formOpened = false;
            },
            resetForm(scroll, dontResetIfNotOpened, resetActiveTab){
                if ( ! dontResetIfNotOpened || this.model.isOpenedRow() ) {
                    //We do not want reset object is is already empty instance
                    //Because if component receives getParentRow, and then will be rewrited row observer
                    //Changes in this component wont be interactive
                    if ( ! _.isEqual(this.row, this.model.emptyRowInstance()) ) {
                        this.model.resetForm();
                    }
                }

                if ( scroll === true ) {
                    this.scrollTo('#'+this.formID);

                    this.pulseForm();
                }

                if ( resetActiveTab === true ) {
                    eventHub.$emit('changeActiveTab', {
                        table : this.model.table,
                        depth_level : this.depth_level,
                        activetab : 0,
                    });
                }
            },
            pulseForm(){
                //If is not full grid, then animate form
                if ( this.activeGridSize == 0 && this.canShowRows && this.depth_level == 0 ) {
                    return;
                }

                //Only table/form mode enabled
                if ( this.isEnabledOnlyFormOrTableMode === true ){
                    return false;
                }

                var form = $('#'+this.formID);

                form.addClass('animated shake');

                if ( this.formPusling )
                    return;

                this.formPusling = setTimeout(() => {
                    form.removeClass('animated shake');

                    this.formPusling = null;
                }, 1000);
            },
        },

        computed: {
            isOnlyFormOpened(){
                return this.formOpened == true && this.isEnabledOnlyFormOrTableMode === true;
            },
            isEnabledOnlyFormOrTableMode(){
                return this.activeGridSize === 0 && this.model.isInParent() !== true && this.model.getSettings('grid.splitmode') !== true;
            },
            activeGridSize(){
                var size = this.sizes.filter(row => {
                    if ( row.active == true ) {
                        var rows = this.getStorage();
                            rows[ this.model.slug ] = row.size;
                            rows[ this.model.slug + '_default' ] = this.model.getSettings('grid.default');

                        localStorage.sizes = JSON.stringify( rows );
                    }

                    return row.active == true;
                });

                return size[0] ? size[0].size : null;
            },
            canShowAdminHeader(){
                if ( this.model.getSettings('header.enabled', true) === false ){
                    return false;
                }

                return (
                    //If is child, we can display header only in this cases
                    this.ischild
                    && !this.model.isSingle()

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
            formID(){
                return 'form-' + this.depth_level + '-' + this.model.slug;
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

                if ( this.model.getSettings('grid.enabled') === false || this.model.getSettings('grid.disabled') === true )
                    return false;

                return true;
            },
            canShowRows(){
                if ( this.model.getSettings('table.enabled', true) === false ){
                    return false;
                }

                if ( this.isEnabledOnlyFormOrTableMode === true && (this.model.isOpenedRow() || this.isOnlyFormOpened === true) ){
                    return false;
                }

                if ( this.model.hasAccess('read') == false ) {
                    return false;
                }

                if ( this.model.isSingle() ){
                    this.enableOnlyFullScreen();

                    return false;
                }

                return true;
            },
            canAddRow(){
                //Disabled adding new rows
                if ( this.model.insertable == false || !this.model.hasAccess('insert') ) {
                    return false;
                }

                //Unlimited allowed rows
                if ( this.model.maximum == 0 ) {
                    return true;
                }

                if ( this.model.maximum <= this.rows.count ) {
                    return false;
                }

                return true;
            },
            canShowAddButton(){
                return this.canAddRow && !this.model.isSingle() && this.model.hasAccess('insert') && !this.isOnlyFormOpened;
            },
            canShowForm(){
                if ( this.model.getSettings('form.enabled', true) === false ){
                    return false;
                }

                if ( (!this.model.isOpenedRow() && !this.canAddRow || this.model.isOpenedRow() && (this.model.editable == false && this.model.displayable !== true)) && !this.model.isInParent() ) {
                    return false;
                }

                //If row is not selected, and form is not opened. But in table needs exists rows
                if ( this.isEnabledOnlyFormOrTableMode === true && !this.model.isOpenedRow() && this.isOnlyFormOpened === false && this.model.isSingle() == false ){
                    return false;
                }

                //If user does not have write permissions
                if ( !this.model.isOpenedRow() && this.model.hasAccess('insert') == false ) {
                    return false;
                }

                return true;

            },
            hasRows(){
                if ( this.rows.loaded == false && this.model.maximum != 1 ){
                    return true;
                }

                return this.rows.data.length > 0;
            },
            /*
             * Show search if has been at least one time used, or if is not single row, or if is more then 10 rows
             */
            canShowSearchBar(){
                if ( this.isEnabledOnlyFormOrTableMode === true && this.canShowForm === true ){
                    return false;
                }

                var searching = this.model.getSettings('search.enabled', null),
                    minimum = 2;

                //If is forced showing searchbar
                if ( searching === true ) {
                    return true;
                }

                else if ( searching === false ) {
                    return false;
                }

                return this.search.used === true || (this.model.maximum==0 || this.model.maximum >= minimum) && this.rows.count >= minimum;
            },
            isSearching(){
                return this.search.used == true;
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