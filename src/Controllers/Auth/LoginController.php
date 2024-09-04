<?php

namespace Admin\Resources\Controllers\Auth;

use Admin;
use Admin\Resources\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin.guest', ['except' => 'logout']);
    }

    protected function guard()
    {
        return Admin::getAdminGuard();
    }

    /*
     * Redirect login form to homepage
     */
    public function showLoginForm($provider = null)
    {
        if ( $provider ) {
            Admin::setAuthProvider($provider);
        }

        //If is user logged
        if ($this->guard()->user()) {
            return redirect($this->redirectPath());
        }

        return view('admin::auth.login');
    }

    /*
     * Overide default login request to be able pass provider as param
     */
    public function adminLogin($provider = null)
    {
        if ( $provider = (request('_provider') ?: $provider) ) {
            Admin::setAuthProvider($provider);
        }

        return $this->login(request());
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $user->logHistoryAction('login');
    }

    public function logout(Request $request)
    {
        admin()->logHistoryAction('logout');
        admin()->setLoginVerified(false);

        $this->guard()->logout();

        //Custom logout path
        if (!($path = config('admin.authentication.login.path'))) {
            $path = $this->redirectTo;
        }

        return redirect($path);
    }

    public function username()
    {
        return config('admin.authentication.login.column', 'email');
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        $whitelistedProviders = Admin::getAuthProviders();

        // Test only selected provider, when autoprovider login is off.
        if ( Admin::hasAutoProviderLogin() === false ) {
            $whitelistedProviders = array_intersect_key($whitelistedProviders, [ Admin::getAuthProvider() => [] ]);
        }

        //Try to log in into all providers
        foreach ($whitelistedProviders as $providerKey => $model) {
            Admin::setAuthProvider($providerKey);

            $attempt = $this->guard()->attempt(
                $this->credentials($request), $request->boolean('remember')
            );

            if ( $attempt ){
                return true;
            }
        }

        return false;
    }
}
