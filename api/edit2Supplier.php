<?php
include"koneksi.php";
if(isset($_POST['idSupplier'])){
	$edit="UPDATE supplier SET idSupplier='$_POST[idSupplier]', namaSupplier='$_POST[namaSupplier]', alamatSupplier='$_POST[alamatSupplier]', kontakSupplier='$_POST[kontakSupplier]' WHERE idSupplier='$_POST[idSupplier]'";
	$hasil=mysqli_query($conn, $edit);
	if($hasil){
		echo"<script>alert('data berhasil diedit');window.location.href='lihatSupplier.php';</script>";
}}?>