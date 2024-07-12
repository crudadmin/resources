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

  @vite(['src/Resources/sass/app.scss'])
</head>
<body class="login-page">
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