var ModelData = (Model) => {
    Model.prototype.hasParentFormModel = function(){
        let hasparentmodel = this.getData('hasparentmodel');

        //If parent model builder does not exists, return true
        return _.isNil(hasparentmodel) ? true : hasparentmodel;
    }

    Model.prototype.getParentTableName = function(force){
        var parentModel = this.getParentModel(),
            row = parentModel ? parentModel.getRow() : null;

        //if is model loaded in field, and has parent row, then load model of that parent
        if ( this.hasParentFormModel() && typeof this.hasParentFormModel() == 'object' && 'slug' in this.hasParentFormModel() ) {
            return this.hasParentFormModel().slug;
        }

        if ( force !== true && ((!row || !( 'id' in row )) || this.hasParentFormModel() === false) ) {
            return 0;
        }

        let parentTable = this.getParentModel();

        return parentTable ? parentTable.table : null;
    };

    Model.prototype.getParentRowId = function(){
        var row = this.getData('parentrow');

        if ( !row || !( 'id' in row ) ){
            return 0;
        }

        return row.id;
    };

    Model.prototype.isWithoutParentRow = function(){
        return this.without_parent == true && !this.getParentRowId() && this.hasParentFormModel() == true;
    };

    /*
     * Change updated rows in db
     */
    Model.prototype.updateRowsData = function(data, update){
        let rows = this.getData('rows');

        //This update rows just in table, not in forms
        if ( update !== true && (rows.data.length != data.length || rows.data.length == 0 || rows.data[0].id != data[0].id || update === 1) ) {
            rows.data = data;
            return;
        }

        //Update changed data in vue object
        for ( var i in rows.data ) {
            for ( var k in data[i] ) {
                var isArray = $.isArray(data[i][k]);

                //Compare also arrays
                if ( isArray && !_.isEqual(rows.data[i][k], data[i][k]) || !isArray ) {
                    rows.data[i][k] = data[i][k];
                }
            }
        }
    };
};

export default ModelData;