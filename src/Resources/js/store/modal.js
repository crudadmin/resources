const defaultModalState = {
    type : null, // success,error,warning...
    title : null,
    message : null,
    success: null,
    close: null,
    component: null,
    openedAt : null,
}

const modal = {
    namespaced: true,

    state: {
        modal : _.cloneDeep(defaultModalState),
    },

    mutations: {
        openModal(state, { title, message, type, success, close, component, key }){
            state.modal.key = key;
            state.modal.type = type||'primary';
            state.modal.title = title;
            state.modal.message = message;
            state.modal.success = success;
            state.modal.close = close;
            state.modal.component = component;
            state.modal.openedAt = new Date().getTime();

            return state.modal;
        },
        closeModal(state){
            state.modal = _.cloneDeep(defaultModalState);
        }
    },

    actions: {
        openModal({commit}, options){
            commit('openModal', options);

            //After opening alert unfocus focused input
            //for prevent sending of new form ajax instance...
            if ("activeElement" in document) {
                document.activeElement.blur();
            }
        },
        successModal({ commit }, options = {}){
            commit('openModal', {
                title : $app.trans('info'),
                type : 'success',
                ...(options||{}),
            });
        },
        errorModal({ commit }, options = {}){
            commit('openModal', {
                title : $app.trans('warning'),
                message : $app.trans('unknown-error'),
                type : 'danger',
                ...(options||{}),
            });
        },
        warningModal({ commit }, options = {}){
            commit('openModal', {
                title : $app.trans('warning'),
                type : 'warning',
                ...(options||{}),
            });
        },
        closeModal({state, commit}, { callback }){
            if ( callback && typeof callback == 'function' ){
                try {
                    callback(state.modal);
                } catch(e){
                    console.error(e);
                }
            }

            commit('closeModal');
        },
    },

    getters: {

    }
}

export default modal;