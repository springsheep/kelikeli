import wx from "weixin-jsapi";
import axios from 'axios'

export default {

  wxShowMenu: function(title,img,url,_this) {

    // console.log(window.location.href);

    _this.axios.post(url).then(function(res) {

      var getMsg = res.data;
      console.log(getMsg)

      wx.config({

        debug: false, //生产环境需要关闭debug模式

        appId: getMsg.appId, //appId通过微信服务号后台查看

        timestamp: getMsg.timestamp, //生成签名的时间戳

        nonceStr: getMsg.nonceStr, //生成签名的随机字符串

        signature: getMsg.signature, //签名

        jsApiList: [ //需要调用的JS接口列表

          'updateAppMessageShareData', //分享给好友

          'updateTimelineShareData', //分享到朋友圈

          'onMenuShareTimeline',

          'onMenuShareAppMessage',

        ],

      });
      wx.ready(function() {

        wx.checkJsApi({

          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline',

            'onMenuShareAppMessage',], //分享到朋友圈,

          success: function(res) {

          }

        });

        //分享到朋友圈

        wx.updateTimelineShareData({

          title: title, // 分享标题

          desc: "我在真知灼见跟随大咖学金融，赶紧一起加入吧！", //分享描述

          link: location.href.split('#')[0], // 分享链接

          imgUrl: img // 分享图标

        });



        //分享给朋友

        wx.updateAppMessageShareData({

          title: title, // 分享标题

          desc: "我在真知灼见跟随大咖学金融，赶紧一起加入吧！", //分享描述

          link: location.href.split('#')[0], // 分享链接

          imgUrl: img // 分享图标

        });

      });

    })

  }

}
