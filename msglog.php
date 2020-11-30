<?php
	// Kết nối database, lấy dữ liệu chung
	include('includes/general.php');

	// Lấy dữ liệu từ table messages theo thứ tự id_msg tăng dần
	$query_get_msg = mysqli_query($cn, "SELECT * FROM messages ORDER BY id_msg ASC");
	// Dùng vòng lập while để lấy dữ liệu
	while ($row = mysqli_fetch_assoc($query_get_msg))
	{
		// Thời gian gửi tin nhắn
		$date_sent = $row['date_sent'];
			$day_sent = substr($date_sent, 8, 2); // Ngày gửi
			$month_sent = substr($date_sent, 5, 2); // Thánh gửi
			$year_sent = substr($date_sent, 0, 4); // Năm gửi
			$hour_sent = substr($date_sent, 11, 2); // Giờ gửi
			$min_sent = substr($date_sent, 14, 2); // Phút gửi

		// Nếu người gửi là $user thì hiển thị khung tin nhắn màu xanh
		if ($row['user_from'] == $user)
		{
			echo '
				<div class="msg-user">
					<p>'.$row['body'].'</p>
					<div class="info-msg-user">
						Bạn - '.$day_sent.'/'.$month_sent.'/'.$year_sent.' lúc '.$hour_sent.':'.$min_sent.'
					</div>
				</div>
				
			';
		}
		// Ngược lại người gửi không phải là $user thì hiển thị khung tin nhắn màu xám
		else
		{
			echo '
				<div class="msg">
					<p>'.$row['body'].'</p>
					<div class="info-msg">
						'.$row['user_from'].' - '.$day_sent.'/'.$month_sent.'/'.$year_sent.' lúc '.$hour_sent.':'.$min_sent.'
					</div>
				</div>
			';
		}
	}
?>