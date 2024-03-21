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
                    <custom-components :model="model" type="table-header-actions" />

                    <!-- Sheet download -->
                    <button
                        v-if="model.getSettings('xls') == true && rows.count > 0"
                        data-export-xls
                        @click.prevent="exportXlsTable()"
                        type="button"
                        class="btn--icon btn btn-default">
                        <i class="fa fa-file-excel"></i>
                        {{ _('Stiahnuť excel') }}
                    </button>

                    <ColumnsList :model="model" />

                    <div class="dropdown actions-list fields-list" v-if="model.getChecked().length > 0 && hasButtons" data-action-list>
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{ trans('action') }}
                            <i class="--icon-right fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu menu-left dropdown-menu-right">
                            <li v-for="button in availableActionButtons" @click="model.buttonAction(button.key)">
                                <i class="fa --icon-left" :class="button.icon"></i>{{ button.name }}
                            </li>
                        </ul>
                    </div>

                    <PaginationLimit :model="model" :rows="rows" v-if="!insertButton" :visibleIfMinRows="20" />

                    <AddNewRowModal :model="model" v-if="insertButton" v-slot="{ open }">
                        <button
                            @click="open"
                            type="button"
                            class="btn--icon btn btn-primary"
                        >
                            <i class="fa fa-plus --icon-left"></i>

                            {{ model.getSettings('buttons.create', trans('new-row')) }}
                        </button>
                    </AddNewRowModal>
                </div>
            </div>

            <custom-components :model="model" type="table-header" />
        </div>

        <div class="box-body box-body--table" v-show="!model.isHiddenMode()">
            <table-rows
                :model="model"
                :buttons="rows.buttons"
                :count="rows.count"
                :rows="rows">
            </table-rows>
        </div>

        <div class="box-footer" v-show="!model.isHiddenMode()">
            <custom-components :model="model" type="table-footer" />

            <div class="box-footer__actions">
                <div class="box-footer__left"></div>
                <div class="box-footer__center">
                    <pagination
                        v-if="model.isPaginationEnabled()"
                        :model="model" />
                </div>
                <div class="box-footer__right">
                    <PaginationLimit :model="model" :rows="rows" />
                </div>
            </div>
        </div>

        <refreshing v-if="rows.refreshing"></refreshing>
    </div>
    <!-- /.box -->
</template>

<script>
import TableRows from './TableRows.vue';
import Pagination from '../Partials/Pagination.vue';
import PaginationLimit from '../Partials/PaginationLimit.vue';
import ColumnsList from '../Partials/ColumnsList.vue';
import CustomComponents from '@components/Partials/ModelBuilder/CustomComponents.vue';

