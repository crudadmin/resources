import Model from '@components/Helpers/Model/Model.js';

var modelMixins = {
    methods: {
        getFreshModel(table){
            let originalModel = this.$root.originalModels[table];

            if ( ! originalModel ){
                return;
            }

            return new Model(originalModel);
        },
        getActiveModel(table, depthLevel){
            if ( _.isNil(depthLevel) ) {
                return _.find($store.state.models.models, { table });
            } else {
                return _.filter($store.state.models.models, { table }).filter(model => model.getData('depth_level') == depthLevel)[0];
            }
        }
    }
}

export default modelMixins;