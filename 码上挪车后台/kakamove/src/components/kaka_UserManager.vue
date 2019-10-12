<template>
  <div style=" width: 100%">
    <div style="padding: 15px">
      <el-table
        v-loading='loading'
        :data="tableData"
        :cell-style="{color:'#666666','text-align':'center','height':'30px',fontSize:'12px'}"
        :header-cell-style="{
                'background-color': '#f8f8f8',
                'text-align':'center',
                  'color':'#666666',
                  padding :'8px 0',
                  fontSize:'12px'
                  }"
        border
        style="width: 100%">
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="name1"
          label="ID"
          width="75"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户姓名"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input class="edit-input" v-model="scope.row.name" placeholder="请输入用户姓名"></el-input>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input class="edit-input" v-model="scope.row.phone" placeholder="请输入电话号码"></el-input>
            </template>
            <span v-else>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属分支机构">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-autocomplete
                class="inline-input"
                v-model="scope.row.address "
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </template>
            <span v-else>{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="num"
          label="号段前缀">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input class="edit-input" v-model="scope.row.num" placeholder="请输入号段"></el-input>
            </template>
            <span v-else>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <!--<el-input class="edit-input" v-model="scope.row.roleId" placeholder="请输入号段"></el-input>-->
              <el-select v-model="scope.row.roleName" placeholder="请选择" @change="change">
                <el-option
                  v-for="item in options"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                >
                </el-option>
              </el-select>
            </template>
            <span v-else>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="editing" label="操作">
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
              v-model="scope.$index"
              @click="handleSave(scope.$index, scope.row)"
            >保存
            </el-button>
            <el-button
              v-if="scope.row.editing"
              size="mini"
              type="danger"
              v-model="scope.$index"
              @click="handleCancle(scope.$index, scope.row)">取消
            </el-button>

            <el-button
              size="mini"
              type="danger"
              v-if="!scope.row.editing"
              :disabled="scope.row.isDelete == '0'"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div style="width: 100%;margin-top: 20px;text-align: left;display: flex;justify-content: space-around">
        <div style="width: 40%">
          <el-button type="primary" size="small" @click="add">增 加</el-button>
          <!--<el-button type="primary" size="small" style="margin-left: 30px" @click="sure">保 存</el-button>-->
        </div>
        <div class="block">
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
    name: "kaka_UserManager",
    data() {
      return {
        pagesize: 8,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [],
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        addstate: 0,//判断是否为添加
        bianjistate: 0,//判断是否为编辑
        index: '',//判断是编辑第几个数据
        restaurants: [],
        allfenzhi: [],
        prevValue: {},
        loading: true,//开始加载动画
        arr1: [],
        organizationId: '',
        parentOrganizationId: '',
        organizationIdflag: false,
        roleflag: false,
        options: [],
        value: '',
        roleId: '',
        total:0
      }
    },
    methods: {
      change(data) {
        this.roleId = data;
        console.log(this.roleId, 'jueseid')
        this.roleflag = true
      },
      getdata() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getAllRoleList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          console.log(res, '用户列表')
          this.options = res.data;
        })
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
      //点击选取机构取到的值
      handleSelect(item) {
        this.organizationId = item.address.organizationId;
        this.organizationUnifyCode = item.address.organizationUnifyCode;
        this.organizationIdflag = true
      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getUserList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 8,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          console.log(res.data, 'popop')
          this.total=res.data.totalCount
          this.allfenzhi = res.data.organizationList
          this.arr(res.data.organizationList)
          const data = res.data.userList
          if (data != null) {
            for (let i in data) {
              const obj = {
                isDelete: data[i].isDelete,
                name: data[i].userName,
                phone: data[i].mobilePhoneNo,
                address: data[i].organizationName,
                num: data[i].noSegmentPrefix == null ? '' : data[i].noSegmentPrefix,
                userID: data[i].userId,
                organizationId: data[i].organizationId,
                roleId: data[i].roleId,
                roleName: data[i].roleName,
                editing: false
              };
              this.tableData.push(obj)
            }
          }
          console.log(this.tableData)
          this.loading = false//关闭动画
        })
      },
      handleSave(index, row) {
        console.log(row, 12321321)
        var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        var TEL_REGEXP1 = /^-?\d+$/;
        if (!TEL_REGEXP.test(row.phone)) {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });
        } else if (row.organizationId == null) {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });
        } else if (row.roleName == '') {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          });
        } else if (row.num == '') {
          this.$alert('请填写完整信息', {
            confirmButtonText: '确定',
          })
        } else {
          if (row.userID == '') {
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'user/saveUser',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                mobilePhoneNo: row.phone,
                userName: row.name,
                noSegmentPrefix: row.num,
                organizationId: this.organizationId,
                roleId: this.roleId
              }
            };
            this.$postHttp(options).then((res) => {
              this.$router.go(0)//刷新页面展示数据
            })
          } else {
            var organizationId1 = '';
            if (this.organizationIdflag) {
              organizationId1 = this.organizationId
            } else {
              organizationId1 = row.organizationId
            }
            var roleId1 = '';
            if (this.roleflag) {
              roleId1 = this.roleId
            } else {
              roleId1 = row.roleId
            }
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'user/saveUser',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                mobilePhoneNo: row.phone,
                userName: row.name,
                userId: row.userID,
                noSegmentPrefix: row.num,
                organizationId: organizationId1,
                roleId: roleId1
              }
            };
            this.$postHttp(options).then((res) => {
              // this.bianjistate = 0;
              this.$router.go(0)//刷新页面展示数据
            })
          }
        }
      },
      handleCancle(index, row) {
        row.editing = false;
        //点击取消还原是添加还是编辑的状态
        this.bianjistate = 0;
        this.addstate = 0;
        if (row.userID == '') {
          this.tableData.splice(index, 1)
        } else {
          //保证点击取消还原数据
          let prevContent = this.prevValue.address;
          let prevContent1 = this.prevValue.name;
          let prevContent2 = this.prevValue.num;
          let prevContent3 = this.prevValue.phone;
          let prevContent4 = this.prevValue.organizationId;
          let prevContent5 = this.prevValue.roleId;
          let prevContent6 = this.prevValue.roleName;
          let prevContent7 = this.prevValue.isDelete;

          this.$set(row, "address", prevContent);
          this.$set(row, "name", prevContent1);
          this.$set(row, "num", prevContent2);
          this.$set(row, "phone", prevContent3);
          this.$set(row, "organizationId", prevContent4);
          this.$set(row, "roleId", prevContent5);
          this.$set(row, "roleName", prevContent6);
          this.$set(row, "isDelete", prevContent7);
        }
      },
      handleDelete(index, row) {
        console.log(row)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const userID = row.userID
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json', 'token': this.$store.state.token},
            url: 'user/deleteUser',
            data: {
              loginMobilePhoneNo: this.mobilePhoneNo,
              userId: userID
            }
          };
          this.$axios(options).then((res) => {
            if (res.data.state == 1) {
              this.tableData.splice(index, 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error(res.data.retMsg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


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
          name: '',
          phone: '',
          userID: '',
          address: '',
          num: '',
          roleName: '',
          roleId: '',
          editing: true,
          organizationId: ''
        };
        this.tableData.unshift(obj);
      },
      handleEdit(index, row) {
        this.bianjistate = 1;
        console.log(row, row.editing)
        row.editing = true;
        this.index = index;
        this.prevValue = JSON.parse(JSON.stringify(row));
      }
    },
    created() {
      this.getinfo(0);//样式初始化
      this.getdata()
    }
  }
</script>

<style scoped>
  .el-textarea__inner {
    font-family: "Microsoft";
    font-size: 20px;
  }

  .block {
    width: 60%;
    text-align: right;
  }
</style>
