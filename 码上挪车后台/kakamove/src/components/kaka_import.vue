<template>
  <div style="width: 100%;">
    <div class="button">
      <div style="margin-left: 20px">
        <el-button type="primary" size="small" @click="downloadmodule">数据模版下载</el-button>
      </div>
    </div>
    <div class="body">
      <div style="margin-left: 20px;display: flex">
        <div class="left">
          <el-upload
            class='image-uploader'
            :multiple='false'
            :auto-upload='true'
            list-type='text'
            :show-file-list='true'
            :before-upload="beforeUpload"
            :drag='true'
            action=''
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限Excel格式，单文件不超过2MB</div>
          </el-upload>
          <div class="table">
            <el-table
              :data="tableData"
              height="240"
              border
              style="width: 100%;text-align: center;"
              :cell-style="{color:'#666666','text-align':'center','height':'30px',}"
              :header-cell-style="{
                'background-color': '#f8f8f8',
                'text-align':'center',
                  'color':'#666666',
                  padding :'8px 0',
                  fontSize:'14px'
                  }">
              <el-table-column
                prop="carOwnerName"
                label="车主姓名"
              >
              </el-table-column>
              <el-table-column
                prop="carNo"
                label="车牌号码"
              >
              </el-table-column>
              <el-table-column
                prop="mobilePhoneNo"
                label="手机号码">
              </el-table-column>
              <el-table-column
                prop="carBrand"
                label="车辆品牌">
              </el-table-column>
            </el-table>
          </div>
          <div class="left_foot">
            <el-button type="primary" size="small" @click="produce">绑定</el-button>
          </div>
        </div>
        <transition name="el-zoom-in-center">
          <div class="mask" v-show="showversion">
            <div class="choosewitch">
              <div class="one" style="text-align: left">
                <div style="margin-bottom: 15px;color: #666666">
                  请选择版本：
                </div>
                <el-radio v-model="radio" label="A">A版本</el-radio>
                <el-radio v-model="radio" label="B">B版本</el-radio>
              </div>
              <div class="two" style="text-align: left">
                <div style="margin-bottom: 15px;text-align: left;color: #666666">
                  请选择模版：
                </div>
                <el-radio v-model="radio1" label="0">模版一</el-radio>
                <el-radio v-model="radio1" label="1">模版二</el-radio>
                <el-radio v-model="radio1" label="2">模版三</el-radio>
              </div>
              <div style="text-align: left">
                <el-button type="primary" size="small" @click="sure">确定</el-button>
                <el-button type="danger" size="small" @click="showversion=false">取消</el-button>

              </div>
            </div>

          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "kaka_import",
    data() {
      return {
        tableData: [],
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        file: '',
        radio: 'A',
        radio1: '0',
        showversion:false
      }
    },
    methods: {
      //模版下载
      downloadmodule(){
        window.location.href='https://test.kelibbb.com/move_car/static/excel/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
      },
      sure(){
        console.log(this.radio,this.radio1)
        var formData = new FormData();
        formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
        formData.append("file", this.file.file);
        formData.append("edition", this.radio);
        formData.append("templateIndex", this.radio1);
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/batchBindMoveCarQrCode',
          data: formData
        };
        this.$axios(options).then((res) => {
          this.showversion=false;
          if (res.data.state == 1) {
            this.$message.success(`绑定成功`)
            this.tableData = res.data.data;
            this.$router.push({path: '/PM'});

          } else {
            this.$message({
              message: res.data.retMsg,
              type: 'warning'
            });
          }
        })
      },
      produce() {
        if (this.file == '') {
          this.$message({
            message: '请先上传文件',
            type: 'warning'
          });
        } else {
          this.showversion=true
        }
      },
      uploadFile(file) {
        this.file = file;
        var formData = new FormData();
        formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
        formData.append("file", file.file);
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getBatchUploadList',
          data: formData
        };
        this.$axios(options).then((res) => {

          if (res.data.state == 1) {

            console.log(res.data.data)
            var flag = true;
            var num = ''
            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            var TEL_CARBRAND=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
            for(let i in res.data.data){
              if(TEL_REGEXP.test(res.data.data[i].mobilePhoneNo)){

              }else if(TEL_CARBRAND.test(res.data.data[i].carNo)){

              }else {
                flag=false
                num = num+`${i}，`
              }
            }
            if(flag){
              this.tableData = res.data.data;
              this.$message.success(`上传成功`)
            }else {
              this.$message({
                message:`第${num}条数据车牌号码或手机号有误`,
                type: 'warning'
              });
            }


          } else {
            this.$message({
              message: res.data.retMsg,
              type: 'warning'
            });
          }

        })
      },
      // 上传文件个数超过定义的数量
      handleExceed(files, fileList) {
        console.log(files)
        this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
      },
// 上传文件之前的钩子
      beforeUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 20
        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 2MB!',
            type: 'warning'
          });
        }
        return extension || extension2 && isLt2M
      }
    }
  }
</script>

<style scoped>
  .choosewitch {
    padding: 20px 0;
    padding-left: 20px;
    width: 400px;
    height: 200px;
    background: white;
    border-radius: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }

  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }

  .preview {
    text-align: center;
    line-height: 24px;
    letter-spacing: 1px;
    color: #666666;
    margin-top: 7%;
  }

  .img img {
    width: 50%;
    height: auto;
    background-color: #09C;
    position: relative;
    bottom: 9%;
  }

  .img {
    display: flex;
    margin: 20px auto;
    width: 80%;
    height: auto;
  }

  .left_foot {
    text-align: left;
    padding-top: 20px;
  }

  .table {
    padding-top: 20px;
  }

  .right .choose {
    margin-bottom: 15px;
    text-align: left;
    margin-left: 35px;
  }

  .right .choose span {
    text-align: center;
    margin-left: 15px;
    width: 60px;
    height: 25px;
    background-color: #499ffe;
    border-radius: 3px;
    display: inline-block;
    font-size: 12px;
    color: white;
    line-height: 25px;
  }

  .button {
    width: 100%;
    display: inline-block;
    text-align: left;
    padding-top: 20px;
  }

  .body {
    padding-top: 20px;
    /*padding-left: 50px;*/
    width: 100%;


  }

  .left {
    text-align: left;
    width: 85%;
  }

  .right {
    width: 50%;
  }

  .updata {
    width: 100%;
    line-height: 227px;
    text-align: center;
    font-size: 14px;
    background-color: #f8f8f8;
    border: solid 1px #d2d2d2;
    color: #666666;
  }
</style>
