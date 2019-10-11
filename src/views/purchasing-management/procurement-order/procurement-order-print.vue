<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品采购单</h2>
        </div>
        <div class="print-content">
          <!--<div class="item-group mb-10">
            <div class="group1">
              采购单号：{{data.purchaseOrderInfoDTO.purchaseOrderNo}}
            </div>
            <div class="group2">
              采购门店：{{data.purchaseOrderInfoDTO.storeName}}
            </div>
            <div class="group3">
              采购员：{{data.purchaseOrderInfoDTO.createUserName}}
            </div>
          </div>
          <div class="item-group mb-10">
            <div class="group1">
              采购申请：{{data.purchaseOrderInfoDTO.purchaseApplyNo?data.purchaseOrderInfoDTO.purchaseApplyNo:'无'}}
            </div>
            <div class="group2">
              供应商：{{data.purchaseOrderInfoDTO.supplierName}}
            </div>
            <div class="group3">
              供应商：{{data.purchaseOrderInfoDTO.supplierName}}
            </div>
          </div>-->
          <div class="item-group mb-10">
            <span class="printset">采购单号：{{data.purchaseOrderInfoDTO.purchaseOrderNo}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset">采购门店：{{data.purchaseOrderInfoDTO.storeName}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset">采购员：{{data.purchaseOrderInfoDTO.createUserName}}</span>
          </div>
          <div class="item mb-10 setCenter printZone table-unset" >
            <table class="table " cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th style="min-width:49px">序号</th>
                <th style="min-width: 170px">商品编号</th>
                <th style="min-width: 170px">商品名称</th>
                <th style="min-width: 170px">商品品牌</th>
                <!--<th style="min-width: 120px">生产编码</th>-->
                <th style="min-width:100px">单位</th>
                <th style="min-width:45px">采购数量</th>
                <th style="min-width: 100px">采购单价</th>
                <th style="min-width: 100px">采购总价</th>
                <th style="min-width:203px">仓库</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index" style="text-align: center;">
                <td>{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td>{{data.orderNum}}</td>
                <td>{{data.unitPrice}}</td>
                <td>{{data.totalPrice | decimalTofixed2}}</td>
                <td>{{data.wavehouseName}}</td>
              </tr>
              <!-- 插入空白行 -->
             <!--<template v-if="blankLines===true && allData.slice((page-2)*numPrint[page-2],page*numPrint[page-2]).length==0&&allData.lengt%">
                <tr v-for="d in (5-allData.slice((page-1)*numPrint[page-1],page*numPrint[page-1]).length)" :key="`_${d}_`">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>-->
              <!--<tr style="text-align: center" v-if="page==pages">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>合计数量：</td>
                <td>{{totalNum}}</td>
                <td>合计金额：</td>
                <td>{{totalPrice}}</td>
                <td></td>
              </tr>-->
              <tr style="text-align: center;" v-if="page==pages">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>合计数量：</td>
                <td>{{data.purchaseOrderInfoDTO.orderTotalNum}}</td>
                <td>合计金额：</td>
                <td>{{data.purchaseOrderInfoDTO.orderTotalPrice | decimalTofixed2}}</td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="printTime">
          打印人:{{printPerson}}&nbsp;&nbsp;&nbsp;&nbsp;打印时间:{{printTime}}
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
        onePageRow:22,
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
        var arr=this.data.purchaseOrderDetailDTOS;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        pages_ <= 0 ? 1 : pages_;
        // alert(this.numPrint)
        return pages_;
      },
      allData(){
        return this.data.purchaseOrderDetailDTOS;
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
    width: 33.3%;
    font-weight: 500;
    white-space:nowrap;
    font-size: 16px;
  }
  .printTime{
    font-size:14px ;
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
    font-size: 14px;
    color: #333;
    /*line-height: 30px;*/
  }
  .table tbody td{
    font-size: 12px;
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
    margin-top: 10px;
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
    /*padding: 0 34px;*/
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
      white-space: nowrap;
      font-weight: 500;
    }
    .group2{
      flex: 1;
      text-align: center;
      white-space: nowrap;
      font-weight: 500;
    }
    .group3{
      flex: 1;
      white-space: nowrap;
      text-align: right;
      font-weight: 500;
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
    text-indent: 33px;
  }
  .ti205{
    text-indent: 145px;
  }
  .ti132{
    text-indent: 132px;
  }
  .ti74{
    text-indent: 74px;
  }
  @media print {
    .printset{
      flex: 2;
      font-weight: 500;
      /*white-space:nowrap;*/
      font-size: 16px;
    }
    .printTime{
      font-size:14px ;
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
      text-indent: 230px;
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
      font-size: 14px;
      color: #333;
      /*line-height: 35px;*/
    }
    .table tbody td{
      font-size: 13px;
      color: #333;
      /*line-height: 35px;*/
    }

    .table tr, .table th, .table td {
      border: 1px solid #4a4a4a;
    }
    .title {
      font-size: 25px;
      height: 50px;
      line-height: 50px;
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
      /*padding: 0 34px;*/
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
        white-space: nowrap;
        font-weight: 500;
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
        text-align: right;
        font-weight: 500;
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
      margin: 20px 0px 40px;
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
