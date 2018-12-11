<?php session_start(); ?>
<html xmlns = "http://www.w3.org/1999/xhtml">

<head>
	<title>rpl</title>
	
	<link href = "style/style_edit.css" type="text/css" rel="stylesheet" />
</head>

<body>
	<div id="container">
		<div id="header">
			<h1>POINT OF SALE</h1>
		</div>

		<div id="sidebar">
			<h3>Navigasi</h3>
			<ul id="navmenu">
				<li><a href="?module=barang">Barang</a></li>
				<li><a href="?module=lihat">View</a></li>
		
				<li><a href="?module=cari">Search</a></li>
				<?php if(isset($_SESSION['namaBarang'])) echo'<li><a href="?module=profil">Profil</a></li>';?>
			</ul> 
			<div id="login">
			<?php 
				// line 23 not finished yet
				if(isset($_SESSION['username'])){
			?>
				<a href="?module=logout">Logout</a>
			<?php
				} else {
			?>
			
				<!-- <pre> -->
					<form action="?module=login" method="post">
						Username :
						<input type="text" name="username" />
						Password :
						<input type="password" name="password" />
						<br>
						<input type="submit" value="Login" />
					</form>
				<!-- </pre> -->
			
			<?php 
				}
				// session_destroy(); 
			?>
			</div>
		</div>

		<div id="page">
					<?php if(isset($_GET['module']))
				include "$_GET[module].php";
			else
				include "home.php";?>
		</div>
	
		<div id="clear"></div>

		
	</div>
</body>

</html>
