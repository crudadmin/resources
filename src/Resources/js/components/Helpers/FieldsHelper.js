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
};

export default Fields;