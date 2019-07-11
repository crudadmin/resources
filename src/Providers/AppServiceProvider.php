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
        PublishServiceProvider::class,
        RouteServiceProvider::class,
    ];

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        /*
         * Bind variable to admin views path
         */
        $this->loadViewsFrom(__DIR__ . '/../Views', 'admin');

        /*
         * Load admin translates
         */
        $this->loadTranslationsFrom(__DIR__.'/../Resources/lang/', 'admin');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerProviders();
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