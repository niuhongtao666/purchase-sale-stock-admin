<template>
  <div class="main_wrap">
    <div class="search-box onWay">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                <!--<el-select v-model.trim="model.timeFlag" class="el_box" clearable filterable placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in timeFlagsList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                截止日期
              </span>
              <div class="right">
                <!--<el-date-picker-->
                  <!--v-model.trim="model.startTime"-->
                  <!--type="date"-->
                  <!--format="yyyy-MM-dd"-->
                  <!--placeholder="起始时间"-->
                  <!--@change="initStartTime"-->
                  <!--class="activity-edit-date date-box"-->
                <!--&gt;-->
                <!--</el-date-picker>-->
                <!--<i> 至 </i>-->
                <el-date-picker
                  v-model.trim="model.outputTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="截止日期"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">调出门店</span>
              <div class="right">
                <el-select v-model.trim="model.allotOutStoreId" class="el_box" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in allotOutStoresList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">调入门店</span>
              <div class="right">
                <el-select v-model.trim="model.allotInputStoreId" class="el_box" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in allotInputStoresList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品编码" v-model.trim="model.goodsVendorNo">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品名称" v-model.trim="model.goodsName">
              </div>
            </div>
            <div class="group btn-box">
              <div class="group">
                <span class="left"></span>
                <div class="right">
                  <input type="text" placeholder="请输入出库单号" v-model.trim="model.allotOutputOrderNo">
                </div>
              </div>
              <button type="submit" class="btn">搜索</button>
              <!--<button type="button" class="btn" @click="toAdd" v-if="buttonInfo.save">{{buttonInfo.save}}</button>-->
              <button type="button" class="btn" @click="exportData">导出</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            max-height="490"
            border
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
            :summary-method="getSummaries"
            show-summary
          >
            <!--<el-table-column-->
              <!--label="序号"-->
              <!--width="50"-->
              <!--key="1"-->
              <!--type="index"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--label="调拨单号"-->
              <!--min-width="180"-->
              <!--key="2"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<router-link class="primary" :to="'detail/'+scope.row.id" target="_blank">-->
                  <!--{{scope.row.allotOrderNo}}-->
                <!--</router-link>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="调出门店"
              min-width="180"
              key="1"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                  {{scope.row.allotOutStoreName}}
              </template>
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="180"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="出库单号"
              min-width="180"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotOutputOrderNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="一级分类"
              min-width="100"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.goodsFirstClassName}}
              </template>
            </el-table-column>
            <el-table-column
              label="二级分类"
              min-width="100"
              key="5"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.goodsSecondClassName}}
              </template>
            </el-table-column>
            <el-table-column
              label="三级分类"
              min-width="100"
              key="6"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.goodsThirdClassName}}
              </template>
            </el-table-column>
            <el-table-column
              label="商品编码"
              min-width="200"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.goodsVendorNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="商品名称"
              min-width="160"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.goodsName}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨数量"
              min-width="100"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotNum}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨总价"
              min-width="100"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotTotalPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="成本总价"
              min-width="100"
              key="11"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.currAvgTotalNoTaxPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨状态"
              min-width="100"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!--{{scope.row.allotStatus | allotState}}-->
                待调拨入库
              </template>
            </el-table-column>
            <el-table-column
              label="调入门店"
              min-width="180"
              key="13"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotInputStoreName}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'allocation-onWay',
    data(){
      return{
        model:{
          outputTime:null,//截止时间
          allotOutStoreId:null,//调出门店
          allotInputStoreId:null,//调入门店
          goodsVendorNo:null,//商品编码
          goodsName:null,//商品名称
          allotOutputOrderNo:null,//出库单号
          pageNo:1,
          pageSize:20,
        },
        //调出门店
        allotOutStoresList:[],
        //调入门店
        allotInputStoresList:[],
        dataList:[],//列表数据
        status:false,//已审批选择
        data:{}
      }
    },
    computed:{
      checkAllStatus(){
        if(!this.status){
          return false;
        }else{
          return this.checkList.length===this.dataList.length
        }
      },
      buttonInfo() {
        return this.AppUtils.returnPermissions(55);
      },
    },
    mounted(){
      var today=new Date();
      this.model.outputTime=this.AppUtils.formatDate(today);
      // this.fetchData();
      this.allotOutputStores();//获取调拨出门店
      this.allotInputStores();//获取调拨出门店
      // this.buttonInfo=this.AppUtils.returnPermissions(55);
    },
    methods:{
      getSummaries(param) {
       const { columns, data } = param;
        const sums = [];
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(index ===8){
            sums[index]=this.data.sumTotalNum;
          }else if(index ===9){
            sums[index]=this.data.sumAllotPrice;
          }else if(index ===10){
            sums[index]=this.data.sumTotalCostNoTax ;
          }
        });
        return sums;
      },
      searchData(){
        // if(this.model.allotStatus){
        //   this.model.allotStatus=null;
        // }else{
        //   this.fetchData();
        // }
      },
      initStartTime(date){
        this.model.startTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.outputTime=this.AppUtils.formatDate(date);
      },
      //获取调拨出门店
      allotOutputStores(){
        this.$store.dispatch('fetchStoreListNew').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.allotOutStoresList=data.value;
          if(this.allotOutStoresList.length==1){
            var userInfos=JSON.parse(localStorage.getItem('userInfos'));
            this.model.allotOutStoreId=userInfos['storeId'];
          }else{
            this.allotOutStoresList.unshift({storeId:null,storeName:'全部'});
          }
        });
      },
      //获取调拨出门店
      allotInputStores(){
        this.$store.dispatch('fetchStoreListNew').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.allotInputStoresList=data.value;
          this.allotInputStoresList.unshift({storeId:null,storeName:'全部'});
        });
      },
      /*handleSelectionChange(val) {
        ////console.log(val);
        this.multipleSelection = val;
      },*/
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        this.$axios.post('/admin/stock/allotOutputOrderInfo/onwayAllotExport', this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '调拨在途'+time+'.xls';
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
      fetchData(args){
        if(this.model.outputTime){
          this.model.outputTime=this.AppUtils.formatDate(this.model.outputTime);
        }
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/stock/allotOutputOrderInfo/onwayAllotDetailList',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.data=data.value.data;
            this.dataList=data.value.data.listInfo;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.listInfo.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      //新增采购申请
      toAdd(){
        this.$router.push('./add');
      },
      //克隆
      toClone(arg){
        ////console.log(arg);
        if(arg){
          localStorage.setItem("cloneId",arg);
          // this.$store.commit("CLONEID",arg);
          this.$router.push('add');
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .select-wrap{
    padding-left: 20px;
    .date-box{
      width: 346px;
    }
    &>.group{
      margin-right: 50px;
      span.left{
        width: auto;
      }
      .el_box{
        width: 86px;
      }
      .group{
        margin-left: 10px;
      }
      .btn-box{
        margin-left: 0px;
        .btn{
          margin-left: 12px;
        }
        /*.btn:first-child{*/
        /*margin-left: 0px;*/
        /*}*/
      }
    }
    .area{
      margin-left: 10px;
    }
  }
  .el-date-editor{
    width: 135px!important;
  }
</style>
