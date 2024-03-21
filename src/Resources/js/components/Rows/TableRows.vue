<template>
    <table :id="'table-'+model.slug" :data-table-rows="model.slug" :data-depth="model.getData('depth_level')" class="table" :class="{ 'sortable' : model.sortable && orderBy[0] == '_order', 'table-sm' : isSmallTable, '--box-padding-left' : hasTablePadding }">
        <thead data-table-head>
            <tr>
                <th class="row-draggable" v-if="model.isDragEnabled()"></th>
                <th class="select-row-checkbox" @click="toggleAllCheckboxes" v-if="hasCheckingEnabled">
                    <div class="checkbox-box" data-toggle="tooltip" :title="trans(isCheckedAll ? 'uncheck-all' : 'check-all')">
                        <input type="checkbox" :checked="isCheckedAll">
                        <span class="checkmark fa"></span>
                    </div>
                </th>
                <th v-if="hasIndicatorInTable"></th>
                <th v-for="(name, field) in columns" :class="['th-'+field, { 'th-increment' : model.getKeyName() == field }]" @click="toggleSorting(field)">
                    <i class="arrow-sorting fa fa-angle-up" v-if="orderBy[0] == field && orderBy[1] == 0"></i>
                    <i class="arrow-sorting fa fa-angle-down" v-if="orderBy[0] == field && orderBy[1] == 1"></i>
                    {{ name }}
                </th>
                <th class="th-options-buttons"></th>
            </tr>
        </thead>
        <component
            v-bind="model.isDragEnabled() ? model.getDragOptions() : {}"
            :is="model.isDragEnabled() ? 'draggable' : 'tbody'"
            tag="tbody"
            :list="sortedRows"
            @start="model.onDragStart($event)"
            @change="model.onDragChange($event)">
            <tr v-for="(item, key) in sortedRows" :key="item.id" :data-id="item.id" :class="getRowClass(item)">
                <td class="row-draggable" v-if="model.isDragEnabled()" @click="checkRow(item.id, $event)">
                    <i class="fa fa-grip-vertical"></i>
                </td>

                <td class="select-row-checkbox" v-if="hasCheckingEnabled" @click="checkRow(item.id, $event)">
                    <span v-if="item['$checkbox.slot']" v-html="item['$checkbox.slot']" class="checkbox-box-slot"></span>
                    <div class="checkbox-box">
                        <input type="checkbox" :checked="model.getChecked().indexOf(item.id) > -1">
                        <span class="checkmark fa"></span>
                    </div>
                </td>

                <td class="row-indicator" v-if="hasIndicatorInTable" data-toggle="tooltip" :title="item.$indicator ? (item.$indicator.name||item.$indicator.title) : ''">
                    <i v-if="item.$indicator" :class="item.$indicator.class" :style="{ background : item.$indicator.color }"></i>
                </td>

                <td v-for="(name, field) in columns" :key="item.id+'-'+field" @click="selectRowFromTable($event, item, field)" :class="['td-'+field, { '--clickable' : isTableClickable, 'td-increment' : model.getKeyName() == field } ]" :data-field="field" :data-type="fieldType(field)">
                    <table-row-value
                        :settings="getCachableColumnsSettings(field)"
                        :columns="columns"
                        :field="field"
                        :name="name"
                        :item="item"
                        :model="model">
                    </table-row-value>
                </td>

                <td class="buttons-options" :data-model="model.slug">
                    <Actions :model="model" :row="item" />
                </td>
            </tr>
        </component>
    </table>
</template>

<script>
import TableRowValue from './TableRowValue.vue';
import Actions from '@components/Partials/Actions/Actions.vue';
import draggable from 'vuedraggable'

