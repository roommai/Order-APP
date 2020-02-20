<template>
    <div class="index">
        <router-view></router-view>
    
        <van-tabbar v-model="active" :fixed="true">
			<van-tabbar-item v-for="(item, i) of icons" :key="i" :to="item.name">
				<span>{{ item.text }}</span>
				<img
					class="bar_bottom"
					slot="icon"
					slot-scope="props"
					:src="props.active ? item.active : item.inactive"
				/>
			</van-tabbar-item>
		</van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
			icons: [
				{
					name: "/",
					inactive: require("assets/img/index/index.png"),
					active: require("assets/img/index/index_logo.png"),
					text: "首页"
				},
				{
					name: "/community",
					inactive: require("assets/img/index/community.png"),
					active: require("assets/img/index/community_red.png"),
					text: "社区"
				},
				{
					name: "/member",
					inactive: require("assets/img/index/VIP.png"),
					active: require("assets/img/index/VIP_red.png"),
					text: "会员"
				},
				{
					name: "/profile",
					inactive: require("assets/img/index/me.png"),
					active: require("assets/img/index/me_red.png"),
					text: "我的"
				}
			]
        }
    },
    created() {
        if (this.$route.name == 'home') {
            this.active = 0;
        } else if (this.$route.name == "community"){
			this.active = 1;
		} else if (this.$route.name == "member") {
			this.active = 2;
		} else if (this.$route.name == "profile") {
			this.active = 3;
		}

    }
}
</script>

<style scoped>
	vant-tabbar {
		box-shadow: #f7362e;	
	}

    .bar_bottom {
        width: 10px;
        height: 10px;
    }
    .van-tabbar-item__icon img {
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        /* border-radius: 50%; */
    }
    .van-tabbar-item--active {
        color: #f7362e;
    }
    #fcd {
        width: 100%;
        height: 3.125rem;
    }
</style>
