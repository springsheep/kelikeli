<template>
  <div class="home">
    <div style="" class="brand">
      <img :src="imgPath" style="height: 1rem;width: 1rem">
      <!--<img :src="item.imgPath" alt="" style="height: 1rem;width: 1rem">-->
      <span class="content">{{name}}</span>
    </div>
    <div style=""  v-for="item in arr" class="brand" @click="choose(item)">
      <!--<mt-field :label="item.name" readonly="readonly" style="color: #333333">-->
        <!--<img src="../assets/32.png" style="height: .6rem"/>-->
        <!--&lt;!&ndash;<a :href="'tel:' + 120"><img src="../assets/phone.png" style="height:.8rem" /></a>&ndash;&gt;-->
      <!--</mt-field>-->
      {{item.name}}
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "kaka_carBrandkind", data() {
      return {
        arr: null,
        openId: sessionStorage.getItem('openId'),
        pid: null,
        imgPath: null,
        name: null
      }
    },
    mounted() {
      this.pid = this.$store.state.carBrandkind.id;
      this.imgPath = this.$store.state.carBrand.imgPath
      this.name = this.$store.state.carBrandkind.name
      // console.log(this.$store.state.carBrandkind)
      this.getinfo()
    },
    methods: {
      getinfo() {
        Indicator.open({
          text: '加载中...',
        });
        this.axios.post('moveCarB/getCarBrandModel', {
          "openId": this.openId,
          "flag": 2,
          "pid": this.pid
        }).then((res) => {
          Indicator.close();
          if (res.data.state == 1) {
            // console.log(res.data)
            this.arr = res.data.data
            // Toast('数据加载成功');
          } else {
            Toast(res.data.retMsg);
          }
        })
      },choose(m){
        this.$store.state.carbrandname=m.name
        this.$router.push({path:'/kaka_askmove'})
      }
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
    }
  }

</style>
<style>

</style>
