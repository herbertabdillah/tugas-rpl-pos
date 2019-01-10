<?php
require "koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
$mysql = "INSERT INTO supplier
(namaSupplier, alamatSupplier, kontakSupplier) VALUES
('$_POST[namaSupplier]', '$_POST[alamatSupplier]', '$_POST[kontakSupplier]')";

if(!mysqli_query($conn, $mysql))
	die (mysqli_error($conn));

echo"<script>alert('Data berhasil dimasukan');window.location.href='lihatSupplier.php';</script>";

mysqli_close($conn);
?>