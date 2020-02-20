import Vue from 'vue'
import Vuex from 'vuex'
import print from "./module/print.js";
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		bool: false,
		setTotal: "",
		// serverBaseURL: "http://176.122.13.170:4000"
		// serverBaseURL: "http://localhost:4000"
		serverBaseURL: "http://localhost:8080",
		// data: {}
		shop_name: ""
    },
    mutations: {
		// changelogin(state, bool) {
		// 	state.bool = bool;
		// },
		// getTotal(state, total) {
		// 	// console.log(total);
		// 	state.setTotal = total;
		// 	// console.log(state.total);
		// },
		// setShopName(state, name) {
		// 	console.log(name);
		// 	state.shop_name = name;
		// }
    },
    actions: {
		// getlogin(context) {
		// 	//当组件创建成功后调用
		// 	//1:发送请求 cart
		// 	(async function() {
		// 		var url = "users/islogin";

		// 		var result = await axios
		// 			.get("http://hdlapi.applinzi.com/users/islogin")
		// 			.then(res => {
		// 				//2:获取返回结果
		// 				if (res.data.code == -5) {
		// 					//3:如果用户没有执行登录操作
		// 					//提示交互提示/跳转登录组件
		// 					context.commit("changelogin", true);
		// 				} else {
		// 					context.commit("changelogin", false);
		// 				}
		// 			});
		// 	})();
        // },
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