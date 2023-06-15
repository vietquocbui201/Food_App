<?php
include 'init.php';
$conn = open();
$user_id = $Decode_React_APP_Data['user_id'];
$select_cart = "SELECT cart.*, dishes.money, dishes.description, dishes.image, dishes.rate
                FROM cart
                INNER JOIN dishes ON cart.id_dish = dishes.id
                WHERE cart.id_user = $user_id; ";
$result = select($conn, $select_cart);
close($conn);

$my_cart = array();
foreach ($result as $dt) {
    $menudishe = array(
        "id" => $dt['id'],
        "id_dish" =>  $dt['id_dish'],
        "money" =>  $dt['money'],
        "description" =>  $dt['description'],
        "image" =>  $dt['image'],
        "rate" => $dt['rate'],
        "count" => $dt['count']
    );
    $my_cart[] = $menudishe;
}

$response = [
    "my_cart" => $my_cart,
];
echo json_encode($response);
?>
