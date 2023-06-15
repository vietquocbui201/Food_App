<?php
include 'init.php';
$conn = open();
$user_id = $Decode_React_APP_Data['user_id'];
$select_user = " SELECT * FROM `users` WHERE `id`= $user_id; ";
$result = select($conn, $select_user);

$response = array("name" => $result[0]['name'], "email" => $result[0]['email'], "phone_number" => $result[0]['sdt']);

echo json_encode($response);
close($conn);
?>