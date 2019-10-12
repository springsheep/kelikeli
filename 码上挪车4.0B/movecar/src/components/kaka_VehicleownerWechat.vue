<template>
  <div class="app">
    <div class="xw-content" @touchstart="toShowMaskInfo=false" ref="xwBody">
      <div class="xw-chat-wrap">
        <div v-for="(messageList,index) in records" @click="play(messageList,index)">
          <div v-if="messageList.type==1">
            <div class="xw-chat-time">{{messageList.time}}</div>
            <div class="xw-chat-servicer">
              <div class="xw-chat-msg">
                <span><img src="../assets/131.png" alt="" style="width: .6rem"
                           v-if="Object.keys(messageList).length == 4" v-show="playnum!=index"></span>
                <span><img src="../assets/1300.gif" alt="" style="width: .6rem"
                           v-if="Object.keys(messageList).length == 4" v-show="playnum==index" ></span>
                <span v-html="replaceFace(messageList.content)" v-if="Object.keys(messageList).length == 4"
                      :style="{textAlign: 'right',paddingLeft:'5px',width:`${messageList.content.split(`${uuuu}`)[0]*15}px`,display:'inline-block',maxWidth:'150px'}"></span>
                <span v-html="replaceFace(messageList.content)" v-if="Object.keys(messageList).length != 4"> </span>
              </div>
            </div>
          </div>
          <!-- 用户发送的消息模板-->
          <div v-else>
            <div class="xw-chat-time">{{messageList.time}}</div>
            <div class="xw-chat-customer">
              <div class="xw-chat-msg" style="display:inline-block">
                <span v-html="replaceFace(messageList.content)" v-if="Object.keys(messageList).length == 4"
                      :style="{paddingRight:'5px',width:`${messageList.content.split(`${uuuu}`)[0]*15}px`,display:'inline-block',maxWidth:'150px',textAlign:'right'}"> </span>
                <span v-html="replaceFace(messageList.content)" v-if="Object.keys(messageList).length != 4"> </span>
                <span><img src="../assets/130.png" alt="" style="width: .6rem"
                           v-if="Object.keys(messageList).length == 4" v-show="playnum!=index"></span>
                <span><img src="../assets/1310.gif" alt="" style="width: .6rem"
                           v-if="Object.keys(messageList).length == 4" v-show="playnum==index" ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xw-footer-wrap" v-if="showinput">
      <div class="mask" v-if="showstartvoice">
        <div style="width: 100%;text-align: center;margin-top: 20%">
          <img src="../assets/robotvoice1.jpg" style="width: 2rem ;height: 2.2rem "/>
        </div>
        <div style="text-align: center;width: 100%;margin-top: .6rem">正在输入...</div>
      </div>
      <div class="xw-footer-content1" style="background-color: #f1f1f1;box-shadow: 0 0 0 ">
        <div class="xw-chat-tool">
          <div class="xw-chat-tool-item" style="background-color: #f1f1f1;opacity: 0">
            <div class="wwww">
              <img src="../assets/101.png" style="width: 100%;height: 100%"/></div>
          </div>
        </div>
        <div class="xw-vmodel-wrap" style="display: flex;justify-content: center;align-items: center">
          <div
            @touchstart.prevent="touchstart($event)"
            @touchend.prevent="touchend($event)"
            @touchmove.prevent="touchmove($event)"
            class="qqqq"
            style="width: 40vw;
	height: 11vw;background-color: #04c8af;display: flex;justify-content: center;align-items: center;border-radius: 1rem">
            <img src="../assets/robotvoice.png" style="width: auto;height: 5vw;;margin-right: .4rem ">
            <div style="color: #FFFFFF;">按住说话</div>
          </div>
        </div>
        <div class="xw-chat-tool">
          <div class="xw-chat-tool-item" style="background-color: #f1f1f1">
            <div
              class="wwww"
              @click="showinput=false"
            >
              <img src="../assets/robotkeys1.png" style="width: 7vw;
	height: 4vw;"/></div>
          </div>
        </div>

      </div>
    </div>
    <div style="width: 100%" class="simplenews" v-if="!showinput">
      <span v-for="(item,index) in checkedcontent" :key="item" :class="{checked:(checkedtype==index?true:false)}"@click="checked(index,item)">
        {{item}}
      </span>

    </div>
    <div class="xw-footer-wrap1" v-if="!showinput">
      <div style="display: flex;align-items: center">
        <div style="width: 8vw;height: 8vw;background: #04c8af;border-radius: 50%;display: flex;margin-left: .4rem;
