import Pencils from './Editor/Pencils';
import Helpers from './Editor/Helpers';
import Editor from './Editor/Editor';
import Ajax from './Editor/Ajax';
import Navigation from './Editor/Navigation';
import Translatable from './Editor/Translatable';
import Uploadable from './Editor/Uploadable';

/*
 * CrudAdmin auto translatable
 */
(function(){
    window.CAEditor = {
        //Boot state
        state : false,

        //Config
        config : window.CAEditorConfig,

        //Translatable class
        translatable : Translatable,

        uploadable : Uploadable,

        //All elementws with assigned pencil
        matchedElements : [],

        //Pencils feature
        pencils : Pencils,

        //On editor initialization
        init(TAObject){
            Navigation.init();

            //Editor is not allowed
            if ( CAEditor.config.active === false ) {
                return;
            }

            this.boot(TAObject);

            this.state = true;
        },

        //On First boot
        boot(TAObject){
            //Boot translations
            Translatable.bootTranslates(TAObject);
            Uploadable.boot();

            //Boot pencils
            this.pencils.init();
        },

        enable(){
            //If editor has been booted already, pencils are just hidden, so we need show them.
            if ( this.config.active === true ) {
                Pencils.showAllPencils();

                this.state = true;

                //Send ajax that state is on
                this.ajax.post(this.config.requests.changeState, { state : true });
            } else {
                //We need set active/boot status to true
                this.config.active = true;

                //Turn on state and get the newest translates with all raw texts
                this.ajax.post(this.config.requests.changeState, {
                    state : true,
                    response : true,
                }, (response) => {
                    this.boot(eval(response.response));
                })
            }
        },
        toggle(){
            if ( this.state === false ) {
                this.enable();
            } else {
                this.destroy();
            }
        },
        destroy(){
            Pencils.hideAllPencils();
            Editor.turnOffAllEditors();
            this.state = false;

            //Turn of state
            this.ajax.post(this.config.requests.changeState, {
                state : false,
            });
        },
        refresh(){
            Translatable.getTranslatableElements();
            this.pencils.refresh();
        },
        pushPointerElement(element, type, settings){
            //Element has pointer already
            if ( element.hasPointer ) {
                return;
            }

            //Register that this element has pointer already
            element.hasPointer = true;

            //Bind pointer settings
            element._pointerSettings = {
                type,
            };

            //Get pointer settings
            element.getPointerSetting = function(key){
                return this._pointerSettings[key];
            }

            //set pointer settings
            element.setPointerSetting = function(key, value){
                this._pointerSettings[key] = value;
            }

            //Bind additional pointer settings
            for ( var key in settings ){
                element.setPointerSetting(key, settings[key]);
            }

            //Register pointer element
            this.matchedElements.push(element);
        },
        ajax : Ajax,

        //Returns matched elements by given type
        allMatchedElements(type){
            var elements = [];

            for ( var i = 0; i < this.matchedElements.length; i++ ) {
                if ( this.matchedElements[i].getPointerSetting('type') == type ){
                    elements.push(this.matchedElements[i]);
                }
            }

            return elements;
        }
    };

    window.addEventListener('load', () => {
        CAEditor.init(window.CATranslates);
    });
})();