<template>
  <div style="width: 100%;display: flex;flex-direction: column">
    <div style="padding: 15px">
      <el-table
        v-loading='loading'
        :element-loading-text="title"
        :data="tableData"
        border
        style="width: 100%"
        :cell-style="{color:'#666666','text-align':'center',fontSize:'12px'}"
        :header-cell-style="{
                'background-color': '#f8f8f8',
                'text-align':'center',
                  'color':'#666666',
                  padding :'8px 0',
                  fontSize:'12px'
                  }">
        <el-table-column
          prop="batchNo"
          label="批次号"
        >
        </el-table-column>
        <el-table-column
          prop="organizationName"
          width="120"
          label="所属机构"
        >
        </el-table-column>
        <el-table-column
          prop="creater"
          label="操作员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="edition"
          label="版本"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="templateIndex"
          label="模版"
          width="70"
        >
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="print"-->
        <!--label="印刷"-->
        <!--width="70"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          prop="isBatchImport"
          label="批量导入"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="noSegment"
          label="对应号段"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="180"
          label="生成日期">
        </el-table-column>
        <el-table-column
          prop="editing"
          label="操作"
          width="50"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="handleEdit(scope.$index, scope.row)" :underline="false">下载</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="el-zoom-in-center">
      <div class="mask" v-show="showversion">
        <div class="choosewitch">
          <div class="one" style="text-align: left">
            <div style="color: #666666">
              请输入数量：
            </div>
            <div style="width: 60%;margin: 10px 0 3px">
              <el-input placeholder="请输入数量" v-model="value" size="small"></el-input>
            </div>
          </div>
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
    <div style="width: 100%;margin-top: 5px;text-align: left;margin-left: 20px;display: flex;align-items: center">
      <template>
        <el-button type="text" @click="open">
          <el-button type="primary" size="small">生 成</el-button>
        </el-button>
      </template>
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
</template>

<script>
  import qs from 'qs'

  export default {
    name: "kaka_generation_manager",
    data() {
      return {
        tableData: [],
        prevValue: {},
        percentage: 0,
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        loading: true,//开始加载动画
        title: '拼命加载中',
        pagesize: 8,//每页的数据条数
        currentPage: 1,//默认开始页面
        total: 0,
        radio: 'A',
        radio1: '0',
        showversion: false,
        value: ''
      }
    },
    created() {
      this.getinfo(0);//初始化
    },
    methods: {
      sure() {
        const options = {
          method: 'POST',
          headers: {token: this.$store.state.token},
          url: 'moveCar/createMoveCarQrCode',

          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            quantity: this.value,
            edition: this.radio,
            templateIndex: this.radio1
          }
        };
        this.$postHttp(options, '生成').then((res) => {
          this.showversion = false;
          this.$router.go(0)
        })
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableData = [];
        this.getinfo(val - 1)

      },
      open() {
        this.showversion = true
      },
      //下载
      handleEdit(index, row) {
        row.editing = true;
        this.prevValue = JSON.parse(JSON.stringify(row));
        const data = {
          loginMobilePhoneNo: this.mobilePhoneNo,
          batchNo: this.prevValue.batchNo
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': this.$store.state.token,
            "Accept": "application/octet-stream",
          },
          url: 'moveCar/packingDownload',
          responseType: 'blob',
          data: qs.stringify(data)
        };
        this.$axios(options).then((res) => {
          console.log(res.data)
          this.loading = false;
          const content = res.data
          const blob = new Blob([content])
          const fileName = res.headers.filename;
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })

      },
      //初始化
      getinfo(num) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/getCreateMoveCarQrCodeList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
            pageSize: 8,
            pageNo: num,
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          this.loading = false//关闭动画
          if (res.state == 1) {
            this.total = res.data.totalCount
            const data = res.data.moveCarCreateLogList;
            console.log(data)
            for (let i in data) {
              const obj = {
                batchNo: '',
                organizationName: '',
                creater: '',
                version: '',
                module: '',
                // print: '',
                isBatchImport: '',
                quantity: '',
                noSegment: '',
                createTime: '',
                templateIndex: '',
                edition: '',
                editing: false
              }
              obj.templateIndex = data[i].templateIndex;
              obj.edition = data[i].edition;
              obj.batchNo = data[i].batchNo;
              obj.organizationName = data[i].organizationName;
              obj.creater = data[i].creater;
              obj.quantity = data[i].quantity;
              obj.noSegment = data[i].noSegment;
              obj.createTime = data[i].createTime;
              obj.isBatchImport = data[i].isBatchImport;

              this.tableData.push(obj);
            }
          }
        })
      },
    }
  }
</script>

<style scoped>
  .choosewitch {
    padding: 20px 0;
    padding-left: 20px;
    width: 500px;
    height: 280px;
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

  .el-button--primary {

  }

  .block {
    width: 88%;
    text-align: right;
  }

  .el-button--primary:nth-child(4) {
    margin-left: 100px;
  }

  .el-table .cell {
  }
</style>
