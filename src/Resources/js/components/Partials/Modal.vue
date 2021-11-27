<template>
<div class="message-modal" v-if="canShowAlert" :data-modal="getRegistredComponent">
  <div class="modal" :class="'modal-'+alert.type" v-bind:style="{ display : canShowAlert ? 'block' : 'none' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ alert.title }}</h4>
          <button type="button" v-on:click="closeAlert( alert.close )" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-if="alert.message" v-html="alert.message"></p>
          <component
            v-if="getRegistredComponent"
            :is="getRegistredComponent"
            :model="alert.component.model"
            :rows="alert.component.rows"
            :row="alert.component.row"
            :request="alert.component.request"
            :data="alert.component.data" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" v-on:click="closeAlert( alert.close )" v-if="alert.close || alert.type=='success' && !alert.close || !alert.close && !alert.success" v-bind:class="{ 'pull-left' : alert.success }" data-dismiss="modal">{{ trans('close') }}</button>
          <button type="button" v-on:click="closeAlert( alert.success )" v-if="alert.success" class="btn btn-primary">{{ trans('accept') }}</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</div>
</template>

<script type="text/javascript">
export default {
    props : ['alert'],

    data(){
        return {
            registredComponents : [],
        };
    },

    mounted(){
        this.$watch('alert.component', component => {
            this.bindAlertComponent(component);
        });

        this.checkAlertEvents();
    },

    computed: {
        canShowAlert(){
            return this.alert.title != null && this.alert.message != null || this.alert.component;
        },
        getRegistredComponent(){
            let component = this.alert.component;

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
        checkAlertEvents(){
            $(window).keyup(e => {

                //If is opened alert
                if ( this.canShowAlert !== true ) {
                    //Close other alerts, which are not associated with this component
                    if ( e.keyCode == 27 ) {
                        $('.modal .modal-header .close:visible').last().click();
                    }

                    return;
                }

                //If enter/esc has been pressed 300ms after alert has been opened
                //does not close this alert and ignore enter
                if ( this.alert.opened && new Date().getTime() - this.alert.opened < 300 )
                    return;

                if ( e.keyCode == 13 )
                    this.closeAlert( this.alert.success || this.alert.close );

                if ( e.keyCode == 27 )
                    this.closeAlert( this.alert.close );

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

                    this.alert.component = null;
                }
            }
        },
        closeAlert(callback){
            if ( typeof callback == 'function' ){
                try {
                    callback.call(this.$parent);
                } catch(e){
                    console.error(e);
                }
            }

            for ( var key in this.alert ) {
                this.$parent.alert[key] = null;
            }
        },
    }
}
</script>