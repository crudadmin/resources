<?php
if ( ! function_exists('admin_asset') )
{
    function admin_asset($path, $root = false)
    {
        if (substr($path, 0, 7) == 'http://' || substr($path, 0, 8) == 'https://')
            return $path;

        return asset(($root == false ? Admin::getAdminAssetsPath() : '') . '/' . trim($path, '/'));
    }
}

if ( ! function_exists('admin_action') )
{
    function admin_action($controller, $params = null)
    {
        return action('\Admin\Resources\Controllers\\'.$controller, $params);
    }
}

if ( ! function_exists('isActiveController') )
{
    function isActiveController($controller, $text = null)
    {
        return \Admin\Helpers\Helper::isActive($controller, $text);
    }
}