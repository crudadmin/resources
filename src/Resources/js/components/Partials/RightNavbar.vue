<template>
<div class="navbar-custom-menu">
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
            <div class="pull-right">
              <a href="#logout" class="btn btn-primary">{{ trans('logout') }}</a>
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

    computed: {
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