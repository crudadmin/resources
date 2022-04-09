const defaultModalState = {
    type : null, // success,error,warning...
    toast : false,
    title : null,
    message : null,
    success: null,
    close: null,
    component: null,
    openedAt : null,
    toast : false,
    visible : false,
}

const modal = {
    namespaced: true,

    state: {
        modal : _.cloneDeep(defaultModalState),
    },

    mutations: {
        openModal(state, { title, message, type, toast, success, close, component, key }){
            state.modal.key = key;
            state.modal.type = type||'primary';
            state.modal.toast = toast||false;
            state.modal.title = title;
            state.modal.message = message;
            state.modal.success = success;
            state.modal.close = close;
            state.modal.component = component;
            state.modal.openedAt = new Date().getTime();
            state.modal.visible = true;

            return state.modal;
        },
        closeModal(state){
            state.modal = _.cloneDeep(defaultModalState);
        },
        closeModalWithAnimation(state){
            state.modal.visible = false;
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
        closeModalWithAnimation({state, commit, dispatch}, options){
            commit('closeModalWithAnimation');

            let openedAt = state.modal.openedAt;

            //We can close with delay only modal with same opening time.
            setTimeout(() => {
                if ( state.modal.openedAt === openedAt ) {
                    dispatch('closeModal', options);
                }
            }, 250);
        },
    },

    getters: {

    }
}

export default modal;