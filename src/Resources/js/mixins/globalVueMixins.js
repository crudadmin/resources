var globalVueMixins = {
    methods: {
        asset(path){
            return window.crudadmin.admin_assets+'/'+path;
        },
        isMobileDevice(){
            return $(window).width() < 768;
        }
    }
}

export default globalVueMixins;