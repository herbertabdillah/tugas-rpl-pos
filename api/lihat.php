<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
	</head>
	
	<body>
		<h2>Daftar Barang</h2><br/>
		<?php
		include"koneksi.php";
		$select="select * from barang";
		$hasil=mysqli_query($conn, $select);
		?>
		
		<table border="1" width="80%" align="center">
			<tr>
				<td width="5%">ID Barang</td>
				<td width="15%">Nama Barang</td>
				<td width="15%">ID Supplier</td>
				<td width="20%">Aksi</td>
			</tr>
		
		
		<?php

		for($i=1;$buff=mysqli_fetch_array($hasil);$i++){
			?>
			
				<tr>
				<td width="5%"><?php echo $buff['idBarang'];?></td>
					<td width="15%"><?php echo $buff['namaBarang'];?></td>
					<td width="15%"><?php echo $buff['idSupplier'];?></td>
					<td width="20%">
					<a href="?module=edit&id=<?php echo $buff['idBarang'];?>">edit</a>
					<a href="?module=hapus&id=<?php echo $buff['idBarang'];?>">hapus</a></td>
				</tr>
		
		<?php
		};
		echo '</table>';
		mysqli_close($conn);
		?><br />
		<a href="index.php?module=barang">Tambah Barang</a>
	</body>
</html>