<?php

function hashAdminVersionName($version)
{
    //We want hash version name
    return \Cache::rememberForever('admin_version_'.$version, function() use ($version) {
        return md5(sha1($version.env('APP_ENV')));
    });
}

if (! function_exists('admin_asset')) {
    function admin_asset($path, $root = false, $dynamic = false)
    {
        if (substr($path, 0, 7) == 'http://' || substr($path, 0, 8) == 'https://') {
            return $path;
        }

        $version = hashAdminVersionName((Admin::getVersion() == 'dev-master' ? 'dev-master' : Admin::getAssetsVersion()));

        $basepath = ($root == false ? Admin::getAdminAssetsPath() : '') . '/' . trim($path, '/');

        $path = $basepath;

        //If no query is available
        if ( strpos($path, '?') === false && is_dir(public_path($path)) == false ) {
            $path .= '?v='.$version;

            if ( file_exists($basepath = public_path($basepath)) ){
                $path .= '&t='.filemtime($basepath);
            }
        }

        if ( $dynamic === true ){
            $path = str_replace_last('.css', '.dynamic.css', $path);
        }

        return asset($path);
    }
}

if (! function_exists('admin_action')) {
    function admin_action($controller, $params = null)
    {
        return action('\Admin\Resources\Controllers\\'.$controller, $params);
    }
}

if (! function_exists('isActiveController')) {
    function isActiveController($controller, $text = null)
    {
        return \Admin\Helpers\Helper::isActive($controller, $text);
    }
}

function crudadmin_resources_path($path = null)
{
    return __DIR__.'/../Resources/'.$path;
}

function getAdminLogo($small = false)
{
    $configLogos = array_wrap(config('admin.logo'));

    $name = ($configLogos[0] ?? null) ?: config('admin.name');

    if ( $small ) {
        $name = ($configLogos[1] ?? null) ?: $name;
    }

    if (
        starts_with($name, public_path())
        || substr($name, 0, 5) == 'http:'
        || substr($name, 0, 6) == 'https:'
    ) {
        $path = str_replace_first(public_path(), '', $name);

        return '<img src="'.asset($path).'">';
    }

    return $name;
}

/*
 * Return dashboard content
 */
function getDashBoardView()
{
    $dashboard = config('admin.dashboard');

    //Try load blade component
    $path = $dashboard ?: resource_path('views/admin/dashboard.blade.php');
    if (file_exists($path)) {
        return [
            'html' => view()->file($path)->render(),
        ];
    }

    //If vue template is available
    if ( $dashboard ) {
        return [
            'vue' => $dashboard
        ];
    }
}
