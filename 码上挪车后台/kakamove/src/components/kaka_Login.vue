<template>
  <div class="login">
    <div class="login-box">
      <p class="login-box-msg">码上挪车管理平台</p>
      <div class="form-group " style="margin-top: 3vw">
        <span class="input-txt">
           <img src="../assets/100.png" alt="">
        </span>
        <input type="text" placeholder="请输入账号" v-model="kkaccount"
               @keyup.enter="submit" class="input">
        <!--<el-input v-model="input" placeholder="请输入内容" style="border: 0"></el-input>-->
      </div>
      <div class="form-group " style="margin-top: 1vw">
        <span class="input-txt">
          <img src="../assets/101.png" alt="">
        </span>
        <input type="password" class="input" placeholder="请输入密码" v-model="kkpassword"
               @keyup.enter="submit">
      </div>
      <div @click="submit" class="btn-login">登录</div>
    </div>
    <p class="bottom-logo">杭州可有科技有限公司</p>
  </div>
</template>

<script>
  export default {
    name: 'kaka_Login',
    data() {
      return {
        captcha: "",
        mobile: "",
        show_btn: true,
        time: 60,
        referralCode: "",
        kkaccount: "",
        kkpassword: ""
      };
    },
    mounted() {
    },
    methods: {
      submit() {
        let self = this;
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (self.kkaccount == "") {
          this.$alert('账号不能为空', {
            confirmButtonText: '确定',
          });
          return false;
        } else if (!myreg.test(self.kkaccount)) {
          this.$alert('请输入正确的手机号', {
            confirmButtonText: '确定',
          });
        }
        if (self.kkpassword == "") {
          this.$alert('密码不能为空', {
            confirmButtonText: '确定',
          });
          return false;
        }
        const options = {
          method: 'POST',
          url: '/user/login',
          data: {
            'loginMobilePhoneNo': self.kkaccount,
            'password': self.kkpassword
          }
        };
        this.$axios(options).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data)
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$store.state.menuInfos = res.data.data.menuInfos;
            sessionStorage.setItem('menuInfos', JSON.stringify(res.data.data.menuInfos))
            console.log(JSON.parse(sessionStorage.getItem('menuInfos')),11111)
            this.$store.commit('addtoken', res.data.data.token);//登陆成功保存token码
            this.$store.commit('data', res.data.data);//登陆成功保存数据
            this.$router.push({path: '/home'})
          } else {
            this.$message.error(res.data.retMsg);
          }
        })
      },
    }
  };
</script>

<style lang="scss" scoped>
  /*@import "../Style/login";*/
  .bottom-logo {

  }

  .login {
    position: relative;

    .bottom-logo {
      position: absolute;
      bottom: 3vh;
      left: 43vw;
      color: #ffffff;
      font-size: 1vw;
    }

    width: 100%;
    height: 100%;
    background: url("../assets/102.png");
    background-size: cover;
    padding-top: 31vh;
    padding-left: 51vw;
    box-sizing: border-box;

    .login-box {
      width: 31vw;
      height: 21vw;
      background-color: rgba(255, 255, 255, .7);
      border-radius: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;

      .login-box-msg {
        text-align: center;
        margin-top: 2vw;
        color: #333333;
        font-size: 1.2vw;
      }

      .form-group {
        width: 28vw;
        height: 3vw;
        line-height: 3vw;
        background-color: rgb(232, 240, 254);
        border-radius: .3vw;
        display: flex;
        align-items: center;

        .input {
          border: 0;
          outline: none;
          background-color: rgb(232, 240, 254);
          height: 3vw;
          z-index: 10;
          font-size: 1.1vw;
          padding-left: 1.5vw;
        }

        .input-txt {
          width: 1.7vw;
          height: 2vw;

          margin-left: 1vw;

          img {
            height: 100%;
            width: 100%;
          }
        }


      }

      .btn-login {
        width: 28vw;
        height: 3vw;
        background-color: #479eff;
        font-size: 1.2vw;
        font-weight: normal;
        font-stretch: normal;
        line-height: 3vw;
        color: #ffffff;
        margin-top: 2vw;
        text-align: center;
        border-radius: .3vw;
      }

    }
  }
</style>
