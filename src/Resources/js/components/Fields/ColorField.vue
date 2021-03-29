<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>

        <div class="colors-wrapper" :key="rowId">
            <verte
                ref="verte"
                picker="square"
                model="hex"
                :value="value||'#000000'"
                @input="changeVerteValue"
                :rgbSliders="false"
                :showHistory="null"
                :draggable="false"></verte>

            <div class="input-color-wrapper">
                <input
                    class="form-control"
                    type="text"
                    @click="openVerte"
                    :name="field_key"
                    :value="value"
                    :maxlength="field.max"
                    :placeholder="field.placeholder || field_name"
                    :disabled="disabled"
                    :readonly="true">
                <small>{{ field.title }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import Verte from 'verte';
import 'verte/dist/verte.css';

export default {
    props: ['model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly'],

    components: { Verte },

    methods : {
        changeVerteValue(color){
            this.$parent.changeValue(null, color);
        },
        openVerte(){
            $(this.$refs.verte.$el).find('button')[0].click();
        },
    },

    computed:{
        rowId(){
            return this.model.getRow().id||'empty';
        }
    }
}
</script>

<style lang="scss">
.colors-wrapper {
    display: flex;
    align-items: center;

    div.input-color-wrapper {
        margin-left: 10px;
        width: 100%;
    }
}
</style>