<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>申请信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone"><i class="primary">*</i>供应商</div>
            <div class="rightZone">
              <el-select placeholder="请选择" class="el_box" v-model="model.purchaseOrderInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName">
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
              <el-select placeholder="请选择" class="el_box" v-model="model.purchaseOrderInfoDTO.taxRate" filterable clearable>
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
                v-model="model.purchaseOrderInfoDTO.expectedArrivalTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                default-time="12:00:00"
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
                v-model="model.purchaseOrderInfoDTO.memo">
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="position: relative;">
      <div class="accountPrice">数量: {{model.purchaseOrderInfoDTO.orderTotalNum}} 采购总价: {{model.purchaseOrderInfoDTO.orderTotalPrice}}</div>
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>采购清单</h2>
      </div>
      <div class="btnZone" v-if="!this.appToOrderId">
        <button type="button" class="btn mr10" @click="addParts">新增</button>
        <button type="button" class="btn mr10"@click="importParts" >导入配件</button>
        <button type="button" class="cancelBtn" @click='deleteData'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:25px;">
          <div class="table_scroll add">
            <!--<table class="table">
              <thead>
              <tr>
                <th>
                  <label class="checkBox">
                    <input type="checkbox" :checked="checkAllStatus" @click='checkedAll'>
                    <span></span>
                  </label>
                </th>
                <th>序号</th>
                <th>配件编号</th>
                <th>生产编码</th>
                <th>配件名称</th>
                <th>单位</th>
                <th>数量</th>
                <th>采购单价</th>
                <th>采购总价</th>
                <th>原采购数</th>
                <th>取消采购数</th>
                <th>备注</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(data,index) in model.purchaseOrderDetailDTOS" :key="index">
                  <td>
                    <label class="checkBox">
                      <input type="checkbox" :checked="checkList.indexOf(data.goodsId) > -1" @click='checkedOne(data.goodsId)'>
                      <span></span>
                    </label>
                  </td>
                  <td>{{index+1}}</td>
                  <td>{{data.goodsNo}}</td>
                  <td>{{data.goodsVendorNo}}</td>
                  <td>{{data.goodsName}}</td>
                  <td>{{data.goodsUnit}}</td>
                  <td class="applyNum">
                    <el-input type="text" v-model="data.applyNum" @keyup.native="getTotal(index,data.applyNum,data.unitPrice)"></el-input>
                  </td>
                  <td class="applyNum">
                    <el-input type="text" style="width: 39px;" v-model="data.unitPrice" @keyup.native="getTotal(index,data.applyNum,data.unitPrice)"></el-input>
                  </td>
                  <td>{{data.totalPrice}}</td>
                  <td>0</td>
                  <td>0</td>
                  <td class="applyNum">
                    <el-input type="text" style="width: 31px;" v-model="data.memo"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>-->
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
                  <input type="number" v-model.number="scope.row.orderNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.number="scope.row.unitPrice" class="in" @input="getTotal(scope.row.goodsId,scope.row.orderNum,scope.row.unitPrice)">
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
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.wavehouseId" @visible-change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)">
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
                width="180"
                key="16"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)">
                    <el-option
                      v-for="item in locationList"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationId">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="100"
                key="17"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model="scope.row.memo" class="in">
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="saveInfo">保存</button>
      </div>
    </div>
    <addParts :popUp="popUp" @closeAddParts="closeAddParts" @getAddData="getAddData" ref="addParts" :saveUnitprice="saveUnitprice"></addParts>
    <importParts :importShow="importShow" @change="change"></importParts>
  </div>
</template>

