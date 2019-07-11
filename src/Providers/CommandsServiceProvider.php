<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Commands\AdminMigrationCommand;
use Admin\Resources\Commands\AdminModelCommand;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\ServiceProvider;

class CommandsServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerCommands();
    }

    private function registerCommands()
    {
        $this->app->bind('gogol::admin.update', AdminUpdateCommand::class);

        $this->commands([
            'gogol::admin.update',
        ]);
    }
}