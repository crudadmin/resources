import Tabs from './TabsHelper.js';
import Groups from './GroupsHelper.js';
import Fields from './FieldsHelper';
import ModelProperties from './ModelProperties';
import ModelData from './Model/ModelData';
import ModelCoreHelpers from './Model/ModelCoreHelpers';
import RowActions from './Model/RowActions';
import FormActions from './Model/FormActions';
import ModelBus from './Model/ModelBus';
import ModelTableRows from './Model/ModelTableRows';
import ModelComponents from './Model/ModelComponents';
import ModelEvents from './Model/ModelEvents';

const Model = () => {};

var extensions = [
    Tabs,
    Groups,
    Fields,
    ModelProperties,
    ModelData,
    ModelCoreHelpers,
    ModelTableRows,
    RowActions,
    FormActions,
    ModelComponents,
    ModelEvents,
    ModelBus,
];

/*
 * Bind given model properties
 */
const ModelHelper = function(rawModel){
    //Does not initialize already initialized model
    if ( rawModel._initialized === true ){
        return rawModel;
    }

    rawModel = _.cloneDeep(rawModel);

    rawModel._initialized = true;

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