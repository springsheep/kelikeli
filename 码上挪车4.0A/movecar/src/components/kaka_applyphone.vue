<template>
  <div class="content rrrr">
    <div class="mask" @click.stop="showchoose1" v-if="showchoose">
    </div>
    <div class="pickercontent" v-if="showchoose">
      <div class="picker">
        <mt-field placeholder="请选择提醒信息" readonly="readonly" style="color: #666666" class="ppp">
        </mt-field>
        <div @click="choose1(1)">
          <mt-field placeholder="阻碍他人通行" readonly="readonly" style="color: #666666">
            <img src="../assets/36.png" style="width: .8rem" v-if="shownum==1"/></mt-field>
        </div>
        <div @click="choose1(2)">
          <mt-field placeholder="停车位置违规" readonly="readonly" style="color: #666666">
            <img src="../assets/36.png" style="width: .8rem" v-if="shownum==2"/>
          </mt-field>
        </div>
      </div>
    </div>
    <van-popup v-model="popupVisible1">
      <div style="width: 14.72rem">
        <img src="../assets/12123.png" style="width: 100%;height: 100%"/>
      </div>
    </van-popup>
    <van-popup v-model="popupVisible">
      <div style="width: 14.72rem">
        <img src="../assets/114.png" style="width: 100%;height: 100%"/>
      </div>
    </van-popup>
    <van-popup v-model="popupVisible2">
      <div style="width: 14.72rem">
        <img src="../assets/12580.png" style="width: 100%;height: 100%"/>
      </div>
    </van-popup>
    <van-popup v-model="popupVisible3">
      <div style="width: 14.72rem">
        <img src="../assets/116114.png" style="width: 100%;height: 100%"/>
      </div>
    </van-popup>
    <van-popup v-model="popupVisible4">
      <div style="width: 14.72rem">
        <img src="../assets/122.png" style="width: 100%;height: 100%"/>
      </div>
    </van-popup>
    <div>
      <!--<van-cell-group>-->
      <!--<van-field-->
      <!--v-model="location"-->
      <!--label="当前位置"-->
      <!--type="textarea"-->
      <!--rows="1"-->
      <!--readonly="readonly"-->
      <!--autosize>-->
      <!--</van-field>-->
      <!--<van-field-->
      <!--v-model="carNo"-->
      <!--type="text"-->
      <!--label="车牌号码"-->
      <!--readonly="readonly"-->
      <!--/>-->
      <!--<van-field-->
      <!--v-model="carAttributionAddress"-->
      <!--type="text"-->
      <!--label="车辆归属地"-->
      <!--readonly="readonly"-->
      <!--/>-->
      <!--<van-field-->
      <!--v-model="carBrand"-->
      <!--type="text"-->
      <!--label="车型品牌"-->
      <!--readonly="readonly"-->
      <!--/>-->
      <!--</van-cell-group>-->
      <mt-field label="当前位置" :placeholder="location" readonly="readonly" style="color: #666666"></mt-field>
      <mt-field label="车牌号码" :placeholder="carNo" readonly="readonly" style="color: #666666"></mt-field>
      <mt-field label="车辆归属地" :placeholder="carAttributionAddress" readonly="readonly"
                style="color: #666666"></mt-field>
      <mt-field label="车型品牌" readonly="readonly" style="color: #666666" :placeholder="carBrand"></mt-field>
      <!--<mt-field label="车身颜色" readonly="readonly" style="color: #666666" :placeholder="carColor"></mt-field>-->
    </div>
    <div>
      <!--<div @click="showchoose=true">-->
      <!--<mt-field label="挪车理由" readonly="readonly" style=";color: #666666"-->
      <!--class="ooo">{{choosename}}-->
      <!--<img src="../assets/32.png" style="height: .5rem"/>-->
      <!--</mt-field>-->
      <!--</div>-->
    </div>
    <div class="title">支持的服务</div>
    <div class="sever">
      <div class="class " :class="{bbb:flag1==index+1,aaa:flag1!=index+1}" @click="choose(index+1,item)"
           style="color: #FFFFFF;" v-for="(item,index) in cityMoveCarServices">
        <div class="img">
          <img src="../assets/39.png" style="width: 100%" v-if="!shownum1"/>
          <img src="../assets/40.png" style="width: 100%" v-if="shownum1"/>
        </div>
        <div class="classtitle">{{item.serviceName}}</div>
      </div>
    </div>
    <div class="foot" v-if="flag==1">
      <p>友情提示：</p>
      <p>·支持7X24小时服务</p>
      <p>·全国范围内，开通114挪车服务的省份有：19个<img src="../assets/105.png" alt="" style="margin-left: .24rem;width: .51rem"
                                      @click="popupVisible=true"></p>
      <p>·通知形式：通常包含语音呼叫和短信提醒</p>
      <p>·支持拨打车辆归属地114进行查询和挪车服务</p>
      <p>·如有区域支持122/110挪车方式，可通过114人工转接</p>
    </div>
    <div class="foot" v-if="flag==2">
      <p>友情提示：</p>
      <p>·12123交通安全语音热线，由公安部交通安全综合服务平台提供</p>
      <p>·服务时间：工作日9:00-17:00（人工服务时间）</p>
      <p>·全国范围内，开通12123挪车服务的省份有：13个<img src="../assets/105.png" alt="" style="margin-left: .24rem;width: .51rem"
                                        @click="popupVisible1=true"></p>
      <p>·通知形式：通常包含语音呼叫或短信提醒</p>
      <p>·支持拨打车辆归属地12123进行查询和挪车服务</p>
    </div>
    <div class="foot" v-if="flag==3">
      <p>友情提示：</p>
      <p>·支持7X24小时服务</p>
      <p>·通知形式：仅支持短信提醒</p>
      <p>·可支持号牌：蓝牌、黄牌、渐变绿牌、黄绿双拼牌</p>
      <p>·需实名制申请，恶意申请挪车的，一经核实，将计入黑名单</p>
    </div>
    <div class="foot" v-if="flag==4">
      <p>友情提示：</p>
      <p>·支持72小时服务</p>
      <p>·支持拨打110进行挪车求助和投诉服务</p>
      <p style="color: red">·110属于公安部紧急报警电话，非危害公共安全事项不建议使用</p>
    </div>
    <div class="foot" v-if="flag==5">
      <p>友情提示：</p>
      <p>·12345是宁夏回族自治区政府服务热线</p>
      <p>·支持7x24小时服务</p>
      <p>·通知形式：电话转接或电话呼叫</p>
    </div>
    <div class="foot" v-if="flag==6">
      <p>友情提示：</p>
      <p>·支持7x24小时服务</p>
      <p>·全国范围内开通12580挪车服务的省份有：12个<img src="../assets/105.png" alt="" style="margin-left: .24rem;width: .4rem"
                                       @click="popupVisible2=true"></p>
      <p>·通知形式：在线转接或电话通知</p>
      <p>·多数区域仅针对已经在12580平台登记注册过的车主</p>
    </div>
    <div class="foot" v-if="flag==7">
      <p>友情提示：</p>
      <p>·96009是重庆市挡道挪车服务热线</p>
      <p>·支持7x24小时服务</p>
      <p>·通知形式：电话转接或电话呼叫</p>
    </div>
    <div class="foot" v-if="flag==8">
      <p>友情提示：</p>
      <p>·96598是安微省车辆管理所提供的车驾管服务平台</p>
      <p>·服务时间，工作日：8:30-17:50（人工服务时间）</p>
      <p>·通知形式：电话转接或电话呼叫</p>
    </div>
    <div class="foot" v-if="flag==9">
      <p>友情提示：</p>
      <p>·支持7x24小时服务</p>
      <p>·全国范围内，开通116114服务的省份有：16个<img src="../assets/105.png" alt="" style="margin-left: .24rem;width: .51rem"
                                       @click="popupVisible3=true"></p>
      <p>·通知形式：在线转接或电话通知</p>
      <p>·多数区域仅针对已经在116114平台登记过的车主</p>
    </div>
    <div class="foot" v-if="flag==10">
      <p>友情提示：</p>
      <p>·122是全国交警道路报警服务平台</p>
      <p>·服务时间：工作日9:00-17:00（人工服务时间)</p>
      <p>·全国范围内，开通122挪车服务的省份有3个<img src="../assets/105.png" alt="" style="margin-left: .24rem;width: .51rem"
                                    @click="popupVisible4=true"></p>
      <p>·通知形式：通常包含语音呼叫或短信提醒</p>
      <p>·支持拨打车辆归属地122进行查询和挪车服务</p>
    </div>
    <a :href="'tel:'+servicePhone" style="text-decoration: none;" v-if="showphone">
      <div class="footbutton" ref="footbutton">
        {{button}}
      </div>
    </a>
    <div class="footbutton" @click="surephone" ref="footbutton" v-else>
      {{button}}
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_applyphone",
    mounted() {
      this.cityMoveCarServices = JSON.parse(sessionStorage.getItem('bindcarinfo')).cityMoveCarServices
      this.serviceName = JSON.parse(sessionStorage.getItem('bindcarinfo')).cityMoveCarServices[0].serviceName
      this.isNetworkFilling = JSON.parse(sessionStorage.getItem('bindcarinfo')).cityMoveCarServices[0].isNetworkFilling
      if (this.isNetworkFilling == '1') {
        this.button = '跳转'
        this.href = JSON.parse(sessionStorage.getItem('bindcarinfo')).cityMoveCarServices[0].url;
        this.showphone = false
      } else {
        this.button = '拨打'
        this.showphone = true
        this.servicePhone = JSON.parse(sessionStorage.getItem('bindcarinfo')).cityMoveCarServices[0].servicePhone
      }
      if (this.serviceName == 114) {
        this.flag = 1
      } else if (this.serviceName == 12123) {
        this.flag = 2
      } else if (this.isNetworkFilling == '1') {
        this.flag = 3
      } else if (this.serviceName == 110) {
        this.flag = 4
      } else if (this.serviceName == 12345) {
        this.flag = 5
      } else if (this.serviceName == 12580) {
        this.flag = 6
      } else if (this.serviceName == 96009) {
        this.flag = 7
      } else if (this.serviceName == 96598) {
        this.flag = 8
      } else if (this.serviceName == 116114) {
        this.flag = 9
      } else if (this.serviceName == 122) {
        this.flag = 10
      }
    },
    data() {
      return {
        isNetworkFilling: null,
        show: false,
        serviceName: null,
        servicePhone: null,
        cityMoveCarServices: null,
        openId: sessionStorage.getItem('openId'),
        shownum: '1',
        shownum1: true,
        shownum2: false,
        shownum3: false,
        button: '拨打',
        popupVisible: false,
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,
        carBrand: JSON.parse(sessionStorage.getItem('bindcarinfo')).carBrand,
        // carColor: JSON.parse(sessionStorage.getItem('bindcarinfo')).carColor,
        carNo: JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo,
        phone114: JSON.parse(sessionStorage.getItem('bindcarinfo')).phone114,
        phone12123: JSON.parse(sessionStorage.getItem('bindcarinfo')).phone12123,
        carAttributionAddress: JSON.parse(sessionStorage.getItem('bindcarinfo')).carAttributionAddress,
        phone: null,
        location: this.$store.state.location,
        showchoose: false,
        choosecontent: ['阻碍他人通行', '停放位置违规',],
        choosename: '阻碍他人通行',
        flag: null,
        flag1: 1,
        show1: true,
        show2: false,
        show3: false,
        phone1: null,
        href: null,
        showphone: true
      }
    }, methods: {
      showPopup() {
        this.show = true;
      },
      showchoose1() {
        this.showchoose = false
      },
      choose1(m) {
        this.shownum = m;
        console.log(m)
        this.choosename = this.choosecontent[m - 1]
        setTimeout(() => {
          this.showchoose = false;
        }, 500)
      },
      choose(m, item) {
        this.flag1 = m;
        if (item.isNetworkFilling == '1') {
          this.button = '跳转'
          this.href = item.url;
          this.showphone = false
        } else {
          this.button = '拨打'
          this.showphone = true
        }
        if (item.serviceName == 114) {
          this.servicePhone = item.servicePhone
          this.flag = 1
        } else if (item.serviceName == 12123) {
          this.servicePhone = item.servicePhone
          this.flag = 2
        } else if (item.isNetworkFilling == '1') {
          this.href = item
          this.flag = 3
        } else if (item.serviceName == 110) {
          this.servicePhone = item.servicePhone
          this.flag = 4
        } else if (item.serviceName == 12345) {
          this.servicePhone = item.servicePhone
          this.flag = 5
        } else if (item.serviceName == 12580) {
          this.servicePhone = item.servicePhone
          this.flag = 6
        } else if (item.serviceName == 96009) {
          this.servicePhone = item.servicePhone
          this.flag = 7
        } else if (item.serviceName == 96598) {
          this.servicePhone = item.servicePhone
          this.flag = 8
        } else if (item.serviceName == 116114) {
          this.servicePhone = item.servicePhone
          this.flag = 9
        } else if (item.serviceName == 122) {
          this.servicePhone = item.servicePhone
          this.flag = 10
        }
        console.log(this.flag)
      },
      surephone() {
        console.log(111, this.href.url)
        window.location.href = this.href.url
      }
    }
  }
