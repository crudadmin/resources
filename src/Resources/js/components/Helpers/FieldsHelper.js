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
        var value = _.find(this.fields[key].options, { 0 : id });

        if ( _.isNil(value) ) {
            return null;
        }

        return value[1];
    }

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.isMatchedAttributesValues = function(params, isIn){
        var items = (params||'').split(','),
            fieldOperator = items[0].split('.'),
            relatedField = this.fields[fieldOperator[0]]||this.fields[fieldOperator[0]+'_id'],
            value = relatedField.value;

        //If is key in item from options fields
        if ( fieldOperator.length > 1 ) {
            var options = relatedField.options,
                option = _.find(options, item => ( item[0] == value ));

            //Implement is in
            if ( isIn ) {
                if ( option && items.slice(1).filter(item => (item == option[1][fieldOperator[1]])).length > 0 ) {
                    return true;
                }
            } else {
                if ( option && option[1][fieldOperator[1]] === items[2] ) {
                    return true;
                }
            }

            return false;
        }

        //If is empty value
        if ( _.isNil(value) || value === '' ) {
            value = null;
        }

        //If is empty identifier
        if ( _.isNil(items[1]) || items[1] === '' ) {
            items[1] = null;
        }

        return isIn ? (items.slice(1).indexOf(value) > -1) : value == items[1];
    }

    /*
     * Try atribute values with all combinations (attr as tru, attrIf, attrIfNot...)
     */
    Model.prototype.tryAttribute = function(field, type){
        let param;

        if ( (param == field[type]) && param === true ){
            return true;
        }

        if ( param = field[type+'If'] ) {
            return this.isMatchedAttributesValues(param);
        }

        if ( param = field[type+'IfIn'] ) {
            return this.isMatchedAttributesValues(param, true);
        }

        if ( param = field[type+'IfNot'] ) {
            return !this.isMatchedAttributesValues(param);
        }

        if ( param = field[type+'IfNotIn'] ) {
            return !this.isMatchedAttributesValues(param, true);
        }

        return false;
    }
};

export default Fields;