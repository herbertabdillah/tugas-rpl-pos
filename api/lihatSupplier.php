
		<?php
		include"koneksi.php";
		$select="select * from supplier";
		$hasil=mysqli_query($conn, $select);
		$products_arr["records"]=array();
		$products_arr=array();
		for($i=1;$buff=mysqli_fetch_array($hasil);$i++){

			      $product_item=array(
            "idSupplier" => $buff['idSupplier'],
            "namaSupplier" => $buff['namaSupplier'],
            "alamatSupplier" => $buff['alamatSupplier'],
            "kontakSupplier" => $buff['kontakSupplier']
        );
 
$products_arr["records"][] = $product_item;	
		}			
		   // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($products_arr);
		mysqli_close($conn);