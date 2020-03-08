import Ajax from './Ajax';
import Pencils from './Pencils';
import Helpers from './Helpers';

var Uploadable = {
    queryKey : 'ca_table_name',
    sizesKey : 'sizes',

    classNameUploadableWrapper : 'CAE_Uploadable_wrapper',

    //File wrapper
    uploadWrapper : null,

    //Key of actual editing file
    imageElement : null,

    boot(){
        this.registerAllImages();
        this.buildUploadWrapper();
        this.bindEvents();
    },

    registerAllImages(){
        var images = document.getElementsByTagName('img');

        for ( var i = 0; i < images.length; i++ ){
            var src = images[i].src;

            if ( src && (src.indexOf('?'+this.queryKey) > -1 || src.indexOf('&'+this.queryKey) > -1) ) {
                this.registerImageElement(images[i]);
            }
        }
    },

    getQueryPart(url, part){
        var parts = url.split(part+'=');

        return parts.length > 1 ? decodeURIComponent(parts[1].split('&')[0]) : null;
    },

    registerImageElement(element){
        var imageUrl = element.src;

        CAEditor.pushPointerElement(element, 'uploadable', {
            defaultUrl : imageUrl,
            onPointerCreate : this.events.onPointerCreate.bind(this),
            onPointerClick : this.events.onPointerClick.bind(this),
        });
    },

    buildUploadWrapper(){
        //If upload input already exists
        if ( this.uploadWrapper ) {
            return;
        }

        var e = document.createElement('input');
            e.type = 'file';
            e.className = this.classNameUploadableWrapper;

        document.getElementsByTagName('body')[0].appendChild(e);

        this.uploadWrapper = e;
    },

    buildRequest(e){
        var data = new FormData(),
            imageUrl = Uploadable.imageElement.getPointerSetting('defaultUrl'),
            sizes = this.getQueryPart(imageUrl, 'sizes');

        data.append('table', this.getQueryPart(imageUrl, this.queryKey));
        data.append('key', this.getQueryPart(imageUrl, 'ca_field_name'));
        data.append('id', this.getQueryPart(imageUrl, 'ca_row_id'));
        data.append(this.getQueryPart(imageUrl, 'ca_field_name'), e.target.files[0]);
        data.append('hash', this.getQueryPart(imageUrl, 'ca_hash'));

        //If resizing is avialable
        if ( sizes ){
            data.append('sizes', sizes);
        }

        return data;
    },

    bindEvents(){
        this.uploadWrapper.addEventListener('change', (e) => {
            //Reset actual image key
            if ( e.target.files.length == 0 ){
                Uploadable.imageElement = null;
            }

            var pointer = Uploadable.imageElement._CAPencil;

            //Remove previous success state
            Helpers.removeClass(pointer, Pencils.classNameSaved);

            //Add loading class
            Helpers.addClass(pointer, Pencils.classNameLoading);
            Uploadable.imageElement.style.opacity = 0.5;

            var data = this.buildRequest(e);

            var resetLoading = (img) => {
                //Remove loading class
                Helpers.removeClass(img._CAPencil, Pencils.classNameLoading);

                //Reset image element
                img.style.opacity = 1;
            };

            Ajax.post(CAEditor.config.requests.updateImage, data, {
                success : (response) => {
                    this.updateImagesWithSameSrc(response, Uploadable.imageElement);

                    //Add green state
                    Helpers.addClass(pointer, Pencils.classNameSaved);

                    //When image will be loaded, reset loader state
                    Uploadable.imageElement.onload = (e) => {
                        resetLoading(e.target);
                    }

                    Uploadable.imageElement = null;
                },
                error : (response) => {
                    //Add red pointer color
                    Helpers.addClass(pointer, Pencils.classNameError);

                    //Reset loading and image
                    resetLoading(Uploadable.imageElement);
                    Uploadable.imageElement = null;
                }
            })
        });
    },

    //Update all images with same source image
    updateImagesWithSameSrc(response, image){
        CAEditor.allMatchedElements('uploadable').forEach(item => {
            if ( item.getPointerSetting('defaultUrl') == image.getPointerSetting('defaultUrl') ) {
                item.src = response.responseJSON.url;

                //We want remove srcset attribute
                if ( item.srcset ) {
                    item.removeAttribute('srcset');
                }
            }
        })
    },

    events : {
        onPointerCreate(pointer, element){
            Helpers.addClass(pointer, Pencils.classNameImage)
        },
        onPointerClick(element, pointer){
            var e = document.createEvent('MouseEvents');
                e.initEvent('click', false, true);

            //Set actual key image
            Uploadable.imageElement = element;

            //Dispatch upload
            this.uploadWrapper.dispatchEvent(e);
        }
    }
}

export default Uploadable;