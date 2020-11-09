import Tabs from './TabsHelper.js';
import Groups from './GroupsHelper.js';
import Fields from './FieldsHelper';
import ModelProperties from './ModelProperties';

const Model = () => {};

var extensions = [
    Tabs,
    Groups,
    Fields,
    ModelProperties,
];

/*
 * Bind given model properties
 */
const ModelHelper = function(data){
    //Bind scopes attribute
    if ( data.scopes === undefined ) {
        data.scopes = [];
    }

    var core = new Model;

    //Copy all given model attributes
    for ( var key in data ) {
        core[key] = data[key];
    }

    //Install all extensions
    for ( var key in extensions ) {
        extensions[key](Model);
    }

    return core;
}

export default ModelHelper;