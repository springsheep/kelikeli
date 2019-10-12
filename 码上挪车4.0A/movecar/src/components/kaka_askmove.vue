<template>
  <div class="content">
    <mt-popup
      pop-transition="pop-transition"
      v-model="popupVisible"
      v-if="popupVisible"
      lockScroll="false"
      position="bottom"
      style="width: 100%">
      <div class="pickhead">
        <div class="left" @click="miss">取消</div>
        <div class="right" @click="sure">确定</div>
      </div>
      <mt-picker :slots="slots" value-key="name" @change="onValuesChange" style="width: 100%">
      </mt-picker>
    </mt-popup>
    <div class="head">
      <img src="../assets/four.png"/></div>
    <div class="input">
      <div @click="getItem1">
        <el-input placeholder="请输入车牌号" v-model="input1" style="margin-top: 1.28rem;" readonly="readonly"></el-input>
      </div>
      <el-input placeholder="请输入手机号" v-model="input2" style="margin-top: .64rem;" type="number"></el-input>
      <div style="position:relative;">
        <el-input placeholder="请选择车辆品牌" v-model="input3" style="margin-top: .64rem;"></el-input>
        <div style="position: absolute;right: 0rem;padding-right: .6rem;bottom: .55rem;width: 2rem;text-align: right" @click="choosecar">
          <img src="../assets/32.png" alt="" style="width: .3rem">
        </div>

      </div>
      <div class="button" @click="next" style=";line-height: 1.87rem">生成挪车码</div>
      <div class="protect">
        <img src="../assets/bindcarbottom.png" class="img"/></div>
      <div class="tip">
        <img src="../assets/tip.png" style="height: 10px;margin-right: 8px"/>
        <div @click="ifshowtip=true">查看使用帮助</div>
      </div>
      <div class="mask " @click="close" v-if="ifshowtip">
        <img src="../assets/help.png" width="93.4%" class="bounceIn animated"/>
      </div>
    </div>
    <footer v-show="hideshow">
      <div>{{bindcarinfo.copyrightZh}}</div>
      <div style="color: #999999">{{bindcarinfo.copyrightEn}}</div>
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
            :disabled="item.id==45||item.id==46"
            :class="{qqq:(item.id==45||item.id==46)}"
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

  export default {
    name: "kaka_askmove",
    data() {
      return {
        popupVisible: false,
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        ifshowtip: false,
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
        openId: sessionStorage.getItem('openId'),
        bindcarinfo:null
      }
    }, watch: {
      input1() {
        this.$store.state.carNum = this.input1
      },
      input2() {
        this.$store.state.phone = this.input2
      },
    },
    methods: {
      choosecar() {
        console.log(11)
        let time = setInterval(() => {
          this.$router.push({path: '/kaka_VehicleBrand'})
          clearTimeout(time)
        }, 500)
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
        console.log(val)
        this.input1 = val
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
        console.log(val.length, val)
        this.input1 = val
      },
      // 关闭虚拟键盘
      close_keyboard() {
        this.show_chinese = false;
        this.show_allBoard = false;
      },
      next() {
        if (!(/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(this.input1))) {
          Toast('请填写正确的车牌');
          return false;
        } else if (!(/^1[3456789]\d{9}$/.test(this.input2))) {
          Toast('请填写正确的手机号');
          return false;
        } else if (this.input3 == '') {
          Toast('请填写车辆品牌');
          return false;
        } else {
          Indicator.open({
            text: '生成中，请稍后...',
          });
          this.axios.post('moveCar/selfCreateMoveCarQrCode', {
            "openId": this.openId,
            "carNo": this.input1,
            "mobilePhoneNo": this.input2,
            "carBrand": this.input3,
          }).then((res) => {
            Indicator.close();
            if (res.data.state == 1) {
              Toast('生成成功');
              // this.$store.state.movecarInfo = res.data.data;
              sessionStorage.setItem('movecarInfo',JSON.stringify(res.data.data))
              this.$router.push({path: '/kaka_movecarmodule'})
            } else {
              Toast(res.data.retMsg);
            }
          })
        }
      },
      close() {
        this.ifshowtip = false;
      },
      miss() {
        this.popupVisible = false
      },
      sure() {
        this.popupVisible = false
      },
    },
    created() {
      console.log(1111)
      console.log(sessionStorage.getItem('bindcarinfo'),123213412)
      this.bindcarinfo=JSON.parse(sessionStorage.getItem('bindcarinfo'))
      if (this.$store.state.carbrandname == null) {

      } else {
        this.input3 = this.$store.state.carbrandname
      }
      if (this.$store.state.carNum == null) {

      } else {
        this.input1 = this.$store.state.carNum
      }
      if (this.$store.state.phone == null) {

      } else {
        this.input2 = this.$store.state.phone
      }
    }
  }
</script>

<style scoped lang="scss">
  .qqq {
    color: #999999;
    background: #f1f1f1;
  }

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

  footer {
    width: 100%;
    margin-bottom: .3rem;

  }

  footer div {
    width: 100%;
    font-size: .383rem;
    color: #666666;
    text-align: center;
    font-weight: 300;

  }

  .tip {
    width: 100%;
    font-size: .4rem;
    color: #04c8af;
    text-align: center;
    margin-top: .64rem;
    margin-bottom: .64rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .mask img {
    position: fixed;
    top: 30%;
    left: 3%;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .protect {
    margin: 0 auto;
    margin-top: 1rem;
    width: 100%;
    background-color: #eeeeee;
    border-radius: .3rem;
    height: 9rem;
  }

  .button {
    width: 100%;
    margin: 0 auto;
    margin-top: .64rem;
    background-color: #04c8af;
    color: #FFFFFF;
    font-size: .7rem;
    border-radius: .9rem;
    text-align: center;

  }

  .input {
    width: 93.3%;
    margin: 0 auto;
  }

  .content {
    width: 100%;
  }

  .head {
    /*height: 6.8rem;*/
  }

  .head img {
    width: 100%;
    height: auto;
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
        margin-left: 3%;
      }

      .van-button--small:nth-child(37) {
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
  .input .el-input__inner {
    height: 1.877rem;
    font-size: .6rem;
    line-height: .6rem;
    padding: 0 .65rem;
    font-weight: 300;
    border-radius: .9rem;
    z-index: 2;
  }

  /*.input .el-input .el-input__inner {*/
    /*height: 1.87rem;*/
    /*border-radius: .9rem;*/
  /*}*/

  .plate_number .van-overlay {
    background-color: rgba(0, 0, 0, .1);
  }

  .allBoard .van-overlay {
    background-color: rgba(0, 0, 0, .1) !important;
  }
</style>
