export default (Field, rawField) => {
    Field.prototype.hasHistoryChange = function () {
        let history = this.getModel().getData('history');

        if (!history) {
            return false;
        }

        return history.fields.indexOf(this.getKey()) > -1;
    };
};
