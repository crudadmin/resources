<?php

namespace Admin\Resources\Providers;

use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use App\Core\Helpers\Language;
use Localization;

class RouteServiceProvider extends ServiceProvider
{
    protected $adminNamespace = 'Admin\Resources\Controllers';

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    public function map(Router $router)
    {
        $this->mapWebRoutes($router);

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    protected function mapWebRoutes(Router $router)
    {
        //Admin routes
        $router->group([
            'namespace' => $this->adminNamespace,
            'middleware' => ['web', 'admin.providers'],
        ], function ($router) {
            require __DIR__ . '/../routes.php';
        });
    }
}
