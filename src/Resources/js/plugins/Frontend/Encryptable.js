(function(){
    /*
     * Selectors
     */
    var toEncryptClass = 'toEncrypt',
        toEncryptHrefClass = 'toEncryptHref';

    /*
     * If encrypt method does not exists
     */
    if ( ! window.decryptText ) {
        window.decryptText = function(text) {
            if ( ! text ) {
                return;
            }

            return atob(atob(text+'==').slice(3));
        };
    }

    /*
     * On load webpage remove all encrypted selectors
     */
    window.addEventListener('load', () => {
        var elementsToFullDecrypt = document.getElementsByClassName(toEncryptClass),
            elementsToHrefDecrypt = document.getElementsByClassName(toEncryptHrefClass),
            decryptHref = (element) => {
                var href = element.getAttribute('href');

                //Decrypt also href value
                if ( href ) {
                    try {
                        element.href = decryptText(href);
                    } catch(e){}
                }
            };

        //Decrypt text + href
        //We need use while, because getElementsByClassName is dynamic and elements would be removed dynamicaly in for
        while(elementsToFullDecrypt.length > 0){
            var element = elementsToFullDecrypt[0];

            element.innerHTML = decryptText(element.innerHTML);
            decryptHref(element);

            element.classList.remove(toEncryptClass);
        }

        //Decrypt href
        for ( var i = 0; i < elementsToHrefDecrypt.length; i++ ){
            decryptHref(elementsToHrefDecrypt[i]);
        }
    });
})();