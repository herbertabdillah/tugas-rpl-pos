
<?php
include"koneksi.php";
$_POST = json_decode(file_get_contents('php://input'), true);
$awal = $_POST['awal'];
$akhir = $_POST['akhir'];
$select="SELECT CAST(tanggal AS DATE) as 'tanggal', SUM(totalHarga)as 'pendapatan' FROM `laporan` WHERE (tanggal BETWEEN '".$awal." 00:00:00' AND '".$akhir." 23:59:59') GROUP BY CAST(tanggal AS DATE)";
$hasil=mysqli_query($conn, $select);

$products_arr=array();
for($i=0;$buff=mysqli_fetch_array($hasil);$i++){
	$products_arr[] = $buff;

}			
	// set response code - 200 OK
http_response_code(200);

// show products data in json format
echo json_encode($products_arr);
mysqli_close($conn);