export default {
    props : {
        model : {},
        rows : {},
        insertButton : {default : false},
    },

    components : { TableRows, Pagination, PaginationLimit, CustomComponents, ColumnsList },

    data : function(){
        return {
            table : null,

            refresh : this.model.setData('refresh', {
                refreshing : true,
                count : 0,
                interval : this.getRefreshInterval(),
            }).getData('refresh'),
        };
    },

    created() {
        //For file paths
        this.root = window.crudadmin.root;

        //Set default order rows
        this.setOrder();

        this.setDefaultModelLimit();

        //Refresh rows refreshInterval
        this.model.loadRows();

        /*
         *
         * When row is added, then push it into table
         * TODO: REFACTOR THIS
         */
        eventHub.$on('onCreate', this.onCreateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.model.getData('depth_level') ) {
                return;
            }

            var array = data.request,
                pages = Math.ceil(this.rows.count / this.rows.limit);

            //If last page is full, and need to add new page
            if ( this.model.isReversed(true) && this.rows.count > 0 && !this.model.isWithoutExistingParentRow() && pages == this.rows.count / this.rows.limit ){
                this.model.setPage( pages + 1, this.model.isWithoutExistingParentRow() ? true : null );
            }

            //If user is not on lage page, then change page into last, for see added rows
            else if ( this.model.isReversed(true) && this.rows.page < pages && !this.model.isWithoutExistingParentRow() ){
                this.model.setPage( pages );
            }

            //If row can be pushed without reloading rows into first or last page
            else if (
                this.rows.page == 1 || (
                    this.model.isReversed(true) && this.rows.page == pages
                    || this.model.isWithoutExistingParentRow()
                )
            ) {
                var rows = array.rows.concat(this.rows.data);

                if ( this.model.isPaginationEnabled() && rows.length > this.rows.limit ) {
                    rows = rows.slice(0, this.rows.limit);
                }

                //Insert buttons of new created row
                for ( var key in array.buttons ) {
                    Vue.set(this.rows.buttons, key, array.buttons[key]);
                }

                this.rows.data = rows;
                this.rows.count += array.rows.length;
            }

            else {
                this.model.loadRows();
            }
        });

        /*
         * When row is updated, then change data into table for changed rows
         */
        eventHub.$on('onUpdate', this.onUpdateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.model.getData('depth_level') )
                return;

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

        this.refreshOnParentStore();
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
                this.model.setPage(1);
            }
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
        'scopes' : {
            handler(a, b){
                //If scopes has been changed
                if ( _.isEqual(a,b) === false ){
                    this.model.setPage(1, { force : true });
                }
            },
        },
        'search.queries' : {
            deep : true,
            handler(queries){
                var was_searching = this.model.getData('searching');
                let searching = false;

                for ( var i = 0; i < queries.length; i++ ) {
                    let item = queries[i],
                        query = !_.isNil(item.query) && item.query !== '' ? item.query : item.query_to;

                    if ( searching === false && !_.isNil(query) && query !== '' ){
                        if ( query.length >= 3 || $.isNumeric(query) ) {
                            searching = true;
                        }

                        if ( item.column && item.column in this.model.fields && ['select', 'option', 'checkbox'].indexOf(this.model.fields[item.column].type) > -1 ) {
                            searching = true;
                        }
                    }
                }

                this.model.setData('searching', searching);

                //On first search query reset pagination
                if ( this.model.getData('searching') == true && was_searching == false ){
                    this.model.setPage(1);
                }

                //If is normal searching, then search in every char, or if is turned searching from on to off state, then show normal rows
                else if ( this.model.getData('searching') || ( this.model.getData('searching') == false && was_searching == true ) ) {
                    this.model.loadRows();
                }
            },
        },
        paginationEnabled(state, oldstate){
            if ( oldstate == false && state == true ){
                this.setDefaultModelLimit();
            }
        },
        parentRowId(rowId, oldRowId){
            if ( rowId != oldRowId ) {
                //We need reload all rows, because parent has been changed
                this.model.cleanRows();

                //Set allowed columns
                this.model.resetAllowedColumns();
            }
        },
    },

    computed: {
        scopes(){
            //We need clone scopes, otherwise watcher data for refreshing rows will be always same value.
            return _.cloneDeep(this.model.getData('scopes'));
        },
        paginationEnabled(){
            return this.model.isPaginationEnabled();
        },
        progress(){
            return this.model.getData('progress');
        },
        modelOptions(){
            return this.model.getData('modelOptions');
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
        availableActionButtons(){

            return this.model.getAllButtons(['multiple', 'action']);
        },
        hasButtons(){
            return Object.keys(this.availableActionButtons).length > 0;
        },
        title(){
            var title;

            if ( title = this.model.getSettings('title.rows') ) {
                return title;
            }

            if ( this.model.getParentModel() ){
                return this.model.name;
            }

            return this.trans('rows');
        },
        parentRowId(){
            let idFromGivenModel = this.model.getData('parentRow')?.id;

            // This id is given by manually passing parent model
            // Eg. if ModelBuilder is not working
            if ( idFromGivenModel ){
                return idFromGivenModel;
            }

            //Passing from fyzicaly existing parent model
            return this.model.getParentModel()?.getRow()?.id;
        },
    },

    methods: {
        setDefaultModelLimit(){
            this.rows.limit = this.model.getLimitFromStorage();
        },
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
            this.model.loadRows({
                indicator : true,
                download : true,
                limit : -1,
            })
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
                //After remove reset checkbox
                if ( ! row ) {
                    //We need set length to zero, to keep array reference in admin model
                    this.model.resetChecked();
                }
            });
        },
        refreshOnParentStore(){
            let parentModel = this.model.getParentModel();

            if ( parentModel ) {
                parentModel.on('create', row => {
                    if ( this.model.isWithoutExistingParentRow() && parentModel.isWithoutExistingParentRow() === false ) {
                        this.model.cleanRows();
                    }
                });
            }
        }
    },
}
</script>