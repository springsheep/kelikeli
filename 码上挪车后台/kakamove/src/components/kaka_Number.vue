<template>
  <div style="width: 100%;padding-bottom: 20px">
    <div style="padding: 15px">
      <el-table
        v-loading='loading'
        :data="tableData"

        border
        style="width: 100%"
        :cell-style="{color:'#666666','text-align':'center',fontSize:'12px'}"
        :header-cell-style="{
                'background-color': '#f8f8f8',
                'text-align':'center',
                  'color':'#666666',
                  fontSize:'12px'
                  }">
        <el-table-column
          prop="name"
          label="领用人姓名"
          width="90"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input class="edit-input" v-model="scope.row.name"></el-input>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobilePhoneNo"
          label="电话号码"
          width="150"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input class="edit-input" v-model="scope.row.mobilePhoneNo"></el-input>
            </template>
            <span v-else>{{ scope.row.mobilePhoneNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationName"
          label="所属分支机构"
          width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-autocomplete
                class="inline-input"
                v-model="scope.row.organizationName "
                :fetch-suggestions="querySearch"
                @select="handleSelect"
              ></el-autocomplete>
            </template>
            <span v-else>{{ scope.row.organizationName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="noSegment"
          label="对应号段"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing1">
              <el-input class="edit-input" v-model="scope.row.noSegment"
                        :disabled="true"></el-input>
            </template>
            <span v-else>{{ scope.row.noSegment }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="领用数量"
          width="80"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing1">
              <el-input class="edit-input" v-model="scope.row.quantity"></el-input>
            </template>
            <span v-else>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creater"
          label="发放人"
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.editing1">
              <el-input class="edit-input" v-model="scope.row.creater" :disabled="true"></el-input>
            </template>
            <span v-else>{{ scope.row.creater }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="发放时间"
          width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.editing1">
              <el-input class="edit-input" v-model="scope.row.createTime"
                        :disabled="true"></el-input>
            </template>
            <span v-else>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="editing"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="!scope.row.editing"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              v-if="scope.row.editing"
              size="mini"
              type="primary"
              @click="handleSave(scope.$index, scope.row)">保存
            </el-button>
            <el-button
              v-if="scope.row.editing"
              size="mini"
              type="danger"
              v-model="scope.$index"
              @click="handleCancle(scope.$index, scope.row)">取消
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      style="width: 100%;margin-top: 5px;text-align: left;margin-left: 20px;display: flex;justify-content: space-between">
      <div>
        <el-button type="primary" size="small" @click="add">发 放</el-button>
        <!--<el-button type="primary" size="small" style="margin-left: 15px" @click="sure">保 存</el-button>-->
      </div>
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
</template>

<script>
  export default {
    name: "kaka_Number",
    data() {
      return {
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
      }
    },
    created() {
      this.getinfo(0);
      this.organizationId = this.$store.state.organizationId
    }
    ,
    methods: {
      handleEdit(index, row) {
        console.log(row)
        this.bianjistate = 1;
        row.editing = true;
        this.index = index;
        this.prevValue = JSON.parse(JSON.stringify(row));
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableData = [];
        this.getinfo(val - 1)
      },
      //增加
      add() {
        let obj = {
          getLogId: '',
          name: '',
          mobilePhoneNo: '',
          organizationName: '',
          noSegment: '',
          quantity: '',
          editing: true,
          editing1: true,
          creater: '',
          createTime: '',
          organizationId: '',
          handleSelectflag: false,

        };
        this.tableData.unshift(obj);
        this.addstate = 1
      },
      handleSave(index, row) {
        var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        var TEL_REGEXP1 = /^-?\d+$/;
        if (!TEL_REGEXP.test(row.mobilePhoneNo)) {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });
        } else if (!TEL_REGEXP1.test(row.quantity)) {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });

        } else if(row.organizationName==null){
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });
        } else {
          if (row.getLogId == '') {
            console.log(this.organizationId)
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'moveCar/saveMoveCarQrCodeGetLog',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                quantity: row.quantity,
                userName: row.name,
                mobilePhoneNo: row.mobilePhoneNo,
                organizationId: this.organizationId
              }
            };
            this.$postHttp(options, '操作').then((res) => {
              // this.addstate = 0;
              this.$router.go(0);//刷新页面展示数据
            })
          }else {
            console.log(this.organizationId)
            var organizationId1 = ''
            if (this.handleSelectflag) {
              organizationId1= this.organizationId
            } else {
              organizationId1 = row.organizationId
            }
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'moveCar/saveMoveCarQrCodeGetLog',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                quantity: row.quantity,
                userName: row.name,
                mobilePhoneNo: row.mobilePhoneNo,
                organizationId: organizationId1,
                getLogId: row.getLogId
              }
            };
            this.$postHttp(options, '操作').then((res) => {
              // this.addstate = 0;
              this.$router.go(0);//刷新页面展示数据
            })
          }

        }

      },
      handleCancle(index, row) {
        row.editing = false;
        row.editing1 = false,
          //点击取消还原是添加还是编辑的状态
          this.bianjistate = 0;
        this.addstate = 0;
        if (row.getLogId == '') {
          this.tableData.splice(index, 1)
        } else {
          //保证点击取消还原数据
          let prevContent = this.prevValue.name;
          let prevContent1 = this.prevValue.mobilePhoneNo;
          let prevContent2 = this.prevValue.organizationName;
          let prevContent3 = this.prevValue.noSegment;
          let prevContent4 = this.prevValue.quantity;
          let prevContent5 = this.prevValue.creater;
          let prevContent6 = this.prevValue.createTime;
          let prevContent7 = this.prevValue.organizationId;
          this.$set(row, "name", prevContent);
          this.$set(row, "mobilePhoneNo", prevContent1);
          this.$set(row, "organizationName", prevContent2);
          this.$set(row, "noSegment", prevContent3);
          this.$set(row, "quantity", prevContent4);
          this.$set(row, "creater", prevContent5);
          this.$set(row, "createTime", prevContent6);
          this.$set(row, "organizationId", prevContent7);
        }
      },
      querySearch(queryString, cb) {
        var restaurants = this.arr1;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //递归函数取值
      arr(m) {
        console.log(this.arr1, 11111)
        for (let i in m) {
          const obj = {value: "", address: ""}
          obj.value = m[i].organizationName;
          obj.address = m[i]
          this.arr1.push(obj)
          if (m[i].childOrganizations != null) {
            this.arr(m[i].childOrganizations)
          }
        }
      },
      handleSelect(item) {
        this.organizationId = item.address.organizationId
        this.handleSelectflag = true
        console.log(this.handleSelectflag)
      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getMoveCarQrCodeLogList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 6,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          this.loading = false//关闭动画
          if (res.state == 1) {
            this.total=res.data.totalCount
            this.allfenzhi = res.data.organizationList
            this.arr(res.data.organizationList)
            const data = res.data.moveCarQrCodeGetLogList
            console.log(res.data,1111111)
            if (data != null) {
              for (let i in data) {
                const obj = {
                  getLogId: data[i].getLogId,
                  name: data[i].name,
                  mobilePhoneNo: data[i].mobilePhoneNo,
                  organizationName: data[i].organizationName,
                  noSegment: data[i].noSegment,
                  quantity: data[i].quantity,
                  editing: false,
                  editing1: false,
                  creater: data[i].creater,
                  createTime: data[i].createTime,
                  organizationId: data[i].organizationId,
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

<style scoped>
  .el-button--primary {

  }

  .el-button--primary:nth-child(4) {
    margin-left: 100px;
  }

  .el-table .cell {
  }
</style>
