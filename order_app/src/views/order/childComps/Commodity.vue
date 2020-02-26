<template>
	<div class="middle">
		<div class="middle_container">
			<van-divider :style="{ color: '#000', borderColor: '#999' }">
				<p class="title">{{ shop_name }}</p>
			</van-divider>
			<div class="number">
				<span>已选商品</span>
				<span>共3份</span>
			</div>
		</div>
		<div class="commodity">
			<div v-for="(item, i) of fooddata1" :key="i" class="tailorism">
				<span class="tailorism_title">{{ item.foodname }}</span>
				<span class="tailorism_num">x{{ item.num }}</span>
				<span class="tailorism_money">¥{{ item.price }}</span>
			</div>
		</div>
		<div style="width: 100%;height: 8px; background: #f1f1f1;"></div>
		<div class="delivery">
			<span>配送费</span>
			<span class="delivery_money">¥{{ deliveryPrice }}</span>
		</div>
		<div class="total">
			<span>总计</span>
			<span class="total_price"><i>¥</i>{{ total }}</span>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
	data() {
		return {
			// commodity: [
			// 	{ title: "4-6人餐nq1X(不含炉具)", number: 3, money: 1230 },
			// 	{ title: "4-8人餐nq1X(不含炉具)", number: 1, money: 992 },
			// 	{ title: "8-10人餐nq1X(不含炉具)", number: 1, money: 1230 }
			// ],
			total: 0,
            deliveryPrice: 38,
            fooddata2:[],
		};
	},
	props: {
		fooddata1: { default: Array }
	},
	methods: {
        ...mapMutations(["getTotal"]),
		Total() {
			for (var i of this.fooddata1) {
				this.total += i.price * i.num;
			}
			this.total += parseInt(this.deliveryPrice);
		},

	},
	created() {
		console.log('111')
		console.log(this.fooddata1)
		this.Total();
		 this.getTotal(this.total);
    },
    watch:{
        fooddata1(newVal,oldVal){
			console.log(newVal,oldVal)
			if(newVal){
            this.fooddata2 = newVal;
                console.log(newVal)
                this.Total();
                console.log(this.fooddata2)
                this.getTotal(this.total);
            }
            
        }
    },
	computed: {
		...mapState(["shop_name"])
	},
	beforeMount() {
    },
    mounted() {
    },
	beforeDestroy() {}
};
</script>
<style scoped>
.middle {
	width: 90%;
	margin: 10px 5%;
	background-color: #fff;
	border-radius: 10px;
	/* padding:10px; */
}

.middle_container {
	padding: 10px 5%;
}

.title {
	font-size: 14px;
	font-weight: bold;
	margin: 0;
}

.van-divider {
	margin: 0;
}

.number {
	display: flex;
	justify-content: space-between;
}

.number span {
	color: #999;
	font-size: 6px;
}

.middle_container::after {
	content: "";
	display: block;
	width: 100%;
	height: 1px;
	margin-top: 10px;
	background: #f1f1f1;
}

.commodity {
	display: flex;
	flex-direction: column;
	padding: 0 5% 10px;
}

.tailorism {
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	align-items: center;
}

.tailorism_title::before {
	display: inline-block;
	content: "";
	width: 5px;
	height: 30px;
	background-color: #f1f1f1;
	margin-right: 10px;
}

.tailorism_title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
	font-size: 12px;
}

.tailorism_num {
	color: #999;
	font-size: 6px;
}

.tailorism_money {
	color: red;
	font-size: 8px;
}

.delivery {
	display: flex;
	justify-content: space-between;
	padding: 10px 5%;
}

.delivery span {
	font-size: 12px;
}

.delivery_money {
	font-size: 10px;
	font-weight: bolder;
}

.total {
	display: flex;
	justify-content: space-between;
	padding: 10px 5%;
	/* margin-top: 10px; */
	align-items: center;
	font-size: 12px;
	font-weight: bolder;
	border-radius: 4px;
}

.total .total_price {
	font-size: 14px;
	color: #f00;
}

.total_price i {
	font-style: normal;
	font-size: 6px;
}
</style>
