<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="searchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                申请日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model.trim="model.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  @change="initStartTime"
                  placeholder="起始时间"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model.trim="model.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">盘点门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.checkOutStoreId" clearable filterable>
                  <el-option
                    v-for="item in storesList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入申请人" v-model.trim="model.createUserName">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入盘点单号" v-model.trim="model.checkOrderNo">
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="toAdd" v-if="buttonInfo.save">{{buttonInfo.save}}</button>
              <button type="button" class="btn" @click="showExportMask" v-if="buttonInfo.export">盘点导出</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_nav">
        <ul>
          <li v-for="(tabList,index) in tabLists" :class="model.checkStatus==tabList.id?'active':''" :key="index"
              @click="model.checkStatus=tabList.id">{{tabList.name}}
          </li>
        </ul>
      </div>
      <div class="table_layout">
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            max-height="450"
            border
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column
              type="index"
              label="序号"
              key="2"
              width="50">
            </el-table-column>
            <el-table-column
              label="盘点单号"
              min-width="190"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="'detail/'+scope.row.id" target="_blank">
                 {{scope.row.checkOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="盘点门店"
              min-width="180"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.checkOutStoreName}}
              </template>
            </el-table-column>
            <el-table-column
              label="盘点类型"
              min-width="100"
              key="5"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.checkTypeName}}
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100"
              key="6"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.checkStatusName}}
              </template>
            </el-table-column>
            <el-table-column
              label="盘点数量"
              min-width="100"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.checkTotalNum}}
              </template>
            </el-table-column>
            <el-table-column
              label="盘点金额"
              min-width="120"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.checkTotalPrice | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              label="申请人"
              min-width="110"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.createUserName}}
              </template>
            </el-table-column>
            <el-table-column
              label="申请时间"
              min-width="180"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.createTime}}
              </template>
            </el-table-column>
            <el-table-column
              label="调整／驳回人"
              min-width="150"
              key="11"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.auditUserName}}
              </template>
            </el-table-column>
            <el-table-column
              label="调整／驳回时间"
              min-width="180"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.auditTime}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
    <exportData :storesList="storesList" @hideExportMask="hideExportMask" v-if="exportShow"  :firstClassificationsList="firstClassificationsList" :dataList="dataList"></exportData>
  </div>
</template>

<script>
  import exportData from './exportData'
  export default {
    name:'inventory-management',
    components:{
      exportData
    },
    data(){
      return{
        model:{
          startTime:null,//时间开始
          endTime:null,//时间结束
          checkStatus:100,//盘点状态
          checkOutStoreId:null,//盘点门店
          createUserName:null,//申请人
          checkOrderNo:null,//盘点单号
          pageNo:1,
          pageSize:20
        },
        exportShow:false,
        storesList:[],
        tabLists: [
          {name: '全部', id:''},
          {name: '待调整', id: 100},
          {name: '已完成', id: 200},
          {name: '已驳回', id: 300},
        ],
        dataList:[],//列表数据
        status:false,//已审批选择
        checkList:[],//选中列表
        // buttonInfo:{},//按钮权限
        waveList:[],//盘点仓库
        // 初始化全选按钮, 默认不选
        isCheckedAll: false,
        dateTypesList:[
          {
            id:0,
            name:"创建日期",
          },
          {
            id:1,
            name:"期望到货日",
          }
        ],
        multipleSelection:[],
        firstClassificationsList:[],//一级分类
      }
    },
    mounted(){
      this.fetchData();
      this.getStore();
      this.getFirstClassifications(0);
      /*if(JSON.parse(localStorage.getItem("buttonInfo"))!=null){
        this.buttonInfo=JSON.parse(localStorage.getItem("buttonInfo"));
      }*/
      // //////console.log(this.buttonInfo);
      // this.buttonInfo=this.AppUtils.returnPermissions(86);
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(86);
      },
    },
    watch:{
      'model.checkStatus'() {
        this.fetchData();
      },
    },
    methods:{
      searchData(){
        if(this.model.checkStatus){
          this.model.checkStatus='';
        }else{
          this.fetchData();
        }
      },
      getFirstClassifications(id){
        this.$store.dispatch('fetchCategories', id).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            let value = data.value;
            if (value.length) {
              this.firstClassificationsList = data.value;
            }
          }
        })
      },
      showExportMask(){
        this.exportShow=true;
      },
      hideExportMask(){
        this.exportShow=false;
      },
      initStartTime(date){
        this.model.startTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.formatDate(date);
      },
      /*handleSelectionChange(val) {
        //////console.log(val);
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
        this.$axios.post('/admin/stock/stockCheckOrderInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          //////console.log(data);
          if(data) {
            this.dataList=data.value.data;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      //获取搜索-门店
      getStore(){
        this.$store.dispatch('fetchStoreListNew').then(res=>{
          //////console.log(res);
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //////console.log(data);
            this.storesList=data.value;
            this.storesList.unshift({storeId:null,storeName:'全部'});
          }
        });
      },
      //新增采购申请
      toAdd(){
        localStorage.removeItem('cloneId')
        this.$router.push('./add');
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
