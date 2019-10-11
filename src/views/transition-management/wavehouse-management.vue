<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                移库日期
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
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">移库门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.moveStoreId" clearable filterable>
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
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入移库人" v-model.trim="model.createUserName">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入移库单号" v-model.trim="model.moveOrderNo">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入移库出库单号" v-model.trim="model.moveOrderOutputNo">
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入移库入库单号" v-model.trim="model.moveOrderInputNo">
              </div>
            </div>
            <div class="group btn-box ml10">
              <button type="submit" class="btn search">搜索</button>
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
            max-height="450"
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
              label="移库单号"
              min-width="180"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                  {{scope.row.moveOrderNo}}
              </template>
            </el-table-column>
            <el-table-column
              prop="moveStoreName"
              label="移库门店"
              min-width="180"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品编号"
              min-width="180"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              min-width="180"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveNum"
              label="移库数量"
              min-width="80"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveOrderOutputNo"
              label="移库出库单号"
              min-width="180"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveWavehouseName"
              label="移库前仓库"
              min-width="180"
              key="8"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveOutLocationName"
              label="移库前库位"
              min-width="180"
              key="9"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveOrderInputNo"
              label="移库入库单号"
              min-width="180"
              key="10"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveInputWavehouseName"
              label="移库后仓库"
              min-width="180"
              key="11"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="moveInputLocationName"
              label="移库后库位"
              min-width="180"
              key="12"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="移库人"
              min-width="90"
              key="13"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="移库时间"
              min-width="170"
              key="14"
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
    name:'warehouse-management',
    data(){
      return{
        model:{
          startTime:null,//	时间开始
          endTime:null,//	时间结束
          moveStoreId:null,//移库门店
          createUserName:null,//	移库人
          moveOrderNo:null,//移库编号
          moveOrderOutputNo:null,//	移库出库编号
          moveOrderInputNo:null,//移库入库编号
          pageSize:20,//页数
          pageNo:1,//页码
        },
        dataList:[],//列表数据
        storesList:[],//入库门店
      }
    },
    mounted(){
      this.fetchData();//列表初始化
      this.allotInputStores();//获取入库门店
    },
    methods:{
      initStartTime(date){
        this.model.startTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.formatDate(date);
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
        this.$axios.post('/admin/stock/stockMoveOrderInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList=JSON.parse(JSON.stringify(data.value.data));
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(this.dataList.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      //获取入库门店
      allotInputStores(){
        this.$store.dispatch('fetchStores').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.storesList=data.value;
            this.storesList.unshift({'storeId':null,'storeName':'全部'});
          };
        })
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .total{
    height: 30px;
    color: $color;
    display: flex;
    justify-content: left;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 15px;
    span+span{
      margin-left: 20px;
    }
  }
  .select-wrap{
    padding-left: 10px;
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
        margin-left: 8px;
        .search{
          margin-left: -9px;
        }
        .right{
          input{
            width: 150px;
          }
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
  .centerZone{
    height: 40px;
    line-height: 40px;
    background: #fff;
    margin-top: 10px;
    box-sizing: border-box;
    padding-left: 10px;
  }
</style>
