import fontAwesomeMigrator from '../Helpers/FontAwesomeMigrator';

const CrudAdmin = {
    computed : {
        getAvatar(){
            if ( this.user && this.user.avatar )
                return this.user.avatar;

            return this.$http.options.root + '/../'+window.crudadmin.path+'/dist/img/avatar5.png';
        }
    },

    methods: {
        trans(key){
            if ( key in this.$root.localization )
                return this.$root.localization[key];

            return key;
        },
        faMigrator(icon){
            return fontAwesomeMigrator(icon);
        },
        scrollTo(id){
            $('html, body').animate({
                scrollTop: $(id).offset().top - 10
            }, 500);
        }
    }
}

export default CrudAdmin;