<template>
	<div class="conversion">
		<van-row>
			<van-col span="18">
				捞币 {{ coin }}
				<span>击败{{ user }}%的用户</span>
			</van-col>
			<van-col span="6">更多兑换</van-col>
		</van-row>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, i) in images" :key="i">
					<img :src="serverBaseURL + item.img_url" />
					<div>{{ item.description }}</div>
					<div>
						<span>{{ item.price }}</span
						>兑换
						<span>{{ item.sold }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";
import {getIndexProduct} from 'network/index';
export default {
	data() {
		return {
			coin: 0,
			user: 0,
			images: [{},{},{},{}]
		};
	},
	computed: {
		...mapState(["serverBaseURL"])
	},
	mounted() {
		var mySwiper = new Swiper(".swiper-container", {
			slidesPerView: 3,
			freeMode: false
		});
		getIndexProduct().then(res=>{
			this.images = res.result;
		})
		.catch(err => {
			console.log(err);
		});
		// this.$api
		// 	.getIndexProduct()
		// 	.then(res => {
		// 		this.images = res.data.data;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
};
</script>

<style lang="scss" scoped>
.conversion {
	margin-top: 10px;
	padding: 10px;
	background: #fff;
	padding-bottom: 20px;
}
.van-row {
	.van-col {
		font-weight: bold;
		font-size: 15px;
		span {
			padding: 2px 5px;
			font-size: 10px;
			font-weight: 500;
			color: #999;
		}
		&:nth-child(2) {
			font-size: 13px;
			font-weight: 500;
			color: #999;
			text-align:right;
			&:after {
				content: "";
				display: inline-block;
				margin-left: 5px;
				border: 5px solid;
				border-color: transparent transparent transparent #999;
			}
		}
	}
}
.swiper-slide {
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		width: 95px;
		padding: 1px 0;
		overflow: hidden;
		font-size: 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
		span:nth-child(1) {
			font-weight: bold;
			color: #ffbb56;
		}
	}
	img {
		padding: 10px 10px 10px 0;
		width: 100%;
		height: 100%;
	}
}
</style>
