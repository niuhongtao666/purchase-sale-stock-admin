<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>成本调整单</h2>
        </div>
        <div class="print-content">
          <div class="item-group mb-10">
            <span class="printset ti10">调整单号：{{data.costAdjustmentNo}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti50">调整类型：{{data.adjustmentType==1?'入库成本调整':''}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti63">调整分类：{{data.adjustmentClass==1?'采购入库':(data.adjustmentClass==2?'调拨入库':(data.adjustmentClass==3?'盘盈入库':''))}}</span>
          </div>
          <div class="item-group mb-10">
            <span class="printset ti10">仓库：{{data.warehouseName}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti50">供应商编码：{{data.supplierNo}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti63">供应商名称：{{data.supplierName}}</span>
          </div>
          <div class="item-group mb-10">
            <span class="printset ti10">调整日期：{{data.createTime | formatDate}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti50">调整机构：{{data.storeName}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset ti63">调整人：{{data.adUserName}}</span>
          </div>
          <div class="item mb-10 setCenter table-unset printZone">
            <table class="table" cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th  class="min49">序号</th>
                <th  class="min195">商品一级类别</th>
                <th  class="min195">配件编码</th>
                <th class="min255">配件名称</th>
                <th class="min195">生产编码</th>
                <th class="min195">配件品牌</th>
                <th class="min45">调整金额</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*numPrint[page-1],page*numPrint[page-1])" :key="index" style="text-align: center;" >
                <td>{{(page-1)*numPrint[page-1] + index + 1}}</td>
                <td>{{data.className}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsVendorNo}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.adjustmentMoney}}</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td></td>
                <td></td>
                <td>合计</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{totalPrice}}</td>
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
  import {isNumber} from '@/assets/js/logic'
  export default {
    name: 'costAdjustPrint',
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
        numPrint:{},
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
        var arr=this.data.stockCostAdjustmentDetailDTOS;
        var pages_;
        /*var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );*/
        if(arr.length<=22){
          pages_=1;
        }else{
          var pages__=Math.ceil((arr.length-22)/22);
          pages_=pages__+1;
        }
        // pages_ <= 0 ? 1 : pages_;
        for(var i=-2;i<pages_;i++){
          if(i==-1){
            // this.numPrint[i]=36;
          }else if(i==0){
            this.numPrint[i]=22;
          }else{
            this.numPrint[i]=22;
          }
        }
        // alert(this.numPrint[1])
        return pages_;
      },
      allData(){
        return this.data.stockCostAdjustmentDetailDTOS;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        var arr=_this.data.stockCostAdjustmentDetailDTOS;
        var newArr=arr.filter(item=>item['adjustmentMoney']==='');
        if(arr.length) {
          if(arr.length==newArr.length){
            sums[index]='';
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i]['adjustmentMoney']==''){
                continue;
              }
              if(isNumber(arr[i]['adjustmentMoney'])){
                total=_this.AppUtils.add(total,parseFloat(arr[i]['adjustmentMoney']));//精度处理
              }
            }
           return total;
          }
        }
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
    width: 33.33%;
    font-weight: 500;
    font-size: 16px;
    text-align: left;
    white-space:nowrap;
    box-sizing: border-box;
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
      white-space: nowrap;
      text-align: left;
      font-weight: 500;
    }
    .group2{
      flex: 1;
      white-space: nowrap;
      text-align: center;
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
    padding-left: 40px;
  }
  .ti50{
    padding-left: 79px;

  }
  .ti63{
    text-indent: 63px;
  }
  .printTime{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size:14px ;
  }
  .min49{
    min-width: 49px;
  }
  .min195{
    min-width: 180px;
  }
  .min255{
    min-width: 255px;
  }
  .min185{
    min-width: 185px;
  }
  .min81{
    min-width: 100px;
  }
  .min45{
    min-width: 100px;
  }
  @media print {
    .min49{
      min-width: 49px;
    }
    .min195{
      min-width: 180px;
    }
    .min255{
      min-width: 280px;
    }
    .min185{
      min-width: 185px;
    }
    .min81{
      min-width: 120px;
    }
    .min45{
      min-width: 80px;
    }
    .printset{
      width: 33.3%;
      font-weight: 500;
      white-space:nowrap;
      font-size: 16px;
      text-align: left;
      box-sizing: border-box;
    }
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size:14px ;
    }
    .ti10{
      padding-left: 40px;
    }
    .ti50{
      text-indent: 20px;
    }
    .ti205{
      text-indent: 200px;
    }
    .zone{
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 0px 10px;
      padding-left: 0px;
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
      /*line-height:35px;*/
    }
    .table tbody td{
      font-size: 16px;
      color: #333;
      /*line-height:35px;*/
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
        font-weight: 500;
        text-align: left;
        white-space: nowrap;
      }
      .group2{
        flex: 1;
        font-weight: 500;
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
    .ti63{
      text-indent: 63px;
    }
    .mb-10 {
      margin-bottom: 10px;
    }
    @page {
      /*margin: 20px 0px 20px;*/
      margin: 0;
      size: auto;
    }
  }
  /*@page {
    margin: 0px;
    size: auto;
  }*/
</style>
