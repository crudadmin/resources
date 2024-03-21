import Builder from '@components/Helpers/Builder/Builder';
import ModelTabs from './ModelTabs';
import ModelGroups from './ModelGroups';
import ModelFields from './ModelFields';
import ModelProperties from './ModelProperties';
import ModelCoreHelpers from './ModelCoreHelpers';
import ModelRowActions from './ModelRowActions';
import ModelFormActions from './ModelFormActions';
import ModelBus from './ModelBus';
import ModelTableRows from './ModelTableRows';
import ModelButtonActions from './ModelButtonActions';
import ModelDragAndDrop from './ModelDragAndDrop';
import ModelComponents from './ModelComponents';
import ModelEvents from './ModelEvents';

export const defaultSearchQuery = {
    column : null,
    query : null,
    query_to : null,
    interval : false,
};

const FreshBuilderData = () => {
    return {
        //Each model need to have generated uuid
        uuid : $app.generateUuid(),

        //Depth level of given model
        depth_level : -1,

        //All uuids of parent models tree for given model
        tree : [],

        //Actual database row for given model
        row : {},

        //All available rows data fetched from database
        rows : {
            data : [],
            buttons : {},
            count : 0,
            page : 1,
            loaded : false,
            save_children : [],
            limit : 0,
            limits : [ 5, 10, 20, 30, 50, 100, 200, 500, 1000 ],
            refreshing : false,
            maxpages : 10,
        },

        //Grid model sizes
        sizes : [],

        //Is form opened?
        formOpened: false,

        //Is row loading? Opening row state.
        loadingRow: false,

        //Order/sorting in table
        orderBy : [],

        //Is model dragged right now?
        dragging : {
            active : false,
            list : null,
        },

        //Selected form language
        selected_language_id : null,

        //Register components for given model
        registered_components : [],

        //Assigned form into model
        form : null,

        //Which tab is currently active
        activeTab : {},

        //Parent model language id
        langid : null,

        //Is searching?
        searching : false,

        //Default model columns
        default_columns : {},

        //Enabled columns
        enabled_columns : null,

        //Is model sending row?
        progress : false,

        //Is button action loading?
        button_loading : false,

        //Loaded model options
        modelOptions : {},

        //Model scopes
        scopes : [],

        //Assigned parent row. May be parent model, or imaginary parent row
        //only to filter displayed rows
        parentRow : null,

        //Search data
        search : {
            used : false,
            defaultQuery : defaultSearchQuery,
            queries : [],
        },

        //History support
        history : {
            history_id : null,
            data : {},
            id : null,
            rows : [],
            fields : [],
            changed_fields : [],
        },

        //Checked rows
        checked : [],

        //Refresh table intervals
        refresh : {},

        //Map events
        mapValues : [],

        //Model events
        events : [],

        mutators : [],

        //Additional form request data
        formRequest : {},
    }
}

const extensions = [
    ModelTabs,
    ModelGroups,
    ModelFields,
    ModelProperties,
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

const Model = () => {};

export default new Builder(Model, extensions, FreshBuilderData);