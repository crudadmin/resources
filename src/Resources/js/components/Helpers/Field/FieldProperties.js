import _ from 'lodash';

export default (Field, rawField) => {
    rawField.label = {
        visible : true,
    };

    Field.prototype.getName = function(fieldKey){
        return this.name;
    }
};