<template>
    <div class="list">
        <van-sticky>
			<van-nav-bar
				title="外卖点餐"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
				sticky
			/>
			<van-notice-bar
				color="#FF8F43"
				background="#FFF9DC"
				left-icon="volume"
				sticky
				:offset-top="30"
				>注册会员享受更多福利哟</van-notice-bar
			>
		</van-sticky>
        <div class="kg"></div>
        <div class="menu">
            <van-index-bar
				:index-list="indexList"
				highlight-color="rgb(88,155,235)"
				:sticky="true"
				:sticky-offset-top="80"
			>
                <div class="menu-list">
                    <div v-for="(item, index) in data" :key="index">
                        <van-index-anchor :index="item.foodtype">{{
							item.foodtype
						}}</van-index-anchor>
                        <van-cell v-for="(it, index) of item.merchandise" :key="index">
                            <img :src="require('../../' + it.img)" alt="" />
                            <div class="layout">
                                <p class="van-ellipsis">{{ it.foodname }}</p>
								<div class="bottom">
									<span class="price">¥{{ it.price }}</span>
                                    <div>
                                        <button
											class="sub displaynone"
											@click="subShow"
											:data-lid="it.lid"
											:data-foodname="it.foodname"
											:data-price="it.price"
											:data-variety="it.variety"
										>
											<div></div>
										</button>
                                        <input
											type="text"
											value="0"
											class="count displaynone"
											data-input="input"
											:data-inplid="it.lid"
										/>
                                        <button
											class="add"
											:class="it.variety.length | shareAdd"
											@click="addShow"
											:data-lid="it.lid"
											:data-foodname="it.foodname"
											:data-price="it.price"
											:data-variety="it.variety"
										>
											+
										</button>
                                        <button
											class="select"
											:class="it.variety.length | shareSelect"
											@click="select"
											:data-lid="it.lid"
											:data-foodname="it.foodname"
											:data-price="it.price"
											:data-variety="it.variety"
										>
											选规格
										</button>
                                        <van-overlay :show="show">
                                            <div class="wrapper" @click="shows">
                                                <div class="block">
                                                    <div class="foodname">
														{{ foodname }}
														<span class="price">¥{{ price }}</span>
													</div>
													<div class="close" @click="close">×</div>
													<div class="group">
														规格
													</div>
                                                    <div class="options">
														<button
															class="option"
															v-for="(items, indexs) in variety"
															:key="indexs"
															:class="indexs | optionclass"
															@click="optionshow"
															data-jihao="jihao"
															:data-index="indexs"
															:data-name="items.varietyname"
															:data-price="items.varietyprice"
														>
															{{ items.varietyname }}
														</button>
													</div>
                                                    <div class="bottoms">
														<div class="tj">
															<button class="sub" @click="optionSub">
																<div></div>
															</button>
															<input type="text" :value="val" class="count " />
															<button class="add" @click="optionAdd">+</button>
														</div>

														<button
															class="okgwc addgwc "
															@click="addShoppingCart"
														>
															加入购物车
														</button>
													</div>
                                                </div>
                                            </div>
                                        </van-overlay>
                                    </div>
								</div>
                            </div>
                        </van-cell>
                    </div>
                </div>
            </van-index-bar>
        </div>
        <div class="dangbang"></div>
        <!-- 底部显示购物车 -->
        <van-goods-action>
			<div class="gwc">
				<button class="gwcgj activegwcbj " @click="gwcbtn"></button>
				<span class="gwck displaynone">购物车是空</span>
				<div class="prices">
					<div class="zj">¥{{ totalprice }}</div>
					<div class="psf">另需配送费¥38</div>
				</div>

				<span class="dispatching displaynone">¥188起送</span>

				<button class="okgwc" @click="goOrder">选好啦</button>
			</div>
		</van-goods-action>
        <!-- 购物车详情 -->
        <van-overlay :show="showgwc" z-index="1">
            <!-- 遮罩层 -->
			<div class="wrappergwc" @click.stop @click="showgwcfun" z-index="1">
				<div class="blockgwc">
					<div class="tab">
						<div class="gouwuche"><em class="xlt"></em>购物车</div>
						<button class="cleargwc" @click="cleargwc">
							<em class="ljt"></em>清空购物车
						</button>
					</div>
					<div
						class="footkind"
						v-for="(footitem, index) of fooddata"
						:key="index"
					>
						<div class="left">{{ footitem.foodname }}</div>
						<div class="right">
							<div class="price">¥{{ footitem.price }}</div>
							<div class="gwcs">
								<button
									class="sub"
									@click="gwcsub"
									:data-foodname="footitem.foodname"
									:data-price="footitem.price"
									:data-lid="footitem.lid"
									:data-num="footitem.num"
								>
									<div></div>
								</button>
								<input type="text" :value="footitem.num" class="count" />
								<button
									class="add"
									@click="gwcadd"
									:data-foodname="footitem.foodname"
									:data-price="footitem.price"
									:data-lid="footitem.lid"
									:data-num="footitem.num"
								>
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</van-overlay>
    </div>
