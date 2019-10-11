<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-Info_icon"></i>
        <h2>采购信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone  titleReset">
          <span class="lColor">采购单号：<span class="rColor">{{model.purchaseOrderInfoDTO.purchaseOrderNo}}</span></span>
          <span class="lColor">状态:<span class="rColor">{{model.purchaseOrderInfoDTO.orderState==100?'待采购':(model.purchaseOrderInfoDTO.orderState==200?'待收货':(model.purchaseOrderInfoDTO.orderState==300?'已完成':(model.purchaseOrderInfoDTO.orderState==400?'已取消':'')))}} </span></span>
          <span class="lColor">创建时间：<span class="rColor">{{model.purchaseOrderInfoDTO.createTime | dateFormatToSecond}} </span></span>
          <span class="lColor">关联采购申请：
          <router-link :to='"/purchasing-management/procurement-application/detail/"+model.purchaseOrderInfoDTO.purchaseApplyId' v-if="model.purchaseOrderInfoDTO.purchaseApplyNo" target="_blank" class="rColor">
            {{model.purchaseOrderInfoDTO.purchaseApplyNo?model.purchaseOrderInfoDTO.purchaseApplyNo:''}}
          </router-link>
          <span v-else class="rColor">无</span>
        </span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName" v-if="model.purchaseOrderInfoDTO.orderState==100">
                <el-option
                  v-for="item in suppliersList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{model.purchaseOrderInfoDTO.supplierName}}</span>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>税率</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.taxRate" v-if="model.purchaseOrderInfoDTO.orderState==100"  @change="changeTax">
                <el-option
                  v-for="item in taxRatesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{model.purchaseOrderInfoDTO.taxRate?model.purchaseOrderInfoDTO.taxRate+'%':'0%'}}</span>
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone padding-left5">预计到货日</div>
            <div class="rightZone">
              <el-date-picker
                v-model.trim="model.purchaseOrderInfoDTO.expectedArrivalTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="请选择"
                class="activity-edit-date date-box innerInput"
                v-if="model.purchaseOrderInfoDTO.orderState==100"
              >
              </el-date-picker>
              <span v-else>
                {{model.purchaseOrderInfoDTO.expectedArrivalTime | formatDate}}
              </span>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone pl1">采购门店</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.storeName}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">采购数</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.orderTotalNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">采购总价</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.orderTotalPrice}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">原采购数</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.orderOriginalTotalNum}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone h49">取消采购数</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.orderCancelNum}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">入库数</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.inputNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">入库总价</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.inputTotalPrice | decimalTofixed2}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone font-size12">入库总价(不含税)</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.inputNoTaxPrice | decimalTofixed4}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">采购员</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.createUserName}}
            </div>
          </div>
        </div>
        <div class="rowItem h90">
          <div class="leftMark h90">
            <div class="leftZone h90 line-height90 pl1">备注</div>
            <div class="rightZone w480  h90 ml10">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                maxlength="500"
                v-model.trim="model.purchaseOrderInfoDTO.memo"
                v-if="model.purchaseOrderInfoDTO.orderState==100"
              >
              </el-input>
              <span v-else class="block">{{model.purchaseOrderInfoDTO.memo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-List_icon"></i>
        <h2>采购清单</h2>
      </div>
      <div class="btnZone"  v-if="model.purchaseOrderInfoDTO.orderState==100&&!model.purchaseOrderInfoDTO.purchaseApplyNo">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts" v-if="buttonInfo.purOrderImport">{{buttonInfo.purOrderImport}}</button>
        <!--<button type="button" class="btn mr10">导出配件</button>-->
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add resetTd">
            <el-table
              :data="model.purchaseOrderDetailDTOS"
              :max-height="maxHeight"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
              :summary-method="getSummaries"
              show-summary
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="50"
                :selectable='checkboxT'
                v-if="(model.purchaseOrderInfoDTO.orderState==100&&!model.purchaseOrderInfoDTO.purchaseApplyNo)||model.purchaseOrderInfoDTO.orderState==200"
              >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                min-width="60"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="100"
                key="7"
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.orderNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                  <span v-else>{{scope.row.orderNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                min-width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.unitPrice" class="in" min="0" step='0.1' @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                  <span v-else>{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价"
                min-width="100"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价(不含税)"
                min-width="140"
                key="10"
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价(不含税)"
                min-width="140"
                key="11"
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                min-width="100"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.alreadyInputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价"
                min-width="140"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTotalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(不含税)"
                min-width="140"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputNoTaxPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="原采购数"
                min-width="100"
                key="15"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.originalNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="取消采购数"
                min-width="100"
                key="16"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.cancelNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="17"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)" v-if="model.purchaseOrderInfoDTO.orderState==100" filterable clearable>
                    <el-option
                      v-for="item in waveList"
                      :key="item.wavehouseId"
                      :label="item.wavehouseName"
                      :value="item.wavehouseId">
                    </el-option>
                  </el-select>
                  <span v-else class="h30">{{scope.row.wavehouseName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="180"
                key="18"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)" v-if="model.purchaseOrderInfoDTO.orderState==100" filterable clearable>
                    <el-option
                      v-for="item in locationList"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationId">
                    </el-option>
                  </el-select>
                  <span v-else class="h30">{{scope.row.locationName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                min-width="100"
                key="19"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.trim="scope.row.memo" class="in" v-if="model.purchaseOrderInfoDTO.orderState==100">
                  <span v-else>{{scope.row.memo}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="model.purchaseOrderInfoDTO.orderState==200 || model.purchaseOrderInfoDTO.orderState==300">
      <div class="item">
        <i class="enter-List_icon"></i>
        <h2>入库记录</h2>
      </div>
      <div class="btnZone w117" v-if="(model.purchaseOrderInfoDTO.orderState==300)&&(buttonInfo.inputDetailByIds)">
        <button type="button" class="btn" @click="applicateToReturn" >{{buttonInfo.inputDetailByIds}}</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 10px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="inputInfos"
              max-height="449"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
              @selection-change="handleSelectionReturn"
            >
              <el-table-column
                type="selection"
                width="50"
                v-if="(model.purchaseOrderInfoDTO.orderState==300)&&(buttonInfo.inputDetailByIds)"
              >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="入库单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/inventory-management/purchase-warehousing/detail/'+scope.row.id" target="_blank">
                    {{scope.row.inputOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="入库数量"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库金额"
                min-width="218"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库人"
                min-width="215"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库时间"
                min-width="218"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTIme | dateFormatToSecond }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="model.purchaseOrderInfoDTO.orderState==300">
      <div class="item">
        <i class="return-List_icon"></i>
        <h2>退货记录</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 10px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="purchaseReturnInfoDTOS"
              max-height="440"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
            >
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="退货单号"
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/purchasing-management/procurement-return/detail/'+scope.row.id" target="_blank">
                    {{scope.row.purchaseReturnNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="returnTotalNum"
                label="退货数量"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="returnNoTaxTotalPrice"
                label="退货金额"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="创建人"
                min-width="180"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货时间"
                min-width="200"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click.prevent="saveInfo" v-if="(model.purchaseOrderInfoDTO.orderState==100)&&(buttonInfo.update)">{{buttonInfo.update}}</button>
        <button type="button" class="btn" v-if="(model.purchaseOrderInfoDTO.orderState==100)&&(buttonInfo.comfirmPurchase)"  @click="statusUpdate('submitPurchase')">{{buttonInfo.comfirmPurchase}}</button>
        <button type="button" class="btn bgWhite" v-if="(model.purchaseOrderInfoDTO.orderState==100)&&(buttonInfo.cancelPurchase)" @click="statusUpdate('cancelPurchaseOrder')">{{buttonInfo.cancelPurchase}}</button>
        <button type="button" class="btn" @click="importWarehouse" v-if="(model.purchaseOrderInfoDTO.orderState==200)&&buttonInfo.purchaseInput" >{{buttonInfo.purchaseInput}}</button>
        <button type="button" class="btn bgWhite" @click="cancelOrder" v-if="model.purchaseOrderInfoDTO.orderState==200&&!this.inputInfos.length&&(buttonInfo.cancelPurchase)">{{buttonInfo.cancelPurchase}}</button>
        <button type="button" class="btn bgWhite" @click="cancelPro" v-if="(model.purchaseOrderInfoDTO.orderState==200)&&(buttonInfo.cancelPurchaseNum)&&this.inputInfos.length">{{buttonInfo.cancelPurchaseNum}}</button>
        <button type="button" class="btn" v-if="(model.purchaseOrderInfoDTO.orderState==300)&&buttonInfo.print" @click="printOrder">打印采购清单</button>
        <button type="button" class="btn" @click="exportPurList" v-if="(model.purchaseOrderInfoDTO.orderState==200||model.purchaseOrderInfoDTO.orderState==300)&&buttonInfo.exportInDetail">{{buttonInfo.exportInDetail}}</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <importWare :importWareShow="importWareShow" @closeImportWare="closeImportWare" :importWareList="importWareList" @clearImportWareList="clearImportWareList" @setImportWareList="setImportWareList" @fetchData="fetchData" :purchaseOrderId="purchaseOrderId"  @selectAll="selectAll" :waveList="waveList"></importWare>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <cancelProcurement :cancelProcurementShow="cancelProcurementShow" @cancelProHide="cancelProHide" :cancelProList="cancelProList" @setCancelProList="setCancelProList" @clearCancelProList="clearCancelProList" @fetchData="fetchData" :purchaseOrderId="purchaseOrderId" @cancelInfosAll="cancelInfosAll"></cancelProcurement>
    <applicateReturn :applicateReturnShow="applicateReturnShow" @applicateToReturnHide="applicateToReturnHide" ref="returnList" :purchaseOrderId="purchaseOrderId"  @fetchData="fetchData" @clearInputList="clearInputList"></applicateReturn>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @statusUpdate="statusUpdate"></nt-reason>
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
    <!--<print v-if="printShow" :data="model" @hidePrintApplication="hidePrintApplication"></print>-->
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <!--<saleOrdersPrint></saleOrdersPrint>-->
        <procurementOrderPrint :data="model"></procurementOrderPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  // import print from './print'
  import importWare from './importWare'
  import cancelProcurement from './cancelProcurement'
  import applicateReturn from './applicateReturnGoods'
  import  printBox from '@/components/print-box'
  import procurementOrderPrint from './procurement-order-print'
  export default {
    name:'procurement-order-detail',
    components:{
      // importParts,
      importWare,
      cancelProcurement,
      applicateReturn,
      // print
      printBox,
      procurementOrderPrint
    },
    computed:{
      maxHeight(){
        if(this.model.purchaseOrderInfoDTO.orderState==100){
          return 580
        }else{
          return 523
        }
      },
      /*waves(){
        var wavesList=JSON.parse(localStorage.getItem('WarehousesByStoreId'));
        if(wavesList.length){
          this.waveList=wavesList;
        }
        return this.waveList;
      },*/
      buttonInfo() {
        return this.AppUtils.returnPermissions(6);
      },
    },
    data(){
      return{
        model:{
          purchaseOrderInfoDTO:{
            id:'',//采购申请id
            expectedArrivalTime:'',//期望到货日期
            memo:'',//备注
            supplierId:'',//供应商id
            supplierName:'',//供应商名称
            totalNum:'',//请购数量
            orderTotalPrice:'',//采购总价
          },
          purchaseOrderDetailDTOS:[],
        },
        printShow:false,//打印状态显示
        suppliersList:[],//供应商列表
        taxRatesList:[
            {
              id:16,
              name:'16%'
            },
            {
              id:13,
              name:'13%'
            },
            {
              id:10,
              name:'10%'
            },
            {
              id:6,
              name:'6%'
            },
            {
              id:3,
              name:'3%'
            },
            {
              id:0,
              name:'0%'
            }
        ],
        importType:'purchaseOrderImportGoods',// "采购单导入配件
        // buttonInfo:{},//按钮权限
        partMaskShow: false,//新增配件
        importShow:false,//导入配件显示状态
        importWareShow:false,//待收货-入库
        cancelProcurementShow:false,//取消采购弹层显示状态
        applicateReturnShow:false,//申请退货弹层显示
        purchaseOrderId:'',//采购订单id
        checkList:[],//选中列表
        checkInputList:[],//入库选中列表
        // 初始化全选按钮, 默认不选
        isCheckedAll: false,
        isCheckedInputAll:false,
        checkStatus:false,
        status:false,
        statusInput:false,
        savePrice:{},//保留原价
        saveUnitprice:{},//保存修改后的原价
        waveList:[],//仓库列表
        locationList:[],//库位列表
        inputInfos:[],//入库记录
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
        purchaseReturnInfoDTOS:[],//退货记录
        importWareList:[],//确认入库列表
        cancelProList:[],//取消采购数据
        reasonShow:false,//取消采购单二次确认显示状态
        reasonId:5,//控制标题
        storeId:null,//门店id
      }
    },
    mounted() {
      //获取仓库
      // this.getWave();
      // this.waveList=this.$store.state.waveHousesByStoreId;
      this.purchaseOrderId=this.$route.params.purchaseOrderId;
      //////console.log(this.purchaseOrderId);
      this.fetchData();
      // //获取供应商
      this.getSupplier();
      // this.buttonInfo=this.AppUtils.returnPermissions(6);
    },
    methods:{
      getWaveNew(){
        this.$store.dispatch("fetchWarehousetByByStoreId",this.storeId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data.value.length){
            ////console.log(data.value);
            this.waveList=data.value;
          };
        });
      },
      changeTax(arg){
        if(arg||arg==0){
          if(this.model.purchaseOrderDetailDTOS.length){
            var arrNew=JSON.parse(JSON.stringify(this.model.purchaseOrderDetailDTOS));
            //console.dir(arrNew)
            if(arrNew.length){
              var _this=this;
              var rateCheck=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
              ////console.log(rateCheck)
              arrNew.forEach((item)=>{
                ////console.log(item)
                // _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
                item['noTaxUnitPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(parseFloat(item['unitPrice']),rateCheck));
                item['noTaxTotalPrice']=this.AppUtils.mul(parseFloat(item['noTaxUnitPrice']),parseFloat(item['orderNum']))
              });
              this.model.purchaseOrderDetailDTOS=arrNew;
            }
          }
        }
      },
      printOrder(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      getImportData(arg) {
        ////console.log(arg);
        if (arg.length) {
          for (let val of arg) {
            val['totalPrice']=this.AppUtils.mul(val['unitPrice'],val['orderNum']);
            var rateCheck=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
            val['noTaxUnitPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(parseFloat(val['unitPrice']),rateCheck));
            val['noTaxTotalPrice']=this.AppUtils.mul(parseFloat(val['noTaxUnitPrice']),parseFloat(val['orderNum']))
            let index = checkDataExit(this.model.purchaseOrderDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.purchaseOrderDetailDTOS.push(...arg);
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.purchaseOrderDetailDTOS,this.checkList);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      //导出采购明细
      exportPurList(){
        this.$axios.post('/admin/purchase/purchaseOrder/exportInDetail/'+this.purchaseOrderId,this.model.purchaseOrderInfoDTO,{responseType:'arraybuffer'}).then(res => {
          // let data = this.AppUtils.checkResponse(res);
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '采购明细'+time+'.xls';
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
      //取消采购单
      cancelOrder(){
        this.reasonShow=true;
      },
      //隐藏原因弹框
      hideReason(){
        this.reasonShow=false;
      },
      checkboxT(row,index){
        //////console.log(index);
        //////console.log(row)
        // alert(this.model.purchaseOrderInfoDTO.orderState)
        if(this.model.purchaseOrderInfoDTO.orderState==100){
          return 1;
        }else{
          if(row.originalNum==row.alreadyInputNum||row.originalNum==row.cancelNum||row.originalNum==this.AppUtils.add(parseFloat(row.alreadyInputNum),parseFloat(row.cancelNum))){
            return 0;
          }else{
            return 1;
          }
        }
      },
      //获取库位
      getLocation(arg){
        if(!arg){
          this.AppUtils.alert('请先选择仓库');
        }else{
          this.$axios.get('/admin/base/locationInfo/listLocationByWaveId/'+arg).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              //////console.log(data);
              this.locationList=JSON.parse(JSON.stringify(data.value))
            }
          })
        }
      },
      getLocal(goodsId,id,e){
        //////console.log(id);
        //////console.log(e);
        var _this=this;
        if(e){
          this.getLocation(id);
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            var value=val;
            var inde=index;
            if(val['goodsId']===goodsId){
              var local=val['locationName'];
              _this.locationList.forEach((val)=>{
                if(val.locationId==local){
                  //////console.log(val.locationId);
                  //////console.log(val.locationName);
                  value['locationId']=val.locationId;
                  value['locationName']=val.locationName;
                  //////console.log(inde);
                  //////console.log(val.locationName);
                  _this.$set(_this.model.purchaseOrderDetailDTOS,inde,value);
                }
              });
            }
          })
        }
      },
      clearLocation(goodsId,id,val){
        //////console.log(id);
        //////console.log(goodsId);
        var _this=this;
        this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
          var valu=val;
          if(val['goodsId']===goodsId){
            val['locationName']=''
            _this.waveList.forEach((val)=>{
              if(val.wavehouseId==id){
                valu['wavehouseName']=val.wavehouseName;
              }
            });
          }
        })
        /*if(!val){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            var valu=val;
            if(val['goodsId']===goodsId){
              _this.waveList.forEach((val)=>{
                if(val.wavehouseId==id){
                  valu['wavehouseName']=val.wavehouseName;
                }
              });
            }
          })
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']===goodsId){
              val['locationName']=''
            }
          })
        }*/
      },
      //选择退货
      handleSelectionReturn(val){
        //////console.log(val)
        this.checkInputList=[];
        var _this=this;
        if(val.length){
          val.forEach((val,index)=>{
            _this.checkInputList[index]=val['id'];
          });
          //////console.log(_this.checkInputList);
        }
      },
      handleSelectionChange(val) {
        //////console.log(val);
        var _this=this;
        this.cancelProList=JSON.parse(JSON.stringify(val));
        this.importWareList=JSON.parse(JSON.stringify(val));
        this.cancelProList.forEach((val,index)=> {
          val['cancelNum']=_this.AppUtils.numSub(parseFloat(val['orderNum']),parseFloat(val['alreadyInputNum']));
          val['totalPrice']=_this.AppUtils.mul(val['cancelNum'],val['unitPrice']);
        })
        this.importWareList.forEach((val,index)=>{
          val['noWavehosueNum']=_this.AppUtils.numSub(parseFloat(val['orderNum']),parseFloat(val['alreadyInputNum']));
          val['noWavehosuePrice']=_this.AppUtils.mul(parseFloat(val['noWavehosueNum']),parseFloat(val['unitPrice']));
          val['noTaxUnitPrice']=_this.AppUtils.decimal4(_this.AppUtils.accDiv(parseFloat(val['unitPrice']),1.13));
          val['noTaxWavehosuePrice']=_this.AppUtils.mul(parseFloat(val['noWavehosueNum']),parseFloat(val['noTaxUnitPrice']));
        });
        this.checkList=val;
      },
      selectAll(){
        this.importWareList=JSON.parse(JSON.stringify(this.cancelProList));
      },
      cancelInfosAll(){
        this.cancelProList=JSON.parse(JSON.stringify(this.importWareList));
      },
      clearImportWareList(){
        this.importWareList=[];
      },
      clearCancelProList(){
        this.cancelProList=[];
      },
      setImportWareList(arg){
        //////console.log(arg);
        this.importWareList.push(arg);
      },
      setCancelProList(arg){
        //////console.log(arg);
        this.cancelProList.push(arg);
      },
      getSummaries(param) {
        //////console.log(param)
        const { columns, data } = param;
        const sums = [];
        //////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            //////console.log('呱呱');
            if((_this.model.purchaseOrderInfoDTO.orderState==100&&_this.model.purchaseOrderInfoDTO.purchaseApplyNo)||((_this.model.purchaseOrderInfoDTO.orderState==300)&&(_this.buttonInfo.inputDetailByIds))||(_this.model.purchaseOrderInfoDTO.orderState==400)){
              if (index === 3) {
                sums[index] = '合计';
                return;
              }else if(index === 5){
                var total=0;
                //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  //////console.log(val);
                  //////console.log(val.orderNum);
                  if(val.orderNum<0){
                    val.orderNum=0;
                  }
                  total=_this.AppUtils.add(total,val.orderNum);//精度处理
                });
                //////console.log(typeof total);
                //////console.log(total);
                //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
                this.model.purchaseOrderInfoDTO.orderTotalNum=total;
                if(this.model.purchaseOrderInfoDTO.orderTotalNum||this.model.purchaseOrderInfoDTO.orderTotalNum==0){
                  sums[index]=this.model.purchaseOrderInfoDTO.orderTotalNum;
                }else{
                  sums[index]=0;
                }
                return
              }else if(index === 7){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.totalPrice){
                    val.totalPrice=0;
                  }
                  // total+=parseFloat(val.totalPrice);//精度注释
                  total=_this.AppUtils.add(total,val.totalPrice);//精度处理
                });
                this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
                if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                  sums[index] =this.model.purchaseOrderInfoDTO.orderTotalPrice;
                }else{
                  sums[index]=0;
                }
                return ;
              }else if(index === 9){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.noTaxTotalPrice){
                    val.noTaxTotalPrice=0;
                  }
                  // total+=parseFloat(val.totalPrice);//精度注释
                  total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.noTaxTotalPrice));//精度处理
                });
                // this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
                if(total||total==0){
                  sums[index] =total;
                }else{
                  sums[index]=0;
                }
                return ;
              } else if(index === 10){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.alreadyInputNum){
                    val.alreadyInputNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.alreadyInputNum);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 11){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputTotalPrice){
                    val.inputTotalPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.inputTotalPrice));//精度处理
                });
                sums[index]=_this.AppUtils.decimal2(total);
                return ;
              }else if(index === 12){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputNoTaxPrice){
                    val.inputNoTaxPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.inputNoTaxPrice));//精度处理
                });
                sums[index]=_this.AppUtils.decimal4(total);
                return ;
              }else if(index === 13){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.originalNum){
                    val.originalNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.originalNum);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 14){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.cancelNum){
                    val.cancelNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.cancelNum);//精度处理
                });
                sums[index]=total;
                return ;
              }
            }else{
              if (index === 4) {
                sums[index] = '合计';
                return;
              }else if(index === 6){
                var total=0;
                //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  //////console.log(val);
                  //////console.log(val.orderNum);
                  if(val.orderNum<0){
                    val.orderNum=0;
                  }
                  total=_this.AppUtils.add(total,val.orderNum);//精度处理
                });
                //////console.log(typeof total);
                //////console.log(total);
                //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
                this.model.purchaseOrderInfoDTO.orderTotalNum=total;
                if(this.model.purchaseOrderInfoDTO.orderTotalNum||this.model.purchaseOrderInfoDTO.orderTotalNum==0){
                  sums[index]=this.model.purchaseOrderInfoDTO.orderTotalNum;
                }else{
                  sums[index]=0;
                }
                return
              }else if(index === 8){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.totalPrice){
                    val.totalPrice=0;
                  }
                  // total+=parseFloat(val.totalPrice);//精度注释
                  total=_this.AppUtils.add(total,val.totalPrice);//精度处理
                });
                this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
                if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                  sums[index] =this.model.purchaseOrderInfoDTO.orderTotalPrice;
                }else{
                  sums[index]=0;
                }
                return ;
              }else if(index === 10){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.noTaxTotalPrice){
                    val.noTaxTotalPrice=0;
                  }
                  // total+=parseFloat(val.totalPrice);//精度注释
                  total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.noTaxTotalPrice));//精度处理
                });
                // this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
                if(total||total==0){
                  sums[index] =total;
                }else{
                  sums[index]=0;
                }
                return ;
              } else if(index === 11){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.alreadyInputNum){
                    val.alreadyInputNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.alreadyInputNum);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 12){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputTotalPrice){
                    val.inputTotalPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.inputTotalPrice));//精度处理
                });
                sums[index]=_this.AppUtils.decimal2(total);
                return ;
              }else if(index === 13){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputNoTaxPrice){
                    val.inputNoTaxPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.inputNoTaxPrice));//精度处理
                });
                sums[index]=_this.AppUtils.decimal4(total);
                return ;
              }else if(index === 14){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.originalNum){
                    val.originalNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.originalNum);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 15){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.cancelNum){
                    val.cancelNum=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.cancelNum);//精度处理
                });
                sums[index]=total;
                return ;
              }
            }
        });
        //////console.log(this.model.purchaseOrderDetailDTOS);
        return sums;
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      statusUpdate(arg){
        //////console.log(this.model);
        if(arg=='submitPurchase'){
          this.$axios.post('/admin/purchase/purchaseOrder/comfirmPurchase',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            //////console.log(data);
            if(data) {
              this.$message.success('确认采购');
              this.fetchData();
            }
          })
        }else{
          this.$axios.post('/admin/purchase/purchaseOrder/cancelPurchase',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            //////console.log(data);
            if(data) {
              this.$message.success('取消采购成功');
              this.fetchData();
            }
          })
        }
      },
      saveInfo(){
        //////console.log(this.model.purchaseOrderDetailDTOS);
        //////console.log(this.model);
        var obj={};
        obj.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(this.model.purchaseOrderInfoDTO));
        obj.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(this.model.purchaseOrderDetailDTOS));
        this.$axios.post('/admin/purchase/purchaseOrder/update',obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.$message.success('保存成功');
            this.fetchData();
          }
        })
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
          if(val.orderNum<=0){
            num=1;
          }else{
            num=val.orderNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allOrderNum=_this.AppUtils.add(allOrderNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.totalPrice);//精度处理
        });
        if(allOrderNum){
          this.model.purchaseOrderInfoDTO.orderTotalNum=allOrderNum;
        }
        if(allTotalPrice){
          this.model.purchaseOrderInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },
      //获取认购清单表格数据
      getTotal(id,orderNum,unitPrice) {
        var _this = this;
        if (orderNum) {
          if (orderNum <= 0) {
            orderNum = 1;
          }
          if (Math.floor(orderNum) !== orderNum) {
            this.AppUtils.alert('请购数量为正整数');
            orderNum=Math.floor(orderNum);
          }
        } else {
          orderNum = 1;
        }
        //////console.log(typeof orderNum);
        //////console.log(orderNum);
        //////console.log(this.saveNum);
        if(_this.model.purchaseOrderInfoDTO.orderState==100&&_this.model.purchaseOrderInfoDTO.purchaseApplyNo){
          if(_this.saveNum[id]){
            this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
              if(val['goodsId']==id){
                //////console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
                //////console.log(_this.saveNum[id])
                if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']!=this.saveNum[id]){
                  _this.AppUtils.alert('采购申请转采购单的数量无法修改');
                  _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
                  orderNum=_this.saveNum[id];
                }
              }
            });
          };
        };
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            this.AppUtils.alert('单价小数点位数最多两位');
            str=str.substring(0,str.length-1);
            unitPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
        }
        if(unitPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          unitPrice=Math.abs(unitPrice);
        }
        if((unitPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入单价');
          unitPrice=0;
        }
        this.saveUnitprice[id]=unitPrice;
        //////console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(orderNum),unitPrice);//精度处理
        //////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.purchaseOrderInfoDTO.taxRate)/100);
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['unitPrice'],rateCheck);
              _this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.mul(_this.AppUtils.decimal4(_this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']),_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.purchaseOrderInfoDTO.taxRate)/100);
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['unitPrice'],rateCheck);
              _this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.mul(_this.AppUtils.decimal4(_this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']),_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      //设置供应商名称
      setSupplierName(arg){
        if(!arg){
          //////console.log(this.suppliersList);
          //////console.log(this.model.purchaseOrderInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseOrderInfoDTO.supplierId){
                this.model.purchaseOrderInfoDTO.supplierName=val.supplierName;
                //////console.log(val.supplierName);
              }
            });
          }
        }
      },
      //获取供应商列表
      getSupplier(){
        this.$axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.suppliersList=data.value;
          }
        })
      },
      //获取详情
      fetchData() {
        var _this=this;
        this.$axios.post('/admin/purchase/purchaseOrder/detail/'+this.purchaseOrderId).then(res=>{
          let data = _this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            _this.model.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(data.value.purchaseOrderInfoDTO));
            this.storeId=_this.model.purchaseOrderInfoDTO.storeId
            this.getWaveNew();
            if(data.value.purchaseOrderDetailDTOS.length){
              _this.model.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderDetailDTOS));
            }
            if(data.value.inputInfos.length){
                _this.inputInfos=JSON.parse(JSON.stringify(data.value.inputInfos));
            }
            if(data.value.purchaseReturnInfoDTOS.length){
              _this.purchaseReturnInfoDTOS=JSON.parse(JSON.stringify(data.value.purchaseReturnInfoDTOS));
            }
            _this.model.purchaseOrderInfoDTO.id=_this.purchaseOrderId;
            // getAlreadyGoodsId(arg)
            if(_this.model.purchaseOrderDetailDTOS.length){
              _this.model.purchaseOrderDetailDTOS.forEach((item)=>{
                // _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
                _this.saveUnitprice[item.goodsId]=item.unitPrice;
                _this.saveNum[item.goodsId]=item.orderNum;
              });
            }
          }
        })
      },
      addParts(data) {
        data['orderNum']=data['applyNum'];
        data['totalPrice']=this.AppUtils.mul(data['unitPrice'],data['orderNum']);
        ////console.log(data)
        if(data['unitPrice']){
          ////console.log( parseFloat(this.model.purchaseOrderInfoDTO.taxRate));
          var rateCheck=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
          ////console.log(rateCheck)
          data['noTaxUnitPrice']=this.AppUtils.accDiv(data['unitPrice'],rateCheck);
          data['noTaxTotalPrice']=this.AppUtils.mul(data['noTaxUnitPrice'],data['applyNum']);
        }else{
          data['noTaxUnitPrice']=0;
        }
        let index = checkDataExit(this.model.purchaseOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.purchaseOrderDetailDTOS[index].wavehouseId= data.wavehouseId;
            this.model.purchaseOrderDetailDTOS[index].wavehouseName= data.wavehouseName;
            this.model.purchaseOrderDetailDTOS[index].locationId= data.locationId;
            this.model.purchaseOrderDetailDTOS[index].locationName= data.locationName;
            this.model.purchaseOrderDetailDTOS[index].orderNum += data.orderNum;
            this.model.purchaseOrderDetailDTOS[index]['totalPrice']=this.AppUtils.mul(this.model.purchaseOrderDetailDTOS[index]['unitPrice'],this.model.purchaseOrderDetailDTOS[index]['orderNum']);
            this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.mul(this.AppUtils.decimal4(this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']),this.model.purchaseOrderDetailDTOS[index]['orderNum']);
          })
        } else {
          this.model.purchaseOrderDetailDTOS.push(data);
        }
      },
      //打开导入配件弹层
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //打开入库弹层
      importWarehouse(){
        if(this.importWareList.length){
          this.importWareShow=true;
        }else{
          this.AppUtils.alert('请选择入库配件');
        }
      },
      //关闭待收货-入库弹层
      closeImportWare(){
        this.importWareShow=false;
      },
      //取消采购数弹层显示
      cancelPro(){
        if(this.cancelProList.length){
          this.cancelProcurementShow=true;
        }else{
          this.AppUtils.alert('请先选择取消采购配件');
        }
      },
      //取消采购弹层隐藏
      cancelProHide(){
        this.cancelProcurementShow=false;
      },
      clearInputList(){
        this.checkInputList=[];
      },
      //申请退货弹层显示
      applicateToReturn(){
        //////console.log(this.checkInputList);
        if(this.checkInputList.length){
          this.applicateReturnShow=true;
          this.$refs.returnList.getDetail(this.checkInputList);
          this.$refs.returnList.getWave();
        }else{
          this.AppUtils.alert('请勾选入库记录')
        }
      },
      //申请退货弹层隐藏
      applicateToReturnHide(){
        this.applicateReturnShow=false;
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
    /*margin: 0 20px 20px;*/
    background: #fff;
    /*padding-top: 10px;*/
    /*padding-bottom: 10px;*/
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
