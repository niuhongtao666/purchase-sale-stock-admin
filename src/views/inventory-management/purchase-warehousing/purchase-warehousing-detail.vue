<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="input-info_icon"></i>
        <h2>入库信息</h2>
      </div>
      <div class="titleZone">
        <div class="zone pl11">
          <span class="lColor">入库单号：<span class="rColor">{{model.inputOrderNo}}</span></span>
          <span class="lColor">状态：<span class="rColor">{{model.inputStatusName}}</span></span>
          <span class="lColor">入库时间：<span class="rColor">{{model.createTime}}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">入库门店</div>
            <div class="rightZone">
             {{model.inputStoreName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商</div>
            <div class="rightZone">
              {{model.supplierName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">入库类型</div>
            <div class="rightZone">
              {{model.inputTypeName}}
            </div>
          </div>
          <div class="right h-49" v-if="model.inputTotalNum>0">
            <div class="leftZone h49">采购单号</div>
            <div class="rightZone">
              <router-link class="primary" :to="'/purchasing-management/procurement-order/detail/'+model.inputDataId" target="_blank">
                {{model.inputDataNo}}
              </router-link>
            </div>
          </div>
          <div class="right h-49" v-else>
            <div class="leftZone h49">退货单号</div>
            <div class="rightZone">
              <router-link class="primary" :to="'/purchasing-management/procurement-return/detail/'+model.inputDataId" target="_blank">
                {{model.inputDataNo}}
              </router-link>
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">入库数量</div>
            <div class="rightZone">
              {{model.inputTotalNum}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone" style="font-size: 12px">总价（不含税）</div>
            <div class="rightZone">
              {{model.inputNoTaxTotalPrice | decimalTofixed2}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">总价（含税）</div>
            <div class="rightZone">
              {{model.inputTotalPrice | decimalTofixed2}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">入库人</div>
            <div class="rightZone">
              {{model.inputUserName}}
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
              :data="model.inputDetailList"
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
                  {{scope.row.inputNum}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.unitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价"
                min-width="130"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="单价（不含税）"
                min-width="130"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="总价（不含税）"
                min-width="130"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.noTaxTotalPrice | decimalTofixed4}}
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
        <button type="button" class="btn" @click="printEnter" v-if="buttonInfo.print">打印入库单</button>
        <!--<button type="button" class="btn" @click="printTest" v-if="buttonInfo.print">打印入库单</button>-->
      </div>
    </div>
    <!--<print v-if="printShow" :data="model" @hidePrintApplication="hidePrintApplication"></print>-->
    <print-box v-if="printShow" @hidePrintMask="hidePrintMask" @printTest="printTest" :pdfPrint="true">
      <template >
        <purchaseWarePrint :data="data" :inputUserName="model.inputUserName"></purchaseWarePrint>
      </template>
    </print-box>
  </div>
</template>

<script>
  // import print from './print'
  import  printBox from '@/components/print-box'
  import purchaseWarePrint from './purchaseWarePrint'
  export default {
    name:'purchase-warehousing-detail',
    components:{
      printBox,
      purchaseWarePrint
    },
    data(){
      return{
        model:{
          inputDetailList:[],
        },
        wareId:null,//采购入库id
        printShow:false,//打印状态显示
        data:{},//打印数据
        // buttonInfo:{},
      }
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(16);
      },
    },
    mounted() {
      this.wareId=this.$route.params.wareId;
      this.fetchData();//获取详情
      this.fetchPrintData();
      //console.log(this.$route.query.showPrint)
      // this.buttonInfo=this.AppUtils.returnPermissions(16);
      if(this.$route.query.showPrint){
        this.fetchPrintData();
      }
    },
    methods:{
      printTest(){
        // this.$axios.get('/admin/stock/inputInfo/printpdf/'+this.wareId).then(res=>{
        //   console.log(res)
        //   // let data = this.AppUtils.checkResponse(res);
        //   // if(data) {
        //   //   ////console.log(data);
        //   //   this.model=data.value;
        //   // }
        // })
        // window.open('/admin/stock/inputInfo/printpdf/'+this.wareId);
        this.$axios({
          method:"get",
          url:'/admin/stock/inputInfo/printpdf/'+this.wareId,
          // headers:headers('application/x-download'),
          headers: {
            'Content-Type': 'application/x-download'
          },
          responseType: 'blob',
        }).then(function(res){
          let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
          // window.open(url+'.pdf');
          // window.location.href=file;
          // let link = document.createElement('a');
          // link.style.display = 'none';
          // link.href = url;
          // link.download= '1.pdf'; //docNumber 动态文件名
          // window.open('1.pdf');
          // document.body.appendChild(link);
          // link.click();
          window.open('/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
        });
      },
      printEnter(){
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
            this.model.inputDetailList.forEach((val)=>{
              if(!val.inputNum){
                val.inputNum=0;
              }
              total=_this.AppUtils.add(total,val.inputNum);
            });
            if(total||total==0){
              sums[index]=total;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 8){
            var total=0;
            this.model.inputDetailList.forEach((val)=>{
              if(!val.totalPrice){
                val.totalPrice=0;
              }
              total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.totalPrice));
            });
            if(total||total==0){
              sums[index] =this.AppUtils.decimal2(total);
            }else{
              sums[index]=0;
            }
            return ;
          }else if(index === 10){
            var total=0;
            this.model.inputDetailList.forEach((val)=>{
              if(!val.noTaxTotalPrice){
                val.noTaxTotalPrice=0;
              }
              total=_this.AppUtils.add(total,this.AppUtils.decimal4(val.noTaxTotalPrice));
            });
            if(total||total==0){
              sums[index] =this.AppUtils.decimal2(total);
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
        this.$axios.get('/admin/stock/inputInfo/purchase/detail/'+this.wareId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model=data.value;
          }
        })
      },
      //获取打印详情
      fetchPrintData() {
        this.$axios.get('/admin/stock/inputInfo/print/'+this.wareId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.data=data.value;
            if(this.$route.query.showPrint){
              this.printShow=true;
            }
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
