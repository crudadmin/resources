var modelMixins = {
    methods: {
        getActiveModel(table){
            return _.find($store.state.models.models, { table });
        }
    }
}

export default modelMixins;