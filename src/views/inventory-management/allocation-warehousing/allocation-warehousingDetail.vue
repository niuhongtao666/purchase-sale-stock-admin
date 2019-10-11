<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="input-info_icon"></i>
        <h2>入库信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">入库单号：<span class="rColor">{{model.allotInputOrderNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">已入库</span></span>
          <span class="lColor">入库时间：<span class="rColor">{{model.createTime}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">入库门店</div>
            <div class="rightZone">
              {{model.allotInputStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">入库类型</div>
            <div class="rightZone">
              {{model.allotTypeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">入库人</div>
            <div class="rightZone">
              {{model.inputUserName}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">调拨单号</div>
            <div class="rightZone">
              <router-link class="primary" :to="'/allocation-management/parts-allocation/detail/'+model.allotOrderId" target="_blank">
                {{model.allotOrderNo}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="input-list_icon"></i>
        <h2>入库清单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.inputOrderDetailList"
              max-height="490"
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
                min-width="80"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.allotNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputTotalNoTaxPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.wavehouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="180"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="180"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.batchNo}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="printOrder">打印入库单</button>
      </div>
    </div>
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template>
        <allocationWavehousePrint :inputUserId="inputUserId"></allocationWavehousePrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import  printBox from '@/components/print-box'
  import allocationWavehousePrint from './allocationWavehousePrint'
  export default {
    name:'allocation-warehousing-detail',
    components:{
      printBox,
      allocationWavehousePrint
    },
    computed:{
    },
    data(){
      return{
        model:{
          id:null,//调拨入库单idallocationWavehouse.
          allotOrderId:null,//调拨单ID
          allotOrderNo:null,//调拨单号
          allotInputOrderNo:null,//调拨入库单编号
          allotInputStoreName:null,//入库门店
          allotStatusName:null,//入库状态名称
          allotTypeName:null,//入库类型
          createTime:null,//入库时间
          inputUserName:null,//入库人
          allotInputTotalNum:null,//入库总数
          inputTotalPrice:null,//入库总价
          inputOrderDetailList:[]	//入库单明细
        },
        inputUserId:null,//调拨入库单id
        printShow:false,//打印显示
      }
    },
    mounted() {
      this.inputUserId=this.$route.params.inputUserId;
      this.fetchData();//获取详情
    },
    methods:{
      printOrder(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      //底部合计
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
            this.model.inputOrderDetailList.forEach((val)=>{
              // if(val.allotNum<=0){
              //   val.allotNum=1;
              // }
              total=_this.AppUtils.add(total,val.allotNum);
            });
            if(total||total){
              sums[index]=total;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 8){
            var total=0;
            this.model.inputOrderDetailList.forEach((val)=>{
              if(!val.inputTotalPrice){
                val.inputTotalPrice=0;
              }
              total=_this.AppUtils.add(total,val.inputTotalNoTaxPrice);
            });
            if(total||total==0){
              sums[index] =total;
            }else{
              sums[index]=0;
            }
            return ;
          }
        });

        return sums;
      },
      //获取详情
      fetchData() {
        this.$axios.get('/admin/stock/allotInputOrderInfo/detail/'+this.inputUserId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model=data.value;
          }
        })
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
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
  .titleZone{
    .zone{
      /*width: 572px;*/
      padding-left: 11px;
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
