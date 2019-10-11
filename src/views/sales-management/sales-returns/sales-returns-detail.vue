<template>
  <div>
    <div class="item">
      <div class="item-title">
        <i class="return-info2_icon"></i>
        <h2>退款信息</h2>
      </div>
      <div class="order-info">
        <span class="lColor">销售单号：
          <span class="rColor mr0">
            <router-link :to="'/sales-management/sales-orders/detail/'+items.saleReturnInfoDTO.saleOrderId" class="rColor">
               {{items.saleReturnInfoDTO.saleOrderNo}}
            </router-link>
          </span>
        </span>
        <span class="lColor">退货单号：<span class="rColor mr0">{{items.saleReturnInfoDTO.returnNo}}</span></span>
        <span class="lColor">状态：<span class="rColor mr0">{{items.saleReturnInfoDTO.returnState | returnState}} </span></span>
        <span class="lColor mr0">创建时间：<span class="rColor mr0"> {{items.saleReturnInfoDTO.createTime | dateFormatToSecond}} </span></span>
      </div>
      <div class="item-content ">
        <div class="table-layout">
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 客户名称</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.saleCustName}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 客户电话</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.saleCustMobile}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 退货数量</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.returnNum}}


                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 退货金额</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.returnPrice}}

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>销售门店</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.storeName}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>销售员</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.createUserName}}

                </div>
              </div>
            </div>
            <div class="row" style="flex: 2">
              <div class="column">
                <div class="left">
                  <div>备注</div>
                </div>
                <div class="right">
                  {{items.saleReturnInfoDTO.memo}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">
        <i class="return-list2_icon"></i>
        <h2>退款清单</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="items.saleReturnDetailDTOS"
            max-height="560"
            show-summary
            :summary-method="getSummaries"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsVendorNo"
              label="生产编码"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              min-width="150"
              show-overflow-tooltips
            >
            </el-table-column>
            <el-table-column
              prop="goodsBrandName"
              label="配件品牌"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="goodsOriginArea"-->
              <!--label="产地"-->
              <!--min-width="120"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
              prop="goodsUnit"
              label="单位"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="returnNum"
              label="退货数量"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="returnPrice"
              label="退款金额"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="memo"
              label="备注"
              min-width="200">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item" v-if="items.stockLogDTOS.length">
      <div class="item-title">
        <i class="out-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="items.stockLogDTOS"
            max-height="560"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="出库单号"
              min-width="210"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor"
                             :to="'/inventory-management/material-out/detail/id/'+scope.row.id+'/businessType/1'">
                  {{scope.row.outputOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalNum"
              label="出库数量"
              min-width="80"
            >
            </el-table-column>
            <el-table-column
              prop="receivePrice"
              label="出库总价（含税）"
              min-width="140"
            >
            </el-table-column>
            <el-table-column
              prop="outputUserName"
              label="出库人"
              min-width="100"
            >
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="180"
            >
              <template slot-scope="scope">
               <span>
                 {{scope.row.createTime | dateFormatToSecond}}
               </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item mb" v-if="items.refundInfoDTO">
      <div class="item-title" v-if="items.refundInfoDTO">
        <i class="return-money_icon"></i>
        <h2>退款信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="[items.refundInfoDTO]"
            max-height="560"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="refundNo"
              label="退款单号"
              min-width="210"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="returnPrice"
              label="退款金额"
              min-width="120">
            </el-table-column>
            <el-table-column
              label="状态"
              width="80">
              <template slot-scope="scope">
               <span>
                 {{scope.row.refundStatus | returnMoneyState}}
               </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="200">
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="180">
              <template slot-scope="scope">
               <span>
                 {{scope.row.createTime | dateFormatToSecond}}
               </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="refundUserName"
              label="退款人"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="退款时间"
              min-width="180">
              <template slot-scope="scope">
               <span>
                 {{scope.row.updateTime | dateFormatToSecond}}
               </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="saveBtn">
      <button v-if="items.saleReturnInfoDTO.returnState===0&&buttonInfo.cancel" type="button" class="btn" @click="cancle">{{buttonInfo.cancel}}</button>
      <button v-if="buttonInfo.print&&items.saleReturnDetailDTOS.length" type="button" class="btn" @click="showPrintMask">打印</button>
    </div>
    <print-box v-if="printMaskShow" @hidePrintMask="hidePrintMask">
      <template>
        <saleReturnsPrint :items="JSON.parse(JSON.stringify(items))"></saleReturnsPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import printBox from '@/components/print-box'
  import saleReturnsPrint from './sales-returns-print'
  export default {
    name: 'sales-orders-detail',
    components: {
      saleReturnsPrint,
      printBox
    },
    data() {
      return {
        items: {
          saleReturnInfoDTO: {},//退货信息
          saleReturnDetailDTOS: [],//退货清单
          refundInfoDTO: null,//退款信息
          stockLogDTOS: [],//出库信息
        },
        printMaskShow:false
      }
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(14);
      },

    },
    mounted() {
      this.fetchData();
    },
    methods: {
      showPrintMask() {//打印销售单
        this.printMaskShow = true;
      },
      hidePrintMask() {
        this.printMaskShow = false;

      },
      fetchData() {
        this.$axios.get(`/admin/sale/saleReturnInfo/detail/${this.$route.params.orderId}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            var _this=this;
            this.items = data.value;
            if(data.value.saleReturnDetailDTOS!=null&&data.value.saleReturnDetailDTOS.length){
              this.items.saleReturnDetailDTOS.forEach((item,index)=>{
                item['unitPrice']=_this.AppUtils.accDiv(item['returnPrice'],item['returnNum']).toFixed(2);
              });
            }else{
              this.items.saleReturnDetailDTOS=[];
            }
          }
        })
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        let values = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const computedPropertyArr = ['returnNum', 'returnPrice'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            values = data.map(item => Number(item[column.property]));
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = Number(sums[index].toFixed(2));
          }
        });
        return sums;
      },
      cancle() {
        this.AppUtils.confirm('是否确定取消?', () => {
          this.$axios.post(`/admin/sale/saleReturnInfo/updateStatus/${this.$route.params.orderId}?status=300`).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.AppUtils.alert('取消成功', () => {
                this.fetchData();
              });
            }
          })
        })

      },
    }
  }
</script>

<style lang="scss" scoped>
  .order-info {
    display: flex;
    justify-content: flex-end;
    text-align: left;
    span {
      margin-right: 20px;
      color: #4A4A4A;
    }
  }

  .item-title {
    padding-left: 53px;
  }

  .item {
    margin: 0 20px 20px;
    background-color: #fff;
    border-radius: 4px;
    padding: 0 20px;

    .item-content {
      padding-bottom: 20px;
      .top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: $color;
      }
      .top-info {
        padding-left: 15px;
        margin-left: 30px;
        position: relative;
        margin-bottom: 10px;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #e9e9e9;
        }
      }
    }
    .table-layout {
      border: 1px solid #ecf1f4;
    }

  }

  .row-item {
    height: 50px;
    .store-name {
      flex: 2;
    }
    &:last-child {
      border-bottom: 0;
    }
  }

  .h-120 {
    height: 120px;
  }

  .input {
    border: $border;
    height: 32px;
    width: 100%;
    border-radius: 3px;
  }

  .address-box {
    .el_box {
      width: 180px !important;
      margin-right: 10px;
    }
  }

  .btn-layout {
    display: flex;
    justify-content: flex-start;
    padding: 10px 0 10px 30px;
    .btn {
      margin-right: 20px;
      width: 80px;

      &:last-child {
        background-color: #fff;
        border: $border;
        color: #4A4A4A;
      }

    }

  }

  .saveBtn {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-40%);
    -ms-transform: translateX(-40%); /* IE 9 */
    -moz-transform: translateX(-40%); /* Firefox */
    -webkit-transform: translateX(-40%); /* Safari 和 Chrome */
    -o-transform: translateX(-40%); /* Opera */
  }

  .titleZone {
    margin: 0 20px 20px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .zone {
      width: 511px;
      span {
        font-size: 14px;
      }
    }
  }

  .applicationInfo {
    padding-bottom: 23px;
    margin: 0 20px 20px;
    background: #fff;
    .accountPrice {
      position: absolute;
      top: 82px;
      right: 25px;
      color: #00BAFF;;
    }
    .saveBtn {
      .btn {
        margin-right: 10px;
      }
    }
    .btnZone {
      width: 268px;
      height: 30px;
    }
    .item {
      height: 70px;
      line-height: 70px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-left: 72px;
    }
    .row {
      border: 1px solid #ecf1f4;
      margin-left: 25px;
      margin-right: 25px;
      .rowItem {
        display: flex;
        color: #4A4A4A;
        height: 49px;
        line-height: 49px;
        .leftMark {
          flex: 2;
          height: 49px;
          display: flex;
          .leftZone {
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone {
            flex: 5;
            line-height: 49px;
            height: 49px;
            float: left;
            .el-textarea {
              box-sizing: border-box;
              padding-left: 13px;
            }
          }
        }
        .left {
          flex: 1;
          height: 49px;
          display: flex;
          .leftZone {
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone {
            flex: 2;
            line-height: 49px;
            height: 49px;
            float: left;
          }
        }
        .right {
          flex: 1;
          display: flex;
          .leftZone {
            flex: 1;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone {
            flex: 2;
            height: 49px;
            float: left;
          }
        }
      }
    }
  }

  .saveBtn {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-40%);
    -ms-transform: translateX(-40%); /* IE 9 */
    -moz-transform: translateX(-40%); /* Firefox */
    -webkit-transform: translateX(-40%); /* Safari 和 Chrome */
    -o-transform: translateX(-40%); /* Opera */
  }

  .return-info2_icon {
    background: url("../../../assets/images/icon/return-info2_icon.png");
    background-size: cover;
  }

  .return-list2_icon {
    background: url("../../../assets/images/icon/return-list2_icon.png");
    background-size: cover;
  }

  .out-info_icon {
    background: url("../../../assets/images/icon/out-info_icon.png");
    background-size: cover;
  }

  .return-money_icon {
    background: url("../../../assets/images/icon/return-money_icon.png");
    background-size: cover;
  }
</style>
