import wx from "weixin-jsapi";


import { getJSSDK } from '@/api/wx/index';//获取appid信息的接口,以后台人员接口为准
import { payorders } from "@/api/appointment/index";//一个更具订单id获取appid的接口


const wxUtils = () => {
  return new Promise((resolve, reject) => {
    getJSSDK().then(async data => {
      await wx.config({
        debug: false, // TODO: 测试阶段使用
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          'getLocation',
          'hideMenuItems'
        ]
      });
      wxReady(resolve)
    }).catch(error => {
      reject();
      console.log(error);
    })
  })
}
// 微信jssdk加载完成
const wxReady = resolve => {  //不让分享
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:timeline', // 分享给朋友圈
        'menuItem:share:qq', // 分享到QQ
        'menuItem:share:weiboApp', // 分享到Weibo
        'menuItem:favorite', // 收藏
        'menuItem:share:QZone', // 分享到 QQ 空间
        'menuItem:copyUrl', // 复制链接
        'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
        'menuItem:openWithSafari', // 在Safari中打开
        'menuItem:share:email', // 邮件
        'menuItem:readMode', // 阅读模式
        'menuItem:originPage' // 原网页
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    resolve();
  });
};
// 微信支付
const WXinvoke = (orderId, resolve) => {  //orderId 订单ID
  payorders({ orderId: orderId }).then(res => {
    wx.invoke(
      'getBrandWCPayRequest', {
        "appId": res.appId, // 公众号名称，由商户传入
        "timeStamp": res.timestamp, // 时间戳，自1970年以来的秒数
        "nonceStr": res.nonceStr, // 随机串
        "package": res.package,
        "signType": res.signType, // 微信签名方式：
        "paySign": res.signature // 微信签名
      },
      function (res) {
        setTimeout(function () {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            resolve()
          }
        }, 500);
      }
    );
  })


}

// 获取地理位置
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: response => {
        resolve(response);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
export { getLocation, WXinvoke };
export default wxUtils;
