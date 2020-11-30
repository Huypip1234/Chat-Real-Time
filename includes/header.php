<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Messenger</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
	<!-- Kết nối thư viện Font Awesome Icons -->
	<link rel="stylesheet" href="css/font-awesome-4.6.3/css/font-awesome.min.css">
	<!-- Kết nối file css/style.css -->
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<?php
		// Nếu tồn tại $user
		if ($user)
		{
			// Hiển thị menu
			echo '
				<div class="main-menu">
					<h1><i class="fa fa-commenting"></i> Messenger</h1>
					<a href="logout.php"><i class="fa fa-sign-out"></i></a>	
				</div>
				<div class="clearfix"></div>
			';
		}
		// Ngược lại
		else
		{
			// Hiển thị navbar
			echo '
				<div class="main-navbar">
					<h1><i class="fa fa-commenting"></i> Messenger</h1>
				</div><!-- div.main-header -->
			';
		}
	?>