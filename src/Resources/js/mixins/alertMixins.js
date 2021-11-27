var alertMixins = {
    methods: {
        openAlert(title, message, type, success, close, component, key){
            if ( !type ) {
                type = 'success';
            }

            if ( type == 'error' ) {
                type = 'danger';
            }

            this.$root.alert.key = key;
            this.$root.alert.type = type;
            this.$root.alert.title = title;
            this.$root.alert.message = message;
            this.$root.alert.success = success;
            this.$root.alert.close = close;
            this.$root.alert.opened = new Date().getTime();
            this.$root.alert.component = component;

            //After opening alert unfocus focused input
            //for prevent sending of new form ajax instance...
            if ("activeElement" in document) {
                document.activeElement.blur();
            }

            return this.$root.alert;
        },
        errorAlert(callback){
            this.openAlert(this.trans('warning'), this.trans('unknown-error'), 'danger', null, callback ? callback : function(){});
        },
    }
};

export default alertMixins;