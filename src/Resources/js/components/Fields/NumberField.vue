<template>
    <div class="form-group" :class="{ disabled : disabled }">
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
            :step="isDecimal ? '0.01' : ''"
            :placeholder="field.placeholder || field_name"
            :disabled="disabled"
            @keyup="changeValue">
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled'],

        computed : {
            isDecimal(){
                return this.field.type == 'decimal';
            },
        },

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>