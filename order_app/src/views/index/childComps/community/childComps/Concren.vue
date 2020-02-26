<template>
	<div class="soical">
		<van-list
			v-model="loading"
			:finished="finished"
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<div v-for="(item, i) in posts" :key="i">
				<van-row type="flex" justify="space-between">
					<van-col span="16">
						<van-row type="flex">
							<van-col span="6">
								<img :src="serverBaseURL + item.user_img" alt="" class="tx" />
							</van-col>
							<van-col span="18">
								<div class="nichen">{{ item.uname }}<em class="xz"></em></div>
								<div class="gxqm">{{ item.say }}</div>
							</van-col>
						</van-row>
					</van-col>
					<van-col span="8">
						<button type="primary" @click="alertMenu" class="fx">···</button>

						<van-action-sheet
							v-model="show"
							:actions="actions"
							cancel-text="取消"
							@select="onSelect"
						/>
					</van-col>
				</van-row>
				<!-- <p class="say">
					<a href="#">#{{ item.label }}#</a>{{ item.content }}
				</p>
				<div class="tp">
					<van-image
						width="6rem"
						height="6rem"
						fit="cover"
						v-for="(img, index) of JSON.parse(item.images)"
						:key="index"
						:src="serverBaseURL + img"
					/>
				</div>
				<van-row type="flex" justify="space-between" class="buttoms">
					<van-col span="16">
						<div>
							<van-col span="8.5">
								<p class="publish">
									发布于 星期{{ changeChinese(item.post_time) }}
								</p>
							</van-col>
							<van-col span="10" offset="1">
								<p class="from">
									来自 <span class="new">{{ item.origin }}</span>
								</p>
							</van-col>
						</div>
					</van-col>
					<van-col span="0" class="dzpl">
						<a href="#"></a> <span>{{ item.comments }}</span>
						<em @click="like"></em><span>{{ item.likes }}</span>
					</van-col>
				</van-row> -->
				<hr />
			</div>
		</van-list>
	</div>
</template>
<script>
import { mapState } from "vuex";
import { getmyfollow} from 'network/community';
export default {
	data() {
		return {
			//上拉加载更多组件数据
			posts: [], //循环的数据
			loading: false, //是否在加载状态
			finished: false, //是否全部加载完成
			pageNumber: 1, //页数
			pageSize: 5, //每页加载数量
			error: false, //是否加载失败
			//=========================
			show: false,
			actions: [{ name: "收藏" }, { name: "举报" }]
		};
	},
	methods: {
		//上拉加载更多
		onLoad() {
			// console.log("执行一次上拉");
			// console.log(this.pageNumber);
			// console.log(this.pageSize);
			// 异步更新数据
			setTimeout(() => {
				const pageNumber = (this.pageNumber-1) * this.pageSize;
				const pageSize = this.pageSize
				getmyfollow(pageNumber,pageSize).then(res=>{

					if (res.code > 0) {
						this.posts = this.posts.concat(res.result);
						this.loading = false;
						this.pageNumber++;
					console.log(this.posts)						
					} else {
						this.finished = true;
					}
				})
			// 	this.$api
			// 		.myFollow({
			// 			pageNumber: (this.pageNumber - 1) * this.pageSize,
			// 			pageSize: this.pageSize
			// 		})
			// 		.then(res => {
			// 			if (res.data.code > 0) {
			// 				this.posts = this.posts.concat(res.data.result);
			// 				this.loading = false;
			// 				this.pageNumber++;
			// 				// console.log(this.posts);
			// 			} else {
			// 				this.finished = true;
			// 			}
			// 			//改变pageNumber ++
			// 		})
			// 		.catch(err => {
			// 			this.error = true;
			// 		});
			}, 1000);
		},
		changeChinese(time) {
			switch (new Date(time).getDay()) {
				case 0:
					return "日";
					break;
				case 1:
					return "一";
					break;
				case 2:
					return "二";
					break;
				case 3:
					return "三";
					break;
				case 4:
					return "四";
					break;
				case 5:
					return "五";
					break;
				case 6:
					return "六";
			}
		},
		alertMenu() {
			this.show = true;
		},
		onSelect(item) {
			// 默认情况下，点击选项时不会自动关闭菜单
			// 可以通过 close-on-click-action 属性开启自动关闭
			this.show = false;
			this.$toast(item.name);
		},

		like(e) {
			var num = parseInt(e.target.nextSibling.innerHTML);
			if (e.target.getAttribute("class") !== "active") {
				e.target.nextSibling.innerHTML = num + 1;
				e.target.classList.add("active");
			} else {
				e.target.classList.remove("active");
				e.target.nextSibling.innerHTML = num - 1;
			}
		}
	},
	computed: {
		...mapState(["serverBaseURL", "bool"])
	},
	created() {
		// this.$api
		// 	.getNewPosts({ pageNumber: 0, pageSize: 5 })
		// 	.then(res => {
		// 		this.posts = res.data.result;
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
};
</script>
<style scoped>
.soical {
	margin-top: 30px;
	padding: 10px;
}
.nichen {
	text-align: left;
	font-size: 13px;
}
.gxqm {
	margin-top: 8px;
	text-align: left;
	font-size: 10px;
	color: #9a9a9a;
}
.xz {
	display: inline-block;
	width: 13px;
	height: 14.5px;
	background: url(~assets/img/community/search_golden_icon.png);
	background-size: 100% 100%;
	vertical-align: middle;
	margin-left: 5px;
}
.gz {
	float: right;
	background: #fff;
	border-radius: 50px;
	border: 1px solid #c97d7f;
	font-size: 10px;
	color: #e70012;
	width: 51px;
	height: 24px;
	box-sizing: border-box;
}
.fx {
	float: right;
	font-size: 10px;
	color: #e70012;
	font-weight: 1000;
	border: none;
	letter-spacing: 3px;
	height: 24px;
	background: transparent;
}
.tx {
	width: 40px;
	border-radius: 50%;
	margin-right: 10px;
}
.say {
	margin: 10px 0;
	font-size: 13px;
	text-align: left;
	line-height: 17px;
}
a {
	font-size: 13px;
	color: #e70012;
}
.tp {
	width: 100%;
	text-align: left;
}
.tp > div {
	margin-right: 4px;
}
.publish,
.from {
	height: 16px;
	text-align: left;
	font-size: 10px;
	color: #9a9a9a;
	line-height: 16px;
}
.new {
	color: #ffb012;
}

.dzpl > a {
	display: inline-block;
	width: 16px;
	height: 16px;
	background: url(~assets/img/community/icon_10.png);
	background-size: 100% 100%;
	vertical-align: middle;
}
.dzpl > em {
	cursor: pointer;
	margin-left: 10px;
	display: inline-block;
	width: 16px;
	height: 16px;
	background-image: url(~assets/img/community/icon_13.png);
	background-size: 100% 100%;
	vertical-align: middle;
}
.dzpl > em.active {
	background-image: url(~assets/img/community/icon_21.png);
}
.dzpl > span {
	font-size: 10px;
	color: #9a9a9a;
}
hr {
	border: 1px solid #f1f1f1;
}
.buttoms {
	margin-top: 10px;
}
.van-col {
	text-align: left;
}
</style>