export default {
    props : ['rows', 'buttons', 'count', 'field', 'model'],

    components: { TableRowValue, Actions, draggable },

    data(){
        return {
            autoSize : false,
        };
    },

    created() {
        //If table has foreign column, will be hidden
        if ( this.model.foreign_column != null ) {
            this.hidden.push( this.model.foreign_column );
        }

        //Set allowed columns
        this.model.resetAllowedColumns(this.defaultColumns);

        //Automaticaly choose size of tables
        if ( this.autoSize == false ) {
            this.model.checkActiveGridSize(this.columns);
        }
    },

    watch: {
        columns(){
            this._cacheColumnSettings = {};
        },
    },

    computed: {
        button_loading(){
            return this.model.getData('button_loading');
        },
        loadingRow(){
            return this.model.getData('loadingRow');
        },
        enabled_columns(){
            return this.model.getData('enabled_columns');
        },
        sortedRows(){
            return this.model.getRows();
        },
        row(){
            return this.model.getRow();
        },
        orderBy(){
            return this.model.getData('orderBy');
        },
        hasCheckingEnabled(){
            if ( this.model.getSettings('checking', true) === false ){
                return false;
            }

            return true;
        },
        isSmallTable(){
            if ( this.model.getSettings('table.small', false) == true ){
                return true;
            }

            var limit = 30,
                columnsCount = Object.keys(this.columns).length;

            return this.rows.limit >= limit && this.rows.count >= limit || columnsCount > 10;
        },
        multipleCheckbox(){
            return this.model.getChecked().length > 0;
        },
        defaultColumns(){
            var data = {},
                key;

            //Get columns from row
            for ( var key in this.model.fields ) {
                //We want skip inacessible fields
                if (
                    this.model.tryAttribute(this.model.fields[key], 'inaccessible')
                    || this.model.tryAttribute(this.model.fields[key], 'inaccessible_column')
                ){
                    continue;
                }

                let enabled =
                    (this.model.columns.includes(key) === true || this.model.fields[key].column_visible === true)
                    && this.model.getSettings('columns.'+key+'.hidden') !== true
                    && this.hidden.includes(key) === false
                    && this.avaliableColumns.includes(key) === true
                    && (
                            //Is virtual column
                            !(key in this.model.fields)
                            || (
                                //Is not hidden field
                                this.model.fields[key].hidden != true
                                && !this.model.tryAttribute(this.model.fields[key], 'invisible')
                            )
                            || this.model.fields[key].column_visible == true
                    );

                data[key] = {
                    name : this.fieldName(key),
                    enabled,
                };
            }

            data = this.addVirtualColumns(data);

            this.model.setData('default_columns', data);

            return data;
        },
        columns(){
            var columns = {}

            //Disable changed fields
            for ( var key in this.enabled_columns ) {
                if ( this.enabled_columns[key].enabled == true ) {
                    columns[key] = this.enabled_columns[key].name;
                }
            }

            return columns;
        },
        avaliableColumns(){
            return _.uniq([this.model.getKeyName()].concat( Object.keys( this.model.fields ) ));
        },
        availableButtons(){
            return this.$parent.availableButtons;
        },
        isCheckedAll(){
            var ids = this.rows.data.map(item => item.id),
                checked = this.model.getChecked();

            if ( checked.length == 0 ) {
                return false;
            }

            return _.isEqual(_.sortBy(ids), _.sortBy(checked));
        },
        canOpenRowOnClick(){
            return this.model.getSettings('table.onclickopen', false) == true;
        },
        isTableClickable(){
            //if table cannot be opened
            if ( !(this.model.isEditable() || this.model.isDisplayable()) ){
                return false;
            }

            //If table has disabled clicks for opening rows
            if ( this.model.getSettings('table.clickable', true) === false ){
                return false;
            }

            return true;
        },
        hasIndicatorInTable(){
            return (this.sortedRows[0]||{}).$indicator ? true : false;
        },
        hidden(){
            return ['language_id', '_order', 'slug', 'published_at', 'updated_at', 'created_at'].filter(column => {
                if ( this.model.fields[column]?.column_visible === true ){
                    return false;
                }

                if ( this.model.getSettings('columns.'+column+'.hidden') == true ){
                    return false;
                }

                return true;
            });
        },
        hasTablePadding(){
            if ( this.model.isDragEnabled() || this.hasCheckingEnabled ||  this.hasIndicatorInTable || this.model.getSettings('increments', true) == true ){
                return false;
            }

            return true;
        }
    },

    methods: {
        fieldType(field){
            return (this.model.fields[field]?.type)||'static';
        },
        addVirtualColumns(data){
            //Add increment on the first place
            if ( this.model.getSettings('increments', true) == true ) {
                let newData = {};
                newData[this.model.getKeyName()] = {
                    name : this.model.fieldName(this.model.getKeyName()),
                    enabled : true,
                };

                data = {
                    ...newData,
                    ...data,
                };
            }

            /*
             * Check if can be added column after other column
             */
            var except = [],
                columns = this.model.getSettings('columns');

            //Add before and after column values
            if ( columns ) {
                for ( var vKey in columns ) {
                    var modifiedData = {};

                    for ( var parentKey in data ) {
                        let parentColumnEnabled = this.model.getSettings('columns.'+parentKey+'.hidden') !== true;

                        //Add custom column before actual column
                        for ( var k in columns ) {
                            let enabled = parentColumnEnabled === false ? false : this.model.getSettings('columns.'+k+'.hidden') != true;

                            modifiedData = this.addColumn(modifiedData, k, parentKey, 'before', columns, except, enabled);
                        }

                        modifiedData[parentKey] = data[parentKey];

                        //Add custom column after actual column
                        for ( var k in columns ) {
                            let enabled = parentColumnEnabled === false ? false : this.model.getSettings('columns.'+k+'.hidden') != true;

                            modifiedData = this.addColumn(modifiedData, k, parentKey, 'after', columns, except, enabled);
                        }
                    }

                    data = modifiedData;
                }

                for ( var key in columns ) {
                    if ( !(key in data) ) {
                        var field_key = this.getColumnRightKey(key),
                            enabled = (
                                (
                                    columns[key].hidden != true
                                    && columns[key].invisible != true
                                )
                                || columns[key].column_visible == true
                            );

                        data[key] = {
                            name : this.model.fieldName(field_key),
                            enabled
                        };
                    }
                }
            }

            return data;
        },
        /*
         * We need cache all settings for columns, for better performance
         */
        getCachableColumnsSettings(field){
            if ( ! this._cacheColumnSettings ) {
                this._cacheColumnSettings = {};
            }

            if ( field in this._cacheColumnSettings ){
                return this._cacheColumnSettings[field];
            }

            let isRealField = field in this.model.fields,
                realField = isRealField ? this.model.fields[field] : null;

            var settings = {
                isRealField: isRealField,
                field : realField,
                string_limit : this.getFieldLimit(field),
                default_slug : this.$root.languages.length ? this.$root.languages[0].slug : null,
                add_before : this.model.getSettings('columns.'+field+'.add_before'),
                add_after : this.model.getSettings('columns.'+field+'.add_after'),
                encode : this.model.getSettings('columns.'+field+'.encode', true),
                limit : this.model.getSettings('columns.'+field+'.limit'),
                component : this.model.getSettings('columns.'+field+'.component', realField ? realField.column_component : null),
            };

            return this._cacheColumnSettings[field] = settings;
        },
        getFieldLimit(fieldKey){
            let defaultLimit = Object.keys(this.columns).length < 5 ? 40 : 20,
                settingsLimit = this.model.getSettings('columns.'+fieldKey+'.limit');

            if ( this.model.getSettings('columns.'+fieldKey+'.encode', true) === false ) {
                return 0;
            }

            if ( fieldKey in this.model.fields ) {
                let field = this.model.fields[fieldKey],
                    limit;

                if ( 'limit' in field ) {
                    limit = field.limit;
                }

                else {
                    limit = settingsLimit||defaultLimit;
                }

                return limit || limit === 0 ? limit : defaultLimit;
            }

            return settingsLimit||defaultLimit;
        },
        addColumn(modifiedData, k, key, where, columns, except, enabled){
            if ( where in columns[k] && (columns[k][where] == key || columns[k][where] + '_id' == key) )
            {
                var field_key = this.getColumnRightKey(k);

                //We can't add column which has been added, because we reorder array
                if ( except.indexOf(field_key) > -1 )
                    return modifiedData;

                except.push(field_key);

                if ( k in modifiedData )
                    delete modifiedData[k];

                if ( field_key in modifiedData )
                    delete modifiedData[field_key];

                modifiedData[field_key] = {
                    name : this.model.fieldName(field_key),
                    enabled,
                };
            }

            return modifiedData;
        },
        toggleAllCheckboxes(){
            var ids = this.rows.data.map(item => item.id);

            this.model.setChecked(this.isCheckedAll ? [] : ids);
        },
        checkRow(id, $event){
            if ( this.hasCheckingEnabled === false ){
                return;
            }

            //Check multiple with shift
            let checked = this.model.getData('checked'),
                lastChecked = checked[checked.length - 1];

            if ( $event && $event.shiftKey && checked.length >= 1 && (checked[0] != id) ) {
                const rows = this.model.getRows(),
                    checkedCloned = _.cloneDeep(checked)

                rows.forEach(row => {
                    if ( id > lastChecked && (row.id > lastChecked && row.id <= id) ){
                        this.model.toggleChecked(row.id, checkedCloned);
                    } else if ( id < lastChecked && (row.id <= lastChecked && row.id >= id) ){
                        this.model.toggleChecked(row.id, checkedCloned);
                    }
                });

                const toState = checkedCloned.length >= checked.length;

                rows.forEach(row => {
                    if ( id > lastChecked && (row.id >= lastChecked && row.id <= id) ){
                        this.model.setColumnChecked(row.id, toState);
                    } else if ( id < lastChecked && (row.id <= lastChecked && row.id >= id) ){
                        this.model.setColumnChecked(row.id, toState);
                    }
                });
            }

            //Check single
            else {
                this.model.toggleChecked(id);
            }
        },
        toggleSorting(key){
            var sortable = this.model.getSettings('sortable');

            //Disable sorting by columns
            if ( sortable === false ) {
                return;
            }

            var orderBy = this.model.getData('orderBy'),
                order = orderBy[0] == key ? (1 - orderBy[1]) : 0;

            this.model.setData('orderBy', [key, order]);
        },
        fieldName(key){
            return this.model.fieldName(key);
        },
        clickTree(target){
            var path = [];
            var currentElem = target;
            while (currentElem) {
              path.push(currentElem);
              currentElem = currentElem.parentElement;
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
              path.push(document);
            if (path.indexOf(window) === -1)
              path.push(window);
            return path;
        },
        selectRowFromTable(e, row, fieldKey){
            if ( this.isTableClickable === false ){
                return;
            }

            let field = this.model.fields[fieldKey];

            let tree = this.clickTree(e.target);

            //If user click on link or button, we does not want to open row
            for ( var i = 0; i < tree.length; i++ ){
                if ( ['A', 'BUTTON'].indexOf(tree[i].tagName) > -1 ){
                    return;
                }
            }

            //If column has disabled opening row on click
            if ( this.model.getSettings('columns.'+fieldKey+'.clickable', true) == false ){
                return;
            }

            this.model.selectRow(row);
        },
        removeRow(row){
            this.$parent.removeRow(row);
        },
        isImageField(field){
            if ( field in this.model.fields )
            {
                var field = this.model.fields[field];

                if ( 'image' in field ) {
                    return true;
                }
            }

            return false;
        },
        /*
         * Returns varians of column names
         */
        getColumnRightKey(k){
            if ( !(k in this.model.fields) && ((k + '_id') in this.model.fields) )
                return k + '_id';

            return k;
        },
        //Add custom tr classes
        getRowClass(row){
            let classes = {
                    '--active' : this.model.getChecked().indexOf(row.id) > -1,
                    '--loading' : this.loadingRow == row.id
                },
                customClass = (row['$class']||'').split(' ');

            customClass.forEach(name => {
                classes[name] = true;
            });

            return classes;
        }
    },
}
</script>