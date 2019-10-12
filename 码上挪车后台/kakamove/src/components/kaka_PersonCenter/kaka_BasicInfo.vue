<template>
  <div class="content">
    <div class="div">
      <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" size="mini">
        <el-form-item label="用户姓名">
          <el-input v-model="userName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="mobilePhoneNo1"></el-input>
        </el-form-item>
        <el-form-item label="所属分支机构">
          <div style="text-align: left">{{organizationName}}</div>
        </el-form-item>
        <el-form-item label="号段前缀">
          <div style="text-align: left">{{noSegmentPrefix}}</div>
        </el-form-item>


      </el-form>
      <div style="text-align: left">
        <el-button type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kaka_BasicInfo",
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
        mobilePhoneNo1: '',
        userName: '',
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        noSegmentPrefix:'',
        organizationName:''
      };
    }, created() {
      this.getinfo();
    },
    methods: {
      //初始化
      getinfo() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getCurrentUserInfo',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$postHttp(options, '更改').then((res) => {
          console.log(res.data, 11)
          this.userName = res.data.userName;
          this.mobilePhoneNo1 = res.data.mobilePhoneNo;
          this.noSegmentPrefix=res.data.noSegmentPrefix;
          this.organizationName=res.data.organizationName
          console.log(this.noSegmentPrefix)
        })
      },
      save() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/updateCurrentUserInfo',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            userName: this.userName,
            mobilePhoneNo: this.mobilePhoneNo1,
          }
        };
        this.$postHttp(options, '更改').then((res) => {
          this.$store.state.data.userName = this.userName
          this.$message({
            type: 'success',
            message: '更改成功!'
          });
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 35%;

    .div {
      padding: 20px;
      color: #666666;
    }
  }
</style>
