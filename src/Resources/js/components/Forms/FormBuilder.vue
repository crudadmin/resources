<template>
    <!-- Horizontal Form -->
    <component :is="formType" method="post" action="" :id="formID" :data-form="model.slug" v-on:submit.prevent="saveForm" class="form crudadmin-form">
        <div class="box" :class="{ 'box--active' : isActive }">

            <div data-header class="box-header" :class="{ visible : (hasLocaleFields || canShowGettext || (isOpenedRow && model.history)) }">
                <div class="box-header__actions">
                    <div class="box-header__left">
                        <h3 class="box-header__title">
                            <span v-if="model.localization" data-toggle="tooltip" :data-original-title="trans('multilanguages')" class="--icon-left fa fa-globe-americas"></span>
                            {{ title }}
                        </h3>
                    </div>

                    <div class="box-header__right">
                        <button v-if="isOpenedRow && canShowGettext" @click="openGettextEditor" type="button" class="btn--icon btn btn-default btn-sm"><i class="fa fa-globe-americas"></i>
                            {{ trans('gettext-open') }}
                        </button>
                        <button v-if="isOpenedRow && canaddrow && !model.isSingle()" data-create-new-row @click.prevent="resetForm" type="button" class="btn--icon btn btn-default btn-sm">
                            <i class="fa fa-plus"></i>
                            {{ newRowTitle }}
                        </button>
                        <button v-if="isOpenedRow && model.history && model.isSingle()" type="button" @click="showHistory(row)" class="btn--icon btn btn-sm btn-default" data-toggle="tooltip" title="" :data-original-title="trans('history.changes')">
                            <i class="fa fa-history"></i>
                            {{ trans('history.show') }}
                        </button>

                        <div class="dropdown multi-languages" data-form-language-switch v-if="hasLocaleFields && selectedLanguage">
                            <button class="btn btn-default dropdown-toggle btn-sm" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <i class="--icon-left fa fa-globe-americas"></i>
                                <span class="text">{{ getLangName(selectedLanguage) }}</span>
                                <i class="--icon-right fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="languageDropdown">
                                <li v-for="lang in languages" v-if="selectedLanguage.id != lang.id" :data-slug="lang.slug">
                                    <a href="#" @click.prevent="changeLanguage(lang.id)">
                                        <i class="--icon-left fa fa-exclamation-triangle"></i> {{ getLangName(lang) }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <component
                    v-for="name in getComponents('form-header')"
                    :key="name"
                    :model="model"
                    :row="row"
                    :rows="rows.data"
                    :is="name">
                </component>
            </div>

            <div class="box-body box-body--form" :class="{ cantadd : !cansave }">
                <component
                    v-for="name in getComponents('form-top')"
                    :key="name"
                    :model="model"
                    :row="row"
                    :rows="rows.data"
                    :is="name">
                </component>

                <div class="box-body-wrapper">
                    <input v-for="(value, key) in getAdditionalFormData" type="hidden" :name="key" :value="value">

                    <form-tabs-builder
                        :model="model"
                        :childs="true"
                        :langid="langid"
                        :inputlang="selectedLanguage"
                        :row="row"
                        :cansave="cansave"
                        :hasparentmodel="hasparentmodel"
                        :depth_level="depth_level"
                        :history="history">
                    </form-tabs-builder>
                </div>

                <component
                    v-for="name in getComponents('form-bottom')"
                    :key="name"
                    :model="model"
                    :row="row"
                    :rows="rows.data"
                    :is="name">
                </component>
            </div>

            <div :data-footer="model.table" class="box-footer" v-if="canUpdateForm">
                <component
                    v-for="name in getComponents('form-footer')"
                    :key="name"
                    :model="model"
                    :row="row"
                    :rows="rows.data"
                    :is="name">
                </component>
                <div class="box-footer__actions">
                    <button v-if="progress" type="button" data-action-type="updating" :class="['btn', 'btn-' + ( isOpenedRow ? 'success' : 'primary')]"><i class="fa updating fa-refresh"></i> {{ isOpenedRow ? trans('saving') : trans('sending') }}</button>
                    <button v-if="!progress" type="submit" :data-action-type="isOpenedRow ? 'update' : 'create'" name="submit" class="btn btn-primary">{{ isOpenedRow ? saveButton : sendButton }}</button>
                </div>
            </div>

        </div>
    </component>
    <!-- /.box -->
</template>
<script>
import FormTabsBuilder from '../Forms/FormTabsBuilder.vue';

export default {
    name : 'form-builder',

    props : ['formID', 'model', 'row', 'rows', 'langid', 'canaddrow', 'progress', 'history', 'hasparentmodel', 'selectedlangid', 'gettext_editor', 'depth_level'],

    components: { FormTabsBuilder },

    data(){
        return {
            submit : false,
            isActive : true,
            cansave : true,
            form : null,
        };
    },

    mounted()
    {
        //Initialize form
        this.form = $('#'+this.formID);

        eventHub.$on('changeFormSaveState', this.changeFormSaveStateEvent = data => {
            if ( data.model != this.model.slug )
                return;

            //Change if form can show send/save button
            //in other tab, button need to be hidden
            this.cansave = data.state;
        });

        /*
         * When row is updated, then bind data from incoming request/database into model row and his values
         */
        eventHub.$on('onUpdate', this.onUpdateEvent = data => {
            if ( data.table != this.model.slug || data.depth_level != this.depth_level )
                return;

            //Update model data of existing model on row update
            for ( var key in data.row ) {
                this.row[key] = data.row[key];

                //Update values in fields cause updating files in form
                if ( key in this.model.fields ) {
                    this.model.fields[key].value = data.row[key];
                }
            }
        });

        //On create form instance, we need initialize given row.
        //For example if single model is loaded from database as relation, but FormBuilder is not loaded yet
        //Then we need insert row data after FormBuilder initialization.
        this.initForm(this.row);
    },

    destroyed(){
        eventHub.$off('changeFormSaveState', this.changeFormSaveStateEvent);
        eventHub.$off('onUpdate', this.onUpdateEvent);
    },

    watch: {
        //After click on edit button, push data into form values
        row : {
            handler : function (row, oldRow) {
                //Form cannot be resetted if data has been synced from db
                var canResetForm = !this.isOpenedRow || ! oldRow || row.id != oldRow.id;

                //Init new form after change row
                if ( !row || !oldRow || row.id != oldRow.id || this.history.history_id )
                {
                    this.initForm(row, canResetForm);

                    this.$parent.sendRowData();
                }
            },
            deep: true,
        },
        //On change language reset editing form
        // langid(langid){
        //   this.$parent.resetForm();
        // },
    },

    computed: {
        formType(){
            return this.model.isInParent() ? 'div' : 'form';
        },
        isOpenedRow(){
            return this.row && 'id' in this.row;
        },
        title(){
            var title;

            if ( this.isOpenedRow )
            {
                //If update title has not been set
                if ( !(title = this.$root.getModelProperty(this.model, 'settings.title.update')) )
                    return this.trans('edit-row-n')+' ' + this.row.id;

                //Bind value from row to title
                for ( var key in this.row )
                {
                    var value = this.row[key];

                    if ( this.isFieldSelect(key) )
                    {
                        var values = this.$root.languageOptions(this.model.fields[key].options, key);

                        for ( var i = 0; i < values.length; i++ )
                            if ( values[i][0] == value )
                            {
                                value = values[i][1];
                                break;
                            }
                    }

                    title = title.replace(':'+key, value);
                }

                return title;
            }

            //Insert title
            else if (
                (title = this.$root.getModelProperty(this.model, 'settings.title.insert'))
                || (title = this.$root.getModelProperty(this.model, 'settings.title.create'))
            ) {
                return title;
            }

            return this.trans('new-row');
        },
        newRowTitle(){
            return this.$parent.newRowTitle();
        },
        saveButton(){
            return this.$root.getModelProperty(this.model, 'settings.buttons.update') || this.trans('save');
        },
        sendButton(){
            return this.$root.getModelProperty(this.model, 'settings.buttons.create') || this.trans('send');
        },
        hasLocaleFields(){
            for ( var key in this.model.fields )
            {
                if ( this.model.fields[key].locale == true )
                    return true;

                //If some field has localized options rows
                var options = this.model.fields[key].options;
                if ( (options && options[0] && typeof options[0][1] == 'object' && options[0][1] !== null) && ('language_id' in options[0][1]) == true )
                    return true;
            }

            return false;
        },
        languages(){
            return this.$root.languages;
        },
        selectedLanguage(){
            if ( ! this.selectedlangid )
                return this.languages[0];

            for ( var key in this.languages )
                if ( this.languages[key].id == this.selectedlangid )
                    return this.languages[key];

            return this.languages[0];
        },
        canUpdateForm(){
            if ( this.isOpenedRow && this.$root.getModelProperty(this.model, 'settings.editable') == false )
                return false;

            //Model cannot be updated, when is inParent relation
            if ( this.model.isInParent() )
                return false;

            return this.cansave;
        },
        canShowGettext(){
            if ( this.model.slug == 'languages' && this.$root.gettext )
                return true;

            return false;
        },
        getAdditionalFormData(){
            //Data for request
            var data = {
                _model : this.model.slug,
            };

            //Check if form belongs to other form
            if ( this.model.foreign_column != null && this.$parent.parentrow )
                data[this.model.foreign_column[this.$parent.getParentTableName()]] = this.$parent.parentrow.id;

            //If is updating, then add row ID
            if ( this.getFormAction == 'update' )
            {
                data['_id'] = this.row.id;
                data['_method'] = 'put';
            } else {
                //Check if is enabled language
                if ( this.langid )
                    data['language_id'] = this.langid;

                //Push saved childs without actual parent row
                if ( this.hasParentModel() && this.$parent.rows.save_children.length > 0 )
                    data['_save_children'] = JSON.stringify(this.$parent.rows.save_children);
            }

            //If we need mutate keys of additional form data
            var mutatedData = {};
            for ( var key in data ) {
                mutatedData[this.model.formPrefix()+key] = data[key];
            }

            return mutatedData;
        },
        getFormAction(){
            return ! this.isOpenedRow ? 'store' : 'update';
        }
    },

    methods: {
        changeLanguage(id){
            this.$parent.selected_language_id = id;
        },
        getLangName(lang){
            return this.$root.getLangName(lang);
        },
        showHistory(row){
            this.$parent.showHistory(row);
        },
        getComponents(type){
            return this.$parent.getComponents(type);
        },
        resetForm(){
            this.$parent.resetForm();
        },
        //Resets form values and errors
        initForm(row, reset){
            var is_row = row && 'id' in row;

            //Resets document values of elements
            //can be reseted just when is changed row for other, or inserting new row
            if ( reset !== false )
            {
                for ( var key in this.model.fields )
                {
                    this.$set(this.model.fields[key], 'value', null);
                }
            }

            this.resetErrors();

            if ( ! is_row ) {
                this.$parent.resetForm();
            }

            //Checks if form can be editable
            if ( is_row && this.canaddrow && this.model.editable == false && this.$parent.hasChilds() == 0 )
            {
                this.$parent.resetForm();
                return;
            }

            for ( var key in this.model.fields )
            {
                if ( ! is_row || this.model.fields[key].value != row[key] || reset )
                {
                    //Value can not be undefined, because of model change events.
                    //If value will be undefined, full rows table will be realoaded (bug)
                    var value = is_row ? row[key] : null,
                        value = value === undefined ? null : value;

                    //Set value and default value of field from database
                    this.model.fields[key].value = value;
                    this.model.fields[key].$original_value = value;

                    eventHub.$emit('updateField', this.buildEventData({
                        key : key,
                        field : this.model.fields[key]
                    }));
                }
            }

            //Set box color
            if ( !is_row ) {
                this.isActive = true;

                if ( this.hasParentModel() )
                    this.$parent.closeHistory();
            } else {
                this.isActive = row.published_at == null;
            }
        },
        resetErrors(){
            this.form.find('.form-group.has-error').firstLevelForm(this.form[0]).removeClass('has-error').find('.help-block').remove();
            this.form.find('.far.fa-times-circle').firstLevelForm(this.form[0]).remove();
            this.form.find('.multi-languages .has-error').firstLevelForm(this.form[0]).removeClass('has-error');
            this.removeActiveTab(this.form.find('.nav-tabs li[has-error]').firstLevelForm(this.form[0]));
            this.$parent.progress = false;
        },
        sendForm(e, action, callback)
        {
            //Disable send already sent form
            if ( this.submit == true )
                return;

            //Resets ckeditor values for correct value
            if (typeof CKEDITOR!='undefined'){
                for (var key in CKEDITOR.instances){
                    CKEDITOR.instances[key].updateElement();
                }
            }

            this.resetErrors();

            this.$parent.progress = true;

            $(e.target).ajaxSubmit({

                url : this.$root.requests[action],

                success : data => {

                    this.submit = true;
                    this.$parent.progress = false;

                    //Error occured
                    if ( $.type(data) != 'object' || ! ('type' in data) )
                        return this.unknownAjaxErrorResponse();

                    //Fix for resubmiting form after closing with enter
                    setTimeout(() => {
                        this.$root.openAlert(data.title, data.message, data.type, null, () => {

                            //Timeout for sending new request with enter
                            setTimeout(() => {
                                this.submit = false;
                            }, 500);

                        });
                    }, 100);

                    callback( data );
                },

                error : response => {
                    this.resetErrors();

                    // Wrong validation
                    this.$root.errorResponseLayer( response, 422, () => {
                        var obj = response.responseJSON,
                            errors = [];

                        //Laravel 5.5+ provides validation errors in errors object.
                        if ( 'errors' in obj && !('length' in obj.errors) )
                            obj = obj.errors;

                        for ( var key in obj )
                        {
                            //One or multiple errors
                            errors = typeof obj[key] == 'string' ? [ obj[key] ] : obj[key];

                            //Display errors
                            this.bindErrorMessages(key, errors);
                        }
                    })
                }
            });
        },
        unknownAjaxErrorResponse(){
            this.$root.arrorAlert(() => {

                this.$parent.progress = false;

                //Timeout for sending new request with enter
                setTimeout(() => {
                    this.submit = false;
                }, 500);

            });
        },
        bindErrorMessages(key, errors){
            var keys = [],
                parts = key.split('.');

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

            for ( var i = 0; i < errors.length; i++ )
            {
                _.uniqBy(keys).map(key => {
                    this.form.find('input[name="'+key+'"], select[name="'+key+'"], textarea[name="'+key+'"]')
                             .firstLevelForm(this.form[0])
                             .each(this.showErrorMessage(errors[i], i));
                });
            }
        },
        showErrorMessage(message, i){
            var component = this;

            return function(){
                var where = $(this);

                //Colorize tabs
                component.colorizeTab($(this));

                component.colorizeLangDropdown($(this));

                if ( $(this).is('select') ){
                    where = where.parent().parent().children().last().prev();
                }

                else if ( $(this).is('textarea') ){
                    where = where.parent().children().last().prev();
                }

                else if ( $(this).is('input:radio') || $(this).parent().hasClass('label-wrapper') ){
                    where = where.parent().parent().parent();

                    if ( where.find('.help-block').length == 0 )
                        where = where.children().last().prev();
                    else
                        where = null;
                }

                else if ( $(this).parent().hasClass('input-group') )
                    where = $(this).parent();

                if ( where )
                    where.after( '<span class="help-block">'+message+'</span>' );

                //On first error
                if ( i == 0 ){
                    var label = $(this).closest('div.form-group').addClass('has-error').find('> label');

                    if ( label.find('.fa-times-circle').length == 0 )
                        label.prepend('<i class="far fa-times-circle"></i> ');
                }
            };
        },
        buildEventData(data, model, isChild){
            var model = model||this.model;

            return {
                table : model.slug,
                model : model,

                //If is child inParent relation, then add depth level + 1 for correct communication
                depth_level : this.depth_level + (isChild ? 1 : 0),
                ...data
            };
        },
        saveForm(e)
        {
            //Devide if is updating or creating form
            var action = this.getFormAction;

            this.sendForm(e, action, response => {
                if ( ! response.data )
                    return false;

                //Push new row
                if ( action == 'store' ) {
                    for ( var key in response.data ) {
                        var clonedRow = _.cloneDeep(response.data[key].rows[0]),
                            isParentRow = response.data[key].model == this.model.table,
                            model = this.$root.models[response.data[key].model];

                        //Reset actual items buffer
                        if ( isParentRow && this.hasParentModel() )
                            this.saveParentChilds(response.data[key].rows);

                        var eventData = this.buildEventData({
                            row : clonedRow,
                            request : response.data[key]
                        }, model, !isParentRow);

                        //Bind values for input builder
                        eventHub.$emit('onSubmit', eventData);

                        //Send notification about new row
                        eventHub.$emit('onCreate', eventData);

                        if ( isParentRow ) {
                            //If form has disabled autoreseting
                            var autoreset = this.$root.getModelProperty(this.model, 'settings.autoreset');

                            //Reseting form after new row
                            if ( !this.model.isSingle() && autoreset !== false) {
                                this.initForm(this.$parent.emptyRowInstance());
                            }

                            //If is disabled autoreseting form, then select inserted row
                            else {
                                this.$parent.row = clonedRow;

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
                            isParentRow = table == this.model.table,
                            model = this.$root.models[table];

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
                if ( this.hasparentmodel !== true ) {
                    var incomingRow = action == 'store' ? response.data[0].rows[0] : response.data.rows[this.model.table];

                    this.$parent.$parent.pushOption(incomingRow, action);
                }
            });

        },
        removeActiveTab(tab, all){
            var removeFrom = tab.filter(function(){
                return all === true || ! $(this).hasClass('model-tab');
            });

            removeFrom.removeAttr('data-toggle')
                      .removeAttr('data-original-title')
                      .removeAttr('has-error')
                      .tooltip("dispose")
                      .find('a > .fa.fa-exclamation-triangle')
                      .remove();
        },
        colorizeTab(input){
            var _this = this;

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
                        _this.removeActiveTab(getActiveTab($(this)), true);
                    }
                });

                getActiveTab($(this)).each(function(){
                    if ( $(this).hasClass('has-error') )
                        return;

                    $(this).attr('data-toggle', 'tooltip').attr('data-original-title', _this.trans('tab-error')).attr('has-error', '').one('click', function(){
                        var active = $(this).parents('.nav-tabs-custom').find('> .nav-tabs > li.active[has-error]').not($(this).parent().find('> li'));

                        _this.removeActiveTab($([this].concat(active.toArray())), true);
                    }).find('a').prepend('<i class="nav-link--icon-left fa fa-exclamation-triangle"></i>');
                })
            });
        },
        colorizeLangDropdown(input){
            var field_wrapper = input.parents('.field-wrapper'),
                field_key = field_wrapper.attr('data-field'),
                field_lang = field_wrapper.attr('data-lang'),
                field_model = field_wrapper.attr('data-model');

            if ( ! field_key )
                return;

            var model = this.$root.models[field_model],
                field = model.fields[field_key];

            if ( field.locale != true || field_lang == this.selectedLanguage.slug )
                return;

            var dropdown = this.form.find('.multi-languages .dropdown-toggle');

            dropdown.addClass('has-error');
            dropdown.next().find('li[data-slug="'+field_lang+'"]').addClass('has-error');

            if ( field_lang == this.languages[0].slug )
                this.$root.openAlert(this.trans('warning'), this.trans('lang-error'), 'warning');
        },
        scrollToForm(){
            setTimeout(() => {
                this.scrollTo('#'+this.formID);
            }, this.$root.isTest ? 0 : 500);
        },
        hasParentModel(){
            return this.$parent.$options.name == 'model-builder';
        },
        saveParentChilds(rows){
            this.$parent.rows.save_children = [];

            //If actual row has no parent, and need to ba saved when parent will be saved
            if ( this.$parent.isWithoutParentRow )
            {
                var parent = this.$parent.$parent;

                while(!('rows' in parent))
                    parent = parent.$parent;

                for ( var i = 0; i < rows.length; i++ )
                {
                    parent.rows.save_children.push({
                        table : this.model.slug,
                        id : rows[i].id,
                    });
                }
            }
        },
        openGettextEditor(){
            this.$parent.gettext_editor = this.row;
        },
        isFieldSelect(column){
            return column && column in this.model.fields && (['select', 'radio'].indexOf(this.model.fields[column].type) > -1) ? true : false;
        },
    },
}
</script>