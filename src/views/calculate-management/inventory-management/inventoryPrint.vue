<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品盘点调整单</h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset" style="width: 30%">申请单号：{{data.checkOrderNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="width: 30%;text-indent: 70px">调整门店：{{data.checkOutStoreName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset" style="width: 20%">申请人：{{data.createUserName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset" style="width: 20%">申请日期：{{data.createTime}}</span>
            </div>
            <div class="item-group mb-10">
              <span class="printset" style="width: 30%">调整单号：{{data.checkOutputOrInputOrderNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="width: 30%;text-indent: 70px">调整类型：{{data.checkTypeName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset" style="width: 20%">调整人：{{data.auditUserName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset" style="width: 20%">调整日期：{{data.auditTime}}</span>
            </div>
          </div>
          <div class="item mb-10 setCenter printZone table-unset" >
            <table class="table " cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th style="min-width:49px">序号</th>
                <th style="min-width:100px">仓库</th>
                <th style="min-width: 160px">商品编号</th>
                <th style="min-width: 160px">商品名称</th>
                <!--<th style="min-width: 100px">生产编码</th>-->
                <th style="min-width: 100px">商品类别</th>
                <th style="min-width:60px">数量</th>
                <th style="min-width: 81px">成本单价</th>
                <th style="min-width: 81px">成本单价(不含税)</th>
                <th style="min-width: 80px">成本总价</th>
                <th style="min-width: 45px">结存数量</th>
                <th style="min-width:100px">库位</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index" style="text-align: center;">
                <td>{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <!--<td>{{data.goodsVendorNo}}</td>-->
                <td>{{data.goodsFirstName}}</td>
                <td>{{data.curOrderNum}}</td>
                <td>{{data.unitPrice}}</td>
                <td>{{data.noTaxUnitPrice}}</td>
                <td>{{data.totalPrice}}</td>
                <td>{{data.stockNum}}</td>
                <td>{{data.locationName}}</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!--<td></td>-->
                <td>合计数量：</td>
                <td>{{totalNum}}</td>
                <td></td>
                <td>合计金额：</td>
                <td>{{totalPrice}}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="11" style="text-align: left;">备注：{{data.memo}}</td>
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
      printTime(){
        var time=new Date();
        var today=this.AppUtils.formatDateToSecond(time);
        return today;
      },
      totalNum(){
        var _this=this;
        var total=0;
        this.data.orderDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,val.curOrderNum);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.orderDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,val.totalPrice);//精度处理
        });
        return total;
      },
      pages() {
        var arr=this.data.orderDetailList;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        pages_ <= 0 ? 1 : pages_;
        // alert(this.numPrint)
        return pages_;
      },
      allData(){
        return this.data.orderDetailList;
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
    width: 25%;
    font-weight: 500;
    white-space:nowrap;
    font-size: 16px;
  }
  .printTime{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
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
    /*padding: 0 36px;*/
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
    text-indent: 22px;
  }
  .ti205{
    text-indent: 98px;
  }
  .ti132{
    text-indent: 132px;
  }
  .ti74{
    text-indent: 74px;
  }
  @media print {
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 14px;
    }
    .m-l36{
      margin-left: 36px;
    }
    .ml5{
      margin-left: 2px;
    }
    .printset{
      /*flex: 2;*/
      width: 25%;
      font-size: 16px;
      font-weight: 500;
      white-space:nowrap;
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
      text-indent: 60px;
    }
    .ti205{
      text-indent: 130px;
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
      height: 60px;
      line-height: 60px;
      margin-bottom: 20px;
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
      margin: 20px 0px 10px;
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
