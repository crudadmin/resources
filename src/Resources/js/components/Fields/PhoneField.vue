<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>

        <vue-tel-input
            :value="field.value || ''"
            :disabled="disabled"
            placeholder="Pridajte nové..."
            @input="changeValue"
            :preferredCountries="['sk', 'cz', 'hu', 'pl', 'au', 'at', 'ch', 'fr', 'de']"
            :autoDefaultCountry="false"
            mode="international"
            defaultCountry="sk"
            :validCharactersOnly="true"
            :dropdownOptions="{
                width: '300px',
                showFlags: true,
                showSearchBox: true,
                showDialCodeInList: true,
            }"
            :inputOptions="{
                name: field_key,
                placeholder: __('Vložte tel. číslo'),
            }"
        ></vue-tel-input>
    </div>
</template>
<script type="text/javascript">
import { VueTelInput } from 'vue-tel-input';

export default {
    props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],

    data() {
        return {};
    },

    components: {
        VueTelInput,
    },

    computed: {},

    methods: {
        changeValue(value) {
            console.log(value);
            this.$parent.changeValue(null, value);
        }
    },
};
</script>