</script>

<style scoped>
  .rrrr .van-popup {
    background: none;
  }

  .aaa {
    background: #bbbbbb;
  }

  .bbb {
    background-color: #04c8af;
  }

  .mask {

    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 4;
  }

  .pickercontent {
    width: 100%;
    height: 7.5rem;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }

  .footbutton {
    line-height: 1.877rem;
    height: 1.877rem;
    width: 93.3%;
    margin: 0 auto;
    text-align: center;
    color: #FFFFFF;
    font-size: .768rem;
    background-color: #04c8af;
    margin-top: .64rem;
    border-radius: 3rem;
  }

  .foot {
    font-size: .5rem;
    margin-top: .64rem;
    padding-left: .3rem;
  }

  .foot p {
    margin: 3px 0;
    color: #999999;
    display: flex;
    align-items: center;
  }

  .classtitle {
    width: 3.4rem;
    text-align: center;
    font-size: .54rem;
    margin-top: .2rem;
    letter-spacing: 1px;
  }

  .img {
    width: 1.28rem;
    height: 1.28rem;
    /*background-color: #5daf34;*/
  }

  .class {
    width: 21%;
    margin-left: 3.3%;
    height: 3.4rem;
    border-radius: .2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  .sever {
    width: 100%;
    height: 5rem;
    background-color: #FFFFFF;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .title {
    line-height: 1.5rem;
    letter-spacing: 0px;
    color: #666666;
    padding-left: .4rem;
    font-size: .64rem;
  }

  .content {
    width: 100%;
    height: 100%;
    padding-bottom: .64rem;
    background-color: #f1f1f1;
  }
</style>
<style>
  .mint-field-other {
    color: #333333;
    font-size: .64rem;
  }

  .mint-field-core::placeholder {
    color: #333333;
    font-size: .64rem;
  }

  .picker .mint-cell-wrapper {
    height: 55px;
  }

  .rrrr .van-popup--center {
    width: auto;
    height: auto;
  }
</style>
