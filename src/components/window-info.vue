<template>
    <div class="timely-rain-card">
      <div class="column-left"></div>
      <div class="column-center">
        <div class="row">
          <span>徐辉寰</span>
          <lable>
            13565272782
          </lable>
        </div>
        <div class="row">

        </div>
        <div class="row">
          <span>450</span>
          <lable>
            87.5%
          </lable>
        </div>
        <div class="row">
          <span>北京东区</span>
        </div>
      </div>
      <div class="column-right"></div>
    </div>
</template>

<script>
    export default {
        name: "window-info"
    }
</script>

<style scoped lang="scss">
.window-info{
  display: flex;
  padding: 10px;
  .column-left{
    width: 40px;
  }
  .column-right{
    width: 18px;
  }

}
</style>
