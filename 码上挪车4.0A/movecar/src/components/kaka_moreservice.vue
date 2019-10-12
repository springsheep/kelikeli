<template>
  <div class="content">
    <div class="top">
      <div class="title">
        保险服务
      </div>
      <div v-for="(item,index) in insuranceServiceList" class="sever"
           @click.prevent="moveend(index,item)" ref="p1">
        <div class="img"><img :src="item.icon" alt=""></div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="top1" style="">
      <div class="title">
        用车服务
      </div>
      <div v-for="(item,index) in useCarServiceList" class="sever"
           @click.prevent="moveend(index,item)" ref="p1">
        <div class="img"><img :src="item.icon" alt=""></div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import wx from '../../config/wx'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_moreservice",
    data() {
      return {
        qrcode: null,
        organizationId: null,
        openId: null,
        insuranceServiceList: null,
        useCarServiceList: null
      }
    },
    mounted() {
      if (sessionStorage.getItem('openId') != undefined) {
        var openid = sessionStorage.getItem('openId');
        this.openId = sessionStorage.getItem('openId');
      }
      let code = this.getUrlKey("code");
      if (!code) {
        this.getCodeApi();
      } else {
        this.axios.post('/moveCar/moveCarQrCodeInit', {
          "qrCode": sessionStorage.getItem('qrcode'),
          "wxCode": code,
          "openId": openid
        }).then((res) => {
          if (res.data.state == '1') {
            console.log(res.data)
            sessionStorage.setItem('openId', res.data.data.openId)
            this.openId = res.data.data.openId
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      if (sessionStorage.getItem('organizationId') === '1') {
        //从路由进入
        this.qrcode = sessionStorage.getItem('qrcode')
        this.getinfo()
      } else {
        this.organizationId = sessionStorage.getItem('organizationId')
        //从链接进入
        this.getinfo1()
      }
    },
    methods: {
      getCodeApi() {
        let urlNow = encodeURIComponent(window.location.href);
        let scope = wx.scope_userinfo;
        let appid = wx.appid;
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}`;
        window.location.href = url;
      },

      getUrlKey(name) {//获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      //从路由进入
      getinfo() {
        console.log(this.qrCode,'二维码')
        this.axios.post('moveCar/getMoreServiceList', {
          "openId": this.openId,
          "qrCode": this.qrCode,
        }).then((res) => {
          if (res.data.state == 1) {

            this.insuranceServiceList = res.data.data.insuranceServiceList;
            this.useCarServiceList = res.data.data.useCarServiceList;
          }
        })
      },
      //从链接进入
      getinfo1() {
        console.log(this.organizationId,'组织机构id')
        this.axios.post('moveCar/getMoreServiceList', {
          "openId": this.openId,
          "organizationId": this.organizationId,
        }).then((res) => {
          if (res.data.state == 1) {
            this.insuranceServiceList = res.data.data.insuranceServiceList;
            this.useCarServiceList = res.data.data.useCarServiceList;
          }
        })
      },
      moveend(index, item) {
        if (item.is_enable === '0') {
          Toast({
            message: '敬请期待...',
            duration: 800
          })
        } else {
          if (item.is_external_url === '1') {
            window.location.href = item.url
          } else if (item.is_external_url === '0') {
            this.$router.push({path: `${item.url}`})
          }
        }

      }

    }
  }
</script>

<style scoped lang="scss">
  .content {
    background: #FFFFFF;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .name {
    width: 100%;
    text-align: center;
    font-size: .6rem;
    font-weight: 400;
    margin-top: .5rem;
    color: #333333;
    /*color: #FFFFFF;*/
  }

  .img {
    width: 1.28rem;
    height: 1.28rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      width: auto;
    }
  }

  .content {
    width: 100%;
    height: 100%;
  }

  .top {
    height: 55%;
    display: inline-block;
    padding-top: .3rem;
    box-sizing: border-box;

    .sever {
      width: 3.31rem;
      height: 26%;
      border-radius: .21rem;
      border: solid 1px #32b6a2;
      float: left;
      margin-left: .55rem;
      margin-top: .5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      line-height: 1rem;
      color: #333333;
      font-size: .76rem;
      padding-left: .64rem;
      font-weight: 500;
    }

  }

  .top1 {
    height: 45%;
    display: inline-block;
    padding-top: .3rem;
    box-sizing: border-box;

    .sever {
      width: 3.31rem;
      height: 33%;
      border-radius: .21rem;
      border: solid 1px #32b6a2;
      float: left;
      margin-left: .55rem;
      margin-top: .5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      line-height: 1rem;
      color: #333333;
      font-size: .76rem;
      padding-left: .64rem;
      font-weight: 500;
    }
  }


</style>
