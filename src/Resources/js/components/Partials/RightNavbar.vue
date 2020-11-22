<template>
<div class="navbar-custom-menu" v-if="user">
    <div class="dropdown fields-list mr-4" fields-list>
        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" v-if="languages.length > 1">
            <i class="--icon-left fa fa-globe"></i>
            {{ language ? language.name : '' }}
            <i class="--icon-right fa fa-angle-down"></i>
        </button>
        <ul class="dropdown-menu menu-left dropdown-menu-right">
            <li @click.prevent="changeLocale(item)" v-for="item in languages" :class="{ 'active' : language && language.id == item.id }">
                {{ item.name }}
            </li>
        </ul>
    </div>
    <ul class="nav navbar-nav">
        <!-- User Account Menu -->
        <li class="user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="user-toggle" data-toggle="dropdown">
                <img v-bind:src="getAvatar" class="user-image" alt="User Image">

                <span v-if="user">{{ user.username }}</span>
                <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu">
                <!-- The user image in the menu -->
                <li class="user-header">
                    <img v-bind:src="getAvatar" class="img-circle" alt="User Image">

                    <p v-if="user">
                        {{ user.username }} - {{ getPermissions }}
                    </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">

                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                    <a :href="logout" class="btn btn-primary">{{ trans('logout') }}</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['user'],

    computed: {
        language(){
            return this.$root.admin_language;
        },
        languages(){
            return this.$root.admin_languages;
        },
        logout(){
            return window.crudadmin.logout;
        },
        getPermissions() {
            if ( 'roles' in this.user ){
                var permissions = [];

                for (var i = 0; i < this.user.roles.length; i++){
                    permissions.push( this.user.roles[i].name );
                }

                if ( permissions.length > 0 ) {
                    return permissions.join(', ');
                }
            }

            return this.trans('admin-user');
        }
    },

    methods: {
        async changeLocale(language){
            var url = this.$root.requests.get('switch_locale', {
                id : language.id
            });

            await this.$http.get(url);

            window.location.reload();
        }
    }
}
</script>