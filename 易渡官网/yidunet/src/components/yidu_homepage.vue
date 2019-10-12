<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3" :offset="3">
        <div class="grid-content bg-purple">
          <div style="display: flex;align-items: center;justify-content: center" class="head1">
            <img src="../assets/logo.png"/>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-row style="text-align: center;color: #020202;letter-spacing: 1px;font-weight: 300">
            <el-col :span="4">
              <div class="grid-content bg-purple">首 页</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">产品特点</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">适用范围</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">合作企业</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">关于我们</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">联系我们</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--<el-col :span="4" style="color: #999999;text-align: center;font-weight: 300">-->
        <!--<div class="grid-content bg-purple">登录/注册</div>-->
      <!--</el-col>-->
    </el-row>
    <div class="headimg">
      <img src="../assets/25.jpg"/>
    </div>
    <div class="product">
      <div class="producttitle">

        <img src="../assets/21.png"/></div>
      <div class="productcontent">
        <el-row>
         <div >
           <el-col :span="6" style=""  >
             <div class="productcontentimg"  :class="{color:num!='1',color1:num=='1'}">

               <img src="../assets/6.png" v-if="num!='1'"/>
               <img src="../assets/7.png" v-else/>
             </div>
             <div class="productcontentcontent">方便快捷</div>
             <div class="productbotton">微信扫一扫，填写资料提交即可</div>
           </el-col>
         </div>
         <div >
           <el-col :span="6" :offset="3"  >
             <div class="productcontentimg" :class="{color:num=='2',color1:num!='2'}">
               <img src="../assets/4.png" v-if="num!='2'"/>
               <img src="../assets/8.png" v-if="num=='2'"/>
             </div>
             <div class="productcontentcontent">经济环保</div>
             <div class="productbotton">替代传统纸质登记，环保节约</div>
           </el-col>
         </div>
         <div >
           <el-col :span="6" :offset="3"  >
             <div class="productcontentimg" :class="{color:num=='3',color1:num!='3'}">
               <img src="../assets/5.png" v-if="num!='3'"/>
               <img src="../assets/9.png" v-if="num=='3'"/>
             </div>
             <div class="productcontentcontent">延伸管理</div>
             <div class="productbotton">拓展业务，公司之间的联系</div>
           </el-col>
         </div>
        </el-row>
      </div>

    </div>
    <div class="product1">
      <div class="producttitle">
        <img src="../assets/22.png"/></div>
      <div class="autocontent">
        <div class="img">
          <img src="../assets/10.png"/>
          <div class="imgmask" style="">商务楼宇</div>
        </div>

        <div class="img">
          <img src="../assets/11.png"/>
          <div class="imgmask " style="">居民社区</div>
        </div>
        <div class="img">
          <img src="../assets/12.png"/>
          <div class="imgmask " style="">物流快递</div>
        </div>
        <div class="img" style="margin-top: 20px">
          <img src="../assets/13.png"/>
          <div class="imgmask " style="">会议签到</div>
        </div>
        <div class="img" style="margin-top: 20px">
          <img src="../assets/14.png"/>
          <div class="imgmask " style="">工地建安</div>
        </div>
        <div class="img" style="margin-top: 20px">
          <img src="../assets/15.png"/>
          <div class="imgmask " style="">更多...</div>
        </div>
      </div>
    </div>
    <div class="bottom" style="width: 100%;background: #666666">
      <div class="bottomtop">
        <div class="bottomleft">
          <div><span>关于我们</span><span style="margin-left: 100px">联系我们</span></div>
          <div style="margin-top: 30px"><span>公司简介</span><span style="margin-left: 100px;">电话：18906374455</span></div>
          <div style="margin-top: 10px"><span>团队介绍</span><span style="margin-left: 100px">邮箱：msdj_yd@163.com</span>
          </div>
          <div style="margin-top: 10px"><span>公司荣誉</span><span style="margin-left: 100px">地址：杭州市萧山区闻堰街道湘湖金融小镇二期中区块南岸3号楼172室</span>
          </div>

        </div>
        <div class="bottomright">
          <div style="display: flex;align-items: center;justify-content: center" class="head2">
            <img src="../assets/1.png" style="width: 4vw;height: auto;max-width: 30px"/>易渡
          </div>
        </div>

      </div>
      <div class="middle"></div>
      <div class="bottombottom">杭州易渡资产管理有限公司 版权所有 浙ICP备18022292号-1 浙公网安备 33010802009211号</div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "yidu_homepage",
    data() {
      return {
        num: '1'
      }
    },
    methods: {
      choose(m) {
        console.log(m)
        this.num = m

      }

    }
  }
</script>

