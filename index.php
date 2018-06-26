<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<title>DOCTOR</title>
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
<!--[if lt IE 9]>
        <script src="js/html5shiv.js"></script>
        <script src="js/respond.min.js"></script>
        <![endif]-->
</head>
<body>

	<!-- header section -->
	<div class="container-fluid">

		<div class="wrapper">
			<nav id="sidebar">
				<!-- Sidebar Header -->
				<div class="sidebar-header">
					<a href="index.php"><img src="img/logo.png" alt=""
						class="img-responsive logo"></a>
					<h3>Reserva de Horas</h3>
				</div>

				<!-- Sidebar Links -->
				<ul class="list-unstyled components">
					<li class="active"><a href="#">Inicio</a></li>
					<li>
						<a href="#homeSubmenu">Doctores</a>
						<ul class="collapse in list-unstyled" id="homeSubmenu"></ul>
					</li>

				</ul>
			</nav>
			<div id="content">
                                <input type="hidden" id="id_doctor" value="">
				<div class="dhx_cal_date" id="doctor_name"></div>
				<div class="dhx_cal_container panel" id="scheduler_here">
					<div class="dhx_cal_navline">
						<div class="dhx_cal_add_button"></div>
						<div class="dhx_cal_prev_button">&nbsp;</div>
						<div class="dhx_cal_next_button">&nbsp;</div>
						<div class="dhx_dummy dhx_cal_today_button"
							onclick='scheduler.addEventNow()'>
							<span class="glyphicon glyphicon-plus"></span>&nbsp;Reserva
						</div>

						<div class="dhx_cal_date"></div>
						<div class="dhx_cal_tab" name="day_tab" style="right: 204px;"></div>
						<div class="dhx_cal_tab" name="week_tab" style="right: 140px;"></div>
						<div class="dhx_cal_tab" name="month_tab" style="right: 76px;"></div>


					</div>
					<div class="dhx_cal_header"></div>
					<div class="dhx_cal_data"></div>
				</div>
			</div>
		</div>
		<!-- footer starts here -->
		<!--<?php include "footer.php"; ?>-->
	</div>
	<!-- script tags
        ============================================================= -->
	<script src="js/jquery-2.1.1.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/dbAccess.js"></script>
        <script src="js/rututil.js"></script>
	<script src="codebase/dhtmlxscheduler.js"></script>
	<script src="codebase/locale/locale_es.js"></script>
	<script src="common/dhtmlxCombo/dhtmlxcombo.js"></script>
	<script src="codebase/ext/dhtmlxscheduler_editors.js"></script>
	<script src="js/jquery.mCustomScrollbar.js"></script>
	<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
</body>
</html>