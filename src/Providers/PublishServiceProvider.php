<?php

namespace Admin\Resources\Providers;

use Illuminate\Support\ServiceProvider;

class PublishServiceProvider extends ServiceProvider
{
    public function boot()
    {
        /*
         * Admin UI Publishes
         */
        $this->publishes([__DIR__ . '/../../dist' => public_path('vendor/crudadmin') ], 'admin.resources');
    }
}
