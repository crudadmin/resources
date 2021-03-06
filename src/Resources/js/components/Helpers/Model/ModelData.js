export const defaultSearchQuery = {
    column : null,
    query : null,
    query_to : null,
    interval : false,
};

var ModelData = (Model, rawModel) => {
    if ( rawModel.data === undefined ) {
        rawModel.data = {
            //Each model need to have generated uuid
            uuid : $app.generateUuid(),

            //Depth level of given model
            depth_level : 0,

            //All uuids of parent models tree for given model
            tree : [],

            //Actual database row for given model
            row : {},

            //All available rows data fetched from database
            rows : {
                data : [],
                buttons : {},
                count : 0,
                loaded : false,
                save_children : [],
            },

            //Check if model has parent row. For example when we are using filterBy in select
            //we need dynamically set parent of model builder
            hasparentmodel : null,

            //Assigned parent row. May be parent model, or imaginary parent row
            //only to filter displayed rows
            parentrow : null,

            //Pagination data for given model
            pagination : {},

            //Search data
            search : {
                used : false,
                defaultQuery : defaultSearchQuery,
                queries : [],
            },

            //History support
            history : {
                history_id : null,
                data : {},
                id : null,
                rows : [],
                fields : [],
            },

            //Checked rows
            checked : [],

            //Refresh table intervals
            refresh : {},

            //Map events
            mapValues : [],
        };
    }

    /**
     * Set model data
     *
     * @param  string  key
     * @param  key  value
     */
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

    /**
     * Get model data
     *
     * @param  string  key
     */
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

    Model.prototype.setRow = function(row){
        return this.setData('row', row);
    }

    Model.prototype.setValue = function(key, value){
        this.data.row[key] = value;

        return this;
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
        this.setData('checked', []);
    }

    Model.prototype.getChecked = function(){
        return this.getData('checked');
    }

    Model.prototype.setChecked = function(ids){
        ids = _.castArray(ids);

        if ( ids.length > 0 ){
            let checked = _.uniq(this.data.checked.concat(ids));

            this.setData('checked', checked);
        } else {
            this.resetChecked();
        }
    }

    Model.prototype.toggleChecked = function(id){
        var checked = this.getData('checked'),
            index = checked.indexOf(id);

        if ( index == -1 ) {
            checked.push(id);
        } else {
            checked.splice(index, 1);
        }
    }

    Model.prototype.resetForm = function(){
        return this.setData('row', this.emptyRowInstance());
    }
};

export default ModelData;