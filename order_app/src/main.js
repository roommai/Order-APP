import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(Vant);
Vue.config.productionTip = false;

Vue.prototype.bus = new Vue();

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
  if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('token')) {  // 判断当前用户的登录信息loginInfo是否存在
      next();
    } else {
      next({
        path: '/login'
      })
    }
  }else {
    next();
  }
  next()
})
 

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
