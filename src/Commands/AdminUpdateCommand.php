<?php

namespace Admin\Resources\Commands;

use Admin;
use Admin\Resources\Events\OnAdminUpdate;
use Artisan;
use File;
use Illuminate\Console\Command;

class AdminUpdateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Admin packpage';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->removeOldVendor();

        $this->publishVendor();

        Admin::publishAssetsVersion();

        $this->prepareStorage();

        $this->line('Updating completed!');

        parent::__construct();
    }

    /*
     * Removes old vendor directories
     */
    public function removeOldVendor()
    {
        $publicVendorPath = Admin::getAdminAssetsPath();

        $remove = [
            $publicVendorPath.'/build',
            $publicVendorPath.'/js',
            $publicVendorPath.'/plugins',
            $publicVendorPath.'/css',
        ];

        foreach ($remove as $file) {
            $path = public_path($file);

            if (! file_exists($path)) {
                continue;
            }

            if (is_dir($path)) {
                File::deleteDirectory($path);
            } else {
                unlink($path);
            }
        }

        $this->line('<comment>+ Old Vendor directories has been successfully removed</comment>');
    }

    /*
     * Publish new vendor directories
     */
    public function publishVendor()
    {
        Artisan::call('vendor:publish', [
            '--tag' => 'admin.resources',
        ]);

        event(new OnAdminUpdate($this));

        //Publish filemanager vendor
        if ( config('admin.filemanager', false) === true ) {
            Admin::addGitignoreFiles([
                public_path('vendor/laravel-filemanager')
            ]);

            Artisan::call('vendor:publish', [ '--tag' => 'lfm_public' ]);
        }

        $this->line('<comment>+ Vendor directories has been successfully published</comment>');
    }

    public function prepareStorage()
    {
        Admin::addGitignoreFiles([
            storage_path('/crudadmin')
        ]);

        $this->moveStorageFromCrudadminv3();
    }

    private function moveStorageFromCrudadminv3()
    {
        $oldUploadsPath = public_path('uploads');
        $storage = Admin::getUploadsStorage();

        try {
            //Laravel 9 support
            $newUploadsFolder = $storage->getConfig()['root'];
        }

        //Laravel 8 and lower
        catch (\Throwable $e){
            $newUploadsFolder = $storage->getAdapter()->getPathPrefix();
        }

        //Move uploads directory into crudadmin storage
        if ( file_exists($oldUploadsPath) && !is_link($oldUploadsPath) ){
            if ( count(Admin::getUploadsStorage()->allFiles()) > 0 ){
                $this->error('+ Transfer of old uploads directory could not be completed. Ensure uploads directory in storage folder is empty.');
                return;
            }

            $this->line('<comment>+ Moving uploads directory into storage.</comment>');

            rename($oldUploadsPath, $newUploadsFolder);

            Artisan::call('storage:link');
        }
    }
}
