import { mapActions } from 'vuex';
import fontAwesomeMigrator from '../Helpers/FontAwesomeMigrator';

const CrudAdmin = {
    computed : {
        getAvatar(){
            if ( this.user && this.user.avatarThumbnail ) {
                return this.user.avatarThumbnail;
            }

            return this.$http.options.root + '/../'+window.crudadmin.path+'/dist/img/avatar5.png';
        }
    },

    created(){
        //Boot global trans method
        if ( !window.trans ) {
            window.trans = this.trans;
        }
    },

    methods: {
        ...mapActions('modal', ['openModal', 'successModal', 'errorModal', 'warningModal', 'errorResponseLayer']),
        trans(key){
            if ( key in this.$root.localization ) {
                return this.$root.localization[key];
            }

            return key;
        },
        faMigrator(icon){
            return fontAwesomeMigrator(icon);
        },
        scrollTo(id, callback){
            $('html, body').animate({
                scrollTop: $(id).offset().top - 10
            }, 500, callback);
        },
        //Check for all error response in all requests
        errorResponseLayer(response, code, callback){
            //Fix for jquery response
            if ( 'responseJSON' in response ) {
                response.data = response.responseJSON;
            }

            //Set response data
            if ( ! response.data && response.body ) {
                response.data = response.body;
            }

            //If error response comes with some message information, then display it
            if ( response.data && response.data.message && response.data.title && response.data.type ) {
                return this.openModal({
                    title : response.data.title,
                    message : response.data.message,
                    type : response.data.type,
                    close() {
                        if ( response.status == 401 ) {
                            window.location.href = window.crudadmin.baseURL;
                        }
                    }
                });
            }

            if ( response.status == 404 ) {
                return this.warningModal({
                    message : this.trans('row-error'),
                });
            }

            //If has been client logged off
            if ( response.status == 401 ) {
                return this.warningModal({
                    message : this.trans('auto-logout'),
                    close(){
                        window.location.reload();
                    }
                });
            }

            //Callback on code
            if ( callback && (code === response.status || code === null) ) {
                return callback(response);
            }

            //Unknown HTTP error
            if ( response.data?.message ) {
                return this.errorModal({
                    title : 'Error ' + response.status,
                    message : response.data.message,
                });
            }

            //Unknown error
            this.errorModal();
            console.error(response);
        },
    }
}

export default CrudAdmin;