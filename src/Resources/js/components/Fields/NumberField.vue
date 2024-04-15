<template>
    <Field :field="field">
        <input
            type="number"
            class="form-control"
            :name="name"
            :value="value"
            :step="isDecimal ? getDecimalStep : ''"
            :placeholder="field.getPlaceholder()"
            :disabled="field.isDisabled()"
            :readonly="field.isReadonly()"
            @keyup="changeValue"
        />
    </Field>
</template>

<script>
export default {
    props: ['name', 'field', 'value'],

    computed: {
        isDecimal() {
            return this.field.type == 'decimal';
        },
        getDecimalStep() {
            var length = '',
                decimalLength = ((this.field.decimal_length || '').replace(':', ',') || '8,2').split(','),
                step = '0.' + _.repeat(0, decimalLength[1] - 1) + '1';

            return step;
        },
    },

    methods: {
        changeValue(e) {
            this.$parent.changeValue(e);
        },
    },
};
</script>