<style scoped lang="scss">
  .border{
    border: 0;
  }
  .color {
    background: #ffffff;
    border: 0;
  }

  .color1 {
    background: dodgerblue;
    border: 0 !important;
  }

  .color2 {
    color: #ffffff;

  }

  .color3 {
    color: black;
  }

  .bottomleft {
    width: 80%;
    color: white;
    font-size: 12px;
    padding-top: 30px;
    /*-webkit-transform: scale(0.90);*/
    text-align: left;
  }

  .bottomright {
    width: 20%;
    color: #ffffff;
    padding-top: 50px;
  }

  .bottombottom {
    -webkit-transform: scale(0.80);
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
  }

  .bottomtop {
    width: 66.5%;
    /*height: 232px;*/
    margin: 0 auto;
    display: flex;
    margin-bottom: 10px;
    /*background: dodgerblue;*/
  }

  .middle {
    width: 66.5%;
    margin: 0 auto;
    border-bottom: solid 1px #f1f1f1;
  }

  $type: screen;
  $proto: max-width;
  $proto1: min-width;
  $value: 1250px;
  .bottom {
    width: 100%;
    padding-bottom: 15px;
    /*height: 30px;*/
    background: #999999;
  }

  .head1 {
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 100%;

    img {
      margin-top: .6vw;
      height: 3vw;
      min-width: 30px;
      min-height: 25px;
      width: auto;
      min-width: 60px;
      @media #{$type} and ($proto: $value) {
        height: 2vw;
        min-width: 30px;
        min-height: 25px;
        width: auto;
        min-width: 60px;
      }
    }
  }

  .headimg {
    /*height: 600px;*/
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }

    @media #{$type} and ($proto: $value) {
      /*height: 300px;*/
    }
  }

  .product {
    width: 100%;

    .producttitle {
      width: 10.42vw;
      height: 3.12vw;

      text-align: center;
      margin: 3vw auto;

      img {
        width: 100%;
        height: auto;
      }
    }

  }

  .product1 {
    padding-top: 30px;
    width: 100%;
    background: #f1f1f1;
    min-height: 480px;
    padding-bottom: 10px;
    @media #{$type} and ($proto1: $value) {
      min-height: 550px;
    }
    z-index: 1;

    .producttitle {
      width: 10.42vw;
      height: 3.12vw;
      text-align: center;
      margin: 3vw auto;

      img {
        width: 100%;
        height: auto;
      }
    }

    .autocontent {
      width: 68%;
      margin: 0 auto;
      min-width: 750px;
      height: 380px;
      overflow: hidden;

      .img {
        position: relative;
        box-shadow: 0  2px 4px #666666;
        width: 31%;
        float: left;
        height: 180px;
        margin-left: 2%;
        cursor: pointer;
        @media #{$type} and ($proto: $value) {
          height: 150px;
        }
        min-height: 130px;
        background: dodgerblue;
        transition: all .5s;

        img {
          width: 100%;
          height: 100%;

        }

        .imgmask:hover {
          opacity: 1;
          transition: all 1s;
        }


      }

      .imgmask {
        width: 100%;
        height: 180px;
        @media #{$type} and ($proto: $value) {
          height: 150px;
        }
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;

      }
    }

  }
</style>
<style lang="scss">
  $type: screen;
  $proto: max-width;
  $value: 1250px;
  .productcontent {
    width: 65.5%;
    min-width: 750px;
    min-height: 225px;
    margin: 30px auto;
    height: 18.75vw;

    .el-col {
      height: 18.75vw;
      min-height: 225px;
      border: .5px solid #dddddd;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      /*box-shadow:0 10px  15px #666666;*/
      /*&:hover{*/
        /*background: dodgerblue;*/
        /*color: white;*/
      /*}*/

      .productbotton {
        width: 100%;
        font-size: .633vw;
        -webkit-transform: scale(0.90);
        text-align: center;
      }

      .productcontentimg {
        width: 6.25vw;
        min-height: 80px;
        min-width: 80px;
        height: 6.25vw;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: .5px solid #dddddd;

        img {
          width: 40px;
        }
      }

      .productcontentcontent {
        min-font-size: 90px;
        font-size: 1.45vw;


      }
    }

  }

  .el-row {
    font-size: .9vw;
    min-font-size: 30px;


    &:last-child {
      margin-bottom: 0;
    }
  }

  .grid-content {
    line-height: 4.17vw;
    min-height: 4.17vw;
    @media #{$type} and ($proto: $value) {
      font-size: 10px;
      line-height: 40px;
      min-height: 40px;
    }
  }

  .el-col {
    border-radius: 4px;
    font-size: 18px;
    @media #{$type} and ($proto: $value) {
      font-size: 10px;
    }
  }

  .bg-purple-dark {
    /*background: #99a9bf;*/
  }

  .bg-purple {
    /*background: #d3dce6;*/
  }

  .bg-purple-light {
    /*background: #e5e9f2;*/
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
</style>
