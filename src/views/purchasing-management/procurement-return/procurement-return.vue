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
                  value-format="timestamp"
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">退货门店</span>
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
              <span class="left">退货供应商</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.supplierId">
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
              <!--<span class="left">采购退货单号:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入采购退货单号" v-model.trim="model.purchaseReturnNo">
              </div>
            </div>
            <div class="group">
              <!--<span class="left">采购单号:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入采购单号" v-model.trim="model.purchaseOrderNo">
              </div>
            </div>
            <div class="group btn-box" >
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="returnGoods" v-if="buttonInfo.purcherReturnInput">{{buttonInfo.purcherReturnInput}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_nav">
        <ul>
          <li v-for="(tabList,index) in tabLists" :class="model.returnState==tabList.id?'active':''" :key="index"
              @click="model.returnState=tabList.id">{{tabList.name}}
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
            @selection-change="handleSelectionReturn"
          >
            <el-table-column
              type="selection"
              width="35"
              v-if="model.returnState==100"
            >
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              key="2"
              width="50">
            </el-table-column>
            <el-table-column
              label="采购退货单号"
              min-width="190"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" :to="'detail/'+scope.row.id" target="_blank">
                  {{scope.row.purchaseReturnNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="关联采购单"
              min-width="190"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" :to="'/purchasing-management/procurement-order/detail/'+scope.row.purchaseOrderId" target="_blank">
                  {{scope.row.purchaseOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="关联采购入库单"
              min-width="190"
              key="5"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" :to="'/inventory-management/purchase-warehousing/detail/'+scope.row.stockInputId" target="_blank">
                  {{scope.row.stockInputNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="退货门店"
              min-width="165"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="退货供应商"
              min-width="150"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="returnTotalNum"
              label="数量"
              min-width="60"
              key="8"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="退货金额(含税)"
              min-width="115"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.returnTotalPrice | decimalTofixed2}}
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100"
              v-if="model.returnState==''"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.returnState==100?'待退货':(scope.row.returnState==200?'已完成':(scope.row.returnState==300?'已取消':''))}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="120"
              key="11"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="170"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="退货完成时间"
              min-width="170"
              key="13"
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
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @confirmReturn="confirmReturn"></nt-reason>
  </div>
</template>

<script>
  export default {
    name:'procurement-return',
    data(){
      return{
        model:{
          startTime:'',//起始时间
          endTime:'',//终止时间
          storeId:null,//退货门店
          supplierId:'',//退货供应商id
          createUserName:'',//创建人
          purchaseReturnNo:'',//采购退货单号
          purchaseOrderNo:'',//采购单号
          returnState:100,
          pageNo:1,
          pageSize:20
        },
        reasonId:11,
        reasonShow:false,
        tabLists: [
          {name: '全部', id:''},
          {name: '待退货', id: 100},
          {name: '已完成', id: 200},
          {name: '已取消', id:300},
        ],
        dataList:[],//列表数据
        storesList:[
          {storeId:null,storeName:'全部'}
        ],//采购门店列表
        suppliersList:[],//退货供应商列表
        checkReturnList:[],//确认退货列表
        // buttonInfo:{},//权限按钮
      }
    },
    watch:{
      'model.returnState'() {
        this.fetchData();
      },
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(7);
      },
      maxLength(){
        if(this.model.returnState!=100){
          return 450;
        }else{
          return 460;
        }
      }
    },
    mounted(){
      //搜索-采购门店
      // this.getStore();
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
      // this.buttonInfo=this.AppUtils.returnPermissions(7);
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
      hideReason(){
        this.reasonShow=false;
      },
      searchData(){
        if(this.model.returnState){
          this.model.returnState='';
        }else{
          this.fetchData();
        }
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.initEndTime(date);
      },
      //确认退货
      confirmReturn(){
        this.$axios.post('/admin/stock/inputInfo/confirmReturnGoods',{purchaseReturnInfoIds:this.checkReturnList}).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            this.$message.success('确认退货成功');
            this.fetchData();
          }
        })
      },
      returnGoods(){
        if(this.checkReturnList.length){
          this.$axios.post('/admin/stock/inputInfo/checkReturnGoods',{purchaseReturnInfoIds:this.checkReturnList}).then(res=>{
            if(res.data.code==90001){
              this.AppUtils
                .confirm(res.data.value+'是否确认退货？',
                  () => {
                    this.confirmReturn();
                  },()=>{

                  })
            }else{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                ////console.log(data);
                this.reasonShow=true;
              }
            }
          })
        }else{
          this.AppUtils.alert('请先勾选采购退货单')
        }
      },
      handleSelectionReturn(val){
        ////console.log(val)
        this.checkReturnList=[];
        var _this=this;
        if(val.length){
          val.forEach((val,index)=>{
            _this.checkReturnList[index]=val['id'];
          });
          ////console.log(_this.checkReturnList);
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
        this.$axios.post('/admin/purchase/purchaseReturnInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
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
