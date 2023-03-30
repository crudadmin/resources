import _ from 'lodash';

export default (Field, rawField) => {
    Field.prototype.isString = function() {
        return this.type == 'string';
    }

    Field.prototype.isNumber = function() {
        return ['integer', 'decimal'].indexOf(this.type) > -1;
    }

    Field.prototype.isText = function() {
        return ['text', 'longtext'].includes(this.type);
    }

    Field.prototype.isGutenberg = function() {
        return this.type == 'gutenberg';
    }

    Field.prototype.isEditor = function() {
        return ['editor', 'longeditor'].includes(this.type);
    }

    Field.prototype.isFile = function() {
        return this.type == 'file';
    }

    Field.prototype.isUploader = function() {
        return this.type == 'uploader';
    }

    Field.prototype.isPassword = function() {
        return this.type == 'password';
    }

    Field.prototype.isColor = function() {
        return this.type == 'color';
    }

    Field.prototype.isPhone = function() {
        return this.type == 'phone';
    }

    Field.prototype.isSelect = function()
    {
        return this.type == 'select';
    }

    Field.prototype.isRadio = function() {
        return this.type == 'radio';
    }

    Field.prototype.isCheckbox = function() {
        return this.type == 'checkbox';
    }

    Field.prototype.isDatepicker = function() {
        return ['date', 'datetime', 'time', 'timestamp'].includes(this.type);
    }
};