<template>
    <div class="content">
      <div class="first">
        <div class="firsttop">
        <div class="left">
          <img src="../assets/47.png" alt="" style="width: 25px;height: 18px">
          <span style="margin-left: 20px">电子行驶证</span>

        </div>
          <div class="right">
            <div class="button" @click="actieve(1)">
              待领取
            </div>

          </div>
        </div>
        <div class="firstbottom">
          <div class="left">
            ****  ****
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div class="second">
        <div class="firsttop">
          <div class="left">
            <img src="../assets/47.png" alt="" style="width: 25px;height: 18px">
            <span style="margin-left: 20px">电子驾驶证</span>
          </div>
          <div class="right">
            <div class="button" @click="actieve(2)">
              待领取
            </div>
          </div>
        </div>
        <div class="firstbottom">
          <div class="left">
            ****  ****
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div class="third">
        <div class="firsttop">
          <div class="left">
            <img src="../assets/48.png" alt="" style="width: 25px;height: 18px">
            <span style="margin-left: 20px">电子身份证</span>
          </div>
          <div class="right">
            <div class="button" @click="actieve(3)">
              待领取
            </div>
          </div>
        </div>
        <div class="firstbottom">
          <div class="left">
            ****  ****
          </div>
          <div class="right"></div>
        </div>
      </div>

    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
    export default {
        name: "kaka_Electronicdocuments",data(){
          return{
            openId: sessionStorage.getItem('openId'),
          }
      },created() {
          this.getinfo();
      },
      methods:{
          actieve(m){
            if(m==1){
              this.$router.push({path:'/kaka_license'})
            }else if(m==2){
               this.$router.push({path:'/kaka_Driverlicense'})
            }else {
              Toast('暂无此功能')
            }
          },
        getinfo(){
            this.axios.post('credentials/getStatus',{
              "openId":this.openId
            }).then((res)=>{
              // console.log(res.data)
            })
        }

      }
    }
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  .first, .second, .third{
    width: 93.3%;
    height: 4.5rem;
    margin: .64rem auto;
    background: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
  .first{
    background-image: linear-gradient(90deg,
      #467ff6 0%,
      #559cf7 100%);
    box-shadow: 0px 0px 50px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    .firsttop{
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom: .4rem;
      .left{
        width: 60%;
        font-size:19px;
        font-weight: 500;
        font-stretch: normal;
        line-height: 21px;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
      }
      .right{
        width: 20%;
        .button{
          width: 2.56rem;
          height: 1.1rem;
          line-height: 1.1rem;
          background-color: #4d8df6;
          border-radius: 4px;
          border: solid 1px #ffffff;
          text-align: center;
          font-size: .54rem;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }
    .firstbottom{
      width: 100%;
      display: flex;
      justify-content: space-around;
      .left{
        width: 60%;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ffffff;
      }
      .right{
        width: 20%;
      }
    }
  }
  .second{
    background-image: linear-gradient(90deg,
      #464646 0%,
      #565656 100%);
    box-shadow: 0px 0px 50px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    .firsttop{
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom: .4rem;
      .left{
        width: 60%;
        font-size:19px;
        font-weight: 500;
        font-stretch: normal;
        line-height: 21px;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
      }
      .right{
        width: 20%;
        .button{
          width: 2.56rem;
          height: 1.1rem;
          line-height: 1.1rem;
          background-color: #4f4f4f;
          border-radius: 4px;
          border: solid 1px #ffffff;
          text-align: center;
          font-size: .54rem;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }
    .firstbottom{
      width: 100%;
      display: flex;
      justify-content: space-around;
      .left{
        width: 60%;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ffffff;
      }
      .right{
        width: 20%;
      }
    }

  }
  .third{
    background-image: linear-gradient(90deg,
      #b5cfff 0%,
      #cbe4ff 100%);
    box-shadow: 0px 0px 50px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    .firsttop{
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom: .4rem;
      .left{
        width: 60%;
        font-size:19px;
        font-weight: 500;
        font-stretch: normal;
        line-height: 21px;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
      }
      .right{
        width: 20%;
        .button{
          width: 2.56rem;
          height: 1.1rem;
          line-height: 1.1rem;
          border-radius: 4px;
          text-align: center;
          font-size: .54rem;
          letter-spacing: 2px;
          color: #408ce2;
          background-color: #c2dcff;
          border: solid 1px #408ce2;
        }
      }
    }
    .firstbottom{
      width: 100%;
      display: flex;
      justify-content: space-around;
      .left{
        width: 60%;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #ffffff;
      }
      .right{
        width: 20%;
      }
    }
  }
}
</style>
