<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Namuna News | Login</title>
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('plugins/fontawesome-free/css/all.min.css')}}">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- animate css -->
    <link rel="stylesheet" href="{{asset('plugins/animate/animate.css')}}"/>
    <!-- Theme style -->
    <link rel="stylesheet" href="{{('dist/css/adminlte.min.css')}}">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{('css/login.css')}}"/>
</head>

<body class="hold-transition login-page">
    <!-- Login Content -->
    <div class="login-box">
        <div class="card">
            <div class="card-body login-card-body">
                <div class="login-logo">
                    <a href="#"><img src="{{('dist/img/Namuna News English Logo.png')}}" alt="Namuna News"></a>
                </div>
                <p class="login-box-msg">Sign in to start your session</p>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <div class="input-wrap mb-3 mt-4">
                                <input id="email" type="email" class="input-box @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                <span class="input-focus" data-placeholder="Email"></span>
                                <!-- <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div> -->
                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <div class="input-wrap">
                                
                                <input id="password" type="password" class="input-box @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                <span class="input-focus" data-placeholder="Password"></span>
                                <span class="far fa-eye float-right pw-icon" id="togglePassword"></span>
                                
                                <!-- <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="far fa-eye" id="togglePassword"></span>
                                    </div>
                                </div> -->
                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12">

                            <div class="form-check" style="line-height: 1.5rem;">
                                <input type="checkbox" class="form-check-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="form-check-label" for="remember">Remember Me</label>
                            </div>
                                @error('remember')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <button type="submit" class="btn btn-primary btn-block">
                            {{ __('Login') }}
                        </button>

                        @if (Route::has('password.request'))
                        <a class="btn btn-link" href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                        @endif
                    </div>
                </form>
                                    <!-- <hr>
                                    <div class="text-center">
                                        <a class="font-weight-bold small" href="/register">Create an Account!</a>
                                    </div> -->
                                    <!-- <div class="text-center">
                                    </div> -->
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="{{asset('plugins/jquery/jquery.min.js')}}"></script>
    <script>
        /*[ Focus input ]*/
        $('.input-box').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
    </script>
    <script>
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');

        // function checkform()
    });
    </script>  

</body>
</html>
