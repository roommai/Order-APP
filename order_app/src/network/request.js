import axios from 'axios'
import store from '../store'
import qs from "qs";

export function request(config){
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8080',
        timeout:5000
    })
    // axios拦截器
        //请求拦截
    instance.interceptors.request.use(config=>{
        // if(config.method==="post" || config.method==="put"){
        //     //让请求发送的参数对象转为json字符串
        //     config.data=qs.stringify(config.data)
        // }
        if(sessionStorage.getItem("token")){
            config.headers.token=sessionStorage.getItem("token");
        }
        if(localStorage.getItem("token")){
            // 请求都带token数据
            config.headers.token=localStorage.getItem("token");
        }
        return config
    },err=>{
        // console.log(err);
    })
        // 响应拦截
    instance.interceptors.response.use(res=>{
        console.log("触发响应拦截器..")
        // 拦截是否带有token
        if(res.data.token){
            // 保存token
            sessionStorage.setItem("token",res.data.token)
            // localStorage.setItem("token",res.data.token)
        }
        if(res.data.user) {
            let user = JSON.stringify(res.data.user)
            sessionStorage.setItem('user',user);
            store.dispatch("setUser",user)
        }
        return res.data
    },err=>{
        console.log(err)
    })
    //发送真正的网络请求
    // axios.create的返回值本神就是promise
    return instance(config)
}