var globalVueMixins = {
    methods: {
        asset(path){
            return window.crudadmin.admin_assets+'/'+path;
        },
        isMobileDevice(){
            return $(window).width() < 768;
        },
        isTabletDevice(){
            return $(window).width() < 1200;
        }
    }
}

export default globalVueMixins;