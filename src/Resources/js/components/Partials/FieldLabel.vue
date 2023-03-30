<template>
<label v-if="field" v-show="field.label.visible">
    <i v-if="field.locale" class="fa --label--icon fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>

    <i
        v-if="model.history && model.isOpenedRow()"
        @click="model.showFieldHistory(model.getRow(), field_key)"
        class="fa --label--icon --pointer fa-history"
        data-toggle="tooltip"
        :title="__('Zobraziť zmeny v histórii')">
    </i>

    {{ field.getName() }}

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

<style lang="scss" scoped>
i.--label--icon { font-size: 12px; margin-right: 3px; }
i.--pointer { cursor: pointer; }
</style>