import {request } from './request'
import qs from "qs";

export function forget(obj){
    return request({
        url: '/users/forget',
        method : 'put',
        data: qs.stringify(obj)
    })
}

//重新获取个人信息更新到vuex    7
export function Checkuser(params) {
	return request({
        url: '/users/Checkuser',
        params,
    })
};

//忘记密码
export function update(obj) {
    return request({
        url: '/users/update',
        method: 'put',
        data:qs.stringify(obj)
    })
}
// 修改密码
export function updatePassword(obj){
    return request({
        url: '/users/updatePassword',
        method: 'put',
        data:qs.stringify(obj)
    })
}
//模糊查找帖子 需要keyword
export function searchPosts(params){
    return request({
        url: '/index/searchPosts',
        params
    })
}

//模糊查找用户 需要keyword
// 修改密码
export function searchUser(params){
    return request({
        url: '/index/searchUser',
        params
    })
}

// 获取门店
export function getShop(){
    return request({
        url: '/index/shops'
    })
}

