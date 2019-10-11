<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap" style="padding-left: 2px!important;">
          <div class="group">
            <div class="group">
              <span class="left">
                创建日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model="model.createStartTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  value-format="timestamp"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model="model.createEndTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  value-format="timestamp"
                  @change="initEndTime($event,'createEndTime')"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>

            <div class="group">
              <div class="right">
                <!--<input type="text" placeholder="全部门店">-->
                <el-select placeholder="全部门店" class="el_box" clearable filterable v-model="model.storeId">
                  <el-option
                    v-for="item in storeList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <div class="right">
                <input type="text" placeholder="业务单号" v-model.trim="model.dataSourceNo">
              </div>
            </div>

            <div class="group">
              <div class="right">
                <input type="text" placeholder="客户姓名" v-model.trim="model.saleCustName">
              </div>
            </div>
            <div class="group">
              <div class="right">
                <input type="text" placeholder="车牌号码" v-model.trim="model.carNumber">
              </div>
            </div>
            <div class="group">
              <div class="right">
                <input type="text" placeholder="VIN码" v-model.trim="model.vinCode">
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap" style="padding-left: 2px!important;">
          <div class="group">
            <div class="group">
              <span class="left ml10">
                发料日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model="model.deliverStartTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  value-format="timestamp"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model="model.deliverEndTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  value-format="timestamp"
                  @change="initEndTime($event,'deliverEndTime')"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
              <div class="group">
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model="model.billType">
                  <el-option
                    v-for="item in billTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <div class="right">
                <input type="text" placeholder="发料单号" v-model.trim="model.deliverOrderNo">
              </div>
            </div>
            <div class="group">
              <div class="right">
                <input type="text" placeholder="业务人员" v-model.trim="model.saleUserName">
              </div>
            </div>
            <div class="group">
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model="model.orderState">
                  <el-option
                    v-for="item in tabLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml10">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="model.waitDeliverNum">
                    <span></span>待发料>0
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="model.dataSourceType">
                    <span></span>负数发料
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group btn-box" style="margin-left: -11px!important;">
              <button type="submit" class="btn">搜索</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">

      <!--<div class="table_nav">-->
      <!--<ul>-->

      <!--<li v-for="(tabList,index) in tabLists" :class="model.returnState==tabList.id?'active':''" :key="index"-->
      <!--@click="model.returnState=tabList.id">{{tabList.name}}-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="centerZone">
        <span class="toDetail mr10 floatLeft lColor">发料配件数:<span class="rColor">{{totalGoodsNum || 0}}</span></span>
        <span class="toDetail mr10 floatLeft lColor">已发料:<span class="rColor">{{totalDoneDeliverNum || 0}}</span></span>
        <span class="toDetail floatLeft lColor">待发料:<span class="rColor">{{totalWaitDeliverNum || 0}}</span></span>
      </div>-->
      <div class="table_layout">
        <div>
          <el-table
            :data="dataList"
            max-height="490"
            border
            show-summary
            :summary-method="getSummaries"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="发料单号"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">

                <span v-if="scope.row.businessType===2">
                   <router-link v-if="scope.row.dataSourceType===200" target="_blank" class="primary"
                                :to="'/material-management/list/work-material-detail/'+scope.row.id">
                  {{scope.row.deliverOrderNo}}
                </router-link>
                <router-link v-else target="_blank" class="primary" :to="'/material-management/list/work-material-refund-detail/'+scope.row.id">
                  {{scope.row.deliverOrderNo}}
                </router-link>
                </span>
                <span v-else-if="scope.row.businessType===1">
                    <router-link  class="primary" target="_blank" :to="'/material-management/list/sales-material-detail/'+scope.row.id">
                  {{scope.row.deliverOrderNo}}
                </router-link>
                </span>

              </template>
            </el-table-column>
            <el-table-column
              label="业务类型"
              min-width="80"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.billType | billState }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="saleUserName"
              label="业务人员"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="carNumber"
              label="车牌号码"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="vinCode"
              label="VIN码"
              min-width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              v-if="showState===null"
              label="状态"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderState | materialOrderState }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsNum"
              label="配件数"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="doneDeliverNum"
              label="已发料"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="waitDeliverNum"
              label="待发料"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="saleCustName"
              label="客户名称"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="发料完成时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.deliverFinishTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="业务单号"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">

                <span v-if="scope.row.businessType===1">
                   <router-link class="primary" v-if="scope.row.dataSourceType===100" target="_blank"  :to="'/sales-management/sales-orders/detail/'+scope.row.dataSourceId">
                  {{scope.row.dataSourceNo}}
                </router-link>
                    <router-link class="primary" v-else-if="scope.row.dataSourceType===110" target="_blank"  :to="'/sales-management/sales-returns/detail/'+scope.row.dataSourceId">
                  {{scope.row.dataSourceNo}}
                </router-link>
                </span>
                <span v-else-if="scope.row.businessType===2">
                   <a class="primary" target="_blank"  :href="ydnUrl+'/main.html#/workOrder/detail/'+scope.row.dataSourceId">
                  {{scope.row.dataSourceNo}}
                </a>
                </span>

              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="门店"
              min-width="200"
              show-overflow-tooltip
            >

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
    name: 'material-management',
    data() {
      return {
        ydnUrl:'',
        sumShow:false,//处理合计位置
        tabLists: [{id: 0, name: '待发料'}, {id: 200, name: '已发料'}, {id: 300, name: '已取消'}, {id: null, name: '全部'}],
        model: {
          createStartTime: null,//	 	创建开始时间
          createEndTime: null,//		创建结束时间
          dataSourceNo: null,//	业务单号
          storeId: null,//	门店
          saleCustName: null,//		客户名称
          carNumber: null,//		车牌号
          vinCode: null,//		vin码
          deliverStartTime: null,//		发料完成开始时间
          deliverEndTime: null,//		发料完成结束时间
          billType: null,//		业务类型
          saleUserName:null,//业务人员
          deliverOrderNo: null,//		发料单号
          orderState:null,//	发料状态 0=待发料， 200=已发料，300=已取消
          dataSourceType: false,//		数据来源类型 100=销售出库（正），110=销售退货（负） 200=雅典娜（正） 210=雅典娜（负）负数发料时为 false 不勾选时为null
          waitDeliverNum: true,//		待发料数>0
          pageSize: 1,//每页显示个数
          pageNo: 20,//页码
        },
        storeList:[],
        showState: false,
        totalGoodsNum: null,//配件数量
        totalDoneDeliverNum: null,//已发料总数
        totalWaitDeliverNum: null,//待发料总数
        dataList: [],//列表数据
        billTypeList: [//业务类型
          {id: null, name: "全部业务"},
          {id: 1, name: "一般维修",},
          {id: 2, name: "事故维修",},
          {id: 3, name: "首保",},
          {id: 4, name: "二保",},
          {id: 5, name: "定期保养",},
          {id: 6, name: "厂家索赔",},
          {id: 7, name: "售后精品",},
          {id: 8, name: "洗车美容",},
          {id: 9, name: "配件外销",},
          {id: 10, name: "内部领用",},
        ]
      }
    },
    mounted() {
      // alert(this.CODE_SERVER)
      if(this.CODE_SERVER==='http://jxc.n-cars.com.cn'){
        // this.ydnUrl='http://ydn.n-cars.com.cn';
        this.ydnUrl='http://athena.n-cars.com.cn/admin';
      }else if(this.CODE_SERVER==='http://jxcadmin.n-cars.com.cn'){
        this.ydnUrl='http://ydntest.n-cars.com.cn';
      }else{
        this.ydnUrl='http://yadianna.n-cars.com.cn/admin';
      }
      // this.ydnUrl=this.YDN_URL;
      this.fetchData();
      this.fetchStoreList();
      this.fetchBillTypeList();
    },
    methods: {
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if(_this.sumShow){
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 7){
              sums[index]=this.totalGoodsNum;
              return
            }else if(index === 8){
              sums[index]=this.totalDoneDeliverNum;
              return
            }else if(index === 9){
              sums[index]=this.totalWaitDeliverNum;
              return
            }
          }else{
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              sums[index]=this.totalGoodsNum;
              return
            }else if(index === 7){
              sums[index]=this.totalDoneDeliverNum;
              return
            }else if(index === 8){
              sums[index]=this.totalWaitDeliverNum;
              return
            }
          }
        });

        return sums;
      },
      fetchData(args) {
        this.model.pageNo = 1;
        this.model.pageSize = 20;
        if(this.model.orderState==null){
          this.sumShow=true;
        }else{
          this.sumShow=false;
        }
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }
        this.showState = this.model.orderState;
        this.$axios.post('/admin/stock/orderDeliverInfo/list', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.dataList = data.value.data;
            this.totalGoodsNum = data.value.data1.totalGoodsNum;
            this.totalDoneDeliverNum = data.value.data1.totalDoneDeliverNum;
            this.totalWaitDeliverNum = data.value.data1.totalWaitDeliverNum;
            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      fetchStoreList() {
        this.$store.dispatch('fetchStoreList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.storeList = data.value;
          }
        })
      },
      fetchBillTypeList(){
        this.$axios.get('/admin/stock/outPutInfo/billType').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.billTypeList = data.value;
            this.billTypeList.unshift({id: null, name: "全部业务"})
          }
        })
      },
      initEndTime(date,name){
         this.model[name]=this.AppUtils.initEndTime(date);
      },

    }
  }
</script>

<style lang="scss" scoped>
  .select-wrap {
    padding-left: 20px;
    .btn {
      margin-left: 12px;
    }
    .date-box {
      width: 346px;
    }
    & > .group {
      margin-right: 50px;
      span.left {
        width: auto;
      }
      .el_box {
        width: 109px;
      }
      .group {
        margin-left: 5px;
      }
    }
    .area {
      margin-left: 10px;
    }
  }

  .el-date-editor {
    width: 135px !important;
  }
  .table_wrap{
    position: relative;
    box-sizing: border-box;
    /*padding-top:50px;*/
  }
  .centerZone {
    height: 40px;
    line-height: 40px;
    background: #fff;
    /*margin-top: 10px;*/
    box-sizing: border-box;
    padding-left: 10px;
    position: absolute;
    right: 12px;
    top: 20px;
  }
</style>
