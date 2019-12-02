<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="<?php echo app()->getLocale() ?>">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="<?php echo csrf_token() ?>">
  <meta name="root" content="<?php echo asset('admin') ?>">
  <title><?php echo config('admin.name') ?> - <?php echo trans('admin::admin.admin') ?></title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <!-- Theme style -->
  <link rel="stylesheet" href="<?php echo admin_asset('/plugins/lightbox/lightbox.min.css') ?>">
  <link rel="stylesheet" href="<?php echo admin_asset('/plugins/datatables/dataTables.bootstrap.css') ?>">
  <link rel="stylesheet" href="<?php echo admin_asset('/plugins/chosen/chosen.css?v=').Admin::getAssetsVersion() ?>">
  <link rel="stylesheet" href="<?php echo admin_asset('/plugins/datetimepicker/jquery.datetimepicker.css?v=').Admin::getAssetsVersion() ?>">
  <link rel="stylesheet" href="<?php echo admin_asset('/css/app.css?v=').Admin::getAssetsVersion() ?>">

  <?php foreach (array_merge((array)config('admin.styles', []), ((($customCssPath = public_path('/assets/admin/css/custom.css')) && file_exists($customCssPath)) ? [ asset('/assets/admin/css/custom.css') ] : [])) as $css) { ?>
  <link rel="stylesheet" type="text/css" href="<?php echo admin_asset($css, true) ?>">
  <?php } ?>
</head>
<body>
    <div id="app">
        <!-- Main Header -->
        <header class="main-header">
          <nav class="navbar-left">
            <!-- Logo -->
            <a href="#/dashboard" class="logo">
              <span><?php echo config('admin.name') ?></span>
            </a>
          </nav>

          <!-- Header Navbar -->
          <nav class="navbar-right">
            <right-navbar
              :user="user" />
          </nav>
        </header>

        <div class="wrapper">
          <!-- Left side column. contains the logo and sidebar -->
          <aside class="main-sidebar">
            <sidebar
              :rows="tree"
              :version="version"
              :languages="languages"
              :langid.sync="language_id"
              :user="user">
            </sidebar>
          </aside>

          <!-- Your Page Content Here -->
          <!-- Content Wrapper. Contains page content -->
          <div class="content-wrapper">
            <license></license>
            <check-assets-version v-if="version"></check-assets-version>

            <router-view :langid="language_id"></router-view>
          </div>
          <!-- END CONTENT -->
        </div>
        <!-- ./wrapper -->

        <modal
          :alert="alert"
        />

        <?php if (Admin::isDev() == false) { ?>
        <!-- REQUIRED JS SCRIPTS -->
        <div id="loader" v-cloak v-bind:class="{ hidenloader : user }">
            <div class="spinner">
                <h2><strong><?php echo config('admin.author.name', 'CrudAdmin') ?></strong> <span>&copy;</span> <?php echo date('Y') > config('admin.author.since', 2016) ? config('admin.author.since', 2016) . ' - '.date('Y') : date('Y') ?>
                <?php if (config('admin.author', true) !== false) { ?>
                by <?php echo config('admin.author.copyright', 'Marek Gogoľ') ?>
                <?php } ?></h2>
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
        <?php } ?>
    </div>

    <!-- Admin variables -->
    <?php echo $__env->make('admin::partials.crudadmin-props', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <!-- jQuery 2.1.4 -->
    <script src="<?php echo admin_asset('/js/manifest.js') ?>"></script>
    <script src="<?php echo admin_asset('/js/vendor.js') ?>"></script>
    <script src="<?php echo admin_asset('/plugins/ckeditor/ckeditor.js') ?>"></script>

    <!-- APP JS -->
    <script src="<?php echo admin_asset('/js/app.js?v=' . (Admin::getVersion() == 'dev-master' ? rand(00000, 99999) : Admin::getAssetsVersion())) ?>"></script>

    <?php foreach ((array)config('admin.scripts', []) as $script) { ?>
    <script type="text/javascript" src="<?php echo admin_asset($script) ?>"></script>
    <?php } ?>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <?php if (Admin::isDev() === false) { ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-42935841-6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-42935841-6');
    </script>
    <?php } ?>

    <?php
    //Slot into template
    if (file_exists($path = resource_path('views/vendor/crudadmin/slot.php'))) {
        include_once($path);
    }
    ?>

  </body>
</html>