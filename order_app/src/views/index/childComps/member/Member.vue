<template>
	<div class="member">
        <nav-bar class="mheader">
            <div slot="center" class="top-center">
                会员
            </div>
            <div slot="right" class="top-right">帮助</div>
        </nav-bar>
        <mvip v-if="false" @click.native="getbool()"></mvip>
		<login-vip v-else></login-vip>
        <van-grid :border="false" :column-num="4" v-if="true
        ">
			<van-grid-item v-for="(item, i) of grid" :key="i" @click="getI(i)">
				<grid :src="item.url"></grid>
				{{ item.name }}
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
import {mapState} from 'vuex'

import NavBar from 'components/common/navbar/NavBar'

import Mvip from 'index/member/childComps/Mvip'
import LoginVip from 'index/member/childComps/LoginVip'
import Grid from 'index/member/childComps/Grid'

export default {
    components:{
        NavBar,

        Mvip,
        LoginVip,
        Grid
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
				{ url: require("assets/img/member/vipGrid8.png"), name: "期待更多", uid: 8 },
				
			],
        }
    },
    computed: {
        ...mapState(["bool"])
    },
    methods: {
        getI(i) {
			this.idx = i;
			if (i < 7) {
				this.$router.push("/cradswipe");
			}
		},
    }
}
</script>

<style lang="scss" scoped>
    .mheader{
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
        padding-bottom: 15px;
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

