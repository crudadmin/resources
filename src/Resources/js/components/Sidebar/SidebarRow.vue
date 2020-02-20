<template>
    <fragment>
        <router-link tag="li" class="treeview" v-if="isActive && !isGroup" :data-slug="row.slug" :to="{ name : 'admin-model', params: { model : row.slug } }" exact-active-class="active" active-class="active">
          <a @click="toggleMenu">
            <i :class="['fa', faMigrator(row.icon||defaultIcon)]" class="icon"></i>
            <span>{{ row.name }}</span>
            <i v-if="hasSubmenu" class="fa side-arrow" :class="{ 'fa-angle-down' : opened, 'fa-angle-left' : !opened }"></i>
          </a>
          <ul v-if="hasSubmenu" v-show="opened" class="treeview-menu">
            <sidebar-row v-for="(subrow, key) in row.submenu" :key="key" :row="subrow" :parent="levels"></sidebar-row>
          </ul>
        </router-link>

        <li class="treeview treeview-list" v-if="isActive && isGroup && hasChilds" :data-slug="row.slug" >
          <a @click="toggleMenu">
            <i class="fa icon" :class="faMigrator(row.icon||defaultIcon)||'fa-folder-open far'"></i>
            <span>{{ row.name }}</span>
            <i v-if="hasSubmenu" class="fa side-arrow" :class="{ 'fa-angle-down' : opened, 'fa-angle-left' : !opened }"></i>
          </a>
          <ul v-if="hasSubmenu" v-show="opened" class="treeview-menu">
            <sidebar-row v-for="(subrow, key) in row.submenu" :key="key" :row="subrow" :parent="levels"></sidebar-row>
          </ul>
        </li>
    </fragment>
</template>

<script>
import config from '../../config';

export default {
    name : 'sidebar-row',
    props: ['row', 'parent'],

    data() {
        return {
            opened : false,
            levels : [],
            defaultIcon : 'fa-link',
        };
    },

    created(){
        var levels = [];

        if ( this.parent ) {
            for ( var i = 0; i < this.parent.length; i++ ) {
                levels.push( this.parent[i] );
            }
        }

        levels.push( this.row );

        return this.levels = levels;
    },

    mounted(){
        this.openTree();
    },

    computed: {
        hasSubmenu() {
            return this.row.submenu.length !== 0;
        },
        isGroup() {
            return this.row.slug.substr(0, config.groups_prefix.length) == config.groups_prefix;
        },
        hasChilds(){
            for ( var key in this.row.submenu )
                return true;

            return false;
        },
        isActive(){
            return this.row.active !== false;
        }
    },

    methods: {
        //Recursively open all menu items way up
        openTree(){
            //If is opened actual model
            if ( this.row.table != this.$router.history.current.params.model )
                return;

            var parent = this;
            while(parent.$options.name == 'sidebar-row') {
                parent.opened = true;

                parent = parent.$parent;
            }
        },
        toggleMenu(){
            this.opened = !this.opened;
        },
    }
}
</script>