var Groups = (Model) => {
    /*
     * Hide tab
     */
    Model.prototype.showGroup = function (key) {
        if (this.hidden_groups.indexOf(key) === -1) return;

        this.hidden_groups.splice(this.hidden_groups.indexOf(key), 1);
    };

    /*
     * Show tab
     */
    Model.prototype.hideGroup = function (key) {
        if (this.hidden_groups.indexOf(key) === -1) {
            this.hidden_groups.push(key);
        }
    };

    /*
     * Set visibility tab
     */
    Model.prototype.setGroupVisibility = function (key, visible) {
        if (visible === true) this.showGroup(key);
        else this.hideGroup(key);
    };
};

export default Groups;
