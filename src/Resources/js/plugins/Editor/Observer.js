var Observer = {
    MutationObserver : window.MutationObserver || window.WebKitMutationObserver,

    observeDOM(obj, originalCallback){
        if( !obj || !obj.nodeType === 1 )
            return;

        var timeout,
            callback = (mutations) => {
                if ( timeout ) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    originalCallback(mutations);
                }, 1);
            };

        if( this.MutationObserver ){
            // define a new observer
            var obs = new this.MutationObserver((mutations, observer) => {
                callback(mutations);
            })
            // have the observer observe foo for changes in children
            obs.observe( obj, {
                childList:true,
                subtree:true
            });
        }

        else if( window.addEventListener ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    },

    observeNewElements(){
        this.observeDOM(document.body, (e) => {
            CAEditor.refresh();

            //If removed element had pencil. We need remove pencil.
            for ( var i = 0; i < e.length; i++ ) {
                for ( var r = 0; r < e[i].removedNodes.length; r++ ) {
                    if ( e[i].removedNodes[r]._CAPencil ) {
                        e[i].removedNodes[r]._CAPencil.remove();
                    }
                }
            }
        });
    },
};

export default Observer;