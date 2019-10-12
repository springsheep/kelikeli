<template>
  <div style="width: 100%;background:#ffffff " class="Roadassistance">
    <div v-for="(item , index ) in arr" :key="index" @click="choose(item)" style="padding-left: .4rem">
      <mt-field :label="item.name" readonly="readonly" style="color: #333333">
        <img src="../assets/32.png" style="height: .6rem"/>
      </mt-field>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    name: "kaka_Roadassistance",
    created() {

      this.getinfo()
    }, data() {
      return {
        arr: null
      }
    },
    methods: {
      choose(m) {
        this.$store.state.saveInfo = m;
        this.$router.push({path: '/kaka_RoadassistanceInfo'})
      },
      getinfo() {
        Indicator.open({
          text: '数据加载中...',
        });
        this.axios.post('moveCarB/roadRescue', {}).then((res) => {
          Indicator.close();
          if (res.data.state == 1) {
            this.arr = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .Roadassistance .mint-field .mint-cell-title {
    width: 300px;
    font-size: .64rem;
  }
  .Roadassistance .mint-cell-wrapper{
    padding-left: 0;
  }


</style>
