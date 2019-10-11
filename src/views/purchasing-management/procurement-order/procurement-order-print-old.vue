<template>
  <div>
    <div v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品采购单</h2>
        </div>
        <div class="print-content">
          <div class="item" v-if="page==1">
            <div class="item-group mb-10 ti10">
              <div class="group">
                采购单号：{{data.purchaseOrderInfoDTO.purchaseOrderNo}}
              </div>
              <div class="group ti50">
                采购门店：{{data.purchaseOrderInfoDTO.storeName}}
              </div>
              <div class="group ti205">
                采购员：{{data.purchaseOrderInfoDTO.createUserName}}
              </div>
            </div>
            <div class="item-group mb-10 ti10">
              <div class="group">
                采购申请：{{data.purchaseOrderInfoDTO.purchaseApplyNo?data.purchaseOrderInfoDTO.purchaseApplyNo:'无'}}
              </div>
              <div class="group ti126 flex2">
                供应商：{{data.purchaseOrderInfoDTO.supplierName}}
              </div>
              <div class="group ti132">
                期望到货：{{data.purchaseOrderInfoDTO.expectedArrivalTime | dateFormatToSecond}}
              </div>
            </div>
          </div>
          <div class="item mb-10">
            <table class="table" cellspacing="0" >
              <thead>
              <tr style="text-align: center;"  v-if="page==1">
                <th width='5%'>序号</th>
                <th width='15%'>商品编号</th>
                <th width='15%'>商品名称</th>
                <th width='15%'>生产编码</th>
                <th width='5%'>单位</th>
                <th width='10%'>采购数量</th>
                <th width='5%'>采购单价</th>
                <th width='15%'>采购总价</th>
                <th width='15%'>仓库</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index" style="text-align: center;">
                <td width='5%'>{{(page-1)*onePageRow + index + 1}}</td>
                <td width='15%'>{{data.goodsNo}}</td>
                <td width='15%'>{{data.goodsName}}</td>
                <td width='15%'>{{data.goodsVendorNo}}</td>
                <td width='5%'>{{data.goodsUnit}}</td>
                <td width='10%'>{{data.orderNum}}</td>
                <td width='5%'>{{data.unitPrice}}</td>
                <td width='15%'>{{data.totalPrice | decimalTofixed2}}</td>
                <td width='15%'>{{data.wavehouseName}}</td>
              </tr>
              <!-- 插入空白行 -->
             <!--<template v-if="blankLines===true && allData.slice((page-1)*onePageRow,page*onePageRow).length<5&&allData.length>5">
                <tr v-for="d in (5-allData.slice((page-1)*onePageRow,page*onePageRow).length)" :key="`_${d}_`">
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
      </div>
   </div>
  </div>

</template>

<script>
  export default {
    name: 'procurementOrderPrint',
    props:{
      data:Object,
      // 每页多少行
      onePageRow: {
        type: Number,
        default: 35
      },
      // 是否插入空白行
      blankLines: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
      }
    },
    computed:{
      pages() {
        var arr=this.data.purchaseOrderDetailDTOS;
        var pages_ = Math.ceil(
          arr.length / this.onePageRow
        );
        return pages_ <= 0 ? 1 : pages_;
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
  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    page-break-after: always;
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .table {
    width: 93%;
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
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .print-content {
    width: 100%;
  }
 /* print-box {
    background-color: #fff;
    overflow-y: auto;
    height: 100%;
    width: 90%;
    margin: 0 auto;

  }*/

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
  .ti50{
    text-indent: 50px;
  }
  .ti205{
    text-indent: 223px;
  }
  .ti126{
    text-indent: 126px;
  }
  .ti28{
    text-indent: 28px;
  }
  .ti132{
    text-indent: 132px;
  }
  @media print {
    .ti10{
      text-indent: 10px;
    }
    .ti50{
      text-indent: 90px;
    }
    .ti205{
      text-indent: 295px;
    }
    .ti126{
      text-indent: 185px;
    }
    .ti28{
      text-indent: 100px;
    }
    .ti132{
      text-indent: 100px;
    }
  }
    @page {
    margin: 0px;
    size: auto;
  }
</style>
