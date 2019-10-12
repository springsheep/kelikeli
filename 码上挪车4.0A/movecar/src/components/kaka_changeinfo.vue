<template>
  <div class="settime">
    <div @click="choose(1)">
      <mt-field v-model="carNo" v-show="flag==2" :disableClear="true" readonly="readonly"></mt-field>
    </div>
    <!--提交-->
    <div class="inputbutton" v-show="flag==2" @click="change">
      保存
    </div>
    <mt-field v-model="mobilePhoneNo" v-show="flag==3" :disableClear="true"
              @focus.native.capture="choose(2)"></mt-field>
    <!--提交-->
    <div class="inputbutton" v-show="flag==3" @click="change">
      保存
    </div>
    <mt-field v-model="carBrand" v-show="flag==4" :disableClear="true">
      <!--<mt-button size="small" @click="change">修改</mt-button>-->
      <div style="width: 2rem;text-align: right;height: 2.2rem;line-height: 2.2rem" @click="choosecar">
        <img src="../assets/154.png" alt="" style="width: .3rem">
      </div>
    </mt-field>
    <!--提交-->
    <div class="inputbutton" v-show="flag==4" @click="change">
      保存
    </div>
    <van-switch-cell v-model="checked" :title="checked?'已启用':'已停用'" active-color="#03c8af" v-show="flag==5"/>
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
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_changeinfo",
    data() {
      return {
        carNo: '',
        mobilePhoneNo: '',
        carBrand: '',
        status: '已启用',
        checked: true,
        flag: null,
        changeinfo: null,
        witchone: null,//判断是更改哪个
        openId: sessionStorage.getItem('openId'),
        isStop: null,
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
      }
    },
    created() {
      this.flag = this.$store.state.changeinfoflag
      this.changeinfo = this.$store.state.changeinfo
      this.carNo = this.changeinfo.carNo
      this.mobilePhoneNo = this.changeinfo.mobilePhoneNo
      this.carBrand = this.changeinfo.carBrand
      console.log(this.$store.state.changeinfo)
      if (this.changeinfo.isStop === '0') {
        this.checked = true
      } else {
        this.checked = false
        console.log(this.checked)
      }
      if (this.$store.state.carbrandname == null) {

      } else {
        this.carBrand = this.$store.state.carbrandname;
        this.$store.state.carbrandname = null
      }
    }, watch: {
      checked() {
        if (this.flag == 5) {
          if (this.checked) {
            this.isStop = 0
            console.log(this.isStop)
            this.changefun()
          } else {
            this.isStop = 1
            console.log(this.isStop)
            this.changefun()
          }
        }
      }
    },
    methods: {
      // 唤起键盘
      getItem1(e) {
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
        console.log(val)
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
        console.log(val)
        this.carNo = val
      },
      // 关闭虚拟键盘
      close_keyboard() {
        this.show_chinese = false;
        this.show_allBoard = false;
      },
      choose(m) {
        console.log(111)
        this.witchone = m;
        if (m == 1) {
          this.getItem1()
        }

      },
      choosecar() {
        let time = setInterval(() => {
          this.$router.push({path: '/kaka_VehicleBrand'})
          clearTimeout(time)
        }, 200)
      }
      ,
      change() {
        this.changefun()
      },
      changefun() {
        this.axios.post('moveCar/updateBindMoveCarQrCode', {
          "qrCodeId": this.changeinfo.id,
          "openId": this.openId,
          "carNo": this.carNo,
          'isStop': this.isStop,
          'mobilePhoneNo': this.mobilePhoneNo,
          "carBrand": this.carBrand,
        }).then((res) => {
          if (res.data.state == 1) {
            if (this.flag != 5) {
              this.$router.push({path: '/kaka_changebinding'})
            }
          } else {
            Toast(res.data.retMsg);
          }
        })
      }
    }
  }
</script>

<style scoped>

  .settime {
    width: 100%;
  }

  .inputbutton {
    width: 92vw;
    height: 12vw;
    background-color: #15d1b9;
    border-radius: 6vw;
    line-height: 12vw;
    font-size: .766rem;
    color: #ffffff;
    text-align: center;
    margin: 8vw auto;
  }

</style>
<style scoped lang="scss">
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
  .van-picker__cancel, .van-picker__confirm {
    color: #04c8af;
    font-size: .64rem;
  }

  .settime .van-cell {
    font-size: .64rem;
    color: #333333;
    padding: .5rem .64rem;
  }

  .settime .van-switch-cell {
    padding: .5rem .64rem;
  }

  .settime .van-cell__value {
    color: #333333;
  }

  .mint-button--default {
    background: #04c8af;
    color: white;
  }

  .settime .mint-cell {
    min-height: 2.2rem;
    font-size: .64rem;
  }

  .settime .mint-cell-wrapper {
    padding: 0 .64rem;
  }
</style>
