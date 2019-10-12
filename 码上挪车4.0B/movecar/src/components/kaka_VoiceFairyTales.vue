<template>
  <div class="content">
    <img src="../assets/103.png" alt="" class="logo">
    <div class="name">车主</div>
    <div class="time">{{callinTime}}</div>
    <img src="../assets/104.png" alt="" class="over" @click="close">
    <div class="overname">{{bottom}}</div>
  </div>
</template>

<script>
  export default {
    name: "kaka_VoiceFairyTales",
    data() {
      return {
        timer:null,
        callinTime:'正在等待车主的接听...',
        bottom:'取消'
      }
    },created() {

      setTimeout(()=>{
        this.callinTime='00:00'
        this.bottom='挂断'
        this.getstart(true)
      },3000)
    },
    methods:{
      getstart(bolean){
        let _this = this
        let hour, minute, second,second1
        hour = minute = second = 0
        if (bolean === true) {
          _this.timer = setInterval(function () {
            if (second >= 0&&second<9) {
              second = second + 1
              second1='0'+second
            }else {
              second = second + 1
              second1=second
            }
            if (second ==60) {
              second = 0
              minute = minute + 1
            }
            if (minute ==60) {
              minute = 0
              hour = hour + 1
            }
            if(hour==0){
              if(minute<9){
                _this.callinTime ='0'+minute + ':' + second1
              }else {
                _this.callinTime =minute + ':' + second1
              }
            }else {
              if(minute<9){
                _this.callinTime =hour + ':' + '0'+minute + ':' + second1
              }else {
                _this.callinTime =hour + ':' + minute + ':' + second1
              }
            }
          }, 1000)
        } else {
          window.clearInterval(_this.timer)
        }
      },
      close(){
        this.$router.push({path:'/kaka_chart'})
      }
    },
    deactivated() {
      window.clearInterval(_this.timer)
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.9;

    .logo {
      width: 27vw;
      height: 27vw;
      background-color: #ffffff;
      border-radius: 50%;
      margin: 20vw 37vw 0;
    }

    .name {
      text-align: center;
      height: 6vw;
      font-family: PingFang-SC-Medium;
      font-size: 1rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 2vw;
      letter-spacing: 0vw;
      color: #ffffff;
      margin-top: 5vw;
    }

    .time {
      text-align: center !important;
      height: 3vw;
      font-family: PingFang-SC-Regular;
      font-size: .55rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 2vw;
      letter-spacing: 0vw;
      color: #ffffff;
      margin-top: 4vw;

    }

    .over {
      width: 16vw;
      height: 16vw;
      background-color: #e33f3f;
      border-radius: 50%;
      margin: 59vw 42vw 0;
    }

    .overname {
      height: 3vw;
      font-family: PingFang-SC-Regular;
      font-size: 4vw;
      font-weight: normal;
      font-stretch: normal;
      line-height: 2vw;
      letter-spacing: 0vw;
      color: #ffffff;
      text-align: center;
      margin-top: 4vw;
    }
  }

</style>
