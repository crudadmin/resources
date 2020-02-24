var Helpers = {
    hasClass(e, className){
        var actualClasses = (e.className||'').split(' ');

        return actualClasses.indexOf(className) > -1;
    },
    addClass(e, className){
        //If element does not exists in array
        if ( this.hasClass(e, className) === false ) {
            e.className += ' '+className;
        }
    },
    removeClass(e, className){
        //If element does not exists in array
        if ( this.hasClass(e, className) === true ) {
            var actualClasses = (e.className||'').split(' ');

            actualClasses.splice(actualClasses.indexOf(className), 1)

            e.className = actualClasses.join(' ');
        }
    }
}

export default Helpers;