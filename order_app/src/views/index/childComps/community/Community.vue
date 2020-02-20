<template>
    <div class="com">
        <nav-bar class="community-nav">
            <div slot="left">
                <img src="~assets/img/community/icon_03.png" />
            </div>
            <div  slot="center" class="top-community active">社区</div>
            <div slot="right">
                <img src="~assets/img/community/icon_05.png" />
            </div>
        </nav-bar>
        <div class="left-community" ref="leftTop">社区</div>
        <van-tabs
			v-model="activeName"
			line-width="30px"
			line-height="2px"
			title-inactive-color="#3f3f3f"
			title-active-color="#e70012"
			sticky
			:offset-top="44"
		>
			<van-tab title="关注" name="a">
				<no-login-sq v-if="bool"></no-login-sq>
				<concren v-else></concren>
			</van-tab>
			<van-tab title="推荐" name="b">   
                <recommend></recommend>
             </van-tab>
			<van-tab title="最新" name="c">
				<newest></newest>
			</van-tab>
			<van-tab title="达人" name="d">
				<no-login-sq v-if="bool"></no-login-sq>
				<expert v-else></expert>
			</van-tab>
		</van-tabs>
    </div>
</template>

<script>
import { mapState } from "vuex";

import NoLoginSq from 'index/community/childComps/NoLoginSq'
import Concren from 'index/community/childComps/Concren'
import Recommend from 'index/community/childComps/Recommend'
import Newest from 'index/community/childComps/Newest'
import Expert from 'index/community/childComps/Expert'

import NavBar from 'components/common/navbar/NavBar'
export default {
    components: {
        NoLoginSq,
        Concren,
        Recommend,
        Newest,
        Expert,

        NavBar
    },
    computed: {
		...mapState(["bool"])
	},
    data() {
		return {
            activeName: "b",
		};
    },
    methods: {
        showIcon() {
			var leftCommunity = document.getElementsByClassName("left-community")[0];
            var topCommunity = document.getElementsByClassName("top-community")[0];
			var heights =
                window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var leftTop = leftCommunity.offsetHeight;
            if( heights >= leftTop) {
				topCommunity.classList.remove("active");
            }else {
				// 页面高度小于200执行操作;
				topCommunity.classList.add("active");
			}
		}
    },
    mounted() {
         window.addEventListener("scroll", this.showIcon);
    },
    updated() {
        // window.addEventListener("scroll", this.showIcon);
        // console.log('111')
        
    },
    beforeDestroy() {
		window.removeEventListener("scroll", this.showIcon);
	}
}
</script>

<style lang="scss" scoped>
    .com {
        padding: 44px 0 50px 0; 
        background: #fff;
    }

    .community-nav {
        position:fixed;
        left:0 ;
        right:0 ;
        top:0;
        z-index: 9;
        background-color:#fff;
        img{
            vertical-align: middle;
        }
             
    }
    .top-comm{
        color: #3f3f3f;
        font-weight: bold;
        font-size: 16px;
    }
    ::v-deep .van-sticky--fixed .head_bj {
        background: #fff;
    }
    .head_bj{
        padding: 5px;
    }
    .van-row {
        background: #fff;
    }
    .van-row > .van-col {
        text-align: center;
        margin: 5px 0;
    }
    .van-row > .van-col > .top-community {
        /* margin: 5px 0; */
        color: #3f3f3f;
        font-weight: bold;
        font-size: 16px;
    }
     .top-community.active {
        display: none;
        margin: 10px 0;
    }
    img {
        height: 20px;
    }
    .van-tab {
        color: aqua;
        font-size: 1rem;
        width: 10px;
    }
    .left-community {
        height:30px;
        line-height: 30px;
        font-size: 24px;
        text-align: left;
        padding-left: 10px;
        color: #3f3f3f;
        font-weight: bold;
    }
</style>


