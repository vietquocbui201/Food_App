<?php
include 'init.php';
$conn = open();
$searchText = $Decode_React_APP_Data['searchText'];
$select_restaurant = " SELECT * FROM `restaurants` WHERE `name` LIKE '%".$searchText."%';";
$restaurant = select($conn, $select_restaurant);
close($conn);
$menulists = array();
foreach ($restaurant as $dt) {
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
$conn = open();
$group_id = $restaurant[0]['id_group'];
$select_group_name = " SELECT * FROM `group_restaurant` WHERE `id`=$group_id ";
$group_name = select($conn, $select_group_name)[0]['group_name'];
close($conn);
$response = [
    "menulist" => $menulists,
    "group_id" => $group_id,
    "group_name" => $group_name ,
];
echo json_encode($response);
?>