<template>
  <div style="width: 100%;height: 100%;font-size: 13px">
    <el-container>
      <el-aside width="13%" style="min-width: 110px" class="kkk">
        <el-menu
          default-active="1"
          text-color="#bbbbbb"
          background-color="#202229"
          active-text-color="#409EFF">
          <el-menu-item-group>
            <div slot="title" style="color: #FFFFFF;  line-height: 40px;width: 100%;height: 40px;overflow: hidden">
              <img src="../assets/logo.png" style="width: 25px;vertical-align: -5px;margin-right: 2px">
              码上挪车管理平台
            </div>
          </el-menu-item-group>
          <div v-for="(item,index1) in menuInfos" :key="index1">
            <el-submenu :index="1+'-'+index1" v-if="item.childMenus!=null" @click="change(item)">
              <template slot="title">
                <i :class="item.menuIcon"></i>
                <span>{{item.menuName}}</span>
              </template>
              <div>
                <el-menu-item :index="2+'-'+index2" @click="change(item2)" v-for="(item2,index2) in item.childMenus"
                              :key="index2">
                  {{item2.menuName}}
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item :index="1+'-'+index1" v-else @click="change(item)">
              <i :class="item.menuIcon"></i>
              <span>{{item.menuName}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container style="min-width: 800px;">
        <el-header>
          <div style="display: flex;justify-content: space-between;" class="nav">
            <div style="width: 75%;text-align: right">
              <i class="el-icon-phone-outline" style="margin-right: 10px">
              </i>咨询电话：15397031258
            </div>
            <div style="width: 10%;text-align: right"><i class="el-icon-s-custom" style="margin-right: 10px"></i>{{userName}}
            </div>
            <div style="width: 5%;text-align: center;min-width: 100px" class="ppp">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="font-size: 13px;">
                    个人中心
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">基本信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div style="width: 5%;cursor: pointer" @click="back"> 退出</div>
          </div>
          <div class="nav1" style="">
            <div style="padding-left: 90%">
              <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                  <template slot="title"><i class="el-icon-menu"></i>管理中心</template>
                  <el-menu-item index="2-1">咨询电话</el-menu-item>
                  <el-menu-item index="2-2">{{userName}}</el-menu-item>
                  <el-menu-item index="2-3" @click="tobasic">基本信息</el-menu-item>
                  <el-menu-item index="2-4" @click="tochange">修改密码</el-menu-item>
                  <el-menu-item index="2-5" @click="back">退出</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
        </el-header>

        <el-main>
          <div
            style="width: 100%;background:#f8f8f8 ;height: 35px;line-height: 35px;text-align: left">
            <div style="margin-left: 20px">
              {{title}}
            </div>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "kaka_home",
    data() {
      return {
        title: '批量导入',//默认标题批量导入
        userName: '',//用户名称
        menuInfos: []
      }
    },
    mounted() {
      if (this.$store.state.title != null) {
        this.title = this.$store.state.title
      }

    },
    methods: {
      change(m) {
        this.$router.push({path: `${m.menuUrl}`});
        this.title = `${m.menuName}`
        this.$store.state.title = `${m.menuName}`
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      back() {
        this.$confirm('您确定要退出吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/login'});
          sessionStorage.clear();
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        if (command == 'a') {
          this.$router.push({path: '/BasicInfo'});
          this.title = '基本信息'
        } else if (command == 'b') {
          this.$router.push({path: '/ChangePassword'});
          this.title = '修改密码'
        }
      },
      tochange() {
        this.$router.push({path: '/ChangePassword'});
        this.title = '修改密码'
      },
      tobasic() {
        this.$router.push({path: '/BasicInfo'});
        this.title = '基本信息'
      },
      tokakarbac() {
        this.$router.push({path: '/kaka_rbac'});
        this.title = '权限管理'
      }
    },
    created() {
      console.log(this.$store.state.menuInfos)
      this.menuInfos = this.$store.state.data.menuInfos
      this.userName = this.$store.state.data.userName
    }
  }
</script>

<style scoped>
  .ppp:hover {
    cursor: pointer;
  }

  .nav1 {
    display: none;
    position: fixed;
    top: 0;
    right: 60px;
  }

  @media screen and (max-width: 880px) {
    .nav {
      opacity: 0;
    }

    .nav1 {
      display: block;
      width: 100%;
    }
  }
</style>
<style>
  .el-submenu .el-menu-item {
    min-width: 0;
  }

  .el-main {
    padding: 0;
  }

  .kkk::-webkit-scrollbar {
    display: none;
  }

  .el-menu {
    height: 100%;
  }
</style>
