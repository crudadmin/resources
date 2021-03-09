<template>
<div v-if="model.getComponents(type, postfix).length">
    <component
        v-for="name in model.getComponents(type, postfix)"
        :key="name"
        :model="model"
        :row="row"
        :rows="rows.data"
        :is="name">
    </component>
</div>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'type', 'postfix'],

    watch: {
        /*
         * Register all layout components
         */
        layouts(layouts){
            for ( var key in layouts ) {
                var layout = layouts[key];

                this.registerComponents(layouts);

                if ( layout.type == 'blade' ){
                    $app.runInlineScripts(layout.view);
                }
            }
        }
    },

    computed: {
        layouts(){
            return this.model.getData('layouts');
        },
        row(){
            return this.model.getData('row');
        },
        rows(){
            return this.model.getData('rows');
        },
        registered_components(){
            return this.model.getData('registered_components');
        },
    },

    methods : {
        registerComponents(layouts){
            for ( var i = 0; i < layouts.length; i++ ) {
                var name = layouts[i].name,
                    data = layouts[i].view,
                    obj;

                if ( layouts[i].type == 'vuejs' ) {
                    try {
                        obj = this.getComponentObject(data);
                    } catch(error){
                        console.error('Syntax error in component ' + layouts[i].name + '.Vue' + "\n", error);
                        continue;
                    }
                }

                //Create blade component
                else {
                    var data = $(data);
                        data.find('script').remove();
                        data.find('style').remove();

                    obj = {
                        template: '<div class="my-component" data-component="'+name+'">'+data.html()+'</div>',
                    };
                }

                if ( obj ) {
                    this.registered_components.push(name);

                    Vue.component(this.model.getComponentName(name, this.postfix), obj);
                }
            }
        },
    }
}
</script>