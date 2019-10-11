<template>
  <div>
    <div class="item">
      <div class="item-title">
        <i class="sale-info"></i>
        <h2>销售信息</h2>
      </div>
      <div class="order-info">
        <span class="lColor">销售单号：<span class="rColor mr0">{{model.saleOrderInfoDTO.saleOrderNo}}</span></span>
        <span class="lColor">状态：<span class="rColor mr0">{{model.saleOrderInfoDTO.orderState | saleOrderState}} </span></span>
        <span class="lColor mr0">创建时间：<span class="rColor mr0">{{model.saleOrderInfoDTO.createTime | dateFormatToSecond}} </span></span>
      </div>
      <div class="item-content ">
        <div class="table-layout" v-if="model.saleOrderInfoDTO.orderState===100">
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>客户电话</div>
                </div>
                <div class="right">
                  <input class="input" type="text" v-model="model.saleOrderInfoDTO.saleCustMobile">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>客户名称</div>
                </div>
                <div class="right">
                  <input class="input" type="text" v-model="model.saleOrderInfoDTO.saleCustName">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>单据类型</div>
                </div>
                <div class="right">

                  <el-select placeholder="请选择" class="el_box" v-model="model.saleOrderInfoDTO.billType">
                    <el-option
                      v-for="item in billTypesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>车牌号码</div>
                </div>
                <div class="right">
                  <input class="input" type="text" v-model="model.saleOrderInfoDTO.carNumber">

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
                  <div class="breaking">{{model.saleOrderInfoDTO.storeName}}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>销售员</div>
                </div>
                <div class="right">
                  <div class="breaking">{{model.saleOrderInfoDTO.saleUserName}}</div>
                </div>
              </div>
            </div>
            <div class="row" style="flex: 2">
              <div class="column">
                <div class="left">
                  <div>备注</div>
                </div>
                <div class="right">
                  <input class="input" maxlength="500" type="text " v-model="model.saleOrderInfoDTO.memo">

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row address-box">
              <div class="column">
                <div class="left">
                  <div>客户地址</div>
                </div>
                <div class="right">
                  <el-select placeholder="请选择" class="el_box" clearable @change="provinceChange"
                             v-model="model.saleOrderInfoDTO.addressProvinceId">
                    <el-option
                      v-for="item in provinceList"
                      :key="item.provinceId"
                      :label="item.provinceName"
                      :value="item.provinceId">
                    </el-option>
                  </el-select>
                  <el-select placeholder="请选择" class="el_box" clearable @change="cityChange"
                             v-model="model.saleOrderInfoDTO.addressCityId">
                    <el-option
                      v-for="item in cityList"
                      :key="item.cityId"
                      :label="item.cityName"
                      :value="item.cityId">
                    </el-option>
                  </el-select>
                  <el-select placeholder="请选择" class="el_box" clearable @change="districtChange"
                             v-model="model.saleOrderInfoDTO.addressAreaId">
                    <el-option
                      v-for="item in districtList"
                      :key="item.countyId"
                      :label="item.countyName"
                      :value="item.countyId">
                    </el-option>
                  </el-select>
                  <input class="input" maxlength="100" placeholder="请输入详细地址" v-model="model.saleOrderInfoDTO.address"
                         type="text">
                </div>
              </div>
            </div>
            <!--<div class="row">-->
            <!--<div class="column">-->
            <!--<div class="left">-->
            <!--<div><span class="required">*</span>详细地址</div>-->
            <!--</div>-->
            <!--<div class="right">-->

            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div class="table-layout" v-else>
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>客户电话</div>
                </div>
                <div class="right">
                  {{model.saleOrderInfoDTO.saleCustMobile}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>客户名称</div>
                </div>
                <div class="right">
                  {{model.saleOrderInfoDTO.saleCustName}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>单据类型</div>
                </div>
                <div class="right">
                  {{model.saleOrderInfoDTO.billType | billState}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>车牌号码</div>
                </div>
                <div class="right">
                  {{model.saleOrderInfoDTO.carNumber }}
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
                  <div class="breaking">{{model.saleOrderInfoDTO.storeName}}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>销售员</div>
                </div>
                <div class="right">
                  <div class="breaking">{{model.saleOrderInfoDTO.saleUserName}}</div>
                </div>
              </div>
            </div>
            <div class="row" style="flex: 2">
              <div class="column">
                <div class="left">
                  <div>备注</div>
                </div>
                <div class="right breaking">
                  {{model.saleOrderInfoDTO.memo}}

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row address-box">
              <div class="column">
                <div class="left">
                  <div>客户地址</div>
                </div>
                <div class="right breaking">
                  {{model.saleOrderInfoDTO.addressProvinceName}}
                  {{model.saleOrderInfoDTO.addressCityName}}
                  {{model.saleOrderInfoDTO.addressAreaName}}
                  {{model.saleOrderInfoDTO.address}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="item-title">
        <i class="sale-list"></i>
        <h2>销售清单</h2>
      </div>
      <div class="item-content ">
        <div class="btn-layout" v-if="model.saleOrderInfoDTO.orderState===100&&buttonInfo.update">
          <button type="button" class="btn" @click="partMaskShow=true">新增</button>
          <button type="button" class="btn" @click="importFlag=true">导入配件</button>
          <button type="button" class="btn" @click="delParts">删除</button>
        </div>
        <div class="table-layout border-none">
          <el-table
            ref="multipleTable"
            :data="model.saleOrderDetialDTOS"
            tooltip-effect="dark"
            border
            style="width: 100%"
            show-summary
            max-height="560"
            :summary-method="getSummaries"
            @selection-change="handleSelectionChange">
            <el-table-column
              v-if="model.saleOrderInfoDTO.orderState===100"
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              min-width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsVendorNo"
              label="生产编码"
              min-width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              min-width="220"
              show-overflow-tooltip
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
              min-width="50">
            </el-table-column>
            <el-table-column
              label="数量"
              prop="orderNum"
              min-width="80">
              <template slot-scope="scope">
                <div>
                  <input v-if="model.saleOrderInfoDTO.orderState===100" class="table-ipt-num" type="text"
                         v-model="scope.row.orderNum" @change="orderNumChange(scope.row)">
                  <span v-else>{{scope.row.orderNum}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="usableNum"
              label="可发料库存"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.currentStock-scope.row.lockStock}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="销售单价"
              min-width="90"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="销售总价"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  <!--{{scope.row.totalPrice | decimalTofixed2}}-->
                  {{Number((scope.row.orderNum*scope.row.unitPrice).toFixed(2))}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="favorablePrice"
              label="优惠金额"
              min-width="90"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="应收金额"
              prop="receivePrice"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{Number((scope.row.orderNum*scope.row.unitPrice-scope.row.favorablePrice).toFixed(2))}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  <input v-if="model.saleOrderInfoDTO.orderState===100" maxlength="500" class="table-ipt-num remark"
                         type="text"
                         v-model.number="scope.row.memo">
                  <span v-else class="breaking">{{scope.row.memo}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="currentStock"
              label="实际库存"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="lockStock"
              label="锁定库存"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>
    <div class="item" >
      <div class="item-title">
        <i class="recipt-info_icon"></i>
        <h2>收款信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="model.saleReceivableInfoDTOS"
            max-height="560"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="收款单号"
              prop="receivableInfoNo"
              min-width="200"
              show-overflow-tooltip
            >
              <!--<template slot-scope="scope">-->
              <!--<a class="primary" target="_blank" :href="'http://ydntest.n-cars.com.cn/main.html#/receipt/partsReceiptDetail/'+scope.row.id">-->
              <!--{{scope.row.receivableInfoNo}}-->
              <!--</a>-->
              <!--</template>-->
              <!--http://ydntest.n-cars.com.cn/main.html#/receipt/partsReceiptDetail/2169-->
            </el-table-column>
            <el-table-column
              prop="receivableMoney"
              label="收款金额"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="70">
              <template slot-scope="scope">
                <div>
                  {{scope.row.receivableState | receivableState}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.createTime | dateFormatToSecond}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="receivableUserName"
              label="收款人"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="收款时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.receivableTime | dateFormatToSecond}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item" v-if="model.stockLogDTOS.length">
      <div class="item-title">
        <i class="send-goods-info_icon"></i>
        <h2>发货信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="model.stockLogDTOS"
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
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary"
                             :to="'/inventory-management/material-out/detail/id/'+scope.row.id+'/businessType/1'">
                  {{scope.row.outputOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalNum"
              label="出库数量"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="receivePrice"
              label="销售总价"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="outputUserName"
              label="出库人"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="200"
              show-overflow-tooltip
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

    <div class="item" v-if="model.saleReturnInfoDTOS">
      <div class="item-title">
        <i class="service-info_icon"></i>
        <h2>售后信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="model.saleReturnInfoDTOS"
            max-height="560"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="售后单号"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="'/sales-management/sales-returns/detail/'+scope.row.id">
                  {{scope.row.returnNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="售后类型"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
               <span>
                  {{scope.row.refundType==1?"仅退款":(scope.row.refundType==2?"退货退款":"")}}
               </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="returnPrice"
              label="退款金额"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
               <span>
                 {{scope.row.returnState | returnState}}
               </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="110"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
               <span>
                 {{scope.row.createTime | dateFormatToSecond}}
               </span>
              </template>
            </el-table-column>
            <el-table-column
              label="完成时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
               <span>
                 {{scope.row.returnFinishTime | dateFormatToSecond}}
               </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="saveBtn">
      <button v-if="model.saleOrderInfoDTO.orderState===100&&buttonInfo.update" type="button" class="btn"
              @click="validateBeforeSubmit('save')">保存
      </button>
      <button v-if="model.saleOrderInfoDTO.orderState===100&&buttonInfo.payment" type="button" class="btn"
              @click="validateBeforeSubmit('sendReceipt')">{{buttonInfo.payment}}
      </button>
      <button v-if="model.saleOrderInfoDTO.orderState===100&&buttonInfo.discount" type="button" class="btn" @click="showDiscountMask">{{buttonInfo.discount}}
      </button>
      <button v-if="model.saleOrderInfoDTO.orderState===100&&buttonInfo.cancelSaleOrder" type="button" class="btn" @click="cancleOrder">{{buttonInfo.cancelSaleOrder}}
      </button>
      <button v-if="(model.saleOrderInfoDTO.orderState>100)&&buttonInfo.print" type="button" class="btn" @click="showPrintMask">打印销售单
      </button>
      <button v-if="model.saleOrderInfoDTO.orderState===200&&buttonInfo.cancelPayment" type="button" class="btn" @click="cancleReceipt">{{buttonInfo.cancelPayment}}
      </button>
      <button v-if="model.saleOrderInfoDTO.orderState===400&&((allCancel&&model.saleReturnInfoDTOS.length)||!model.saleReturnInfoDTOS.length)&&buttonInfo.saleOrderDetails" type="button" class="btn"
              @click="showRefundGoodsMoneyMask">{{buttonInfo.saleOrderDetails}}
      </button>
      <button type="button" class="btn" @click="exportSalesOrders" v-if="buttonInfo.erportDetail&&((model.saleOrderInfoDTO.orderState===200)||(model.saleOrderInfoDTO.orderState===300)||(model.saleOrderInfoDTO.orderState===400))">{{buttonInfo.erportDetail}}</button>
      <!--<button type="button" class="btn" @click="showRefundGoodsMoneyMask">退货退款</button>-->
      <button type="button" class="btn"  v-if="model.saleOrderInfoDTO.orderState===300&&buttonInfo.cancelSaleOrderAfter" @click="cancelSaleOrders">{{buttonInfo.cancelSaleOrderAfter}}</button>
    </div>
    <part-add v-if="partMaskShow" :isPartSale="true" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <import-parts v-if='importFlag' @importHide="importHide" @getImportData="getImportData"
                  importType="saleOrderImportGoods"></import-parts>
    <!--<refund-money v-if="refundMoneyFlag" @hideRefundMoneyMask="hideRefundMoneyMask"></refund-money>-->
    <return-goods-money v-if="refundGoodsMoneyFlag" :orderId="orderId"
                        @hideRefundGoodsMoneyMask="hideRefundGoodsMoneyMask"></return-goods-money>
    <discount-mask v-if="discountMaskShow" :discountData="discountData"
                   @hideDiscountMask="hideDiscountMask"></discount-mask>
    <print-box v-if="printMaskShow" @hidePrintMask="hidePrintMask">
      <template>
        <saleOrdersPrint :printData="JSON.parse(JSON.stringify(model))"></saleOrdersPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import printBox from '@/components/print-box'
  import saleOrdersPrint from './sales-orders-print'
  import returnGoodsMoney from './refund-goods-money'
  import discountMask from './discount-mask.vue'
  import {checkDataExit, checkCarNum, checkPhoneNum, isInteger} from '@/assets/js/logic'

  export default {
    name: 'sales-orders-detail',
    components: {
      saleOrdersPrint,
      returnGoodsMoney,
      discountMask,
      printBox
    },
    data() {
      return {
        provinceList: [],//省
        cityList: [],//市
        districtList: [],//区
        multiplePartSelection: [],
        orderId: this.$route.params.orderId,
        dataList: [],
        importFlag: false,//导入
        partMaskShow: false,//新增配件
        printMaskShow: false,//新增配件
        refundMoneyFlag: false,//申请退款
        refundGoodsMoneyFlag: false,//退货退款
        discountMaskShow: false,//配件折扣
        discountData: null,//配件折扣
        delList: [],//删除配件id列表
        storeId:null,//门店ID
        // orderId:null,//
        model: {
          saleReceivableInfoDTOS:[],
          saleOrderInfoDTO: {
            saleCustName: null,//客户姓名
            saleCustMobile: null,
            addressProvinceId: null,//	省份id
            addressProvinceName: null,//	省份名称
            addressCityId: null,//	城市id
            addressCityName: null,//	城市名称
            addressAreaId: null,//区级id
            addressAreaName: null,//	区级名称
            address: null, //具体地址
            billType: null, //账单类型 1售后精品 2配件外销
            carNumber: null, //车牌号
            orderState: null, //订单状态 0=初始化,100=待发起付款,200=待收款,300=待发货,400=已完成,500=已取消
            saleUserName: null, //销售员
            storeName: null, //销售门店
            createTime: null, //	创建时间
            updateTime: null, //修改时间，订单状态为已完成时为完成时间
            totalNum: null, //	销售订单总数量
            totalPrice: null, //	销售订单总金额
            memo: null,//备注
            discount: null,//	折扣率
            orderFavorablePrice: null,//	优惠金额
            orderReceivePrice: null,//应收金额
            orderDiscountReason: null,//打折原因
          },//销售单对象
          saleOrderDetialDTOS: [],//销售清单
          saleReceivableInfoDTO: null,//销售收款信息
          saleReturnInfoDTO: null,//售后主表详情
          stockLogDTOS: [],//发料记录
          deleted: [],//临时存放删除的配件
        },
        billTypesList: [
          {id: 7, name: "售后精品",},
          {id: 9, name: "配件外销",},
          // {id: 10, name: "内部领用",},
        ],
        // allCancel:false,
      }
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(13);
      },
      allCancel(){
        var filterArr=this.model.saleReturnInfoDTOS.filter(item=>item.returnState==300);
        //console.dir(filterArr)
        if(filterArr.length==this.model.saleReturnInfoDTOS.length){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted() {
      this.fetchProvinceList();
      this.fetchData();
      // this.orderId=this.$route.params.orderId;
    },
    methods: {
      cancelSaleOrders(){
        this.AppUtils.confirm('是否确定取消销售单?', () => {
            this.$axios.get('/admin/sale/saleOrderInfo/cancelSaleOrderAfter/'+this.orderId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if(data){
                console.log(data);
                this.$message.success('销售单已取消');
                this.fetchData();
              }
            });
        })
      },
      exportSalesOrders(){
        this.$axios.get('/admin/sale/saleOrderInfo/export/detail/'+this.orderId,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '销售清单'+time+'.xls';
          let blob = new Blob([res.data], { type: 'application/x-xls' })
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        });
      },
      printDemo() {
        this.$refs.easyPrint.print()
      },
      fetchData() {
        this.$axios.get(`/admin/sale/saleOrderInfo/detail/${this.orderId}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.model = data.value;
            this.storeId=this.model.saleOrderInfoDTO.storeId;
            if (this.model.saleOrderInfoDTO.addressProvinceId) {
              this.fetchCityList(this.model.saleOrderInfoDTO.addressProvinceId);
            }
            if (this.model.saleOrderInfoDTO.addressCityId) {
              this.fetchDistrictList(this.model.saleOrderInfoDTO.addressCityId);

            }
          }
        })
      },
      fetchProvinceList() {
        this.$store.dispatch('fetchProvinceList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.provinceList = data.value.data;
          }
        });
      },
      fetchCityList(provinceId) {
        this.$store.dispatch('fetchCityList', provinceId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.cityList = data.value.data;
          }
        });
      },
      fetchDistrictList(cityId) {
        this.$store.dispatch('fetchDistrictList', cityId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.districtList = data.value.data;
          }
        });
      },
      provinceChange(provinceId) {

        this.provinceList.find((val) => {
          if (val.provinceId === provinceId) {
            return this.model.saleOrderInfoDTO.addressProvinceName = val.provinceName;
          }
        });

        this.model.saleOrderInfoDTO.addressCityId = null;
        this.model.saleOrderInfoDTO.addressCityName = null;
        this.model.saleOrderInfoDTO.addressAreaId = null;
        this.model.saleOrderInfoDTO.addressAreaName = null;
        this.fetchCityList(provinceId)

      },
      cityChange(cityId) {
        this.cityList.find((val) => {
          if (val.cityId === cityId) {
            return this.model.saleOrderInfoDTO.addressCityName = val.cityName;
          }
        });
        this.model.saleOrderInfoDTO.addressAreaId = null;
        this.model.saleOrderInfoDTO.addressAreaName = null;
        this.fetchDistrictList(cityId)

      },
      districtChange(countyId) {
        this.districtList.find((val) => {
          if (val.countyId === countyId) {
            return this.model.saleOrderInfoDTO.addressAreaName = val.countyName;
          }
        })
      },
      validateBeforeSubmit(cb) {

        if (!this.model.saleOrderInfoDTO.saleCustMobile || !checkPhoneNum(this.model.saleOrderInfoDTO.saleCustMobile)) {
          return this.$message.error('客户电话为空或不正确');
        }
        /*if (this.model.saleOrderInfoDTO.carNumber) {
          let carNumber = checkCarNum(this.model.saleOrderInfoDTO.carNumber);
          if (carNumber) {
            this.model.saleOrderInfoDTO.carNumber = carNumber;
          } else {
            return this.$message.error('车牌号不正确');
          }
        }*/

        if (!this.model.saleOrderInfoDTO.saleCustName) {
          return this.$message.error('客户姓名不能为空');
        }
        if (!this.model.saleOrderInfoDTO.billType) {
          return this.$message.error('单据类型不能为空');
        }
        // if (!this.model.saleOrderDetialDTOS.length) {
        //   return this.$message.error('销售清单不能为空');
        // }

        let saleOrderDetialDTOS = this.model.saleOrderDetialDTOS;
        if (!saleOrderDetialDTOS.length) {
          return this.$message.error('销售清单不能为空');
        }
        for (let val of saleOrderDetialDTOS) {
          if (!isInteger(val.orderNum)) {
            return this.$message.error(`配件${val.goodsNo}的数量必须为整数`);
          }
        }
        this[cb]();
      },
      save() {//销售单修改保存
        this.model.deleted = this.delList;
        this.$axios.post('/admin/sale/saleOrderInfo/update', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.AppUtils.alert('保存成功', () => {
              this.fetchData();
            });
          }
        })
      },
      sendReceipt() {//发起收款
        this.AppUtils.confirm('是否确认发起收款', () => {
          this.model.deleted = this.delList;
          ////console.log(this.model);
          var arr=this.model.saleOrderDetialDTOS.filter(item=>item.orderNum==0);
          if(arr.length){
            var str=[];
            arr.forEach((item,index)=>{
              str.push(item.goodsNo);
            });
            var errStr=str.join(',');
            this.AppUtils.alert('销售清单配件'+errStr+'的数量不能为0');
          }else {
            this.$axios.post('/admin/sale/saleOrderInfo/payment', this.model).then(res => {
             let data = this.AppUtils.checkResponse(res);
             ////console.log(data);
             if (data) {
               this.AppUtils.alert('发起收款成功', () => {
                 this.fetchData();
               });
             }
           })
          }
        });

      },
      cancleOrder() {//取消订单
        this.AppUtils.confirm('是否确定取消订单', () => {
          this.$axios.post(`/admin/sale/saleOrderInfo/cancelSaleOrder/${this.orderId}`).then(res => {
            let data = this.AppUtils.checkResponse(res);
            ////console.log(data);
            if (data) {
              this.fetchData();
              this.AppUtils.alert('取消订单成功', () => {
                this.fetchData();

              });
            }
          })
        });
      },
      cancleReceipt() {//取消收款
        this.AppUtils.confirm('是否确定取消收款', () => {
          this.$axios.post(`/admin/sale/saleOrderInfo/cancelPayment/${this.orderId}`).then(res => {
            let data = this.AppUtils.checkResponse(res);
            ////console.log(data);
            if (data) {
              this.fetchData();
              this.AppUtils.alert('取消收款成功', () => {
                this.fetchData();

              });
            }
          })
        });

      },
      showPrintMask() {//打印销售单
        this.printMaskShow = true;

      },
      hidePrintMask() {
        this.printMaskShow = false;

      },
      handleSelectionChange(val) {
        this.multiplePartSelection = val;
      },

      addParts(data) {
        data.orderNum = data.applyNum;
        // data.totalPrice=this.AppUtils.mul(data.orderNum,data.unitPrice);
        data.favorablePrice = 0;
        let index = checkDataExit(this.model.saleOrderDetialDTOS, data);

        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.saleOrderDetialDTOS[index].orderNum += data.orderNum;//计算总数量
            this.model.saleOrderDetialDTOS[index]['totalPrice']=this.AppUtils.mul(this.model.saleOrderDetialDTOS[index].orderNum,this.model.saleOrderDetialDTOS[index].unitPrice)
            this.initDiscountInfo();
            this.$message.success('添加成功');
          })
        } else {
          this.model.saleOrderDetialDTOS.push(data);
          this.$message.success('添加成功');
          this.initDiscountInfo();
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      delParts() {
        if (!this.multiplePartSelection.length) {
          return this.AppUtils.alert('请选择要删除的配件');
        }
        let saleOrderDetialDTOS = this.model.saleOrderDetialDTOS;
        this.multiplePartSelection.forEach(val => {
          saleOrderDetialDTOS.forEach((part, index) => {
            if (val.goodsId === part.goodsId) {
              let delPart = saleOrderDetialDTOS.splice(index, 1)[0];
              delPart.id && this.delList.push(delPart.id);
            }

          })
        });
        this.initDiscountInfo();
      },
      importHide() { //关闭导入配件弹层
        this.importFlag = false;
      },
      getImportData(data) {
        let exitFlag = false;
        for (let val of data) {
          let index = checkDataExit(this.model.saleOrderDetialDTOS, val)
          if (index > -1) {
            exitFlag = true;
            return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
          }
        }

        !exitFlag && this.model.saleOrderDetialDTOS.push(...data);
        this.$message.success('导入成功');
      },
      showDiscountMask() {//配件打折
        this.discountMaskShow = true;
        let data = {
          discount: this.model.saleOrderInfoDTO.discount || 1,//	折扣率
          orderFavorablePrice: this.model.saleOrderInfoDTO.orderFavorablePrice || 0,//	优惠金额
          orderReceivePrice: this.model.saleOrderInfoDTO.orderReceivePrice || 0,//应收金额
          orderDiscountReason: this.model.saleOrderInfoDTO.orderDiscountReason,//打折原因
          dataList: this.model.saleOrderDetialDTOS
        };
        data['dataList'].forEach((item)=>{
          item['receivePrice']=Number((item.orderNum*item.unitPrice-item.favorablePrice).toFixed(2));
        });
        // console.dir(data)
        this.discountData = JSON.parse(JSON.stringify(data));
        // console.dir(this.discountData)
      },
      hideDiscountMask(data) {
        this.discountMaskShow = false;
        if (data) {
          this.model.saleOrderDetialDTOS = data.dataList;
          this.model.saleOrderInfoDTO.discount = data.discount;
          this.model.saleOrderInfoDTO.orderFavorablePrice = data.orderFavorablePrice;
          this.model.saleOrderInfoDTO.orderReceivePrice = data.orderReceivePrice;
          this.model.saleOrderInfoDTO.orderDiscountReason = data.orderDiscountReason;
        }
      },
      orderNumChange(data) {
        // this.model.saleOrderDetialDTOS[data.$index].orderNum = toInteger(data.row.orderNum);
        if (!isInteger(data.orderNum)) {
          return this.$message.error(`配件${data.goodsNo}的数量必须为整数`);
        }
        this.initDiscountInfo();
      },
      initDiscountInfo() {
        this.model.saleOrderInfoDTO.discount = 1;
        this.model.saleOrderInfoDTO.orderFavorablePrice = 0;
        this.model.saleOrderInfoDTO.orderReceivePrice = 0;
        this.model.saleOrderInfoDTO.orderDiscountReason = null;
        this.model.saleOrderDetialDTOS.forEach(val => {
          val.favorablePrice = 0;
        })
      },
      showRefundMoneyMask() {
        this.refundMoneyFlag = true;
      },
      hideRefundMoneyMask() {
        this.refundMoneyFlag = false;

      },
      showRefundGoodsMoneyMask() {
        this.refundGoodsMoneyFlag = true;
      },
      hideRefundGoodsMoneyMask(flag) {
        this.refundGoodsMoneyFlag = false;
        if (flag) {
          this.fetchData();
        }
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
          if (column.property === 'orderNum') {
            values = data.map(item => Number(item.orderNum))
          } else if (column.property === 'favorablePrice') {
            values = data.map(item => Number(item.favorablePrice))
          } else if (column.property === 'receivePrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice - item.favorablePrice));
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice));
          } else if (column.property === 'usableNum') {
            values = data.map(item => Number(item.currentStock - item.lockStock))
            ////console.log(values)
          } else if (column.property === 'currentStock') {
            values = data.map(item => Number(item.currentStock))
          } else if (column.property === 'lockStock') {
            values = data.map(item => Number(item.lockStock))
          }
          const computedPropertyArr = ['orderNum', 'favorablePrice', 'receivePrice', 'totalPrice', 'usableNum', 'currentStock', 'lockStock'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            if(column.property=='favorablePrice'){
              ////console.log(values);
            }
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(column.property=='favorablePrice'){
              ////console.log(sums[index]);
            }
            sums[index] = Number(sums[index].toFixed(2));
          }

        });
        return sums;
      }


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
    padding: 10px 0 10px 0px;
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

  .remark {
    width: 160px;
  }

  .recipt-info_icon {
    background: url("../../../assets/images/icon/recipt-info_icon.png");
    background-size: cover;
  }

  .send-goods-info_icon {
    background: url("../../../assets/images/icon/send-goods-info_icon.png");
    background-size: cover;
  }

  .service-info_icon {
    background: url("../../../assets/images/icon/service-info_icon.png");
    background-size: cover;
  }
</style>
