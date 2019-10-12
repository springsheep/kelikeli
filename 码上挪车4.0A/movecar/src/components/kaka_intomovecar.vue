<template>
  <div class="content opop" style="padding-bottom: .64rem">
    <div class="title ">请确认下列信息并选择通知方式：</div>
    <mt-field label="当前时间" :placeholder="time" readonly="readonly" style="color: #333333"></mt-field>
    <mt-field label="当前位置" :placeholder="location" style="color: #333333" v-model="location" :disableClear="true" readonly="readonly">
      <van-icon name="location" @click="chooseaddress" color="#04c8af" size=".78rem"/>
    </mt-field>
    <mt-field label="车牌号码" :placeholder="carNo" style="color: #333333" readonly="readonly"></mt-field>
    <div @click="popo">
      <mt-field label="提醒信息" :placeholder="choosename" readonly="readonly" style="margin-top: 10px;color: #666666" class="ooo">
        <img src="../assets/32.png" style="height: .6rem"/>
      </mt-field>
    </div>
    <!--车主没有关注不能用微信-->
    <div class="first" style="margin-top: .64rem" v-if="isCarOwnerSubscribe!=1">
      <div class="left">
        <div class="lefttop" style="color: #999999">微信联系
          <span style="margin-left: .4rem"></span>
        </div>
        <div class="letcontent">·支持给车主发送文字、语音</div>
        <div class="letcontent">·适用于车主不方便接听电话的情况</div>
      </div>
      <div class="right">
        <div class="rightcontent">
          <div class="righttop">
            <img src="../assets/132.png" alt="">
          </div>
          <div class="rightbottom" style="color: #999999">发送消息</div>
        </div>
      </div>
    </div>
    <!--车主关注公众号显示可用微信-->
    <div class="first" style="margin-top: .64rem" @click="chart" v-if="isCarOwnerSubscribe==1">
      <div class="left">
        <div class="lefttop">微信消息联系车主
          <span style="margin-left: .4rem">
          <yd-badge shape="square" type="danger" style="position: relative;bottom: .05rem">推荐</yd-badge>
          </span>
        </div>
        <div class="letcontent">·支持给车主发送文字、语音</div>
        <div class="letcontent">·适用于车主不方便接听电话的情况</div>
      </div>
      <div class="right">
        <div class="rightcontent">
          <div class="righttop">
            <img src="../assets/33.png" alt="">
          </div>
          <div class="rightbottom">微信联系</div>
        </div>
      </div>
    </div>
    <div class="first" style="margin-top: .42rem" @click="phone">
      <div class="left">
        <div class="lefttop">拨打电话联系车主
          <span style="margin-left: .4rem" v-if="isCarOwnerSubscribe!=1">
          <yd-badge shape="square" type="danger" style="position: relative;bottom: .05rem">推荐</yd-badge>
          </span></div>
        <div class="letcontent">·上传挡道图片，系统审核后获取车主号码</div>
        <div class="letcontent">·适用于微信联系车主未及时回复的情况</div>
      </div>
      <div class="right">
        <div class="rightcontent">
          <div class="righttop">
            <img src="../assets/34.png" alt="">
          </div>
          <div class="rightbottom">申请呼叫</div>
        </div>
      </div>
    </div>
    <div class="first" style="margin-top: .42rem" @click="applyphone">
      <div class="left">
        <div class="lefttop">借助114等联系车主</div>
        <div class="letcontent">·仅针对已经开展相应服务的特定城市</div>
        <div class="letcontent">·适用于前两种方式均无法联系到车主的情况</div>
      </div>
      <div class="right">
        <div class="rightcontent">
          <div class="righttop">
            <img src="../assets/35.png" alt="">
          </div>
          <div class="rightbottom">委托操作</div>
        </div>
      </div>
    </div>
    <div class="mask " v-if="showchoose" @click.prevent="showchoose=false">
      <div class="pickercontent bounceInUp animated">
        <div class="picker">
          <mt-field placeholder="请选择提醒信息" readonly="readonly" style="color: #666666" class="ppp">
          </mt-field>
          <div @click="choose(1)">
            <mt-field placeholder="您的爱车挡道，请挪车" readonly="readonly" style="color: #666666">
              <img src="../assets/36.png" style="width: .8rem" v-if="shownum==1"/></mt-field>
          </div>
          <div @click="choose(2)">
            <mt-field placeholder="十万火急，请速来挪车" readonly="readonly" style="color: #666666">
              <img src="../assets/36.png" style="width: .8rem" v-if="shownum==2"/>
            </mt-field>
          </div>
          <div @click="choose(3)">
            <mt-field placeholder="您的爱车门/窗/灯未关" readonly="readonly" style="color: #666666">
              <img src="../assets/36.png" style="width: .8rem" v-if="shownum==3"/>
            </mt-field>
          </div>
          <div @click="choose(4)">
            <mt-field placeholder="违规停车，请尽快挪车" readonly="readonly" style="color: #666666">
              <img src="../assets/36.png" style="width: .8rem" v-if="shownum==4"/>
            </mt-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wx from '../../config/wx'
  const img = ''
  export default {
    name: "kaka_intomovecar",
    data() {
      return {
        shownum: 1,
        showchoose: false,
        choosecontent: ['您的爱车挡道，请挪车', '十万火急，请速来挪车', '您的爱车门/窗/灯未关', '违规停车，请尽快挪车'],
        choosename: '您的爱车挡道，请挪车',
        city: '',
        time: null,//当前时间
        carNo: null,//车牌
        location: null,
        ARR: [],
        backurl: null,
        qrcode: sessionStorage.getItem('qrcode'),
        openId: sessionStorage.getItem('openId'),
        isCarOwnerSubscribe: null,//判断车主是否关注公众号
      }
    },
    watch: {
      choosename() {
        this.$store.state.choosename = this.choosename;
      }
    },
    mounted() {
      this.isCarOwnerSubscribe = JSON.parse(sessionStorage.getItem('bindcarinfo')).isCarOwnerSubscribe;
      console.log(JSON.parse(sessionStorage.getItem('bindcarinfo')) )
      this.carNo = JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo;
      this.backurl = wx.backurl;
      let decodedUrl = decodeURI(window.location.href);
      let query = decodedUrl.split('?')[1];
      let queryObj = {};
      if (query) {
        let queryArr = query.split('&');
        queryArr.forEach(item => {
          let itemArr = item.split('=');
          queryObj[itemArr[0]] = itemArr[1];
        })
      }
      // console.log(queryObj.name)
      if (queryObj.name != undefined) {
        if (queryObj.name == '我的位置') {
          this.$store.state.location = queryObj.addr
        } else {
          this.$store.state.location = queryObj.name
        }
      } else {
        let _this = this
        var geolocation = new qq.maps.Geolocation();
        var options = {
          timeout: 5000 //延时
        };
        var geocoder;
        var latLng;
        // 定位成功之后调用的方法
        console.log(geolocation, 111)

        function showPosition(position) {
          console.log('定位成功', position);
          _this.location = position.addr
          _this.$store.state.location = position.addr;
        };

        function showErr(e) {
          console.log('定位失败', e);
        }
        geolocation.getLocation(showPosition, showErr, options);
      }
      this.location = this.$store.state.location
      this.nowTimes();
    },
    methods: {
      chooseaddress() {
        var key = 'MTABZ-CULEV-PHAPY-UWQ4M-WVGH7-7LBTU'
        window.location.href = `https://apis.map.qq.com/tools/locpicker?&key=${key}&referer=myapp&policy=1&search=1&type=0&backurl=${this.backurl}`
      },
      popo() {
        this.showchoose = true
      },
      // 获取当前时间函数
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
        let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
        let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
        let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
        // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        this.time = year + "-" + month + "-" + date + " " + hh + ":" + mm;
      },// 定时器函数
      nowTimes() {
        this.timeFormate(new Date());
        // setInterval(this.nowTimes,30*1000);
      },
      chart() {
        this.$router.push({
          name: 'chart1',
          params: {
            code: this.qrcode,
            openId: this.openId,
          }
        })
      },
      //呼叫申请
      phone() {
        this.$router.push({path: '/kaka_phone'})
      },
      //委托
      applyphone() {
        this.$router.push({path: '/kaka_applyphone'})
      },
      choose(m) {
        this.shownum = m;
        this.choosename = this.choosecontent[m - 1];
        setTimeout(() => {
          this.showchoose = false;
        }, 500)
      }
    }
  }
