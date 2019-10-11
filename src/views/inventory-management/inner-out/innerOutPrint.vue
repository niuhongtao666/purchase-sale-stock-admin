<template>
  <div>
    <div class="zone">
      <div class="">
        <div class="title">
          <h2>商品内部领用申请单</h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <div class="group" style="font-weight: 500;font-size: 16px">
                门店名称：{{data.storeName}}
              </div>
            </div>
          </div>
          <div class="item mb-10 setCenter printZone0 table-unset" v-for="page in pages" :key="page">
           <table class="table tab_company_out" cellspacing="0">
            <tbody>
              <tr v-if="page!=1" style="border: none;">
                <td colspan="7" class="title" style="font-size: 25px;height: 60px; border: none;">
                  商品内部领用申请单
                </td>
              </tr>
              <tr v-if="page!=1" style="border: none;">
                <td colspan="7" style="text-align: left;height: 41px;border: none;font-size: 14px;color: #333;box-sizing: border-box;padding-left: 36px;font-weight: 500">
                  门店名称：{{data.storeName}}
                </td>
              </tr>
              <tr>
                <td style="min-width: 123px">申请人</td>
                <td colspan="2">{{data.useUser}}</td>
                <td>申请时间</td>
                <td colspan="3">{{data.createdTime}}</td>
              </tr>
              <tr>
                <td>领用单号</td>
                <td colspan="2">{{data.orderNo}}</td>
                <td>工单号</td>
                <td colspan="3"> {{data.dataNo}}</td>
              </tr>
              <tr>
                <td>车牌号</td>
                <td colspan="2"></td>
                <td>车架号</td>
                <td colspan="3"></td>
              </tr>
              <tr style="background-color: #f4f5f7" class="titleLine">
                <td style="min-width: 140px">仓库</td>
                <td style="min-width: 200px">商品编码</td>
                <td style="min-width: 200px">商品名称</td>
                <td style="min-width: 140px">数量</td>
                <td style="min-width: 100px">领用单价</td>
                <td style="min-width: 180px">领用金额</td>
                <td style="min-width: 130px">备注</td>
              </tr>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index">
                <td>{{data.warehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.num}}</td>
                <td>{{data.costUnitPric}}</td>
                <td>{{data.totalPrice}}</td>
                <td></td>
              </tr>
              <tr v-if="page==pages">
                <td>数量合计：</td>
                <td colspan="2">{{totalNum}}</td>
                <td>金额合计：</td>
                <td colspan="3">{{totalPrice | decimalTofixed2}}({{totalPrice | decimalTofixed2 | getChineseNumber}})</td>
              </tr>
              <tr>
                <td class="h80">领用原因：</td>
                <td colspan="6">
                  <div class="useType" style="text-align: left">{{data.useType}}</div>
                  <div class="mt44" style="margin-top: 0px;">签字：</div>
                </td>
              </tr>
              <tr>
                <td class="h80">车间主管：</td>
                <td colspan="6">
                  <div class="mt44">签字：</div>
                </td>
              </tr>
              <tr >
                <td class="h80">售后经理：</td>
                <td colspan="6">
                  <div class="mt44">签字：</div>
                </td>
              </tr>
              <tr class="h80">
                <td>备注:</td>
                <td colspan="6" style="text-align:left;white-space: inherit;">
                  {{data.memo}}
                </td>
              </tr>
              <tr style="border: none">
                <td colspan="8" style="border: none">
                  <div class="printTime" style="font-size: 14px">
                    打印人:{{printPerson}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印时间:{{printTime}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
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
        onePageRow:18,
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
        var arr=this.data.details;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        pages_ <= 0 ? 1 : pages_;
        return pages_;
      },
      allData(){
        return this.data.details;
      },
      totalNum(){
        var _this=this;
        var total=0;
        this.data.details.forEach((val)=>{
          total=_this.AppUtils.add(total,val.num);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.details.forEach((val)=>{
          total=_this.AppUtils.add(total,val.totalPrice);//精度处理
        });
        return total;
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
  .h80{
    height: 80px;
  }
  @media print {
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
    }
    .h80{
      height: 80px;
    }
    .ti10{
      text-indent: -5px;
    }
    .ti50{
      text-indent: 80px;
    }
    .ti205{
      text-indent: 270px;
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
