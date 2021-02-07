window.crudadmin = {
    logged : <?php echo auth()->guard('web')->check() ? 'true' : 'false' ?>,
    root : '<?php echo url('/') ?>',
    admin_assets : '<?php echo admin_asset('/') ?>',
    baseURL : '<?php echo url('/admin') ?>',
    path : '<?php echo Admin::getAdminAssetsPath() ?>',
    dev : <?php echo env('APP_DEBUG') ? 'true' : 'false' ?>,
    ckfinder : <?php echo config('admin.ckfinder', false) === true ? 'true' : 'false' ?>,
    testing : <?php echo Admin::isTesting() ? 'true' : 'false' ?>,
    logout : '<?php echo admin_action('Auth\LoginController@logout') ?>'
};