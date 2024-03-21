var ModelCoreHelpers = (Model) => {
    Model.prototype.getParentTableName = function(force){
        var parentModel = this.getParentModel();

        if ( force !== true && ((!parentModel || !parentModel.isOpenedRow())) ) {
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
        //TODO: CHECK
        return this.without_parent == true && !this.getParentRowId();
        // return this.without_parent == true && !this.getParentRowId() && this.hasParentFormModel() == true;
    }
};

export default ModelCoreHelpers;