<template>
  <div>
    <div class="titleZone">
      <div class="zone">
        <span>申请单号：{{model.purchaseApplyInfoDTO.purchaseApplyNo}}</span>
        <span>状态:{{model.purchaseApplyInfoDTO.applyState==100?'待申请':(model.purchaseApplyInfoDTO.applyState==200?'待审批':(model.purchaseApplyInfoDTO.applyState==300?'待转采购':(model.purchaseApplyInfoDTO.applyState==400?'待采购入库':(model.purchaseApplyInfoDTO.applyState==500?'已取消':(model.purchaseApplyInfoDTO.applyState==800?'已采购入库':(model.purchaseApplyInfoDTO.applyState==700?'已驳回':''))))))}} </span>
        <span>创建时间：{{model.purchaseApplyInfoDTO.createTime | dateFormatToSecond}}</span>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>申请信息</h2>
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
              <el-select placeholder="请选择" class="el_box" v-model="model.purchaseApplyInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName" v-if="model.purchaseApplyInfoDTO.applyState==100">
                <el-option
                  v-for="item in suppliersList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
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
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择到货日期"
                default-time="12:00:00"
                class="activity-edit-date date-box innerInput"
                v-if="model.purchaseApplyInfoDTO.applyState==100"
              >
              </el-date-picker>
              <span v-else>
                {{model.purchaseApplyInfoDTO.expectedArrivalTime | dateFormatToSecond}}
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
            <div class="leftZone">请购总价</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.orderTotalPrice}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">已转采购</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.convertOrderTotalNum?model.purchaseApplyInfoDTO.convertOrderTotalNum:0}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">已入库数</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.inputTotalNum?model.purchaseApplyInfoDTO.inputTotalNum:0}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="leftMark h-49">
            <div class="leftZone">备注</div>
            <div class="rightZone w480" id="memo">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                v-model="model.purchaseApplyInfoDTO.memo"
                v-if="model.purchaseApplyInfoDTO.applyState==100"
              >
              </el-input>
              <span v-else>
                {{model.purchaseApplyInfoDTO.memo}}
              </span>
            </div>
          </div>
        </div>
        <div class="rowItem h-49" v-if="model.purchaseApplyInfoDTO.applyState==300 || model.purchaseApplyInfoDTO.applyState==400 || model.purchaseApplyInfoDTO.applyState==800">
          <div class="left h-49">
            <div class="leftZone">审批人</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.approvalUserName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">审批时间</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.approvalTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h-49 flex2">
            <div class="leftZone">同意备注</div>
            <div class="rightZone flex5">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49" v-if="model.purchaseApplyInfoDTO.applyState==700">
          <div class="left h-49">
            <div class="leftZone">驳回人</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.approvalUserName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">驳回时间</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.rejectTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h-49 flex2">
            <div class="leftZone">驳回原因</div>
            <div class="rightZone flex5">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49" v-if="model.purchaseApplyInfoDTO.applyState==500">
          <div class="left h-49">
            <div class="leftZone">取消人</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.updateUserName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">取消时间</div>
            <div class="rightZone">
              {{model.purchaseApplyInfoDTO.updateTime | dateFormatToSecond}}
            </div>
          </div>
          <div class="left h-49 flex2">
            <div class="leftZone">取消原因</div>
            <div class="rightZone flex5">
              {{model.purchaseApplyInfoDTO.reason}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>请购清单</h2>
      </div>
      <div class="btnZone" v-if="model.purchaseApplyInfoDTO.applyState==100">
        <button type="button" class="btn mr10" @click="addParts">新增</button>
        <button type="button" class="btn mr10"@click="importParts">导入配件</button>
        <button type="button" class="cancelBtn" @click='deleteData'>删除</button>
      </div>
      <div class="btnZone" v-if="model.purchaseApplyInfoDTO.applyState==300">
        <button type="button" class="btn mr10" @click="convertPurOrder">转采购</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
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
                <th>请购数量</th>
                <th>单价</th>
                <th>总价</th>
                <th>上次采购价</th>
                <th>当前库存</th>
                <th>待发料</th>
                <th>备注</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in model.purchaseApplyDetailDTOS" :key="index">
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
                  <el-input type="text" style="width: 31px;" v-model="data.applyNum" @keyup.native="getTotal(index,data.applyNum,data.unitPrice)"></el-input>
                </td>
                <td class="applyNum">
                  <el-input type="text" style="width: 31px;" v-model="data.unitPrice" @keyup.native="getTotal(index,data.applyNum,data.unitPrice)"></el-input>
                </td>
                <td>{{data.totalPrice}}</td>
                <td>{{data.lastPrice}}</td>
                <td>{{data.currentStock}}</td>
                <td>{{data.waitIssue}}</td>
                <td class="applyNum">
                  <el-input type="text" style="width: 31px;" v-model="data.memo"></el-input>
                </td>
              </tr>
              </tbody>
            </table>-->
            <el-table
              :data="model.purchaseApplyDetailDTOS"
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
                label="请购数量"
                width="100"
                key="7"
              >
                <template slot-scope="scope">
                  <!--<el-input type="text" v-model="scope.row.applyNum" @keyup.native="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100"></el-input>-->
                  <input type="number" v-model.number="scope.row.applyNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.applyNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <!--<el-input type="text"  v-model="scope.row.unitPrice" @keyup.native="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100"></el-input>-->
                  <input type="text"  v-model.number="scope.row.unitPrice" class="in"  @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)" v-if="model.purchaseApplyInfoDTO.applyState==100">
                  <span v-else>{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="总价"
                width="100"
                key="9"
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="上次采购价"
                width="100"
                key="10"
              >
                <template slot-scope="scope">
                  {{scope.row.lastPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="可发料库存"
                width="100"
                key="11"
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际库存"
                width="100"
                key="12"
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="锁定库存"
                width="100"
                key="13"
              >
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="已转采购数"
                width="100"
                key="14"
              >
                <template slot-scope="scope">
                  {{scope.row.convertOrderNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                width="100"
                key="15"
              >
                <template slot-scope="scope">
                  {{scope.row.inputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="100"
                key="16"
              >
                <template slot-scope="scope">
                  <!--<el-input type="text"  v-model="scope.row.memo"  v-if="model.purchaseApplyInfoDTO.applyState==100"></el-input>-->
                  <input type="text"  v-model="scope.row.memo" class="in"  v-if="model.purchaseApplyInfoDTO.applyState==100">
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
        <i class="order-info_icon"></i>
        <h2>关联采购单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll ">
            <table class="table">
              <thead>
              <tr>
                <th>序号</th>
                <th>采购单号</th>
                <th>采购数量</th>
                <th>采购总价</th>
                <th>创建人</th>
                <th>创建时间</th>
              </tr>
              </thead>
              <tbody>
              <!--model.purchaseOrderInfoDTOS-->
              <tr v-for="(data,index) in model.purchaseOrderInfoDTOS" :key="index" style="line-height: 40px;">
                <td>{{index+1}}</td>
                <td>
                  <router-link class="primary" :to="'/purchasing-management/procurement-order/detail/'+data.id">
                    {{data.purchaseOrderNo}}
                  </router-link>
                </td>
                <td>{{data.orderTotalNum}}</td>
                <td>{{data.orderTotalPrice}}</td>
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
        <button type="button" class="btn" @click.prevent="saveInfo" v-if="model.purchaseApplyInfoDTO.applyState==100">保存</button>
        <button type="button" class="btn" v-if="model.purchaseApplyInfoDTO.applyState==100" @click="statusUpdate('submitApply',3)">提交申请</button>
        <button type="button" class="btn" @click='exportData' v-if="model.purchaseApplyInfoDTO.applyState==100||model.purchaseApplyInfoDTO.applyState==200||model.purchaseApplyInfoDTO.applyState==300||model.purchaseApplyInfoDTO.applyState==400||model.purchaseApplyInfoDTO.applyState==800||model.purchaseApplyInfoDTO.applyState==500||model.purchaseApplyInfoDTO.applyState==700">导出配件</button>
        <button type="button" class="btn" v-if="model.purchaseApplyInfoDTO.applyState==100" @click="statusUpdate('cancelApply',4)">取消申请</button>
        <button type="button" class="btn" v-if="model.purchaseApplyInfoDTO.applyState==200" @click="statusUpdate('passApply',1)">同意</button>
        <button type="button" class="btn" v-if="model.purchaseApplyInfoDTO.applyState==200" @click="statusUpdate('rejectApply',2)">驳回</button>
        <button type="button" class="btn" v-if="model.purchaseApplyInfoDTO.applyState==300||model.purchaseApplyInfoDTO.applyState==400||model.purchaseApplyInfoDTO.applyState==800||model.purchaseApplyInfoDTO.applyState==500||model.purchaseApplyInfoDTO.applyState==700">打印申请</button>
      </div>
    </div>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @getReason="getReason"></nt-reason>
    <addParts :popUp="popUp" @closeAddParts="closeAddParts"  @getAddData="getAddData" ref="addParts" :saveUnitprice="saveUnitprice"></addParts>
    <importParts :importShow="importShow" @change="change"></importParts>
  </div>
</template>

<script>
  // import addParts from './add-parts'
  import importParts from './importParts1'
  export default {
    name:'procurement-application-detail',
    components:{
      // addParts,
      importParts
    },
    computed:{
      checkAllStatus(){
        if(!this.status){
          return false;
        }else{
          return this.checkList.length===this.model.purchaseApplyDetailDTOS.length
        }
      }
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
        reasonShow:false,//原因弹层显示状态
        reasonId:3,//同意1，驳回2 ，提交申请3 取消申请4
        purchaseApplyId:'',//采购申请id
        //申请信息
        checkList:[],//选中列表
        suppliersList:[],//供应商列表
        popUp:false,//新增配件显示状态
        importShow:false,//导入配件显示状态
        // 初始化全选按钮, 默认不选
        isCheckedAll: false,
        checkStatus:false,
        status:false,
        savePrice:{},//保留原价
        toOrderList:[],//采购申请转采购单列表
        saveUnitprice:{},//保存修改后的原价
      }
    },
    mounted() {
      this.purchaseApplyId=this.$route.params.purchaseApplyId;
      ////console.log(this.purchaseApplyId);
      this.fetchData();
      //获取供应商
      this.getSupplier();
    },
    methods:{
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
        ////console.log(index);
        ////console.log(row)
        if(row.applyNum==row.convertOrderNum){
          return 0;
        }else{
          return 1;
        }
      },
      handleSelectionChange(val) {
        ////console.log(val);
        this.toOrderList=JSON.parse(JSON.stringify(val));
        val.forEach((val)=>{
          this.checkList.push(val.goodsId);
        });
      },
      //底部总价
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 4) {
            sums[index] = '总价';
            return;
          }else if(index === 6){
            var total=0;
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum)
            this.model.purchaseApplyDetailDTOS.forEach((val)=>{
              ////console.log(val);
              ////console.log(val.applyNum);
              if(val.applyNum<=0){
                val.applyNum=1;
              }
              // total+=parseFloat(val.applyNum);//精度注释
              total=_this.AppUtils.add(total,val.applyNum);//精度处理
            });
            ////console.log(typeof total);
            ////console.log(total);
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
            this.model.purchaseApplyInfoDTO.totalNum=total;
            ////console.log(typeof this.model.purchaseApplyInfoDTO.totalNum);
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
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
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,val.totalPrice);//精度处理
            });
            this.model.purchaseApplyInfoDTO.orderTotalPrice=total;
            if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
              sums[index] =this.model.purchaseApplyInfoDTO.orderTotalPrice;
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
              // total+=parseFloat(val.currentStock);//精度注释
              total=_this.AppUtils.add(total,val.currentStock);//精度处理
            });
            sums[index]=total;
            return ;
          }else if(index === 12||index === 13||index === 14){
            sums[index]=0;
            return ;
          }
        });

        return sums;
      },
      /*getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        columns.forEach((column, index) => {
          if (index === 4) {
            sums[index] = '总价';
            return;
          }else if(index === 6){
            var total=0;
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum)
            this.model.purchaseApplyDetailDTOS.forEach((val)=>{
              ////console.log(val);
              ////console.log(val.applyNum);
              if(!val.applyNum){
                val.applyNum=0;
              }
              total+=parseFloat(val.applyNum);
            });
            ////console.log(typeof total);
            ////console.log(total);
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
            this.model.purchaseApplyInfoDTO.totalNum=total;
            ////console.log(typeof this.model.purchaseApplyInfoDTO.totalNum);
            ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
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
              total+=parseFloat(val.totalPrice);
            });
            this.model.purchaseApplyInfoDTO.orderTotalPrice=total;
            if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
              sums[index] =this.model.purchaseApplyInfoDTO.orderTotalPrice;
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
              total+=parseFloat(val.currentStock);
            });
            sums[index]=total;
            return ;
          }else if(index === 12||index === 13||index === 14){
            sums[index]=0;
            return ;
          }
        });

        return sums;
      },*/
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
        ////console.log(this.model);
        this.$axios.post('/admin/purchase/purchaseApply/statusUpdate/'+arg,this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            if(arg=='submitApply'){
              this.$message.success('提交申请成功');
            }else if(arg=='cancelApply'){
              this.$message.success('取消申请成功');
            }else if(arg=='passApply'){
              this.$message.success('同意申请成功');
            }else if(arg=='rejectApply'){
              this.$message.success('驳回申请成功');
            }
            this.fetchData();
          }
        })
      },
      //设置供应商名称
      setSupplierName(arg){
        if(!arg){
          ////console.log(this.suppliersList);
          ////console.log(this.model.purchaseApplyInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseApplyInfoDTO.supplierId){
                this.model.purchaseApplyInfoDTO.supplierName=val.supplierName;
              }
            });
          }
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
            _this.model.purchaseApplyDetailDTOS.forEach(function (val,ind) {
              if(valuee===val['goodsId']){
                _this.model.purchaseApplyDetailDTOS.splice(ind,1);
                _this.$refs.addParts.getDeleteGoods(_this.checkList);
                _this.checkList=[];
                // _this.checkList.splice(index,1);
                // this.status=false;
                ////console.log(_this.checkList.length);
                ////console.log(_this.checkList);
                if(!_this.checkList.length){
                  // this.status=true;
                  ////console.log(_this.checkList);
                  ////console.log(_this.model.purchaseApplyDetailDTOS);
                  _this.status=false;
                  if(_this.model.purchaseApplyDetailDTOS.length==0){
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
      /*deleteData(){
        ////console.log(this.checkList);
        if(this.checkList.length){
          this.checkList.forEach((value,index)=>{
            var _this=this;
            var valuee=value;
            var inde=index;
            this.model.purchaseApplyDetailDTOS.forEach(function (val,ind) {
              if(valuee===val['goodsId']){
                _this.model.purchaseApplyDetailDTOS.splice(ind,1);
                _this.$refs.addParts.getDeleteGoods(_this.checkList);
                _this.checkList=[];
                ////console.log(_this.checkList.length);
                ////console.log(_this.checkList);
                if(!_this.checkList.length){
                  ////console.log(_this.checkList);
                  ////console.log(_this.model.purchaseApplyDetailDTOS);
                  _this.status=false;
                  if(_this.model.purchaseApplyDetailDTOS.length==0){
                    _this.$refs.addParts.clearGoods();
                  }
                }else{
                  _this.status=false;
                }
              }
            })
          })
        }else{
        }
      },*/
      //获取认购清单表格数据
      /*getAddData(data,exit){
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            this.model.purchaseApplyDetailDTOS.push(data);
            //处理价格和数量随时变动
            this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.savePrice);
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(this.savePrice[val['goodsId']]){
                data.unitPrice=this.savePrice[val['goodsId']];
              }else if(this.savePrice[val['goodsId']]==0){
                data.unitPrice=this.savePrice[val['goodsId']];
              }
              data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);
              this.model.purchaseApplyDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              this.changeNumPrice();
            }
          });
        }
      },*/
      /*getAddData(data,exit){
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            this.model.purchaseApplyDetailDTOS.push(data);
            this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.savePrice);
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(this.savePrice[val['goodsId']]){
                data.unitPrice=this.savePrice[val['goodsId']];
              }else if(this.savePrice[val['goodsId']]==0){
                data.unitPrice=this.savePrice[val['goodsId']];
              }
              data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);
              this.model.purchaseApplyDetailDTOS.splice(index,1,data);
              this.changeNumPrice();
            }
          });
        }
      },*/
      getAddData(data,exit){
        var _this=this;
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            this.model.purchaseApplyDetailDTOS.push(data);
            //处理价格和数量随时变动
            this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.savePrice);
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(_this.savePrice[val['goodsId']]){
                data.unitPrice=_this.savePrice[val['goodsId']];
              }else if(_this.savePrice[val['goodsId']]==0){
                data.unitPrice=_this.savePrice[val['goodsId']];
              }
              // data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);//精度注释
              data.totalPrice=_this.AppUtils.mul(parseFloat(data.unitPrice),parseFloat(data.applyNum));//精度处理
              _this.model.purchaseApplyDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              _this.changeNumPrice();
            }
          });
        }
      },
      //隐藏原因弹框
      hideReason(){
        this.reasonShow=false;
      },
      getReason(arg){
        ////console.log(arg);
        ////console.log(this.reasonId);
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
      //选中所有
      checkedAll () {
        ////console.log(this.checkList.length);
        ////console.log(this.model.purchaseApplyDetailDTOS.length);
        this.status=true;
        if(this.checkList.length===this.model.purchaseApplyDetailDTOS.length){
          this.isCheckedAll=true;
        }
        this.isCheckedAll = !this.isCheckedAll
        ////console.log(this.isCheckedAll);
        if (this.isCheckedAll || this.checkList.length!==this.model.purchaseApplyDetailDTOS.length) {
          // 全选时
          this.checkList=[]
          ////console.log('选中');
          this.model.purchaseApplyDetailDTOS.forEach(function (val) {
            this.checkList.push(val.goodsId);
          }, this)
        } else {
          this.checkList=[];
        };
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
          ////console.log(this.model.purchaseApplyDetailDTOS);
        }
      },
      //计算总价
      /*getTotal(id,applyNum,unitPrice){
        ////console.log(applyNum,unitPrice);
        var totalPrice=parseFloat(applyNum)*unitPrice;
        if(totalPrice||totalPrice==0){
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
              this.$set(this.model.purchaseApplyDetailDTOS,index,this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              this.model.purchaseApplyDetailDTOS[index]['totalPrice']=0;
              this.$set(this.model.purchaseApplyDetailDTOS,index,this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },*/
      getTotal(id,applyNum,unitPrice) {
        var _this = this;
        ////console.log(typeof applyNum);
        ////console.log(applyNum);
        ////console.log(typeof unitPrice);
        ////console.log(unitPrice);
        if (applyNum) {
          if (applyNum <= 0) {
            applyNum = 1;
          }
          if (Math.floor(applyNum) != applyNum) {
            ////console.log(applyNum);
            this.AppUtils.alert('请购数量为正整数');
          }
        } else {
          applyNum = 1;
        }
        // unitPrice=unitPrice.toFixed(2);
        // unitPrice=this.AppUtils.deLength(unitPrice);
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            this.AppUtils.alert('采购单价小数点位数最多两位');
            unitPrice=unitPrice.toFixed(2);
          }
        }
        if(parseFloat(unitPrice)<0){
          this.AppUtils.alert('采购单价不能为负');
        }
        ////console.log(typeof unitPrice);
        ////console.log(unitPrice);
        if((typeof unitPrice!=='number')&&(unitPrice!=='')){
          ////console.log(unitPrice);
          ////console.log(typeof unitPrice);
          // this.AppUtils.alert('单价不能为数字之外的其他字符');
        }else if(unitPrice===''){
          this.AppUtils.alert('请输入采购单价');
        }
        this.saveUnitprice[id]=unitPrice;
        ////console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(applyNum),unitPrice);//精度处理
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=0;
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
          ////console.log(val);
          ////console.log(val.applyNum);
          ////console.log(val.totalPrice);
          if(val.applyNum<=0){
            num=1;
          }else{
            num=val.applyNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allApplyNum=_this.AppUtils.add(allApplyNum,parseFloat(num));//精度处理
          ////console.log(typeof val.applyNum);
          ////console.log(typeof val.totalPrice);
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,parseFloat(val.totalPrice));//精度处理
        });
        ////console.log(typeof allApplyNum);
        ////console.log(allApplyNum);
        if(allApplyNum){
          this.model.purchaseApplyInfoDTO.totalNum=allApplyNum;
        }
        ////console.log(allTotalPrice);
        if(allTotalPrice){
          this.model.purchaseApplyInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },
      //获取详情
      fetchData() {
        this.$axios.post('/admin/purchase/purchaseApply/detail/'+this.purchaseApplyId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model.purchaseApplyInfoDTO=JSON.parse(JSON.stringify(data.value.purchaseApplyInfoDTO));
            this.model.purchaseApplyDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseApplyDetailDTOS));
            this.model.purchaseOrderInfoDTOS=JSON.parse(JSON.stringify(data.value.purchaseOrderInfoDTOS));
            this.model.purchaseApplyInfoDTO.id=this.purchaseApplyId;
            // getAlreadyGoodsId(arg)
            if(this.model.purchaseApplyDetailDTOS.length){
              this.model.purchaseApplyDetailDTOS.forEach((item)=>{
                this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.applyNum]);
                this.savePrice[item.goodsId]=item.unitPrice;
              });
            }
          }
        })
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
      saveInfo(){
        ////console.log(this.model.purchaseApplyDetailDTOS);
        ////console.log(this.model);
        this.$axios.post('/admin/purchase/purchaseApply/update',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('保存成功');
            this.fetchData();
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
        var arr=JSON.parse(JSON.stringify(this.toOrderList));
        if(this.toOrderList.length){
          ////console.log(typeof arr);
          ////console.log(arr);
          arr.forEach((val)=>{
            val['orderNum']=val['haveNotConvertOrderNum'];
            val['totalPrice']=parseFloat(val['orderNum'])*parseFloat(val['unitPrice']);
            delete val['applyNum'];
            val['alreadyInputNum']=0;
            val['inputTotalPrice']=0;
            val['inputNoTaxPrice']=0;
            val['originalNum']=0;
            val['cancelNum']=0;
          });
          ////console.log(typeof arr)
          ////console.log(arr)
          localStorage.setItem('purApplyInfoId',this.purchaseApplyId);
          localStorage.setItem('toOrder',JSON.stringify(arr));
          localStorage.setItem('applyNo',this.model.purchaseApplyInfoDTO.purchaseApplyNo);
          let routeData = this.$router.resolve({path:'/purchasing-management/procurement-order/add'});
          ////console.log(routeData)
          window.open(routeData.href, '_blank');
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
    margin: 0 20px 20px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .zone{
      width: 572px;
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
