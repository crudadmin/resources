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
        getActiveModel(table){
            return _.find($store.state.models.models, { table });
        }
    }
}

export default modelMixins;