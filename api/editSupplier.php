	<body>
		<?php
		$idSupplier=$_GET['idSupplier'];
		include"koneksi.php";
		$select="Select * from supplier where idSupplier='$idSupplier'";
		$hasil=mysqli_query($conn, $select);
		while($buff=mysqli_fetch_array($hasil)){
			?>
			<h2>Edit Supplier</h2><br />
			<form action="edit2Supplier.php" method="post">
			<form action="edit2Supplier.php" method="post">
			<table width="487" border="0">
			<input type="hidden" name="idSupplier" value="<?php echo $buff['idSupplier'];?>" />
				<tr>
					<td width="150">Nama Supplier</td>
					<td><input type="text" name="namaSupplier" value="<?php echo $buff['namaSupplier'];?>" /></td>
				</tr>
				<tr>
					<td width="150">Alamat Supplier</td>
					<td><input type="text" name="alamatSupplier" value="<?php echo $buff['alamatSupplier'];?>" /></td>
				</tr>
				<tr>
					<td width="150">Kontak Supplier</td>
					<td><input type="text" name="kontakSupplier" value="<?php echo $buff['kontakSupplier'];?>" /></td>
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