<template>
    <div class="form-group" :class="{ disabled : disabled || readonly }" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i> {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>
        <textarea
            rows="5"
            @keyup="changeValue"
            :id="id"
            :data-height="field.editor_height"
            :disabled="disabled"
            :readonly="readonly"
            :name="field_key"
            :maxlength="field.max"
            :class="{ 'form-control' : isText, 'js_editor' : isEditor }"
            :placeholder="field.placeholder || field_name"
            :value="value">
        </textarea>
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['id', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'depth_level'],

        mounted(){
            var editor = $('#'+this.id).ckEditors();

            //On update ckeditor
            if ( this.isEditor )
            {
                CKEDITOR.instances[this.id].on('change', e => {
                    this.$parent.changeValue(null, e.editor.getData())
                });
            }

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                //After change value, update same value in ckeditor
                if ( ! this.isEditor )
                    return;

                var editor = CKEDITOR.instances[this.id];

                if ( ! editor )
                    return;

                var value = this.$parent.getValueOrDefault;

                editor.setData(value);

                // If is editor not ready yet, then wait for ready state.
                // We need set data also on instance ready, because of bug in single admin model when switching pages...
                // Somethimes data wont be loaded properly.
                editor.on('instanceReady', () => {
                    //If multiple ready events will be triggered, bing only last valid value from event.
                    //If all events will be binded into ckeditor at same time. It may have buggy value.
                    if ( this.onReadyInstance ){
                        clearTimeout(this.onReadyInstance);
                    }

                    this.onReadyInstance = setTimeout(() => {
                        if ( _.trim(editor.getData()) != _.trim(value) ) {
                            editor.setData(value);
                        }
                    }, 20);
                });
            });
        },

        destroyed(){
            eventHub.$off('updateField', this.onUpdateEvent);
        },

        computed: {
            isText(){
                return ['text', 'longtext'].indexOf(this.field.type) > -1;
            },
            isEditor(){
                return ['editor', 'longeditor'].indexOf(this.field.type) > -1;
            },
        },

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>