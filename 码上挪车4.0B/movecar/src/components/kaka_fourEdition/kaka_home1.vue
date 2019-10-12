<template>
  <div class="content qqq">
    <van-popup v-model="changebind">
      <div style="background: #f1f1f1;height: 100%" v-if="changebind">
        <div class="changetitle">
          验证手机号
          <img src="../../assets/close.png" alt="" @click="close1">
        </div>
        <div class="changecontent ">
          <mt-field placeholder="请输入手机号码" style="width: 93.3%;margin-left: 3.3%;margin-top: 5vw;"
                    v-model="input2" @blur.native.capture="checkCard" type="number">
          </mt-field>
          <mt-field placeholder="请输入验证码" style="width: 93.3%;margin-left: 3.3%;margin-top: 4vw;"
                    v-model="input3" :disableClear="true" @blur.native.capture="checkCard" type="number">
            <button style="font-size: .64rem;color: #03c8af;border: 0;background: #FFFFFF;padding-right: .64rem"
                    @click="getcode"
                    ref="getcode" :disabled=!this.canClick>{{cutNUm}}
            </button>
          </mt-field>
          <div class="changebutton1" @click="sure">下一步</div>
        </div>
      </div>

    </van-popup>
    <van-popup v-model="show" :overlay="false">
      <div style="background: #f1f1f1;height: 100%">
        <div class="changetitle">
          修改车牌绑定
          <img src="../../assets/close.png" alt="" @click="close2">
        </div>
        <div class="changecontent changecontent2">
          <div @click="getItem1">
            <mt-field placeholder="请输入新车牌" style="width: 93.3%;margin-left: 3.3%;margin-top: 5vw;"
                      v-model="input4" :disableClear="true" readonly="readonly">
            </mt-field>
          </div>

          <mt-field placeholder="请选择车型品牌" style="width: 93.3%;margin-left: 3.3%;margin-top: 4vw;"
                    v-model="input5" :disableClear="true">
            <div style="width: 2rem;text-align: right" @click="choosecar">
              <img src="../../assets/32.png" alt="" style="width: .3rem">
            </div>
          </mt-field>
          <div class="changebutton1" @click="Complete">完成</div>
        </div>
      </div>
    </van-popup>
    <van-overlay
      :show="show"
    />
    <div style="height: 93vh">
      <div class="topimg">
        <img src="../../assets/topimg.png" alt="">
      </div>
      <div class="input" @click="getItem1">
        <input type="text" placeholder="请输入车牌号码" class="carphone" v-model="input6" readonly="readonly">
      </div>
      <div class="button" @click="movestart">进入挪车</div>
      <div class="more">
        <span @click="choose(4)" v-if="$store.state.isBind!=0">
          <div class="logo">
            <img src="../../assets/166.png" alt="">
          </div>
          <div class="title">我的挪车码</div>
        </span>
        <span @click="choose(1)" v-else>
          <div class="logo">
            <img src="../../assets/167.png" alt="">
          </div>
          <div class="title">申请挪车码</div>
        </span>
        <span @click="choose(2)">
          <div class="logo">
            <img src="../../assets/123.png" alt="">
          </div>
          <div class="title">低价购车险</div>
        </span>
        <span @click="choose(3)">
          <div class="logo">
            <img src="../../assets/121.png" alt="">
          </div>
          <div class="title">更多服务项</div>
        </span>
      </div>
    </div>
    <div class="footer">
      <p>{{copyrightZh}}</p>
      <p>{{copyrightEn}}</p>
    </div>
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
            :disabled="item.id==45||item.id==46"
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
  import {Toast} from 'vant';
  import {Overlay} from 'vant';

  var time = ''
  export default {
    name: "kaka_home1",
    data() {
      return {
        show: false,
        canClick: true,
        cutNUm: '获取验证码',
        changebind: false,
        openId: sessionStorage.getItem('openId'),
        carNO: null,//车牌
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
          {name: 'I', id: 45},
          {name: 'O', id: 46},
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
        chinesename: '浙',
        englishname: null,
        input3: null, input2: null,
        input4: null, input5: null, input6: null,
        copyrightZh: sessionStorage.getItem("copyrightZh"),
        copyrightEn:sessionStorage.getItem("copyrightEn")
      }
    },
    mounted() {
      console.log(this.copyrightZh,this.copyrightEn,1234)
      console.log(JSON.parse(sessionStorage.getItem('bindcarinfo')),111)
      if (JSON.parse(sessionStorage.getItem('bindcarinfo'))==null) {
      } else {
        this.input6 = JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo
      }
      if (this.$store.state.carbrandname == null) {
      } else {
        this.input5 = this.$store.state.carbrandname
      }
      if (this.$store.state.ppp == null) {
      } else {
        this.input4 = this.$store.state.ppp
      }
      if (this.$store.state.showchangebind == null) {
      } else {
        this.show = this.$store.state.showchangebind
      }
    },
    watch: {
      input4() {
        this.$store.state.ppp = this.input4
      },
      show() {
        this.$store.state.showchangebind = this.show
      }
    },
    methods: {
      oooo() {
        window.location.href = 'http://192.168.123.36:8080/#/kaka_VehicleownerWechat/苏N729R8/oq8UW5vbk7cRLP1C1VZv22kuVPq4'
      },
      checkCard() {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      },
      //点击完成按钮 完成绑定
      Complete() {
        if (/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(this.input4)) {
          Indicator.open({
            text: '车牌绑定中...',
          });
          this.axios.post('moveCarB/updateBindMoveCarQrCode', {
            "openId": this.openId,
            "carNo": this.input4,
            "carBrand": this.input5
          }).then((res) => {
            Indicator.close();
            // console.log(res.data)
            if (res.data.state == 1) {
              Toast('修改成功');
              this.show = false;//修改成功关闭车牌
            } else {
              Toast(res.data.retMsg);
            }
          })
        } else {
          Toast('请输入正确的车牌号');
        }
      },
      //点击选车
      choosecar() {
        let time = setInterval(() => {
          this.$router.push({path: '/kaka_VehicleBrand'})
          clearTimeout(time)
        }, 500)
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
            "openId": this.openId,
            "mobilePhoneNo": this.input2,
            "captcha": this.input3
          }).then((res) => {
            Indicator.close();
            // console.log(res.data)
            if (res.data.state == 1) {
              Toast('手机号验证成功');
              this.changebind = false;//关闭雁阵个窗口
              this.show = true;//开启输入窗口
            } else {
              Toast(res.data.retMsg);
            }
          })
        }
      },
      getcode() {
        if (this.input2 == null) {
          Toast('请先填写手机号');
          return false;
        } else if (!(/^1[3456789]\d{9}$/.test(this.input2))) {
          Toast('请填写正确的手机号');
          return false;
        } else {
          if (!this.canClick) return
          if (this.canClick) {
            this.axios.post('moveCarB/getCaptcha', {
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
      //开启挪车
      //关闭验证手机号
      close1() {
        this.changebind = false;
      },
      close2() {
        this.show = false;
      },
      movestart() {
        if (/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(this.input6)) {
          this.axios.post('/moveCarB/checkCarOwnerBind', {
            carNo: this.input6,
            openId: this.openId
          }).then((res) => {
            if (res.data.state == 1) {
              sessionStorage.setItem('bindcarinfo', JSON.stringify(res.data.data))
              this.$router.push({path: '/kaka_intomovecar'})
            } else {
              Toast(res.data.retMsg);
            }
          })
        } else {
          Toast('请输入正确的车牌号');
        }

      },
      choose(m) {
        if (m === 1) {
          setTimeout(() => {
            this.$router.push({path: '/kaka_bindCar'})
          }, 100)
        } else if (m === 2) {
          setTimeout(() => {
            window.location.href = 'https://kaka.kelibbb.com/klkl/merchants.php?m=Carinsur&c=h5&a=index&key=kk'
          }, 100)
        } else if ((m === 3)) {
          setTimeout(() => {
            this.$router.push({path: '/kaka_moreservice',
              query:{
                organizationId:sessionStorage.getItem('organizationId')
              }})
          }, 100)
        } else {
          this.$router.push({path: '/kaka_mycenter'})
        }
      },
      // 唤起键盘
      getItem1(e) {
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
        this.carNo = val
        if (this.show == true) {
          this.input4 = val
        } else {
          this.chinesename = this.first
          this.input6 = val
        }
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
        this.carNo = val
        if (this.show == true) {
          this.input4 = val
        } else {
          this.englishname = this.numArr.join().replace(/,/g, '')
          this.input6 = val
        }

      },
      // 关闭虚拟键盘
      close_keyboard() {
        this.show_chinese = false;
        this.show_allBoard = false;
      },
    }
  }
</script>

<style scoped lang="scss">
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
    margin: 4vw auto 0;
    border-radius: .9rem;
  }

  .changetitle {
    line-height: 12vw;
    height: 12vw;
    width: 100%;
    background-color: #03c8af;
    border-radius: .2rem .2rem 0 0;
    text-align: center;
    color: #FFFFFF;
    font-size: .777rem;
    padding-left: .64rem;

    img {
      width: .64rem;
      position: relative;
      left: 4.2rem;
      top: 0.1rem;
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

  .content {
    padding-top: 3vw;
    width: 100%;
    height: 100%;

    .topimg {
      width: 88vw;
      height: 63vw;
      margin: 0 auto 0;
      /*background: red;*/
      img {
        width: 100%;
        height: 100%;
      }
    }

    .input {
      width: 88vw;
      height: 13vw;
      background-color: #ffffff;
      border-radius: 7vw;
      border: solid 1px #03c8af;
      margin: 10.4vw auto 0;
      display: flex;
      align-items: center;

      input {
        color: #666666;
      }

      .span1 {
        font-size: 5vw;
        font-weight: normal;
        font-stretch: normal;
        line-height: 13vw;
        color: #15d1b9;
        margin-left: 5vw;
      }

      .down {
        width: 3vw;
        height: 13vw;
        display: inline-block;
        margin-left: 2vw;
        display: flex;
        align-items: center;

        img {
          width: 3vw;
          height: 2vw;
        }
      }

      .carphone {
        height: 100%;
        line-height: 100%;
        border: 0;
        outline: none;
        padding-left: .64rem;
        margin-left: 3vw;
        flex: 1;
        font-size: .74rem;
        color: #333333;
      }

      .carphone::placeholder {
        font-size: .74rem;
        color: #999999;
      }
    }

    .button {
      width: 88vw;
      height: 13vw;
      line-height: 13vw;
      color: #ffffff;
      font-weight: 500;
      background-color: #15d1b9;
      border-radius: 7vw;
      margin: 5.6vw auto 0;
      font-size: 5vw;
      text-align: center;
    }

    .more {
      width: 89vw;
      height: 21vw;
      margin: 12vw auto 0;
      display: flex;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 24vw;
        height: 21vw;
        background-color: #ffffff;
        border-radius: 1vw;
        border: solid 1px #03c8af;

        .logo {
          width: 8vw;
          height: 8vw;
          margin: 4vw auto 0;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          height: 4vw;
          font-size: .58rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0vw;
          color: #333333;
          text-align: center;
          margin-top: 1vw;
        }
      }

    }

    .footer {
      width: 100%;
      /*position: fixed;*/
      /*bottom: 0.34rem;*/
      /*margin-top: 4vh;*/


      p {
        height: 2vw;
        line-height: 2vw;
        font-size: 9px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #999999;
        text-align: center;
      }

      /*p:nth-child(1){*/
      /*margin-top: 9vw;*/
      /*}*/
      p:nth-child(2) {
        margin-top: .2rem;
      }
    }
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
    box-shadow: 1px 1px 5px #aaa;
  }

  .class-plate-box {
    width: 100%;
    padding: 0.7rem 0.5rem;
    box-sizing: border-box;
    /*background: rgba(3, 200, 175, 0.2);*/
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
        margin-left: 6%;
      }

      .van-button--small:nth-child(30) {
        margin-left: 2%;
      }

      .van-button--small:nth-child(37) {
        width: 12.5%;
        font-weight: 700;
      }

      .van-button--small:last-child {
        width: 13%;
        font-weight: 500;
      }
    }
  }
</style>
<style>
  .qqq {
    background-repeat: repeat;
    background: white;
    display: flex;
    flex-direction: column;
  }

  .changecontent .mint-cell-wrapper {
    background-repeat: repeat;
    background: white;
  }

  .changecontent .mint-field-core {
    padding-left: .64rem;
    font-size: .64rem;
    color: #333333;
  }

  .changecontent .mint-field-core::placeholder {
    font-size: .64rem;
    color: #999999;
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

  .van-popup--center {
    width: 95vw;
    height: 66vw;
    border-radius: 3vw;
    background: #f1f1f1;
  }

  .changecontent2 .mint-field-other {
    width: 2rem;
  }
</style>

