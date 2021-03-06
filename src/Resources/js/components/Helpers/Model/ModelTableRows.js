//My error
const customErrorAlert = (response) => {
    var url = response.request.url;

    for ( var key in response.request.params ) {
        url = url.replace('{'+key+'}', response.request.params[key]);
    }

    $app.openAlert($app.trans('warning'), 'Nastala nečakana chyba, skúste neskôr prosím.<br><br>Príčinu zlyhania požiadavky môžete zistiť na tejto adrese:<br> <a target="_blank" href="'+url+'">'+url+'</a>', 'error');
}

const updateModel = (model, requestModel) => {
    for ( var key in requestModel ) {
        //If key is missing in admin model, add new data
        if ( (key in $app.originalModels[model.table]) ) {
            continue
        }

        // Rewrite model
        $app.$set($app.models[model.table], key, requestModel[key]);
    }
};

const updateFieldOptions = (model, fields, requestModel) => {
    //Update fields from database, for dynamic selectbox values
    for ( var key in fields ){
        //Update filterBy for each model
        if ( 'filterBy' in (requestModel.fields[key]||{}) && requestModel.fields[key].filterBy ){
            $app.$set(model, 'fields.'+key+'.filterBy', requestModel.fields[key].filterBy);
        } else if ( 'filterBy' in model.fields[key]||{} ){
            delete model.fields[key].filterBy;
        }

        //Update options
        if (
            'options' in model.fields[key]
            && (
                typeof fields[key].options === 'string'
                || Object.keys(fields[key].options).length > 0
            )
        ) {
            //Use options from different field
            if ( typeof fields[key].options === 'string' )
            {
                if ( fields[key].options.substr(0, 2) == '$.' )
                {
                    var from_key = fields[key].options.substr(2);

                    let modelOptions = { ...model.getData('modelOptions') };
                        modelOptions[key] = fields[from_key].options;

                    model.setData('modelOptions', modelOptions);
                }
            }

            //Use own field options
            else {
                let modelOptions = { ...model.getData('modelOptions') };
                    modelOptions[key] = fields[key].options;

                model.setData('modelOptions', modelOptions);
            }
        }
    }
};

const addScopeParams = (model, data) => {
    if ( !('scopes' in data) ){
        data['scopes'] = {};
    }

    let scopes = model.getData('scopes');
    for ( var key in scopes ){
        let params = scopes[key].join(';');

        data['scopes'][key] = params;
    }

    //Added model scopes
    for ( var i = 0; i < model.scopes.length; i++ ){
        let scope = model.scopes[i];

        data['scopes'][scope.key] = scope.params;
    }

    return data;
}

const isModelDestroyed = () => {
    return false;
}

const getStorage = () => {
    return $.parseJSON(localStorage.sizes||'{}')||{};
}

const hasModelsInGroups = (childs) =>{
    for ( var i = 0 ; i < childs.length; i++ ) {
        //Check if group field is tab
        if ( typeof childs[i] != 'object' ) {
            continue;
        }

        //If model is in recursive tabs or group
        if ( childs[i].model ){
            return true;
        }

        //If tab has other childs, then check recursive
        if ( childs[i].fields.length > 0 ) {
            if ( hasModelsInGroups(childs[i].fields) ) {
                return true;
            }
        }
    }

    return false;
};

const fullSizeByColumns = () => {
    if ( window.innerWidth < 1500 ) {
        return 4;
    }

    return 5;
}

