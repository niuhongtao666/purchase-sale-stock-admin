<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品采购退货单</h2>
        </div>
        <div class="print-content">
          <div class="item-group mb-10">
            <span class="printset">采购单号：{{data.purchaseReturnInfo.purchaseOrderNo}}</span>
            <span class="printset">退货单号：{{data.purchaseReturnInfo.purchaseReturnNo}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset" style="width: 10%!important">退货门店：{{data.purchaseReturnInfo.storeName}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset textr">退货人：{{data.purchaseReturnInfo.createUserName}}</span>
          </div>
          <!--<div class="item-group mb-10">-->
            <!--<span class="printset">采购单号：{{data.purchaseReturnInfo.purchaseOrderNo}}</span>-->
            <!--<span class="flex1"></span>-->
            <!--<span class="printset">供应商：{{data.purchaseReturnInfo.supplierName}}</span>-->
            <!--<span class="flex1"></span>-->
            <!--<span class="printset"></span>-->
          <!--</div>-->
          <div class="item mb-10 setCenter table-unset printZone">
            <table class="table " cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th style="min-width:49px">序号</th>
                <th style="min-width: 155px">商品编号</th>
                <th style="min-width: 155px">商品名称</th>
                <th style="min-width: 155px">商品品牌</th>
                <th style="min-width:100px">单位</th>
                <th style="min-width:45px">退货数量</th>
                <th style="min-width: 100px">退货单价</th>
                <th style="min-width: 80px">退货总价</th>
                <th style="min-width:130px">仓库</th>
                <th style="min-width:130px">库位</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index" style="text-align: center;">
                <td>{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td>{{data.returnNum}}</td>
                <td>{{data.unitPrice}}</td>
                <td>{{data.totalPrice | decimalTofixed2}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.locationName}}</td>
              </tr>
              <tr style="text-align: center;" v-if="page==pages">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>合计数量：</td>
                <td>{{data.purchaseReturnInfo.returnTotalNum}}</td>
                <td>合计金额：</td>
                <td>{{data.purchaseReturnInfo.returnTotalPrice | decimalTofixed2}}</td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="printTime">
          打印人:{{printPerson}}&nbsp;&nbsp;打印时间:{{printTime}}
        </div>
      </div>
   </div>
  </div>

</template>

<script>
  export default {
    name: 'procurementApplicationPrint',
    props:{
      data:Object,
      // 每页多少行
      // 是否插入空白行
      blankLines: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        onePageRow:23,
      }
    },
    watch:{

    },
    computed:{
      printPerson(){
        var userInfos=JSON.parse(localStorage.getItem('userInfos'));
        var userName=userInfos['name'];
        return userName;
      },
      printTime(){
        var time=new Date();
        var today=this.AppUtils.formatDateToSecond(time);
        return today;
      },
      pages() {
        var arr=this.data.purchaseReturnDetails;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        pages_ <= 0 ? 1 : pages_;
        // alert(this.numPrint)
        return pages_;
      },
      allData(){
        return this.data.purchaseReturnDetails;
      },
    },
    mounted() {
    },
    methods: {
      close() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .printset{
    /*flex: 2;*/
    font-size: 16px;
    width: 25%;
    font-weight: 500;
    white-space:nowrap;
  }
  .printTime{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    margin-bottom: 30px!important;
  }
  .zone{
    /*position: relative;*/
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .tab_company_out {
    text-align: center;
    /*width:100%;*/
    /*margin: auto;*/
    page-break-after: always;
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .table {
    width: 900px;
    margin: 0 auto;
  }
  .table thead th{
    font-size: 16px;
    color: #333;
    /*line-height: 30px;*/
  }
  .table tbody td{
    font-size: 16px;
    color: #333;
    /*line-height: 30px;*/
  }
  .table tr, .table th, .table td {
    border: 1px solid #4a4a4a;
  }
  .title {
    font-size: 25px;
    height: 50px;
    line-height: 50px;
    margin-top: 0px;
    margin-bottom: 10px;
    text-align: center;
  }
  .print-content {
    width: 100%;
  }
  .remark {
    padding: 5px 0 ;
    p{
      white-space: initial;

    }
  }
  .item-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 0 36px;*/
    .group {
      align-items: center;
      flex: 1;
      .left {
        width: auto;
      }
    }
    .group1{
      flex: 1;
      text-align: left;
      font-weight: 500;
      white-space: nowrap;
    }
    .group2{
      flex: 1;
      text-align: center;
      font-weight: 500;
      white-space: nowrap;
    }
    .group3{
      flex: 1;
      white-space: nowrap;
      font-weight: 500;
      text-align: right;
    }
  }
  .print-footer {
    text-align: right;
    span {
      margin-left: 20px;
    }
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .ti10{
    text-indent: -8px;
  }
  .ti50{
    text-indent: 67px;
  }
  .ti205{
    text-indent: 256px;
  }
  .ti132{
    text-indent: 132px;
  }
  .ti74{
    text-indent: 112px;
  }
  @media print {
    .printset{
      /*flex: 2;*/
      width: 25%;
      font-size: 16px;
      font-weight: 500;
      white-space:nowrap;
    }
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 14px;
      margin-bottom: 30px!important;
    }
    .ti10{
      text-indent: -5px;
    }
    .ti132{
      text-indent: 218px;
    }
    .ti74{
      text-indent: 110px;
    }
    .ti50{
      text-indent: 80px;
    }
    .ti205{
      text-indent: 240px;
    }
    .zone{
      display: flex;
      justify-content: center;
    }
    .tab_company_out {
      text-align: center;
      /*width: 100%;*/
      margin: auto;
      page-break-after: always;
    }
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .table {
      width:1100px;
      /*margin: 0 auto;*/
    }
    .table thead th{
      font-size: 16px;
      color: #333;
      /*line-height: 30px;*/
    }
    .table tbody td{
      font-size: 16px;
      color: #333;
      /*line-height: 30px;*/
    }

    .table tr, .table th, .table td {
      border: 1px solid #4a4a4a;
    }
    /*.title {*/
      /*font-size: 25px;*/
      /*height: 60px;*/
      /*line-height: 60px;*/
      /*margin-bottom: 20px;*/
      /*text-align: center;*/
    /*}*/
    .title {
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      margin-top: 0px;
      margin-bottom: 10px;
      text-align: center;
    }
    .print-content {
      width: 100%;
    }
    .remark {
      padding: 5px 0 ;
      p{
        white-space: initial;

      }
    }
    .item-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*padding: 0 36px;*/
      .group {
        align-items: center;
        flex: 1;
        .left {
          width: auto;
        }
      }
      .group1{
        flex: 1;
        font-weight: 500;
        text-align: left;
        white-space: nowrap;
      }
      .group2{
        font-weight: 500;
        flex: 1;
        text-align: center;
        white-space: nowrap;
      }
      .group3{
        flex: 1;
        font-weight: 500;
        white-space: nowrap;
        text-align: right;
      }
    }
    .print-footer {
      text-align: right;
      span {
        margin-left: 20px;
      }
    }
    .mb-10 {
      margin-bottom: 10px;
    }
    @page {
      margin: 20px 0px 20px;
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
