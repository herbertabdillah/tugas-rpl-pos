<?php
include"koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
$hapus="DELETE FROM barang WHERE idBarang=".$_POST['idBarang'];
$hasil=mysqli_query($conn, $hapus);
if($hapus){
	echo"<script>alert('Data berhasil dihapus');window.location.href='lihat.php';</script>";
}?>