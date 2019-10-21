<template>
  <div style="width: 100%;font-size: 13px;min-width: 1150px" class="activity">
    <transition name="el-zoom-in-center">
      <div class="mask" v-show="!showversion" @click="showversion=true">
        <div class="phone">
          <div class="banner">
            <ul>
              <li>
                <img :src="src" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div style="margin: 20px 15px 0">
      <div class="content">
        <div class="title">
          <div style="text-align: left;margin-left: 20px">活动发布</div>
        </div>
        <div class="body">
          <div class="left " style="display: flex;flex-direction: column;justify-content: space-around">
            <div style="">
              <span>活动名称：</span>
              <span style="display: inline-block;width: 60%">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="input1">
                   </el-input></span>
            </div>
            <div>
              <div class="block" style="margin-top: 10px">
                <span class="demonstration">活动开始时间：</span>
                <el-date-picker
                  v-model="value2"
                  align="right"
                  type="datetime"
                  placeholder="请选择开始时间"
                  size="small"
                  style="width: 60%"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
            <div>
              <div class="block" style="margin-top: 10px">
                <span class="demonstration">活动截止时间：</span>
                <el-date-picker
                  style="width: 60%"
                  v-model="value1"
                  align="right"
                  type="datetime"
                  placeholder="请选择截止时间"
                  size="small"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="middle" style="min-width: 315px">
            <div class="choose">
              <span style="color: #333333;"> banner：</span>
              <span style="color: #999999">长宽比为2.65:1,且不小于260x690px</span>
            </div>

            <div class="mid_content">
              <label for="file">
                <img :src="src" alt="" style="width: 100%;height: 100%">
              </label>
            </div>


            <input type="file" @change="getFile" ref="file" id="file"
                   style="position: fixed;display: none;left: 10000vw"/>
          </div>
          <div class="middle" style="min-width: 280px">
            <div class="choose">
              <span style="color: #333333;margin-right: 10px"> 活动内容：</span>
              <el-radio v-model="radio" label="0" >链接</el-radio>
              <el-radio v-model="radio" label="1" >图文</el-radio>
            </div>
            <div class="mid_content" v-if="radio=='0'" style="border: 1px solid rgba(0,0,0,0.25)">
              <input type="text" v-model="input3" placeholder="请输入活动的链接"
                     style="width: 94%;border: 0;outline: none;padding-left: .638rem;font-size: .9vw;margin-top: .638rem"
              >
            </div>

            <div class="mid_content" v-else>
              <label for="file1">
                <img :src="src1" alt="" style="width: 100%;height: 100%">
              </label>
            </div>


            <input type="file" @change="getFile1" ref="file1" id="file1"
                   style="position: fixed;display: none;left: 1000vw"/>
          </div>
          <div class="right">
            <div style="margin-top: 48px">
              <el-button type="primary" size="small" @click="showphone">预览</el-button>
            </div>
            <div style="margin-top: 20px">
              <el-button type="primary" size="small" @click="inputactivity">发布</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-right: 10px ;margin-left: 10px">
      <div class="search-Box" style="width: 20% ;margin-top: 20px">
        <el-input placeholder="请输入关键字查询" icon="search" class="search" v-model="search"
                  size="middle"
                  prefix-icon="el-icon-search"></el-input>
      </div>
      <div style="padding-top: 15px">
        <el-table
          :data="tables"
          height="280"
          border
          style="width: 100%"
          :cell-style="{color:'#666666','text-align':'center','fontSize':'10px',padding :'6px 0'}"

          :row-style="{height:'20px'}"
          :header-cell-style="{
                'background-color': '#f8f8f8',
                'text-align':'center',
                  'color':'#666666',
                  padding :'8px 0',
                  fontSize:'14px'
                  }">

          <el-table-column
            prop="organizationName"
            label="所属分支机构"
          >
          </el-table-column>
          <el-table-column
            prop="activityName"
            label="活动名称">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="活动开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="活动截止时间">
          </el-table-column>
          <el-table-column
            prop="creater"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="新建时间">
          </el-table-column>
          <el-table-column
            prop="editing"
            label="操作"
            style="text-align: center">
            <template slot-scope="scope">
              <!--<el-button-->
              <!--size="mini"-->
              <!--type="primary"-->
              <!--@click="handleEdit(scope.$index, scope.row)">查看-->
              <!--</el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click="handledelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 100%;margin-top: 5px;text-align: right;">
        <div class="block" style="margin-right:30px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size=pagesize
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment"

  export default {
    name: "kaka_Activity",
    created() {
      this.getinfo(0)
      this.getinfo1()
    },
    data() {
      return {
        showversion: true,//预览
        search: '',  //搜索
        imageUrl: '',
        imageUrl1: '',
        type: '0',
        input1: null,
        input3: null,
        input: "",
        radio: '0',
        pickerOptions: {
          disabledDate(time) {
            // return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: null,
        value1: null,
        pagesize: 6,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [],
        total: 0,
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        addstate: 0,//判断是否为添加
        bianjistate: 0,//判断是否为编辑
        index: '',//判断是编辑第几个数据
        restaurants: [],
        allfenzhi: [],
        prevValue: {},
        loading: true,//开始加载动画
        organizationId: '',
        parentOrganizationId: '',
        arr1: [],
        file: null,
        file1: null,
        companyName: null,
        src: null,//banner
        src1: null,//banner
      }
    }, computed: {
      tables: function () {
        var search = this.search;
        if (search) {
          return this.tableData.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    methods: {
      //banner
      getFile(e) {
        let _this = this;
        var files = e.target.files[0];
        this.file = files;
        console.log(this.serviceIcon)
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result;

        }
      },
      //banner
      getFile1(e) {
        console.log(11)
        let _this = this;
        var files = e.target.files[0];

        console.log(this.serviceIcon)
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src1 = this.result;
          _this.file1 = this.result;
        }
        console.log(this.file1,123)
      },
      getinfo1() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'organization/getOrganizationList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$axios(options).then((res) => {
          if (res.data.state == 1) {
            console.log(res.data.data)
            // this.input1 = res.data.data[0].label
          }
          this.loading = false;//关闭加载动画
        })
      },
      handledelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json', 'token': this.$store.state.token},
            url: 'moveCar/deleteActivity',
            data: {
              loginMobilePhoneNo: this.mobilePhoneNo,
              activityId: row.getLogId
            }
          };
          this.$axios(options).then((res) => {
            if (res.data.state == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$router.go(0)
            } else {
              this.$message({
                type: 'warning',
                message: res.data.retMsg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      showphone() {
        if (this.radio == 0) {
          var message = null;
          message = this.input3;
        } else {
          var message = null;
          message = this.file1;

        }
        if(this.input1==null){
          this.$alert('活动名称不能为空', {
            confirmButtonText: '确定',
          });
        }else if (this.value2 == null) {
          this.$alert('开始时间不能为空', {
            confirmButtonText: '确定',
          });
        } else if (this.value1 == null) {
          this.$alert('结束时间不能为空', {
            confirmButtonText: '确定',
          });
        } else if (this.value1 < this.value2) {
          this.$alert('结束时间不得早于开始时间', {
            confirmButtonText: '确定',
          });
        } else if (this.file == undefined && this.file == null) {
          this.$alert('请上传banner图', {
            confirmButtonText: '确定',
          });
        } else if (message == null) {
          this.$alert('活动内容不能为空', {
            confirmButtonText: '确定',
          });
        } else {
          this.showversion = false
        }
      },
      inputactivity() {
        if (this.radio == 0) {
          var message = null;
          message = this.input3;
        } else {
          var message = null;
          message = this.file1;

        }
        this.loading = true;
        var formData = new FormData();
        if(this.input1==null){
          this.$alert('活动名称不能为空', {
            confirmButtonText: '确定',
          });
        }else if (this.value2 == null) {
          this.$alert('开始时间不能为空', {
            confirmButtonText: '确定',
          });
        } else if (this.value1 == null) {
          this.$alert('结束时间不能为空', {
            confirmButtonText: '确定',
          });
        } else if (this.value1 < this.value2) {
          this.$alert('结束时间不得早于开始时间', {
            confirmButtonText: '确定',
          });
        } else if (this.file == undefined && this.file == null) {
          this.$alert('请上传banner图', {
            confirmButtonText: '确定',
          });
        } else if (message == null) {
          this.$alert('活动内容不能为空', {
            confirmButtonText: '确定',
          });
        } else {
          formData.append("activityName", this.input1);
          formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
          formData.append("startTime", moment(this.value2).format("YYYY-MM-DD hh:mm:ss"));
          formData.append("endTime", moment(this.value1).format("YYYY-MM-DD hh:mm:ss"));
          formData.append("type", this.radio);
          formData.append("coverImage", this.file);
          formData.append("content", message);
          const options = {
            method: 'POST',
            headers: {'token': this.$store.state.token},
            url: 'moveCar/publishActivity',
            data: formData
          };
          this.$postHttp(options, '发布').then((res) => {
            this.loading = false//关闭动画
            this.$router.go(0)
          })
        }


      },
      handleEdit(index, row) {
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableData = [];
        this.getinfo(val - 1)
      },
      handleSelect(item) {
        console.log(item);
      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getActivityList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 6,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          this.loading = false//关闭动画
          if (res.state == 1) {
            console.log(res.data, 111111)
            this.total=res.data.totalCount
            const data = res.data.activityList
            if (data != null) {
              for (let i in data) {
                const obj = {
                  getLogId: data[i].activityId,
                  activityName: data[i].activityName,
                  organizationName: data[i].organizationName,
                  startTime: data[i].startTime,
                  endTime: data[i].endTime,
                  createTime: data[i].createTime,
                  creater: data[i].creater,
                };
                this.tableData.push(obj)
                console.log(this.tableData, 1111)
              }
            }
          }
        })
      },
    },

  }
</script>

<style scoped lang="scss">
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

    .phone {
      background: url("../assets/phoneactivity.png");
      background-size: cover;
      width: 26vw;
      height: 46vw;
      background-color: #ffffff;
      z-index: 200;

      .banner {
        width: 26vw;
        height: 42vw;
        margin-top: 4vw;

        ul {
          display: flex;
          justify-content: center;
          list-style: none;

          li {
            width: 24vw;
            height: 9vw;
            background-color: #f1f1f1;
            box-shadow: 0vw 0vw 1vw 0vw rgba(0, 0, 0, 0.2);
            border-radius: 1vw;
            margin-top: 1vw;

            img {
              border-radius: 1vw;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    margin-top: 2.8rem;
  }

  .avatar {
    width: 100%;
    height: 50%;
    display: block;
  }

  .right div {
    width: 70%;

  }

  .choose {
    margin-top: 10px;
    text-align: left;
  }

  .mid_content {
    width: 80%;
    margin-top: 10px;
    height: 110px;

    font-size: 0;

    img {

    }
  }

  .left div {
    margin-top: 5px;
    color: #333333;
  }

  .left div span {
    color: #666666;
    width: 20%;
  }

  .content {
    width: 100%;
    height: 190px;
    border: solid 1px #d2d2d2;
    padding-bottom: 15px;
  }

  .title {
    line-height: 30px;
    width: 100%;
    background-color: #f1f1f1;
    color: #666666;
  }

  .body {
    width: 100%;
    display: flex;
  }

  .left {
    width: 30%;
    min-width: 350px;
    text-align: left;
    padding-left: 20px;

    div {
      span {
        width: 30%;
        display: inline-block;
      }
    }
  }

  .middle {
    width: 30%;
  }

  .right {
    width: 6%;
    text-align: left;
  }

</style>
<style>
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 110px;
    width: 100%;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    height: 100%;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    margin-top: 2.8rem;
  }

  .avatar {
    width: 100%;
    height: 110px !important;
    display: block;
  }
</style>
