var Fields = (Model) => {
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
            if ( $app.$root.language_id != null ) {
                requestData['language_id'] = parseInt($app.$root.language_id);
            }

            try {
                var response = await $app.$http.post($app.$root.requests.delete, requestData),
                    data = response.data;

                if ( data && 'type' in data && data.type == 'error' ) {
                    return $app.openAlert(data.title, data.message, 'danger');
                }

                //Load rows into array
                if ( ! this.isWithoutParentRow() ){
                    this.updateRowsData(data.data.rows.rows);
                    this.data.rows.count = data.data.rows.count;

                    this.data.pagination.position = data.data.rows.page;
                } else {
                    //Remove row
                    var remove = [];

                    for ( var key in this.data.rows.data ) {
                        if ( ids.indexOf(this.data.rows.data[key].id) > -1 ) {
                            remove.push(key);
                        }
                    }

                    //Remove deleted keys from rows objects. For correct working we need remove items from end to start
                    for ( var i = 0; i < remove.sort((a, b) =>  (b - a)).length; i++ ) {
                        this.data.rows.data.splice(remove[i], 1);
                    }
                }

                if ( this.getRow() && ids.indexOf(this.getRow().id) > -1 ) {
                    this.resetForm();
                }

                this.emitRowData('onDelete', ids);

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
};

export default Fields;