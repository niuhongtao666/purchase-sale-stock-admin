<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="allot-info_icon"></i>
        <h2>调拨信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone h-49"><i class="required">*</i>调出门店</div>
            <div class="rightZone">
              <!--<el-select
                v-model.trim="model.allotOutStoreId"
                class="el_box"
                clearable
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in storeOutList"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeId"
                >
                </el-option>
              </el-select>-->
              {{allotOutStoreName}}
            </div>
          </div>
          <div class="right h-49">
            <div class="leftZone h-49"><i class="required">*</i>调入门店</div>
            <div class="rightZone">
              <el-select
                v-model.trim="model.allotInputStoreId"
                class="el_box"
                clearable
                filterable
                placeholder="请输入调入门店"
                :loading="loading"
                remote
                :remote-method="remoteMethod"
                @visible-change="clearInStores"
                @change="clearNone"
              >
                <el-option
                  v-for="item in storeInList"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeId">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="rowItem h90 borderBottom">
          <div class="left h90">
            <div class="leftZone h90 line-height90">备注</div>
            <div class="rightZone w480 h90">
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
    <div class="applicationInfo">
      <div class="item">
        <i class="allot-list_icon"></i>
        <h2>调拨清单</h2>
      </div>
      <div class="btnZone">
        <button type="button" class="btn mr10" @click="addNew">新增</button>
        <button type="button" class="btn mr10" @click="importParts">导入配件</button>
        <button type="button" class="cancelBtn" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding: 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.allotOrderDetailDTOS"
              max-height="502"
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
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                min-width="175"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="175"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="175"
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
                min-width="60"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                min-width="80"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.allotNum" class="in" min="0" @input="getTotal(scope.row.goodsId,scope.row.allotNum,scope.row.allotPrice,scope.row.currentStock)" style="width: 58px!important;">
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
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="调拨价(含税)"
                min-width="110"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.allotPrice" class="in"  min='0' step='0.1' @input="getTotal(scope.row.goodsId,scope.row.allotNum,scope.row.allotPrice,scope.row.currentStock)">
                </template>
              </el-table-column>
              <el-table-column
                label="总价(含税)"
                min-width="110"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.allotTotalPrice | decimalTofixed4}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click.prevent="saveInfo">保存</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :isNewPart="true" :storeId="storeId"></part-add>
    <!--<importParts :importShow="importShow" @change="change"></importParts>-->
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType" :storeId="model.allotOutStoreId"></importParts>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  export default {
    name:'parts-allocation-add',
    components:{
      // importParts
    },
    computed:{
    },
    data(){
      return{
        model:{
          allotOutStoreId:null,//调出门店Id
          allotInputStoreId:null,//调入门店Id
          allotTotalNum:null,//调拨总数
          allotTotalPrice:null,//调拨总价
          memo:null,//备注
          allotOrderDetailDTOS:[]//调拨明细
        },
        partMaskShow: false,//新增配件
        importType:"allotOrderImportGoods",//调拨导入配件
        checkList:[],//选中列表
        importShow:false,//导入配件显示状态
        dataList:[],//认购清单列表
        suppliersList:[],
        // 初始化全选按钮, 默认不选
        cloneId:'',//克隆id
        savePrice:{},//保留原价
        saveUnitprice:{},//保存修改后的原价
        storeOutList:[],//调出门店
        storeInList:[],//调入门店
        storesList:[],//所有门店
        storeId:null,//门店id
        allotOutStoreName:null,//调出门店名
        loading: false,
      }
    },
    mounted(){
      // this.allotOutputStores();//获取调拨出门店
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      // this.storeName=userInfos['storeName'];
      // this.userStoreId=userInfos['storeId'];
      // this.storeOutList.push(
      //   {
      //     "storeName":userInfos['storeName'],
      //     "storeId":userInfos['storeId']
      //   },
      // );
      this.model.allotOutStoreId=userInfos['storeId'];
      this.allotOutStoreName=userInfos['storeName'];
      this.allotAllStores();//获取所有门店
    },
    methods:{
      remoteMethod(query) {
        if (query !== ''&&(query.length>1||query.length==1)) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            var storeList=[];
            storeList = this.storesList.filter(item => {
              return item.storeName.indexOf(query)>-1;
            });
            this.storeInList=storeList.slice(0,10);
          }, 200);
        } else {
          this.storeInList= [];
        }
      },
      clearNone(arg){
        if(!arg){
          this.storeInList= [];
          this.model.allotInputStoreId=null;
        }
      },
      clearInStores(arg){
        if(!arg&&!this.model.allotInputStoreId){
          this.storeInList= [];
          this.model.allotInputStoreId=null;
        }
      },
      addNew(){
        if(this.model.allotOutStoreId){
          this.storeId=this.model.allotOutStoreId;
          this.partMaskShow=true;
        }else{
          // var userInfos=JSON.parse(localStorage.getItem('userInfos'));
          // this.storeId=userInfos['storeId'];
          this.AppUtils.alert('请先选择调出门店');
        }
      },
      getImportData(arg) {
        ////console.log(arg);
        if (arg.length) {
          for (let val of arg) {
            let index = checkDataExit(this.model.allotOrderDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.allotOrderDetailDTOS.push(...arg);
        }
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      //获取调拨出门店
      allotOutputStores(){
        this.$store.dispatch('allotOutputStores').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.storeOutList=data.value;
        });
      },
      //获取所有门店
      allotAllStores(){
        this.$store.dispatch('fetchStoresList').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          ////console.log(data);
          this.storesList=data.value;
        });
      },
      addParts(data) {
        data['allotPrice']=this.AppUtils.decimal4(data['unitTaxPrice']);//给调拨价赋值
        // if(parseFloat(data['allotPrice'])<0){
        //   this.AppUtils.alert('调拨价不能为负');
        // }
        // alert(data['allotPrice'])
        data['allotNum']=data['applyNum'];//给数量赋值
        data['allotTotalPrice']=this.AppUtils.mul(data['allotPrice'],data['allotNum']);
        let index = checkDataExit(this.model.allotOrderDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.allotOrderDetailDTOS[index].allotNum += data.applyNum;
            var numSub=this.AppUtils.numSub(parseFloat(this.model.allotOrderDetailDTOS[index]['currentStock']),0);
            if(this.model.allotOrderDetailDTOS[index].allotNum>numSub){
              this.AppUtils.alert('调拨配件数量<=实际库存-锁定库存');
              this.model.allotOrderDetailDTOS[index].allotNum=numSub;
            }
            // this.model.allotOrderDetailDTOS[index]['totalPrice']=this.AppUtils.mul(this.model.allotOrderDetailDTOS[index]['allotPrice'],this.model.allotOrderDetailDTOS[index]['allotNum']);
            this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=this.AppUtils.mul(this.model.allotOrderDetailDTOS[index]['allotPrice'],this.model.allotOrderDetailDTOS[index]['allotNum']);
          })
        } else {
          this.model.allotOrderDetailDTOS.push(data);
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
            sums[index] = '合计';
            return;
          }else if(index === 7){
            var total=0;
            this.model.allotOrderDetailDTOS.forEach((val)=>{
              if(val.allotNum<=0){
                val.allotNum=0;
              }
              total=_this.AppUtils.add(total,val.allotNum);//精度处理
            });
            this.model.allotTotalNum=total;
            if(this.model.allotTotalNum||this.model.allotTotalNum==0){
              sums[index]=this.model.allotTotalNum;
            }else{
              sums[index]=0;
            }
            return
          }else if(index === 8) {
            var total=0;
            this.model.allotOrderDetailDTOS.forEach((val)=>{
              if(!val.currentStock){
                val.currentStock=0;
              }
              total=_this.AppUtils.add(total,val.currentStock);//精度处理
            });
            sums[index]=total;
            return
          }
          else if(index === 9){
            sums[index]=0;
            return ;
          }else if(index === 11){
            var total=0;
            this.model.allotOrderDetailDTOS.forEach((val)=>{
              if(!val.allotTotalPrice){
                val.allotTotalPrice=0;
              }
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.allotTotalPrice));//精度处理
            });
            this.model.allotTotalPrice=_this.AppUtils.decimal4(total);
            if(this.model.allotTotalPrice||this.model.allotTotalPrice==0){
              sums[index]=this.model.allotTotalPrice;
            }else{
              sums[index]=0;
            }
            return
          }
        });

        return sums;
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      handleSelectionChange(val) {
        this.checkList=val;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.allotOrderDetailDTOS,this.checkList);
        }
      },
      saveInfo(){
        ////console.log(this.model);
        if(this.model.allotOrderDetailDTOS.length){
          this.$axios.post('/admin/stock/allotOrderInfo/add',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              this.$message.success('新增配件调拨单成功');
              this.$router.push('/allocation-management/parts-allocation/detail/'+data.value);
            }
          })
        }else{
         this.AppUtils.alert('请选择配件添加到调拨清单');
        }
      },
      getTotal(id,allotNum,allotPrice,currentStock) {
        var _this = this;
        if (allotNum) {
          if (allotNum <=0) {
            allotNum = 0;
          }
          if (Math.floor(allotNum)!=allotNum) {
            ////console.log(allotNum);
            this.AppUtils.alert('数量为整数');
            allotNum=Math.floor(allotNum);
          }
        } else {
          allotNum = 0;
        }
        var str = '' + allotPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('调拨价小数点位数最多4位');
            str=str.substring(0,str.length-1);
            allotPrice=parseFloat(str);
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调拨价');
            str=str.substring(1,str.length);
            allotPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调拨价');
            allotPrice=0;
          }
        }
        if(allotPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          allotPrice=Math.abs(allotPrice);
        }
        if((allotPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入调拨价');
          allotPrice=0;
        }
        if(allotNum>currentStock){
          this.AppUtils.alert('数量<=实际库存-锁定库存');
          allotNum=currentStock;
        };
        ////console.log(allotNum);
        // this.saveUnitprice[id]=unitPrice;
        var totalPrice=this.AppUtils.mul(parseFloat(allotNum),allotPrice);//精度处理
        if(totalPrice||totalPrice==0){
          this.model.allotOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=totalPrice;
              _this.model.allotOrderDetailDTOS[index]['allotPrice']=allotPrice;
              _this.model.allotOrderDetailDTOS[index]['allotNum']=allotNum;
              _this.$set(_this.model.allotOrderDetailDTOS,index,_this.model.allotOrderDetailDTOS[index])
            }
          });
        }else{
          this.model.allotOrderDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.allotOrderDetailDTOS[index]['allotTotalPrice']=0;
              _this.$set(_this.model.allotOrderDetailDTOS,index,_this.model.allotOrderDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      importParts(){
        if(this.model.allotOutStoreId){
          this.importShow=true;
        }else{
          this.AppUtils.alert('请先选择调出门店');
        }
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allotTotalNum=0;
        var allotTotalPrice=0;
        var num;
        var _this=this;
        this.model.allotOrderDetailDTOS.forEach((val,index)=>{
          if(val.allotNum<=0){
            num=1;
          }else{
            num=val.allotNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allotTotalNum=_this.AppUtils.add(allotTotalNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allotTotalPrice=_this.AppUtils.add(allotTotalPrice,parseFloat(val.allotTotalPrice));//精度处理
        });
        ////console.log(typeof allotTotalNum);
        ////console.log(allotTotalNum);
        if(allotTotalNum){
          _this.model.allotTotalNum=allotTotalNum;
        }
        if(allotTotalPrice){
          _this.model.allotTotalPrice=allotTotalPrice;
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
      width: 602px;
      margin-left: 25px;
      border-bottom: none;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        line-height: 49px;
        .left{
          flex: 1;
          .leftZone{
            width: 120px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            width: 179px;
            height: 49px;
            float: left;
          }
        }
        .right{
          flex: 1;
          .leftZone{
            width: 120px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            width: 179px;
            height: 49px;
            float: left;
          }
        }
      }
    }
  }
</style>
