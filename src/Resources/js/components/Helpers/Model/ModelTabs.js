import Model from '@components/Helpers/Model/Model.js';

const getModelFields = function (model) {
    if (model.fields_groups.length == 1 && model.fields_groups[0].type == 'default') {
        return model.fields_groups[0].fields;
    }

    return model.fields_groups;
};

/*
 * Check if can be model child added into table list
 * if child model is in other tab or group, then we cant add model into end of tabs.
 */
const isModelInFields = (childs, model) => {
    for (var i = 0; i < childs.length; i++) {
        //Check if group field is tab
        if (isGroup(childs[i])) {
            //If model is in recursive tabs or group
            if (childs[i].model === model) {
                return true;
            }

            //If tab has other childs, then check recursive
            if (childs[i].fields.length > 0) {
                if (isModelInFields(childs[i].fields, model)) {
                    return true;
                }
            }
        }
    }

    return false;
};

/*
 * Return model from childs by model table
 */
export const getModel = function (requestedModel, callback) {
    const currentModel = this.model;

    let cachedModel = () => {
        if (typeof currentModel.childs[requestedModel] == 'string') {
            return this.getFreshModel(currentModel.table);
        }
        if (currentModel.childs[requestedModel]) {
            return Model(currentModel.childs[requestedModel]);
        } else {
            return this.getFreshModel(requestedModel);
        }
    };

    if (!this.cachedModel) {
        this.cachedModel = {};
    }

    if (this.cachedModel[requestedModel]) {
        return this.cachedModel[requestedModel];
    }

    //We need create cached version of given model. To share UUID accross all model session
    //under this tab. We also need to create object observable from start. To be able retrieve data
    //after component mount.
    const model = cachedModel();

    if (callback) {
        callback(model);
    }

    return (this.cachedModel[requestedModel] = Vue.observable(model));
};

export const isGroup = function (group) {
    return typeof group == 'object' && 'type' in group;
};

export const isTab = function (group) {
    if (isInlineModelTab(group)) {
        return false;
    }

    return isGroup(group) && group.type == 'tab';
};

export const isInlineModelTab = function (group) {
    return isGroup(group) && group.model && (group.width + '').includes('-inline');
};

export const addGroupLevel = function (level) {
    level = level + '';

    level = level.split('-');

    return parseInt(level[0]) + 1 + '-' + level.slice(1).join('-');
};

var Tabs = (Model) => {
    /*
     * Hide tab
     */
    Model.prototype.showTab = function (key) {
        if (this.hidden_tabs.indexOf(key) === -1) {
            return;
        }

        var hidden_tabs = _.cloneDeep(this.hidden_tabs);
        hidden_tabs.splice(this.hidden_tabs.indexOf(key), 1);

        this.hidden_tabs = hidden_tabs;
    };

    /*
     * Show tab
     */
    Model.prototype.hideTab = function (key) {
        if (this.hidden_tabs.indexOf(key) === -1) {
            this.hidden_tabs = _.cloneDeep(this.hidden_tabs).concat(key);
        }
    };

    /*
     * Set visibility tab
     */
    Model.prototype.setTabVisibility = function (key, visible) {
        if (visible === true) {
            this.showTab(key);
        } else {
            this.hideTab(key);
        }
    };

    Model.prototype.getTabs = function (tabs, group, withChilds = true) {
        var modelFields = getModelFields(this),
            items = tabs || (group ? group.fields : null) || modelFields,
            tabs = items.filter((group) => {
                if (!isTab(group)) {
                    return false;
                }

                return true;
            });

        if (tabs.length == 0 || (tabs.length > 0 && tabs.length != items.length)) {
            items = items.filter(
                function (group) {
                    return !isTab(group);
                }.bind(this)
            );

            tabs = [
                {
                    name: group ? group.name : this.getSettings('title.tab', $app.trans('general-tab')),
                    icon: group ? group.icon : this.icon,
                    fields: items,
                    type: 'tab',
                    default: true,
                },
            ].concat(tabs);
        }

        //Add models into tabs if neccesary
        if (withChilds == true) {
            let childs = this.getChilds();

            for (var key in childs) {
                var childModel = typeof childs[key] === 'string' ? this : childs[key];

                //Check if model is not in fields group
                if (!isModelInFields(modelFields, childModel.slug)) {
                    tabs.push({
                        fields: [],
                        type: 'tab',
                        model: childModel.slug,
                    });
                }
            }
        }

        return tabs;
    };

    Model.prototype.getActiveTab = function (level = 0) {
        let tabs = this.getData('activeTab');

        return tabs[level] || 0;
    };

    Model.prototype.setActiveTab = function (index, level = 0) {
        let tabsLength = level === true ? this.getTabs().length : 0,
            tabs = this.getData('activeTab');

        if (index == -1) {
            index = tabsLength - 1;
        } else if (tabsLength > 0 && index > tabsLength - 1) {
            index = 0;
        }

        //We want reset all levels
        if (level === true) {
            Object.keys(tabs).forEach((tabLevel) => {
                Vue.set(tabs, tabLevel, index);
            });
        } else {
            Vue.set(tabs, level, index);
        }
    };

    Model.prototype.setDepthLevelByComponent = function (_component) {
        //If depth is set already
        if (this.data.depth_level !== -1) {
            return;
        }

        var parent = _component.$parent,
            depth = 0,
            treeUuids = [];

        while (parent && parent.$options.name != 'base-page-view') {
            //We need try to find in any of component where trees hierarchy may be made
            //Because model builder may be skipped in that structure. And we make tree directly from form builder
            if (['model-builder', 'form-builder', 'model-rows-builder'].includes(parent.$options.name)) {
                let uuid = parent.model.getData('uuid');

                if (uuid && treeUuids.includes(uuid) === false) {
                    treeUuids.push(uuid);

                    depth++;
                }
            }

            parent = parent.$parent;
        }

        this.setData('depth_level', depth);
        this.setData('tree', treeUuids);

        //Store model and save his model-builder component
        $store.commit('models/storeModel', this);
    };
};

export default Tabs;
