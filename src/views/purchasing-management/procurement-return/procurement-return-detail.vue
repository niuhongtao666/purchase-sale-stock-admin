<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="return-Info_icon"></i>
        <h2>退货信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">采购退货单:<span class="rColor">{{model.purchaseReturnInfo.purchaseReturnNo}}</span></span>
          <span class="lColor">状态:<span class="rColor">{{model.purchaseReturnInfo.returnState==100?'待退货':(model.purchaseReturnInfo.returnState==200?'已完成':(model.purchaseReturnInfo.returnState==300?'已取消':''))}} </span></span>
          <span class="lColor">创建时间:<span class="rColor">{{model.purchaseReturnInfo.createTime | dateFormatToSecond}} </span> </span>
          <span class="lColor">关联采购单:
          <router-link :to='"/purchasing-management/procurement-order/detail/"+model.purchaseReturnInfo.purchaseOrderId' v-if="model.purchaseReturnInfo.purchaseOrderNo" target="_blank" class="rColor">
              {{model.purchaseReturnInfo.purchaseOrderNo}}
          </router-link>
          <span v-else class="rColor">无</span>
        </span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">退货门店</div>
            <div class="rightZone">
              {{model.purchaseReturnInfo.storeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">退货供应商</div>
            <div class="rightZone">
              {{model.purchaseReturnInfo.supplierName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">退货数量</div>
            <div class="rightZone">
              {{model.purchaseReturnInfo.returnTotalNum}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">退货总价(含税)</div>
            <div class="rightZone">
              {{model.purchaseReturnInfo.returnTotalPrice | decimalTofixed2}}
            </div>
          </div>
        </div>
        <div class="rowItem h90">
          <div class="leftMark h90">
            <div class="leftZone h90 line-height90">退货原因</div>
            <div class="rightZone w480 block h90">
              {{model.purchaseReturnInfo.returnReason}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-List_icon"></i>
        <h2>退货清单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseReturnDetails"
              max-height="428"
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
                min-width="155"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                width="160"
                key="4"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="160"
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
                min-width="50"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货数量"
                min-width="80"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.returnNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货单价(含税)"
                min-width="115"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.unitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货总价(含税)"
                min-width="115"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货单价(不含税)"
                min-width="130"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="退货总价(不含税)"
                min-width="130"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" v-if="model.purchaseReturnInfo.returnState==200">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>入库记录</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.inputInfo"
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
                width="72">
              </el-table-column>
              <el-table-column
                label="入库单号"
                min-width="218"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <router-link class="primary" :to="'/inventory-management/purchase-warehousing/detail/'+scope.row.id">
                    {{scope.row.inputOrderNo}}
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
                  {{scope.row.totalNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="入库金额(含税)"
                min-width="200"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed2}}
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
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="statuschange" v-if="buttonInfo.purcherReturnInput&&(model.purchaseReturnInfo.returnState==100)">{{buttonInfo.purcherReturnInput}}</button>
        <button type="button" class="btn" @click="showPurchaseReturn" v-if="buttonInfo.cancelPurchase&&(model.purchaseReturnInfo.returnState==100)">{{buttonInfo.cancelPurchase}}</button>
        <button type="button" class="btn" @click="returnOrder" v-if="buttonInfo.print&&(model.purchaseReturnInfo.returnState==100||model.purchaseReturnInfo.returnState==200)">打印退货单</button>
      </div>
    </div>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @purchaseReturn="purchaseReturn" @confirmReturn="confirmReturn"></nt-reason>
    <!--<print v-if="printShow" :data="model" @hidePrintApplication="hidePrintApplication"></print>-->
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <!--<saleOrdersPrint></saleOrdersPrint>-->
        <procurementReturnPrint :data="model"></procurementReturnPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  // import print from './print'
  import  printBox from '@/components/print-box'
  import procurementReturnPrint from './procurement-return-print'
  export default {
    name:'procurement-return-detail',
    components:{
      // print
      printBox,
      procurementReturnPrint
    },
    data(){
      return{
        purchaseReturnId:'',//采购退货id
        model:{
          purchaseReturnInfo:{
            storeId:'',//退货门店id
            storeName:'',//退货门店名称
            supplierId:'',//退货供应商id
            supplierName:'',//退货供应商名称
            returnTotalNum:'',//退货数量
            returnTotalPrice:'',//退货金额
            returnReason:'',//退货原因
          },
          purchaseReturnDetails:[],//退货清单
          //入库信息
          /*inputInfo:{
            id:'',//入库单id
            inputOrderNo:'',//入库单号
            totalNum:'',//入库数量
            totalPrice:'',//入库总价
            inputUserName:'',//入库人
            inputTIme:'',//入库时间
          },*/
          inputInfo:[],
        },
        reasonShow:false,//确认退货二次确认
        printShow:false,//打印状态显示
        reasonId:null,//二次确认标题
        // buttonInfo:{},//按钮权限
      }
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(7);
      },
    },
    mounted() {
      this.purchaseReturnId=this.$route.params.purchaseReturnId;
      ////console.log(this.purchaseReturnId);
      this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(7);
     /* var buttonPermissions=this.$store.state.buttonPermissions;
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
    },
    methods:{
      showPurchaseReturn(){
        this.reasonId=6;
        this.reasonShow=true;
      },
      returnOrder(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      confirmReturn(){
        var returnList=[];
        returnList.push(Number(this.purchaseReturnId));
        this.$axios.post('/admin/stock/inputInfo/confirmReturnGoods',{purchaseReturnInfoIds:returnList}).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.$message.success('确认退货成功');
            this.fetchData();
          }
        })
      },
      //确认退货
      statuschange(){
        // this.reasonShow=true;
        var returnList=[];
        returnList.push(Number(this.purchaseReturnId));
        this.$axios.post('/admin/stock/inputInfo/checkReturnGoods',{purchaseReturnInfoIds:returnList}).then(res=>{
          if(res.data.code==90001){
            this.AppUtils
              .confirm(res.data.value+'是否确认退货？',
                () => {
                  this.confirmReturn();
                },()=>{

                })
          }else{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              this.reasonId=11;
              this.reasonShow=true;
            }
          }
        })
      },
      //隐藏原因弹框
      hideReason(){
        this.reasonShow=false;
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 3) {
            sums[index] = '合计';
            return;
          }else if(index === 6){
            var total=0;
            this.model.purchaseReturnDetails.forEach((val)=>{
              if(val.returnNum<0){
                val.returnNum=0;
              }
              // total+=parseFloat(val.applyNum);//精度注释
              total=_this.AppUtils.add(total,val.returnNum);//精度处理
            });

            this.model.purchaseReturnInfo.returnTotalNum=total;
            if(this.model.purchaseReturnInfo.returnTotalNum||this.model.purchaseReturnInfo.returnTotalNum==0){
              sums[index]=this.model.purchaseReturnInfo.returnTotalNum;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 8){
            var total=0;
            this.model.purchaseReturnDetails.forEach((val)=>{
              if(!val.totalPrice){
                val.totalPrice=0;
              }
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,val.totalPrice);//精度处理
            });
            this.model.purchaseReturnInfo.returnTotalPrice=total;
            if(this.model.purchaseReturnInfo.returnTotalPrice||this.model.purchaseReturnInfo.returnTotalPrice==0){
              sums[index] =this.AppUtils.decimal2(this.model.purchaseReturnInfo.returnTotalPrice);
            }else{
              sums[index]=0;
            }
            return ;
          }else if(index === 10){
            var total=0;
            this.model.purchaseReturnDetails.forEach((val)=>{
              if(!val.noTaxTotalPrice){
                val.noTaxTotalPrice=0;
              }
              // total+=parseFloat(val.currentStock);//精度注释
              total=_this.AppUtils.add(total,val.noTaxTotalPrice);//精度处理
            });
            this.model.purchaseReturnInfo.noTaxPrice=total;
            if(this.model.purchaseReturnInfo.noTaxPrice||this.model.purchaseReturnInfo.noTaxPrice==0){
              sums[index] =this.AppUtils.decimal2(this.model.purchaseReturnInfo.noTaxPrice);
            }else{
              sums[index]=0;
            }
            return ;
          }
        });

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
        this.$axios.get('/admin/purchase/purchaseReturnInfo/detail/'+this.purchaseReturnId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model=JSON.parse(JSON.stringify(data.value));
          }
        })
      },
      purchaseReturn(){
        this.$axios.post('/admin/purchase/purchaseReturnInfo/cancelPurchase/'+this.purchaseReturnId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
              this.$message.success('取消退货成功');
              this.fetchData();
          }
        })
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
    background: #fff;
    .zone{
      /*width: 800px;*/
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
