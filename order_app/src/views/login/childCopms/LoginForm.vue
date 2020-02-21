<template>
	<div class="form">
		<div class="form_input">
			<van-cell-group>
				<van-field
					clearable
					v-model="username"
					label="+86"
					label-width="80"
					placeholder="请输入手机号码"
					maxlength="11"
				></van-field>

				<van-field
					clearable
					v-model="password"
					label=""
					label-width="80"
					type="password"
					placeholder="请输入密码"
				></van-field>

				<van-field
					center
					clearable
					label="验证码"
					label-width="80"
					placeholder="请输入验证码"
					v-model="value"
					maxlength="4"
				>
					<van-button
						slot="button"
						size="small"
						type="danger"
						@click="btn_code"
						class="code"
						>{{ code }}</van-button
					>
				</van-field>
				<van-number-keyboard
					:show="show"
					extra-key="."
					close-button-text="完成"
					@blur="show = false"
					@input="onInput"
					@delete="onDelete"
				/>
			</van-cell-group>
			<span class="noreg">未注册的用户将直接创建账户</span>
		</div>
		<div class="login_btn">
			<van-button size="small" type="danger" @click="login" round
				>登录</van-button
			>
			<div class="forget">
				<router-link :to="forget">忘记密码</router-link>
			</div>
		</div>
	</div>
</template>

<script>
// import Vue from "vue";
// import { Dialog } from "vant";
import {login} from 'network/login'
import { mapMutations } from 'vuex'
export default {
	props: {
		meurl: { default: "" }
	},
	data() {
		return {
			username: "",
			password: "",
			code: "",
			value: "",
			show: false,
			forget: "forget" //跳转忘记密码页面
		};
	},

	mounted() {
		this.btn_code();
	},
	computed: {
		
	},
	methods: {
		...mapMutations(["addUser"]),
		btn_code() {
			//验证码
			this.code = `${parseInt(Math.random() * 10)}${parseInt(
				Math.random() * 10
			)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}`;
		},
		onInput(value) {
			//键盘输入的数字限制
			this.value = (this.value + value).slice(0, 4);
		},
		onDelete() {
			//键盘的删除键
			this.value = this.value.slice(0, this.value.length - 1);
		},
		login() {
			var reg_phone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			var reg_upwd = /^\w{8,16}$/;
			if (!reg_phone.test(this.username)) {
				this.$toast("手机格式不正确");
			} else if (!reg_upwd.test(this.password)) {
				this.$toast("密码格式不正确");
			} else if (this.code != this.value) {
				this.$toast("验证码不正确");
				this.value = ""
				this.btn_code()
			} else {
				var obj = { phone: this.username, upwd: this.password };
				// this.$api.login(obj).then(data => {
				// 	if (data.data.code == -1) {
				// 		this.$toast("手机号或密码错误");
				// 	} else {
				// 		this.$toast("登录成功");
				// 		this.meurl ? this.$router.push(this.meurl) : this.$router.go(-1);
				// 	}
				// });
				login(obj).then(res=>{
					var user = res.user;
					console.log(res)
					if (res.code == -1) {
						this.$toast("手机号或密码错误");
					} else {
						console.log(this.$store.state.userList)
						this.$toast("登录成功");
						this.$router.go(-1)
						// this.meurl ? this.$router.push(this.meurl) : this.$router.go(-1);
					}
				})
			}
		}
	}
};
</script>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	margin-top: 20px;
}
.van-cell-group {
	background: transparent;
}
.van-cell {
	padding: 5px;
	line-height: 20px;
	background: transparent;
}
.van-field__label {
	width: 40px;
}
.login_btn {
	margin-top: 30px;
	display: flex;
	flex-direction: column;
}
.forget {
	display: flex;
	flex-direction: row-reverse;
	margin-top: 10px;
}
a {
	color: #999;
	font-size: 12px;
}
.noreg {
	font-size: 8px;
	color: #999;
}
.code {
	letter-spacing: 2px;
}
</style>