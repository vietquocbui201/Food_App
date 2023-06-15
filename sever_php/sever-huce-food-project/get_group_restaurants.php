<?php
include 'init.php';
$conn = open();

$select_group = "SELECT * FROM `group_restaurant`;";
$data = select($conn, $select_group);
$select_restaurants = "SELECT * FROM `restaurants`;";
$data_restaurants = select($conn, $select_restaurants);
$menulists = array();
foreach ($data_restaurants as $dt) {
    $menulist = array(
        "id" =>  $dt['id'],
        "rate" =>  $dt['rate'],
        "background" =>  $dt['background'],
        "restaurant" =>  $dt['name'],
        "time" =>  $dt['time'],
        "ship" =>  $dt['ship'],
        "dish1" =>  $dt['dish1'],
        "dish2" =>  $dt['dish2'],
        "dish3" =>  $dt['dish3'],
        "click" => "navigateToMoreDishes",
        "group_id" => $dt['id_group'],
        "location" => $dt['location'],
    );
    $menulists[] = $menulist;
}

$sections = array();
foreach ($data as $dt) {
    $section = array(
        'id' => $dt['id'],
        'title' => $dt['group_name'],
        'data' => []
    );
    foreach ($data_restaurants as $dt2) {
        if ($dt['id'] == $dt2['id_group']) {
            $section['data'][] = $dt2['id'];
        }
    }
    $sections[] = $section;
}

$response = [
    "menulist" => $menulists,
    "sections" => $sections
];
echo json_encode($response);
close($conn);
