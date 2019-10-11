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
                  v-model="model.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  @change="initStartTime"
                  placeholder="起始时间"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model="model.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  @change="initEndTime"
                  placeholder="终止时间"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">出库门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.outputStoreId" clearable filterable>
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
              <span class="left">业务类型</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.billType" clearable filterable>
                  <el-option
                    v-for="item in businessTypes"
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
            <div class="group">
              <!--<span class="left">出库人:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入出库人" v-model.trim="model.outputUserName">
              </div>
            </div>
            <div class="group">
              <!--<span class="left">出库人:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入出库单号" v-model.trim="model.outputOrderNo" style="width: 123px">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入车牌号" v-model.trim="model.carNumber" style="width: 123px">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入业务人员" v-model.trim="model.salesmanName" style="width: 123px">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入发料单号" v-model.trim="model.deliverOrderNo" style="width: 123px">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入业务单号" v-model.trim="model.businessNo" style="width: 123px">
              </div>
            </div>
            <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="model.flag">
                    <span></span>负数出库
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group btn-box reset">
              <button type="submit" class="btn search">搜索</button>
              <button type="button" class="btn search ml20" @click="exportData" v-if="buttonInfo.export">导出</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <!--<div class="total">
          <span class="lColor">合计数量：<span class="rColor">{{data.sumTotalNum}}</span></span>
          <span class="lColor">销售总价：<span class="rColor">{{data.sumTotalPrice}}</span></span>
          <span class="lColor">成本总价：<span class="rColor">{{data.sumTotalCost}}</span></span>
        </div>-->
        <div class="table_scroll ">
          <el-table
            :data="data.listInfo"
            max-height="490"
            border
            style="width: 100%"
            show-summary
            :summary-method="getSummaries"
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
              min-width="190"
              key="2"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <router-link class="primary" :to="{path:'detail/id/'+scope.row.id+'/businessType/'+scope.row.businessType}" target="_blank">
                  {{scope.row.outputOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="发料单号"
              min-width="190"
              key="3"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.deliverOrderNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="业务单号"
              min-width="190"
              key="4"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.dataSourceNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="车牌号"
              min-width="100"
              key="5"
              prop="carNumber"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="业务类型"
              min-width="80"
              key="6"
              prop="billTypeName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库数量"
              min-width="80"
              key="7"
              show-overflow-tooltip
              prop="totalNum"
            >
            </el-table-column>
            <el-table-column
              label="销售总价(含税)"
              min-width="120"
              key="8"
              prop="totalPrice"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="成本总价(不含税)"
              min-width="130"
              key="9"
              prop="costTotalMoney"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="业务人员"
              min-width="100"
              key="10"
              prop="salesmanName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库人"
              min-width="100"
              key="11"
              prop="outputUserName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库时间"
              min-width="180"
              key="12"
              prop="createTime"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库门店"
              min-width="160"
              key="13"
              prop="outputStoreName"
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
    name:'material-out',
    data(){
      return{
        model:{
          startTime:null,//时间开始
          endTime:null,//	时间结束
          outputUserName:null,//出库人
          outputStoreId:null,//出库门店id
          outputOrderNo:null,//出库单号
          flag:false,//负数出库
          billType:null,//业务类型
          carNumber:null,//车牌号
          salesmanName:null,//业务人员
          deliverOrderNo:null,//发料单号
          businessNo:null,//业务单号
          pageSize:20,//页数
          pageNo:1,//页码
        },
        data:{
          listInfo:[]
        },//列表数据
        // buttonInfo:{},//按钮权限
        storesList:[],//出库门店
        businessTypes:[
          // {
          //   id:null,
          //   name:'全部'
          // },
          // {
          //   id:1,
          //   name:'销售出库'
          // },
          // {
          //   id:2,
          //   name:'发料出库'
          // }
        ]
      }
    },
    mounted(){
      this.allotInputStores();//获取出库门店
      this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(155);
      this.getBusinessTypes();
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(155);
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
          }else if(index === 6){
            sums[index]=this.data.sumTotalNum;
            return
          }else if(index === 7){
            sums[index]=this.data.sumTotalPrice;
            return
          }else if(index === 8){
            sums[index]=this.data.sumTotalCost;
            return
          }
        });

        return sums;
      },
      getBusinessTypes(){
        this.$axios.get('/admin/stock/outPutInfo/billType').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.businessTypes=data.value;
            this.businessTypes.unshift({'id':null,'name':'全部'});
          }
        })
      },
      exportData(){
        if(!this.data.listInfo.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        var obj=JSON.parse(JSON.stringify(this.model));
        delete obj['pageNo'];
        delete obj['pageSize'];
        this.$axios.post('/admin/stock/outPutInfo/export',obj,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '发料出库单'+time+'.xls';
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

        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/stock/outPutInfo/list',this.model).then(res=>{
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
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      //获取出库门店
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
    }
  }
</script>

<style lang="scss" scoped>
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
  .table_wrap{
    position: relative;
    box-sizing: border-box;
    /*padding-top:50px;*/
  }
  .centerZone{
    height: 40px;
    line-height: 40px;
    background: #fff;
    /*margin-top: 10px;*/
    box-sizing: border-box;
    padding-left: 10px;
  }
</style>
