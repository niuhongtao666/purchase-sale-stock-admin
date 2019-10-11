<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="allot-info_icon"></i>
        <h2>调拨信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">调拨单号：<span class="rColor">{{data.allotOrderNo}} </span></span>
          <span class="lColor">状态：<span class="rColor">{{data.allotStatusName}}</span></span>
          <span class="lColor">创建时间：<span class="rColor">{{data.createTime | dateFormatToSecond}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">调出门店</div>
            <div class="rightZone">
              {{data.allotOutputStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调入门店</div>
            <div class="rightZone">
              {{data.allotInputStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调拨数量</div>
            <div class="rightZone">
              {{model.allotTotalNum}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">调拨金额(含税)</div>
            <div class="rightZone">
              {{model.allotTotalPrice | decimalTofixed4}}
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom">
          <div class="leftMark h90">
            <div class="leftZone h90 line-height90">备注</div>
            <div class="rightZone w480 h90" id="memo">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                v-model="model.memo"
                v-if="data.allotStatus==100"
              >
              </el-input>
              <span v-else class="block">{{model.memo}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="allot-list_icon"></i>
        <h2>调拨清单</h2>
      </div>
      <div class="btnZone" v-if="data.allotStatus==100">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts">导入配件</button>
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.allotOrderDetailDTOS"
              max-height="490"
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
                v-if="data.allotStatus==100"
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                min-width="193"
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
                label="配件品牌"
                min-width="120"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsBrandName}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                min-width="60"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="70"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.allotNum" class="in" min="0" @input="getTotal(scope.row.goodsId,scope.row.allotNum,scope.row.allotPrice,scope.row.currentStock)" v-if="data.allotStatus==100" style="width: 48px!important;">
                  <span v-else>{{scope.row.allotNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="实际库存"
                min-width="80"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock}}
                </template>
              </el-table-column>
              <el-table-column
                label="锁定库存"
                min-width="80"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="调拨单价(含税)"
                min-width="120"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.allotPrice" class="in" min='0' step='0.1' @input="getTotal(scope.row.goodsId,scope.row.allotNum,scope.row.allotPrice,scope.row.currentStock,scope.row.currentStock)" v-if="data.allotStatus==100">
                  <span v-else>{{scope.row.allotPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="调拨总价(含税)"
                min-width="130"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.allotTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(含税)"
                min-width="130"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currAvgTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="140"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currAvgTotalNoTaxPrice | decimalTofixed4}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="data.allotStatus==300 || data.allotStatus==400 || data.allotStatus==600">
      <div class="item">
        <i class="out-list_icon"></i>
        <h2>调拨出库信息</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="data.allotOutputOrderList"
              max-height="250"
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
                label="出库单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/inventory-management/allocation-out/detail/'+scope.row.allotOutputOrderId">
                    {{scope.row.allotOutputOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="出库数量"
                min-width="218"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.allotOutputTotalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库人"
                min-width="215"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.outputUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="出库时间"
                min-width="218"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.outputTime | dateFormatToSecond }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="(data.allotStatus==200&&model.allotTotalNum<0)||data.allotStatus==400">
      <div class="item">
        <i class="input-list_icon"></i>
        <h2>入库信息</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="data.allotInputOrderList"
              max-height="250"
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
                label="入库单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/inventory-management/allocation-warehousing/detail/'+scope.row.allotInputOrderId">
                    {{scope.row.allotInputOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="入库数量"
                min-width="218"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.allotInputTotalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库人"
                min-width="215"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库时间"
                min-width="218"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTime | dateFormatToSecond }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" v-if="(data.allotStatus==100)&&buttonInfo.update" @click="saveInfo()">保存</button>
        <button type="button" class="btn" v-if="(data.allotStatus==100)&&buttonInfo.update" @click="saveInfo(200)">{{buttonInfo.update}}</button>
        <button type="button" class="btn" @click="confirmOutWare" v-if="(data.allotStatus==200)&&buttonInfo.output&&(userStoreId==data.allotOutputStoreId)">{{buttonInfo.output}}</button>
        <button type="button" class="btn" v-if="(data.allotStatus==100 || data.allotStatus==200)&&buttonInfo.updateStatus&&(data.returnStatus!=1)" @click="cancelAllocation">{{buttonInfo.updateStatus}}</button>
        <button type="button" class="btn" @click="importWareShow=true" v-if="(data.allotStatus==300)&&buttonInfo.input&&(userStoreId==data.allotInputStoreId)">{{buttonInfo.input}}</button>
        <button type="button" class="btn" v-if="(data.allotStatus==300)&&(buttonInfo.revoked)" @click="revokeAllocation">{{buttonInfo.revoked}}</button>
        <button type="button" class="btn" v-if="data.allotStatus==400&&buttonInfo.return&&returnBtn&&(data.returnStatus==0)" @click="returnAllocation">{{buttonInfo.return}}</button>
        <button type="button" class="btn" v-if="(data.allotStatus==300||data.allotStatus==400)&&buttonInfo.print" @click="printAllocation">打印调拨单</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :isNewPart="true" :storeId="storeId"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <outWare v-if="outWareShow" @hideConfirmOutMask="hideConfirmOutMask" :allocationId="allocationId" :outId="data.allotOutputStoreId" @outWarehouse="outWarehouse"></outWare>
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType" :storeId="data.allotOutputStoreId"></importParts>
    <importWare v-if="importWareShow" @hideImportWareMask="hideImportWareMask" @fetchData="fetchData" :allocationId="allocationId" :allotInputStoreId="data.allotInputStoreId"></importWare>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @confirmRen="confirmRen"></nt-reason>
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <allocationPrint :data="dataPrint" :memo="model.memo"></allocationPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  import outWare from './outWare'
  // import importParts from './importParts'
  import  printBox from '@/components/print-box'
  import allocationPrint from './allocationPrint'
  import importWare from './importWare'
  export default {
    name:'parts-allocation-detail',
    components:{
      // importParts,
      outWare,
      importWare,
      printBox,
      allocationPrint
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(55);
      },
      returnBtn(){
        if(this.data.allotInputStoreName==this.storeName){
          return true;
        }else{
          return false;
        }
      },
    },
    data(){
      return{
        model:{
          id:'',//调拨单id
          // allotStatus:null,//调拨状态
          allotTotalNum:null,//调拨总数
          allotTotalPrice:null,//调拨总价
          memo:null,//备注
          allotOrderDetailDTOS:[]//调拨明细
        },
        data:{},//获取到的详情数据
        partMaskShow: false,//新增配件
        allocationId:null,//调拨单id
        outWareShow:false,//调拨出库弹层显示状态
        importType:"allotOrderImportGoods",//调拨导入配件
        importWareShow:false,//调拨入库弹层显示状态
        //申请信息
        checkList:[],//选中列表
        importShow:false,//导入配件显示状态
        // 初始化全选按钮, 默认不选
        status:false,
        printShow:false,//打印弹层显示
        dataPrint:{},
        storeId:null,//门店id
        // buttonInfo:{},//权限按钮
        userStoreId:null,//用户的门店id
        storeName:null,//用户所属门店名
        reasonShow:false,//二次确认弹层
        reasonId:12,//控制标题
      }
    },
    mounted() {
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      console.log(userInfos);
      this.storeName=userInfos['storeName'];
      this.userStoreId=userInfos['storeId'];
      this.allocationId=this.$route.params.allocationId;
      ////console.log(this.allocationId);
      //获取详情
      this.fetchData();
      this.fetchPrintData();//获取打印详情
      // this.buttonInfo=this.AppUtils.returnPermissions(55);
    },
    methods:{
      hideReason(){
        this.reasonShow=false;
      },
      returnAllocation(){
        this.reasonShow=true;
      },
      confirmRen(){
        this.$axios.post('/admin/stock/allotInputOrderInfo/allotReturn',{allotOrderId:this.allocationId}).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('调拨退货成功');
            this.$router.push('/inventory-management/allocation-warehousing/detail/'+data.value);
            // this.fetchData();
          }
        })
      },
      printAllocation(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      getImportData(arg) {
        ////console.log(arg);
        if (arg.length) {
          for (let val of arg) {
            let index = checkDataExit(this.model.allotOrderDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.allotOrderDetailDTOS.push(...arg);
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      //撤销调拨
      revokeAllocation(){
        this.$axios.post('/admin/stock/allotOutputOrderInfo/revokedAllot',{allotOrderId:this.allocationId}).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('撤销调拨成功');
            this.fetchData();
          }
        })
      },
      //确认出库
      confirmOutWare(){
        if(this.model.allotTotalNum<0){
          this.negativeOutWarehouse();
        }else{
          this.outWareShow=true;
        }
      },
      outWarehouse(infos){
        this.$axios.post('/admin/stock/allotOutputOrderInfo/confirmOutput',infos).then(res=>{
         let data = this.AppUtils.checkResponse(res);
         if(data) {
           ////console.log(data);
           this.$message.success('确认出库成功');
           this.hideConfirmOutMask();
           this.fetchData();
         }
       })
      },
      negativeOutWarehouse(infos){
        this.$axios.post('/admin/stock/allotOutputOrderInfo/confirmOutput',{allotOrderId:this.allocationId}).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('确认出库成功');
            this.fetchData();
          }
        })
      },
      //取消调拨
      cancelAllocation(){
        var obj={
            id:this.allocationId,
            allotStatus:500
          };
        this.$axios.post('/admin/stock/allotOrderInfo/updateAllotStatus',obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('取消调拨成功');
            this.fetchData();
          }
        })
      },
      hideImportWareMask(){
        this.importWareShow=false;
      },
      //隐藏出库
      hideConfirmOutMask(){
        this.outWareShow=false;
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.allotOrderDetailDTOS,this.checkList);
        }
      },
      addParts(data) {
        data['allotPrice']=this.AppUtils.decimal4(data['unitTaxPrice']);//给调拨价赋值
        // if(parseFloat(data['allotPrice'])<0){
        //   this.AppUtils.alert('调拨价不能为负');
        // }
        data['allotNum']=data['applyNum'];//给数量赋值
        data['allotTotalPrice']=this.AppUtils.mul(data['allotPrice'],data['allotNum']);
        let index = checkDataExit(this.model.allotOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.allotOrderDetailDTOS[index].allotNum += data.applyNum;
            var numSub=this.AppUtils.numSub(parseFloat(this.model.allotOrderDetailDTOS[index]['currentStock']),0);
            if(this.model.allotOrderDetailDTOS[index].allotNum>numSub){
              this.AppUtils.alert('调拨配件数量<=实际库存-锁定库存');
              this.model.allotOrderDetailDTOS[index].allotNum=numSub;
            }
            this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=this.AppUtils.mul(this.model.allotOrderDetailDTOS[index]['allotPrice'],this.model.allotOrderDetailDTOS[index]['allotNum']);
          })
        } else {
          this.model.allotOrderDetailDTOS.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
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
        this.checkList=val;
      },
      //底部总价
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if(_this.data.allotStatus==100){
            if (index === 4) {
              sums[index] = '合计';
              return;
            }else if(index === 7){
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                // if(val.allotNum<=0){
                //   val.allotNum=0;
                // }
                total=_this.AppUtils.add(total,val.allotNum);//精度处理
              });
              this.model.allotTotalNum=total;
              if(this.model.allotTotalNum||this.model.allotTotalNum==0){
                sums[index]=this.model.allotTotalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 8) {
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                if(!val.currentStock){
                  val.currentStock=0;
                }
                total=_this.AppUtils.add(total,val.currentStock);//精度处理
              });
              sums[index]=total;
              return
            }
            else if(index === 9){
              sums[index]=0;
              return ;
            }else if(index === 11){
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                if(!val.allotTotalPrice){
                  val.allotTotalPrice=0;
                }
                total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.allotTotalPrice));//精度处理
              });
              this.model.allotTotalPrice=_this.AppUtils.decimal4(total);
              if(this.model.allotTotalPrice||this.model.allotTotalPrice==0){
                sums[index]=this.model.allotTotalPrice;
              }else{
                sums[index]=0;
              }
              return
            }
          }else{
            if (index === 3) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                // if(val.allotNum<=0){
                //   val.allotNum=0;
                // }
                total=_this.AppUtils.add(total,val.allotNum);//精度处理
              });
              this.model.allotTotalNum=total;
              if(this.model.allotTotalNum||this.model.allotTotalNum==0){
                sums[index]=this.model.allotTotalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 7) {
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                if(!val.currentStock){
                  val.currentStock=0;
                }
                total=_this.AppUtils.add(total,val.currentStock);//精度处理
              });
              sums[index]=total;
              return
            }
            else if(index === 8){
              sums[index]=0;
              return ;
            }else if(index === 10){
              var total=0;
              this.model.allotOrderDetailDTOS.forEach((val)=>{
                if(!val.allotTotalPrice){
                  val.allotTotalPrice=0;
                }
                total=_this.AppUtils.add(total,val.allotTotalPrice);//精度处理
              });
              this.model.allotTotalPrice=total;
              if(this.model.allotTotalPrice||this.model.allotTotalPrice==0){
                sums[index]=this.model.allotTotalPrice;
              }else{
                sums[index]=0;
              }
              return
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
      //计算总价
      getTotal(id,allotNum,allotPrice,currentStock) {
        var _this = this;
        if (allotNum) {
          if (allotNum <=0) {
            allotNum = 0;
          }
          if (Math.floor(allotNum)!=allotNum) {
            ////console.log(allotNum);
            this.AppUtils.alert('数量为整数');
            allotNum=Math.floor(allotNum);
          }
        } else {
          allotNum = 0;
        }
        var str = '' + allotPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('配件调拨价小数点位数最多4位');
            str=str.substring(0,str.length-1);
            allotPrice=parseFloat(str);
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调拨价');
            str=str.substring(1,str.length);
            allotPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调拨价');
            allotPrice=0;
          }
        }
        if(allotPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          allotPrice=Math.abs(allotPrice);
        }
        if((allotPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入调拨价');
          allotPrice=0;
        }
        if(allotNum>currentStock){
          this.AppUtils.alert('数量<=实际库存-锁定库存');
          allotNum=currentStock;
        };
        ////console.log(allotNum);
        // this.saveUnitprice[id]=unitPrice;
        var totalPrice=this.AppUtils.mul(parseFloat(allotNum),allotPrice);//精度处理
        if(totalPrice||totalPrice==0){
          this.model.allotOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=totalPrice;
              _this.model.allotOrderDetailDTOS[index]['allotPrice']=allotPrice;
              _this.model.allotOrderDetailDTOS[index]['allotNum']=allotNum;
              _this.$set(_this.model.allotOrderDetailDTOS,index,_this.model.allotOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.allotOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=0;
              _this.$set(_this.model.allotOrderDetailDTOS,index,_this.model.allotOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allotTotalNum=0;
        var allotTotalPrice=0;
        var num;
        var _this=this;
        this.model.allotOrderDetailDTOS.forEach((val,index)=>{
          if(val.allotNum<=0){
            num=1;
          }else{
            num=val.allotNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allotTotalNum=_this.AppUtils.add(allotTotalNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allotTotalPrice=_this.AppUtils.add(allotTotalPrice,parseFloat(val.totalPrice));//精度处理
        });
        ////console.log(typeof allotTotalNum);
        ////console.log(allotTotalNum);
        if(allotTotalNum){
          _this.model.allotTotalNum=allotTotalNum;
        }
        if(allotTotalPrice){
          _this.model.allotTotalPrice=allotTotalPrice;
        }
      },
      //获取详情
      fetchData() {
        this.$axios.get('/admin/stock/allotOrderInfo/detail/'+this.allocationId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model.allotOrderDetailDTOS=JSON.parse(JSON.stringify(data.value.allotDetailList));
            this.model.memo=data.value.memo
            this.storeId=data.value.allotOutputStoreId;
            this.data=JSON.parse(JSON.stringify(data.value));
            ////console.log(this.data);
          }
        })
      },
      fetchPrintData() {
        this.$axios.get('/admin/stock/allotOrderInfo/print/'+this.allocationId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.dataPrint=data.value;
          }
        })
      },
      saveInfo(arg){
        this.model.id=this.allocationId;
        ////console.log(this.model);
        if(arg){
          this.model.allotStatus=arg;
        }
        if(this.model.allotOrderDetailDTOS.length){
          this.$axios.post('/admin/stock/allotOrderInfo/update',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              if(arg){
                this.$message.success('确认调拨成功');
              }else{
                this.$message.success('保存成功');
              }
              this.fetchData();
            }
          })
        }else{
         this.AppUtils.alert('请在调拨清单中添加配件')
        }
      },
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
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
    position: fixeed;
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
      /*width: 672px;*/
      display: flex;
      padding-left: 29px;
      box-sizing: border-box;
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
