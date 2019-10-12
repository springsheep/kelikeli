<template>
  <div class="content">
    <header class="header">
      <!--头像-->
      <span class="headimg">
        <img :src="personInfo.headImgUrl" alt="">
      </span>
      <!--右侧信息-->
      <span class="rightinfo">
          <!--微信昵称-->
          <div class="wechartname">{{personInfo.nickName}}</div>
        <!--绑定状态-->
          <div class="bindflag">状态：{{personInfo.isBind==='1'?'已绑定':'未绑定'}}</div>
        </span>
    </header>
    <div class="list">
      <ul>
        <li @click="tonext(1)">
          <span class="lefticon">
            <img src="../assets/159.png" alt="" class="toleft">
          </span>
          <span class="rigntcontent">
            <span>我的爱车</span>
            <img src="../assets/154.png" alt="" class="torignt">
          </span>
        </li>
        <li @click="tonext(2)">
          <span class="lefticon">
            <img src="../assets/158.png" alt="" class="toleft">
          </span>
          <span class="rigntcontent">
            <span>挪车记录</span>
            <img src="../assets/154.png" alt="" class="torignt">
          </span>
        </li>
        <li @click="tonext(3)">
          <span class="lefticon">
            <img src="../assets/156.png" alt="" class="toleft">
          </span>
          <span class="rigntcontent">
            <span>防骚扰设置</span>
            <img src="../assets/154.png" alt="" class="torignt">
          </span>
        </li>
        <li @click="tonext(4)">
          <span class="lefticon">
            <img src="../assets/155.png" alt="" class="toleft">
          </span>
          <span class="rigntcontent">
            <span>分享给朋友</span>
            <img src="../assets/154.png" alt="" class="torignt">
          </span>
        </li>
        <li @click="tonext(5)">
          <span class="lefticon">
            <img src="../assets/157.png" alt="" class="toleft">
          </span>
          <span class="rigntcontent" style="border-bottom: 0">
            <span>意见反馈</span>
            <img src="../assets/154.png" alt="" class="torignt">
          </span>
        </li>
      </ul>

    </div>
    <div class="mask" v-if="showshare" @click="showshare=false">
      <img src="../assets/171.png" alt="">
    </div>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import wx1 from '../../config/wx'

  export default {
    name: "kaka_mycenter",
    created() {
      //保存在路由守卫中获取的信息
      console.log(JSON.parse(sessionStorage.getItem("personInfo")), 12321321321321)
      if (JSON.parse(sessionStorage.getItem("personInfo")) == null) {
        setTimeout(() => {
          this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"))
          console.log(JSON.de)
          if (this.personInfo.isBind === '0') {
            this.tip()
          }
        }, 1000)
      } else {
        this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"))
        console.log(JSON.de)
        if (this.personInfo.isBind === '0') {
          this.tip()
        }
      }

    }, mounted() {
      this.getinfo()
    }, data() {
      return {
        personInfo: null,
        showshare: false
      }
    },
    methods: {
      getinfo() {

        let url = location.href.split('#')[0];
        this.axios.post('/moveCarB/getSign', {
          url: url
        }).then((res) => {
          let list = res.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: list.appId, // 必填，公众号的唯一标识
            timestamp: list.timestamp, // 必填，生成签名的时间戳
            nonceStr: list.nonceStr, // 必填，生成签名的随机串
            signature: list.signature, // 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          })
          // config信息验证后才执行
          wx.ready(() => {
            //分享给朋友圈
            wx.onMenuShareTimeline({
              title: '扫码轻松挪车，快来免费领取吧！', // 分享标题
              desc: '码上挪车专业版', // 分享描述
              link: `${wx1.movecarurl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://wx.qlogo.cn/mmopen/0T8yO33zeejz4TNI4DicBhrr9Tr2latMvfYxf23u5rf1icbibHXCxj61MFwxjhSUpKSIvUdXkLhKfG4xpLXdbkfwDlNwlicLI6X0/64', // 分享图标
              success: function () {
                // 设置成功
              }
            })
            //分享给好友
            wx.onMenuShareAppMessage({
              title: '扫码轻松挪车，快来免费领取吧！', // 分享标题
              desc: '码上挪车专业版', // 分享描述
              link: `${wx1.movecarurl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://wx.qlogo.cn/mmopen/0T8yO33zeejz4TNI4DicBhrr9Tr2latMvfYxf23u5rf1icbibHXCxj61MFwxjhSUpKSIvUdXkLhKfG4xpLXdbkfwDlNwlicLI6X0/64', // 分享图标
              success: function () {
// 用户点击了分享后执行的回调函数
              }
            });
          })

          // 微信sdk错误返回问题
          wx.error((res) => {
            // alert('出错了：' + res.errMsg)// 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          })
        })
      },
      //提示
      tip() {
        Dialog.confirm({
          title: '温馨提示',
          message: '您还未绑定挪车码，绑定后即可开启以上服务',
          cancelButtonText: '放弃',
          confirmButtonText: '去绑定',
        }).then(() => {
          // on confirm
          window.location.href = `${wx1.movecarurl}`
          return
        }).catch(() => {
          return
        });
      },
      //跳转到下一页
      tonext(index) {
        //判断是否绑定 如果绑定跳转 如果没绑定给提示
        if (this.personInfo.isBind === '1') {
          if (index == 1) {
            this.$router.push({path: "/kaka_changebinding"})

          } else if (index == 2) {
            this.$router.push({path: "/kaka_CarMovingRecord"})

          } else if (index == 3) {
            this.$router.push({path: "/kaka_settime"})

          } else if (index == 4) {
            this.showshare = true

          } else if (index == 5) {
            this.$router.push({path: "/kaka_feedback"})
          }
        } else {
          this.tip()
        }

      }
    }
  }
</script>

<style scoped lang="scss">

  .content {
    width: 100%;

    .mask {
      position: fixed;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);

      img {
        width: 10rem;
        position: fixed;
        right: 3vw;

      }
    }

    .header {
      height: 21vw;
      background-color: #ffffff;
      display: flex;
      align-items: center;

      .headimg {
        display: inline-block;
        width: 16vw;
        height: 16vw;
        background-color: #d9d9d9;
        border-radius: 1vw;
        margin-left: 4vw;

        img {
          width: 100%;
          height: 100%;
          border-radius: 1vw;
        }
      }

      .rightinfo {
        display: inline-block;
        margin-left: 4vw;

        .wechartname {
          height: 6vw;
          font-family: PingFang-SC-Medium;
          font-size: .766rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 6vw;
          letter-spacing: 0vw;
          color: #333333;
        }

        .bindflag {
          height: 6vw;
          font-family: PingFang-SC-Regular;
          font-size: .51rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 6vw;
          letter-spacing: 0vw;
          color: #333333;
        }
      }
    }

    .list {
      margin-top: 3vw;
      background: #ffffff;

      ul {
        li {
          display: flex;
          height: 13vw;

          .lefticon {
            display: inline-block;
            height: 13vw;
            width: 13vw;
            display: flex;
            justify-content: center;
            align-items: center;

            .toleft {
              width: 5vw;
              height: auto;
            }
          }

          .rigntcontent {
            display: inline-block;
            width: 87vw;
            height: 13vw;
            border-bottom: .5px solid rgba(0, 0, 0, 0.1);
            line-height: 13vw;
            font-size: .64rem;
            color: #333333;

            span {
              display: inline-block;
              width: 25vw;
            }

            .torignt {
              width: 2vw;
              height: auto;
              display: inline-block;
              margin-left: 55vw;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .van-dialog {
    .van-dialog__message {
      font-size: .6rem;
      color: #333333;
    }

    .van-button__text {
      font-size: .64rem;
      color: #04c8af;
    }
  }
</style>