</template>
<script>
import Vue from "vue";
Vue.filter("shareAdd", function(share) {
	return share == "0" ? "" : "displaynone";
});
Vue.filter("shareSelect", function(share) {
	return share == "0" ? "displaynone" : "";
});
Vue.filter("optionclass", function(i) {
	return i == "0" ? "active" : "";
});
export default {
    data() {
        return {
            val: 1,
			totalprice: 0,
			fooddata: [], //传的数据
			showgwc: false,
			lid: "",
			foodname: "",
			price: "",
			variety: "",
			show: false,
			indexList: [],
            data: [
				{
					foodtype: "全锅底", //商品类型
					merchandise: [
						{
							lid: "1",
							foodname: "全锅底",
							img: "assets/img/takeout/qgd.png",
							price: "2",
							variety: []
						}
					]
				},
				{
					foodtype: "超值套餐", //商品类型
					merchandise: [
						//商品种类
						{
							lid: "2",
							foodname: "8-10人餐(不含炉具)",
							img: "assets/img/takeout/tc810.png",
							price: "899",
							variety: []
						},
						{
							lid: "3",
							foodname: "4-6人餐(不含炉具)",
							img: "assets/img/takeout/tc46.png",
							price: "599",
							variety: []
						},
						{
							lid: "4",
							foodname: "6-8人餐(不含炉具)",
							img: "assets/img/takeout/tc68.png",
							price: "699",
							variety: []
						}
					]
				},
				{
					foodtype: "鸳鸯锅底", //商品类型
					merchandise: [
						{
							lid: "5", //商品编号
							foodname: "牛油双拼锅底", //商品名称
							img: "assets/img/takeout/nygd.png", //商品图片
							price: "112", //商品价格
							variety:
								'[{"varietyname":"牛油/三鲜","varietyprice":"112"},{"varietyname":"牛油/番茄","varietyprice":"112"},{"varietyname":"牛油/菌汤","varietyprice":"112"}]'
						},
						{
							lid: "6", //商品编号
							foodname: "清油双拼锅底", //商品名称
							img: "assets/img/takeout/qygd.png", //商品图片
							price: "112", //商品价格
							variety:
								'[{"varietyname":"清油/三鲜","varietyprice":"85"},{"varietyname":"清油/番茄","varietyprice":"85"}]'
						},
						{
							lid: "7", //商品编号
							foodname: "清汤双拼锅底", //商品名称
							img: "assets/img/takeout/qygd.png", //商品图片
							price: "78", //商品价格
							variety:
								'[{"varietyname":"菌汤/三鲜","varietyprice":"78"},{"varietyname":"番茄/三鲜","varietyprice":"78"},{"varietyname":"番茄/菌汤","varietyprice":"78"}]'
						},
						{
							lid: "8",
							foodname: "清油/菌汤",
							img: "assets/img/takeout/qyjt.png",
							price: "85",
							variety: []
						}
					]
				},
				{
					foodtype: "超值组合", //商品类型
					merchandise: [
						{
							lid: "9",
							foodname: "草原羔羊肉血旺爆品组合",
							img: "assets/img/takeout/cygy.png",
							price: "59",
							variety: []
						},
						{
							lid: "10",
							foodname: "全员饿狼组合",
							img: "assets/img/takeout/qyel.png",
							price: "28",
							variety: []
						}
					]
				},
				{
					foodtype: "小料区", //商品类型
					merchandise: [
						{
							lid: "11",
							foodname: "陈醋",
							img: "assets/img/takeout/cc.png",
							price: "9",
							variety: []
						},
						{
							lid: "12",
							foodname: "海椒干碟",
							img: "assets/img/takeout/hjgd.png",
							price: "9",
							variety: []
						},
						{
							lid: "13",
							foodname: "牛肉粒",
							img: "assets/img/takeout/nrl.png",
							price: "9",
							variety: []
						},
						{
							lid: "14",
							foodname: "小米辣",
							img: "assets/img/takeout/xml.png",
							price: "9",
							variety: []
						},
						{
							lid: "15",
							foodname: "耗油",
							img: "assets/img/takeout/hy.png",
							price: "9",
							variety: []
						},
						{
							lid: "16",
							foodname: "麻酱",
							img: "assets/img/takeout/mj.png",
							price: "9",
							variety: []
						},
						{
							lid: "17",
							foodname: "香油蒜泥味碟",
							img: "assets/img/takeout/xysn.png",
							price: "9",
							variety: []
						},
						{
							lid: "18",
							foodname: "丸滑酱油",
							img: "assets/img/takeout/whjy.png",
							price: "9",
							variety: []
						},
						{
							lid: "19",
							foodname: "精品牛肉酱",
							img: "assets/img/takeout/jpnrj.png",
							price: "9",
							variety: []
						},
						{
							lid: "20",
							foodname: "瑶柱香菇酱",
							img: "assets/img/takeout/yzxgj.png",
							price: "9",
							variety: []
						},
						{
							lid: "21",
							foodname: "蒜蓉豆花酱",
							img: "assets/img/takeout/srdhj.png",
							price: "9",
							variety: []
						},
						{
							lid: "22",
							foodname: "XO酱",
							img: "assets/img/takeout/xoj.png",
							price: "9",
							variety: []
						},
						{
							lid: "23",
							foodname: "沙茶酱",
							img: "assets/img/takeout/scj.png",
							price: "9",
							variety: []
						},
						{
							lid: "24",
							foodname: "豆腐乳酱",
							img: "assets/img/takeout/dflj.png",
							price: "9",
							variety: []
						},
						{
							lid: "25",
							foodname: "葱花",
							img: "assets/img/takeout/ch.png",
							price: "9",
							variety: []
						},
						{
							lid: "26",
							foodname: "香菜末",
							img: "assets/img/takeout/xcm.png",
							price: "9",
							variety: []
						}
					]
				},
				{
					foodtype: "锅具炉具", //商品类型
					merchandise: [
						{
							lid: "27",
							foodname: "电磁炉+锅具使用费",
							img: "assets/img/takeout/dcl.png",
							price: "50",
							variety: []
						},
						{
							lid: "28",
							foodname: "鸳鸯锅售卖(不含电磁炉)",
							img: "assets/img/takeout/yyg.png",
							price: "38",
							variety: []
						}
					]
				},
				{
					foodtype: "特色菜", //商品类型
					merchandise: [
						{
							lid: "29", //商品编号
							foodname: "捞派黄喉", //商品名称
							img: "assets/img/takeout/lphh.png", //商品图片
							price: "58", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"58"},{"varietyname":"半份","varietyprice":"29"}]'
						},
						{
							lid: "30", //商品编号
							foodname: "捞派鸭肠(默认)", //商品名称
							img: "assets/img/takeout/lpyc.png", //商品图片
							price: "46", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"46"},{"varietyname":"半份","varietyprice":"23"}]'
						},
						{
							lid: "31", //商品编号
							foodname: "捞派澳洲肥牛(默认)", //商品名称
							img: "assets/img/takeout/lpazfn.png", //商品图片
							price: "70", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"70"},{"varietyname":"半份","varietyprice":"35"}]'
						},
						{
							lid: "31",
							foodname: "巴沙鱼片(默认)",
							img: "assets/img/takeout/bsyp.png",
							price: "60",
							variety:
								'[{"varietyname":"一份","varietyprice":"60"},{"varietyname":"半份","varietyprice":"30"}]'
						},
						{
							lid: "33", //商品编号
							foodname: "捞派毛肚", //商品名称
							img: "assets/img/takeout/lpmd.png", //商品图片
							price: "66", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"66"},{"varietyname":"半份","varietyprice":"33"}]'
						},
						{
							lid: "34",
							foodname: "捞派滑牛肉(默认)",
							img: "assets/img/takeout/lphnr.png",
							price: "66",
							variety:
								'[{"varietyname":"一份","varietyprice":"66"},{"varietyname":"半份","varietyprice":"33"}]'
						}
					]
				},
				{
					foodtype: "牛羊肉", //商品类型
					merchandise: [
						{
							lid: "35", //商品编号
							foodname: "新西兰羊肉(默认)", //商品名称
							img: "assets/img/takeout/xxlyr.png", //商品图片
							price: "66", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"66"},{"varietyname":"半份","varietyprice":"33"}]'
						},
						{
							lid: "36", //商品编号
							foodname: "精品肥牛", //商品名称
							img: "assets/img/takeout/jpfn.png", //商品图片
							price: "70", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"70"},{"varietyname":"半份","varietyprice":"35"}]'
						},
						{
							lid: "37", //商品编号
							foodname: "草原羔羊肉(默认)", //商品名称
							img: "assets/img/takeout/cygyr.png", //商品图片
							price: "60", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"60"},{"varietyname":"半份","varietyprice":"30"}]'
						},
						{
							lid: "38",
							foodname: "捞派肥牛(默认)",
							img: "assets/img/takeout/lpfn.png",
							price: "70",
							variety:
								'[{"varietyname":"一份","varietyprice":"70"},{"varietyname":"半份","varietyprice":"35"}]'
						}
					]
				},
				{
					foodtype: "经典火锅菜", //商品类型
					merchandise: [
						{
							lid: "39", //商品编号
							foodname: "牛蛙", //商品名称
							img: "assets/img/takeout/nw.png", //商品图片
							price: "48", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"48"},{"varietyname":"半份","varietyprice":"24"}]'
						},
						{
							lid: "40", //商品编号
							foodname: "扒皮鱼", //商品名称
							img: "assets/img/takeout/bpy.png", //商品图片
							price: "42", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"42"},{"varietyname":"半份","varietyprice":"21"}]'
						},
						{
							lid: "41", //商品编号
							foodname: "鹌鹑蛋(默认)", //商品名称
							img: "assets/img/takeout/acd.png", //商品图片
							price: "28", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"28"},{"varietyname":"半份","varietyprice":"14"}]'
						},
						{
							lid: "42",
							foodname: "蟹粉蟹籽风味包",
							img: "assets/img/takeout/xgxzfwb.png",
							price: "44",
							variety:
								'[{"varietyname":"一份","varietyprice":"44"},{"varietyname":"半份","varietyprice":"22"}]'
						},
						{
							lid: "43", //商品编号
							foodname: "五花猪肉", //商品名称
							img: "assets/img/takeout/whzr.png", //商品图片
							price: "48", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"48"},{"varietyname":"半份","varietyprice":"24"}]'
						},
						{
							lid: "44", //商品编号
							foodname: "血旺", //商品名称
							img: "assets/img/takeout/xw.png", //商品图片
							price: "40", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"40"},{"varietyname":"半份","varietyprice":"20"}]'
						},
						{
							lid: "45", //商品编号
							foodname: "蟹味棒(默认)", //商品名称
							img: "assets/img/takeout/xwb.png", //商品图片
							price: "38", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"38"},{"varietyname":"半份","varietyprice":"19"}]'
						},
						{
							lid: "46",
							foodname: "脱骨鸭掌",
							img: "assets/img/takeout/tgyz.png",
							price: "42",
							variety:
								'[{"varietyname":"一份","varietyprice":"42"},{"varietyname":"半份","varietyprice":"21"}]'
						},
						{
							lid: "47", //商品编号
							foodname: "肥肠", //商品名称
							img: "assets/img/takeout/fc.png", //商品图片
							price: "46", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"46"},{"varietyname":"半份","varietyprice":"23"}]'
						},
						{
							lid: "48", //商品编号
							foodname: "午餐肉", //商品名称
							img: "assets/img/takeout/wcr.png", //商品图片
							price: "40", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"40"},{"varietyname":"半份","varietyprice":"20"}]'
						},
						{
							lid: "49",
							foodname: "猪脑花(默认)",
							img: "assets/img/takeout/znh.png",
							price: "46",
							variety:
								'[{"varietyname":"一份","varietyprice":"46"},{"varietyname":"半份","varietyprice":"23"}]'
						},
						{
							lid: "50", //商品编号
							foodname: "脆皮肠(默认)", //商品名称
							img: "assets/img/takeout/cpc.png", //商品图片
							price: "34", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"34"},{"varietyname":"半份","varietyprice":"17"}]'
						},
						{
							lid: "51", //商品编号
							foodname: "鸭舌", //商品名称
							img: "assets/img/takeout/ys.png", //商品图片
							price: "54", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"54"},{"varietyname":"半份","varietyprice":"27"}]'
						},
						{
							lid: "52", //商品编号
							foodname: "腰花(默认)", //商品名称
							img: "assets/img/takeout/yh.png", //商品图片
							price: "44", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"44"},{"varietyname":"半份","varietyprice":"22"}]'
						},
						{
							lid: "53",
							foodname: "蛋饺(默认)",
							img: "assets/img/takeout/dj.png",
							price: "28",
							variety:
								'[{"varietyname":"一份","varietyprice":"28"},{"varietyname":"半份","varietyprice":"14"}]'
						},
						{
							lid: "54", //商品编号
							foodname: "捞派鱼饼(默认)", //商品名称
							img: "assets/img/takeout/lpyb.png", //商品图片
							price: "28", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"28"},{"varietyname":"半份","varietyprice":"14"}]'
						},
						{
							lid: "55", //商品编号
							foodname: "捞派鱼豆腐(默认)", //商品名称
							img: "assets/img/takeout/lpydf.png", //商品图片
							price: "30", //商品价格
							variety:
								'[{"varietyname":"一份","varietyprice":"30"},{"varietyname":"半份","varietyprice":"15"}]'
						},
						{
							lid: "56",
							foodname: "小郡肝",
							img: "assets/img/takeout/xjg.png",
							price: "56",
							variety:
								'[{"varietyname":"一份","varietyprice":"56"},{"varietyname":"半份","varietyprice":"28"}]'
						}
					]
				}
			]
        }
    },
    methods: {
		goOrder() {
			this.$router.push("/order");
		},
		gwcbtn() {
			if (this.showgwc) {
				this.showgwc = false;
			} else {
				this.showgwc = true;
			}
		},
		updateSelect() {
			// this.val = 1;
			// var jihao = document.querySelectorAll("[data-jihao=jihao]");
			// var inputs = document.querySelectorAll("[data-input=input]");
			// console.log("sd");
			// console.log(jihao);
			// console.log(inputs);
		},
		addShoppingCart(e) {
			var num = e.currentTarget.previousSibling.getElementsByTagName("input")[0]
				.value;
			var button = e.currentTarget.parentNode.previousSibling.getElementsByClassName(
				"active"
			)[0];
			var varietyname = button.dataset.name;
			var index = button.dataset.index;
			var lid = this.lid + "." + index;
			var price = this.price;
			var foodname = `${this.foodname}(${varietyname})`;
			// console.log(varietyname);
			// console.log(name);
			// console.log(num);
			var caiping = { lid, foodname, price, num };
			// console.log(caiping);
			if (this.fooddata.length == 0) {
				this.fooddata.push(caiping);
			} else {
				for (var i in this.fooddata) {
					// console.log(i, "i");
					if (this.fooddata[i].lid == caiping.lid) {
						this.fooddata[i].num =
							parseInt(this.fooddata[i].num) + parseInt(num);
						// console.log(this.fooddata);
						break;
					}
					if (i == this.fooddata.length - 1) {
						this.fooddata.push(caiping);
					}
				}
			}
			this.totalPrice();
			this.show = false;
		},
		optionSub(e) {
			this.val = parseInt(this.val) - 1;

			if (this.val < 1) {
				this.val = 1;
			}
		},
		optionAdd(e) {
			this.val = parseInt(this.val) + 1;
		},
		optionshow(e) {
			this.val = 1;
			var name = e.currentTarget.dataset.name;
			var price = e.currentTarget.dataset.price;
			// console.log(price);

			var lid = this.lid;
			var buttons = e.currentTarget.parentNode.childNodes;
			// console.log(buttons);
			for (var button of buttons) {
				button.classList.remove("active");
			}
			e.currentTarget.classList.add("active");
			var index = e.currentTarget.dataset.index;
			var butlid = this.lid + "." + index;
			// console.log(butlid);
			// for (var foot of this.fooddata) {
			//   console.log(foot.lid);
			//   if (foot.lid == butlid) {
			//     this.val = foot.num;
			//   }
			// }

			this.price = price;
		},
		totalPrice() {
			// console.log("asf");
			this.totalprice = 0;
			for (var item of this.fooddata) {
				this.totalprice += item.price * item.num;
			}
		},
		transcations() {
			var inputs = document.querySelectorAll("[data-input=input]");
			// console.log(inputs);
			for (var inp of inputs) {
				var lid = inp.dataset.inplid;
				inp.value = "0";

				for (var foot of this.fooddata) {
					// console.log(inp);
					// console.log(inp.lid);
					if (foot.lid == lid) {
						// console.log(inp.value);
						inp.value = foot.num;
						break;
					}
				}
				if (inp.value == 0) {
					var sub = inp.previousSibling;
					inp.classList.add("displaynone");
					sub.classList.add("displaynone");
				}
			}
		},

		gwcsub(e) {
			var foodname = e.currentTarget.dataset.foodname;
			var price = e.currentTarget.dataset.price;
			var lid = e.currentTarget.dataset.lid;
			var num = parseInt(e.currentTarget.dataset.num) - 1;
			e.currentTarget.nextSibling.value = num;
			for (var i in this.fooddata) {
				if (this.fooddata[i].lid == lid) {
					if (num == 0) {
						this.fooddata.splice(i, 1);
						break;
					}
					this.fooddata[i].num = num;
					break;
				}
			}
			this.transcations();
			this.totalPrice();
		},
		gwcadd(e) {
			var foodname = e.currentTarget.dataset.foodname;
			var price = e.currentTarget.dataset.price;
			var lid = e.currentTarget.dataset.lid;
			var num = parseInt(e.currentTarget.dataset.num) + 1;
			e.currentTarget.previousSibling.value = num;
			for (var i in this.fooddata) {
				if (this.fooddata[i].lid == lid) {
					this.fooddata[i].num = num;
					break;
				}
			}
			this.transcations();
			this.totalPrice();
		},
		cleargwc() {
			// console.log("ss");
			this.fooddata = [];
			this.transcations();
			this.showgwc = false;
		},
		showgwcfun(e) {
			if (e.target == e.currentTarget) {
				this.showgwc = false;
			}
		},
		close() {
			this.show = false;
		},
		shows(e) {
			if (e.target == e.currentTarget) {
				this.show = false;
			}
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		addShow(e) {
			var inp = e.currentTarget.previousSibling;
			var sub = e.currentTarget.previousSibling.previousSibling;
			var lid = e.currentTarget.dataset.lid;
			var num = parseInt(e.currentTarget.previousSibling.value) + 1;
			// console.log(num);
			var foodname = e.currentTarget.dataset.foodname;

			var price = e.currentTarget.dataset.price;
			var caiping = { lid, foodname, price, num };
			if (this.fooddata.length == 0) {
				this.fooddata.push(caiping);
			}
			for (var i in this.fooddata) {
				// console.log(i, "i");
				if (this.fooddata[i].lid == caiping.lid) {
					this.fooddata[i].num = num;
					// console.log(this.fooddata);
					break;
				}
				if (i == this.fooddata.length - 1) {
					this.fooddata.push(caiping);
				}
			}
			// console.log(caiping);
			e.currentTarget.previousSibling.value = num;
			// e.currentTarget.previousSibling.value = 5;
			inp.classList.remove("displaynone");
			sub.classList.remove("displaynone");
			this.totalPrice();
		},
		subShow(e) {
			// console.log(this.fooddata);
			var inp = e.currentTarget.nextSibling;
			var sub = e.currentTarget;
			var lid = e.currentTarget.dataset.lid;
			var num = parseInt(e.currentTarget.nextSibling.value) - 1;
			var foodname = e.currentTarget.dataset.foodname;

			var price = e.currentTarget.dataset.price;
			var caiping = { lid, foodname, price, num };
			// console.log(caiping);
			for (var i in this.fooddata) {
				// console.log(i);
				// console.log(num);
				// console.log(this.fooddata[i].lid);
				// console.log(caiping.lid);
				if (this.fooddata[i].lid == caiping.lid) {
					// console.log("沙雕");
					if (num == 0) {
						this.fooddata.splice(i, 1);
						break;
					}
					this.fooddata[i].num = num;
					break;
				}
			}

			e.currentTarget.nextSibling.value = num;
			// e.currentTarget.previousSibling.value = 5;
			if (e.currentTarget.nextSibling.value == 0) {
				inp.classList.add("displaynone");
				sub.classList.add("displaynone");
			}
			this.totalPrice();
		},
		select(e) {
			this.transcations();

			this.show = true;
			this.foodname = e.target.dataset.foodname;
			this.price = e.target.dataset.price;
			this.lid = e.target.dataset.lid;
			// console.log(e.target.dataset.variety);
			// var json = [
			//   { varietyname: "菌汤/三鲜", varietyprice: "78" },
			//   { varietyname: "番茄/三鲜", varietyprice: "68" },
			//   { varietyname: "番茄/菌汤", varietyprice: "70" }
			// ];
			// var jsonstr = JSON.stringify(json);
			// console.log(jsonstr);
			var varietystr = e.target.dataset.variety;
			// console.log(this.variety);
			this.variety = JSON.parse(varietystr);
			// console.log(this.variety);
			// for (var s of this.varietystr) {
			//   console.log(s);
			// }
			this.val = 1;
		},
		noneselect() {
			this.show = false;
		}
	},
	created() {
		// this.axios
		//   .get("/list")
		//   .then(res => {
		//     var obj = res.data;
		//     for (var i of obj) {
		//       this.title = this.title.concat(i.sname);
		//     }
		//   })
		//   .catch(err => {
		//     console.log(err);
		//   });
		/*  */
	},
	mounted() {
		for (var item of this.data) {
			this.indexList.push(item.foodtype);
			// console.log(this.indexList);
		}
	},
	watch: {
		fooddata: function(newVal) {
			this.totalprice = 0;
			for (var item of this.fooddata) {
				this.totalprice += item.price * item.num;
			}
		}
	},
	beforeDestroy() {
		this.bus.$emit("getfooddata", this.fooddata);
	}
}
</script>

