<template>
  <div class="content">
    <mt-popup
      pop-transition="pop-transition"
      v-model="popupVisible"
      v-if="popupVisible"
      position="bottom"
      style="width: 100%">
      <div class="pickhead">
        <div class="left" @click="miss">取消</div>
        <div class="right" @click="sure1">确定</div>
      </div>
      <mt-picker :slots="slots" value-key="name" @change="onValuesChange" style="width: 100%">
      </mt-picker>
    </mt-popup>
    <div style="background: red;position: fixed;left: 0;top: 0" @click="tochart">chart</div>
    <div class="mask" @click="$store.state.changebindstate1=false" v-if="$store.state.changebindstate1">
    </div>
    <div class="mask" v-if="$store.state.changebindstate">
    </div>
    <div class="changephone bounceIn animated" v-if="$store.state.changebindstate1">
      <div class="changetitle">
        修改车牌绑定
        <img src="../assets/close.png" alt="" @click="close2">
      </div>
      <div class="changecontent ">
        <div @click="getItem1">
          <mt-field placeholder="请输入新车牌" style="width: 93.3%;margin-left: 3.3%;margin-top: .5rem;" v-model="input4"
                    readonly="readonly">
          </mt-field>
        </div>
        <div style="position: relative">
          <mt-field placeholder="请选择车型品牌" style="width: 93.3%;margin-left: 3.3%;margin-top: .5rem;" v-model="input5"
                    readonly="readonly">
          </mt-field>
          <div style="position: absolute;right: 1.2rem;bottom: .45rem;width: 2rem;text-align: right"  @click="choosecar">
            <img src="../assets/32.png" alt=""  style="width: .3rem">
          </div>
        </div>
        <div class="changebutton" @click="Complete">完成</div>
      </div>
    </div>
    <div class="changephone1 bounceIn animated" v-if="$store.state.changebindstate">
      <div class="changetitle">
        验证手机号
        <img src="../assets/close.png" alt="" @click="close1">
      </div>
      <div class="changecontent ">

        <mt-field placeholder="请输入手机号码" style="width: 93.3%;margin-left: 3.3%;margin-top: .7rem;color: #999999"
                  v-model="input2">
        </mt-field>
        <mt-field placeholder="请输入验证码" style="width: 93.3%;margin-left: 3.3%;margin-top: .7rem;color: #999999"
                  v-model="input3">
          <button style="font-size: .555rem;color: #03c8af;border: 0;background: #FFFFFF  " @click="getcode"
                  ref="getcode" :disabled=!this.canClick>{{cutNUm}}
          </button>
        </mt-field>
        <div class="changebutton1" @click="sure">确定</div>
      </div>
    </div>
    <div class="top">
      <!--<img src="../assets/37.png"/>-->
      <div>

        <p style="font-size: .88rem">尊敬的<span style="font-size: .788rem;color: #04c8af">{{carNo}}</span>车主</p>
        <p style="font-size: .6rem;margin-top: .2rem">.他人可能会通过微信公众号提醒您挪车，<br> 请留意 “码上挪车”消息提醒
        </p>
        <p style="font-size: .6rem">·他人可能会通过上传挡道照片，取得并拨<br> 叫您的手机号码，请注意接听
        </p>
        <p style="font-size: .6rem">·他人可能会通过114/12123等第三方平台<br> 联系您，请注意接听和接收
        </p>
      </div>
    </div>
    <div class="button"
         @touchstart.prevent="movestart(4)"
         @touchend.prevent="moveend(4)"
         ref="ppp4"
    >
      <img src="../assets/38.png"/>
    </div>
    <div class="foot">
      <div class="ppp"
           @touchstart.prevent="movestart(1)"
           @touchend.prevent="moveend(1)"
           ref="ppp"
      >
        <span><img src="../assets/first.png"/></span>
        <p>挪车码申请</p>
      </div>
      <div class="second"
           @touchstart.prevent="movestart(2)"
           @touchend.prevent="moveend(2)"
           ref="ppp1"
      >
        <span style="padding-top: .65rem;"><img src="../assets/second.png"/></span>
        <p>低价购车险</p>
      </div>
      <div class="three"
           @touchstart.prevent="movestart(3)"
           @touchend.prevent="moveend(3)"
           ref="ppp2"
      >
        <span style="padding-top: .7rem;"><img src="../assets/three.png"/>
        </span>
        <p>更多服务项</p></div>
    </div>
    <footer v-show="hideshow">
      <div>{{copyrightZh}}</div>
      <div>{{copyrightEn}}</div>
    </footer>
    <!--选择车牌号 首个汉字键盘 弹出层-->
    <div class="plate_number">
      <van-popup v-model="show_chinese" position="bottom" :overlay="true" overlay-class="displayNone">
        <div class="plate_chinese_box" id="plate_number">
          <!-- 点击对应的汉字，进行输入 -->
          <van-button
            size="small"
            v-for="(item, index) in ChineseList"
            :key="item.id"
            @click="checkChinese(index)"

          >{{item.name}}
          </van-button>
        </div>
      </van-popup>
    </div>
    <!-- 英文 数字 键盘 -->
    <div class="allBoard">
      <van-popup
        v-model="show_allBoard"
        position="bottom"
        :overlay="true"
        overlay-class="displayNone"
      >
        <div class="plate_number_box">
          <!-- 点击对应的字母或数字，进行输入 -->
          <van-button
            size="small"
            v-for="(item, index) in English_Number"
            :key="item.id"
            @click="checkEnglish_num(index)"
          >{{item.name}}
          </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import animate from 'animate.css'

  var time = ''
  export default {
    name: "kaka_changebind",
    data() {
      return {
        copyrightEn:sessionStorage.getItem("copyrightEn"),
        copyrightZh:sessionStorage.getItem("copyrightZh"),
        slots: [{values: ['白色/珍珠白', '银色', '黑色', '灰色', '红色', '蓝色', '棕褐色/米黄色', '绿色', '黄色/金色', '其他']}],
        popupVisible:false,
        carNo: JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo,
        input2: '',//手机号
        input3: '',//验证码
        input4: '',//输入的车牌
        input5: '',//验证码
        input6: '',//输入的车牌
        showchange: false,
        yanzheng: false,
        canClick: true,
        cutNUm: '获取验证码',
        num: '',
        qrcode: sessionStorage.getItem('qrcode'),
        openId: sessionStorage.getItem('openId'),
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hideshow: true,  //显
        showKeyboard: false,    //车牌号输入框是否聚焦
        show_chinese: false,     //是否显示汉字键盘
        show_allBoard: false,     //是否显示英文数字键盘
        ChineseList: [
          {name: '京', id: 1},
          {name: '津', id: 2},
          {name: '冀', id: 3},
          {name: '晋', id: 4},
          {name: '蒙', id: 5},
          {name: '辽', id: 6},
          {name: '吉', id: 7},
          {name: '黑', id: 8},
          {name: '沪', id: 9},
          {name: '苏', id: 10},
          {name: '浙', id: 11},
          {name: '皖', id: 12},
          {name: '闽', id: 13},
          {name: '赣', id: 14},
          {name: '鲁', id: 15},
          {name: '豫', id: 16},
          {name: '鄂', id: 17},
          {name: '湘', id: 18},
          {name: '粤', id: 19},
          {name: '桂', id: 20},
          {name: '琼', id: 21},
          {name: '渝', id: 22},
          {name: '川', id: 23},
          {name: '贵', id: 24},
          {name: '云', id: 25},
          {name: '藏', id: 26},
          {name: '陕', id: 27},
          {name: '甘', id: 28},
          {name: '青', id: 29},
          {name: '宁', id: 30},
          {name: '新', id: 31},
          {name: '←', id: 99},
        ],
        English_Number: [
          {name: '1', id: 28},
          {name: '2', id: 29},
          {name: '3', id: 30},
          {name: '4', id: 31},
          {name: '5', id: 32},
          {name: '6', id: 33},
          {name: '7', id: 34},
          {name: '8', id: 35},
          {name: '9', id: 36},
          {name: '0', id: 37},
          {name: 'Q', id: 38},
          {name: 'W', id: 39},
          {name: 'E', id: 40},
          {name: 'R', id: 41},
          {name: 'T', id: 42},
          {name: 'Y', id: 43},
          {name: 'U', id: 44},
          // {name: 'I', id: 45},
          // {name: 'O', id: 46},
          {name: 'P', id: 47},
          {name: 'A', id: 48},
          {name: 'S', id: 49},
          {name: 'D', id: 50},
          {name: 'F', id: 51},
          {name: 'G', id: 52},
          {name: 'H', id: 53},
          {name: 'J', id: 54},
          {name: 'K', id: 55},
          {name: 'L', id: 56},
          {name: 'Z', id: 57},
          {name: 'X', id: 58},
          {name: 'C', id: 59},
          {name: 'V', id: 60},
          {name: 'B', id: 61},
          {name: 'N', id: 62},
          {name: 'M', id: 63},
          {name: '←', id: 99},
          {name: '退出', id: 100},
        ],
        plate_number: '',   //车牌号
        chepai: '',
        first: '',
        numArr: [],
      }
    },
    mounted() {
      if (this.$store.state.carbrandname == null) {
      } else {
        this.input5 = this.$store.state.carbrandname
      }
      if (this.$store.state.ppp == null) {
      } else {
        this.input4 = this.$store.state.ppp
      }
      if (this.$store.state.ooo == null) {
      } else {
        this.input6 = this.$store.state.ooo
      }
      // window.onresize监听页面高度的变化
      window.onresize = () => {
        return (() => {
          this.showHeight = document.body.clientHeight;
        })()
      }
    },
//监听
    watch: {
      showHeight: function () {
        if (this.docmHeight > this.showHeight) {
          this.hideshow = false
        } else {
          this.hideshow = true
        }
      },
      input6(){
        this.$store.state.ooo=this.input6
      },
      input4(){
        this.$store.state.ppp=this.input4
      }
    },
    methods: {
      choosecar(){
        let time = setInterval(() => {
          this.$router.push({path: '/kaka_VehicleBrand'})
          clearTimeout(time)
        }, 500)
      },
      onValuesChange(picker, values) {
        if (values[0] == '其他（手动输入）') {
          this.input6 = '其他'
        } else {
          this.input6 = values[0]
        }

      },
      miss() {
        this.input6 = ''
        this.popupVisible = false
      },
      sure1() {
        this.popupVisible = false
      },
      tochart() {
        this.$router.push({
          name: 'chart',
          params: {
            code: this.qrcode,
            openId: this.openId,
          }
        })
      },
      //点击确定完成身份验证
      sure() {
        if (!(/^1[3456789]\d{9}$/.test(this.input2))) {
          Toast('请填写正确的手机号');
          return false;
        } else if (!(/^\d{6}$/.test(this.input3))) {
          Toast('请填写正确的验证码');
          return false;
        } else {
          Indicator.open({
            text: '身份验证中...',
          });
          this.axios.post('moveCarB/checkBindMobilePhoneNo', {
            "qrCode": sessionStorage.getItem('qrcode'),
            "openId": this.openId,
            "mobilePhoneNo": this.input2,
            "captcha": this.input3
          }).then((res) => {
            Indicator.close();
            if (res.data.state == 1) {
              Toast('验证成功');
              this.yanzheng = false
              this.$store.state.changebindstate=false
              this.$store.state.changebindstate1 = true
            } else {
              Toast(res.data.retMsg);
            }
          })
        }
      },
      //点击完成按钮 完成绑定
      Complete() {
        if (/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(this.input4)) {
          Indicator.open({
            text: '车牌绑定中...',
          });
          this.axios.post('moveCarB/updateBindMoveCarQrCode', {
            "qrCode": sessionStorage.getItem('qrcode'),
            "openId": this.openId,
            "carNo": this.input4
          }).then((res) => {
            Indicator.close();
            if (res.data.state == 1) {
              this.$store.state.changebindstate1 = false
              Toast('修改成功');
            } else {
              Toast(res.data.retMsg);
            }
          })
        } else {
          Toast('请输入正确的车牌号');
        }
      },
      //关闭验证手机号
      close1() {
        this.$store.state.changebindstate = false;
      },
      close2() {
        this.$store.state.changebindstate1 = false;
      },
      getcode() {
        if (this.input2 == '') {
          Toast('请先填写手机号');
          return false;
        } else if (!(/^1[3456789]\d{9}$/.test(this.input2))) {
          Toast('请填写正确的手机号');
          return false;
        } else {
          if (!this.canClick) return
          if (this.canClick) {
            this.axios.post('moveCarB/getCaptcha', {
              "qrCode": sessionStorage.getItem('qrcode'),
              "openId": this.openId,
              "mobilePhoneNo": this.input2
            }).then((res) => {
            })
          }
          this.canClick = false;
          this.num = 60;
          this.cutNUm = `${this.num}s后重新获取`
          time = setInterval(() => {
            this.num--
            this.cutNUm = `${this.num}s后重新获取`
            if (this.num === 0) {
              this.cutNUm = '获取验证码'
              this.canClick = true
              clearInterval(time)
            }
          }, 1000)
        }

      },
      movestart(m) {
        if (m == 1) {
          this.$refs.ppp.style.background = '#13a895'
        } else if (m == 2) {
          this.$refs.ppp1.style.background = '#13a895'
        } else if (m == 3) {
          this.$refs.ppp2.style.background = '#13a895'
        } else {
          this.$refs.ppp4.style.borderColor = '#13a895'
        }
      },
      moveend(m) {
        if (m == 1) {
          this.$refs.ppp.style.background = '#03c8af';
          this.$router.push({path: '/kaka_askmove'})
        } else if (m == 2) {
          this.$refs.ppp1.style.background = '#03c8af';
          // this.$router.push({path: '/kaka_buypicc'})
          window.location.href = 'https://kaka.kelibbb.com/klkl/merchants.php?m=Carinsur&c=h5&a=index&key=kk'

        } else if (m == 3) {
          this.$refs.ppp2.style.background = '#03c8af';
          this.$router.push({path: '/kaka_moreservice'})
        } else {
          this.$refs.ppp4.style.borderColor = '#03c8af'
          this.$store.state.changebindstate = true;

        }
      },
      // 唤起键盘
      getItem1(e) {
        this.hideshow = false;
        e.target.setAttribute('v-model', this.chepai);
        if (!this.first) {
          this.show_chinese = true;
        } else {
          this.show_chinese = false;
          this.show_allBoard = true;
        }
      },
      // 选择车牌号前面的汉字
      checkChinese(index) {
        //如果点击删除键，删除第一个格的内容
        if (this.ChineseList[index].id == 99) {
          this.first = '';
        } else {
          // 把选中的字赋值给第一个格，并且切换键盘
          this.first = this.ChineseList[index].name;
          this.show_chinese = false;
          this.show_allBoard = true;
        }
        /**车牌号赋值*/
        let val = this.first + this.numArr.join().replace(/,/g, '');
        this.input4 = val
      },
      // 选择车牌号后面的数字和字母
      checkEnglish_num(index) {
        // 如果点击删除键，删除 numArr 的最后一个值
        if (this.English_Number[index].id == 99) {
          this.numArr.pop();
          // 如果 numArr 里面被删的没有值了，切换键盘
          if (this.numArr.length == 0) {
            this.show_chinese = true;
            this.show_allBoard = false;
          }
        } else if (this.English_Number[index].id == 100) {
          this.show_chinese = false;
          this.show_allBoard = false;
        } else {
          // 把选中的值 push 到 numArr 内
          this.numArr.push(this.English_Number[index].name);
          // 如果 numArr 中的值超过 7 个（车牌号的最大位数），删除最后一个
          if (this.numArr.length > 7) {
            // this.show_chinese = false;
            // this.show_allBoard = false;
            this.numArr.pop()
          }
        }
        /**车牌号赋值*/
        let val = this.first + this.numArr.join().replace(/,/g, '');
        this.input4 = val
      },
      // 关闭虚拟键盘
      close_keyboard() {
        this.show_chinese = false;
        this.show_allBoard = false;
      }

    },


  }
