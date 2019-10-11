<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="searchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                <el-select v-model.trim="model.timeFlag" class="el_box" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in timeFlagsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </span>
              <div class="right">
                <el-date-picker
                  v-model.trim="model.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  @change="initStartTime"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model.trim="model.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  @change="initEndTime"
                  placeholder="终止时间"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">创建门店</span>
              <div class="right">
                <el-select v-model.trim="model.createStoreId" class="el_box" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in createStoresList"
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
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入创建人" v-model.trim="model.createUserName">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入出库人" v-model.trim="model.outputUserName">
              </div>
            </div>
            <div class="group btn-box">
              <div class="group">
                <span class="left"></span>
                <div class="right">
                  <input type="text" placeholder="请输入入库人" v-model.trim="model.inputUserName">
                </div>
              </div>
              <div class="group">
                <span class="left"></span>
                <div class="right">
                  <input type="text" placeholder="请输入调拨单号" v-model.trim="model.allotOrderNo">
                </div>
              </div>
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="toAdd" v-if="buttonInfo.save">{{buttonInfo.save}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_nav">
        <ul>
          <li v-for="(tabList,index) in tabLists" :class="model.allotStatus==tabList.id?'active':''" :key="index"
              @click="model.allotStatus=tabList.id">{{tabList.name}}
          </li>
        </ul>
      </div>
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
            <el-table-column
              label="序号"
              width="50"
              key="1"
              type="index"
            >
            </el-table-column>
            <el-table-column
              label="调拨单号"
              min-width="180"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="'detail/'+scope.row.id" target="_blank">
                  {{scope.row.allotOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="调出门店"
              min-width="200"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                  {{scope.row.allotOutputStoreName}}
              </template>
            </el-table-column>
            <el-table-column
              label="调入门店"
              min-width="200"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotInputStoreName}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨总价(含税)"
              min-width="115"
              key="5"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotTotalPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨总价(不含税)"
              min-width="130"
              key="6"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotTotalNoTaxPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="成本总价(含税)"
              min-width="115"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.currAvgTotalPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="成本总价(不含税)"
              min-width="130"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.currAvgTotalNoTaxPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotStatusName}}
              </template>
            </el-table-column>
            <el-table-column
              label="调拨数量"
              min-width="80"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.allotTotalNum}}
              </template>
            </el-table-column>
            <el-table-column
              label="创建人"
              min-width="110"
              key="11"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.createUserName}}
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="160"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="出库人"
              min-width="110"
              key="13"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.outputUserName}}
              </template>
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="160"
              key="14"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.comfirmAllotTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="入库人"
              min-width="110"
              key="15"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.inputUserName}}
              </template>
            </el-table-column>
            <el-table-column
              label="入库时间"
              min-width="160"
              key="16"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.finishTime | dateFormatToSecond }}</span>
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
    name:'parts-allocation',
    data(){
      return{
        model:{
          timeFlag:1,//查询时间类型
          startTime:null,//起始时间
          endTime:null,//终止时间
          allotStatus:200,//调拨状态
          createUserName:null,//创建人
          createStoreId:null,//创建门店
          allotOutStoreId:null,//调出门店
          outputUserName:null,//	出库人
          allotInputStoreId:null,//调入门店
          inputUserName:null,//入库人
          allotOrderNo:null,//调拨单号
          pageNo:1,
          pageSize:20
        },
        tabLists: [
          {
            id:null,
            name: '全部',
          },
          {
            id: 100,
            name: "待确认调拨"
          },
          {
            id: 200,
            name: "待调拨出库"
          },
          {
            id: 300,
            name: "待调拨入库"
          },
          {
            id: 400,
            name: "已完成"
          },
          {
            id: 500,
            name: "已取消"
          },
          {
            id: 600,
            name: "已撤销"
          }

        ],
        //创建门店
        createStoresList:[],
        //调出门店
        allotOutStoresList:[],
        //调入门店
        allotInputStoresList:[],
        dataList:[],//列表数据
        status:false,//已审批选择
        checkList:[],//选中列表
        // 初始化全选按钮, 默认不选
        isCheckedAll: false,
        timeFlagsList:[
          {
            id:1,
            name:"创建日期",
          },
          {
            id:2,
            name:"出库日期",
          },
          {
            id:3,
            name:"入库日期",
          }
        ],
        data:{},//所有数据
        multipleSelection:[],
        // buttonInfo:{},//权限按钮
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
      this.fetchData();
      this.allotOutputStores();//获取调拨出门店
      this.allotInputStores();//获取调拨出门店
      this.createStores();//创建门店
      // this.buttonInfo=this.AppUtils.returnPermissions(55);
    },
    watch:{
      'model.allotStatus'() {
        this.fetchData();
      },
    },
    methods:{
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(index ===4 ){
            sums[index]=this.data.sumAllotPrice;
          }else if(index ===5){
            sums[index]=this.data.sumAllotNoTaxPrice;
          }else if(index ===6){
            sums[index]=this.data.sumTotalCost ;
          }else if(index ===7){
            sums[index]=this.data.sumTotalCostNoTax;
          }else if(index === 9){
              sums[index]=this.data.sumTotalNum;
          }
        });
        return sums;
      },
      searchData(){
        if(this.model.allotStatus){
          this.model.allotStatus=null;
        }else{
          this.fetchData();
        }
      },
      createStores(){
        this.$store.dispatch('fetchStores').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.createStoresList=data.value;
            this.createStoresList.unshift({'storeId':null,'storeName':'全部'});
          };
        })
      },
      initStartTime(date){
        this.model.startTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.formatDate(date);
      },
      //获取调拨出门店
      allotOutputStores(){
        this.$store.dispatch('fetchStoreListNew').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.allotOutStoresList=data.value;
        });
      },
      //获取调拨出门店
      allotInputStores(){
        this.$store.dispatch('fetchStoreListNew').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.allotInputStoresList=data.value;
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
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/stock/allotOrderInfo/list',this.model).then(res=>{
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
