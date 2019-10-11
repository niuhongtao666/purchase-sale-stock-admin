<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser" style="flex: 4;text-align: left">入库明细</div>
          <div class="searchZone" style="flex: 3;margin-right: 23px;">
            <div class="group">
              <span class="left" style="margin-right: 10px;">税率</span>
              <span class="right">
                <el-select placeholder="请选择" class="el_box" v-model="taxRate" @visible-change="accAgain">
                  <el-option
                    v-for="item in taxRatesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </span>
            </div>
          </div>
          <div class="searchZone" style="flex: 4;">
            <div class="group">
              <div class="right">
                <input type="text" placeholder="配件编号/生产编码/配件名称" v-model.trim="model.likeName">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="right">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll add">
                    <el-table
                      :data="dataList"
                      max-height="380"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                      :summary-method="getSummaries"
                      show-summary
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        key="1"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        label="配件编号"
                        width="140"
                        key="2"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <!--<el-table-column-->
                        <!--label="生产编码"-->
                        <!--width="140"-->
                        <!--key="4"-->
                        <!--show-overflow-tooltip-->
                      <!--&gt;-->
                        <!--<template slot-scope="scope">-->
                          <!--{{scope.row.goodsVendorNo}}-->
                        <!--</template>-->
                      <!--</el-table-column>-->
                      <el-table-column
                        label="配件名称"
                        width="160"
                        key="3"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件品牌"
                        min-width="120"
                        key="4"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单位"
                        width="50"
                        key="5"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="数量"
                        width="50"
                        key="6"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <!--<input type="number" v-model.number="scope.row.noWavehosueNum" style="width: 39px;" min="0" @input="getTotal(scope.row.goodsId,scope.row.noWavehosueNum,scope.row.unitPrice)">-->
                          <span>{{scope.row.allotNum}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="入库单价(含税)"
                        width="115"
                        key="7"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <!--<input type="text"  v-model.number="scope.row.unitPrice" style="width: 52px;" @input="getTotal(scope.row.goodsId,scope.row.noWavehosueNum,scope.row.unitPrice)">-->
                          <span>{{scope.row.unitPrice | decimalTofixed4}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="入库总价(含税)"
                        width="115"
                        key="8"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.outputTotalPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="入库单价(不含税)"
                        width="130"
                        key="9"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="入库总价(不含税)"
                        width="130"
                        key="10"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.outputTotalNoTaxPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="仓库"
                        width="130"
                        key="11"
                      >
                        <template slot-scope="scope">
                          <el-select placeholder="请选择" class="el_box" v-model="scope.row.wavehouseId" @change="clearLocation(scope.row.matchLogId,scope.row.wavehouseId,$event)" filterable clearable style="width: 110px!important">
                            <el-option
                              v-for="item in waveList"
                              :key="item.wavehouseId"
                              :label="item.wavehouseName"
                              :value="item.wavehouseId">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="库位"
                        width="130"
                        key="12"
                      >
                        <template slot-scope="scope">
                          <el-select placeholder="请选择" class="el_box" v-model="scope.row.locationName" @change="locationChange(scope.row)" @visible-change="fetchLocationInfoByWaveId(scope.row.wavehouseId,$event)"  clearable v-el-select-loadmore="loadmore" @blur="reBack" filterable remote :remote-method="searchLocation" style="width: 110px!important">
                            <el-option
                              v-for="item in locals"
                              :key="item.locationId"
                              :label="item.locationName"
                              :value="item.locationName">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="批次号"
                        width="170"
                        key="13"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <span>{{scope.row.batchNo}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closeBtn">
          <button type="submit" class="btn importBtn" @click.prevent="inputWave">确认入库</button>
          <button type="submit" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    directives: {
      'el-select-loadmore': {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
          SELECTWRAP_DOM.addEventListener('scroll', function () {
            /**
             * scrollHeight 获取元素内容高度(只读)
             * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
             * clientHeight 读取元素的可见高度(只读)
             * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
             * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
             */
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            if (condition) {
              binding.value();
            }
          });
        }
      }
    },
    name:'importWare',
    data(){
      return{
        pageIndex:1,
        /*model:{
          allotOrderId:null,//调拨单id
          allotOutputOrderDetails:[],//调拨出库单明细
        },*/
        model:{
          id:'',//调拨单ID
          likeName:null,//关键字搜索(配件编号、配件名称、生产编码)
        },
        taxRate:null,//税率
        dataList:[],
        taxRatesList:[
          {
            id:16,
            name:'16%'
          },
          {
            id:13,
            name:'13%'
          },
          {
            id:10,
            name:'10%'
          },
          {
            id:6,
            name:'6%'
          },
          {
            id:3,
            name:'3%'
          },
          {
            id:0,
            name:'0%'
          }
        ],
        waveList:[],//仓库列表
        locationList:[],//库位列表
        importWareList:[],
      }
    },
    mounted(){
      //获取仓库
      this.getWave();
      this.model.id=this.allocationId;
      this.fetchData();//获取列表信息
    },
    computed:{
      locals(){
        if(this.locationList!=''){
          var locals=JSON.parse(this.locationList);
          //console.log(locals);
          return locals;
        }else{
          var arr=[];
          return arr
        }
      }
    },
    props:{
      // importWareList:Array,
      allocationId:String,//调拨单id
      allotInputStoreId:Number,//调入门店id
    },
    methods:{
      searchLocation(query){
        if (query !== '') {
          this.locationList='';
          // this.loading = false;
          setTimeout(() => {
            this.loading = false;
            var locations=JSON.parse(sessionStorage.getItem('saveLocation'));
            var str = locations.filter(item => {
              //console.log(query);
              return item.locationName.indexOf(query)>-1;
            });
            sessionStorage.setItem('searchAll',JSON.stringify(str));
            this.pageIndex=1;
            this.locationList=JSON.stringify(str.slice(0,10));
          }, 200);
        } else {
          this.locationList='';
        }
      },
      reBack(){
        this.pageIndex=1;
      },
      loadmore() {
        this.pageIndex++;
        if(!this.loading){
          this.locationList='';
          var searchAllData=JSON.parse(sessionStorage.getItem('searchAll'));
          //console.log(searchAllData);
          var sliceSearchAll=searchAllData.slice(0,10*this.pageIndex);
          this.locationList=JSON.stringify(sliceSearchAll);
        }else{
          // alert(2);
          var wavehouseId=sessionStorage.getItem('waveId');
          this.fetchLocationInfoByWaveId(wavehouseId,true);
        };
      },
      fetchLocationInfoByWaveId(wavehouseId,event) {//获取库位
        if(event){
          this.loading=true;
          sessionStorage.setItem('waveId',wavehouseId);
          if (wavehouseId) {
            this.$store.dispatch('fetchLocationInfoByWaveId',wavehouseId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                if(data.value.length){
                  sessionStorage.setItem('saveLocation',JSON.stringify(data.value));
                  this.locationList =JSON.stringify(data.value.slice(0,10*this.pageIndex));
                }else{
                  this.locationList ='';
                  this.AppUtils.alert('该仓库下没有库位');
                }
              }
            })
          }
        }else{
          this.pageIndex=1;
        }
      },
      locationChange(data) {
        if(data.locationName){
          var locals=JSON.parse(this.locationList);
          for (let val of locals) {
            if (val.locationName === data.locationName) {
              data.locationId = val.locationId;
              // var sliceLo=(JSON.parse(this.locationList)).slice(0,10);
              this.locationList='';
              return;
              // return this.saveEditParts(data);//库位修改 保存配件
            }
          }
          this.pageIndex=1;
        }
      },
      //改变税率重新计算
      accAgain(arg){
        if(!arg){
          // alert(this.model.taxRate);;
          this.getTotal();
        }
      },
      getTotal() {
        var _this = this;
          this.dataList.forEach((val,index)=>{
            _this.dataList[index]['noTaxUnitPrice']=_this.AppUtils.accDiv(_this.AppUtils.decimal4(val['unitPrice']),_this.AppUtils.add(1,_this.taxRate/100));
            ////console.log(_this.dataList[index]['unitPrice']);
              /*_this.importWareList[index]['noWavehosuePrice']=totalPrice;
              _this.importWareList[index]['unitPrice']=unitPrice;
              _this.importWareList[index]['noWavehosueNum']=noWavehosueNum;
              _this.importWareList[index]['noTaxUnitPrice']=_this.AppUtils.accDiv(unitPrice,_this.AppUtils.add(1,_this.model.taxRate/100));
              _this.importWareList[index]['noTaxWavehosuePrice']=_this.AppUtils.decimal2(_this.AppUtils.mul(noWavehosueNum, _this.importWareList[index]['noTaxUnitPrice']));*/
            _this.dataList[index]['outputTotalNoTaxPrice']=_this.AppUtils.mul(_this.AppUtils.decimal4(_this.dataList[index]['noTaxUnitPrice']),_this.dataList[index]['allotNum'])
              _this.$set(_this.dataList,index,_this.dataList[index]);
          });
        // this.changeNumPrice();
      },
      //确认入库
      inputWave(){
        var obj={};
        obj['allotOrderId']=this.allocationId;
        obj['taxRate']=this.taxRate;
        obj['allotOutputOrderDetails']=this.dataList;
        ////console.log(obj);
        this.$axios.post('/admin/stock/allotInputOrderInfo/confirmInput',obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.$message.success('确认入库成功');
            this.$emit('hideImportWareMask');
            this.$emit('fetchData');
            window.open('/inventory-management/allocation-warehousing/detail/'+data.value,'_blank');
          }
        })
      },
      //获取确认出库列表信息
      fetchData(){
          this.$axios.post('/admin/stock/allotOrderInfo/getAllotOutputDetailList',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            ////console.log(data);
            if(data) {
              this.dataList=data.value;
              this.taxRate=this.dataList[0]['taxRate'];
              ////console.log(this.dataList);
            }
          })
      },
      getLocal(goodsId,id,e){
        ////console.log(id);
        ////console.log(e);
        var _this=this;
        if(e){
          this.getLocation(id);
        }else{
          this.dataList.forEach((val,index)=>{
            var value=val;
            var inde=index;
            if(val['goodsId']===goodsId){
              var local=val['locationName'];
              _this.locationList.forEach((val)=>{
                if(val.locationId==local){
                  ////console.log(val.locationId);
                  ////console.log(val.locationName);
                  value['locationId']=val.locationId;
                  value['locationName']=val.locationName;
                  ////console.log(inde);
                  ////console.log(val.locationName);
                  _this.$set(_this.importWareList,inde,value);
                }
              });
            }
          })
        }
      },
      clearLocation(matchLogId,id,va){
        var _this=this;
        // this.waveList
        ////console.log(goodsId);
        ////console.log(id);
        ////console.log(va);
        if(va){
          this.dataList.forEach((val,index)=>{
            var valu=val;
            if(val['matchLogId']===matchLogId){
              _this.waveList.forEach((val)=>{
                if(val.wavehouseId==id){
                  valu['wavehouseName']=val.wavehouseName;
                  valu['locationName']='';
                }
              });
            }
          })
        }
      },
      //获取库位
      getLocation(arg){
        if(!arg){
          this.AppUtils.alert('请先选择仓库');
        }else{
          this.$store.dispatch('fetchLocationInfoByWaveId',arg).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.locationList = data.value;
            }
          })
        }
      },
      //获取仓库
      getWave(){
        this.$store.dispatch('fetchStoreWave',this.allotInputStoreId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.waveList=data.value;
          }
        });
      },
      //关闭新增配件弹窗
      close(){
        this.$emit('hideImportWareMask');
        this.$emit('fetchData');
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            if (index === 2) {
              sums[index] = '合计:';
              return;
            }else if(index === 5){
              var total=0;
              _this.dataList.forEach((val)=>{
                if(val.allotNum<0){
                  val.allotNum=0;
                }
                total=_this.AppUtils.add(total,val.allotNum);//精度处理
              });
              sums[index]=total;
              return
            }else if(index === 7){
              var total=0;
              this.dataList.forEach((val)=>{
                if(!val.outputTotalPrice){
                  val.outputTotalPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,val.outputTotalPrice);//精度处理
              });
              sums[index]=_this.AppUtils.decimal4(total);
              return ;
            }else if(index === 9){
              var total=0;
              this.dataList.forEach((val)=>{
                if(!val.outputTotalNoTaxPrice){
                  val.outputTotalNoTaxPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,val.outputTotalNoTaxPrice);//精度处理
              });
              sums[index]=_this.AppUtils.decimal4(total);
              return ;
            }
        });
        return sums;
      },
    },
    watch:{
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .addform{
    width: 1100px;
    padding-bottom: 0px;
    .addTitle{
      margin-bottom: 0px;
      .searchZone{
        width: 391px;
        .group{
          .left{
            width: 86px;
            margin-left: 10px;
          }
          .right{
            input{
              width: 200px;
              height: 33px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              padding-left: 10px;
            }
            .btn{
              margin-left: 10px;
              line-height: 30px;
            }
          }
        }
      }
    }
    .content{
      /*height: 400px;*/
      border-bottom: 1px solid #ccc;
      .right{
        width:1100px;
        /*height: 400px;*/
        /*float: left;*/
        .tableZone{
          /*height: 500px;*/
          .table_wrap{
            border-radius: 0px;
            margin-top: 0px;
          }
        }
      }
    }
    .closeBtn{
      height: 50px;
      position: relative;
      .btn{
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -15px;
      }
      .importBtn{
        left: 50%;
        transform:translateX(-50%);
        -ms-transform:translateX(-50%); 	/* IE 9 */
        -moz-transform:translateX(-50%); 	/* Firefox */
        -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
        -o-transform:translateX(-50%); 	/* Opera */
      }
    }
  }
</style>
