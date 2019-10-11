<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="submit">
        <div class="select-wrap">
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
                  value-format="timestamp"
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

          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <span class="left"></span>
            <div class="right">
              <input type="text" placeholder="请输入客户名称" v-model.trim="model.saleCustName">
            </div>
          </div>
          <div class="group">
            <span class="left"></span>
            <div class="right">
              <input type="text" placeholder="请输入销售员" v-model.trim="model.createUserName">
            </div>
          </div>
          <div class="group">
             <span class="left"></span>
               <div class="right">
                 <input type="text" placeholder="请输入售后单号" v-model.trim="model.saleReturnNo">
               </div>
           </div>
           <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入销售单号" v-model.trim="model.saleOrderNo">
              </div>
            </div>
          <div class="group btn-box">
            <button type="submit" class="btn">搜索</button>
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
      <!--<div class="centerZone">
          <span class="toDetail mr10 floatLeft lColor">退货数量:<span class='rColor'>{{ListTotalNum || 0}}</span></span>
          <span class="toDetail floatLeft lColor">退货金额:<span class='rColor'>{{ListTotalPrice || 0}}</span></span>
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
              label="售后单号"
              min-width="200"
              show-overflow-tooltip
              >
              <template slot-scope="scope">
                <router-link class="primary" target="_blank" :to="'/sales-management/sales-returns/detail/'+scope.row.id">
                  {{scope.row.returnNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="关联销售单号"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" target="_blank" :to="'/sales-management/sales-orders/detail/'+scope.row.saleOrderId">
                  {{scope.row.saleOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="销售门店"
              min-width="200"
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
              prop="returnNum"
              label="退货数量"
              min-width="90">
            </el-table-column>
            <el-table-column
              prop="returnPrice"
              label="退款金额"
              min-width="90">
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建人"
              min-width="110">
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="完成时间"
              min-width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.returnTime | dateFormatToSecond }}</span>
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
    name: 'sales-returns',
    data() {
      return {
        tabLists: [{name: '全部', id: null}, {name: '待退货', id: 0}, {name: '待退款', id: 100}, {name: '已完成', id: 200}, {
          name: '已取消',
          id: 300
        }],
        model: {
          createStartTime: null,// 创建起始时间
          createEndTime: null,//创建截止时间
          storeId: null,//	销售门店id
          returnState: 0,//售后状态 0=待确认退货,100=待退款,200=已完成,300=已取消
          saleCustName: null,//客户名称
          createUserName: null,//销售人员名称
          saleOrderNo:null,//销售单号
          saleReturnNo:null,//售后单号
          state:[],
        },

        dataList: [],//列表数据
        ListTotalPrice: null,
        ListTotalNum: null,
        storeList: [

        ]
      }
    },
    watch: {
      'model.returnState'() {
        this.fetchData();
      }
    },

    mounted() {
      this.fetchData();
      this.fetchStoreList();
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
          }else if(index === 5){
            sums[index]=this.ListTotalNum;
            return
          }else if(index === 6){
            sums[index]=this.ListTotalPrice;
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

        this.$axios.post('/admin/sale/saleReturnInfo/list', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {

            this.dataList = data.value.data;
            this.ListTotalPrice = data.value.data1.ListTotalPrice;
            this.ListTotalNum = data.value.data1.ListTotalNum;

            // ListTotalPrice

            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      submit(){
        this.model.returnState=null;
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
      showMask(data) {
        if (data) {
          this.maskData = data;
        }
        this.$store.commit('SHOW_MASK_LAYER');
      },
      hideMask(data) {
        if (data) {
          if (data.id) {
            this.edit(data);
          } else {
            this.add(data);
          }
        }
        this.$store.commit('HIDE_MASK_LAYER');
      },
      add(data) {
        this.$axios.post('/admin/goods/goodsBaseInfo/add', data).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);


          }
        })
      },
      edit(data) {
        this.$axios.post('/admin/goods/goodsBaseInfo/update', data).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);


          }
        })
      },
      exportData() {
        if (!this.dataList.length) {
          return this.AppUtils.alert('暂无可导出数据');
        }
        // this.$axios.post('/rescue-master/bussiness/api/admin/bill/export', this.model,{responseType:'arraybuffer'}).then(res => {
        //   let fileName = '对账单列表.xls'
        //   let blob = new Blob([res.data], { type: 'application/x-xls' })
        //   if (window.navigator.msSaveOrOpenBlob) {
        //     navigator.msSaveBlob(blob, fileName);
        //   } else {
        //     let link = document.createElement('a');
        //     link.href = window.URL.createObjectURL(blob);
        //     link.download = fileName;
        //     link.click();
        //     window.URL.revokeObjectURL(link.href);
        //   }
        // })
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
      .el_box {
        width: 180px;
        .el-tag--info{
          display: flex;
          align-items: center;
        }
        &:last-child{
          width: 150px;
          .el-icon-close{
             margin-top: 0;
          }
        }
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
