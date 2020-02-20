<template>
	<div>
		<div class="not_login" v-if="bool">
			<p>成为会员尊享更多权益</p>
			<van-button size="small" round to="login">登录/注册</van-button>
		</div>
		<div class="login_header" v-else>
			<div class="vip">
				<img src="~assets/img/index/my_vip_red.png" alt="" />
			</div>
			<div class="laobi">
				<div>
					<span class="num">{{ vip_money }}</span
					><span>捞币</span>
				</div>
				<div>
					<span class="num">{{ quan_value }}</span
					><span>券</span>
				</div>
				<div class="arrows">
					<span>去兑换</span><img src="~assets/img/index/arrows.png" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			vip_money: "0",
            quan_value: "0",
		};
	},
	computed: {
		...mapState(["bool"])
	},
	mounted() {},
	methods: {},
	created() {
		// this.$api.get().then(res => {
        //     if (res.data.code > 0) {
        //         this.vip_money = res.data.user.vip_money;
        //     }
		// })
		// .catch(err => {
		// 	console.log(err);
		// });
	}
};
</script>

<style scoped>
/*********已登录状态**************/
.login_header {
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
}
.vip > img {
	height: 16px;
	margin-left: 15px;
	margin-top: 10px;
}
.laobi {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 5px 35px 10px 15px;
}
span {
	font-size: 12px;
	color: #fff;
}
.num {
	color: #fff;
	font-size: 30px;
}
.arrows {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.arrows > span {
	margin-right: 3px;
}
.arrows img {
	width: 6px;
	height: 8px;
}

/**********未登录状态*************************/
.not_login {
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	margin-bottom: 20px;
}
.not_login > p {
	margin: 0px 0px 10px;
	color: #fff;
	font-weight: bold;
	font-family: "Microsoft YaHei";
}
.not_login span {
	font-size: 13px;
	color: #e33239;
	font-weight: 700;
}
.van-button--small {
	width: 100px;
	height: 32px;
	margin-bottom: 22px;
}
</style>
