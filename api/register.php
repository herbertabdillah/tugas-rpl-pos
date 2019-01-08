<?php
require "koneksi.php";

$mysql = "INSERT INTO barang
(idBarang, namaBarang, idSupplier) VALUES
('$_POST[idBarang]', '$_POST[namaBarang]', '$_POST[idSupplier]')";

if(!mysqli_query($conn, $mysql))
	die (mysqli_error($conn));

echo"<script>alert('Data berhasil dimasukan');window.location.href='lihat.php';</script>";

mysqli_close($conn);
?>