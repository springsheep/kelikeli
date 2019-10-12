<template>
  <div class="content">
    <div style="width: 100%;margin-top: 30vh" v-show="dataList==null">
      <div style="margin: 0 auto;text-align: center">
        <img src="../assets/170.png" alt="" style="width: 5rem">
      </div>
      <div style="color: #999999;width: 100%;text-align: center;font-size: .64rem">
        暂无记录
      </div>
    </div>

    <ul>
      <li v-for="(item , index) in dataList" :key="index">
        <div class="listnum">{{index+1}}</div>
        <div class="listcontent">
          <div class="top">
            <h4>{{item.carNo}}</h4>
            <p class="time">{{item.createTime}}</p>
          </div>
          <div class="Separator"></div>
          <div class="bottom">
            <img src="../assets/161.png" alt="">
            <div class="address">{{item.address}}</div>
          </div>
        </div>
      </li>


    </ul>
  </div>
</template>

<script>
  export default {
    name: "kaka_CarMovingRecord",
    data() {
      return {
        openId: sessionStorage.getItem('openId'),
        pageNo:0,
        pageSize:5,
        dataList:null

      }
    },
    created() {
      //初始化
      this.getinfo()
    },
    methods: {
      getinfo() {
        this.axios.post('moveCar/moveCarHistory', {
          "openId":this.openId,
          'pageNo':this.pageNo,
          "pageSize":this.pageSize
        }).then((res) => {
          console.log(res.data)
          if(res.data.state==1){
            this.dataList=res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    padding-top: 4vw;
    padding-bottom: 4vw;
    width: 100%;
    height: 100%;
    background: #ffffff;

    ul {
      li {
        width: 92vw;
        height: 27vw;
        background: url("../assets/160.png");
        background-size: cover;
        box-shadow: 0vw 1vw 3vw 0vw rgba(0, 0, 0, 0.1);
        border-radius: 3vw;
        margin: 0 auto 0;
        margin-top: 4vw;

        .listnum {
          height: 6vw;
          width: 6vw;
          line-height: 6vw;
          text-align: center;
          color: #ffffff;

          p {
            margin-top: 2vw;
            margin-left: 2vw;
          }
        }

        .listcontent {
          width: 74vw;
          height: 10vw;
          margin: 0 auto;

          .top {
            height: 5vw;
            font-family: PingFang-SC-Bold;
            font-weight: normal;
            font-stretch: normal;
            line-height: 5vw;
            letter-spacing: 0vw;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .time {
              font-family: PingFang-SC-Regular;
              font-size: .51rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 5vw;
              letter-spacing: 0vw;
              color: #999999;
            }

            h4 {
              font-size: .76rem;
            }
          }

          .Separator {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-top: 3vw;
          }

          .bottom {
            img {
              width: 3vw;
              height: 4vw;
            }

            .address {
              margin-left: 3vw;
            }

            margin-top: 3vw;
            height: 6vw;
            font-family: PingFang-SC-Regular;
            font-size: 4vw;
            font-weight: normal;
            font-stretch: normal;
            line-height: 6vw;
            letter-spacing: 0vw;
            color: #999999;
            display: flex;
            align-items: center;
          }
        }
      }

      li:first-child {
        margin-top: 0;
      }
    }
  }

</style>
