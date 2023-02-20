@extends('layouts/basic')


{{-- Page content --}}
@section('content')

<style>

#input_box {
    margin-top: 90px;

}
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

    #reset_box {
        transform: scale(0.99);
        transition: all 0.2s ease-in-out;
        background-color: #74AF27;
    }

    #reset_box:hover {
        transform: scale(1.01);
        background-color: #5b8a1f;
        border-color: #fefefe;
    }

    #reset-body {
        background: #fff 0.1 !important;
        border-radius: 3px;
        position: relative;
        border-top: 0;
        color: #fefefe;
        padding: 20px;
    }


    </style>

<body>
    <video oncontextmenu="return false;" autoplay muted loop id="myVideo">
            <source src="/../../rpc-homepage-video-longer.mp4" type="video/mp4">
        </video>

    <form id="input_box" class="form-horizontal" role="form" method="POST" action="{{ url('/password/reset') }}">
        {!! csrf_field() !!}

        <div class="container">
            <div class="row">



                <div class="col-md-6 col-md-offset-3">

                    <div id="reset-body" class="login-box" style="width: 100%">
                        <div class="box-header with-border">
                            <h2 class="login_box-title"><strong>{{ trans('auth/general.reset_password')  }}</stromg></h2>
                        </div>


                        <div  class="login-box-body">
                            <div class="row">

                                <!-- Notifications -->
                                @include('notifications')



                                    <input type="hidden" name="token" value="{{ $token }}">

                                    <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                                        <label class="col-md-4 control-label"><i class="fas fa-user" aria-hidden="true"></i> {{ trans('admin/users/table.username')  }}</label>

                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="username" value="{{ old('username', $username) }}">
                                            {!! $errors->first('username', '<span class="alert-msg"><i class="fas fa-times"></i> :message</span>') !!}

                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label" for="password"><i class="fa fa-key" aria-hidden="true"></i> {{ trans('admin/users/table.password')  }}</label>

                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" aria-label="password">
                                {!! $errors->first('password', '<span class="alert-msg" aria-hidden="true"><i class="fas fa-times" aria-hidden="true"></i> :message</span>') !!}
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label" for="password_confirmation"><i class="fa fa-key" aria-hidden="true"></i> {{ trans('admin/users/table.password_confirm')  }}</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password_confirmation" aria-label="password_confirmation">
                                {!! $errors->first('password_confirmation', '<span class="alert-msg" aria-hidden="true"><i class="fas fa-times" aria-hidden="true"></i> :message</span>') !!}

                            </div>
                        </div>


                            </div>
                        </div>
                        <div  class="box-footer">
                            <button id="reset_box" type="submit" class="btn btn-lg btn-primary btn-block">
                                {{ trans('auth/general.reset_password')  }}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</form>
</body>

@stop


