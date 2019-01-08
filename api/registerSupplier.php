<?php
require "koneksi.php";

$mysql = "INSERT INTO supplier
(idSupplier, namaSupplier, alamatSupplier, kontakSupplier) VALUES
('$_POST[idSupplier]', '$_POST[namaSupplier]', '$_POST[alamatSupplier]', '$_POST[kontakSupplier]')";

if(!mysqli_query($conn, $mysql))
	die (mysqli_error($conn));

echo"<script>alert('Data berhasil dimasukan');window.location.href='lihatSupplier.php';</script>";

mysqli_close($conn);
?>