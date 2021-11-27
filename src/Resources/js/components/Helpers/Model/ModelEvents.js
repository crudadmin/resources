var ModelBus = (Model) => {
    Model.prototype.on = function(type, callback){
        this.data.events.push({ type, callback });

        return this;
    };

    Model.prototype.off = function(type, callback){
        this.data.events = this.data.events.filter(event => !(event.type === type && event.callback === callback));

        return this;
    }

    Model.prototype.fire = function(type){
        this.data.events.forEach(event => {
            if ( event.type === type ){
                event.callback(..._.toArray(arguments).slice(1));
            }
        });

        return this;
    }

    Model.prototype.onField = function(field, type, callback){
        return this.on('field.'+field+'.'+type, callback);
    };

    Model.prototype.offField = function(field, type, callback){
        return this.off('field.'+field+'.'+type, callback);
    }

    Model.prototype.fireField = function(field, type, data){
        return this.fire('field.'+field+'.'+type, ..._.toArray(arguments).slice(2));
    }
};

export default ModelBus;