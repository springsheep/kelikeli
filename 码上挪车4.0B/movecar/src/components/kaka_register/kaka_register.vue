<template>
  <div class="content">
    <!--公共头部-->
    <!--<Kaka_register_commonheader></Kaka_register_commonheader>-->
    <div style="width: 100%;text-align: center">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
  import Kaka_register_commonheader from "./kaka_register_commonheader";
  import wx from "../../../config/wx";

  export default {
    name: "kaka_register",
    components: {Kaka_register_commonheader},
    created() {
      // let code = this.getUrlKey("code");
      // if (code) {
      //   // this.getNewsInfo(code);
      //   this.code = code;
      // } else {
      //   this.getCodeApi();
      // }
    },
    methods: {
      // // 页面初始化
      // getNewsInfo(code) {
      //
      //   let openid = '';
      //   const data = {
      //     "qrCode": 'aGdpYzc3NzgwMDAwMDE=',
      //     "wxCode": code,
      //     "openId": openid
      //   };
      //   const options = {
      //     method: 'POST',
      //     headers: {'content-type': 'application/json'},
      //     data: data,
      //     url: 'moveCar/moveCarQrCodeInit'
      //   };
      //   this.axios(options).then((response) => {
      //     if(response.data.state=='1'){
      //       sessionStorage.setItem('openId',response.data.openId)
      //     }
      //   }).catch(function (error) {
      //   });
      // },
      // getCodeApi() {//获取code
      //   let urlNow = encodeURIComponent(window.location.href);
      //   let scope = wx.scope_baseinfo;
      //   let appid = wx.appid;
      //   let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}`;
      //   window.location.href = url;
      // },
      // getUrlKey(name) {//获取url 参数
      //   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      //
      // },
    },data(){
      return{
        transitionName:''
      }
    },watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      }
    },
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
  }

  footer div {
    width: 100%;
    font-size: .383rem;
    color: #999999;
    text-align: center;
    font-weight: 300;

  }

  footer {
    width: 100%;
    margin-top: .64rem;
    margin-bottom: .2rem;
  }


</style>
