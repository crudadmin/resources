var ModelCoreHelpers = (Model) => {
    Model.prototype.hasParentFormModel = function(){
        let hasParentModel = this.getData('hasParentModel');

        //If parent model builder does not exists, return true
        return _.isNil(hasParentModel) ? true : hasParentModel;
    }

    Model.prototype.getParentTableName = function(force){
        var parentModel = this.getParentModel();

        //if is model loaded in field, and has parent row, then load model of that parent
        if ( this.hasParentFormModel() && typeof this.hasParentFormModel() == 'object' && 'slug' in this.hasParentFormModel() ) {
            return this.hasParentFormModel().slug;
        }

        if ( force !== true && ((!parentModel || !parentModel.isOpenedRow()) || this.hasParentFormModel() === false) ) {
            return;
        }

        return parentModel ? parentModel.table : null;
    };

    Model.prototype.getParentRowId = function(){
        var row = this.getData('parentRow');

        if ( !row || !( 'id' in row ) ){
            return null;
        }

        return row.id;
    }

    Model.prototype.isWithoutExistingParentRow = function(){
        return this.without_parent == true && !this.getParentRowId() && this.hasParentFormModel() == true;
    }
};

export default ModelCoreHelpers;