</script>

<style scoped>

  .map {
    /*width: 100%;*/
    /*height: 500px;*/
  }

  .mask {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .pickercontent {
    width: 100%;
    height: 316px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }

  .righttop {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
  }

  .righttop img {
    /*width: 1.18rem;*/
    height: 1.1rem;
    width: auto;

  }

  .rightbottom {
    width: 100%;
    height: 20%;
    text-align: center;
    font-size: .55rem;
    color: #333333;
    margin-top: .15rem;
  }

  .rightcontent {
    height: 2.13rem;
    width: 100%;
    border-left: 1px silver solid;
  }

  .lefttop {
    font-size: .64rem;
    line-height: 1.28rem;
    margin-left: .3rem;
    width: 10rem;
    border-bottom: 1px solid #dddddd;
    margin-bottom: .4rem;
    color: #04c8af;
  }

  .letcontent {
    color: #999999;
    margin-left: .3rem;
    font-size: .555rem;
    line-height: 1rem;
  }

  .first {
    height: 4.266rem;
    width: 94.4%;
    margin: 0 auto;
    margin-top: .64rem;
    background-color: #ffffff;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    display: flex;

  }

  .right {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: .4rem;
  }

  .title {
    line-height: 37px;
    font-size: .555rem;
    color: #333333;
    padding-left: .555rem;
  }

  .content {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }

</style>
<style>
  .picker .mint-cell-wrapper {
    height: 55px;
  }

  .ppp .mint-cell-wrapper {
    height: 45px;
  }

  .mint-field-core::placeholder {
    color: #333333;
    font-size: .64rem;
  }

  .mint-field .mint-cell-title {
    width: 4rem;
  }
  .opop .mint-cell-title {
    width:3.3rem;
  }

  .ooo .mint-field-core::placeholder {
    color: #04c8af;
    font-size: .64rem;
  }

  .picker .mint-field-core::placeholder {
    color: #333333;
    font-size: .64rem;
  }

  .ppp .mint-field-core::placeholder {
    color: #666666;
    font-size: .64rem;
  }

  .mint-cell-text {
    font-size: .64rem;
  }

  .mint-field-other {
    color: #333333;
    font-size: .64rem;
  }

  .mint-field-core::placeholder {
    color: #333333;
    font-size: .64rem;
  }

  .location .mint-field-core {
    padding-right: 20px;
  }
  /*.van-cell{*/
    /*font-size: .64rem !important;*/
    /*padding: .42rem .44rem !important;*/
    /*display: flex;*/
    /*align-items: center !important;*/

  /*}*/
  /*.van-field__control{*/
    /*color: #333333;*/
  /*}*/
  .mint-cell{
    font-size: .64rem;
  }
  .mint-field .mint-cell-title{
    color: #666666;
  }
  .mint-field-core{
    overflow: hidden;
    white-space:nowrap; text-overflow:ellipsis
  }
</style>
