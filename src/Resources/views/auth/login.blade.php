@extends('admin::auth.layout')

@section('content')
<!-- /.login-logo -->
<div class="login-box-body">
  <p class="login-box-msg">{{ config('admin.authentication.login.title', trans('admin::admin.login-with')) }}</p>

  <form action="" method="post">
    {!! csrf_field() !!}

    @if ( count(Admin::getAuthProviders()) > 1 )
    <div class="form-group has-feedback">
      <select class="form-control" name="_provider">
        @foreach( Admin::getAuthProviders() as $key => $model )
        <option value="{{ $key }}" {{ $key == Admin::getAuthProvider() ? 'selected' : '' }}>{{ $model->getProperty('name') }}</option>
        @endforeach
      </select>
    </div>
    @else
    <input type="hidden" name="_provider" value="{{ Admin::getAuthProvider() }}">
    @endif

    <div class="form-group has-feedback">
      <input type="{{ $username == 'email' && (get_class(Auth::getProvider()) === \Illuminate\Auth\EloquentUserProvider::class) ? 'email' : 'text'  }}" name="{{ $username }}" class="form-control" value="{{ old($username) }}" placeholder="{{ config('admin.authentication.login.'.$username, 'Email') }}">
      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      @if ($errors->has($username))
          <span class="help-block">{{ $errors->first($username) }}</span>
      @endif
    </div>
    <div class="form-group has-feedback">
      <input type="password" name="password" class="form-control" value="{{ old('password') }}" placeholder="{{ trans('admin::admin.password') }}">
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>

      @if ($errors->has('password'))
          <span class="help-block">{{ $errors->first('password') }}</span>
      @endif
    </div>
    <div class="row">
      <div class="col-6">
        <div class="form-check">
          <label>
            <input type="checkbox" class="form-check-input" name="remember"> {{ trans('admin::admin.remember-password') }}
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