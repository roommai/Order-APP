<template>
	<div class="setting">
        <van-nav-bar title="设置" left-arrow @click-left="me" />
        <van-cell title="消息设置" is-link value="未开启" />
		<div class="msg">{{ inform }}</div>
        <black-list v-if="!bool"></black-list>
        <div class="agreement">
            <van-cell
				v-for="(x, i) of xx"
				:key="i"
				:title="x.msg"
				is-link
				:value="x.msg2"
				@click="clear(i)"
			/>
            <van-action-sheet
				v-model="show"
				:actions="actions"
				cancel-text="取消"
				@cancel="onCancel"
				@select="onSelect"
			/>
        </div>
        <van-button v-if="!bool" type="danger" @click="affirm">退出登录</van-button>
	</div>
</template>

<script>

import blackList from "views/setting/childComps/blackList.vue";
import {  mapState } from "vuex";
export default {
    components: {
        blackList
    },
    data() {
        return {
            inform: '请在"设置-通知"功能中找到"海底捞"更改',
            xx: [
				{ msg: "清除缓存", msg2: "35.83MB" },
				{ msg: "版本信息", msg2: "7.2.0" },
				{ msg: "隐私政策", msg2: "" },
				{ msg: "用户许可使用协议", msg2: "" }
            ],
            show: false,
			actions: [
				{
					name: "确认清除缓存"
				}
            ],
            
        }
    },
    methods: {
        me() {
			this.$router.go(-1);
        },
        clear(i) {
			if (i == 0) {
				this.show = true;
			}
        },
        onCancel() {
			this.$toast("取消");
		},
		onSelect() {
			this.$toast({
				message: "清除成功",
				duration: 1000
			});
			this.xx[0].msg2 = "0b";
			this.show = false;
        },
        affirm() {
			this.$dialog
				.confirm({
					message: "确认要退出登录吗？"
				})
				.then(() => {
					sessionStorage.clear()
					this.$router.replace("/login");
				})
				.catch(err => {
					console.log(err);
				});
		},
    },
    computed: {
        ...mapState(["bool"])
    },
    created() {
         this.$forceUpdate();
    }
}
</script>

<style scoped>
.msg {
	padding: 10px 0;
	background: #f5f5f5;
	font-size: 12px;
	color: #999;
	text-align: left;
	padding-left: 12px;
}
.agreement {
	margin-bottom: 10px;
}
.loginOut {
	/* border: 1px solid #000; */
	margin-top: 10px;
	font-size: 14px;
	padding: 10px 0;
}
.van-button {
	display: block;
	margin: 0 auto;
	width: 90%;
	border-radius: 8px;
	margin-top: 20px;
}
</style>


