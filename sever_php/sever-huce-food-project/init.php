<?php
ini_set('memory_limit', '128M');
session_start();
date_default_timezone_set('Asia/Ho_Chi_Minh');


$React_APP_Data = file_get_contents('php://input');
$Decode_React_APP_Data = json_decode($React_APP_Data , true);

function open() {
    //$conn = new mysqli("localhost", "id20608967_huce_food_db_user", "Tx4G&8&kstG6z/t=", "id20608967_huce_food_db");
    $conn = new mysqli("localhost", "id20608967_hucefood_user", "Evre*gVh@_tW8kBT", "id20608967_hucefood_db");
    $conn->set_charset("utf8mb4");
    return $conn;
}

function close($conn) {
    $conn->close();
}

function query($conn, $sql) {
    $conn->query($sql);
}

function select($conn, $sql) {
    $conn->query($sql);
    $result = $conn->query($sql);
    $table = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $table[] = $row;
        }
    }
    return $table;
}
?>