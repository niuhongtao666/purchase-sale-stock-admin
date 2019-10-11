<template>
  <div class="home">

    <div class="greet">
      <h1>welcome！</h1>
      <p class="">你好，</p>
      <p>欢迎登录进销存系统</p>
    </div>
    <img src="../assets/images/bg/banner.png" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {


    },

  }
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    text-align: left;
    .greet {
      margin : 0 100px 0 100px;
      h1{
        font-size: 94px;
      }
      p{
        font-size: 34px;
      }
    }
    img {
      height: 100%;

    }
  }
</style>
