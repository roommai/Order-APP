<template>
    <div>
        <div class="container">
            <div class="store" v-for="(item,i) of shopName" :key="i">
                <img :src="item.logo" alt="">
                <div class="store_trade">
                    <div class="title_top">
                        <span class="title">{{item.name}}</span>
                        <van-button type="info" size="mini" round>{{item.business}}</van-button>
                    </div>
                    <div class="business">
                        <div class="business_left">
                            <span class="site">{{item.time}}</span>
                        </div>
                        <span class="site distance">&ge;{{item.distance}}km</span>
                    </div>
                    <div class="orientation">
                        <img :src="item.orientationImg" alt="">
                        <span>{{item.orientation}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 0,
                search_val: '',
                option: [
                    { text: '附近门店', value: 0 }
                ],
                shopName: [

                    { logo: require('assets/img/index/su_comment_logo.png'), orientationImg: require('assets/img/index/orientation.png'), name: '富力海珠城店', business: '正在营业', time: '上午10:00-次日凌晨7:00', distance: '4', orientation: '广东省广州市海珠区江南大道中180号富力海珠城' },
                    { logo: require('assets/img/index/su_comment_logo.png'), orientationImg: require('assets/img/index/orientation.png'), name: '海底捞火锅外送（海珠店）', business: '装修升级中', time: '上午10:00-次日凌晨7:00', distance: '3', orientation: '广东省广州市海珠区江南大道中180号富力海珠城' },
                    { logo: require('assets/img/index/su_comment_logo.png'), orientationImg: require('assets/img/index/orientation.png'), name: '海底捞火锅外送（海珠店）', business: '装修升级中', time: '上午10:00-次日凌晨7:00', distance: '4', orientation: '广东省广州市海珠区江南大道中180号富力海珠城' },
                    { logo: require('assets/img/index/su_comment_logo.png'), orientationImg: require('assets/img/index/orientation.png'), name: '海底捞火锅外送（海珠店）', business: '正在营业', time: '上午10:00-次日凌晨7:00', distance: '3', orientation: '广东省广州市海珠区江南大道中180号富力海珠城' },
                ],
            }
        },
        methods: {
            loadMore() {

            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 10px;
    }

    .van-dropdown-menu {
        /* margin-top: 10px; */
        height: 2.625rem;
    }

    .van-search .van-cell {
        padding: 0.0125rem 0.5rem 0.1125rem 0;
    }


    .store {
        display: flex;
        flex-direction: row;
        background: #fff;
        padding: 8px;
        align-items: center;
        border-bottom: .5px solid #f1f1f1;
    }

    .store_trade {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin-left: 15px;
    }

    .business {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding-top: 3px; */
    }

    img {
        width: 30px;
        height: 30px;
    }

    .title_top {
        display: flex;
        justify-content: space-between;
    }

    .title {
        font-size: 12px;
    }

    .site {
        font-size: 10px;
        color: #999;
        /* margin-left: 0px; */
    }

    .van-button--mini {
        height: 16px;
        line-height: 15px;
        min-width: 70px;
    }

    .van-search__content {
        background: #ddd;
        border-radius: 5px;
    }
    .orientation img{
        width:10px;
        height:10px;
    }
    .orientation span{
        font-size:10px;
        color:#999;
    }
</style>