<?php
include 'init.php';
$cart = $Decode_React_APP_Data['cart'];
$user_id = $Decode_React_APP_Data['user_id'];
if($cart['count']>0){
    $conn = open();
    $count=$cart['count'];
    $dish_id =$cart['id_dish'];
    $update_cart = " UPDATE `cart` SET `count`= $count WHERE `id_user`= $user_id AND `id_dish`= $dish_id; ";
    query($conn, $update_cart);
    close($conn);
}elseif($cart['count']==0){
    $conn = open();
    $dish_id =$cart['id_dish'];
    $delete_cart = " DELETE FROM `cart` WHERE `id_user`= $user_id AND `id_dish`= $dish_id; ";
    query($conn, $delete_cart);
    close($conn);
}
?>