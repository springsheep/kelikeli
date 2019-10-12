<template>
    <div class="content">
      <div class="head"><img src="../assets/five.png" height="300" width="750"/></div>
      <div class="second">
        <div><img src="../assets/7.png" /></div>
        <div><img src="../assets/10.png" /></div>
      </div>
      <div class="three"><img src="../assets/8.png" /></div>
      <div class="four"><img src="../assets/9.png" /></div>
    </div>
</template>

<script>
    export default {
        name: "kaka_buypicc",

    }
</script>

<style scoped>
  div{
    font-size: 0;
  }
  img{
    width: 100%;
    height: 100%;
  }
.content{
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
  .head{
    width: 100%;
    height: 25%;
  }
  .second{
    height: 16%;
    width: 93.3%;
    border-radius: .34rem;
    margin: 0 auto;
    margin-top: .5rem;
    display: flex;
    justify-content: space-between;

  }
  .second div{
    width: 48.897%;
    height: 100%;
    border-radius: .34rem;
    box-shadow: 0 2px 10px #999999;

  }
  .three{
    height: 24.534%;
    width: 93.3%;
    margin: .5rem auto;
    border-radius: .34rem;
    box-shadow: 0 2px 10px #999999;
  }
.four{
  height: 12.85%;
  width: 93.3%;
  margin: 0 auto;
  border-radius: .34rem;
  box-shadow: 0 2px 10px #999999;
}
</style>
