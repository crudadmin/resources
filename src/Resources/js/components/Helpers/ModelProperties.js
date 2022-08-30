import _ from 'lodash';

var ModelProperties = (Model) => {
    Model.prototype.getScopes = function(){
        return this.getData('scopes');
    }

    Model.prototype.addScope = function(key, params){
        this.removeScope(key);

        this.getData('scopes').push({ key, params });
    }

    Model.prototype.setScope = function(key, params){
        this.addScope(key, params);
    }

    Model.prototype.removeScope = function(key){
        let scopes = this.getScopes();
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

    Model.prototype.isEditable = function(){
        return this.editable == true || this.hasChilds() > 0;
    }

    Model.prototype.isDisplayable = function(){
        return this.displayable == true;
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
        return _.get(this, key, value);
    }

    Model.prototype.getSettings = function(key, value){
        return this.getModelProperty('settings.'+key, value);
    }

    Model.prototype.setSettings = function(path, value){
        _.set(this.settings, path, value);

        return this;
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
        let field = this.fields[key]||{},
            name = field.column_name
                || this.getSettings('columns.'+key+'.name')
                || field.name;

        if ( name ) {
            return name;
        } else {
            switch( key ) {
                case 'id':
                    return trans('number');
                    break;
                case 'created_at':
                    return trans('created');
                    break;
                case 'updated_at':
                    return trans('last-change');
                    break;
                default:
                    return key;
                    break;
            }
        }
    }
};

export default ModelProperties;