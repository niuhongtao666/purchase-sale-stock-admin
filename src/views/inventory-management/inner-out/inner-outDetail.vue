<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="out-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone">
          <span class="lColor">出库单号：<span class="rColor">{{model.orderNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">已出库</span></span>
          <span class="lColor">创建时间：<span class="rColor">{{model.createdTime}}</span></span>
          <span class="lColor">出库时间：<span class="rColor">{{model.createdTime}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">出库门店</div>
            <div class="rightZone">
              {{model.storeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">业务类型</div>
            <div class="rightZone">
              内部领用
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone pl7">用途</div>
            <div class="rightZone">
              {{model.useType}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">业务单号</div>
            <div class="rightZone">
              {{model.dataNo}}
            </div>
          </div>
        </div>
        <div class="rowItem h90">
          <div class="left h90">
            <div class="leftZone h90 line-height90">领用人</div>
            <div class="rightZone h90 line-height90">
              {{model.useUser}}
            </div>
          </div>
          <div class="left h90">
            <div class="leftZone h90 line-height90">出库人</div>
            <div class="rightZone h90 line-height90">
              {{model.outputUser}}
            </div>
          </div>
          <div class="left h90 f2">
            <div class="leftZone h90 line-height90">备注</div>
            <div class="rightZone flex5 h90 block">
              {{model.memo}}
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
              :data="model.details"
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
                  {{scope.row.vendorNo}}
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
                min-width="50"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.num}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.costUnitPric | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="140"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.warehouseName}}
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="140"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.locationName}}
                </template>
              </el-table-column>
              <el-table-column
                label="批次号"
                min-width="180"
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
        <button type="button" class="btn" @click="cancelOut" v-if="buttonInfo.cancel&&(this.totalNum>-1)">{{buttonInfo.cancel}}</button>
        <button type="button" class="btn" @click="innerPrint" v-if="buttonInfo.print">打印出库单</button>
      </div>
    </div>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @confirmCancelOut="confirmCancelOut"></nt-reason>
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask">
      <template >
        <innerOutPrint :data="model"></innerOutPrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  import  printBox from '@/components/print-box'
  import innerOutPrint from './innerOutPrint'
  export default {
    name:'inner-out-detail',
    components:{
      innerOutPrint,
      printBox
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(59);
      },
    },
    data(){
      return{
        model:{
          details:[],
        },
        innerOutId:null,//出库单id
        reasonShow:false,//二次确认弹层
        reasonId:10,//弹层标题
        printShow:false,//打印弹层显示
        // buttonInfo:{},//按钮权限
        totalNum:null,//出库清单数量合计
      }
    },
    mounted() {
      this.innerOutId=this.$route.params.innerOutId;
      this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(59);
    },
    methods:{
      innerPrint(){
        this.printShow=true;
      },
      hidePrintMask(){
        this.printShow=false;
      },
      hideReason(){
        this.reasonShow=false;//隐藏二次确认弹层
      },
      //撤销出库
      cancelOut(){
        this.reasonShow=true;//显示二次确认弹层
      },
      confirmCancelOut(){
        this.$axios.post('/admin/stock/insideUseOutputInfo/cancel/'+this.innerOutId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            this.$message.success('撤销出库成功');
            this.$router.push('/inventory-management/inner-out/');
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
          }else if(index === 5){
            var total=0;
            this.model.details.forEach((val)=>{
              total=_this.AppUtils.add(total,val.num);//精度处理
            });
            if(total||total==0){
              this.totalNum=total;
              sums[index]=total;
            }else{
              this.totalNum=0;
              sums[index]=0;
            }
            return
          }else if(index === 7){
            var total=0;
            this.model.details.forEach((val)=>{
              if(!val.totalPrice){
                val.totalPrice=0;
              }
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
            });
            if(total||total==0){
              sums[index] =_this.AppUtils.decimal2(total);
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
        this.$axios.get('/admin/stock/insideUseOutputInfo/detail/'+this.innerOutId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model=data.value;
            this.model.details=JSON.parse(JSON.stringify(data.value.details))
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
