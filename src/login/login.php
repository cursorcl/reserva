<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="loginmodal-container">

            <div class="login-form">
                <form class="form">
                    <div class="avatar">
                        <img src="img/login.png" alt="Avatar">
                    </div>
                    <h2 class="text-center">Acceso a Horarios</h2>   
                    <div class="form-group">
                        <input type="text" class="form-control" name="username" id="name" placeholder="Usuario" required="required autofocus">
                        <span class="error" id="error_username"></span>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="current-password" id="current-password" placeholder="Clave"  required="required">
                        <span class="error" id="error_password"></span>
                    </div>        
                    <div class="form-group">
                        <input class="submit-btn btn btn-primary btn-lg btn-block" type="button" value="Ingresar" id="btnsubmitlogin">           
                    </div>
                    <div class="clearfix">
                        <label class="pull-left checkbox-inline"><input type="checkbox" id="remember"> Recordarme</label>
                        <a href="#" class="pull-right" id="forget">Olvidó su clave?</a>
                    </div>
                </form>
                <p class="text-center small">No tiene cuenta? <a href="#">Regístrese aquí!</a></p>
            </div>  
        </div>
    </div>
</div>


