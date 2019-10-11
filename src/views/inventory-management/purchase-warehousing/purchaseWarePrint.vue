<template>
  <div>
    <div class="zone">
      <div class="">
        <div class="title">
          <div>商品采购入库单</div>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 50px;">采购单号：{{data.purOrderNo}}</span>
              <span class="printset textl" style="text-indent: 37px;">入库单号：{{data.inputOrderNo}}</span>
              <span class="printset textl" style="text-indent: 100px;">入库日期：{{data.inputTime}}</span>
            </div>

          </div>
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 50px;">供应商编号：{{data.supplierNo}}</span>
              <span class="printset textl" style="text-indent: 37px;">供应商名称：{{data.supplierName}}</span>
              <span class="printset textl" style="text-indent: 100px;">入库人：{{data.inputUserName}}</span>
            </div>
          </div>
          <div class="item mb-10 setCenter table-unset printZone" v-for="page in pages" :key="page">
            <table class="table tab_company_out" cellspacing="0">
              <thead>
              <tr style="text-align: center;height: 50px!important" >
                <th style="min-width:49px">序号</th>
                <th style="min-width:120px">仓库</th>
                <th style="min-width: 150px">商品编号</th>
                <th style="min-width: 150px">商品名称</th>
                <th style="min-width: 121px">商品品牌</th>
                <th style="min-width:45px">商品类别</th>
                <th style="min-width:45px">数量</th>
                <th style="min-width:45px">含税单价</th>
                <th style="min-width: 85px">含税金额</th>
                <th style="min-width: 90px">成本金额</th>
                <th style="min-width:45px">结存数量</th>
                <th style="min-width:120px">库位</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*numPrint[page-1],page*numPrint[page-1])" :key="index" style="text-align: center;" >
                <td>{{(page-1)*numPrint[page-1] + index + 1}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.goodsFirstName}}</td>
                <td>{{data.curOrderNum}}</td>
                <td>{{data.unitPrice | decimalTofixed4}}</td>
                <td>{{data.totalPrice | decimalTofixed4}}</td>
                <td>{{data.noTaxTotalPrice | decimalTofixed4}}</td>
                <td>{{data.stockNum}}</td>
                <td>{{data.locationName}}</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td colspan='2'>数量合计：</td>
                <td colspan='3'>{{totalNum}}</td>
                <!--<td colspan='4'>合计金额(大写)：{{totalBigPrice}}</td>-->
                <!--<td colspan='4'>合计金额(小写)：{{totalPrice | decimalTofixed2}}</td>-->
                <td colspan='2'>金额合计：</td>
                <td colspan='5'>{{totalPrice | decimalTofixed2}}({{totalBigPrice}})</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td colspan='2'>成本合计：</td>
                <td colspan='3'>{{noTaxTotalPrice | decimalTofixed2}}({{totalNoTaxBigPrice}})</td>
                <!--<td colspan='4'>合计金额(大写)：{{totalBigPrice}}</td>-->
                <!--<td colspan='4'>合计金额(小写)：{{totalPrice | decimalTofixed2}}</td>-->
                <td colspan='2'>税金：</td>
                <td colspan='5'>{{numSubPrice | decimalTofixed2}}({{numSubBigPrice}})</td>
              </tr>
              <tr v-if="page==pages" style="border:none;">
                <td colspan="11" style="border:none;">
                  <div class="printTime" style="display: flex;font-size: 16px" >
                    <div style="flex: 1; text-align: left;text-indent: 50px">税率：{{taxRate}}</div>
                    <div style="flex: 1;text-align: left;text-indent: 50px">入库人：</div>
                  </div>
                  <div class="printTime" v-if="page==pages">
                    <span>打印人:{{printPerson}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印时间:{{printTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--<div style="width: 100%;height:60px;background: red" v-if="page>1"></div>-->
      </div>
   </div>
  </div>

</template>

<script>
  export default {
    name: 'purchaseWarePrint',
    props:{
      data:Object,
      // 每页多少行
      // 是否插入空白行
      blankLines: {
        type: Boolean,
        default: true
      },
      inputUserName:String
    },
    data() {
      return {
        onePageRow:23,
        numPrint:{},
        allPrice:null,
        allNoTaxTotalPrice:null,
      }
    },
    watch:{

    },
    computed:{
      taxRate(){
        return this.data.taxRate+'%';
      },
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
        this.data.inputDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,val.curOrderNum);//精度处理
        });
        return total;
      },
      totalBigPrice(){
        return this.AppUtils.getChineseNumber(Number(this.allPrice));
      },
      totalNoTaxBigPrice(){
        return this.AppUtils.getChineseNumber(Number(this.allNoTaxTotalPrice));
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.inputDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
        });
        this.allPrice=this.AppUtils.decimal4(total);
        return this.allPrice;
      },
      noTaxTotalPrice(){
        var _this=this;
        var total=0;
        this.data.inputDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.noTaxTotalPrice));//精度处理
        });
        this.allNoTaxTotalPrice=this.AppUtils.decimal4(total);
        return this.allNoTaxTotalPrice;
      },
      numSubPrice(){
        return this.AppUtils.numSub(this.allPrice,this.allNoTaxTotalPrice);
      },
      numSubBigPrice(){
        return this.AppUtils.getChineseNumber(Number(this.numSubPrice));
      },
      pages() {
        var arr=this.data.inputDetailList;
        var pages_;
        /*var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );*/
        if(arr.length<=23){
          pages_=1;
        }else{
          var pages__=Math.ceil((arr.length-23)/23);
          pages_=pages__+1;
        }
        // pages_ <= 0 ? 1 : pages_;
        for(var i=-2;i<pages_;i++){
          if(i==-1){
            // this.numPrint[i]=37;
          }else if(i==0){
            this.numPrint[i]=23;
          }else{
            this.numPrint[i]=23;
          }
        }
        // alert(this.numPrint[1])
        return pages_;
      },
      allData(){
        return this.data.inputDetailList;
      },
      /*totalNum(){
        var _this=this;
        var total=0;
        this.data.purchaseApplyDetailDTOS.forEach((val)=>{
          total=_this.AppUtils.add(total,val.applyNum);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.purchaseApplyDetailDTOS.forEach((val)=>{
          total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.totalPrice));//精度处理
        });
        return this.AppUtils.decimal2(total);
      },*/
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
  .m20{
    margin-top:20px ;
  }
  .printTime{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    margin-bottom: 0px!important;
  }
  .printset{
    flex: 2;
    /*width: 25%;*/
    font-weight: 500;
    white-space:nowrap;
    font-size: 16px;
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
    width: 1121px;
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
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: bold;
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
    text-indent: 33px;
  }
  .ti20{
    text-indent: 33px;
  }
  .ti205{
    text-indent: 119px;
  }
  @media print {
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 14px;
      margin-bottom: 0px!important;
    }
    .printset{
      flex: 2;
      /*width: 25%;*/
      font-weight: 500;
      white-space:nowrap;
      font-size: 16px;
    }
    .ti10{
      text-indent: -5px;
    }
    .ti20{
      text-indent: 20px;
    }
    .ti50{
      text-indent: 80px;
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
      font-size: 20px;
      height: 50px;
      line-height: 50px;
      margin-top: 0px;
      margin-bottom: 10px;
      text-align: center;
      font-weight: bold;
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
      margin: 20px 0px 20px;
      /*margin: 0;*/
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
