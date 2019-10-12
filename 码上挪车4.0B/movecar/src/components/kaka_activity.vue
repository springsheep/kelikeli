<template>
<div class="content">
  <yd-rollnotice autoplay="2000" align="center">
    <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>车险分期 3月超级钜惠！</yd-rollnotice-item>
    <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>3.23超级品牌日盛典</yd-rollnotice-item>
    <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>安邦保险集团 门槛低 期限长</yd-rollnotice-item>
  </yd-rollnotice>
  <ul>
    <!--<li v-for="item in list">-->
    <li>
      <img src="../assets/91.png" alt="">
    </li>
    <li>
      <img src="../assets/92.png" alt="">
    </li>
    <li>
      <img src="../assets/93.png" alt="">
    </li>
    <li>
      <img src="../assets/94.png" alt="">
    </li>
      <!--{{item}}-->
    <!--</li>-->
  </ul>

</div>
</template>

<script>
    export default {
        name: "kaka_activity",
      data(){
          return{
            list:['活动1','活动2','活动3','活动4','活动5','活动6']
          }
      }
    }
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  padding-top: .1rem;
  padding-bottom: .64rem;
  /*background: #ffffff;*/
  ul{
    width: 100%;
    li{
      width: 93.3%;
      color: #000000;
      margin: 0 auto;
      margin-top: .64rem;
      border-radius: 10px;
      background: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
        height: auto;
      }

    }
  }

}
</style>
