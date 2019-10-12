<template>
  <div class="content">
    <div class="title">
      点击下方切换打印模版
    </div>
    <div class="img">
      <img :src="imgUrl" alt="">
    </div>
    <div class="chooseimg">
      <img src="../assets/66.png" alt="" @click="choose(6,$event)" :class="{ooo:num==6}">
      <img src="../assets/61.png" alt="" @click="choose(1,$event)" :class="{ooo:num==1}">
      <img src="../assets/62.png" alt="" @click="choose(2,$event)" :class="{ooo:num==2}">
      <img src="../assets/63.png" alt="" @click="choose(3,$event)" :class="{ooo:num==3}">
      <img src="../assets/64.png" alt="" @click="choose(4,$event)" :class="{ooo:num==4}">
      <img src="../assets/65.png" alt="" @click="choose(5,$event)" :class="{ooo:num==5}">
    </div>
    <div class="title" style="font-size: .55rem">
      长按图片，可保存到手机或者发送到微信
    </div>
    <div class="button" @click="sendemail">
      发送图片到邮箱
    </div>
    <div class="button1" @click="share">
      觉得码上挪车不错？点击右上角分享给朋友
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import wx1 from '../../config/wx'
  export default {
    name: "kaka_movecarmodule",
    created() {

    }, mounted() {
      this.getinfo()
    },
    data() {
      return {
        imgUrl: JSON.parse(sessionStorage.getItem('movecarInfo')).imgUrl,
        carNo: JSON.parse(sessionStorage.getItem('movecarInfo')).carNo,
        num: 6,
        openId: sessionStorage.getItem('openId'),
      }
    },
    methods: {
      share(){

      },
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
              link:`${wx1.movecarurl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              imgUrl:'http://wx.qlogo.cn/mmopen/0T8yO33zeejz4TNI4DicBhrr9Tr2latMvfYxf23u5rf1icbibHXCxj61MFwxjhSUpKSIvUdXkLhKfG4xpLXdbkfwDlNwlicLI6X0/64', // 分享图标
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
      sendemail(){
        MessageBox.prompt('请输入邮箱', {
          inputValidator: (val) => {
            if (val === null) {
              return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            }
            var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            return (reg.test(val))
          }, inputErrorMessage: '必须为正确格式的邮箱'
        }).then((val) => {
          console.info('confirm,value is' + val.value)
          Indicator.open({
            text: '图片发送中...',
          });
          this.axios.post('moveCarB/sendMoveCarQrCodeEmail',
            {
              "openId":this.openId,
              "carNo":this.carNo,
              "email":val.value
            }).then((res)=>{
            Indicator.close();
            if(res.data.state==1){
              Toast('图片发送成功');
            }else {
              Toast(res.data.retMsg);
            }

          })
        }, () => {
          console.info('cancel')
        })
      },
      choose(m, e) {
        this.num = m
        Indicator.open({
           text: '图片生成中...',
         });
        this.axios.post('moveCarB/changeMoveCarQrCodeSkin',{
          "openId":this.openId,
          "carNO":this.carNO,
          "backgroundFlag":m-1
        }).then((res)=>{
          Indicator.close();
          if(res.data.state==1){
            Toast('图片生成成功');
            this.imgUrl=res.data.data.imgUrl+'?a='+Math.random()
            this.qrCode=res.data.data.qrCode
          }else {
            Toast(res.data.retMsg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

  .content {
    width: 100%;
    height: 100%;
    background: #333333;

    .title {
      width: 100%;
      line-height: 1.6rem;
      font-size: .64rem;
      text-align: center;
      color: #FFFFFF;

    }

    .img {
      width: 12rem;
      height: 12rem;
      margin: 0 auto;
      /*background: red;*/
      img {
        width: 100%;
        height: 100%;
      }
    }

    .chooseimg {
      height: 3rem;

      .ooo {
        width: 16%;
      }

      margin-top: .64rem;
      width: 100%;
      text-align: center;

      img {
        width: 13%;
        display: inline-block;

      }
    }

    .button {
      width: 88.3%;
      line-height: 1.7rem;
      height: 1.7rem;
      color: #333333;
      margin: .64rem auto;
      font-size: .64rem;
      background: #FFFFFF;
      text-align: center;
      border-radius: 5px;
    }

    .button1 {
      width: 88.3%;
      line-height: 1.7rem;
      height: 1.7rem;
      color: #FFFFFF;
      margin: .64rem auto;
      font-size: .64rem;
      background: #04c8af;
      text-align: center;
      border-radius: 5px;
    }
  }

</style>
<style>
  .mint-msgbox-input input{
    padding: .45rem .4rem;
  }
  .mint-msgbox-confirm{
    color: #04c8af;
  }
  .mint-msgbox-confirm, .mint-msgbox-cancel{
    font-size: .64rem;
  }
  .mint-msgbox-message{
    color: #333333;
    font-size: .76rem;
  }
  .mint-msgbox-btns{
    height: 1.76rem;
  }
</style>
