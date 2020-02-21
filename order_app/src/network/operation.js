import {request } from './request'
import qs from "qs";

export function forget(obj){
    return request({
        url: '/users/forget',
        method : 'put',
        data: qs.stringify(obj)
    })
}