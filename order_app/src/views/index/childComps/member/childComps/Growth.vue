<template>
    <div class="growth">
        <van-row>
            <van-col span="18">
                成长值 {{growth}}
                <span>含奖励成长值 {{bonus}}</span>
            </van-col>
            <van-col span="6">等级规则</van-col>
        </van-row>
        <p>
            当前等级:
            <span>{{grade}}</span>
            (持续享受到店服务可获得成长值)
        </p>
        <div class="progress">
            <span></span>
            <div>下月生效 {{xvalue}}</div>
        </div>
        <div class="date">
            本月成长值计算周期: {{`${year-1}年${month - 6}月${getDay(month-1)}日`}} ~
            <span>{{`${year}年${month - 1}月${getDay(month-1)}日`}}</span>
        </div>
        <div class="date">
            下月成长值计算周期: {{`${year-1}年${month - 5}月${getDay(month-1)}日`}} ~
            <span>{{`${year}年${month}月${getDay(month-1)}日`}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            growth: 0,
            bonus: 0,
            xvalue: 0,
            grade: "红海",
            year: 0,
            monteh: 0
        };
    },
    created() {
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = new Date(this.year, this.month, 0).getDate();
    },
    methods: {
        getDay(i) {
            if (i < 0) {
                i = 11;
                year -= 1;
                return new Date(year, i, 0).getDate();
            }
            return new Date(this.year, i, 0).getDate();
        }
    }
};
</script>

<style lang="scss" scoped>
.growth {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    .van-row {
        .van-col {
            &:nth-child(2) {
                text-align:right;
            }
        }
    }
    p {
        font-size: 11px;
        color: #999;
        height: 25px;
        line-height: 25px;
        margin:5px 0 20px 0;
        span {
            color: #000;

        }
    }
    .date {
        font-size: 11px;
        color: #999;
        span {
            color: #999;
        }
        &:last-child {
            margin: 5px 0;
        }
    }
}
.progress {
    padding-bottom: 50px;
    span {
        position: relative;
        display: block;
        height: 10px;
        width: 100%;
        border-radius: 5px;
        background: #ffbb56;
        &:after {
            content: "";
            display: block;
            width: 25px;
            height: 25px;
            background: url("~assets/img/member/member_integral_lock.png")
                no-repeat;
            background-size: 100%;
            position: absolute;
            margin-left: -10px;
            top: -6px;
            left: 50%;
        }
    }
    div {
        position: absolute;
        padding: 2px 8px;
        font-size: 5px;
        margin-top: 5px;
        color: #f1f1f1;
        right: 15px;
        border-radius: 8px 0 8px 8px;
        background: #ffbb56;
    }
}
.van-row {
    .van-col {
        font-weight: bold;
        font-size: 15px;
        span {
            padding: 2px 5px;
            font-size: 10px;
            font-weight: 500;
            color: #f1f1f1;
            border-radius: 8px 8px 8px 0;
            background: #f7342b;
        }
        &:nth-child(2) {
            font-size: 13px;
            font-weight: 500;
            color: #999;
            &:after {
                content: "";
                display: inline-block;
                margin-left: 5px;
                border: 5px solid;
                border-color: transparent transparent transparent #999;
            }
        }
    }
}
</style>