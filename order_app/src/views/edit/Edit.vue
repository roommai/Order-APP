<template>
	<div class="edit">
		<van-nav-bar title="个人资料" left-arrow @click-left="goProfile" />
		<van-cell  center :value="img"  title="头像" is-link @click="changeimg">
				<van-image
				round
				width="2rem"
				height="2rem"
				:src="img"
				/>
		</van-cell>
		<van-cell title="用户名"  :value="userName1" to="/name" />
		<van-cell title="真实姓名"  to="/userName" :value="userName" />
		<div class="sex">
			<span>性别</span>
			<van-radio-group @change="sel" v-model="radio">
				<van-radio name="1">男</van-radio>
				<van-radio name="0">女</van-radio>
			</van-radio-group>
		</div>

		<div class="salary">
			<van-cell title="收入范围" is-link @click="sal" :value="salVal" />
			<van-popup v-model="salShow" position="bottom" :style="{ height: '40%' }">
				<van-area
					:area-list="salList"
					title="收入范围"
					@confirm="salConfirm"
					@cancel="salCancel"
					columns-num="1"
				/>
			</van-popup>
		</div>

		<div class="address">
			<van-cell title="活动范围" is-link @click="address" :value="val" />
			<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
				<van-area
					:area-list="areaList"
					title="活动范围"
					@confirm="addrConfirm"
					@cancel="addrCancel"
					columns-num="2"
				/>
			</van-popup>
		</div>

		<div class="bir">
			<van-cell title="生日" is-link @click="bir" :value="birVal" />
			<van-popup v-model="birShow" position="bottom" :style="{ height: '40%' }">
				<van-datetime-picker
					v-model="currentDate"
					type="date"
					:min-date="minDate"
					:max-date="maxDate"
					@confirm="birConfirm"
					@cancel="birCancel"
				/>
			</van-popup>
		</div>
		<div :class="classSign" @click="sign">
			<van-cell title="个性签名" :value="signVal" />
		</div>
		<div class="phone">
			<van-cell title="手机号" is-link :value="phone" />
			<van-cell title="邮箱" is-link :value="email" @click="setEmail" />
			<van-cell title="修改密码" is-link @click="setPwd" />
		</div>
		<van-action-sheet
		v-model="imgshow"
		 cancel-text="取消"
		:actions="actions"
		description="编辑头像"
		@select="onSelect"
		 @cancel="onCancel"
		/>
		<van-uploader :after-read="afterRead" style="display:none" ref="file"/>
	</div>
</template>

