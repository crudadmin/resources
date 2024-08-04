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
Route::get('/admin/login/{provider?}', 'Auth\LoginController@showLoginForm');
Route::post('/admin/login/{provider?}', 'Auth\LoginController@adminLogin');
Route::get('/admin/logout', 'Auth\LoginController@logout');

Route::get('/admin/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
Route::post('/admin/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('/admin/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
Route::post('/admin/password/reset', 'Auth\ResetPasswordController@reset');

Route::get('/vendor/crudadmin/css/app.dynamic.css', 'ResourcesController@index');

//Verification
Route::group(['middleware' => ['admin', 'admin.autologout']], function () {
    Route::get('/admin/verificator', 'Auth\VerificatorController@showVerificationForm');
    Route::post('/admin/verificator', 'Auth\VerificatorController@processVerification');
});

Route::group(['middleware' => ['admin', 'admin.autologout', 'admin.verification']], function () {
    // Dashboard
    Route::get('/admin', 'DashboardController@index');
});

Route::group(['middleware' => 'ckfinder'], function () {
    //CKFinder
    Route::any('/admin/api/ckfinder/browser', 'CKFinderController@browserAction')->name('ckfinder_browser');
    Route::any('/admin/api/ckfinder/download', 'CKFinderController@downloader')->name('ckfinder_downloader');
    Route::any('/admin/api/ckfinder/connector', 'CKFinderController@requestAction')->name('ckfinder_connector');
});
