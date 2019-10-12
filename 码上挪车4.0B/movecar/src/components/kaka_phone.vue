<template>
  <div class="content">
    <div>
      <!--<van-cell-group>-->
        <!--<van-field-->
          <!--v-model="location"-->
          <!--label="当前位置"-->
          <!--type="textarea"-->
          <!--rows="1"-->
          <!--readonly="readonly"-->
          <!--autosize>-->
        <!--</van-field>-->
        <!--<van-field-->
          <!--v-model="carNo"-->
          <!--type="text"-->
          <!--label="车牌号码"-->
          <!--readonly="readonly"-->
        <!--/>-->
        <!--<van-field-->
          <!--v-model="carAttributionAddress"-->
          <!--type="text"-->
          <!--label="车辆归属地"-->
          <!--readonly="readonly"-->
        <!--/>-->
        <!--<van-field-->
          <!--v-model="carBrand"-->
          <!--type="text"-->
          <!--label="车型品牌"-->
          <!--readonly="readonly"-->
        <!--/>-->
      <!--</van-cell-group>-->
      <mt-field label="当前位置" :placeholder="location" readonly="readonly" style="color: #666666"></mt-field>
      <mt-field label="车牌号码" :placeholder="carNo" readonly="readonly" style="color: #666666"></mt-field>
      <mt-field label="车辆归属地" :placeholder="carAttributionAddress"   readonly="readonly" style="color: #666666"></mt-field>
      <mt-field label="车型品牌" readonly="readonly" style="color: #666666" :placeholder="carBrand"></mt-field>
    </div>
    <div style="margin-top: 10px;color: #333333">

      <!--<mt-field label="车身颜色" readonly="readonly" style="color: #666666" :placeholder="carColor"></mt-field>-->
    </div>
    <div class="photo">
      <div class="photo_title">相关照片（两张照片，包括一张车牌号码，一张挡道全景照）</div>
      <div class="photo_photo">
        <label for="choose1" style="">
          <div class="img">
            <img src="../assets/46.png" v-if="src22==null" alt=""
                 style="width: 1.2rem;height: 1rem;margin-bottom: .5rem">
            <div style="color: #666666;font-size: .64rem" v-if="src22==null">车牌号码</div>
            <img :src="src22" alt="" v-if="src22!=null">
          </div>
        </label>
        <label for="choose" style="">
          <div class="img">
            <img src="../assets/46.png" v-if="src11==null" alt=""
                 style="width: 1.2rem;height: 1rem;margin-bottom: .5rem">
            <div style="color: #666666;font-size: .64rem" v-if="src11==null">全景照片</div>
            <img :src="src11" alt="" v-if="src11!=null">
          </div>
        </label>
        <div class="img" v-for="item in src">

        </div>


      </div>
    </div>
    <div class="photo_title">*现场照片能在发生纠纷时成为有力证据</div>
    <div class="footbutton" :class="{background1:buttonstate==1,background2:buttonstate!=1}">
      <button @click="actieve" style="line-height: 100%;font-size: .68rem;color: #FFFFFF;width: 90%;border: 0 "
              v-if="phone=='呼叫车主'">
        {{phone}}
      </button>
      <a :href="'tel:' + phone" v-if="phone!='呼叫车主'" @click="ooooo"
         style="display: inline-block;width: 100%;text-decoration: none;color: #FFFFFF">
        点击拨打</a>
    </div>
    <input type="file" id="choose" accept="image/*" capture="camera"
           @change="getFile"
           style="position: fixed;left: 1000rem"
           ref="file">
    <input type="file" id="choose1" accept="image/*" capture="camera"
           @change="getFile1"
           style="position: fixed;left: 1000rem"
           ref="file">

  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import {Icon} from 'vant';

  export default {
    name: "kaka_phone",
    data() {
      return {

        carBrand: JSON.parse(sessionStorage.getItem('bindcarinfo')).carBrand,
        // carColor:JSON.parse(sessionStorage.getItem('bindcarinfo')).carColor,
        carNo: JSON.parse(sessionStorage.getItem('bindcarinfo')).carNo,
        location: this.$store.state.location,
        carAttributionAddress: JSON.parse(sessionStorage.getItem('bindcarinfo')).carAttributionAddress,
        src: [],
        imgdata: [],
        openId: sessionStorage.getItem('openId'),
        phone: '呼叫车主',//获取到的手机号码
        phone1: null,//加密后的号码
        src1: null,
        src2: null,
        src11: null,
        src22: null,
        imageId: [null, null],
        buttonstate: null,
      }

    },
    watch: {
      imageId() {
        if (imageId[0] != null) {
        }
      }
    },
    methods: {

      //点击获取对方电话号码
      actieve() {
        if (this.buttonstate == 1) {
          Indicator.open({
            text: '号码获取中...',
          });
          var formData = new FormData();
          for (let i in this.imgdata) {
            formData.append("carImages", this.imgdata[i])
          }
          formData.append("qrCode", sessionStorage.getItem('qrcode'));
          formData.append("openId", this.openId);
          formData.append("address", this.location);
          const option = {
            method: 'POST',
            url: 'moveCarB/getCarOwnerMobilePhoneNo',
            data: {
              "carNo": this.carNo,
              "openId": this.openId,
              "address": this.location,
              "imageId": this.imageId
            }
          };
          this.axios(option).then((res) => {
            Indicator.close();
            if (res.data.state == 1) {
              Toast('获取号码成功');
              this.phone = res.data.data.mobilePhoneNo;
              this.phone1 = res.data.data.mobilePhoneNo.substring(0, 3) + '****' + res.data.data.mobilePhoneNo.substring(7, 11)
            } else {
              Toast(res.data.retMsg);
            }
          })
        } else {
          Toast('请先上传相关照片');
        }
      },//车牌上传
      getFile1(e) {
        let _this = this;
        Indicator.open('车牌验证中...');
        if (e.target.files) {
          // lrz(file,[ options ])
          lrz(e.target.files[0], {quality: 0.5})
            .then(function (rst) {
              //成功时执行
              console.log(rst)
              _this.src2 = rst.base64;
              _this.yanzheng(rst.file, 0)
            }).catch(function (error) {
            //失败时执行
          }).always(function () {
            e.target.value = null; //清空上传value的值
          })
        }
        ;
        // Indicator.open('头像上传中...');
        // let _this = this;
        // var files = e.target.files[0];
        // console.log(files.size)
        //
        // this.imgdata.push(files)
        // if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        // let reader = new FileReader();
        // reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        // reader.onloadend = function () {
        //   _this.src2 = this.result;
        //   Indicator.open('车牌号上传中...');
        //   _this.yanzheng(files, 0)
        // }

      },
      //二维码上传预览
      getFile(e) {
        let _this = this;
        Indicator.open('场景验证中...');
        if (e.target.files) {
          // lrz(file,[ options ])
          lrz(e.target.files[0], {quality: 0.5})
            .then(function (rst) {
              //成功时执行
              // console.log(rst)
              _this.src1 = rst.base64;
              _this.yanzheng(rst.file, 1)
              // console.log(成功)
            }).catch(function (error) {
            // console.log(error)
            //失败时执行
          }).always(function () {
            //不管成功或失败，都会执行
            e.target.value = null; //清空上传value的值
          })
        };

        // var files = e.target.files[0];
        // console.log(e.target)
        // this.imgdata.push(files)
        // if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        // let reader = new FileReader();
        // reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        // reader.onloadend = function () {
        //   _this.src1 = this.result;
        //   // Indicator.open('场景上传中...');
        //   // _this.yanzheng(files,1)
        //   console.log(_this.src1.length)
        // }
      },
      yanzheng(carImage, flag) {
        var formData = new FormData();
        formData.append("carImage", carImage);
        formData.append("openId", this.openId);
        formData.append("flag", flag);
        formData.append("carNo", this.carNo);
        const option = {
          method: 'POST',
          url: 'moveCarB/moveCarSceneImageUpload',
          data: formData
        };
        this.axios(option).then((res) => {
          Indicator.close();
          if (res.data.state == 1) {
            // console.log(res.data.data)
            if (flag == 0) {
              Toast('车牌号验证成功');
              this.src22 = this.src2
              this.imageId[0] = res.data.data.id
              if (this.imageId[0] != null && this.imageId[1] != null) {
                this.buttonstate = 1
              }
            } else {
              Toast('车辆挡道验证成功');
              this.src11 = this.src1
              this.imageId[1] = res.data.data.id
              if (this.imageId[0] != null && this.imageId[1] != null) {
                this.buttonstate = 1
              }
            }
          } else {
            Toast(res.data.retMsg,111);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .background1 {
    background-color: #04c8af;
  }

  .background2 {
    background-color: #999999;
  }

  .footbutton {
    line-height: 1.877rem;
    height: 1.877rem;
    width: 93.3%;
    margin: 0 auto;
    text-align: center;
    color: #FFFFFF;
    font-size: .768rem;
    margin-top: .64rem;
    border-radius: 3rem;
  }

  .photo {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: .3rem;
    padding-bottom: .6rem;
  }

  .photo_title {
    height: 1.6rem;
    font-size: .55rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.6rem;
    color: #666666;
    padding-left: .4rem;
  }

  .photo_photo {
    display: flex;
    height: 4rem;
    margin-left: .1rem;
  }

  .img {
    width: 4rem;
    height: 4rem;
    /*background: red;*/
    margin-left: .4rem;
    border: 1px dotted black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: .2rem;
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .content {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }
</style>
<style>
  .mint-field-other {
    color: #333333;
    font-size: .64rem;
  }

  .mint-field-core::placeholder {
    color: #333333;
    font-size: .64rem;
  }

  .van-cell {
    font-size: .64rem;
    padding: .42rem .44rem;

  }

  /*.van-field__label {*/
    /*color: #666666;*/
    /*width: 4rem;*/
    /*display: flex;*/
    /*align-items: center;*/
  /*}*/

  /*.van-field__label span {*/
    /*height: auto;*/
    /*!*line-height: normal;*!*/
  /*}*/

  /*.van-field__control {*/
    /*color: #333333;*/
  /*}*/
</style>
