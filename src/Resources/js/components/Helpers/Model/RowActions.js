const enableDragging = function(model){
    model.enableRowsRefreshing(false);

    model.setData('dragging', false);

    //Enable all tooltips
    $('[data-toggle="tooltip"]').tooltip('enable');
};

var RowActions = (Model) => {
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
        ids = _.castArray(ids);

        var onRemoveAccepted = async () => {
            var requestData = {
                model : this.slug,
                parent : this.getParentTableName(this.without_parent),
                id : ids,
                subid : this.getParentRowId(),
                limit : this.getData('pagination').limit,
                page : this.getData('pagination').position,
                _method : 'delete',
            };

            //Check if is enabled language
            if ( $app.language_id != null ) {
                requestData['language_id'] = parseInt($app.language_id);
            }

            try {
                var response = await $app.$http.post($app.requests.delete, requestData),
                    data = response.data;

                let modelRows = this.data.rows;

                if ( data && 'type' in data && data.type == 'error' ) {
                    return $app.openAlert(data.title, data.message, 'danger');
                }

                //Load rows into array
                if ( this.isWithoutParentRow() ){
                    //Remove row
                    var remove = [];

                    for ( var key in modelRows.data ) {
                        if ( ids.indexOf(modelRows.data[key].id) > -1 ) {
                            remove.push(key);
                        }
                    }

                    //Remove deleted keys from rows objects. For correct working we need remove items from end to start
                    for ( var i = 0; i < remove.sort((a, b) =>  (b - a)).length; i++ ) {
                        modelRows.data.splice(remove[i], 1);
                    }
                } else {
                    this.updateRowsData(data.data.rows.rows);
                    modelRows.count = data.data.rows.count;

                    this.data.pagination.position = data.data.rows.page;
                }

                if ( this.getRow() && ids.indexOf(this.getRow().id) > -1 ) {
                    this.resetForm();
                }

                this.emitRowData('onDelete', ids);

                this.fire('onDelete', ids);

                if ( typeof callback == 'function' ) {
                    callback(response, requestData);
                }
            } catch (response){
                $app.errorResponseLayer(response);

                throw response;
            }
        };

        //Check if is row can be deleted
        //If not, throw error
        if ( this.isReservedRow(ids) ) {
            return $app.openAlert(
                $app.trans('warning'),
                $app.trans(ids.length > 1 ? 'cannot-delete-multiple' : 'cannot-delete'),
                'warning'
            );
        }

        $app.openAlert(
            $app.trans('warning'),
            $app.trans('delete-warning'),
            'warning',
            onRemoveAccepted,
            true
        );
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
                return $app.openAlert($app.trans('info'), $app.trans('no-changes'), 'warning');
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
        ids = _.cloneDeep(_.castArray(ids));

        try {
            let response = await $app.$http.post( $app.requests.togglePublishedAt, {
                model : this.slug,
                id : ids,
            });

            var data = response.data;

            if ( data && 'type' in data ) {
                return $app.openAlert(data.title, data.message, 'danger');
            }

            let rows = this.getData('rows');

            //Update multiple published at
            for ( var key in rows.data ) {
                if ( ids.indexOf(rows.data[key].id) > -1 ) {
                    rows.data[key].published_at = data[rows.data[key].id];
                }
            }
        } catch (response){
            $app.errorResponseLayer(response);
        }
    };

    Model.prototype.isDragEnabled = function(){
        if ( $app.isMobileDevice() ){
            return false;
        }

        return this.sortable == true;
    }

    Model.prototype.onDragStart = function(dragged){
        //Destroy table reload rows timeout
        this.disableRowsRefreshing();

        //Set drag&drop state as true, because if we drag, we do not want reload rows
        //from ajax request. We want stop syncing rows. Also ajax request which
        //has been sent already.
        this.setData('dragging', true);

        //Disable all tooltips
        $('[data-toggle="tooltip"]').tooltip('disable');
    }

    Model.prototype.getDragOptions = function(){
        return {
            animation: 200,
            group: this.table,
            disabled: false,
            ghostClass: 'ghost'
        };
    }

    Model.prototype.onDragEnd = async function(dragged, list){
        //Disable sorting when is used sorting columns
        if ( this.getData('orderBy')[0] != '_order' ) {
            enableDragging(this);

            return;
        }

        var rowsData = list,
            draggedRow = list[dragged.oldIndex],
            droppedRow = list[dragged.newIndex],
            draggedOrder = draggedRow._order,
            droppedOrder = droppedRow._order,
            rows = {},
            changed_ids = [];

        //Sort all rows between sorted rows
        for ( var i = rowsData.length - 1; i >= 0; i-- ) {
            var row = rowsData[i];

            //From top to bottom
            if ( row.id == draggedRow.id ){
                row._order = droppedOrder;
                rows[row.id] = row._order;
            } else if ( draggedOrder > droppedOrder && row._order >= droppedOrder && row._order <= draggedOrder ){
                row._order += 1;
                rows[row.id] = row._order;
            //From bottom to top
            } else if ( draggedOrder < droppedOrder && row._order <= droppedOrder && row._order > draggedOrder) {
                row._order -= 1;
                rows[row.id] = row._order;
            }
        }

        try {
            let response = await $app.$http.post($app.requests.updateOrder, {
                model : this.slug,
                rows : rows
            });

            var data = response.data;
            if ( data && 'type' in data ) {
                return $app.openAlert(data.title, data.message, 'danger');
            }

            enableDragging(this);
        } catch (response){
            $app.errorResponseLayer(response);

            enableDragging(this);
        }
    }
};

export default RowActions;