var ModelCoreHelpers = (Model) => {
    Model.prototype.hasParentFormModel = function(){
        let hasparentmodel = this.getData('hasparentmodel');

        //If parent model builder does not exists, return true
        return _.isNil(hasparentmodel) ? true : hasparentmodel;
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

        let parentTable = this.getParentModel();

        return parentTable ? parentTable.table : null;
    };

    Model.prototype.getParentRowId = function(){
        var row = this.getData('parentrow');

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