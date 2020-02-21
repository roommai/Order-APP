import {request} from './request';
import qs from "qs";

export function login(params) {
    return request({
        url: '/users/signin',
        method: 'POST',
        data: qs.stringify(params)
    })
}

export function GetIsLogin(){
    return request({
        url: '/users/islogin'
    })
}
