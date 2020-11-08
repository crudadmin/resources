var canPassEventThrough = (event, data, component) => {
    if ( ['getParentRow'].indexOf(event) > -1 ) {
        var componentDepthLevel = component.$parent.depth_level||component.$parent.$parent.depth_level;

        //Does not receive events into component which are not from parent rows.
        if ( data.depth_level !== undefined && data.depth_level > componentDepthLevel ) {
            return false;
        }
    }

    return true;
};

var eventDataModifier = (event, data, component) => {
    if ( event == 'sendParentRow' ){
        data = { depth_level : component.$parent.depth_level };
    }

    return data;
};

var componentMixins = {
    methods: {
        //Get parent model builder
        getModelBuilder(slug, except){
            var modelBuilder = this.$parent,
                except = slug === '$parent' ? this.model.slug : null,
                slug = slug === '$parent' ? null : slug;

            while(
                modelBuilder && (
                    modelBuilder.$options.name != 'model-builder'
                    || (slug && modelBuilder.model.slug != slug)
                    || (except && modelBuilder.model.slug === except)
                )
            ) {
                modelBuilder = modelBuilder.$parent;
            }

            if ( slug && (!modelBuilder || modelBuilder.model.slug != slug) ){
                console.error('Model with table name "' + slug + '" does not exists in parents tree of models');

                return null;
            }

            return modelBuilder;
        },
        registerFieldComponents(model, field, attribute){
            if ( !field || !(attribute in field) ) {
                return;
            }

            var components = field[attribute].split(','),
                component = null;

            for ( var i = 0; i < components.length; i++ ) {

                var name = components[i].toLowerCase(),
                    data = model.components[name],
                    obj;

                if ( ! data ){
                    continue;
                }

                try {
                    obj = this.getComponentObject(data);
                } catch(error){
                    console.error('Syntax error in component '+(components[i])+'.Vue' + "\n", error);
                    continue;
                }

                if ( ! component )
                    component = obj;
                else {
                    if ( !('components' in component) ){
                        component.components = {};
                    }

                    component.components[components[i]] = obj;
                }
            }

            //Register component
            if ( component ) {
                Vue.component(
                    this.componentName(model, field[attribute]),
                    component
                );
            }
        },
        componentName(model, name){
            if ( ! name ){
                return;
            }

            var component,
                parts = name.split(',').filter(item => item),
                lowecase = parts[0].toLowerCase();

            if ( lowecase in model.components ){
                component = lowecase;
            } else {
                component = parts[0];
            }

            if ( component ) {
                let globalComponent = Vue.options.components[component];

                //If component does exists, we need rewrite this component with crudadmin helpers
                if ( globalComponent && globalComponent.options){
                    this.getComponentObject(globalComponent.options);
                }
            }

            return component;
        },
        getComponentObject(data){
            var obj;

            //If string component has been given
            if ( typeof data == 'string' ) {
                obj = (new Function('return '+data))();
            } else {
                obj = data;
            }

            //If object is already CA component
            if ( obj.$CA == true ){
                return;
            }

            //Identifiy component as crudadmin component
            obj.$CA = true;

            //If template is missing, render empty div
            if ( ! obj.template && !obj.__file ) {
                obj.template = '<div></div>';
            }

            //Fixed backwards compacitibility for vuejs1 components
            if ( obj.ready && !obj.mounted ) {
                obj.mounted = obj.ready;
            }

            obj.created = _.castArray(obj.created);
            obj.destroyed = _.castArray(obj.destroyed);

            var proxyEventsResend = ['sendRow', 'sendParentRow', 'reloadRows'],
                proxyEventsReceive = ['getRow', 'getParentRow', 'onCreate', 'onUpdate', 'onSubmit', 'buttonAction', 'changeFormSaveState', 'selectHistoryRow'],
                events = {};

            //Extend created method
            obj.created = [
                function() {
                    //This events should be resend from component to eventHub
                    for ( var key in proxyEventsResend ) {
                        ((event) => {
                            this.$on(event, events[event] = (data) => {
                                eventHub.$emit(event, eventDataModifier(event, data, this));
                            });
                        })(proxyEventsResend[key]);
                    }

                    //This events should be received from evnentHub and send to component
                    for ( var key in proxyEventsReceive ) {
                        ((event) => {
                            eventHub.$on(event, events[event] = (data) => {
                                if ( canPassEventThrough(event, data, this) ) {
                                    this.$emit(event, data);
                                }
                            });
                        })(proxyEventsReceive[key]);
                    }
                },
                ...obj.created,
            ];

            obj.destroyed = [
                function(){
                    //Unmount eventhub proxy
                    for ( var key in proxyEventsReceive ) {
                        ((event) => {
                            eventHub.$off(event, events[event]);
                        })(proxyEventsReceive[key]);
                    }
                },
                ...obj.destroyed,
            ];

            return obj;
        }
    },
};

export default componentMixins;