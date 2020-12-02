import config from '../config';
import RequestHelper from './Helpers/RequestHelper';

import RightNavbar from './Partials/RightNavbar.vue';
import Sidebar from './Sidebar/Sidebar.vue';
import Modal from './Partials/Modal.vue';
import ModelHelper from './Helpers/ModelHelper.js';

import { mapState, mapMutations } from 'vuex';

const BaseComponent = (router, store) => {
    return {
        el: '#app',
        router,
        store,
        data : function(){
            return {
                mobile_menu : false,
                csrf_token: null,
                version : null,
                version_resources : null,
                version_assets : null,
                gettext : null,
                locale : null,
                dashboard : null,
                license_key : null,
                requests: {},
                user : null,
                tree: [],
                originalModels : {},
                models: {},
                localization: {},
                languages: [],
                admin_languages: [],
                language_id : null,
                languages_active : false,
                alert: {
                    type : null, // success,danger,warning...
                    title : null,
                    message : null,
                    success: null,
                    close: null,
                    component: null,
                    opened : null,
                }
            }
        },

        watch : {
            language_id : function(id){
                localStorage.language_id = id;
            }
        },

        components: { Sidebar, RightNavbar, Modal },

        created(){
            this.reloadCSRFToken($('meta[name="csrf-token"]')[0].content);

            this.bootApp();

            //Set datepickers language
            jQuery.datetimepicker.setLocale(this.locale);
        },

        mounted(){
            this.bootTooltips();
        },

        computed : {
            ...mapState('header', [
                'isActiveMobileMenu',
                'sidebarMenuVisible',
            ]),
            isTest(){
                return this.version.indexOf('test') > -1;
            },
        },

        methods : {
            ...mapMutations('header', [
                'toggleMobileMenu',
            ]),
            setDefaultRoute(){
                if ( router.currentRoute.name == 'dashboard' ) {
                    for ( var key in this.models ) {
                        if ( this.models[key].hasAccess('read') && this.models[key].getSettings('default', false) === true ) {
                            router.push({ name : 'admin-model', params : { model : this.models[key].table } });
                            return;
                        }
                    }
                }
            },
            bootTooltips(){
                $('body').tooltip({
                  selector: "[data-toggle='tooltip']",
                });

                //Destroy tooltips on click
                $('body').on('click', () => {
                    $('[data-toggle="tooltip"]').tooltip('dispose');
                    $('.tooltip.show').remove();
                });
            },
            reloadCSRFToken(token){
                this.csrf_token = token;

                Vue.http.options.headers = {
                    'X-CSRF-TOKEN' : token,
                };

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': token,
                    }
                });
            },
            /*
             * Boot whole app with data from API
             */
            bootApp(){
                //If user is not logged in
                if ( ! window.crudadmin.logged )
                    return;

                this.$http.get(window.crudadmin.baseURL+'/api/layout').then(response => {
                    var layout = response.data;

                    this.version = layout.version;
                    this.version_resources = layout.version_resources;
                    this.version_assets = layout.version_assets;
                    this.gettext = layout.gettext;
                    this.locale = layout.locale;
                    this.dashboard = layout.dashboard;
                    this.license_key = layout.license_key;
                    this.requests = RequestHelper(layout.requests);
                    this.user = layout.user;
                    this.tree = layout.models;
                    this.models = this.flattenModelsWithChilds(layout.models);
                    this.originalModels = this.flattenModelsWithChilds(layout.models);
                    this.localization = layout.localization||{};
                    this.languages = layout.languages||[];
                    this.admin_language = layout.admin_language||{};
                    this.admin_languages = layout.admin_languages||[];

                    this.bootLanguages();
                    this.setDefaultRoute();
                }).catch(error => {
                    this.errorResponseLayer(error);
                });
            },
            /*
             * Get all models from groups tree in flatten list
             */
            getModelsFromGroups(groups, models){
                for ( var key in groups )
                {
                    //Get all models from group
                    if ( key.substr(0, config.groups_prefix.length) == config.groups_prefix )
                    {
                        for ( var subkey in groups[key].submenu )
                        {
                            //Get sub models from subtree
                            if ( subkey.substr(0, config.groups_prefix.length) == config.groups_prefix )
                                models = models.concat(this.getModelsFromGroups(groups[key].submenu[subkey].submenu, models));

                            //Push model into models list
                            else
                                models.push(groups[key].submenu[subkey]);
                        }
                    }

                    //Push model into list
                    else {
                        models.push(groups[key]);
                    }
                }

                return models;
            },
            /*
             * Returns all models also with their childs
             */
            flattenModelsWithChilds(tree){
                var models = {};
                    tree = this.getModelsFromGroups(tree, []);

                for ( var key in tree )
                {
                    if ( typeof tree[key] != 'object' )
                        continue;

                    models[tree[key].slug] = ModelHelper(tree[key]);

                    if ( Object.keys(tree[key].childs).length > 0 )
                        models = _.merge(models, this.flattenModelsWithChilds(tree[key].childs));
                }

                return models;
            },
            bootLanguages(){
                if ( this.languages.length == 0 )
                    return;

                if ( ! ('language_id' in localStorage) || !$.isNumeric(localStorage.language_id) )
                    localStorage.language_id = this.languages[0].id;

                this.language_id = localStorage.language_id;
            },
            //Check for all error response in all requests
            errorResponseLayer(response, code, callback){
                //Fix for jquery response
                if ( 'responseJSON' in response ) {
                    response.data = response.responseJSON;
                }

                //Set response data
                if ( ! response.data && response.body ) {
                    response.data = response.body;
                }

                //If error response comes with some message information, then display it
                if ( response.data && response.data.message && response.data.title && response.data.type ) {
                    return this.$root.openAlert(response.data.title, response.data.message, response.data.type, null, () => {
                        if ( response.status == 401 ) {
                            window.location.href = window.crudadmin.baseURL;
                        }
                    });
                }

                if ( response.status == 404 ) {
                    return this.$root.openAlert(this.trans('warning'), this.trans('row-error'), 'warning');
                }

                //If has been client logged off
                if ( response.status == 401 ) {
                    return this.$root.openAlert(this.trans('warning'), this.trans('auto-logout'), 'warning', null, function(){
                        window.location.reload();
                    });
                }

                //Callback on code
                if ( callback && (code === response.status || code === null) ) {
                    return callback(response);
                }

                //Unknown HTTP error
                if ( response.data.message ) {
                    return this.$root.openAlert('Error ' + response.status, response.data.message, 'error');
                }

                //Unknown error
                this.$root.errorAlert();
            },
            //Check specifics property in model
            getModelProperty(model, key, value){
                if ( ! model ) {
                    return null;
                }

                return model.getModelProperty(key, value);
            },
            /*
            * Returns correct values into multilangual select
            */
            languageOptions(array, field, filter, with_hidden){
                var key,
                    relation,
                    fieldKey,
                    relatedField,
                    matchedKeys,
                    items = [],
                    hasFilter = filter && Object.keys(filter).length > 0;

                //Relation belongsTo/belongsToMany
                if ( field && (relation = field['belongsTo']||field['belongsToMany']) && (fieldKey = relation.split(',')[1]) ){
                    matchedKeys = fieldKey.replace(/\\:/g, '').match(new RegExp(/[\:^]([0-9,a-z,A-Z$_]+)+/, 'g'));
                }

                //Fixed options from option attribute
                if ( field && field.option ){
                    fieldKey = field.option;

                    matchedKeys = fieldKey.replace(/\\:/g, '').match(new RegExp(/[\:^]([0-9,a-z,A-Z$_]+)+/, 'g'));
                }

                loop1:
                for ( var key in array ) {
                    //If select has filters
                    if ( hasFilter ) {
                        for ( var k in filter ) {
                            if ( array[key][1][k] == null ){
                                continue loop1;
                            }

                            //Support for inArray values for belongsToMany
                            if ( filter[k] && typeof filter[k] == 'object' ) {
                                if ( filter[k].indexOf(array[key][1][k]) == -1 ) {
                                    continue loop1;
                                }
                            }

                            //Compare single values key
                            else {
                                if ( array[key][1][k] != filter[k] ) {
                                    continue loop1;
                                }
                            }
                        }
                    }

                    //Build value from multiple columns (multiple fields keys)
                    if ( matchedKeys ) {
                        var value = fieldKey.replace(/\\:/g, ':');

                        for ( var i = 0; i < matchedKeys.length; i++ )
                        {
                            let keyName = matchedKeys[i].substr(1),
                                relatedField = relation ? this.models[relation.split(',')[0]].fields[keyName] : field,
                                optionValue = keyName == 'id' ? array[key][0] : this.getLangValue(array[key][1][keyName], relatedField);

                            value = value.replace(new RegExp(matchedKeys[i], 'g'), !optionValue && optionValue !== 0 ? '' : optionValue);
                        }
                    }

                    //Simple value by one column
                    else {
                        if ( fieldKey ) {
                            relatedField = relation ? this.models[relation.split(',')[0]].fields[fieldKey] : field;
                        }

                        //Get value of multiarray or simple array
                        var value = (
                            typeof array[key][1] == 'object' && array[key][1]!==null ?
                                this.getLangValue(array[key][1][fieldKey], relatedField)
                                : array[key][1]
                        );
                    }

                    //Change undefined values on null values
                    value = value == null ? null : value;

                    var hiddenOptions = field.hiddenOptions||field.optionsFilter;

                    //Skip hidden options
                    if ( hiddenOptions && with_hidden !== false ){
                        if ( typeof hiddenOptions == 'object' && hiddenOptions.indexOf(array[key][0]) > -1 ) {
                            continue;
                        }

                        if ( typeof hiddenOptions == 'function' && hiddenOptions(array[key][0], value, array[key][1]) === false ) {
                            continue;
                        }
                    }

                    items.push([array[key][0], value]);
                }

                return items;
            },
            getLangValue(value, field){
                if ( field && value && typeof value == 'object' && 'locale' in field )
                {
                    if ( this.languages[0].slug in value && (value[this.languages[0].slug] || value[this.languages[0].slug] == 0) )
                        return value[this.languages[0].slug];

                    for ( var key in value )
                    {
                        if ( value[key] || value[key] == 0 )
                            return value[key];
                    }

                    return null;
                }

                return value;
            },
            /*
             * Replace datetime format from PHP to momentjs
             */
            fromPHPFormatToMoment(format){
                var mapObj = { 'd' : 'DD', 'D' : 'ddd', 'j' : 'D', 'l' : 'dddd', 'N' : 'E', 'S' : 'o', 'w' : 'e', 'z' : 'DDD', 'W' : 'W', 'F' : 'MMMM', 'm' : 'MM', 'M' : 'MMM', 'n' : 'M', 't' : '', 'L' : '', 'o' : 'YYYY', 'Y' : 'YYYY', 'y' : 'YY', 'a' : 'a', 'A' : 'A', 'B' : '', 'g' : 'h', 'G' : 'H', 'h' : 'hh', 'H' : 'HH', 'i' : 'mm', 's' : 'ss', 'u' : 'SSS', 'e' : 'zz', 'I' : '', 'O' : '', 'P' : '', 'T' : '', 'Z' : '', 'c' : '', 'r' : '', 'U' : 'X' };

                var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

                return format.replace(re, function(match){
                    if ( match in mapObj )
                        return mapObj[match];

                    return match;
                });
            },
            runInlineScripts(layout){
                $('<div>'+layout+'</div>').find('script').each(function(){
                    //Run external js
                    if ( $(this).attr('src') ){
                        var js = document.createElement('script');
                            js.src = $(this).attr('src');
                            js.type = 'text/javascript';

                        $('body').append(js);
                    }

                    //Run inline javascripts
                    else {
                        try {
                            var func = new Function($(this).html());

                            func.call(Vue);
                        } catch(e){
                            console.error(e);
                        }
                    }
                });

                $('<div>'+layout+'</div>').find('style').each(function(){
                    $('body').append($(this)[0].outerHTML);
                });
            },
            getLangName(lang){
                //If language table is also translatable
                if ( typeof lang.name == 'object' ){
                    return lang.name[Object.keys(lang.name)[0]];
                }

                return lang.name;
            },
        }
    }
};

export default BaseComponent;