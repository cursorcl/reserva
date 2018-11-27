<?php

include_once(dirname(__FILE__) . '/global.php');
session_start();
$rawdata = array(); //creamos un array
if (isset($_SESSION['user_id'])) {

    if (empty($_GET["personalId"])) {
        $sql = "SELECT p.personalId, p.personalNombre FROM personal p, personal_web w where w.personalId = p.personalId order by personalNombre";
    }
    else
    {
        $personalId = $_GET["personalId"];
        $sql = "SELECT p.personalId, p.personalNombre FROM personal p, personal_web w where w.personalId = p.personalId and p.personalId = '$personalId' order by personalNombre";
    }
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    if (!$result = mysqli_query($conexion, $sql))
        die();



    $i = 0;
    while ($row = mysqli_fetch_array($result)) {
        $rawdata[$i] = $row;
        $i++;
    }
    $close = mysqli_close($conexion);
}
echo json_encode($rawdata);
?>