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
            if ( ! text )
                return;

            return atob(atob(text).slice(3));
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
        for ( var i = 0; i < elementsToFullDecrypt.length; i++ ){
            var element = elementsToFullDecrypt[i];

            element.innerHTML = decryptText(element.innerHTML);
            element.classList.remove(toEncryptClass);

            decryptHref(element);
        }

        //Decrypt href
        for ( var i = 0; i < elementsToHrefDecrypt.length; i++ ){
            decryptHref(elementsToHrefDecrypt[i]);
        }
    });
})();