var ModelBus = (Model) => {
    Model.prototype.emitRowData = function(type, data){
        if ( data && data.table && data.table != this.table )
            return;

        eventHub.$emit(type, {
            model : this,
            table : this.table,
            slug : this.table,
            row : this.getRow(),
            rows : this.data.rows.data,
            count : this.data.rows.count,
            component : this.data.component,
            depth_level : this.data.depth_level,
        });
    };
};

export default ModelBus;