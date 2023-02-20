@extends('layouts/basic')


{{-- Page content --}}
@section('content')


    @if ($snipeSettings->custom_forgot_pass_url)
        <!--  The admin settings specify an LDAP password reset URL to let's send them there -->
        <div class="col-md-4 col-md-offset-4" style="margin-top: 20px;">
            <div class="box box-header text-center">
                <h3 class="box-title">
                    <a href="{{ $snipeSettings->custom_forgot_pass_url  }}" rel="noopener">
                        {{ trans('auth/general.ldap_reset_password')  }}
                    </a>
                </h3>
            </div>
        </div>

    @else

    <style>

        #myVideo {
          position: fixed;
          right: 0;
          bottom: 0;
          min-width: 100%;
          min-height: 100%;
          filter: blur(2px) brightness(80%) contrast(105%);
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

    #form_box {
    margin-top: 60px;
}

#login_box {
}

#login_button {
        color: #fefefe;
        background-color: #70A116;
        border-color: #ffffff;
        transition: all 0.3s ease-in-out;
        transform: scale(0.95)
    }

    #login_button:hover {
        color: #fefefe;
        background-color: #5d8512;
        border-color: #ffffff;
        transform: scale(0.97)
    }

    #hide, #show, #help-text {
        color: #fefefe !important;

    }
    
    #username_box {
        margin-bottom: 5px;
        color: #fefefe;
        text-decoration: none;
    }

    #login-text {
    color: #fefefe;
    text-decoration: none;
}

    

        
        </style>

    <body>
        <video oncontextmenu="return false;" autoplay muted loop id="myVideo">
            <source src="/../rpc-homepage-video-longer.mp4" type="video/mp4">
        </video>

    <form id="form_box" class="form" role="form" method="POST" action="{{ url('/password/email') }}">
        {!! csrf_field() !!}
    <div class="container">
        <div class="row">

            <div class="col-md-4 col-md-offset-4">

                <div id="login_box" class="box_login login-box" style="width: 100%;">
                        <div class="box-header with-border">
                            <h2 class="login_box-title" style="margin-left: 47px; margin-bottom: 30px;"> <strong>{{ trans('auth/general.send_password_link')  }}</strong></h2>
                        </div>


                        <div class="login-box-body">
                            <div class="row">
                                <div class="col-md-12" style="">
                                    <div id="login-text" class="alert green-alert-info">
                                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                                        {!! trans('auth/general.username_help_top') !!}
                                    </div>
                                </div>


                            </div>
                            <div class="row">


                                <!-- Notifications -->
                                @include('notifications')



                                    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">

                                        <div id="username_box" class="col-md-12">
                                            <label for="username"><i class="fas fa-user" aria-hidden="true"></i> {{ trans('admin/users/table.username') }} </label>
                                            <input type="text" class="form-control" name="username" value="{{ old('username') }}" placeholder="{{ trans('admin/users/table.username') }}" aria-label="username">
                                            {!! $errors->first('username', '<span class="alert-msg"><i class="fas fa-times"></i> :message</span>') !!}
                                        </div>
                                    </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <br>
                                    <!-- show help text toggle -->
                                    <a href="#" id="show">
                                        <i class="fa fa-caret-right"></i>
                                        {{ trans('general.show_help') }}
                                    </a>

                                    <!-- hide help text toggle -->
                                    <a href="#" id="hide" style="display:none">
                                        <i class="fa fa-caret-up"></i>
                                        {{ trans('general.hide_help') }}
                                    </a>

                                    <!-- help text  -->
                                    <p class="help-block" id="help-text" style="display:none">
                                        {!! trans('auth/general.username_help_bottom') !!}
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div class="box-footer">
                            <button type="submit" id="login_button" class="btn btn-lg btn-primary btn-block">
                                {{ trans('auth/general.email_reset_password')  }}
                            </button>
                        </div>

                    </div>
            </div>
        </div>
    </div>

    </form>
    </body>

    @endif
@stop

@push('js')
    <script nonce="{{ csrf_token() }}">
        $(document).ready(function () {
            $("#show").click(function(){
                $("#help-text").fadeIn(500);
                $("#show").hide();
                $("#hide").show();
            });

            $("#hide").click(function(){
                $("#help-text").fadeOut(300);
                $("#show").show();
                $("#hide").hide();
            });
        });
    </script>
@endpush

