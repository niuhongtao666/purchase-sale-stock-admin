<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="out-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">出库单号：<span class="rColor">{{model.checkOutputOrderNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">已出库</span></span>
          <span class="lColor">出库时间：<span class="rColor">{{model.createTime?model.createTime:'无'}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl11">出库门店</div>
            <div class="rightZone">
              {{model.checkOutStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">出库类型</div>
            <div class="rightZone">
              {{model.checkTypeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">出库人</div>
            <div class="rightZone">
              {{model.createUserName}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">盘点单号</div>
            <div class="rightZone">
              <router-link class="primary" :to="'/calculate-management/inventory-management/detail/'+model.checkOrderId" target="_blank">
                {{model.checkOrderNo}}
              </router-link>
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom">
          <div class="left h90">
            <div class="leftZone h90 line-height90 f1">调整原因</div>
            <div class="rightZone f11  block h90">
              {{model.checkAuditReason}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="out-list_icon"></i>
        <h2>出库清单</h2>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:0px 25px 25px 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.checkOutputOrderDetailList"
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
                  {{scope.row.checkPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.checkTotalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.wavehouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="180"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="220"
                key="12"
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'loss-out-detail',
    components:{
    },
    computed:{
    },
    data(){
      return{
        model:{
          id:null,//盘亏出库单id
          checkOrderId:null,//盘点单ID
          checkOrderNo:null,//盘点单号
          checkOutputOrderNo:null,//盘亏出库单编号
          checkOutputStoreName:null,//盘点门店
          checkOutputStatusName:null,//盘亏出库状态名称
          checkTypeName:null,//盘点类型
          createTime:null,//出库时间
          createUserName:null,//出库人
          checkOutputTotalNum:null,//出库总数
          outputTotalPrice:null,//出库总价
          checkAuditReason:null,//调整原因
          checkOutputOrderDetailList:[],//盘亏出库单明细

        },
        outId:null,//盘亏出库单id
      }
    },
    mounted() {
      this.outId=this.$route.params.outId;
      this.fetchData();//获取详情
    },
    methods:{
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
          }else if(index === 5){
            var total=0;
            this.model.checkOutputOrderDetailList.forEach((val)=>{
              if(val.checkNum<=0){
                val.checkNum=1;
              }
              total=_this.AppUtils.add(total,val.checkNum);
            });
            if(total||total){
              sums[index]=total;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 7){
            var total=0;
            this.model.checkOutputOrderDetailList.forEach((val)=>{
              if(!val.checkTotalPrice){
                val.checkTotalPrice=0;
              }
              total=_this.AppUtils.add(total,val.checkTotalPrice);
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
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      fetchData() {
        this.$axios.get('/admin/stock/stockCheckOutputOrderInfo/detail/'+this.outId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model=data.value;
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
    bottom: 0px;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%); 	/* Opera */
  }
  .titleZone{
    .zone{
      /*width: 574px;*/
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
