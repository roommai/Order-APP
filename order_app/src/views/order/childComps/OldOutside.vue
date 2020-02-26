<template>
	<div class="outside">
		<div class="outside_top">
			<div class="shipping" @click="delivery">
				<div class="shipping_left">
					<img src="~assets/img/index/location.png" alt="" />
					<div class="shipping_site">
						<span class="span_title">{{
							user_address.name + " " + user_address.tel ==
							"undefined undefined"
								? "请选择收货地址"
								: user_address.name + " " + user_address.tel
						}}</span>
						<span class="s1">{{
							user_address.address || "您还没有添加地址唷~"
						}}</span>
					</div>
				</div>
				<span class="shipping_right"
					><img class="right_icon" src="~assets/img/index/right.png" alt=""
				/></span>
			</div>
			<div class="time">
				<div class="time_left">
					<img src="~assets/img/index/time.png" alt="" />
					<span class="span_title">送达时间</span>
				</div>
				<div class="time_right">
					<span class="span_mintitle">尽快送达</span>
					<img
						class="right_icon"
						src="~assets/img/index/right.png"
						alt=""
					/>
				</div>
			</div>
			<div class="payment">
				<div class="payment_left">
					<img src="~assets/img/index/payment.png" alt="" />
					<span class="span_title">支付方式</span>
				</div>
				<span class="payment_right">在线支付</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		user_address: {
			default: Object
		}
	},
	data() {
		return {};
	},
	methods: {
		delivery() {
			this.$router.push("/delivery");
		}
	}
};
</script>

<style scoped>
.outside {
	background: #fff;
	width: 90%;
	height: 130px;
	margin: 0 auto;
	border-radius: 0 0 10px 10px;
}

.outside_top {
	display: flex;
	flex-direction: column;
	padding: 5px 8px;
}

.shipping,
.time,
.payment {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
}

.shipping_left,
.payment_left,
.time_left,
.time_right {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.shipping_site {
	display: flex;
	flex-direction: column;
}

.shipping img,
.time img,
.payment img {
	width: 15px;
	height: 15px;
}

.span_title {
	font-size: 12px;
}

.span_title,
.s1 {
	margin-left: 5px;
}

.payment_right,
.span_mintitle {
	font-size: 12px;
	color: #999;
	margin-right: 5px;
}

.s1 {
	font-size: 8px;
	color: #666;
}

.right_icon {
	width: 10px;
	height: 10px;
}
</style>
