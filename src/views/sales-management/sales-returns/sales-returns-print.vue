<template>
  <div>
    <div class="print-box" v-for="page in pages" :key="page">
      <div class="tab_company_out">
        <div class="title">
          <h2>商品销售退货单</h2>
        </div>
        <div class="print-content">
          <div class="item">
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 20px">退货单号：{{items.saleReturnInfoDTO.returnNo}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 94px">退货门店：{{items.saleReturnInfoDTO.storeName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 100px">销售员：{{items.saleReturnInfoDTO.createUserName}}</span>
            </div>
            <div class="item-group mb-10">
              <span class="printset textl" style="text-indent: 20px">客户名称：{{items.saleReturnInfoDTO.saleCustName}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 94px">客户电话：{{items.saleReturnInfoDTO.saleCustMobile}}</span>
              <!--<span class="flex1"></span>-->
              <span class="printset textl" style="text-indent: 100px">退货日期：{{items.saleReturnInfoDTO.createTime | formatDate}}</span>
            </div>
          </div>
          <div class="item mb-10 printZone table-unset">
            <table class="table ">
              <thead>
              <tr style="text-align: center">
                <th>序号</th>
                <th>商品编号</th>
                <th>商品名称</th>
                <th>商品品牌</th>
                <!--<th>产地</th>-->
                <th>数量</th>
                <th>单价</th>
                <th>实收金额</th>
                <th>应退金额</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData.slice((page-1)*onePageRow,page*onePageRow)" :key="index" style="text-align: center;">
                <td>{{(page-1)*onePageRow + index + 1}}</td>
                <td>{{data.goodsNo}}</td>
                <td>{{data.goodsName}}</td>
                <td>{{data.goodsBrandName}}</td>
                <!--<td>{{data.goodsOriginArea}}</td>-->
                <td>{{data.returnNum}}</td>
                <td>{{data.unitPrice}}</td>
                <td>{{data.returnPrice | decimalTofixed2}}</td>
                <td>{{data.returnPrice | decimalTofixed2}}</td>
              </tr>
              <tr v-if="page==pages">
                <td colspan='4' style="width: 50%">实收金额合计: {{totalPrice}}</td>
                <td colspan='4' style="width: 50%">应退金额合计: {{totalPrice}} ({{Number(totalPrice) | getChineseNumber}})</td>
              </tr>
              <tr>
                <td colspan="9">
                  <div class="remark" style="text-align: left">
                    <div>
                      备注条款：
                    </div>
                    <div>
                      <p>
                        1、本合同项下销售的精品凭精品销售发票可享受精品生产厂家的相应的售后服务政策。
                      </p>
                      <p>
                        2、买卖双方在履行本合同过程中发生争议时，应友好协商解决。协商不能解决或调解不成的，向卖方所在人民法院起诉。
                      </p>
                      <p>
                        3、买方愿委托卖方公司施工安装所购买的精品装饰物件，由于部分精品在施工过程中、后要改变车辆电路、电压、车辆结构、配件结构等，故买方愿承担安装精品装饰后带来的一切后果及责任。
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="item-group mb-10">
          <div class="group">
            <div class="left">业务经理签字：</div>
            <div class="right"></div>
          </div>
          <div class="group">
            <div class="left">客户签字：</div>
            <div class="right"></div>
          </div>
          <div class="group">
            <div class="left">财务签字：</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="item mb-10">
          <div class="print-footer">
            <span style="margin-right: 36px">打印人：{{printPerson}}</span>
            <span>打印时间：{{printTime | dateFormatToSecond}} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sales-returns-print',
    props: ['items'],
    data() {
      return {
        totalPrice:null,
        onePageRow: 19,
        blankLines: true,
        printTime:new Date().getTime()
      }
    },
    computed: {
      printPerson(){
        var userInfos=JSON.parse(localStorage.getItem('userInfos'));
        var userName=userInfos['name'];
        return userName;
      },
      allData(){
        return this.items.saleReturnDetailDTOS;
      },
      pages() {

        /*
        *
        * 1、假如只有一页 第一页一页最多展示20条数据
        * 2、假如有两页 第一页最多展示30条数据
        * 3、假如有多页 最后一页可以展示完多情况下 最多展示25条数据 展示不完多话 倒数第二页最多展示28条数据
        *
        * if(data.length>30){}
        * firstArr=[];
        * secondArr=[];
        * thirdArr=[];
        *
        *
        *
        * if(data.length<55){}
        *
        *
         */

        // 求当前数据能打印的页数
        var pages_ = Math.ceil(
          this.items.saleReturnDetailDTOS.length / this.onePageRow
        ); // 向上取整数
        return pages_ <= 0 ? 1 : pages_;
      },

    },

    mounted() {
      this.getSummaries();
    },
    methods: {
      getSummaries() {
        let returnDetialDTOS = this.items.saleReturnDetailDTOS;
        let totalPrice = 0;
        returnDetialDTOS.forEach(val => {
          totalPrice += val.returnPrice
        });
        this.totalPrice = totalPrice.toFixed(2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textIndent45{
    text-indent: 45px;
  }
  .textIndent23{
    text-indent: 23px;
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .printset{
    /*flex: 2;*/
    font-size: 16px;
    width: 33.33%;
    font-weight: 500;
    white-space:nowrap;
  }
  .table {
    width: 100%;
  }

  .table tbody td, .table thead th {
    font-size: 16px;
    color: #333;
  }

  .table tr, .table th, .table td {
    border: 1px solid #4a4a4a;
  }

  .print-box {
    background-color: #fff;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    /*padding: 10px 20px;*/
    .title {
      font-size: 25px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .print-content {
      width: 100%;
      /*height: calc(100% - 60px);*/
      /*padding: 0 20px;*/
      /*max-height: 500px;*/
      /*overflow-x: hidden;*/
    }
  }

  .remark {
    padding: 5px 0;
    p {
      white-space: initial;

    }
  }

  .item-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 0 20px;*/
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
      font-weight: 500;
      white-space: nowrap;
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

  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    page-break-after: always;
  }
  @media print {
    .textIndent45{
      text-indent: 78px;
    }
    .textIndent23{
      text-indent: 40px;
    }
  }
</style>
