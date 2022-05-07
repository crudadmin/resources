<template>
    <Modal :modal="modal" :options="{ class : '--wide --modelAddRow', actions : [] }">
        <model-builder :model_builder="relationModel"></model-builder>

        <template v-slot:footer>
            <SubmitButton :model="relationModel" />
        </template>
    </Modal>
</template>

<script type="text/javascript">
import SubmitButton from '@components/Forms/SubmitButton.vue';
import { mapActions } from 'vuex';

export default {
    props: ['modal', 'model', 'data'],

    components : {SubmitButton},

    data() {
        return {};
    },
    computed: {
        modelData(){
            return this.data;
        },
        relationModel() {
            let model = this.getFreshModel(this.modelData.table);

            model.setSettings('header.disabled', true);
            model.setSettings('form.header.disabled', true);
            model.setSettings('form.footer.disabled', true);
            model.setSettings('table.disabled', true);
            model.setSettings('pagination.enabled', false);
            model.setSettings('pagination.limit', 0);

            model.on('create', () => {
                this.closeModal({ modal : this.modal });
            });

            return model;
        },
    },
    methods : {
        ...mapActions('modal', ['closeModal']),
    },
};
</script>

<style lang="scss">
[data-modal].--modelAddRow .modal-dialog {
    [data-form='contracts_states'] .box {
        box-shadow: none !important;
    }
}
</style>
