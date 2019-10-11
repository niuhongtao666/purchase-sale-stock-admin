<template>
  <div>
    <div class="titleZone">
      <div class="zone">
        <span>采购单号：{{model.purchaseOrderInfoDTO.purchaseOrderNo}}</span>
        <span>状态:{{model.purchaseOrderInfoDTO.orderState==100?'待采购':(model.purchaseOrderInfoDTO.orderState==200?'待收货':(model.purchaseOrderInfoDTO.orderState==300?'已完成':(model.purchaseOrderInfoDTO.orderState==400?'已取消':'')))}} </span>
        <span>创建时间：{{model.purchaseOrderInfoDTO.createTime | dateFormatToSecond}} </span>
        <span>关联采购申请：{{model.purchaseOrderInfoDTO.purchaseDataSource==100?'有':'无'}} </span>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>采购信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone"><i class="primary">*</i>供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model="model.purchaseOrderInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName" v-if="model.purchaseOrderInfoDTO.orderState==100">
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
            <div class="leftZone"><i class="primary">*</i>税率</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model="model.purchaseOrderInfoDTO.taxRate" v-if="model.purchaseOrderInfoDTO.orderState==100">
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
            <div class="leftZone">预计到货日</div>
            <div class="rightZone">
              <el-date-picker
                v-model="model.purchaseOrderInfoDTO.expectedArrivalTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
                default-time="12:00:00"
                class="activity-edit-date date-box innerInput"
                v-if="model.purchaseOrderInfoDTO.orderState==100"
              >
              </el-date-picker>
              <span v-else>
                {{model.purchaseOrderInfoDTO.expectedArrivalTime | dateFormatToSecond}}
              </span>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">采购门店</div>
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
            <div class="leftZone">取消采购数</div>
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
            <div class="leftZone">入库总价(含税)</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.inputTotalPrice}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">入库总价(不含税)</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.inputNoTaxPrice}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">采购员</div>
            <div class="rightZone">
              {{model.purchaseOrderInfoDTO.createUserName}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49">
          <div class="leftMark h-49">
            <div class="leftZone">备注</div>
            <div class="rightZone w480">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                v-model="model.purchaseOrderInfoDTO.memo"
                v-if="model.purchaseOrderInfoDTO.orderState==100"
              >
              </el-input>
              <span v-else>{{model.purchaseOrderInfoDTO.memo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>采购清单</h2>
      </div>
      <div class="btnZone"  v-if="model.purchaseOrderInfoDTO.orderState==100&&model.purchaseOrderInfoDTO.purchaseDataSource!=100">
        <button type="button" class="btn mr10" @click="addParts">新增</button>
        <button type="button" class="btn mr10"@click="importParts">导入配件</button>
        <!--<button type="button" class="btn mr10">导出配件</button>-->
        <button type="button" class="cancelBtn" @click='deleteData'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseOrderDetailDTOS"
              height="519"
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
                width="55"
                :selectable='checkboxT'
                v-if="(model.purchaseOrderInfoDTO.orderState==100&&model.purchaseOrderInfoDTO.purchaseDataSource!=100)||model.purchaseOrderInfoDTO.orderState==200"
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
                width="180"
                key="3"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                width="180"
                key="4"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                width="180"
                key="5"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="60"
                key="6"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                width="100"
                key="7"
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.orderNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                  <span v-else>{{scope.row.orderNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.number="scope.row.unitPrice" class="in" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                  <span v-else>{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价"
                width="100"
                key="9"
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                width="100"
                key="10"
              >
                <template slot-scope="scope">
                  {{scope.row.alreadyInputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(含税)"
                width="140"
                key="11"
              >
                <template slot-scope="scope">
                  {{scope.row.inputTotalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(不含税)"
                width="140"
                key="12"
              >
                <template slot-scope="scope">
                  {{scope.row.inputNoTaxPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="原采购数"
                width="100"
                key="13"
              >
                <template slot-scope="scope">
                  {{scope.row.originalNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="取消采购数"
                width="100"
                key="14"
              >
                <template slot-scope="scope">
                  {{scope.row.cancelNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                width="180"
                key="15"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.wavehouseId" @visible-change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                    <el-option
                      v-for="item in waveList"
                      :key="item.wavehouseId"
                      :label="item.wavehouseName"
                      :value="item.wavehouseId">
                    </el-option>
                  </el-select>
                  <span v-else>{{scope.row.wavehouseName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                width="180"
                key="16"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)" v-if="model.purchaseOrderInfoDTO.orderState==100">
                    <el-option
                      v-for="item in locationList"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationId">
                    </el-option>
                  </el-select>
                  <span v-else>{{scope.row.locationName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="100"
                key="17"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model="scope.row.memo" class="in" v-if="model.purchaseOrderInfoDTO.orderState==100">
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
        <i class="order-info_icon"></i>
        <h2>入库记录</h2>
      </div>
      <div class="btnZone w117" v-if="model.purchaseOrderInfoDTO.orderState==300">
        <button type="button" class="btn" @click="applicateToReturn" >申请退货</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll ">
            <!--<table class="table">
              <thead>
              <tr>
                <th v-if="model.purchaseOrderInfoDTO.orderState==300">
                  <label class="checkBox">
                    <input type="checkbox" :checked="checkInputStatus" @click='checkedInputAll'>
                    <span></span>
                  </label>
                </th>
                <th>序号</th>
                <th>入库单号</th>
                <th>入库数量</th>
                <th>入库金额</th>
                <th>入库人</th>
                <th>入库时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in inputInfos" :key="index">
                <td v-if="model.purchaseOrderInfoDTO.orderState==300">
                  <label class="checkBox">
                    <input type="checkbox" :checked="checkInputList.indexOf(data.id) > -1" @click='checkedInputOne(data.id)'>
                    <span></span>
                  </label>
                </td>
                <td>{{index+1}}</td>
                <td>{{data.inputOrderNo}}</td>
                <td>{{data.totalNum}}</td>
                <td>{{data.totalPrice}}</td>
                <td>{{data.inputUserName}}</td>
                <td>{{data.inputTIme | dateFormatToSecond }}</td>
              </tr>
              </tbody>
            </table>-->
            <el-table
              :data="inputInfos"
              height="250"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
              @selection-change="handleSelectionReturn"
            >
              <el-table-column
                type="selection"
                width="75"
                v-if="model.purchaseOrderInfoDTO.orderState==300"
              >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="75">
              </el-table-column>
              <el-table-column
                label="入库单号"
                width="218"
                key="3"
              >
                <template slot-scope="scope">
                  {{scope.row.inputOrderNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库数量"
                width="218"
                key="4"
              >
                <template slot-scope="scope">
                  {{scope.row.totalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库金额"
                width="218"
                key="5"
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库人"
                width="215"
                key="6"
              >
                <template slot-scope="scope">
                  {{scope.row.inputUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库时间"
                width="218"
                key="7"
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
        <i class="order-info_icon"></i>
        <h2>退货记录</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll ">
            <table class="table">
              <thead>
              <tr>
                <th>序号</th>
                <th>退货单号</th>
                <th>退货数量</th>
                <th>退货金额</th>
                <th>创建人</th>
                <th>退货时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in purchaseReturnInfoDTOS" :key="index">
                <td>{{index+1}}</td>
                <td>
                  <router-link class="primary" :to="'/purchasing-management/procurement-return/detail/'+data.id">
                    {{data.purchaseReturnNo}}
                  </router-link>
                </td>
                <td>{{data.returnTotalNum}}</td>
                <td>{{data.returnTotalPrice}}</td>
                <td>{{data.createUserName}}</td>
                <td>{{data.createTime | dateFormatToSecond}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click.prevent="saveInfo" v-if="model.purchaseOrderInfoDTO.orderState==100">保存</button>
        <button type="button" class="btn" v-if="model.purchaseOrderInfoDTO.orderState==100"  @click="statusUpdate('submitPurchase')">确认采购</button>
        <button type="button" class="btn" v-if="model.purchaseOrderInfoDTO.orderState==100" @click="statusUpdate('cancelPurchaseOrder')">取消</button>
        <button type="button" class="btn" @click="importWarehouse" v-if="model.purchaseOrderInfoDTO.orderState==200">确认入库</button>
        <button type="button" class="btn" @click="cancelOrder" v-if="model.purchaseOrderInfoDTO.orderState==200&&!this.inputInfos.length">取消采购单</button>
        <button type="button" class="btn" @click="cancelPro" v-if="model.purchaseOrderInfoDTO.orderState==200">取消采购数</button>
        <button type="button" class="btn" v-if="model.purchaseOrderInfoDTO.orderState==300">打印采购清单</button>
        <button type="button" class="btn" @click="exportPurList" v-if="model.purchaseOrderInfoDTO.orderState==200||model.purchaseOrderInfoDTO.orderState==300">导出采购明细</button>
      </div>
    </div>
    <addParts :popUp="popUp" @closeAddParts="closeAddParts" @getAddData="getAddData" ref="addParts" :saveUnitprice="saveUnitprice"></addParts>
    <importWare :importWareShow="importWareShow" @closeImportWare="closeImportWare" :importWareList="importWareList" @clearImportWareList="clearImportWareList" @setImportWareList="setImportWareList" @fetchData="fetchData" :purchaseOrderId="purchaseOrderId"></importWare>
    <importParts :importShow="importShow" @change="change"></importParts>
    <cancelProcurement :cancelProcurementShow="cancelProcurementShow" @cancelProHide="cancelProHide" :cancelProList="cancelProList" @setCancelProList="setCancelProList" @clearCancelProList="clearCancelProList" @fetchData="fetchData" :purchaseOrderId="purchaseOrderId"></cancelProcurement>
    <applicateReturn :applicateReturnShow="applicateReturnShow" @applicateToReturnHide="applicateToReturnHide" ref="returnList" :purchaseOrderId="purchaseOrderId"  @fetchData="fetchData" @clearInputList="clearInputList"></applicateReturn>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @statusUpdate="statusUpdate"></nt-reason>
  </div>
</template>

<script>
  // import addParts from './add-parts'
  import importParts from './importParts'
  import importWare from './importWare'
  import cancelProcurement from './cancelProcurement'
  import applicateReturn from './applicateReturnGoods'
  export default {
    name:'procurement-order-detail',
    components:{
      // addParts,
      importParts,
      importWare,
      cancelProcurement,
      applicateReturn
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
        suppliersList:[],//供应商列表
        taxRatesList:[
            {
              id:16,
              name:'16%'
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
      }
    },
    mounted() {
      //获取仓库
      this.getWave();
      this.purchaseOrderId=this.$route.params.purchaseOrderId;
      ////console.log(this.purchaseOrderId);
      this.fetchData();
      // //获取供应商
      this.getSupplier();
    },
    methods:{
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
        ////console.log(index);
        ////console.log(row)
        if(row.orderNum==row.alreadyInputNum||row.originalNum==row.cancelNum){
          return 0;
        }else{
          return 1;
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
              ////console.log(data);
              this.locationList=JSON.parse(JSON.stringify(data.value))
            }
          })
        }
      },
      //获取仓库
      getWave(){
        this.$axios.get('/admin/base/wavehouse/userStoreList').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.waveList=JSON.parse(JSON.stringify(data.value))
          }
        })
      },
      getLocal(goodsId,id,e){
        ////console.log(id);
        ////console.log(e);
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
                  ////console.log(val.locationId);
                  ////console.log(val.locationName);
                  value['locationId']=val.locationId;
                  value['locationName']=val.locationName;
                  ////console.log(inde);
                  ////console.log(val.locationName);
                  _this.$set(_this.model.purchaseOrderDetailDTOS,inde,value);
                }
              });
            }
          })
        }
      },
      clearLocation(goodsId,id,val){
        ////console.log(id);
        ////console.log(goodsId);
        var _this=this;
        // this.waveList
        if(!val){
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
        }
      },
      //选择退货
      handleSelectionReturn(val){
        ////console.log(val)
        var _this=this;
        if(val.length){
          val.forEach((val,index)=>{
            _this.checkInputList[index]=val['id'];
          });
        }
      },
      handleSelectionChange(val) {
        ////console.log(val);
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
          val['noTaxUnitPrice']=_this.AppUtils.mul(parseFloat(val['unitPrice']),0.84);
          val['noTaxWavehosuePrice']=_this.AppUtils.mul(parseFloat(val['noWavehosueNum']),parseFloat(val['noTaxUnitPrice']));
        });
        val.forEach((val)=>{
          this.checkList.push(val.goodsId);
        });
      },
      clearImportWareList(){
        this.importWareList=[];
      },
      clearCancelProList(){
        this.cancelProList=[];
      },
      setImportWareList(arg){
        ////console.log(arg);
        this.importWareList.push(arg);
      },
      setCancelProList(arg){
        ////console.log(arg);
        this.cancelProList.push(arg);
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            ////console.log('呱呱');
            if((_this.model.purchaseOrderInfoDTO.orderState==100&&_this.model.purchaseOrderInfoDTO.purchaseDataSource==100)||(_this.model.purchaseOrderInfoDTO.orderState==300)||(_this.model.purchaseOrderInfoDTO.orderState==400)){
              if (index === 3) {
                sums[index] = '总价:';
                return;
              }else if(index === 5){
                var total=0;
                ////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  ////console.log(val);
                  ////console.log(val.orderNum);
                  if(val.orderNum<=0){
                    val.orderNum=1;
                  }
                  total=_this.AppUtils.add(total,val.orderNum);//精度处理
                });
                ////console.log(typeof total);
                ////console.log(total);
                ////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
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
              }else if(index === 8){
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
              }else if(index === 9){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputTotalPrice){
                    val.inputTotalPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.inputTotalPrice);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 10){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputNoTaxPrice){
                    val.inputNoTaxPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.inputNoTaxPrice);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 11){
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
              }else if(index === 12){
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
                sums[index] = '总价:';
                return;
              }else if(index === 6){
                var total=0;
                ////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  ////console.log(val);
                  ////console.log(val.orderNum);
                  if(val.orderNum<=0){
                    val.orderNum=1;
                  }
                  total=_this.AppUtils.add(total,val.orderNum);//精度处理
                });
                ////console.log(typeof total);
                ////console.log(total);
                ////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
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
              }else if(index === 9){
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
              }else if(index === 10){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputTotalPrice){
                    val.inputTotalPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.inputTotalPrice);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 11){
                var total=0;
                this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                  if(!val.inputNoTaxPrice){
                    val.inputNoTaxPrice=0;
                  }
                  // total+=parseFloat(val.currentStock);//精度注释
                  total=_this.AppUtils.add(total,val.inputNoTaxPrice);//精度处理
                });
                sums[index]=total;
                return ;
              }else if(index === 12){
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
              }else if(index === 13){
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
        ////console.log(this.model.purchaseOrderDetailDTOS);
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
      //采购申请状态改变 （提交申请 取消 审批通过 驳回）
      statusUpdate(arg){
        ////console.log(this.model);
        this.$axios.post('/admin/purchase/purchaseOrder/statusUpdate/'+arg,this.model).then(res=>{
         let data = this.AppUtils.checkResponse(res);
         ////console.log(data);
          if(data) {
             if(arg=='submitPurchase'){
               this.$message.success('确认采购');
             }else if(arg=='cancelPurchaseOrder'){
               this.$message.success('取消采购成功');
             };
             this.fetchData();
           }
        })
      },
      //删除
      deleteData(){
        ////console.log(this.checkList);
        if(this.checkList.length){
          this.checkList.forEach((value,index)=>{
            var _this=this;
            var valuee=value;
            var inde=index;
            this.model.purchaseOrderDetailDTOS.forEach(function (val,ind) {
              if(valuee===val['goodsId']){
                _this.model.purchaseOrderDetailDTOS.splice(ind,1);
                _this.changeNumPrice();//重新计算请购数量，采购总价
                _this.$refs.addParts.getDeleteGoods(_this.checkList);
                _this.checkList=[];
                // _this.checkList.splice(index,1);
                // this.status=false;
                ////console.log(_this.checkList.length);
                ////console.log(_this.checkList);
                ////console.log(_this.model.purchaseOrderDetailDTOS);
                if(_this.model.purchaseOrderDetailDTOS.length==0){
                  _this.model.purchaseOrderInfoDTO.orderTotalNum=0;
                  _this.model.purchaseApplyInfoDTO.orderTotalPrice=0;
                }
                if(!_this.checkList.length){
                  // this.status=true;
                  ////console.log(_this.checkList);
                  ////console.log(_this.model.purchaseOrderDetailDTOS);
                  _this.status=false;
                  if(_this.model.purchaseOrderDetailDTOS.length==0){
                    _this.$refs.addParts.clearGoods();
                  }
                }else{
                  _this.status=false;
                }
              }
            })
          })
        }else{
          // this.status=false;
          this.changeNumPrice();//重新计算请购数量，采购总价
        }
      },
      saveInfo(){
        ////console.log(this.model.purchaseOrderDetailDTOS);
        ////console.log(this.model);
        var obj={};
        obj.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(this.model.purchaseOrderInfoDTO));
        obj.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(this.model.purchaseOrderDetailDTOS));
        this.$axios.post('/admin/purchase/purchaseOrder/update',obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
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
      /*changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
          ////console.log(val.orderNum);
          ////console.log(val.totalPrice);
          if(!val.orderNum){
            num=0;
          }else{
            num=val.orderNum;
          }
          allOrderNum+=parseFloat(num);
          ////console.log(typeof val.orderNum);
          ////console.log(typeof val.totalPrice);
          allTotalPrice+=parseFloat(val.totalPrice);

        });
        ////console.log(allOrderNum);
        if(allOrderNum){
          this.model.purchaseOrderInfoDTO.orderTotalNum=allOrderNum;
        }else{
          this.model.purchaseOrderInfoDTO.orderTotalNum=0;
        }
        ////console.log(allTotalPrice);
        if(allTotalPrice){
          this.model.purchaseOrderInfoDTO.orderTotalPrice=allTotalPrice;
        }else{
          this.model.purchaseOrderInfoDTO.orderTotalPrice=0;
        }
      },*/
      //计算总价
     /*getTotal(index,orderNum,unitPrice){
        ////console.log(index);
        ////console.log(orderNum);
        ////console.log(unitPrice);
        var totalPrice=parseFloat(orderNum)*parseFloat(unitPrice);
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
          this.$set(this.model.purchaseOrderDetailDTOS,index,this.model.purchaseOrderDetailDTOS[index])
        }else{
          this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
          this.$set(this.model.purchaseOrderDetailDTOS,index,this.model.purchaseOrderDetailDTOS[index])
        }
        this.changeNumPrice();
      },*/
      //获取认购清单表格数据
      getTotal(id,orderNum,unitPrice) {
        var _this = this;
        if (orderNum) {
          if (orderNum <= 0) {
            orderNum = 1;
          }
          if (Math.floor(orderNum) !== orderNum) {
            this.AppUtils.alert('请购数量为正整数');
          }
        } else {
          orderNum = 1;
        }
        ////console.log(typeof orderNum);
        ////console.log(orderNum);
        ////console.log(this.saveNum);
        if(_this.model.purchaseOrderInfoDTO.orderState==100&&_this.model.purchaseOrderInfoDTO.purchaseDataSource==100){
          if(_this.saveNum[id]){
            this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
              if(val['goodsId']==id){
                ////console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
                ////console.log(_this.saveNum[id])
                if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']!=this.saveNum[id]){
                  _this.AppUtils.alert('采购申请转采购单的数量无法修改');
                  _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
                  orderNum=_this.saveNum[id];
                  // _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=_this.AppUtils.mul(_this.model.purchaseOrderDetailDTOS[index]['orderNum'],_this.model.purchaseOrderDetailDTOS[index]['unitPrice']);
                  // ////console.log(_this.model.purchaseOrderDetailDTOS[index]['totalPrice']);
                  // _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index]);
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
            unitPrice=unitPrice.toFixed(2);
          }
        }
        if(parseFloat(unitPrice)<0){
          this.AppUtils.alert('单价不能为负');
        }
        ////console.log(typeof unitPrice);
        ////console.log(unitPrice);
        if((typeof unitPrice!=='number')&&(unitPrice!=='')){
          ////console.log(unitPrice);
          ////console.log(typeof unitPrice);
          // this.AppUtils.alert('单价不能为数字之外的其他字符');
        }else if(unitPrice===''){
          this.AppUtils.alert('请输入单价');
        }
        this.saveUnitprice[id]=unitPrice;
        ////console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(orderNum),unitPrice);//精度处理
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      getAddData(data,exit){
        ////console.log(data);
        var _this=this;
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            data.orderNum=parseFloat(data.applyNum);
            data.inputNoTaxPrice=0;
            ////console.log(data.inputNoTaxPrice)
            _this.model.purchaseOrderDetailDTOS.push(data);
            //处理价格和数量随时变动
            _this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.saveUnitprice);
          data.orderNum=parseFloat(data.applyNum);
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(_this.saveUnitprice[val['goodsId']]){
                data.unitPrice=_this.saveUnitprice[val['goodsId']];
              }else if(_this.saveUnitprice[val['goodsId']]==0){
                data.unitPrice=_this.saveUnitprice[val['goodsId']];
              }
              // data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);//精度注释
              data.totalPrice=_this.AppUtils.mul(parseFloat(data.unitPrice),parseFloat(data.orderNum));//精度处理
              _this.model.purchaseOrderDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              _this.changeNumPrice();
            }
          });
        }
      },
      /*getAddData(data,exit){
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            data.orderNum=data.applyNum;
            this.model.purchaseOrderDetailDTOS.push(data);
            //处理价格和数量随时变动
            this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.savePrice);
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(this.savePrice[val['goodsId']]){
                data.unitPrice=this.savePrice[val['goodsId']];
              }else if(this.savePrice[val['goodsId']]==0){
                data.unitPrice=this.savePrice[val['goodsId']];
              }
              data.orderNum=data.applyNum;
              data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.orderNum);
              ////console.log(data.orderNum);
              ////console.log(data.unitPrice)
              ////console.log(data.totalPrice);
              this.model.purchaseOrderDetailDTOS[index]['orderNum']=data.orderNum;
              this.model.purchaseOrderDetailDTOS[index]['unitPrice']=data.unitPrice;
              this.model.purchaseOrderDetailDTOS[index]['totalPrice']=data.totalPrice;
              // this.model.purchaseApplyDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              this.changeNumPrice();
            }
          });
        }
      },*/
      //设置供应商名称
      setSupplierName(arg){
        if(!arg){
          ////console.log(this.suppliersList);
          ////console.log(this.model.purchaseOrderInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseOrderInfoDTO.supplierId){
                this.model.purchaseOrderInfoDTO.supplierName=val.supplierName;
                ////console.log(val.supplierName);
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
            ////console.log(data);
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
            ////console.log(data);
            _this.model.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(data.value.purchaseOrderInfoDTO));
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
                _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
                _this.saveUnitprice[item.goodsId]=item.unitPrice;
                _this.saveNum[item.goodsId]=item.orderNum;
              });
            }
          }
        })
      },
      //新增配件
      addParts(){
        this.popUp=true;
      },
      closeAddParts(){
        this.popUp=false;
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
        ////console.log(this.checkInputList);
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
    margin: 0 20px 20px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .zone{
      width: 704px;
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
