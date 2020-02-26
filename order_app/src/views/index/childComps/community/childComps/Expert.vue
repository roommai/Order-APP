<template>
	<div>
		<div class="grxx">
			<van-image
				round
				width="2.5rem"
				height="2.5rem"
				:src="serverBaseURL + user_img"
			/>
			<div class="fb">
				<span class="mc">{{ uname }}<em class="tb"></em></span>
				<p>活跃度:你发布了0条帖子</p>
			</div>
		</div>
		<div class="dr">
			<div class="zdr">
				<div class="z-icon"></div>
				<p>周达人</p>
			</div>
			<div class="ydr">
				<div class="y-icon"></div>
				<p>月达人</p>
			</div>
			<div class="ndr">
				<div class="n-icon"></div>
				<p>年达人</p>
			</div>
		</div>
		<div>
			<div
				class="gzdr"
				v-for="(item, index) in dar"
				:key="index"
				:class="'active' + (index % 2)"
			>
				<div class="left">
					<div class="tx">
						<img :src="(item.headphoto)" alt="" />
					</div>
					<div class="wz">
						<p class="nc">{{ item.nickname }}</p>
						<p class="ch">达人称号:{{ item.title }}</p>
					</div>
				</div>
				<div class="right">
					<div class="hltd">
						<div class="sjx">
							<div class="dsj"></div>
							<div class="zsj"></div>
						</div>
						<div class="jx">{{ item.from }}</div>
					</div>
					<div class="jl">获得奖励:{{ item.award }}</div>
				</div>
			</div>
		</div>
		<!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->

		<!-- <van-popup v-model="show"
			>内容

			<van-datetime-picker
				v-model="currentDate"
				type="year-month"
				:min-date="minDate"
				:formatter="formatter"
			/>
		</van-popup> -->
	</div>
</template>
<script>
import { Checkuser } from 'network/community'
import { mapState } from "vuex";
export default {
	data() {
		return {
			uname: "",
			show: false,
			minHour: 10,
			maxHour: 20,
			minDate: new Date(),
			maxDate: new Date(2019, 10, 1),
			currentDate: new Date(),
			user_img: "",
			dar: [
				{
					headphoto: require("assets/img/community/tx1.png"),
					nickname: "LIHUAGI",
					title: "海捞达人",
					award: "50捞币",
					from: "海捞天地"
				},
				{
					headphoto: "assets/img/community/tx1.png",
					nickname: "LIHUAGI",
					title: "讨论达人",
					award: "50捞币",
					from: "讨论专区"
				},
				{
					headphoto: "assets/img/community/tx2.png",
					nickname: "不喝小米粥",
					title: "投诉达人",
					award: "50捞币",
					from: "投诉专区"
				},
				{
					headphoto: "assets/img/community/tx3.png",
					nickname: "小菜",
					title: "最新达人",
					award: "50捞币",
					from: "最新活动"
				}
			]
		};
	},
	computed: {
		...mapState([ "serverBaseURL"])
	},
	created() {
		Checkuser().then(res => {
			console.log(res)
			this.uname = res.user.uname;
			this.user_img = res.user.user_img;
		})
		// this.$api
		// 	.get()
		// 	.then(res => {
		// 		// console.log(res.data.user);
		// 		this.uname = res.data.user.uname;
		// 		this.user_img = res.data.user.user_img;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	},
	methods: {
		showPopup() {
			this.show = true;
		},

		formatter(type, value) {
			if (type === "year") {
				return `${value}年`;
			} else if (type === "month") {
				return `${value}月`;
			}
		}
	}
};
</script>
<style scoped>
p {
	margin: 0;
}

.grxx {
	padding: 28px 0 0 20px;
	box-sizing: border-box;
	display: flex;
	height: 140px;
	margin-top: 5px;
	background: url("~assets/img/community/xxk.png") no-repeat;
	background-size: 100%;
}
.fb {
	text-align: left;
	padding: 3px 0 0 5px;
	font-size: 12px;
	color: #999999;
}
.fb .mc {
	display: inline-block;
	font-size: 14px;
	color: #404040;
	margin-bottom: 5px;
}
.fb .tb {
	margin-left: 5px;
	display: inline-block;
	width: 10px;
	height: 12px;
	background: url("~assets/img/community/search_golden_icon.png") no-repeat;
	background-size: 100% 100%;
}
.dr {
	width: 90%;
	display: flex;
	margin: 0 auto 20px;
}
.dr > div {
	width: 33.3%;
	text-align: center;
}
.dr > div > div {
	margin: 0 auto;
}
.dr > div > p {
	margin-top: 10px;
	font-size: 12px;
}
.dr > div > .z-icon {
	width: 45px;
	height: 45px;
	background: url("~assets/img/community/zdr.png") no-repeat;
	background-size: 100% 100%;
}
.dr > div > .y-icon,
.dr > div > .n-icon {
	margin: 2.5px auto 12.5px;
	width: 40px;
	height: 40px;
	background: url("~assets/img/community/ydr.png") no-repeat;
	background-size: 100% 100%;
}
.dr > div > .n-icon {
	background: url("~assets/img/community/ndr.png") no-repeat;
	background-size: 100% 100%;
}
.gzdr {
	display: flex;
	justify-content: space-between;
	height: 75px;
	background: #fff;

	padding: 20px 0 0 10px;
}
.active0 {
	background: #f7f7f7;
}

.gzdr > .left {
	display: flex;
	width: 70%;
}
.gzdr > .left > .tx {
	text-align: left;
}
.gzdr > .left > .tx > img {
	width: 55px;
	height: 55px;
	margin: 0;
}
.gzdr > .left > .wz {
	text-align: left;
	display: inline-block;
	line-height: 18px;
	padding: 13px;
}
.gzdr > .left > .wz > p {
	font-size: 12px;
}
.gzdr > .left > .wz > p.ch {
	font-size: 10px;
	color: #999999;
}
.gzdr > .right > .hltd {
	width: 70px;
	height: 20px;
	float: right;
	display: flex;
}

.gzdr > .right > .hltd > .sjx {
	width: 10px;
}
.gzdr > .right > .hltd > .sjx > .dsj {
	border-top: 5px solid #fcc93c;
	border-right: 5px solid #fcc93c;
	border-left: 5px solid transparent;
	border-bottom: 5px solid transparent;
}
.gzdr > .right > .hltd > .sjx > .zsj {
	border-bottom: 5px solid #fcc93c;
	border-right: 5px solid #fcc93c;
	border-left: 5px solid transparent;
	border-top: 5px solid transparent;
}
.gzdr > .right > .hltd > .jx {
	width: 100%;
	height: 20px;
	background: #fcc93c;
	color: #fff;
	font-size: 10px;
	line-height: 20px;
}
.gzdr > .right > .jl {
	float: right;
	font-size: 12px;
	color: #404040;
	margin: 12px 10px 0 0;
}
</style>
