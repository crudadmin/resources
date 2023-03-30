<template>
    <div class="form-group" :class="{ disabled : field.isReadonly() }" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <textarea
            rows="5"
            @keyup="changeValue"
            :id="id"
            :data-height="field.editor_height"
            :disabled="field.isDisabled()"
            :readonly="field.isReadonly()"
            :name="name"
            :maxlength="field.max"
            :class="{ 'form-control' : field.isText(), 'js_editor' : field.isEditor() }"
            :placeholder="field.getPlaceholder()"
            :value="value">
        </textarea>
        <small>{{ field.title }}</small>
    </div>
</template>

<script>
    export default {
        props: ['id', 'model', 'name', 'field_key', 'field', 'value', 'depth_level'],

        mounted(){
            var editor = $('#'+this.id).ckEditors();

            //On update ckeditor
            if ( this.field.isEditor() )
            {
                CKEDITOR.instances[this.id].on('change', e => {
                    this.$parent.changeValue(null, e.editor.getData())
                });
            }

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                //After change value, update same value in ckeditor
                if ( ! this.field.isEditor() )
                    return;

                var editor = CKEDITOR.instances[this.id];

                if ( ! editor )
                    return;

                var value = this.$parent.getLocalizedValue(this.field.value) || '';

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

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
        },
    }
</script>