<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                入库日期
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
              <span class="left">入库门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.checkInputStoreId" clearable filterable>
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
                <input type="text" placeholder="请输入入库人" v-model.trim="model.inputUserName">
              </div>
            </div>
            <div class="group ml0">
              <div class="group">
                <span class="left"></span>
                <div class="right">
                  <input type="text" placeholder="请输入入库单号" v-model.trim="model.checkInputOrderNo" style="width: 121px">
                </div>
              </div>
              <div class="group btn-box">
                <button type="submit" class="btn search ml20">搜索</button>
                <button type="button" class="btn search ml20" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <!--<div class="total">
          <span class="lColor">合计数量：<span class="rColor">{{data.sumTotalNum}}</span></span>
          <span class="lColor">成本总价：<span class="rColor">{{data.sumTotalCost}}</span></span>
        </div>-->
        <div class="table_scroll ">
          <el-table
            :data="data.listInfo"
            max-height="480"
            border
            show-summary
            :summary-method="getSummaries"
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
              label="入库单号"
              min-width="200"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="'detail/'+scope.row.id" target="_blank">
                  {{scope.row.checkInputOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="checkTypeName"
              label="入库类型"
              min-width="60"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="checkInputStoreName"
              label="入库门店"
              min-width="180"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="checkInputTotalNum"
              label="数量"
              min-width="50"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="inputTotalPrice"
              label="成本总价(不含税)"
              min-width="100"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="inputUserName"
              label="入库人"
              min-width="80"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="入库时间"
              min-width="170"
              key="8"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="data.listInfo.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'inventory-surplus',
    data(){
      return{
        model:{
          startTime:null,//时间开始
          endTime:null,//时间结束
          inputUserName:null,//入库人
          checkInputStoreId:null,//入库门店id
          checkInputOrderNo:null,//盘盈入库编号
          pageSize:20,//页数
          pageNo:1,//页码
        },
        data:{
          listInfo:[],
        },
        storesList:[],//入库门店
        // buttonInfo:{},//按钮权限
      }
    },
    mounted(){
      this.fetchData();//列表初始化
      this.allotInputStores();//获取入库门店
      // this.buttonInfo=this.AppUtils.returnPermissions(153);
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(153);
      },
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
          }else if(index === 4){
            sums[index]=this.data.sumTotalNum;
            return
          }else if(index === 5){
            sums[index]=this.data.sumTotalCost;
            return
          }
        });

        return sums;
      },
      exportData(){
        if(!this.data.listInfo.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        var obj=JSON.parse(JSON.stringify(this.model));
        delete obj['pageNo'];
        delete obj['pageSize'];
        this.$axios.post('/admin/stock/stockCheckInputOrderInfo/export',obj,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '盘盈入库单'+time+'.xls';
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
      initStartTime(date){
        this.model.startTime=this.AppUtils.formatDate(date);
      },
      initEndTime(date){
        this.model.endTime=this.AppUtils.formatDate(date);
      },
      fetchData(args){
        // this.model.startTime=this.AppUtils.formatDate(this.model.startTime);
        // this.model.endTime=this.AppUtils.formatDate(this.model.endTime);
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/stock/stockCheckInputOrderInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.data=JSON.parse(JSON.stringify(data.value.data));
            ////console.log(this.data);
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
         if(this.data.listInfo.length){
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
      toAdd(){
        this.$router.push('add');
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
