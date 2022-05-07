<template>
<div v-if="canRenderModal" :data-opened-at="modal.openedAt">
    <div class="message-modal" v-if="isToast === false" :data-modal="modalName" :class="[modal.class, options.class]">
        <div class="modal fade d-block" :class="['modal-'+modalTypeClass, { show : isVisibleModal }]">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <h4 class="modal-title">{{ modal.title }}</h4>

                        <button type="button" @click="closeModal({ modal, callback : modal.close })" class="close" ref="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body">
                        <p v-if="modal.message" v-html="modal.message"></p>

                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>

                        <button
                            v-for="(action, index) in actions"
                            type="button"
                            :class="['btn', action.class, { disabled : actionInProgress === index }]"
                            @click="onActionPress(index, action)">
                            {{ action.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
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

                <slot></slot>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name : 'Modal',

    props : {
        modal : {
            type : Object,
        },
        options : {
            type : Object,
            required : false,
            default(){
                return {
                    class : '',
                    key : '',
                    actions : null,
                }
            },
        },
    },

    data(){
        return {
            isVisibleModal : false,
            actionInProgress : null,
        };
    },

    mounted(){
        this.registerCloseEvents();

        this.setDelayedModalVisibility();

        //We need unblur previoisly clicked element. Because
        //when we have opened multiple modals, and previous button click opened new modal,
        //we will trigger previous button with enter click
        document.activeElement.blur();
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
        ...mapGetters('modal', ['isModalActive']),
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
            return this.options.key||this.modal.key||'modal';
        },
        canRenderModal(){
            return this.modal.type ? true : false;
        },
        actions(){
            return this.options.actions||modal.actions||[];
        }
    },

    methods: {
        ...mapActions('modal', ['closeModal']),
        registerCloseEvents(){
            $(window).on('keyup', this.$modalEvents = e => {
                //If is opened alert, and is last in order.
                if ( this.canRenderModal === true && this.isModalActive(this.modal) ) {
                    //If enter/esc has been pressed 300ms after alert has been opened.
                    //We want prevent this action which may be unwanted
                    if ( this.modal.openedAt && new Date().getTime() - this.modal.openedAt < 300 ) {
                        return;
                    }

                    //Enter
                    if ( e.keyCode == 13 ) {
                        this.closeModal({ modal : this.modal, callback : this.modal.success || this.modal.close });
                    }

                    //Escape
                    else if ( e.keyCode == 27 ) {
                        this.closeModal({ modal : this.modal, callback : this.modal.close });
                    }
                }
            });
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
        },
        async onActionPress(index, action){
            //Disable double action click
            if ( this.actionInProgress == index ){
                return;
            }

            this.actionInProgress = index;

            await this.closeModal({
                modal : this.modal,
                callback : action.callback
            });

            this.actionInProgress = null;
        }
    }
}
</script>

<style lang="scss">
[data-modal].--wide .modal-dialog {
    max-width: 100rem;
}
</style>