import Vue from 'vue'
import Vuex from 'vuex'
import print from "./module/print.js";
import { GetIsLogin } from 'network/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		bool: sessionStorage.getItem("token") || localStorage.getItem("token") ? false:true ,
		userList: [],
		isLogin:false,
		setTotal: "",
		// serverBaseURL: "http://176.122.13.170:4000"
		// serverBaseURL: "http://localhost:4000"
		serverBaseURL: "http://localhost:8080",
		// data: {}
		shop_name: ""
		},
		getters:{
			currentUser(state) {
				return state.userList
			},
			isLogin(state){
				return isLogin
			},
		},
    mutations: {
			changelogin(state,checkbool){
				state.bool = checkbool;
			},
			userStatus(state,user) {
				if (user) {
					state.userList = user;
					state.bool = false;
				}else if (user==null) {
					//退出的时候清空sessionStorage里的东西
					sessionStorage.setItem('user',null);
					sessionStorage.setItem('token','');
					state.userList = null;
					state.bool = true ;
				}
			},
			getTotal(state, total) {
				// console.log(total);
				state.setTotal = total;
				// console.log(state.total);
			},
			setShopName(state, name) {
				// console.log(name);
				state.shop_name = name;
			}
		},
    actions: {
			setUser(context,user) {
				context.commit("userStatus",user)
			},
			// getlogin(context) {
			// // 	//当组件创建成功后调用
			// // 	//1:发送请求 是否登陆
			// 	(async function()  {
			// 		var result = await GetIsLogin().then(res => {
			// 			console.log(res)
			// 			// 2.获取返回结果
			// 			if(res.code == -5){
			// 				context.commit("changelogin", true);
			// 			}else{
			// 				context.commit("changelogin", false);
			// 			}
			// 		})
			// 		console.log(result)
			// 	})()
			// 		},
					// logout(context) {
			// 	var url = "users/logout";
			// 	axios.get(url).then(res => {
			// 		//2:获取返回结果
			// 		if (res.data.code == -4) {
			// 			//3:如果用户没有执行登录操作
			// 			//提示交互提示/跳转登录组件
			// 			context.commit("changelogin", "");
			// 		}
			// 	});
			// }
		},
    modules: {
		print
	}


})

export default store