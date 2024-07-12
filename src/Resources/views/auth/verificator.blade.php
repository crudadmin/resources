@extends('admin::auth.layout')

@section('content')
<!-- /.login-logo -->
<div class="login-box-body">
  <p class="login-box-msg">{!! sprintf(_('Prosím, pre prihlásenie vložte overovací kód, ktorý sme Vám práve odoslali skrz <strong style="white-space: nowrap">%s</strong>.'), admin()->getSelectOption('verification_method')) !!}</p>

  <form method="post">
    {!! csrf_field() !!}

    <div class="form-group has-feedback">
      <input type="text" max="6" name="code" autocomplete="off" class="form-control" value="{{ request('code') }}" placeholder="{{ _('Zadajte overovací kód') }}">
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      @if ($errors->has('code'))
          <span class="help-block d-block">{{ $errors->first('code') }}</span>
      @endif
    </div>
    <div class="row">
      <!-- /.col -->
      <div class="col-12">
        <button type="submit" class="btn btn-primary btn-block btn-flat w-100">{{ trans('admin::admin.login') }}</button>
        <small class="d-block mt-2">* {{ sprintf(_('Platnosť verifikačného kódu je %s minút. Po tomto intervale obdržíte novo vygenerovaný kód.'), admin()->verificatorCodeEveryMinutes()) }}</small>
      </div>
      <!-- /.col -->
    </div>
  </form>
</div>
<!-- /.login-box-body -->
@stop