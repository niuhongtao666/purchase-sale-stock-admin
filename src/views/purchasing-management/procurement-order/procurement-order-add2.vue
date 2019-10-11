<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-Info_icon"></i>
        <h2>申请信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName">
                <el-option
                  v-for="item in suppliersList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
                    <span style="float: left; font-size: 13px">{{ item.supplierName }}</span>
                    <span style="float: right; color: #00BAFF; font-size: 13px">{{ item.commonType==1?'通用':'自用'}}</span>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>税率</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.taxRate" filterable clearable @change="changeTax">
                <el-option
                  v-for="item in taxRatesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">预计到货日</div>
            <div class="rightZone">
              <el-date-picker
                v-model.trim="model.purchaseOrderInfoDTO.expectedArrivalTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="请选择"
                class="activity-edit-date date-box innerInput"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="rowItem h90">
          <div class="left h90">
            <div class="leftZone flex1 h90 line-height90" style="padding-left: 1px">备注</div>
            <div class="rightZone w480 flex8 mark">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                maxlength="500"
                v-model.trim="model.purchaseOrderInfoDTO.memo">
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="position: relative;">
      <!--<div class="accountPrice">数量: {{model.purchaseOrderInfoDTO.orderTotalNum}} 采购总价: {{model.purchaseOrderInfoDTO.orderTotalPrice}}</div>-->
      <div class="item">
        <i class="order-List_icon"></i>
        <h2>采购清单</h2>
      </div>
      <div class="btnZone" v-if="!this.appToOrderId">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts" v-if="buttonInfo.purOrderImport">{{buttonInfo.purOrderImport}}</button>
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:25px;">
          <div class="table_scroll add">
            <!--<Table border :columns="columns" :data="model.purchaseOrderDetailDTOS" height="200"></Table>-->
           <el-table
              :data="model.purchaseOrderDetailDTOS"
              max-height="580"
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
                v-if="!this.appToOrderId"
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
              <el-table-column
                label="单位"
                min-width="50"
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
                  <input type="number" v-model.number="scope.row.orderNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价(含税)"
                min-width="115"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.unitPrice" class="inputWidth" min="0" step='0.1' @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
                  <!--<el-input v-model="scope.row.unitPrice" class="inputWidth" min="0" step='0.1' @change="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)"></el-input>-->
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价(含税)"
                min-width="115"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <!--{{scope.row.totalPrice | decimalTofixed4}}-->
                  <input type="number"  v-model="scope.row.totalPrice" class="inputWidth" min="0" step='0.1' @input="getUnitPrice(scope.row.goodsId,scope.row.totalPrice)" title="">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价(不含税)"
                min-width="130"
                key="10"
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价(不含税)"
                min-width="130"
                key="11"
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                min-width="80"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                    {{scope.row.alreadyInputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(含税)"
                min-width="115"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTotalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(不含税)"
                min-width="130"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputNoTaxPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="原采购数"
                min-width="80"
                key="15"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.originalNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="取消采购数"
                min-width="95"
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
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)" filterable clearable>
                    <el-option
                      v-for="item in waveList"
                      :key="item.wavehouseId"
                      :label="item.wavehouseName"
                      :value="item.wavehouseId">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="180"
                key="18"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @change="locationChange(scope.row)" @visible-change="fetchLocationInfoByWaveId(scope.row.wavehouseId,$event)" v-el-select-loadmore="loadmore" @blur="reBack" filterable remote :remote-method="searchLocation">
                    <el-option
                      v-for="item in locals"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationName"
                    >
                    </el-option>
                  </el-select>
                  </template>
              </el-table-column>
              <el-table-column
                label="备注"
                min-width="100"
                key="19"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.trim="scope.row.memo" class="in">
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="saveInfo" v-if="buttonInfo.add">保存</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  export default {
    directives: {
      'el-select-loadmore': {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
          SELECTWRAP_DOM.addEventListener('scroll', function () {
            /**
             * scrollHeight 获取元素内容高度(只读)
             * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
             * clientHeight 读取元素的可见高度(只读)
             * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
             * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
             */
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            if (condition) {
              binding.value();
            }
          });
        }
      }
    },

    name:'procurement-order-add',
    components:{
      // importParts
    },
    data(){
      return{
        pageIndex:1,
        model:{
          purchaseOrderDetailDTOS: [
            /*{
              applyNum:'',//请购数量
              currentStock:'',//当前库存
              goodsId:'',//商品ID
              goodsName:'',//配件名称
              goodsNo: '',//配件编号
              goodsUnit:'',//单位
              goodsVendorNo: '',//生产编码
              lastPrice:'',//上次采购价
              memo:'',//备注
              totalPrice: '',//总价
                  unitPrice: '',//单价
            },*/
          ],
          purchaseOrderInfoDTO: {
            expectedArrivalTime:'',//期望到货日期
            memo:'',//备注
            supplierId:'',//供应商id
            supplierName:'',//供应商名称
            taxRate:'13%',//税率
            totalNum:0,//请购数量
            orderTotalPrice:0,//采购总价
          }
        },
        importType:'purchaseOrderImportGoods',// "采购单导入配件
        partMaskShow: false,//新增配件
        importShow:false,//导入配件显示状态
        suppliersList:[],//供应商列表
        isCheckedAll: false,
        checkList:[],
        checkStatus:false,
        status:false,
        savePrice:{},//保留原价
        cloneOrderId:'',//克隆id
        saveUnitprice:{},//保存修改后的原价
        appToOrderId:'',//采购申请转采购单id
        waveList:[],//仓库列表
        locationList:'',//库位列表
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
        storeId:null,//门店id
        loading: true,
        // buttonInfo:{},//按钮权限
        taxRatesList:[
          {
            id:0,
            name:'16%'
          },
          {
            id:1,
            name:'13%'
          },
          {
            id:2,
            name:'10%'
          },
          {
            id:3,
            name:'6%'
          },
          {
            id:4,
            name:'3%'
          },
          {
            id:5,
            name:'0%'
          },
        ]
      }
    },
    computed:{
      waves(){
        //////console.log(JSON.parse(localStorage.getItem('WarehousesByStoreId')));
      },
      buttonInfo() {
        return this.AppUtils.returnPermissions(6);
      },
      locals(){
        if(this.locationList!=''){
          var locals=JSON.parse(this.locationList);
          //console.log(locals);
          return locals;
        }else{
          var arr=[];
          return arr
        }
      }
      // localist(){
      //   var loca=JSON.parse(sessionStorage.getItem('wave'));
      //   alert(loca);
      //   return loca;
      // },
    },
    mounted(){
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.storeId=userInfos['storeId'];
      // this.buttonInfo=this.AppUtils.returnPermissions(6);
      var supplier=JSON.parse(localStorage.getItem('supplier'));
     //console.log(supplier);
     if(supplier){
       // this.buttonInfo=this.AppUtils.returnPermissions(6);
       if(supplier.supplierId){
         this.model.purchaseOrderInfoDTO.supplierId=supplier.supplierId;
       }
       if(supplier.supplierName){
         this.model.purchaseOrderInfoDTO.supplierName=supplier.supplierName;
       }
       if(supplier.expectedArrivalTime){
         this.model.purchaseOrderInfoDTO.expectedArrivalTime=supplier.expectedArrivalTime;
       }
     }
     // ////console.log(333);
      //获取仓库
      this.getWaveNew();
      // this.getWave();
      //获取供应商列表
      this.cloneOrderId=localStorage.getItem("cloneOrderId");
      //////console.log(this.cloneOrderId);
      if(this.cloneOrderId){
        this.getClone(this.cloneOrderId);
      };
      //////console.log(localStorage.getItem("toOrder"));
      if(localStorage.getItem("purApplyInfoId")){
        this.appToOrderId=localStorage.getItem("purApplyInfoId");
        //////console.log(this.appToOrderId)
      }
      var arr=localStorage.getItem("toOrder");
      //////console.log(arr);
      if(JSON.parse(arr)&&JSON.parse(arr)['length']){
        var arrNew=JSON.parse(arr);
        if(arrNew.length){
          var _this=this;
          arrNew.forEach((item)=>{
            ////console.log(item)
            // _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
            item['noTaxUnitPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(parseFloat(item['unitPrice']),1.13));
            item['noTaxTotalPrice']=this.AppUtils.mul(parseFloat(item['noTaxUnitPrice']),parseFloat(item['orderNum']))
            _this.saveNum[item.goodsId]=item.orderNum;
          });
        }
        ////console.log(arrNew);
        this.model.purchaseOrderDetailDTOS=arrNew;
      };

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
        var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.purchaseOrderInfoDTO.taxRate)/100);
        this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
          if(val['goodsId']==goodsId){
            _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
            _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['totalPrice'],_this.model.purchaseOrderDetailDTOS[index]['orderNum']));
            _this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['totalPrice'],rateCheck));
            _this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice'],_this.model.purchaseOrderDetailDTOS[index]['orderNum']));
            _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
          }
        });
      },
      searchLocation(query){
        if (query !== '') {
          this.locationList='';
          // this.loading = false;
          setTimeout(() => {
            this.loading = false;
            var locations=JSON.parse(sessionStorage.getItem('saveLocation'));
            var str = locations.filter(item => {
              //console.log(query);
              return item.locationName.indexOf(query)>-1;
            });
            sessionStorage.setItem('searchAll',JSON.stringify(str));
            this.pageIndex=1;
            this.locationList=JSON.stringify(str.slice(0,10));
          }, 200);
        } else {
          this.locationList='';
        }
      },
      reBack(){
        this.pageIndex=1;
      },
      loadmore() {
        this.pageIndex++;
        if(!this.loading){
          this.locationList='';
          var searchAllData=JSON.parse(sessionStorage.getItem('searchAll'));
          //console.log(searchAllData);
          var sliceSearchAll=searchAllData.slice(0,10*this.pageIndex);
          this.locationList=JSON.stringify(sliceSearchAll);
        }else{
          // alert(2);
          var wavehouseId=sessionStorage.getItem('waveId');
          this.fetchLocationInfoByWaveId(wavehouseId,true);
        };
      },
      fetchLocationInfoByWaveId(wavehouseId,event) {//获取库位
        if(event){
          this.loading=true;
          sessionStorage.setItem('waveId',wavehouseId);
          if (wavehouseId) {
            this.$store.dispatch('fetchLocationInfoByWaveId',wavehouseId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                if(data.value.length){
                  sessionStorage.setItem('saveLocation',JSON.stringify(data.value));
                  this.locationList =JSON.stringify(data.value.slice(0,10*this.pageIndex));
                }else{
                  this.locationList ='';
                  this.AppUtils.alert('该仓库下没有库位');
                }
              }
            })
          }
        }else{
          this.pageIndex=1;
        }
      },
      locationChange(data) {
        if(data.locationName){
          var locals=JSON.parse(this.locationList);
          for (let val of locals) {
            if (val.locationName === data.locationName) {
              data.locationId = val.locationId;
              // var sliceLo=(JSON.parse(this.locationList)).slice(0,10);
              this.locationList='';
              return;
              // return this.saveEditParts(data);//库位修改 保存配件
            }
          }
          this.pageIndex=1;
        }
      },
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
                item['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(item['totalPrice'],rateCheck));
                item['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(item['noTaxTotalPrice'],item['orderNum']));
              });
              this.model.purchaseOrderDetailDTOS=arrNew;
            }
          }
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      getImportData(arg) {
        if (arg.length) {
          for (let val of arg) {
            val['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(val['unitPrice'],val['orderNum']));
            var rateCheck=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
            val['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(val['totalPrice'],rateCheck));
            val['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(val['noTaxTotalPrice'],val['orderNum']));
            let index = checkDataExit(this.model.purchaseOrderDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.purchaseOrderDetailDTOS.push(...arg);
        }
      },
      addParts(data) {
        data['unitPrice']=data['lastPrice'];
        data['unitPrice']=this.AppUtils.decimalTen(data['unitPrice']);
        data['orderNum']=data['applyNum'];
        data['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(data['unitPrice'],data['orderNum']));
        if(data['unitPrice']){
          var rateCheck=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
          data['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(data['totalPrice'],rateCheck));
          data['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(data['noTaxTotalPrice'],data['orderNum']));
        }else{
          data['noTaxUnitPrice']=0;
        }
        let index = checkDataExit(this.model.purchaseOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            var rate=this.AppUtils.add(1,parseFloat(this.model.purchaseOrderInfoDTO.taxRate)/100);
            this.model.purchaseOrderDetailDTOS[index].orderNum += data.orderNum;
            this.model.purchaseOrderDetailDTOS[index]['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(this.model.purchaseOrderDetailDTOS[index]['unitPrice'],this.model.purchaseOrderDetailDTOS[index].orderNum));
            this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(this.model.purchaseOrderDetailDTOS[index]['totalPrice'],rate));
            this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice'],this.model.purchaseOrderDetailDTOS[index].orderNum));
          })
        } else {
          this.model.purchaseOrderDetailDTOS.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      clearLocation(goodsId,id,va){
        //////console.log(id);
        //////console.log(goodsId);
        var _this=this;
        // this.waveList
        if(va){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            var valu=val;
            if(val['goodsId']===goodsId){
              _this.waveList.forEach((val)=>{
                if(val.wavehouseId==id){
                  valu['wavehouseName']=val.wavehouseName;
                  valu['locationName']=''
                }
              });
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
      //获取仓库
      getWave(){
          this.$axios.get('/admin/base/wavehouse/userStoreList').then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              //////console.log(data);
              this.waveList=JSON.parse(JSON.stringify(data.value))
            }
         })
      },
      handleSelectionChange(val) {
          this.checkList=val;
      },
      getSummaries(param) {
          //////console.log(param)
          const { columns, data } = param;
          const sums = [];
          //////console.log(columns);
          var _this=this;
          columns.forEach((column, index) => {
          if(!_this.appToOrderId){
            //////console.log('呱呱');
            if (index === 3) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              var total=0;
              //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
              this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                //////console.log(val);
                //////console.log(val.orderNum);
                if(val.orderNum<=0){
                  val.orderNum=1;
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
                total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.totalPrice));//精度处理
              });
              this.model.purchaseOrderInfoDTO.orderTotalPrice=this.AppUtils.decimal4(total);
              if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                sums[index] =this.AppUtils.decimal2(total);
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
                sums[index] =this.AppUtils.decimal2(total);
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
                total=_this.AppUtils.add(total,val.inputTotalPrice);//精度处理
              });
              sums[index]=total;
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
          }else{
            //////console.log('咕咕');
            if (index === 2) {
              sums[index] = '合计';
              return;
            }else if(index === 5){
              var total=0;
              //////console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
              this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                //////console.log(val);
                //////console.log(val.orderNum);
                if(val.orderNum<=0){
                  val.orderNum=1;
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
                total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.totalPrice));//精度处理
              });
              this.model.purchaseOrderInfoDTO.orderTotalPrice=this.AppUtils.decimal4(total);
              if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                sums[index] =this.AppUtils.decimal2(total);
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
                sums[index] =this.AppUtils.decimal2(total);
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
                total=_this.AppUtils.add(total,val.inputTotalPrice);//精度处理
              });
              sums[index]=total;
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
          };
          });
          //////console.log(this.model.purchaseOrderDetailDTOS);
          return sums;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
          return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
          if (rowIndex === 0) {
              return 'background-color: #f4f5f7;color: #4A4A4A;'
          }
      },
      //获取克隆详情
      getClone(id){
          this.$axios.post('/admin/purchase/purchaseOrder/detail/'+id).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                //////console.log(data);
                this.model.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderDetailDTOS));
                if(this.model.purchaseOrderDetailDTOS.length){
                  this.model.purchaseOrderDetailDTOS.forEach((item)=>{
                    //////console.log(item);
                    // this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.applyNum]);
                    this.savePrice[item.goodsId]=item.unitPrice;
                  });
                }
              }
          })
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
                  }
                });
              }
          }else{
            this.getSupplier();
          }
      },
      saveInfo(){
          //////console.log(this.model.purchaseOrderDetailDTOS);
          //////console.log(this.model);
          var obj={};
          obj.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(this.model.purchaseOrderInfoDTO));
          obj.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(this.model.purchaseOrderDetailDTOS));
          var rate=parseFloat(obj.purchaseOrderInfoDTO.taxRate.split('%')[0]);
          obj.purchaseOrderInfoDTO.taxRate=rate;
          var arr=obj.purchaseOrderDetailDTOS.filter(item=>Math.floor(item.orderNum)!=item.orderNum);
          if(arr.length) {
            var infoArr = [];
            arr.forEach((item) => {
              infoArr.push(item.goodsNo);
            })
            var infoStr = infoArr.join(',');
            this.AppUtils.alert('配件' + infoStr + '的数量需要是整数');
            return false;
          }
          if(this.appToOrderId){
              obj['purchaseOrderInfoDTO']['id']=this.appToOrderId;
              obj['purchaseOrderInfoDTO']['purchaseApplyNo']=localStorage.getItem('applyNo');
              this.$axios.post('/admin/purchase/purchaseApply/convert2PurOrderNew/'+this.appToOrderId,obj).then(res=>{
                let data = this.AppUtils.checkResponse(res);
                if(data) {
                  //////console.log(data);
                  this.$message.success('采购申请转采购单成功');
                  this.$router.push('/purchasing-management/procurement-order/detail/'+data.value);
                }
              })
          }else{
            // //console.log(obj);
              this.$axios.post('/admin/purchase/purchaseOrder/add',obj).then(res=>{
                let data = this.AppUtils.checkResponse(res);
                if(data) {
                  //////console.log(data);
                  this.$message.success('新增采购单成功');
                  this.$router.push('/purchasing-management/procurement-order/detail/'+data.value);
                }
              })
          }
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.purchaseOrderDetailDTOS,this.checkList);
        }
      },
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
        if(_this.saveNum[id]){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              //////console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              //////console.log(_this.saveNum[id])
              if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']>_this.saveNum[id]){
                _this.AppUtils.alert('配件采购的数量不能大于申请数量');
                _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
                orderNum=_this.saveNum[id];
              }
            }
          });
        };
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>10){
            this.AppUtils.alert('单价小数点位数最多十位');
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
        // this.saveUnitprice[id]=unitPrice;
        // //////console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(orderNum),unitPrice));//精度处理
        //////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.purchaseOrderInfoDTO.taxRate)/100);
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['totalPrice'],rateCheck));
              _this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice'],_this.model.purchaseOrderDetailDTOS[index]['orderNum']));
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.purchaseOrderInfoDTO.taxRate)/100);
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice']=this.AppUtils.decimal4(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['totalPrice'],rateCheck));
              _this.model.purchaseOrderDetailDTOS[index]['noTaxUnitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.model.purchaseOrderDetailDTOS[index]['noTaxTotalPrice'],_this.model.purchaseOrderDetailDTOS[index]['orderNum']));
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //获取供应商列表
      getSupplier(){
        this.$axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.suppliersList=data.value;
            // this.suppliersList.forEach((item)=>{
            //   if(item['commonType']==1){
            //     item['commonTypeName']=item['supplierName']+'(通用)';
            //   }else{
            //     item['commonTypeName']=item['supplierName']+'(自用)';
            //   }
            // });
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
  .applicationInfo{
    padding-bottom: 23px;
    margin: 0 20px 20px;
    background: #fff;
    .accountPrice{
      position: absolute;
      top: 82px;
      right: 25px;
      color: #00BAFF;;
    }
    .btnZone{
      width: 275px;
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
    .row{
      border: 1px solid #ecf1f4;
      width: 900px;
      margin-left: 25px;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        height: 49px;
        line-height: 49px;
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
            width: 180px;
            height: 49px;
            float: left;
          }
        }
        .right{
          flex: 1;
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
            height: 49px;
            float: left;
          }
        }
      }
    }
  }
</style>
