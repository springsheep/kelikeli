<template>
  <div style="width: 100%;font-size: 13px;min-width: 1150px" class="activity">
    <transition name="el-zoom-in-center">
      <div class="mask" v-show="!showversion" @click="showversion=true">

        <div class="phone">
          <div class="title">我们将为您提供以下服务</div>
          <div class="banner">
            <ul>
              <li>
                <div class="left1">
                  <img :src="src" alt="">
                </div>
                <div class="right1">
                  <div class="top1">{{serviceName}}</div>
                  <div class="bottom1">{{serviceDescribe}}</div>
                </div>
              </li>
            </ul>

          </div>

        </div>

      </div>
    </transition>
    <div style="margin: 15px 15px 0">
      <div class="content">
        <div class="title">
          <div style="text-align: left;margin-left: 20px">新建增值服务</div>
        </div>
        <div style="width: 95%;margin: 15px auto;color: #666666">
          <el-tabs v-model="activeName">
            <el-tab-pane label="图文" name="first">
              <div style="display: flex;justify-content: space-between">
                <div>
                  服务名称：<input type="text" maxlength="10" aria-placeholder="请输入服务名称" class="inputname"
                              v-model="serviceName">
                </div>

                <div style="display: flex;align-items: flex-start">
                  服务图标：<span style="display: inline-block;width: 50px;height: 50px;">
                             <label for="file">
                  <img :src="src" alt="" style="width: 100%;height: 100%">
                                          </label>
                </span>


                </div>

                <div style="display: flex;align-items: flex-start">
                  服务描述（不超过45字）
                  <span class="describle">
                    <textarea cols="40" rows="5" maxlength="45" v-model="serviceDescribe"
                              style="border: 0;outline: none;resize: none"></textarea>
                    <!--<input type="textarea" v-model="serviceDescribe" col="111">-->
              </span>
                </div>
                <div>
                  <div class="right">
                    <div>
                      <el-button type="primary" size="small" @click="showphone">预览</el-button>
                    </div>
                    <div style="margin-top: 10px">
                      <el-button type="primary" size="small" @click="save">发布</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="链接" name="second">
              <div style="text-align: left">
                增值服务链接：<input type="text" v-model="serviceUrl" aria-placeholder="请输入服务名称" class="inputname"
                              style="margin: 0 15px">
                <el-button type="primary" size="small" @click="save1">发布</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!--<div style="text-align: left">-->
          <!--<el-radio v-model="radio" label="1">图文</el-radio>-->
          <!--<el-radio v-model="radio" label="2">链接</el-radio>-->
          <!--</div>-->
          <!--<div style="border-bottom: 1px solid #dddddd;margin-top: 15px;margin-bottom: 15px"></div>-->
          <input type="file" @change="getFile" ref="file" id="file"
                 style="position: fixed;display: none;left: 10000vw"/>
        </div>
      </div>
    </div>
    <div style=" " v-show="showlist">
      <div style="padding: 15px">
        <el-table
          :data="tables"
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
            prop="serviceName"
            label="增值服务名称"
          >
          </el-table-column>
          <el-table-column
            prop="organizationName"
            label="所属分支机构">
          </el-table-column>
          <el-table-column
            prop="publisher"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="editing"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
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
  export default {
    name: "kaka_addserver", 
    computed: {
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
    data() {
      return {
        showversion: true,//预览
        serviceName: null,//服务名称
        serviceDescribe: null,//描述
        activeName: 'first',
        serviceUrl: null,//增值服务URL
        serviceIcon: null,//增值服务图标
        radio: '1',
        pagesize: 6,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [],
        total: 0,
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        index: '',//判断是编辑第几个数据
        src: null,
        showlist: true,//展示列表
      };
    }, created() {
      this.getinfo(0)
    },
    watch: {
      activeName() {
        if (this.activeName == 'first') {
          this.showlist = true
        } else {
          this.showlist = false
        }
      }
    },
    methods: {
      showphone() {
        if (this.serviceName == null||this.serviceName == '') {
          this.$message({
            message: '请先输入服务名称',
            type: 'warning'
          });
        } else if (this.serviceIcon == null) {
          this.$message({
            message: '请上传服务图标',
            type: 'warning'
          });
        } else if (this.serviceDescribe == null||this.serviceDescribe == '') {
          this.$message({
            message: '请先输入服务描述',
            type: 'warning'
          });
        } else {
          this.showversion = false
        }

      },
      //发布链接
      save1() {
        if (this.serviceUrl == null) {
          this.$message({
            message: '请先输入增值服务链接',
            type: 'warning'
          });
        } else {
          var formData = new FormData();
          formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
          formData.append("type", '1');
          formData.append("serviceUrl", this.serviceUrl);
          const options = {
            method: 'POST',
            headers: {'token': this.$store.state.token},
            url: 'moveCar/publishValueAddedService',
            data: formData
          };
          this.$postHttp(options, '发布').then((res) => {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          })
        }

      },
      //发布图文
      save() {
        if (this.serviceName == null||this.serviceName == '') {
          this.$message({
            message: '请先输入服务名称',
            type: 'warning'
          });
        } else if (this.serviceIcon == null) {
          this.$message({
            message: '请上传服务图标',
            type: 'warning'
          });
        } else if (this.serviceDescribe == null||this.serviceDescribe == '') {
          this.$message({
            message: '请先输入服务描述',
            type: 'warning'
          });
        } else {
          var formData = new FormData();
          formData.append("serviceName", this.serviceName);
          formData.append("loginMobilePhoneNo", this.mobilePhoneNo);
          formData.append("serviceIcon", this.serviceIcon);
          formData.append("type", '0');
          formData.append("serviceDescribe", this.serviceDescribe);
          const options = {
            method: 'POST',
            headers: {'token': this.$store.state.token},
            url: 'moveCar/publishValueAddedService',
            data: formData
          };
          this.$postHttp(options, '发布').then((res) => {
            this.$router.go(0)
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          })
        }

      },
      getFile(e) {
        let _this = this;
        var files = e.target.files[0];
        this.serviceIcon = files
        console.log(this.serviceIcon)
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result;

        }
      },
      handledelete(index, row) {
        console.log(row)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json', 'token': this.$store.state.token},
            url: 'moveCar/deleteValueAddedService',
            data: {
              loginMobilePhoneNo: this.mobilePhoneNo,
              valueAddedServiceId: row.id
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
      },//初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getValueAddedServiceList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 6,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          this.loading = false//关闭动画
          if (res.state == 1) {
            console.log(res.data, 111)
            this.serviceUrl = res.data.valueAddedServiceUrl;//一键续保的链接
            this.total = res.data.totalCount
            const data = res.data.valueAddedServiceList;//增值服务
            if (data != null) {
              for (let i in data) {
                const obj = {
                  publishTime: data[i].publishTime,
                  publisher: data[i].publisher,
                  organizationName: data[i].organizationName,
                  serviceName: data[i].serviceName,
                  id: data[i].id,
                };
                this.tableData.push(obj)
              }
            }
          }
        })
      },
    }
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
      background: url("../assets/addserver.png");
      background-size: cover;
      width: 26vw;
      height: 46vw;
      z-index: 200;

      .title {
        width: 26vw;
        height: 3vw;
        background-color: #00b9a2;
        font-size: 1vw;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0vw;
        color: #ffffff;
        line-height: 3vw;
        margin-top: 4vw;
      }

      .banner {
        width: 26vw;
        height: 42vw;

        ul {
          display: flex;
          justify-content: center;
          list-style: none;

          li {
            width: 24vw;
            height: 8vw;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #dddddd;

            .left1 {
              width: 3vw;
              height: 3vw;
              margin-left: 1vw;
              border-radius: 50%;

              img {
                width: 3vw;
                height: 3vw;
                border-radius: 50%;
              }
            }

            .right1 {
              margin-left: 1vw;

              .top1 {
                height: 2vw;
                font-size: 1.3vw;
                line-height: 2vw;
                color: #333333;
                text-align: left;
              }

              .bottom1 {
                height: 2vw;
                font-size: .7vw;
                color: #666666;
                text-align: left;
              }
            }
          }
        }


      }
    }
  }

  .describle {
    width: 300px;
    height: 80px;
    background-color: #ffffff;
    border: solid 1px #d2d2d2;
    display: inline-block;
    text-align: left;

    input {
      outline: none;
      border: 0;
    }
  }

  .inputname {
    width: 150px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 3px;
    border: solid 1px #dddddd;
    outline: none;
  }

  .mid_content {
    width: 80%;
    margin-top: 10px;
    height: 110px;
    border: 1px solid #d2d2d2;
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
