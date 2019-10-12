<template>
  <div id="app">
    <!--<div v-show="isLoading">加载中</div>-->
    <transition :name="transitionName">

    <router-view></router-view>
      <!--<test></test>-->
      <!--<kaka_home1></kaka_home1>-->
      <!--<kaka_loding></kaka_loding>-->
    </transition>


  </div>
</template>

<script>

  //引入屏幕适配
  import {} from './common/resize'
  import Test from "./components/test";
  import Kaka_home1 from "./components/kaka_fourEdition/kaka_home1";
  import Kaka_loding from "./components/kaka_loding";


export default {
  name: 'App',
  components: {Kaka_loding, Kaka_home1, Test},
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },data(){
    return{
      transitionName:''
    }
  },watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
  created() {
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

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 200ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  body{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    text-decoration: none;
    font-size: .64rem;
  }

</style>
