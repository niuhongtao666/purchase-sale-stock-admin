<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left ml0"></span>
              <div class="right">
                <input type="text" placeholder="请输入工单号" v-model.trim="model.order">
              </div>
            </div>
            <div class="group">
              <span class="left">工单类型</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.order_type" clearable filterable>
                  <el-option
                    v-for="item in order_types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">状态</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.status" clearable filterable>
                  <el-option
                    v-for="item in statuses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">进程状态</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.processing_status" clearable filterable>
                  <el-option
                    v-for="item in processing_statuses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
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
              width="50"
              key="1"
            >
            </el-table-column>
            <el-table-column
              label="工单号"
              min-width="180"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="{path:'detail/order/'+scope.row.order_sn+'/orderId/'+scope.row.id}" target="_blank">
                  {{scope.row.order_sn}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="门店名称"
              min-width="220"
              prop="store_name"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="工单类型（字典）"
              min-width="135"
              prop="order_type"
              show-overflow-tooltip
              key="4"
            >
            </el-table-column>
            <el-table-column
              label="工单状态（字典）"
              min-width="135"
              prop="status"
              show-overflow-tooltip
              key="5"
            >
            </el-table-column>
            <el-table-column
              label="客户姓名"
              min-width="100"
              prop="customer_name"
              show-overflow-tooltip
              key="6"
            >
            </el-table-column>
            <el-table-column
              label="客户手机号"
              min-width="120"
              prop="customer_mobile"
              show-overflow-tooltip
              key="7"
            >
            </el-table-column>
            <el-table-column
              label="送修人电话"
              min-width="120"
              prop="repair_mobile"
              key="8"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="车牌号"
              min-width="100"
              prop="car_num"
              show-overflow-tooltip
              key="9"
            >
            </el-table-column>
            <el-table-column
              label="车辆品牌名称"
              min-width="120"
              prop="car_brand_name"
              show-overflow-tooltip
              key="10"
            >
            </el-table-column>
            <el-table-column
              label="车系名称"
              min-width="130"
              prop="car_model_name"
              show-overflow-tooltip
              key="11"
            >
            </el-table-column>
            <el-table-column
              label="车辆年款名称"
              min-width="110"
              prop="car_year_name"
              show-overflow-tooltip
              key="12"
            >
            </el-table-column>
            <el-table-column
              label="车辆配置名称"
              min-width="180"
              prop="car_style_name"
              show-overflow-tooltip
              key="13"
            >
            </el-table-column>
            <el-table-column
              label="车辆VIN码"
              min-width="180"
              prop="car_vin"
              show-overflow-tooltip
              key="14"
            >
            </el-table-column>
            <el-table-column
              label="发动机号"
              min-width="180"
              prop="car_engine_num"
              show-overflow-tooltip
              key="15"
            >
            </el-table-column>
            <el-table-column
              label="sa姓名"
              min-width="70"
              prop="sa_user_name"
              show-overflow-tooltip
              key="16"
            >
            </el-table-column>
            <el-table-column
              label="配件实收"
              min-width="80"
              prop="actual_parts_fee"
              show-overflow-tooltip
              key="17"
            >
            </el-table-column>
            <el-table-column
              label="创建用户"
              min-width="80"
              prop="create_user"
              show-overflow-tooltip
              key="18"
            >
            </el-table-column>
            <el-table-column
              label="税率"
              min-width="60"
              prop="sale_tax"
              show-overflow-tooltip
              key="19"
            >
            </el-table-column>
            <el-table-column
              label="门店编号"
              min-width="80"
              prop="erp_id"
              show-overflow-tooltip
              key="20"
            >
            </el-table-column>
            <el-table-column
              label="处理状态"
              min-width="80"
              key="21"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.processing_status}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'order-manage',
    data(){
      return{
        dataList:[],//列表数据
        model:{
          order_type:null,//工单类型
          status:null,//状态
          processing_status:null,//进程状态
          order:null,//工单号
        },
        order_types:[
          {
            id:1,
            name:'一般维修'
          },
          {
            id:2,
            name:'事故维修'
          },
          {
            id:3,
            name:'首保'
          },
          {
            id:4,
            name:'二保'
          },
          {
            id:5,
            name:'定期保养'
          },
          {
            id:6,
            name:'厂家索赔'
          },
          {
            id:7,
            name:'售后精品'
          },
          {
            id:8,
            name:'洗车美容'
          },
        ],
        statuses:[
          {
            id:0,
            name:'创建未完成'
          },
          {
            id:1,
            name:'待转施工'
          },
          {
            id:2,
            name:'施工中'
          },
          {
            id:3,
            name:'已取消'
          },
          {
            id:4,
            name:'待发起收款'
          },
          {
            id:5,
            name:'待收款'
          },
          {
            id:6,
            name:'已收款'
          },
        ],
        processing_statuses:[
          {
            id:0,
            name:'未处理'
          },
          {
            id:1,
            name:'已处理'
          },
        ]
      }
    },
    mounted(){
      //列表初始化
      this.fetchData();
    },
    methods:{
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      fetchData(args){
        //初始化分页
        this.$axios.post('/admin/history/order/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList=data.value;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          /*if(data.value.data.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }*/
        })
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
