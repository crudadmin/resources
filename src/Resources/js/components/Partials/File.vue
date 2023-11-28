<template>
    <div>
        <a v-if="isImage(file) && thumbnail == true" :href="path" data-lightbox="gallery" title=""><img v-bind:src="imagePath" alt=""></a>
        <a v-else-if="isImage(file)" :href="path" data-lightbox="gallery" title="">{{ trans('show-image') }}</a>
        <a v-else-if="isPdf(file)" :href="path" target="_blank" title="">{{ trans('show') }} PDF</a>
        <a v-else-if="isZip(file)" :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download') }} ZIP</a>
        <a v-else-if="isDoc(file)" :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download-document') }}</a>
        <a v-else :href="model.getDownloadUrl(field, file)" target="_blank" title="">{{ trans('download-file') }}</a>
    </div>
</template>

<script>
import { isExtension, isEncrypted } from '@/js/utils/helpers.js';

export default {
    props: {
        file : {},
        field : {},
        model : {},
        thumbnail : {
            default : true
        },
    },

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
        }
    },
    computed : {
        imagePath(){
            //Svg does not have thumbnails
            if ( isExtension(this.file, ['svg']) ){
                return this.path;
            }

            let c = window.crudadmin;

            return c.root + '/'+c.cache_path+'/' + this.model.slug + '/' + this.field + '/admin-thumbnails/' + this.file;
        },
        path(){
            //Encrypted files return as laravel download route.
            return this.model.getUploadsUrl(this.field, this.file);
        }
    }
}
</script>