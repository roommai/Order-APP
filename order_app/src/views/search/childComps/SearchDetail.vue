<template>
	<div class="soical">
		<div v-for="(item, i) of posts" :key="i" class="content">
			<div>
				<img :src="serverBaseURL + item.user_img" alt="" class="tx" />
			</div>
			<div>
				<van-row type="flex" justify="space-between">
					<van-col span="16">
						<van-row type="flex">
							<van-col span="18">
								<div class="nichen">
									{{ item.uname }}
									<em class="xz"></em>
								</div>
							</van-col>
						</van-row>
					</van-col>
				</van-row>
				<p class="say">
					<a href="#">#{{ item.label }}#</a>{{ item.content }}
				</p>
				<div class="tp">
					<van-image
						width="3rem"
						height="3rem"
						fit="cover"
						v-for="(img, index) of JSON.parse(item.images)"
						:key="index"
						:src="serverBaseURL + img"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	props: {
		posts: { default: Array }
	},
	data() {
		return {
			show: false,
			userSay: [
				{
					headPhoto: "assets/img/community/tx1.jpg",
					nickname: "Hi_小芋头",
					hydj: "1",
					jhss: "寻找同城捞友",
					ss: "有木有长春的小伙伴啊?不想一个人吃啊！",
					msimg: [
						"assets/img/community/ms1.jpg",
						"assets/img/community/ms2.jpg",
						"assets/img/community/ms3.jpg",
						"assets/img/community/ms4.jpg",
						"assets/img/community/ms5.jpg",
						"assets/img/community/ms6.jpg",
						"assets/img/community/ms7.jpg"
					]
				},
				{
					headPhoto: "assets/img/community/tx1.jpg",
					nickname: "Hi_小芋头",
					hydj: "1",
					jhss: "寻找同城捞友",
					ss: "有木有长春的小伙伴啊?不想一个人吃啊！",
					msimg: [
						"assets/img/community/ms1.jpg",
						"assets/img/community/ms2.jpg",
						"assets/img/community/ms3.jpg",
						"assets/img/community/ms4.jpg",
						"assets/img/community/ms5.jpg",
						"assets/img/community/ms6.jpg",
						"assets/img/community/ms7.jpg"
					]
				}
			]
		};
	},
	computed: {
		...mapState(["serverBaseURL"])
	},
	created() {
	}
};
</script>
<style scoped>
.soical {
	margin-top: 10px;
	padding: 10px;
	background: #fff;
}

.content {
	display: flex;
	justify-content: space-around;
}
.tp::after {
	content: "";
	display: inline-block;
	width: 100%;
	height: 0.5px;
	background: #f0eeee;
}
.content ~ .content {
	margin-top: 10px;
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

.publish {
	display: inline;
	font-size: 10px;
	color: #9a9a9a;
	line-height: 16px;
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
</style>
