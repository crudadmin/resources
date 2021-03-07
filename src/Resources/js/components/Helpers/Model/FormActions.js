const unknownAjaxErrorResponse = (model) => {
    $app.errorAlert(() => {
        model.setData('progress', false);

        //Timeout for sending new request with enter
        setTimeout(() => {
            model.setData('submit', false);
        }, 500);
    });
}

const colorizeTab = function(model, input){
    input.parents('.tab-pane').each(function(){
        var getActiveTab = (panel) => {
            var li = panel.parent().prev().find('li'),
                id = panel.attr('id')||panel.attr('data-tab-id'),
                tab;

            //This is support for custom tabs
            //If tab has gived ID, then find this tab in a element with same hashtag as tab id
            if ( id ) {
                tab = li.parent().add($('ul.nav.nav-tabs')).find('> li > a[href="#'+id+'"]');
            }

            //Return tab by id, if those tabs are custom
            if ( tab && tab.length > 0 )
                return tab.parent();

            return li.eq(panel.index());
        };

        //On button click, remove tabs alerts in actual tree, if tab has no more recursive errors
        $(this).one('click', function(){
            if ( $(this).find('.nav-tabs-custom:not(.default) li[has-error]').length == 0 ) {
                model.removeActiveTab(getActiveTab($(this)), true);
            }
        });

        getActiveTab($(this)).each(function(){
            if ( $(this).hasClass('has-error') )
                return;

            $(this).attr('data-toggle', 'tooltip').attr('data-original-title', $app.trans('tab-error')).attr('has-error', '').one('click', function(){
                var active = $(this).parents('.nav-tabs-custom').find('> .nav-tabs > li.active[has-error]').not($(this).parent().find('> li'));

                model.removeActiveTab($([this].concat(active.toArray())), true);
            }).find('a').prepend('<i class="nav-link--icon-left fa fa-exclamation-triangle"></i>');
        })
    });
};

const colorizeLangDropdown = (model, input) => {
    var field_wrapper = input.parents('.field-wrapper'),
        field_key = field_wrapper.attr('data-field'),
        field_lang = field_wrapper.attr('data-lang'),
        field_model = field_wrapper.attr('data-model');

    if ( ! field_key ) {
        return;
    }

    var fieldModel = $app.models[field_model],
        field = fieldModel.fields[field_key];

    if ( field.locale != true || field_lang == model.selectedLanguage().slug ) {
        return;
    }

    var dropdown = model.getForm().find('.multi-languages .dropdown-toggle');

    dropdown.addClass('has-error');
    dropdown.next().find('li[data-slug="'+field_lang+'"]').addClass('has-error');

    if ( field_lang == $app.languages[0].slug ) {
        $app.openAlert($app.trans('warning'), $app.trans('lang-error'), 'warning');
    }
}

const addErrorElement = (model, element) => {
    let form = model.getForm();

    if ( !form._errorElements ){
        form._errorElements = [];
    }

    form._errorElements.push(element);
}

const showErrorMessage = (model, message, i) => {
    var component = this;

    return function(){
        var where = $(this);

        //Colorize tabs
        colorizeTab(model, $(this));

        colorizeLangDropdown(model, $(this));

        if ( $(this).is('select') ){
            where = where.parent().parent().children().last().prev();
        }

        else if ( $(this).is('textarea') ){
            where = where.parent().children().last().prev();
        }

        else if ( $(this).is('input:checkbox') ){
            where = where.next();
        }

        else if ( $(this).is('input:radio') || $(this).parent().hasClass('label-wrapper') ){
            where = where.parent().parent().parent();

            if ( where.find('.help-block').length == 0 )
                where = where.children().last().prev();
            else
                where = null;
        }

        else if ( $(this).parent().hasClass('input-group') ) {
            where = $(this).parent();
        }

        //Where should be placed error messageblock
        if ( where ) {
            where.after( '<span class="help-block">'+message+'</span>' );

            addErrorElement(model, where.next());
        }

        //On first error
        if ( i == 0 ){
            var label = $(this).closest('div.form-group').addClass('has-error').find('> label');

            if ( label.find('.fa-times-circle').length == 0 ) {
                label.prepend('<i class="far fa-times-circle"></i> ');
            }
        }
    };
}

