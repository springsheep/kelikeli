<template>
  <div class="content">
    <ul>
      <li @click="rdirect(1)">
        <img src="../assets/aixin1.png" alt="">
        <div class="middle">
          <h2 class="middle_top">水滴筹</h2>
          <p class="middle_bottom">爱心救助大病众筹平台</p>
        </div>
       <div class="right_icon">
         <van-icon name="arrow" size="6vw" color="#999999"/>
       </div>
      </li>
      <van-divider/>
      <li @click="rdirect(2)">
        <img src="../assets/aixin2.png" alt="">
        <div class="middle">
          <h2 class="middle_top">轻松筹</h2>
          <p class="middle_bottom">大平台，筹款快，0手续费</p>
        </div>
        <div class="right_icon">
          <van-icon name="arrow" size="6vw" color="#999999"/>
        </div>
      </li>
      <van-divider/>
      <li @click="rdirect(3)">
        <img src="../assets/aixin3.png" alt="">
        <div class="middle">
          <h2 class="middle_top">爱心筹</h2>
          <p class="middle_bottom">免费大病筹款平台</p>
        </div>
        <div class="right_icon">
          <van-icon name="arrow" size="6vw" color="#999999"/>
        </div>
      </li>
      <van-divider/>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "kaka_crowd_funding",
    methods:{
      rdirect(m){
        if(m==1){
          window.location='http://www.zhonghuiaixin.com'
        }else if(m==2){
          window.location='https://www.shuidichou.cn/landing'
        }else {
          window.location='https://www.qschou.com/sem/index.html'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .van-divider {
    margin: 0;
  }

  .content {
    width: 100%;
    height: 100%;

    ul {
      width: 100%;
      height: 100%;

      li {
        display: flex;
        align-items: center;
        height: 27vw;

        img {
          display: inline-block;
          width: 16vw;
          height: 16vw;
          margin-left: 4vw;
          border-radius: 2vw;
          box-shadow: 0vw 0vw 3vw 0vw rgba(1, 1, 0, 0.1);
        }

        .middle {
          height: 27vw;
          width: 35vw;

          margin-left: 4vw;
          .middle_top{
            margin-top: 7vw;
            height: 5vw;
            font-size: .766rem;
            font-stretch: normal;
            line-height: 5vw;
            letter-spacing: 0vw;
            color: #333333;
          }
          .middle_bottom{
            height: 3vw;
            font-size:.51rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 3vw;
            color: #999999;
            margin-top: 4vw;
          }
        }
.right_icon{
  margin-left: 32vw;
}
      }
    }

  }

</style>
