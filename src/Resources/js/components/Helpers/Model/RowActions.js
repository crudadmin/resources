var RowActions = (Model) => {
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

    Model.prototype.getValue = function(key){
        return this.data.row[key];
    }

    Model.prototype.getParentModel = function(table){
        //if table $parent has been received, we want return parent instead of table.
        if ( table && table !== '$parent' ){
            return this.getParentModels().filter(model => model.table == table)[0];
        }

        return $store.getters['models/getModel'](this.data.tree[0]);
    }

    Model.prototype.getParentModels = function(){
        return this.data.tree.map(uuid => {
            return $store.getters['models/getModel'](uuid);
        });
    }

    Model.prototype.getChildModels = function(table){
        let children = $store.state.models.models.filter(model => {
            return model.getData('tree').includes(this.getData('uuid'));
        });

        return table ? _.find(children, { table }) : children;
    };

    Model.prototype.getChildModel = function(table){
        return this.getChildModels(table);
    };

    Model.prototype.hasParentModel = function(table){
        return this.getParentModels().map(model => model.table).includes(table);
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

    Model.prototype.resetForm = function(){
        return this.setData('row', this.emptyRowInstance());
    }

    Model.prototype.isReservedRow = function(id){
        //check multiple input
        if ( typeof id === 'object' && id.length && this.reserved ) {
            for ( var i = 0; i < id.length; i++ ) {
                if ( this.reserved.indexOf(id[i]) > -1 )
                    return true;
            }

            return false;
        }

        //check one row
        if ( this.reserved && this.reserved.indexOf(id) > -1 ) {
            return true;
        }

        return false;
    };

    /*
     * Hide input
     */
    Model.prototype.removeRow = function(ids, callback){
        this.buttonAction('RemoveRow', ids);
    }

    Model.prototype.scrollToForm = function(){
        //Allow scroll form only on full width table
        if ( this.activeGridSize() != 0 && $app.isTabletDevice() == false ){
            return;
        }

        setTimeout(() => {
            var form = $('#'+this.getFormId()),
                modalWrapper = form.parents('.modal[role="dialog"]:visible');

            //If form is in canAdd feature, in modal.. then we want scroll modal and not whole window
            (modalWrapper.length ? modalWrapper : $('html, body')).animate({
                scrollTop: form.offset().top - 10
            }, $app.isTest ? 0 : 500);
        }, 25);
    }

    Model.prototype.showHistory = async function(row){
        try {
            let response = await $app.$http.get($app.requests.get('getHistory', {
                model : this.slug,
                id : row.id,
            }))

            var data = response.data;

            if ( data.length <= 1 ) {
                return $app.warningModal({
                    title : $app.trans('info'),
                    message : $app.trans('no-changes'),
                });
            }

            this.getData('history').id = row.id;
            this.getData('history').rows = data;
        } catch (response){
            $app.errorResponseLayer(response);
        }
    };

    /*
     * Close history rows
     */
    Model.prototype.closeHistory = function(with_fields){
        let history = this.getData('history');

        history.id = null;
        history.rows = [];

        if ( ! with_fields ) {
            history.fields = [];
            history.history_id = null;
        }
    };

    Model.prototype.selectRow = async function(row, data, model, history_id, model_row){
        //If is selected same row
        if ( this.isOpenedRow() && this.getRow().id == row.id && !history_id ) {
            return;
        }

        //Recieve just messages between form and rows in one model component
        if (model && this.slug != model) {
            return;
        }

        //Resets form
        if ( row === true && data === null ) {
            return this.setRow(null);
        }

        var render = response => {
            for ( var key in response ){
                row[key] = response[key];
            }

            //Bind model data
            this.setRow(_.cloneDeep(row, true));

            //Fix for single model with history support
            if ( model_row ){
                for ( var key in model_row ) {
                    $app.$set(model_row, key, row[key]);
                }
            }

            this.closeHistory(history_id ? true : false);

            //When form will be fully loaded, we want turn off loader and scroll into this form.
            //This is better for heavy and big forms, which may be laggy in scrolling... So first we need wait
            //and then scroll. Much more smoother animation...
            $app.$nextTick(() => {
                setTimeout(() => {
                    this.setData('loadingRow', false);

                    this.scrollToForm();
                }, 100);
            });
        };

        this.setData('loadingRow', row.id);

        if ( data ) {
            render(data);
        } else {
            try {
                let response = await $app.$http.get($app.requests.get('show', {
                    model : this.slug,
                    id : row.id,
                    subid : history_id
                }));

                var data = response.data;


                //Select history row
                if ( history_id ){
                    this.getData('history').data = response.data;

                    data = data.row;
                }

                render(data);
            } catch (response){
                $app.errorResponseLayer(response);
            }
        }
    }

    Model.prototype.canUnpublishRow = function(id){
        return this.publishable && this.hasAccess('publishable');
    }

    Model.prototype.togglePublishedAt = async function(ids){
        this.buttonAction('TogglePublishRow', ids);
    };
};

export default RowActions;