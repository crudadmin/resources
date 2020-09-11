const header = {
    namespaced: true,

    state: {
        isActiveMobileMenu : false,
    },

    mutations: {
        setMobileMenuActive(state, bool){
            state.isActiveMobileMenu = bool;
        },
        toggleMobileMenu(state){
            state.isActiveMobileMenu = !state.isActiveMobileMenu;
        }
    },
}

export default header;