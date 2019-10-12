<template>
  <div style="width: 100%;height: 100%">
    123
    <div class="mask">
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "test"
    }
</script>

<style scoped lang="scss">
.mask{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    width:80%;
    height: 80vw;
    background: white ;
    border-radius: 5vw;
    box-shadow: 0 0 15px rgba(255,255,255,0.5);
  }

}
</style>
