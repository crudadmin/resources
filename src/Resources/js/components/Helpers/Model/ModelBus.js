var ModelBus = (Model) => {
    Model.prototype.emitRowData = function (type, data) {
        if (data && data.table && data.table != this.table) return;

        eventHub.$emit(type, {
            model: this,
            table: this.table,
            slug: this.table,
            row: this.getRow(),
            rows: this.data.rows.data,
            count: this.data.rows.count,
            component: this.data.component,
            depth_level: this.data.depth_level,
        });
    };

    Model.prototype.buildEventData = function (data, model, isChild) {
        var model = model || this;

        return {
            table: model.slug,
            model: model,

            //If is child inParent relation, then add depth level + 1 for correct communication
            depth_level: this.getData('depth_level') + (isChild ? 1 : 0),
            ...data,
        };
    };

    /*
     * Send all avaiable row events
     */
    Model.prototype.sendRowData = function () {
        this.emitRowData('getRow');
        this.emitRowData('getParentRow');
    };
};

export default ModelBus;
