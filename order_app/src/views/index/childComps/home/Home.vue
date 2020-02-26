<template>
    <div class="index">
        <div class="top">
            <div class="top_nav">
                <span class="message_icon"></span>
				<van-search
					placeholder="搜索门店·内容·用户"
					v-model="value"
					background="transparent"
					shape="round"
					left-icon="false"
					@click="search"
				></van-search>
                <span class="laoxiaomi"></span>
                <span class="more_big"></span>
            </div>
            <div style="height:60px"></div>
            <home-header></home-header>
        </div>
        <div class="body">
            <div class="body_container">
                <div class="container row">
					<p>排号</p>
					<span>取号快人一步</span>
				</div>
				<div class="container reserve">
					<p>预定</p>
					<span>早预定不等位</span>
				</div>
				<div class="container store">
					<p>商城</p>
					<span>好物任你兑换</span>
				</div>
            </div>
        </div>
        <div class="body_evaluate">
            <van-grid :border="false" :column-num="4" square>
                <van-grid-item text="评价">
                    <van-image
                        icon-size="20"
                        :src="require('assets/img/index/evaluate_small.png')"
                    />
                    <span class="container_span">评价</span>
                </van-grid-item>
                <van-grid-item text="外卖" :to="bool ? '/login' : '/shop'">
                    <van-image
                        :src="require('assets/img/index/takeout_small.png')"
                    />
                    <span class="container_span">外卖</span>
                </van-grid-item>

                <van-grid-item text="游戏">
                    <van-image :src="require('assets/img/index/game_small.png')" />
                    <span class="container_span">游戏</span>
                </van-grid-item>

                <van-grid-item text="征集">
                    <van-image
                        :src="require('assets/img/index/collection_small.png')"
                    />
                    <span class="container_span">征集</span>
                </van-grid-item>
			</van-grid>
        </div>
        <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="#999">
                <van-swipe-item v-for="(item, index) of images" :key="index">
                    <img
                        :src="serverBaseURL + item.img_url"
                        width="100%"
                        height="100%"
                    />
                </van-swipe-item>
            </van-swipe>
		</div>
        <div class="container_comm">
			<div class="container_top">
				<p class="container_left">热兑好货</p>
				<div class="container_right">
					<router-link to="javascript:;">更多商品</router-link>
					<img src="~assets/img/index/more_arrows.png" alt />
				</div>
			</div>
			<div class="comm">
				<div v-for="(item, i) of commodity" :key="i" class="comm_shop">
					<img :src=" serverBaseURL + item.img_url" alt class="comm_img" />
					<p class="comm_title">{{ item.description }}</p>
					<span class="comm_lb">{{ item.price }} 捞币</span>
					<span class="comm_ch">兑换{{ item.sold }}</span>
				</div>
			</div>
		</div>
        <div>
			<div class="container_top">
				<p class="container_left">热门话题</p>
				<div class="container_right">
					<router-link to="javascript:;">更多话题</router-link>
					<img class="sign" src="~assets/img/index/sign_in.png" alt />
				</div>
			</div>
			<div class="container_bottom">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item, i) of topic" :key="i">
							<img :src="serverBaseURL + item.img_url" alt />
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import HomeHeader from "index/home/childComps/HomeHeader";
import {getIndexProduct,getIndexCarousel1,getIndexCarousel2} from 'network/index';
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";
export default {
    components: {
        HomeHeader
    },
    data() {
        return {
            value: "",
            images: [],
            commodity: [],
            topic: [
                require("assets/img/index/1.png"),
				require("assets/img/index/2.png"),
				require("assets/img/index/3.png"),
				require("assets/img/index/4.png")
            ]
        }
    },
    computed:{
        ...mapState(["bool","serverBaseURL"])
    },
    methods: {
        search() {
            this.$router.push("/search");
        },
        getTop() {
			var Top = document.documentElement.scrollTop || document.body.scrollTop;
			var topNav = document.getElementsByClassName("top_nav")[0];
			var topBtn = document.getElementsByClassName("van-search__content")[0];
			if (Top > 150) {
				topNav.classList.add("top_nav2");
				topBtn.style.background = "#f0f0f0";
			} else {
				topNav.classList.remove("top_nav2");
				topBtn.style.background = "";
			}
		}
    },
    mounted() {
        document.addEventListener("scroll", this.getTop);
		var mySwiper = new Swiper(".swiper-container", {
			slidesPerView: 1.5,
			slidesPerGroup: 1,
			spaceBetween: 20,
			freeMode: true
        });
        getIndexProduct().then(res=>{
			this.commodity = res.result;
        })
        getIndexCarousel1().then(res=>{
            this.images = res.data
        })
        getIndexCarousel2().then(res=>{
            this.topic = res.data
        })
    },
    beforeDestroy() {
		document.removeEventListener("scroll", this.getTop);
    },
}
</script>

