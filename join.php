<?php
	// Kết nối database, lấy dữ liệu chung
	include('includes/general.php');
	// Nếu tồn tại $user
	if ($user)
	{
		header('Location: index.php'); // Di chuyển đến file index.php
	}

	// Khai báo các biến nhận dữ liệu
	$username = @mysqli_real_escape_string($cn, $_POST['username']);
	$password = @mysqli_real_escape_string($cn, $_POST['password']);

	// Các biến hiển thị thông báo 
	$show_alert = '<script>$("#formJoin .alert").show();</script>'; // Hiển thị thông báo lỗi
	$hide_alert = '<script>$("#formJoin .alert").hide();</script>'; // Ẩn thông báo lỗi
	$success_alert = '<script>$("#formJoin .alert").attr("class", "alert success");</script>'; // Thông báo thành công

	// Kiểm tra có tồn tại username
	$query_check_exist_user = mysqli_query($cn, "SELECT * FROM users WHERE username = '$username'");

	// Nếu username hoặc password trống
	if ($username == '' || $password == '')
	{
		echo $show_alert.'Vui lòng điền đầy đủ thông tin bên trên.'; // Thông báo
	}
	// Ngược lại
	else
	{
		// Nếu tồn tại username thì thực thi đăng nhập
		if (mysqli_num_rows($query_check_exist_user))
		{
			$password = md5($password); // Mã hoá password sang MD5
			// Kiểm tra thông tin đăng nhập
			$query_check_login = mysqli_query($cn, "SELECT * FROM users WHERE username = '$username' AND password = '$password'");
			// Nếu thông tin đăng nhập đúng
			if (mysqli_num_rows($query_check_login))
			{
				echo $show_alert.$success_alert.'Đăng nhập thành công.'; // Thông báo
				$_SESSION['username'] = $username; // Lưu session giá trị username
				echo '<script>window.location.reload();</script>'; // Tải lại trang
			}
			// Ngược lại
			else
			{
				echo $show_alert.'Tên đăng nhập hoặc mật khẩu không chính xác.'; // Thông báo
			}
		}
		// Ngược lại thì thực thi đăng ký
		else
		{
			// Nếu độ dài username < 6 hoặc > 40
			if (strlen($username) < 6 || strlen($username) > 40)
			{
				echo $show_alert.'Tên đăng nhập trong khoảng từ 6-40 ký tự.'; // Thông báo
			}
			// Nếu username chứa khoảng trắng và ký tự đặc biệt
			else if (preg_match('/\W/', $username))
			{
				echo $show_alert.'Tên đăng nhập không chứa khoảng trắng và ký tự đặc biệt.'; // Thông báo
			}
			// Nếu độ dài password < 6
			else if (strlen($password) < 6)
			{
				echo $show_alert.'Mật khẩu của bạn quá ngắn, hãy thử lại với mật khẩu khác an toàn hơn.'; // Thông báo
			}
			// Không mắc các lỗi trên thì insert vào table
			else
			{
				$password = md5($password); // Mã hoá password sang MD5
				// Thêm thông tin người dùng vào table users 
				$query_create_user = mysqli_query($cn, "INSERT INTO users VALUES (
						'',
						'$username',
						'$password',
						'$date_current' 
					)");
				echo $show_alert.$success_alert.'Đăng ký tài khoản thành công.'; // Thông báo
				$_SESSION['username'] = $username; // Lưu session giá trị username
				echo '<script>window.location.reload();</script>'; // Tải lại trang
			}
		}
	}
?>