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
				<div class="swiper-slide" v-for="(item, i) of images" :key="i">
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
export default {
	data() {
		return {
			coin: 0,
			user: 0,
			images: [
				{
					url: require("../../../public/img/vipGrid1.png"),
					title: "海底捞口袋坚果1盒375克",
					price: "1380捞币",
					count: 6100
				},
				{
					url: require("../../../public/img/vipGrid2.png"),
					title: "海底捞口袋坚果1盒375克",
					price: "999捞币",
					count: 618
				},
				{
					url: require("../../../public/img/vipGrid3.png"),
					title: "海底捞口袋坚果1盒375克",
					price: "900捞币",
					count: 342
				},
				{
					url: require("../../../public/img/vipGrid4.png"),
					title: "海底捞口袋坚果1盒375克",
					price: "1380捞币",
					count: 298
				}
			]
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
		this.$api
			.getIndexProduct()
			.then(res => {
				this.images = res.data.data;
			})
			.catch(err => {
				console.log(err);
			});
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
