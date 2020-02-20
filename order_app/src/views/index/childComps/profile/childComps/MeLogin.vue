<template>
	<div class="user_msg">
		<router-link to="edit">
			<img src="~assets/img/me/my_editprofile.png" class="bj" />
		</router-link>
		<img :src="serverBaseURL + user_img" class="user_img" />
		<h4>
			{{ uname }}
			<img src="~assets/img/me/my_vip_red.png" class="vip" />
		</h4>
		<div class="discount">
			<span>
				<i>{{ vip_money }}</i> 捞币
			</span>
			<span>
				<i>{{ count }}</i> 券
			</span>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			uname: "",
			count: 0,
			vip_money: "",
			user_img: "/images/user/default.png"
		};
	},
	methods: {
		// ...mapActions(["getlogin"])
	},
	computed: {
		...mapState(["serverBaseURL"])
	},
	beforeMount() {
		// this.$api
		// 	.get()
		// 	.then(res => {
		// 		this.uname = res.data.user.uname;
		// 		this.vip_money = res.data.user.vip_money;
		// 		this.user_img = res.data.user.user_img;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
};
</script>
<style scoped>
.bj {
	position: absolute;
	top: 10px;
	right: 15px;
	width: 15px;
}
.user_msg {
	position: relative;
	height: 130px;
	width: 90%;
	margin: 0 auto;
	/* line-height: 130px; */
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
	border-radius: 50%;
	margin-left: -40px;
}
.user_msg > h4 {
	position: absolute;
	width: 100%;
	margin-top: 45px;
}
.vip {
	vertical-align: middle;
	width: 45px;
}
.user_msg:before {
	content: "";
	display: table;
}
.discount {
	/* position: absolute;
  bottom: 0;
  margin-bottom: 15px; */
	display: flex;
	justify-content: space-between;
	padding: 0 40px;
	font-size: 12px;
	color: #999;
	margin-top: 100px;
}
.discount i {
	font-style: normal;
	font-size: 16px;
	color: #f00;
	font-weight: bolder;
	vertical-align: middle;
}
</style>
