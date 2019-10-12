<template>
  <div class="content">
    <input type="file" id="choose1" accept="image/*"
           @change="getFile1"
           style="position: fixed;left: 1000rem"
           ref="file">

    <input type="file" id="choose" accept="image/*"
           @change="getFile"
           style="position: fixed;left: 1000rem"
           ref="file">
    <div class="title">请拍摄行驶证正反面，保证全张入镜</div>
    <div class="one">
      <label for="choose1" >
      <div class="img">
        <img src="../assets/49.png" alt="" v-if="src==null">
        <img :src="src" alt="" v-else>
        <div class="mask" v-if="src==null">
            <div class="photo">
              <img src="../assets/51.png" alt="">
            </div>

          <div class="maskbottom">
            拍摄行驶证主页
          </div>
        </div>
      </div>
      </label>
    </div>
    <div class="one">
      <label for="choose" >
      <div class="img">
        <img src="../assets/50.png" alt="" v-if="src1==null">

        <img :src="src1" alt="" v-else>
        <div class="mask" v-if="src1==null">

            <div class="photo">
              <img src="../assets/51.png" alt="">
            </div>

          <div class="maskbottom">
            拍摄行驶证副页
          </div>
        </div>
      </div>
      </label>
    </div>
    <div class="bottom">码上挪车会保护您的信息安全</div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    name: "kaka_license",

  data(){
      return{
        src:null,
        src1:null,
        file:null,
        file1:null,
        openId: sessionStorage.getItem('openId'),
      }
  },created() {
      this.getinfo1()
    },
    methods: {
      //二维码上传预览
      getFile(e) {
        Indicator.open('证件上传中...');
        let _this = this;
        var files = e.target.files[0];
        this.file=files
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.getinfo(files,1)
        }
      },getFile1(e) {
        Indicator.open('证件上传中...');
        let _this = this;
        var files = e.target.files[0];
        this.file=files
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.getinfo(files,0)
        }
      },
      getinfo(file,type){
        console.log(file)
        var formData = new FormData();
        formData.append("image", file);
        formData.append("openId", this.openId);
        formData.append("type", type);
        const option={
          method: 'POST',
          url:'credentials/upload',
          data:formData
        };    this.axios(option).then((res)=>{
          Indicator.close();
          if(res.data.state==1){
            if(type==2){
              Toast('行驶证主页识别成功');
            }else {
              Toast('行驶证副页识别成功');
            }

          }else {
            Toast(res.data.retMsg);
          }
        })
      } ,
      //初始化
      getinfo1(){
        this.axios.post('credentials/details',{
          "openId":this.openId,
          "type":"0"
        }).then((res)=>{
          if(res.data.state==1){
            this.src=res.data.data.frontImage;
            this.src1=res.data.data.backImage;
            console.log(this.src)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    padding-top: 1.0453rem;
    box-sizing: border-box;

    .title {
      width: 100%;
      text-align: center;
      height: .65rem;
      font-family: PingFang-SC-Regular;
      font-size: .64rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: .81rem;
      letter-spacing: 0px;
      color: #666666;

    }

    .one {
      width: 13.23rem;
      height: 8.533rem;
      background-color: #ffffff;
      border-radius: .34rem;
      border: dotted 1px #32b6a2;
      margin: 1.28rem auto;
      display: flex;
      align-items: center;
      justify-content: center;

      .img {
        width: 12.8rem;
        height: 8.11rem;
        position: relative;

        .mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 12.8rem;
          height: 8.11rem;
          background: rgba(255, 255, 255, 0.8);

          .photo {
            width: 3.413rem;
            height: 3.413rem;
            background-color: #000000;
            opacity: 0.6;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 40px;
              height: 34px;
            }
          }

          .maskbottom {
            height: .725rem;
            text-align: center;
            font-family: PingFang-SC-Medium;
            font-size: .768rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: .661rem;
            letter-spacing: 0px;
            color: #333333;
            margin-top: .64rem;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .bottom {
      width: 100%;
      text-align: center;
      font-family: PingFang-SC-Regular;
      font-size: .555rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: .905rem;
      letter-spacing: 0px;
      color: #999999;
      margin: 0 auto;
      margin-top: 2.4745rem;
    }
  }


</style>
