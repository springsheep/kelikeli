<template>
  <div class="content">
    <img src="../../assets/success.jpeg" class="img"/>
    <div class="title" style="margin-top: .2rem">恭喜你</div>
    <div class="title" style="margin-top: .2rem">成功开启挪车服务</div>
  <div style="width: 100%;display: flex;margin-top: 4rem">
    <div class="button" @click="next">进入挪车服务</div>
    <div class="button" @click="next1">进入修改设置</div>
  </div>
  </div>


</template>

<script>
  export default {
    name: "kaka_complete",
    data() {
      return {}
    },
    methods: {
      next() {
        this.$router.push({path: '/kaka_home'})
      },
      next1() {
        this.$router.push({path: '/kaka_changebind'})
      }
    }
  }
</script>

<style scoped>
  .button {
    width: 40%;
    margin: 0 auto;
    line-height: 1.877rem;
    background-color: #04c8af;
    color: #FFFFFF;
    font-size: .768rem;
    border-radius: .2rem;
  }

  .title {
    font-size: .768rem;
    color: #333333;
  }

  .img {
    width: 4rem;
    margin-top: 4.267rem;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
