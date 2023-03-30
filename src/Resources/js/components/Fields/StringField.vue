<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <input
            class="form-control"
            :autocomplete="field.isPassword() ? 'new-password' : model.getSettings('form.autocomplete', 'off')"
            :type="field.isPassword() ? 'password' : 'text'"
            :name="name"
            :value="value"
            :maxlength="field.max"
            :placeholder="field.getPlaceholder()"
            :disabled="disabled"
            :readonly="readonly"
            @change="changeValue"
            @keyup="changeValue">

        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'name', 'field_key', 'field', 'value', 'disabled', 'readonly'],

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>