<template>
	<div class="l_vip">
		<div class="h_vip">
			<div class="left">
				<p>{{ uname }}</p>
				<p>
					<img :src="hurl" />
					{{ vip_lv }}
				</p>
				<p>
					<span>{{ vip_money }}</span>
					捞币
				</p>
			</div>
			<div class="right">
				<div size="small" round :to="hurl">
					<i></i>
					<span>我的会员码</span>
				</div>
				<p>NO. {{ vip_card }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			vip_lv: "红海会员",
			vip_card: "",
			hurl: require("assets/img/member/su_small_red.png"),
			uname: "",
			vip_money: ""
		};
	},
	methods: {},
	computed: {
		...mapState(["data"])
	},
	created() {
		// this.$api
		// 	.get()
		// 	.then(res => {
		// 		this.uname = res.data.user.uname;
		// 		this.vip_money = res.data.user.vip_money;
		// 		this.salVal = res.data.user.salary;
		// 		this.email = res.data.user.email;
		// 		this.signVal = res.data.user.say;
		// 		this.vip_card = res.data.user.vip_card;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
};
</script>

<style lang="scss" scoped>
.l_vip {
	background: #fff;
	margin-top: -1px;
	padding-top: 20px;
	width: 100%;
	height: 180px;
}
.h_vip {
	height: 100%;
	background: url("~assets/img/member/member_red_card.png") no-repeat;
	background-size: 100%;
	position: relative;
}
.left {
	position: absolute;
	top: 20px;
	left: 30px;
	color: #fbfbfb;
	p {
		display: flex;
		align-items: center;
		img {
			width: 10px;
			height: 11px;
			margin-right: 5px;
		}
		&:nth-child(1) {
			margin-top: 10px;
			font-size: 15px;
			color: #f1f1f1;
		}
		&:nth-child(2) {
			margin-top: 5px;
			background: #cb1017;
			padding: 1px 5px;
			border-radius: 10px;
			font-size: 10px;
			color: #ff9c83;
		}
		&:nth-child(3) {
			font-size: 10px;
			margin-top: 15px;
			&:after {
				content: "";
				display: block;
				border: 4px solid;
				margin-left: 2px;
				border-color: transparent transparent transparent #fff;
			}
			span {
				display: block;
				font-size: 25px;
				margin-right: 5px;
				margin-bottom: 5px;
			}
			vertical-align: bottom;
		}
	}
}
.right {
	position: absolute;
	top: 30px;
	right: 30px;
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	div {
		display: flex;
		align-items: center;
		padding: 0 5px;
		width: 100px;
		height: 30px;
		border-radius: 50px;
		background: #fdfdfd;
		color: #c11f1e;
		overflow: hidden;

		span {
			font-family: "Microsoft YaHei";
			font-size: 12px;
		}

		i {
			display: block;
			width: 20px;
			height: 20px;
			background: url("~assets/img/member/red_qr.png") no-repeat -5px -5px;
			background-size: 100px;
		}
	}
	p {
		color: #fdfdfd;
		font-size: 10px;
		margin-top: 38px;
	}
}
</style>
