<?php
include"koneksi.php";
if(isset($_POST['id'])){
	$edit="UPDATE barang SET idBarang='$_POST[idBarang]', namaBarang='$_POST[namaBarang]', idSupplier='$_POST[idSupplier]'";
	$hasil=mysqli_query($conn, $edit);
	if($hasil){
		echo"<script>alert('data berhasil diedit');window.location.href='index.php?module=lihat';</script>";
}}?>