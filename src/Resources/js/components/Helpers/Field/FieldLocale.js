export default (Field, rawField) => {
    Field.prototype.hasLocale = function(fieldKey){
        return 'locale' in this;
    }
};