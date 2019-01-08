<?php
		$idBarang=$_GET['idBarang'];
		include"koneksi.php";
		$select="Select * from barang where idBarang='$idBarang'";
		$hasil=mysqli_query($conn, $select);
		while($buff=mysqli_fetch_array($hasil)){
			?>
			<h2>Edit Barang</h2><br />
			<form action="editStok.php" method="post">
			<form action="editStok.php" method="post">
			<table width="487" border="0">
			<input type="hidden" name="idBarang" value="<?php echo $buff['idBarang'];?>" />
				<tr>
					<td width="150">Stok Gudang</td>
					<td><input type="text" name="stokGudang" value="<?php echo $buff['stokGudang'];?>" /></td>
				</tr>
				<tr>
					<td width="150">Stok Rak</td>
					<td><input type="text" name="stokRak" value="<?php echo $buff['stokRak'];?>" /></td>
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
