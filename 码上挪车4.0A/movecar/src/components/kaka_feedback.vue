<template>
  <div>
    <!--输入内容-->
    <div class="content last">
      <!--<van-cell-group>-->
      <van-field
        v-model="message"
        type="textarea"
        placeholder="请输入留言"
        rows="1"
        :border="false"
        autosize
      />
      <!--</van-cell-group>-->
    </div>
    <!--提交-->
    <div class="inputbutton" @click="submit">
      提交
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_feedback",
    data() {
      return {
        message: null,
        openId: sessionStorage.getItem('openId'),
      }
    },
    methods: {
      submit() {
        if (this.message == null) {
          Toast('请您填写反馈信息');
        } else {
          this.axios.post('moveCar/feedback', {
            "openId": this.openId,
            "feedbackContent": this.message
          }).then((res) => {
            console.log(res)
            if (res.data.state == 1) {
              Toast('提交成功，感谢您的反馈');
              this.$router.go(-1)
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .head {
    height: 12vw;
    font-family: PingFang-SC-Regular;
    font-size: .64rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 12vw;
    letter-spacing: 0vw;
    color: #666666;
    padding-left: 4vw;
  }

  .content {
    width: 100vw;
    height: 40vw;
    background-color: #ffffff;
  }

  .inputbutton {
    width: 92vw;
    height: 12vw;
    background-color: #15d1b9;
    border-radius: 6vw;
    line-height: 12vw;
    font-size: .766rem;
    color: #ffffff;
    text-align: center;
    margin: 8vw auto;
  }
</style>
<style>
  .van-field__control{
    font-size: .64rem;
  }
</style>
