<?php

namespace Admin\Resources\Controllers;

use Admin\Resources\Commands\CKFinderDownloadCommand;
use Admin\Resources\Helpers\CKFinderHelper;
use Artisan;
use CKSource\CKFinder\CKFinder;
use Illuminate\Http\Request;
use Psr\Container\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use \Illuminate\Routing\Controller;

/**
 * Controller for handling requests to CKFinder connector.
 */
class CKFinderController extends Controller
{
    /**
     * Use custom middleware to handle custom authentication and redirects.
     */
    public function __construct()
    {
        CKFinderHelper::bootConnector();
    }

    /**
     * Action that handles all CKFinder requests.
     *
     * @param ContainerInterface $container
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function requestAction(ContainerInterface $container, Request $request)
    {
        /** @var CKFinder $connector */
        $connector = $container->get('ckfinder.connector');

        return $connector->handle($request, HttpKernelInterface::MASTER_REQUEST, true);
    }

    /**
     * Action that displays CKFinder browser.
     *
     * @return string
     */
    public function browserAction(ContainerInterface $container, Request $request)
    {
        //We need download ckfinder
        if ( CKFinderDownloadCommand::ckfinderExists() === false ) {
            return view('admin::partials.ckfinder_download');
        }

        return view('admin::partials.ckfinder_browser');
    }

    public function downloader()
    {
        //If is newest ckfinder version installed
        if ( CKFinderDownloadCommand::ckfinderExists() === true ) {
            return;
        }

        Artisan::call('ckfinder:download');
    }
}
