<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Helpers\Lfm\ModelMiddleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class FileManagerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function register()
    {
        if ( config('admin.filemanager', false) === false ) {
            return;
        }

        $this->mergeConfigs('lfm');

        Route::group(['prefix' => 'admin/filemanager', 'middleware' => ['web', 'ckfinder', ModelMiddleware::class]], function () {
            \UniSharp\LaravelFilemanager\Lfm::routes();
        });
    }

    public function boot()
    {
        $this->addFilemanagerStorage();
    }

    /*
     * Merge crudadmin config with esolutions config
     */
    private function mergeConfigs($key)
    {
        //Additional CrudAdmin Config
        $crudAdminConfig = require __DIR__.'/../Config/'.$key.'.php';

        $config = $this->app['config']->get($key, []);

        $this->app['config']->set($key, array_merge($crudAdminConfig, $config));

        //Merge selected properties with one/two dimensional array
        foreach ([] as $property) {
            if (! array_key_exists($property, $crudAdminConfig) || ! array_key_exists($property, $config)) {
                continue;
            }

            $attributes = array_merge($config[$property], $crudAdminConfig[$property]);

            $this->app['config']->set($key.'.'.$property, $attributes);
        }
    }

    private function addFilemanagerStorage()
    {
        $crudadminDisk = config('filesystems.disks.'.config('admin.disk'));

        $this->app['config']->set('filesystems.disks.crudadmin_filemanager', array_merge($crudadminDisk, [
            'root' => ($crudadminDisk['root'] ?? '').'/editor',
            'url' => ($crudadminDisk['url'] ?? '').'/editor',
        ]));
    }
}
