<!DOCTYPE html>
<html lang="en">
    <?php
    session_start();
        //if (isset($_SESSION['user_id']) and isset($_SESSION['personal_id']) and isset($_SESSION['rol'])) {
        //    header("Location: http://localhost/reserva/asindex.php");
        //}
    ?>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />        

        <meta name="description" content="">
        <meta name="author" content="">
        <title>RESERVA</title>
        <link rel="stylesheet" href="css/font-awesome.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/jquery-ui.css">
        <link rel="stylesheet" href="codebase/dhtmlxscheduler.css">
        
        <link rel="stylesheet" href="css/dhtmlscheduler_eos.css">
        <link rel="stylesheet" href="css/jquery.mCustomScrollbar.css" />
        <link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" />
        <link rel="stylesheet" href="css/dhtmlx_custom.css" />
        <link rel="stylesheet" href="css/reserva.css" />
        <link rel="stylesheet" href="css/login.css" />
        <!--[if lt IE 9]>
                <script src="js/html5shiv.js"></script>
                <script src="js/respond.min.js"></script>
                <![endif]-->
    </head>
    <body>

        <div class="wrapper">
            <nav id="sidebar">
                <!-- Sidebar Header -->
                <div class="sidebar-header">
                    <a href="index.php"><img src="img/logo.png" alt="" class="img-responsive logo"></a>
                </div>
            </nav>         
            <div class="container-fluid">
                <div id="content">            
                    <input type="hidden" id="id_doctor" value="">
                    <?php
                        include "src/login/login.php";
                    ?>
                </div>
            </div>     
            <!-- header section -->
            <!-- footer starts here -->
            <!--<?php include "footer.php"; ?>-->
        </div>
        <!-- script tags
            ============================================================= -->
        <script src="js/jquery-2.1.1.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/dbAccessLogin.js"></script>
        <script src="codebase/dhtmlxscheduler.js"></script>
        <script src="codebase/locale/locale_es.js"></script>
        <script src="common/dhtmlxCombo/dhtmlxcombo.js"></script>
        <script src="codebase/ext/dhtmlxscheduler_editors.js"></script>
        <script src="codebase/ext/dhtmlxscheduler_limit.js"></script>
        <script src="js/jquery.mCustomScrollbar.js"></script>
        <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    </body>
</html>