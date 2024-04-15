var BuilderData = (Model, rawModel, options) => {
    const { data } = options;

    if (rawModel.data === undefined) {
        rawModel.data = data();
    }

    /**
     * Refresh instance of given model
     */
    Model.prototype.refreshInstance = function () {
        this.data = _.cloneDeep(data());
    };

    /**
     * Set model data
     *
     * @param  string  key
     * @param  key  value
     */
    Model.prototype.setData = function (key, value) {
        $app.$set(this.data, key, value);

        let mapValues = this.data.mapValues;

        for (var i = 0; i < mapValues.length; i++) {
            if (mapValues[i].key === key) {
                mapValues[i].callback(value);
            }
        }

        return this;
    };

    /**
     * Get model data
     *
     * @param  string  key
     */
    Model.prototype.getData = function (key) {
        return this.data[key];
    };

    Model.prototype.mapData = function (keys, callbackOrComponent) {
        _.castArray(keys).forEach((key) => {
            let callback =
                typeof callbackOrComponent == 'function'
                    ? callbackOrComponent
                    : (value) => {
                          callbackOrComponent[key] = value;
                      };

            this.data.mapValues.push({ key, callback });
        });

        return this;
    };
};

export default BuilderData;
