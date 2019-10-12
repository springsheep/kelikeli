<template>
  <div style="width: 100%;height: 100%;background: white">
    <img src="../../assets/success.jpeg" class="img"/>
    <div>长按识别二维码，关注公众号</div>
    <!--<div>2.点击公众号消息，填写车辆信息</div>-->
    <div style=";padding-left:0;color: #333333;font-weight: 400;margin-top: 13vw;text-align: center">关注成功即开启挪车服务</div>
<div class="table">
  <img src="../../assets/134.png" alt="">
</div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "kaka_concernWx",
    data(){
      return{
        openId: sessionStorage.getItem('openId')
      }
    },
    methods: {
      next() {
        // console.log(localStorage.getItem('qrcode'),sessionStorage.getItem('qrcode'),this.$store.state.qrcode)
        this. axios.post('moveCarB/checkSubscribe', {
          "qrCode": sessionStorage.getItem('qrcode'),
          "openId": this.openId
        }).then((res) => {
          // console.log(res.data)
          if(res.data.state=='1'){
            if(res.data.data.isSubscribe=='1'){
              this.$router.push({path: '/kakaregister/kaka_bindCar'})
            }else {
              Toast('请先关注公众号')
            }
          }
        }).catch((error) => {
          Toast(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.table{
  height: 36vw;
  width: 93vw;
  border-radius: 3vw;
  background: #04c8af;
  margin: 5vw auto 0;
  img{
    width: 100%;
    height: 100%;
  }
}
  .button {
    width: 70%;
    margin: 0 auto;
    line-height: 1.877rem;
    background-color: #04c8af;
    color: #FFFFFF;
    font-size: .768rem;
    border-radius: .9rem;
    margin-top: 4rem;

  }
  .img {
    margin-top: 15vw;
    width: 8.533rem;
  }

  div {
    width: 100%;
    text-align: center;
    font-size: .64rem;
    box-sizing: border-box;
    color: #333333;
    font-weight: 500;
  }

  div:nth-child(3) {
    margin: .64rem 0;
    padding-left: .6rem;
  }

  div:nth-child(2) {
    margin: .64rem 0;
  }

  div:nth-child(1) {
    /*margin-top: 1rem;*/
    padding-top: 1rem;
    box-sizing: border-box;
  }

  footer div {
    width: 100%;
    font-size: .383rem;
    color: #999999;
    text-align: center;
    font-weight: 300;
    padding-top: 0 !important;
    margin-top: 0 !important;
    z-index: 10;
  }

  footer {
    width: 100%;
  position: fixed;
    bottom: 0rem;
  }
</style>
