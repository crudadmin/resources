<template>
    <div class="box box-wrapper">
        <div class="box-header">
            <div class="box-header__actions">
                <div class="box-header__left">
                    <div>
                        <h3 class="box-header__title">{{ title }} <small>({{ rows.count }})</small></h3>
                        <a data-toggle="tooltip" :title="_('Automatická synchronizácia záznamov v tabuľke je vypnutá')" class="box-header__actions--synchronize" @click="model.loadRows(true)" v-if="model.isEnabledAutoSync() == false"><i class="fa fa-sync-alt"></i> {{ _('Synchronizácia vypnutá') }}</a>
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

                    <div class="dropdown actions-list fields-list" v-if="model.getChecked().length > 0 && hasAnyActions" data-action-list>
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

                    <div class="pagination-limit" :class="{ '--hidden-limit' : model.isHiddenMode() }" v-if="model.isPaginationEnabled()" :title="trans('rows-count')">
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

        <div class="box-body box-body--table" v-show="!model.isHiddenMode()">
            <table-rows
                :model="model"
                :pagination="pagination"
                :buttons="rows.buttons"
                :count="rows.count"
                :gettext_editor.sync="gettext_editor"
                :rows="rows"
                :button_loading="button_loading">
            </table-rows>
        </div>

        <div class="box-footer" v-show="!model.isHiddenMode()">
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
                    <pagination v-if="model.isPaginationEnabled()" :rows="rows" :pagination="pagination" />
                </div>
                <div class="box-footer__right">
                    <div class="pagination-limit d-none d-lg-block" :class="{ '--hidden-limit' : model.isHiddenMode() }" v-if="model.isPaginationEnabled()" :title="trans('rows-count')">
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
    props : ['model', 'rows', 'gettext_editor', 'activetab'],

    components : { Refreshing, TableRows, Pagination },

    data : function(){
        return {
            table : null,

            //Sorting
            pagination: this.model.setData('pagination', {
                position: 1,
                limit : this.getLimitFromStorage(),
                limits : [ 5, 10, 20, 30, 50, 100, 200, 500, 1000 ],
                refreshing : false,
                maxpages : 10,
            }).getData('pagination'),

            refresh : this.model.setData('refresh', {
                refreshing : true,
                count : 0,
                interval : this.getRefreshInterval(),
            }).getData('refresh'),

            button_loading : false,
        };
    },

    created() {
        //For file paths
        this.root = window.crudadmin.root;

        //Set default order rows
        this.setOrder();

        //Refresh rows refreshInterval
        this.model.loadRows();

        /*
         * When row is added, then push it into table
         */
        eventHub.$on('onCreate', this.onCreateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.model.getData('depth_level') ) {
                return;
            }

            var array = data.request,
                pages = Math.ceil(this.rows.count / this.pagination.limit);

            //If last page is full, and need to add new page
            if ( this.model.isReversed(true) && this.rows.count > 0 && !this.model.isWithoutParentRow() && pages == this.rows.count / this.pagination.limit ){
                this.setPosition( pages + 1, this.model.isWithoutParentRow() ? true : null );
            }

            //If user is not on lage page, then change page into last, for see added rows
            else if ( this.model.isReversed(true) && this.pagination.position < pages && !this.model.isWithoutParentRow() ){
                this.setPosition( pages );
            }

            //If row can be pushed without reloading rows into first or last page
            else if ( this.pagination.position == 1 || (this.model.isReversed(true) && this.pagination.position == pages || this.model.isWithoutParentRow()) ) {
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
                this.model.loadRows();
            }
        });

        /*
         * When row is updated, then change data into table for changed rows
         */
        eventHub.$on('onUpdate', this.onUpdateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.model.getData('depth_level') )
                return;

            //Update row in table rows
            var row = data.row;

            for ( var key in this.rows.data )
            {
                if ( this.rows.data[key].id != row.id ) {
                    continue;
                }

                for ( var k in row ) {
                    this.model.getData('rows').data[key][k] = row[k];
                }
            }

            //Reset history on update row
            this.model.closeHistory();

            //Reload rows on row update event
            if ( this.model.getSettings('reloadOnUpdate') == true ) {
                this.model.loadRows();
            }
        });

        /*
         * Reload table rows on request
         */
        eventHub.$on('reloadRows', this.onReloadRows = table => {
            if ( this.model.slug != table )
                return;

            this.model.loadRows();
        });
    },

    destroyed() {
        this.model.disableRowsRefreshing();

        eventHub.$off('onCreate', this.onCreateEvent);
        eventHub.$off('onUpdate', this.onUpdateEvent);
        eventHub.$off('reloadRows', this.onReloadRows);
    },

    watch: {
        progress(state){
            if ( state == true ) {
                this.model.disableRowsRefreshing();
            } else {
                this.model.enableRowsRefreshing(false);
            }
        },
        langid(langid){
            if ( this.model.localization == true ) {
                this.setPosition(1, true);
            }
        },
        activetab(value){
            if ( value == true )
                this.model.enableRowsRefreshing(false);
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
                var was_searching = this.model.getData('searching');
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

                this.model.setData('searching', searching);

                this.search.used = true;

                //On first search query reset pagination
                if ( this.model.getData('searching') == true && was_searching == false ){
                    this.setPosition(1, true);
                }

                //If is normal searching, then search in every char, or if is turned searching from on to off state, then show normal rows
                else if ( this.model.getData('searching') || ( this.model.getData('searching') == false && was_searching == true ) ) {
                    this.model.loadRows(true);
                }
            },
        },
        //On change enabled columns, reload full table with newer data
        enabled_columns : {
            deep : true,
            handler : function(columns, old){
                if ( ! old || ! columns )
                    return;

                this.model.loadRows(true);
            },
        }
    },

    computed: {
        progress(){
            return this.model.getData('progress');
        },
        modelOptions(){
            return this.model.getData('modelOptions');
        },
        enabled_columns(){
            return this.model.getData('enabled_columns');
        },
        langid(){
            return this.model.getSelectedLanguageId();
        },
        row(){
            return this.model.getRow();
        },
        search(){
            return this.model.getData('search');
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

            if ( title = this.model.getSettings('title.rows') ) {
                return title;
            }

            return this.trans('rows');
        },
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
            this.model.loadRows(true, true)
        },
        getLimitFromStorage(){
            //Load pagination limit from localStorage
            var limit = this.model.isWithoutParentRow() ?
                            500
                            : (
                                'limit' in localStorage
                                    ? localStorage.limit
                                    : this.model.getSettings('pagination.limit', 10)
                            );

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
        canShowColumn(column, key){
            if ( ! column.name )
                return false;

            if ( key in this.model.fields && this.model.fields[key].type == 'password' )
                return false;

            return true;
        },
        reloadRows(){
            this.model.resetForm();

            this.rows.data = [];
            this.rows.count = 0;
            this.rows.save_children = [];

            this.model.loadRows();

            return true;
        },
        changeLimit(){
            localStorage.limit = this.pagination.limit;

            //Reset pagination to first page
            this.setPosition(1);
        },
        /*
         * Sets default order after loading compoennt
         */
        setOrder(){
            //Set order by settings parameter
            if ( this.model.getData('orderBy') == null) {
                var orderBy = this.model.getSettings('orderBy');

                if ( orderBy ) {
                    var keys = Object.keys(orderBy);

                    this.model.setData('orderBy', [
                        keys[0],
                        parseFloat(orderBy[keys[0]].toLowerCase().replace('asc', 0).replace('desc', 1))
                    ]);

                    return;
                }
            }

            //Set order by field parameter
            for ( var key in this.model.fields ) {
                var field = this.model.fields[key];

                if ( 'orderBy' in field ) {
                    var order = 1;

                    this.model.setData('orderBy', [
                        key,
                        field['orderBy'].toLowerCase().replace('asc', 0).replace('desc', 1)
                    ]);

                    return;
                }
            }

            let defaultOrder = [
                this.model.orderBy[0],
                this.model.orderBy[1].toLowerCase().replace('asc', 0).replace('desc', 1)
            ];

            //Add default order of rows
            this.model.setData('orderBy', defaultOrder);
        },
        setPosition(position, indicator){
            //We need allow reload position 1 also when max pages are 0 (when zero rows)
            if (
                position == 0
                || (this.rows.count > 0 && (position - 1) > Math.ceil(this.rows.count/this.pagination.limit))
            ) {
                return;
            }

            this.pagination.position = position;

            //Load paginated rows...
            this.model.loadRows(indicator);
        },
        getRefreshInterval(){
            var interval = this.model.getSettings('refresh_interval', 10000);

            //Infinity interval
            if ( interval == false ) {
                interval = 3600 * 1000;
            }

            return interval;
        },
        removeRow(row){
            var ids = row ? [ row.id ] : this.model.getChecked();

            this.model.removeRow(ids, (response, requestData) => {
                //Remove row from options
                if ( this.model.hasParentFormModel() !== true && this.model.getData('parentField') ){
                    this.model.getParentModel().pushOption(
                        this.model.getData('parentField'),
                        requestData.id,
                        'delete'
                    );
                }

                //After remove reset checkbox
                if ( ! row ) {
                    //We need set length to zero, to keep array reference in admin model
                    this.model.resetChecked();
                }
            });
        },
        togglePublishedAt(){
            this.model.togglePublishedAt(this.model.getChecked());

            //Reset checkboxes after published
            this.model.resetChecked();
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
                depth_level : this.model.getData('depth_level') + (isChild ? 1 : 0),
                ...data
            };
        },
        buttonAction(key, button, row){
            var ids = row ? [ row.id ] : this.model.getChecked();

            var makeAction = function(ask, data){
                this.button_loading = row ? this.getButtonKey(row.id, key) : key;

                this.$http.post( this.$root.requests.buttonAction, _.merge(data||{}, {
                    _button : {
                        model : this.model.slug,
                        parent : this.model.getParentTableName(),
                        id : ids,
                        multiple : row ? false : true,
                        subid : this.model.getParentRowId(),
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
                            this.model.resetChecked();
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
                this.model.updateRowsData(data.data.rows.rows, false);

                this.rows.count = data.data.rows.count;
                this.rows.buttons = data.data.rows.buttons;
            }
        },
    },
}
</script>