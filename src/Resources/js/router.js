//Router
import VueRouter from 'vue-router';

//Layouts
import DashboardView from './components/Views/DashBoardView.vue';
import BasePageView from './components/Views/BasePageView.vue';

var router = new VueRouter({
    routes : [
        {
            path : '*',
            name : 'dashboard',
            component: DashboardView,
        },
        {
            path : '/page/:model',
            name : 'admin-model',
            component: BasePageView,
        }
    ]
});

router.afterEach((to, from) => {
    store.commit('header/setMobileMenuActive', false);
})

export default router;