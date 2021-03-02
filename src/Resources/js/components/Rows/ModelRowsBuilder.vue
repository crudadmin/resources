<template>
    <div class="box box-wrapper">
        <div class="box-header">
            <div class="box-header__actions">
                <div class="box-header__left">
                    <div>
                        <h3 class="box-header__title">{{ title }} <small>({{ rows.count }})</small></h3>
                        <a data-toggle="tooltip" :title="_('Automatická synchronizácia záznamov v tabuľke je vypnutá')" class="box-header__actions--synchronize" @click="loadRows(true)" v-if="isEnabledAutoSync == false"><i class="fa fa-sync-alt"></i> {{ _('Synchronizácia vypnutá') }}</a>
                    </div>
                </div>

                <div class="box-header__right">
                    <component
                        v-for="name in getComponents('table-header-actions')"
                        :key="name"
                        :model="model"
                        :row="row"
                        :rows="rows.data"
                        :is="name">
                    </component>

                    <!-- Sheet download -->
                    <button
                        v-if="model.getSettings('xls') == true && rows.count > 0"
                        data-export-xls
                        @click.prevent="exportXlsTable"
                        type="button"
                        class="btn--icon btn btn-default">
                        <i class="fa fa-file-excel"></i>
                        {{ _('Stiahnuť excel') }}
                    </button>

                    <div class="dropdown fields-list" fields-list>
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" v-if="model.getSettings('table.switchcolumns', true) != false">
                            {{ trans('rows-list') }}
                            <i class="--icon-right fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu menu-left dropdown-menu-right">
                            <li @click="$event.stopPropagation()" v-for="(column, key) in enabled_columns" v-if="canShowColumn(column, key)" :class="{ active : column.enabled }" class="--no-item-padding">
                                <label class="--dropdown-item-padding --dropdown-item-vertical">
                                    <input type="checkbox" :data-column="key" v-model="column.enabled">
                                    {{ model.fieldName(key) }}
                                </label>
                            </li>
                            <li class="default-reset"><a href="#" @click.prevent="resetColumnsList">{{ trans('default') }}</a></li>
                        </ul>
                    </div>

                    <div class="dropdown actions-list fields-list" v-if="checked.length > 0 && hasAnyActions" data-action-list>
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{ trans('action') }}
                            <i class="--icon-right fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu menu-left dropdown-menu-right">
                            <li v-if="model.deletable && model.hasAccess('delete')"><a @click.prevent="removeRow()"><i class="fa fa-trash-alt"></i> {{ trans('delete') }}</a></li>
                            <li v-if="model.publishable && model.hasAccess('publishable')"><a @click.prevent="togglePublishedAt()"><i class="fa fa-eye"></i> {{ trans('publish-toggle') }}</a></li>
                            <li role="separator" v-if="hasButtons" class="divider"></li>
                            <li v-for="(button, button_key) in availableButtons"><a @click="buttonAction(button_key, button)"><i class="fa" :class="button.icon"></i> {{ button.name }}</a></li>
                        </ul>
                    </div>

                    <div class="pagination-limit" :class="{ '--hidden-limit' : isHiddenMode }" v-if="isPaginationEnabled" :title="trans('rows-count')">
                        <select @change="changeLimit" class="form-control" v-model="pagination.limit" data-limit>
                            <option value="hide">{{ _('Skryť') }}</option>
                            <option v-for="count in pagination.limits">{{ count }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <component
                v-for="name in getComponents('table-header')"
                :key="name"
                :model="model"
                :row="row"
                :rows="rows.data"
                :is="name">
            </component>
        </div>

        <div class="box-body box-body--table" v-show="!isHiddenMode">
            <table-rows
                :model="model"
                :pagination="pagination"
                :row.sync="row"
                :buttons="rows.buttons"
                :count="rows.count"
                :history="history"
                :gettext_editor.sync="gettext_editor"
                :rows="rows"
                :rowsdata.sync="rowsData"
                :button_loading="button_loading"
                :checked.sync="checked"
                :orderby.sync="orderBy"
                :depth_level="depth_level">
            </table-rows>
        </div>

        <div class="box-footer" v-show="!isHiddenMode">
            <component
                v-if="getComponents('table-footer').length > 0"
                v-for="name in getComponents('table-footer')"
                :key="name"
                :model="model"
                :row="row"
                :rows="rows.data"
                :is="name">
            </component>

            <div class="box-footer__actions">
                <div class="box-footer__left"></div>
                <div class="box-footer__center">
                    <pagination v-if="isPaginationEnabled" :rows="rows" :pagination="pagination" />
                </div>
                <div class="box-footer__right">
                    <div class="pagination-limit d-none d-lg-block" :class="{ '--hidden-limit' : isHiddenMode }" v-if="isPaginationEnabled" :title="trans('rows-count')">
                        <select @change="changeLimit" class="form-control" v-model="pagination.limit" data-limit>
                            <option value="hide">{{ _('Skryť') }}</option>
                            <option v-for="count in pagination.limits">{{ count }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <refreshing v-if="pagination.refreshing"></refreshing>
    </div>
    <!-- /.box -->
</template>

<script>
import Refreshing from '../Partials/Refreshing.vue';
import TableRows from './TableRows.vue';
import Pagination from '../Partials/Pagination.vue';

export default {
    props : ['model', 'row', 'rows', 'langid', 'progress', 'search', 'history', 'gettext_editor', 'iswithoutparent', 'activetab', 'depth_level', 'scopes', 'allow_refreshing'],

    components : { Refreshing, TableRows, Pagination },

    data : function(){
        return {
            table : null,

            //Sorting
            pagination: {
                position: 1,
                limit : this.getLimitFromStorage(),
                limits : [ 5, 10, 20, 30, 50, 100, 200, 500, 1000 ],
                refreshing : false,
                maxpages : 10,
            },

            searching : false,
            dragging : false,
            orderBy : null,

            refresh : {
                refreshing : true,
                count : 0,
                interval : this.getRefreshInterval(),
            },

            //Receive value from tablerows component
            checked : [],
            default_columns : [],
            enabled_columns : null,
            button_loading : false,

            modelOptions : {},
        };
    },

    created() {
        //For file paths
        this.root = window.crudadmin.root;

        //Set default order rows
        this.setOrder();

        //Refresh rows refreshInterval
        this.loadRows();

        /*
         * When row is added, then push it into table
         */
        eventHub.$on('onCreate', this.onCreateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.depth_level )
                return;

            var array = data.request,
                pages = Math.ceil(this.rows.count / this.pagination.limit);

            //If last page is full, and need to add new page
            if ( this.isReversed(true) && this.rows.count > 0 && !this.$parent.isWithoutParentRow && pages == this.rows.count / this.pagination.limit ){
                this.setPosition( pages + 1, this.$parent.isWithoutParentRow ? true : null );
            }

            //If user is not on lage page, then change page into last, for see added rows
            else if ( this.isReversed(true) && this.pagination.position < pages && !this.$parent.isWithoutParentRow ){
                this.setPosition( pages );
            }

            //If row can be pushed without reloading rows into first or last page
            else if ( this.pagination.position == 1 || (this.isReversed(true) && this.pagination.position == pages || this.$parent.isWithoutParentRow) )
            {
                var rows = array.rows.concat( this.rows.data );

                if ( rows.length > this.pagination.limit )
                    rows = rows.slice(0, this.pagination.limit);

                //Update buttons
                for ( var key in array.buttons ) {
                    this.rows.buttons[key] = array.buttons[key];
                }

                this.rows.data = rows;
                this.rows.count += array.rows.length;
            } else {
                this.loadRows();
            }
        });

        /*
         * When row is updated, then change data into table for changed rows
         */
        eventHub.$on('onUpdate', this.onUpdateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.depth_level )
                return;

            //Update row in table rows
            var row = data.row;

            for ( var key in this.rows.data )
            {
                if ( this.rows.data[key].id != row.id ) {
                    continue;
                }

                for ( var k in row ) {
                    this.$parent.rows.data[key][k] = row[k];
                }
            }

            //Reset history on update row
            this.$parent.closeHistory();

            //Reload rows on row update event
            if ( this.model.getSettings('reloadOnUpdate') == true ) {
                this.loadRows();
            }
        });

        /*
         * Reload table rows on request
         */
        eventHub.$on('reloadRows', this.onReloadRows = table => {
            if ( this.model.slug != table )
                return;

            this.loadRows();
        })
    },

    destroyed() {
        this.destroyTimeout();
        eventHub.$off('onCreate', this.onCreateEvent);
        eventHub.$off('onUpdate', this.onUpdateEvent);
        eventHub.$off('reloadRows', this.onReloadRows);
    },

    watch: {
        progress(state){
            if ( state == true )
                this.destroyTimeout();
            else
                this.initTimeout(false);
        },
        langid(langid){
            if ( this.model.localization == true ) {
                this.setPosition(1, true);
            }
        },
        activetab(value){
            if ( value == true )
                this.initTimeout(false);
        },
        model(){
            this.updateModelOptions();
        },
        modelOptions: {
            deep : true,
            handler(){
                this.updateModelOptions();
            }
        },
        'model.scopes' : {
            handler(a, b){
                this.setPosition(1, true);
            },
        },
        'search.queries' : {
            deep : true,
            handler(queries){
                var was_searching = this.searching;
                let searching = false;

                for ( var i = 0; i < queries.length; i++ ) {
                    let item = queries[i],
                        query = item.query||item.query_to;

                    if ( searching === false ){
                        searching = (
                            query && (
                                query.length >= 3
                                || (
                                    item.column
                                    && (
                                        (
                                            item.column in this.model.fields
                                            && ['select', 'option'].indexOf(this.model.fields[item.column].type) > -1
                                        )
                                        || $.isNumeric(query)
                                    )
                                )
                            )
                        ) ? true : false;
                    }
                }

                this.searching = searching;

                this.search.used = true;

                //On first search query reset pagination
                if ( this.searching == true && was_searching == false ){
                    this.setPosition(1, true);
                }

                //If is normal searching, then search in every char, or if is turned searching from on to off state, then show normal rows
                else if ( this.searching || ( this.searching == false && was_searching == true ) ) {
                    this.loadRows(true);
                }
            },
        },
        //On change enabled columns, reload full table with newer data
        enabled_columns : {
            deep : true,
            handler : function(columns, old){
                if ( ! old || ! columns )
                    return;

                this.loadRows(true);
            },
        }
    },

    computed: {
        isHiddenMode(){
            return this.pagination.limit == 'hide';
        },
        isEnabledAutoSync(){
            var limit = this.isPaginationEnabled ? this.pagination.limit : 0,
                refreshingRowsLimit = 100;

            return !(
                this.rows.count > 0 && this.model.maximum === 1 ||
                this.rows.count > refreshingRowsLimit && parseInt(limit) > refreshingRowsLimit
            );
        },
        hasAnyActions(){
            return this.hasButtons
                   || this.model.publishable && this.model.hasAccess('publishable')
                   || this.model.deletable && this.model.hasAccess('delete');
        },
        availableButtons(){
            var buttons = {};

            for ( var row_key in this.rows.buttons )
                for ( var key in this.rows.buttons[row_key] )
                    if ( ['action', 'both', 'multiple'].indexOf(this.rows.buttons[row_key][key].type) > -1 )
                        buttons[key] = this.rows.buttons[row_key][key];

            return buttons;
        },
        hasButtons(){
            return Object.keys(this.availableButtons).length > 0;
        },
        title(){
            var title;

            if ( title = this.model.getSettings('title.rows') )
            {
                return title;
            }

            return this.trans('rows');
        },
        isPaginationEnabled(){
            return this.model.getSettings('pagination.enabled') !== false && !this.iswithoutparent;
        },
        rowsData(){
            var field = this.orderBy[0],
                is_numeric = this.isNumericValue( field ),
                is_date = this.isDateValue( field ),
                is_locale = this.isLocaleValue( field ),
                is_decoded = this.model.getSettings('columns.'+field+'.encode', true) !== true,
                defaultSlug = this.$root.languages.length ? this.$root.languages[0].slug : null;

            //If is date field, then receive correct date format of this field
            if ( this.isDateValue( field ) && field in this.model.fields ){
                var format = this.$root.fromPHPFormatToMoment(this.model.fields[field].date_format);
            }

            return this.rows.data.slice(0).sort((a, b) => {
                //If is null value
                if ( ! a || ! b )
                    return false;

                let aValue = a[ field ],
                    bValue = b[ field ];

                //Added support to sort localized values
                if ( is_locale ) {
                    aValue = this.getLocaleFieldValue(aValue, defaultSlug)
                    bValue = this.getLocaleFieldValue(bValue, defaultSlug)
                }

                //Support for booleans
                if ( aValue === true || aValue === false )
                    aValue = aValue === true ? 1 : 0;

                if ( bValue === true || bValue === false )
                    bValue = bValue === true ? 1 : 0;

                a = this.getEncodedValue(aValue, is_decoded),
                b = this.getEncodedValue(bValue, is_decoded);

                //Sorting numbers
                if ( is_numeric )
                {
                    if ( this.orderBy[1] == 1 )
                        return b - a;

                    return a - b;
                }

                else if ( is_date && format ){
                    var c = moment(a, format),
                            d = moment(b, format);

                    if ( !c.isValid() || !d.isValid() )
                        return 0;

                    if ( this.orderBy[1] == 1 )
                        return d - c;

                    return c - d;
                }

                else {
                    if ( this.orderBy[1] == 1 )
                        return b.toLowerCase().localeCompare(a.toLowerCase(), 'sk');

                    return a.toLowerCase().localeCompare(b.toLowerCase(), 'sk');
                }
            });
        },
        enabledColumnsList(){
            var allowed = [];

            for ( var key in this.enabled_columns||{} ) {
                if ( this.enabled_columns[key].enabled == true && this.default_columns.indexOf(key) == -1 ) {
                    allowed.push(key);
                }
            }

            return allowed;
        }
    },

    methods: {
        //We need update modelOptions all the time model or modelOptions has been changed
        //because if model property in base $root models will change. options will dissapear.
        //This is buggy behaviour when data are set in beforeInitialAdminRequest model property
        updateModelOptions(){
            for ( var key in this.modelOptions ){
                if ( !_.isNil(this.model.fields[key].options) ) {
                    this.model.fields[key].options = this.modelOptions[key];
                }
            }
        },
        exportXlsTable(){
            this.loadRows(true, true)
        },
        getLimitFromStorage(){
            //Load pagination limit from localStorage
            var limit = this.iswithoutparent ? 500 : ('limit' in localStorage ? localStorage.limit : this.model.getSettings('pagination.limit', 10));

            return $.isNumeric(limit) ? parseInt(limit) : limit;
        },
        resetColumnsList(){
            for ( var key in this.$children )
            {
                var children = this.$children[key];

                if ( children.$options._componentTag == 'table-rows' )
                    children.$options.methods.resetAllowedColumns.call(children);
            }
        },
        getComponents(type){
            return this.$parent.getComponents(type);
        },
        getEncodedValue(value, is_decoded){
            return (is_decoded ? $('<div>'+value+'</div>').text() : value) + '';
        },
        canShowColumn(column, key){
            if ( ! column.name )
                return false;

            if ( key in this.model.fields && this.model.fields[key].type == 'password' )
                return false;

            return true;
        },
        reloadRows(){
            this.$parent.row = this.$parent.emptyRowInstance();
            this.rows.data = [];
            this.rows.count = 0;
            this.rows.save_children = [];

            this.loadRows();

            return true;
        },
        changeLimit(){
            localStorage.limit = this.pagination.limit;

            //Reset pagination to first page
            this.setPosition(1);
        },
        getParentRowId(){
            var row = this.$parent.parentrow;

            if ( !row || !( 'id' in row ) )
                return 0;

            return row.id;
        },
        loadRows(indicator, download){
            //If auto reloading is disabled from model.
            //This is used for canAdd rows, which are filtrated by parent row.
            //(If parent row is not saved yet, this rows may dissapear, so we need disable autoreloading)
            if ( this.allow_refreshing === false && indicator == false ){
                return;
            }

            //On first time allow reload rows without parent, for field options...
            if ( (this.$parent.isWithoutParentRow || this.activetab === false) && indicator == false ){
                return false;
            }

            if ( indicator !== false ) {
                this.pagination.refreshing = true;
            }

            // Remove last auto timeout
            this.destroyTimeout();

            var search_query = {},
                rowsLimit = this.isPaginationEnabled ? (this.isHiddenMode ? 1 : this.pagination.limit) : 0,
                query = {
                    model : this.model.slug,
                    parent : this.$parent.getParentTableName(this.model.without_parent),
                    subid : this.getParentRowId(),
                    langid : this.model.localization === true ? this.langid : 0,
                    limit : rowsLimit,
                    page : this.pagination.position,
                    count : this.refresh.count,
                };

            if ( download == true ){
                search_query.download = 1;
            }

            //If is enabled searching
            if ( this.searching == true ){
                search_query.search = [];

                for ( var i = 0; i < this.search.queries.length; i++ ){
                    let item = this.search.queries[i],
                        obj = {
                            query : item.query,
                            column : item.column,
                        }

                    if ( item.interval === true ) {
                        obj.query_to = item.query_to;
                    }

                    search_query.search.push(obj);
                }
            }

            //Add additional columns which are not in default rows state
            if ( this.enabledColumnsList.length > 0 ) {
                search_query.enabled_columns = this.enabledColumnsList.join(';');
            }

            //My error
            function customErrorAlert(response){
                var url = response.request.url;

                for ( var key in response.request.params )
                    url = url.replace('{'+key+'}', response.request.params[key]);

                this.$root.openAlert(this.trans('warning'), 'Nastala nečakana chyba, skúste neskôr prosím.<br><br>Príčinu zlyhania požiadavky môžete zistiť na tejto adrese:<br> <a target="_blank" href="'+url+'">'+url+'</a>', 'error');
            }

            var url = this.$root.requests.get('rows', query);

            this.addScopeParams(search_query);

            this.$http.get(url, {
                params : search_query,
            }).then(function(response){
                //If has been component destroyed, and request is delivered... and some conditions
                if ( this.dragging === true || this.progress === true || !this.$root ){
                    return;
                }

                if ( typeof response.data == 'string' ){
                    customErrorAlert.call(this, response);
                    return;
                }

                //Disable loader
                this.pagination.refreshing = false;

                if ( response.data.download ){
                    return window.location.href = response.data.download;
                }

                var requestModel = response.data.model;

                this.updateModel(requestModel);

                //Load rows into array
                this.updateRowsData(response.data.rows, this.enabledColumnsList.length == 0 ? null : 1);
                this.rows.count = response.data.count;

                //Bind additional buttons for rows
                this.rows.buttons = response.data.buttons;

                //Rows are successfully loaded
                this.$parent.rows.loaded = true;

                //If is reversed sorting in model, then set pagination into last page after first displaying table
                if ( this.isReversed() && this.refresh.count == 0 ) {
                    this.pagination.position = Math.ceil(this.rows.count / this.pagination.limit);
                }

                if ( this.refresh.count == 0 ){
                    //Update field options
                    this.updateFieldOptions(requestModel.fields, requestModel);

                    //Render additional layouts
                    this.$parent.layouts = response.data.layouts;
                }

                //Set single model row
                if ( this.model.isSingle() && response.data.rows.length > 0 ) {
                    this.$parent.row = response.data.rows[0]||this.$parent.emptyRowInstance();
                    this.$parent.sendRowData();
                }

                //Update refresh informations
                this.refresh.count++;
                this.refresh.refreshing = false;

                //Get new csrf token
                this.$root.reloadCSRFToken(response.data.token);

                //Add next timeout, but we do not want sync filled single model
                //If single model is empty, then keep syncing till row will be available
                if ( ! this.model.isSingle() || response.data.rows.length == 0 ) {
                    this.initTimeout(false);
                }
            })
            .catch(function(response){
                //If has been component destroyed, and request is delivered...
                if ( !this.$root ) {
                    return;
                }

                //Add next timeout
                this.initTimeout(false, true);

                //On first error from response
                if ( response.status == 500 ){
                    let message;

                    try {
                        message = response.message;

                        try {
                            message = response.body.message
                        } catch {};
                    } catch {};

                    if ( message ){
                        this.$root.errorResponseLayer(response, message);
                    }
                }

                //Show error alert at first request
                else if ( this.refresh.count == 0 && this.hasShowedError !== true || response.status == 401 ){
                    this.hasShowedError = true;
                    this.$root.errorResponseLayer(response, null);
                }
            });
        },
        updateModel(model){
            for ( var key in model ) {
                //If key is missing in admin model, add new data
                if ( (key in this.$root.originalModels[this.model.table]) ) {
                    continue
                }

                // Rewrite model
                this.$set(this.$root.models[this.model.table], key, model[key]);
            }
        },
        addScopeParams(data){
            if ( !('scopes' in data) ){
                data['scopes'] = {};
            }

            for ( var key in this.scopes ){
                let params = this.scopes[key].join(';');

                data['scopes'][key] = params;
            }

            //Added model scopes
            for ( var i = 0; i < this.model.scopes.length; i++ ){
                let scope = this.model.scopes[i];

                data['scopes'][scope.key] = scope.params;
            }

            return data;
        },
        destroyTimeout(){
            if ( this.updateTimeout )
                clearTimeout(this.updateTimeout);
        },
        initTimeout(indicator, force){
            this.destroyTimeout();

            //Disable autorefreshing when is one row
            if ( this.isEnabledAutoSync === false && force !== true ){
                return;
            }

            this.updateTimeout = setTimeout(function(){
                this.loadRows(indicator);
            }.bind(this), this.refresh.interval);
        },
        updateFieldOptions(fields, model){
            //Update fields from database, for dynamic selectbox values
            for ( var key in fields )
            {
                //Update filterBy for each model
                if ( 'filterBy' in (model.fields[key]||{}) && model.fields[key].filterBy ){
                    this.$set(this.model, 'fields.'+key+'.filterBy', model.fields[key].filterBy);
                } else if ( 'filterBy' in this.model.fields[key]||{} ){
                    delete this.model.fields[key].filterBy;
                }

                //Update options
                if (
                    'options' in this.model.fields[key]
                    && (
                        typeof fields[key].options === 'string'
                        || Object.keys(fields[key].options).length > 0
                    )
                )
                {
                    //Use options from different field
                    if ( typeof fields[key].options === 'string' )
                    {
                        if ( fields[key].options.substr(0, 2) == '$.' )
                        {
                            var from_key = fields[key].options.substr(2);

                            let modelOptions = { ...this.modelOptions };
                                modelOptions[key] = fields[from_key].options;

                            this.modelOptions = modelOptions;
                        }
                    }

                    //Use own field options
                    else {
                        let modelOptions = { ...this.modelOptions };
                            modelOptions[key] = fields[key].options;

                        this.modelOptions = modelOptions;
                    }

                }
            }

            //Update fields options in selectbar for choosenjs
            setTimeout(() => {
                if ( this.$parent && this.$parent.reloadSearchBarSelect )
                    this.$parent.reloadSearchBarSelect();
            }, 100);
        },
        isNumericValue(key){
            if ( ['id', '_order'].indexOf( key ) > -1)
                return true;

            if ( key in this.model.fields && ['integer', 'decimal', 'checkbox'].indexOf( this.model.fields[key].type ) > -1 )
                return true;

            if ( this.model.getSettings('columns.'+key+'.type') == 'integer' )
                return true;

            return false;
        },
        isDateValue(key){
            if ( ['created_at', 'published_at', 'updated_at'].indexOf( key ) > -1)
                return true;

            if ( key in this.model.fields && ['date', 'datetime'].indexOf( this.model.fields[key].type ) > -1 )
                return true;

            return false;
        },
        isLocaleValue(key){
            if ( key in this.model.fields && this.model.fields[key].locale ){
                return true;
            }

            return false;
        },
        /*
         * Sets default order after loading compoennt
         */
        setOrder(){
            //Set order by settings parameter
            if ( this.orderBy == null)
            {
                var orderBy = this.model.getSettings('orderBy');

                if ( orderBy )
                {
                    var keys = Object.keys(orderBy);

                    this.orderBy = [keys[0], parseFloat(orderBy[keys[0]].toLowerCase().replace('asc', 0).replace('desc', 1))];
                    return;
                }
            }

            //Set order by field parameter
            for ( var key in this.model.fields )
            {
                var field = this.model.fields[key];

                if ( 'orderBy' in field )
                {
                    var order = 1;

                    this.orderBy = [key, field['orderBy'].toLowerCase().replace('asc', 0).replace('desc', 1)];
                    return;
                }
            }

            //Add default order of rows
            this.orderBy = [this.model.orderBy[0], this.model.orderBy[1].toLowerCase().replace('asc', 0).replace('desc', 1)];
        },
        setPosition(position, indicator){
            //We need allow reload position 1 also when max pages are 0 (when zero rows)
            if (
                position == 0
                || (this.rows.count > 0 && position > Math.ceil(this.rows.count/this.pagination.limit))
            ) {
                return;
            }

            this.pagination.position = position;

            //Load paginated rows...
            this.loadRows(indicator);
        },
        getRefreshInterval(){
            var interval = this.model.getSettings('refresh_interval', 10000);

            //Infinity interval
            if ( interval == false ) {
                interval = 3600 * 1000;
            }

            return interval;
        },
        /*
         * Change updated rows in db
         */
        updateRowsData(data, update){
            //This update rows just in table, not in forms
            if ( update !== true && (this.rows.data.length != data.length || this.rows.data.length == 0 || this.rows.data[0].id != data[0].id || update === 1) ) {
                this.rows.data = data;
                return;
            }

            //Update changed data in vue object
            for ( var i in this.rows.data )
            {
                for ( var k in data[i] )
                {
                    var isArray = $.isArray(data[i][k]);

                    //Compare also arrays
                    if ( isArray && !_.isEqual(this.rows.data[i][k], data[i][k]) || !isArray )
                    {
                        this.rows.data[i][k] = data[i][k];
                    }
                }
            }
        },
        removeRow(row){
            var ids = row ? [ row.id ] : this.checked;

            var success = function (){
                var requestData = {
                    model : this.model.slug,
                    parent : this.$parent.getParentTableName(this.model.without_parent),
                    id : ids,
                    subid : this.getParentRowId(),
                    limit : this.pagination.limit,
                    page : this.pagination.position,
                    _method : 'delete',
                };

                //Check if is enabled language
                if ( this.$root.language_id != null )
                    requestData['language_id'] = parseInt(this.$root.language_id);

                this.$http.post( this.$root.requests.delete, requestData)
                .then(response => {
                    var data = response.data;

                    if ( data && 'type' in data && data.type == 'error' ) {
                        return this.$root.openAlert(data.title, data.message, 'danger');
                    }

                    //Load rows into array
                    if ( ! this.$parent.isWithoutParentRow ){
                        this.updateRowsData(data.data.rows.rows);
                        this.rows.count = data.data.rows.count;

                        this.pagination.position = data.data.rows.page;
                    } else {
                        //Remove row
                        var remove = [];
                        for ( var key in this.rows.data )
                            if ( ids.indexOf(this.rows.data[key].id) > -1 )
                                remove.push(key);

                        //Remove deleted keys from rows objects. For correct working we need remove items from end to start
                        for ( var i = 0; i < remove.sort((a, b) =>  (b - a)).length; i++ )
                            this.rows.data.splice(remove[i], 1);
                    }

                    if ( this.row && ids.indexOf(this.row.id) > -1 )
                        this.$parent.row = this.$parent.emptyRowInstance();

                    //Remove row from options
                    if ( this.$parent.hasparentmodelMutated !== true ){
                        this.$parent.$parent.pushOption(requestData.id, 'delete');
                    }

                    //After remove reset checkbox
                    if ( ! row ) {
                        this.checked = [];
                    }

                    this.$parent.emitRowData('onDelete', ids);
                })
                .catch(response => {
                    this.$root.errorResponseLayer(response);
                });
            }.bind(this);

            //Check if is row can be deleted
            if ( this.isReservedRow(ids) )
                return this.$root.openAlert(this.trans('warning'), this.trans(ids.length > 1 ? 'cannot-delete-multiple' : 'cannot-delete'), 'warning');

            this.$root.openAlert(this.trans('warning'), this.trans('delete-warning'), 'warning', success, true);
        },
        togglePublishedAt(row)
        {
            var ids = row ? [ row.id ] : this.checked;

            this.$http.post( this.$root.requests.togglePublishedAt, {
                model : this.model.slug,
                id : ids,
            })
            .then(function(response){
                var data = response.data;

                if ( data && 'type' in data )
                    return this.$root.openAlert(data.title, data.message, 'danger');

                //Update multiple published at
                for ( var key in this.rows.data )
                    if ( ids.indexOf(this.rows.data[key].id) > -1 )
                        this.rows.data[key].published_at = data[this.rows.data[key].id];
            })
            .catch(function(response){
                this.$root.errorResponseLayer(response);
            });

            //Reset checkboxes after published
            if ( ! row )
                this.checked = [];
        },
        getButtonKey(id, key){
            return id + '-' + key;
        },
        buildEventData(data, model, isChild){
            var model = model||this.model;

            return {
                table : model.slug,
                model : model,

                //If is child inParent relation, then add depth level + 1 for correct communication
                depth_level : this.depth_level + (isChild ? 1 : 0),
                ...data
            };
        },
        buttonAction(key, button, row){
            var ids = row ? [ row.id ] : this.checked;

            var makeAction = function(ask, data){
                this.button_loading = row ? this.getButtonKey(row.id, key) : key;

                this.$http.post( this.$root.requests.buttonAction, _.merge(data||{}, {
                    _button : {
                        model : this.model.slug,
                        parent : this.$parent.getParentTableName(),
                        id : ids,
                        multiple : row ? false : true,
                        subid : this.getParentRowId(),
                        limit : this.pagination.limit,
                        page : this.pagination.position,
                        language_id : this.model.localization === true ? this.langid : 0,
                        button_id : key,
                        ask : ask ? true : false,
                    },
                })).then(function(response){
                    this.button_loading = false;

                    var data = response.data,
                        hasData = 'data' in data,
                        ask = hasData && data.data.ask == true,
                        component = hasData && data.data.component ? data.data.component : null;

                    //Load rows into array
                    if ( 'data' in data && ! ask ) {
                        eventHub.$emit(
                            'buttonAction',
                            this.buildEventData({
                                rows : data.data.rows.rows,
                            }, this.model)
                        );

                        //Update received rows by button action
                        if ( 'rows' in data.data ) {
                            this.updateParentData(key, button, row, data);
                        }

                        //Redirect on page
                        if ( ('redirect' in data.data) && data.data.redirect ) {
                            if ( data.data.open == true ) {
                                window.location.replace(data.data.redirect);
                            } else {
                                window.open(data.data.redirect);
                            }
                        }

                        //Uncheck all rows
                        if ( ! row ) {
                            this.checked = [];
                        }
                    }

                    //Alert message
                    if ( data && 'type' in data ) {
                        var component_data = component ? {
                            name : button.key,
                            component : component,
                            model : this.model,
                            rows : this.rows.data.filter(item => ids.indexOf(item.id) > -1),
                            row : row,
                            request : {},
                            data : data.data.component_data||[],
                        } : null;

                        var success_callback = function(){
                            var data = {};

                            if ( this.alert.component && this.alert.component.request ) {
                                data = _.clone(this.alert.component.request);
                            }

                            makeAction(null, data);
                        }

                        return this.$root.openAlert(
                            data.title,
                            data.message,
                            data.type,
                            ask ? success_callback : null,
                            ask ? true : null,
                            component_data
                        );
                    }
                }).catch(function(response){
                    this.button_loading = false;

                    this.$root.errorResponseLayer(response);
                });
            }.bind(this);

            makeAction(true);
        },
        updateParentData(key, button, row, data){
            //Reload just one row which owns button
            if ( button.reloadAll == false ){
                for ( var k in data.data.rows.rows ) {
                    var row = data.data.rows.rows[k];

                    if ( !(row.id in data.data.rows.buttons) ){
                        this.rows.buttons[row.id] = [];
                    } else {
                        this.rows.buttons[row.id] = data.data.rows.buttons[row.id];
                    }

                    //Update just selected row
                    for ( var i in this.rows.data ) {
                        if ( this.rows.data[i].id == row.id ) {
                            for ( var k in this.$parent.rows.data[i] ) {
                                if ( this.$parent.rows.data[i][k] != row[k] ) {
                                    this.$parent.rows.data[i][k] = row[k];
                                }
                            }
                        }
                    }
                }
            }

            //Reload all rows
            else {
                this.updateRowsData(data.data.rows.rows, false);

                this.rows.count = data.data.rows.count;
                this.rows.buttons = data.data.rows.buttons;
            }
        },
        isReservedRow(id){
            //check multiple input
            if ( typeof id === 'object' && id.length && this.model.reserved )
            {
                for ( var i = 0; i < id.length; i++ )
                {
                    if ( this.model.reserved.indexOf(id[i]) > -1 )
                        return true;
                }

                return false;
            }

            //check one row
            if ( this.model.reserved && this.model.reserved.indexOf(id) > -1 )
                return true;

            return false;
        },
        /*
         * Return if model is in reversed mode
         * new rows will be added on the end
         */
        isReversed(except)
        {
            if ( except != true && ( !(2 in this.model.orderBy) || this.model.orderBy[2] != true ) )
                return false;

            return ['id', '_order'].indexOf(this.model.orderBy[0]) > -1 && this.model.orderBy[1].toLowerCase() == 'asc';
        }
    },
}
</script>