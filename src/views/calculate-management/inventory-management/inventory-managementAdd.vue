<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="cal-info_list"></i>
        <h2>盘点信息</h2>
      </div>
      <div class="row w904">
        <div class="rowItem h90 borderBottom">
          <div class="left h90">
            <div class="leftZone h90 line-height90"><i class="required">*</i>盘点类型</div>
            <div class="rightZone mt20">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.checkType" filterable clearable >
                <el-option
                  v-for="item in checkTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left h90 f2">
            <div class="leftZone h90 line-height90">备注</div>
            <div class="rightZone f4">
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
      <div class="item">
        <i class="cal-list_icon"></i>
        <h2>盘点清单</h2>
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
              :data="model.checkOrderDetailDTOS"
              max-height="582"
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
                min-width="50"
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
                  <input type="number" v-model.number="scope.row.checkNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.checkNum,scope.row.checkPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价(不含税)"
                min-width="130"
                key="8"
              >
                <template slot-scope="scope">
                  <!--<input type="text"  v-model="scope.row.checkPrice" class="in"  min='0' step='0.1' @input="getTotal(scope.row.goodsId,scope.row.checkNum,scope.row.checkPrice)">-->
                  {{scope.row.checkPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本总价(不含税)"
                min-width="130"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="仓库"
                min-width="180"
                key="10"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)" filterable clearable>
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
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName" @visible-change="getLocal(scope.row.goodsId,scope.row.wavehouseId,$event)" filterable clearable>
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
        <button type="button" class="btn" @click="saveInfo" >提交申请</button>
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
    name:'procurement-order-add',
    components:{
      // importParts
    },
    data(){
      return{
        model:{
          checkType:null,//盘点类型
          checkTotalNum:null,//盘点总数
          checkTotalPrice:null,//盘点总价
          memo:null,//备注
          checkOrderDetailDTOS:[],//盘点单明细
        },
        importType:'stockProfitImportGoods',// "
        partMaskShow: false,//新增配件
        importShow:false,//导入配件显示状态
        suppliersList:[],//供应商列表
        isCheckedAll: false,
        checkList:[],
        checkStatus:false,
        status:false,
        savePrice:{},//保留原价
        saveUnitprice:{},//保存修改后的原价
        appToOrderId:'',//采购申请转采购单id
        waveList:[],//仓库列表
        locationList:[],//库位列表
        saveNum:{},//保留数量，数量只能往低了改，不能往高了改
        buttonInfo:{},//按钮权限
        storeId:null,//门店id
        checkTypeList:[
          {
            id:1,
            name:'盘亏出库'
          },
          {
            id:2,
            name:'盘盈入库'
          }
        ],//盘点类型
      }
    },
    mounted(){
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.storeId=userInfos['storeId'];
      this.getWave();
      /*if(JSON.parse(localStorage.getItem("buttonInfo"))!=null){
        this.buttonInfo=JSON.parse(localStorage.getItem("buttonInfo"));
      }
      ////console.log(this.buttonInfo);
     */
    },
    methods:{
      setCheckType(arg){
        if(arg){
          if(arg==1){
            this.importType='stockLossImportGoods';
          }else if(arg==2){
            this.importType='stockProfitImportGoods';
          }
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      getImportData(arg){
        /*////console.log(arg);
        if(arg.length){
          arg.forEach((val)=>{
            val['totalPrice']=this.AppUtils.mul(val['unitPrice'],val['orderNum']);
            let index = checkDataExit(this.model.purchaseOrderDetailDTOS,val);
            if (index > -1) {
              return this.AppUtils.confirm(`${val.goodsNo}配件已经添加,不能继续添加`, () => {
              })
            } else {
              this.model.purchaseOrderDetailDTOS.push(val);
            }
          });
          ////console.log(this.model.purchaseApplyDetailDTOS);
        }*/
      },
      getImportData(arg) {
        ////console.log(arg);
        if (arg.length) {
          for (let val of arg) {
            let index = checkDataExit(this.model.checkOrderDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
            val['checkPrice']=val['unitPrice'];
            // if(val['outputTotalPrice']){
            //   val['totalPrice']=val['outputTotalPrice'];
            // }
            // if(val['inputTotalPrice']){
            //   val['totalPrice']=val['inputTotalPrice'];
            // }
            ////console.log(val['checkPrice']);
            ////console.log(val['checkNum']);
            val['totalPrice']=this.AppUtils.mul(val['checkPrice'],val['checkNum']);
            ////console.log(val['totalPrice']);
          }
          this.model.checkOrderDetailDTOS.push(...arg);
        }
      },
      addParts(data) {
        ////console.log(data);
        data['checkNum']=data['applyNum'];
        data['checkPrice']=data['unitPrice']
        data['totalPrice']=this.AppUtils.mul(data['checkPrice'],data['checkNum']);
        let index = checkDataExit(this.model.checkOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.checkOrderDetailDTOS[index].checkNum += data.checkNum;
            this.model.checkOrderDetailDTOS[index]['totalPrice']=this.AppUtils.mul(this.model.checkOrderDetailDTOS[index]['checkPrice'],this.model.checkOrderDetailDTOS[index]['checkNum']);
          })
        } else {
          this.model.checkOrderDetailDTOS.push(data);
        }
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      clearLocation(goodsId,id,va){
        ////console.log(id);
        ////console.log(goodsId);
        var _this=this;
        // this.waveList
        if(va){
          ////console.log(this.model.checkOrderDetailDTOS)
          this.model.checkOrderDetailDTOS.forEach((val,index)=>{
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
          this.model.checkOrderDetailDTOS.forEach((val,index)=>{
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
                  _this.$set(_this.model.checkOrderDetailDTOS,inde,value);
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
              _this.model.checkOrderDetailDTOS.forEach((val)=>{
                ////console.log(val);
                ////console.log(val.checkNum);
                if(val.checkNum<=0){
                  val.checkNum=1;
                }
                total=_this.AppUtils.add(total,parseFloat(val.checkNum));//精度处理
              });
              _this.model.checkTotalNum=total;
              if(_this.model.checkTotalNum||_this.model.checkTotalNum==0){
                sums[index] =_this.model.checkTotalNum;
              }else{
                sums[index]=0;
              }
              return
            }else if(index === 8){
              var total=0;
              this.model.checkOrderDetailDTOS.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,parseFloat(val.totalPrice));//精度处理
              });
              _this.model.checkTotalPrice=total;
              if(this.model.checkTotalPrice||this.model.checkTotalPrice==0){
                sums[index] =this.model.checkTotalPrice;
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
        if(this.model.checkType){
          if(this.model.checkOrderDetailDTOS.length){
            this.$axios.post('/admin/stock/stockCheckOrderInfo/add',this.model).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                ////console.log(data);
                this.$message.success('新增盘点单成功');
                this.$router.push('/calculate-management/inventory-management/detail/'+data.value);
              }
            })
          }else{
            this.AppUtils.alert('请在盘点清单新增配件');
          }
        }else{
          this.AppUtils.alert('请选择盘点类型');
        }
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.checkOrderDetailDTOS,this.checkList);
        }
      },
      getTotal(id,checkNum,checkPrice) {
        var _this = this;
        if (checkNum) {
          if (checkNum <= 0) {
            checkNum = 1;
          }
          if (Math.floor(checkNum) !== checkNum) {
            this.AppUtils.alert('请购数量为正整数');
            checkNum=Math.floor(checkNum);
          }
        } else {
          checkNum = 1;
        }
        /*if(_this.saveNum[id]){
          this.model.purchaseOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              ////console.log(_this.model.purchaseOrderDetailDTOS[index]['orderNum']);
              ////console.log(_this.saveNum[id])
              if(_this.model.purchaseOrderDetailDTOS[index]['orderNum']>_this.saveNum[id]){
                _this.AppUtils.alert('配件数量只能往低了改，不能往高了改')
                _this.model.purchaseOrderDetailDTOS[index]['orderNum']=_this.saveNum[id];
                orderNum=_this.saveNum[id];
              }
            }
          });
        };*/
        var str = '' + checkPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            // this.AppUtils.alert('单价小数点位数最多两位');
            // str=str.substring(0,str.length-1);
            // unitPrice=parseFloat(str);
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            checkPrice=0;
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            checkPrice=0;
          }
        }
        if(checkPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          checkPrice=Math.abs(checkPrice);
        }
        if((checkPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入单价');
          checkPrice=0;
        }
        ////console.log(checkNum);
        ////console.log(checkPrice);
        var totalPrice=this.AppUtils.mul(parseFloat(checkNum),checkPrice);//精度处理
        ////console.log(totalPrice);
        ////console.log(typeof this.model.checkOrderDetailDTOS)
        if(totalPrice||totalPrice==0){
          this.model.checkOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.checkOrderDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.checkOrderDetailDTOS[index]['checkPrice']=checkPrice;
              _this.$set(_this.model.checkOrderDetailDTOS,index,_this.model.checkOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.checkOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.checkOrderDetailDTOS[index]['totalPrice']=0;
              _this.$set(_this.model.checkOrderDetailDTOS,index,_this.model.checkOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      importParts(){
        // if(this.model.checkType){
        //   this.importShow=true;
        // }else{
        //   this.AppUtils.alert('请先选择盘点类型');
        // }
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allCheckNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.checkOrderDetailDTOS.forEach((val,index)=>{
          if(val.checkNum<=0){
            num=1;
          }else{
            num=val.checkNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allCheckNum=_this.AppUtils.add(allCheckNum,num);//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.totalPrice);//精度处理
        });
        if(allCheckNum){
          this.model.checkTotalNum=allCheckNum;
        }
        if(allTotalPrice){
          this.model.checkTotalPrice=allTotalPrice;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
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
      width: 900px;
      margin-left: 25px;
      border-bottom: none;
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
