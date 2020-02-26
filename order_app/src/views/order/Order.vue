<template>
	<div class="order">
		<van-sticky>
			<van-nav-bar
				title="确认订单"
				left-text=" 返回"
				left-arrow
				@click-left="onClickLeft"
			/>
		</van-sticky>
		<div class="older_top">
			<van-tabs v-model="active" line-height="0">
                <van-tab title="外送">
                    <old-outside :user_address="user_address"></old-outside>
                    <commodity :fooddata1="fooddata1"></commodity>
                    <div class="xt">选填</div>
                    <optional></optional>
                </van-tab>
                <van-tab title="自提" class="unselected">
                        <arrive></arrive>
                        <commodity></commodity>
                        <div class="xt">选填</div>
                        <optional></optional>
                </van-tab>
			</van-tabs>
		</div>
		<van-goods-action>
			<div class="notarize">
				<span
					>总价<i>¥{{ setTotal }}</i></span
				>
				<van-button
					color="linear-gradient(to right, #4cafea, #3e76e5)"
					@click="Orders"
					>确认下单</van-button
				>
			</div>
		</van-goods-action>
	</div>
</template>

<script>
import OldOutside from "./childComps/OldOutside";
import Commodity from "./childComps/Commodity";
import Optional from "./childComps/Optional";
import Arrive from "./childComps/Arrive";

import { mapState } from "vuex";
export default {
	components: {
		OldOutside,
		Commodity,
		Optional,
		Arrive
	},
	data() {
		return {
			active: 0,
			total: 0,
			fooddata1: [],
			user_address: {}
		};
	},
	methods: {
		onClickLeft() {
			this.$router.go(-2);
		},
		Orders() {
			this.$router.push("/payment");
		},
		fooddata(data) {
            this.fooddata1 = data;
		},
		userAddress(val) {
			console.log(val);
			this.user_address = val;
		}
	},
	created() {
		this.bus.$on("getfooddata", this.fooddata);
		// this.$on("total1", this.total1);
		this.bus.$on("userAddress", this.userAddress);
		// console.log(this.setTotal);
	},
	computed: {
		...mapState(["setTotal"])
	},
	mounted() {},
	updated() {},
	beforeDestroy() {
		this.bus.$emit("paymentTotal", this.total);
	}
};
</script>

<style lang="scss" scoped>
.order_top {
	padding: 10px;
}

.van-tabs {
	background: #000;
	padding-top: 16px;
	width: 100%;
	height: 100px;
}

::v-deep .van-tabs--line .van-tabs__wrap {
	padding: 0 5%;
}

::v-deep .van-hairline--top-bottom::after {
	border: none;
}

::v-deep .van-tabs__nav {
	background: #000;
	border-top: 1px solid #000;
}

::v-deep .van-tab {
	background: #ccc;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 8px;
	border-radius: 0 10px 0 0;
	border-radius: 0.625rem 0.625rem 0 0;
}

::v-deep .van-tab.van-tab--active {
	background: #fff;
	border-radius: 10px 10px 0 0;
	height: 45px;
	margin: 0px;
}

.xt {
	font-size: 12px;
	color: #999;
	margin: 0 30px;
}

.van-nav-bar__text,
.van-nav-bar .van-icon {
	color: #000;
}

.van-nav-bar__arrow {
	font-size: 20px;
}

.van-nav-bar__arrow + .van-nav-bar__text {
	margin-left: -16px;
}

.notarize {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-left: 5%;
	align-items: center;
}

.notarize i,
.notarize span {
	font-size: 12px;
}

.notarize i {
	color: #3e76e5;
}
</style>
