<template>
<div>
    <slot :open="open">
    </slot>

    <!-- Modal for adding relation -->
    <div v-if="model" class="modal fade" :id="modalId" ref="modalEl" data-keyboard="false" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <!-- :langid="langid"
                :hasParentModel="getRelationModelParent"
                :parentRow="getRelationRow" -->

                <div class="modal-body --modal-wrapper" v-if="isListing">
                    <model-builder :model_builder="model">
                        <template v-slot:actions-grid-after>
                            <button
                                @click="close()"
                                type="button"
                                class="btn--icon btn btn-secondary --no-margin --button-back"
                            >
                                <i class="fa fa-times"></i>
                            </button>
                        </template>
                    </model-builder>
                </div>

                <form-builder
                    v-else
                    :model="model">
                </form-builder>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name : 'AddNewRowModal',

    props : {
        model : {},
        id : {
            default : 'relation-modal',
        },
    },

    data(){
        return {
            action : null,
            loaded : false,
        }
    },

    mounted(){
        this.boot();
    },

    watch : {
        model(model){
            if ( this.loaded == false && model ) {
                this.boot();
            }
        },
    },

    methods : {
        boot(){
            if ( !this.model ){
                return;
            }

            this.model.on(['create', 'update', 'form.close'], () => {
                if ( this.isListing ){
                    return;
                }

                //Close modal
                this.close();
            });

            this.model.on('form.open', (row) => {
                $(this.$refs.modalEl).modal('show');
            });

            $(this.$refs.modalEl).on('hidden.bs.modal', () => {
                this.model.closeForm();
            });

            this.loaded = true;
        },
        close(){
            $(this.$refs.modalEl).modal('hide');
        },
        open(action, rowId){
            this.action = action;

            this.$nextTick(() => {
                this.model.setData('form.standalone', this.isListing ? false : true);

                if ( ['view', 'edit'].includes(action) ){
                    //Enable only edit mode.
                    this.model.editable = action == 'view' ? false : true;

                    //Open row ID
                    if ( rowId ) {
                        this.model.selectRow({ id : rowId })
                    }
                }

                //Listing
                else if ( this.isListing ) {
                    this.model.enableOnlyFullScreen();
                    this.model.resetFormWithEvents();
                }

                $(this.$refs.modalEl).modal('show');
            });
        }
    },

    computed : {
        modalId(){
            return 'modal-inline-'+this.id+'_'+this.model.table;
        },
        modalEl(){
            return this.$refs.modalEl;
        },
        isListing(){
            return ['list'].includes(this.action);
        }
    },
}
</script>

<style lang="scss" scoped>
.--modal-wrapper {
    padding: $boxPadding;
}
</style>