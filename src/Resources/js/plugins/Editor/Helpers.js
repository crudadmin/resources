var Helpers = {
    hasClass(e, className){
        if ( !e || !e.className ) {
            return false;
        }

        var actualClasses = (e.className||'').split(' ');

        return actualClasses.indexOf(className) > -1;
    },
    addClass(e, className){
        if ( !e || !e.className ) {
            return;
        }

        //If element does not exists in array
        if ( this.hasClass(e, className) === false ) {
            e.className += ' '+className;
        }
    },
    removeClass(e, className){
        if ( !e || !e.className ) {
            return;
        }

        //If element does not exists in array
        if ( this.hasClass(e, className) === true ) {
            var actualClasses = (e.className||'').split(' ');

            actualClasses.splice(actualClasses.indexOf(className), 1)

            e.className = actualClasses.join(' ');
        }
    },
    htmlspecialchars(str) {
        var map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;" // ' -> &apos; for XML only
        };
        return str.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    htmlspecialcharsDecode(str) {
        var map = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": "\"",
            "&#39;": "'"
        };

        return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function(m) { return map[m]; });
    }
}

export default Helpers;