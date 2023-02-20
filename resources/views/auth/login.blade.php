<title>
    Login: RPC Asset Management
</title>


@extends('layouts/basic')


{{-- Page content --}}
@section('content')



<style>
    
    .box.login-box {
        background-color: rgba(255, 255, 255, 0);
        margin-top: 30px;
        margin-left: -1px;
        /* border: 0.px solid rgba(15, 15, 15, 0.425); */
        /* box-shadow: 10px 10px 6px  #888888bd; */
    }
    #login-logo {
        margin-top: 60px;
        margin-left: -25px;
        width: 366px;
        height: auto;
        filter:saturate(1.5) brightness(150%);
        position: relative;
        z-index: 1;
        transition: all 0.4s ease-in-out;
    }

    #login-logo:hover {
        margin-top: 60px;
        margin-left: -12px;
        width: 366px;
        height: auto;
        position: relative;
        z-index: 1;
        transform: scale(1.01);
    }

    #login_button {
        color: #fefefe;
        background-color: #70A116;
        border-color: #ffffff
    }

    #login_button:hover {
        color: #fefefe;
        background-color: #5d8512;
        border-color: #ffffff;
    }
    .box-footer {
        transition: all 0.3s ease-in-out;
        transform: scale(0.94);
        
    }
    .box-footer:hover {
        transform: scale(0.96);
    }
    .col-md-12.col-sm-12.col-xs-12.text-right {
        margin-top: 10px;
    }
    .btn.btn-lg.btn-primary.btn-block:hover {
        background-color: #567a0e;
    }
    .btn.btn-lg.btn-primary.btn-block:active {
        background-color: #567a0e;
    }
    .minimal {
        border: 2px solid black;
    }

    .checkbox {
        color: rgb(255, 255, 255);
        padding: 3px;
        margin-top: 10px;
        outline-color: #70A116;
    }

    #password_link {
        color:rgb(255, 255, 255);
        text-decoration: underline;
        transition: 0.3 ease-in-out;
        
    }
    
    #password_link:hover {
        color:rgb(13, 185, 21);
    }

    #myVideo {
    position: fixed;
    right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  filter: blur(1.5px) brightness(80%) contrast(105%);
}

.box-title {
    margin-left: 43px !important;
}

.box-header {
    margin-bottom: 10px;
}

#form_box {
    margin-top: 50px;
}

#success_box {
margin-left: 100px !important;

}

#login-text {
    color: #fefefe;
    text-decoration: none;
}



    
   

    </style>
    <body>
        <video oncontextmenu="return false;" autoplay muted loop id="myVideo">
            <source src="rpc-homepage-video-longer.mp4" type="video/mp4">
        </video>

<form id="form_box" role="form" action="{{ url('/login') }}" method="POST" autocomplete="false" class="main_form">
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />

        <!-- this is a hack to prevent Chrome from trying to autocomplete fields -->
        <input type="text" name="prevent_autofill" id="prevent_autofill" value="" style="display:none;" aria-hidden="true">
        <input type="password" name="password_fake" id="password_fake" value="" style="display:none;" aria-hidden="true">

        <div class="container">
            <div class="row">

                <div class="col-md-4 col-md-offset-4">

                    <div class="box login-box">
                        <div class="box-header with-border">
                            {{-- <h1 class="box-title"> {{ trans('auth/general.login_prompt')  }}</h1> --}}
                            <h1 class="login_box-title" style="margin-left: 45px;">RPC Asset Management Login</h1>
                        </div>


                        <div class="login-box-body">
                            <div class="row">

                                @if ($snipeSettings->login_note)
                                    <div class="col-md-succ" id="success_box">
                                        <div class="alert alert-info" >
                                            {!!  Parsedown::instance()->text(e($snipeSettings->login_note))  !!}
                                        </div>
                                    </div>
                                @endif

                                <!-- Notifications -->
                                @include('notifications')

                                @if (!config('app.require_saml'))
                                <div class="col-md-12">
                                    <!-- CSRF Token -->


                                    <fieldset>

                                        <div id="login-text" class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                                            <label for="username"><i class="fas fa-user" aria-hidden="true"></i> {{ trans('admin/users/table.username')  }}</label>
                                            <input class="form-control" placeholder="{{ trans('admin/users/table.username')  }}" name="username" type="text" id="username" autocomplete="off" autofocus>
                                            {!! $errors->first('username', '<span class="alert-msg" aria-hidden="true"><i class="fas fa-times" aria-hidden="true"></i> :message</span>') !!}
                                        </div>
                                        <div id="login-text" class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                            <label for="password"><i class="fa fa-key" aria-hidden="true"></i> {{ trans('admin/users/table.password')  }}</label>
                                            <input class="form-control" placeholder="{{ trans('admin/users/table.password')  }}" name="password" type="password" id="password" autocomplete="off">
                                            {!! $errors->first('password', '<span class="alert-msg" aria-hidden="true"><i class="fas fa-times" aria-hidden="true"></i> :message</span>') !!}
                                        </div>
                                        <div class="checkbox">
                                            <label style="margin-left: -20px; padding-right: 3px;">
                                                {{-- <input style="border: 2px solid black;" name="remember" type="checkbox" value="1" class="minimal"> {{ trans('auth/general.remember_me')  }} --}}
                                                <input style="border: 2px solid black; text-indent: 1em;" name="remember" type="checkbox" value="1" class="minimal"> <strong>Remember Me</strong>
                                            </label>
                                        </div>
                                        <div class="text-right col-md-12 col-sm-12 col-xs-12" id="passwd" style="margin-top: 10px; margin-left: 14px;">
                                            @if ($snipeSettings->custom_forgot_pass_url)
                                                <a href="{{ $snipeSettings->custom_forgot_pass_url  }}" rel="noopener">{{ trans('auth/general.forgot_password')  }}</a>
                                            @elseif (!config('app.require_saml'))
                                                {{-- <a href="{{ route('password.request')  }}">{{ trans('auth/general.forgot_password')  }}</a> --}}
                                                <a id="password_link" href="{{ route('password.request')  }}"><strong>forgot password?</strong></a>
                                            @endif
                
                
                                        </div>
                                    </fieldset>
                                </div> <!-- end col-md-12 -->
                                @endif
                            </div> <!-- end row -->

                            @if (!config('app.require_saml') && $snipeSettings->saml_enabled)
                            <div class="row ">
                                <div class="text-right col-md-12">
                                    <a href="{{ route('saml.login')  }}">{{ trans('auth/general.saml_login')  }}</a>
                                </div>
                            </div>
                            @endif
                        </div>
                        <div class="box-footer">
                            @if (config('app.require_saml'))
                            <a class="btn btn-lg btn-primary btn-block" href="{{ route('saml.login')  }}">{{ trans('auth/general.saml_login')  }}</a>
                            @else
                            <button class="btn btn-lg btn-primary btn-block" id="login_button">{{ trans('auth/general.login')  }}</button>
                            @endif
                        </div>
                        
                    </div> <!-- end login box -->

                </div> <!-- col-md-4 -->

            </div> <!-- end row -->
        </div> <!-- end container -->
    </form>
    </body>

@stop