window.crudadmin = {
    logo : '<?php echo getAdminLogo() ?>',
    author : {
        name : '<?php echo config('admin.author.name', 'CrudAdmin') ?>',
        text : '<?php echo date('Y') > config('admin.author.since', 2016) ? config('admin.author.since', 2016) . ' - '.date('Y') : date('Y') ?> <?php if (config('admin.author', true) !== false) { ?> by <?php echo config('admin.author.copyright', 'Marek Gogoľ') ?> <?php } ?>',
    },
    logged : <?php echo Admin::getAdminGuard()->check() ? 'true' : 'false' ?>,
    root : '<?php echo url('/') ?>',
    cache_path : '<?php echo \Admin\Core\Helpers\Storage\AdminFile::getPublicCacheDirectory() ?>',
    admin_assets : '<?php echo admin_asset('/') ?>',
    baseURL : '<?php echo url('/admin') ?>',
    path : '<?php echo Admin::getAdminAssetsPath() ?>',
    dev : <?php echo env('APP_DEBUG') ? 'true' : 'false' ?>,
    devAdmin : <?php echo Admin::isDev() ? 'true' : 'false' ?>,
    ckfinder : <?php echo config('admin.ckfinder', false) === true ? 'true' : 'false' ?>,
    testing : <?php echo Admin::isTesting() ? 'true' : 'false' ?>,
    logout : '<?php echo admin_action('Auth\LoginController@logout') ?>',
    components : {},
};