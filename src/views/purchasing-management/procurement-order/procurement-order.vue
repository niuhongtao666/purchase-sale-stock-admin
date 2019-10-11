<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="searchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                创建日期
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
                  placeholder="终止时间"
                  @change="initEndTime"
                  value-format="timestamp"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">采购门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" filterable clearable @visible-change="getStoreList">
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
              <span class="left">供应商</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.supplierId" clearable filterable>
                  <el-option
                    v-for="item in suppliersList"
                    :key="item.id"
                    :label="item.supplierName"
                    :value="item.id">
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
              <!--<span class="left">创建人:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入创建人" v-model.trim="model.createUserName">
              </div>
            </div>
            <div class="group">
              <!--<span class="left">采购单号:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入采购单号" v-model.trim="model.orderNo">
              </div>
            </div>
            <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="model.isReturned">
                    <span></span>有退货
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group btn-box ml0">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="toAdd" v-if="buttonInfo.add">{{buttonInfo.add}}</button>
              <button type="submit" class="btn" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_nav">
        <ul>
          <li v-for="(tabList,index) in tabLists" :class="model.orderState==tabList.id?'active':''" :key="index"
              @click="model.orderState=tabList.id">{{tabList.name}}
          </li>
        </ul>
      </div>
      <div class="table_layout">
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            :max-height="maxLength"
            border
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
              label="采购单号"
              min-width="180"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" :to="'detail/'+scope.row.id" target="_blank">
                  {{scope.row.purchaseOrderNo}}
                </router-link>
                <!--<span class="cursor" @click="toDetail(scope.row.id)">-->
                <!--</span>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="采购门店"
              min-width="160"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              min-width="155"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderTotalNum"
              label="数量"
              min-width="60"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="采购金额(含税)"
              min-width="115"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.orderTotalPrice | decimalTofixed2}}
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="80"
              key="8"
              show-overflow-tooltip
              v-if="model.orderState==''"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderState==100?'待采购':(scope.row.orderState==200?'待收货':(scope.row.orderState==300?'已完成':(scope.row.orderState==400?'已取消':'')))}}</span>
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
              min-width="150"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="修改时间"
              min-width="150"
              key="11"
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
          startTime:'',//起始时间
          endTime:'',//终止时间
          storeId:null,//采购门店
          supplierId:'',//供应商id
          orderNo:'',//采购单号
          createUserName:'',//创建人
          isReturned:false,//是否退回
          orderState:100,//采购订单状态
          pageNo:1,
          pageSize:20
        },
        tabLists: [
          {name: '全部', id:''},
          {name: '待采购', id: 100},
          {name: '待收货', id: 200},
          {name: '已完成', id:300},
          {name: '已取消', id: 400},
        ],
        dataList:[],//列表数据
        storesList:[
          {storeId:null,storeName:'全部'}
        ],//采购门店列表
        suppliersList:[],//供应商列表
        // buttonInfo:{},//按钮权限
        suppliersList:[
          {
            id:'',
            name:"全部供应商",
          },
          {
            id:0,
            name:"供应商01",
          },
        ],
      }
    },
    watch:{
      'model.orderState'() {
        this.fetchData();
      },
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(6);
      },
      maxLength(){
        if(this.model.orderState){
          return 440;
        }else{
          return 450;
        }
      },
    },
    mounted(){
      //搜索-采购门店
      // this.getStore();
      localStorage.removeItem('supplier');
      /*var stores=JSON.parse(sessionStorage.getItem('storesList'));
      if(stores.length){
        stores.unshift({storeId:'',storeName:'全部'})
        this.storesList=stores;
      }else{
        this.storesList=this.$store.state.storesList;
      }*/
      //搜索-供应商
      this.getSupplier();
      //列表初始化
      this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(6);
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
      searchData(){
        if(this.model.orderState){
          this.model.orderState='';
        }else{
          this.fetchData();
        }
      },
      toDetail(arg){
        let routeData = this.$router.resolve({path:'/purchasing-management/procurement-order/detail/'+arg});
        //////console.log(routeData)
        window.open(routeData.href);
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.initEndTime(date);
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        this.$axios.post('/admin/purchase/purchaseOrder/export', this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '采购订单'+time+'.xls';
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
      //克隆
      toClone(arg){
        //////console.log(arg);
        localStorage.removeItem("toOrder");
        localStorage.removeItem("purApplyInfoId");
        if(arg){
          localStorage.setItem("cloneOrderId",arg);
          // this.$router.push('add');
          let routeData = this.$router.resolve({path:'/purchasing-management/procurement-order/add'});
          window.open(routeData.href, '_blank');
        }
      },
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
        this.$axios.post('/admin/purchase/purchaseOrder/list',this.model).then(res=>{
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
        localStorage.removeItem('cloneOrderId');
        localStorage.removeItem("toOrder");
        localStorage.removeItem("purApplyInfoId");
        // this.$router.push('./add');
        let routeData = this.$router.resolve({path:'/purchasing-management/procurement-order/add'});
        // //////console.log(routeData)
        window.open(routeData.href,'_blank');
      },
      //获取搜索-采购门店
      getStore(){
        this.$axios.get('admin/base/storeInfo/listStoreInfo').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            this.storesList=data.value;
            this.storesList.unshift({storeId:'',storeName:'全部'});
          }
        })
      },
      //获取供应商列表
      getSupplier(){
        this.$axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            this.suppliersList=data.value;
            this.suppliersList.unshift({id:'',supplierName:'全部'});
          }
        })
      }
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
        width: 109px;
      }
      .group{
        margin-left: 10px;
      }
      .btn-box{
        margin-left: 0px;
        .btn{
          margin-left: 12px;
        }
        .btn:first-child{
          margin-left: 0px;
        }
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
