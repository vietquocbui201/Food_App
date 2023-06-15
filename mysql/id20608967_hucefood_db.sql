-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th6 15, 2023 lúc 09:27 AM
-- Phiên bản máy phục vụ: 10.5.20-MariaDB
-- Phiên bản PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `id20608967_hucefood_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `id_dish` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `id_dish`, `count`, `id_user`) VALUES
(7, 2, 3, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `money` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dishes`
--

INSERT INTO `dishes` (`id`, `id_restaurant`, `money`, `description`, `image`, `rate`) VALUES
(1, 1, '2', 'Gà rán sốt cay', 'https://hucefood.000webhostapp.com/image/1_dish.png', '3'),
(2, 1, '3', 'Khoai tây chiên múi cau', 'https://hucefood.000webhostapp.com/image/2_dish.png', '4'),
(3, 1, '5', 'Combo gà rán, khoai tây, coca', 'https://hucefood.000webhostapp.com/image/3_dish.png', '5'),
(4, 1, '1.5', 'Burger gà giòn', 'https://hucefood.000webhostapp.com/image/4_dish.png', '4.5'),
(5, 2, '2', 'Gà giòn cay', 'https://hucefood.000webhostapp.com/image/5_dish.png', '3.4'),
(6, 2, '1.5', 'Burger bò', 'https://hucefood.000webhostapp.com/image/6_dish.png', '4'),
(7, 2, '3', 'Combo burger, khoai tây, coca', 'https://hucefood.000webhostapp.com/image/7_dish.png', '3.4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_restaurant`
--

CREATE TABLE `group_restaurant` (
  `id` int(11) NOT NULL,
  `group_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `group_restaurant`
--

INSERT INTO `group_restaurant` (`id`, `group_name`) VALUES
(1, 'Đồ ăn nhanh'),
(2, 'Đồ uống');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ship` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dish1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dish2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dish3` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `background` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_group` int(11) NOT NULL,
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `rate`, `ship`, `dish1`, `dish2`, `dish3`, `background`, `time`, `id_group`, `location`) VALUES
(1, 'KFC Việt Nam', '5', 'free ship', 'Gà rán', 'buger', 'khoai tây chiên', 'https://hucefood.000webhostapp.com/image/kfc.png', '30-40 min', 1, '50A Nguyên Xá'),
(2, 'McDonald\'s Việt Nam', '4,5', 'free ship', 'Gà rán', 'buger', 'khoai tây chiên', 'https://hucefood.000webhostapp.com/image/mcdonald.png', '10-20 min', 1, '55 Giải phóng'),
(3, 'Mixue', '4', 'free ship', 'Kem', 'Nước cam', 'Trà sữa', 'https://hucefood.000webhostapp.com/image/mixue.png', '30-40 min', 2, '1 Đại Cồ Việt'),
(4, 'Tocotoco', '3', '10k', 'Hồng trà', 'Trà đào', 'Trà Ô Long', 'https://hucefood.000webhostapp.com/image/tocotoco.png', '5-10 min', 2, '40 Tạ Quang Bửu'),
(5, 'Highland Coffee', '5', '20k', 'Cà phê sữa đá', 'Trà đào', 'Matcha kem cheese', 'https://hucefood.000webhostapp.com/image/highland.png', '25-30 min', 2, 'Timecity, R4 trung tâm thương mai');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass_word` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sdt` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `pass_word`, `sdt`) VALUES
(1, 'Bùi Quốc Việt', 'viet@gmail.com', 'bb2be02cd4531116d09e94b3c1ffdc50', '0395030242'),
(2, 'Đỗ Đức Tiến', 'tien@gmail.con', 'dd4b21e9ef71e1291183a46b913ae6f2', '0123456789'),
(3, 'Nguyễn Thị Tuyết Mây', 'mai@gmail.com', 'dd4b21e9ef71e1291183a46b913ae6f2', '0395030242');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `group_restaurant`
--
ALTER TABLE `group_restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `group_restaurant`
--
ALTER TABLE `group_restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
