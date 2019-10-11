<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                出库日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model.trim="model.outputStartTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  @change="initStartTime"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model.trim="model.outputEndTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  @change="initEndTime"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">出库门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" clearable filterable>
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
                <input type="text" placeholder="请输入出库单号" v-model.trim="model.outputOrderNo" style="width: 118px;">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入出库人" v-model.trim="model.outputUserName">
              </div>
            </div>
            <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="model.minus">
                    <span></span>负数出库
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group btn-box reset">
              <button type="submit" class="btn search">搜索</button>
              <button type="button" class="btn search ml20" @click="toAdd" v-if="buttonInfo.outputOk">{{buttonInfo.outputOk}}</button>
              <button type="button" class="btn search ml20" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <!--<div class="total">
          <span class="lColor">合计数量:<span class="rColor">{{sumTotalNum?sumTotalNum:0}}</span></span>
          <span class="lColor">成本总价:<span class="rColor">{{sumTotalCost?sumTotalCost:0 | decimalTofixed4}}</span></span>
        </div>-->
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            max-height="480"
            show-summary
            :summary-method="getSummaries"
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
              label="出库单号"
              min-width="170"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="'detail/'+scope.row.id" target="_blank" v-if="buttonInfo.detail">
                  {{scope.row.orderNo}}
                </router-link>
                <span v-else>{{scope.row.orderNo}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="出库门店"
              min-width="180"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="useNum"
              label="出库数量"
              min-width="80"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="costTotal"
              label="成本总价(不含税)"
              min-width="115"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="outputUser"
              label="出库人"
              min-width="90"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              min-width="170"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                  {{scope.row.createdTime | dateFormatToSecond}}
              </template>
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="170"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.createdTime | dateFormatToSecond}}
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
    name:'inner-out',
    data(){
      return{
        model:{
          outputStartTime:null,//搜索开始时间（格式：2019-03-1）
          outputEndTime:null,//搜索结束时间（格式：2019-03-1）
          storeId:null,//搜索门店id
          outputUserName:null,//出库人
          minus:null,//是否负数（true是，不传或其他为否）
          outputOrderNo:null,//内领单号
          pageNo:1,
          pageSize:20
        },
        dataList:[],//列表数据
        sumTotalCost:null,//成本总价
        sumTotalNum:null,//合计数量
        storesList:[],
        // buttonInfo:{},//按钮权限
      }
    },
    methods:{
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
          }else if(index === 3){
            sums[index]=this.sumTotalNum;
            return
          }else if(index === 4){
            sums[index]=Number(this.sumTotalCost).toFixed(4);
            return
          }
        });

        return sums;
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        var obj=JSON.parse(JSON.stringify(this.model));
        delete obj['pageNo'];
        delete obj['pageSize'];
        this.$axios.post('/admin/stock/insideUseOutputInfo/export',obj,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '内领出库单'+time+'.xls';
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
      getStoreList(){
        this.$store.dispatch('fetchStores').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.storesList=data.value;
            this.storesList.unshift({storeId:null,storeName:'全部'});
          }
        })
      },
      toAdd(){
        this.$router.push('add');
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      initStartTime(date){
        this.model.outputStartTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.outputEndTime=this.AppUtils.formatDate(date);
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
        this.$axios.post('/admin/stock/insideUseOutputInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList=data.value.data.listInfo;
            this.sumTotalCost=data.value.data.sumTotalCost;
            this.sumTotalNum=data.value.data.sumTotalNum;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.listInfo.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(59);
      },
    },
    mounted(){
      this.fetchData();
      this.getStoreList();//获取出库门店
      // this.buttonInfo=this.AppUtils.returnPermissions(59);
    },
  }
</script>

<style lang="scss" scoped>
  .table_wrap{
    position: relative;
    box-sizing: border-box;
    /*padding-top:50px;*/
  }
  .total{
    color: $color;
    display: flex;
    justify-content: left;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 14px;
    background: #fff;
    /*margin-top: 10px;*/
    line-height: 40px;
    height: 40px;
    position: absolute;
    right: 12px;
    top: 20px;
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
            width: 110px;
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
