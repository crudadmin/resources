<template>
    <div v-if="hasFieldValue || hasComponent">
        <component
            v-if="hasComponent"
            :mutatedValue="fieldValue"
            :value="item[field]"
            :field="settings.field"
            :row="item"
            :model="model"
            :is="componentName(model, settings.component)" />

        <div v-else-if="isColor" :style="{ color : fieldValueLimitedAndEncoded }">
            {{ fieldValueLimitedAndEncoded }}
        </div>

        <div v-else-if="isFile" class="filesList">
            <div v-for="(file, index) in getFiles">
                <file :file="file" :field="field" :model="model" :image="image"></file>

                <span v-if="index != getFiles.length - 1">, </span>
            </div>
        </div>

        <!-- Table value -->
        <span v-else :data-toggle="fieldValue.length > settings.string_limit ? 'tooltip' : ''" :data-original-title="onlyEncodedTitle" v-html="fieldValueLimitedAndEncoded"></span>
    </div>
</template>

<script>
import File from '../Partials/File.vue';

export default {
    props : ['model', 'item', 'field', 'name', 'image', 'columns', 'settings'],

    components : { File },

    created(){
        if ( this.settings.component ) {
            this.registerModelComponents(this.model, this.settings.component);
        }

        //Performance tests
        //this.$a = window.startTest();
    },

    // mounted(){
    //     window.endTest(this.$a);
    // },

    computed: {
        isFile(){
            if (
                this.settings.isRealField
                && this.settings.field.isFile()
                && this.settings.encode
            ) {
                return true;
            }

            return false;
        },
        isColor(){
            return this.settings.isRealField && this.settings.field.isColor();
        },
        getFiles(){
            var value = this.fieldValue||[];

            if ( $.isArray(value) ) {
                return value;
            }

            return [ value ];
        },
        hasFieldValue(){
            return _.isNil(this.fieldValue) === false;
        },
        fieldValue() {
            var field = this.settings.field,
                row = this.item,
                rowValue = this.field in row ? this.getMutatedValue(row[this.field], field) : '';

            //Get select original value
            if ( field ) {
                var isRadio = field.isRadio();

                if ( field.isSelect() || isRadio ) {
                    if ( 'multiple' in field && field.multiple == true && $.isArray(rowValue) && !isRadio ) {
                        var values = [],
                            rows = rowValue,
                            related_table = this.getRelatedModelTable(field),
                            options = (!related_table && !field.option) ? field.options : this.getLanguageSelectOptions( field.options, this.getRelatedModelTable(field) );

                        for ( var i = 0; i < rows.length; i++ ) {
                            var searched = options.filter(function(item){
                                return item[0] == rows[i];
                            }.bind(this));

                            if ( searched.length > 0 ) {
                                values.push( searched[0][1] );
                            }
                        }

                        return values.join(', ');
                    } else {
                        var related_table = this.getRelatedModelTable(field),
                            options = isRadio || (!related_table && !field.option) ? field.options : this.getLanguageSelectOptions(field.options, related_table);

                        //Check if key exists in options
                        if ( ! options )
                            return rowValue;

                        for ( var i = 0; i < options.length; i++ )
                        {
                            if ( rowValue == options[i][0] ) {
                                return options[i][1];
                            }
                        }
                    }
                }

                else if ( field.isCheckbox() ) {
                    if ( rowValue === null ){
                        return;
                    }

                    return rowValue == 1 ? this.trans('yes') : this.trans('no');
                }

                //Multi date format values
                else if ( field.isDatepicker() ) {
                    rowValue = this.returnDateFormat(rowValue, this.field);
                }
            } else if ( ['created_at', 'updated_at'].indexOf(this.field) > -1 ) {
                return this.returnDateFormat(rowValue, this.field);
            }

            var add_before = this.settings.add_before,
                add_after = this.settings.add_after;

            //If is object
            if ( typeof rowValue == 'object' ) {
                return rowValue;
            }

            return (rowValue || rowValue == 0) ? ((add_before||'') + rowValue + (add_after||'')) : null;
        },
        onlyEncodedTitle(){
            //If is not encoded column, then return empty value
            if ( this.settings.encode === false ) {
                return '';
            }

            return this.fieldValue;
        },
        fieldValueLimitedAndEncoded(){
            return this.encodeValue(this.stringLimit(this.fieldValue));
        },
        hasComponent(){
            return this.settings.component ? true : false;
        },
    },

    methods: {
        returnDateFormat(rowValue, field){
            return _.castArray(rowValue||[]).map(item => {
                var date = moment(item),
                    format = this.fromPHPFormatToMoment(this.model.getFieldFormat(field)||'d.m.Y H:i');

                return date.isValid() ? date.format(format) : item;
            }).join(', ');
        },
        stringLimit(string){
            var limit = this.settings.string_limit;

            if ( limit != 0 && string.length > limit && this.settings.encode !== false ) {
                return string.substr(0, limit) + '...';
            }

            return string;
        },
        encodeValue(string){
            var field = this.settings.field;

            if ( this.settings.isRealField ) {
                //Check if column can be encoded
                if ( this.settings.encode == true ) {
                    string = $(document.createElement('div')).text(string).html();
                }

                if ( field.isText() && parseInt(field.limit) === 0) {
                    return string.replace(/\n/g, '<br>');
                }

                //Is phone number
                if ( (field.isText() && ('phone' in field || 'phone_link' in field)) || field.isPhone() ) {
                    return '<a href="tel:'+string+'">'+string+'</a>';
                }
            }

            return string;
        },
        getRelatedModelTable(field){
            var table = field.belongsTo||field.belongsToMany;

            if ( ! table ) {
                return false;
            }

            return table.split(',')[0];
        },
        getMutatedValue(value, field){
            if ( field && 'locale' in field ) {
                //Get default language
                let dslug = this.settings.default_slug;

                value = this.getLocaleFieldValue(value, dslug);
            }

            //Return correct zero value
            if ( value === 0 ) {
                return 0;
            }

            return value;
        },
        getLanguageSelectOptions(array, model){
            model = this.$root.models[model];

            var filter =  model && model.localization ? {
                language_id : this.$root.language_id,
            } : {};

            return this.$root.languageOptions(array, this.settings.field, filter, false);
        },
    }
}
</script>