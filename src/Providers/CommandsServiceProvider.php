<?php

namespace Admin\Resources\Providers;

use Admin\Resources\Commands\AdminUpdateCommand;
use Admin\Resources\Commands\CKFinderDownloadCommand;
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
        $this->commands([
            AdminUpdateCommand::class,
            CKFinderDownloadCommand::class,
        ]);
    }
}
