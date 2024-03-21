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
    <div class="modal fade" :id="'modal-inline-'+model.table" ref="relationModalRef" data-keyboard="false" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ model.getFormTitle() }}</h4>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form-builder :model="model" ></form-builder>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props : ['model'],

    mounted(){
        this.model.on('create', () => {
            //Close modal
            $(this.$refs.relationModalRef).modal('hide');
        });

        this.model.on('form.open', (row) => {
            $(this.$refs.relationModalRef).modal('show');
        })

        $(this.$refs.relationModalRef).on('hidden.bs.modal', () => {
            this.model.closeForm();
        });
    }
}
</script>