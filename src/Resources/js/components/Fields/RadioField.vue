<template>
    <div class="form-group radio-group" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <div class="radio" v-if="!field.isRequired()">
            <label>
                <input type="radio" :name="name" value="">
                {{ trans('no-option') }}
            </label>
        </div>

        <div class="radio" v-for="data in field.options">
            <label>
                <input type="radio" @change="changeValue" :name="name" :checked="hasValue(data[0], value)" :value="data[0]">

                {{ data[1] }}
            </label>
        </div>
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['model', 'name', 'field_key', 'field', 'value', 'disabled'],

        computed : {
            isPassword(){
                return this.field.type == 'password';
            },
        },

        methods : {
            hasValue(key, value, multiple)
            {
              return (key || key == 0) && value && key == value;
            },
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>