const bindErrorMessages = (model, key, errors) => {
    var keys = [],
        parts = key.split('.'),
        form = model.getForm();

    if ( parts.length == 1 || parts.length == 2 && parts[1] == 0 ){
        parts = [parts[0]];
        key = parts[0];

        keys.push(key);
        parts.push(0);
    }

    parts = parts.map((item, i) => {
        if ( i == 0 )
            return item;

        return '['+item+']';
    });

    keys.push(parts.join(''));

    //Add multiple field support to each key prefix
    for ( var i = 0; i < keys.length; i++ ) {
        if ( keys[i].substr(-2) != '[]' ) {
            keys.push(keys[i]+'[]');
        }
    }

    for ( var i = 0; i < errors.length; i++ ) {
        _.uniqBy(keys).map(key => {
            form
                .find('input[name="'+key+'"], select[name="'+key+'"], textarea[name="'+key+'"]')
                .firstLevelForm(form[0])
                .each(showErrorMessage(model, errors[i], i));
        });
    }
}

const sendForm = function(model, e, action, callback){
    //Disable send already sent form
    if ( model.getData('submit') == true ) {
        return;
    }

    //Resets ckeditor values for correct value
    if (typeof CKEDITOR!='undefined'){
        for (var key in CKEDITOR.instances){
            CKEDITOR.instances[key].updateElement();
        }
    }

    model.resetErrors();

    model.setData('progress', true);

    $(e.target).ajaxSubmit({
        url : $app.requests[action],
        success : data => {
            model.setData('submit', false);
            model.setData('progress', false);

            //Error occured
            if ( $.type(data) != 'object' || ! ('type' in data) ) {
                return unknownAjaxErrorResponse(this);
            }

            //Fix for resubmiting form after closing with enter
            setTimeout(() => {
               $app.openAlert(data.title, data.message, data.type, null, () => {
                    //Timeout for sending new request with enter
                    setTimeout(() => {
                        model.setData('submit', false);
                    }, 500);
                });
            }, 100);

            callback(data);
        },

        error : response => {
            model.resetErrors();

            // Wrong validation
            $app.errorResponseLayer(response, 422, () => {
                var obj = response.responseJSON,
                    errors = [];

                //Laravel 5.5+ provides validation errors in errors object.
                if ( 'errors' in obj && !('length' in obj.errors) ) {
                    obj = obj.errors;
                }

                for ( var key in obj ) {
                    //One or multiple errors
                    errors = typeof obj[key] == 'string' ? [ obj[key] ] : obj[key];

                    //Display errors
                    bindErrorMessages(model, key, errors);
                }
            })
        }
    });
}

