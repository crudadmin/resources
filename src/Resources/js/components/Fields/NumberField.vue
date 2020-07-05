<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>
        <input
            type="number"
            class="form-control"
            :name="field_key"
            :value="value"
            :step="isDecimal ? getDecimalStep : ''"
            :placeholder="field.placeholder || field_name"
            :disabled="disabled"
            :readonly="readonly"
            @keyup="changeValue">
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],

        computed : {
            isDecimal(){
                return this.field.type == 'decimal';
            },
            getDecimalStep(){
                var length = '',
                    decimalLength = ((this.field.decimal_length||'').replace(':', ',')||'8,2').split(','),
                    step = '0.'+_.repeat(0, decimalLength[1] - 1)+'1';

                return step;
            },
        },

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>