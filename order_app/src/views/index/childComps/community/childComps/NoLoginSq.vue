<template>
	<div class="nologin">
		<div class="tie">
			<p>快发布贴子和小伙伴们亲密互动吧~</p>
			<van-button type="danger" size="small" @click="goLogin"
				>登录/注册</van-button
			>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goLogin() {
			this.$router.push("/login");
		}
	}
};
</script>

<style lang="scss" scoped>
.nologin {
	display: flex;
	width: 100%;
	height: 470px;
	background: url("~assets/img/community/beijing.png") no-repeat;
	background-size: 100%;
	flex-direction: column;
	align-items: center;
}
.tie {
	// height: 100%;
	// width: 100%;
	margin-top: 70%;
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		font-size: 13px;
		color: #666;
		margin-bottom:10px;
	}
	.van-button {
		border-radius: 40px;
		padding: 0 20px;
		// .van-button__text {
		// 	height: 30px;
		// }
	}
}
</style>
