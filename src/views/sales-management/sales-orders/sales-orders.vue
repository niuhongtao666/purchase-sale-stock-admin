<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="submit">
        <div class="select-wrap">
             <div class="group">
              <span class="left">
                创建日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model="model.createStartTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="timestamp"
                  placeholder="起始时间"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model="model.createEndTime"
                  value-format="timestamp"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">销售门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" clearable filterable v-model="model.storeId">
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
              <span class="left">全部状态</span>
              <div class="right">
                <el-select placeholder="请选择" multiple   collapse-tags class="el_box" v-model="model.state">
                  <el-option
                    v-for="item in tabLists"
                    v-if="item.id!==null"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ">
              <span class="left ml0"></span>
              <!--<span class="left">销售单号:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入销售单号" v-model.trim="model.saleOrderNo">
              </div>
            </div>
         </div>
        <div class="select-wrap">

          <div class="group">
            <!--<span class="left">客户名称:</span>-->
            <span class="left"></span>
            <div class="right">
              <input type="text" placeholder="请输入客户名称" v-model.trim="model.saleCustName">
            </div>
          </div>
          <div class="group">
            <!--<span class="left">客户电话:</span>-->
            <span class="left"></span>
            <div class="right">
              <input type="text" placeholder="请输入客户电话" v-model.trim="model.saleCustMobile">
            </div>
          </div>
          <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" value="1" v-model="isReceivaled">
                    <span></span>有售后
                </label>
              </span>
            <div class="right">
            </div>
          </div>


          <div class="group btn-box">
            <button type="submit" class="btn ml0">搜索</button>
            <button type="button" class="btn ml20" v-if="buttonInfo.add" @click="add">{{buttonInfo.add}}</button>
            <button type="button" class="btn ml20"  v-if="buttonInfo.export" @click="exportData">{{buttonInfo.export}}</button>
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
      <!--<div class="centerZone">
        <span class="toDetail mr10 floatLeft lColor">销售数量:<span class="rColor">{{totalNum || 0}}</span></span>
        <span class="toDetail mr10 floatLeft lColor">销售金额:<span class="rColor">{{totalPrice || 0}}</span></span>
        <span class="toDetail floatLeft lColor">应收金额:<span class="rColor">{{totalOrderReceivePrice || 0}}</span></span>
      </div>-->
      <div class="table_layout">
        <div>
          <el-table
            :data="dataList"
            max-height="490"
            show-summary
            :summary-method="getSummaries"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="销售单号"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" target="_blank" :to="'/sales-management/sales-orders/detail/'+scope.row.id">
                  {{scope.row.saleOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="saleCustName"
              label="客户名称"
              min-width="130"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="saleCustMobile"
              label="客户电话"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderTotalNum"
              label="销售数量"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderPrice"
              label="销售金额"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderReceivePrice"
              label="应收金额"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderState | saleOrderState }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="saleUserName"
              label="销售员"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="销售门店"
              min-width="200"
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
              label="完成时间"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.completeTime | dateFormatToSecond }}</span>
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
    name: 'sales-orders',
    data() {
      return {
        isReceivaled:false,
        tabLists: [{name: '全部', id: null}, {name: '待发起收款', id: 100}, {name: '待收款', id: 200}, {
          name: '待发货',
          id: 300
        }, {name: '已完成', id: 400}, {name: '已取消', id: 500}],
        storeList:[],
        model: {
          createStartTime: null,//	开始时间
          createEndTime: null,//		结束时间
          saleOrderNo: null,//	销售单编号
          saleCustName: null,//客户姓名
          saleCustMobile: null,//	客户电话
          isReceivaled: 0,//	是否有退款 0是 1否
          storeId: null,//
          state:[],
          orderState: 100,//	订单状态  100=待发起付款,200=待收款,300=待发货,400=已完成,500=已取消
          pageSize: 20,	//每页显示条数
          pageNo: 1,//页码

        },
        dataList: [],//列表数据
        totalNum:null,
        totalPrice:null,
        totalOrderReceivePrice:null,


      }
    },
    watch: {
      'model.orderState'() {
        this.fetchData();
      }
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(13);
      },

    },
    mounted() {
      this.fetchData()
      this.fetchStoreList()
    },
    methods: {
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
          }else if(index === 4){
            sums[index]=this.totalNum;
            return
          }else if(index === 5){
            sums[index]=this.totalPrice;
            return
          }else if(index === 6){
            sums[index]=this.totalOrderReceivePrice;
            return
          }
        });

        return sums;
      },
      fetchData(args) {
        this.model.pageNo = 1;
        this.model.pageSize = 20;
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }
        this.isReceivaled?this.model.isReceivaled=0:this.model.isReceivaled=1;
        this.$axios.post('/admin/sale/saleOrderInfo/list', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.dataList = data.value.data;
            this.totalNum = data.value.data1.totalNum;
            this.totalPrice = data.value.data1.totalPrice;
            this.totalOrderReceivePrice = data.value.data1.totalOrderReceivePrice;
            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      submit(){
        this.model.orderState=null;
        this.fetchData();
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
      initEndTime(date){
        this.model.createEndTime=this.AppUtils.initEndTime(date);
      },
      add() {
          this.$router.push('/sales-management/sales-orders/add');
      },

      exportData() {
        if (!this.dataList.length) {
          return this.AppUtils.alert('暂无可导出数据');
        }

        this.$axios.post('/admin/sale/saleOrderInfo/export', this.model,{responseType:'arraybuffer'}).then(res => {
          let fileName = '销售单列表.xls'
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
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select-wrap {
    padding-left: 20px;
    .date-box {
      width: 346px;
    }
    & > .group {
      margin-right: 10px;
      span.left {
        width: auto;
      }

      .group {
        margin-left: 8px;
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
  }
  .centerZone {
    height: 40px;
    line-height: 40px;
    background: #fff;
    margin-top: 10px;
    box-sizing: border-box;
    padding-left: 10px;
    position: absolute;
    right: 12px;
    top: 20px;
  }
</style>
