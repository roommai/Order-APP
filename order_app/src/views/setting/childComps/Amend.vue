<template>
	<div class="forget">
		<van-nav-bar left-arrow @click-left="onClickLeft" />
		<p class="forget_p">修改密码</p>
		<van-cell-group>
			<van-field placeholder="请输入旧密码" v-model="oldUpwd" type="password" />
			<van-field placeholder="请输入新密码" v-model="upwd" type="password" />
			<van-field
				placeholder="请再次输入新密码"
				v-model="cpwd"
				type="password"
			/>
			<van-field placeholder="请输入验证码" v-model="code_value">
				<van-button
					slot="button"
					size="mini"
					type="danger"
					@click="btn_code"
					class="code"
					>{{ code_reg }}</van-button
				>
			</van-field>
		</van-cell-group>
		<div class="btn">
			<van-button size="large" color="#d92e31" round @click="forget"
				>确认修改</van-button
			>
		</div>
	</div>
</template>

<script>
import {updatePassword} from 'network/operation'
export default {
	data() {
		return {
			code_reg: "",
			phone: "",
			upwd: "",
			cpwd: "",
			oldUpwd: "",
			code_value: ""
		};
	},
	methods: {
		onClickLeft() {
			this.meurl ? this.$router.push(this.meurl) : this.$router.go(-1);
		},
		btn_code() {
			this.code_reg = `${parseInt(Math.random() * 10)}${parseInt(
				Math.random() * 10
			)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}`;
		},
		forget() {
			var reg_upwd = /^\w{8,16}$/;
			if (!reg_upwd.test(this.upwd)) {
				this.$toast("密码格式不正确");
			} else if (this.upwd !== this.cpwd) {
				this.$toast("密码不一致");
			} else if (this.code_reg != this.code_value) {
				this.$toast("验证码不正确");
			} else {
				updatePassword({ oldPwd: this.oldUpwd, newPwd: this.upwd })
					.then(res => {
						if (res.code > 0) {
							this.$toast("修改成功");
							this.$router.go(-1);
						} else {
							this.$toast("旧密码不正确");
							this.oldUpwd = "";
							this.upwd = "";
							this.cpwd = "";
							this.code_value = "";
							btn_code();
						}
					});
			}
		}
	},
	created() {
		this.btn_code();
	}
};
</script>

<style scoped lang="scss">
.forget {
	position: relative;
	height: 550px;
	padding: 70px 40px;
	background-image: url(~assets/img/login_reg/su_background.png);
	background-size: 100% 100%;
}
.forget_p {
	// margin-top: 40px;
	margin-bottom: 50px;
	padding-left: 5px;
}
.van-cell-group {
	background: transparent;
}
.van-cell {
	background: transparent;
}
.btn {
	margin-top: 30px;
}
.van-button--large {
	height: 40px;
	line-height: 40px;
}
.code {
	letter-spacing: 4px;
}
.van-nav-bar {
	background-color: transparent;
	position: absolute;
	top: 10px;
	left: 0;
	&:after {
		border: none;
	}
}
.van-nav-bar .van-icon {
	color: #000;
}
</style>
