<template>
	<div class="userName">
		<van-nav-bar title="修改真实姓名" left-text="取消" @click-left="cancel" />
		<van-cell-group>
			<van-field v-model="value" placeholder="请输入真实姓名" />
		</van-cell-group>
		<van-button type="danger" @click="realName">确定</van-button>
	</div>
</template>
<script>
import {update} from 'network/operation'
export default {
	data() {
		return {
			value: "",
			oldName: ""
		};
	},
	methods: {
		cancel() {
			if (this.oldName != this.value) {
				this.value = this.oldName;
			}
			this.$router.go(-1);
		},
		realName() {
            update({ real_name: this.value }).then(res => {
					this.$toast("修改成功");
					this.$router.go(-1);
				}).catch(err => {
					console.log(err);
			});
		},
		Name(n) {
			if (n == "请填写") {
				this.value = "";
			} else {
				this.value = n;
				this.oldName = n;
			}
		}
	},
	created() {
		this.bus.$on("Name", this.Name);
	}
};
</script>
<style scoped lang="scss">
.userName {
	text-align: center;
}
.van-nav-bar__text {
	color: #323233;
}
.van-nav-bar__title {
	font-size: 15px;
}
.van-button {
	margin-top: 50px;
	width: 90%;
	border-radius: 8px;
}
</style>

