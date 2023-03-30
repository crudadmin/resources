<template>
    <div class="form-group" :class="{ disabled : field.isReadonly() }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

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
            @keyup="changeValue">

        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'name', 'field_key', 'field', 'value'],

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>