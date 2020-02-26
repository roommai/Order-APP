<template>
    <div class="outside">
        <div class="outside_top">
            <div class="shipping">
                <div class="shipping_left">
                    <img src="~assets/img/index/location.png" alt="" />
                    <div class="shipping_site">
                        <span class="span_title">自取地址</span>
                        <span class="s1">广州市环市西富力环市西苑北（彭城东路）</span>
                    </div>
                </div>
                <span class="shipping_right"><img class="right_icon" src="~assets/img/index/right.png"
                        alt="" /></span>
            </div>
            <div class="payment">
                <div class="payment_left">
                    <img src="~assets/img/index/linkman.png" alt="" />
                    <span class="span_title">联系方式</span>
                </div>
                <span class="payment_right">18813375469</span>
            </div>
            <div class="time">
                <div class="time_left">
                    <img src="~assets/img/index/time.png" alt="" />
                    <span class="span_title">到店时间</span>
                </div>
                <div class="time_right">
                    <span class="span_mintitle">尽快到店</span>
                    <img class="right_icon" src="~assets/img/index/right.png" alt="" />
                </div>
            </div>
            <div class="payment">
                <div class="payment_left">
                    <img src="~assets/img/index/payment.png" alt="" />
                    <span class="span_title">支付方式</span>
                </div>
                <span class="payment_right">在线支付</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>

<style scoped>
    .outside {
        background: #fff;
        width: 90%;
        height: 160px;
        margin: 0 auto;
        border-radius: 0 0 10px 10px;
    }

    .outside_top {
        display: flex;
        flex-direction: column;
        padding: 5px 8px;
    }

    .shipping,
    .time,
    .payment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
    }

    .shipping_left,
    .payment_left,
    .time_left,
    .time_right {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .shipping_site {
        display: flex;
        flex-direction: column;
    }

    .shipping img,
    .time img,
    .payment img {
        width: 15px;
        height: 15px;
    }

    .span_title {
        font-size: 12px;
    }

    .span_title,
    .s1 {
        margin-left: 5px;
    }

    .payment_right,
    .span_mintitle {
        font-size: 12px;
        color: #999;
        margin-right: 5px;
    }

    .s1 {
        font-size: 8px;
        color: #666;
    }

    .right_icon {
        width: 10px;
        height: 10px;
    }
</style>