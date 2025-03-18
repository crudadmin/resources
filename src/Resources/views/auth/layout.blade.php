@extends('admin::template')

@section('content')
<body class="login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href=""><b><?php echo getAdminLogo() ?></b></a>
    </div>

    @yield('login_content')
  </div>
@endsection