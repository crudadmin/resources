import Field from '@components/Helpers/Field/Field';
import DateCast from '@components/Helpers/Casts/DateCast.js';
import { fixBoolValue } from '@/js/utils/helpers.js';

import _ from 'lodash';

const InitializeFields = (rawModel) => {
    for ( var key in rawModel.fields ){
        rawModel.fields[key] = new Field(rawModel.fields[key]);

        rawModel.fields[key].model = rawModel;
    }
}

var Fields = (Model, rawModel) => {
    //Initialize fields builder
    InitializeFields(rawModel);

    /*
     * Hide input
     */
    Model.prototype.hideFromForm = function(key, value){
        Vue.set(this.fields[key], 'hideFromForm', value);
    }

    /*
     * Remove input
     */
    Model.prototype.removeFromForm = function(key, value){
        Vue.set(this.fields[key], 'removeFromForm', value);
    }

    /*
     * Filter fields options by key or by function
     */
    Model.prototype.optionsFilter = function(key, filter){
        this.fields[key].optionsFilter = filter;
    }

    /*
     * Get option from field by id
     */
    Model.prototype.getOptionValue = function(key, id){
        var field = this.fields[key];

        var value = field.options.filter(item => {
            return item[0] == id;
        })[0];

        if ( _.isNil(value) ) {
            return null;
        }

        return value[1];
    }

    Model.prototype.getModelFieldValueSelector = function(paramsOperator){
        let operators = (paramsOperator||'').split(','),
            fieldKey = operators[0].split('.'),
            //Determine if we want retrieve parent model table with $tablename.columns selector
            hasParentTableFieldLookup = fieldKey[0][0] == '$',
            hasChildTableFieldLookup = fieldKey[0][0] == '$$',
            model = hasParentTableFieldLookup
                    ? this.getParentModel(fieldKey[0].substr(1))
                    : (
                        hasChildTableFieldLookup
                            ? this.getChildModel(fieldKey[0].substr(2))
                            : this
                    ),
            row = model?.getRow();

        //We need throw away table selector. Because selector may be $parenttable.column.optionattribute
        if ( hasParentTableFieldLookup || hasChildTableFieldLookup ){
            fieldKey = fieldKey.slice(hasChildTableFieldLookup ? 2 : 1);
        }

        //We need retrieve selected field from given model
        let field = model ? (model.fields[fieldKey[0]]||model.fields[fieldKey[0]+'_id']) : null,

            //If static field does not exists, and we want do actions by non existing columns, then look for value in row data.
            value = field ? field.value : (row||{})[fieldKey[0]];

        //Cast values
        operators = operators.map(item => {
            var value = item;
                value = _.isNil(item) || ['', 'NULL'].indexOf(item) > -1 ? null : value;
                value = ['TRUE'].indexOf(item) > -1 ? true : value;
                value = ['FALSE'].indexOf(item) > -1 ? false : value;

            return value;
        });

        return {
            operators,
            row,
            value,
            field,
            fieldKey,
            model,
        }
    }

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.isMatchedAttributesValues = function(params, isIn){
        let { operators, model, fieldKey, field, row, value } = this.getModelFieldValueSelector(params);

        //If is key in item from options fields
        if ( field && fieldKey.length > 1 ) {
            var options = field.options,
                option = _.find(options, item => ( item[0] == value ));

            //Implement is in
            if ( isIn ) {
                if ( option && operators.slice(1).filter(item => (item == option[1][fieldKey[1]])).length > 0 ) {
                    return true;
                }
            } else {
                if ( option && option[1][fieldKey[1]] === operators[1] ) {
                    return true;
                }
            }

            return false;
        }

        //If is empty value
        if ( _.isNil(value) || value === '' ) {
            value = null;
        }


        if (isIn) {
            return operators.slice(1).filter(item => {
                //Support multiselect values
                if ( _.isArray(value) ){
                    return value.indexOf(item) > -1;
                }

                return item == value;
            }).length > 0;
        }

        //Support multiselect values
        if ( _.isArray(value) && value.length == 1 ){
            return Object.values(value)[0] == operators[1];
        }

        return value == operators[1];
    }

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.tryAttribute = function(field, type){
        let param;

        //If is static value, non dynamical...
        if ( param = field[type] ) {
            if ( param === true ){
                return true;
            } else if ( param === false ){
                return false;
            }
        }

        if ( param = field[type+'If'] ) {
            return this.isMatchedAttributesValues(param, false);
        }

        if ( param = field[type+'IfIn'] ) {
            return this.isMatchedAttributesValues(param, true);
        }

        if ( param = field[type+'IfNot'] ) {
            return !this.isMatchedAttributesValues(param, false);
        }

        if ( param = field[type+'IfNotIn'] ) {
            return !this.isMatchedAttributesValues(param, true);
        }

        return undefined;
    }

    Model.prototype.getFilterBy = function(key){
        let field = this.fields[key];

        if ( !field || !('filterBy' in field) ){
            return null;
        }

        var filterBy = field.filterBy.split(','),
            column;

        //Get column of relation field
        this.fields[column = filterBy[0]+'_id']||this.fields[column = filterBy[0]]

        filterBy[0] = column;

        return filterBy;
    }

    Model.prototype.isFieldMultiple = function(key){
        let field = this.fields[key];

        if ( field ){
            return field.multiple && field.multiple === true || ('belongsToMany' in field);
        }
    }

    Model.prototype.changeValueFromInput = function(field_key, e, value, no_field, langslug){
        let field = this.fields[field_key];

        //Do not update value when confirmation field has been changed
        if ( field.confirmation ){
            return;
        }

        var value = e ? e.target.value : value;

        if ( field.type == 'checkbox' ) {
            value = e ? e.target.checked : value;
        }

        //Update specific language field
        if ( 'locale' in field ){
            var obj_value = typeof field.value === 'object' ? field.value||{} : {};

            $app.$set(obj_value, langslug, value);

            value = obj_value;
        }

        //Update field values
        if ( no_field != true ) {
            field.value = value;
        }

        var data = {};
            data[field_key] = value;

        $app.$set(this.getRow(), field_key, value);
    }

    Model.prototype.pushOption = function(field_key, row, action){
        let field = this.fields[field_key],
            modelRow = this.getRow();

        if ( !field || field.type !== 'select' ){
            return;
        }

        //Store or update option field
        if ( action == 'store' ) {
            var filterBy = this.getFilterBy(field_key);

            //Add relation into added row
            if ( filterBy && modelRow[filterBy[0]] ) {
                row[filterBy[1]] = modelRow[filterBy[0]];
            }

            //Push added option into array
            field.options.unshift([row.id, row]);

            //Set multiple values or one value
            if ( this.isFieldMultiple(field_key) ){
                if ( ! field.value ) {
                    field.value = [row.id];
                } else {
                    field.value.push(row.id);
                }

                this.changeValueFromInput(field_key, null, field.value, false);
            } else {
                this.changeValueFromInput(field_key, null, row.id);
            }
        } else if ( action == 'update' ) {
            for ( var i = 0; i < field.options.length; i++ )
                if ( field.options[i][0] == row.id ){
                    for ( var key in row ) {
                        field.options[i][1][key] = row[key];
                    }
                }
        } else if ( action == 'delete' ) {
            //Remove value also from field values
            if ( this.isFieldMultiple(field_key) ){
                if ( $.isArray(field.value) ){
                    field.value.splice(field.value.indexOf(row), 1);

                    this.changeValueFromInput(field_key, null, field.value, false);
                }
            } else if ( field.value == row ) {
                this.changeValueFromInput(field_key, null, null);
            }

            //Remove deleted field from options
            for ( var key in field.options ){
                if ( field.options[key][0] == row ){
                    field.options.splice(key, 1)

                    break;
                }
            }
        }
    }

    Model.prototype.hasLocaleFields = function(){
        for ( var key in this.fields ) {
            if ( this.fields[key].locale == true ) {
                return true;
            }

            //If some field has localized options rows
            var options = this.fields[key].options;

            if ( (options && options[0] && typeof options[0][1] == 'object' && options[0][1] !== null) && ('language_id' in options[0][1]) == true ) {
                return true;
            }
        }

        return false;
    }

    Model.prototype.getFieldFormat = function(fieldKey){
        let field = this.fields[fieldKey];

        if ( !field ){
            return;
        }

        if ( field.date_format ) {
            return field.date_format;
        } else if ( field.date_format_multiple ){
            return field.date_format_multiple.split(',')[0];
        }
    }

    Model.prototype.getFieldCast = function(key)
    {
        let field = this.fields[key];

        if ( !field ){
            return;
        }

        if ( ['date', 'datetime', 'time', 'timestamp'].includes(field.type) ){
            return new DateCast(this, field, key);
        }
    }

    Model.prototype.getCastedValue = function(key, value){
        let cast = this.getFieldCast(key, value);

        if ( cast ){
            return cast.get(value);
        }

        return value;
    }

    Model.prototype.getDownloadUrl = function(field, file){
        return $app.requests.download + '?model=' + encodeURIComponent(this.table) + '&field=' + encodeURIComponent(field) + '&file=' + encodeURIComponent(file);
    }

    Model.prototype.getUploadsUrl = function(field, file){
        return window.crudadmin.root + '/uploads/' + this.slug + '/' + field + '/' + file;
    }

    Model.prototype.getFieldLangs = function(fieldKey){
        let field = this.fields[fieldKey];

        if ( ! field || !('locale' in field) ) {
            return 1;
        }

        return _.map($app.languages, 'slug');
    }
};

export default Fields;