import Ajax from './Ajax';
import Pencils from './Pencils';
import Helpers from './Helpers';

var Uploadable = {
    queryKey : 'ca_img_key',
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

        return parts.length > 1 ? parts[1].split('&')[0] : null;
    },

    registerImageElement(element){
        var imageUrl = element.src,
            imageKey = this.getQueryPart(imageUrl, this.queryKey),
            imageSizes = this.getQueryPart(imageUrl, this.sizesKey);

        CAEditor.pushPointerElement(element, 'uploadable', {
            imageKey,
            imageSizes,
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

    bindEvents(){
        this.uploadWrapper.addEventListener('change', (e) => {
            //Reset actual image key
            if ( e.target.files.length == 0 ){
                Uploadable.imageElement = null;
            }

            //Add loading class
            Helpers.addClass(Uploadable.imageElement._CAPencil, Pencils.classNameLoading);
            Uploadable.imageElement.style.opacity = 0.5;

            var data = new FormData(),
                sizes = Uploadable.imageElement.getPointerSetting('imageSizes');

                data.append('key', Uploadable.imageElement.getPointerSetting('imageKey'));
                data.append('image', e.target.files[0]);

                //If resizing is avialable
                if ( sizes ){
                    data.append('sizes', sizes);
                }

            Ajax.post(CAEditor.config.requests.updateImage, data, {
                success(response){
                    Uploadable.imageElement.src = response.response;

                    ((img) => {
                        img.onload = () => {
                            //Remove loading class
                            Helpers.removeClass(img._CAPencil, Pencils.classNameLoading);

                            //Reset image element
                            img.style.opacity = 1;
                        }
                    })(Uploadable.imageElement);

                    Uploadable.imageElement = null;;
                }
            })
        });
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