var ModelTableRows = (Model) => {
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

    Model.prototype.isPaginationEnabled = function(){
        return this.getSettings('pagination.enabled') !== false && !this.isWithoutParentRow();
    }

    Model.prototype.isEnabledAutoSync = function(){
        var limit = this.isPaginationEnabled() ? this.getData('pagination').limit : 0,
            refreshingRowsLimit = 100;

        return !(
            this.getData('rows').count > 0 && this.maximum === 1 ||
            this.getData('rows').count > refreshingRowsLimit && parseInt(limit) > refreshingRowsLimit
        );
    }

    Model.prototype.disableRowsRefreshing = function(){
        clearTimeout(this.getData('refreshUpdateTimeout'));
    }

    Model.prototype.hasRows = function(){
        let rows = this.getData('rows');

        if ( rows.loaded == false && this.maximum != 1 ){
            return true;
        }

        return rows.data.length > 0;
    }

    Model.prototype.enableRowsRefreshing = function(indicator, force){
        this.disableRowsRefreshing();

        //Disable autorefreshing when is one row
        if ( this.isEnabledAutoSync() === false && force !== true ){
            return;
        }

        let timeout = setTimeout(() => {
            this.loadRows(indicator);
        }, this.getData('refresh').interval);

        this.setData('refreshUpdateTimeout', timeout);
    }

    Model.prototype.isHiddenMode = function(){
        return this.getData('pagination').limit == 'hide';
    }

    Model.prototype.enabledColumnsList = function(){
        var allowed = [],
            enabledColumns = this.getData('enabled_columns')||{};

        for ( var key in enabledColumns ) {
            if ( enabledColumns[key].enabled == true && this.getData('default_columns').indexOf(key) == -1 ) {
                allowed.push(key);
            }
        }

        return allowed;
    }

    /*
     * Return if model is in reversed mode
     * new rows will be added on the end
     */
    Model.prototype.isReversed = function(except){
        if ( except != true && ( !(2 in this.orderBy) || this.orderBy[2] != true ) ) {
            return false;
        }

        return ['id', '_order'].indexOf(this.orderBy[0]) > -1 && this.orderBy[1].toLowerCase() == 'asc';
    }

    Model.prototype.activeGridSize = function(){
        var size = this.getData('sizes').filter(row => {
            if ( row.active == true ) {
                var rows = getStorage();
                    rows[this.slug] = row.size;
                    rows[this.slug+'_default'] = this.getSettings('grid.default');

                localStorage.sizes = JSON.stringify( rows );
            }

            return row.active == true;
        });

        return size[0] ? size[0].size : null;
    }

    Model.prototype.isEnabledOnlyFormOrTableMode = function(){
        return this.activeGridSize() === 0 && this.isInParent() !== true && this.getSettings('grid.splitmode') !== true;
    }

    Model.prototype.canAddRow = function(){
        //Disabled adding new rows
        if ( this.insertable == false || !this.hasAccess('insert') ) {
            return false;
        }

        //Unlimited allowed rows
        if ( this.maximum == 0 ) {
            return true;
        }

        if ( this.maximum <= this.getData('rows').count ) {
            return false;
        }

        return true;
    },

    Model.prototype.isOnlyFormOpened = function(){
        return this.getData('formOpened') == true && this.isEnabledOnlyFormOrTableMode() === true;
    },

    Model.prototype.canShowRows = function(){
        if ( this.getSettings('table.enabled', true) === false ){
            return false;
        }

        if ( this.isEnabledOnlyFormOrTableMode() === true && (this.isOpenedRow() || this.isOnlyFormOpened() === true) ){
            return false;
        }

        if ( this.hasAccess('read') == false ) {
            return false;
        }

        if ( this.isSingle() ){
            this.enableOnlyFullScreen();

            return false;
        }

        return true;
    }

    Model.prototype.canShowForm = function(){
        if ( this.getSettings('form.enabled', true) === false ){
            return false;
        }

        if ( (!this.isOpenedRow() && !this.canAddRow() || this.isOpenedRow() && (this.editable == false && this.displayable !== true)) && !this.isInParent() ) {
            return false;
        }

        //If row is not selected, and form is not opened. But in table needs exists rows
        if ( this.isEnabledOnlyFormOrTableMode() === true && !this.isOpenedRow() && this.isOnlyFormOpened() === false && this.isSingle() == false ){
            return false;
        }

        //If user does not have write permissions
        if ( !this.isOpenedRow() && this.hasAccess('insert') == false ) {
            return false;
        }

        return true;
    }

    Model.prototype.enableOnlyFullScreen = function(){
        let sizes = this.getData('sizes');

        for ( var key in sizes ) {
            if ( key != 3 ) {
                sizes[key].disabled = true;
                sizes[key].active = false;
            }
        }

        return sizes[3].active = true;
    }

    /*
     * Returns if model has next childs
     */
    Model.prototype.hasChilds = function(){
        var length = 0;

        for ( var key in this.childs ) {
            length++;
        }

        return length;
    };

    Model.prototype.checkActiveGridSize = function(columns){
        var data = getStorage(),
            defaultValue = this.getSettings('grid.default'),
            columns = Object.keys(columns),
            sizes = this.getData('sizes');

        //Disable big table
        if ( columns.length >= 5 ) {
            sizes[0].disabled = true;
        }

        //Full screen
        if ( ! this.canShowForm() || this.isSingle() ) {
            return this.enableOnlyFullScreen();
        }

        //Select size from storage
        if ( this.slug in data && data[this.slug + '_default'] == defaultValue ) {
            for ( var key in sizes ) {
                if ( sizes[key].size == data[this.slug] ) {
                    return sizes[key].active = true;
                }
            }
        } else if ( defaultValue !== null ){
            // If model has default grid property
            for ( var key in sizes ) {
                if ( sizes[key].size == defaultValue || sizes[key].key == defaultValue ) {
                    return sizes[key].active = true;
                }
            }
        }

        /*
         * When is localStorage value empty, then automatic chose the best grid value.
         * In this case we need check for all full screen options
         */
        if (
            hasModelsInGroups(this.fields_groups)
            || this.hasChilds() > 0
            || columns.length > fullSizeByColumns()
        ) {
            return sizes[3].active = true;
        }

        //50/50
        sizes[2].active = true;
    }

    Model.prototype.loadRows = async function(indicator, download){
        //On first time allow reload rows without parent, for field options...
        if ( (this.isWithoutParentRow() || this.getData('activetab') === false) && indicator == false ){
            return false;
        }

        let pagination = this.getData('pagination'),
            refresh = this.getData('refresh'),
            search = this.getData('search'),
            rows = this.getData('rows');

        if ( indicator !== false ) {
            pagination.refreshing = true;
        }

        // Remove previous refresh timeout
        this.disableRowsRefreshing();

        var search_query = {},
            rowsLimit = this.isPaginationEnabled() ? (this.isHiddenMode() ? 1 : pagination.limit) : 0,
            query = {
                model : this.slug,
                parent : this.getParentTableName(this.without_parent),
                subid : this.getParentRowId(),
                langid : this.localization === true ? this.getData('langid') : 0,
                limit : rowsLimit,
                page : pagination.position,
                count : refresh.count,
            };

        if ( download == true ){
            search_query.download = 1;
        }

        //If is enabled searching
        if ( this.getData('searching') == true ){
            search_query.search = [];

            for ( var i = 0; i < search.queries.length; i++ ){
                let item = search.queries[i],
                    obj = {
                        query : item.query,
                        column : item.column,
                    }

                if ( item.interval === true ) {
                    obj.query_to = item.query_to;
                }

                search_query.search.push(obj);
            }
        }

        //Add additional columns which are not in default rows state
        if ( this.enabledColumnsList().length > 0 ) {
            search_query.enabled_columns = this.enabledColumnsList().join(';');
        }

        addScopeParams(this, search_query);

        try {
            let response = await $app.$http.get($app.requests.get('rows', query), {
                params : search_query,
            });

            //If has been component destroyed, and request is delivered... and some conditions
            if ( this.getData('dragging') === true || this.getData('progress') === true || isModelDestroyed() ){
                return;
            }

            if ( typeof response.data == 'string' ){
                customErrorAlert(response);
                return;
            }

            //Disable loader
            pagination.refreshing = false;

            //Download response
            if ( response.data.download ){
                return window.location.href = response.data.download;
            }

            var requestModel = response.data.model;

            updateModel(this, requestModel);

            //Load rows into array
            this.updateRowsData(response.data.rows, this.enabledColumnsList().length == 0 ? null : 1);
            rows.count = response.data.count;

            //Bind additional buttons for rows
            rows.buttons = response.data.buttons;

            //Rows are successfully loaded
            rows.loaded = true;

            //If is reversed sorting in model, then set pagination into last page after first displaying table
            if ( this.isReversed() && refresh.count == 0 ) {
                pagination.position = Math.ceil(rows.count / pagination.limit);
            }

            if ( refresh.count == 0 ){
                //Update field options
                updateFieldOptions(this, requestModel.fields, requestModel);

                //Render additional layouts
                this.setData('layouts', response.data.layouts);
            }

            //Set single model row
            if ( this.isSingle() && response.data.rows.length > 0 ) {
                this.setRow(response.data.rows[0]||this.emptyRowInstance());
                this.sendRowData();
            }

            //Update refresh informations
            refresh.count++;
            refresh.refreshing = false;

            //Get new csrf token
            $app.reloadCSRFToken(response.data.token);

            //Add next timeout, but we do not want sync filled single model
            //If single model is empty, then keep syncing till row will be available
            if ( ! this.isSingle() || response.data.rows.length == 0 ) {
                this.enableRowsRefreshing(false);
            }
        } catch (response) {
            //If has been component destroyed, and request is delivered...
            if ( isModelDestroyed() ) {
                return;
            }

            //Add next timeout
            this.enableRowsRefreshing(false, true);

            //On first error from response
            if ( response.status == 500 ){
                let message;

                try {
                    message = response.message;

                    try {
                        message = response.body.message
                    } catch {};
                } catch {};

                if ( message ){
                    $app.errorResponseLayer(response, message);
                }
            }

            //Show error alert at first request
            else if ( refresh.count == 0 && this.getData('hasShowedError') !== true || response.status == 401 ){
                this.setData('hasShowedError', true);

                $app.errorResponseLayer(response, null);
            }
        };
    }
};

export default ModelTableRows;