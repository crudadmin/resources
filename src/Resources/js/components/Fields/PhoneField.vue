<template>
    <Field :field="field">
        <vue-tel-input
            :value="field.value || ''"
            :disabled="field.isDisabled()"
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
                name: name,
                placeholder: __('Vložte tel. číslo'),
            }"
        ></vue-tel-input>
    </Field>
</template>
<script type="text/javascript">
import { VueTelInput } from 'vue-tel-input';

export default {
    props: ['model', 'field_key', 'name', 'field', 'value'],

    data() {
        return {};
    },

    components: {
        VueTelInput,
    },

    computed: {},

    methods: {
        changeValue(value) {
            this.$parent.changeValue(null, value);
        }
    },
};
</script>
