import {request} from './request'
export function getIndexProduct() {
    return request({
        url: '/index/product'
    })
}
export function getIndexCarousel1() {
    return request({
        url: '/index/carouselIndex1'
    })
}
export function getIndexCarousel2() {
    return request({
        url: '/index/carouselIndex2'
    })
}