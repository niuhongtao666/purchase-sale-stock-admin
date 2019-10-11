<template>
  <div>
    <div class="zone"  v-for="page in pages" :key="page" >
      <div class="tab_company_out">
        <div class="title">
          <h2>
            调拨出库单
          </h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset ">出库单号：{{data.outputOrderNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset">出库门店：{{data.storeName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset">出库日期：{{data.outputTime}}</span>
            </div>
          </div>
          <div class="item mb-10 setCenter printZone1 table-unset">
            <table class="table" cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th style="min-width:49px">序号</th>
                <th style="min-width:100px">仓库</th>
                <th style="min-width: 150px">商品编码</th>
                <th style="min-width: 180px">商品名称</th>
                <th style="min-width: 180px">商品品牌</th>
                <th style="min-width:81px">单位</th>
                <th style="min-width:45px">出库数量</th>
                <th style="min-width: 81px">调拨价</th>
                <th style="min-width: 80px">总价</th>
                <th style="min-width:100px">库位号</th>
                <th style="min-width:45px">结存数量</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*numPrint[page-1],page*numPrint[page-1])" :key="index" style="text-align: center;" >
                <td>{{(page-1)*numPrint[page-1] + index + 1}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td>{{data.curOrderNum}}</td>
                <td>{{data.unitPrice | decimalTofixed2}}</td>
                <td>{{data.totalPrice | decimalTofixed2}}</td>
                <td>{{data.locationName}}</td>
                <td>{{data.stockNum}}</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td colspan="4">合计金额(大写)：{{totalPrice | getChineseNumber}}</td>
                <td colspan="3">合计金额(小写)：{{totalPrice}}</td>
                <td colspan="4">数量合计：{{totalNum}}</td>
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
    name: 'allocationOutPrint',
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
        onePageRow:19,
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
        var arr=this.data.outputDetailList;
        var pages_;
        /*var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );*/
        if(arr.length<=19){
          pages_=1;
        }else{
          var pages__=Math.ceil((arr.length-19)/19);
          pages_=pages__+1;
        }
        // pages_ <= 0 ? 1 : pages_;
        for(var i=-2;i<pages_;i++){
          if(i==-1){
            // this.numPrint[i]=37;
          }else if(i==0){
            this.numPrint[i]=19;
          }else{
            this.numPrint[i]=19;
          }
        }
        // alert(this.numPrint[1])
        return pages_;
      },
      allData(){
        return this.data.outputDetailList;
      },
      totalNum(){
        var _this=this;
        var total=0;
        this.data.outputDetailList.forEach((val)=>{
          total=_this.AppUtils.add(total,val.curOrderNum);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.outputDetailList.forEach((val)=>{
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
  .printTime{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: right;
  }
  .printset{
    width: 33.33%;
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
    width: 900px;
    margin: 0 auto;
  }
  .table thead th{
    font-size: 14px;
    color: #333;
    line-height: 30px;
  }
  .table tbody td{
    font-size: 12px;
    color: #333;
    line-height: 30px;
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
    text-indent: 33px;
  }
  .ti205{
    text-indent: 165px;
  }
  @media print {
    .printTime{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: right;
    }
    .printset{
      width: 33.33%;
      font-weight: 500;
      white-space:nowrap;
    }
    .ti10{
      text-indent: -5px;
    }
    .ti50{
      text-indent: 80px;
    }
    .ti205{
      text-indent: 200px;
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
      line-height: 30px;
    }
    .table tbody td{
      font-size: 12px;
      color: #333;
      line-height: 30px;
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
