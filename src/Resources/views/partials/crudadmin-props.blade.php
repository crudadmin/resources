window.crudadmin = {
    logged : <?php echo Admin::getAdminGuard()->check() ? 'true' : 'false' ?>,

    ckfinder : <?php echo config('admin.ckfinder', false) === true ? 'true' : 'false' ?>,
    components : {},

    layout : {
        paths : {
            root : '<?php echo url('/') ?>',
            cache : '<?php echo \Admin\Core\Helpers\Storage\AdminFile::getPublicCacheDirectory() ?>',
            assets : '<?php echo admin_asset('/') ?>',
            baseURL : '<?php echo url('/admin') ?>',
            vendor : '<?php echo Admin::getAdminAssetsPath() ?>',
        },
        logo : {
            default : '<?php echo getAdminLogo() ?>',
            small : '<?php echo getAdminLogo(true) ?>',
        },
        author : {
            copyright : @json(config('admin.author')),
            name : '{{ config('admin.author.name', 'CrudAdmin') }}',
            text : '<?php echo date('Y') > config('admin.author.since', 2016) ? config('admin.author.since', 2016) . ' - '.date('Y') : date('Y') ?> <?php if (config('admin.author', true) !== false) { ?> by <?php echo config('admin.author.copyright', 'Marek Gogoľ') ?> <?php } ?>',
        },
        @if ( admin() )
        version : {
            app : '{{ Admin::getVersion() }}',
            resources : '{{ Admin::getResourcesVersion() }}',
            assets : '{{ Admin::getAssetsVersion() }}',
        },
        license_key: '{{ config('admin.license_key') }}',
        user: @json(admin()->setAdminResponse()),
        models : @json(AdminTree::get()),
        languages: @json(Admin::isEnabledLocalization() ? Localization::getLanguages() : []),
        admin_languages: @json(Admin::isEnabledAdminLocalization() ? AdminLocalization::getLanguages() : []),
        admin_language: @json(admin()->language ? admin()->language : AdminLocalization::get()),
        gettext: @json(config('admin.gettext', false)),
        locale: '{{ app()->getLocale() }}',
        localization: @json(trans('admin::admin')),
        dashboard: @json(getDashBoardView()),
        requests: {
            logout : '{{ admin_action('Auth\LoginController@logout') }}',
            show : '{{ action('\Admin\Controllers\Crud\DataController@show', [':model', ':id', ':subid']) }}',
            store : '{{ action('\Admin\Controllers\Crud\InsertController@store') }}',
            update : '{{ action('\Admin\Controllers\Crud\UpdateController@update') }}',
            delete : '{{ action('\Admin\Controllers\Crud\DataController@delete') }}',
            rows : '{{ action('\Admin\Controllers\Crud\DataController@getRows', [':table']) }}',
            getFieldHistory : '{{ action('\Admin\Controllers\HistoryController@getFieldHistory', [':model', ':id', ':field']) }}',
            removeFromHistory : '{{ action('\Admin\Controllers\HistoryController@removeFromHistory') }}',
            updateOrder : '{{ action('\Admin\Controllers\Crud\DataController@updateOrder') }}',
            buttonAction : '{{ action('\Admin\Controllers\ButtonController@action') }}',
            download : '{{ action('\Admin\Controllers\DownloadController@adminDownload') }}',
            translations : '{{ action('\Admin\Controllers\GettextController@getEditorResponse', [':id', ':table']) }}',
            switch_locale : '{{ action('\Admin\Controllers\GettextController@switchAdminLanguage', [':id']) }}',
            update_translations : '{{ action('\Admin\Controllers\GettextController@updateTranslations', [':id', ':table']) }}',
        },
        @endif
    }
};