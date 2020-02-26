<template>
	<div>
		<van-sticky>
			<van-nav-bar
				title="选择收货地址"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
			/>
		</van-sticky>
		<van-address-list
			v-model="chosenAddressId"
			:list="list"
			:disabled-list="disabledList"
			disabled-text="以下地址超出配送范围"
			@add="onAdd"
			@edit="onEdit"
			@click-item="fh"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			chosenAddressId: "1",
			list: [
				{
					id: "1",
					name: "张三",
					tel: "13000000000",
					address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
				},
				{
					id: "2",
					name: "李四",
					tel: "1310000000",
					address: "浙江省杭州市拱墅区莫干山路 50 号"
				}
			],
			disabledList: [
				{
					id: "3",
					name: "王五",
					tel: "1320000000",
					address: "浙江省杭州市滨江区江南大道 15 号"
				}
			],
			user_address: {}
		};
	},
	methods: {
		onAdd() {
			//新增地址按钮
			this.$router.push("/newly");
		},

		onEdit(item, index) {
			//编辑按钮
			
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		fh(item) {
			this.user_address = item;
			this.$router.go(-1);
		}
	},

	beforeDestroy() {
		this.bus.$emit("userAddress", this.user_address);
	}
};
</script>

<style scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
	color: #000;
}
</style>
