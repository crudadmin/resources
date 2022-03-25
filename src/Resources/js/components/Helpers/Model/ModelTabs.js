var ModelTabs = (Model) => {
    Model.prototype.getActiveTab = function(){
        return this.getData('activetab') || 0;
    }

    Model.prototype.setActiveTab = function(index){
        this.setData('activetab', index);
    }
};

export default ModelTabs;