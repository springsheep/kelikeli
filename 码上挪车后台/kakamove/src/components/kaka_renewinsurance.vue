<template>
  <div class="content">
    <div class="top">一键续保</div>
    <div class="bottom">
      <div>续保链接：<input type="text" v-model="renewInsuranceUrl"> <span class="button" @click="save">发布</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kaka_renewinsurance",
    data() {
      return {
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        renewInsuranceUrl: null
      }
    },created() {
      this.getinfo()
    },
    methods: {
      save() {
        if(this.renewInsuranceUrl==null){

          this.$message({
            type: 'warning',
            message: '请先填写续保链接!'
          });
        }else {
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json', 'token': this.$store.state.token},
            url: 'moveCar/publishRenewInsurance',
            data: {
              loginMobilePhoneNo: this.mobilePhoneNo,
              renewInsuranceUrl: this.renewInsuranceUrl
            }
          };
          this.$postHttp(options, '加载').then((res) => {

            this.$message({
              type: 'success',
              message: '发布成功!'
            });
          })
        }
      },
      getinfo(){
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getRenewInsurance',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          console.log(res.data)
          this.renewInsuranceUrl=res.data.renewInsuranceUrl;
        })
      }
    }
  }
</script>


<style scoped lang="scss">
  .content {
    width: 98%;
    margin: 15px auto;
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
      text-align: left;
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 15px;
      color: #333333;

      input {
        width: 150px;
        height: 30px;
        background-color: #ffffff;
        border-radius: 3px;
        border: solid 1px #dddddd;
        outline: none;
        padding-left: 15px;
      }

      .button {
        width: 50px;
        display: inline-block;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #499ffe;
        border-radius: 3px;
        color: white;
        border: 0;
        margin-left: 15px;
        font-size: 12px;

        &:hover {
          cursor: pointer;
        }
      }

    }

  }
</style>
