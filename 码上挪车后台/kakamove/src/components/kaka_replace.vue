<template>
  <div style="width: 100%;height: 100%;min-width: 1100px">
    <div style="margin: 15px">
      <el-tabs type="border-card" v-loading="loading">
        <el-tab-pane label="模版一">
          <div class="changebody">
            <div class="changebodyleft">
              <div class="changebodylefttop">
                <p style="text-align: left">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(titlefirst,0,0)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input maxlength='6' type="text" @blur="change(titlefirst,0,0)" placeholder="微信扫码挪车"
                         v-model="titlefirst" style="border-radius: .2vw;padding-left: 10px;width: 85%">
                </p>
              </div>
              <div class="changebodyleftmiddle">
                <p>主色替换：</p>
                <p>
                  <span style="background-color: #d9533b" @click="change('#d9533b',0,1)"></span>
                  <span style="background-color: #32b6a2" @click="change('#32b6a2',0,1)"></span>
                  <span style="background-color: #ed731b" @click="change('#ed731b',0,1)"></span>
                  <span style="background-color: #384b95" @click="change('#384b95',0,1)"> </span>
                  <span style="background-color: #279e3a" @click="change('#279e3a',0,1)"></span>
                </p>
              </div>
              <div class="changebodyleftbottom">
                <p>底图替换：</p>
                <p>
                  <label for="1first" style="display: flex;align-items: center;width: 5vw">
                    <span>上传</span>
                  </label>
                    <!--<img :src="src1first" alt="" style="width: 2vw;height: 2vw;margin-left: 1vw" v-show="src1first!=''">-->


                  <input type="file" @change="getFile1first" ref="file" id="1first" style="width: 40%;display: none"/>
                </p>
              </div>
            </div>
            <div class="changebodymiddle">
              <div class="changebodymiddleleft">
                <img :src="frontfirst" alt="">
              </div>
              <div class="changebodymiddleright">
                <img :src="backfirst" alt="">

              </div>
            </div>
            <div class="changebodyright" style="width: 18vw">
              <div class="changebodyrighttop">
                <p style="text-align: left">链接替换：
                  <!--<el-button type="primary" size="mini" @click="change(messagefirst,0,3)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" placeholder="请输入二维码链接" @blur="change(messagefirst,0,3)" v-model="messagefirst"
                         style="width: 85%;padding-left: 10px">
                </p>
              </div>
              <div class="changebodyrightmiddle">
                <p>logo替换：</p>
                <p>
                  <label for="filefirst" style="display: flex;align-items: center;width: 5vw">
                    <span style="width: 5vw">上传</span>
                  </label>
                    <!--<img :src="srcfirst" alt="" style="width: 2vw;height: 2vw;margin-left: 1vw" v-show="srcfirst!=''">-->


                  <input type="file" @change="getFilefirst" ref="file" id="filefirst" style="width: 40%;display: none"/>
                </p>
              </div>
              <div class="changebodyrightbottom" style="width: 18vw">
                <p style="text-align: left">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(titlefirst1,0,5)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" maxlength="19" @blur="change(titlefirst1,0,5)" placeholder="报警报案 道路救援 保单同步 一键续保"
                         v-model="titlefirst1"
                         style="padding-left: 10px;font-size: .8vw;width: 15.5vw">
                </p>
              </div>
            </div>
          </div>
          <div class="onebutton">
            <el-button type="danger" size="small" @click="initialization(0)">恢复默认
            </el-button>
            <!--<el-button type="primary" size="small" style="margin-left: 20px" @click="save(0)">保存-->
            <!--</el-button>-->
          </div>
          <div class="foottext">
            <p>温馨提示：</p>
            <p>1.本挪车贴正反面大小均为8X8cm</p>
            <p>2.文本替换：正面不超过6字，反面不超过18字</p>
            <p>3.底图替换：支持正面底图替换，底图尺寸为400X400像素</p>
            <p>4.二维码替换：管理员输入指定链接，系统自动生成对应二维码进行替换，用户扫码后即可跳转至指定页面</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模版二">
          <div class="changebody">
            <div class="changebodyleft">
              <div class="changebodylefttop">
                <p style="text-align: left">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(titlesecond,1,0)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" maxlength='6' placeholder="微信扫码挪车"
                         style="border-radius: .2vw;width: 85%;padding-left: 10px"
                         v-model="titlesecond" @blur="change(titlesecond,1,0)">
                </p>
              </div>
              <div class="changebodyleftmiddle">
                <p>主色替换：</p>
                <p>
                  <span style="background-color: #d9533b" @click="change('#d9533b',1,1)"></span>
                  <span style="background-color: #32b6a2" @click="change('#32b6a2',1,1)"></span>
                  <span style="background-color: #ed731b" @click="change('#ed731b',1,1)"></span>
                  <span style="background-color: #384b95" @click="change('#384b95',1,1)"> </span>
                  <span style="background-color: #279e3a" @click="change('#279e3a',1,1)"></span>
                </p>

              </div>
              <div class="changebodyleftbottom">
                <p>logo上传：</p>
                <p>
                  <label for="1second" style="display: flex;align-items: center;width: 5vw">
                    <span>上传</span>
                  </label>
                    <!--<img :src="src1second" alt="" style="width: 2vw;height: 2vw;margin-left: 1vw"-->
                         <!--v-show="src1second!=''">-->


                  <input type="file" @change="getFile1second" ref="file" id="1second" style="width: 40%;display: none"/>
                </p>
              </div>
            </div>
            <div class="changebodymiddle">
              <div class="changebodymiddleleft">
                <img :src="frontsecond" alt="">
              </div>
              <div class="changebodymiddleright">
                <img :src="backsecond" alt="">
              </div>
            </div>
            <div class="changebodyright" style="width: 18vw">
              <div class="changebodyrightmiddle">
                <p>主色替换：</p>
                <p>
                  <span style="background-color: #d9533b" @click="change('#d9533b',1,3)"></span>
                  <span style="background-color: #32b6a2" @click="change('#32b6a2',1,3)"></span>
                  <span style="background-color: #ed731b" @click="change('#ed731b',1,3)"></span>
                  <span style="background-color: #384b95" @click="change('#384b95',1,3)"> </span>
                  <span style="background-color: #279e3a" @click="change('#279e3a',1,3)"></span>
                </p>
              </div>
              <div class="changebodyrighttop">
                <p style="text-align: left">链接替换：
                  <!--<el-button type="primary" size="mini" @click="change(messagesecond,1,4)">确认</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" placeholder="请输入二维码链接" @blur="change(messagesecond,1,4)" v-model="messagesecond"
                         style="width: 85%;padding-left: 10px">
                </p>
              </div>

              <div class="changebodyrightbottom" style="width: 18vw">
                <p style="text-align: left">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(titlesecond1,1,5)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" maxlength="19" placeholder="报警报案 道路救援 保单同步 一键续保" v-model="titlesecond1"
                         style="padding-left: 10px;width: 15.5vw;font-size: .8rem" @blur="change(titlesecond1,1,5)">
                </p>
              </div>
            </div>
          </div>
          <div class="onebutton">
            <el-button type="danger" size="small" @click="initialization(1)">恢复默认
            </el-button>
            <!--<el-button type="primary" size="small" style="margin-left: 20px" @click="save(1)">保存-->
            <!--</el-button>-->
          </div>
          <div class="foottext">
            <p>温馨提示：</p>
            <p>1.本挪车贴正反面大小均为8X8cm</p>
            <p>2.文本替换：正面不超过6字，反面不超过18字</p>
            <p>3.主色替换：支持挪车贴正反面颜色变换</p>
            <p>4.二维码替换：管理员输入指定链接，系统自动生成对应二维码进行替换，用户扫码后即可跳转至指定页面</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模版三">
          <div class="changebody1">
            <div class="changebodyleft">
              <div class="changebodylefttop">
                <p style="text-align: left" id="eee">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(title,2,0)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" maxlength='9' @blur="change(title,2,0)" placeholder="临时停靠 扫码挪车" v-model="title"
                         style="width: 85%;padding-left: 10px">
                </p>
              </div>
              <div class="changebodyleftmiddle">
                <p>主色替换：</p>
                <p>
                  <span style="background-color: #d9533b" @click="change('#d9533b',2,1)"></span>
                  <span style="background-color: #32b6a2" @click="change('#32b6a2',2,1)"></span>
                  <span style="background-color: #ed731b" @click="change('#ed731b',2,1)"></span>
                  <span style="background-color: #384b95" @click="change('#384b95',2,1)"> </span>
                  <span style="background-color: #279e3a" @click="change('#279e3a',2,1)"></span>
                </p>

              </div>
              <div class="changebodyleftbottom">
                <p>底图替换：</p>
                <p>
                  <label for="first1" style="display: flex;align-items: center;width: 5vw">
                    <span>上传</span>
                  </label>
                    <!--<img :src="src1" alt="" style="width: 2vw;height: 2vw;margin-left: 1vw" v-show="src1!=''">-->


                  <input type="file" @change="getFile1" ref="file" id="first1" style="width: 40%;display: none"/>
                </p>
              </div>
            </div>
            <div class="changebodymiddle">
              <div class="changebodymiddleleft">
                <img :src="frontthree" alt="">
              </div>
              <div class="changebodymiddleright">
                <img :src="backthree" alt="">

              </div>
            </div>
            <div class="changebodyright" style="width: 17vw">
              <div class="changebodyrighttop">
                <p style="text-align: left">链接替换：
                  <!--<el-button type="primary" size="mini" @click="change(message,0,3)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" placeholder="请输入二维码链接" @blur="change(message,2,3)" v-model="message"
                         style="width: 85%;padding-left: 10px">
                </p>
              </div>
              <div class="changebodyrightmiddle">
                <p>logo替换：</p>
                <p>
                  <label for="file" style="display: flex;align-items: center;width: 5vw">
                    <span style="width: 5vw">上传</span>
                  </label>
                    <!--<img :src="src" alt="" style="width: 2vw;height: 2vw;margin-left: 1vw" v-show="src!=''">-->


                  <input type="file" @change="getFile" ref="file" id="file" style="width: 40%;display: none"/>
                </p>
              </div>
              <div class="changebodyrightbottom" style="width: 17vw">
                <p style="text-align: left">文本替换：
                  <!--<el-button type="primary" size="mini" @click="change(title1,0,5)">保存</el-button>-->
                </p>
                <p style="text-align: left">
                  <input type="text" @blur="change(title1,2,5)" placeholder="事故报警 报案电话 道路救援" v-model="title1"
                         style="padding-left: 10px;width: 14vw;font-size: .8vw" maxlength="14">
                </p>
              </div>
            </div>
          </div>
          <div class="onebutton">
            <el-button type="danger" size="small" @click="initialization(2)">恢复默认
            </el-button>
            <!--<el-button type="primary" size="small" style="margin-left: 20px" @click="save(2)">保存-->
            <!--</el-button>-->
          </div>
          <div class="foottext">
            <p>温馨提示：</p>
            <p>1.本挪车贴正反面大小均为9X13cm</p>
            <p>2.文本替换：正面不超过9字，反面不超过14字</p>
            <p>3.主色替换：包括正面底色、背面二维码色框及下方艺术字颜色，都会统一替换</p>
            <p>4.底图替换：支持正面底图替换，底图尺寸为9*11cm</p>
            <p>5.二维码替换：管理员输入指定链接，系统自动生成对应二维码进行替换，用户扫码后即可跳转至指定页面"</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
  import logo from '../assets/img3.png'
  import {Loading} from 'element-ui';

  export default {
    name: "kaka_replace",
    data() {
      return {
        loading: true,
        title: '临时停靠 扫码挪车',
        titlefirst: '微信扫码挪车',
        titlesecond: '微信扫码挪车',
        title1: "事故报警 报案电话 道路救援",
        titlefirst1: '报警报案 道路救援 保单同步 一键续保',
        titlesecond1: '报警报案 道路救援 保单同步 一键续保',
        color: '',//正面朱色
        colorfirst: '',//正面色模版一
        colorsecond: '',//正面色模版一
        color1: '#384b95',
        color1first: '#384b95',
        color1second: '#384b95',
        src: '',//logo
        srcfirst: '',
        srcsecond: '',
        src1: '',//正面背景图
        src1first: '',
        src1second: '',
        src3: null,
        src3first: null,
        src3second: null,
        message: '',//反面二维码链接
        messagefirst: '',
        messagesecond: '',
        src2: '',//背面二维码
        src2first: '',
        src2second: '',
        link2: "我的中间显示的是logo https://hjm100.cn", // 二维码2
        logo: logo,
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        frontImgTemplate: '',
        backImgTemplate: '',
        frontfirst: '',
        backfirst: '',
        frontsecond: '',
        backsecond: '',
        frontthree: '',
        backthree: '',
        backcolor: ''
      }
    },
    created() {
      this.getinfo()
    },
    methods: {
      initialization(m) {
        this.loading = true;
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/resetDefaultTemplate',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            templateIndex: m
          }
        };
        this.$axios(options).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data.data)



            const message = res.data.data
            this.loading = false;
            if (m == 2) {
              this.title = '临时停靠 扫码挪车'
              this.title1 = "事故报警 报案电话 道路救援"
              this.frontthree = message.frontImgTemplate;
              this.backthree = message.backImgTemplate
            } else if (m == 0) {
              this.titlefirst = '微信扫码挪车'
              this.titlefirst1 = '报警报案 道路救援 保单同步 一键续保'
              this.frontfirst = message.frontImgTemplate;
              this.backfirst = message.backImgTemplate
            } else if (m == 1) {
              this.titlesecond = '微信扫码挪车'


              this.titlesecond1 = '报警报案 道路救援 保单同步 一键续保'
              this.frontsecond = message.frontImgTemplate;
              this.backsecond = message.backImgTemplate
            }

          }
        })
      },
      //更改  n位更改参数 m为模版 k为第几个更改项
      change(n, m, k) {
        this.loading = true
        var formData = new FormData();
        formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
        formData.append("templateIndex  ", m);
        if (m == 0) {
          if (k == 1) {
            formData.append("frontEssentialColour", n);
          } else if (k == 4) {
            formData.append("qrCodeLogo", n);
          } else if (k == 2) {
            formData.append("frontBelowImg", n);
          } else if (k == 0) {
            if (n == null) {
              n = ""
            }
            formData.append("frontText", n);
          } else if (k == 5) {
            if (n == null) {
              n = ""
            }
            formData.append("backText", n);
          } else if (k == 3) {
            formData.append("backQrCode", n);
          }
        } else if (m == 1) {
          if (k == 1) {
            formData.append("frontEssentialColour", n);
          } else if (k == 4) {
            formData.append("backQrCode", n);
          } else if (k == 2) {
            formData.append("qrCodeLogo", n);
          } else if (k == 0) {
            if (n == null) {
              n = ""
            }
            formData.append("frontText", n);
          } else if (k == 5) {
            if (n == null) {
              n = ""
            }
            formData.append("backText", n);
          } else if (k == 3) {
            this.backcolor = n
            formData.append("backEssentialColour", n);
          }
        } else if (m == 2) {
          if (k == 1) {
            formData.append("frontEssentialColour", n);
          } else if (k == 4) {
            formData.append("qrCodeLogo", n);
          } else if (k == 2) {
            formData.append("frontBelowImg", n);
          } else if (k == 0) {
            if (n == null) {
              n = ""
            }
            formData.append("frontText", n);
          } else if (k == 5) {
            if (n == null) {
              n = ""
            }
            formData.append("backText", n);
          } else if (k == 3) {
            formData.append("backQrCode", n);
          }
        }
        const options = {
          method: 'POST',
          headers: {'token': this.$store.state.token},
          url: 'moveCar/templateSetting',
          data: formData
        };
        this.$axios(options).then((res) => {
          this.loading = false;
          this.backImgTemplate = res.data.data.backImgTemplate
          this.frontImgTemplate = res.data.data.frontImgTemplate
          if (m == 0) {
            this.frontfirst = this.frontImgTemplate;
            this.backfirst = this.backImgTemplate
          } else if (m == 1) {
            this.frontsecond = this.frontImgTemplate;
            this.backsecond = this.backImgTemplate
          } else if (m == 2) {
            this.frontthree = this.frontImgTemplate;
            this.backthree = this.backImgTemplate
          }

        })
      },
      getFile(e) {
        let _this = this;
        var files = e.target.files[0];
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result;
          _this.change(files, 2, 4)
        }
      },
      getFilefirst(e) {
        let _this = this;
        var files = e.target.files[0];
        this.filefirst = files
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.srcfirst = this.result;
          _this.change(files, 0, 4)
        }
      },
      getFile1(e) {
        let _this = this;

        var files = e.target.files[0];
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src1 = this.result;
          _this.color = ''
          _this.change(files, 2, 2)
        }
      },
      getFile1first(e) {
        let _this = this;
        var files = e.target.files[0];
        this.file1first = files;

        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src1first = this.result;
          _this.change(files, 0, 2)
        }
      },
      getFile1second(e) {
        let _this = this;
        var files = e.target.files[0];
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src1second = this.result;
          _this.change(files, 1, 2)
        }
      },
      //页面初始化
      getinfo() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getTemplateSetting',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo
          }
        };
        this.$axios(options).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data.data)
            const message = res.data.data
            this.loading = false;
            for (let i in message) {
              if (message[i].templateIndex == 2) {
                this.title = message[i].frontText;
                this.frontthree = message[i].frontImgTemplate;
                this.backthree = message[i].backImgTemplate
                this.title1 = message[i].backText;
              } else if (message[i].templateIndex == 0) {
                this.titlefirst = message[i].frontText;
                this.frontfirst = message[i].frontImgTemplate;
                this.backfirst = message[i].backImgTemplate;
                this.titlefirst1 = message[i].backText;
              } else if (message[i].templateIndex == 1) {
                this.frontsecond = message[i].frontImgTemplate;
                this.backsecond = message[i].backImgTemplate
                this.titlesecond = message[i].frontText;
                this.titlesecond1 = message[i].backText;

              }
            }
          }
        })
      },
    },

  }
