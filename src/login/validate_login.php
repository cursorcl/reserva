<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../global.php');
session_start();
// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
$name_error = $password_error = "";
//print_r($_POST);
$username = "";

unset($_SESSION['user_id']);
unset($_SESSION['personal_id']);
unset($_SESSION['rol']);


$resultValues = array();
if (empty($_GET["username"])) {
    $name_error = "Debe ingresar cuenta de usuario";
    $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
    echo json_encode($resultValues);
    return;
} else {
    $username = utf8_encode($_GET["username"]);
}


$password = "";
if (empty($_GET["current-password"])) {
    $password_error = "Debe ingresar la clave del usuario";
    $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
    echo json_encode($resultValues);
    return;
} else {
    $password = utf8_encode($_GET["current-password"]);
}

$sql = "SELECT personalId FROM asomel_data.personal where concat(trim(personalRut), trim(personalDv)) = '$username'";
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
$result = mysqli_query($conexion, $sql);
if (!$result) {
    $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
    echo json_encode($resultValues);
    die();
}
$nrows = mysqli_num_rows($result);
if (is_null($nrows) || $nrows == FALSE || $nrows == 0) {
    $name_error = "Usuario inválido";
    $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
    echo json_encode($resultValues);
    return;
} else {
    $close = mysqli_close($conexion);
    $sql = "select * from eos_claves where personalId = (SELECT personalId FROM asomel_data.personal where concat(trim(personalRut), trim(personalDv)) = '$username')";
    //\FB::log($sql);
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    if (!$result = mysqli_query($conexion, $sql)) {
        $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
        echo json_encode($resultValues);
        die();
    }
    if (mysqli_num_rows($result) == 0) {
        $name_error = "Usuario sin registrar";
        $resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "false", "result" => "false");
        echo json_encode($resultValues);
        return;
    } else {

        $rawdata = array(); //creamos un array
        $rol = 1;
        $i = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['password'] != sha1($password)) {
                $password_error = "Clave incorrecta";
            } else {
                $_SESSION['user_id'] = $username;
                $_SESSION['personal_id'] = $row['personalId'];
                $_SESSION['rol'] = $row['rol'];
                $rol = $row['rol'];
            }
            break;
        }
    }

    $close = mysqli_close($conexion);
}
$resultValues[0] = array(0 => $name_error, "name_error" => $name_error, 1 => $password_error, "password_error" => $password_error, 2 => "true", "result" => "true", 3 => $_SESSION['personal_id'], "personalId" => $_SESSION['personal_id'], 4 => $rol, "rol" => $rol);
echo json_encode($resultValues);
