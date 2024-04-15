const sitetree = {
    namespaced: true,

    state: {
        models: {},
    },

    mutations: {
        setModels(state, models) {
            state.models = models;
        },
    },
};

export default sitetree;
