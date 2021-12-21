<template>
    <div
        :data-field="field_key"
        :data-model="model.slug"
        :data-lang="langslug"
        :data-history-changed="isChangedFromHistory"
        class="field-wrapper"
        :class="{ 'is-changed-from-history' : isChangedFromHistory && !hasComponent }">

        <string-field
            v-if="!hasComponent && (isString || isPassword)"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </string-field>

        <color-field
            v-if="!hasComponent && isColor"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </color-field>

        <number-field
            v-if="!hasComponent && isNumber"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </number-field>

        <date-time-field
            v-if="!hasComponent && isDatepicker"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </date-time-field>

        <checkbox-field
            v-if="!hasComponent && isCheckbox"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </checkbox-field>

        <text-field
            v-if="!hasComponent && (isText || isEditor)"
            :id="getId"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </text-field>

        <gutenberg-field
            v-if="!hasComponent && isGutenberg"
            :id="getId"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </gutenberg-field>

        <file-field
            v-if="!hasComponent && isFile"
            :id="getId"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field_key_original="field_key"
            :field="field"
            :value="getValueOrDefault"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </file-field>

        <select-field
            v-if="!hasComponent && isSelect"
            :id="getId"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :inputlang="inputlang"
            :langid="langid"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </select-field>

        <radio-field
            v-if="!hasComponent && isRadio"
            :id="getId"
            :model="model"
            :field_name="getName"
            :field_key="getFieldName"
            :field="field"
            :value="getValueOrDefault"
            :inputlang="inputlang"
            :langid="langid"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :depth_level="depth_level">
        </radio-field>

        <!-- Row Confirmation -->
        <form-input-builder
            v-if="field.confirmed == true && !isConfirmation"
            :model="model"
            :field="field"
            :index="index"
            :field_key="field_key + '_confirmation'"
            :depth_level="depth_level"
            :confirmation="true"></form-input-builder>

        <component
            v-if="hasComponent || hasEmptyComponent"
            :model="model"
            :field="field"
            :value="getValueOrDefault"
            :history_changed="isChangedFromHistory"
            :history="history"
            :row="row"
            :field_key="getFieldName"
            :field_key_original="field_key"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :is="componentName(model, field.component)">
        </component>

        <component
            v-if="hasSubComponent"
            :model="model"
            :field="field"
            :value="getValueOrDefault"
            :history_changed="isChangedFromHistory"
            :history="history"
            :row="row"
            :field_key="getFieldName"
            :field_key_original="field_key"
            :required="isRequired"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :is="componentName(model, field.sub_component)">
        </component>
    </div>
</template>

