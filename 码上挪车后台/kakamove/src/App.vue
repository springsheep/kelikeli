<template>
  <div id="app">
    <router-view></router-view>
    <!-- <love></love> -->
  </div>

</template>

<script>
  import Kaka_Login from "./components/kaka_Login";
  import love from "./components/kaka_ooo"

  export default {
    name: 'App',
    components: {Kaka_Login,love},
    data() {
      return {
        showlogin: false
      }
    },
    methods: {}, created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style>
  .el-main {
    padding: 0;
    z-index: 2;
  }

  .nav {
    color: #666666;
  }

  .el-menu-item-group__title {
    padding: 7px 0 !important;
    font-size: 15px !important;
    line-height: 40px;
    z-index: 2;
    color: #FFFFFF;
    background: #499ffe;
    font-weight: 500;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  #app1 {
    width: 100%;
    height: 100%;
  }


  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
    color: #ffffff;
  }

  .el-aside {
    text-align: center;
    background-color: #202229;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container {
    height: 100%;
    width: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
