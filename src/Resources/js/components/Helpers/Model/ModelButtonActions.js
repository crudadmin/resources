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

const displayButtonModal = (model, button, response, ids) => {
    //Alert message
    let rows = model.getData('rows').data.filter(item => ids.indexOf(item.id) > -1),
        component = response.data?.component,
        modalComponentBuilder = component ? {
            name : button.key,
            component : component,
            model : model,
            rows : rows,
            row : ids.length == 1 ? rows[0] : null,
            request : {},
            data : response?.data?.component_data||[],
        } : null;

    //This will be binded from modal component
    var successCallback = function(){
        var requestData = {};

        if ( this.alert.component && this.alert.component.request ) {
            requestData = _.clone(this.alert.component.request);
        }

        model.buttonAction(button.key, ids, {
            requestData,

            //We may continue on different/following step
            action : response.data?.action,
        });
    }

    let hasAcceptableQuestion = response?.data?.shouldAccept === true;

    return $app.openAlert(
        response.title,
        response.message,
        response.type,
        hasAcceptableQuestion ? successCallback : null,
        hasAcceptableQuestion ? true : null,
        modalComponentBuilder,
        button.key
    );
}

const updateActionData = (model, button, ids, response) => {
    //Update received rows by button action
    if ( response.data && 'rows' in response.data ) {
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
    Model.prototype.getAllButtons = function(){
        var buttons = {},
            modelButtons = this.getData('rows').buttons;

        for ( var rowId in modelButtons ) {
            for ( var buttonIndex in modelButtons[rowId] ) {
                let button = modelButtons[rowId][buttonIndex];

                if ( ['action', 'both', 'multiple'].indexOf(button.type) > -1 ) {
                    buttons[button.key] = button;
                }
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
            if ( response.type || response.data?.component ){
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