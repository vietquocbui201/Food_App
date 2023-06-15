<?php
include 'init.php';
$conn = open();
$user_id = $Decode_React_APP_Data['user_id'];
$count = $Decode_React_APP_Data['count'];
$dish_id = $Decode_React_APP_Data['dish_id'];

$check_has_dish = " SELECT * FROM `cart` WHERE `id_user`= $user_id AND `id_dish`= $dish_id;  ";
$check = select($conn, $check_has_dish);
close($conn);
if(count($check)>0){
    $conn = open();
    $new_count = $check[0]['count'] + $count;
    $update_count = " UPDATE `cart` SET `count`= $new_count WHERE `id_user`= $user_id AND `id_dish`= $dish_id; ";
    query($conn, $update_count);
    close($conn);
}else{
    $conn = open();
    $insert_dish = " INSERT INTO `cart`(`id_dish`, `count`, `id_user`) VALUES ($dish_id,$count,$user_id); ";
    query($conn, $insert_dish);
    close($conn);
}
$response = array("status" => "success", "message" => "Thêm Thành Công!!!");
echo json_encode($response);

?>