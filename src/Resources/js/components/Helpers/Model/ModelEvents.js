var ModelBus = (Model) => {
    Model.prototype.on = function(type, callback){
        this.data.events.push({ type, callback });

        return this;
    };

    Model.prototype.off = function(type, callback){
        this.data.events = this.data.events.filter(event => !(event.type === type && event.callback === callback));

        return this;
    }

    Model.prototype.fire = function(type, data){
        this.data.events.forEach(event => {
            if ( event.type === type ){
                event.callback(data);
            }
        });

        return this;
    }
};

export default ModelBus;