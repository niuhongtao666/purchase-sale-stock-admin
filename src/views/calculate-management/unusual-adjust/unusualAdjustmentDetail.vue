<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="cal-info_list"></i>
        <h2>调整信息</h2>
      </div>
      <div class="row width900">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">调整单号</div>
            <div class="rightZone resetInput">
              {{data.excepAdjustmentNo}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整类型</div>
            <div class="rightZone resetInput">
              {{data.adjustmentType==1?'异常调整':''}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整分类</div>
            <div class="rightZone resetInput">
              {{data.adjustmentClass==1?'采购入库':(data.adjustmentClass==2?'调拨入库':(data.adjustmentClass==3?'盘盈入库':''))}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl0">仓库</div>
            <div class="rightZone resetInput">
              {{data.warehouseName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整机构</div>
            <div class="rightZone resetInput">
              {{data.storeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整人</div>
            <div class="rightZone resetInput">
              {{data.adUserName}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl0">调整日期</div>
            <div class="rightZone resetInput ">
              {{data.createTime | formatDate}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商编码</div>
            <div class="rightZone resetInput widthReset">
              {{data.supplierNo}}
              <!--<el-input  placeholder="请输入供应商编码" v-model="model.supplierNo"></el-input>-->
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商名称</div>
            <div class="rightZone resetInput widthReset">
              {{data.supplierName}}
              <!--<el-input  placeholder="请输入供应商名称" v-model="model.supplierName"></el-input>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="position: relative;">
      <div class="item">
        <i class="cal-list_icon"></i>
        <h2>调整清单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:25px;">
          <div class="table_scroll add">
            <el-table
              :data="data.stockExceptionAdjustmentDetailDTOS"
              max-height="582"
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
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编码"
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
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
                label="生产编码"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="50"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价"
                min-width="120"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.costPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整数量"
                min-width="120"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.adjustmentNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整金额"
                min-width="120"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.adjustmentMoney}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="120"
                key="10"
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
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="printCostAdjust">打印</button>
      </div>
    </div>
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <unusualAdjustPrint :data="data"></unusualAdjustPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import {isNumber} from '@/assets/js/logic'
  import  printBox from '@/components/print-box'
  import unusualAdjustPrint from './unusualAdjustPrint'
  export default {
    name:'unusualAdjustmentDetail',
    components:{
      printBox,
      unusualAdjustPrint
    },
    data(){
      return{
        adjustId:null,
        printShow:false,
        data:{
          stockExceptionAdjustmentDetailDTOS:[]
        },
      }
    },
    mounted(){
      this.adjustId=this.$route.params.adjustId;
      // console.log(this.$route.query.printShow);
      this.fetchData();
      //console.log(this.adjustId);
    },
    computed:{
    },
    methods:{
      hidePrintMask(){
        this.printShow=false;
      },
      printCostAdjust(){
        this.printShow=true;
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      handleSelectionChange(val) {
        //console.log(val)
      },
      fetchData() {
        this.$axios.get('/admin/stock/stockExceptionAdjustment/detail/'+this.adjustId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
           console.log(data);
           this.data=data.value.data;
           if(this.$route.query.printShow){
              this.printShow=true;
           }
          }
        })
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
            var arr=_this.data.stockExceptionAdjustmentDetailDTOS;
            var newArr=arr.filter(item=>item['adjustmentNum']==='');
            if(arr.length) {
              if(arr.length==newArr.length){
                sums[index]='';
              }else{
                for(var i=0;i<arr.length;i++){
                  if(arr[i]['adjustmentNum']==''){
                    continue;
                  }
                  if(isNumber(arr[i]['adjustmentNum'])){
                    total=_this.AppUtils.add(total,parseFloat(arr[i]['adjustmentNum']));//精度处理
                  }
                }
                // _this.data.total=total;
                if(total||total===0){
                  sums[index]=total;
                }else {
                  sums[index]='';
                }
              }
            }
            return
          }else if(index === 7){
            var total=0;
            var arr=_this.data.stockExceptionAdjustmentDetailDTOS;
            var newArr=arr.filter(item=>item['adjustmentMoney']==='');
            if(arr.length) {
              if(arr.length==newArr.length){
                sums[index]='';
              }else{
                for(var i=0;i<arr.length;i++){
                  if(arr[i]['adjustmentMoney']==''){
                    continue;
                  }
                  if(isNumber(arr[i]['adjustmentMoney'])){
                    total=_this.AppUtils.add(total,parseFloat(arr[i]['adjustmentMoney']));//精度处理
                  }
                }
                // _this.data.total=total;
                if(total||total===0){
                  sums[index]=total;
                }else {
                  sums[index]='';
                }
              }
            }
            return
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
    },
  }
</script>

<style scoped lang="scss">
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
      width: 188px;
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
