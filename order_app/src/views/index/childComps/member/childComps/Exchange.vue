<template>
	<div class="exchange">
		<h4 class="title">捞币可兑多种大礼</h4>
		<van-row type="flex" justify="space-around">
			<van-col span="11">
				<p>代金券</p>
				<p>抵用现金就餐更优惠</p>
			</van-col>
			<van-col span="11">
				<p>菜品类</p>
				<p>门店推荐菜品免费换</p>
			</van-col>
		</van-row>
		<van-row type="flex" justify="space-around">
			<van-col span="11">
				<p>商品类</p>
				<p>更多好物任你兑</p>
			</van-col>
			<van-col span="11">
				<p>黑海专区</p>
				<p>抵用现金就餐更优惠</p>
			</van-col>
		</van-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			commodity: {}
		};
	},
	created() {
		// this.$api
		// 	.getIndexProduct()
		// 	.then(res => {
		// 		this.commodity = res.data.data;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
};
</script>

<style lang="scss" scoped>
@function ur($name) {
	@return "~assets/img/member/" + $name;
}
.exchange {
	background: #fff;
	padding-bottom: 10px;
	.title {
		font-size: 14px;
		margin-top: 8px;
		padding: 10px 0 20px 8px;
	}
	.van-row {
		margin-bottom: 10px;
		&:nth-child(2) {
			.van-col {
				&:nth-child(1) {
					background: url(ur("redeem_card.png")) no-repeat;
					background-size: 100%;
				}
				&:nth-child(2) {
					background: url(ur("redeem_dish.png")) no-repeat;
					background-size: 100%;
				}
			}
		}
		&:nth-child(3) {
			.van-col {
				&:nth-child(1) {
					background: url(ur("redeem_goods.png")) no-repeat;
					background-size: 100%;
				}
				&:nth-child(2) {
					background: url(ur("redeem_member.png")) no-repeat;
					background-size: 100%;
				}
			}
		}
		.van-col {
			height: 85px;
			p {
				&:nth-child(1) {
					margin-top: 10px;
					margin-bottom: 5px;
				}
				font-size: 12px;
				font-weight: bold;
				color: #fff;
				margin-left: 8px;
			}
		}
	}
}
</style>
