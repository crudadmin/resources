var ModelData = (Model, rawModel) => {
    if ( rawModel.data === undefined ) {
        rawModel.data = {
            //Each model need to have generated uuid
            uuid : $app.generateUuid(),

            //Depth level of given model
            depth_level : 0,

            //All uuids of parent models tree for given model
            tree : [],

            row : {},

            //Check if model has parent row. For example when we are using filterBy in select
            //we need dynamically set parent of model builder
            hasparentmodel : null,

            //Assigned parent row. May be parent model, or imaginary parent row
            //only to filter displayed rows
            parentrow : null,

            //Pagination data for given model
            pagination : {},

            //Search data
            search : {},

            //Checked rows
            checked : [],

            //Map events
            mapValues : [],
        };
    }

    Model.prototype.setData = function(key, value){
        this.data[key] = value;

        let mapValues = this.data.mapValues;

        for ( var i = 0; i < mapValues.length;i++ ){
            if ( mapValues[i].key === key ){
                mapValues[i].callback(value);
            }
        }

        return this;
    }

    Model.prototype.getData = function(key){
        return this.data[key];
    }

    Model.prototype.mapData = function(keys, callbackOrComponent){
        _.castArray(keys).forEach(key => {
            let callback = typeof callbackOrComponent == 'function' ? callbackOrComponent : (value) => {
                callbackOrComponent[key] = value;
            };

            this.data.mapValues.push({ key, callback });
        });

        return this;
    }

    Model.prototype.getRow = function(key){
        return this.getData('row');
    }

    Model.prototype.getParentModel = function(){
        return $store.getters['models/getModel'](this.data.tree[0]);
    }

    Model.prototype.getParentModels = function(){
        return this.data.tree.map(uuid => {
            return $store.getters['models/getModel'](uuid);
        });
    }

    Model.prototype.emptyRowInstance = function(){
        var row = {},
            table;

        //Add foreign columns
        if ( this.getData('parentrow') && this.foreign_column != null ) {
            if ( table = this.foreign_column[this.getParentTableName()] ) {
                row[table] = this.getData('parentrow').id;
            }
        }

        //Add default columns
        for ( var key in this.fields ) {
            row[key] = null;
        }

        return row;
    }

    Model.prototype.isOpenedRow = function(){
        let row = this.getData('row');

        return row && 'id' in row && row.id;
    }

    Model.prototype.resetChecked = function(){
        return this.data.checked.length = 0;
    }

    Model.prototype.resetForm = function(){
        return this.setData('row', this.emptyRowInstance());
    }
};

export default ModelData;