<style scoped lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.van-nav-bar,
.van-notice-bar {
	z-index: 99;
}
.menu {
	width: 100%;
	display: flex;
	margin-top: 1rem;
	position: relative;
}
.van-index-bar {
	width: 100%;
	margin-right: 0;
	display: flex;
	justify-content: flex-end;
	text-align: left;
}
::v-deep .van-index-bar__index {
	font-size: 12px;
	line-height: 1.5;
	font-weight: 400;
	text-align: center;
	background: #f8f8f8;
	padding: 10px 5px;
}
::v-deep .van-index-anchor.van-index-anchor--sticky.van-hairline--bottom {
	margin-left: 55px;
	top: 16px;
	display: none;
}
::v-deep .menu-list {
	width: 80%;
	margin-top: -70px;
}
::v-deep .van-index-bar__index--active {
	border-bottom: 2px rgb(88, 155, 235) solid;
	color: black;
	background: #fff;
}
::v-deep .van-index-bar__sidebar {
	height: 100%;
	width: 20%;
	left: 0;
	top: 5.5rem;
	transform: translateY(0);
}
::v-deep .van-index-anchor {
	background: #f8f8f8;
}
.layout {
	width: 70%;
	height: 4rem;
	margin-left: 0.2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: 10px;
}
.title {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.bottom {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}
.van-cell__value {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}
img {
	width: 4rem;
	height: 4rem;
}
.kg {
	height: 50px;
}
.cd {
	margin-top: 50px;
}
.add {
	display: inline-block;
	width: 20px;
	height: 20px;
	background: #1989fa;
	border-radius: 50%;
	border: none;
	vertical-align: middle;
	margin-bottom: 2px;
	color: #fff;
	line-height: 20px;
	font-size: 18px;
}
.sub {
	display: inline-block;
	width: 20px;
	height: 20px;
	background: #fff;
	border-radius: 50%;
	border: 2px #ddd solid;
	vertical-align: middle;
	margin-bottom: 2px;
	line-height: px;
	font-size: 18px;
}
.sub > div {
	background: #1989fa;
	width: 10px;
	height: 2px;
	margin: 0 auto;
}
.count {
	width: 20px;
	font-size: 12px;
	border: none;
	text-align: center;
}
.select {
	display: inline-block;
	width: 60px;
	height: 20px;
	background: #1989fa;
	border-radius: 10px;
	border: none;
	vertical-align: middle;
	margin-bottom: 2px;
	color: #fff;
	line-height: 20px;
	font-size: 12px;
}
.displaynone {
	display: none !important;
}

::v-deep .van-overlay {
	background-image: url("~assets/img/takeout/hsbg.png");
	background-color: transparent;

	background-size: 100% 100%;
}

.dangbang {
	width: 100%;
	height: 50px;
	// background: #afa;
}
::v-deep .van-nav-bar__title.van-ellipsis {
	margin: 0 auto;
}
::v-deep .van-goods-action {
	background: transparent;
	z-index: 1000 !important;
}
::v-deep .van-popup--bottom.van-popup--round {
	margin-bottom: 40px !important;
}
::v-deep .van-overlay {
	z-index: 400 !important;
}
.gwc {
	width: 100%;
	height: 50px;
	background: -webkit-linear-gradient(
		top,
		transparent 0%,
		transparent 20%,
		#4d4d4d 21%,
		#4d4d4d 100%
	);
	padding: 0 10px;
	text-align: left;
}

.gwcgj {
	width: 48px;
	height: 48px;
	box-sizing: border-box;
	border: none;
	background: url("~assets/img/takeout/gwc2.png");
	background-size: 48px 48px;
	border-radius: 50%;
	border: 3px solid #2d2d2d;
	background-position: -3px -3px;
	float: left;
	margin-bottom: 3px;
}
.activegwcbj {
	background: url("~assets/img/takeout/gwc.png");
	background-size: 48px 48px;
	background-position: -3px -3px;
	vertical-align: middle;
}
.dispatching,
.gwck {
	color: #fff;
	font-size: 12px;
	padding-bottom: 10px;
	float: right;
	margin-top: 25px;
}
.gwck {
	float: left;
	margin-left: 20px;
}
.prices {
	float: left;
	margin-left: 20px;
	margin-top: 14px;
}
.prices > .zj {
	font-size: 16px;
	color: #fff;
	font-weight: bold;
	line-height: 14px;
}
.prices > .psf {
	margin-top: 5px;
	font-size: 12px;
	color: #ddd;
}
.okgwc {
	height: 40px;
	width: 100px;
	font-size: 16px;
	color: #fff;
	font-weight: bold;
	margin-top: 10px;
	margin-right: -10px;
	float: right;
	background: -webkit-linear-gradient(right, #4cafea 0%, #3e76e5 100%);
	border: none;
}
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.block {
	width: 90%;
	height: 300px;
	border-radius: 10px;
	background-color: #fff;
	position: relative;
	overflow: hidden;
}
.block > .foodname {
	display: inline-block;
	font-size: 16px;
	padding: 10px;
}
.block > .foodname > .price {
	color: red;
	margin-left: 5px;
}
.block > .close {
	width: 30px;
	height: 30px;
	font-size: 30px;
	color: #9d9d9d;
	float: right;
	margin: 5px 0 0 0;
}
.block > .group {
	font-size: 14px;
	margin-left: 10px;
}
.block > .options {
	padding: 0 10px;
}
.block > .options > .option {
	display: inline-block;
	width: 80px;
	border: 1px solid #ddd;
	font-size: 12px;
	background: transparent;
	border-radius: 5px;
	margin-right: 6px;
}
.block > .options > .option.active {
	border: 1px solid #1989fa;
	color: #1989fa;
}
.block > .bottoms {
	border-top: 1px solid #ddd;
	position: absolute;
	bottom: 0px;
	display: flex;
	justify-content: space-between;
	width: 100%;
}
.block > .bottoms > .tj {
	padding: 5px;
}
.block > .bottoms > .addgwc {
	float: right;
}
.okgwc.addgwc {
	margin: 0;
}
.wrappergwc {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	position: relative;
}
.blockgwc {
	width: 100%;
	background-color: #fff;
	position: absolute;
	bottom: 40px;
	overflow: hidden;
}
.blockgwc > .tab {
	height: 30px;
	background: #ddd;
	border-bottom: 1px #d3d3d3 solid;
	display: flex;
	justify-content: space-between;
}
.blockgwc > .tab > .gouwuche {
	font-size: 14px;
	font-weight: bold;
	margin-top: 10px;
}
.blockgwc > .tab > .gouwuche > em {
	margin: 0 10px;
	display: inline-block;
	width: 4px;
	height: 15px;
	background: #1989fa;
	border-radius: 2px;
	vertical-align: top;
}
.blockgwc > .tab > .cleargwc {
	margin-top: 3px;
	display: inline-block;
	background: transparent;
	border: none;
	font-size: 10px;
	color: #4d4d4d;
}
.blockgwc > .tab > .cleargwc > .ljt {
	display: inline-block;
	width: 14px;
	height: 14px;
	background: url("~assets/img/takeout/ljt.png");
	background-size: 14px 14px;
	vertical-align: middle;
}
.blockgwc > .footkind {
	width: 100%;
	padding: 10px;
	display: flex;
	justify-content: space-between;
}
.blockgwc > .footkind > .left {
	font-size: 12px;
	padding-top: 5px;
}
.blockgwc > .footkind > .right {
	display: flex;
}
.blockgwc > .footkind > .right > .price {
	font-size: 14px;
	color: red;
	padding-top: 3px;
	margin-right: 10px;
	font-weight: bold;
}
::v-deep .van-cell__value.van-cell__value--alone {
	margin: 10px;
}
</style>

