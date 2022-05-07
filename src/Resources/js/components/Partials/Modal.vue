<template>
<div v-if="canShowModal" :data-opened-at="modal.openedAt">
    <div class="message-modal" v-if="isToast === false" :data-modal="modalName" :class="modal.class">
        <div class="modal fade d-block" :class="['modal-'+modalTypeClass, { show : isVisibleModal }]">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">{{ modal.title }}</h4>
                    <button type="button" @click="closeModal({ modal, callback : modal.close })" class="close" ref="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p v-if="modal.message" v-html="modal.message"></p>
                    <component
                        v-if="getRegistredComponent"
                        :is="getRegistredComponent"
                        :model="modal.component.model"
                        :rows="modal.component.rows"
                        :row="modal.component.row"
                        :request="modal.component.request"
                        :data="modal.component.data" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal({ modal, callback : modal.close })" v-if="modal.close || modal.type=='success' && !modal.close || !modal.close && !modal.success" data-dismiss="modal">{{ trans('close') }}</button>
                    <button type="button" @click="closeModal({ modal, callback : modal.success })" v-if="modal.success" class="btn btn-primary">{{ trans('accept') }}</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
        </div>
    <!-- /.modal -->
    </div>
    <div v-else class="adminToasts">
        <div class="toast" :class="['--'+modalTypeClass, { show : isVisibleModal }]" role="alert" aria-live="assertive" aria-atomic="true" :key="modal.openedAt">
            <button type="button" @click="closeModal({ modal, callback : modal.close })" class="close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>

            <div class="toast-header" v-if="modal.title">
                <strong class="mr-auto">
                    <i class="fa icon" :class="toastIcon" />
                    {{ modal.title }}
                </strong>
            </div>

            <div class="toast-body">
                <p v-if="modal.message">
                    <i class="fa icon" :class="toastIcon" v-if="toastIcon && !modal.title" /> <span v-html="modal.message"></span>
                </p>
                <component
                    v-if="getRegistredComponent"
                    :is="getRegistredComponent"
                    :model="modal.component.model"
                    :rows="modal.component.rows"
                    :row="modal.component.row"
                    :request="modal.component.request"
                    :data="modal.component.data" />
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { mapState, mapActions } from 'vuex';

export default {
    props : ['modal'],

    data(){
        return {
            registredComponents : [],
            isVisibleModal : false,
        };
    },

    mounted(){
        this.registerEvents();

        this.setDelayedModalVisibility();

        this.bindAlertComponent(this.modal.component);
    },

    destroyed(){
        $(window).off('keyup', this.$modalEvents);
    },

    watch : {
        'modal.visible'(state){
            this.setDelayedModalVisibility();
        },
        'isVisibleModal'(state){
            if ( state === true ){
                this.tryAutoClose();
            }
        },
    },

    computed: {
        toastIcon(){
            if ( ['success'].includes(this.modal.type) ) {
                return 'fa-check';
            } else if ( ['error'].includes(this.modal.type) ) {
                return 'fa-times';
            }
        },
        modalTypeClass(){
            if ( this.modal.type == 'error' ){
                return 'danger';
            }

            return this.modal.type;
        },
        isToast(){
            return this.modal.toast === true;
        },
        modalName(){
            return this.modal.key||this.getRegistredComponent;
        },
        canShowModal(){
            return (this.modal.type || this.modal.component) ? true : false;
        },
        getRegistredComponent(){
            let component = this.modal.component;

            if ( ! component || !component.name ){
                return;
            }

            if ( this.isGlobalComponent(component.component) ){
                return component.component;
            }

            if (this.registredComponents.includes(component.name)){
                return component.name;
            }
        },
    },

    methods: {
        ...mapActions('modal', ['closeModal']),
        registerEvents(){
            $(window).on('keyup', this.$modalEvents = e => {
                //If is opened alert
                if ( this.canShowModal === true ) {
                    //If enter/esc has been pressed 300ms after alert has been opened.
                    //We want prevent this action which may be unwanted
                    if ( this.modal.openedAt && new Date().getTime() - this.modal.openedAt < 300 ) {
                        return;
                    }

                    if ( e.keyCode == 13 ) {
                        this.closeModal({ modal : this.modal, callback : this.modal.success || this.modal.close });
                    } else if ( e.keyCode == 27 ) {
                        this.closeModal({ modal : this.modal, callback : this.modal.close });
                    }
                }
            });
        },
        bindAlertComponent(component){
            if ( component ){
                var obj;

                try {
                    obj = this.getComponentObject(component.component);

                    if ( !this.isGlobalComponent(component.component) ) {
                        obj.name = component.name;

                        this.$options.components[obj.name] = obj;

                        this.registredComponents.push(obj.name);
                    }

                } catch(error){
                    console.error('Syntax error in component button component.' + "\n", error);

                    this.modal.component = null;
                }
            }
        },
        setDelayedModalVisibility(){
            setTimeout(() => {
                this.isVisibleModal = this.modal.visible;
            }, 50);
        },
        tryAutoClose(){
            //We need remove previous timeout when modal opens
            if ( this.closeTimeout ){
                clearTimeout(this.closeTimeout);
            }

            //Create auto close timeout
            if ( this.isToast ){
                this.closeTimeout = setTimeout(() => {
                    this.closeModal({ modal : this.modal, callback : this.modal.close });
                }, 4000)
            }
        }
    }
}
</script>