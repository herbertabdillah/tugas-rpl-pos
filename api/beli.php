<?php
require "koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
$tanggal=date('Y-m-d H:i:s');
$laporan = $_POST['laporan'];
for($i=0; $i<count($laporan);$i++){
	$barang = $laporan[$i];
	$mysql = "INSERT INTO laporan
	(idBarang, tanggal, jumlahBarang, totalHarga) VALUES
	('$barang[idBarang]', '$tanggal', '$barang[jumlahBarang]', '$barang[totalHarga]')";

	if(!mysqli_query($conn, $mysql))
		die (mysqli_error($conn));	
}


echo"<script>alert('Data berhasil dimasukan');window.location.href='lihat.php';</script>";

mysqli_close($conn);
?>