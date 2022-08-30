<?php

namespace Admin\Resources\Controllers\Auth;

use Admin\Resources\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class VerificatorController extends Controller
{
    /*
     * Redirect login form to homepage
     */
    public function showVerificationForm(Request $request)
    {
        //Process code from email.
        if ( request()->code && admin()->isValidVerificationCode($request->code) ){
            admin()->setLoginVerified(true);
        }

        //Is verified already
        if (admin()->isLoginVerified()) {
            return redirect(admin_action('DashboardController@index'));
        }

        admin()->sendVerificatorCodeWithCache();

        return view('admin::auth.verificator');
    }

    public function processVerification(Request $request)
    {
        $this->validate($request, ['code' => 'required|digits:6']);

        if ( admin()->isValidVerificationCode($request->code) === false ){
            return redirect()->back()->withErrors([
                'code' => _('Zadaný číselný kôd nie je správny.')
            ]);
        }

        admin()->setLoginVerified(true);

        return redirect(admin_action('DashboardController@index'));
    }
}
