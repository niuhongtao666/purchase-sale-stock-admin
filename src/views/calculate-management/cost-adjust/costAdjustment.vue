<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                调整日期
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
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入调整单号" v-model.trim="model.costAdjustmentNo">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入调整人" v-model.trim="model.adUserName">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入调整机构" v-model.trim="model.storeName">
              </div>
            </div>
            <div class="group btn-box ml10">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="toAdd">入库成本调整</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <div class="table_scroll">
          <el-table
            :data="dataList"
            max-height="440"
            border
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column
              type="index"
              label="序号"
              key="1"
              width="50">
            </el-table-column>
            <el-table-column
              label="调整单号"
              min-width="160"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="linkColor" :to="'/calculate-management/cost-adjust/detail/'+scope.row.id" target="_blank">
                  {{scope.row.costAdjustmentNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="调整类型"
              min-width="90"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.adjustmentType==1?'入库成本调整':''}}
              </template>
            </el-table-column>
            <el-table-column
              label="调整分类"
              min-width="80"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                  {{scope.row.adjustmentClass==1?'采购入库':(scope.row.adjustmentClass==2?'调拨入库':(scope.row.adjustmentClass==3?'盘盈入库':''))}}
              </template>
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              min-width="120"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="adjustmentTotalMoney"
              label="调整金额"
              min-width="80"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="adUserName"
              label="调整人"
              min-width="80"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="调整机构"
              min-width="120"
              key="8"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="调整日期"
              min-width="150"
              key="9"
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
    name:'costAdjust',
    data(){
      return{
        model:{
          startTime:null,//开始时间
          endTime:null,//结束时间
          costAdjustmentNo:null,//调整单号
          adUserName:null,//调整人
          storeName:null,//调整机构
          pageNo:1,
          pageSize:20
        },
        dataList:[],//列表
      }
    },
    methods:{
      toAdd(){
        this.$router.push('/calculate-management/cost-adjust/add');
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.initEndTime(date);
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
        this.$axios.post('/admin/stock/stockCostAdjustment/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          //console.log(data);
          if(data) {
            this.dataList=data.value.data;
            // this.dataList=data.value.data.listInfo;
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
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
    },
    computed:{
    },
    mounted(){
      this.fetchData();
    },
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
