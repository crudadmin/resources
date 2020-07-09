var Fields = (Model) => {
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

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.isMatchedAttributesValues = function(params, isIn, row){
        var items = (params||'').split(','),
            fieldOperator = items[0].split('.'),
            relatedField = this.fields[fieldOperator[0]]||this.fields[fieldOperator[0]+'_id'],

            //If static field does not exists, and we want do actions by non existing columns, then look for value in row data.
            value = relatedField ? relatedField.value : row[fieldOperator[0]];

        //Cast values
        items = items.map(item => {
            var value = item;
                value = _.isNil(item) || ['', 'NULL'].indexOf(item) > -1 ? null : value;
                value = ['TRUE'].indexOf(item) > -1 ? true : value;
                value = ['FALSE'].indexOf(item) > -1 ? false : value;

            return value;
        });

        //If is key in item from options fields
        if ( relatedField && fieldOperator.length > 1 ) {
            var options = relatedField.options,
                option = _.find(options, item => ( item[0] == value ));

            //Implement is in
            if ( isIn ) {
                if ( option && items.slice(1).filter(item => (item == option[1][fieldOperator[1]])).length > 0 ) {
                    return true;
                }
            } else {
                if ( option && option[1][fieldOperator[1]] === items[1] ) {
                    return true;
                }
            }

            return false;
        }

        //If is empty value
        if ( _.isNil(value) || value === '' ) {
            value = null;
        }

        return isIn ? (items.slice(1).filter(item => item == value).length > 0) : value == items[1];
    }

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.tryAttribute = function(field, type, row){
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
            return this.isMatchedAttributesValues(param, false, row);
        }

        if ( param = field[type+'IfIn'] ) {
            return this.isMatchedAttributesValues(param, true, row);
        }

        if ( param = field[type+'IfNot'] ) {
            return !this.isMatchedAttributesValues(param, false, row);
        }

        if ( param = field[type+'IfNotIn'] ) {
            return !this.isMatchedAttributesValues(param, true, row);
        }

        return false;
    }
};

export default Fields;