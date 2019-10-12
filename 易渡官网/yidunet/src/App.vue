<template>
  <div id="app">
   <div><router-view></router-view>
   </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app{
  width: 100%;
  min-width: 854px;
  /*max-width: 1300px !important;*/
}
</style>
