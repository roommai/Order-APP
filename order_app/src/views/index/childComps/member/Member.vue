<template>
	<div class="member">
        <nav-bar class="mheader">
            <div slot="center" class="top-center">
                会员
            </div>
            <div slot="right" class="top-right">帮助</div>
        </nav-bar>
        <mvip v-if="bool" @click.native="getbool"></mvip>
		<login-vip v-else></login-vip>
        <van-grid :border="false" :column-num="4" v-if="bool
        ">
			<van-grid-item v-for="(item, i) of grid" :key="i" @click="getI(i)">
				<grid :src="item.url"></grid>
				{{ item.name }}
			</van-grid-item>
		</van-grid>
        <van-grid :border="false" :column-num="4" v-else>
			<van-grid-item v-for="(item, i) of nogrid" :key="i" @click="getI(i)">
				<grid :src="item.url"></grid>
				{{ item.name }}
			</van-grid-item>
		</van-grid>
        <van-swipe :autoplay="3000" :show-indicators="swipeBool">
			<van-swipe-item v-for="(item, i) of swiper" :key="i">
				<swipe :src="`${serverBaseURL}${item.img_url}`"></swipe>
			</van-swipe-item>
		</van-swipe>
        <exchange v-if="bool"></exchange>
		<div v-else>
			<growth></growth>
			<conversion></conversion>
		</div>
        <cell></cell>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { vipCarousel } from 'network/member'

import NavBar from 'components/common/navbar/NavBar'

import Mvip from 'index/member/childComps/Mvip'
import LoginVip from 'index/member/childComps/LoginVip'
import Grid from 'index/member/childComps/Grid'
import Swipe from 'index/member/childComps/Swipe'
import Exchange from 'index/member/childComps/Exchange'
import Growth from 'index/member/childComps/Growth'
import Conversion from 'index/member/childComps/Conversion'
import Cell from 'index/member/childComps/Cell'

export default {
    components:{
        NavBar,

        Mvip,
        LoginVip,
        Grid,
        Swipe,
        Exchange,
        Growth,
        Conversion,
        Cell
    },
    data() {
        return {
            grid: [
				{ url: require("assets/img/member/vipGrid1.png"), name: "捞币换货", uid: 1 },
				{ url: require("assets/img/member/vipGrid2.png"), name: "生日赠礼", uid: 2 },
				{ url: require("assets/img/member/vipGrid3.png"), name: "升级礼遇", uid: 3 },
				{ url: require("assets/img/member/vipGrid4.png"), name: "线下活动", uid: 4 },
				{ url: require("assets/img/member/vipGrid5.png"), name: "VIP专享", uid: 5 },
				{ url: require("assets/img/member/vipGrid6.png"), name: "包间会议", uid: 6 },
				{ url: require("assets/img/member/vipGrid7.png"), name: "黑海通道", uid: 7 },
				{ url: require("assets/img/member/vipGrid8.png"), name: "期待更多", uid: 8 }
				
            ],
            nogrid: [
				{ url: require("assets/img/member/vipGrid1.png"), name: "捞币换货", uid: 1 },
				{ url: require("assets/img/member/vipGrid2.png"), name: "生日赠礼", uid: 2 },
				{ url: require("assets/img/member/upgrade_unlock.png"), name: "升级礼遇", uid: 3 },
				{ url: require("assets/img/member/activity_unlock.png"), name: "线下活动", uid: 4 },
				{ url: require("assets/img/member/vip_unlock.png"), name: "VIP专享", uid: 5 },
				{ url: require("assets/img/member/privat_room_unlock.png"), name: "包间会议", uid: 6 },
				{ url: require("assets/img/member/channel_unlock.png"), name: "黑海通道", uid: 7 },
				{ url: require("assets/img/member/vipGrid8.png"), name: "期待更多", uid: 8 }
			],
			swiper: [],
			swipeBool: false,
			idx: 0
        }
    },
    computed: {
        ...mapState(["bool","serverBaseURL"])
    },
    methods: {
        ...mapMutations(["changelogin"]),
        getbool() {
	        this.$router.push("/login");
        },
        getI(i) {
			this.idx = i;
			if (i < 7) {
				this.$router.push("/cardswiper");
			}
        },
        getUser() {
            var token = sessionStorage.getItem("token")
            if(!token){
                this.changelogin(true)
            }
        }
    },
    created() {
        vipCarousel().then(res=>{
            this.swiper = res.result;

        })
        this.getUser()
    },
    beforeDestroy: function() {
		this.bus.$emit("getI", this.idx);
	}
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
    .top-center {
        color:#000;
        font-weight: bold;
    }
    .top-right {
        color:#666;
        font-size:14px;
    }
    .member {
        padding: 44px 0 50px 0; 
        background: #f1f1f1;
    }

    ::v-deep {
        .van-grid-item {
            font-size: 10px;
        }
        .van-nav-bar__text {
            color: #000;
        }
    }
</style>

