var Ajax = {
    post(url, data, callback){
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('X-CSRF-TOKEN', CAEditor.config.token);

        if ( data instanceof FormData ) {
            request.send(data);
        } else {
            request.setRequestHeader('Content-type', 'application/json');
            request.send(JSON.stringify(data));
        }

        request.onreadystatechange = () => {
            if(callback && request.readyState == 4 && request.status == 200) {
                if ( typeof callback == 'function' ) {
                    callback(request)
                }

                if ( typeof callback == 'object' && callback.success ) {
                    callback.success(request)
                }
            }
        }
    }
};

export default Ajax;