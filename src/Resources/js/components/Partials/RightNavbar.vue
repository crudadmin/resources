<template>
<div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      <!-- User Account Menu -->
      <li class="dropdown user user-menu">
        <!-- Menu Toggle Button -->
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <!-- The user image in the navbar-->
          <img v-bind:src="getAvatar" class="user-image" alt="User Image">
          <!-- hidden-xs hides the username on small devices so only the image appears. -->
          <span class="hidden-xs" v-if="user">{{ user.username }}</span>
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
            <div class="pull-right">
              <a href="<?php echo admin_action('Auth\LoginController@logout'); ?>" class="btn btn-default btn-flat">{{ trans('admin.logout') }}</a>
            </div>
          </li>
        </ul>
      </li>
    </ul>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['user'],

    methods: {
        getPermissions() {
            if ( 'admins_groups' in this.user )
            {
                var permissions = [];

                for (var i = 0; i < this.user.admins_groups.length; i++){
                    permissions.push( this.user.admins_groups[i].name );
                }

                if ( permissions.length > 0 )
                    return permissions.join(', ');
            }

            return this.trans('admin-user');
        }
    }
}
</script>