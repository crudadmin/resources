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
};

export default Fields;