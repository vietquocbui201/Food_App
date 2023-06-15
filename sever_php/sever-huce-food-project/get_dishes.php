<?php
include 'init.php';
$conn = open();
$select_dishes = "SELECT * FROM `dishes`;";
$data = select($conn, $select_dishes);
$menudishes = array();
foreach ($data as $dt) {
    $menudishe = array(
        "id" =>  $dt['id'],
        "id_restaurant" =>  $dt['id_restaurant'],
        "money" =>  $dt['money'],
        "description" =>  $dt['description'],
        "image" =>  $dt['image'],
        "rate" => $dt['rate']
    );
    $menudishes[] = $menudishe;
}

$response = [
    "menudishes" => $menudishes
];
echo json_encode($response);
close($conn);
