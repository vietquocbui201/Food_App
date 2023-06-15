<?php
include 'init.php';
$conn = open();
$email = $Decode_React_APP_Data['email'];
$password = md5($Decode_React_APP_Data['password']);

$check_login = " SELECT * FROM `users` WHERE (`email`='$email' AND `pass_word`='$password'); ";
$result = select($conn, $check_login);
if(count($result) > 0){
    close($conn);
    $response = array("status" => "success", "message" => "Login ok", "user_id"=> $result[0]['id'] );
    echo json_encode($response);
    exit();
}
close($conn);
$response = array("status" => "error", "message" => "Tài khoản hoặc mật khẩu không chính xác!!!");
echo json_encode($response);
?>