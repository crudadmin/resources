<template>
<div>
    <button
        :data-target="'#modal-inline-'+model.table"
        data-toggle="modal"
        type="button"
        class="btn--icon btn btn-primary"
    >
        <i class="fa fa-plus --icon-left"></i>
        {{ model.getSettings('buttons.create', trans('new-row')) }}
    </button>

    <!-- Modal for adding relation -->
    <div class="modal fade" :id="'modal-inline-'+model.table" ref="modalEl" data-keyboard="false" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form-builder :model="model" >
                </form-builder>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props : ['model'],

    mounted(){
        this.model.setData('form.standalone', true);

        this.model.on(['create', 'update', 'form.close'], () => {
            //Close modal
            $(this.$refs.modalEl).modal('hide');
        });

        this.model.on('form.open', (row) => {
            $(this.$refs.modalEl).modal('show');
        });

        $(this.$refs.modalEl).on('hidden.bs.modal', () => {
            this.model.closeForm();
        });
    }
}
</script>