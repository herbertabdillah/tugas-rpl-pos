<?php
require "koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
$mysql = "INSERT INTO barang
(idBarang, namaBarang, hargaBarang, idSupplier) VALUES
('$_POST[idBarang]', '$_POST[namaBarang]', '$_POST[hargaBarang]', '$_POST[idSupplier]')";

if(!mysqli_query($conn, $mysql))
	die (mysqli_error($conn));

echo"<script>alert('Data berhasil dimasukan');window.location.href='lihat.php';</script>";

mysqli_close($conn);
?>