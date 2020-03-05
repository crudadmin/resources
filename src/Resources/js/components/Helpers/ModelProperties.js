var ModelProperties = (Model) => {
    Model.prototype.isInParent = function(){
        return this.inParent === true;
    }

    Model.prototype.isSingle = function(){
        return this.minimum == 1 && this.maximum == 1 || this.single === true;
    }

    Model.prototype.formPrefix = function(){
        if ( this.isInParent() ) {
            return '$'+this.table+'_';
        }

        return '';
    }

    Model.prototype.hasAccess = function(key){
        if ( this.permissions[key] === true ) {
            return true;
        }

        return false;
    }

    Model.prototype.getModelProperty = function(key, value){
        var path = key.split('.'),
            obj = this;

        for ( var i = 0; i < path.length; i++ ) {
            if ( ! ( path[i] in obj ) ) {
                return !_.isNil(value) ? value : null;
            }

            obj = obj[path[i]];
        }

        return obj;
    }

    Model.prototype.getSettings = function(key, value){
        return this.getModelProperty('settings.'+key, value);
    }

};

export default ModelProperties;