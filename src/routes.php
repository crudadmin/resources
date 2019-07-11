<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
 * Login routes
 */
Route::get('/admin/login', 'Auth\LoginController@showLoginForm');
Route::post('/admin/login', 'Auth\LoginController@login');
Route::get('/admin/logout', 'Auth\LoginController@logout');

Route::get('/admin/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
Route::post('/admin/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('/admin/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
Route::post('/admin/password/reset', 'Auth\ResetPasswordController@reset');

/*
 * Admin routes
 */
Route::group(['middleware' => 'admin'], function(){
    // Dashboard
    Route::get('/admin', 'DashboardController@index');

    //CKFinder
    Route::any('/admin/api/ckfinder/browser', 'CKFinderController@browserAction')->name('ckfinder_browser');
    Route::any('/admin/api/ckfinder/connector', 'CKFinderController@requestAction')->name('ckfinder_connector');
});