<template>
    <table :id="'table-'+model.slug" :data-table-rows="model.slug" :data-depth="model.getData('depth_level')" class="table" :class="{ 'sortable' : model.sortable && orderBy[0] == '_order', 'table-sm' : isSmallTable }">
        <thead data-table-head>
            <tr>
                <th class="row-draggable" v-if="model.isDragEnabled()"></th>
                <th class="select-row-checkbox" @click="toggleAllCheckboxes" v-if="hasCheckingEnabled">
                    <div class="checkbox-box" data-toggle="tooltip" :title="trans(isCheckedAll ? 'uncheck-all' : 'check-all')">
                        <input type="checkbox" :checked="isCheckedAll">
                        <span class="checkmark"></span>
                    </div>
                </th>
                <th v-for="(name, field) in columns" :class="'th-'+field" @click="toggleSorting(field)">
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
            @start="model.onDragStart($event)"
            @end="model.onDragEnd($event, sortedRows)">
            <tr v-for="(item, key) in sortedRows" :key="item.id" :data-id="item.id" :class="{ '--active' : model.getChecked().indexOf(item.id) > -1, '--loading' : loadingRow == item.id }">
                <td class="row-draggable" v-if="model.isDragEnabled()" @click="checkRow(item.id)">
                    <i class="fa fa-grip-vertical"></i>
                </td>
                <td class="select-row-checkbox" v-if="hasCheckingEnabled" @click="checkRow(item.id)">
                    <div class="checkbox-box">
                        <input type="checkbox" :checked="model.getChecked().indexOf(item.id) > -1">
                        <span class="checkmark"></span>
                    </div>
                </td>

                <td v-for="(name, field) in columns" :key="item.id+'-'+field" @click="selectRowFromTable($event, item, field)" :class="['td-'+field, { image_field : isImageField(field) } ]" :data-field="field">
                    <table-row-value
                        :settings="getCachableColumnsSettings(field)"
                        :columns="columns"
                        :field="field"
                        :name="name"
                        :item="item"
                        :model="model"
                        :image="isImageField(field)">
                    </table-row-value>
                </td>

                <td class="buttons-options" :data-model="model.slug" :class="[ 'additional-' + buttonsCount(item) ]">
                    <div class="buttons-options__item" v-if="isEditable || isDisplayable">
                        <button data-button="edit" :data-id="item.id" type="button" @click="model.selectRow(item)" :class="['btn', 'btn-sm', {'btn-success' : model.isActiveRow(item), 'btn-default' : !model.isActiveRow(item) }]" data-toggle="tooltip" title="" :data-original-title="model.hasAccess('update') && isEditable ? trans('edit') : trans('show')">
                            <i :class="{ 'fas fa-spinner fa-spin' : loadingRow == item.id, 'far fa-edit' : loadingRow != item.id }"></i>
                        </button>
                    </div>
                    <div class="buttons-options__item" v-if="isEnabledHistory"><button data-button="history" type="button" v-on:click="model.showHistory(item)" class="btn btn-sm btn-default" :class="{ 'enabled-history' : model.isActiveRow(item) && history.history_id }" data-toggle="tooltip" title="" :data-original-title="trans('history.changes')"><i class="fa fa-history"></i></button></div>
                    <div class="buttons-options__item" v-if="canShowGettext"><button data-button="gettext" type="button" v-on:click="openGettextEditor(item)" class="btn btn-sm btn-default" data-toggle="tooltip" title="" :data-original-title="trans('gettext-update')"><i class="fa fa-globe-americas"></i></button></div>
                    <div class="buttons-options__item" v-if="canShowInfo" ><button type="button" data-button="show" v-on:click="showInfo(item)" class="btn btn-sm btn-default" data-toggle="tooltip" title="" :data-original-title="trans('row-info')"><i class="far fa-question-circle"></i></button></div>
                    <div class="buttons-options__item" v-for="(button, button_key) in getButtonsForRow(item)">
                        <button type="button" :data-button="'action-'+button.key" v-on:click="buttonAction(button_key, button, item)" :class="['btn', 'btn-sm', button.class]" data-toggle="tooltip" title="" :data-original-title="button.name"><i :class="['fa', button_loading == getButtonKey(item.id, button_key) ? 'fa-sync-alt' : faMigrator(button.icon), { 'fa-spin' : button_loading == getButtonKey(item.id, button_key) }]"></i></button>
                    </div>
                    <div class="buttons-options__item" v-if="model.canUnpublishRow(item.id)">
                        <publish-button
                            :model="model"
                            :row="item" />
                    </div>
                    <div class="buttons-options__item" v-if="model.deletable && count > model.minimum && model.hasAccess('delete')">
                        <button data-button="delete" type="button" v-on:click="removeRow(item, key)" class="btn btn-danger btn-sm" :class="{ disabled : model.isReservedRow(item.id) }" data-toggle="tooltip" title="" :data-original-title="trans('delete')"><i class="far fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
        </component>
    </table>
