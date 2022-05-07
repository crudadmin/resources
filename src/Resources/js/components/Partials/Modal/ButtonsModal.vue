<template>
    <Modal :modal="modal">
        <component
            v-if="getModalComponent"
            :is="getModalComponent"
            :modal="modal"
            :request="modal.request"
            v-bind="buttonComponent.props||{}" />
    </Modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props : ['modal', 'buttonComponent'],

    data(){
        return {
            registredComponents : [],
        };
    },

    created(){
        //We need add reactive request value on modal close
        Vue.set(this.modal, 'request', {});
    },

    mounted(){
        this.registerButtonComponent(this.buttonComponent.component);
    },

    computed: {
        getModalComponent(){
            let component = this.buttonComponent.component;
            if ( ! component ){
                return;
            }

            if ( this.isGlobalComponent(component) ){
                return component;
            }

            if (this.registredComponents.includes(component)){
                return component;
            }
        },
    },

    methods: {
        registerButtonComponent(component){
            if ( !component ){
                return;
            }

            try {
                let obj = this.getComponentObject(component);

                if ( !this.isGlobalComponent(component) ) {
                    obj.name = obj.name||component;

                    this.$options.components[obj.name] = obj;

                    this.registredComponents.push(obj.name);
                }

            } catch(error){
                console.error('Syntax error in component button component.' + "\n", error);
            }
        },
    }
}
</script>