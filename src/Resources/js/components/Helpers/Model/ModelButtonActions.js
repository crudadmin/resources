const removeMissingRows = (model, responseRows, ids) => {
    let rows = model.getData('rows');

    rows.data = _.filter(rows.data, row => {
        //Remove only rows which has been pressed
        if ( !ids.includes(row.id) ){
            return true;
        }


        //If rows has not been returned in request
        return _.find(responseRows, { id : row.id });
    });
}

const buildComponentData = (button, model, rows, ids, response) => {
    let component = response.data?.component;

    if ( component ) {
        return {
            class : component.class,
            component : {
                name : button.key,
                component : component.template,
                props : {
                    model : model,
                    rows : rows,
                    row : ids.length == 1 ? rows[0] : null,
                    data : component.data,
                    request : {},
                },
            }
        };
    }
}

const displayButtonModal = (model, button, response, ids) => {
    //Alert message
    let rows = model.getData('rows').data.filter(item => ids.indexOf(item.id) > -1),
        modalBuilder = response.data ? buildComponentData(button, model, rows, ids, response) : {};

    //This will be binded from modal component
    var successCallback = (modal) => {
        var requestData = _.cloneDeep(modal.component?.props?.request||{});

        model.buttonAction(button.key, ids, {
            requestData,

            //We may continue on different/following step
            action : response.data?.action,
        });
    }

    let hasAcceptableQuestion = response?.data?.shouldAccept === true;

    return $app.openModal({
        title : response.title,
        message : response.message,
        type : response.type,
        toast : response.toast,
        success : hasAcceptableQuestion ? successCallback : null,
        close : hasAcceptableQuestion ? true : null,
        key : button.key,
        ...modalBuilder,
    });
}

const updateActionData = (model, button, ids, response) => {
    //Update received rows by button action
    if ( response.data && 'rows' in response.data ) {
        model.fire(['buttonActionFire'], {
            rows : response.data.rows.rows,
        });

        eventHub.$emit(
            'buttonAction',
            model.buildEventData({
                rows : response.data.rows.rows,
            }, model)
        );

        //When is non-existing parent, we does not want update count on button press.
        if ( model.isWithoutExistingParentRow() ){
            response.data.rows.count = null;

            //We need remove rows which weren't given back
            removeMissingRows(model, response.data.rows.rows, ids);
        }

        model.setRowsData(response.data.rows, {
            //If we receive all rows, or actual row is under non-existing parent, we need only update given rows + buttons
            update : button.reloadAll == false || model.isWithoutExistingParentRow(),
        });
    }

    //Redirect on page
    if ( ('redirect' in response.data) && response.data.redirect ) {
        if ( response.data.open == true ) {
            window.location.replace(response.data.redirect);
        } else {
            window.open(response.data.redirect);
        }
    }

    //Uncheck all rows
    if ( ids.length > 1 ) {
        model.resetChecked();
    }
}

var ModelButtonActions = (Model) => {
    Model.prototype.getAllButtons = function(types = []){
        var buttons = {},
            buttonRows = this.getData('rows').buttons;

        for ( var rowId in buttonRows ) {
            let rowButtons = buttonRows[rowId];

            for ( var buttonIndex in rowButtons ) {
                let button = rowButtons[buttonIndex];

                if ( types && types.length && types.includes(button.type) === false ){
                    continue;
                }

                buttons[button.key] = button;
            }
        }

        return buttons;
    }

    Model.prototype.buttonAction = async function(buttonKey, rowOrIds, previousStep = null){
        var button = this.getAllButtons()[buttonKey],
            ids = _.castArray(rowOrIds||[]).map(row => row?.id||row),
            { requestData = null, action = null } = previousStep||{};

        ids = ids.length > 0 ? ids : this.getChecked();

        if ( !button ){
            $app.errorModal();
            return;
        }

        //For multiple rows actions set loading for whole button and not one row
        this.setData('button_loading', ids.length >= 2 ? button.key : this.getButtonKey(ids[0], button));

        try {
            let query = {
                ...(requestData||{}),
                _button : {
                    model : this.slug,
                    parentTable : this.getParentTableName(true),
                    parentId : this.getParentRowId(),
                    id : ids,
                    limit : this.getData('rows').limit,
                    page : this.getData('rows').page,
                    language_id : this.localization === true ? this.getData('langid') : 0,
                    button_key : button.key,
                    action : previousStep && 'action' in previousStep ? action : button.action,
                },
            };

            var response = await $app.$http.post(
                $app.requests.buttonAction,
                query
            ).then(data => data.data);

            this.setData('button_loading', false);

            //Load and update given rows from button response
            if ( response.data && response.data.rows ) {
                updateActionData(this, button, ids, response);
            }

            //If type, or custom component has been returned, we need display modal.
            if ( response.type || response.data?.component || response.data?.model ){
                displayButtonModal(this, button, response, ids);
            }
        } catch (error){
            this.setData('button_loading', false);

            $app.errorResponseLayer(error);
        }
    }

    Model.prototype.getButtonKey = function(rowId, button){
        return rowId + '-' + button.key;
    }
};

export default ModelButtonActions;