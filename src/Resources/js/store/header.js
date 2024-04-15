const header = {
    namespaced: true,

    state: {
        isActiveMobileMenu: false,
        sidebarMenuVisible: true,
    },

    mutations: {
        setMobileMenuActive(state, bool) {
            state.isActiveMobileMenu = bool;
        },
        toggleMobileMenu(state) {
            state.isActiveMobileMenu = !state.isActiveMobileMenu;
        },
        toggleSidebarMenu(state) {
            state.sidebarMenuVisible = !state.sidebarMenuVisible;
        },
    },
};

export default header;
