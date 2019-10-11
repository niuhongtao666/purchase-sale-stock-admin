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
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="请选择"
                  class="activity-edit-date date-box innerInput"
                  :picker-options="pickerBeginDateBefore"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left ml24">服务中心</span>
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
            <div class="group wave">
              <span class="left">仓库</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.warehouseIds" @visible-change="getWave" multiple collapse-tags >
                  <el-option
                    v-for="item in warehousesList"
                    :key="item.wavehouseId"
                    :label="item.wavehouseName"
                    :value="item.wavehouseId">
                  </el-option>
                </el-select>
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
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left ml0"></span>
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
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入供应商名称" v-model.trim="model.supplierName">
              </div>
            </div>
            <div class="group ml10">
              <span class="left ml10">一级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.firstClassId" @change="changeFirstClass">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml20">
              <span class="left">二级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.secondClassId" @visible-change="getSecondClass" @change="changeSecondClass">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml20">
              <span class="left">三级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.thirdClassId" @visible-change="getThirdClass">
                  <el-option
                    v-for="item in thirdClassificationsList"
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
              <span class="left ml10">查看详细</span>
              <div class="right">
                <label class="checkBox">
                  <input type="checkbox" v-model.trim="checked.isProvince">
                  <span></span>省份
                </label>
                <label class="checkBox">
                  <input type="checkbox" v-model.trim="checked.isCity">
                  <span></span>城市
                </label>
                <label class="checkBox">
                  <input type="checkbox" v-model.trim="checked.isCategory">
                  <span></span>类别
                </label>
              </div>
            </div>
            <div class="group btn-box ml20 reset">
              <button type="submit" class="btn search">搜索</button>
              <button type="submit" class="btn"  @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
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
              min-width="240"
              key="1"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              min-width="240"
              key="2"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsBrandName"
              label="商品品牌"
              min-width="120"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsOriginArea"
              label="产地"
              min-width="120"
              key="4"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              min-width="90"
              key="5"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              min-width="50"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="成本单价(不含税)"
              min-width="130"
              key="7"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.costPrice | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              label="成本总价(不含税)"
              min-width="130"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.costTotal | decimalTofixed4}}
              </template>
            </el-table-column>
            <el-table-column
              label="销售单价(含税)"
              min-width="120"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.salePrice | decimalTofixed2}}
              </template>
            </el-table-column>
            <el-table-column
              label="销售总价(含税)"
              min-width="120"
              key="10"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.saleTotal | decimalTofixed2}}
              </template>
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份"
              min-width="110"
              key="11"
              v-if="isProvince"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="城市"
              min-width="110"
              key="12"
              v-if="isCity"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="wavehouseName"
              label="仓库"
              min-width="160"
              key="13"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="locationName"
              label="库位"
              min-width="160"
              key="14"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="stockAge"
              label="库龄(天)"
              min-width="75"
              key="15"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="服务中心"
              min-width="180"
              key="16"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="最早入库时间"
              min-width="160"
              key="17"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.stockInputTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="firstClassName"
              label="一级分类"
              min-width="120"
              key="18"
              v-if="isCategory"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="secondClassName"
              label="二级分类"
              min-width="120"
              key="19"
              v-if="isCategory"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="thirdClassName"
              label="三级分类"
              min-width="120"
              key="20"
              v-if="isCategory"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="批次"
              min-width="220"
              key="21"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              min-width="180"
              key="22"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="carTypeDesc"
              label="适用品牌"
              min-width="240"
              key="23"
              :resizable='false'
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child"  @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'inventory-data',
    data(){
      return{
        pickerBeginDateBefore:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        model:{
          businessTime:null,//日期
          goodsNo:null,//商品编号
          goodsName:null,//商品名称
          applicateBrand:null,//适用品牌
          provinceId:null,//省份
          cityId:null,//城市
          storeId:null,//服务中心
          supplierName:null,//供应商名称
          warehouseIds:[],//仓库
          firstClassId:null,//一级分类
          secondClassId:null,//二级分类
          thirdClassId:null,//三级分类
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
        firstClassificationsList:[],
        secondClassificationsList:[
          {
            id:null,
            name:"全部",
          },
        ],
        thirdClassificationsList:[
          {
            id:null,
            name:"全部",
          },
        ],
        // buttonInfo:{},//按钮权限
        isProvince:true,
        isCity:true,
        isCategory:true,
        dataList:[],//列表数据
        sumData:{},//合计
        provincesList:[],
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
      }
    },
    created(){
    },
    mounted(){
      //获取一级分类
      this.getFirstClass();
      // this.fetchData();
      //获取省份
      this.getProvince();
      //获取服务中心
      this.getStore();
      //获取仓库
      // this.getWave();
      //默认当前日期
      var newDate=new Date();
      // this.model.businessTime=this.AppUtils.formatDate(newDate);
      // this.buttonInfo=this.AppUtils.returnPermissions(21);
      ////console.log(this.model.businessTime);
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(21);
      },
    },
    methods:{
      //获取第一级别分类
      getFirstClass(){
        this.$store.dispatch('fetchCategories',0).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.firstClassificationsList=data.value;
            this.firstClassificationsList.unshift({id:null,name:'全部'});
          }
        });
      },
      //获取第二级别分类
      getSecondClass(arg){
        if(arg){
          if(this.model.firstClassId){
            this.$store.dispatch('fetchCategories',this.model.firstClassId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.secondClassificationsList=data.value;
                this.secondClassificationsList.unshift({id:null,name:'全部'});
              }
            });
          }else{
            this.AppUtils.alert('请先选择一级分类');
          }
        };
        ////console.log(arg);
      },
      //获取第三级别分类
      getThirdClass(arg){
        if(arg){
          if(this.model.secondClassId){
            this.$store.dispatch('fetchCategories',this.model.secondClassId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.thirdClassificationsList=data.value;
                this.thirdClassificationsList.unshift({id:null,name:'全部'});
              }
            });
          }else{
            this.AppUtils.alert('请先选择二级分类');
          }
        };
        ////console.log(arg);
      },
      changeFirstClass(arg){
        ////console.log(arg);
        this.model.secondClassId=null;
        this.model.thirdClassId=null;
      },
      changeSecondClass(arg){
        ////console.log(arg);
        this.model.thirdClassId=null;
      },
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
            sums[index] = this.sumData.sumNum;
          }else if(index === 7){
            sums[index] = this.AppUtils.decimal2(this.sumData.sumCostTotal);
          }else if(index === 9){
            sums[index] = this.AppUtils.decimal2(this.sumData.sumSaleTotal);
          }
        });

        return sums;
      },
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
      clearWave(arg){
        if(arg){
          this.model.warehouseIds=[];
        }else{
          this.warehousesList=[];
          this.model.warehouseIds=[];
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
        this.$axios.post('/admin/report/stockData/export',this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '库存数据'+time+'.xls';
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
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        this.model.businessTime=this.AppUtils.formatDate(this.model.businessTime);
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
          this.model.showCity=0;
          this.isCity=false;
        }
        if(!this.model.supplierName){
          this.model.supplierName=null;
        }
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/report/stockData',this.model).then(res=>{
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
      //获取仓库
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
