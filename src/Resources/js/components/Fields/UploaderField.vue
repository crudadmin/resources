<template>
    <div class="form-group" :class="{ disabled : disabled }" data-toggle="tooltip" :title="field.tooltip" @dragenter="onFileDrop">
        <FieldLabel :model="model" :field="field" :field_key="field_key" />

        <input type="hidden" :name="name" :value="uuid">

        <div class="file-manager" @click="openManager">
            <span>{{ __('Otvoriť správcu súborov') }}</span>
        </div>
    </div>
</template>

<script>
import FileManagerModal from '@components/Modal/FileManagerModal';

export default {
    props: ['id', 'model', 'name', 'field_key', 'field', 'value', 'disabled', 'depth_level'],

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
                this.field_key,
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