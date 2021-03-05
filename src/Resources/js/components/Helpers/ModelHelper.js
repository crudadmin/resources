import Tabs from './TabsHelper.js';
import Groups from './GroupsHelper.js';
import Fields from './FieldsHelper';
import ModelProperties from './ModelProperties';
import ModelData from './Model/ModelData';
import ModelCoreHelpers from './Model/ModelCoreHelpers';
import RowActions from './Model/RowActions';
import ModelBus from './Model/ModelBus';

const Model = () => {};

var extensions = [
    Tabs,
    Groups,
    Fields,
    ModelProperties,
    ModelData,
    ModelCoreHelpers,
    RowActions,
    ModelBus,
];

/*
 * Bind given model properties
 */
const ModelHelper = function(rawModel){
    //Bind scopes attribute
    if ( rawModel.scopes === undefined ) {
        rawModel.scopes = [];
    }

    var core = new Model;

    //Copy all given model attributes
    for ( var key in rawModel ) {
        core[key] = rawModel[key];
    }

    //Install all extensions
    for ( var key in extensions ) {
        extensions[key](Model, core);
    }

    return core;
}

export default ModelHelper;