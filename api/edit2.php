<?php
include"koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST['idBarang'])){
	$edit="UPDATE barang SET idBarang='$_POST[idBarang]', namaBarang='$_POST[namaBarang]', hargaBarang='$_POST[hargaBarang]', idSupplier='$_POST[idSupplier]', stok='$_POST[stok]' WHERE idBarang='$_POST[idBarang]'";
	$hasil=mysqli_query($conn, $edit);
	if($hasil){
		echo"<script>alert('data berhasil diedit');window.location.href='lihat.php';</script>";
}}?>