<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="application-Info_icon"></i>
        <h2>申请信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">申请单号：<span class="rColor">{{model.purchaseApplyInfoDTO.purchaseApplyNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">{{model.purchaseApplyInfoDTO.applyState==100?'待申请':(model.purchaseApplyInfoDTO.applyState==200?'待审批':(model.purchaseApplyInfoDTO.applyState==300?'待转采购':(model.purchaseApplyInfoDTO.applyState==400?'待采购入库':(model.purchaseApplyInfoDTO.applyState==500?'已取消':(model.purchaseApplyInfoDTO.applyState==800?'已采购入库':(model.purchaseApplyInfoDTO.applyState==700?'已驳回':''))))))}}</span></span>
          <span class="lColor">创建时间：<span class="rColor">{{model.purchaseApplyInfoDTO.createTime | dateFormatToSecond}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">申请门店</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.storeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">申请人</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.createUserName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseApplyInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName" v-if="model.purchaseApplyInfoDTO.applyState==100">
                <el-option
                  v-for="item in suppliersList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
                    <span style="float: left; font-size: 13px">{{ item.supplierName }}</span>
                    <span style="float: right; color: #00BAFF; font-size: 13px">{{ item.commonType==1?'通用':'自用'}}</span>
                </el-option>
              </el-select>
              <span v-else>{{model.purchaseApplyInfoDTO.supplierName}}</span>
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">预计到货日</div>
            <div class="rightZone">
              <el-date-picker
                v-model="model.purchaseApplyInfoDTO.expectedArrivalTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="请选择到货日期"
                class="activity-edit-date date-box innerInput"
                v-if="model.purchaseApplyInfoDTO.applyState==100"
              >
              </el-date-picker>
              <span v-else>
                {{model.purchaseApplyInfoDTO.expectedArrivalTime | formatDate}}
              </span>
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">请购数量</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.totalNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">总价(含税)</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.orderTotalPrice | decimalTofixed2}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">已转采购</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.convertOrderTotalNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone" style="padding-left: 0px">已入库数</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.inputTotalNum?model.purchaseApplyInfoDTO.inputTotalNum:0}}
            </div>
          </div>
        </div>
        <div class="rowItem borderBottom h90">
          <div class="leftMark h90">
            <div class="leftZone h89 line-height90">备注</div>
            <div class="rightZone w480 h90 " id="memo">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                maxlength="500"
                v-model.trim="model.purchaseApplyInfoDTO.memo"
                v-if="model.purchaseApplyInfoDTO.applyState==100"
              >
              </el-input>
              <span v-else class="block" >
                {{model.purchaseApplyInfoDTO.memo}}
              </span>
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom" v-if="model.purchaseApplyInfoDTO.applyState==300 || model.purchaseApplyInfoDTO.applyState==400 || model.purchaseApplyInfoDTO.applyState==800">
          <div class="left">
            <div class="leftZone h90 line-height90">审批人</div>
            <div class="rightZone h90 line-height90">
              {{model.purchaseApplyInfoDTO.approvalUserName}}
            </div>
          </div>
          <div class="left">
            <div class="leftZone h90 line-height90">审批时间</div>
            <div class="rightZone h90 line-height90">
              {{model.purchaseApplyInfoDTO.approvalTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h90 flex2">
            <div class="leftZone h90 line-height90">同意备注</div>
            <div class="rightZone flex5  h90 line-height90 block">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom" v-if="model.purchaseApplyInfoDTO.applyState==700">
          <div class="left">
            <div class="leftZone h90 line-height90">驳回人</div>
            <div class="rightZone line-height90">
              {{model.purchaseApplyInfoDTO.approvalUserName}}
            </div>
          </div>
          <div class="left">
            <div class="leftZone h90 line-height90">驳回时间</div>
            <div class="rightZone line-height90">
              {{model.purchaseApplyInfoDTO.rejectTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h90 flex2">
            <div class="leftZone h90  line-height90">驳回原因</div>
            <div class="rightZone flex5  overflow-scroll block h90">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom" v-if="model.purchaseApplyInfoDTO.applyState==500">
          <div class="left h90">
            <div class="leftZone h90 line-height90">取消人</div>
            <div class="rightZone line-height90">
              {{model.purchaseApplyInfoDTO.updateUserName}}
            </div>
          </div>
          <div class="left h90">
            <div class="leftZone h90 line-height90">取消时间</div>
            <div class="rightZone line-height90">
              {{model.purchaseApplyInfoDTO.updateTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h90 flex2">
            <div class="leftZone h90 line-height90">取消原因</div>
            <div class="rightZone flex5  overflow-scroll block h90">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="application-List_icon"></i>
        <h2>请购清单</h2>
      </div>
      <div class="btnZone" v-if="model.purchaseApplyInfoDTO.applyState==100">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts" v-if="buttonInfo.purApplyImport">{{buttonInfo.purApplyImport}}</button>
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseApplyDetailDTOS"
              max-height="492"
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
                width="35"
                :selectable='checkboxT'
                v-if="model.purchaseApplyInfoDTO.applyState==100||model.purchaseApplyInfoDTO.applyState==300"
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
              <!--<el-table-column-->
                <!--label="生产编码"-->
                <!--min-width="180"-->
                <!--key="4"-->
                <!--show-overflow-tooltip-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.goodsVendorNo}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="配件名称"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件品牌"
                min-width="120"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsBrandName}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="产地"-->
                <!--min-width="120"-->
                <!--key="6"-->
                <!--show-overflow-tooltip-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.goodsOriginArea}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="单位"
                min-width="90"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="请购数量"
                min-width="100"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.applyNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.applyNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价(含税)"
                min-width="120"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.unitPrice" class="in"  min='0' step='0.1' style="width: 90px!important;" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价(含税)"
                min-width="120"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.totalPrice" class="in" min='0' step='0.1'  style="width: 90px!important;" @input="getUnitPrice(scope.row.goodsId,scope.row.totalPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.totalPrice | decimalTofixed4}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="上次进价(含税)"
                min-width="115"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.lastPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="可发料库存"
                min-width="95"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际库存"
                min-width="80"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="锁定库存"
                min-width="80"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="已转采购数"
                min-width="95"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.convertOrderNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                min-width="80"
                key="15"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                min-width="100"
                key="16"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.trim="scope.row.memo" class="in"  maxlength="500" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.memo}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="model.purchaseApplyInfoDTO.applyState==300 || model.purchaseApplyInfoDTO.applyState==400 || model.purchaseApplyInfoDTO.applyState==800">
      <div class="item">
        <i class="order-List_icon"></i>
        <h2>关联采购单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseOrderInfoDTOS"
              max-height="450"
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
                label="采购单号"
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/purchasing-management/procurement-order/detail/'+scope.row.id" target="_blank">
                    {{scope.row.purchaseOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderTotalNum"
                label="采购数量"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="采购总价(含税)"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.orderTotalPrice | decimalTofixed2}}
                </template>
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
                label="创建时间"
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
        <button type="button" class="btn" @click.prevent="saveInfo" v-if="(model.purchaseApplyInfoDTO.applyState==100)&&(buttonInfo.update)">{{buttonInfo.update}}</button>
        <button type="button" class="btn" v-if="(model.purchaseApplyInfoDTO.applyState==100)&&(buttonInfo.comfirmPurchase)" @click="statusUpdate('submitApply',3)">{{buttonInfo.comfirmPurchase}}</button>
        <button type="button" class="btn" @click="convertPurOrder" v-if="(model.purchaseApplyInfoDTO.applyState==300)&&(buttonInfo.convert2PurOrder)">{{buttonInfo.convert2PurOrder}}</button>
        <button type="button" class="btn" @click='exportData' v-if="(model.purchaseApplyInfoDTO.applyState==100||model.purchaseApplyInfoDTO.applyState==200||model.purchaseApplyInfoDTO.applyState==300||model.purchaseApplyInfoDTO.applyState==400||model.purchaseApplyInfoDTO.applyState==800||model.purchaseApplyInfoDTO.applyState==500||model.purchaseApplyInfoDTO.applyState==700)&&buttonInfo.exportInDetail">{{buttonInfo.exportInDetail}}</button>
        <button type="button" class="btn bgWhite" v-if="(model.purchaseApplyInfoDTO.applyState==100)&&(buttonInfo.cancelPurchase)" @click="statusUpdate('cancelApply',4)">{{buttonInfo.cancelPurchase}}</button>
        <button type="button" class="btn" v-if="(model.purchaseApplyInfoDTO.applyState==200)&&(buttonInfo.passPurchase)" @click="statusUpdate('passApply',1)">{{buttonInfo.passPurchase}}</button>
        <button type="button" class="btn" v-if="(model.purchaseApplyInfoDTO.applyState==200)&&(buttonInfo.rejectPurchase)" @click="statusUpdate('rejectApply',2)">{{buttonInfo.rejectPurchase}}</button>
        <button type="button" class="btn" v-if="(model.purchaseApplyInfoDTO.applyState==300||model.purchaseApplyInfoDTO.applyState==400||model.purchaseApplyInfoDTO.applyState==800||model.purchaseApplyInfoDTO.applyState==500||model.purchaseApplyInfoDTO.applyState==700)&&buttonInfo.print" @click="printApplication">打印申请</button>
      </div>
    </div>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @getReason="getReason"></nt-reason>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
    <!--<print v-if="printShow" :data="model" @hidePrintApplication="printShow"></print>-->
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <!--<saleOrdersPrint></saleOrdersPrint>-->
        <procurementApplicationPrint :data="model"></procurementApplicationPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  import  printBox from '@/components/print-box'
  import procurementApplicationPrint from './procurement-application-print2'
  import print from './print'
  // import importParts from './importParts1'
  export default {
    name:'procurement-application-detail',
    components:{
      // importParts
      // print
      printBox,
      procurementApplicationPrint
    },
    data(){
      return{
        model:{
          purchaseApplyDetailDTOS: [],//采购申请详情
          purchaseOrderInfoDTOS:[],//关联采购单
          purchaseApplyInfoDTO:{
            id:'',//采购申请id
            expectedArrivalTime:'',//期望到货日期
            memo:'',//备注
            supplierId:'',//供应商id
            supplierName:'',//供应商名称
            totalNum:'',//请购数量
            orderTotalPrice:'',//采购总价
          },
        },
        printShow:false,//打印状态显示
        importType:'purchaseApplyImportGoods',//采购申请导入配件
        reasonShow:false,//原因弹层显示状态
        importShow:false,//导入配件显示状态
        partMaskShow: false,//新增配件
        reasonId:3,//同意1，驳回2 ，提交申请3 取消申请4
        purchaseApplyId:'',//采购申请id
        // buttonInfo:{},//按钮权限
        //申请信息
        checkList:[],//选中列表
        suppliersList:[],//供应商列表
        // importShow:false,//导入配件显示状态
        // 初始化全选按钮, 默认不选
        status:false,
        toOrderList:[],//采购申请转采购单列表
        storeId:null,
      }
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(5);
      },
    },
    mounted() {
      ////console.log(localStorage.getItem('loginMemory'));
      // this.buttonInfo=this.AppUtils.returnPermissions(5);
      ////console.log(this.buttonInfo);
      /*var buttonPermissions=this.$store.state.buttonPermissions;
      var newPath;
      var arr=this.$route.path.split('/');
      //////console.log(arr)
      if(arr.length>=4){
        newPath=arr.splice(0,3).join('/')+'/';
      }else{
        newPath=arr.splice(0,3).join('/');
      }
      if(buttonPermissions.length){
        var arrNew=buttonPermissions;
        var buttonSpecial=arrNew.filter(item=>item.url==newPath);
        if(buttonSpecial.length){
          ////console.log(buttonSpecial[0]['buttonInfo']);
          this.buttonInfo=buttonSpecial[0]['buttonInfo'];
        }
      };*/
      this.purchaseApplyId=this.$route.params.purchaseApplyId;
      //////console.log(this.purchaseApplyId);
      this.fetchData();
      //获取供应商
      this.getSupplier();
    },
    methods:{
      getUnitPrice(goodsId,totalPrice){
        var _this=this;
        var str = '' + totalPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('采购总价(含税)小数点位数最多四位');
            str=str.substring(0,str.length-1);
            totalPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价(含税)');
            totalPrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价(含税)');
            totalPrice=0;
          }
        }
        if(totalPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('采购总价(含税)不能为负');
          totalPrice=Math.abs(totalPrice);
        }
        if((totalPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入采购总价(含税)');
          totalPrice=0;
        }
        this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
          if(val['goodsId']==goodsId){
            _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
            _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=_this.AppUtils.decimalTen(_this.AppUtils.accDiv(_this.model.purchaseApplyDetailDTOS[index]['totalPrice'],_this.model.purchaseApplyDetailDTOS[index]['applyNum']));
            _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
          }
        });
      },
      printApplication(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      importParts(){
        this.importShow=true;
      },
      getImportData(arg) {
        if (arg.length) {
          for (let val of arg) {
            val['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(val['unitPrice'],val['applyNum']));
            let index = checkDataExit(this.model.purchaseApplyDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.purchaseApplyDetailDTOS.push(...arg);
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.purchaseApplyDetailDTOS,this.checkList);
        }
      },
      addParts(data) {
        data['unitPrice']=this.AppUtils.decimalTen(data['lastPrice']);
        data['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(data['unitPrice'],data['applyNum']));
        let index = checkDataExit(this.model.purchaseApplyDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.purchaseApplyDetailDTOS[index].applyNum += data.applyNum;
            this.model.purchaseApplyDetailDTOS[index]['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(this.model.purchaseApplyDetailDTOS[index]['unitPrice'],this.model.purchaseApplyDetailDTOS[index]['applyNum']));
          })
        } else {
          this.model.purchaseApplyDetailDTOS.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      exportData(){
        this.$axios.post('/admin/purchase/purchaseApply/exportInDetail/'+this.purchaseApplyId,this.model,{responseType:'arraybuffer'}).then(res => {
          // let data = this.AppUtils.checkResponse(res);
          let fileName = '采购申请单'+this.model.purchaseApplyInfoDTO.purchaseApplyNo+'.xls';
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
      checkboxT(row,index){
        //////console.log(index);
        //////console.log(row)
        if(row.applyNum==row.convertOrderNum){
          return 0;
        }else{
          return 1;
        }
      },
      handleSelectionChange(val) {
        //////console.log(val);
        this.toOrderList=JSON.parse(JSON.stringify(val));
        this.checkList=val;
      },
      //底部总价
      getSummaries(param) {
        //////console.log(param)
        const { columns, data } = param;
        const sums = [];
        //////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if(_this.model.purchaseApplyInfoDTO.applyState==100||_this.model.purchaseApplyInfoDTO.applyState==300){
            if (index === 3) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              var total=0;
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum)
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                //////console.log(val);
                //////console.log(val.applyNum);
                if(val.applyNum<=0){
                  val.applyNum=1;
                }
                total=_this.AppUtils.add(total,val.applyNum);//精度处理
              });
              //////console.log(typeof total);
              //////console.log(total);
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              this.model.purchaseApplyInfoDTO.totalNum=total;
              //////console.log(typeof this.model.purchaseApplyInfoDTO.totalNum);
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              if(this.model.purchaseApplyInfoDTO.totalNum||this.model.purchaseApplyInfoDTO.totalNum==0){
                sums[index]=this.model.purchaseApplyInfoDTO.totalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 8){
              var total=0;
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
              });
              this.model.purchaseApplyInfoDTO.orderTotalPrice=_this.AppUtils.decimal4(total);
              if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
                sums[index] =_this.AppUtils.decimal2(total);
              }else{
                sums[index]=0;
              }
              return ;
            }else if(index === 10||index === 11){
              var total=0;
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                if(!val.currentStock){
                  val.currentStock=0;
                }
                total=_this.AppUtils.add(total,val.currentStock);//精度处理
              });
              sums[index]=total;
              return ;
            }else if(index === 12||index === 13||index === 14){
              sums[index]=0;
              return ;
            }
          }else {
            if (index === 2) {
              sums[index] = '合计';
              return;
            }else if(index === 5){
              var total=0;
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum)
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                //////console.log(val);
                //////console.log(val.applyNum);
                if(val.applyNum<=0){
                  val.applyNum=1;
                }
                total=_this.AppUtils.add(total,val.applyNum);//精度处理
              });
              //////console.log(typeof total);
              //////console.log(total);
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              this.model.purchaseApplyInfoDTO.totalNum=total;
              //////console.log(typeof this.model.purchaseApplyInfoDTO.totalNum);
              //////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              if(this.model.purchaseApplyInfoDTO.totalNum||this.model.purchaseApplyInfoDTO.totalNum==0){
                sums[index]=this.model.purchaseApplyInfoDTO.totalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 7){
              var total=0;
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
              });
              this.model.purchaseApplyInfoDTO.orderTotalPrice=_this.AppUtils.decimal4(total);
              if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
                sums[index] =_this.AppUtils.decimal2(total);
              }else{
                sums[index]=0;
              }
              return ;
            }else if(index === 9||index === 10){
              var total=0;
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                if(!val.currentStock){
                  val.currentStock=0;
                }
                total=_this.AppUtils.add(total,val.currentStock);//精度处理
              });
              sums[index]=total;
              return ;
            }else if(index === 11||index === 12||index === 13){
              sums[index]=0;
              return ;
            }
          }
        });
        return sums;
      },
      //请购清单样式
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      //采购申请状态改变 （提交申请 取消 审批通过 驳回）
      statusUpdate(arg,reasonId){
        this.reasonId=reasonId;
        this.reasonShow=true;
        if(this.suppliersList.length){
          this.suppliersList.forEach((val)=>{
            if(val.id==this.model.purchaseApplyInfoDTO.supplierId){
              this.model.purchaseApplyInfoDTO.supplierName=val.supplierName;
            }
          });
        }
      },
      statusChange(arg){
        //////console.log(this.model);
        if(arg=='submitApply'){
          var arr=this.model.purchaseApplyDetailDTOS.filter(item=>Math.floor(item.applyNum)!=item.applyNum);
          if(arr.length){
            var infoArr=[];
            arr.forEach((item)=>{
              infoArr.push(item.goodsNo);
            })
            var infoStr=infoArr.join(',');
            this.AppUtils.alert('配件'+infoStr+'的数量需要是整数');
          }else{
            this.$axios.post('/admin/purchase/purchaseApply/comfirmPurchase',this.model).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                this.$message.success('提交申请成功');
                this.fetchData();
              }
            })
          }
        }else if(arg=='cancelApply'){
          this.$axios.post('/admin/purchase/purchaseApply/cancelPurchase',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              this.$message.success('取消申请成功');
              this.fetchData();
            }
          })
        }else if(arg=='passApply'){
          this.$axios.post('/admin/purchase/purchaseApply/passPurchase',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              this.$message.success('同意申请成功');
              this.fetchData();
            }
          })
        }else{
          this.$axios.post('/admin/purchase/purchaseApply/rejectPurchase',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              this.$message.success('驳回申请成功');
              this.fetchData();
            }
          })
        }
      },

      //设置供应商名称
      setSupplierName(arg){
        if(!arg){
          //////console.log(this.suppliersList);
          //////console.log(this.model.purchaseApplyInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseApplyInfoDTO.supplierId){
                this.model.purchaseApplyInfoDTO.supplierName=val.supplierName;
              }
            });
          }
        }else{
          this.getSupplier();
        }
      },
      //隐藏原因弹框
      hideReason(){
        this.reasonShow=false;
      },
      getReason(arg){
        //////console.log(arg);
        //////console.log(this.reasonId);
        var reason;
        //同意1，驳回2 ，提交申请3 取消申请4
        if(this.reasonId==1){
          reason="passApply";
        }else if(this.reasonId==2){
          reason= "rejectApply";
        }else if(this.reasonId==3){
          reason="submitApply";
        }else {
          reason="cancelApply";
        }
        this.model.purchaseApplyInfoDTO.reason=arg.reason;
        this.statusChange(reason);
      },
      //计算总价
      getTotal(id,applyNum,unitPrice) {
        var _this = this;
        if (applyNum) {
          if (applyNum <= 0) {
            applyNum = 1;
          }
          if (Math.floor(applyNum)!=applyNum) {
            ////console.log(applyNum);
            this.AppUtils.alert('请购数量为整数');
            applyNum=Math.floor(applyNum);
          }
        } else {
          applyNum = 1;
        }
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>10){
            this.AppUtils.alert('采购单价(含税)小数点位数最多十位');
            str=str.substring(0,str.length-1);
            unitPrice=parseFloat(str);
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购单价(含税)');
            unitPrice=0;
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购单价(含税)');
            unitPrice=0;
          }
        }
        if(unitPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('采购单价(含税)不能为负');
          unitPrice=Math.abs(unitPrice);
        }
        if((unitPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入采购单价(含税)');
          unitPrice=0;
        }
        // this.saveUnitprice[id]=unitPrice;
        var totalPrice=this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(applyNum),unitPrice));//精度处理
        if(totalPrice||totalPrice==0){
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseApplyDetailDTOS[index]['applyNum']=applyNum;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['applyNum']=applyNum;
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=0;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allApplyNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
          if(val.applyNum<=0){
            num=1;
          }else{
            num=val.applyNum;
          }
          allApplyNum=_this.AppUtils.add(allApplyNum,parseFloat(num));//精度处理
          allTotalPrice=_this.AppUtils.add(allTotalPrice,parseFloat(val.totalPrice));//精度处理
        });
        if(allApplyNum){
          this.model.purchaseApplyInfoDTO.totalNum=allApplyNum;
        }
        if(allTotalPrice){
          this.model.purchaseApplyInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },
      //获取详情
      fetchData() {
        this.$axios.post('/admin/purchase/purchaseApply/detail/'+this.purchaseApplyId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.model.purchaseApplyInfoDTO=JSON.parse(JSON.stringify(data.value.purchaseApplyInfoDTO));
            this.storeId=this.model.purchaseApplyInfoDTO.storeId;
            this.model.purchaseApplyDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseApplyDetailDTOS));
            this.model.purchaseOrderInfoDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderInfoDTOS));
            this.model.purchaseApplyInfoDTO.id=this.purchaseApplyId;
          }
        })
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
      saveInfo(){
        var arr=this.model.purchaseApplyDetailDTOS.filter(item=>Math.floor(item.applyNum)!=item.applyNum);
        if(arr.length){
          var infoArr=[];
          arr.forEach((item)=>{
            infoArr.push(item.goodsNo);
          })
          var infoStr=infoArr.join(',');
          this.AppUtils.alert('配件'+infoStr+'的数量需要是整数');
        }else {
          this.$axios.post('/admin/purchase/purchaseApply/update', this.model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              //////console.log(data);
              this.$message.success('保存成功');
              this.fetchData();
            }
          })
        }
      },
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //采购申请转采购订单
      convertPurOrder(){
        localStorage.removeItem('cloneOrderId');
        // localStorage.removeItem('supplier');
        var arr=JSON.parse(JSON.stringify(this.toOrderList));
        if(this.toOrderList.length){
          //////console.log(typeof arr);
          //////console.log(arr);
          arr.forEach((val)=>{
            val['orderNum']=val['haveNotConvertOrderNum'];
            val['totalPrice']=this.AppUtils.decimal4(parseFloat(val['orderNum'])*parseFloat(val['unitPrice']));
            delete val['applyNum'];
            val['alreadyInputNum']=0;
            val['inputTotalPrice']=0;
            val['inputNoTaxPrice']=0;
            val['originalNum']=0;
            val['cancelNum']=0;
          });
          //////console.log(typeof arr)
          //////console.log(arr)
            var supplier={
              supplierId:this.model.purchaseApplyInfoDTO.supplierId,
              supplierName:this.model.purchaseApplyInfoDTO.supplierName,
              expectedArrivalTime:this.model.purchaseApplyInfoDTO.expectedArrivalTime
            };
            localStorage.setItem('supplier',JSON.stringify(supplier));
          localStorage.setItem('purApplyInfoId',this.purchaseApplyId);
          localStorage.setItem('toOrder',JSON.stringify(arr));
          localStorage.setItem('applyNo',this.model.purchaseApplyInfoDTO.purchaseApplyNo);
          let routeData = this.$router.resolve({path:'/purchasing-management/procurement-order/add'});
          //////console.log(routeData)
          window.open(routeData.href, '_self');
        }else{
          this.AppUtils.alert('请选择转采购的配件');
        };
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
    bottom: 0px;
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
    .zone{
      /*width: 572px;*/
      span{
        font-size: 14px;
      }
      span+span{
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
      /*width: 355px;*/
      height: 30px;
      margin-bottom: 25px;
      button{
        float: left;
        margin-left: 26px;
        margin-top: 10px;
        margin-right: -20px;
      }
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
      border-bottom: none;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        height: 50px;
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
