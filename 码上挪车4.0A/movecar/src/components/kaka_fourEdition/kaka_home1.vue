<template>
  <div class="content">
    <div style="">
      <div class="topimg">
        <img src="../../assets/topimg.png" alt="">
      </div>
      <div class="input" @click="getItem1">
        <span class="span1">{{chinesename}}</span>
        <span class="down">
          <img src="../../assets/125.png" alt="">
        </span>
        <input type="text" placeholder="请输入车牌号码" class="carphone" v-model="englishname" readonly="readonly">
      </div>
      <div class="button">进入挪车</div>
      <div class="more">
        <span @click="choose(1)">
          <div class="logo">
            <img src="../../assets/120.png" alt="">
          </div>
          <div class="title">绑定车辆</div>
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
      <p>{{bindcarinfo.copyrightZh}}</p>
      <p>{{bindcarinfo.copyrightEn}}</p>
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
  export default {
    name: "kaka_home1",
    data() {
      return {
        bindcarinfo:JSON.parse(sessionStorage.getItem('bindcarinfo')),
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
        chinesename:'浙',
        englishname:null
      }
    },
    methods: {
      choose(m) {
        if (m === 1) {

        } else if (m === 2) {
          setTimeout(() => {
            window.location.href = 'https://kaka.kelibbb.com/klkl/merchants.php?m=Carinsur&c=h5&a=index&key=kk'
          }, 100)
        } else {
          setTimeout(() => {
            this.$router.push({path: '/kaka_moreservice'})
          }, 100)
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
        console.log(this.first)
        this.chinesename=this.first
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
        console.log(this.numArr.join().replace(/,/g, ''), val)
        this.englishname=this.numArr.join().replace(/,/g, '')
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
      margin: 13vw auto 0;
      display: flex;
      align-items: center;
      input{
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
        /*background-color: #04c8af;*/
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
        margin-left: 3vw;
        flex: 1;
      }
    }

    .button {
      width: 88vw;
      height: 13vw;
      line-height: 13vw;
      color: #f1f1f1;
      background-color: #15d1b9;
      border-radius: 7vw;
      margin: 7vw auto 0;
      font-size: 5vw;
      text-align: center;
    }

    .more {
      width: 90vw;
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
      position: fixed;
      bottom: 2vw;

      p {
        height: 2vw;
        font-family: PingFang-SC-Regular;
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
        margin-top: 1vw;
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

