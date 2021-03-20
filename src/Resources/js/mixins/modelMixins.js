import ModelHelper from '@components/Helpers/ModelHelper.js';

var modelMixins = {
    methods: {
        getFreshModel(table){
            let originalModel = this.$root.originalModels[table];
            if ( ! originalModel ){
                return;
            }

            return new ModelHelper(originalModel);
        },
        getActiveModel(table){
            return _.find($store.state.models.models, { table });
        }
    }
}

export default modelMixins;