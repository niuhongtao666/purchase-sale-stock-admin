<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="searchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                <el-select v-model.trim="model.timeType" class="el_box" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in dateTypesList"
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
                  value-format="timestamp"
                  placeholder="起始时间"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model.trim="model.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="timestamp"
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">申请门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" clearable filterable @visible-change="getStoreList">
                  <el-option
                    v-for="item in storesList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml0">
              <!--<span class="left">创建人:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入创建人" v-model.trim="model.createUserName">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <!--<span class="left">申请单号:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入申请单号" v-model.trim="model.purchaseApplyNo">
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="toAdd" v-if="buttonInfo.add">{{buttonInfo.add}}</button>
              <!--<button type="button" class="btn" @click="convertPurOrder">转采购</button>-->
              <button type="button" class="btn" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_nav">
        <ul>
          <li v-for="(tabList,index) in tabLists" :class="model.applyState==tabList.id?'active':''" :key="index"
              @click="model.applyState=tabList.id">{{tabList.name}}
          </li>
        </ul>
      </div>
      <div class="table_layout">
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            border
            :max-height="maxLength"
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column
              label="操作"
              width="50"
              key="1"
              v-if="buttonInfo.add"
            >
              <template slot-scope="scope">
                <span class="cursor" @click="toClone(scope.row.id)">克隆</span>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              key="2"
              width="50">
            </el-table-column>
            <el-table-column
              label="申请单号"
              min-width="180"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="cursor" @click="toDetail(scope.row.id)">
                  {{scope.row.purchaseApplyNo}}
                </span>
                <!--<router-link class="primary" :to="'detail/'+scope.row.id" target="_blank">-->
                <!--</router-link>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="totalNum"
              label="请购数量"
              min-width="80"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="请购总价(含税)"
              min-width="115"
              key="5"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderTotalPrice | decimalTofixed2 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="申请门店"
              min-width="135"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="80"
              v-if="model.applyState==''"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.applyState==100?'待申请':(scope.row.applyState==200?'待审批':(scope.row.applyState==300?'待转采购':(scope.row.applyState==400?'待采购入库':(scope.row.applyState==500?'已取消':(scope.row.applyState==800?'已采购入库':(scope.row.applyState==700?'已驳回':''))))))}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="期望到货日"
              min-width="95"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.expectedArrivalTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="80"
              key="9"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="160"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateUserName"
              label="修改人"
              min-width="80"
              key="11"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="修改时间"
              min-width="160"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.updateTime | dateFormatToSecond }}</span>
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
    name:'procurement-application',
    data(){
      return{
        model:{
          timeType:0,//查询时间类型
          startTime:null,//起始时间
          endTime:null,//终止时间
          storeId:null,//申请门店
          createUserName:null,//申请人名称
          applyState:100,//采购申请状态
          purchaseApplyNo:null,//申请单号
          pageNo:1,
          pageSize:20
        },
        storesList:[
          {storeId:null,storeName:'全部'}
        ],
        tabLists: [
          {name: '全部', id:''},
          {name: '待申请', id: 100},
          {name: '待审批', id: 200},
          {name: '待转采购', id:300},
          {name: '待采购入库', id: 400},
          {name: '已采购入库', id: 800},
          {name: '已取消', id: 500},
          {name: '已驳回', id: 700},
        ],
        dataList:[],//列表数据
        status:false,//已审批选择
        checkList:[],//选中列表
        // buttonInfo:{},//按钮权限
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
        return this.AppUtils.returnPermissions(5);
      },
      maxLength(){
        if(this.model.applyState){
          return 440;
        }else{
          return 450;
        }
      },
    },
    mounted(){
      localStorage.removeItem('supplier');
     /* var stores=JSON.parse(sessionStorage.getItem('storesList'));
      if(stores.length){
        stores.unshift({storeId:null,storeName:'全部'})
        this.storesList=stores;
      }else{
        this.storesList=this.$store.state.storesList;
      }*/
      this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(5);
    },
    watch:{
      'model.applyState'() {
        this.fetchData();
      },
    },
    methods:{
      getStoreList(arg){
        if(arg){
          this.$store.dispatch("fetchStoreList").then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data.value.length){
              this.storesList=data.value;
              this.storesList.unshift({storeId:null,storeName:'全部'})
            };
          });
        }
      },
      toDetail(arg){
        let routeData = this.$router.resolve({path:'/purchasing-management/procurement-application/detail/'+arg});
        //////console.log(routeData)
        window.open(routeData.href,'_blank');
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.initEndTime(date);
      },
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      //选中所有
      checkedAll () {
        //////console.log(this.checkList.length);
        //////console.log(this.dataList);
        this.status=true;
        if(this.checkList.length===this.dataList.length){
          this.isCheckedAll=true;
        }
        this.isCheckedAll = !this.isCheckedAll
        //////console.log(this.isCheckedAll);
        if (this.isCheckedAll || this.checkList.length!==this.dataList.length) {
          this.checkList=[]
          //////console.log('选中');
          this.dataList.forEach(function (val) {
            this.checkList.push(val.id);
          }, this)
        } else {
          this.checkList=[];
        };
      },
      checkedOne (id) {
        //////console.log(this.checkList);
        let idIndex = this.checkList.indexOf(id)
        if (idIndex >= 0) {
          this.checkList.splice(idIndex, 1)
        } else {
          this.checkList.push(id);
          this.status=true;
          //////console.log(this.checkList);
          //////console.log(this.status);
          //////console.log(this.dataList);
        }
      },
      searchData(){
        if(this.model.applyState){
          this.model.applyState='';
        }else{
          this.fetchData();
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
        this.$axios.post('/admin/purchase/purchaseApply/list',this.model).then(res=>{
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
      //新增采购申请
      toAdd(){
        localStorage.removeItem('cloneId')
        this.$router.push('/purchasing-management/procurement-application/add');
      },
      //克隆
      toClone(arg){
        //////console.log(arg);
        if(arg){
          localStorage.setItem("cloneId",arg);
          // this.$store.commit("CLONEID",arg);
          // this.$router.push('add');
          let routeData = this.$router.resolve({path:'/purchasing-management/procurement-application/add'});
          window.open(routeData.href, '_blank');
        }
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        this.$axios.post('/admin/purchase/purchaseApply/export', this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '采购申请单'+time+'.xls';
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
        width: 91px;
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
</style>
