// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import lrz from 'lrz'
import wx from '../config/wx'
import router from './router'
import 'swiper/dist/css/swiper.css';
import store from '../store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入全部组件
import Mint from 'mint-ui';

import vant from 'vant'
// import 'vant/lib/vant-css/index.css'
Vue.use(vant)
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);
//引入animate动画
import 'animate';

import 'mint-ui/lib/style.css'
import App from './App'
Vue.use(Mint);
import 'vant/lib/index.css';
// 引用
//后台接口的配置
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

import axios from 'axios'
axios.defaults.baseURL =wx.baseURL ;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
