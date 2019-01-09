<?php
include"koneksi.php";
if(isset($_POST['idBarang'])){
	$edit="UPDATE barang SET stok='$_POST[stok]' WHERE idBarang='$_POST[idBarang]'";
	$hasil=mysqli_query($conn, $edit);
	if($hasil){
		echo"<script>alert('data berhasil diedit');window.location.href='stokBarang.php';</script>";
}}?>