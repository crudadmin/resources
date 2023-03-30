<template>
    <div>
        <section class="sidebar">
            <ul class="sidebar-menu">
                <sidebar-row v-for="(row, key) in groups" :key="key" :row="row"></sidebar-row>
            </ul>
        </section>

        <div class="footer-sidebar">
            <div class="footer-content">
                <p v-if="author !== false">Developed by <a href="https://www.marekgogol.sk" target="_blank">Marek Gogoľ</a></p>
                <p>&copy; 2016 - {{ year }} <a href="https://www.crudadmin.com" target="_blank">CrudAdmin</a></p>
                <br v-if="author !== false">
                <p>Version <a target="_blank" :href="'https://packagist.org/packages/crudadmin/crudadmin#'+version">{{ version }}</a></p>
            </div>
            <div class="toggle-menu-size" @click="toggleSidebarMenu">
                <i class="fa" :class="{ 'fa-angle-left' : sidebarMenuVisible, 'fa-angle-right' : !sidebarMenuVisible }"></i>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarRow from './SidebarRow.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    props: ['rows', 'languages', 'user', 'version', 'author'],

    components: { SidebarRow },

    watch: {
        rows(rows){
            this.$nextTick(() => {
                this.addActiveTreeClasses();
            });
        },
    },

    computed : {
        ...mapState('header', [
            'sidebarMenuVisible'
        ]),
        year(){
            return moment().format('Y');
        },
        groups(){
            var groups = this.rows;

            for ( var key in groups )
            {
                //Is allowed module
                if ( groups[key].active === true )
                    continue;

                if ( groups[key].active === false || ! this.hasActiveModule(groups[key].submenu) )
                    delete groups[key];
            }

            return groups;
        }
    },

    methods: {
        ...mapMutations('header', [
            'toggleSidebarMenu',
        ]),
        addActiveTreeClasses(){
            var owner = $('.sidebar li[data-slug="'+this.$router.currentRoute.params.model+'"]');

            owner.parent().addClass('menu-open').css('display', 'block').parents('.treeview').addClass('active');

            $('.sidebar .treeview-menu a').click(function(){
                $(this).parent().siblings('.active').removeClass('active').find('.menu-open').slideUp();
            });
        },
        hasActiveModule(modules){
            for ( var key in modules )
            {
                if ( modules[key].active === true )
                    return true;

                if ( modules[key].submenu && this.hasActiveModule(modules[key].submenu) ){
                    return true;
                }
            }

            return false;
        }
    }
}
</script>