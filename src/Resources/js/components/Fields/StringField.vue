<template>
    <Field :field="field">
        <input
            class="form-control"
            :autocomplete="field.isPassword() ? 'new-password' : model.getSettings('form.autocomplete', 'off')"
            :type="field.isPassword() ? 'password' : 'text'"
            :name="name"
            :value="value"
            :maxlength="field.max"
            :placeholder="field.getPlaceholder()"
            :disabled="field.isDisabled()"
            :readonly="field.isReadonly()"
            @change="changeValue"
            @keyup="changeValue"
        />
    </Field>
</template>

<script>
export default {
    props: ['model', 'name', 'field', 'value'],

    methods: {
        changeValue(e) {
            this.$parent.changeValue(e);
        },
    },
};
</script>
