<template>
  <div class="content">
    <div class="logo">
      <img src="../assets/87.png" alt="" style="width: 100%">
    </div>
    <h4>{{obj.name}}</h4>

    <a :href="'tel:' +obj.list[0].area_code +obj.list[0].phone">
      <div class="btn">拨打（{{obj.list[0].area_code}}）{{obj.list[0].phone}}</div></a>
    <div class="tip">温馨提示</div>
    <div class="mask">
      <div v-for="item in obj.list" style="margin-top: 4vw">
        <div class="p">{{item.name}}</div>
        <div class="p">（{{item.area_code}}）{{item.phone}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "kaka_RoadassistanceInfo",
    data(){
      return{
      obj:null
      }
    },
    created() {
      console.log(this.$store.state.saveInfo)
      this.obj=this.$store.state.saveInfo

    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    padding-top: 8vw;
    padding-bottom: 8vw;
    .logo {
      width: 15vw;
      height: 16vw;
      /*background-color: #03c8af;*/
      margin: 0 auto;
    }

    h4 {
      width: 100%;
      text-align: center;
      height: 5vw;
      font-weight: 500;
      font-size: 5vw;
      line-height: 6vw;
      letter-spacing: 0vw;
      color: #333333;
      margin: 5vw auto;
    }

    .btn {
      width: 92vw;
      height: 12vw;
      background-color: #03c8af;
      border-radius: 6vw;
      font-size: 5vw;
      font-weight: normal;
      font-stretch: normal;
      line-height: 12vw;
      letter-spacing: 0vw;
      color: #ffffff;
      text-align: center;
      margin: 0 auto;
      margin-top: 13vw;
    }

    .tip {
      height: 4vw;
      font-family: PingFang-SC-Medium;
      font-size: 4vw;
      font-weight: normal;
      font-stretch: normal;
      line-height: 6vw;
      letter-spacing: 0vw;
      color: #333333;
      text-align: center;
      margin: 0 auto;
      margin-top: 16vw;
    }

    .mask {
      width: 92vw;
      /*height: 58vw;*/
      background-color: #f8f8f8;
      box-shadow: 0vw 1vw 3vw 0vw rgba(0, 0, 0, 0.2);
      border-radius: 3vw;
      margin: 0 auto;
      margin-top: 5vw;
      text-align: center;
      padding-bottom: 8vw;

      .p {
        height: 3vw;
        font-size: 3.5vw;
        line-height: 5vw;
        letter-spacing: 0vw;
        color: #333333;
        padding-top: 5vw;
      }
    }
  }

</style>
