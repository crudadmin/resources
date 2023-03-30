<template>
    <Field :field="field">
        <div class="file-group">
            <div class="upload-file-wrapper">
                <input ref="fileInput" :disabled="field.isDisabled()" type="file" :multiple="isMultipleUpload" :name="isMultipleUpload ? name + '[]' : name" @change="addFile" class="form-control" :placeholder="field.getPlaceholder()">
                <input v-if="!value && file_will_remove == true" type="hidden" :name="'$remove_'+name" :value="1">

                <button
                    v-if="canFileBeDeleted"
                    @click.prevent="removeFile"
                    type="button"
                    class="btn btn-danger remove-file"
                    data-toggle="tooltip"
                    title=""
                    :data-original-title="trans('delete-file')">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>

            <div v-show="(isMultiple && !isMultirows) && getFiles.length > 0">
                <select ref="multipleFiles" :name="(field.hasLocale() || (isMultiple && !isMultirows) && getFiles.length > 0) ? '$uploaded_'+name+'[]' : ''" data-placeholder=" " multiple>
                    <option :key="file" selected v-for="file in getFiles">{{ file }}</option>
                </select>
            </div>
        </div>

        <template v-slot:end>
            <span v-if="canFileBeDownloaded">
                <file :file="value" :field="field_key" :model="model" :thumbnail="false"></file>
            </span>
        </template>
    </Field>
</template>

<script>
    import File from '../Partials/File.vue';

    export default {
        props: ['id', 'model', 'name', 'field_key', 'field', 'value', 'depth_level', 'langslug'],

        components : { File },

        data(){
            return {
                file_will_remove : false,
                file_from_server : true,
            };
        },

        mounted(){
            this.addMultipleFilesSupport(true);

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                this.file_from_server = true;

                this.addMultipleFilesSupport();
            });

            eventHub.$on('onSubmit', this.onSubmitEvent = data => {
                var row = data.row;

                if ( data.table != this.model.slug || data.depth_level != this.depth_level )
                    return;

                if ( this.file_from_server == true && row != null )
                    return;

                this.file_from_server = row ? true : false;

                this.field.value = row ? row[this.field_key] : '';

                //Reset input value after file has been sent
                $(this.$refs.fileInput).val('');
            });
        },

        destroyed(){
            eventHub.$off('updateField', this.onUpdateEvent);
            eventHub.$off('onSubmit', this.onSubmitEvent);
        },

        computed: {
            canFileBeDeleted(){
                return !this.field.isDisabled()
                    && (this.value && !this.isMultipleUpload || !this.file_from_server)
                    && this.model.getSettings('fields.'+this.field_key+'.canDelete', true);
            },
            canFileBeDownloaded(){
                return (this.value && !this.hasMultipleFilesValue && this.file_from_server && !this.isMultiple)
                    && this.model.getSettings('fields.'+this.field_key+'.canDownload', true);
            },
            isMultiple(){
                return this.field.multiple === true;
            },
            isMultirows(){
                return this.field.multirows && this.field.multirows === true;
            },
            isMultipleUpload(){
                return (this.isMultirows && !this.model.isOpenedRow()) || this.isMultiple;
            },
            hasMultipleFilesValue(){
                return $.isArray(this.field.value);
            },
            getFiles(){
                var value = this.value;

                if ( ! value )
                    return [];

                if ( $.isArray(value) )
                    return value;

                return [ value ];
            },
        },

        methods : {
            changeValue(e){
                this.$parent.changeValue(e);
            },
            addMultipleFilesSupport(onInitialize){
                //Update multiple files upload
                if ( this.field.type == 'file' && this.isMultiple && !this.isMultirows ){
                    let chosen = $(this.$refs.multipleFiles).chosen({
                        disable_search_threshold: 10,
                        search_contains : true
                    }).trigger('chosen:updated');
                }

                //On update value
                if ( onInitialize == true )
                {
                    this.$watch('field.value', () => {
                        this.$nextTick(() => {
                            $(this.$refs.multipleFiles).trigger('chosen:updated');
                        });
                    });

                    //We want add ability to open uploaded files.
                    $(this.$refs.multipleFiles).parent().on('click', 'li.search-choice span', e => {
                        let downloadPath = this.model.getUploadsUrl(this.field_key, e.target.innerText);

                        window.open(downloadPath);
                    });
                }
            },
            removeFile(){
                if ( ! this.isMultiple ){
                    if ( this.field.hasLocale() ) {
                        this.field.value[this.langslug] = null;
                    } else {
                        this.field.value = null;
                    }
                }

                this.file_will_remove = true;
                this.file_from_server = true;

                this.$refs.fileInput.value = null;
            },
            addFile(e){
                this.file_will_remove = false;
                this.file_from_server = false;
            },
        },
    }
</script>