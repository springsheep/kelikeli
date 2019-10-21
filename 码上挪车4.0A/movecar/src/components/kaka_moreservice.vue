<template>
  <div class="content">
    <div class="outer_border">
      <h2 class="outer_title">
        保险服务
      </h2>
      <van-divider/>
      <van-grid :column-num="4">
        <van-grid-item
          @click.prevent="moveend(index,item)"
          v-for="(item,index) in insuranceServiceList"
          :key="index"
          :icon="item.icon"
          :text="item.name"></van-grid-item>
      </van-grid>
    </div>
    <div class="outer_border" style="margin-top: 3vw">
      <h2 class="outer_title">
        用车服务
      </h2>
      <van-divider/>
      <van-grid :column-num="4">
        <van-grid-item
          :icon="item.icon"
          :key="index"
          :text="item.name"
          @click.prevent="moveend(index,item)"
          v-for="(item,index) in useCarServiceList"></van-grid-item>
      </van-grid>
    </div>
    <!--<div class="outer_border" style="margin-top: 3vw">-->
      <!--<h2 class="outer_title">-->
        <!--健康服务-->
      <!--</h2>-->
      <!--<van-divider/>-->
      <!--<van-grid :column-num="4">-->
        <!--<van-grid-item-->
          <!--:icon="item.icon"-->
          <!--:key="index"-->
          <!--:text="item.name"-->
          <!--@click.prevent="moveend(index,item)"-->
          <!--v-for="(item,index) in helthServerList"></van-grid-item>-->
      <!--</van-grid>-->
    <!--</div>-->
    <!--<div class="outer_border" style="margin-top: 3vw">-->
      <!--<h2 class="outer_title">-->
        <!--金融服务-->
      <!--</h2>-->
      <!--<van-divider/>-->
      <!--<van-grid :column-num="4">-->
        <!--<van-grid-item-->
          <!--clickable-->
          <!--:icon="item.icon"-->
          <!--:key="index"-->
          <!--:text="item.name"-->
          <!--@click.prevent="moveend(index,item)"-->
          <!--v-for="(item,index) in financlaServerList"></van-grid-item>-->
      <!--</van-grid>-->
    <!--</div>-->
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
        useCarServiceList: null,
        helthServerList:[
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_114.png",
            name: "预约挂号",
            is_enable: "1",
            is_external_url: "1",
            url: "https://wx.wy.guahao.com/searchexperthotlist?channel=3&location=552&stdDeptId=&stdDeptName=%E7%BB%BC%E5%90%88&diseaseId=&diseaseName=&from=singlemessage"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_103.png",
            name: "查医院",
            is_enable: "1",
            is_external_url: "1",
            url: "https://dxy.com/health/hospital/location/110000"
          }, {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_104.png",
            name: "查药店",
            is_enable: "1",
            is_external_url: "1",
            url: "https://apis.map.qq.com/tools/poimarker?type=1&keyword=药店&center=CurrentLocation&radius=1000&key=MTABZ-CULEV-PHAPY-UWQ4M-WVGH7-7LBTU&referer=myapp"
          },{
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_109.png",
            name: "健康自测",
            is_enable: "1",
            is_external_url: "1",
            url: "http://t.manyoubang.com/?from=weixin"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_100.png",
            name: "查疾病",
            is_enable: "1",
            is_external_url: "1",
            url: "https://dxy.com/faq"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_110.png",
            name: "用药助手",
            is_enable: "1",
            is_external_url: "1",
            url: "https://drugs.dxy.cn/"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_113.png",
            name: "医保目录",
            is_enable: "1",
            is_external_url: "1",
            url: "https://www.zgylbx.com/index.php?m=content&c=index&a=lists&catid=105&from=singlemessage"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_112.png",
            name: "急救手册",
            is_enable: "1",
            is_external_url: "1",
            url: "https://mp.weixin.qq.com/s/jblNr16RHQ_-XDJlFJgImg"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_113.png",
            name: "健康解读",
            is_enable: "1",
            is_external_url: "1",
            url: "https://mp.weixin.qq.com/s/6Rs4oZA9sw7_6VsrY4wqrA"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_108.png",
            name: "食补禁忌",
            is_enable: "1",
            is_external_url: "1",
            url: "https://h5new.haoyunma.com/post/htmlPost?toPage=alicanEatList&type_id=43&hym_title=%E4%BA%94%E8%B0%B7%E6%9D%82%E7%B2%AE"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_109.png",
            name: "查医保卡",
            is_enable: "1",
            is_external_url: "1",
            url: "http://www.12333.gov.cn/cas/siLogin?service=http%3A%2F%2Fsi.12333.gov.cn%2F120683.jhtml"
          },
        ],
        financlaServerList:[
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_105.png",
            name: "车价评估",
            is_enable: "0",
            is_external_url: "1",
            url: "https://www.zgylbx.com/index.php?m=content&c=index&a=lists&catid=105&from=singlemessage"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_106.png",
            name: "车抵贷款",
            is_enable: "0",
            is_external_url: "1",
            url: "https://mp.weixin.qq.com/s/jblNr16RHQ_-XDJlFJgImg"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_109.png",
            name: "申请信用卡",
            is_enable: "1",
            is_external_url: "1",
            url: "https://www.u51.com/credit/"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_101.png",
            name: "个人医保",
            is_enable: "1",
            is_external_url: "1",
            url: "https://org.modao.cc/app/d334390fbd17996b4d8405c250da8082ac300820"
          },
          {
            icon: "https://test.kelibbb.com/res/img/moveCar/common/health_service_111.png",
            name: "众筹平台",
            is_enable: "1",
            is_external_url: "0",
            url: "/kaka_crowd_funding"
          },
        ]
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
        console.log(this.qrcode, 'qrcode')
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
        console.log(this.qrcode, '二维码')
        this.axios.post('moveCar/getMoreServiceList', {
          "openId": this.openId,
          "qrCode": this.qrcode,
        }).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data.data)
            this.insuranceServiceList = res.data.data.insuranceServiceList;
            this.useCarServiceList = res.data.data.useCarServiceList;
          }
        })
      },
      //从链接进入
      getinfo1() {
        console.log(this.organizationId, '组织机构id')
        this.axios.post('moveCar/getMoreServiceList', {
          "openId": this.openId,
          "organizationId": this.organizationId,
        }).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data.data)
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
<style>
  .outer_border .van-hairline--top::after{
    border:0 !important;
  }
  .outer_border .van-grid-item__content {
    height: 26vw;
    padding: 0;
  }

  .outer_border .van-grid-item__icon {
    font-size: 1.87rem;
  }

  .outer_border .van-grid-item__text {
    font-size: .56rem;
    color: #333333;
  }
</style>
<style scoped lang="scss">
  .van-divider {
    margin: 0;
  }

  .van-grid-item__icon {
    font-size: 1.87rem;
  }

  .content {
    padding: 3vw 0;


    .outer_border {
      font-size: 0;
      margin: 0 auto;
      width: 95vw;
      overflow: hidden;
      background-color: #ffffff;
      border: .5px solid rgba(1, 1, 0, 0.1);
      box-shadow: 0vw 0vw 3vw 0vw rgba(1, 1, 0, 0.1);
      border-radius: 5vw;

      .outer_title {
        height: 13vw;
        line-height: 13vw;
        font-size: .766rem;
        padding-left: 4vw;
      }
    }
  }

</style>
