<template>
  <div class="content">
    <div class="div">
      <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" size="mini">
        <el-form-item label="旧密码">
          <el-input v-model="formLabelAlign.old"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.new"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.sure"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: left">
        <el-button type="primary" size="mini"  @click="save">保  存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "kaka_ChangePassword",
      data() {
        return {
          labelPosition: 'left',
          formLabelAlign: {
            old: '',
            new: '',
            sure: '',
          },
          mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        };
      },
      methods:{
          save() {
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'user/updatePassword',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                oldPassword:this.formLabelAlign.old,
                newPassword:this.formLabelAlign.new
              }
            };
            this.$postHttp(options, '更改').then((res) => {

              this.$router.push({path: '/login'})
            })
          }
      }
    }
</script>


<style scoped lang="scss">
  .content{
    width: 30%;
    .div{
      padding: 20px;
      color: #666666;
    }
  }
</style>
