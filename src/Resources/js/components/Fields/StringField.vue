<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <input
            class="form-control"
            :autocomplete="isPassword ? 'new-password' : model.getSettings('form.autocomplete', 'off')"
            :type="isPassword ? 'password' : 'text'"
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

        computed : {
            isPassword(){
                return this.field.type == 'password';
            },
        },

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>