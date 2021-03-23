var ModelProperties = (Model) => {
    Model.prototype.setScope = function(key, params){
        this.removeScope(key);

        this.getData('scopes').push({ key, params });
    }

    Model.prototype.removeScope = function(key){
        let scopes = this.getData('scopes');
        let index = _.findIndex(scopes, { key });

        if ( index > -1 ){
            scopes.splice(index, 1);
        }
    }

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

        if ( !this._settings ) {
            this._settings = {};
        }

        //Return from cache
        if ( key in this._settings ) {
            obj = this._settings[key];
        }

        //Find data in object
        else {
            for ( var i = 0; i < path.length; i++ ) {
                if ( ! ( path[i] in obj ) ) {
                    obj = undefined;
                    break;
                }

                obj = obj[path[i]];
            }
        }

        //Save into cache
        this._settings[key] = obj;

        if ( obj === undefined ) {
            return !_.isNil(value) ? value : null
        }

        return obj;
    }

    Model.prototype.getSettings = function(key, value){
        return this.getModelProperty('settings.'+key, value);
    }

    Model.prototype.isSettingEnabled = function(key, defaultState){
        let enabled = this.getSettings(key+'.enabled'),
            disabled = this.getSettings(key+'.disabled');

        if ( !_.isNil(enabled) ){
            return enabled === true;
        }

        if ( !_.isNil(disabled) ){
            return disabled === false;
        }

        return _.isNil(defaultState) ? true : defaultState;
    }

    Model.prototype.isSettingDisabled = function(key, defaultState){
        let enabled = this.getSettings(key+'.enabled'),
            disabled = this.getSettings(key+'.disabled');

        if ( !_.isNil(enabled) ){
            return enabled === false;
        }

        if ( !_.isNil(disabled) ){
            return disabled === true;
        }

        return _.isNil(defaultState) ? false : defaultState;
    }

    Model.prototype.fieldName = function(key){
        if ( key in this.fields ) {
            return (
                this.fields[key].column_name
                || this.getSettings('columns.'+key+'.name')
                || this.fields[key].name
            );
        } else {
            switch( key ) {
                case 'id':
                    return trans('number');
                    break;
                case 'created_at':
                    return trans('created');
                    break;
                case 'updated_at':
                    return trans('updated');
                    break;
                default:
                    return key;
                    break;
            }
        }
    }
};

export default ModelProperties;