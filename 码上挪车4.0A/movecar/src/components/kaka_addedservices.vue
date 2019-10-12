<template>
  <div style="width: 100%;height: 100%;background: #ffffff" class="addedservices">
    <div class="title">
      保险公司增值服务项：
    </div>
    <div class="first" v-for="(item,index) in data" :key="index">
      <div class="left img">
        <img :src="item.serviceIcon" alt="" style="width: 100%">
      </div>
      <div class="left right">
        <h3>{{item.serviceName}}</h3>
        <p>{{item.serviceDescribe}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  var img1 = require('../assets/80.png')

  export default {
    name: "kaka_addedservices",
    data() {
      return {
        data: [],
        qrcode: null,
        openId: sessionStorage.getItem('openId'),
        organizationId: null
      }
    },
    created() {
      if (sessionStorage.getItem('organizationId') === '1') {
        //从路由进入
        this.qrcode = sessionStorage.getItem('qrcode')
        this.getinfo()
      } else {
        this.organizationId = sessionStorage.getItem('organizationId')
        //从链接进入
        this.getinfo1()
      }

    }, //从路由进入
    methods: {
      getinfo() {
        this.axios.post('moveCar/getValueAddedServices', {
          "openId": this.openId,
          "qrCode": this.qrCode,
        }).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data, 1)
            this.data = res.data.data
          }
        })
      },
      //从链接进入
      getinfo1() {
        this.axios.post('moveCar/getValueAddedServices', {
          "openId": this.openId,
          "organizationId": this.organizationId,
        }).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data, 2)
            this.data = res.data.data
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    height: 14vw;
    background-color: #f1f1f1;
    width: 100%;
    font-size: 4vw;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14vw;
    letter-spacing: 0vw;
    color: #666666;
    text-align: center;
  }

  .first {
    width: 350px;
    min-height: 56px;
    margin: 0 auto;
    padding-top: 5.33vw;
    border-bottom: 1px solid #EFEFEF;
    padding-bottom: 5.33vw;
    display: flex;
    overflow: hidden;

    .left {
      /*float: left;*/
    }

    .img {
      width: 40px;
      height: 40px;
      /*background: #5daf34;*/
      border-radius: 50%;
    }

    .right {
      width: 73.6vw;
      margin-left: 4vw;

      h3 {
        font-size: 4vw;
        color: #000;
        line-height: 4vw;
        margin-bottom: 1.33vw;
        margin-top: 0;
      }

      p {
        font-size: 3.2vw;
        color: #666;
        line-height: 4.8vw;
        margin-bottom: 0;
        margin-top: 0;
      }
    }

  }

</style>
<style>
  .addedservices .mint-field {
    /*height:  2.2rem;*/
  }
</style>
