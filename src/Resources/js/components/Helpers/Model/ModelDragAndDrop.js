const enableDragging = function(model){
    model.enableRowsRefreshing(false);

    model.getData('dragging').active = false;
    model.getData('dragging').list = null;

    //Enable all tooltips
    $('[data-toggle="tooltip"]').tooltip('enable');
};

var ModelDragAndDrop = (Model) => {
    Model.prototype.isDragEnabled = function(){
        if ( $app.isMobileDevice() ){
            return false;
        }

        return this.sortable == true;
    }

    Model.prototype.onDragStart = function(dragged, list = null){
        //Destroy table reload rows timeout
        this.disableRowsRefreshing();

        let dragging = this.getData('dragging');

        //Set drag&drop state as true, because if we drag, we do not want reload rows
        //from ajax request. We want stop syncing rows. Also ajax request which
        //has been sent already.
        dragging.active = true;

        //Save previous state of dragging list, to be able obtain previos row _orders columns
        dragging.list = _.cloneDeep(list||dragged.from.__vue__.list||null);

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

    Model.prototype.onDragChange = async function(e, parentRow, list){
        //On drag&dropping between recursive rows
        if ( e.added && this.isRecursive() ){
            let draggedRow = _.cloneDeep(e.added.element),
                rows = {};

            //Sort all rows between sorted rows
            for ( var i = 0; i < list.length; i++ ){
                let row = list[i];

                if ( i > e.added.newIndex ){
                    if ( i === e.added.newIndex + 1 ) {
                        draggedRow._order = row._order;
                    }

                    row._order += 1;
                    rows[row.id] = row._order;
                }
            }

            draggedRow[this.foreign_column[this.table]] = parentRow ? parentRow.id : null;
            rows[draggedRow.id] = { _order : draggedRow._order }
            rows[draggedRow.id][this.foreign_column[this.table]] = draggedRow[this.foreign_column[this.table]];

            this.updateDragOrder(rows);
        }

        //When rows has been moved
        else if ( e.moved ){
            this.onDragEnd(e.moved, list);
        }
    }

    Model.prototype.onDragEnd = async function(dragged, list){
        //Disable sorting when is used sorting columns
        if ( this.getData('orderBy')[0] != '_order' ) {
            return enableDragging(this);
        }

        //Dragging between multiple tables is disabled
        if ( dragged.from !== dragged.to ){
            return;
        }

        var rowsData = this.getData('dragging').list||list,
            draggedRow = rowsData['oldDraggableIndex' in dragged ? dragged.oldDraggableIndex : dragged.oldIndex],
            droppedRow = rowsData['newDraggableIndex' in dragged ? dragged.newDraggableIndex : dragged.newIndex],
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

        this.updateDragOrder(rows);
    }

    Model.prototype.syncDraggedRows = function(rows){
        //Sync model rows
        let modelRows = this.getData('rows').data;

        for ( let row of modelRows ){
            if ( row.id in rows ){
                let newData = rows[row.id];

                if ( typeof newData == 'object' ) {
                    for ( let k in newData ){
                        row[k] = newData[k];
                    }
                } else {
                    row._order = newData;
                }
            }
        }
    }

    Model.prototype.updateDragOrder = async function(rows){
        this.syncDraggedRows(rows);

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

export default ModelDragAndDrop;