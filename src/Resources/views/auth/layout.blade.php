<?php
    Vite::useHotFile(base_path('vendor/crudadmin/resources/dist/hot'));
    Vite::useBuildDirectory('vendor/crudadmin/build');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="<?php echo csrf_token() ?>">
  <meta name="root" content="<?php echo asset('admin') ?>">

  <title><?php echo config('admin.name') ?> | <?php echo trans('admin::admin.login') ?></title>

  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

  <!-- Theme style -->
  <link rel="stylesheet" href="{{ admin_asset('dist/css/AdminLTE.min.css') }}">

  @vite(['src/Resources/sass/app.scss'])

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href=""><b><?php echo getAdminLogo() ?></b></a>
    </div>
    <!-- /.login-logo -->
    @yield('content')
    <!-- /.login-box-body -->
  </div>
  <!-- /.login-box -->

  <script type="text/javascript">
    @include('admin::partials.crudadmin-props')
  </script>

  @vite([
      'src/Resources/js/app.js'
  ])
</body>
</html>