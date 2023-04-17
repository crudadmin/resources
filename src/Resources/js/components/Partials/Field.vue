<template>
<div class="form-group" :class="{ disabled : field.isReadonly() }" data-toggle="tooltip" :title="field.tooltip">
    <FieldLabel :field="field" v-if="label" />

    <slot/>

    <small v-if="title">{{ field.title }}</small>

    <slot name="end"/>
</div>
</template>

<script type="text/javascript">
export default {
    props : {
        field : {
            type : Object,
            required : true,
        },
        label : {
            default : true,
        },
        title : {
            default : true,
        }
    },

    computed : {
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