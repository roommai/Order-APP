<template>
	<div>
		<div>
			<van-sticky :offset-top="90">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value" :options="option" />
					<van-search placeholder="请输入外送门店" v-model="search_val" />
				</van-dropdown-menu>
			</van-sticky>
			<div
				class="store"
				v-for="(item, i) of shopName"
				:key="i"
				@click="toTakeout(i)"
			>
				<img :src="serverBaseURL + item.shop_img" alt="" />
				<div class="store_trade">
					<span class="title">{{ item.shop_name }}</span>
					<div class="business">
						<div class="business_left">
							<van-button type="info" size="mini" round>{{
								item.businesses
							}}</van-button>
							<span class="site">{{ item.shop_add }}</span>
						</div>
						<span class="site distance">&ge;{{ item.distance }}km</span>
					</div>
				</div>
			</div>
			<button class="loadMore" @click="loadMore">显示更多门店</button>
		</div>
		<div></div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {getShop} from 'network/operation'
export default {
	data() {
		return {
			value: 0,
			search_val: "",
			option: [{ text: "附近门店", value: 0 }],
			shopName: []
		};
	},
	methods: {
		...mapMutations(["setShopName"]),
		loadMore() {},
		toTakeout(i) {
			// console.log(e);
			// console.log(this.shopName[e].shop_name);
			this.$router.push("/Takeout");
			this.setShopName(this.shopName[i].shop_name);
		},
	},
	computed: {
		...mapState(["serverBaseURL"])
	},
	created() {
			getShop()
			.then(res => {
				this.shopName = res.result;
			})
			.catch(err => console.log(err));
	}
};
</script>

<style scoped>
.van-dropdown-menu {
	/* margin-top: 10px; */
	height: 2.625rem;
}

.van-search .van-cell {
	padding: 0.0125rem 0.5rem 0.1125rem 0;
}

.store {
	display: flex;
	flex-direction: row;
	background: #fff;
	padding: 8px;
	align-items: center;
	border-bottom: 0.5px solid #f1f1f1;
}

.store_trade {
	width: 80%;
	display: flex;
	flex-direction: column;
	margin-left: 15px;
}

.business {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 3px;
}

img {
	width: 30px;
	height: 30px;
}

.title {
	font-size: 12px;
}

.site {
	font-size: 10px;
	color: #999;
	margin-left: 10px;
}

.van-button--mini {
	height: 16px;
	line-height: 15px;
	min-width: 50px;
}

.van-search__content {
	background: #ddd;
	border-radius: 5px;
}

.loadMore {
	border: none;
	outline: none;
	background: transparent;
	color: #1377dc;
	font-size: 12px;
	display: block;
	margin: 10px auto;
}
</style>
