<template>
  <div>
    <div class="content">
      <div class="top">选择服务项</div>
      <div class="bottom">
        <div class="left">
          <div class="lefttop">
            保险服务
          </div>
          <div class="choosecontent">
            <div class="choose" v-for="(item,index) in insuranceServiceList">
              <el-checkbox :label="item.name" size="mini" @change="choose()" v-model="check[index].o"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="left">
          <div class="lefttop">
            用车服务
          </div>
          <div class="choosecontent">
            <div class="choose" v-for="(item,index) in useCarServiceList">
              <el-checkbox :label="item.name" size="mini" @change="choose1()" v-model="check1[index].o"></el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" style="height: 150px">
      <div class="top">版权说明</div>
      <div class="bottom" style="display: flex;flex-direction: column;margin-top: 20px">
        <div class="demo-input-suffix" style="display: flex;align-items: center;width: 40%">
          <div style="width: 100px"> 中文：</div>
          <el-input
            placeholder="如 杭州可有科技有限公司"
            v-model="input1" size="small">
          </el-input>
        </div>
        <div class="demo-input-suffix" style="display: flex;align-items: center;width: 40%;margin-top: 10px">
          <div style="width: 100px"> 英文：</div>
          <el-input
            placeholder="如 Copyright © 2019 keyou. All Rights Reserved."
            v-model="input2" size="small ">
          </el-input>
        </div>
      </div>
    </div>
    <div style="text-align:left;padding:10px 20px">
      <el-button type="primary" size="small" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kaka_ServiceConfiguration",

    data() {
      return {
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        insuranceServiceList: null,
        useCarServiceList: null,
        check: [],
        check1: [],
        insuranceServiceIds: [],
        useCarServiceIds: [],
        input2: '',
        input1: '',
      };
    }, created() {
      this.getinfo();

    }, methods: {
      save() {
        console.log(this.insuranceServiceIds, this.useCarServiceIds)
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/baseServiceConfigSave',
          data: {
            "loginMobilePhoneNo": this.mobilePhoneNo,
            "insuranceServiceIds": this.insuranceServiceIds,
            "useCarServiceIds": this.useCarServiceIds,
            "copyrightZh": this.input1,
            "copyrightEn": this.input2,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          if (res.state == 1) {
            console.log(res)
            this.$message({
              showClose: true,
              message: '设置成功',
              type: 'success'
            });
          }
        })
      },
      choose() {
        this.insuranceServiceIds = [];
        for (let i in this.check) {
          if (this.check[i].o) {
            this.insuranceServiceIds.push(this.insuranceServiceList[i].id)
          }
        }
      },
      choose1() {
        this.useCarServiceIds = [];
        for (let i in this.check1) {
          if (this.check1[i].o) {
            this.useCarServiceIds.push(this.useCarServiceList[i].id)
          }
        }
      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getBaseServiceConfig',
          data: {
            "loginMobilePhoneNo": this.mobilePhoneNo,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          if (res.state == 1) {
            this.input1 = res.data.copyrightZh;
            this.input2 = res.data.copyrightEn;
            this.useCarServiceList = res.data.useCarServiceList;
            this.insuranceServiceList = res.data.insuranceServiceList
            for (let i in this.insuranceServiceList) {
              if (this.insuranceServiceList[i].is_selected == 1) {
                let obj = {o: true}
                this.check.push(obj)
                this.insuranceServiceIds.push(this.insuranceServiceList[i].id)
              } else {
                let obj = {o: false}
                this.check.push(obj)
              }
            }
            for (let i in this.useCarServiceList) {
              if (this.useCarServiceList[i].is_selected == 1) {
                this.useCarServiceIds.push(this.useCarServiceList[i].id)
                let obj = {o: true}
                this.check1.push(obj)
              } else {
                let obj = {o: false}
                this.check1.push(obj)
              }
            }
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 97%;
    margin: 15px auto;
    height: 280px;
    background-color: #ffffff;
    border: solid 1px #d2d2d2;
    min-width: 1000px;

    .top {
      font-size: 13px;
      text-align: left;
      height: 30px;
      line-height: 30px;
      padding-left: 15px;
      background-color: #f1f1f1;
      border-bottom: solid 1px #d2d2d2;
      color: #666666;
    }

    .bottom {
      display: flex;
    }

    .left {


      .choosecontent {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .lefttop {
        width: 85px;
        height: 30px;
        font-family: MicrosoftYaHeiLight;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40px;
        letter-spacing: 1px;
        color: #333333;
        padding-left: 10px;
      }

      .choose {
        padding-left: 10px;
        width: 100px;
        height: 40px;
        background-color: #f8f8f8;
        border: solid 1px #d2d2d2;
        /*background: #5daf34;*/
        margin-top: 10px;
        margin-left: 10px;
        display: flex;
        align-items: center;
      }

      width: 50%;
      text-align: left;
    }
  }
</style>
