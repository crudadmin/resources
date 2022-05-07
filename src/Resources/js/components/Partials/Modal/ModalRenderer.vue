<template>
<div>
    <component
        v-for="item in modalsComponents"
        :is="item.is"
        :key="item.modal.openedAt"
        :modal="item.modal"
        v-bind="item.props">
    </component>
</div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

export default {
    computed : {
        ...mapState('modal', ['modals']),
        modalsComponents(){
            return this.modals.map(modal => {
                return {
                    is : this.isModalWrapper(modal) ? modal.component.component : 'Modal',
                    modal,
                    props : {
                        ...(modal.component?.props||{})
                    }
                }
            });
        }
    },
    methods : {
        isModalWrapper(modal){
            let props = (modal.component?.component?.props||[]),
                key = 'modal';

            if ( _.isArray(props) ){
                return props.includes(key);
            } else if ( _.isObject(props) ){
                return key in props;
            }
        }
    }
}
</script>