</script>

<style scoped lang="scss">
  .foottext {
    text-align: left;
    font-size: 10px;
    line-height: 18px;
    color: #999999;

    p:nth-child(1) {
      font-size: 15px;
    }
  }

  .onebutton {
    text-align: left;
    margin: 15px 0;
  }

  .changebody {
    width: 82vw;
    height: 21vw;
    display: flex;
    justify-content: space-between;

    .changebodyleft {
      .changebodyleftbottom {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;
        }

        span {
          display: inline-block;
          width: 5vw;
          height: 2vw;
          background-color: #ffffff;
          line-height: 2vw;
          text-align: center;
          font-size: 1vw;
          border-radius: .2vw;
        }
      }

      width: 14vw;
      height: 21vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .changebodyleftmiddle {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;

          span {
            display: inline-block;
            width: 2vw;
            height: 2vw;
            border-radius: .2vw;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .changebodylefttop {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
        }

        input {
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: 1vw;
          outline: none;
        }
      }

      div {
        width: 14vw;
        height: 6vw;
        background-color: #eeeeee;
        border-radius: .3vw;

      }
    }

    .changebodyright {
      .changebodyrightbottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 14vw;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
          width: 11vw;
        }

        input {
          width: 12vw;
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: 1vw;
          outline: none;
          border-radius: .2vw;
        }
      }

      .changebodyrightmiddle {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;

          span {
            display: inline-block;
            width: 2vw;
            height: 2vw;
          }

        }

        span {
          display: inline-block;
          width: 5vw;
          height: 2vw;
          background-color: #ffffff;
          line-height: 2vw;
          text-align: center;
          font-size: 1vw;
          border-radius: .2vw;
        }
      }

      .changebodyrighttop {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
        }

        input {
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: 1vw;
          outline: none;
          border-radius: .2vw;
        }
      }

      width: 14vw;
      height: 21vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        width: 14vw;
        height: 6vw;
        background-color: #eeeeee;
        border-radius: .3vw;

      }

    }

    .changebodymiddle {
      width: 45vw;
      height: 21vw;
      display: flex;
      justify-content: space-around;
      font-size: 0 !important;

      .changebodymiddleleft {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 2vw;
        font-size: 0 !important;

        img {

          width: 100%;
          height: 100%;
        }

        width: 21vw;
        height: 21vw;
        box-shadow: 0vw 1vw 2vw 0vw rgba(1, 1, 0, 0.2);


      }

      .changebodymiddleright {
        img {

          width: 100%;
          height: 100%;
        }

        background: #dddddd;
        border-radius: 1.5vw;
        width: 21vw;
        height: 21vw;
        box-shadow: 0vw 1vw 2vw 0vw rgba(1, 1, 0, 0.2);
        font-size: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .changebodymiddlerightbottom {
          font-size: 1vw;
          color: white;
          margin-bottom: 1vw;
        }

        .changebodymiddlerightimgsmall {
          color: white;
          font-size: 1vw;
          transform: scale(.8);
        }

        .changebodymiddlerightmiddle {
          width: 11vw;
          height: 11vw;
          margin: 0 auto;
          margin-top: .7vw;


          img {
            width: 100%;
            height: 100%;
          }
        }

        .changebodymiddlerighttop {
          font-size: 1.2vw;
          color: white;
          margin-top: 1vw;

        }
      }
    }
  }

  .changebody1 {
    width: 82vw;
    height: 26vw;
    display: flex;
    justify-content: space-between;

    .changebodyleft {
      .changebodyleftbottom {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;


        }

        span {
          display: inline-block;
          width: 5vw;
          height: 2vw;
          background-color: #ffffff;
          line-height: 2vw;
          text-align: center;
          font-size: 1vw;
          border-radius: .2vw;
        }
      }

      width: 14vw;
      height: 21vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .changebodyleftmiddle {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;

          span {
            display: inline-block;
            width: 2vw;
            height: 2vw;
            border-radius: .2vw;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .changebodylefttop {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
        }

        input {
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: 1vw;
          outline: none;
          border-radius: .2vw;
        }
      }

      div {
        width: 14vw;
        height: 6vw;
        background-color: #eeeeee;
        border-radius: .3vw;

      }
    }

    .changebodyright {
      .changebodyrightbottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 14vw;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
        }

        input {
          width: 12vw;
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: .5vw;
          outline: none;
          border-radius: .2vw;
        }
      }

      .changebodyrightmiddle {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
          text-align: left;
          margin-left: 1vw;

          span {
            display: inline-block;
            width: 2vw;
            height: 2vw;
          }

        }

        span {
          display: inline-block;
          width: 5vw;
          height: 2vw;
          background-color: #ffffff;
          line-height: 2vw;
          text-align: center;
          font-size: 1vw;
          border-radius: .2vw;
        }
      }

      .changebodyrighttop {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          color: #666666;
          font-size: 1vw;
          margin-bottom: .5vw;
        }

        p {
          margin-left: 1vw;
        }

        input {
          height: 2vw;
          background-color: #ffffff;
          border: 0;
          font-size: 1vw;
          outline: none;
          border-radius: .2vw;
        }
      }

      width: 14vw;
      height: 21vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        width: 14vw;
        height: 6vw;
        background-color: #eeeeee;
        border-radius: .2vw;

      }

    }

    .changebodymiddle {
      width: 40vw;
      height: 26vw;
      display: flex;
      justify-content: space-around;

      .changebodymiddleleft {
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        img {

          width: 100%;
          height: 100%;
        }

        width: 18vw;
        height: 26vw;
        box-shadow: 0vw 1vw 2vw 0vw rgba(1, 1, 0, 0.2);
        font-size: 0;

      }

      .changebodymiddleright {
        img {

          width: 100%;
          height: 100%;
        }

        font-size: 0;
        width: 18vw;
        height: 26vw;
        box-shadow: 0vw 1vw 2vw 0vw rgba(1, 1, 0, 0.2);


        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .changebodymiddlerightbottom {
          font-size: 1vw;
          color: white;
          margin-bottom: 1vw;
        }

        .changebodymiddlerightimgsmall {
          color: white;
          font-size: 1vw;
          transform: scale(.8);
        }

        .changebodymiddlerightmiddle {
          width: 11vw;
          height: 11vw;
          margin: 0 auto;
          margin-top: .7vw;


          img {
            width: 100%;
            height: 100%;
          }
        }

        .changebodymiddlerighttop {
          font-size: 1.2vw;
          color: white;
          margin-top: 1vw;

        }
      }
    }
  }

  .background {
    background-size: 100% 100% !important;
  }

  .foot {
    text-align: left;

    div {
      text-align: left;
      margin-left: 50px;
      letter-spacing: 1px;
      color: #999999;
      font-weight: 200;
    }
  }

  .img {
    box-shadow: 10px 10px 20px #d2d2d2;
  }

  .top {
    width: 100%;
    height: 85%;

    .first {
      width: 50%;
      height: 100%;
      float: left;

      .title {
        margin-top: 10%;
        font-size: 26px !important;
        /*font-size: 2vw ;*/
        letter-spacing: 1px;
        color: #FFFFFF;
        font-weight: 900;
      }

      .img1 {
        width: 65%;
        height: 48%;
        background: #FFFFFF;
        margin: 10% auto;
        border-radius: 8px;


        img {
          width: 100%;
          min-width: 195px;
          min-height: 190px;
          height: 100%;
        }
      }

      .warn {
        letter-spacing: 3px;
        color: #FFFFFF;
        font-size: 1.3vw;
      }
    }

    .second {
      .title {
        margin-top: 10%;
        font-size: 15px;
      }

      width: 50%;
      height: 100%;
      background: #FFFFFF;
      float: right;

      .img1 {
        width: 65%;
        height: 48%;
        background: #FFFFFF;
        margin: 0 auto;
        margin-top: 10%;
        border-radius: 5px;

        .border {
          padding: 5px;
          display: inline-block;
          font-size: 0;
          background-size: cover;

          img {
            min-width: 160px;
            min-height: 160px;
            width: 100%;
            height: 100%;
          }
        }

        img {
          min-width: 195px;
          min-height: 190px;
          width: 100%;
          height: 100%;
        }
      }

      .warn {
        margin-top: 12%;
        color: #ed7f22;
        font-weight: 600;
        font-size: 2vh;
      }

      .bottom1 {
        margin-top: 5%;
        color: #666666;
        font-size: 15px;
      }
    }

  }

  .bottom {
    width: 100%;
    border-top: .1px solid #d2d2d2;

    img {
      width: 100%;
      height: 100%;
    }
  }


  .solid2 {
    width: 50%;
    height: 1px;
    background-color: #999999;
    position: relative;
    right: 60%;
    bottom: 40%;
  }

  .solid {
    width: 50%;
    height: 1px;
    background-color: #999999;
    position: relative;
    left: 100%;
    bottom: 40%;
    z-index: 1;
  }

  .content {
    display: flex;
  }

  .left {
    width: 25%;
  }

  .middle {
    min-width: 580px;
    min-height: 450px !important;
    width: 25vw;
    height: 25vw;
    box-shadow: 10px 10px 20px #d2d2d2;
  }

  .right {
    width: 25%;
  }

  .left1 {
    width: 60%;
    background: #eeeeee;
    margin-top: 20px;
    color: #666666;
    text-align: left;
    padding: 5px;
    margin-left: 50px;

    input {
      outline: none;
      padding-left: 8px;
      border-radius: .2vw;
    }
  }

  .left1 span {
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .left1 div {
    margin-top: 5px;
    margin-left: 10px;
  }
</style>
