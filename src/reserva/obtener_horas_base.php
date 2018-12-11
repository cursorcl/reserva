<?php

include_once(dirname(__FILE__) . '/../global.php');
include_once(dirname(__FILE__) . '/horas_disponibles.php');
$id_doctor = 1;
if (isset($_GET["personalId"])) {
    $id_doctor = utf8_encode($_GET["personalId"]);
}
$result = getBlockedHours($id_doctor);

echo json_encode($result);
?>