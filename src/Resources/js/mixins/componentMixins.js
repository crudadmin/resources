var componentMixins = {
    methods: {
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
                    obj = this.$root.getComponentObject(data);
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

            var parts = name.split(',').filter(item => item),
                lowecase = parts[0].toLowerCase();

            if ( lowecase in model.components ){
                return lowecase;
            }

            return parts[0];
        },
    },
};

export default componentMixins;