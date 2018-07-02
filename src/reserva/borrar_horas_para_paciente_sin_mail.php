<?php

/**
 * Almacena una solicitud de hora.
 * 
 * Hay dos posibles casos:
 * 1) El rut que está solicitando la hora ya existe como cliente.
 * 2) El rut que está solicitando la hora no existe como cliente.
 */
include_once(dirname(__FILE__) . '/../global.php');


// estos son los datos mínimos para establecer un registro.
if (!isset($_GET["fecha"]) || !isset($_GET["hora"]) || !isset($_GET["id_doctor"]) ) {
    die();
}

$fecha = utf8_encode($_GET["fecha"]);
$hora = utf8_encode($_GET["hora"]);
$id_doctor = utf8_encode($_GET["id_doctor"]);


$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
mysqli_query($conexion, "START TRANSACTION");
$sql = "delete from reserva where personalId = $id_doctor and  fecha = '$fecha' and horaInicio=  '$hora'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}
$sql = "update horas set tomada=0 where personalId='$id_doctor' and fecha='$fecha' and horaInicio='$hora'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}


//create a random key
$key = $nombre . $input_email . $hora . $id_doctor . $rut . date('mY');
$key = md5($key);

$sql = "delete from horas_por_confirmar where personalId = $id_doctor and  fecha = '$fecha' and horaInicio=  '$hora'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}

mysqli_query($conexion, "COMMIT");
$close = mysqli_close($conexion);

//$to = $input_email;
//$subject = "Confirmación de hora";
//$txt = "Confirmación de hora http://localhost/doctor/confirmar/confirmar_reserva.php";
//$headers = "From: <eosorio@sisdef.cl>\r\n";
//
//mail($to,$subject,$txt,$headers);
echo json_encode("exito");
?>