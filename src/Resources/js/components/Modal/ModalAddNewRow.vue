<template>
    <Modal :modal="modal" :options="{ class : '--wide --modelAddRow' }">
        <model-builder :model_builder="relationModel"></model-builder>
    </Modal>
</template>

<script type="text/javascript">
export default {
    props: ['modal', 'model', 'data'],
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

            return model;
        },
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
