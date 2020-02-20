<template>
<div>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) of items" :key="i">
        <div class="imgs"><img :src="item.image"  alt=""></div>
        <div class="fonts">{{item.sname}}</div>
      </div>        
    </div>
  </div>
</div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper";

//如果你初始化时没有定义Swiper实例，后面也可以通过Swiper的HTML元素来获取该实例

export default {
  data() {
    return {
      items: [
        { image: require("assets/img/community/icon_tb1.png"), sname: "海捞天地" },
        { image: require("assets/img/community/icon_tb2.png"), sname: "讨论专区" },
        { image: require("assets/img/community/icon_tb3.png"), sname: "投诉表扬" },
        { image: require("assets/img/community/icon_tb4.png"), sname: "最新活动" },
        { image: require("assets/img/community/icon_tb5.png"), sname: "短视频" },
        { image: require("assets/img/community/icon_tb6.png"), sname: "互助专区" }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 4.7,
      slidesPerGroup: 1,
      freeMode: true
    });
  }
};
</script>
<style scoped>
.swiper-container {
  padding: 15px 0;
  box-shadow: 0px 5px 5px #ece9e9;
}
/* .swiper-container:befor {
  content: "";
  display: table;
}
.swiper-container:after {
  display: block;
  content: "";
  clear: both;
  height: 0;
  overflow: hidden;
} */
.imgs {
  text-align: center;
}
.imgs > img {
  width: 56px;
}
.fonts {
  font-size: 10px;
  text-align: center;
}
</style>


