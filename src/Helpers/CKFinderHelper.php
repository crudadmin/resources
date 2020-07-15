<?php

namespace Admin\Resources\Helpers;

use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\HttpKernel\Kernel;

class CKFinderHelper
{
    public static $booted = false;

    public static $configData = null;

    public static function getConfigData()
    {
        //Return loaded config data
        if ( self::$configData ){
            return self::$configData;
        }

        $data = require __DIR__.'/../../ckfinder/config.php';

        return self::$configData = $data;
    }

    public static function bootConnector()
    {
        if ( self::$booted === true ) {
            return;
        }

        app()->bind('ckfinder.connector', function () {
            $ckfinder = new \CKSource\CKFinder\CKFinder(self::getConfigData());

            if (Kernel::MAJOR_VERSION === 4) {
                self::setupForV4Kernel($ckfinder);
            }

            return $ckfinder;
        });

        self::$booted = true;
    }

    /**
     * Prepares CKFinder DI container to use version version 4+ of HttpKernel.
     *
     * @param \CKSource\CKFinder\CKFinder $ckfinder
     */
    private static function setupForV4Kernel($ckfinder)
    {
        $ckfinder['resolver'] = function () use ($ckfinder) {
            $commandResolver = new \Admin\Resources\Helpers\CommandResolver($ckfinder);
            $commandResolver->setCommandsNamespace(\CKSource\CKFinder\CKFinder::COMMANDS_NAMESPACE);
            $commandResolver->setPluginsNamespace(\CKSource\CKFinder\CKFinder::PLUGINS_NAMESPACE);

            return $commandResolver;
        };

        $ckfinder['kernel'] = function () use ($ckfinder) {
            return new HttpKernel(
                $ckfinder['dispatcher'],
                $ckfinder['resolver'],
                $ckfinder['request_stack'],
                $ckfinder['resolver']
            );
        };
    }
}