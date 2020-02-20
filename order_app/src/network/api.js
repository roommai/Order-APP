import axios from "axios";
//保存基础地址
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "http://hdlapi.applinzi.com";
// axios.defaults.baseURL = "http://176.122.13.170:4000";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

import qs from "qs";

//===========用户============
//登录 1 2 需要账号密码
export const login = params => {
	return axios.post("/users/signin", qs.stringify(params));
};

//找回密码 3 需要手机号 新密码
export const forget = params => {
	return axios.put("/users/forget", params);
};

//修改密码 8 需要旧密码 新密码
export const updatePassword = params => {
	return axios.put("/users/updatePassword", qs.stringify(params));
};

//注销 4
export const logout = () => {
	return axios.get("/users/logout");
};

//判断是否登录 5
export const islogin = () => {
	return axios.get("/users/islogin");
};

//更新个人信息 更改的信息对象， 6
export const update = params => {
	return axios.put("/users/update", qs.stringify(params));
};

//重新获取个人信息更新到vuex    7
export const get = params => {
	return axios.get("/users/get", { params });
};

//===========主页============

//获取门店
export const shops = () => {
	return axios.get("/index/shops");
};
//模糊查找帖子 需要keyword
export const searchPosts = params => {
	return axios.get("/index/searchPosts", params);
};

//模糊查找用户 需要keyword
export const searchUser = params => {
	return axios.get("/index/searchUser", params);
};

//获取主页轮播一
export const getIndexCarousel1 = () => {
	return axios.get("/index/carouselIndex1");
};

//获取主页轮播二
export const getIndexCarousel2 = () => {
	return axios.get("/index/carouselIndex2");
};

//获取首页商品
export const getIndexProduct = () => {
	return axios.get("/index/product");
};

//===========社区============
//获取社区最新帖子 需要页码，每页数量 pageNumber pageSize
export const getNewPosts = params => {
	return axios.get("/community/new", { params });
};

//获取社区轮播图
export const getCommunityCarousel = () => {
	return axios.get("/community/carousel");
};

//关注用户 被关注者user 传ID
export const follow = params => {
	return axios.get("/community/follow", { params });
};

//获取我的关注
export const myFollow = params => {
	return axios.get("/community/myfollow", { params });
};

//=============会员============

//获取会员页面轮播图
export const vipCarousel = () => {
	return axios.get("/member/carousel");
};