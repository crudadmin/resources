<template>
    <Field :field="field">
        <div class="radio" v-if="!field.isRequired()">
            <label>
                <input type="radio" :name="name" value="" :disabled="field.isDisabled()" :readonly="field.isReadonly()" />
                {{ trans('no-option') }}
            </label>
        </div>

        <div class="radio" v-for="data in field.options">
            <label>
                <input
                    type="radio"
                    @change="changeValue"
                    :name="name"
                    :checked="isChecked(data[0])"
                    :value="data[0]"
                    :disabled="field.isDisabled()"
                    :readonly="field.isReadonly()"
                />

                {{ data[1] }}
            </label>
        </div>
    </Field>
</template>

<script>
export default {
    props: ['name', 'field', 'value'],

    methods: {
        isChecked(key) {
            let value = this.value;

            return (key || key == 0) && value && key == value;
        },
        changeValue(e) {
            this.$parent.changeValue(e);
        },
    },
};
</script>
