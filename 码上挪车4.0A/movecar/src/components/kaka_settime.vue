<template>
  <div class="settime">
    <van-cell-group>
      <van-switch-cell v-model="checked" title="防骚扰设置" active-color="#03c8af"/>
      <div v-show="checked">
        <van-cell title="免打扰时段">
          <span @click="choose(1)">{{time1}}</span> 至
          <span @click="choose(2)">{{time2}}</span>
        </van-cell>
      </div>
    </van-cell-group>
    <div class="save" v-show="checked" @click="save(2)">
      保存
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        :min-hour="0"
        :max-hour="6"
        @confirm="confirm"
        @cancel="cancel"
        @setColumnValue="setColumnValue(index,value)"
      />
    </van-popup>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_settime",
    data() {
      return {
        checked: true,
        currentTime: '4:00',
        show: false,
        time1: '00:00',
        time2: '06.30',
        flag: null,
        openId: sessionStorage.getItem('openId'),

      }
    }, watch:{
      checked(){
        this.save(1)
      }
    },mounted() {
      this.checked=JSON.parse(sessionStorage.getItem("personInfo")).isNotDisturb==='1';
      console.log(JSON.parse(sessionStorage.getItem("personInfo")))
      this.time2=JSON.parse(sessionStorage.getItem("personInfo")).notDisturbEndTime;
      this.time1=JSON.parse(sessionStorage.getItem("personInfo")).notDisturbStartTime;
    },methods: {
      setColumnValue(index,value){
        console.log(index,value,111)

      },
      //  baocun
      save(m) {
        this.axios.post('moveCar/notDisturbSetting', {
          "openId": this.openId,
          "isNotDisturb": this.checked ? "1" : '0',
          "notDisturbStartTime": this.time1,
          "notDisturbEndTime": this.time2,
        }).then((res) => {
          console.log(res.data)
          if (res.data.state == 1) {
            if(m==2){
              this.$router.push({path:'/kaka_mycenter'})
            }
          } else {
            Toast(res.data.retMsg);
          }
        })
      },
      confirm(value) {
        console.log(value)
        this.show = false;
        console.log(this.flag)
        if (this.flag == 1) {
          this.time1 = value
        } else {
          this.time2 = value
        }
      },
      choose(m) {
        this.show = true;
        this.flag = m
        if(m==1){
          this.currentTime=this.time1
        }else if(m==2){
          this.currentTime=this.time2
        }
      },
      cancel() {
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .settime {
    width: 100%;
  }

  .save {
    width: 92vw;
    height: 12vw;
    background-color: #15d1b9;
    border-radius: 6vw;
    font-size: .76rem;
    color: white;
    text-align: center;
    margin: 8vw auto;
    line-height: 12vw;
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
</style>
