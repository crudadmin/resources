<template>
    <Field :field="field" :label="false">
        <FieldLabel class="checkbox" data-toggle="tooltip" :title="field.tooltip" :model="model" :field="field" :field_key="field_key">
            <span class="checkbox__name" v-if="field.placeholder">{{ field.placeholder }}</span>

            <input
                type="checkbox"
                class="ios-switch green"
                value="1"
                @change="changeValue"
                :disabled="field.isDisabled()"
                :checked="value == 1"
                :name="name">
            <div><div></div></div>
        </FieldLabel>
    </Field>

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