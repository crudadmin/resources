window.crudadmin = {
    logged : <?php echo auth()->guard('web')->check() ? 'true' : 'false' ?>,
    root : '<?php echo url('/') ?>',
    baseURL : '<?php echo url('/admin') ?>',
    path : '<?php echo Admin::getAdminAssetsPath() ?>',
    dev : <?php echo env('APP_DEBUG') ? 'true' : 'false' ?>,
    testing : <?php echo Admin::isTesting() ? 'true' : 'false' ?>,
    logout : '<?php echo admin_action('Auth\LoginController@logout') ?>'
};