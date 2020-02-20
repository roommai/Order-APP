<template>
	<div class="user_msg">
		<img src="~assets/img/me/not_login_tx.jpg" class="user_img" />
		<van-button round to="login">点击登录/注册</van-button>
	</div>
</template>
<script>
export default {};
</script>
<style scoped>
.user_msg {
	position: relative;
	height: 130px;
	width: 90%;
	margin: 0 auto;
	line-height: 130px;
	text-align: center;
	margin-top: 48px;
	box-shadow: 0 0 20px #ddd;
	border-radius: 4px;
	background: #fff;
	opacity: 0.95;
}
.user_msg > .user_img {
	position: absolute;
	width: 70px;
	left: 50%;
	top: -40px;
	margin-left: -40px;
	background: #fff;
	border-radius: 50%;
}
.user_msg > button {
	background: #fff;
	border: 1px solid #f00;
	color: #f00;
}
</style>
