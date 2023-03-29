<template>
<label v-if="field">
    <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>

    {{ model.getFieldName(field) }}

    <span v-if="requiredOptional" class="required">*</span>

    <slot/>
</label>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'field', 'field_key', 'required'],

    computed : {
        requiredOptional(){
            if ( _.isBoolean(this.required) ){
                return this.required;
            }

            return this.model.isFieldRequired(this.field_key);
        }
    }
}
</script>