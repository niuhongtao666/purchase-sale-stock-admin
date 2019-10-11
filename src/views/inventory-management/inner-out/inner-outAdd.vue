<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="out-info_icon"></i>
        <h2>出库信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl11">业务类型</div>
            <div class="rightZone">
              内领出库
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>用途</div>
            <div class="rightZone resetInput">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.useType" filterable clearable>
                <el-option
                  v-for="item in useList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone"><i class="required">*</i>领用人</div>
            <div class="rightZone resetInput">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.userId" filterable clearable>
                <el-option
                  v-for="item in usersList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone">业务单号</div>
            <div class="rightZone resetInput">
              <el-input  placeholder="请输入业务单号" v-model.trim="model.dataNo"></el-input>
            </div>
          </div>
        </div>
        <div class="rowItem h90">
          <div class="left h90">
            <div class="leftZone flex1 h90 line-height90">备注</div>
            <div class="rightZone w480 f11 mark h90">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                v-model.trim="model.memo">
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="position: relative;">
      <!--<div class="accountPrice">数量: {{model.purchaseOrderInfoDTO.orderTotalNum}} 采购总价: {{model.purchaseOrderInfoDTO.orderTotalPrice}}</div>-->
      <div class="item">
        <i class="out-list_icon"></i>
        <h2>出库清单</h2>
      </div>
      <div class="btnZone">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts" >导入配件</button>
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.useOutputDetails"
              max-height="580"
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
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                min-width="60"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="100"
                key="7"
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.useNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.useNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <!--<input type="text"  v-model.number="scope.row.unitPrice" class="in" @input="getTotal(scope.row.goodsId,scope.row.useNum,scope.row.unitPrice)">-->
                  {{scope.row.unitPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="10"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.warehouseId" @change="clearLocation(scope.row.goodsId,scope.row.warehouseId,$event)" filterable clearable>
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
                min-width="180"
                key="11"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.warehouseId,$event)" filterable clearable>
                    <el-option
                      v-for="item in locationList"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationId">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="saveInfo">确认出库</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :isNewPart="true" :storeId="storeId"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  export default {
    name:'inner-out-add',
    components:{
    },
    computed:{
    },
    data(){
      return{
        model:{
          userId:null,//领用人ID
          useType:null,//用途
          memo:null,//备注
          dataNo:null,//业务单号
          useOutputDetails:[],//领用明细
        },
        //领用人列表
        usersList:[],
        //用途列表
        useList:[],
        importType:"innerReceiveImportGoods",//内领出库
        partMaskShow: false,//新增配件
        importShow:false,//导入配件显示状态
        suppliersList:[],//供应商列表
        isCheckedAll: false,
        checkList:[],
        checkStatus:false,
        status:false,
        savePrice:{},//保留原价
        cloneOrderId:'',//克隆id
        saveUnitprice:{},//保存修改后的原价
        appToOrderId:'',//采购申请转采购单id
        waveList:[],//仓库列表
        locationList:[],//库位列表
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
        storeId:null,//门店id
      }
    },
    mounted(){
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.storeId=userInfos['storeId'];
      //获取仓库
      this.getWave();
      //获取用途
      this.getUseTypes();
      //获取当前门店的所有用户信息：
      this.getAllUser();
    },
    methods:{
      getImportData(arg){
        ////console.log(arg);
          /*arg.forEach((val)=>{
            let index = checkDataExit(this.model.useOutputDetails, val);
           if (index > -1) {
              return this.AppUtils.confirm(`${val.goodsNo}配件已经添加,不能继续添加`, () => {
              })
            } else {
              this.model.useOutputDetails.push(val);
            }
          });*/
          for (let val of arg) {
            let index = checkDataExit(this.model.useOutputDetails, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
            val['unitPrice']=this.AppUtils.decimal4(val['costPrice']);
            val['totalPrice']=val['costTotal'];
          }
          this.model.useOutputDetails.push(...arg);
      },
      getAllUser(){
        this.$store.dispatch('getAllUser').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.usersList=data.value;
          }
        })
      },
      getUseTypes(){
        this.$store.dispatch('getUseTypes').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.useList=data.value;
          }
        })
      },
      addParts(data) {
        data['useNum']=data['applyNum'];
        data['warehouseId']=data['wavehouseId'];
        data['totalPrice']=this.AppUtils.mul(data['unitPrice'],data['useNum']);
        let index = checkDataExit(this.model.useOutputDetails, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.useOutputDetails[index].useNum += data.useNum;
            this.model.useOutputDetails[index]['totalPrice']=this.AppUtils.mul(this.model.useOutputDetails[index]['unitPrice'],this.model.useOutputDetails[index]['useNum']);
          })
        } else {
          this.model.useOutputDetails.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      clearLocation(goodsId,id,val){
        var _this=this;
        // this.waveList
        if(val){
          this.model.useOutputDetails.forEach((val,index)=>{
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
      getLocal(goodsId,id,e){
        ////console.log(id);
        ////console.log(e);
        var _this=this;
        if(e){
          this.getLocation(id);
        }else{
          this.model.useOutputDetails.forEach((val,index)=>{
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
                  _this.$set(_this.model.useOutputDetails,inde,value);
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
          this.$axios.get('/admin/base/locationInfo/listLocationByWaveId/'+arg).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              this.locationList=JSON.parse(JSON.stringify(data.value))
            }
          })
        }
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
      handleSelectionChange(val) {
        this.checkList=val;
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            if (index === 4) {
              sums[index] = '合计';
              return;
            }else if(index === 6){
              var total=0;
              this.model.useOutputDetails.forEach((val)=>{
                if(val.useNum<=0){
                  val.orderNum=1;
                }
                total=_this.AppUtils.add(total,val.useNum);//精度处理
              });
              if(total||total==0){
                sums[index]=total;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 8){
              var total=0;
              this.model.useOutputDetails.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
              });
              if(total||total==0){
                sums[index] =_this.AppUtils.decimal4(total);
              }else{
                sums[index]=0;
              }
              return ;
            }
        });
        return sums;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      saveInfo(){
        ////console.log(this.model);
        var errStr=[];
        if(this.model.useType){
          if(this.model.userId){
            if(this.model.useOutputDetails.length){
              var details=this.model.useOutputDetails;
              var warehouses=details.filter(item=>item.warehouseId=='');
              var locations=details.filter(item=>item.locationName=="");
              //console.dir(warehouses);
              //console.dir(locations);
              if(warehouses.length){
                warehouses.forEach((item)=>{
                  errStr.push(item['goodsNo']);
                })
              }
              if(locations.length){
                locations.forEach((item)=>{
                  errStr.push(item['goodsNo']);
                })
              }
              if(errStr.length){
                var str=errStr.join(',')
                ////console.log(str)
                this.AppUtils.alert('配件'+str+'的仓库或库位不存在');
              }else{
                this.$axios.post('/admin/stock/insideUseOutputInfo/add',this.model).then(res=>{
                  let data = this.AppUtils.checkResponse(res);
                  if(data) {
                    this.$message.success('新增出库单成功');
                    this.$router.push('/inventory-management/inner-out/detail/'+data.value.id);
                  }
                })
              }
            }else{
              this.AppUtils.alert('请在出库清单添加配件');
            }
          }else{
            this.AppUtils.alert('请选择领用人');
          }
        }else {
          this.AppUtils.alert('请选择用途');
        }
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.useOutputDetails,this.checkList);
        }
      },
      getTotal(id,useNum,unitPrice) {
        var _this = this;
        if (useNum) {
          if (useNum <= 0) {
            useNum = 1;
          }
          if (Math.floor(useNum) !== useNum) {
            this.AppUtils.alert('数量为正整数');
          }
        } else {
          useNum = 1;
        }
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            // this.AppUtils.alert('单价小数点位数最多两位');
            unitPrice=unitPrice.toFixed(4);
          }
        }
        if(parseFloat(unitPrice)<0){
          this.AppUtils.alert('单价不能为负');
        }
        if((typeof unitPrice!=='number')&&(unitPrice!=='')){
          ////console.log(unitPrice);
          ////console.log(typeof unitPrice);
        }else if(unitPrice===''){
          this.AppUtils.alert('请输入单价');
        }
        var totalPrice=this.AppUtils.mul(parseFloat(useNum),unitPrice);//精度处理
        if(totalPrice||totalPrice==0){
          this.model.useOutputDetails.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.useOutputDetails[index]['useNum']=useNum;
              _this.model.useOutputDetails[index]['totalPrice']=totalPrice;
              _this.model.useOutputDetails[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.useOutputDetails,index,_this.model.useOutputDetails[index])
            }
          });
        }else{
          this.model.useOutputDetails.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.useOutputDetails[index]['useNum']=useNum;
              _this.model.useOutputDetails[index]['totalPrice']=0;
              _this.$set(_this.model.useOutputDetails,index,_this.model.useOutputDetails[index])
            }
          });
        }
        this.changeNumPrice();
      },
      importParts(){
        this.importShow=true;
      },
      importHide(){
        this.importShow=false;
      },
      //获取供应商列表
      getSupplier(){
        this.$axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.suppliersList=data.value;
          }
        })
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.useOutputDetails.forEach((val,index)=>{
          if(val.useNum<=0){
            num=1;
          }else{
            num=val.useNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allOrderNum=_this.AppUtils.add(allOrderNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.totalPrice);//精度处理
        });
        if(allOrderNum){
          // this.model.purchaseOrderInfoDTO.orderTotalNum=allOrderNum;
        }
        if(allTotalPrice){
          // this.model.purchaseOrderInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .applicationInfo .row{
    width: 1015px!important;
  }
  .saveZone{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left:0px;
    bottom: 0px;
  }
  .saveBtn{
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 55%;
    bottom: 0px;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%); 	/* Opera */
  }
  .applicationInfo{
    padding-bottom: 23px;
    margin: 0 20px 20px;
    background: #fff;
    .accountPrice{
      position: absolute;
      top: 82px;
      right: 25px;
      color: #00BAFF;;
    }
    .btnZone{
      width: 275px;
      height: 30px;
    }
    .item {
      height: 70px;
      line-height: 70px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-left: 72px;
    }
    .row{
      border: 1px solid #ecf1f4;
      min-width: 1163px;
      margin-left: 25px;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        height: 49px;
        line-height: 49px;
        .left{
          flex: 1;
          height: 49px;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            width: 180px;
            height: 49px;
            float: left;
          }
        }
        .right{
          flex: 1;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            height: 49px;
            float: left;
          }
        }
      }
    }
  }
</style>
