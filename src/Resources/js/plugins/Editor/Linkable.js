import Ajax from './Ajax';
import Pencils from './Pencils';
import Helpers from './Helpers';

var Linkable = {
    querySeparator : '#ca-linkable=',

    boot(){
        //If Linkable is not allowed
        if ( CAEditor.config.Linkable === false ){
            return;
        }

        console.log('booting linkable');

        this.registerAllLinks();
        // this.bindEvents();
    },

    isLinkableUrl(href){
        var parts = href.split(this.querySeparator);

        return parts.length > 1;
    },

    registerAllLinks(){
        var a = document.getElementsByTagName('a');

        //Add support for a href="" a
        for ( var i = 0; i < a.length; i++ ){
            var href = a[i].href;

            if ( this.isLinkableUrl(href) ) {
                this.registerLinkableElement(a[i], href);
            }
        }
    },

    registerLinkableElement(element, url, id){
        var parts = url.split(this.querySeparator);

        CAEditor.pushPointerElement(element, 'linkable', {
            defaultUrl : url,
            rowId : parts[parts.length - 1],
            onPointerCreate : this.events.onPointerCreate.bind(this),
            onPointerClick : this.events.onPointerClick.bind(this),
        });
    },

    updateLink(element, newUrl){
        var data = {
            id : element.getPointerSetting('rowId', 'linkable'),
            url : newUrl
        };

        CAEditor.ajax.post(CAEditor.config.requests.updateLink, data, {
            success(response){
                Helpers.addClass(element._CAPencil, Pencils.classNameSaved);

                Pencils.removeAdditionalPointers(element._CAPencil);

                element.href = response.responseText;
            },
            error(response){
                //Add red pointer color
                Helpers.addClass(element._CAPencil, Pencils.classNameError);
            }
        });
    },

    events : {
        onPointerCreate(pointer, element){
            Helpers.addClass(pointer, Pencils.classNameIcon)
            Helpers.addClass(pointer, Pencils.classNameLinkable)
        },
        onPointerClick(element, pointer){
            var e = document.createEvent('MouseEvents');
                e.initEvent('click', false, true);

            var parts = element.href.split(this.querySeparator),
                url = parts[0],
                newUrl = prompt(CATranslates.texts.updateLink, url);

            Linkable.updateLink(element, newUrl);
        }
    }
}

export default Linkable;