<template>
<div class="crudadmin-wrapper">
    <Modal :modal="modal" :options="{ class : '--wide --modelAddRow', actions : [], escClose : true }" :style="{ '--form' : relationModel.table }">
        <model-builder :model_builder="relationModel"></model-builder>

        <template v-slot:footer>
            <SubmitButton :model="relationModel" />
        </template>
    </Modal>
</div>
</template>

<script type="text/javascript">
import SubmitButton from '@components/Forms/SubmitButton.vue';
import { mapActions } from 'vuex';

export default {
    props: ['modal', 'model', 'data', 'rows'],

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
            model.setData('buttonRows', this.rows);

            model.setAdditionalFormData(this.getFormData(model));

            model.on('create', () => {
                this.model.resetChecked();

                this.closeModal({ modal : this.modal });
            });

            return model;
        },
    },
    methods : {
        ...mapActions('modal', ['closeModal']),
        getFormData(model){
            let obj = {};

            this.rows.forEach((row, i) => {
                obj[model.foreign_column[this.model.table]+'['+i+']'] = row.id;
            });

            return obj;
        },
    },
};
</script>

<style lang="scss">
[data-modal].--modelAddRow .modal-dialog .modal-body {
    > div > .admin-model > .admin-model__body > div > .col--form > [data-form] {
        > .box {
            box-shadow: none !important;

            > .box-body--form {
                padding: 0;
                border-bottom: 0;
            }
        }
    }
}
</style>
