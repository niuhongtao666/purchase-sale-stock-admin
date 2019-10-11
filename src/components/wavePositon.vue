<template>
  <div>
    <div class="zzc">
      <div class="waves">
        <div class="positions">
          <div v-for="(item,index) in locationLists">
            {{item.locationName}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"positions",
    props:['locationLists']
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/cover.css';
  .waves{
    display: flex;
    justify-content: center;
    align-items: center;
    .positions{
      width: 200px;
      height: 700px;
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      overflow: auto;
    }
  }
</style>
