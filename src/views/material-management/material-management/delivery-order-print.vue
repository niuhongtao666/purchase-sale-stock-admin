<template>
  <div>
    <div class="print-box" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品出库单</h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset textl text-indent20">门店：{{items.storeName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl text-indent20">工单：{{items.workOrderNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl text-index175 ">业务人员：{{items.outputName}}</span>
            </div>
            <div class="item-group mb-10">
              <!--<span class="flex1"></span>-->
              <span class="printset textl text-indent20">发料单号：{{items.deliverOrderNo}}</span>
              <span class="printset textl text-indent20">车架号：{{vin}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl text-index175">车牌号码：{{items.carNumber}}</span>
            </div>
          </div>
          <div class="item mb-10 printZone">
            <table class="table">
              <colgroup>
                <col width="50">
                <col width="113">
                <col width="130">
                <col width="110">
                <col width="110">
                <col width="75">
                <col width="45">
                <col width="80">
                <col width="75">
                <col width="75">
                <col width="90">
                <col width="110">
              </colgroup>
              <thead>
              <tr class="textCenter">
                <th>序号</th>
                <th>仓库</th>
                <th>商品编码</th>
                <th>商品名称</th>
                <th>商品品牌</th>
                <th>维修类型</th>
                <th>单位</th>
                <th>出库数量</th>
                <th>含税单价</th>
                <th>含税金额</th>
                <th>库位号</th>
                <th>仓库结存数量</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in items.outputDetailList.slice((page-1)*onePageRow,page*onePageRow)" :key="index">
                <td class="textCenter">{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.wavehouseName}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <td>{{data.billTypeName}}</td>
                <td>{{data.goodsUnit}}</td>
                <td class="textCenter">{{data.curOrderNum}}</td>
                <td class="textCenter">{{data.unitPrice}}</td>
                <td class="textCenter">{{data.totalPrice}}</td>
                <td>{{data.locationName}}</td>
                <td class="textCenter">{{data.stockNum}}</td>
              </tr>
              <tr v-if="page==pages">
                <td colspan='4' style="width: 33.3333333%">合计金额(大写)：{{totalBigPrice}}</td>
                <td colspan='4' style="width: 33.3333333%">合计金额(小写)：{{totalPrice}}</td>
                <td colspan='4' style="width: 33.3333333%">数量：{{totalNum}}</td>
              </tr>
              <tr  style="border: none;font-size: 16px">
                <td colspan="12"  style="border: none;">
                  <div class="item-group mb-10">
                    <div class="group">
                      <div class="left">出库单号：{{items.outputOrderNo}}</div>
                      <div class="right"></div>
                    </div>
                    <div class="group">
                      <div class="left">出库人：{{items.outputUserName}}</div>
                      <div class="right"></div>
                    </div>
                    <div class="group">
                      <div class="left">出库日期：{{items.outputTime}}</div>
                      <div class="right"></div>
                    </div>
                  </div>
                  <div class="item-group mb-10">
                    <div class="group">
                      <div class="left">领用人签字：</div>
                      <div class="right"></div>
                    </div>
                    <div class="group">
                      <div class="left">库管员签字：</div>
                      <div class="right"></div>
                    </div>
                    <div class="group"></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="printTime">
            打印人:{{printPerson}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印时间:{{printTime}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sales-orders-print',
    props: ['printData','vin'],
    data() {
      return {
        totalPrice: null,
        totalBigPrice: null,
        totalNum: null,
        items: {
          storeName: null,//	门店
          outputOrderNo: null,//		出库单号
          outputName: null,//		业务人员
          workOrderNo: null,//		工单号
          deliverOrderNo: null,//		发料单号
          carNumber: null,//		车牌
          outputDetailList: [],//	出库明细
        },
        onePageRow:20,
      }
    },
    mounted() {
      this.fetchOutputLog();
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
        // 求当前数据能打印的页数
        var pages_ = Math.ceil(
          this.items.outputDetailList.length / this.onePageRow
        ); // 向上取整数
        return pages_ <= 0 ? 1 : pages_;
      },
    },
    methods: {
      fetchOutputLog() {
        this.$axios.post('/admin/stock/outPutInfo/print', this.printData).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.items = data.value;
            console.log(this.items);
            let totalPrice = 0,
              totalNum = 0;
            this.items.outputDetailList.forEach(val => {
              var price=parseFloat(val.totalPrice);
              console.log(typeof price)
              totalPrice= price+totalPrice.toFixed(4);
              console.log(totalPrice)
              totalNum += val.curOrderNum;
            })
            // for(var i=0;i<18;i++){
            //   this.items.outputDetailList.push({'goodsNo':1})
            // }
            console.log(totalPrice)
            this.totalPrice = Number(totalPrice.toFixed(2));
            this.totalBigPrice = this.AppUtils.getChineseNumber(Number(totalPrice.toFixed(2)));
            this.totalNum = totalNum;
          }
        })
      },
      close() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textIndent77{
    text-indent: 77px;
  }
  .printset{
    /*flex: 2;*/
    width: 33.3%;
    font-weight: 500;
    white-space:nowrap;
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .table {
    width: 100%;
    word-break: break-all;
    word-wrap: break-word;
    table-layout: fixed;
  }

  .table tbody td, .table thead th {
    font-size: 14px;
    color: #000;
    white-space: initial;
  }

  .table tr, .table th, .table td {
    border: 1px solid #000;
  }

  .print-box {
    background-color: #fff;
    overflow-y: auto;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    /*padding: 10px 20px;*/
    .title {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .print-content {
      width: 100%;

    }
  }

  .remark {
    padding: 5px 0;
    p {
      white-space: initial;

    }
  }
  .textCenter{
    text-align: center;
  }
  .item-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: 16px;
    .group {
      align-items: center;
      flex: 1;
      .left {
        width: auto;
      }
    }
  }

  .print-footer {
    text-align: left;
    span {
      margin-left: 20px;
    }
  }

  .mb-10 {
    margin-bottom: 10px;
  }
  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    page-break-after: always;
  }
  .text-indent104{
    text-indent: 104px;
  }
  .text-indent20{
    text-indent: 27px;
  }
  .text-index102{
    text-indent: 102px;
  }
  .text-index175{
    text-indent: 175px;
  }
  .printTime{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
  }
  @media print {
    .title {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .printTime{
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 14px;
    }
    .textIndent30{
      text-indent: 0px;
    }
    .text-indent20{
      text-indent: 40px;
    }
    .text-indent104{
      text-indent: 120px;
    }
    .textCenter{
      text-align: center;
    }
    .printset{
      /*flex: 2;*/
      width: 33.3%;
      font-weight: 500;
      white-space:nowrap;
    }
    .printZone .table tbody td,.printZone .table thead th{
      font-size: 16px!important;
      /*height: 55px;*/
    }
  }
  @page {
    margin: 20px 0px 20px;
    size: auto;
  }
</style>
