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
if (!isset($_GET["id"]) ||  !isset($_GET["fecha"]) || !isset($_GET["hora"]) || !isset($_GET["id_doctor"]) || !isset($_GET["input_rut"]) || !isset($_GET["input_email"])) {
    die();
}
$id = utf8_encode($_GET["id"]);
$fecha = utf8_encode($_GET["fecha"]);
$hora = utf8_encode($_GET["hora"]);
$id_doctor = utf8_encode($_GET["id_doctor"]);
$input_rut = utf8_encode($_GET["input_rut"]);
$input_email = utf8_encode($_GET["input_email"]);

$dv = substr($input_rut, -1);
$rut = substr($input_rut, 0, -1);

if (!isset($_GET["input_paterno"]) || !isset($_GET["input_materno"]) || !isset($_GET["input_nombres"]) || !isset($_GET["input_phone"])) {
    /* No viene asignado los datos del usuario.
     * Lo busco para saber si se encuentra en la BD para asignar valores
     * De no existir, me tengo que salir.
     */
    $sql = "SELECT p.pacienteNombre, p.pacienteTelefono from pacientes p where p.pacienteRut='$rut' and p.pacienteDv='$dv'";
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    if (!$result = mysqli_query($conexion, $sql)) {
        die();
    }
    $row = mysqli_fetch_assoc($result);
    $nombre = $row['pacienteNombre'];
    $input_phone = $row['pacienteTelefono'];
    $close = mysqli_close($conexion);
} else {
    $input_paterno = utf8_encode($_GET["input_paterno"]);
    $input_materno = utf8_encode($_GET["input_materno"]);
    $input_nombres = utf8_encode($_GET["input_nombres"]);
    $nombre = $input_paterno . " " . $input_materno . " " . $input_nombres;
    $input_phone = utf8_encode($_GET["input_phone"]);
}


$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

$sql = "select  * from  reserva where id=$id";
if (!$result = mysqli_query($conexion, $sql)) {
    $line = $resultado->fetch_assoc();
    $horaInicio =  $line['horaInicio'];
    $doc = $line['personalId'];
    $fecha_reseva = $line['fecha'];
            
}


mysqli_query($conexion, "START TRANSACTION");

$sql = "update horas set tomada=0 where personalId='$doc' and fecha='$fecha_reseva' and horaInicio='$horaInicio'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}

$sql = "delete from horas_por_confirmar where personalId='$doc' and fecha='$fecha_reseva' and horaInicio='$horaInicio'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}


$sql = "update reserva set fecha='$fecha', horaInicio='$hora', pacienteRut='$rut', pacienteDv='$dv', pacienteNombre='$nombre', pacienteEmail='$input_email', pacienteFono = '$input_phone' where id=$id";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}
$sql = "update horas set tomada=2 where personalId='$id_doctor' and fecha='$fecha' and horaInicio='$hora'";
if (!$result = mysqli_query($conexion, $sql)) {
    mysqli_query($conexion, "ROLLBACK");
    die();
}
mysqli_query($conexion, "COMMIT");
$close = mysqli_close($conexion);

echo json_encode("exito");
?>