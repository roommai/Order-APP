import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8080',
        timeout:5000
    })
    // axios拦截器
        //请求拦截
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        // console.log(err);
    })
        // 响应拦截
    instance.interceptors.response.use(res=>{
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    //发送真正的网络请求
    // axios.create的返回值本神就是promise
    return instance(config)
}