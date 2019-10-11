<template>

  <div class="posFixed">
    <div class="posFixed " @click="closePreviewImg">


    </div>
    <div class="big-img-box">
      <video  controls="controls"  v-if="/^(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/.test(previewImgUrl.split('.').pop())">
        <source :src="previewImgUrl" type="video/mp4"></source>
      </video>
      <img v-else :src="previewImgUrl" alt="">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "preview-image",
    computed: {
      previewImgUrl() {
        return this.$store.state.previewImgUrl;
      },
    },
    methods: {
      closePreviewImg() {
        this.$store.commit('HIDE_PREVIEW_IMG');
      },

    }

  }
</script>

<style scoped>
  /*.big-img-box {*/
    /*cursor: pointer;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  /*}*/
  .posFixed{
    cursor: pointer;
  }

  .big-img-box img, .big-img-box video {
    max-width: 80%;
    max-height: 80%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;
  }
</style>
