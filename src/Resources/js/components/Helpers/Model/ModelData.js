export const defaultSearchQuery = {
    column : null,
    query : null,
    query_to : null,
    interval : false,
};

const freshModelData = (rawModel) => {
    return {
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
            page : 1,
            loaded : false,
            save_children : [],
            limit : 0,
            limits : [ 5, 10, 20, 30, 50, 100, 200, 500, 1000 ],
            refreshing : false,
            maxpages : 10,
        },

        //Grid model sizes
        sizes : {},

        //Is form opened?
        formOpened: false,

        //Is row loading? Opening row state.
        loadingRow: false,

        //Order/sorting in table
        orderBy : [],

        //Is model dragged right now?
        dragging : {
            active : false,
            list : null,
        },

        //Selected form language
        selected_language_id : null,

        //Register components for given model
        registered_components : [],

        //Assigned form into model
        form : null,

        //Determine if rows should be loaded on rendered model
        loadWithRows : true,

        //Which tab is currently active
        activeTab : {},

        //Parent model language id
        langid : null,

        //Is searching?
        searching : false,

        //Parent active grid size
        parentActiveGridSize : null,

        //Default model columns
        default_columns : {},

        //Enabled columns
        enabled_columns : null,

        //Is model sending row?
        progress : false,

        //Is button action loading?
        button_loading : false,

        //Loaded model options
        modelOptions : {},

        //Model scopes
        scopes : [],

        //Check if model has parent row. For example when we are using filterBy in select
        //we need dynamically set parent of model builder
        hasparentmodel : null,

        //Assigned parent row. May be parent model, or imaginary parent row
        //only to filter displayed rows
        parentrow : null,

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

        //Model events
        events : [],

        mutators : [],
    }
}

var ModelData = (Model, rawModel) => {
    if ( rawModel.data === undefined ) {
        rawModel.data = freshModelData(rawModel);
    }

    /**
     * Refresh instance of given model
     */
    Model.prototype.refreshInstance = function(){
        this.data = _.cloneDeep(freshModelData());
    }

    /**
     * Set model data
     *
     * @param  string  key
     * @param  key  value
     */
    Model.prototype.setData = function(key, value){
        $app.$set(this.data, key, value);

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
};

export default ModelData;