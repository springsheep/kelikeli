<template>
  <div class="content ">
   <div style="display: flex;line-height: 2rem;font-size: .64rem;height: 2rem">
     <van-divider />
     <div style="display: flex;align-items: center;padding-left: .64rem">
       <img src="../assets/95.png" style="width: .64rem">
     </div>
     <input type="text" style="font-size: .64rem;width: 90%;border: 0;padding-left: .5rem" placeholder="搜索保险公司" class="kkk" v-model="search">
   </div>
    <van-grid :column-num="4">
      <van-grid-item
        v-for="(value,index) in items"
        :key="index"
        :icon="value.logo"
        :text="value.name"
        :url="value.policyUrl"
        :clickable="true"
      />
    </van-grid>
  </div>
</template>

<script>
  export default {
    name: "kaka_ElectronicPolicy"
    ,computed: {
      //过滤方法
      items: function() {
        var _search = this.search;
        if (_search) {
          //不区分大小写处理
          var reg = new RegExp(_search, 'ig')
          //es6 filter过滤匹配，有则返回当前，无则返回所有
          return this.arr3.filter(function(e) {
            //匹配所有字段
            return Object.keys(e).some(function(key) {
              return e[key].match(reg);
            })
          })
        };
        return this.arr3;
      }
    },
    data() {
      return {
        search:'',
        popupVisible: false,
        value2: '', arr3: [],
        result: [],
        arr: [],
        a: null, b: null, c: null,
        show:null,
        num:null
      }
    },
    methods: {
      moveend(m) {
        this.show=2
        this.num=m
        console.log(m)
        window.location.href=`${this.arr3[m].policyUrl}`
      },
      getinfo(){
        this.axios.post('moveCar/getInsurerInfos').then((res)=>{
          if(res.data.state==1){
            this.arr3=res.data.data
          }
        })
      }
    }, created() {
      this.getinfo()
    }
  }
</script>

<style scoped lang="scss">
  .kkk::placeholder{
    font-size: .64rem;
  }
  .pp{
    background: #f1f1f1 !important;
  }
  .content {
    width: 100%;
    height: 100%;
    padding-bottom: .64rem;
    background: #ffffff;
  }

</style>
<style lang="scss">
 .m .mint-cell-wrapper{
border-bottom: 0;
   color: #666666;
 }
 .van-icon__image{
   width: 2.8rem !important;
 }
 .van-grid-item__text{
   font-size: 3.5vw !important;
 }
</style>
