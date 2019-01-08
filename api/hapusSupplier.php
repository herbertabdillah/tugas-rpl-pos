<?php
include"koneksi.php";
$hapus="DELETE FROM supplier WHERE idSupplier=".$_GET['idSupplier'];
$hasil=mysqli_query($conn, $hapus);
if($hapus){
	echo"<script>alert('Data berhasil dihapus');window.location.href='lihatSupplier.php';</script>";
}?>