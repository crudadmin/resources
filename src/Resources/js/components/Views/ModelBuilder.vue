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
                    <!-- Search bar -->
                    <div class="search-bar" data-search-bar :class="{ interval : search.interval, resetRightBorders : canBeInterval || canResetSearch, hasResetButton : canResetSearch  }" :id="getFilterId" v-show="canShowSearchBar">
                        <div class="input-group">
                            <div class="dropdown">
                                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    {{ getSearchingColumnName(search.column) }}
                                    <i class="--icon-right fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li data-field="" :class="{ active : !search.column }" @click="search.column = null">{{ trans('search-all') }}</li>
                                    <li data-field="id" :class="{ active : search.column == 'id' }" @click="search.column = 'id'">{{ getSearchingColumnName('id') }}</li>
                                    <li :data-field="key" v-for="key in getSearchableFields" :class="{ active : search.column == key }" @click="search.column = key">{{ getSearchingColumnName(key) }}</li>
                                    <li data-field="created_at" :class="{ active : search.column == 'created_at' }" @click="search.column = 'created_at'">{{ getSearchingColumnName('created_at') }}</li>
                                </ul>
                            </div>
                            <!-- /btn-group -->

                            <!-- Search columns -->
                            <input type="text" v-show="isSearch" data-search-text :placeholder="trans('search')+'...'" @input="updateSearchQuery('query', $event)" class="form-control">

                            <input type="text" v-show="isDate" data-search-date readonly class="form-control js_date">

                            <select type="text" v-show="isCheckbox" v-model="search.query" class="form-control">
                                <option value="0">{{ trans('off') }}</option>
                                <option value="1">{{ trans('on') }}</option>
                            </select>

                            <div class="select" v-show="isSelect">
                                <select v-model="search.query" data-search-select class="form-control js_chosen" :data-placeholder="trans('get-value')">
                                    <option value="">{{ trans('show-all') }}</option>
                                    <option v-for="data in languageOptionsSearchFilter(isSelect ? model.fields[search.column].options : [])" :value="data[0]">{{ data[1] }}</option>
                                </select>
                            </div>
                            <!-- Search columns -->

                            <div class="interval-btn" data-interval v-if="canBeInterval" data-toggle="tooltip" data-original-title="Interval">
                                <button class="btn" :class="{ 'btn-default' : !search.interval, 'btn-primary' : search.interval }" @click="search.interval = !search.interval"><i class="fa fa-arrows-alt-h"></i></button>
                            </div>

                            <input type="text" data-inerval-input data-search-interval-text v-show="search.interval && isSearch" :placeholder="trans('search')+'...'"  @input="updateSearchQuery('query_to', $event)" class="form-control">

                            <input type="text" data-inerval-input data-search-interval-date v-show="search.interval && isDate" readonly class="form-control js_date">

                            <div class="interval" data-reset-interval v-if="canResetSearch" data-toggle="tooltip" :data-original-title="trans('reset')">
                                <button class="btn btn-default" @click="resetIterval"><i class="fa fa-times"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- Grid size -->
                    <ul class="change-grid-size" v-if="isEnabledGrid" data-toggle="tooltip" :data-original-title="trans('edit-size')">
                        <li v-for="size in sizes" :data-size="size.key" v-if="!size.disabled" :class="{ 'active' : size.active, 'disabled' : size.disabled }" @click="changeSize(size)">{{ size.name }}</li>
                    </ul>

                    <!-- Choose language -->
                    <div class="dropdown" v-if="hasLanguages && isActiveLanguageSwitch" data-global-language-switch>
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
                    <button v-if="canAddRow && !model.isSingle() && model.hasAccess('insert')" data-create-new-row @click.prevent="resetForm(true, true, true)" type="button" class="btn--icon btn btn-primary">
                        <i class="fa fa-plus"></i>
                        {{ newRowTitle() }}
                    </button>
                </div>
            </div>

            <div class="admin-model__body">
                <div :class="{ 'row' : true, 'grid-fullsize' : activeGridSize == 0 }">
                    <!-- left column -->
                    <div :class="['col-lg-'+(12 - activeGridSize)]" class="col col--form col-md-12 col-sm-12" v-show="canShowForm" v-if="activetab!==false">
                        <form-builder
                            :formID="formID"
                            :progress.sync="progress"
                            :rows.sync="rows"
                            :history="history"
                            :model="model"
                            :langid="selected_language_id ? selected_language_id : langid"
                            :selectedlangid.sync="selected_language_id"
                            :canaddrow="canAddRow"
                            :hasparentmodel="hasparentmodelMutated"
                            :gettext_editor.sync="gettext_editor"
                            :depth_level="depth_level"
                            :parentActiveGridSize="activeGridSize"
                            :row.sync="row"
                        ></form-builder>
                    </div>
                    <!--/.col (left) -->

                    <!-- right column -->
                    <div :class="['col-lg-'+(12-(12-activeGridSize))]" class="col col--rows col-md-12 col-sm-12" v-show="canShowRows">
                        <model-rows-builder
                            :model.sync="model"
                            :rows.sync="rows"
                            :row.sync="row"
                            :langid="selected_language_id ? selected_language_id : langid"
                            :progress.sync="progress"
                            :search="search"
                            :iswithoutparent="isWithoutParentRow"
                            :activetab="activetab"
                            :gettext_editor.sync="gettext_editor"
                            :depth_level="depth_level"
                            :history="history">
                        </model-rows-builder>
                    </div>
                    <!--/.col (right) -->
                </div>

                <model-builder
                    dusk="model-builder"
                    :data-model="getModel(child).table"
                    v-if="(isOpenedRow || getModel(child).without_parent == true) && getModel(child).in_tab !== true"
                    v-for="child in model.childs"
                    :key="getModel(child).slug"
                    :hasparentmodel="hasparentmodelMutated"
                    :langid="langid"
                    :ischild="true"
                    :model="getModel(child)"
                    :parentActiveGridSize="activeGridSize"
                    :activetab="activetab"
                    :parentrow="row">
                </model-builder>
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

        <history v-if="history.id" :history="history"></history>
        <gettext-extension v-if="gettext_editor" :gettext_editor.sync="gettext_editor"></gettext-extension>
    </div>
