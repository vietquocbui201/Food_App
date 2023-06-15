<?php
print_r($_FILES['image']);
if (isset($_FILES['image'])) {
    $targetDir = 'image/';
    $targetFile = $targetDir . basename($_FILES['image']['name']);
    echo  $targetFile;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    if ($imageFileType === 'png') {
        // Di chuyển tệp ảnh vào thư mục lưu trữ
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            // Tải lên thành công
            echo 'Upload success';
        } else {
            // Lỗi khi tải lên
            echo 'Upload failed';
        }
    } else {
        // Định dạng tệp không được phép
        echo 'Only PNG files are allowed';
    }
} else {
    // Không nhận được tệp ảnh
    echo 'No image received';
}
?>
