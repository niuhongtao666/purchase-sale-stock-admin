<template>
  <div>
    <div class="zzc" v-if="applicateReturnShow">
      <form action="" class="addform" @submit.prevent="getData">
        <div class="addTitle">
          <div class="addUser" style="flex: 6;text-align: left">退货明细</div>
          <div class="searchZone" style="flex: 3;">
            <div class="group">
              <div class="right">
                <input type="text" placeholder="配件编号/生产编码/配件名称" v-model.trim="goodsNo">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="right">
            <div class="returnReason w400">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入退货原因"
                resize="none"
                maxlength="500"
                v-model.trim="model.purchaseReturnInfoDTO.returnReason"
              >
              </el-input>
            </div>
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll add">
                    <el-table
                      :data="dataList"
                      max-height="305"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                      :summary-method="getSummaries"
                      show-summary
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column
                        type="selection"
                        width="50"
                      >
                      </el-table-column>
                      <el-table-column
                        type="index"
                        label="序号"
                        key="2"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        label="配件编号"
                        min-width="170"
                        key="3"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="生产编码"
                        min-width="170"
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
                        min-width="160"
                        key="6"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单位"
                        min-width="60"
                        key="7"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="退货数量"
                        min-width="100"
                        key="8"
                      >
                        <template slot-scope="scope">
                          <input type="number" v-model.number="scope.row.valueReturnNum" style="width: 79px;" min="0" @input="getTotal(scope.row.goodsId,scope.row.valueReturnNum,scope.row.unitPrice,scope.row.noTaxUnitPrice,scope.row.id)">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="仓库"
                        min-width="180"
                        key="9"
                      >
                        <template slot-scope="scope">
                          <!--<el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)">
                            <el-option
                              v-for="item in waveList"
                              :key="item.wavehouseId"
                              :label="item.wavehouseName"
                              :value="item.wavehouseId">
                            </el-option>
                          </el-select>-->
                          <span>{{scope.row.inputWavehouseName}}</span>
                        </template>
                      </el-table-column>
                      <!--<el-table-column-->
                        <!--label="库位"-->
                        <!--min-width="180"-->
                        <!--key="9"-->
                      <!--&gt;-->
                        <!--<template slot-scope="scope">-->
                          <!--<el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)">-->
                            <!--<el-option-->
                              <!--v-for="item in locationList"-->
                              <!--:key="item.locationId"-->
                              <!--:label="item.locationName"-->
                              <!--:value="item.locationId">-->
                            <!--</el-option>-->
                          <!--</el-select>-->
                        <!--</template>-->
                      <!--</el-table-column>-->
                      <el-table-column
                        label="退货单价"
                        min-width="140"
                        key="10"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <span>{{scope.row.unitPrice | decimalTofixed10}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="退货总价"
                        min-width="140"
                        key="11"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.totalPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="退货单价(不含税)"
                        min-width="140"
                        key="12"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <span>{{scope.row.noTaxUnitPrice | decimalTofixed4}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="退货总价(不含税)"
                        min-width="140"
                        key="13"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.noTaxTotalPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="批次号"
                        min-width="180"
                        key="14"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.batchNo}}
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--<div class="pagination" v-if="dataList.length">
                    <nt-pagination ref="child" ></nt-pagination>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closeBtn">
          <button type="submit" class="btn importBtn" @click.prevent="returnGoods" v-if="buttonInfo.returnPurchaseNew">{{buttonInfo.returnPurchaseNew}}</button>
          <button type="submit" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'applicateReturnGoods',
    data(){
      return{
        model:{
          // importAccount:'',//入库数量
          // wavehouseId:'',//仓库id
          // locationId:'',//库位id
          purchaseReturnInfoDTO:{
            purchaseOrderId:'',//采购订单id
            returnTotalNum:null,//退货总数
            returnTotalPrice:null,//退货总金额
            // returnNoTaxTotalPrice:'',//不含税总金额
            returnNoTaxTotalPrice:null,//不含税总金额
            returnReason:null,//退货原因
          },
          purchaseReturnDetailDTOS:[]
        },
        dataList:[],
        waveList:[],//仓库列表
        locationList:[],//库位列表
        saveNum:{},//保留数量,不能超过
        transList:[],
        goodsNo:null,//搜索配件编号
        states:false,//能否点击申请退货
        // buttonInfo:{},//按钮权限
      }
    },
    props:{
      applicateReturnShow:Boolean,
      checkInputList:Array,
      purchaseOrderId:String
    },
    watch:{
      'applicateReturnShow'(newVal){
        if(newVal){
          this.goodsNo=null;
          this.model.purchaseReturnInfoDTO.returnTotalNum=null;
          this.model.purchaseReturnInfoDTO.returnTotalPrice=null;
          this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=null;
          this.model.purchaseReturnInfoDTO.returnReason=null;
          this.model.purchaseReturnDetailDTOS=[];
        }
      },
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(6);
      },
    },
    mounted(){
      // this.buttonInfo=this.AppUtils.returnPermissions(6);
    },
    methods:{
      handleSelectionChange(val) {
        ////console.log(val);
        var _this=this;
        this.transList=val;
        if(val['length']){
          this.states=true;
          var totalNumAll=0;
          var totalPriceAll=0;
          var noTaxTotalPriceAll=0
          val.forEach((value)=>{
            value['returnNum']=value['valueReturnNum'];
            value['purchaseOrderId']=value['inputInfoId'];
            value['purchaseOrderNo']=value['inputOrderNo'];
            value['totalPrice']=_this.AppUtils.decimal4(value['totalPrice']);
            value['noTaxTotalPrice']=_this.AppUtils.decimal4(value.noTaxTotalPrice);
            totalNumAll=_this.AppUtils.add(totalNumAll,_this.AppUtils.decimal4(value.valueReturnNum));
            totalPriceAll=_this.AppUtils.add(totalPriceAll,_this.AppUtils.decimal4(value.totalPrice));
            noTaxTotalPriceAll=_this.AppUtils.add(noTaxTotalPriceAll,value.noTaxTotalPrice);
            // _this.getTotal(value.goodsId,value.valueReturnNum,value.unitPrice,value.noTaxUnitPrice,val.id);
          })
          this.model.purchaseReturnDetailDTOS=JSON.parse(JSON.stringify(val));
          this.model.purchaseReturnInfoDTO.returnTotalNum=totalNumAll+'';
          this.model.purchaseReturnInfoDTO.returnTotalPrice=totalPriceAll+'';
          this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=noTaxTotalPriceAll+'';
        }else{
          this.states=false;
          this.model.purchaseReturnDetailDTOS=JSON.parse(JSON.stringify(val));
          this.model.purchaseReturnInfoDTO.returnTotalNum=null;
          this.model.purchaseReturnInfoDTO.returnTotalPrice=null;
          this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=null;
        }
      },
      getData(){
        var arr=this.dataList;
        ////console.log(arr);
        var _this=this;
        if(_this.goodsNo){
          this.dataList=[];
          arr.forEach((val,index)=>{
            if(val['goodsNo']==_this.goodsNo){
              // alert(val['goodsNo']);
              ////console.log(val);
              _this.dataList.push(val);
            }
          })
        }
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            if (index === 4) {
              sums[index] = '总价:';
              return;
            }else if(index === 7){
              /*var total=0;
              this.dataList.forEach((val,index)=>{
                ////console.log(val);
                ////console.log(val.valueReturnNum);
                if(val.valueReturnNum){
                  if(val.valueReturnNum<0){
                    val.valueReturnNum=0;
                  }
                }else{
                  val.valueReturnNum=0;
                  // _this.$set(this.dataList[index],'valueReturnNum',0);
                }
                total=_this.AppUtils.add(total,val.valueReturnNum);//精度处理
              });
              this.model.purchaseReturnInfoDTO.returnTotalNum=total;*/
              if(this.model.purchaseReturnInfoDTO.returnTotalNum||this.model.purchaseReturnInfoDTO.returnTotalNum===0){
                sums[index]=this.model.purchaseReturnInfoDTO.returnTotalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 10){
              /*var total=0;
              this.dataList.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,val.totalPrice);//精度处理
              });
              this.model.purchaseReturnInfoDTO.returnTotalPrice=total;*/
              if(this.model.purchaseReturnInfoDTO.returnTotalPrice||this.model.purchaseReturnInfoDTO.returnTotalPrice===0){
                sums[index] =_this.AppUtils.decimal2(this.model.purchaseReturnInfoDTO.returnTotalPrice);
              }else{
                sums[index]=0;
              }
              // sums[index]=0;
              return ;
            }else if(index === 12){
              /*var total=0;
              this.dataList.forEach((val)=>{
                if(!val.noTaxTotalPrice){
                  val.noTaxTotalPrice=0;
                }
                // total+=parseFloat(val.currentStock);//精度注释
                total=_this.AppUtils.add(total,val.noTaxTotalPrice);//精度处理
              });
              this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=total;*/
              if(this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice||this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice===0){
                sums[index] =_this.AppUtils.decimal2(this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice);
              }else{
                sums[index]=0;
              }
              // sums[index]=0;
              return ;
            }
        });
        return sums;
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      // change(arg){
      //   ////console.log(arg);
      //   this.getLocation(arg)
      // },
      /*clearLocation(inde,val){
        ////console.log(inde);
        var _this=this;
        // this.waveList
        if(!val){
          ////console.log(this.dataList[inde]['inputWavehouseId']);
          this.waveList.forEach((val)=>{
            if(val.wavehouseId==this.dataList[inde]['inputWavehouseId']){
              _this.dataList[inde]['inputWavehouseName']=val.wavehouseName;
            }
          });
          ////console.log(this.dataList[inde]['inputWavehouseName']);
        }else{
          this.dataList[inde]['inputLocationName']='';
        }
      },*/
      clearLocation(goodsId,id,va){
        ////console.log(id);
        ////console.log(goodsId);
        var _this=this;
        // this.waveList
        if(va){
          this.dataList.forEach((val,index)=>{
            var valu=val;
            if(val['goodsId']===goodsId){
              _this.waveList.forEach((val)=>{
                if(val.wavehouseId==id){
                  valu['wavehouseName']=val.wavehouseName;
                  valu['locationName']=''
                }
              });
            }
          })
        }
      },
      //获取库位
      /*getLocal(ind,val){
        ////console.log(val);
        ////console.log(ind)
        var _this=this;
        if(val){
          ////console.log(this.dataList[ind]['inputWavehouseId'])
          this.getLocation(this.dataList[ind]['inputWavehouseId']);
        }else{
          ////console.log(this.dataList[ind]['inputLocationName']);
          this.locationList.forEach((val)=>{
            if(val.locationId==_this.dataList[ind]['inputLocationName']){
              _this.dataList[ind]['inputLocationId']=val.locationId;
              _this.dataList[ind]['inputLocationName']=val.locationName;
            }
          });
        }
      },*/
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
                  _this.$set(_this.dataList,inde,value);
                }
              });
            }
          })
        }
      },
      //申请退货
      returnGoods(){
        ////console.log(this.model);
        this.model.purchaseReturnInfoDTO.purchaseOrderId=this.purchaseOrderId;
        if(this.dataList.length){
          if(!this.model.purchaseReturnDetailDTOS.length){
            this.AppUtils.alert('请先进行勾选');
          }else{
            if(this.states){
              this.$axios.post('/admin/purchase/purchaseReturnInfo/returnPurchaseNew',this.model).then(res=>{
                let data = this.AppUtils.checkResponse(res);
                if(data) {
                  ////console.log(data);
                  this.$message.success('申请退货成功');
                  this.$emit('applicateToReturnHide');
                  this.$emit('clearInputList');
                  this.$emit('fetchData');
                }
              })
            }else{
              this.AppUtils.alert('请先进行勾选');
            }
          }
        }else{
          this.$message.error('退货明细中没有可申请退货的配件');
        }
      },
      getTotal(id,valueReturnNum,unitPrice,noTaxUnitPrice,specialId) {
        ////console.log('嘿哈')
        ////console.log(this.saveNum);
        ////console.log(specialId);
        var _this = this;
        if (valueReturnNum) {
          if (valueReturnNum <0) {
            valueReturnNum = 0;
          }
          if (Math.floor(valueReturnNum) !== valueReturnNum) {
            this.AppUtils.alert('退货数量为整数');
          }
          if(this.saveNum[specialId]<valueReturnNum){
              _this.AppUtils.alert('退货数量不能超过配件的入库数量');
              this.dataList.forEach((val)=>{
                if(val['id']==specialId){
                  val['valueReturnNum']=_this.saveNum[specialId];
                  valueReturnNum=_this.saveNum[specialId];
                }
              });
          }
        } else {
          valueReturnNum = 0;
        }
        ////console.log(valueReturnNum);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        // alert(noTaxUnitPrice);
        var totalPrice=_this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(valueReturnNum),unitPrice));//精度处理
        var noTaxTotalPrice=_this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(valueReturnNum),noTaxUnitPrice));//精度处理
        if(totalPrice||totalPrice==0){
          this.dataList.forEach((val,index)=>{
            if(val['id']==specialId){
              _this.dataList[index]['totalPrice']=totalPrice;
              _this.dataList[index]['returnNum']=valueReturnNum;
              _this.$set(_this.dataList,index,_this.dataList[index])
            }
          });
        }else{
          this.dataList.forEach((val,index)=>{
            if(val['id']==specialId){
              _this.dataList[index]['totalPrice']=0;
              _this.dataList[index]['returnNum']=valueReturnNum;
              _this.$set(_this.dataList,index,_this.dataList[index])
            }
          });
        }
        if(noTaxTotalPrice||noTaxTotalPrice==0){
          this.dataList.forEach((val,index)=>{
            if(val['id']==specialId){
              _this.dataList[index]['noTaxTotalPrice']=noTaxTotalPrice;
              _this.dataList[index]['returnNum']=valueReturnNum;
              _this.$set(_this.dataList,index,_this.dataList[index])
            }
          });
        }else{
          this.dataList.forEach((val,index)=>{
            if(val['id']==specialId){
              _this.dataList[index]['noTaxTotalPrice']=0;
              _this.dataList[index]['returnNum']=valueReturnNum;
              _this.$set(_this.dataList,index,_this.dataList[index])
            }
          });
        }
        ////console.log(this.dataList);
        this.dataList.forEach((val,index)=>{
          if(val['id']==specialId){
            _this.model.purchaseReturnDetailDTOS.forEach((value,inde)=>{
              if(value['id']==specialId){
                _this.model.purchaseReturnDetailDTOS.splice(inde,1,_this.dataList[index]);
              }
            });
          }
        });
        // this.model.purchaseReturnDetailDTOS=JSON.parse(JSON.stringify(this.dataList));//新修改
        this.changeNumPrice();
      },
      changeNumPrice(){
        ////console.log(this.transList);
        var allvalueReturnNum=0;
        var allTotalPrice=0;
        var allNoTaxTotalPrice=0;
        var num;
        var _this=this;
        this.transList.forEach((val,index)=>{
          if(val.valueReturnNum<0){
            num=0;
          }else{
            num=val.valueReturnNum;
          }
          allvalueReturnNum=_this.AppUtils.add(allvalueReturnNum,parseFloat(num));//精度处理
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.totalPrice);//精度处理
          allNoTaxTotalPrice=_this.AppUtils.add(allNoTaxTotalPrice,val.noTaxTotalPrice);//精度处理
        });
        if(allvalueReturnNum){
          this.model.purchaseReturnInfoDTO.returnTotalNum=allvalueReturnNum;
        }else{
          this.model.purchaseReturnInfoDTO.returnTotalNum=0;
        }
        if(allTotalPrice){
          this.model.purchaseReturnInfoDTO.returnTotalPrice=allTotalPrice;
        }else{
          this.model.purchaseReturnInfoDTO.returnTotalPrice=0;
        }
        if(allNoTaxTotalPrice){
          this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=allNoTaxTotalPrice;
        }else{
          this.model.purchaseReturnInfoDTO.returnNoTaxTotalPrice=0;
        }
      },
      //关闭新增配件弹窗
      close(){
        // this.dataList=[];
        this.model.purchaseReturnInfoDTO.returnReason=null;
        this.$emit('applicateToReturnHide');
        this.$emit('clearInputList');
        this.$emit('fetchData');
      },
      getDetail(arg){
        ////console.log(arg)
        var _this=this;
        this.$axios.post('/admin/purchase/purchaseReturnInfo/inputDetailByIds',arg).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.dataList=JSON.parse(JSON.stringify(data.value.inputDetails));
            if(!this.dataList.length){
              _this.$message.error('退货明细中没有可申请退货的配件');
            }
            this.dataList.forEach((val)=>{
              this.saveNum[val['id']]=val['valueReturnNum'];
              val['stockInputDetailId']=val['id'];
              val['stockInputInfoId']=val['inputInfoId'];
              val['stockInputInfoNo']=val['inputOrderNo'];
              val['unitPrice']=val['unitPrice'];
              val['noTaxUnitPrice']=val['noTaxUnitPrice'];
              val['totalPrice']=_this.AppUtils.mul(val['valueReturnNum'],val['unitPrice']);
              val['noTaxTotalPrice']=_this.AppUtils.mul(val['valueReturnNum'],val['noTaxUnitPrice']);
            });
          }
        })
      },
      //获取仓库
      getWave(){
        this.$axios.get('/admin/base/wavehouse/userStoreList').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.waveList=JSON.parse(JSON.stringify(data.value))
          }
        })
      },
      //获取库位
      getLocation(arg){
        ////console.log(arg);
        if(arg){
         if(!arg){
            this.AppUtils.alert('请先选择仓库');
          }else{
            this.$axios.get('/admin/base/locationInfo/listLocationByWaveId/'+arg).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                ////console.log(data);
                this.locationList=JSON.parse(JSON.stringify(data.value))
              }
            })
          }
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
              height: 30px;
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
      border-bottom: 1px solid #ccc;
      .right{
        width: 900px;
        .returnReason{
          height: 60px;
          padding: 10px;
        }
        .tableZone{
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
