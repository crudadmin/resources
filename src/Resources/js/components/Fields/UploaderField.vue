<template>
    <div class="form-group" :class="{ disabled : disabled }" data-toggle="tooltip" :title="field.tooltip" @dragenter="onFileDrop">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field_name }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="hidden" :name="field_key" :value="uuid">

        <div class="file-manager" @click="openManager">
            <span>{{ __('Otvoriť správcu súborov') }}</span>
        </div>
    </div>
</template>

<script>
import FileManagerModal from '@components/Modal/FileManagerModal';

export default {
    props: ['id', 'model', 'field_name', 'field_key', 'field_key_original', 'field', 'value', 'required', 'disabled', 'depth_level', 'langslug'],

    data(){
        return {
            uuid : this.generateUuid(),
        };
    },

    methods : {
        onFileDrop(){
            this.openManager();
        },
        openManager(){
            let parts = [
                this.model.table,
                this.field_key_original,
                (this.model.getRow()?.id||this.uuid)
            ];

            this.openModal({
                title : this.field.name,
                class : '--wide --fileManager',
                component : {
                    name : 'FileManagerModal',
                    component : FileManagerModal,
                    props : {
                        url : window.crudadmin.baseURL + '/filemanager?type=models/'+parts.join('/'),
                    },
                }
            });
        }
    },
}
</script>

<style lang="scss">
@import '@sass/_variables.scss';

.file-manager {
    font-size: 1.4rem;
    border: 2px dashed #ddd;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $blackText;
    cursor: pointer;
}
</style>