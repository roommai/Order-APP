<template>
    	<div class="me">
				<nav-bar class="mheader" v-show="isShow">
				<div slot="center" class="top-center">
					我的
				</div>
			</nav-bar>
            <div class="sm">
                <img src="~assets/img/me/my_member_code.png" class="ewm" />
            </div>
            <me-not-login v-if="bool"></me-not-login>
            <me-login v-else></me-login>
            <span>我的订单</span>
            <van-grid :border="false" :column-num="5">
                <van-grid-item v-for="(order, i) of orders" :key="i">
                    <img :src="order.url" />
                    <span>{{ order.name }}</span>
                </van-grid-item>
            </van-grid>
            <span>我的动态</span>
            <div class="dt">
                <div class="dt_me" v-for="(dt, i) of dts" :key="i">
                    <div class="lf_msg">
                        <img :src="dt.url" />
                        <span>{{ dt.name }}</span>
                    </div>
                    <img src="~assets/img/me/my_arrow.png" />
                </div>
            </div>
            <span>我的服务</span>
		<div class="dt">
			<div class="dt_me" v-for="(serve, i) of serves" :key="i">
				<div class="lf_msg">
					<img :src=" serve.url " />
					<span>{{ serve.name }}</span>
				</div>
				<img src="~assets/img/me/my_arrow.png" />
			</div>
		</div>
		<span>关于海底捞</span>
		<div class="dt">
			<div class="dt_me" v-for="(about, i) of abouts" :key="i">
				<div class="lf_msg">
					<img :src="about.url" />
					<span>{{ about.name }}</span>
				</div>
				<img src="~assets/img/me/my_arrow.png" />
			</div>
		</div>
		<div class="dt">
			<div class="dt_me" @click="setting">
				<div class="lf_msg">
					<img src="~assets/img/me/my_setting.png" />
					<span>设置</span>
				</div>
				<img src="~assets/img/me/my_arrow.png" />
			</div>
		</div>
    	</div>
</template>

<script>

import { mapState,mapMutations } from 'vuex'

import {debounce} from "common/utils"

import NavBar from 'components/common/navbar/NavBar'

import MeNotLogin from 'index/profile/childComps/MeNotLogin'
import MeLogin from 'index/profile/childComps/MeLogin'
export default {
    components: {
        MeNotLogin,
		MeLogin,
		
		NavBar
    },
    data() {
        return {
			isShow:false,
            orders: [
				{ url: require("assets/img/me/stores_row_num.png"), name: "排号" },
				{ url: require("assets/img/me/my_reserve_order.png"), name: "预订" },
				{ url: require("assets/img/me/my_order_list.png"), name: "点餐" },
				{ url: require("assets/img/me/my_deliver_order.png"), name: "外卖" },
				{ url: require("assets/img/me/my_exchange_order.png"), name: "购物" }
            ],
            dts: [
				{ url: require("assets/img/me/my_collect.png"), name: "收藏夹" },
				{ url: require("assets/img/me/my_community.png"), name: "社区" },
				{ url: require("assets/img/me/my_message.png"), name: "消息" }
            ],
            serves: [
				{ url: require("assets/img/me/my_help.png"), name: "寻求帮助" },
				{ url: require("assets/img/me/my_complained.png"), name: "投诉表扬" },
				{ url: require("assets/img/me/my_misslao.png"), name: "捞小米" }
				
			],
			abouts: [
				{ url: require("assets/img/me/my_zhengji.png"), name: "海选征集" },
				{ url: require("assets/img/me/my_about.png"), name: "关于企业" },
				{ url: require("assets/img/me/my_news.png"), name: "公告" }
				
			]
        }
    },
    computed: {
        ...mapState(["bool"])
    },
    methods: {
		...mapMutations(["changelogin"]),
        setting() {
            this.$router.push("/setting")
		},
		showNav() {
			var heights =
				window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if( heights >= 80) {
				this.isShow=true;
				return
            }else {
				this.isShow=false;
			}
		},
		isLogin() {
			if(!sessionStorage.getItem('token')){
				this.changelogin(true)
			}
		}
	},
	created() {
		this.isLogin()
	},
	mounted() {
		
		 window.addEventListener("scroll", debounce(this.showNav,50));
	},
}
</script>

<style lang="scss" scoped>
 .mheader{
        position:fixed;
        left:0;
        right:0;
        top:0;
        z-index:9;
        background-color:#fff;
    }
.sm {
	position: relative;
	height: 20px;
}
.sm > .ewm {
	position: absolute;
	width: 20px;
	top: 10px;
	right: 10px;
}
.me {
	/* position: relative; */
	text-align: left;
    font-size: 12px;
    padding-bottom:50px;
	background: url("~assets/img/me/me_bg.png") no-repeat top center;
	background-size: 100%;
	background-color: #f0f0f0;
    
}
.me > span {
	display: block;
	margin: 10px 0;
	margin-left: 10px;
}

.van-grid-item .van-grid-item__content img {
	width: 25px;
}
.van-grid {
	font-size: 12px;
}
.van-grid-item span {
	display: block;
	margin-top: 5px;
}

.dt {
	background: #fff;
}
.dt_me {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 0;
	margin-left: 10px;
	/* background: #ddd; */
}
.dt_me + .dt_me {
	border-top: 1px solid #dedede;
}
.lf_msg {
	display: flex;
	align-items: center;
}
.lf_msg > img {
	width: 15px;
}
.lf_msg > span {
	margin-left: 8px;
	font-size: 13px;
}
.dt_me > img {
	width: 12px;
	margin-right: 10px;
}
.me > .dt:last-child {
	margin-top: 10px;
	/* margin-bottom: 20px; */
}
</style>
