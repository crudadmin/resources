<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <div class="colors-wrapper" :key="rowId">
            <verte
                ref="verte"
                :key="verteKey"
                picker="square"
                model="hex"
                :value="value||'#000000'"
                @input="changeVerteValue"
                :rgbSliders="false"
                :enableAlpha="false"
                :showHistory="null"
                :draggable="false">
                    <svg viewBox="0 0 24 24" @click.prevent="openVerte">
                      <path d="M0 20h24v4H0z"/>
                      <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
                    </svg>
                </verte>

            <div class="input-color-wrapper">
                <input
                    class="form-control"
                    type="text"
                    @click.prevent="openVerte"
                    :name="name"
                    :value="value"
                    :maxlength="field.max"
                    :placeholder="field.getPlaceholder()"
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
    props: ['model', 'field_key', 'name', 'field', 'value', 'disabled', 'readonly'],

    components: { Verte },

    data(){
        return {
            verteKey : 0,
        };
    },

    methods : {
        changeVerteValue(color){
            this.$parent.changeValue(null, color);
        },
        openVerte(){
            this.verteKey = parseInt(Math.random() * 1000);

            setTimeout(() => {
                $(this.$refs.verte.$el).find('button')[0].click();
            }, 50);
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