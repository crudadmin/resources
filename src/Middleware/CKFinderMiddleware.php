<?php

namespace Admin\Resources\Middleware;

use Admin\Resources\Helpers\CKFinderHelper;
use Closure;

class CKFinderMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null, $errors = [])
    {
        $authenticated = CKFinderHelper::getConfigData()['authentication']();

        //Check if ckeditor is authenticated
        if ( $authenticated === false ){
            abort(401);
        }

        return $next($request);
    }
}
