<template>
    <div>
        <a v-if="isImage(file)" :href="path" data-lightbox="gallery" title=""><img v-bind:src="imagePath" alt=""></a>
        <a v-if="isPdf(file)" :href="path" target="_blank" title="">{{ trans('show') }} PDF</a>
        <a v-if="isZip(file)" :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download') }} ZIP</a>
        <a v-if="isDoc(file)" :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download-document') }}</a>
        <a v-if="isOther(file)" :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download-file') }}</a>
    </div>
</template>

<script>
import { isExtension } from '@/js/utils/helpers.js';

export default {
    props: ['file', 'field', 'model'],

    methods : {
        isImage(path){
            return isExtension(path, ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg']);
        },
        isPdf(path){
            return isExtension(path, ['pdf']);
        },
        isZip(path){
            return isExtension(path, ['zip', 'rar', '7zip', 'gzip', '7z']);
        },
        isDoc(path){
            return isExtension(path, ['doc', 'docx', 'ppt', 'pptx', 'xls', 'txt']);
        },
        isOther(path){
            return !(this.isImage(path) || this.isPdf(path) || this.isZip(path) || this.isDoc(path));
        }
    },
    computed : {
        imagePath(){
            //Svg does not have thumbnails
            if ( isExtension(this.file, ['svg']) ){
                return this.path;
            }

            return window.crudadmin.root + '/uploads/cache/' + this.model.slug + '/' + this.field + '/admin-thumbnails/' + this.file;
        },
        path(){
            return window.crudadmin.root + '/uploads/' + this.model.slug + '/' + this.field + '/' + this.file;
        }
    }
}
</script>