var ModelCoreHelpers = (Model) => {
    Model.prototype.hasParentModel = function(table){
        return this.getParentModels().map(model => model.table).includes(table);
    }

    Model.prototype.getParentTableName = function(){
        const manualParentModel = this.getData('parentModel');
        if ( manualParentModel === false ){
            return;
        }

        var parentModel = manualParentModel||this.getParentModel();

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