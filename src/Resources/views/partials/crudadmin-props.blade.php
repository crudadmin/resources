window.crudadmin = {
    logged : @json(Admin::getAdminGuard()->check()),

    ckfinder : @json(config('admin.ckfinder', false) === true),
    components : {},

    layout : {
        env : '{{ config('app.env') }}',
        debug : @json(config('app.debug')),
        paths : {
            root : '{{ url('/') }}',
            cache : '{{ \Admin\Core\Helpers\Storage\AdminFile::getPublicCacheDirectory() }}',
            assets : '{{ admin_asset('/') }}',
            baseURL : '{{ url('/admin') }}',
            vendor : '{{ Admin::getAdminAssetsPath() }}',
        },
        logo : {
            default : '{!! getAdminLogo() !!}',
            small : '{!! getAdminLogo(true) !!}',
        },
        author : @json(config('admin.author', true)),
        copyright : {
            years : '{{ config('admin.copyright.years', (date('Y') > ($since = config('admin.copyright.since', 2016))) ? $since. ' - '.date('Y') : date('Y')) }}',
            website : '{{ config('admin.copyright.website', 'https://www.crudadmin.com') }}',
            name : '{{ config('admin.copyright.name', 'CrudAdmin') }}',
        },
        @if ( admin() )
        version : {
            hash: '{{ Admin::getAppHash() }}',
            app : '{{ Admin::getVersion() }}',
            resources : '{{ Admin::getResourcesVersion() }}',
            assets : '{{ Admin::getAssetsVersion() }}',
        },
        license_key: '{{ config('admin.license_key') }}',
        user: @json(admin()->setAuthResponse()),
        models : @json(AdminTree::get()),
        languages: @json(Admin::isEnabledLocalization() ? Localization::getLanguages() : []),
        statistics : @json(Admin::getStatistics()),
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