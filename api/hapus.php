<?php
include"koneksi.php";
$hapus="DELETE FROM barang WHERE idBarang=".$_GET['idBarang'];
$hasil=mysqli_query($conn, $hapus);
if($hapus){
	echo"<script>alert('Data berhasil dihapus');window.location.href='lihat.php';</script>";
}?>