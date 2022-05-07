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
    class : null,
}

const modal = {
    namespaced: true,

    state: {
        modals : [],

        modal : _.cloneDeep(defaultModalState),
    },

    mutations: {
        openModal(state, options){
            const { title, message, type, toast, success, close, component, key } = options;

            const modal = {
                key : key,
                type : type||'primary',
                toast : toast||false,
                title : title,
                message : message,

                success : success,
                close : close,
                component : component,
                openedAt : new Date().getTime(),
                visible : true,
                class : options.class||'',
            };

            state.modals.push(modal);

            return state.modals[state.modals.length - 1];
        },
        closeModal(state, modal){
            let index = _.findIndex(state.modals, { openedAt : modal.openedAt });

            state.modals.splice(index, 1);
        },
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
        closeModal({state, commit}, { modal, callback, animation = true }){
            const delay = animation === true ? 250 : 0;

            modal.visible = false;
            setTimeout(() => {

                if ( callback && typeof callback == 'function' ){
                    try {
                        callback(state.modal);
                    } catch(e){
                        console.error(e);
                    }
                }

                commit('closeModal', modal);
            }, delay);
        },
    },
}

export default modal;