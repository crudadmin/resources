<template>
    <div>
        <component v-for="modal in modals" :is="getModalRenderer(modal)" :key="modal.openedAt" :modal="modal" v-bind="getModalProps(modal)">
            <!-- IF is regular modal and component is present, we may mount component into main slot -->
            <component
                v-if="isModalWrapper(modal) === false && getModalComponent(modal)"
                :is="getModalComponent(modal)"
                :modal="modal"
                v-bind="getModalProps(modal)"
            ></component>
        </component>
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

export default {
    data() {
        return {
            registredComponents: {},
        };
    },
    computed: {
        ...mapState('modal', ['modals']),
    },
    methods: {
        isModalWrapper(modal) {
            let props = this.getModalComponent(modal)?.props,
                modalKeyLookup = 'modal';

            if (_.isArray(props)) {
                return props.includes(modalKeyLookup);
            } else if (_.isObject(props)) {
                return modalKeyLookup in props;
            }
        },
        getModalComponent(modal) {
            if (modal.component) {
                let obj = this.getComponentObject(modal.component.component);

                obj.name = obj.name || modal.component?.name || modal.key;

                //We need cache component, otherwise it may be buggy on state change
                if (obj.name in this.registredComponents) {
                    return this.registredComponents[obj.name];
                }

                return (this.registredComponents[obj.name] = obj);
            }
        },
        getModalRenderer(modal) {
            if (this.isModalWrapper(modal)) {
                return this.getModalComponent(modal);
            }

            return 'Modal';
        },
        getModalProps(modal) {
            return modal?.component?.props || {};
        },
    },
};
</script>
