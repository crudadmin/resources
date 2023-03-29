<template>
    <div class="form-group" :class="{ disabled : disabled }">
        <FieldLabel class="checkbox" data-toggle="tooltip" :title="field.tooltip" :model="model" :field="field" :field_key="field_key">
            <span class="checkbox__name" v-if="field.placeholder">{{ field.placeholder }}</span>

            <input
                type="checkbox"
                class="ios-switch green"
                value="1"
                @change="changeValue"
                :disabled="disabled"
                :checked="value == 1"
                :name="name">
            <div><div></div></div>
        </FieldLabel>

        <small>{{ field.title }}</small>
    </div>

</template>

<script>
    export default {
        props: ['model', 'name', 'field_key', 'field', 'value', 'disabled'],

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>