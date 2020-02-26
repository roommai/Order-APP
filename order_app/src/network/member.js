import {request} from './request'

export function vipCarousel() {
    return request({
        url: '/member/carousel'
    })
}
