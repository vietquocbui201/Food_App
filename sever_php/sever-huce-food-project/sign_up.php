<?php
include 'init.php';
$conn = open();
$fullName = $Decode_React_APP_Data['fullName'];
$email = $Decode_React_APP_Data['email'];
$password = md5($Decode_React_APP_Data['password']);

$checkEmail = "SELECT * FROM `users` WHERE `email`='$email'";
$result = select($conn, $checkEmail);
if(count($result) > 0){
    close($conn);
    $response = array("status" => "error", "message" => "Email đã tồn tại");
    echo json_encode($response);
    exit();
}
$register = " INSERT INTO `users`(`name`, `email`, `pass_word`) VALUES ('$fullName','$email','$password'); ";
query($conn, $register);
close($conn);
$response = array("status" => "success", "message" => "Đăng ký thành công!!!");
echo json_encode($response);
?>