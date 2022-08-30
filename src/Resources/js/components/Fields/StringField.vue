<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>
        <input
            class="form-control"
            :autocomplete="isPassword ? 'new-password' : model.getSettings('form.autocomplete', 'off')"
            :type="isPassword ? 'password' : 'text'"
            :name="field_key"
            :value="value"
            :maxlength="field.max"
            :placeholder="field.placeholder || field_name"
            :disabled="disabled"
            :readonly="readonly"
            @change="changeValue"
            @keyup="changeValue">
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],

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