<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="hostory-list_icon"></i>
        <h2>ERP工单发料记录</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add resetTd">
            <el-table
              :data="model.historyQueryDTO.historyOrderDTO"
              max-height="529"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="工单号"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.orderNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="门店名称"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.storeName}}
                </template>
              </el-table-column>
              <el-table-column
                label="门店编码"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.storeNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库名称"
                min-width="150"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.waveHouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位名称"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="150"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.batchNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单号"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.receiveId}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库单号"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.releaseId}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品编码"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品名称"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品生产编码"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品单位"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.qty}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库加权平均成本价（不含税）"
                min-width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inAveragePrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="销售单单价"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库日期"
                min-width="160"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inDate | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单价(含税)"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.taxPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单价(不含税）"
                min-width="140"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="税率"
                min-width="60"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.taxRate}}
                </template>
              </el-table-column>
              <el-table-column
                label="供应商编码"
                min-width="110"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.supplierNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="供应商名称"
                min-width="110"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.supplierName}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库时间"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.outDate | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="是否是套餐"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.isGoodsCombo==1?'是':'否'}}
                </template>
              </el-table-column>
              <el-table-column
                label="发料单号"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.issueNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="处理状态"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.status==1?'已处理':'未处理'}}
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="主键"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.historyOrderId}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="display: none">
      <div class="item">
        <i class="hostory-list_icon"></i>
        <h2>历史工单(合并后)</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add resetTd">
            <el-table
              :data="model.historyQueryDTO.mergeHistoryOrderDTO"
              max-height="529"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="工单号"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.orderNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="门店名称"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.storeName}}
                </template>
              </el-table-column>
              <el-table-column
                label="门店编码"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.storeNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库名称"
                min-width="150"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.waveHouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位名称"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.batchNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单号"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.receiveId}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库单号"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.releaseId}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品名称"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品生产编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品单位"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="60"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.qty}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库加权平均成本价（不含税）"
                min-width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inAveragePrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="销售单单价"
                min-width="110"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库日期"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inDate | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单价(含税)"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.taxPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库单价(不含税）"
                min-width="140"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="税率"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.taxRate}}
                </template>
              </el-table-column>
              <el-table-column
                label="供应商编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.supplierNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="供应商名称"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.supplierName}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库时间"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.outDate | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="是否是套餐"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.isGoodsCombo==1?'是':'否'}}
                </template>
              </el-table-column>
              <el-table-column
                label="发料单号"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.issueNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="处理状态"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.status==1?'已处理':'未处理'}}
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="主键"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.historyOrderId}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="parts-list_icon"></i>
        <h2>雅典娜工单配件表</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add resetTd">
            <el-table
              :data="model.jxcWorkParts"
              max-height="529"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编码"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.parts_id}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.parts_name}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.num}}
                </template>
              </el-table-column>
              <el-table-column
                label="价格方案"
                min-width="60"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.price_scheme_name}}
                </template>
              </el-table-column>
              <el-table-column
                label="单价"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column
                label="总价"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.total_price}}
                </template>
              </el-table-column>
              <el-table-column
                label="优惠价"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.discount_price}}
                </template>
              </el-table-column>
              <el-table-column
                label="是否是套餐"
                min-width="60"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.is_additional==1?'是':'否'}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="materialOut-List_icon"></i>
        <h2>进销存发料单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add resetTd">
            <el-table
              :data="model.orderDeliverDetailDTOS"
              max-height="529"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="发料单编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.deliverOrderNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品名称"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="200"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="一级类别"
                min-width="130"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsFirstClass}}
                </template>
              </el-table-column>
              <el-table-column
                label="一级类别名称"
                min-width="130"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsFirstClassName}}
                </template>
              </el-table-column>
              <el-table-column
                label="是否是套餐"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.isMeal==1?'是':'否'}}
                </template>
              </el-table-column>
              <el-table-column
                label="商品单位"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库名称"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.waveHouserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位名称"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.orderNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="已发料数"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.alreadySendNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="待发料数"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.waitDeliverNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="税率"
                min-width="50"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.taxRate}}
                </template>
              </el-table-column>
              <el-table-column
                label="价格方案"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.priceType}}
                </template>
              </el-table-column>
              <el-table-column
                label="单价"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.unitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="总价"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="优惠价"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.favourablePrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="不含税单价"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="不含税总价"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxTotalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际销售单价"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.saleUnitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际销售总价"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.saleTotalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="不含税实际销售单价"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.saleNoTaxUnitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="不含税实际销售总价"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.saleNoTaxTotalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                min-width="170"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="修改时间"
                min-width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.updateTime | dateFormatToSecond}}
                </template>
              </el-table-column>
              <el-table-column
                label="删除标记"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.deleted}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'order-management-detail',
    components:{
    },
    computed:{
    },
    data(){
      return{
        orderId:null,//工单id
        order:null,//工单
        model:{
          historyQueryDTO:{},
          jxcWorkParts:[],
          orderDeliverDetailDTOS:[]
        },
      }
    },
    mounted() {
      this.orderId=this.$route.params.orderId;
      this.order=this.$route.params.order;
      this.fetchData();
    },
    methods:{
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      fetchData() {
        var _this=this;
        this.$axios.get('/admin/history/order/detail?order='+this.order+'&orderId='+this.orderId).then(res=>{
          let data = _this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data)
            this.model=data.value;
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .saveZone{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left:0px;
    bottom: -19px;
  }
  .saveBtn{
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 55%;
    bottom: 0px;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%); 	/* Opera */
  }
  .titleZone{
    margin: 0 20px 20px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .zone{
      /*width: 1004px;*/
      span{
        font-size: 14px;
      }
      span + span {
        margin-left: 20px;
      }
    }
  }
  .applicationInfo{
    padding-bottom: 23px;
    margin: 0 20px 20px;
    background: #fff;
    .saveBtn{
      .btn{
        margin-right: 10px;
      }
    }
    .btnZone{
      width: 272px;
      height: 30px;
      margin-bottom: 25px;
    }
    .item {
      height: 70px;
      line-height: 70px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-left: 72px;
    }
    .row{
      border: 1px solid #ecf1f4;
      margin-left: 25px;
      margin-right: 25px;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        height: 49px;
        line-height: 49px;
        .leftMark{
          flex: 2;
          height: 49px;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 11;
            line-height: 49px;
            height: 49px;
            float: left;
          }
        }
        .left{
          flex: 1;
          height: 49px;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            line-height: 49px;
            height: 49px;
            float: left;
          }
        }
        .right{
          flex: 1;
          display: flex;
          .leftZone{
            flex: 1;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            height: 49px;
            float: left;
          }
        }
      }
    }
  }
</style>
