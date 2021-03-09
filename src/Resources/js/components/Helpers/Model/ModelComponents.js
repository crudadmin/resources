var ModelComponents = (Model) => {
    Model.prototype.getComponents = function(type, postfix){
        return this.getData('layouts').filter(item => {
            if ( this.getData('registered_components').indexOf(item.name) === -1 && !Vue.options.components[item.component_name] ) {
                return false;
            }

            return item.position == type;
        }).map(item => {
            //We want register component from custom bundle. With all other events.
            if ( $app.isGlobalComponent(item.component_name) ){
                return $app.componentName(this, item.component_name);
            }

            return this.getComponentName(item.name);
        });
    }

    Model.prototype.getComponentName = function(name, postfix){
        return name + (postfix||'Layout');
    }
};

export default ModelComponents;