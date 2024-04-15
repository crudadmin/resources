<template>
    <fragment>
        <router-link
            tag="li"
            class="treeview"
            v-if="isActive && !isGroup"
            :data-slug="row.slug"
            :to="{ name: 'admin-model', params: { model: row.slug } }"
            exact-active-class="active"
            active-class="active"
        >
            <a @click="toggleMenu">
                <i :class="['fa', faMigrator(row.icon || defaultIcon)]" class="icon"></i>
                <span>{{ row.name }}</span>
                <i v-if="hasSubmenu" class="fa side-arrow" :class="{ 'fa-angle-down': opened, 'fa-angle-left': !opened }"></i>
            </a>
            <ul v-if="hasSubmenu" class="treeview-menu">
                <sidebar-row v-for="(subrow, key) in row.submenu" :key="key" :row="subrow" :parent="levels"></sidebar-row>
            </ul>
        </router-link>

        <li class="treeview treeview-list" :class="{ active: opened }" v-if="isActive && isGroup && hasChilds" :data-slug="row.slug">
            <a @click="toggleMenu">
                <i class="fa icon" :class="faMigrator(row.icon || 'fa-folder-open far')"></i>
                <span>{{ row.name }}</span>
                <i v-if="hasSubmenu" class="fa side-arrow" :class="{ 'fa-angle-down': opened, 'fa-angle-left': !opened }"></i>
            </a>
            <ul v-if="hasSubmenu" class="treeview-menu">
                <sidebar-row v-for="(subrow, key) in row.submenu" :key="key" :row="subrow" :parent="levels"></sidebar-row>
            </ul>
        </li>
    </fragment>
</template>

<script>
import config from '../../config';

export default {
    name: 'sidebar-row',
    props: ['row', 'parent'],

    data() {
        return {
            opened: false,
            levels: [],
            defaultIcon: 'fa-link',
        };
    },

    created() {
        var levels = [];

        if (this.parent) {
            for (var i = 0; i < this.parent.length; i++) {
                levels.push(this.parent[i]);
            }
        }

        levels.push(this.row);

        return (this.levels = levels);
    },

    mounted() {
        this.openTree();

        eventHub.$on('closeMenu', (parent) => {
            if (this.getParentLi() == parent || this == parent) {
                return;
            }

            this.opened = false;
        });
    },

    computed: {
        hasSubmenu() {
            return this.row.submenu.length !== 0;
        },
        isGroup() {
            return this.row.slug.substr(0, config.groups_prefix.length) == config.groups_prefix;
        },
        hasChilds() {
            for (var key in this.row.submenu) {
                return true;
            }

            return false;
        },
        isActive() {
            return (this.row.active !== false && this.row.in_menu !== false) || this.opened == true;
        },
    },

    methods: {
        getParentLi() {
            var parent = this,
                parents = [];

            while (parent.$options.name == 'sidebar-row') {
                parent = parent.$parent;

                parents.push(parent);
            }

            return parents[parents.length - 2] || this;
        },
        //Recursively open all menu items way up
        openTree() {
            //If is opened actual model
            if (this.row.table != this.$router.history.current.params.model) {
                return;
            }

            //We need open all parent menus
            var parent = this;
            while (parent.$options.name == 'sidebar-row') {
                parent.opened = true;

                parent = parent.$parent;
            }
        },
        toggleMenu() {
            this.opened = !this.opened;

            //Close all menus which does not have same parent li as selected one
            eventHub.$emit('closeMenu', this.getParentLi());
        },
    },
};
</script>
