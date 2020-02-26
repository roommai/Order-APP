<template>
	<div>
		<van-sticky>
			<van-nav-bar title="门店列表" left-arrow @click-left="onClickLeft" />
		</van-sticky>
		<van-tabs v-model="active" sticky :offset-top="46" style="overflow: hidden">
			<van-tab title="外送">
				<shop-location></shop-location>
			</van-tab>
			<van-tab title="自提">
				<shop-task></shop-task>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import ShopLocation from "./childComps/ShopLocation";
import ShopTask from "./childComps/ShopTask";
export default {
	components: {
		ShopLocation,
		ShopTask
	},
	data() {
		return {
			active: 0
		};
	},
	methods: {
		onClickLeft() {
			this.$router.push("/");
		}
	}
};
</script>

<style lang="scss" scoped>

</style>

