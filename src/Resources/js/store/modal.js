const defaultModalState = {
    type: null, // success,error,warning...
    toast: false,
    title: null,
    message: null,
    success: null,
    close: null,
    component: null,
    openedAt: null,
    toast: false,
    visible: false,
    class: null,
    actions: [
        // Example:
        // {
        //     name : 'My button',
        //     class : 'btn-primary',
        //     callback : (modal) => {},
        //     enter : true,
        //     close : false,
        // }
    ],
};

const getModalActions = (modal) => {
    let actions = [];

    if (
        //Is close modal
        modal.close ||
        //Is success modal
        (modal.type == 'success' && !modal.close) ||
        //Is modal without any action
        (!modal.close && !modal.success)
    ) {
        actions.push({
            name: $app.trans('close'),
            class: 'btn-secondary',
            callback: modal.close,
            close: true,
        });
    }

    if (modal.success) {
        actions.push({
            name: $app.trans('accept'),
            class: 'btn-primary',
            callback: modal.success,
            enter: true,
        });
    }

    return actions;
};

const modal = {
    namespaced: true,

    state: {
        modals: [],

        modal: _.cloneDeep(defaultModalState),
    },

    mutations: {
        openModal(state, options) {
            const { title, message, type, toast, success, close, component, key, actions } = options;

            let modal = {
                key: key,
                type: type || 'primary',
                toast: toast || false,
                title: title,
                message: message,

                success: success,
                close: close,
                component: component,
                openedAt: new Date().getTime(),
                visible: true,
                class: options.class || '',
            };

            modal.actions = _.isNil(actions) ? getModalActions(modal) : actions;

            state.modals.push(modal);

            return state.modals[state.modals.length - 1];
        },
        closeModal(state, modal) {
            let index = _.findIndex(state.modals, { openedAt: modal.openedAt });

            state.modals.splice(index, 1);
        },
    },

    actions: {
        openModal({ commit }, options) {
            commit('openModal', options);

            //After opening alert unfocus focused input
            //for prevent sending of new form ajax instance...
            if ('activeElement' in document) {
                document.activeElement.blur();
            }
        },
        successModal({ commit }, options = {}) {
            commit('openModal', {
                title: $app.trans('info'),
                type: 'success',
                ...(options || {}),
            });
        },
        errorModal({ commit }, options = {}) {
            commit('openModal', {
                title: $app.trans('warning'),
                message: $app.trans('unknown-error'),
                type: 'danger',
                ...(options || {}),
            });
        },
        warningModal({ commit }, options = {}) {
            commit('openModal', {
                title: $app.trans('warning'),
                type: 'warning',
                ...(options || {}),
            });
        },
        async closeModal({ state, commit }, { modal, callback, animation = true, progress }) {
            const delay = animation === true ? 250 : 0;

            if (callback && typeof callback == 'function') {
                try {
                    //Disable modal closing
                    if ((await callback(modal)) === false) {
                        return;
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            modal.visible = false;

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();

                    commit('closeModal', modal);
                }, delay);
            });
        },
    },

    getters: {
        isModalActive: (state, getters) => (modal) => {
            let index = _.findIndex(state.modals, { openedAt: modal.openedAt });

            return index === state.modals.length - 1;
        },
    },
};

export default modal;
