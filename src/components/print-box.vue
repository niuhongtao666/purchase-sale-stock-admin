<template>
  <div class="mask-layer">
    <div class="container">
      <!--<div class="el-icon-close" @click="close"></div>-->
      <div class="print-wrap">
        <vue-easy-print tableShow ref="easyPrint">
          <slot></slot>
        </vue-easy-print>
      </div>
      <div class="btn-box">
        <button class="btn" @click="printDemo">打印</button>
        <button class="btn" @click="pdfPrin" v-if="pdfPrint">pdf打印</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
  import vueEasyPrint from "vue-easy-print";

  export default {
    name: "print-box",
    components: {
      vueEasyPrint
    },
    props:{
      pdfPrint:Boolean
    },
    methods: {
      printDemo() {
        this.$refs.easyPrint.print()
      },
      close() {
        this.$emit('hidePrintMask');
      },
      pdfPrin(){
        if(this.pdfPrint){
          this.$emit('printTest');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mask-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 120;
  }

  .container {
    width: 1200px;
    background-color: #fff;
    position: relative;
    font-size: 14px;
    color: #333;
    .el-icon-close {
      position: absolute;
      right: -20px;
      top: -20px;
    }
    .table tbody td, .table thead th {
      font-size: 14px;
      color: #333;
    }
    .table tr, .table th, .table td {
      border: 1px solid #4a4a4a;
    }
    .print-wrap {
      overflow-y: auto;
      max-height: 512px;
      color: #000!important;
      font-family: '宋体';
    }
    .btn-box {
      padding: 10px 0;
      border-top: 1px solid #f2f2f2;
      .btn{
        margin: 0 10px;
      }
    }
  }

</style>
