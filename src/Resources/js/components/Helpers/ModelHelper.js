import ModelTabs from './Model/ModelTabs';
import ModelGroups from './Model/ModelGroups';
import ModelFields from './Model/ModelFields';
import ModelProperties from './Model/ModelProperties';
import ModelData from './Model/ModelData';
import ModelCoreHelpers from './Model/ModelCoreHelpers';
import ModelRowActions from './Model/ModelRowActions';
import ModelFormActions from './Model/ModelFormActions';
import ModelBus from './Model/ModelBus';
import ModelTableRows from './Model/ModelTableRows';
import ModelButtonActions from './Model/ModelButtonActions';
import ModelDragAndDrop from './Model/ModelDragAndDrop';
import ModelComponents from './Model/ModelComponents';
import ModelEvents from './Model/ModelEvents';

const Model = () => {};

var extensions = [
    ModelTabs,
    ModelGroups,
    ModelFields,
    ModelProperties,
    ModelData,
    ModelCoreHelpers,
    ModelTableRows,
    ModelButtonActions,
    ModelDragAndDrop,
    ModelRowActions,
    ModelFormActions,
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