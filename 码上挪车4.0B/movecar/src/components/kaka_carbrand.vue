<template>
  <div class="home">
    <div style="" class="brand">
      <img :src="imgPath" style="height:auto;width: 1rem">
      <span class="content">{{name}}</span>
    </div>
    <mt-index-list :show-indicator="false">
      <mt-index-section :index="key" v-for="(value,key) in arr" :key="key">
        <div style="" class="brand" v-for="(item,index) in value" @click="choose(item)" :key="index">
          <span class="content">{{item.name}}</span>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_carbrand", data() {
      return {
        arr: null,
        openId: sessionStorage.getItem('openId'),
        pid: null,
        imgPath: null,
        name: null
      }
    },
    mounted() {
      this.pid = this.$store.state.carBrand.id;
      this.imgPath = this.$store.state.carBrand.imgPath
      this.name = this.$store.state.carBrand.name
      this.getinfo()
    },
    methods: {
      choose(m){
        this.$store.state.carbrandname=this.$store.state.carBrand.name+'-'+m.name
        this.$router.go(-2)
      },
      getinfo() {
        Indicator.open({
          text: '加载中...',
        });
        this.axios.post('moveCarB/getCarBrandModel', {
          "openId": this.openId,
          "flag": 1,
          "pid": this.pid
        }).then((res) => {
          Indicator.close();
          if (res.data.state == 1) {

            this.arr = res.data.data
            // console.log(res.data.data)
            // Toast('数据加载成功');
          } else {
            Toast(res.data.retMsg);
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .home {
    width: 100%;
    height: 100%;
    background: #f1f1f1;
  }

  .brand {
    border: 1px solid #f1f1f1;
    color: #666666;
    line-height: 2rem;
    min-height: 2rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-left: .4rem;

    .content {
      margin-left: .4rem;
      font-size: .64rem;
    }
  }

</style>
