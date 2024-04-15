var ModelBus = (Model) => {
    Model.prototype.on = function (type, callback) {
        type = _.castArray(type);

        type.forEach((t) => {
            this.data.events.push({ type: t, callback });
        });

        return this;
    };

    Model.prototype.off = function (type, callback) {
        this.data.events = this.data.events.filter((event) => !(event.type === type && event.callback === callback));

        return this;
    };

    Model.prototype.fire = function (type) {
        type = _.castArray(type);

        this.data.events.forEach((event) => {
            if (type.includes(event.type)) {
                event.callback(..._.toArray(arguments).slice(1));
            }
        });

        return this;
    };

    Model.prototype.onField = function (field, type, callback) {
        return this.on('field.' + field + '.' + type, callback);
    };

    Model.prototype.offField = function (field, type, callback) {
        return this.off('field.' + field + '.' + type, callback);
    };

    Model.prototype.fireField = function (field, type, data) {
        return this.fire('field.' + field + '.' + type, ..._.toArray(arguments).slice(2));
    };
};

export default ModelBus;
