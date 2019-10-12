<template>
    <div style="width: 60%">
      <div style="padding: 20px 20px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="运行商名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="收费方式"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="计费标准">
          </el-table-column>
          <el-table-column
            prop="money"
            label="话费充值">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-button type="primary" size="medium" >运行商后台</el-button>
      </div>
      <div class="footer">
        <p>温馨提示：</p>
        <p>虚拟号的相关服务费由对应的运行商提供，卡卡挪车仅提供基本数据的同步功能</p>
        <p>如果需要使用包括话费充值，数据查询，设置修改等功能，需登陆运营商的管理界面方可实现</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "kaka_CostManager",
      data(){
          return{
            tableData: [{
              date: '中国移动',
              name: '按月收费',
              address: '0.05元/次',
              money:'120'
            }]
          }
      }
    }
</script>

<style scoped>
.footer{
  margin-top: 30px;
  padding-left: 20px;
  text-align: left;
  font-size: 10px;
  letter-spacing: 1px;
  color: #999999;
}
</style>