<script>
    import StringField from '../Fields/StringField';
    import NumberField from '../Fields/NumberField';
    import DateTimeField from '../Fields/DateTimeField';
    import CheckboxField from '../Fields/CheckboxField';
    import TextField from '../Fields/TextField';
    import GutenbergField from '../Fields/GutenbergField';
    import FileField from '../Fields/FileField';
    import SelectField from '../Fields/SelectField';
    import RadioField from '../Fields/RadioField';
    import ColorField from '../Fields/ColorField';

    export default {
        name: 'form-input-builder',
        props: ['model', 'field', 'field_key', 'index', 'confirmation', 'inputlang', 'langslug'],

        components: { StringField, NumberField, DateTimeField, CheckboxField, TextField, GutenbergField, FileField, SelectField, RadioField, ColorField },

        created(){
            if ( this.field.component ) {
                this.registerModelComponents(this.model, this.field.component);
            }

            if ( this.field.sub_component ) {
                this.registerModelComponents(this.model, this.field.sub_component);
            }
        },

        mounted(){
            //If this field has own component
            this.syncFieldsValueWithRow();
        },

        methods : {
            parseArrayValue(value){
                if ( $.isArray(value) )
                {
                    for ( var key in value )
                    {
                        if ( $.isNumeric( value[key] ) )
                            value[key] = parseInt( value[key] );
                    }
                }

                return value;
            },
            getLocalizedValue(value, defaultValue){
                if ( ! this.hasLocale ) {
                    return value||null;
                }

                if ( value && this.langslug in value ) {
                    return value[this.langslug];
                }

                return defaultValue||null;
            },
            //We need reset empty values because of infinity loop in setter
            //when is NaN setted
            resetEmptyValue(value){
                if ( value === undefined || _.isNaN(value) )
                    return null;

                return value;
            },
            syncFieldsValueWithRow(){
                this.$watch('row.'+this.field_key, value => {
                    this.field.value = this.resetEmptyValue(value);
                });

                this.$watch('field.value', value => {
                    this.row[this.field_key] = this.resetEmptyValue(value);
                });
            },
            isEmptyValue(value){
                return _.isNil(value) || value === '';
            },
            defaultFieldValue(field){
                var defaultValue = field ? (
                    this.isEmptyValue(field.value) ? (field.defaultByOption||field.default) : field.value
                ) : null;

                if (
                    this.isEmptyValue(defaultValue)
                    || (['number', 'string', 'boolean'].indexOf(typeof defaultValue) === -1
                    && !this.isMultipleField(field))
                ) {
                    return '';
                }

                //If is current date value in datepicker
                if ( field.default && this.isDatepickerField(field) && defaultValue.toUpperCase() == 'CURRENT_TIMESTAMP' ) {
                    defaultValue = moment().format(this.fromPHPFormatToMoment(this.model.getFieldFormat(this.field_key)));
                }

                //Get value by other table
                if ( field.default && this.isEmptyValue(field.value) ) {
                    var defaultParts = (field.default+'').split('.');

                    if ( defaultParts.length == 2 )
                    {
                        var model = this.getModelBuilder(defaultParts[0]);

                        if ( model && (defaultParts[1] in model.row) ) {
                            defaultValue = model.row[defaultParts[1]];
                        }
                    }
                }

                //Get value by select option key
                if ( field.defaultByOption && this.isSelect && this.isEmptyValue(field.value) ) {
                    var option = (field.defaultByOption+'').split(','),
                        defaultOption;

                    defaultOption = field.options.filter(item => {
                        if ( option.length == 1 ) {
                            return item[0] == option[0];
                        } else if ( option.length > 1 ) {
                            return item[1][option[0]] == option[1];
                        }
                    })[0];

                    defaultValue = defaultOption ? defaultOption[0] : '';
                }

                //Cast checkbox value
                if ( this.isCheckbox ) {
                    defaultValue = defaultValue == true ? true : false;
                }

                //Returns empty value
                if ( this.isEmptyValue(defaultValue) ) {
                    return '';
                }

                //If is not empty default value, and field value is empty, set this field value to this default value
                else if ( _.isNil(this.field.value) ) {
                    this.changeValue(null, defaultValue);
                }

                return defaultValue;
            },
            /*
             * Apply event on changed value
             */
            changeValue(e, value, no_field){
                return this.model.changeValueFromInput(this.field_key, e, value, no_field, this.langslug);
            },
            isMultipleField(field){
                return field.multiple && field.multiple === true || ('belongsToMany' in field);
            },
            isDatepickerField(field){
                return ['date', 'datetime', 'time'].indexOf(field.type) > -1;
            },
            //Change bools to string values
            fixBoolValue(value){
                if ( value === true ) {
                    return '1';
                }

                if ( value === false ) {
                    return '0';
                }

                return value;
            },
        },

        computed : {
            langid(){
                return this.model.getSelectedLanguageId();
            },
            depth_level(){
                return this.model.getData('depth_level');
            },
            history(){
                return this.model.getData('history');
            },
            row(){
                return this.model.getRow();
            },
            getId() {
                parent = this.model.getParentTableName(this.model.without_parent == true);

                return 'id-' + this.model.slug + this.field_key + '-' + this.depth_level + '-' + parent + '-' + this.index + '-' + this.langslug;
            },
            getFieldKey()
            {
                return this.model.slug + '-' + this.field_key;
            },
            getFieldName()
            {
                var key = this.field_key;

                //If is localized key, add field locale key
                if ( this.hasLocale ) {
                    key = this.field_key+'['+this.langslug+']';
                }

                return this.model.formPrefix()+key;
            },
            getName()
            {
                //Return confirmation name
                if ( this.isConfirmation )
                    return this.field.name + ' ('+this.trans('confirmation')+')';

                return this.field.name;
            },
            isString()
            {
                return this.field.type == 'string';
            },
            isNumber()
            {
                return ['integer', 'decimal'].indexOf(this.field.type) > -1;
            },
            isText()
            {
                return this.field.type == 'text' || this.field.type == 'longtext';
            },
            isGutenberg()
            {
                return this.field.type == 'gutenberg';
            },
            isEditor()
            {
                return this.field.type == 'editor'  || this.field.type == 'longeditor';
            },
            isFile()
            {
                return this.field.type == 'file';
            },
            isPassword()
            {
                return this.field.type == 'password';
            },
            isColor()
            {
                return this.field.type == 'color';
            },
            isSelect()
            {
                return this && this.field.type == 'select';
            },
            isRadio()
            {
                return this.field.type == 'radio';
            },
            isConfirmation()
            {
                return this.confirmation == true;
            },
            isDatepicker()
            {
                return this.isDatepickerField(this.field);
            },
            isCheckbox()
            {
                return this.field.type == 'checkbox';
            },
            isDisabled()
            {
                if ( this.model.isOpenedRow() == true && (this.model.hasAccess('update') == false || this.model.editable == false) ){
                    return true;
                }

                return this.model.tryAttribute(this.field, 'disabled', this.row);
            },
            isReadonly()
            {
                return this.model.tryAttribute(this.field, 'readonly', this.row);
            },
            isMultiple()
            {
                return this.isMultipleField(this.field);
            },
            hasComponent(){
                return 'component' in this.field && this.field.component && this.hasEmptyComponent == false;
            },
            hasSubComponent(){
                return 'sub_component' in this.field && this.field.sub_component;
            },
            hasEmptyComponent(){
                let componentName = this.componentName(this.model, this.field.component);

                if ( !componentName || !this.model.components[componentName]){
                    return false;
                }

                try {
                    var data = this.model.components[componentName],
                        obj = (new Function('return '+data))();

                    return obj.template == '';
                } catch(e){
                }

                return false
            },
            getValueOrDefault() {
                //If is confirmation, then return null value every time
                if ( this.isConfirmation ){
                    return '';
                }

                var value = this.parseArrayValue(this.field.value);

                if ( this.isMultipleDatepicker ) {
                    return JSON.stringify(value||[]);
                }

                //Localization field
                if ( this.hasLocale ) {
                    return this.getLocalizedValue(value, this.defaultFieldValue(this.field));
                }

                //If row is not opened, then return default field value
                if ( ! this.model.isOpenedRow() ){
                    return this.defaultFieldValue(this.field);
                }

                return value;
            },
            isRequired(){
                if ( this.model.isOpenedRow() && this.field.type == 'password' ) {
                    return false;
                }

                //Basic required attribute
                if ( 'required' in this.field && this.field.required == true )
                    return true;

                //Required if attribute
                if ( this.field.required_if )
                {
                    var parts = this.field.required_if.split(','),
                        value = this.fixBoolValue(this.row[parts[0]]);

                    if (value && parts.slice(1).indexOf(value) > -1) {
                        return true;
                    }
                }

                //Required unless attribute
                if ( this.field.required_unless )
                {
                    var parts = this.field.required_unless.split(','),
                        value = this.fixBoolValue(this.row[parts[0]]);

                    if (value && parts.slice(1).indexOf(value) == -1){
                        return true;
                    }
                }

                //Required without attribute
                if ( this.field.required_without )
                {
                    var parts = this.field.required_without.split(',');

                    for ( var i = 0; i < parts.length; i++ ) {
                        if ( ! this.row[parts[i]] )
                            return true;
                    }
                }

                //Required without attribute
                if ( this.field.required_with )
                {
                    var parts = this.field.required_with.split(',');

                    for ( var i = 0; i < parts.length; i++ ) {
                        if ( this.row[parts[i]] )
                            return true;
                    }
                }

                return false;
            },
            hasLocale(){
                return 'locale' in this.field;
            },
            isChangedFromHistory(){
                if ( ! this.history )
                    return false;

                return this.history.fields.indexOf(this.field_key) > -1;
            },
        },
    }
</script>