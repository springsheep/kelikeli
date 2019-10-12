import Vue from 'vue'
import Router from 'vue-router'
import yidu_homepage from '../components/yidu_homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:yidu_homepage},
    {path:'/yidu_homepage',component:yidu_homepage}
  ]
})
