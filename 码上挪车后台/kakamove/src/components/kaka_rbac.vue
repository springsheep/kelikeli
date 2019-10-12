<template>
  <div style=" width: 100%">
    <div style="padding: 15px">
      <el-table
        v-loading='loading'
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
        <el-table-column prop="roleName1" label="ID" width="75">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="角色备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="editing" label="角色操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"
                       @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="primary" v-model="scope.$index"
                       @click="handleSave(scope.$index, scope.row)">查看
            </el-button>
            <el-button size="mini" type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div style="width: 100%;margin-top: 20px;text-align: left;display: flex;justify-content: space-around">
        <div style="width: 40%">
          <el-button type="primary" size="small" @click="add">增 加</el-button>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size=pagesize
            layout="total, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
        <transition name="el-zoom-in-center">
          <div class="mask" v-show="showversion">
            <div class="choosewitch">
              <div class="one" style="text-align: left">
                <div style="color: #666666">
                  请输入名称：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入名称" v-model="roleName" size="small"></el-input>
                </div>
                <div style="color: #666666;margin-top: 15px">
                  请输入备注：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入备注" v-model="remark" size="small"></el-input>
                </div>
                <div style="color: #666666;margin: 15px 0">
                  请选择角色权限：
                </div>
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                  accordion
                  @check="handleCheckChange"
                >
                </el-tree>
              </div>

              <div style="text-align: left;margin-top: 20px">
                <el-button type="primary" size="small" @click="sure">确定</el-button>
                <el-button type="danger" size="small" @click="showversion=false">取消</el-button>
              </div>
            </div>

          </div>
        </transition>
        <!--//查看模块-->
        <transition name="el-zoom-in-center">
          <div class="mask" v-show="showsee">
            <div class="choosewitch">
              <div class="one" style="text-align: left">
                <div style="color: #666666">
                  角色名称：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入名称" v-model="roleName1" size="small" readonly="readonly"></el-input>
                </div>
                <div style="color: #666666;margin-top: 15px">
                  角色备注：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入备注" v-model="remark1" size="small" readonly="readonly"></el-input>
                </div>
                <div style="color: #666666;margin: 15px 0">
                  角色权限：
                </div>
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="data1"
                  :props="defaultProps"
                  @check="handleCheckChange"
                  accordion
                >
                </el-tree>
              </div>

              <div style="text-align: left;margin-top: 20px">
                <el-button type="danger" size="small" @click="showsee=false">关闭</el-button>
              </div>
            </div>

          </div>
        </transition>
        <!--//编辑模块-->
        <transition name="el-zoom-in-center">
          <div class="mask" v-show="showedithon">
            <div class="choosewitch">
              <div class="one" style="text-align: left">
                <div style="color: #666666">
                  请输入名称：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入名称" v-model="roleName2" size="small"></el-input>
                </div>
                <div style="color: #666666;margin-top: 15px">
                  请输入备注：
                </div>
                <div style="width: 60%;margin: 10px 0 3px">
                  <el-input placeholder="请输入备注" v-model="remark2" size="small"></el-input>
                </div>
                <div style="color: #666666;margin: 15px 0">
                  请选择角色权限：
                </div>
                <el-tree
                  accordion
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="data1"
                  :props="defaultProps"
                  @check="handleCheckChange"
                >
                </el-tree>
              </div>

              <div style="text-align: left;margin-top: 20px">
                <el-button type="primary" size="small" @click="sure2">确定</el-button>
                <el-button type="danger" size="small" @click="showedithon=false">取消</el-button>
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
    name: "kaka_rbac",
    data() {
      return {
        data: [],
        data1: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pagesize: 8,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [],
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        index: '',//判断是编辑第几个数据
        restaurants: [],
        allfenzhi: [],
        prevValue: {},
        loading: true,//开始加载动画
        arr1: [],
        organizationId: '',
        parentOrganizationId: '',
        organizationIdflag: false,
        showversion: false,
        showedithon: false,
        showsee: false,
        roleName: '',
        remark: '',
        roleName1: '',
        remark1: '',
        roleName2: '',
        remark2: '',
        functionCodes: [],
        roleId: null,
      }
    },
    methods: {
      handleCheckChange(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
        console.log(checkedKeys);
        this.functionCodes = checkedKeys.checkedKeys;
      },
      sure2() {
        const options = {
          method: 'POST',
          headers: {token: this.$store.state.token},
          url: 'user/saveRole',

          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            roleName: this.roleName2,
            functionCodes: this.functionCodes,
            remark: this.remark2,
            roleId: this.roleId
          }
        };
        this.$postHttp(options, '生成').then((res) => {
          this.showversion = false;
          this.$router.go(0)
        })
      },
      sure() {
        console.log(this.roleName, this.remark, this.functionCodes)
        const options = {
          method: 'POST',
          headers: {token: this.$store.state.token},
          url: 'user/saveRole',

          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            roleName: this.roleName,
            functionCodes: this.functionCodes,
            remark: this.remark
          }
        };
        this.$postHttp(options, '生成').then((res) => {
          this.showversion = false;
          this.$router.go(0)
        })
      },
      //获取权限
      getAllFunctionList() {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getAllFunctionList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          console.log(res.data)
          this.data = res.data;
        })
      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getRoleList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 8,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          const data = res.data.roleList
          console.log(data)
          if (data != null) {
            for (let i in data) {
              const obj = {
                roleName: data[i].roleName,
                createTime: data[i].createTime,
                remark: data[i].remark,
                roleId: data[i].roleId,
                editing: false
              };
              this.tableData.push(obj)
            }
          }
          this.loading = false//关闭动画
        })
      },
      //查看
      handleSave(index, row) {

        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getRoleDetail',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            roleId: row.roleId,
          }
        };
        this.$postHttp(options).then((res) => {
          // this.bianjistate = 0;
          // this.$router.go(0)//刷新页面展示数据
          this.showsee = true;
          this.roleName1 = res.data.roleName;
          this.data1 = res.data.functionCodes;
          this.remark1 = res.data.remark;
          console.log(res.data)
        })

      },
      handleDelete(index, row) {
        const roleId = row.roleId
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/deleteRole',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            roleId: roleId
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
        this.showversion = true
      },
      handleEdit(index, row) {
        this.roleId = row.roleId;
        row.editing = true;
        this.index = index;
        this.prevValue = JSON.parse(JSON.stringify(row));
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'user/getRoleDetail',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            roleId: row.roleId,
          }
        };
        this.$postHttp(options).then((res) => {
          this.showedithon = true
          this.roleName2 = res.data.roleName;
          this.data1 = res.data.functionCodes;
          this.remark2 = res.data.remark;
          console.log(res.data)
        })
      }
    },
    created() {
      this.getinfo(0);//样式初始化
      this.getAllFunctionList();//初始化获取权限
    }
  }
</script>

<style scoped>
  .choosewitch {
    padding: 10px 0;
    padding-left: 20px;
    width: 500px;
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

  .el-textarea__inner {
    font-family: "Microsoft";
    font-size: 20px;
  }

  .block {
    width: 60%;
    text-align: right;
  }
</style>
