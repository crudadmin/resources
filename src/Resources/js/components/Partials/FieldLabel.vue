<template>
<label :class="{ '--hidden' : field.label.visible == false }">
    <div v-show="field.label.visible">
        <i v-if="field.locale" class="fa --label--icon fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>

        <i
            v-if="model.history && model.isOpenedRow() && isEditedField"
            @click="model.showFieldHistory(model.getRow(), field_key)"
            class="fa --label--icon --pointer fa-history"
            data-toggle="tooltip"
            :title="__('Zobraziť zmeny v histórii')">
        </i>

        {{ field.getName() }}

        <span v-if="requiredOptional" class="required">*</span>
    </div>

    <slot/>
</label>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'field', 'field_key', 'required'],

    computed : {
        isEditedField(){
            let editedFields = Object.keys(this.model.getData('history').changed_fields||[]);

            return editedFields.includes(this.field_key);
        },
        requiredOptional(){
            if ( _.isBoolean(this.required) ){
                return this.required;
            }

            return this.field.isRequired();
        }
    }
}
</script>

<style lang="scss" scoped>
.--hidden { display: inline; }
i.--label--icon { font-size: 12px; margin-right: 3px; }
i.--pointer { cursor: pointer; }
</style>