<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
	</head>
	
	<body>
		<h2>Stok Barang</h2><br/>
		<?php
		include"koneksi.php";
		$select="select * from barang";
		$hasil=mysqli_query($conn, $select);
		?>
		
		<table border="1" width="80%" align="center">
			<tr>
				<td width="5%"><center>ID Barang</td>
				<td width="10%"><center>Nama Barang</td>
				<td width="10%"><center>Stok Rak</td>
				<td width="10%"><center>Stok Gudang</td>
				<td width="5%">Aksi</td>
			</tr>
		
		
		<?php

		for($i=1;$buff=mysqli_fetch_array($hasil);$i++){
			?>
			
				<tr>
					<td width="5%"><center><?php echo $buff['idBarang'];?></td>
					<td width="5%"><?php echo $buff['namaBarang'];?></td>
					<td width="5%"><?php echo $buff['stokRak'];?></td>
					<td width="5%"><?php echo $buff['stokGudang'];?></td>
					<td width="10%">
					<a href="tambahStok.php?idBarang=<?php echo $buff['idBarang'];?>">Ubah Stok</a>
				</tr>
		
		<?php
		};
		echo '</table>';
		mysqli_close($conn);
		?><br />
		<a href="index.php">Main Menu</a>
	</body>
</html>