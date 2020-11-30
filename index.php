<?php
	// Kết nối database
	include('includes/general.php');
	// Kết nối header
	include('includes/header.php');

	// Nếu tồn tại $user
	if ($user)
	{
		// Hiển thị trò chuyện
		echo '
			<div class="main-chat">		
			</div><!-- div.main-chat -->
			<div class="box-chat">
				<form method="POST" id="formSendMsg" onsubmit="return false;">
					<input type="text" placeholder="Nhập nội dung tin nhắn ...">
				</form><!-- form#formSendMsg -->
			</div><!-- div.box-chat -->
		';
	}
	// Ngược lại
	else
	{
		// Hiển thị form đăng nhập, đăng ký
		echo '
			<div class="box-join">
				<p>Tạo tài khoản hoặc đăng nhập để tham gia với chúng tôi</p>
				<form method="POST" id="formJoin" onsubmit="return false;">
					<input type="text" placeholder="Tên đăng nhập" class="data-input" id="username">
					<input type="password" placeholder="Mật khẩu" class="data-input" id="password">
					<button class="btn-submit">Bắt đầu</button>
					<div class="alert danger"></div>
				</form><!-- form#formJoin -->
			</div><!-- div.box-join -->
		';
	}
	// Kết nối footer
	include('includes/footer.php');
?>