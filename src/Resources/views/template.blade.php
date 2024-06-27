<?php
    Vite::useHotFile(base_path('vendor/crudadmin/resources/dist/hot'));
    Vite::useBuildDirectory('vendor/crudadmin/build');
    Vite::useIntegrityKey('integrity');
?>

<!DOCTYPE html>
<html lang="{{ substr(Gettext::getLocale(app()->getLocale()) ?: '', 0, 2) }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="root" content="{{ asset('admin') }}">
  <title>{{ config('admin.name').' - '.trans('admin::admin.admin') }}</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <link rel="stylesheet" href="{{ admin_asset('/plugins/chosen/chosen.css') }}">
  <link rel="stylesheet" href="{{ admin_asset('/plugins/datetimepicker/jquery.datetimepicker.css')}}">

  @vite(['src/Resources/sass/app.scss'])

  @foreach (array_merge((array)config('admin.styles', []), ((($customCssPath = public_path('/assets/admin/css/custom.css')) && file_exists($customCssPath)) ? [ asset('/assets/admin/css/custom.css') ] : [])) as $css)
  <link rel="stylesheet" type="text/css" href="{{ admin_asset($css, true) }}">
  @endforeach
</head>
<body>
    <div id="app"></div>

    <!-- Admin variables -->
    <script type="text/javascript">
        @include('admin::partials.crudadmin-props');
    </script>

    <script src="{{ Gettext::getJSPlugin(AdminLocalization::class) }}"></script>

    @vite([
        'src/Resources/js/plugins/Gettextable.js',
        'src/Resources/js/app.js'
    ])

    {{-- Plugins --}}
    <script src="{{ admin_asset('/plugins/ckeditor/ckeditor.js') }}"></script>

    @foreach ((array)config('admin.scripts', []) as $script)
    <script type="module" src="{{ admin_asset($script, true) }}"></script>
    @endforeach

    <!-- Global site tag (gtag.js) - Google Analytics -->
    @if (Admin::isDev() === false)
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-42935841-6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-42935841-6');
    </script>
    @endif

    @include('admin::slots.scripts')
  </body>
</html>