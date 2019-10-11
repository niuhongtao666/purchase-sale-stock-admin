<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" clearable filterable @change="clearWave">
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
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.wavehouseId" clearable filterable @visible-change="getWaveByStoreId(model.storeId,$event)" @change="clearLocation">
                  <el-option
                    v-for="item in wavehouseList"
                    :key="item.wavehouseId"
                    :label="item.wavehouseName"
                    :value="item.wavehouseId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">库位</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.locationId" clearable filterable @visible-change="fetchLocationInfoByWaveId(model.wavehouseId,$event)">
                  <el-option
                    v-for="item in locationList"
                    :key="item.locationId"
                    :label="item.locationName"
                    :value="item.locationId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品编号/名称" v-model.trim="model.goodsNameOrNo">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入批次号" v-model.trim="model.batchNo">
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入供应商编号" v-model.trim="model.supplierNo">
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入入库单号" v-model.trim="model.inputNo">
              </div>
            </div>
            <div class="group">
              <span class="left">一级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box"
                           @change="fetchCategories(model.goodsFirstClassId,'secondClassificationsList')"
                           v-model="model.goodsFirstClassId">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">二级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择一级分类"
                           @change="fetchCategories(model.goodsSecondClassId,'thirdClassificationsList')"
                           v-model="model.goodsSecondClassId">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">三级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择二级分类" v-model="model.goodsThirdClassId">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入最小库龄" v-model.trim="model.startAge">
              </div>
            </div>
            <div class="group">
             -
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入最大库龄" v-model.trim="model.endAge">
              </div>
            </div>
          </div>
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入最小库存" v-model.trim="model.startStock">
              </div>
            </div>
            <div class="group">
              -
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入最大库存" v-model.trim="model.endStock">
              </div>
            </div>
            <div class="group">
              <span class="left">
                <label class="checkBox">
                    <input type="checkbox" v-model="flag">
                    <span></span>不含0库存
                </label>
              </span>
              <div class="right">
              </div>
            </div>
            <div class="group btn-box reset">
              <button type="submit" class="btn search">搜索</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <!--<div class="total">
          <span class="lColor">合计数量：<span class="rColor">{{data.sumTotalNum?data.sumTotalNum:0}}</span></span>
          <span class="lColor">成本总价：<span class="rColor">{{data.sumTotalCost?data.sumTotalCost:0}}</span></span>
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
              label="操作"
              width="50"
              key="1"
              v-if="buttonInfo.move"
            >
              <template slot-scope="scope">
                <span class="cursor" @click="removeLocation(scope.row.id,scope.row.wavehouseId,scope.row.currentNum,scope.row.storeId)">
                  {{buttonInfo.move}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              key="2"
              width="50">
            </el-table-column>
            <el-table-column
              label="商品编号"
              min-width="160"
              key="3"
              prop="goodsNo"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品名称"
              min-width="160"
              key="4"
              prop="goodsName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品品牌"
              min-width="120"
              key="5"
              prop="goodsBrandName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="产地"
              min-width="120"
              key="6"
              prop="goodsOriginArea"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="生产编码"
              min-width="160"
              key="7"
              prop="goodsVendorNo"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="单位"
              min-width="50"
              key="8"
              prop="goodsUnit"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="当前库存"
              min-width="80"
              key="9"
              prop="currentNum"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="锁定库存"
              min-width="80"
              key="10"
              prop="lockNum"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="成本单价（不含税）"
              min-width="150"
              key="11"
              prop="unitPrice"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="成本总价（不含税）"
              min-width="150"
              key="12"
              prop="totalPrice"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="库龄（天）"
              min-width="95"
              key="13"
              prop="stockAge"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="批次号"
              min-width="200"
              key="14"
              prop="batchNo"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="入库单号"
              min-width="200"
              key="15"
              prop="inputNo"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="供应商编号"
              min-width="200"
              key="16"
              prop="supplierNo"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="门店"
              min-width="200"
              key="17"
              prop="storeName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="仓库"
              min-width="180"
              key="18"
              prop="wavehouseName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="库位"
              min-width="160"
              key="19"
              prop="locationName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="调拨方"
              min-width="160"
              key="20"
              prop="allotName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="一级分类"
              min-width="160"
              key="21"
              prop="goodsFirstClassName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="二级分类"
              min-width="160"
              key="22"
              prop="goodsSecondClassName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="三级分类"
              min-width="160"
              key="23"
              prop="goodsThirdClassName"
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
    <movelocation v-if="moveShow" :sendData="sendData" @hideMoveMask="hideMoveMask" @fetchData="fetchData"></movelocation>
  </div>
</template>

<script>
  import movelocation from './moveLocation'
  export default {
    name:'purchase-warehousing',
    components:{
      movelocation
    },
    data(){
      return{
        model:{
          storeId:null,//入库门店id
          wavehouseId:null,//仓库id
          locationId:null,//	库位id
          goodsNameOrNo:null,//商品名称/编号
          batchNo:null,//批次号
          supplierNo:null,//供应商编号
          inputNo:null,//入库单号
          goodsFirstClassId:null,//第一分类Id
          goodsSecondClassId:null,//第二分类Id
          goodsThirdClassId:null,//第三分类Id
          startAge:null,//库龄开始
          endAge:null,//库龄结束
          startStock:null,//	库存开始
          endStock:null,//库存结束
          flag:1,//是否含0库存(0-不含 1-含)
          pageSize:20,//页数
          pageNo:1,//页码
        },
        flag:true,//是否含0库存(0-不含 1-含)
        data:{
          listInfo:[],
        },//列表数据
        // buttonInfo:{},//按钮权限
        storesList:[],//入库门店
        wavehouseList:[
          {
            wavehouseId:null,
            wavehouseName:'全部'
          }
        ],//入库仓库
        locationList:[
          {
            locationId:null,
            locationName:'全部'
          }
        ],
        firstClassificationsList: [],//一级分类
        secondClassificationsList: [],//二级分类
        thirdClassificationsList: [],//三级分类
        moveShow:false,//移库弹层显示状态
        sendData:{},//给移库弹层的数据
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
          }else if(index === 8){
            sums[index]=this.data.sumTotalNum;
            return
          }else if(index === 11){
            sums[index]=this.AppUtils.decimal2(this.data.sumTotalCost);
            return
          }
        });

        return sums;
      },
      removeLocation(id,wavehouseId,currentNum,storeId){
        this.moveShow=true;
        ////console.log(id);
        ////console.log(wavehouseId);
        ////console.log(currentNum);
        this.sendData={
          'id':id,
          'wavehouseId':wavehouseId,
          'currentNum':currentNum,
          'storeId':storeId
        };
      },
      hideMoveMask(){
        this.moveShow=false;
      },
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(this.flag){
          this.model.flag=1;
        }else{
          this.model.flag=0;
        }
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/stock/numInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.data=data.value.data;
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
      clearWave(){
        this.model.wavehouseId=null;
        this.model.locationId=null;
      },
      clearLocation(){
        this.model.locationId=null;
      },
      getWaveByStoreId(arg,event){
        if(event){
          if(arg){
            this.$store.dispatch('fetchStoreWave',arg).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data){
                this.wavehouseList=data.value;
                this.wavehouseList.unshift({'wavehouseId':null,'wavehouseName':'全部'});
              };
            })
          }else{
            this.wavehouseList=[];
            this.AppUtils.alert('请先选择门店');
          }
        }
      },
      fetchLocationInfoByWaveId(arg,event){
        if(event){
          if(arg){
            this.$store.dispatch('fetchLocationInfoByWaveId',arg).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data){
                this.locationList=data.value;
                this.locationList.unshift({'locationId':null,'locationName':'全部'});
              };
            })
          }else{
            this.AppUtils.alert('请先选择仓库');
          }
        }
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      fetchStores(){
        this.$store.dispatch('fetchStores').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            this.storesList=data.value;
            var userInfos=JSON.parse(localStorage.getItem('userInfos'));
            var userStoreId=userInfos['storeId'];
            if(this.storesList.length==1){
              this.model.storeId=userStoreId;
            }else{
              this.storesList.unshift({'storeId':null,'storeName':'全部'});
            }
            // this.fetchData();
          };
        })
      },
      fetchCategories(id, category='firstClassificationsList') {
        if (category === 'secondClassificationsList') {//一级分类切换的时候 清除二级 三级分类数据 二级分类切换同理
          this.secondClassificationsList = [];
          this.model.goodsSecondClassId = null;

          this.thirdClassificationsList = [];
          this.model.goodsThirdClassId = null;
        } else if (category === 'thirdClassificationsList') {
          this.thirdClassificationsList = [];
          this.model.goodsThirdClassId = null;
        }
        if (id === null) {//当前分类选择全部的时候 不再请求下一级分类
          return false;
        }
        this.$store.dispatch('fetchCategories', id).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            let value = data.value;
            if (value.length) {
              value.unshift({id: null, name: '全部'})
              this[category] = data.value;
            }
          }
        })
      },
    },
    mounted(){
      this.fetchStores();//获取入库门店
      this.fetchCategories(0);
      // this.buttonInfo=this.AppUtils.returnPermissions(17);
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(17);
      },
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
    position: absolute;
    right: 12px;
    top: 20px;
    height: 40px;
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
        width: 124px;
      }
      .group{
        margin-left: 8px;
        .search{
          margin-left: -9px;
        }
        .right{
          input{
            width: 154px;
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
