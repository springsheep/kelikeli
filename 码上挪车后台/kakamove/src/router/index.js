import Vue from 'vue'
import Router from 'vue-router'
import kaka_Activity from "../components/kaka_Activity";
import kaka_Data from "../components/kaka_Data";
import kaka_UserManager from "../components/kaka_UserManager";
import kaka_CostManager from "../components/kaka_CostManager";
import kaka_import from "../components/kaka_import";
import kaka_replace from "../components/kaka_replace";
import kaka_Number from "../components/kaka_Number";
import kaka_Login from "../components/kaka_Login";
import kaka_home from '../components/kaka_home'
import kaka_generation_manager from '../components/kaka_generation_manager'
import kaka_fenzhi from "../components/kaka_fenzhi";
import kaka_BasicInfo from "../components/kaka_PersonCenter/kaka_BasicInfo";
import kaka_ChangePassword from "../components/kaka_PersonCenter/kaka_ChangePassword";
import kaka_ServiceConfiguration from "../components/kaka_ServiceConfiguration";
import kaka_renewinsurance from "../components/kaka_renewinsurance";
import kaka_addserver from "../components/kaka_addserver";
import kaka_rbac from "../components/kaka_rbac";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: kaka_Login},//路由重定向
    {path: '/login', component: kaka_Login},
    {
      path: '/Home', component: kaka_home,
      children: [
        {path: '/Home', redirect: `/activity`, meta: {requireAuth: true}},//二级路由重定向
        {path: '/activity', component: kaka_Activity, meta: {requireAuth: true}},//活动页面
        {path: '/Data', component: kaka_Data, meta: {requireAuth: true}},//数据统计
        {path: '/kaka_ServiceConfiguration', component: kaka_ServiceConfiguration, meta: {requireAuth: true}},//数据统计
        {path: '/kaka_renewinsurance', component: kaka_renewinsurance, meta: {requireAuth: true}},//一键续保
        {path: '/kaka_addserver', component: kaka_addserver, meta: {requireAuth: true}},//增值服务
        {path: '/UserManager', component: kaka_UserManager, meta: {requireAuth: true}},//用户管理
        {path: '/CostManager', component: kaka_CostManager, meta: {requireAuth: true}},//费用管理
        {path: '/Import', component: kaka_import, meta: {requireAuth: true}},//批量导入
        {path: '/Repalce', component: kaka_replace, meta: {requireAuth: true}},//模版替换
        {path: '/Number', component: kaka_Number, meta: {requireAuth: true}},
        {path: '/fenzhi', component: kaka_fenzhi, meta: {requireAuth: true}},//组织分支0
        {path: '/PM', component: kaka_generation_manager, meta: {requireAuth: true}},//生成管理
        {path: '/BasicInfo', component: kaka_BasicInfo, meta: {requireAuth: true}},//个人中心的基本信息
        {path: '/ChangePassword', component: kaka_ChangePassword, meta: {requireAuth: true}},//修改密码
        {path: '/kaka_role', component: kaka_rbac, meta: {requireAuth: true}},//修改密码

      ],
      meta: {
        requireAuth: true//表示该路由需要登陆
      }
    },
  ]
})
