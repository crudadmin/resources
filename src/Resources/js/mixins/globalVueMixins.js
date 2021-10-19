var globalVueMixins = {
    methods: {
        asset(path){
            return window.crudadmin.admin_assets+'/'+path;
        },
        isMobileDevice(){
            return $(window).width() < 768;
        },
        /*
         * Replace datetime format from PHP to momentjs
         */
        fromPHPFormatToMoment(format){
            var mapObj = { 'd' : 'DD', 'D' : 'ddd', 'j' : 'D', 'l' : 'dddd', 'N' : 'E', 'S' : 'o', 'w' : 'e', 'z' : 'DDD', 'W' : 'W', 'F' : 'MMMM', 'm' : 'MM', 'M' : 'MMM', 'n' : 'M', 't' : '', 'L' : '', 'o' : 'YYYY', 'Y' : 'YYYY', 'y' : 'YY', 'a' : 'a', 'A' : 'A', 'B' : '', 'g' : 'h', 'G' : 'H', 'h' : 'hh', 'H' : 'HH', 'i' : 'mm', 's' : 'ss', 'u' : 'SSS', 'e' : 'zz', 'I' : '', 'O' : '', 'P' : '', 'T' : '', 'Z' : '', 'c' : '', 'r' : '', 'U' : 'X' };

            var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

            return format.replace(re, function(match){
                if ( match in mapObj )
                    return mapObj[match];

                return match;
            });
        },
    }
}

export default globalVueMixins;