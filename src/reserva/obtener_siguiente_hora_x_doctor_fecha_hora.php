<?php
// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__).'/../global.php');

$fecha = date("Y-m-d");
//$fecha =  date("Y-m-d", strtotime("2017-12-07"));
if( isset($_GET["fecha"]) )
{
    $fecha = utf8_encode($_GET["fecha"]);
}
$hora = date("H:i:s");
//$hora = date("H:i:s", strtotime("08:00:00"));
if( isset($_GET["hora"]) )
{
    $hora = utf8_encode($_GET["hora"]);
}

$id_doctor = 0;
//$hora = date("H:i:s", strtotime("08:00:00"));
if( isset($_GET["id_doctor"]) )
{
    $id_doctor = utf8_encode($_GET["id_doctor"]);
}
$sql =  "SELECT personalId, personalNombre, fecha, horainicio, sedeId,  min(TIMESTAMP(fecha, horainicio)) FROM view_listado_horas_libres WHERE TIMESTAMP(fecha, horainicio) > TIMESTAMP('".$fecha."', '".$hora."') and personalId = ".$id_doctor;
if( isset($_GET["sede"]) )
{
    $sede = utf8_encode($_GET["sede"]);
	$sql = $sql. " and sedeId=".$sede;
}
$sql = $sql ." group by  personalId";
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) die();

$rawdata = array(); //creamos un array

$i=0;
while($row = mysqli_fetch_array($result))
{
	$rawdata[$i] = $row;
	$i++;
}
$close = mysqli_close($conexion);
echo json_encode($rawdata);
//echo "SON:".$i;

?>