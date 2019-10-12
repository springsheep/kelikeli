<template>
  <div class="content">
    <div class="top">
      <div style="padding-bottom: .6rem;color: #666666">
        <p>我是<span style="color: #04c8af">{{carNo}}</span>的车主</p>
        <p>我的车在此临时停靠，</p>
        <p>如果阻碍了您，</p>
        <p>请点击下方按钮通知我挪车，</p>
        <p>给您带来不便敬请谅解。</p>
      </div>
    </div>
    <div class="button"
         @touchstart.prevent="movestart(4)"
         @touchend.prevent="moveend(4)"
         ref="ppp4"
    >
      <img src="../assets/intomove.png"/>
    </div>
    <div class="foot">
      <div class="ppp"
           @touchstart.prevent="movestart(1)"
           @touchend.prevent="moveend(1)"
           ref="ppp"
      >
        <span><img src="../assets/167.png"/></span>
        <p>挪车码申请</p>
      </div>
      <div class="second"
           @touchstart.prevent="movestart(2)"
           @touchend.prevent="moveend(2)"
           ref="ppp1"
      >
        <span><img src="../assets/123.png"/></span>
        <p>低价购车险</p>
      </div>
      <div class="three"
           @touchstart.prevent="movestart(3)"
           @touchend.prevent="moveend(3)"
           ref="ppp2"
      >
        <span><img src="../assets/121.png"/></span>
        <p>更多服务项</p></div>
    </div>
    <footer v-show="hideshow">
      <div>{{bindcarinfo.copyrightZh}}</div>
      <div>{{bindcarinfo.copyrightEn}}</div>
    </footer>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "kaka_home",// js 部分
    data() {
      return {
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hideshow: true,  //显示或者隐藏footer
        carNo: JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo,
        isStop:JSON.parse(sessionStorage.getItem('bindcarinfo')).isStop,
        bindcarinfo:JSON.parse(sessionStorage.getItem('bindcarinfo'))
      }
    },
    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = () => {
        return (() => {
          this.showHeight = document.body.clientHeight;
        })()
      }
    },
//监听
    watch: {
      showHeight: function () {
        if (this.docmHeight > this.showHeight) {
          this.hideshow = false
        } else {
          this.hideshow = true
        }
      }
    },
    methods: {
      movestart(m) {
        if (m == 1) {
          this.$refs.ppp.style.background = '#13a895'
        } else if (m == 2) {
          this.$refs.ppp1.style.background = '#13a895'
        } else if (m == 3) {
          this.$refs.ppp2.style.background = '#13a895'
        } else {
          this.$refs.ppp4.style.borderColor = '#13a895'
        }
      },
      moveend(m) {
        if (m == 1) {
          this.$refs.ppp.style.background = '#03c8af';
          setTimeout(() => {
            this.$router.push({path: '/kaka_askmove'})
          }, 200)

        } else if (m == 2) {
          this.$refs.ppp1.style.background = '#03c8af';
          setTimeout(() => {
            window.location.href = 'https://kaka.kelibbb.com/klkl/merchants.php?m=Carinsur&c=h5&a=index&key=kk'
          }, 200)
        } else if (m == 3) {
          this.$refs.ppp2.style.background = '#03c8af';
          this.$router.push({path: '/kaka_moreservice',
            query:{
              organizationId:'1'
            }})
        } else {
          this.$refs.ppp4.style.borderColor = '#03c8af'
          if(this.isStop==1){
            Toast('抱歉，车主已停用该挪车码');
          }else {
            setTimeout(() => {
              this.$router.push({path: '/kaka_intomovecar'})
            }, 200)
          }


        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .foot div span {
    display: flex;
    justify-content: center;
  }

  .foot div span img {
    width: 1.066rem;
    height: 1.166rem;

  }

  .foot div p {
    color: #ffffff;
    text-align: center;
    font-size: .64rem;
    margin: 0;
    margin-top: .4rem;
  }

  .foot {
    width: 94.3%;
    height: 3.414rem;
    margin: 3rem auto;
    background-color: #FFFFFF;
    border-radius: .426rem;
    display: flex;
    justify-content: space-around;
  }

  .second, .three {
    width: 33%;
    line-height: 100%;
    height: 100%;
    background-color: #03c8af;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .ppp {
    width: 33%;
    line-height: 100%;
    height: 100%;
    background-color: #03c8af;
    border-radius: .426rem 0 0 .426rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .three {
    border-radius: 0 .426rem .426rem 0;
  }

  .button {
    width: 4.693rem;
    height: 4.693rem;
    border-radius: 50%;
    background-color: #FFFFFF;
    position: absolute;
    left: 36%;
    top: 12rem;
    border: solid 2.5px #03c8af;
    box-shadow: 0 5px 5px #dddddd;
    transform: translateZ(0);
  }

  .button img {
    width: 112%;
    height: 112%;
    position: relative;
    right: .25rem;
    bottom: .13rem;
  }

  .content {
    width: 100%;
  }

  .top {
    background: url("../assets/home.png");
    background-size: contain;
    width: 94%;
    margin: 0 auto;
    height: 14.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .7rem;
    color: #333333;

    p {
      padding-bottom: .2rem;
    }
  }

  .top img {
    width: 93.3%;
    height: 100%;
  }

  footer {
    width: 100%;
    position: absolute;
    bottom: .426em;
  }

  footer div {
    width: 100%;
    font-size: .383rem;
    color: #999999;
    text-align: center;
    font-weight: 300;

  }

  .content {

    width: 100%;
    padding-top: .64rem;
    box-sizing: border-box;
    position: relative;
    height: 100%;
  }
</style>
