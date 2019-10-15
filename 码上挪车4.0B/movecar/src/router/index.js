import Vue from 'vue'
import Router from 'vue-router'
import wx from "../../config/wx";
import store from '../../store/index'
import {Indicator} from 'mint-ui';
//注册
import Index from "../components/Index";
import kaka_home1 from '../components/kaka_fourEdition/kaka_home1'
import kaka_concernWx from '../components/kaka_register/kaka_concernWx'//微信绑定
import kaka_bindCar from '../components/kaka_register/kaka_bindCar'//绑定
import kaka_askmove from '../components/kaka_askmove'//申请挪车
import kaka_buypicc from '../components/kaka_buypicc'//低价购买车险
import kaka_moreservice from '../components/kaka_moreservice'//更多服务
import kaka_RiskReport from '../components/kaka_RiskReport'//出险
import kaka_addedservices from '../components/kaka_addedservices'//增值服务
import kaka_Roadassistance from '../components/kaka_Roadassistance'//高速救援
import kaka_RoadassistanceInfo from '../components/kaka_RoadassistanceInfo'//高速救援点击进去详情
import kaka_ElectronicPolicy from '../components/kaka_ElectronicPolicy'//电子保单
import kaka_mymao from '../components/kaka_mymao'//维修推荐
import kaka_VehicleBrand from '../components/kaka_VehicleBrand'//车辆品牌
import kaka_carbrand from '../components/kaka_carbrand'//车辆型号
import kaka_carBrandkind from '../components/kaka_carBrandkind'//车辆种类
import kaka_addresspicker from '../components/kaka_addresspicker'//车辆种类
import kaka_VoiceFairyTales from '../components/kaka_VoiceFairyTales'//车辆种类
import kaka_VehicleownerWechat from '../components/kaka_VehicleownerWechat'//车主微信界面
import kaka_Electronicdocuments from '../components/kaka_Electronicdocuments'//电子证件
import kaka_license from '../components/kaka_license'//电子行驶证
import kaka_Driverlicense from '../components/kaka_Driverlicense'//电子驾驶证
import kaka_movecarmodule from '../components/kaka_movecarmodule'//挪车码模版
import kaka_activity from '../components/kaka_activity'//活动
import kaka_EmergencyAlarm from '../components/kaka_EmergencyAlarm'//急救报警
import kaka_intomovecar from '../components/kaka_intomovecar'//进入挪车
import kaka_applyphone from '../components/kaka_applyphone'//呼叫申请
import kaka_phone from '../components/kaka_phone'//申请呼叫
import kaka_chart from '../components/kaka_chart'//微信聊天
import kaka_mycenter from '../components/kaka_mycenter'//我的挪车码
import kaka_feedback from '../components/kaka_feedback'//反馈留言
import kaka_CarMovingRecord from '../components/kaka_CarMovingRecord'//挪车记录
import kaka_changebinding from '../components/kaka_changebinding'//挪车记录
import kaka_changeinfo from '../components/kaka_changeinfo'//更改
import kaka_crowd_funding from '../components/kaka_crowd_funding'//众筹
import kaka_settime from '../components/kaka_settime'//设置妨碍骚扰的时间
import axios from 'axios'

Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/index', component: Index},
    {path: '/kaka_home1', component: kaka_home1, meta: {index: 0.1},},
    {path: '/akaconcernWx', component: kaka_concernWx, meta: {index: 0.3},},
    {path: '/kaka_bindCar', component: kaka_bindCar, meta: {index: 0.2},},
    {path: '/kaka_askmove', component: kaka_askmove, meta: {index: 2, title: '申请挪车码'}},
    {path: '/kaka_mycenter', component: kaka_mycenter, meta: {index: 2, title: '我的挪车码'}},
    {path: '/kaka_feedback', component: kaka_feedback, meta: {index: 2.1, title: '意见反馈'}},
    {path: '/kaka_CarMovingRecord', component: kaka_CarMovingRecord, meta: {index: 2.2, title: '挪车记录'}},
    {path: '/kaka_settime', component: kaka_settime, meta: {index: 2.3, title: '防骚扰设置'}},
    {path: '/kaka_changeinfo', component: kaka_changeinfo, meta: {index: 2.4, title: '更改信息'}},

    {path: '/kaka_changebinding', component: kaka_changebinding, meta: {index: 2.3, title: '我的爱车'}},
    {path: '/kaka_VehicleBrand', component: kaka_VehicleBrand, meta: {index: 2.1, title: '选择车型品牌'}},
    {path: '/kaka_carbrand', component: kaka_carbrand, meta: {index: 2.11, title: '选择车辆型号'}},
    {path: '/kaka_carBrandkind', component: kaka_carBrandkind, meta: {index: 2.111, title: '选择车辆种类'}},
    {path: '/kaka_addresspicker', component: kaka_addresspicker, meta: {index: 11, title: '选择地址'}},
    {path: '/kaka_VoiceFairyTales', component: kaka_VoiceFairyTales, meta: {index: 12, title: '语音通话'}},
    {
      path: '/kaka_VehicleownerWechat/:code/:openId',
      name: 'chart',
      component: kaka_VehicleownerWechat,
      meta: {index: 100, title: '被挡人'}
    },
    {path: '/kaka_crowd_funding', component: kaka_crowd_funding, meta: {index: 7.1, title: '众筹平台'}},
    {path: '/kaka_movecarmodule', component: kaka_movecarmodule, meta: {index: 2.1, title: '更改主题'}},
    {path: '/kaka_buypicc', component: kaka_buypicc, meta: {index: 6}},
    {path: '/kaka_moreservice', component: kaka_moreservice, meta: {index: 7, title: '更多服务'}},
    {path: '/kaka_RiskReport', component: kaka_RiskReport, meta: {index: 7.1, title: '出险报案'}},
    {path: '/kaka_EmergencyAlarm', component: kaka_EmergencyAlarm, meta: {index: 7.2, title: '急救报警'}},
    {path: '/kaka_activity', component: kaka_activity, meta: {index: 7.3, title: '专题活动'}},
    {path: '/kaka_addedservices', component: kaka_addedservices, meta: {index: 7.4, title: '增值服务'}},
    {path: '/kaka_Roadassistance', component: kaka_Roadassistance, meta: {index: 7.5, title: '道路救援'}},
    {path: '/kaka_Electronicdocuments', component: kaka_Electronicdocuments, meta: {index: 7.6, title: '电子证件'}},
    {path: '/kaka_license', component: kaka_license, meta: {index: 7.7}},
    {path: '/kaka_Driverlicense', component: kaka_Driverlicense, meta: {index: 7.7}},
    {path: '/kaka_RoadassistanceInfo', component: kaka_RoadassistanceInfo, meta: {index: 7.51}},
    {path: '/kaka_ElectronicPolicy', component: kaka_ElectronicPolicy, meta: {index: 7.81, title: '电子保单'}},
    {path: '/kaka_mymao', component: kaka_mymao, meta: {index: 7.82}},
    {path: '/kaka_intomovecar', component: kaka_intomovecar, meta: {index: 1.5, title: '选择挪车方式'}},
    {path: '/kaka_applyphone', component: kaka_applyphone, meta: {index: 5, title: '委托申请'}},
    {path: '/kaka_phone', component: kaka_phone, meta: {index: 3, title: '呼叫申请'}},
    {path: '/kaka_chart/:code/:openId', name: 'chart1', component: kaka_chart, meta: {index: 4, title: '车主'}},
  ]
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('openId') != undefined) {
    var openid = sessionStorage.getItem('openId');
  }
  if (to.path == '/index') {
    console.log(to)
    if (to.query.organizationId === undefined) {
      sessionStorage.setItem('organizationId', '')
    } else {
      sessionStorage.setItem('organizationId', to.query.organizationId)
    }
    console.log(sessionStorage.getItem('organizationId'),'组织机构ID')
    Indicator.open({
      text: '码上挪车欢迎您',
      spinnerType: 'fading-circle'
    });
    let code = getUrlKey("code");
    if (!code) {
      getCodeApi();
    } else {
      axios.post('/moveCarB/moveCarQrCodeInit', {
        "wxCode": code,
        "openId": openid
      }).then((res) => {
        Indicator.close();
        if (res.data.state == '1') {
          console.log(res.data.data)
          sessionStorage.setItem('openId', res.data.data.openId)
          sessionStorage.setItem('copyrightEn', res.data.data.copyrightEn==null?'':res.data.data.copyrightEn)
          sessionStorage.setItem('copyrightZh', res.data.data.copyrightZh==null?'':res.data.data.copyrightZh)
          store.state.isBind = res.data.data.isBind
          next('/kaka_home1')

        }
      }).catch((error) => {
        Indicator.close();
      })
    }
  }
  if (to.path === '/kaka_moreservice') {
    if (to.query.organizationId === undefined) {
      sessionStorage.setItem('organizationId', '')
    } else {
      sessionStorage.setItem('organizationId', to.query.organizationId)
    }
    console.log(sessionStorage.getItem('organizationId'),'组织机构ID')
    next()
  }
  if (to.path == '/kaka_askmove') {
    let code = getUrlKey("code");
    if (!code) {
      getCodeApi();
    } else {
      axios.post('/moveCarB/moveCarQrCodeInit', {
        "wxCode": code,
        "openId": openid
      }).then((res) => {
        if (res.data.state == '1') {
          console.log(res.data.data)
          sessionStorage.setItem('openId', res.data.data.openId)
          sessionStorage.setItem('copyrightEn', res.data.data.copyrightEn==null?'':res.data.data.copyrightEn)
          sessionStorage.setItem('copyrightZh', res.data.data.copyrightZh==null?'':res.data.data.copyrightZh)
          sessionStorage.getItem("copyrightEn")

        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  //个人中心
  if (to.path == '/kaka_mycenter') {
    let code = getUrlKey("code");
    if (!code) {
      getCodeApi();
    } else {
      axios.post('user/personalCenterInit', {
        "wxCode": code,
        "openId": openid
      }).then((res) => {
        if (res.data.state == '1') {

          sessionStorage.setItem('personInfo', JSON.stringify(res.data.data))
          sessionStorage.setItem('openId', res.data.data.openId)

        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  function getCodeApi() {
    let urlNow = encodeURIComponent(window.location.href);
    let scope = wx.scope_userinfo;
    let appid = wx.appid;
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}`;
    window.location.href = url;
  }

  function getUrlKey(name) {//获取url 参数
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }

  next()
});

export default router;
