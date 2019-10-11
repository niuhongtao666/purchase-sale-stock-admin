<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="cal-info_list"></i>
        <h2>盘点信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">盘点单号:<span class="rColor">{{model.checkOrderNo}}</span></span>
          <span class="lColor">状态:<span class="rColor">{{model.checkStatusName}}</span></span>
          <span class="lColor">申请时间:<span class="rColor">{{model.createTime}}</span></span>
          <span v-if="model.checkStatusName=='已驳回'" class="lColor">驳回时间:<span class="rColor">{{model.auditTime}}</span></span>
          <span v-else class="lColor">调整时间:<span class="rColor">{{model.auditTime?model.auditTime:'无'}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">盘点门店</div>
            <div class="rightZone">
              {{model.checkOutStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">盘点类型</div>
            <div class="rightZone">
              {{model.checkTypeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">申请人</div>
            <div class="rightZone">
              {{model.createUserName}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">调整人</div>
            <div class="rightZone">
              {{model.auditUserName}}
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom">
          <div class="leftMark h90">
            <div class="leftZone h89 line-height90 pl1">备注</div>
            <div class="rightZone w480  block">
              {{model.memo}}
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom" v-if="model.checkStatusName=='已完成'">
          <div class="leftMark h90">
            <div class="leftZone h89 line-height90 pl1">调整原因</div>
            <div class="rightZone w480 block h90">
              {{model.checkAuditReason}}
            </div>
          </div>
        </div>
        <div class="rowItem h90" v-if="model.checkStatusName=='已驳回'">
          <div class="leftMark h90">
            <div class="leftZone h90 line-height90 pl1">驳回原因</div>
            <div class="rightZone w480 block h90">
              {{model.checkAuditReason}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="cal-list_icon"></i>
        <h2>盘点清单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.checkOrderDetailList "
              max-height="492"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                min-width="170"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="170"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="170"
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
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="130"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.wavehouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="130"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="(model.checkStatusName=='已完成')&&(model.checkTypeName=='盘盈入库')">
      <div class="item">
        <i class="input-list_icon"></i>
        <h2>入库信息</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.inputOrderInfoList"
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
                label="调整单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link :to='"/inventory-management/inventory-surplus/detail/"+scope.row.id'>
                    {{scope.row.checkInputOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="调整数量"
                min-width="218"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkInputTotalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整人"
                min-width="215"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整时间"
                min-width="218"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="(model.checkStatusName=='已完成')&&(model.checkTypeName=='盘亏出库')">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.outputOrderInfoList"
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
                label="调整单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link :to='"/inventory-management/loss-out/detail/"+scope.row.id'>
                    {{scope.row.checkOutputOrderNo}}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="调整数量"
                min-width="218"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkOutputTotalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整人"
                min-width="215"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createUserName}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整时间"
                min-width="218"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.createTime | dateFormatToSecond }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn"  v-if="(model.checkStatusName=='待调整')&&buttonInfo.confirmAdjust" @click="confirmAdjust(1)">{{buttonInfo.confirmAdjust}}</button>
        <button type="button" class="btn"  v-if="(model.checkStatusName=='待调整')&&buttonInfo.rejected" @click="confirmAdjust(0)">驳回申请</button>
        <button type="button" class="btn"  v-if="model.checkStatusName=='已完成'" @click="printInventory">打印盘点调整单</button>
      </div>
    </div>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @checkInputStock="checkInputStock"></nt-reason>
    <!--<print v-if="printShow" :data="model" @hidePrintApplication="hidePrintApplication"></print>-->
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask" >
      <template>
        <inventoryPrint :data="dataPrint"></inventoryPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import  printBox from '@/components/print-box'
  import inventoryPrint from './inventoryPrint'
  export default {
    name:'inventory-management-detail',
    components:{
      printBox,
      inventoryPrint
    },
    data(){
      return{
        calculateId:'',//盘点单id
        model:{
          checkOrderDetailList:[],
        },
        // buttonInfo:{},//按钮权限
        reasonShow:false,//确认调整，驳回申请原因弹层显示状态
        reasonId:null,//7,8标题为确认调整
        printShow:false,//打印状态显示
        dataPrint:{},//打印信息
      }
    },
    mounted() {
      this.calculateId=this.$route.params.calculateId;
      //////console.log(this.purchaseReturnId);
      this.fetchData();
      /*if(this.model.checkStatusName=="已完成"){
        this.fetchPrintData();//获取打印详情
      }*/
      // this.buttonInfo=this.AppUtils.returnPermissions(86);
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(86);
      },
    },
    methods:{
      printInventory(){
        this.printShow=true;
        // this.fetchPrintData();//获取打印详情
      },
      hidePrintMask(){
        this.printShow=false;
      },
      //盘盈入库
      checkInputStock(arg){
        var obj={
          checkOrderId:this.calculateId,
          checkAuditReason:arg.reason
        };
        var url;
        if(this.reasonId==7){
          url='/admin/stock/stockCheckInputOrderInfo/checkInputStock';
        }else if(this.reasonId==8){
          url='/admin/stock/stockCheckOutputOrderInfo/checkOutputStock';
        }else if(this.reasonId==9){
          url='/admin/stock/stockCheckOrderInfo/rejected';
        }
        this.$axios.post(url,obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            if(this.reasonId==7||this.reasonId==8){
              this.$message.success('确认调整成功');
            }else if(this.reasonId==9){
              this.$message.success('驳回申请成功');
            }
            this.fetchData();
          }
        })
      },
      confirmAdjust(arg){
        if(arg){
          if(this.model.checkTypeName=='盘盈入库'){
            this.reasonId=7;
            this.reasonShow=true;
          }else if(this.model.checkTypeName=='盘亏出库'){
            this.reasonId=8;
            this.reasonShow=true;
          }
        }else {
            this.reasonId=9;
          this.reasonShow=true;
        }
      },
      //隐藏原因弹框
      hideReason(){
        this.reasonShow=false;
      },
      getSummaries(param) {
        //////console.log(param)
        const { columns, data } = param;
        const sums = [];
        //////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 3) {
            sums[index] = '合计';
            return;
          }else if(index === 5){
            var total=0;
            //////console.log(this.model.checkOrderDetailList)
            _this.model.checkOrderDetailList.forEach((val)=>{
              if(val.checkNum<0){
                val.checkNum=0;
              }
              // total+=parseFloat(val.applyNum);//精度注释
              total=_this.AppUtils.add(total,val.checkNum);//精度处理
            });
            if(total||total==0){
              sums[index]=total;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 7){
            var total=0;
            _this.model.checkOrderDetailList.forEach((val)=>{
              if(!val.checkTotalPrice){
                val.checkTotalPrice=0;
              }
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.checkTotalPrice));//精度处理
            });
            if(total||total==0){
              sums[index] =total;
            }else{
              sums[index]=0;
            }
            return ;
          }
        }
        );

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
      //获取详情
      fetchData() {
        this.$axios.get('/admin/stock/stockCheckOrderInfo/detail/'+this.calculateId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.model=JSON.parse(JSON.stringify(data.value));
            //////console.log(this.model);
            if(this.model.checkStatusName=="已完成"){
              this.fetchPrintData();//获取打印详情
            }
          }
        })
      },
      fetchPrintData() {
        this.$axios.get('/admin/stock/stockCheckOrderInfo/print/'+this.calculateId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.dataPrint=data.value;
          }
        })
      },
      purchaseReturn(){
        /*this.$axios.post('/admin/purchase/purchaseReturnInfo/cancelPurchase/'+this.purchaseReturnId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            this.$message.success('取消退货成功');
            this.fetchData();
          }
        })*/
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
    bottom: -17px;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%); 	/* Opera */
  }
  .titleZone{
    .zone{
      /*width: 800px;*/
      display: flex;
      padding-left: 30px;
      box-sizing: border-box;
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
      width: 355px;
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
