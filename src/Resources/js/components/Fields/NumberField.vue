<template>
    <div class="form-group" :class="{ disabled : field.isReadonly() }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <input
            type="number"
            class="form-control"
            :name="name"
            :value="value"
            :step="isDecimal ? getDecimalStep : ''"
            :placeholder="field.getPlaceholder()"
            :disabled="field.isDisabled()"
            :readonly="field.isReadonly()"
            @keyup="changeValue">
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'field_key', 'name', 'field', 'value'],

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