</template>

<script>
import TableRowValue from './TableRowValue.vue';
import PublishButton from '../Partials/PublishButton.vue';
import draggable from 'vuedraggable'

export default {
    props : ['rows', 'buttons', 'count', 'field', 'gettext_editor', 'model', 'button_loading', 'pagination'],

    components: { TableRowValue, PublishButton, draggable },

    data(){
        return {
            enabled_columns : {},
            hidden: ['language_id', '_order', 'slug', 'published_at', 'updated_at', 'created_at'],
            autoSize : false,
        };
    },

    created() {
        //If table has foreign column, will be hidden
        if ( this.model.foreign_column != null ) {
            this.hidden.push( this.model.foreign_column );
        }

        //Set allowed columns
        this.resetAllowedColumns();

        //Automaticaly choose size of tables
        if ( this.autoSize == false ) {
            this.model.checkActiveGridSize(this.columns);
        }

        //On history change
        eventHub.$on('selectHistoryRow', this.selectHistoryRowEvent = data => {
            if ( this.model.slug != data.table )
                return;

            this.model.selectRow({ id : data.row_id }, null, null, data.history_id, data.row);
        });
    },

    destroyed() {
        eventHub.$off('selectHistoryRow', this.selectHistoryRowEvent);
    },

    watch: {
        columns(){
            this._cacheColumnSettings = {};
        },
    },

    computed: {
        loadingRow(){
            return this.model.getData('loadingRow');
        },
        history(){
            return this.model.getData('history');
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
            var limit = 100,
                columnsCount = Object.keys(this.columns).length;

            return this.pagination.limit >= limit && this.rows.count >= limit || columnsCount > 10;
        },
        multipleCheckbox(){
            return this.model.getChecked().length > 0;
        },
        defaultColumns(){
            var data = {},
                key;

            //Get columns from row
            for ( var i = 0; i < this.model.columns.length; i++ ) {
                key = this.model.columns[i];

                //If is column hidden
                if (this.model.getSettings('columns.'+key+'.hidden')) {
                    continue;
                }

                if (
                    this.hidden.indexOf( key ) == -1
                    && this.avaliableColumns.indexOf( key ) > -1
                    && (
                            !(key in this.model.fields)
                            || (
                                this.model.fields[key].hidden != true
                                && this.model.fields[key].invisible != true
                            )
                            || this.model.fields[key].column_visible == true
                    )
                ) {
                    data[ this.model.columns[i] ] = this.fieldName( this.model.columns[i] );
                }
            }

            var columns = this.model.getSettings('columns');

            /*
             * Check if can be added column after other column
             */
            var except = [];

            //Add before and after column values
            if ( columns ) {
                for ( var i in columns ) {
                    //Skip hidden column, also if is imaginary
                    if ( this.model.getSettings('columns.'+i+'.hidden') == true ){
                        continue;
                    }

                    var modifiedData = {};

                    for ( var key in data ) {
                        //Add custom column before actual column
                        for ( var k in columns ) {
                            modifiedData = this.addColumn(modifiedData, k, key, 'before', columns, except);
                        }

                        modifiedData[key] = data[key];

                        //Add custom column after actual column
                        for ( var k in columns ) {
                            modifiedData = this.addColumn(modifiedData, k, key, 'after', columns, except);
                        }
                    }

                    data = modifiedData;
                }

                for ( var key in columns ) {
                    if ( !(key in data) && (
                            (
                                columns[key].hidden != true
                                && columns[key].invisible != true
                            )
                            || columns[key].column_visible == true
                        )
                    ) {
                        var field_key = this.getColumnRightKey(key);

                        data[key] = columns[key].name||columns[key].title||this.model.fields[field_key].column_name||this.model.fields[field_key].name;
                    }
                }
            }

            //Remove increments
            if ( this.$root.getModelProperty(this.model, 'settings.increments') === false && 'id' in data )
                delete data['id'];

            this.model.setData('default_columns', Object.keys(data));

            return data;
        },
        columns(){
            var columns = {}

            //Disable changed fields
            for ( var key in this.enabled_columns )
                if ( this.enabled_columns[key].enabled == true )
                    columns[key] = this.enabled_columns[key].name;

            return columns;
        },
        avaliableColumns(){
            return ['id'].concat( Object.keys( this.model.fields ) );
        },
        isEditable(){
            return this.model.editable == true || this.model.hasChilds() > 0;
        },
        isDisplayable(){
            return this.model.displayable == true;
        },
        isEnabledHistory(){
            //Check if history is enabled, and user has acces to read data from history
            return this.model.history == true && this.$root.models.models_histories.hasAccess('read');
        },
        canShowGettext(){
            if (
                ['languages', 'admin_languages'].indexOf(this.model.slug) > -1
                && this.$root.gettext == true
                && this.model.hasAccess('update')
            ) {
                return true;
            }

            return false;
        },
        canShowInfo(){
            if ( this.model.getSettings('dates') == true ) {
                return true;
            }

            return false;
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
    },

    methods: {
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

            var settings = {
                isRealField: field in this.model.fields,
                field : this.model.fields[field],
                string_limit : this.getFieldLimit(field),
                default_slug : this.$root.languages.length ? this.$root.languages[0].slug : null,
                field : field in this.model.fields ? this.model.fields[field] : null,
                add_before : this.model.getSettings('columns.'+field+'.add_before'),
                add_after : this.model.getSettings('columns.'+field+'.add_after'),
                encode : this.model.getSettings('columns.'+field+'.encode', true),
                limit : this.model.getSettings('columns.'+field+'.limit'),
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
        addColumn(modifiedData, k, key, where, columns, except){
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

                modifiedData[field_key] = columns[k].name||columns[k].title||this.model.fields[field_key].column_name||this.model.fields[field_key].name;
            }

            return modifiedData;
        },
        toggleAllCheckboxes(){
            var ids = this.rows.data.map(item => item.id);

            this.model.setChecked(this.isCheckedAll ? [] : ids);
        },
        checkRow(id, field, row){
            if ( row && this.canOpenRowOnClick && (this.isEditable || this.isDisplayable) ) {
                this.model.selectRow(row);

                return;
            }

            if ( this.hasCheckingEnabled === false ){
                return;
            }

            //Disable checking on type of fields
            if ( field in this.model.fields && ['file'].indexOf(this.model.fields[field].type) > -1 ) {
                return;
            }

            this.model.toggleChecked(id);
        },
        resetAllowedColumns(){
            var columns = _.cloneDeep(this.defaultColumns),
                enabled = {},
                order = Object.keys(columns),
                model_keys = Object.keys(this.model.fields);

            //Add allowed keys
            for ( var key in columns ) {
                enabled[key] = {
                    name : columns[key],
                    enabled : true,
                };
            }

            //After allowed keys, add all hidden
            for ( var key in this.model.fields ) {
                //Skip existing columns
                if ( key in enabled ) {
                    continue;
                }

                //If fiels is inaccessible
                if ( this.model.fields[key].inaccessible === true ){
                    continue;
                }

                var add_index = null,
                    after = true,
                    before_columns = model_keys.slice(0, model_keys.indexOf(key)),
                    after_columns = model_keys.slice(model_keys.indexOf(key) + 1);

                //Add column after first visible column before this field
                for ( var i = before_columns.length - 1; i >= 0; i-- )
                {
                    if ( order.indexOf(before_columns[i]) > -1 ){
                        add_index = order.indexOf(before_columns[i]);
                        break;
                    }
                }

                //Add column before first visible column after this field
                if ( ! add_index )
                {
                    for ( var i = 0; i < after_columns.length; i++ )
                    {
                        if ( order.indexOf(after_columns[i]) > -1 ){
                            add_index = order.indexOf(after_columns[i]);
                            after = false;
                            break;
                        }
                    }
                }

                if ( add_index === null ) {
                    order.push(key);
                } else {
                    order.splice(add_index + (after ? 1 : 0), 0, key);
                }

                enabled[key] = {
                    name : this.fieldName(key),
                    enabled : false,
                };
            }

            var correctOrder = {};
            for ( var i = 0; i < order.length; i++ ) {
                correctOrder[order[i]] = enabled[order[i]];
            }

            this.model.setData('enabled_columns', this.enabled_columns = correctOrder);
        },
        buttonsCount(item){
            var buttons = this.getButtonsForRow(item),
                additional = 0;

            additional += this.isEnabledHistory ? 1 : 0;
            additional += this.canShowGettext ? 1 : 0;
            additional -= !this.canShowGettext ? 1 : 0;
            additional -= !this.model.publishable ? 1 : 0;

            return Object.keys(buttons||{}).length + additional;
        },
        getButtonsForRow(item){
            if ( ! this.rows.buttons || !(item.id in this.rows.buttons) )
                return {};

            var data = {},
                buttons = this.rows.buttons[item.id];

            for ( var key in buttons ) {
                if ( ['button', 'both', 'multiple'].indexOf(buttons[key].type) > -1 ) {
                    data[key] = buttons[key];
                }
            }

            return data;
        },
        getButtonKey(id, key){
            return this.$parent.getButtonKey(id, key);
        },
        buttonAction(key, button, row){
            return this.$parent.buttonAction(key, button, row);
        },
        toggleSorting(key){
            var sortable = this.$root.getModelProperty(this.model, 'settings.sortable');

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
        getDateByField(row, key){
            if ( key in this.model.fields )
                return row[key];

            return moment(row[key]).format('DD.MM.Y HH:mm');
        },
        showInfo(row){
            var data = '';

            if ( row.created_at != null )
                data += this.trans('created-at') + ': <strong>' + this.getDateByField(row, 'created_at') + '</strong><br>';

            if ( row.updated_at != null && this.model.editable != false )
                data += this.trans('last-change') + ': <strong>' + this.getDateByField(row, 'updated_at') + '</strong><br>';

            if ( row.published_at != null )
                data += this.trans('published-at') + ': <strong>' + this.getDateByField(row, 'published_at') + '</strong>';

            this.$root.openAlert(this.trans('row-info-n') + ' ' + row.id, data, 'primary', null, function(){});
        },
        openGettextEditor(item){
            this.$parent.$parent.gettext_editor = item;
        },
        selectRowFromTable(event, row, fieldKey){
            //if table cannot be opened
            if ( !(this.isEditable || this.isDisplayable) ){
                return;
            }

            let field = this.model.fields[fieldKey];

            //If table has disabled clicks for opening rows
            if ( this.model.getSettings('table.clickable', true) === false ){
                return;
            }

            //If user click on link or button, we does not want to open row
            for ( var i = 0; i < event.path.length; i++ ){
                if ( ['A', 'BUTTON'].indexOf(event.path[i].tagName) > -1 ){
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

                if ( 'image' in field )
                    return true;
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
    },
}
</script>