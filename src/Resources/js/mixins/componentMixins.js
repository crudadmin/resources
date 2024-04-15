var canPassEventThrough = (event, data, component) => {
    if (['getParentRow'].indexOf(event) > -1) {
        var componentDepthLevel = component.$parent.depth_level || component.$parent.$parent.depth_level;

        //Does not receive events into component which are not from parent rows.
        if (data.depth_level !== undefined && data.depth_level > componentDepthLevel) {
            return false;
        }
    }

    return true;
};

var eventDataModifier = (event, data, component) => {
    if (event == 'sendParentRow') {
        data = { depth_level: component.$parent.depth_level };
    }

    return data;
};

var componentMixins = {
    methods: {
        getLangName(lang) {
            //If language table is also translatable
            if (typeof lang.name == 'object') {
                return lang.name[Object.keys(lang.name)[0]];
            }

            return lang.name;
        },
        generateUuid() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
                (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
            );
        },
        //Get parent model builder
        getModelBuilder(slug, except) {
            var modelBuilder = this.$parent,
                except = slug === '$parent' ? this.model.slug : null,
                slug = slug === '$parent' ? null : slug;

            while (
                modelBuilder &&
                (modelBuilder.$options.name != 'model-builder' ||
                    (slug && modelBuilder.model.slug != slug) ||
                    (except && modelBuilder.model.slug === except))
            ) {
                modelBuilder = modelBuilder.$parent;
            }

            if (slug && (!modelBuilder || modelBuilder.model.slug != slug)) {
                console.error('Model with table name "' + slug + '" does not exists in parents tree of models');

                return null;
            }

            return modelBuilder;
        },
        registerModelComponents(model, componentNames) {
            if (!componentNames) {
                return;
            }

            var components = (componentNames || '').split(',');

            for (var i = 0; i < components.length; i++) {
                var name = components[i].toLowerCase(),
                    data = model.components[name],
                    component = null,
                    obj;

                if (!data) {
                    continue;
                }

                try {
                    obj = this.getComponentObject(data);
                } catch (error) {
                    console.error('Syntax error in component ' + components[i] + '.Vue' + '\n', error);
                    continue;
                }

                if (!component) component = obj;
                else {
                    if (!('components' in component)) {
                        component.components = {};
                    }

                    component.components[components[i]] = obj;
                }

                //Register component
                if (component) {
                    Vue.component(this.componentName(model, name), component);
                }
            }
        },
        componentName(model, name) {
            if (!name) {
                return;
            }

            var component,
                parts = name.split(',').filter((item) => item),
                lowecase = parts[0].toLowerCase();

            if (lowecase in model.components) {
                component = lowecase;
            } else {
                component = parts[0];
            }

            let globalComponent;
            if (component && (globalComponent = this.isGlobalComponent(component))) {
                this.getComponentObject(globalComponent);
            }

            return component;
        },
        isGlobalComponent(name) {
            //Else try to find global vuejs component
            let globalComponent = Vue.options.components[name];

            if (globalComponent && globalComponent.options) {
                return globalComponent.options;
            }

            return false;
        },
        getComponentObject(data) {
            var obj;

            //If string component has been given
            if (typeof data == 'string') {
                //Try eval given object string
                try {
                    obj = new Function('return ' + data)();
                } catch (e) {
                    //Try global component
                    obj = this.isGlobalComponent(data);
                }
            }

            //Or if object has been given
            else if (typeof data == 'object') {
                obj = data;
            }

            //If object is already CA component
            if (!obj || obj.$CA == true) {
                return obj || null;
            }

            //Identifiy component as crudadmin component
            obj.$CA = true;

            //If template is missing, render empty div
            if (!obj.template && !obj.__file) {
                obj.template = '<div></div>';
            }

            //Fixed backwards compacitibility for vuejs1 components
            if (obj.ready && !obj.mounted) {
                obj.mounted = obj.ready;
            }

            obj.created = _.castArray(obj.created);
            obj.destroyed = _.castArray(obj.destroyed);

            var proxyEventsResend = ['sendRow', 'sendParentRow', 'reloadRows'],
                proxyEventsReceive = [
                    'getRow',
                    'getParentRow',
                    'onCreate',
                    'onUpdate',
                    'onDelete',
                    'onSubmit',
                    'buttonAction',
                    'changeFormSaveState',
                ],
                events = {};

            //Extend created method
            obj.created = [
                function () {
                    //This events should be resend from component to eventHub
                    for (var key in proxyEventsResend) {
                        ((event) => {
                            this.$on(
                                event,
                                (events[event] = (data) => {
                                    eventHub.$emit(event, eventDataModifier(event, data, this));
                                })
                            );
                        })(proxyEventsResend[key]);
                    }

                    //This events should be received from evnentHub and send to component
                    for (var key in proxyEventsReceive) {
                        ((event) => {
                            eventHub.$on(
                                event,
                                (events[event] = (data) => {
                                    if (canPassEventThrough(event, data, this)) {
                                        this.$emit(event, data);
                                    }
                                })
                            );
                        })(proxyEventsReceive[key]);
                    }
                },
                ...obj.created,
            ].filter((f) => f);

            obj.destroyed = [
                function () {
                    //Unmount eventhub proxy
                    for (var key in proxyEventsReceive) {
                        ((event) => {
                            eventHub.$off(event, events[event]);
                        })(proxyEventsReceive[key]);
                    }
                },
                ...obj.destroyed,
            ].filter((f) => f);

            return obj;
        },
        getLocaleFieldValue(value, dslug) {
            if (_.isNil(dslug)) {
                dslug = this.$root.languages.length ? this.$root.languages[0].slug : null;
            }

            if (value && typeof value === 'object') {
                //Get default language value
                if (dslug in value && (value[dslug] || value[dslug] == 0)) {
                    value = value[dslug];
                }

                //Get other available language
                else
                    for (var key in value) {
                        if (value[key] || value[key] === 0) {
                            value = value[key];
                            break;
                        }
                    }

                if (typeof value == 'object') {
                    value = '';
                }
            }

            return value;
        },
    },
};

export default componentMixins;
