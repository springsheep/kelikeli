<template>
  <div>
    <yd-search :result="result" fullpage v-model="value2" :item-click="itemClickHandler"
               :on-submit="submitHandler"></yd-search>
    <mt-index-list>
      <mt-index-section :index="key" v-for="(value,key) in arr" :key="key">
        <div style="" class="brand" v-for="(item,index) in value" @click="choose(item)" :key="index">
          <img v-lazy.container="item.imgPath" style="height: auto;width: 1rem">
          <!--<img :src="item.imgPath" alt="" style="height: 1rem;width: 1rem">-->
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
    name: "kaka_VehicleBrand", data() {
      return {
        openId: sessionStorage.getItem('openId'),
        value2: '',
        result: [],
        arr: [],
        arr1:[],arr2:[]
      }
    },
    created() {
      this.getinfo()
    },
    methods: {
      choose(carbarnd) {
        this.$store.state.carBrand = carbarnd;
        this.$router.push({path:'/kaka_carbrand'})
      },
      getinfo() {
        Indicator.open({
          text: '加载中...',
        });
        this.axios.post('moveCarB/getCarBrandModel', {
          "openId": this.openId,
          "flag": 0,
        }).then((res) => {
          Indicator.close();
          if (res.data.state == 1) {
            this.arr = res.data.data
            for (let i in Object.values(this.arr)){
              for(let j in Object.values(this.arr)[i]){
                let Obj={
                  name:Object.values(this.arr)[i][j].name,
                  obj:Object.values(this.arr)[i][j]
                }
                this.arr1.push(Obj)
                this.arr2.push(Object.values(this.arr)[i][j].name)
              }
            }
            Toast('数据加载成功');
            console.log(this.arr1)
          } else {
            Toast(res.data.retMsg);
          }
        })
      },
      getResult(val) {
        return this.arr2.filter(value => new RegExp(val, 'i').test(value));
      },
      itemClickHandler(item) {
        for(let i in this.arr1){
          if(this.arr1[i].name==item){
            console.log(this.arr1[i].obj)
            this.$store.state.carBrand = this.arr1[i].obj;
            this.$router.push({path:'/kaka_carbrand'})
          }
        }
      },
      submitHandler(value) {
        this.$dialog.toast({mes: `搜索：${value}`});
      }
    },
    watch: {
      value2(val) {
        this.result = this.getResult(val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .brand {
    border-bottom: 1px solid #f1f1f1;
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

  .brand:nth-child(1) {
    border-top: 1px solid #f1f1f1 !important;
  }
</style>
