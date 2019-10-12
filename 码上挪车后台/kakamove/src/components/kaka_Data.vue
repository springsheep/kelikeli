<template>
  <div style="width: 100%">
    <div style="padding:15px; ">
      <div style="display: flex;flex-wrap: wrap;" class="searchone">
        <div style="width: 25%;display: flex;align-items: center">
          <span>批次号 </span><span><el-input size="small" v-model="batchNo">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>模版 </span>
          <span>
            <el-select v-model="templateIndex" slot="prepend" placeholder="请选择" size="small">
              <el-option label="全部" value=""></el-option>
            <el-option label="模版一" value="0"></el-option>
            <el-option label="模版二" value="1"></el-option>
            <el-option label="模版三" value="2"></el-option>

          </el-select>
          </span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>版本 </span>
          <span>
          <el-select v-model="edition" slot="prepend" placeholder="请选择" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="A版本" value="A"></el-option>
            <el-option label="B版本" value="B"></el-option>

          </el-select>
          </span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>印刷 </span><span><el-input size="small" v-model="print">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>车主姓名 </span><span><el-input size="small" v-model="carOwnerName">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>车牌号码 </span><span><el-input size="small" v-model="carNo">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>电话号码 </span><span><el-input size="small" v-model="mobilePhoneNo">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>使用次数 </span><span><el-input size="small" v-model="callCount">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>发放人 </span><span><el-input size="small" v-model="creater">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>所属机构 </span><span><el-input size="small" v-model="organizationName">  </el-input></span>
        </div>
        <div style="width: 25%;display: flex;align-items: center">
          <span>领用人 </span><span><el-input size="small" v-model="getPeopleName">  </el-input></span>
        </div>
        <div style="width: 50%;display: flex;align-items: center">
          <span>绑定日期 </span>
          <span>
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
    </el-date-picker></span>
        </div>
        <div style="width: 50%;text-align: right;">
          <div>
            <el-button type="primary" size="small" @click="getinfo1(1)">查 询</el-button>
            <el-button type="danger" size="small" @click="resize">重 置</el-button>
          </div>
        </div>
      </div>

    </div>
    <div class="geduan"></div>
    <div class="content">
      <div class="head">
        <div class="left">挪车码绑定清单</div>
        <div class="right">
          <span>生成数：{{totalCreateCount}}</span>
          <span>绑定数：{{totalBindCount}}</span>
          <span>使用次数：{{totalCallCount}}</span>
          <el-button type="primary" size="mini" @click="derive">导出</el-button>
        </div>
      </div>
      <div class="table">
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
          <el-table-column
            prop="batchNo"
            label="批次号"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="templateIndex"
            label="模版"
          >
          </el-table-column>
          <el-table-column
            prop="edition"
            label="版本"
          >
          </el-table-column>
          <el-table-column
            prop="print"
            label="印刷"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="bindTime"
            label="绑定日期"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="carOwnerName"
            label="车主姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="carNo"
            label="车牌号码">
          </el-table-column>
          <el-table-column
            prop="mobilePhoneNo"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="callCount"
            label="使用次数"
            width="80">
          </el-table-column>
          <el-table-column
            prop="creater"
            label="发放人"
            width="60">
          </el-table-column>
          <el-table-column
            prop="organizationName"
            label="所属机构">
          </el-table-column>
          <el-table-column
            prop="getPeopleName"
            label="领用人"
            width="60">
          </el-table-column>

        </el-table>
      </div>
      <div class="block" style="text-align: right;padding-top: 20px">
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
    name: "kaka_Data",
    data() {
      return {
        value1: '',
        select: '',//moban
        select1: '',//版本
        loading: true,
        pagesize: 8,//每页的数据条数
        currentPage: 1,//默认开始页面
        tableData: [],
        search: '',  //搜索
        mobilePhoneNo1: this.$store.state.data.mobilePhoneNo,
        total: 0,
        batchNo: null,
        edition: null,
        templateIndex: null,
        print: null,
        bindTimeStart: null,
        bindTimeEnd: null,
        carNo: null,
        carOwnerName: null,
        mobilePhoneNo: null,
        callCount: null,
        creater: null,
        organizationName: null,
        getPeopleName: null,
        totalBindCount: null,//总绑定书
        totalCallCount: null,//总呼叫数
        totalCreateCount: null,//总生成数
      }
    }, created() {
      this.getinfo(0)
    },
    watch: {
      value1() {
        console.log(this.value1)
        this.bindTimeStart = this.value1[0];
        this.bindTimeEnd = this.value1[1]
      },
    },
    methods: {
      //导出
      derive() {
        const loading = this.$loading({
          lock: true,
          text: '卡卡正在为您导出，请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/dataStatisticsExport',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo1,
            batchNo: this.batchNo,
            edition: this.edition,
            templateIndex: this.templateIndex,
            print: this.print,
            bindTimeStart: this.bindTimeStart,
            bindTimeEnd: this.bindTimeEnd,
            carNo: this.carNo,
            carOwnerName: this.carOwnerName,
            mobilePhoneNo: this.mobilePhoneNo,
            callCount: this.callCount,
            creater: this.creater,
            organizationName: this.organizationName,
            getPeopleName: this.getPeopleName
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          window.location.href = res.data.fileUrl
          loading.close();
        })
      },
      resize() {
        this.$router.go(0)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        // this.tableData = [];
        this.getinfo(val - 1)
      },
      getinfo1(m) {
        this.handleCurrentChange(m)
      },
      //初始化
      getinfo(m) {
        this.tableData = []
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'moveCar/dataStatistics',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo1,
            pageSize: 8,
            pageNo: m,
            batchNo: this.batchNo,
            edition: this.edition,
            templateIndex: this.templateIndex,
            print: this.print,
            bindTimeStart: this.bindTimeStart,
            bindTimeEnd: this.bindTimeEnd,
            carNo: this.carNo,
            carOwnerName: this.carOwnerName,
            mobilePhoneNo: this.mobilePhoneNo,
            callCount: this.callCount,
            creater: this.creater,
            organizationName: this.organizationName,
            getPeopleName: this.getPeopleName
          }
        };
        this.$postHttp(options, '加载').then((res) => {
          const data = res.data.moveCarQrCodeList;
          this.totalCreateCount = res.data.totalCreateCount;
          this.totalCallCount = res.data.totalCallCount;
          this.totalBindCount = res.data.totalBindCount;
          this.total = res.data.totalCount
          if (data != null) {
            for (let i in data) {
              const obj = {
                bindTime: data[i].bindTime,
                carOwnerName: data[i].carOwnerName,
                carNo: data[i].carNo,
                mobilePhoneNo: data[i].mobilePhoneNo,
                callCount: data[i].callCount,
                getPeopleName: data[i].getPeopleName,
                organizationName: data[i].organizationName,
                creater: data[i].creater,
                batchNo: data[i].batchNo,
                edition: data[i].edition,
                templateIndex: data[i].templateIndex,
                print: data[i].print,
              };
              this.tableData.push(obj)
            }
            console.log(this.tableData, 11)
          }
          this.loading = false//关闭动画
        })
      },

    }
  }
</script>

<style scoped lang="scss">
  .searchone {
    div {
      margin-top: .2vw;

      span:nth-child(1) {
        width: 60px;

      }

      span:nth-child(2) {
        width: 180px;

      }

      span {
        color: #666666;
        text-align: left;
      }
    }
  }

  .table {
    margin-top: 10px;
    padding: 0 15px;
  }

  .geduan {
    height: 1px;
    background-color: #dddddd;
    width: 100%;
  }

  .head {
    padding: 0 15px;
    padding-top: 10px;
    display: flex;
    align-items: center;
  }

  .left {
    width: 40%;
    text-align: left;
    border-left: 5px solid #499ffe;
    height: 18px;
    padding-left: 5px;
  }

  .right {
    width: 60%;
    text-align: right;

    span {
      text-align: left;
      width: 15%;
      display: inline-block;
      letter-spacing: 1px;
      color: #666666;
    }
  }
</style>
