<template>
<div>
    <slot :open="open">
    </slot>

    <!-- Modal for adding relation -->
    <div class="modal fade" :id="modalId" ref="modalEl" data-keyboard="false" tabindex="-1" role="dialog" v-if="model">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <!-- :langid="langid"
                :hasParentModel="getRelationModelParent"
                :parentRow="getRelationRow" -->

                <div class="modal-body --modal-wrapper" v-if="hasModelBuilder" v-show="isListing">
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
                    v-if="!isListing"
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
            hasModelBuilder : false,
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
        isListing(state){
            if ( state === true ) {
                this.hasModelBuilder = true;
            }
        }
    },

    methods : {
        boot(){
            if ( !this.model ){
                return;
            }

            this.model.setData('load_child_tab_models', false);

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

            if ( this._onModelLoad ){
                this._onModelLoad(this.model);

                this._onModelLoad = null;
            }

            this.loaded = true;
        },
        close(){
            $(this.$refs.modalEl).modal('hide');
        },
        open(action, rowId){
            this.onModelLoad(async (model) => {
                this.action = action;

                //Enable form in ModelBuilder only in listing mode
                model.setSettings('form.enabled', this.isListing);

                //Set standalone form
                model.setData('form.standalone', this.isListing ? false : true);

                //Open row if is viewable mode
                if ( ['view', 'edit'].includes(action) ){
                    //Enable only edit mode.
                    model.editable = action == 'view' ? false : true;

                    //Open row ID
                    if ( rowId ) {
                        //Load row form db
                        await model.selectRow({ id : rowId })
                    }
                }

                //Wait on row load in case of viewable action for child tabs.
                //For proper relation child loading workflow.
                model.setData('load_child_tab_models', true);

                //Listing
                if ( this.isListing ) {
                    model.enableOnlyFullScreen();
                    model.resetFormWithEvents();
                }

                //On modal element load
                this.$nextTick(() => {
                    $(this.$refs.modalEl).modal('show');
                })
            });
        },
        /**
         * This method fixed correct flow during opening existing row.
         * It keeps right state: so first load model, set it row, then load model component for right ajax requests and not doing duplicates.
         */
        onModelLoad(callback){
            //If model is loaded already
            if ( this.model ){
                callback(this.model);
            }

            //Add callback when model will be loaded
            else {
                this._onModelLoad = callback;
            }
        }
    },

    computed : {
        modalId(){
            return 'modal-inline-'+this.id+'_'+this.model?.table;
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