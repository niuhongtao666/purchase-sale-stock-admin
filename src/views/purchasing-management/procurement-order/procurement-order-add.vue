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
            <div class="leftZone"><i class="primary">*</i>供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName">
                <el-option
                  v-for="item in suppliersList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone"><i class="primary">*</i>税率</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseOrderInfoDTO.taxRate" filterable clearable>
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
                value-format="timestamp"
                placeholder="请选择"
                class="activity-edit-date date-box innerInput"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="rowItem h-49">
          <div class="left h-49">
            <div class="leftZone flex1">备注</div>
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
            <el-table
              :data="model.purchaseOrderDetailDTOS"
              max-height="519"
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
                width="72"
                v-if="!this.appToOrderId"
              >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="72">
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
                label="原厂编号"
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
                  <input type="number" v-model.number="scope.row.orderNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                min-width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.unitPrice" class="in" min="0" step='0.1' @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
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
                label="已入库数"
                min-width="100"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.alreadyInputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(含税)"
                min-width="140"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTotalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库总价(不含税)"
                min-width="140"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputNoTaxPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="原采购数"
                min-width="100"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.originalNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="取消采购数"
                min-width="100"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.cancelNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="15"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId"  @change="wavehouseSwitch(scope.row)">
                    <el-option
                      v-for="item in waves"
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
                key="16"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @change="locationChange(scope.row)"  @focus="fetchLocationInfoByWaveId(scope.row.wavehouseId)">
                    <el-option
                      v-for="item in locationList"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationId">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--label="仓库"-->
              <!--min-width="180"-->
              <!--key="15"-->
              <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--<el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)">-->
              <!--<el-option-->
              <!--v-for="item in waves"-->
              <!--:key="item.wavehouseId"-->
              <!--:label="item.wavehouseName"-->
              <!--:value="item.wavehouseId">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--label="库位"-->
              <!--min-width="180"-->
              <!--key="16"-->
              <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--<el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)">-->
              <!--<el-option-->
              <!--v-for="item in locationList"-->
              <!--:key="item.locationId"-->
              <!--:label="item.locationName"-->
              <!--:value="item.locationId">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="备注"
                min-width="100"
                key="17"
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
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  export default {
    name:'procurement-order-add',
    components:{
      // importParts
    },
    computed:{
      waves(){
        this.waveList=this.$store.state.waveHousesByStoreId;
        return this.$store.state.waveHousesByStoreId;
      },
    },
    data(){
      return{
        model:{
          purchaseOrderDetailDTOS: [
            /*{
              applyNum:'',//请购数量
              currentStock:'',//当前库存
              goodsId:'',//商品ID
              goodsName:'',//配件名称
              goodsNo: '',//配件编号
              goodsUnit:'',//单位
              goodsVendorNo: '',//原厂编号
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
            taxRate:'',//税率
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
        // waveList:[],//仓库列表
        locationList:[],//库位列表
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
        buttonInfo:{},//按钮权限
        taxRatesList:[
          {
            id:0,
            name:'16%'
          },
          {
            id:1,
            name:'10%'
          },
          {
            id:2,
            name:'6%'
          },
          {
            id:3,
            name:'3%'
          },
          {
            id:4,
            name:'0%'
          },
        ]
      }
    },
    mounted(){
      this.buttonInfo=this.AppUtils.returnPermissions();
      //获取仓库
      // this.getWave();
      //获取供应商列表
      this.getSupplier();
      this.cloneOrderId=localStorage.getItem("cloneOrderId");
      //console.log(this.cloneOrderId);
      if(this.cloneOrderId){
        this.getClone(this.cloneOrderId);
      };
      //console.log(localStorage.getItem("toOrder"));
      if(localStorage.getItem("purApplyInfoId")){
        this.appToOrderId=localStorage.getItem("purApplyInfoId");
        //console.log(this.appToOrderId)
      }
      var arr=localStorage.getItem("toOrder");
      //console.log(arr);
      if(JSON.parse(arr)&&JSON.parse(arr)['length']){
        this.model.purchaseOrderDetailDTOS=JSON.parse(arr);
        if(this.model.purchaseOrderDetailDTOS.length){
          var _this=this;
          this.model.purchaseOrderDetailDTOS.forEach((item)=>{
            // _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
            _this.saveNum[item.goodsId]=item.orderNum;
          });
        }
      }
    },
    methods:{
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      getImportData(arg){
        //console.log(arg);
        if(arg.length){
          arg.forEach((val)=>{
            val['totalPrice']=this.AppUtils.mul(val['unitPrice'],val['orderNum']);
            let index = checkDataExit(this.model.purchaseOrderDetailDTOS,val);
            if (index > -1) {
              return this.AppUtils.confirm(`${val.goodsNo}配件已经添加,不能继续添加`, () => {
              })
            } else {
              this.model.purchaseOrderDetailDTOS.push(val);
            }
          });
          //console.log(this.model.purchaseApplyDetailDTOS);
        }
      },
      addParts(data) {
        data['orderNum']=data['applyNum'];
        data['totalPrice']=this.AppUtils.mul(data['unitPrice'],data['orderNum']);
        let index = checkDataExit(this.model.purchaseOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.purchaseOrderDetailDTOS[index].orderNum += data.orderNum;
            this.model.purchaseOrderDetailDTOS[index]['totalPrice']=this.AppUtils.mul(this.model.purchaseOrderDetailDTOS[index]['unitPrice'],this.model.purchaseOrderDetailDTOS[index]['orderNum']);
          })
        } else {
          this.model.purchaseOrderDetailDTOS.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      wavehouseSwitch(data) {//选择仓库
        this.locationList = [];
        data.locationId = null;
        data.locationName = null;
        for (let val of this.warehouseList) {
          if (val.wavehouseName === data.wavehouseName) {
            data.wavehouseId = val.wavehouseId;
          }
        }

        // this.fetchLocationInfoByWaveId(data.wavehouseId);

      },
      fetchLocationInfoByWaveId(wavehouseId) {//获取库位
        if (wavehouseId) {
          this.$store.dispatch('fetchLocationInfoByWaveId', wavehouseId).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.locationList = data.value;
            }
          })
        }
      }
      ,
      locationChange(data) {
        for (let val of this.locationList) {
          if (val.locationName === data.locationName) {
            data.locationId = val.locationId;
            // return this.saveEditParts(data);//库位修改 保存配件
          }
        }
      }
      ,
      // clearLocation(goodsId,id,va){
      //   //console.log(id);
      //   //console.log(goodsId);
      //   var _this=this;
      //   // this.waveList
      //   if(va){
      //     this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
      //       var valu=val;
      //       if(val['goodsId']===goodsId){
      //         _this.waveList.forEach((val)=>{
      //           if(val.wavehouseId==id){
      //             valu['wavehouseName']=val.wavehouseName;
      //             valu['locationName']=''
      //           }
      //         });
      //       }
      //     })
      //   }
      // },
      // getLocal(goodsId,id,e){
      //   //console.log(id);
      //   //console.log(e);
      //   var _this=this;
      //   if(e){
      //     this.getLocation(id);
      //   }else{
      //     this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
      //       var value=val;
      //       var inde=index;
      //       if(val['goodsId']===goodsId){
      //         var local=val['locationName'];
      //         _this.locationList.forEach((val)=>{
      //           if(val.locationId==local){
      //             //console.log(val.locationId);
      //             //console.log(val.locationName);
      //             value['locationId']=val.locationId;
      //             value['locationName']=val.locationName;
      //             //console.log(inde);
      //             //console.log(val.locationName);
      //             _this.$set(_this.model.purchaseOrderDetailDTOS,inde,value);
      //           }
      //         });
      //       }
      //     })
      //   }
      // },
      // //获取库位
      // getLocation(arg){
      //     if(!arg){
      //       this.AppUtils.alert('请先选择仓库');
      //     }else{
      //       this.$axios.get('/admin/base/locationInfo/listLocationByWaveId/'+arg).then(res=>{
      //         let data = this.AppUtils.checkResponse(res);
      //         if(data) {
      //           //console.log(data);
      //           this.locationList=JSON.parse(JSON.stringify(data.value))
      //         }
      //       })
      //     }
      // },
      //获取仓库
      getWave(){
        this.$axios.get('/admin/base/wavehouse/userStoreList').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //console.log(data);
            this.waveList=JSON.parse(JSON.stringify(data.value))
          }
        })
      },
      handleSelectionChange(val) {
        this.checkList=val;
      },
      getSummaries(param) {
        //console.log(param)
        const { columns, data } = param;
        const sums = [];
        //console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if(!_this.appToOrderId){
            //console.log('呱呱');
            if (index === 4) {
              sums[index] = '合计1:';
              return;
            }else if(index === 6){
              var total=0;
              //console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
              this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                //console.log(val);
                //console.log(val.orderNum);
                if(val.orderNum<=0){
                  val.orderNum=1;
                }
                total=_this.AppUtils.add(total,val.orderNum);//精度处理
              });
              //console.log(typeof total);
              //console.log(total);
              //console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
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
                total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.totalPrice));//精度处理
              });
              this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
              if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                sums[index] =_this.AppUtils.decimal2(this.model.purchaseOrderInfoDTO.orderTotalPrice);
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
          }else{
            //console.log('咕咕');
            if (index === 3) {
              sums[index] = '合计:';
              return;
            }else if(index === 5){
              var total=0;
              //console.log(this.model.purchaseOrderInfoDTO.orderTotalNum)
              this.model.purchaseOrderDetailDTOS.forEach((val)=>{
                //console.log(val);
                //console.log(val.orderNum);
                if(val.orderNum<=0){
                  val.orderNum=1;
                }
                total=_this.AppUtils.add(total,val.orderNum);//精度处理
              });
              //console.log(typeof total);
              //console.log(total);
              //console.log(this.model.purchaseOrderInfoDTO.orderTotalNum);
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
                total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.totalPrice));//精度处理
              });
              this.model.purchaseOrderInfoDTO.orderTotalPrice=total;
              if(this.model.purchaseOrderInfoDTO.orderTotalPrice||this.model.purchaseOrderInfoDTO.orderTotalPrice==0){
                sums[index] =_this.AppUtils.decimal2(this.model.purchaseOrderInfoDTO.orderTotalPrice);
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
          };
        });
        //console.log(this.model.purchaseOrderDetailDTOS);
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
            //console.log(data);
            this.model.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderDetailDTOS));
            if(this.model.purchaseOrderDetailDTOS.length){
              this.model.purchaseOrderDetailDTOS.forEach((item)=>{
                //console.log(item);
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
          //console.log(this.suppliersList);
          //console.log(this.model.purchaseOrderInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseOrderInfoDTO.supplierId){
                this.model.purchaseOrderInfoDTO.supplierName=val.supplierName;
              }
            });
          }
        }
      },
      saveInfo(){
        //console.log(this.model.purchaseOrderDetailDTOS);
        //console.log(this.model);
        var obj={};
        obj.purchaseOrderInfoDTO=JSON.parse(JSON.stringify(this.model.purchaseOrderInfoDTO));
        obj.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(this.model.purchaseOrderDetailDTOS));
        var rate=parseFloat(obj.purchaseOrderInfoDTO.taxRate.split('%')[0]);
        obj.purchaseOrderInfoDTO.taxRate=rate;
        if(this.appToOrderId){
          obj['purchaseOrderInfoDTO']['id']=this.appToOrderId;
          obj['purchaseOrderInfoDTO']['purchaseApplyNo']=localStorage.getItem('applyNo');
          this.$axios.post('/admin/purchase/purchaseApply/convert2PurOrderNew/'+this.appToOrderId,obj).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              //console.log(data);
              this.$message.success('采购申请转采购单成功');
              this.$router.push('/purchasing-management/procurement-order/detail/'+data.value);
            }
          })
        }else{
          this.$axios.post('/admin/purchase/purchaseOrder/add',obj).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              //console.log(data);
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
        //console.log(typeof orderNum);
        //console.log(orderNum);
        //console.log(this.saveNum);
        if(_this.saveNum[id]){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              //console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              //console.log(_this.saveNum[id])
              if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']>_this.saveNum[id]){
                _this.AppUtils.alert('配件数量只能往低了改，不能往高了改')
                _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
                orderNum=_this.saveNum[id];
              }
            }
          });
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
        // this.saveUnitprice[id]=unitPrice;
        // //console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(orderNum),unitPrice);//精度处理
        //console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.$set(_this.model.purchaseOrderDetailDTOS,index,_this.model.purchaseOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
              _this.model.purchaseOrderDetailDTOS[index]['orderNum']=orderNum;
              _this.model.purchaseOrderDetailDTOS[index]['unitPrice']=unitPrice;
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
            //console.log(data);
            this.suppliersList=data.value;
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
