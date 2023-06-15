<?php
include 'init.php';
$conn = open();
$name = $Decode_React_APP_Data['name'];
$phone_number = $Decode_React_APP_Data['phone_number'];
$user_id = $Decode_React_APP_Data['user_id']; 
$update = " UPDATE `users` SET `name`='$name',`sdt`='$phone_number' WHERE `id` = $user_id; ";
query($conn, $update);
$response = array("status" => "success", "message" => "ok");
echo json_encode($response);
close($conn);
?>