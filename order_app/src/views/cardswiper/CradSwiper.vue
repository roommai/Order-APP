<template>
	<div class="cradswipe">
        <van-nav-bar title="会员权益" left-arrow @click-left="onClickLeft" />
        <div class="bannerBox">
            <div class="swiper-container">
                <div class="swiper-wrapper">
					<div
						class="swiper-slide"
						v-for="(item, index) in banner"
						:key="index"
					>
						<img class="swiper-img" :src="item" />
					</div>
				</div>
            </div>
        </div>
	</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
    data() {
        return {
            banner: [
				require("assets/img/member/vip_1.png"),
				require("assets/img/member/vip_2.png"),
				require("assets/img/member/vip_3.png"),
				require("assets/img/member/vip_4.png"),
				require("assets/img/member/vip_5.png"),
				require("assets/img/member/vip_6.png"),
				require("assets/img/member/vip_7.png"),
				
			],
			i: 0
        }
    },
    methods: {
        onClickLeft() {
			this.$router.go(-1);
		}
    },
    created() {
        var vm = this;
		this.bus.$on("getI", data => {
			vm.i = data;
		});
    },
    mounted() {
        let vm = this;
		let mySwiper = new Swiper(".swiper-container", {
			direction: "horizontal", //滑动方向，可设置水平(horizontal)或垂直(vertical)。
			// loop: true, // 设置为true 则开启loop模式
			// autoplay: 2000, // 自动切换时间
			slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
			centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
			// spaceBetween: 10, // 在slide之间设置距离（单位px）。
			// loopAdditionaSlider: 0, // loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。
			// observer: true,
			// observeParents: true,
			speed: 1000,
			effect: "coverflow",
			initialSlide: vm.i
		});
    }
}
</script>

<style lang="scss" scoped>
.cradswipe {
	background-color: #f1f1f1;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	overflow: auto;
}
.bannerBox {
	margin-top: 35px;
}
.van-nav-bar .van-icon {
	color: #000;
	font-size: 20px;
}
.swiper-container {
	width: 100%;
	height: 100%;
}
.swiper-container .swiper-wrapper .swiper-slide {
	width: 80% !important;
	overflow: hidden;
	display: flex;
	align-items: center;
}
.swiper-container .swiper-wrapper .swiper-slide img {
	width: 100%;
	border-radius: 5px;
}

.swiper-container .swiper-wrapper .swiper-slide-prev img,
.swiper-container .swiper-wrapper .swiper-slide-next img {
	width: 100%;
	height: 100%;
}
</style>


