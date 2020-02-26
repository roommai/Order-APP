<template>
	<div class="email">
		<van-nav-bar title="邮箱" left-text="取消" @click-left="onClickLeft" />
		<van-cell-group>
			<van-field v-model="value" placeholder="请输入邮箱地址" />
		</van-cell-group>
		<van-button type="danger" :disabled="show" @click="verifyEmail"
			>确认</van-button
		>
	</div>
</template>
<script>
import {update} from 'network/operation'
export default {
	data() {
		return {
			value: "",
			show: true,
			newVal: ""
		};
	},
	methods: {
		onClickLeft() {
			if (this.newVal != this.value) {
				this.value = this.newVal;
			}
			this.$router.go(-1);
		},
		verifyEmail() {
			var reg = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (reg.test(this.value)) {
                update({ email: this.value }).then(res => {
					this.$toast("修改成功");
					this.$router.go(-1);
				}).catch(err => {
					console.log(err);
				});
			} else {
				this.$toast("邮箱格式不正确");
			}
		},
		email(val) {
			if (val == "请填写") {
				val = "";
			} else {
				this.value = val;
				this.newVal = val;
			}
		}
	},
	watch: {
		value() {
			// var len = this.value.length || 0;
			if (this.value) {
				this.show = false;
			} else {
				this.show = true;
			}
		}
	},
	created() {
		this.bus.$on("cemail", this.email);
	}
};
</script>
<style scoped lang="scss">
.email {
	text-align: center;
}
.van-cell {
	line-height: 1rem;
}
::v-deep .van-field__control {
	font-size: 12px;
}
.van-button {
	width: 90%;
	border-radius: 6px;
	margin-top: 20px;
}
</style>

