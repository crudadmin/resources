<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Facades;
use Admin\Resources\Helpers;
use Admin\Resources\Fields;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $providers = [
        CommandsServiceProvider::class,
    ];

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        //Load translations
        $this->loadTranslationsFrom(__DIR__.'/../Resources/lang/', 'admin.core');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //Merge configs
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php', 'admin'
        );

        $this->registerFacades();

        $this->registerProviders();
    }

    /*
     * Register facades helpers and aliases
     */
    public function registerFacades()
    {
        //Register facades
        foreach ($this->facades as $alias => $facade) {
            $this->app->bind($alias, $facade['helper']);
        }

        //Register aliasess
        $this->app->booting(function () {
            $loader = \Illuminate\Foundation\AliasLoader::getInstance();

            foreach ($this->facades as $facade) {
                $loader->alias($facade['classname'], $facade['facade']);
            }
        });
    }

    /*
     * Register service providers
     */
    public function registerProviders($providers = null)
    {
        foreach ($providers ?: $this->providers as $provider) {
            app()->register($provider);
        }
    }
}