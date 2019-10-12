<template>
  <div style="width: 100%;height: 100%;background:#f1f1f1 " class="EmergencyAlarm">
    <mt-field label="120" placeholder='人伤急救电话' readonly="readonly" style="color: #333333" >
      <a :href="'tel:' + 120"><img src="../assets/phone.png" style="height:.8rem" /></a>
    </mt-field>
    <mt-field label="122" placeholder='路面交通事故报警电话' readonly="readonly" style="color: #333333" >
      <a :href="'tel:' + 122"><img src="../assets/phone.png" style="height:.8rem" /></a>
    </mt-field>
    <mt-field label="12122" placeholder='高速公路事故报警电话' readonly="readonly" style="color: #333333" >
      <a :href="'tel:' + 12122"><img src="../assets/phone.png" style="height:.8rem" /></a>
    </mt-field>
  </div>
</template>

<script>
    export default {
        name: "kaka_EmergencyAlarm"
    }
</script>

<style scoped>

</style>
<style>
  .EmergencyAlarm .mint-field .mint-cell-title{
    width: 74px;
  }
  .EmergencyAlarm .mint-field ::placeholder{
    color: #333333;
  }
</style>
