<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Commands\AdminUpdateCommand;
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
