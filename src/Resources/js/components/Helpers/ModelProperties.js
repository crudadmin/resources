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

};

export default ModelProperties;