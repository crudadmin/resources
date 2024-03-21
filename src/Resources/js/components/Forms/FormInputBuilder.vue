<template>
    <div
        :data-field="field_key"
        :data-model="model.slug"
        :data-lang="langslug"
        :data-history-changed="field.hasHistoryChange()"
        class="field-wrapper"
        :class="{ 'is-changed-from-history' : field.hasHistoryChange() && !hasComponent }">

        <component
            v-for="(component, increment) in fieldComponents"
            :is="component.name"
            :id="getId"
            :key="component.name+'-'+increment"
            :model="model"
            :field="field"
            :name="getInputName"
            :field_key="field_key"
            :value="getValueOrDefault"
            :row="row"
            :langslug="langslug"
            :depth_level="depth_level"

            :readonly="field.isReadonly()"
            :required="field.isRequired()"
            :disabled="field.isDisabled()"
            :field_key_original="field_key">
        </component>

        <!-- Row Confirmation -->
        <form-input-builder
            v-if="field.confirmed == true && !isConfirmation"
            :model="model"
            :field="fieldConfirmed"
            :index="index"
            :field_key="field_key"
            :depth_level="depth_level"
            :confirmation="true"></form-input-builder>
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
    import PhoneField from '../Fields/PhoneField';
    import UploaderField from '../Fields/UploaderField';

    const parseArrayValue = (value) => {
        if ( $.isArray(value) )
        {
            for ( var key in value )
            {
                if ( $.isNumeric( value[key] ) )
                    value[key] = parseInt( value[key] );
            }
        }

        return value;
    };

    //We need reset empty values because of infinity loop in setter
    //when is NaN setted
    const resetEmptyValue = (value) => {
        if ( value === undefined || _.isNaN(value) )
            return null;

        return value;
    }

    export default {
        name: 'form-input-builder',
        props: ['model', 'field', 'field_key', 'index', 'confirmation', 'langslug'],

        components: { StringField, NumberField, DateTimeField, CheckboxField, TextField, GutenbergField, FileField, SelectField, RadioField, ColorField, PhoneField, UploaderField },

        created(){
            if ( this.field.component ) {
                this.registerModelComponents(this.model, this.field.component);
            }

            //Register subcomponents
            this.subComponents.forEach(subComponent => {
                this.registerModelComponents(this.model, subComponent);
            });
        },

        mounted(){
            //If this field has own component
            this.syncFieldsValueWithRow();
        },

        methods : {
            getLocalizedValue(value, defaultValue){
                if ( ! this.field.hasLocale() ) {
                    return value||null;
                }

                if ( value && this.langslug in value ) {
                    return value[this.langslug];
                }

                return defaultValue||null;
            },
            syncFieldsValueWithRow(){
                this.$watch('row.'+this.field_key, value => {
                    this.field.value = resetEmptyValue(value);
                });

                this.$watch('field.value', value => {
                    this.row[this.field_key] = resetEmptyValue(value);
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
                    //Set default parent relations
                    let additionalFormData = this.model.getAdditionalFormData();
                    if ( this.field_key in additionalFormData ){
                        return additionalFormData[this.field_key]||'';
                    }

                    return '';
                }

                //If is current date value in datepicker
                if ( field.default && field.isDatepicker() && defaultValue.toUpperCase() == 'CURRENT_TIMESTAMP' ) {
                    defaultValue = moment().format(this.fromPHPFormatToMoment(this.model.getFieldFormat(this.field_key)));
                }

                //Get value by other table
                if ( field.default && this.isEmptyValue(field.value) ) {
                    var defaultParts = (field.default+'').split('.');

                    if ( defaultParts.length == 2 ) {
                        var model = this.model.getParentModel(defaultParts[0]);

                        if ( model && (defaultParts[1] in model.getRow()) ) {
                            defaultValue = model.getRow()[defaultParts[1]];
                        } else {
                            defaultValue = null;
                        }
                    }
                }

                //Get value by select option key
                if ( field.defaultByOption && this.field.isSelect() && this.isEmptyValue(field.value) ) {
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
                if ( this.field.isCheckbox() ) {
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
                if ( this.isConfirmation ){
                    return;
                }

                return this.model.changeValueFromInput(this.field_key, e, value, no_field, this.langslug);
            },
            isMultipleField(field){
                return field.multiple && field.multiple === true || ('belongsToMany' in field);
            },
        },

        computed : {
            nativeFieldComponent(){
                let components = {
                    'string-field' : this.field.isString() || this.field.isPassword(),
                    'color-field' : this.field.isColor(),
                    'phone-field' : this.field.isPhone(),
                    'number-field' : this.field.isNumber(),
                    'date-time-field' : this.field.isDatepicker(),
                    'checkbox-field' : this.field.isCheckbox(),
                    'text-field' : this.field.isText() || this.field.isEditor(),
                    'gutenberg-field' : this.field.isGutenberg(),
                    'file-field' : this.field.isFile(),
                    'uploader-field' : this.field.isUploader(),
                    'select-field' : this.field.isSelect(),
                    'radio-field' : this.field.isRadio(),
                };

                for ( var key in components ){
                    if ( components[key] == true ){
                        return key;
                    }
                }
            },
            fieldComponents(){
                let components = [];

                if ( this.hasComponent || this.hasEmptyComponent ){
                    components.push({ name : this.componentName(this.model, this.field.component) });
                }

                if ( !this.hasComponent && this.nativeFieldComponent ){
                    components.push({ name : this.nativeFieldComponent });
                }

                for ( var subComponent of this.subComponents ) {
                    components.push({ name : this.componentName(this.model, subComponent) });
                }

                return components;
            },
            fieldConfirmed(){
                let field = _.cloneDeep(this.field);

                field.name = field.name+' ('+this.trans('confirmation')+')';

                return field;
            },
            depth_level(){
                return this.model.getData('depth_level');
            },
            row(){
                return this.model.getRow();
            },
            getId() {
                let parent = this.model.getParentTableName()||0;

                return 'id-' + this.model.slug + this.field_key + '-' + this.depth_level + '-' + parent + '-' + this.index + '-' + this.langslug;
            },
            getFieldKey()
            {
                return this.model.slug + '-' + this.field_key;
            },
            getInputName()
            {
                var key = this.field_key;

                //If is localized key, add field locale key
                if ( this.field.hasLocale() ) {
                    key = this.field_key+'['+this.langslug+']';
                }

                if ( this.isConfirmation ){
                    key += '_confirmation';
                }

                return this.model.formPrefix()+key;
            },
            isConfirmation()
            {
                return this.confirmation == true;
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

                var value = parseArrayValue(this.field.value);

                if ( this.isMultipleDatepicker ) {
                    return JSON.stringify(value||[]);
                }

                //Localization field
                if ( this.field.hasLocale() ) {
                    return this.getLocalizedValue(value, this.defaultFieldValue(this.field));
                }

                //If row is not opened, then return default field value
                if ( ! this.model.isOpenedRow() ){
                    return this.defaultFieldValue(this.field);
                }

                return value;
            },
            subComponents(){
                return _.castArray(this.field.sub_component).filter(item => item);
            },
        },
    }
</script>