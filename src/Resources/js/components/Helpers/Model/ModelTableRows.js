const updateModel = (model, requestModel, isInitial) => {
    if ( isInitial == true ) {
        //Boot initial data
        let bootData = requestModel.initial_data||{};

        for ( var key in bootData ){
            model.setData(key, bootData[key]);
        }
    }
};

const updateFieldOptions = (model, fields, requestModel) => {
    //Update fields from database, for dynamic selectbox values
    for ( var key in fields ){
        //Update filterBy for each model
        if ( 'filterBy' in (requestModel.fields[key]||{}) && requestModel.fields[key].filterBy ){
            $app.$set(model, 'fields.'+key+'.filterBy', requestModel.fields[key].filterBy);
        } else if ( 'filterBy' in (model.fields[key]||{}) ){
            delete model.fields[key].filterBy;
        }

        //Update options
        if (
            model.fields[key]
            && 'options' in model.fields[key]
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

const getQueryScopes = (model) => {
    let query = {};

    //Added model scopes
    for ( let scope of model.getData('scopes') ){
        query[scope.key] = _.isNil(scope.params) ? 1 : scope.params;
    }

    return query;
}

const getQuerySearch = (model) => {
    if ( model.getData('searching') !== true ){
        return [];
    }

    return model.getData('search').queries.map(item => {
        let obj = {
            query : item.query,
            column : item.column,
            interval : item.interval,
        };

        if ( item.interval === true ) {
            obj.query_to = item.query_to;
        }

        return obj;
    });
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

const isNumericValue = (model, key) => {
    if ( [model.getKeyName(), '_order'].indexOf( key ) > -1)
        return true;

    let field = model.fields[key];

    if ( field && (field.isNumber() || field.isCheckbox()) ) {
        return true;
    }

    if ( model.getSettings('columns.'+key+'.type') == 'integer' ) {
        return true;
    }

    return false;
}

const isDateValue = (model, key) => {
    if ( ['created_at', 'published_at', 'updated_at'].indexOf(key) > -1) {
        return true;
    }

    if ( key in model.fields && model.fields[key].isDatepicker() ) {
        return true;
    }

    return false;
}

const isLocaleValue = (model, key) => {
    if ( key in model.fields && model.fields[key].locale ){
        return true;
    }

    return false;
}

const getEncodedValue = (value, is_decoded) => {
    return (is_decoded ? $('<div>'+value+'</div>').text() : value) + '';
}

const getRowsLimit = (model, limit) => {
    //Custom limit has been given
    if ( !_.isNil(limit) ){
        return limit;
    }

    if ( model.isSingle() || model.isInParent() ){
        return 1;
    }

    //We need have ability to disable fetching rows
    if ( model.getSettings('pagination.limit') === 0 ){
        return 0;
    }

    //Pagination is disabled, we does not want to limit rows
    if ( model.isPaginationEnabled() === false ){
        return -1;
    }

    return model.getData('rows').limit;
}

var ModelTableRows = (Model) => {
    Model.prototype.setTableRow = function(row){
        let rows = this.getData('rows');

        if ( !row ){
            return this;
        }

        //Clone all received data into table rows
        for ( var key in rows.data ) {
            if ( rows.data[key].id == row.id ) {
                for ( var k in row ) {
                    rows.data[key][k] = row[k];
                }

                break;
            }
        }

        return this;
    }

    /*
     * Change updated rows in db
     */
    Model.prototype.setRowsData = function(data, options){
        const {
            update = true,
        } = options;

        let rows = this.getData('rows');

        if (update === false){
            rows.data = data.rows;
            rows.buttons = data.buttons;
        }

        //Update given rows
        else {
            //Update changed data in vue object
            for ( let updatedRow of data.rows ) {
                let existingRow = _.find(rows.data, { id : updatedRow.id });

                if ( existingRow ) {
                    for ( var updatedKey in updatedRow ) {
                        var isArray = _.isArray(updatedRow[updatedKey]);

                        //Compare also arrays
                        if ( !isArray || !_.isEqual(existingRow[updatedKey], updatedRow[updatedKey]) ) {
                            existingRow[updatedKey] = updatedRow[updatedKey];
                        }
                    }
                }
            }

            //Update buttons
            for ( var existingRow of data.rows ) {
                rows.buttons[existingRow.id] = (existingRow.id in data.buttons) ? data.buttons[existingRow.id] : [];
            }
        }

        //If page has been given
        ['page', 'limit', 'count'].forEach(key => {
            if ( _.isNil(data[key]) === false ) {
                rows[key] = parseInt(data[key]);
            }
        });

        //Rows are successfully loaded
        rows.loaded = true;
    };

    Model.prototype.isPaginationEnabled = function(){
        return this.isSettingEnabled('pagination') && !this.isWithoutExistingParentRow();
    }

    Model.prototype.isEnabledAutoSync = function(){
        var limit = this.isPaginationEnabled() ? this.getData('rows').limit : 0,
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
            this.loadRows({ indicator });
        }, this.getData('refresh').interval);

        this.setData('refreshUpdateTimeout', timeout);
    }

    Model.prototype.isHiddenMode = function(){
        return this.getData('rows').limit === 0;
    }

    Model.prototype.enabledColumnsList = function(){
        var allowed = [],
            enabledColumns = this.getData('enabled_columns')||{};

        for ( var key in enabledColumns ) {
            if ( enabledColumns[key].enabled == true && (this.getData('default_columns')[key]||{}).enabled != true ) {
                allowed.push(key);
            }
        }

        return allowed;
    }

    /*
     * Return if model is in reversed mode
     * new rows will be added on the end
     */
    Model.prototype.isReversed = function(){
        return [this.getKeyName(), '_order'].indexOf(this.orderBy[0]) > -1 && this.orderBy[1].toLowerCase() == 'asc';
    }

    Model.prototype.activeGridSize = function(){
        var size = this.getData('sizes').filter(row => {
            if ( row.active == true ) {
                var rows = getStorage();
                    rows[this.table] = row.size;
                    rows[this.table+'_default'] = this.getSettings('grid.default');

                localStorage.setItem('sizes', JSON.stringify(rows));
            }

            return row.active == true;
        });

        return size[0] ? size[0].size : null;
    }

    Model.prototype.isEnabledOnlyFormOrTableMode = function(){
        return this.activeGridSize() === 0 && this.isInParent() !== true && this.getSettings('grid.splitmode') !== true;
    }

    /*
     * Show search if has been at least one time used, or if is not single row, or if is more then 10 rows
     */
    Model.prototype.canShowSearchBar = function(){
        if ( this.isEnabledOnlyFormOrTableMode() === true && this.canShowForm() === true ){
            return false;
        }

        if ( this.isSettingDisabled('search') ){
            return false;
        }

        //If is forced showing searchbar
        if ( this.isSettingEnabled('search', false) ) {
            return true;
        }

        var minimum = 2;
        return this.getData('searching') === true || (this.maximum==0 || this.maximum >= minimum) && this.getData('rows').count >= minimum;
    }

    Model.prototype.isEnabledGrid = function(){
        var sizes = this.getData('sizes'),
            enabled = _.filter(sizes, { disabled : false }),
            active = _.find(sizes, { active : true });

        if ( enabled.length <= 1 || (active && active.disabled == true) ) {
            //Disable all active items
            _.filter(sizes, { active : true }).forEach(item => {
                if ( enabled[0].key == item.key ){
                    return;
                }

                item.active = false;
            })

            if ( enabled[0] ) {
                enabled[0].active = true;
            }

            return false;
        }

        if ( this.isSettingDisabled('grid') ) {
            return false;
        }

        return true;
    }

    Model.prototype.isActiveRow = function(row){
        if ( !this.isOpenedRow() ) {
            return false;
        }

        if ( row.id == this.getRow().id ) {
            return true;
        }

        return false;
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
        if ( this.isStandaloneForm() ){
            return true;
        }

        return this.getData('formOpened') == true && this.isEnabledOnlyFormOrTableMode() === true;
    },

    Model.prototype.isStandaloneForm = function(){
        return this.getData('form.standalone') ? true : false;
    },

    Model.prototype.canShowRows = function(){
        if ( this.isEnabledOnlyFormOrTableMode() === true && (this.isOpenedRow() || this.isOnlyFormOpened() === true) ){
            return false;
        }

        if ( this.hasAccess('read') == false ) {
            return false;
        }

        if ( this.isSingle() ){
            return false;
        }

        return true;
    }

    Model.prototype.checkFormVisibility = function(){
        if ( (!this.isOpenedRow() && !this.canAddRow() || this.isOpenedRow() && (this.editable == false && this.displayable !== true)) && !this.isInParent() ) {
            return false;
        }

        //If user does not have write permissions
        if ( !this.isOpenedRow() && this.hasAccess('insert') == false ) {
            return false;
        }

        return true;
    }

    Model.prototype.canLoadSubTabs = function(){
        const load = this.getData('load_child_tab_models');

        if ( load === false ){
            return false;
        }

        return true;
    }

    Model.prototype.canShowForm = function(){
        if ( this.checkFormVisibility() === false ){
            return false;
        }

        //Single mode enabled, only form or row... decide
        if ( this.isEnabledOnlyFormOrTableMode() === true && !this.isOpenedRow() && this.isOnlyFormOpened() === false && this.isSingle() == false ){
            return false;
        }

        return true;
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

    Model.prototype.checkMaxRecursivity = function(){
        let max = this.getSettings('recursivity.max_depth')||10;

        return this.getParentModels().length < max;
    };

    Model.prototype.getChilds = function(){
        let childs = this.childs;

        for ( var key in childs ){
            let child = childs[key];

            //Remove recursive model which is deeper than given limit
            if ( child == '$_itself' ){
                //If has been reached maximum rercusrivity level
                if ( !this.checkMaxRecursivity() ){
                    delete childs[key];

                    continue;
                }
            }

            //If is recusrive model, clone given model
            if ( child == '$_itself' || typeof child == 'object' && child.table == this.table ){
                childs[key] = _.cloneDeep($app.models[this.table]);
                childs[key].name = this.getSettings('recursivity.name', this.name);
            }
        }

        return childs;
    };

    Model.prototype.isRecursive = function(){
        return this.table in (this.foreign_column||{}) ? true : false;
    };

    Model.prototype.enableOnlyFullScreen = function(){
        let sizes = this.getData('sizes');

        if ( !sizes.length ){
            return;
        }

        for ( var key in sizes ) {
            if ( key != 3 ) {
                //Save previous disabled value when mode switched to fullscreen
                sizes[key].beforeOnlyFullScreenMode = sizes[key].disabled;

                sizes[key].disabled = true;
                sizes[key].active = false;
            }
        }

        return sizes[3].active = true;
    }

    Model.prototype.exitFullScreenMode = function(){
        let sizes = this.getData('sizes');

        if ( !sizes.length ){
            return;
        }

        //We want revert disabled state before full screen mode
        for ( var key in sizes ) {
            if ( sizes[key].disabled === true && !_.isNil(sizes[key].beforeOnlyFullScreenMode) ) {
                sizes[key].disabled = sizes[key].beforeOnlyFullScreenMode;
            }
        }

        return sizes[3].active = true;
    }

    Model.prototype.isEnabledOnlyFullScreenMode = function(){
        //Enable only fullscreen for these fields
        for ( var key in this.fields ){
            if ( ['gutenberg'].indexOf(this.fields[key].type) > -1 ){
                return true;
            }
        }

        if ( !this.checkFormVisibility() ){
            return true;
        }

        if ( this.isSingle() ) {
            return true;
        }

        return false;
    }

    Model.prototype.checkActiveGridSize = function(columns){
        var data = getStorage(),
            defaultValue = this.getSettings('grid.default'),
            columns = Object.keys(columns),
            sizes = this.getData('sizes');

        //Grid is not booted
        if ( !sizes || sizes.length == 0 ){
            return;
        }

        //Disable big table
        if ( columns.length >= 5 ) {
            sizes[0].disabled = true;
        }

        //Full screen only mode
        if ( this.isEnabledOnlyFullScreenMode() ) {
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

    Model.prototype.setPage = function(page, options = {}){
        let rows = this.getData('rows');

        //We need allow reload position 1 also when max pages are 0 (when zero rows)
        if ( (page == 0 || (rows.count > 0 && (page - 1) > Math.ceil(rows.count/rows.limit))) && options.force !== true ) {
            return;
        }

        //Load paginated rows...
        this.loadRows({ page, ...options });
    };

    Model.prototype.setLimit = function(limit, options = {}){
        localStorage.setItem('limit.'+this.table, limit);

        //Reset pagination to first page
        this.setPage(1, {
            limit,
        });
    };

    Model.prototype.getRowsRequestData = function(options){
        let rows = this.getData('rows'),
            { page, limit } = options||{};

        return {
            parentTable : this.getParentTableName(),
            parentId : this.getParentRowId(),
            language_id : this.localization === true ? this.getData('langid') : 0,
            count : this.getData('refresh').count,
            page : !_.isNil(page) ? page : rows.page,
            limit : getRowsLimit(this, limit),
            scopes : getQueryScopes(this),
            search : getQuerySearch(this),
        };
    }

    Model.prototype.loadRows = async function(options = {}){
        const {
            indicator = true,
            download = false,
            page = null,
            limit = null,
            update = false,
            query = {},
        } = (options||{});

        //On first time allow reload rows without parent, for field options...
        if ( (this.isWithoutExistingParentRow()) && indicator == false ){
            return false;
        }

        let refresh = this.getData('refresh'),
            rows = this.getData('rows'),
            isInitialRequest = refresh.count == 0 || this.getSettings('rows.eachRequestInitial', false) === true;

        if ( indicator !== false ) {
            rows.refreshing = true;
        }

        // Remove previous refresh timeout
        this.disableRowsRefreshing();

        let queryParams = {
            ...(query||{}),
            ...this.getRowsRequestData(options),
            initial : isInitialRequest,
            download : download == true ? true : false,
        };

        //Add additional columns which are not in default rows state
        if ( this.enabledColumnsList().length > 0 ) {
            queryParams.enabled_columns = this.enabledColumnsList().join(';');
        }

        try {
            let response = await $app.$http.post($app.requests.get('rows', { table : this.slug }), queryParams);

            //If has been component destroyed, and request is delivered... and some conditions
            if ( this.getData('dragging').active === true || this.getData('progress') === true || isModelDestroyed() ){
                return;
            }

            if ( typeof response.data == 'string' || response.data.type === 'error' ){
                $app.errorResponseLayer(response);
                return;
            }

            //Disable loader
            rows.refreshing = false;

            //Download response
            if ( response.data.download ){
                return window.location.href = response.data.download;
            }

            var requestModel = response.data.model;

            updateModel(this, requestModel, isInitialRequest);

            //Load rows into array
            this.setRowsData(response.data, {
                update: update === true
            });

            if ( isInitialRequest ){
                //Update field options
                updateFieldOptions(this, requestModel.fields, requestModel);

                this.fire('fetched', this);
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
            else if ( isInitialRequest && this.getData('hasShowedError') !== true || response.status == 401 ){
                this.setData('hasShowedError', true);

                $app.errorResponseLayer(response, null);
            }
        };
    }

    Model.prototype.cleanRows = function(){
        this.resetForm();

        let rows = this.getData('rows');

        rows.data = [];
        rows.count = 0;
        rows.save_children = [];

        this.loadRows();

        return true;
    }

    Model.prototype.getRows = function(options){
        var { withAllRows = false } = options||{},
            orderBy = this.getData('orderBy'),
            field = orderBy[0],
            is_numeric = isNumericValue(this, field),
            is_date = isDateValue(this, field),
            is_locale = isLocaleValue(this, field),
            is_decoded = this.getSettings('columns.'+field+'.encode', true) !== true,
            defaultSlug = $app.languages.length ? $app.languages[0].slug : null,
            rows = this.getData('rows').data.slice(0).map(row => {
                return Object.assign({}, row, row.$table);
            });

        //If all rows has been given, and recursive rows are present. We need filter out that rows.
        if ( withAllRows !== true && this.isRecursive() && this.getData('depth_level') === 0 ) {
            rows = rows.filter(row => !row[this.foreign_column[this.table]]);
        }

        return rows.sort((a, b) => {
            //If is null value
            if ( ! a || ! b ) {
                return false;
            }

            let aValue = a[field],
                bValue = b[field];

            //Null values fix
            if (aValue === null || bValue === null) {
                return aValue === null ? 1 : -1;
            }

            //Added support to sort localized values
            if ( is_locale ) {
                aValue = $app.getLocaleFieldValue(aValue, defaultSlug);
                bValue = $app.getLocaleFieldValue(bValue, defaultSlug);
            }

            //Support for booleans
            if ( aValue === true || aValue === false ) {
                aValue = aValue === true ? 1 : 0;
            }

            if ( bValue === true || bValue === false ) {
                bValue = bValue === true ? 1 : 0;
            }

            a = getEncodedValue(aValue, is_decoded),
            b = getEncodedValue(bValue, is_decoded);

            //Sorting numbers
            if ( is_numeric ) {
                if ( orderBy[1] == 1 ) {
                    return b - a;
                }

                return a - b;
            }

            else if ( is_date ) {
                var c = moment(a, moment.ISO_8601, true),
                    d = moment(b, moment.ISO_8601, true);

                if ( c.isValid() && d.isValid() ) {
                    if ( orderBy[1] == 1 ) {
                        return d - c;
                    }

                    return c - d;
                }

            }

            if ( orderBy[1] == 1 ) {
                return b.toLowerCase().localeCompare(a.toLowerCase(), 'sk');
            }

            return a.toLowerCase().localeCompare(b.toLowerCase(), 'sk');
        });
    }

    Model.prototype.getButtonsForRow = function(row){
        let rows = this.getData('rows');

        if ( ! rows.buttons || !(row.id in rows.buttons) ) {
            return {};
        }

        var data = {},
            buttons = rows.buttons[row.id];

        for ( var key in buttons ) {
            if ( ['button', 'both', 'multiple'].indexOf(buttons[key].type) > -1 ) {
                data[key] = buttons[key];
            }
        }

        return data;
    }

    Model.prototype.setColumnVisibility = function(column, state){
        this.data.enabled_columns[column].enabled = state;

        return this;
    }

    Model.prototype.resetAllowedColumns = function(defaultColumns){
        var enabled = _.cloneDeep(defaultColumns||this.getData('default_columns'));

        this.setData('enabled_columns', enabled);
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

    Model.prototype.getLimitFromStorage = function(){
        if ( !this.isPaginationEnabled() ){
            return 0;
        }

        if ( this.isWithoutExistingParentRow() ){
            return 500;
        }

        let storageLimit = localStorage.getItem('limit.'+this.table),
            limit = !_.isNil(storageLimit) ? storageLimit : this.getSettings('pagination.limit', 10);

        return parseInt(limit);
    }
};

export default ModelTableRows;