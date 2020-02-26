<template>
	<div class="payment">
		<van-nav-bar
			title="选择支付方式"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<div class="payment_time">
			<van-count-down :time="time" format="mm:ss" />
			<div class="unpaid">
				<div>待支付金额</div>
				<div class="sum">
					<i>¥</i>
					{{ setTotal.toFixed(2) }}
				</div>
			</div>
			<div class="order_money">
				<span>订单金额:</span>
				<span>¥{{ setTotal }}</span>
			</div>
		</div>
		<div class="select_payment">请选择支付方式</div>
		<div class="select">
			<van-radio-group v-model="radio">
				<van-cell-group>
					<van-cell title="微信支付" clickable @click="radio = '1'">
						<van-radio slot="right-icon" name="1" checked-color="#f51" />
					</van-cell>
					<van-cell title="支付宝支付" clickable @click="radio = '2'">
						<van-radio slot="right-icon" name="2" checked-color="#f51" />
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>
		<div class="zf">
			{{ title }}¥
			<span>{{ setTotal.toFixed(2) }}</span>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			time: 15 * 60 * 1000,
			price: 0,
			radio: "1",
			title: "微信支付"
		};
	},
	methods: {
		onClickLeft() {
			this.$router.go(-1);
		}
	},
	computed: {
		...mapState(["setTotal"])
	},
	watch: {
		radio() {
			if (this.radio == "1") {
				this.title = "微信支付";
			} else {
				this.title = "支付宝支付";
			}
		}
	},
	created() {
		// console.log(this.setTotal);
	},
	mounted() {}
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
.van-nav-bar__title,
.van-nav-bar__text {
	font-size: 14px;
	color: #000;
}
.van-icon-arrow-left:before {
	font-size: 20px;
	color: #000;
	vertical-align: middle;
}
.payment_time {
	/* height: 100px; */
	/* width: 100%; */
	padding: 10px 0 0;
	background: #fff;
}
.van-count-down {
	width: 42%;
	text-align: center;
	border-radius: 20px;
	padding: 3px 0;
	font-size: 12px;
	color: rgb(18, 83, 235);
	background: #f0f0f0;
	margin: 0 auto;
}
.van-count-down:before {
	content: "支付剩余时间 ";
	color: #323233;
}
.unpaid {
	text-align: center;
	margin-top: 12px;
	font-size: 12px;
}
.sum {
	font-size: 20px;
	font-weight: bolder;
	padding-bottom: 10px;
}
.sum i {
	font-style: normal;
	font-size: 12px;
}
.order_money {
	display: flex;
	justify-content: space-between;
	padding: 5px 10px;
	font-size: 12px;
	border-top: 1px solid #eee;
}
.select_payment {
	font-size: 12px;
	padding: 5px 10px;
	color: #999;
}
/* .van-cell__title:before {
  content: "123";
} */
.select .van-cell:before {
	content: "";
	display: inline-block;
	width: 35px;
	height: 35px;
}
.select .van-cell:nth-child(1)::before {
	background: url("~assets/img/me/wx.png");
	background-size: 100%;
	background-position: center;
}
.select .van-cell:nth-child(2)::before {
	background: url("~assets/img/me/zfb.png");
	background-size: 100%;
	background-position: center;
}
.select .van-cell__title {
	display: flex;
	align-items: center;
	margin-left: 5px;
}
.zf {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	padding: 8px;
	text-align: center;
	background: #4780e8;
	color: #fff;
	font-size: 12px;
}
</style>