var FormActions = (Model) => {
    Model.prototype.selectedLanguage = function(){
        let languages = $app.languages;

        if ( ! this.getData('selected_language_id') ) {
            return languages[0];
        }

        for ( var key in languages ) {
            if ( languages[key].id == this.getData('selected_language_id') ) {
                return languages[key];
            }
        }

        return languages[0];
    }

    Model.prototype.removeActiveTab = function(tab, all){
        var removeFrom = tab.filter(function(){
            return all === true || ! $(this).hasClass('model-tab');
        });

        removeFrom.removeAttr('data-toggle')
                  .removeAttr('data-original-title')
                  .removeAttr('has-error')
                  .tooltip("dispose")
                  .find('a > .fa.fa-exclamation-triangle')
                  .remove();
    };

    Model.prototype.resetErrors = function(){
        let form = this.getForm();

        form.find('.form-group.has-error').firstLevelForm(form[0]).removeClass('has-error').find('.help-block').remove();
        form.find('.far.fa-times-circle').firstLevelForm(form[0]).remove();
        form.find('.multi-languages .has-error').firstLevelForm(form[0]).removeClass('has-error');
        this.removeActiveTab(form.find('.nav-tabs li[has-error]').firstLevelForm(form[0]));
        this.setData('progress', false);

        if ( form._errorElements ){
            for ( var i = 0; i < form._errorElements.length; i++ ){
                form._errorElements[i].remove();
            }

            form._errorElements = [];
        }
    }

    Model.prototype.getFormAction = function(){
        return ! this.isOpenedRow() ? 'store' : 'update';
    }

    Model.prototype.getSelectedLanguageId = function(){
        //Return actual model language id, row parent language id
        return this.getData('selected_language_id')
                    ? this.getData('selected_language_id')
                    : this.getData('langid');
    }

    Model.prototype.getAdditionalFormData = function(){
        //Data for request
        var data = {
            _model : this.slug,
        };

        let parentRow = this.getData('parentrow');

        //Check if form belongs to other form
        if ( this.foreign_column != null && parentRow ) {
            data[this.foreign_column[this.getParentTableName()]] = parentRow.id;
        }

        if ( this.global_relation && parentRow && this.getParentTableName(true) ) {
            data['_table'] = this.getParentTableName(true);
            data['_row_id'] = parentRow.id;
        }

        //If is updating, then add row ID
        if ( this.getFormAction() == 'update' ) {
            data['_id'] = this.getRow().id;
            data['_method'] = 'put';
        } else {
            //Check if is enabled language
            if ( this.getSelectedLanguageId() ) {
                data['language_id'] = this.getSelectedLanguageId();
            }

            let rows = this.getData('rows');

            //Push saved childs without actual parent row
            if ( rows.save_children.length > 0 ) {
                data['_save_children'] = JSON.stringify(rows.save_children);
            }
        }

        //If we need mutate keys of additional form data
        var mutatedData = {};
        for ( var key in data ) {
            mutatedData[this.formPrefix()+key] = data[key];
        }

        return mutatedData;
    },

    Model.prototype.saveParentChilds = function(rows){
        this.getData('rows').save_children = [];

        //If actual row has no parent, and need to ba saved when parent will be saved in the future
        if ( this.isWithoutParentRow() ) {
            let parentModel = this.getParentModel(),
                parentRowsData = parentModel.getData('rows');

            for ( var i = 0; i < rows.length; i++ ) {
                parentRowsData.save_children.push({
                    table : this.slug,
                    id : rows[i].id,
                });
            }
        }
    }

    Model.prototype.pulseForm = function(){
        //If is not full grid, then animate form
        if ( this.activeGridSize() == 0 && this.canShowRows() && this.getData('depth_level') == 0 ) {
            return;
        }

        //Only table/form mode enabled
        if ( this.isEnabledOnlyFormOrTableMode() === true ){
            return false;
        }

        let form = this.getForm();
            form.addClass('animated shake');

        if ( this.getData('formPusling') ) {
            return;
        }

        let timeout = setTimeout(() => {
            form.removeClass('animated shake');

            this.setData('formPusling', null);
        }, 1000);

        this.setData('formPusling', timeout);
    }

    Model.prototype.resetFormWithEvents = function(scroll, dontResetIfNotOpened, resetActiveTab){
        if ( ! dontResetIfNotOpened || this.isOpenedRow() ) {
            //We do not want reset object is is already empty instance
            //Because if component receives getParentRow, and then will be rewrited row observer
            //Changes in this component wont be interactive
            if ( ! _.isEqual(this.getRow(), this.emptyRowInstance()) ) {
                this.resetForm();
            }
        }

        if ( scroll === true ) {
            this.scrollToForm();
            this.pulseForm();
        }

        if ( resetActiveTab === true ) {
            eventHub.$emit('changeActiveTab', {
                table : this.table,
                depth_level : this.getData('depth_level'),
                activetab : 0,
            });
        }
    };

    Model.prototype.getFormId = function(){
        return 'form-' + this.getData('depth_level') + '-' + this.slug;
    }

    Model.prototype.getForm = function(){
        return $('#'+this.getFormId());
    }

    Model.prototype.closeForm = function(){
        this.setData('formOpened', false);

        if ( this.isOpenedRow() ){
            this.resetFormWithEvents();

            this.closeHistory();
        }
    }

    //Resets form values and errors
    Model.prototype.initForm = function(row, reset){
        var is_row = row && 'id' in row;

        //Resets document values of elements
        //can be reseted just when is changed row for other, or inserting new row
        if ( reset !== false ) {
            for ( var key in this.fields ) {
                $app.$set(this.fields[key], 'value', null);
            }
        }

        this.resetErrors();

        if ( ! is_row ) {
            this.resetFormWithEvents();
        }

        //Checks if form can be editable
        if ( is_row && this.canAddRow() && (this.editable == false && this.displayable != true) && this.hasChilds() == 0 ) {
            this.resetFormWithEvents();
            return;
        }

        let fields = this.fields;
        for ( var key in fields ) {
            if ( ! is_row || fields[key].value != row[key] || reset ) {
                //Value can not be undefined, because of model change events.
                //If value will be undefined, full rows table will be realoaded (bug)
                var value = is_row ? row[key] : null,
                    value = value === undefined ? null : value;

                //Set value and default value of field from database
                fields[key].value = value;
                fields[key].$original_value = value;

                eventHub.$emit('updateField', this.buildEventData({
                    key : key,
                    field : fields[key]
                }));
            }
        }

        //Set box color
        if ( !is_row ) {
            this.setData('isActive', true);

            if ( this.getParentModel() ) {
                this.closeHistory();
            }
        } else {
            this.setData('isActive', row.published_at == null);
        }
    }

    Model.prototype.saveForm = function(e) {
        //We does not want to trigger inparent model
        if ( this.isInParent() ) {
            return;
        }

        //Devide if is updating or creating form
        var action = this.getFormAction();

        sendForm(this, e, action, response => {
            if ( ! response.data ) {
                return false;
            }

            //Push new row
            if ( action == 'store' ) {
                for ( var key in response.data ) {
                    var clonedRow = _.cloneDeep(response.data[key].rows[0]),
                        isParentRow = response.data[key].model == this.table,
                        model = $app.models[response.data[key].model];

                    //Reset actual items buffer
                    if ( isParentRow && this.getParentModel() ) {
                        this.saveParentChilds(response.data[key].rows);
                    }

                        //We need push actual model, for access to field.options property
                    var eventModel = isParentRow ? this : model,
                        eventData = this.buildEventData({
                            row : clonedRow,
                            request : response.data[key]
                        }, eventModel, !isParentRow);

                    //Bind values for input builder
                    eventHub.$emit('onSubmit', eventData);

                    //Send notification about new row
                    eventHub.$emit('onCreate', eventData);

                    if ( isParentRow ) {
                        //If form has disabled autoreseting
                        var autoreset = this.getSettings('autoreset');

                        //Reseting form after new row
                        if ( !this.isSingle() && autoreset !== false) {
                            this.initForm(this.emptyRowInstance());

                            //After creation of new row, we want close adding
                            this.closeForm();
                        }

                        //If is disabled autoreseting form, then select inserted row
                        else {
                            this.setRow(clonedRow);

                            this.scrollToForm();
                        }
                    }
                }
            }

            //Update existing row
            else if ( action == 'update' ) {
                var rows = response.data.rows;

                //Update all updated models. Parent and also child data...
                for ( var table in rows ) {
                    var clonedRow = _.cloneDeep(rows[table]),
                        isParentRow = table == this.table,
                        model = $app.models[table];

                    var eventData = this.buildEventData({
                        row : clonedRow,
                        request : rows[table]
                    }, model, !isParentRow);

                    //Bind values for input builder
                    eventHub.$emit('onSubmit', eventData);

                    //Send notification about updated row
                    eventHub.$emit('onUpdate', eventData);
                }
            }

            //Add or update select options
            if ( this.hasParentFormModel() !== true && this.getData('parentField') ) {
                var incomingRow = action == 'store' ? response.data[0].rows[0] : response.data.rows[this.table],
                    parentModel = this.getParentModel();

                parentModel.pushOption(this.getData('parentField'), incomingRow, action);
            }
        });
    }
};

export default FormActions;