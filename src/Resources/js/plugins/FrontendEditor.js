import Pencils from './Editor/Pencils';
import Helpers from './Editor/Helpers';
import Editor from './Editor/Editor';
import Ajax from './Editor/Ajax';
import Navigation from './Editor/Navigation';
import Translatable from './Editor/Translatable';
import Uploadable from './Editor/Uploadable';
import Linkable from './Editor/Linkable';
import Editable from './Editor/Editable';

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

        //Uploadable class
        uploadable : Uploadable,

        //Linkable class
        linkable : Linkable,

        //Editable class
        editable : Editable,

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
        },

        //On First boot
        boot(TAObject, onAjax){
            //Boot translations
            Translatable.boot(TAObject, onAjax);

            //Boot uploadable
            Uploadable.boot();

            //Boot linkable
            Linkable.boot();

            //Editable content
            Editable.boot();

            //Boot pencils
            this.pencils.init();

            this.state = true;
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
                    var JSONObject = eval(response.response);

                    this.boot(JSONObject, true);
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
        refresh(refreshDOM){
            if ( refreshDOM === true ){
                this.isRefreshedDom = true;
            }

            //We can refresh editor only one per second
            if ( this.refreshingState ){
                clearTimeout(this.refreshingState);
            }

            this.refreshingState = setTimeout(() => {
                //If dom has been changed, we want reload all existing translates.
                if ( this.isRefreshedDom === true ) {
                    Translatable.getTranslatableElements();

                    this.isRefreshedDom = false;
                }

                this.pencils.refresh();
            }, 1000);
        },
        registerPointerProperties(element, type, settings){
            if ( !element.hasPointer ) {
                element.hasPointer = [];
            }

            if ( !element._pointerSettings ) {
                element._pointerSettings = {};
            }

            //Get pointer settings
            if ( !element.getPointerSetting ) {
                element.getPointerSetting = function(key, type){
                    if ( !this._pointerSettings || !this._pointerSettings[type] ){
                        return;
                    }

                    return this._pointerSettings[type][key];
                }
            }

            //Get pointer settings
            if ( !element.getAllPointerSetting ) {
                element.getAllPointerSetting = function(key, type){
                    var items = [];

                    for ( var k in this._pointerSettings ) {
                        if ( key in this._pointerSettings[k] ) {
                            if ( !type || type == k ) {
                                items.push(this._pointerSettings[k][key]);
                            }
                        }
                    }

                    return items;
                }
            }

            //Get pointer settings
            if ( !element.getPointerSettings ) {
                element.getPointerSettings = function(){
                    return this._pointerSettings;
                }
            }

            //set pointer settings
            if ( !element.setPointerSetting ) {
                element.setPointerSetting = function(key, value, type){
                    this._pointerSettings[type][key] = value;
                }
            }

            //set pointer settings
            if ( !element.setPointerSettings ) {
                element.setPointerSettings = function(type, settings){
                    for ( var key in settings ){
                        element.setPointerSetting(key, settings[key], type);
                    }
                }
            }

            //Register that this element has given pointer type
            element.hasPointer.push(type);

            //Bind pointer settings
            element._pointerSettings[type] = {};

            if ( settings ) {
                //Bind additional pointer settings
                element.setPointerSettings(type, settings);
            }
        },
        pushPointerElement(element, type, settings){
            //Element has pointer already
            if ( element.hasPointer && element.hasPointer.indexOf(type) > -1 ) {
                return;
            }

            //Register missing pointer properties
            else {
                this.registerPointerProperties(element, type, settings);
            }

            //Register pointer element
            if ( this.matchedElements.indexOf(element) === -1 ) {
                this.matchedElements.push(element);
            }
        },
        ajax : Ajax,

        //Returns matched elements by given type
        allMatchedElements(searchByType){
            if ( ! searchByType ){
                return this.matchedElements;
            }

            var elements = [];

            for ( var i = 0; i < this.matchedElements.length; i++ ) {
                if ( searchByType in this.matchedElements[i].getPointerSettings() ){
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