align-items: center;justify-content: center" @click="showinput=true">
          <img src="../assets/robotvoice.png" style="width:auto;height:5vw"/></div>
      </div>
      <!--<img src="../assets/101.png" style="width: 8vw;height: 8vw;margin-left: .3rem;" @click="startphone"-->
      <!--v-if="content==''"/>-->
      <input type="text" style=" font-size: .64rem ;padding-left: .4rem;border-radius: 2px;margin-left: .64rem;border: 0;background: #ffffff;height: 1.6rem;width: 200%"
             v-model="content" @blur="checkCard">
      <div class="sendmessage" @click="sendMsg" style="font-size: .64rem"> 发 送</div>
      <!--<mt-field style="color: #333333" :disableClear="true" v-model="content" @blur.native.capture="checkCard">-->

      <!---->
      <!--</mt-field>-->
    </div>
  </div>
</template>

<script>
  // import {wxShowMenu} from '../common/js/wx.jsapi'
  import {Toast} from 'mint-ui';
  import wx1 from '../../config/wx'

  export default {
    name: 'kaka_VehicleownerWechat',
    data() {
      return {
        playshow: false,//控制喇叭动起来
        playnum: null,//播发的哪个喇叭
        playflag:1,//判断是暂停还是播发 1播发 2暂停
        uuuu:'\"',
        checkedtype:0,
        checkedcontent:['抱歉，我马上就到','抱歉，我在办事，请等我几分钟','我在开会','我在办事','两分钟内到'],
        showinput: false,
        showstartvoice: false,
        showvoice: true,
        comment: {},
        showEmoji: true,//是否显示表情
        showToast: false,//显示提示框
        toastText: '',
        showMoreOpratin: false,//是否显示更多操作
        toShowMaskInfo: false,//点击头部是否显示相信信息
        bellStatus: true,//头部区域铃声图标
        myaudio: '../../static/audio/msg.mp3',//铃音
        videoVal: false,//点击视频文字时候
        showNarrowPopVal: false,//点击切换成小窗口
        testContents: [],
        content: '',
        //聊天记录
        records: [],
        imgFile: {},
        EXPS: [],
        num: 0,
        listen: true,
        flag: null,
        poststart: null,
        btntext: null,
        starttime: null,
        recording: null,
        reverrecord: null,
        timer: 60,
        showtimer: null,
        posetmove: null,
        postend: null,
        endtime: null,
        autoCloseRecord: null,
        posmove: null, localIdList: [],
        severIdList: [],
        qrcode: null,
        carNo: null
      }
    },
    created() {
      this.carNo = this.$route.params.code;
      this.openId = this.$route.params.openId;
      this._loadEmojiData();
      this.initWebSocket();
      this.getinfo()
    }, beforeDestroy() {
      this.websock.close(); //离开路由之后断开websocket连接
    },
    methods: {
      checked(m,n){
        this.checkedtype=m;
        this.content=n
      },
      //输入框失去焦点 滚动一下屏幕
      checkCard() {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      },
      play(m, c) {
        this.playnum = c
        var _this = this;
        if (Object.keys(m).length == 4) {
          wx.downloadVoice({
            serverId: m.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res1) {
              let downLoadId = res1.localId // 返回音频的本地ID
              var time=null//计时器
              if(_this.playflag==1){
                wx.playVoice({
                  localId: res1.localId,
                  success: function (res) {
                    _this.playflag=2
                    time=setTimeout(()=>{
                      _this.playnum = null
                      _this.playflag=1
                      clearTimeout(time)
                    },`${m.content.split(`${_this.uuuu}`)[0]}`*1000)
                  }
                })
              }else {
                wx.stopVoice({
                  localId: res1.localId,
                  success: function (res) {
                    console.log(res, '播放成功',)
                    clearTimeout(time)
                    _this.playflag=1
                    _this.playnum = null
                  }
                });
              }
            }
          })
          wx.onVoicePlayEnd({
            success: function (res) {
              console.log(res, '暂停成功',)
              this.playnum = null
            }
          })
        }
      },
      getinfo() {
        let url = window.location.href.split('#')[0];
        this.axios.post('/moveCar/getSign', {
          url: url
        }).then((res) => {
          let list = res.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: list.appId, // 必填，公众号的唯一标识
            timestamp: list.timestamp, // 必填，生成签名的时间戳
            nonceStr: list.nonceStr, // 必填，生成签名的随机串
            signature: list.signature, // 必填，签名
            jsApiList: ['onVoicePlayEnd', 'startRecord', 'stopRecord', 'playVoice', 'pauseVoice', 'onVoicePlayEnd', 'stopVoice', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表
            // 接口 开始录音接口 停止录音接口 播放语音接口 暂停播放接口 停止播放接口 上传语音接口 下载语音接口 识别音频并返回识别结果接口
          })
          // config信息验证后才执行
          wx.ready(() => {
            console.log('成功')
          })
          // 微信sdk错误返回问题
          wx.error((res) => {
            // alert('出错了：' + res.errMsg)// 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          })
        })
      },
      initWebSocket() { //初始化weosocket
        console.log('开始连接');
        var wsuri = `wss://${wx1.websocket}/imB/getMessage`;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocket;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        console.log('开启链接，准备发送数据')
        let obj = {type: '0', content: `${this.carNo},${this.openId}`}
        this.websock.send(JSON.stringify(obj));
        console.log(obj)
      },
      websocket() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        let res = JSON.parse(e.data);
        // console.log(res)
        if (res.type == 1) {
          this.records.push({
            time:res.showSendTime,
            content: res.content,
            type: 1
          });
        } else {
          this.records.push({
            time: res.showSendTime,
            content: res.time + '"',
            serverId: res.content,
            type: 1
          });
        }
        this.scrollToBottom();
      },
      websocketsend(val) {//数据发送
        console.log('数据发送', val)
      },
      websocketclose(e) {  //关闭
        console.log('断开连接', e);
      },
      startphone() {
        this.$dialog.confirm({
          title: '确定开启语音通话吗？',
          mes: '',
          opts: () => {
            this.$router.push({path: '/kaka_VoiceFairyTales'})
          }
        });
      },
      touchstart(e) {
        this.showstartvoice = true;
        e.preventDefault()
        this.flag = -1;
        this.poststart = 0;
        this.poststart = e.touches[0].pageY;
        this.btntext = '松开结束';
        this.starttime = new Date().getTime();
        this.recording = true;
        this.reverrecord = false;
        //一分钟后自动停止
        this.autoCloseRecord = setInterval(() => {
          this.timer--;
          if (this.timer == 10) {
            this.showtimer = true
          }
          if (this.timer == 0) {
            this, touchend(e)
          }
        }, 1000)
        let vm = this;
        wx.startRecord({
          fail: function (err) {
            clearTimeout(vm.autoCloseRecord)
            // Toast(`开始录音吧报错,${JSON.stringify(err)}`)
          }
        })
      },
      touchend(e) {
        this.showstartvoice = false;
        this.flag = -this.flag;
        console.log(this.flag)
        if (this.flag > 0) {
          e.preventDefault();
          this.showtimer = false;
          this.timer = 60;
          clearTimeout(this.autoCloseRecord)
          this.postend = 0
          this.postend = e.changedTouches[0].pageY
          this.btntext = '按住说话'
          this.endtime = new Date().getTime();
          this.recording = false
          this.reverrecord = false
          let duration = ((this.endtime - this.starttime) / 1000).toFixed(0)
          if (duration < 2) {
            if (Math.abs(this.poststart - this.postend) < 70) {
              Toast({
                message: '时间太短',
                duration: 300
              })
            }
          } else {
            console.log(1234)
            let vm = this;
            wx.stopRecord({
              success: function (res) {
                let localId = res.localId;
                console.log(localId, '获取到的id')
                if (Math.abs(vm.poststart - vm.postend) < 70) {
                  console.log(1111, duration)
                  wx.uploadVoice(
                    {
                      localId: localId,
                      isShowProgressTips: 1,
                      success: function (res2) {

                        vm.records.push({
                          time: new Date().getHours()+':'+new Date().getMinutes(),
                          content: duration + '"',
                          serverId: res2.serverId,
                          type: 2
                        });
                        vm.scrollToBottom();
                        let obj = {type: '2', content: res2.serverId, time: duration}
                        vm.websock.send(JSON.stringify(obj));

                        // vm.localIdList.pust({localId: localId, duration: duration})
                        vm.severIdList.pust({serverId: res2.serverId, duration: duration})

                      },
                      fail: function (err) {
                        Toast(
                          {
                            message: '上传录音报错',
                            duration: 300
                          })
                      }
                    })
                }
              },
              fail: function (err) {
                if (err.errMsg == 'stopRecord:tooshort') {
                  Toast(
                    {
                      message: '时间太短',
                      duration: 300
                    })
                } else {
                  Toast(
                    {
                      message: '服务器发生错误',
                      duration: 300
                    })

                }

              }
            })
          }
        } else {
          return false
        }
      },
      touchmove(e) {
        if (this.flag < 0) {
          e.preventDefault();
          this.posmove = e.targetTouches[0].pageY;
          if (Math.abs(this.poststart - this.posmove) < 70) {
            this.reverrecord = true
            this.recording = true
            this.btntext = '松开结束';
            Toast(
              {
                message: '松开结束',
                duration: 300
              })
          } else {
            this.recording = false;
            this.reverrecord = true;
            this.btntext = '松开手指取消发送'
            Toast(
              {
                message: '松开手指取消发送',
                duration: 300
              })
          }
          this.posmove = 0
        }
      },
      changestyle() {
        console.log('出发了语音');
        this.showvoice = !this.showvoice;
      },
      showInfo() {
        this.toShowMaskInfo = true;
      },
      //点击控制表情切换（显示和隐藏）
      emojiFuc() {
        this.showEmoji = !this.showEmoji;
      },
      videoFuc() {
        this.videoVal = true;
        this.showNarrowPopVal = false;
      },
      //提示音
      hint(staus) {
      },
      showNarrowPopFuc() {
        this.showNarrowPopVal = true;
        this.videoVal = false;
      }, showBigPopFuc() {
        this.showNarrowPopVal = false;
        this.videoVal = true;
      }, showEvaluateFuc() {
        this.showScore = !this.showScore;
      },
      sendMsg() {
        var content = this.content.trim();
        console.log(content)
        if(content==''){

        }else {
          let obj = {type: '1', content: content, time: ''}
          this.websock.send(JSON.stringify(obj));
          if(new Date().getMinutes()<10){
            var time = '0'+ new Date().getMinutes()
            console.log(time)
          }else {
            var time = new Date().getMinutes()
          }
          this.records.push({
            time: new Date().getHours()+':'+time,
            content: content,
            type: 2
          });
          this.content = "";
          this.scrollToBottom();
        }
      },
      getEmotionData(pageNow, pageSize) {
        return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
      },
      replaceFace(con) {
        if (!con) {
          return;
        }
        if (con.toString().indexOf('/:') > -1) {
          var exps = this.EXPS;
          for (var i = 0; i < exps.length; i++) {
            con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
          }
        }
        return con;
      },
      //滚动到底
      scrollToBottom() {
        setTimeout(() => {
          //滚动条长度
          var currentDistance = this.$refs.xwBody.scrollHeight - this.$refs.xwBody.clientHeight;
          //当前滚动条距离顶部的距离
          var currentScroll_y = this.$refs.xwBody.scrollTop;
          if (currentDistance > 0 && currentDistance > currentScroll_y) {
            currentScroll_y = Math.ceil((currentDistance - currentScroll_y) / 10) + currentScroll_y;
            currentScroll_y = currentScroll_y > currentDistance ? currentDistance : currentScroll_y;
            //微信和qq浏览器不支持 scrollTo？
            //this.$refs.xwBody.scrollTo(0,currentScroll_y);
            this.$refs.xwBody.scrollTop = currentScroll_y;
            this.scrollToBottom();
          }
        }, 13);
      },
      onFocusText() {
        this.scrollToBottom();
      },
      _loadEmojiData() {
        // getEmojiData().then((res)=>{
        //     var json = eval('('+res+')');
        //     this.EXPS=json.EXPS.slice(0);
        // });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .checked {
    color: #04c8af !important;
    border: 1px solid #04c8af !important;
  }

  .simplenews {
    padding: .64rem;
    background: white;

    span {
      display: inline-block;
      height: 1.6rem;
      line-height: 1.6rem;
      border: 1px solid #dddddd;
      padding: 0 .4rem;
      border-radius: 4px;
      font-size: .51rem;
      color: #666666;
    }
    span:nth-child(2){
      margin-right: 1.5rem;
    }
    span:nth-child(1), span:nth-child(2) {
      margin-bottom: .4rem;
    }
    span:nth-child(2), span:nth-child(4), span:nth-child(5){
      margin-left: .2rem;
    }
  }

  .sendmessage {
    background: #04c8af;
    width: 50%;
    height: 8vw;
    line-height: 8vw;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-left: .64rem;
    margin-right: .64rem;
  }

  .xw-footer-wrap1 {
    width: 100%;
    height: 15vw;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
  }

  .wwww {
    width: 11vw;
    height: 11vw;
    background-color: #ffffff;
    box-shadow: 0vw 1vw 3vw 0vw rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qqqq {
    width: 16vw;
    height: 4vw;
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    font-weight: normal;
    font-stretch: normal;
    line-height: 2vw;
    letter-spacing: 0vw;
    color: #ffffff;
    box-shadow: 0vw 1vw 3vw 0vw rgba(4, 200, 175, 0.3);
  }

  .mmmm {
    height: 3.5rem;
    width: 100%;
    padding-left: .3rem;
    padding-top: .3rem;

    span {
      border-radius: 6px;
      border: solid 1px #04c8af;
      background-color: #ffffff;
      line-height: 28px;
      display: inline-block;
      color: #04c8af;
      padding: 0 .1rem;
      margin: .1rem;
    }
  }

  .mask {
    width: 7rem;
    height: 7rem;
    background-color: #666666;
    color: #FFFFFF;
    position: fixed;
    top: 30%;
    left: 28%;
    font-size: .7rem;
    border-radius: .6rem;
  }

  .w-header-logox {
    width: 100%;
    height: 2.0851rem;
    display: flex;
    justify-content: center;

    img {
      width: 2.0851rem;
      height: 2.0851rem;
    }
  }

  ::-webkit-scrollbar-track {
    border-radius: 0;
    padding: 0;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    padding: 0;
    background-color: rgba(0, 0, 0, .2);
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .xw-ring-wrap {
    position: absolute;
    right: 5px;
    top: 3px;
    padding: 0 2px;
    z-index: 4;
  }

  .xw-ring-icon {
    float: right;
    padding: 5px;
    margin-right: 3px;
    height: 30px;
    width: 30px;
    opacity: .6;
    cursor: pointer;
    text-indent: -9999px;
    overflow: visible;
  }

  .xw-body-wrap-scroll, .xw-body-wrap-scroll-main {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
  }

  .xw-header {
    z-index: 2;
    max-height: 360px;
    background: #04c8af;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    width: 92%;
    margin: 0 .638rem;
    height: 4.4rem;
    border-radius: .213rem .213rem .4rem .4rem
  }

  .xw-header-content {
    position: relative;
    overflow: hidden;
    padding: 0px .638rem;
    min-height: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .xw-chat-servicer:after,
  .xw-chat-servicer:before,
  .xw-chat-customer:after,
  .xw-chat-customer:before,
  .xw-chat-wrap:after,
  .xw-chat-wrap:before,
  .xw-chat-tool:after,
  .xw-chat-tool:before,
  .xw-chat-ul-box:after,
  .xw-chat-ul-box:before {
    display: table;
    content: "";
  }

  .xw-header-avatar {
    float: left;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    margin-right: 8px;
    margin-top: 5px;
  }

  .xw-header-title-wrap {
    padding: 3px 0;
    float: left;
    width: 200px;
  }

  .xw-header-title {
    font-size: .6rem;
    color: #fff;
    margin-top: 8px;
  }

  .xw-chat-wrap {
    overflow: auto;
    padding-bottom: 20px;
  }

  .xw-chat-wrap .xw-chat-time,
  .xw-chat-wrap time {
    line-height: 1;
    text-align: center;
    display: block;
    margin-bottom: 8px;
    margin-top: 8px;
    font-size: 12px;
    color: #999;
    text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
  }

  .xw-chat-servicer,
  .xw-chat-customer {
    position: relative;
    margin-bottom: 16px;
    /*padding: 0 10px 0 0px;*/
  }

  .xw-servicer-avantar-wrap {
    position: absolute;
    bottom: 0;
    line-height: 0;
  }

  .xw-send-btn-text {
    display: inline-block;
    width: 50px;
    text-align: center;
    line-height: 30px;

    background-color: #04c8af;
    color: #fff;
    border-radius: 3px;
  }

  .xw-customer-avantar-wrap {
    position: absolute;
    bottom: 0;
    right: 8px;
    line-height: 0;
  }

  .xw-chat-servicer .xw-servicer-avantar-wrap, .xw-customer-avantar-wrap {
    left: 0;
  }

  .xw-servicer-avantar {
    border-radius: 100%;
  }

  .xw-servicer-avantar-wrap img, .xw-customer-avantar-wrap img {
    height: 34px;
    width: 34px;
  }

  .xw-chat-msg {
    -webkit-font-smoothing: antialiased;
    hyphens: auto;
    word-wrap: break-word;
    word-break: normal;
    position: relative;
    clear: both;
    padding: .32rem .64rem;
    border: 1px solid transparent;
    min-width: 50px;
    min-height: 22px;
    line-height: 1.6em;
    max-width: 85%;
    font-size: .638rem;
    color: #333333;
    border-radius: 5px;
  }

  .xw-chat-servicer .xw-chat-msg {
    background: #FFFFFF;
    border-color: #FFFFFF;
    float: left;
    border-radius: 5px;
  }

  .xw-chat-msg :last-child {
    margin-bottom: 0;
  }

  .xw-chat-msg span {
    white-space: pre-line;
  }

  .xw-chat-servicer,
  .xw-chat-customer {
    position: relative;
    margin-bottom: 16px;
    /*padding: 0 10px 0 0px;*/
  }

  .xw-chat-customer {
    text-align: right;
  }

  .xw-chat-customer .xw-chat-msg {
    float: right;
    text-align: left;
    background: rgba(4, 200, 175, 0.3);
  }

  .xw-customer-avantar {
    border-radius: 50%;
  }

  .xw-chat-msg :last-child {
    margin-bottom: 0;
  }

  .xw-chat-wrap .xw-system-info-time,
  .xw-chat-wrap time {
    line-height: 1;
    text-align: center;
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    color: #999;
    text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
  }

  .xw-system-info {
    margin-bottom: 8px;
  }

  .xw-chat-wrap > :last-child {
    margin-bottom: 16px;
  }

  .xw-system-info {
    text-align: center;
    font-size: 12px;
  }

  .xw-system-info span {
    display: inline-block;
    background: rgba(0, 0, 0, .08);
    padding: 4px 8px;
    line-height: 1;
    color: #7c7c7c;
    border-radius: 2px;
    text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
  }

  .xw-footer-wrap {
    width: 100%;
    background: #fff;
    z-index: 2;
    height: 3rem;
  }

  .xw-footer-content {
    position: relative;
    height: 52px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 4px;
    height: 100%;
    align-items: center;
    width: 100%;
  }

  .xw-footer-content1 {

    height: 4rem;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: .64rem;
    padding-right: .64rem;
    width: 100%;
  }

  .xw-vmodel-wrap {
    width: 100%;

  }

  .xw-content-textarea {
    box-sizing: border-box;
    z-index: 1;
    overflow-y: auto;
    font-size: .638rem;
    line-height: 14px;
    border: none;
    resize: none;
    width: 80%;
    /*padding: 22px 0px 0px 14px;*/
    font-family: inherit;
    word-wrap: break-word;
    padding-left: .638rem;
  }

  .xw-chat-tool {
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .xw-chat-tool-item {
    line-height: 52px;
    position: relative;
    float: left;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .xw-chat-tool-btn {
    display: block;
  }

  .xw-chat-tool-btn {
    margin-top: 7px;
    height: 38px;
    width: 38px;
    border-radius: 100%;
    text-indent: -9999px;
    opacity: .5;
    overflow: hidden;
    transform: translateZ(0);
    margin-left: 10px;
  }

  .xw-chat-tool-btn.xw-face {
    background: url(/static/images/smileOn.svg) no-repeat 50%;
  }

  .xw-chat-tool-btn.xw-face-close {
    background: url(/static/images/smileClose.svg) no-repeat 50%;
  }

  .xw-chat-tool-item .xw-window-text {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: -3px;
    -webkit-transform: translateX(-60%);
    transform: translateX(-60%);
    white-space: nowrap;
    box-shadow: 0 3px 18px 2px rgba(0, 0, 0, .1), 0 0 1px rgba(0, 0, 0, .05);
    font-size: 12px;
    background: #fff;
    line-height: 1em;
  }

  .xw-chat-tool-item .xw-window-text.xw-face-emoji-ul {
    right: -23px;
    left: auto;
    -webkit-transform: none;
    transform: none;
  }

  .xw-chat-tool-item .xw-window-text h4 {
    font-size: 12px;
    margin: 0;
    font-weight: 400;
    padding: 12px 8px;
    padding-bottom: 0;
  }

  .xw-chat-ul-box {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .xw-chat-ul-box {
    position: relative;
    z-index: 1;
    background: #fff;
    padding: 8px;
    height: 130px;
    overflow: hidden;
    width: 340px;
    margin: 0px auto;
  }

  .xw-chat-tool-item .xw-window-text .xw-chat-ul-box {
    padding: 8px;
  }

  .swiper-slide {
    float: left;
  }

  .xw-chat-ul-box a {
    display: block;
    height: 40px;
    width: 40px;
  }

  .swiper-pagination {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    background: #ccc;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .swiper-pagination-bullet-active {
    background: #04c8af;
  }

  .xw-chat-tool-item {
    position: relative;
    float: left;
  }

  .xw-hide-operation {
    background: url(/static/images/addOn.svg) no-repeat 50%;
    width: 38px;
    height: 38px;
    margin-right: 10px;
    transform: scale(.7);
  }

  .xw-hide-operation-close {
    background: url(/static/images/addClose.svg) no-repeat 50%;
    width: 38px;
    height: 38px;
    margin-right: 10px;
    transform: scale(.7);
  }

  .xw-chat-tool-item .xw-window-text span {
    display: block;
    padding: 10px 12px;
    background: #fff;
    position: relative;
    z-index: 1;
    font-size: 17px;
    line-height: 16px;
  }

  .xw-chat-servicer:after,
  .xw-chat-customer:after,
  .xw-chat-wrap:after,
  .xw-chat-tool:after,
  .xw-chat-ul-box:after {
    clear: both;
  }

  .xw-chat-msg:last-child:before {
    bottom: -1px;
  }

  .xw-chat-msg:last-child:after,
  .xw-chat-msg:last-child:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    display: block;
  }

  .xw-chat-customer .xw-chat-msg:last-child:before {
    //display: inline-block;
    //height: 0;
    //width: 0;
    //border: 10px solid transparent;
    //border-bottom: 10px solid  #cee4ff;
    //right: -10px;
    //border-left-width: 9px;
  }

  .xw-chat-servicer .xw-chat-msg:last-child:before {
    //display: inline-block;
    //height: 0;
    //width: 0;
    // border: 10px solid transparent;
    // border-bottom: 10px solid #efefef;
    // left: -10px;
    // border-left-width: 9px;
  }

  //.xw-chat-servicer .xw-chat-msg:last-child:after {
  //display: inline-block;
  //height: 0;
  //width: 0;
  //border: 10px solid transparent;
  //border-bottom: 10px solid #FFFFFF;
  //left: -8px;
  // border-left-width: 9px;
  //bottom: 0px;
  //}
  .xw-show-info-box {
    height: 200px;
    margin-top: -50px;
    z-index: 1000;
    background: #ed4858;
    color: #fff;
  }

  .xw-logo {
    text-align: center;
  }

  .xw-logo img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 20px;
  }

  .xw-header-info p {
    height: 110px;
    padding: 0 16px;
    line-height: 1.6rem;
    word-wrap: break-word;
    text-align: left;
    overflow: auto;
  }

  .xw-faceEmoji {
    margin-bottom: 7px;
    width: 20%;
    float: left;
  }

  .xw-faceEmoji-main {
    text-align: center;
  }

  .xw-samll-pop-wrap {
    position: absolute;
    height: 160px;
    width: 30%;
    top: 0;
    right: 0;
    background-size: 100% 100%;
    background: url(/static/images/s.jpg) no-repeat;
    z-index: 1000;
  }

  .xw-pop-server {
    background: url(/static/images/s.jpg) no-repeat;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .xw-pop-customer {
    position: absolute;
    bottom: 20px;
    width: 80%;
    height: 200px;
    background: url(/static/images/c.jpg) no-repeat;
    z-index: 101;
    left: 50%;
    margin-left: -40%;
    text-align: center;
  }

  .xw-narrow-pop {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 5px;
    top: 5px;
    display: inline-block;
    background: red;
    color: #fff;
    text-align: center;
  }

  .xw-big-pop {
    display: block;
    background: red;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }

  .xw-hang-up {
    background: red;
    width: 100px;
    height: 34px;
    display: inline-block;
    border-radius: 20%;
    position: absolute;
    bottom: 10px;
    transform: translateX(-50%);
  }

  .xw-hang-up-icon {
    position: relative;
    z-index: 1290;
    width: 40px;
    height: 34px;
  }

  .xw-chat-msg span img {
    vertical-align: middle;
  }

  .mint-swipe-items-wrap > div {
    text-align: center;
  }

  .xw-scroll-ul {
    min-height: 340px;
  }

  .mint-swipe-indicator.is-active {
    background: #ed4858;
    opacity: 1;
  }

  .app {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #f1f1f1;
    width: 100%;
    height: 100%;
  }

  .xw-content {
    flex: 1;
    position: relative;
    overflow: auto;
    transition: height .8s;
    background: #f1f1f1;
    padding: 0 .638rem;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated.bounceIn,
  .animated.bounceOut {
    -webkit-animation-duration: .75s;
    animation-duration: .75s;
  }

  @-webkit-keyframes bounceInDown {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }

  .bounceInDown {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }

  @keyframes bounceInLeft {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }

  .bounceInLeft {
    -webkit-animation-name: bounceInLeft;
    animation-name: bounceInLeft;
  }

  @-webkit-keyframes bounceInRight {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    from {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }

  .bounceInRight {
    -webkit-animation-name: bounceInRight;
    animation-name: bounceInRight;
  }

  @keyframes bounceInUp {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInUp {
    -webkit-animation-name: bounceInUp;
    animation-name: bounceInUp;
  }
</style>
<style>
  .xw-footer-wrap1 .mint-field-other {
    width: 4rem;
    display: flex;
    align-items: center;
  }

  .xw-footer-wrap1 .mint-field {
    width: 100%;
  }

  .xw-footer-wrap1 .mint-field-core {
    width: 69vw;
    height: 9vw;
    background-color: #ffffff;
    border-radius: 1vw;
    border: solid 1px #dddddd;
  }

  .yd-confirm-ft > a.primary {
    color: #04c8af;
  }

  .yd-confirm-hd {
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;

  }

  .yd-confirm-title {
    width: 100%;
    font-size: .76rem;
    text-align: center;
    margin: 0 auto;

  }

  .yd-confirm-ft {
    font-size: .76rem;
  }

  .yd-btn-block {
    height: 9vw;
    margin-top: 0;
    width: 70%;
    margin: 0 auto;
    font-size: .76rem;
    color: #f1f1f1;
  }
</style>
