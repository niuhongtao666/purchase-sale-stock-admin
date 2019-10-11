<template>
  <div>
    <div class="zone" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品采购申请单</h2>
        </div>
        <div class="print-content">
          <div class="item-group mb-10">
            <span class="printset">采购申请：{{data.purchaseApplyInfoDTO.purchaseApplyNo}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset">申请门店：{{data.purchaseApplyInfoDTO.storeName}}</span>
            <!--<span class="flex1"></span>-->
            <span class="printset">申请人：{{data.purchaseApplyInfoDTO.createUserName}}</span>
          </div>
          <div class="item mb-10 setCenter table-unset printZone">
            <table class="table" cellspacing="0" >
              <thead>
              <tr style="text-align: center;">
                <th  class="min49">序号</th>
                <th  class="min195">商品编号</th>
                <th class="min255">商品名称</th>
                <th class="min195">商品品牌</th>
                <!--<th class="min195">生产编码</th>-->
                <th class="min81">单位</th>
                <th class="min45">请购数量</th>
                <th class="min81">请购单价</th>
                <th class="min45">请购总价</th>
                <th class="min45">上次采购价</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*numPrint[page-1],page*numPrint[page-1])" :key="index" style="text-align: center;" >
                <td>{{(page-1)*numPrint[page-1] + index + 1}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td>{{data.applyNum}}</td>
                <td>{{data.unitPrice}}</td>
                <td>{{data.totalPrice | decimalTofixed2}}</td>
                <td>{{data.lastPrice | decimalTofixed2}}</td>
              </tr>
              <tr style="text-align: center" v-if="page==pages">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>合计数量：</td>
                <td>{{totalNum}}</td>
                <td>合计金额：</td>
                <td>{{totalPrice}}</td>
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
        onePageRow:24,
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
        var arr=this.data.purchaseApplyDetailDTOS;
        var pages_;
        /*var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );*/
        if(arr.length<=24){
          pages_=1;
        }else{
          var pages__=Math.ceil((arr.length-24)/24);
          pages_=pages__+1;
        }
        // pages_ <= 0 ? 1 : pages_;
        for(var i=-2;i<pages_;i++){
          if(i==-1){
            // this.numPrint[i]=36;
          }else if(i==0){
            this.numPrint[i]=24;
          }else{
            this.numPrint[i]=24;
          }
        }
        // alert(this.numPrint[1])
        return pages_;
      },
      allData(){
        return this.data.purchaseApplyDetailDTOS;
      },
      totalNum(){
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
    text-indent: -8px;
  }
  .ti50{
    text-indent: 60px;
  }
  .ti205{
    text-indent: 187px;
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
    min-width: 225px;
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
      min-width: 240px;
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
      text-align: center;
    }
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size:14px ;
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