<style scoped>
    .index {
        height: calc(100% - 50px);
        padding-bottom: 50px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: url("~assets/img/index/header_bg.png") no-repeat top center;
        background-attachment: fixed;
        background-size: 100%;
    }

    .top {
        padding-bottom: 20px;
    }

    .top_nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        background: transparent;
        background: url("~assets/img/index/header_bg.png") no-repeat top center;
        background-attachment: fixed;
        background-size: 100%;
        z-index: 2;
    }

    .top_nav2 {
        width: 100%;
        /* margin-right: -0.5rem; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 10px; */
        position: fixed;
        background: transparent;
        background: #fff;
        background-attachment: fixed;
        background-size: 100%;
        z-index: 2;
    }

    .van-search {
        height: 50px;
        padding: 8px;
    }
    ::v-deep .van-field__control {
        height: 17px;
    }
    .van-search__content {
        background: #ce272a;
    }

    .van-field__left-icon {
        margin: 0;
    }

    .van-field__right-icon .van-icon {
        min-width: 0px;
    }

    /* .top_nav img {
            width: 30px;
            height: 30px;
        } */

    .top_nav .message_icon {
        background-image: url("~assets/img/index/message_icon.png");
        /* background-size: 100%;
            background-position: center center; */
    }

    .top_nav .laoxiaomi {
        background-image: url("~assets/img/index/laoxiaomi_kefu.png");
    }

    .top_nav .more_big {
        background-image: url("~assets/img/index/more_big.png");
    }

    .top_nav2 .message_icon {
        background-image: url("~assets/img/index/white_message_icon.png");
    }

    .top_nav2 .laoxiaomi {
        background-image: url("~assets/img/index/laoxiaomi_kefu_black.png");
    }

    .top_nav2 .more_big {
        background-image: url("~assets/img/index/more_big_black.png");
    }

    .top_nav span {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .sign {
        width: 30px;
        height: 30px;
        position: fixed;
        top: 60px;
        right: 5px;
        z-index: 10;
    }

    /***********中间部分*****************/

    .body {
        padding: 0 4%;
        background: #fff;
    }

    .body_container {
        display: flex;
        justify-content: space-around;
    }

    .container {
        width: 100px;
        height: 120px;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-size: 100% 100%;
        margin-top: 10px;
    }

    .container > p {
        font-size: 15px;
        font-weight: 600;
        color: #000;
        margin: 2px;
    }

    .container span {
        font-size: 12px;
        color: #999;
    }

    .container.row {
        background-image: url("~assets/img/index/row_num_big.png");
    }

    .container.reserve {
        background-image: url("~assets/img/index/reserve_big.png");
    }

    .container.store {
        background-image: url("~assets/img/index/store_big.png");
    }

    .body_evaluate {
        margin-top: 10px;
    }

    .van-image {
        width: 25px;
        height: 25px;
    }

    .container_span {
        font-size: 10px;
        color: #999;
    }

    /****banner******/

    .banner {
        box-sizing: border-box;
        margin-top: 10px;
    }

    /*********兑换商品************/

    .container_comm {
        background: #fff;
    }

    .container_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .container_left {
        color: #000;
        font-size: 12px;
        font-weight: bold;
        margin: 0 4%;
    }

    .container_right {
        display: flex;
        align-items: center;
        margin-right: 4%;
    }

    .container_right > a {
        color: #000;
        font-size: 10px;
        margin-right: 3px;
    }

    .container_right img {
        width: 3px;
        height: 5px;
    }

    .comm {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 10px 2%;
    }

    .comm_shop {
        width: 45%;
        height: 180px;
        margin-top: 10px;
    }

    .comm_img {
        width: 100%;
        height: 130px;
    }

    .comm_title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px;
        font-size: 12px;
    }

    .comm_shop span {
        font-size: 10px;
        color: #999;
    }

    .comm_shop .comm_lb {
        color: #cf9532;
        font-weight: bold;
        margin-right: 5px;
    }

    .swiper-container {
        padding: 4%;
    }
    .swiper-slide img {
        width: 100%;
        height: 165px;
    }
</style>


