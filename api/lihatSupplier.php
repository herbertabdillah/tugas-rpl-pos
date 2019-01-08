<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
	</head>
	
	<body>
		<h2>Daftar Supplier</h2><br/>
		<?php
		include"koneksi.php";
		$select="select * from supplier";
		$hasil=mysqli_query($conn, $select);
		?>
		
		<table border="1" width="80%" align="center">
			<tr>
				<td width="5%">ID Supplier</td>
				<td width="15%">Nama Supplier</td>
				<td width="15%">Alamat Supplier</td>
				<td width="15%">Kontak Supplier</td>
				<td width="20%">Aksi</td>
			</tr>
		
		
		<?php

		for($i=1;$buff=mysqli_fetch_array($hasil);$i++){
			?>
			
				<tr>
				<td width="5%"><?php echo $buff['idSupplier'];?></td>
					<td width="15%"><?php echo $buff['namaSupplier'];?></td>
					<td width="15%"><?php echo $buff['alamatSupplier'];?></td>
					<td width="15%"><?php echo $buff['kontakSupplier'];?></td>
					<td width="20%">
					<a href="editSupplier.php?idSupplier=<?php echo $buff['idSupplier'];?>">Edit</a>
					<a href="hapusSupplier.php?idSupplier=<?php echo $buff['idSupplier'];?>">Hapus</a></td>
				</tr>
		
		<?php
		};
		echo '</table>';
		mysqli_close($conn);
		?><br />
		<a href="index.php">Main Menu</a>
		<a href="supplier.php">Tambah Supplier</a>
	</body>
</html>