import _ from 'lodash';

export default (Field, rawField) => {
    rawField.label = {
        visible : true,
    };

    Field.prototype.getName = function(fieldKey){
        return this.name;
    }

    Field.prototype.getPlaceholder = function(){
        return this.placeholder || this.getName();
    }

    Field.prototype.isRequired = function(fieldKey){
        let row = this.model.getRow();

        if ( this.model.isOpenedRow() && this.type == 'password' ) {
            return false;
        }

        //Basic required attribute
        if ( 'required' in this && this.required == true ){
            return true;
        }

        //Required if attribute
        if ( this.required_if ) {
            var parts = this.required_if.split(','),
                value = fixBoolValue(row[parts[0]]);

            if (value && parts.slice(1).indexOf(value) > -1) {
                return true;
            }
        }

        //Required unless attribute
        if ( this.required_unless ) {
            var parts = this.required_unless.split(','),
                value = fixBoolValue(row[parts[0]]);

            if (value && parts.slice(1).indexOf(value) == -1){
                return true;
            }
        }

        //Required without attribute
        if ( this.required_without ) {
            var parts = this.required_without.split(',');

            for ( var i = 0; i < parts.length; i++ ) {
                if ( ! row[parts[i]] ) {
                    return true;
                }
            }
        }

        //Required without attribute
        if ( this.required_with ) {
            var parts = this.required_with.split(',');

            for ( var i = 0; i < parts.length; i++ ) {
                if ( row[parts[i]] ) {
                    return true;
                }
            }
        }

        return false;
    }
};