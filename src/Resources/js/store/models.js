const models = {
    namespaced: true,

    state: {
        models : [],
    },

    mutations: {
        storeModel(state, model){
            state.models.push(model);
        },
    },

    getters: {
        getModel : (state, getters) => uuid => {
            return _.find(state.models, {
                data : {
                    uuid
                }
            });
        }
    }
}

export default models;