import Model from '@components/Helpers/Model/Model.js';

var modelMixins = {
    methods: {
        getFreshModel(table, bootDepthFromComponent){
            let originalModel = this.$root.originalModels[table];

            if ( ! originalModel ){
                return;
            }

            const m = new Model(originalModel);

            //Boot model depth
            if ( bootDepthFromComponent ){
                m.setDepthLevelByComponent(bootDepthFromComponent);
            }

            return m;
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