<script>
  // import addParts from './add-parts'
  import importParts from './importParts'
  export default {
    name:'procurement-order-add',
    components:{
      // addParts,
      importParts
    },
    computed:{
      checkAllStatus(){
        if(!this.status){
          return false;
        }else{
          return this.checkList.length===this.model.purchaseOrderDetailDTOS.length
        }
      }
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
            taxRate:'',//税率
            totalNum:0,//请购数量
            orderTotalPrice:0,//采购总价
          }
        },
        popUp:false,//新增配件显示状态
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
        locationList:[],//库位列表
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
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
      //获取仓库
      this.getWave();
      //获取供应商列表
      this.getSupplier();
      this.cloneOrderId=localStorage.getItem("cloneOrderId");
      ////console.log(this.cloneOrderId);
      if(this.cloneOrderId){
        this.getClone(this.cloneOrderId);
      };
      ////console.log(localStorage.getItem("toOrder"));
      if(localStorage.getItem("purApplyInfoId")){
        this.appToOrderId=localStorage.getItem("purApplyInfoId");
        ////console.log(this.appToOrderId)
      }
      var arr=localStorage.getItem("toOrder");
      ////console.log(arr);
      if(JSON.parse(arr)&&JSON.parse(arr)['length']){
        this.model.purchaseOrderDetailDTOS=JSON.parse(arr);
        if(this.model.purchaseOrderDetailDTOS.length){
          var _this=this;
          this.model.purchaseOrderDetailDTOS.forEach((item)=>{
            _this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.orderNum]);
            _this.saveNum[item.goodsId]=item.orderNum;
          });
        }
      }
    },
    methods:{
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
      handleSelectionChange(val) {
          ////console.log(val);
          val.forEach((val)=>{
              this.checkList.push(val.goodsId);
          });
      },
      getSummaries(param) {
          ////console.log(param)
          const { columns, data } = param;
          const sums = [];
          ////console.log(columns);
          var _this=this;
          columns.forEach((column, index) => {
          if(!_this.appToOrderId){
            ////console.log('呱呱');
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
          }else{
            ////console.log('咕咕');
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
          };
          });
          ////console.log(this.model.purchaseOrderDetailDTOS);
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
                ////console.log(data);
                this.model.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderDetailDTOS));
                if(this.model.purchaseOrderDetailDTOS.length){
                  this.model.purchaseOrderDetailDTOS.forEach((item)=>{
                    ////console.log(item);
                    this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.applyNum]);
                    this.savePrice[item.goodsId]=item.unitPrice;
                  });
                }
              }
          })
      },
      //设置供应商名称
      setSupplierName(arg){
          if(!arg){
              ////console.log(this.suppliersList);
              ////console.log(this.model.purchaseOrderInfoDTO.supplierId);
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
          ////console.log(this.model.purchaseOrderDetailDTOS);
          ////console.log(this.model);
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
                  ////console.log(data);
                  this.$message.success('采购申请转采购单成功');
                  this.$router.push('/purchasing-management/procurement-order/detail/'+data.value);
                }
              })
          }else{
              this.$axios.post('/admin/purchase/purchaseOrder/add',obj).then(res=>{
                let data = this.AppUtils.checkResponse(res);
                if(data) {
                  ////console.log(data);
                  this.$message.success('新增采购单成功');
                  this.$router.push('/purchasing-management/procurement-order/detail/'+data.value);
                }
              })
          }
      },
      //删除
      deleteData(){
          ////console.log(this.checkList);
          var _this=this;
          if(this.checkList.length){
          this.checkList.forEach((value,index)=>{
            var valuee=value;
            var inde=index;
            this.model.purchaseOrderDetailDTOS.forEach(function (val,ind) {
              if(valuee===val['goodsId']){
                _this.model.purchaseOrderDetailDTOS.splice(ind,1);
                _this.$refs.addParts.getDeleteGoods(_this.checkList);
                _this.checkList=[];
                // _this.checkList.splice(index,1);
                // this.status=false;
                ////console.log(_this.checkList.length);
                ////console.log(_this.checkList);
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
          }
      },
      //计算总价
      /*getTotal(index,applyNum,unitPrice){
      var totalPrice=parseFloat(applyNum)*parseFloat(unitPrice);
      if(totalPrice||totalPrice==0){
      this.model.purchaseOrderDetailDTOS[index]['totalPrice']=totalPrice;
      this.$set(this.model.purchaseOrderDetailDTOS,index,this.model.purchaseOrderDetailDTOS[index])
      }else{
      this.model.purchaseOrderDetailDTOS[index]['totalPrice']=0;
      this.$set(this.model.purchaseOrderDetailDTOS,index,this.model.purchaseOrderDetailDTOS[index])
      }
      this.changeNumPrice();
      },*/
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
        if(_this.saveNum[id]){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              ////console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              ////console.log(_this.saveNum[id])
              if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']>_this.saveNum[id]){
                _this.AppUtils.alert('配件数量只能往低了改，不能往高了改')
                _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
              }
            }
          });
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
      checkedOne (goodsId) {
        ////console.log(this.checkList);
        let idIndex = this.checkList.indexOf(goodsId)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.checkList.splice(idIndex, 1)
        } else {
          // 选中该checkbox
          this.checkList.push(goodsId);
          this.status=true;
          ////console.log(this.checkList);
          ////console.log(this.status);
          ////console.log(this.model.purchaseOrderDetailDTOS);
        }
      },
      //选中所有
      checkedAll () {
        ////console.log(this.checkList.length);
        ////console.log(this.model.purchaseOrderDetailDTOS.length);
        this.status=true;
        if(this.checkList.length===this.model.purchaseOrderDetailDTOS.length){
          this.isCheckedAll=true;
        }
        this.isCheckedAll = !this.isCheckedAll
        ////console.log(this.isCheckedAll);
        if (this.isCheckedAll || this.checkList.length!==this.model.purchaseOrderDetailDTOS.length) {
          // 全选时
          this.checkList=[]
          ////console.log('选中');
          this.model.purchaseOrderDetailDTOS.forEach(function (val) {
            this.checkList.push(val.goodsId);
          }, this)
        } else {
          this.checkList=[];
        };
      },
      //新增配件
      addParts(){
        this.popUp=true;
      },
      closeAddParts(){
        this.popUp=false;
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
            ////console.log(data);
            this.suppliersList=data.value;
          }
        })
      },
      //获取认购清单表格数据
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
          ////console.log(this.savePrice);
          data.orderNum=parseFloat(data.applyNum);
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(_this.savePrice[val['goodsId']]){
                data.unitPrice=_this.saveUnitPrice[val['goodsId']];
              }else if(_this.savePrice[val['goodsId']]==0){
                data.unitPrice=_this.saveUnitPrice[val['goodsId']];
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
            data.orderNum=parseFloat(data.applyNum);
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
              data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);
              data.orderNum=data.applyNum;
              ////console.log(data.orderNum);
              this.model.purchaseOrderDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              this.changeNumPrice();
            }
          });
        }
      },*/
      //处理价格和数量随时变动
      /*changeNumPrice(){
        var allApplyNum=0;
        var allTotalPrice=0;
        var num;
        this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
          ////console.log(val.applyNum);
          ////console.log(val.totalPrice);
          if(!val.applyNum){
            num=0;
          }else{
            num=val.applyNum;
          }
          allApplyNum+=parseFloat(num);
          ////console.log(typeof val.applyNum);
          ////console.log(typeof val.totalPrice);
          allTotalPrice+=parseFloat(val.totalPrice);

        });
        ////console.log(allApplyNum);
        if(allApplyNum){
          this.model.purchaseOrderInfoDTO.totalNum=allApplyNum;
        }
        ////console.log(allTotalPrice);
        if(allTotalPrice){
          this.model.purchaseOrderInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },*/
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
