@extends('admin::auth.layout')

@section('content')
<!-- /.login-logo -->
<div class="login-box-body">
  <p class="login-box-msg">{{ config('admin.authentication.login.title', trans('admin::admin.login-with')) }}</p>

  <form action="" method="post">
    {!! csrf_field() !!}

    <div class="form-group has-feedback">
      <input type="{{ $username == 'email' && (get_class(Auth::getProvider()) === \Illuminate\Auth\EloquentUserProvider::class) ? 'email' : 'text'  }}" name="{{ $username }}" class="form-control" value="{{ old($username) }}" placeholder="{{ config('admin.authentication.login.'.$username, 'Email') }}">
      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      @if ($errors->has($username))
          <span class="help-block">
              <strong>{{ $errors->first($username) }}</strong>
          </span>
      @endif
    </div>
    <div class="form-group has-feedback">
      <input type="password" name="password" class="form-control" value="{{ old('password') }}" placeholder="{{ trans('admin::admin.password') }}">
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>

      @if ($errors->has('password'))
          <span class="help-block">
              <strong>{{ $errors->first('password') }}</strong>
          </span>
      @endif
    </div>
    <div class="row">
      <div class="col-6">
        <div class="checkbox icheck">
          <label>
            <input type="checkbox" name="remember"> {{ trans('admin::admin.remember-password') }}
          </label>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-6 text-end">
        <button type="submit" class="btn btn-primary btn-block btn-flat">{{ trans('admin::admin.login') }}</button>
      </div>
      <!-- /.col -->
    </div>
  </form>


  <a href="{{ admin_action('Auth\ForgotPasswordController@showLinkRequestForm') }}">{{ trans('admin::admin.forgot-password') }}</a><br>
</div>
<!-- /.login-box-body -->
@stop