<script>
import areaList from "common/area.js";
import {Checkuser,update} from 'network/operation'
import { mapState,mapMutations} from 'vuex'
export default {
	data() {
		return {
			imgshow:false,
			actions: [
				{ name: '拍照' },
				{ name: '从相机选择' },
			],
			img:"",
			userName: "请填写",
			userName1: "请填写",
			email: "",
			radio: "1",
			val: "请选择",
			salVal: "",
			birVal: "",
			salShow: false,
			show: false,
			birShow: false,
			salList: {
				province_list: {
					1: "5-8k",
					2: "8-10k",
					3: "10-15k",
					4: "15-30k",
					5: "30-50k",
					6: ">50k"
				}
			},
			areaList: areaList,
			currentDate: new Date(),
			minDate: new Date(1950, 1, 1),
			maxDate: new Date(),
			signVal: "一句话介绍自己的兴趣爱好",
			classSign: "sign",
			phone:15986412700,

		}
	},
	methods: {
		afterRead(file) {
      // 此时可以自行将文件上传至服务器
		console.log(file);
		},
		onCancel() {
			this.imgshow = false;
		},
		fileClick() {
			var elem = this.$refs.file.$el;
			var fileElem = elem.querySelector('.van-uploader__input')
			fileElem.click()
			
		},
		onSelect(item) {
			if(item.name == "从相机选择") {
				this.fileClick()
			}
		},
		changeimg() {
			this.imgshow=true;
		},
		//返回按钮
		goProfile() {
			this.$router.push('/profile')
		},
		//点击收入
		sal() {
			this.salShow = true;
		},
		//收入的取消
		salCancel() {
			this.salShow = false;
		},
		sel(e){
			update({ sex: this.radio }).then(res => {
				this.$toast("修改成功");
			}).catch(err => {
					console.log(err);
			});
		},
		salConfirm(e) {
			this.salShow = false;		
			this.salVal = e[0].name;
			update({ salary: this.salVal }).then(res => {
				this.$toast("修改成功");
			}).catch(err => {
					console.log(err);
			});
		},
		//活动范围
		address() {
			this.show = true;
		},
		addrConfirm(e) {
			this.show = false;
			this.val = `${e[0].name} ${e[1].name}`;
			update({ city: this.val }).then(res => {
				this.$toast("修改成功");
			}).catch(err => {
					console.log(err);
			});
		},
		addrCancel() {
			this.show = false;
		},

		//生日
		bir() {
			this.birShow = true;
		},
		birConfirm(e) {
			this.birShow = false;
			this.birVal = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} `;
			update({ birthday: e }).then(res => {
				this.$toast("修改成功");
			}).catch(err => {
					console.log(err);
			});
		},
		birCancel() {
			this.birShow = false;
		},
		sign() {
			this.$router.push("/sign");
		},
		setPwd() {
			this.$router.push("/forget");
		},
		setEmail() {
			this.$router.push("/email");
		},
		realName(name) {
			if (name == "") {
				this.userName = "请填写";
			} else {
				this.userName = name;
			}
		},
		getEmail(email) {
			if (email == "") {
				this.email = "请填写";
			} else {
				this.email = email;
			}
		},
		...mapMutations(["userStatus"]),
		updatum() {		
			Checkuser().then(res=> {
				console.log(res)
				if(res.status === 403){
					this.$toast(res.msg);
					this.$router.push("/login")
				}else{
					var date = new Date(res.user.birthday);
					this.birVal = `${date.getFullYear()}-${date.getMonth() +
						1}-${date.getDate() + 1} `;
					this.radio = res.user.sex + "";
					this.salVal = res.user.salary;
					this.email = res.user.email;
					this.signVal = res.user.say || "一句话介绍自己的兴趣爱好";
					this.val = res.user.city;
					this.userName = res.user.real_name || "请填写";
					this.userName1 = res.user.uname || "请填写";
					this.phone = res.user.phone
					var strUrl = res.user.user_img.match(/(http|https):\/\/.+/)
					if(strUrl){

						this.img =res.user.user_img;
					}else{
						this.img = this.serverBaseURL+ res.user.user_img
					}
					
				}
			})
		},
	},
	computed: {
			...mapState(["userList","serverBaseURL"])
		},
	created() {
		console.log("1")
		this.updatum()
	},
	updated() {
		// this.updatum()
	},
	beforeDestroy() {
		this.bus.$emit("Name", this.userName);
		this.bus.$emit("sign2", this.signVal);
		this.bus.$emit("cemail", this.email);
		this.bus.$emit("userName1", this.userName1);
		this.updatum();
	}
}
</script>

<style scoped lang="scss">
.edit {
	background: #fff;
}
.van-icon-arrow-left:before {
	color: #000;
}
.van-cell__title {
	text-align: left;
}
.van-cell__value {
	color: #323233;
}
.sex {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 43px;
	padding: 0 15px;
	font-size: 14px;
	border-bottom: 1px solid #eee;
}
.van-radio-group {
	display: flex;
	justify-content: space-between;
}
.van-radio-group .van-radio {
	margin: 0 5px;
}
::v-deep .van-picker-column {
	font-size: 14px;
}
::v-deep.van-picker__title {
	font-size: 14px;
}
.salary,
.address,
.birthday,
.sign {
	border-bottom: 1px solid #f0f0f0;
}
.sign .van-cell__value {
	font-size: 12px;
	color: #999;
}
.phone {
	padding: 10px 0;
	background: #f0f0f0;
}
// .van-cell {
//   border-bottom: 1px solid #f0f0f0;
// }
::v-deep.van-action-sheet__description{
	color:#666 ;
}
</style>

