var Ajax = {
    post(url, data, callback, errorCallback){
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('X-CSRF-TOKEN', CAEditor.config.token);

        request.setRequestHeader('Accept', 'application/json');

        if ( data instanceof FormData ) {
            request.send(data);
        } else {
            request.setRequestHeader('Content-type', 'application/json');
            request.send(JSON.stringify(data));
        }

        request.onreadystatechange = () => {
            if(callback && request.readyState == 4 && request.status == 200) {
                //If is json type
                if ( request.getResponseHeader('Content-Type') == 'application/json' ) {
                    try {
                        request.responseJSON = JSON.parse(request.response);
                    } catch(e){
                        console.error(e);
                    }
                }

                if ( typeof callback == 'function' ) {
                    callback(request);
                }

                if ( typeof callback == 'object' && callback.success ) {
                    callback.success(request);
                }
            } else if ( request.readyState == 4 ) {
                if ( typeof errorCallback == 'function' ) {
                    errorCallback(request);
                }

                if ( typeof callback == 'object' && callback.error ) {
                    callback.error(request);
                }
            }
        }
    }
};

export default Ajax;