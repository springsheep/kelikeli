// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'
import router from './router'
import postHttp from "./utils/request";

Vue.prototype.$axios = axios
Vue.prototype.$postHttp = postHttp
Vue.use(ElementUI);
Vue.use(Vuex);


axios.defaults.baseURL = 'https://test.kelibbb.com/move_car/';
// axios.defaults.baseURL = 'http://192.168.123.124:6080';

// axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = '/api/'  // api 即上面 vue.config.js 中配置的地址


import store from '../src/store/index'

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token');//获取本地存储的token
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token != "" && store.state.token != undefined && store.state.token != null) {
      // 通过vuex state获取当前的token是否存
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
