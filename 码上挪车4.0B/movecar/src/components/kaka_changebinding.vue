<template>
  <div class="changebind" style="width: 100%">
    <van-collapse v-model="activeName" accordion>
      <div v-for="(item,index) in dataList" :key="index">
        <van-collapse-item :title="item.carNo" :name="index" icon="https://test.kelibbb.com/res/img/moveCar/car.png">
          <div @click="choose(1,item,index)">
            <mt-field label="挪车码" readonly="readonly" :disableClear="true">
              <img src="../assets/162.png" class="rigntimg1">
              <img src="../assets/154.png" class="rigntimg">
            </mt-field>
          </div>
        <div style="width: 96%;margin-left: 4%">
          <van-divider/>
        </div>
          <div @click="choose(2,item,index)">
            <mt-field label="车牌号码" placeholder="Input username" readonly="readonly" :disableClear="true"
                      :value="item.carNo">
              <img src="../assets/154.png" class="rigntimg">
            </mt-field>
          </div>
          <div style="width: 96%;margin-left: 4%">
            <van-divider/>
          </div>
          <div @click="choose(3,item,index)">
            <mt-field label="手机号码" readonly="readonly" :disableClear="true" :value="item.mobilePhoneNo">
              <img src="../assets/154.png" class="rigntimg">
            </mt-field>
          </div>
          <div style="width: 96%;margin-left: 4%">
            <van-divider/>
          </div>
          <div @click="choose(4,item,index)">
            <mt-field label="车辆品牌"  readonly="readonly" :disableClear="true" :value="item.carBrand">
              <img src="../assets/154.png" class="rigntimg">
            </mt-field>
          </div>
          <div style="width: 96%;margin-left: 4%">
            <van-divider/>
          </div>
          <div @click="choose(5,item,index)">
            <mt-field label="状态" placeholder="Input username" v-model="item.isStop==='0'?'已启用':'停用'" readonly="readonly" :disableClear="true">
              <img src="../assets/154.png" class="rigntimg">
            </mt-field>
          </div>
        </van-collapse-item>
      </div>
    </van-collapse>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import wx from '../../config/wx'
  export default {
    name: "kaka_changebinding",
    data() {
      return {
        num:1,
        activeName: 0,
        openId: sessionStorage.getItem('openId'),
        dataList: null,//车辆信息
      }
    }, created() {
      this.getinfo();
      if(this.$store.state.mylovecarflag==null){

      }else {
        this.activeName=this.$store.state.mylovecarflag
      }

    },
    methods: {
      choose(m, item,index) {
        console.log(index)
        this.$store.state.mylovecarflag=index;
        this.$store.state.changeinfoflag = m
        this.$store.state.changeinfo = item
        if (m == 1) {
          Indicator.open({
            text: '加载中，请稍后...',
          });
          if (item.qrCode == null) {
            //  这里是b版本的
            this.axios.post('moveCarB/selfCreateMoveCarQrCode', {
              "openId": item.openId,
              "carNo": item.carNo,
              "mobilePhoneNo": item.mobilePhoneNo,
              "carBrand": item.carBrand,
            }).then((res) => {
              Indicator.close();
              if (res.data.state == 1) {
                sessionStorage.setItem('movecarInfo', JSON.stringify(res.data.data))
                window.location.href=`${wx.movecarurl}`
              } else {
                Toast(res.data.retMsg);
              }
            })

          } else {
            //  这里是a版本的
            this.axios.post('moveCar/selfCreateMoveCarQrCode', {
              "openId": item.openId,
              "carNo": item.carNo,
              "mobilePhoneNo": item.mobilePhoneNo,
              "carBrand": item.carBrand,
            }).then((res) => {
              Indicator.close();
              if (res.data.state == 1) {
                sessionStorage.setItem('movecarInfo', JSON.stringify(res.data.data))
                this.$router.push({path: '/kaka_movecarmodule'})
              } else {
                Toast(res.data.retMsg);
              }
            })
          }

        } else {
          this.$router.push({path: '/kaka_changeinfo'})
        }

      },
      //  初始化
      getinfo() {
        this.axios.post('moveCar/myLoveCars', {
          "openId": this.openId
        }).then((res) => {
          console.log(res.data)
          if (res.data.state == 1) {
            this.dataList = res.data.data;
            console.log(this.dataList)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .rigntimg {
    width: 2vw;
    height: 3vw;
  }

  .rigntimg1 {
    width: 5vw;
    height: 5vw;
    margin-right: .64rem;
  }

  .choosebutton {
    height: 20vw;
    line-height: 20vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      width: 27vw;
      height: 11vw;
      line-height: 11vw;
      text-align: center;
      font-size: .64rem;
      color: white;
      background-color: #15d1b9;
      border-radius: 5vw;
    }

    .third {
      background-color: #e83a3a;
    }

    /*background: #04c8af;*/
    .changebind{
      width: 100%;
    }
  }
</style>
<style>.
.changebind .mint-cell-wrapper {
  background: white !important;
  display: flex !important;
  align-items: center !important;
}

.changebind .van-icon__image {
  width: 11vw;
  height: 11vw;
}

.changebind .van-cell {

  padding: 0 !important;
  font-size: .76rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 21vw;
  line-height: 21vw;

}

.changebind .mint-field-other {
  display: flex;
  align-items: center;
}

.changebind .mint-field-core {
  color: #999999 !important;
  font-size: .64rem;
  text-align: right;
  padding-right: .64rem;
}

.changebind .mint-cell-text {
  font-size: .64rem;
  color: #333333;
}

.van-divider {
  margin: 0 !important;
}

.van-cell__left-icon, .van-cell__right-icon {
  width: 11vw !important;
  height: 21vw !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: .64rem;
}

.changebind .van-cell__title {
  padding-left: .64rem;
}

.changebind .van-collapse-item__content {
  padding: 0;
}

.changebind .mint-cell {
  height: 13vw !important;
  line-height: 13vw !important;
}


.changebind .mint-cell-wrapper {
  background: white !important;
  padding: 0 .64rem;
}
</style>
