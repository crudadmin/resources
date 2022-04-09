<template>
<div v-if="canShowModal">
    <div class="message-modal" v-if="isToast === false" :data-modal="modalName">
      <div class="modal" :class="'modal-'+modalTypeClass" :style="{ display : canShowModal ? 'block' : 'none' }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{{ modal.title }}</h4>
              <button type="button" v-on:click="closeModal({ callback : modal.close })" class="close" data-dismiss="modal" aria-label="Close">
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
              <button type="button" class="btn btn-secondary" v-on:click="closeModal({ callback : modal.close })" v-if="modal.close || modal.type=='success' && !modal.close || !modal.close && !modal.success" :class="{ 'pull-left' : modal.success }" data-dismiss="modal">{{ trans('close') }}</button>
              <button type="button" v-on:click="closeModal({ callback : modal.success })" v-if="modal.success" class="btn btn-primary">{{ trans('accept') }}</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    </div>
    <div v-else>
        <h1>toast</h1>
    </div>
</div>
</template>

<script type="text/javascript">
import { mapState, mapActions } from 'vuex';

export default {
    data(){
        return {
            registredComponents : [],
        };
    },

    mounted(){
        this.checkAlertEvents();
    },

    watch : {
        'modal.component'(component){
            this.bindAlertComponent(component);
        }
    },

    computed: {
        ...mapState('modal', ['modal']),
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
            return this.modal.type || this.modal.component;
        },
        getRegistredComponent(){
            let component = this.modal.component;

            if ( ! component || !component.name ){
                return;
            }

            if ( this.isGlobalComponent(component.component) ){
                return component.component;
            }

            if (this.registredComponents.indexOf(component.name) > -1){
                return component.name;
            }
        },
    },

    methods: {
        ...mapActions('modal', ['closeModal']),
        checkAlertEvents(){
            $(window).keyup(e => {
                //If is opened alert
                if ( this.canShowModal !== true ) {
                    //Close other alerts, which are not associated with this component
                    if ( e.keyCode == 27 ) {
                        $('.modal .modal-header .close:visible').last().click();
                    }

                    return;
                }

                //If enter/esc has been pressed 300ms after alert has been opened
                //does not close this alert and ignore enter
                if ( this.modal.opened && new Date().getTime() - this.modal.opened < 300 )
                    return;

                if ( e.keyCode == 13 )
                    this.closeModal({ callback : this.modal.success || this.modal.close });

                if ( e.keyCode == 27 )
                    this.closeModal({ callback : this.modal.close });

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
    }
}
</script>