</script>

<style scoped lang="scss">
  .pickhead {
    line-height: 1.7rem;
    height: 1.7rem;
    display: flex;
    justify-content: space-between;
    /*background-color: #f1f1f1;*/
    border-bottom: 1px solid #dddddd;
    color: #04c8af;
    font-size: .7rem;
    text-align: center;
  }

  .left {
    width: 50%;
  }

  .right {
    width: 50%;
  }
  .keyboard {
    width: 100%;
    position: absolute;
  }

  .input-box {
    width: 21rem;
    height: 3.2rem;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 8px 0px rgba(96, 100, 112, 0.1);
    border-radius: .4rem;
    border: 1px solid rgba(206, 208, 210, 1);
    margin: 0 auto 2rem;
    display: flex;
    justify-content: center;

    li {
      flex: 1;
      border-right: 1px solid rgba(206, 208, 210, 1);
      box-sizing: border-box;
      margin-left: -1px;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #323233;
    }

    li:last-child {
      border: none;
    }
  }

  .class-close-box {
    width: 2rem;
    height: 1.5rem;
    position: absolute;
    right: 0.5rem;
    top: -1.3rem;
  }

  .class-close-box-div {
    width: 1rem;
    height: 1rem;
    font-size: 0.8rem;
    line-height: 1rem;
    margin: auto;
    text-align: center;
    border: 1px solid #666;
    border-radius: 50%;
  }

  .class-close-box-li {
    width: 1px;
    height: 0.5rem;
    background: #666;
    margin: auto;
  }

  .overflow-y {
    overflow-y: inherit;
  }

  .class-van-button-small {
    min-width: 0;
    border-radius: 5px;
    margin: 5px 2px;
    box-shadow: 5px 5px 5px #aaa;
  }

  .class-plate-box {
    width: 100%;
    padding: 0.7rem 0.5rem;
    box-sizing: border-box;
    background: rgba(3, 200, 175, 0.2);
    position: relative;
  }

  .plate_number {
    .van-popup {
      @extend .overflow-y;
    }

    .van-popup--bottom {
      background: #eee;
    }

    .plate_chinese_box {
      width: 100%;
      @extend .class-plate-box;

      .close-box {
        @extend .class-close-box;

        div {
          @extend .class-close-box-div;
        }

        li {
          @extend .class-close-box-li;
        }
      }

      .van-button--small {
        width: 11.3%;
        height: 1.8rem;
        @extend .class-van-button-small;
      }
    }
  }

  .allBoard {
    .van-popup {
      @extend .overflow-y;
    }

    .plate_number_box {
      width: 100%;
      @extend .class-plate-box;

      .close-box {
        @extend .class-close-box;

        div {
          @extend .class-close-box-div;
        }

        li {
          @extend .class-close-box-li;
        }
      }

      .van-button--small {
        width: 8.8%;
        height: 1.8rem;
        @extend .class-van-button-small;
      }

      .van-button--small:nth-child(1) {
        margin-bottom: 5px;
      }

      .van-button--small:nth-child(21) {
        margin-left: 5%;
      }

      .van-button--small:nth-child(30) {
        margin-left: 10%;
      }

      .van-button--small:nth-child(35) {
        width: 12.5%;
        font-weight: 700;
      }

      .van-button--small:last-child {
        width: 13%;
        font-weight: 500;
      }
    }
  }

  .changebutton {
    width: 93.3%;
    height: 1.877rem;
    line-height: 1.877rem;
    font-size: .768rem;
    color: #FFFFFF;
    text-align: center;
    background-color: #03c8af;
    margin: .5rem auto;
    border-radius: .9rem;
  }

  .changebutton1 {
    width: 93.3%;
    height: 1.877rem;
    line-height: 1.877rem;
    font-size: .768rem;
    color: #FFFFFF;
    text-align: center;
    background-color: #03c8af;
    margin: .8rem auto;
    border-radius: .9rem;
  }

  .changetitle {
    line-height: 1.9rem;
    height: 1.9rem;
    width: 100%;
    background-color: #03c8af;
    border-radius: .2rem .2rem 0 0;
    text-align: center;
    color: #FFFFFF;
    font-size: .777rem;

    img {
      width: .8rem;
      position: relative;
      left: 4.2rem;
      top: .2rem;
    }
  }

  .changephone {
    width: 93%;
    background-color: #f1f1f1;
    position: fixed;
    top: 15%;
    left: 3.4%;
    z-index: 5;
    border-radius: .2rem;
  }

  .changephone1 {
    width: 93%;
    background-color: #f1f1f1;
    height: 11rem;
    position: fixed;
    top: 30%;
    left: 3.4%;
    z-index: 5;
    border-radius: .2rem;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 3;
  }

  .foot div span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.066rem;
    height: 1.066rem;
    padding-top: 0 !important;
  }

  .foot div span img {
    width: 100%;
    height: 100%;
  }

  .ppp span {
    padding-top: 0 !important;
    margin-top: .1rem;
  }

  .foot div p {
    color: #ffffff;
    text-align: center;
    font-size: .64rem;
    margin: 0;
    margin-top: .4rem;
  }

  .foot {
    width: 94.3%;
    height: 3.514rem;
    margin: 0 auto;
    margin-top: -1.5rem;
    background-color: #FFFFFF;
    border-radius: .426rem;
    display: flex;
    justify-content: space-around;
  }

  .second, .three {
    width: 33%;
    line-height: 100%;
    height: 100%;
    background-color: #03c8af;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ppp {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33%;
    line-height: 100%;
    height: 100%;
    background-color: #03c8af;
    border-radius: .426rem 0 0 .426rem;
  }

  .three {
    border-radius: 0 .426rem .426rem 0;
  }

  .button {
    width: 4.693rem;
    height: 4.693rem;
    border-radius: 50%;
    position: relative;
    left: 34%;
    bottom: 2.4rem;
    border: solid 1px #03c8af;
    box-shadow: 0 2px 10px #dddddd;
  }

  .button img {
    width: 117%;
    height: 117%;
    position: relative;
    right: .4rem;
    bottom: .29rem;
  }

  .content {
    width: 100%;
  }

  .top {
    width: 94%;
    margin: 0 auto;
    height: 16.5rem;
    display: flex;
    justify-content: center;
    background: url("../assets/37.png") no-repeat;
    background-size: cover;
    padding-bottom: 1.5rem;
    align-items: center;
    color: #333333;

    div {
      p {
        padding-bottom: .2rem;
      }
    }
  }

  .top img {
    width: 93.3%;
    height: 100%;
  }

  footer {
    width: 100%;
    position: fixed;
    bottom: .426em;
  }

  footer div {
    width: 100%;
    font-size: .383rem;
    color: #999999;
    text-align: center;
    font-weight: 300;

  }

  .content {
    margin-top: .64rem;
    width: 100%;
    display: inline-block;
  }
</style>
<style>
  .changecontent .mint-field-core::placeholder {
    color: #999999;
    font-size: .6rem;
  }

  .changecontent .mint-field {
    border-radius: .9rem;
  }

  .plate_number .van-overlay {
    background-color: rgba(0, 0, 0, .1);
  }

  .allBoard .van-overlay {
    background-color: rgba(0, 0, 0, .1) !important;
  }
</style>

