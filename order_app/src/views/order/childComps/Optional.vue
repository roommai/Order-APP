<template>
    <div class="optional">
        <van-cell-group class="bz">
            <van-field v-model="remark" rows="1" autosize label="备注" type="textarea" placeholder="请输入备注..." />
        </van-cell-group>
        <!-- <van-cell title="餐具数量" is-link value="无需餐具" @click="showPopup">
        </van-cell>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" /> -->
        <!-- <van-cell title="餐具数量" is-link :value="cjCount" @click="show = true" /> -->
        <van-field readonly clickable label="餐具数量" :value="cjCount" @click="show = true" />
        <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
            <van-picker :columns="columns" show-toolbar title="餐具份数" @cancel="show = false" @confirm="cjConfirm" />
        </van-popup>
        <van-cell-group class="bz">
            <van-field v-model="invoice" rows="1" autosize label="发票抬头" type="textarea" placeholder="请输入个人或公司抬头" />
        </van-cell-group>
        <van-cell-group class="bz">
            <van-field v-model="taxpayer" rows="1" autosize label="纳税人识别号" type="textarea" placeholder="请输入纳税人识别号" />
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                commodity: [
                    { title: "4-6人餐nq1X(不含炉具)", number: 3, money: 1230 },
                    { title: "4-8人餐nq1X(不含炉具)", number: 1, money: 992 },
                    { title: "8-10人餐nq1X(不含炉具)", number: 1, money: 1230 }
                ],
                cjCount: "推荐选无需餐具，未选择",
                columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
                total: 0,
                deliveryPrice: 38,
                remark: "",
                invoice: "",
                taxpayer: "",
                show: false,
                columns: [
                    "无需餐具",
                    "1份",
                    "2份",
                    "3份",
                    "4份",
                    "5份",
                    "6份",
                    "7份",
                    "8份"
                ]
            };
        },
        methods: {
            cjConfirm(val) {
                this.cjCount = val;
                this.show = false;
            },
            Total() {
                for (var i of this.commodity) {
                    this.total += i.money;
                }
                this.total += this.deliveryPrice;
            }
            // showPopup() {
            //     this.show = true;
            // }
        },
        mounted() {
            this.Total();
        }
    };
</script>
<style scoped lang="scss">
    .optional {
        padding: 0 5%;
        margin-bottom: 55px;
    }

    .van-cell {
        /* margin-top: 10px; */
        /* border-radius: 6px; */
        font-size: 12px;
    }

    .van-cell__value {
        color: #000;
    }

    .bz>.van-cell {
        border-radius: 10px;
    }

    ::v-deep .van-field__control {
        text-align: right;
    }
</style>