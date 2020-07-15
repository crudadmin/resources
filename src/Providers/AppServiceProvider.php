<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Facades;
use Admin\Resources\Fields;
use Admin\Resources\Helpers;
use Admin\Resources\Middleware\CKFinderMiddleware;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $providers = [
        CommandsServiceProvider::class,
        PublishServiceProvider::class,
        RouteServiceProvider::class,
    ];

    protected $routeMiddleware = [
        'ckfinder' => CKFinderMiddleware::class,
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
        $this->loadViewsFrom(__DIR__ . '/../Resources/views', 'admin');

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

        $this->bootRouteMiddleware();
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

    public function bootRouteMiddleware()
    {
        foreach ($this->routeMiddleware as $name => $middleware) {
            $router = $this->app['router'];

            /*
             * Support for laravel 5.3
             * does not know aliasMiddleware method
             */
            if (method_exists($router, 'aliasMiddleware')) {
                $router->aliasMiddleware($name, $middleware);
            } else {
                $router->middleware($name, $middleware);
            }
        }
    }
}
