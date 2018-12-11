<?php

include_once(dirname(__FILE__) . '/../global.php');

/**
 * Obtiene las horas base para un doctor y una sede.
 * @param type $id_doctor identificador del doctor.
 * @param type $id_sede identificador de la sede.
 * @return type lista con las fechas base.
 */
function gethoursbase($id_doctor, $id_sede) {
    $sql = "select * from asomel_data.eos_horariobase where personalId = $id_doctor and sedeId = $id_sede";
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8");
    if (!$result = mysqli_query($conexion, $sql))
        die();
    $rawdata = array();
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $rawdata[$i] = $row;
        $i++;
    }
    mysqli_close($conexion);
    return $rawdata;
}

/**
 * Obtiene lista de fechas tomadas.
 * @param type $date fecha de inicio
 * @param type $id_doctor identificador del doctor
 * @param type $id_sede identificador de la sede
 * @return type lista de fechas tomadas.
 */
function gethoursused($date, $id_doctor, $id_sede) {
    $itime = new DateTime($date->format("Y-m-d"));
    $ltime = new DateTime($date->format("Y-m-d"));
    $ltime->modify("+" . NRO_DAYS . " day");
    $idate = $itime->format("Y-m-d");
    $ldate = $ltime->format("Y-m-d");
    $sql = "SELECT * FROM asomel_data.reserva where personalId = $id_doctor and sedeId = $id_sede and fecha >= '$idate' and fecha <= '$ldate'";
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8");
    if (!$result = mysqli_query($conexion, $sql))
        die();
    $rawdata = array();
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $fecha = $row['fecha'] . " " . $row['horaInicio'];
        $rawdata[$i] = DateTime::createFromFormat('Y-m-d H:i:s', $fecha);
        $i++;
    }
    mysqli_close($conexion);
    return $rawdata;
}

/**
 * Obtiene lista de fechas hora entre dos fechas en pasos según parámetro.
 * @param type $idate Fecha de incio
 * @param type $ldate Fecha final
 * @param type $stepminutes pasos de minutos 
 * @param type $hoursused horas ya tomadas
 */
function gethours($idate, $ldate, $stepminutes, $hoursused) {
    $hours = array();
    $time = new DateTime($idate->format('Y-m-d H:i:s'));
    while ($time < $ldate) {
        $founded = false;
        for ($m = 0; $m < sizeof($hoursused); $m++) {
            $date = $hoursused[$m];
            if ($date == $time) {
                $founded = true;
                break;
            }
        }
        if (!$founded) {
            array_push($hours, $time->format('Y-m-d H:i:s'));
        }
        $time->modify("+{$stepminutes} minutes");
    }
    return $hours;
}

// date("Y-m-d H:i:s"); es el formato de MYSQL
function hours($date, $id_doctor, $id_sede, $nrodays, $stepminutes) {
    $hbase = gethoursbase($id_doctor, $id_sede);
    $hused = gethoursused($date, $id_doctor, $id_sede);
    $dates = array();
    $time = new DateTime($date->format("Y-m-d H:i:s"));
    for ($n = 0; $n < $nrodays; $n++) {
        $d = $time->format("w");
        $day = $time->format("Y-m-d");
        for ($i = 0; $i < sizeof($hbase); $i++) {
            if ($hbase[$i]["dia"] != $d)
                continue;
            $initime = DateTime::createFromFormat('Y-m-d H:i:s', $day . " " . $hbase[$i]['inicio']);
            $endtime = DateTime::createFromFormat('Y-m-d H:i:s', $day . " " . $hbase[$i]['fin']);
            $hhs = gethours($initime, $endtime, $stepminutes, $hused);
            foreach ($hhs as $value) {
                array_push($dates, $value);
            }
        }
        $time->modify("1 day");
    }
    return $dates;
}

// date("Y-m-d H:i:s"); es el formato de MYSQL
function firsthour($date, $id_doctor, $id_sede) {
    $hbase = gethoursbase($id_doctor, $id_sede);
    $hused = gethoursused($date, $id_doctor, $id_sede);
    $time = new DateTime($date->format("Y-m-d H:i:s"));
    $result = "";
    for ($n = 1; $n < NRO_DAYS and $result === ""; $n++) {
        $d = $time->format("w");
        $day = $time->format("Y-m-d");
        for ($i = 0; $i < sizeof($hbase) and $result === ""; $i++) {
            if ($hbase[$i]["dia"] != $d)
                continue;
            $initime = DateTime::createFromFormat('Y-m-d H:i:s', $day . " " . $hbase[$i]['inicio']);
            $endtime = DateTime::createFromFormat('Y-m-d H:i:s', $day . " " . $hbase[$i]['fin']);
            $hhs = gethours($initime, $endtime, STEP_MINUTES, $hused);
            foreach ($hhs as $value) {
                $result = $value;
                break;
            }
        }
        $time->modify("1 day");
    }
    return $result;
}

function getAllHours($date, $id_doctor, $id_sede) {
    return hours($date, $id_doctor, $id_sede, NRO_DAYS, STEP_MINUTES);
}

function getHoursOfDay($date, $id_doctor, $id_sede) {
    return hours($date, $id_doctor, $id_sede, 1, STEP_MINUTES);
}

function getFirstHours($date, $id_doctor, $id_sede) {
    return firsthour($date, $id_doctor, $id_sede, 1, STEP_MINUTES);
}

function gethoursbasewithousede($id_doctor) {
    $sql = "SELECT dia as day, hour(inicio) * 60 + minute(inicio) as finit, hour(fin) * 60 + minute(fin) as fend FROM asomel_data.eos_horariobase where personalId = $id_doctor order by day, finit";
    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    mysqli_set_charset($conexion, "utf8");
    if (!$result = mysqli_query($conexion, $sql))
        die();
    $rawdata = array();
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $rawdata[$i] = $row;
        $i++;
    }
    mysqli_close($conexion);
    return $rawdata;
}

function getBlockedHours($id_doctor) {
    $hbase = gethoursbasewithousede($id_doctor);
    $dates = array();
    

    for ($d = 0; $d < 7; $d++) { //  Se recorre los días de la semana
        $founded = false;
        $itime = 0;
        for ($i = 0; $i < sizeof($hbase); $i++) {
            
            if ($hbase[$i]["day"] == $d) {
                $founded = true;
                $init = $hbase[$i]["finit"];
                $end = $hbase[$i]["fend"];
                array_push($dates, array(0 => $d, "day" => $d, 1 => $itime, "fini" => $itime, 2 => $init, "fend" => $init));
                $itime = $end;
            }
        }
        if(!$founded)
        {
            array_push($dates, array(0 => $d, "day" => $d, 1 => 0, "fini" => 0, 2 => 1440, "fend" => 1440));
        }
        else 
        {
            array_push($dates, array(0 => $d, "day" => $d, 1 => $itime, "fini" => $itime, 2 => 1440, "fend" => 1440));
        }
    }
    
    return $dates;
}
