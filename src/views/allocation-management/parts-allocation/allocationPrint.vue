<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>配件调拨单</h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 20px">调拨单号：{{data.allotOrderNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 94px">调拨日期：{{data.createTime}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 140px">调拨人：{{data.createUserName}}</span>
            </div>
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 20px">调出门店：{{data.allotOutputStoreName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 94px">调入门店：{{data.allotInputStoreName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 140px">出库人：{{data.createUserName}}</span>
            </div>
          </div>
          <div class="item mb-10 setCenter printZone table-unset">
            <table class="table " cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th style="min-width:49px">序号</th>
                <th style="min-width:163px">仓库</th>
                <th style="min-width: 160px">商品编码</th>
                <th style="min-width: 160px">商品名称</th>
                <th style="min-width: 160px">商品品牌</th>
                <th style="min-width: 120px">库位</th>
                <th style="min-width:60px">单位</th>
                <th style="min-width:80px">数量</th>
                <th style="min-width: 80px">调拨价</th>
                <th style="min-width: 80px">金额</th>
              </tr>
              </thead>
              <tbody>
              <tr style="text-align: center;" v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index">
                <td>{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.locationName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td>{{data.num}}</td>
                <td>{{data.unitPrice | decimalTofixed2}}</td>
                <td>{{data.totalPrice | decimalTofixed2}}</td>
              </tr>
              <tr style="text-align: center;" v-if="page==pages">
                <td colspan="3">合计数量：{{totalNum}}</td>
                <td colspan="3">合计金额（小写）：{{totalPrice | decimalTofixed2}}</td>
                <td colspan="4">合计金额（大写）：{{totalPrice | getChineseNumber}}</td>
              </tr>
              <tr>
                <td colspan="10" class="h80" style="text-align: left;">备注：{{memo}}</td>
              </tr>
              </tbody>
            </table>
            <div class="foot" style="display: flex">
              <div style="text-align: left;padding-left: 100px;flex: 1;">出库人:</div>
              <div style="text-align: right;padding-right: 100px;flex: 1;">验收人:</div>
            </div>
            <div class="foot" style="text-align: right!important;">
              打印人:{{printPerson}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印时间:{{today}}
            </div>
          </div>
        </div>
      </div>
   </div>
  </div>

</template>

<script>
  export default {
    name: 'allocationPrint',
    props:{
      data:Object,
      // 每页多少行
      // 是否插入空白行
      blankLines: {
        type: Boolean,
        default: true
      },
      memo:String
    },
    data() {
      return {
        onePageRow:20,
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
      today(){
        var today=new Date();
        return this.AppUtils.formatDateToSecond(today);
      },
      pages() {
        var arr=this.data.outputOrderDetailList;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        pages_ <= 0 ? 1 : pages_;
        return pages_;
      },
      allData(){
        return this.data.outputOrderDetailList;
      },
      totalNum(){
        var _this=this;
        var total=0;
        this.data.outputOrderDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,val.num);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.outputOrderDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.totalPrice));//精度处理
        });
        return this.AppUtils.decimal2(total);
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
    width: 33.33%;
    font-weight: 500;
    white-space:nowrap;
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
    padding: 0 36px;
    .group {
      align-items: center;
      flex: 1;
      .left {
        width: auto;
      }
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
    text-indent: 89px;
  }
  .ti205{
    text-indent: 228px;
  }
  .ti132{
    text-indent: 228px;
  }
  .ti74{
    text-indent: 88px;
  }
  .foot{
    margin-top: 20px;
    font-size: 14px;
    box-sizing: border-box;
    /*padding: 0 134px 0px 38px;*/
  }
  .ti749{
    text-indent: 749px;
  }
  .ti700{
    text-indent: 700px;
  }
  .foot div{
  }
  @media print {
    .printset{
      flex: 2;
      font-weight: 500;
      white-space:nowrap;
    }
    .foot{
      margin-top: 20px;
      font-size: 14px;
      box-sizing: border-box;
      /*padding: 0 134px 0px 38px;*/
    }
    .ti10{
      text-indent: -5px;
    }
    .ti132{
      text-indent: 250px;
    }
    .ti74{
      text-indent: 100px;
    }
    .ti50{
      text-indent: 90px;
    }
    .ti205{
      text-indent: 250px;
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
      padding: 0 36px;
      .group {
        align-items: center;
        flex: 1;
        .left {
          width: auto;
        }
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
    .ti749{
      text-indent: 760px;
    }
    .ti700{
      text-indent: 700px;
    }
    @page {
      margin: 20px 0px 10px;
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
