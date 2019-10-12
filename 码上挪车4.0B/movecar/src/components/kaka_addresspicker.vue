<template>
  <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=MTABZ-CULEV-PHAPY-UWQ4M-WVGH7-7LBTU&referer=myapp">
  </iframe>
</template>

<script>

  export default {
    name: "kaka_addresspicker", data() {
      return {
        location1: null
      }
    },
    mounted() {
      var _this = this
      window.addEventListener('message', function (event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          // console.log(_this.$store.state.location,11,loc)
          if (loc.poiname == '我的位置') {
            _this.$store.state.location = loc.poiaddress;
            _this.$router.push({path: '/kaka_intomovecar'})
          } else {
            _this.$store.state.location = loc.poiname;
            _this.$router.push({path: '/kaka_intomovecar'})
          }
        }
      }, false);
    }
  }
</script>

<style scoped>

</style>