</template>

<script>
    import _ from 'lodash';
    import FormBuilder from '../Forms/FormBuilder.vue';
    import ModelRowsBuilder from '../Rows/ModelRowsBuilder.vue';
    import GettextExtension from '../Partials/GettextExtension.vue';
    import History from '../Partials/History.vue';
    import ModelHelper from '../Helpers/ModelHelper.js';

    export default {
        props : ['model_builder', 'langid', 'ischild', 'parentrow', 'activetab', 'hasparentmodel', 'parentActiveGridSize'],

        name : 'model-builder',

        components : { FormBuilder, ModelRowsBuilder, GettextExtension, History },

        data : function(){
            return {
                model : this.model_builder,

                sizes : [
                    { size : 4, key : 'small', name : this.trans('grid-small'), active : false, disabled : false },
                    { size : 8, key : 'big', name : this.trans('grid-big'), active : false, disabled : false },
                    { size : 6, key : 'medium', name : this.trans('grid-medium'), active : false, disabled : false },
                    { size : 0, key : 'full', name : this.trans('grid-full'), active : false, disabled : false },
                ],

                row : this.emptyRowInstance(this.model_builder),

                /*
                 * Search engine
                 */
                search : {
                    column : this.$root.getModelProperty(this.model_builder, 'settings.search.column', null),
                    query : null,
                    query_to : null,
                    used : false,
                    interval : false,
                },

                /*
                 * Loaded rows from db
                 */
                rows : {
                    data : [],
                    buttons : {},
                    count : 0,
                    loaded : false,
                    save_children : [],
                },

                /*
                 * History for selected row
                 */
                history : {
                    history_id : null,
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
            };
        },

        created() {
            //For file paths
            this.root = this.$root.$http.$options.root;

            //Set deep level of models
            this.setDeepLevel();
        },

        mounted() {
            this.checkIfCanShowLanguages();

            this.initSearchSelectboxes();

            this.resetSearchBar();

            this.updateParentChildData();

            this.setModelEvents();

            this.checkParentGridSize(this.parentActiveGridSize);
        },

        destroyed(){
            this.removeModelEvents();
        },

        watch : {
            //We want model reactive, when something changed in root models list
            model_builder: {
                deep : true,
                handler(newObject, oldObject) {
                    for ( var key in newObject ) {
                        if ( newObject[key] != oldObject[key] ) {
                            this.$set(this.model, key, newObject[key]);
                        }
                    }
                },
            },
            parentActiveGridSize(parentSize){
                this.checkParentGridSize(parentSize);
            },
            search : {
                deep : true,
                handler(search, oldsearch){
                    //Update select
                    this.reloadSearchBarSelect();
                },
            },
            activetab(value){
                if ( value === true ) {
                    this.sendRowsData();
                }
            },
            parentrow(row, oldrow){
                //When parent row has been changed, then load children rows
                if ( ! _.isEqual(row, oldrow) ){
                    var children = null;

                    //Get rows builder child
                    for ( var i = 0; i < this.$children.length; i++ )
                        if ( 'reloadRows' in this.$children[i] ){
                            children = this.$children[i];
                            break;
                        }

                    if ( children ){
                        children.reloadRows();
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
            checkParentGridSize(parentSize){
                if ( [null, undefined].indexOf(parentSize) > -1 )
                    return;

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
                this.emitRowData('getRow');
                this.emitRowData('getParentRow');
            },
            emitRowData(type, data){
                if ( data && data.table && data.table != this.model.table )
                    return;

                eventHub.$emit(type, {
                    model : this.model,
                    table : this.model.table,
                    slug : this.model.table,
                    row : this.row,
                    rows : this.rows.data,
                    count : this.rows.count,
                    component : this,
                    depth_level : this.depth_level,
                });
            },
            setModelEvents(){
                eventHub.$on('sendRow', this.sendRowEvent = (data) => {
                    this.emitRowData('getRow', data);
                });

                eventHub.$on('sendParentRow', this.sendParentRowEvent = (data) => {
                    //Skip child components
                    if ( !data || !(this.depth_level < data.depth_level) )
                        return;

                    this.emitRowData('getParentRow', data);
                });
            },
            removeModelEvents(){
                eventHub.$off('sendRowEvent', this.sendRowEvent);
                eventHub.$off('sendParentRow', this.sendParentRowEvent);
            },
            updateSearchQuery: _.debounce(function(input, e){
                this.search[input] = e.target.value;
            }, 300),
            /*
             * Returns correct values into multilangual select
             */
            languageOptionsSearchFilter(array){
                return this.$root.languageOptions(array, this.model.fields[this.search.column]);
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
                    if ( this.registered_components.indexOf(item.name) === -1 )
                        return false;

                    return item.position == type;
                }).map(item => {
                    return this.getComponentName(item.name);
                });
            },
            registerComponents(layouts){
                for ( var i = 0; i < layouts.length; i++ )
                {
                    var name = layouts[i].name,
                        data = layouts[i].view,
                        obj;

                    if ( layouts[i].type == 'vuejs' )
                    {
                        try {
                            obj = this.$root.getComponentObject(data);
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

                    this.registered_components.push(name);

                    Vue.component(this.getComponentName(name), obj);
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
                this.emitRowData('rowsChanged');
            },
            resetSearchBar(){
                //On change column reset input
                this.$watch('search.column', function(column, prevcolumn){

                    //Reset searched value if previous column was select or option
                    if ( prevcolumn && prevcolumn in this.model.fields && ['select', 'option'].indexOf(this.model.fields[prevcolumn].type) !== -1 )
                        this.search.query = null;

                    this.search.interval = false;

                    this.reloadDatetimeSearch();
                });
            },
            setDeepLevel(){
                var parent = this.$parent,
                    depth = 0;

                while(parent.$options.name != 'base-page-view')
                {
                    if ( parent.$options.name == 'model-builder' )
                        depth++;

                    parent = parent.$parent;
                }

                this.depth_level = depth;
            },
            initSearchSelectboxes(){
                window.js_date_event = document.createEvent('HTMLEvents');

                var dispached = false;

                js_date_event.initEvent('change', true, true);

                $('#'+this.getFilterId+' .js_chosen').chosen({disable_search_threshold: 5}).on('change', function(){
                    if ( dispached == false )
                    {
                            dispached = true;
                            this.dispatchEvent(js_date_event);
                    } else {
                            dispached = false;
                    }
                });
            },
            reloadDatetimeSearch(){
                if ( ! this.isDate )
                    return;

                var column = this.search.column;

                //Add datepickers
                $('#'+this.getFilterId+' .js_date').datetimepicker({
                    lang: this.$root.locale,
                    format: column == 'created_at' ? 'd.m.Y' : this.model.fields[column].date_format,
                    timepicker: column == 'created_at' ? false : this.model.fields[column].type != 'date',
                    datepicker: column == 'created_at' ? true : this.model.fields[column].type != 'time',
                    scrollInput: false,
                    onChangeDateTime : (current_date_time, e) => {
                        this.search[e.attr('data-search-date') === undefined ? 'query_to' : 'query'] = moment(current_date_time).format('DD.MM.Y');
                    }
                });
            },
            getParentTableName(force){
                var row = this.$parent.row;

                //if is model loaded in field, and has parent row, then load model of that parent
                if ( this.hasparentmodelMutated && typeof this.hasparentmodelMutated == 'object' && 'slug' in this.hasparentmodelMutated )
                    return this.hasparentmodelMutated.slug;

                if ( force !== true && ((!row || !( 'id' in row )) || this.hasparentmodelMutated === false) )
                    return 0;

                return this.$parent.model.slug;
            },
            /*
             * Returns if model has next childs
             */
            hasChilds(){
                var length = 0;

                for ( var key in this.model.childs )
                    length++;

                return length;
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
                    defaultValue = this.$root.getModelProperty(this.model, 'settings.grid.default'),
                    columns = Object.keys(columns);

                //Disable big table
                if ( columns.length >= 5 )
                    this.sizes[0].disabled = true;

                //Full screen
                if ( ! this.canShowForm || this.model.isSingle() ) {
                    return this.enableOnlyFullScreen();
                }

                //Select size from storage
                if ( this.model.slug in data && data[this.model.slug + '_default'] == defaultValue )
                {
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
                 * When is localStorage value empty, then automatic chose the best grid value
                 */
                //Full screen
                if ( this.hasChilds() > 0 || columns.length > this.fullSizeByColumns() ) {
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
            getSearchingColumnName(column){
                if ( column == 'id' )
                    return this.trans('number');

                if ( column == 'created_at' )
                    return this.trans('created-at');

                if ( ! column || !(column in this.model.fields) )
                    return this.trans('search-all');

                var field = this.model.fields[column],
                        name = field.name && field.name.length > 20 ? field.name.substr(0, 20) + '...' : field.name;

                return name;
            },
            reloadSearchBarSelect(){
                this.$nextTick(() => {
                    $('#'+this.getFilterId+' .js_chosen').trigger("chosen:updated");
                });
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
                return this.$root.getModelProperty(this.model, 'settings.buttons.insert', this.trans('new-row'));
            },
            resetForm(scroll, dontResetIfNotOpened, resetActiveTab){
                if ( ! dontResetIfNotOpened || this.isOpenedRow ) {
                    //We do not want reset object is is already empty instance
                    //Because if component receives getParentRow, and then will be rewrited row observer
                    //Changes in this component wont be interactive
                    if ( ! _.isEqual(this.row, this.emptyRowInstance()) ) {
                        this.row = this.emptyRowInstance();
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
                if ( this.activeGridSize == 0 && this.canShowRows && this.depth_level == 0 )
                    return;

                var form = $('#'+this.formID);

                form.addClass('animated shake');

                if ( this.formPusling )
                    return;

                this.formPusling = setTimeout(() => {
                    form.removeClass('animated shake');

                    this.formPusling = null;
                }, 1000);
            },
            emptyRowInstance(model){
                var row = {},
                    model = model||this.model,
                    table;

                //Add foreign columns
                if ( this.parentrow && model && model.foreign_column != null ) {
                    if ( table = model.foreign_column[this.getParentTableName()] )
                        row[table] = this.parentrow.id;
                }

                //Add default columns
                for ( var key in model.fields )
                    row[key] = null;

                return row;
            },
            getModel(model){
                //if is recursive model
                if ( typeof model === 'string' ){
                    return _.cloneDeep(this.$root.models[this.model.slug]);
                }

                return ModelHelper(model);
            },
            resetIterval(){
                this.search.query = '';
                this.search.query_to = '';
            },
        },

        computed: {
            activeGridSize(){
                var size = this.sizes.filter(row => {
                    if ( row.active == true ) {
                        var rows = this.getStorage();
                            rows[ this.model.slug ] = row.size;
                            rows[ this.model.slug + '_default' ] = this.$root.getModelProperty(this.model, 'settings.grid.default');

                        localStorage.sizes = JSON.stringify( rows );
                    }

                    return row.active == true;
                });

                return size[0] ? size[0].size : null;
            },
            canShowAdminHeader(){
                return (
                    this.ischild
                    && !this.model.isSingle()
                    && (
                        !this.model.in_tab
                        || this.isEnabledGrid
                        || this.canShowSearchBar
                    )
                    || (
                        !this.model.isSingle()
                        && (
                            this.isEnabledGrid
                            || this.canShowSearchBar
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
            hasparentmodelMutated(){
                //If parent model builder does not exists
                if ( [null, undefined].indexOf(this.hasparentmodel) > -1 )
                    return true;

                return this.hasparentmodel;
            },
            canBeInterval(){
                var column = this.search.column;

                if ( ['created_at', 'id'].indexOf(column) > -1 )
                    return true;

                return column in this.model.fields && (['integer', 'decimal', 'date', 'datetime', 'time'].indexOf(this.model.fields[column].type) > -1) ? true : false;
            },
            canResetSearch(){
                return this.search.query || this.search.query_to;
            },
            isOpenedRow(){
                return this.row && 'id' in this.row;
            },
            /*
             * Return if acutal model can be added without parent row, and if parent row is not selected
             */
            isWithoutParentRow(){
                return this.model.without_parent == true && this.parentrow && this.$parent.isOpenedRow !== true && this.hasparentmodelMutated == true;
            },
            getFilterId(){
                return 'js_filter' + this.getModelKey;
            },
            getModelKey(){
                return this.model.slug + '-' + this.getParentTableName();
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

                if ( this.$root.getModelProperty(this.model, 'settings.grid.enabled') === false || this.$root.getModelProperty(this.model, 'settings.grid.disabled') === true )
                    return false;

                return true;
            },
            canShowRows(){
                if ( ! this.hasRows )
                    return false;

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
                if ( this.model.insertable == false )
                    return false;

                //Unlimited allowed rows
                if ( this.model.maximum == 0 )
                    return true;

                if ( this.model.maximum <= this.rows.count )
                    return false;

                return true;
            },
            canShowForm(){
                if ( !this.isOpenedRow && !this.canAddRow || this.isOpenedRow && this.model.editable == false)
                    return false;

                //If user does not have write permissions
                if ( !this.isOpenedRow && this.model.hasAccess('insert') == false )
                    return false;

                return true;

            },
            hasRows(){
                if ( this.rows.loaded == false && this.model.maximum != 1 )
                    return true;

                return this.rows.data.length > 0;
            },
            /*
             * Show search if has been at least one time used, or if is not single row, or if is more then 10 rows
             */
            canShowSearchBar(){
                var searching = this.$root.getModelProperty(this.model, 'settings.search.enabled', null),
                    minimum = 2;

                //If is forced showing searchbar
                if ( searching === true )
                    return true;
                else if ( searching === false )
                    return false;

                return this.search.used === true || (this.model.maximum==0 || this.model.maximum >= minimum) && this.rows.count >= minimum;
            },
            getSearchableFields(){
                var keys = [];

                //Get searchable fields
                for ( var key in this.model.fields )
                {
                    var field = this.model.fields[key];

                    if ( 'belongToMany' in field
                            || 'multiple' in field
                            || ( 'removeFromForm' in field && 'hidden' in field )
                            || field.type == 'password'
                    )
                        continue;

                    keys.push(key);
                }

                return keys;
            },

            /*
             * Search columns
             */
            isSearch(){
                return (this.isCheckbox || this.isDate || this.isSelect) ? false : true;
            },
            isCheckbox(){
                var column = this.search.column;

                return column && column in this.model.fields && this.model.fields[column].type == 'checkbox' ? true : false;
            },
            isDate(){
                var column = this.search.column;

                if ( column == 'created_at' )
                    return true;

                return column && column in this.model.fields && (['date', 'datetime', 'time'].indexOf(this.model.fields[column].type) > -1) ? true : false;
            },
            isSelect(){
                var column = this.search.column;

                return column && column in this.model.fields && (['select', 'radio'].indexOf(this.model.fields[column].type) > -1) ? true : false;
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