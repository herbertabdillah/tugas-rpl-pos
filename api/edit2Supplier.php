<?php
include"koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_GET['idSupplier'])){
	$edit="UPDATE supplier SET namaSupplier='$_POST[namaSupplier]', alamatSupplier='$_POST[alamatSupplier]', kontakSupplier='$_POST[kontakSupplier]' WHERE idSupplier='$_GET[idSupplier]'";
	$hasil=mysqli_query($conn, $edit);
	if($hasil){
		echo"<script>alert('data berhasil diedit');window.location.href='lihatSupplier.php';</script>";
}else{
	echo'gagal';
}
}else{
	echo'isset false';
}?>