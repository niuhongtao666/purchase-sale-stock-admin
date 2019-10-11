<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser" style="flex: 4;text-align: left">调拨明细</div>
          <div class="searchZone" style="flex: 3;margin-right: 23px;">
            <div class="group">
              <span class="left" style="margin-right: 10px;">税率</span>
              <span class="right">
                <el-select placeholder="请选择" class="el_box" v-model="taxRate">
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
                        key="2"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        label="配件编号"
                        min-width="140"
                        key="3"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="生产编码"
                        min-width="140"
                        key="4"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsVendorNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件名称"
                        min-width="160"
                        key="5"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件品牌"
                        min-width="120"
                        key="6"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单位"
                        width="50"
                        key="7"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="出库数量"
                        min-width="100"
                        key="8"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.allotNum}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="实际库存"
                        min-width="80"
                        key="9"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.currentStock}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="锁定库存"
                        min-width="80"
                        key="10"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.lockStock}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="仓库"
                        width="180"
                        key="11"
                      >
                        <template slot-scope="scope">
                          <el-select placeholder="请选择" class="el_box" v-model="scope.row.wavehouseId" @change="changeWave(scope)" clearable filterable>
                            <el-option
                              v-for="item in waveList"
                              :key="item.wavehouseId"
                              :label="item.wavehouseName"
                              :value="item.wavehouseId">
                            </el-option>
                          </el-select>
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
          <button type="submit" class="btn importBtn" @click.prevent="confirmOut">确认出库</button>
          <button type="submit" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'outWare',
    data(){
      return{
        model:{
          id:null,//调拨单ID
          likeName:null,//搜索配件编号/生产编码/配件名称
        },
        taxRate:13,//税率
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
        allotOrderDetailList:[],
      }
    },
    mounted(){
      this.model.id=this.allocationId;
      //获取仓库
      this.getWave();
      this.fetchData();//获取确认出库列表信息
    },
    props:{
      // importWareList:Array,
      // purchaseOrderId:String
      outId:Number,
      allocationId:String,//调拨单id
    },
    methods:{
      changeWave(data){
        //console.dir(data);
        this.allotOrderDetailList[data.$index]['wavehouseId']=data.row.wavehouseId;
        this.getCurrentStock(data.row,data.$index);
      },
      getCurrentStock(data,index){
        var obj={
          goodsId:data.goodsId,
          storeId:this.outId,
          wavehouseId:data.wavehouseId
        }
        this.$axios.post('/admin/stock/numInfo/stockNum',obj).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList[index]['currentStock']=data.value;
          }
        })
      },
      //确认出库
      confirmOut(){
        var outInfo={
          allotOrderId:this.allocationId,
          taxRate:this.taxRate,
          allotOrderDetailList:this.allotOrderDetailList,
        }
        var nullWave=outInfo.allotOrderDetailList.filter(item=>!item['wavehouseId']);
        //console.dir(nullWave)
        if(!nullWave.length){
          this.beforeConfirmOut(outInfo);
        }else{
          var str='';
          nullWave.forEach((item)=>{
            str+=item['goodsNo']+',';
          })
          str=str.substr(0,str.length-1);
          this.$message.error('配件'+str+'的仓库不存在');
        }
      },
      beforeConfirmOut(infos){
        this.$axios.post('/admin/stock/allotOutputOrderInfo/judgeOutputPrice',infos).then(res=>{
          if(res.data.code==10000){
            this.$emit('outWarehouse',infos);
          }else if(res.data.code==20003){
            this.AppUtils.alert(res.data.subMessage);
          }else if(res.data.code==12000){
            // console.log(res)
            this.AppUtils
            .confirm(res.data.subMessage,
              () => {
                this.$emit('outWarehouse',infos);
              },()=>{

              })
          }
        })
      },
      //获取确认出库列表信息
      fetchData(){
        this.$axios.post('/admin/stock/allotOrderInfo/getAllotDetailList',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList=data.value;
            var _this=this;
            this.dataList.forEach((item,index)=>{
              var obj={};
              obj['id']=item['id'];
              obj['wavehouseId']=item['wavehouseId'];
              obj['goodsNo']=item['goodsNo'];
              _this.allotOrderDetailList.push(obj);
              // _this.allotOrderDetailList[index]['wavehouseId']=item['wavehouseId'];
            });
          }
        })
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.importWareList.forEach((val,index)=>{
          if(val.noWavehosueNum<=0){
            num=1;
          }else{
            num=val.noWavehosueNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allOrderNum=_this.AppUtils.add(allOrderNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.noWavehosuePrice);//精度处理
        });
        if(allOrderNum){
          // this.importWareList.orderTotalNum=allOrderNum;
        }
        if(allTotalPrice){
          // this.importWareList.orderTotalPrice=allTotalPrice;
        }
      },
      getLocal(goodsId,id,e){
        ////console.log(id);
        ////console.log(e);
        var _this=this;
        if(e){
          this.getLocation(id);
        }else{
          this.importWareList.forEach((val,index)=>{
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
      clearLocation(goodsId,id,va){
        var _this=this;
        // this.waveList
        ////console.log(goodsId);
        ////console.log(id);
        ////console.log(va);
        if(va){
          this.dataList.forEach((val,index)=>{
            var valu=val;
            if(val['goodsId']===goodsId){
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
        this.$store.dispatch('fetchWarehousetByByStoreId',this.outId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.waveList=data.value;
          }
        });
      },
      //关闭新增配件弹窗
      close(){
        this.$emit('hideConfirmOutMask');
        // this.$emit('fetchData');
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
            if (index === 3) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              var total=0;
              _this.dataList.forEach((val)=>{
                if(val.allotNum<0){
                  val.allotNum=1;
                }
                total=_this.AppUtils.add(total,val.allotNum);//精度处理
              });
              sums[index]=total;
              return
            }
        });
        return sums;
      },
    },
    watch:{
      'importWareShow'(newVal,oldVal){
        if(newVal){
          ////console.log('确认出库弹层显示');
          this.model.likeName=null;
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .addform{
    width: 900px;
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
        width: 900px;
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
