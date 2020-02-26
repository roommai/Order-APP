<template>
	<div class="container">
		<div class="container_user" v-for="(item, i) of users" :key="i">
			<div class="user_left">
				<img :src="serverBaseURL + item.user_img" alt="" />
				<span>{{ item.uname }}</span>
			</div>
			<div>
				<van-button type="primary" size="mini" round>关注</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: {
		users: { default: Array }
	},
	data() {
		return {
			user: [
				{
					userImg: "assets/img/community/tx1.jpg",
					nickname: "王海珠",
					attention: "关注"
				},
				{
					userImg: "assets/img/community/tx1.jpg",
					nickname: "蔡海珠",
					attention: "已关注"
				},
				{
					userImg: "assets/img/community/tx1.jpg",
					nickname: "方海珠",
					attention: "关注"
				},
				{
					userImg: "assets/img/community/tx1.jpg",
					nickname: "海珠海珠",
					attention: "已关注"
				},
				{
					userImg: "assets/img/community/tx1.jpg",
					nickname: "海珠",
					attention: "关注"
				}
			]
		};
	},
	computed: {
		...mapState(["serverBaseURL"])
	},
	created() {
	}
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	background: #fff;
	padding: 10px 10px 0px 10px;
}

.container_user {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-bottom: 5px;
	border-bottom: 0.5px solid #f0eeee;
}
.container_user ~ .container_user {
	margin-top: 5px;
}

.user_left {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}
.user_left span {
	margin-left: 10px;
	font-size: 12px;
	font-weight: bold;
}

.van-button--primary {
	background: #df2f31;
	border: 1px solid #df2f31;
}
</style>
