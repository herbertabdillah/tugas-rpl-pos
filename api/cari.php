<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Untitled Document</title>
	</head>
	
	<body>
	<h2>Pencarian</h2><br/>

	<form align="center" action="" method="get">
		<input  type="hidden" name="module" value="cari" />
		<input  type="text" name="username" placeholder="cari barang" />
		<input  type="submit" value="cari" />
	</form>

		<?php
		include"unpam/koneksi.php";
		if(isset($_GET['username'])){
			$username=$_GET['username'];
			$select="SELECT * FROM register WHERE username LIKE '%$username%'";
			$hasil=mysqli_query($conn, $select);
	
		?>

		<?php
		
		for($i=1;$buff=mysqli_fetch_array($hasil);$i++){
			if($i==1){
				echo '<table border="1" width=80% align="center">';
				echo '		
				<tr>
				<td width="5%">id</td>
				<td width="15%">nama depan</td>
				<td width="15%">nama belakang</td>
				<td width="15%">username</td>
				<td width="15%">jk</td>
				<td width="15%">email</td>
				<td width="20%">aksi</td>
				</tr>
		';
			}
		?>
	
			<tr>
				<td width="5%"><?php echo $i;?></td>
				<td width="15%"><?php echo $buff['namadep'];?></td>
				<td width="15%"><?php echo $buff['namabel'];?></td>
				<td width="15%"><?php echo $buff['username'];?></td>
				<td width="15%"><?php echo $buff['jk'];?></td>
				<td width="15%"><?php echo $buff['email'];?></td>
				<td width="20%"><a href="?module=edit&id=<?php echo $buff['id'];?>">edit</a>  <a href="?module=hapus&id=<?php echo $buff['id'];?>">hapus</a></td>
							</tr>
		
		<?php
		};
		echo '</table>';
		mysqli_close($conn);
		?><br/>
		
	<?php } ?>
	</body>
</html>