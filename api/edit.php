<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
	</head>
	
	<body>
		<?php
		$id=$_GET['id'];
		include"koneksi.php";
		$select="Select * from barang where idBarang='$id'";
		$hasil=mysqli_query($conn, $select);
		while($buff=mysqli_fetch_array($hasil)){
			?>
			<h2>Edit Barang</h2><br />
			<form action="?module=edit2" method="post">
			<form action="?module=edit2" method="post">
			<table width="487" border="0">
			<input type="hidden" name="id" value="<?php echo $buff['id'];?>" />
				<tr>
					<td width="150">ID Barang</td>
					<td width="327"><input type="text" name="idBarang" value="<?php echo $buff['idBarang'];?>" /></td>
				</tr>
				<tr>
					<td width="150">Nama Barang</td>
					<td><input type="text" name="namaBarang" value="<?php echo $buff['namaBarang'];?>" /></td>
				</tr>
				<tr>
					<td width="150">ID Supplier</td>
					<td><input type="text" name="idSupplier" value="<?php echo $buff['idSupplier'];?>" /></td>
				</tr>
				<tr>
					<td height="68" align="right"><input type="reset" value="reset" /></td>
					<td><input type="submit" value="submit" /></td>
				</tr>
			</table>
		</form>
		<?php
		};
		mysqli_close($conn);
		?>
	</body>
</html>