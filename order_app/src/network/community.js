import  {request} from './request'

// 获取社区推荐轮播图
export function getCommunity() {
    return request({
        url: '/community/carousel'
    })
}
//获取最新评论
export function getNew(pageNumber,pageSize) {
    return request({
        url: '/community/new',
        params:{
            pageNumber,
            pageSize
        }
    })
}
//重新获取用户信息，保证用户修改信息后的更新
export function Checkuser() {
    return request({
        url: '/users/Checkuser'
    })
}

// 保存关注
export function follow(params) {
    return request({
        url: '/community/follow',
        params,
    })
}

export function getmyfollow(pageNumber,pageSize){
    return request({
        url: '/community/myfollow',
        params:{
            pageNumber,
            pageSize
        }
    })
}