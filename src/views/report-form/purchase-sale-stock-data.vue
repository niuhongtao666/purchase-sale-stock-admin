<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                选择日期
              </span>
              <div class="right reset set">
                <el-date-picker
                  v-model.trim="model.businessTime"
                  type="month"
                  format="yyyy-MM"
                  placeholder="请选择"
                  class="activity-edit-date date-box innerInput"
                  :picker-options="pickerBeginDateBefore"
                  @change="initStartTime"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">省份</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.provinceId" @change="clearCity">
                  <el-option
                    v-for="item in provincesList"
                    :key="item.provinceId"
                    :label="item.provinceName"
                    :value="item.provinceId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">城市</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.cityId" @visible-change="getCities">
                  <el-option
                    v-for="item in citiesList"
                    :key="item.cityId"
                    :label="item.cityName"
                    :value="item.cityId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">服务中心</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" @change="clearWave">
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
              <span class="left">仓库</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.warehouseId" @visible-change="getWave" clearable filterable>
                  <el-option
                    v-for="item in warehousesList"
                    :key="item.wavehouseId"
                    :label="item.wavehouseName"
                    :value="item.wavehouseId">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品编号" v-model.trim="model.goodsNo">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品名称" v-model.trim="model.goodsName">
              </div>
            </div>
            <div class="group">
              <span class="left">查看详细</span>
              <div class="right">
                <label class="checkBox">
                  <input type="checkbox" v-model="checked.isProvince">
                  <span></span>省份
                </label>
                <label class="checkBox">
                  <input type="checkbox" v-model="checked.isCity">
                  <span></span>城市
                </label>
                <label class="checkBox">
                  <input type="checkbox" v-model="checked.isCategory">
                  <span></span>类别
                </label>
              </div>
            </div>
            <div class="group btn-box ml10">
              <button type="submit" class="btn search">搜索</button>
              <button type="submit" class="btn" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
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
            max-height="492"
            border
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
            :summary-method="getSummaries"
            show-summary
          >
            <el-table-column
              prop="goodsNo"
              label="商品编号"
              min-width="250"
              key="1"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              min-width="250"
              key="2"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份"
              min-width="110"
              key="3"
              v-if="isProvince"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="城市"
              min-width="110"
              key="4"
              v-if="isCity"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="服务中心"
              min-width="170"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="wavehouseName"
              label="仓库"
              min-width="150"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="beginNum"
              label="期初数量"
              min-width="80"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="期初金额（不含税）"
              min-width="150"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.beginTotal}}
              </template>
            </el-table-column>
            <el-table-column
              prop="currInputNum"
              label="入库数量"
              min-width="80"
              key="9"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="入库金额(不含税)"
              min-width="140"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.currInputTotal | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              prop="currOutPutNum"
              label="出库数量"
              min-width="80"
              key="11"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库金额(不含税)"
              min-width="130"
              key="12"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.currOutPutTotal | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              prop="endNum"
              label="期末数量"
              min-width="80"
              key="13"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="期末金额(不含税)"
              min-width="130"
              key="14"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.endTotal | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              prop="firstClassName"
              label="一级分类"
              min-width="150"
              key="15"
              v-if="isCategory"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="secondClassName"
              label="二级分类"
              min-width="150"
              key="16"
              v-if="isCategory"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="thirdClassName"
              label="三级分类"
              min-width="150"
              key="17"
              v-if="isCategory"
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
    name:'purchase-sale-stock-data',
    data(){
      return{
        pickerBeginDateBefore:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        /*model:{
          date:'',//日期
          commodityNumber:'',//商品编号
          commodityName:'',//商品名称
          province:'',//省份
          city:'',//城市
          serviceCenter:'',//服务中心
          warehouse:'',//仓库
        },*/
        model:{
          businessTime:null,//-格式：2018-03
          goodsNo:null,//商品编号
          goodsName:null,//商品名称
          provinceId:null,//省
          cityId:null,//市
          storeId:null,//门店ID
          warehouseId:null,//仓库ID
          showProvince:0,//省份
          showCity:0,//城市
          showClass:1,//类别
          pageNo:1,
          pageSize:20
        },
        checked:{
          isProvince:false,
          isCity:false,
          isCategory:true,
        },
        sumData:{},//合计
        isProvince:true,
        isCity:true,
        isCategory:true,
        dataList:[],//列表数据
        provincesList:[],
        positionChange:0,//城市和省份都没勾选
        citiesList:[
          {
            cityId:null,
            cityName:"全部",
          },
        ],
        storesList:[],//服务中心
        warehousesList:[
          {
            wavehouseId:null,
            wavehouseName:'全部'
          }
        ],
        // buttonInfo:{},//按钮权限
      }
    },
    mounted(){
      // this.fetchData();
      //获取省份
      this.getProvince();
      //获取仓库
      // this.getWave();
      //获取服务中心
      this.getStore();
      // this.buttonInfo=this.AppUtils.returnPermissions(24);
      var today=new Date();
      this.model.businessTime=this.AppUtils.formatYearMonth(today);
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(24);
      },
    },
    methods:{
      clearWave(arg){
        if(arg){
          this.model.warehouseId=null;
        }else{
          this.warehousesList=[];
          this.model.warehouseId=null;
        }
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if(_this.positionChange==0){
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 4) {
              sums[index] = this.sumData.sumBeginNum;
            }else if(index === 5) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumBeginTotal);
            }else if(index === 6) {
              sums[index] = this.sumData.sumInputNum;
            }else if(index === 7) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumInputTotal);
            }else if(index === 8) {
              sums[index] = this.sumData.sumOutputNum;
            }else if(index === 9) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumOutputTotal);
            }else if(index === 10) {
              sums[index] = this.sumData.sumEndNum;
            }else if(index === 11) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumEndTotal);
            }
          }else if(_this.positionChange==1){
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 5) {
              sums[index] = this.sumData.sumBeginNum;
            }else if(index === 6) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumBeginTotal);
            }else if(index === 7) {
              sums[index] = this.sumData.sumInputNum;
            }else if(index === 8) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumInputTotal);
            }else if(index === 9) {
              sums[index] = this.sumData.sumOutputNum;
            }else if(index === 10) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumOutputTotal);
            }else if(index === 11) {
              sums[index] = this.sumData.sumEndNum;
            }else if(index === 12) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumEndTotal);
            }
          }else{
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 6) {
              sums[index] = this.sumData.sumBeginNum;
            }else if(index === 7) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumBeginTotal);
            }else if(index === 8) {
              sums[index] = this.sumData.sumInputNum;
            }else if(index === 9) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumInputTotal);
            }else if(index === 10) {
              sums[index] = this.sumData.sumOutputNum;
            }else if(index === 11) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumOutputTotal);
            }else if(index === 12) {
              sums[index] = this.sumData.sumEndNum;
            }else if(index === 13) {
              sums[index] = this.AppUtils.decimal2(this.sumData.sumEndTotal);
            }
          }
        });
        return sums;
      },
      initStartTime(date){
        if(date){
          this.model.businessTime=this.AppUtils.formatYearMonth(date);
        }
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        if(this.checked.isCategory){
          this.model.showClass=1;
        }else{
          this.model.showClass=0;
        }
        if(this.checked.isProvince){
          this.model.showProvince=1;
        }else{
          this.model.showProvince=0;
        }
        if(this.checked.isCity){
          this.model.showCity=1;
        }else{
          this.model.showCity=0;
        }
        this.$axios.post('/admin/report/purchaseSaleReport/export',this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '进销存数据'+time+'.xls';
          let blob = new Blob([res.data], { type: 'application/x-xls' })
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);//newChange-导出兼容火狐
            link.click();
            document.body.removeChild(link);//newChange-导出兼容火狐
            window.URL.revokeObjectURL(link.href);
          }
        });
      },

      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(this.checked.isCategory){
          this.isCategory=true;
          this.model.showClass=1;
        }else{
          this.isCategory=false;
          this.model.showClass=0;
        }
        if(this.checked.isProvince){
          this.isProvince=true;
          this.model.showProvince=1;
        }else{
          this.model.showProvince=0;
          this.isProvince=false;
        }
        if(this.checked.isCity){
          this.isCity=true;
          this.model.showCity=1;
        }else{
          this.isCity=false;
          this.model.showCity=0;
        }
        if((this.isProvince&&!this.isCity)||(!this.isProvince&&this.isCity)){
          this.positionChange=1;
        }else if(this.isProvince&&this.isCity){
          this.positionChange=2;
        }else{
          this.positionChange=0;
        }
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/report/purchaseSaleReport',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.sumData=data.value.data.sumData;
            this.dataList=data.value.data.listData;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.listData.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      //获取搜索-服务中心
      getStore(){
        this.$store.dispatch('fetchStoreListNew').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.storesList=data.value;
            if(this.storesList.length){
              if(this.storesList.length==1){
                this.model.storeId=this.storesList[0]['storeId'];
              }else{
                this.storesList.unshift({storeId:null,storeName:'全部'});
              }
            }
            this.fetchData();
          }
        });
      },
      //获取省份
      getProvince(){
        this.$store.dispatch('fetchProvinceList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.provincesList=data.value.data;
            this.provincesList.unshift({provinceId:null,provinceName:'全部'});
          }
        });
      },
      //当省份改变，就清空城市
      clearCity(arg){
        if(arg){
          this.model.cityId=null;
        }else{
          this.citiesList=[
            {
              cityId:null,
              cityName:"全部",
            },
          ];
          this.model.cityId=null;
        }
      },
      getCities(arg){
        if(arg){
          if(this.model.provinceId){
            this.$store.dispatch('fetchCityList',this.model.provinceId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.citiesList=data.value.data;
                this.citiesList.unshift({cityId:null,cityName:'全部'});
              }
            });
          }else{
            this.AppUtils.alert('请先选择省份')
          }
        }
      },
      getWave(arg){
        if(arg){
          if(this.model.storeId){
            this.$store.dispatch('fetchWarehousetByByStoreId',this.model.storeId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.warehousesList=data.value;
                // this.warehousesList.unshift({wavehouseId:null,wavehouseName:'全部'});
              }
            });
          }else{
            this.AppUtils.alert('请先选择服务中心');
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
          .checkBox{
            float: left;
            margin-left: 10px;
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
