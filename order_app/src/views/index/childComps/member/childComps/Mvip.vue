<template>
	<div class="m_vip">
		<div class="h_vip">
			<div class="left">
				<h3>海底捞会员</h3>
				<p>登录享受多种权益</p>
			</div>
			<div class="right">
				<van-button size="small" round @click="getbool">登录/注册</van-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			url: "./login",
			bool: false
		};
	},
	methods: {
		getbool() {
		// 	console.log("1111")
		// 	// this.$emit("getb",)
		// 	// this.$emit("getb", this.bool);
		// 	this.$router.push("/login");
		}
	}
};
</script>

<style lang="scss" scoped>
.m_vip {
	background: #fff;
	padding-top: 18px;
	width: 100%;
	height: 180px;
	.h_vip {
		height: 100%;
		background: url("~assets/img/member/member_red_card.png") no-repeat;
		background-size: 100%;
		position: relative;

		.left {
			position: absolute;
			top: 25px;
			left: 30px;
			color: #fbfbfb;
			p {
				margin-top: 15px;
				font-size: 10px;
				color: #f1f1f1;
			}
		}
		.right {
			position: absolute;
			top: 30px;
			right: 30px;
			height: 100px;
			.van-button {
				width: 85px;
				color: #c11f1e;
			}
		}
	}
}
</style>
