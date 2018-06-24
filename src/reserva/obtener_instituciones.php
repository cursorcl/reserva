<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../global.php');

$sql = "SELECT instCodigoTipo, instCodigo, instNombre FROM instituciones";

$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8


if (!$result = mysqli_query($conexion, $sql))
    die();

$rawdata = array(); //creamos un array

$i = 0;
while ($row = mysqli_fetch_array($result)) {
    $rawdata[$i] = $row;
    $i++;
}
$close = mysqli_close($conexion);


echo json_encode($rawdata);
?>
