<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="out-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">出库单号：<span class="rColor">{{model.outputOrderNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">{{model.outputStatus}}</span></span>
          <span class="lColor">创建时间：<span class="rColor">{{model.createTime}}</span></span>
          <span class="lColor">出库时间：<span class="rColor">{{model.outputTime}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">出库门店</div>
            <div class="rightZone">
              {{model.outputStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">出库类型</div>
            <div class="rightZone">
              {{model.outputTypeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">业务类型</div>
            <div class="rightZone">
              {{model.billTypeName}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone h49">业务单号</div>
            <div class="rightZone">
              <!--<router-link class="primary" :to="'/material-management/work-material-detail/'+model.orderId">
                {{model.orderNo}}
              </router-link>-->

              <!--<span v-if="model.businessType===2">
                <router-link v-if="model.dataSourceType===200" class="primary"
                                :to="'/material-management/list/work-material-detail/'+model.orderId" target="_blank">
                   {{model.orderNo}}
                </router-link>
                <router-link v-else-if="model.dataSourceType===210||model.dataSourceType===220" class="primary" :to="'/material-management/list/work-material-refund-detail/'+model.orderId" target="_blank">
                   {{model.orderNo}}
                </router-link>
                </span>
              <span v-else-if="model.businessType===1">
                <router-link  class="primary" :to="'/material-management/list/sales-material-detail/'+model.orderId" target="_blank">
                   {{model.orderNo}}
                </router-link>
              </span>-->
              {{model.workOrderNo}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">客户名称</div>
            <div class="rightZone">
              {{model.customerName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">客户手机</div>
            <div class="rightZone">
              {{model.customerMobile}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">车牌号码</div>
            <div class="rightZone">
              {{model.carNumber}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone h49">车架号</div>
            <div class="rightZone">
              {{model.vinCode}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">销售数量</div>
            <div class="rightZone">
              {{model.totalNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone" style="font-size: 12px!important">销售总价(含税)</div>
            <div class="rightZone">
              {{model.totalPrice}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone" style="font-size: 12px!important">成本总价(不含税)</div>
            <div class="rightZone">
              {{model.costTotalMoney}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">出库人</div>
            <div class="rightZone">
              {{model.outputUserName}}
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
              :data="model.outputDetailList"
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
                min-width="100"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.matchNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="销售单价(含税)"
                min-width="120"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.unitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="销售总价(含税)"
                min-width="120"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.costUnitPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.costTotalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="100"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.wavehouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="100"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="180"
                key="15"
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
        <!--<button type="button" class="btn">保存</button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'material-out-detail',
    components:{
    },
    computed:{
    },
    data(){
      return{
        model:{
          outputDetailList:[],
        },
        materialId:null,//发料出库id
        businessType:null,//出库类型(1-销售出库 2-发料出库)
      }
    },
    mounted() {
      this.materialId=this.$route.params.id;
      this.businessType=this.$route.params.businessType;
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
          }else if(index === 6){
            var total=0;
            this.model.outputDetailList.forEach((val)=>{
              total=_this.AppUtils.add(total,val.matchNum);
              // total+=val.matchNum
            });
            // alert(total)
            if(total||total==0){
              sums[index]=total;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 8){
            var total=0;
            this.model.outputDetailList.forEach((val)=>{
              if(!val.totalPrice){
                val.totalPrice=0;
              }
              total=_this.AppUtils.add(total,val.totalPrice);
            });
            if(total||total==0){
              sums[index] =total;
            }else{
              sums[index]=0;
            }
            return ;
          }else if(index === 10){
            var total=0;
            this.model.outputDetailList.forEach((val)=>{
              if(!val.costTotalPrice){
                val.costTotalPrice=0;
              }
              total=_this.AppUtils.add(total,val.costTotalPrice);
            });
            if(total||total==0){
              sums[index] =total;
            }else{l
              sums[index]=0;
            }
            return ;
          }
        });

        return sums;
      },
      //获取详情
      fetchData() {
        this.$axios.get('/admin/stock/outPutInfo/detail?id='+this.materialId+'&businessType='+ this.businessType).then(res=>{
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
    background: #fff;
    padding-left: 20px;
    .zone{
      /*width: 802px;*/
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
