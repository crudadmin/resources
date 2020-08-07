<?php

function hashAdminVersionName($version)
{
    //We want hash version name
    return \Cache::rememberForever('admin_version_'.$version, function() use ($version) {
        return md5(sha1($version.env('APP_ENV')));
    });
}

if (! function_exists('admin_asset')) {
    function admin_asset($path, $root = false)
    {
        if (substr($path, 0, 7) == 'http://' || substr($path, 0, 8) == 'https://') {
            return $path;
        }

        $version = hashAdminVersionName((Admin::getVersion() == 'dev-master' ? 'dev-master' : Admin::getAssetsVersion()));

        $basepath = ($root == false ? Admin::getAdminAssetsPath() : '') . '/' . trim($path, '/');

        $path = $basepath;

        //If no query is available
        if ( strpos($path, '?') === false ) {
            $path .= '?v='.$version;

            if ( file_exists($basepath = public_path($basepath)) ){
                $path .= '&t='.filemtime($basepath);
            }
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

function getAdminLogo()
{
    $name = config('admin.name');

    if ( starts_with($name, public_path()) ) {
        $path = str_replace_first(public_path(), '', $name);

        return '<img src="'.asset($path).'">';
    }

    return $name;
}
