<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="application-Info_icon"></i>
        <h2>申请信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
            <div class="left h-49">
              <div class="leftZone line-height50">供应商</div>
              <div class="rightZone">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.purchaseApplyInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName">
                  <el-option
                    v-for="item in suppliersList"
                    :key="item.id"
                    :label="item.supplierName"
                    :value="item.id">
                      <span style="float: left; font-size: 13px">{{ item.supplierName }}</span>
                      <span style="float: right; color: #00BAFF; font-size: 13px">{{ item.commonType==1?'通用':'自用'}}</span>
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="right h-49">
              <div class="leftZone line-height50">期望到货日</div>
              <div class="rightZone">
                <el-date-picker
                  v-model.trim="model.purchaseApplyInfoDTO.expectedArrivalTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="请选择"
                  value-format="timestamp"
                  class="activity-edit-date date-box innerInput"
                >
                </el-date-picker>
              </div>
            </div>
        </div>
        <div class="rowItem h-49">
          <div class="left h-80">
            <div class="leftZone line-height90">备注</div>
            <div class="rightZone w480">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                maxlength="500"
                v-model.trim="model.purchaseApplyInfoDTO.memo">
              </el-input>
            </div>
          </div>
          </div>
        </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="application-List_icon"></i>
        <h2>请购清单</h2>
      </div>
      <div class="btnZone">
        <button type="button" class="btn mr10" @click="partMaskShow=true">新增</button>
        <button type="button" class="btn mr10"@click="importParts" v-if="buttonInfo.purApplyImport">{{buttonInfo.purApplyImport}}</button>
        <button type="button" class="cancelBtn bgWhite" @click='delTableData(true)'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding: 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseApplyDetailDTOS"
              max-height="510"
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
                width="35">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                min-width="200"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                    {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="生产编码"-->
                <!--min-width="200"-->
                <!--key="4"-->
                <!--show-overflow-tooltip-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.goodsVendorNo}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="配件名称"
                min-width="200"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件品牌"
                min-width="120"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsBrandName}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="产地"-->
                <!--min-width="120"-->
                <!--key="6"-->
                <!--show-overflow-tooltip-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.goodsOriginArea}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="单位"
                min-width="50"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="请购数量"
                min-width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.applyNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价(含税)"
                min-width="115"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.unitPrice" class="in" min='0' step='0.1' style="width: 90px!important;" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购总价(含税)"
                min-width="115"
                key="10"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number"  v-model="scope.row.totalPrice" class="in" min='0' step='0.1' style="width: 90px!important;" @input="getUnitPrice(scope.row.goodsId,scope.row.totalPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="上次进价(含税)"
                min-width="125"
                key="11"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.lastPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="可发料库存"
                min-width="95"
                key="12"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际库存"
                min-width="80"
                key="13"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="锁定库存"
                min-width="80"
                key="14"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.lockStock | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="已转采购数"
                min-width="95"
                key="15"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.convertOrderNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                min-width="80"
                key="16"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.inputNum | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                min-width="100"
                key="17"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.trim="scope.row.memo" class="in">
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      </div>
      <div class="saveZone">
        <div class="saveBtn">
          <button type="button" class="btn" @click.prevent="saveInfo" v-if="buttonInfo.add">保存</button>
        </div>
      </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <importParts v-if='importShow' @importHide="importHide" @getImportData="getImportData" :importType="importType"></importParts>
  </div>
</template>

<script>
  import {checkDataExit,delDataExit} from '@/assets/js/logic'
  // import importParts from './importParts'
  export default {
    name:'procurement-application-add',
    components:{
    },
    computed:{
      totalNum(){
        var total=0;
        var _this=this;
        this.model.purchaseApplyDetailDTOS.forEach((val)=>{
          // total+=val.applyNum;//精度注释
          total=_this.AppUtils.add(total,val.applyNum);//精度处理
        });
        return total;
      },
      totalPrice(){
        var total=0;
        var _this=this;
        this.model.purchaseApplyDetailDTOS.forEach((val)=>{
          // total+=val.totalPrice;//精度注释
          total=_this.AppUtils.add(total,val.totalPrice);//精度处理
        });
        return total;
      }
    },
    data(){
      return{
        model:{
            purchaseApplyDetailDTOS: [
            ],
            purchaseApplyInfoDTO: {
		          expectedArrivalTime:'',//期望到货日期
		          memo:'',//备注
              supplierId:'',//供应商id
              supplierName:'',//供应商名称
            }
          },
        importType:'purchaseApplyImportGoods',//采购申请导入配件
        popUp:false,//新增配件显示状态
        partMaskShow: false,//新增配件
        // checked:false,//全选按钮选中状态
        checkList:[],//选中列表
        importShow:false,//导入配件显示状态
        dataList:[],//认购清单列表
        suppliersList:[],
        // 初始化全选按钮, 默认不选
        cloneId:'',//克隆id
        savePrice:{},//保留原价
        saveUnitprice:{},//保存修改后的原价
        storeId:null,//商品门店
        // buttonInfo:{},//按钮权限
      }
    },
    computed:{
      buttonInfo() {
        return this.AppUtils.returnPermissions(5);
      },
    },
    mounted(){
        var userInfos=JSON.parse(localStorage.getItem('userInfos'));
        this.storeId=userInfos['storeId'];
      // this.buttonInfo=this.AppUtils.returnPermissions(5);
      //获取供应商
      // this.getSupplier();
      // alert(this.$store.state.cloneId);
      this.cloneId=localStorage.getItem("cloneId");
      if(this.cloneId){
        this.getClone(this.cloneId);
      };
    },
    methods:{
      getUnitPrice(goodsId,totalPrice){
        var _this=this;
        var str = '' + totalPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('采购总价(含税)小数点位数最多四位');
            str=str.substring(0,str.length-1);
            totalPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价(含税)');
            totalPrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价(含税)');
            totalPrice=0;
          }
        }
        if(totalPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('采购总价(含税)不能为负');
          totalPrice=Math.abs(totalPrice);
        }
        if((totalPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入采购总价(含税)');
          totalPrice=0;
        }
        this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
          if(val['goodsId']==goodsId){
            _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
            _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=_this.AppUtils.decimalTen(_this.AppUtils.accDiv(_this.model.purchaseApplyDetailDTOS[index]['totalPrice'],_this.model.purchaseApplyDetailDTOS[index]['applyNum']));
            _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
          }
        });
      },
      getImportData(arg) {
        if (arg.length) {
          for (let val of arg) {
            val['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(val['unitPrice'],val['applyNum']));
            let index = checkDataExit(this.model.purchaseApplyDetailDTOS, val)
            if (index > -1) {
              return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
            }
          }
          this.model.purchaseApplyDetailDTOS.push(...arg);
        }
      },
      addParts(data) {
        data['unitPrice']=this.AppUtils.decimalTen(data['lastPrice']);
        data['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(data['unitPrice'],data['applyNum']));
        let index = checkDataExit(this.model.purchaseApplyDetailDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.purchaseApplyDetailDTOS[index].applyNum += data.applyNum;
            this.model.purchaseApplyDetailDTOS[index]['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(this.model.purchaseApplyDetailDTOS[index]['unitPrice'],this.model.purchaseApplyDetailDTOS[index]['applyNum']));
          })
        } else {
          this.model.purchaseApplyDetailDTOS.push(data);
        }
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
              ////console.log(this.model.purchaseApplyInfoDTO.totalNum)
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                ////console.log(val);
                ////console.log(val.applyNum);
                if(val.applyNum<=0){
                  val.applyNum=1;
                }
                total=_this.AppUtils.add(total,val.applyNum);//精度处理
              });
              ////console.log(typeof total);
              ////console.log(total);
              ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              this.model.purchaseApplyInfoDTO.totalNum=total;
              ////console.log(typeof this.model.purchaseApplyInfoDTO.totalNum);
              ////console.log(this.model.purchaseApplyInfoDTO.totalNum);
              if(this.model.purchaseApplyInfoDTO.totalNum||this.model.purchaseApplyInfoDTO.totalNum==0){
                sums[index]=this.model.purchaseApplyInfoDTO.totalNum;
              }else{
                sums[index]=0;
              }
            return
            // }
          }else if(index === 8){
            var total=0;
            this.model.purchaseApplyDetailDTOS.forEach((val)=>{
              if(!val.totalPrice){
                val.totalPrice=0;
              }
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.totalPrice));//精度处理
            });
            this.model.purchaseApplyInfoDTO.orderTotalPrice=_this.AppUtils.decimal4(total);
            if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
              sums[index] =_this.AppUtils.decimal2(total);
            }else{
              sums[index]=0;
            }
            return ;
          }else if(index === 10||index === 11){
            var total=0;
            this.model.purchaseApplyDetailDTOS.forEach((val)=>{
              if(!val.currentStock){
                val.currentStock=0;
              }
              total=_this.AppUtils.add(total,val.currentStock);//精度处理
            });
            sums[index]=total;
            return ;
          }else if(index === 12||index === 13||index === 14){
            sums[index]=0;
            return ;
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
      //获取克隆详情
      getClone(id){
        this.$axios.post('/admin/purchase/purchaseApply/detail/'+id).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.model.purchaseApplyDetailDTOS=JSON.parse(JSON.stringify(data.value.purchaseApplyDetailDTOS));
          }
        })
      },
      //设置供应商名称
      setSupplierName(arg){
        if(!arg){
          ////console.log(this.suppliersList);
          ////console.log(this.model.purchaseApplyInfoDTO.supplierId);
          if(this.suppliersList.length){
            this.suppliersList.forEach((val)=>{
              if(val.id==this.model.purchaseApplyInfoDTO.supplierId){
                this.model.purchaseApplyInfoDTO.supplierName=val.supplierName;
              }
            });
          }
        }else{
          this.getSupplier();
        }
      },
      //删除
      delTableData(isPart){//删除配件工项
        if(isPart){
          delDataExit(this.model.purchaseApplyDetailDTOS,this.checkList);
        }
      },
      saveInfo(){
        ////console.log(this.model.purchaseApplyDetailDTOS);
        ////console.log(this.model);
        var arr=this.model.purchaseApplyDetailDTOS.filter(item=>Math.floor(item.applyNum)!=item.applyNum);
        if(arr.length){
          var infoArr=[];
          arr.forEach((item)=>{
            infoArr.push(item.goodsNo);
          })
          var infoStr=infoArr.join(',');
          this.AppUtils.alert('配件'+infoStr+'的数量需要是整数');
        }else{
          this.$axios.post('/admin/purchase/purchaseApply/add',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              this.$message.success('新增采购申请成功');
              this.$router.push('/purchasing-management/procurement-application/detail/'+data.value);
            }
          })
        }
      },
      getTotal(id,applyNum,unitPrice) {
        var _this = this;
        if (applyNum) {
          if (applyNum <= 0) {
            applyNum = 1;
          }
          if (Math.floor(applyNum)!=applyNum) {
            ////console.log(applyNum);
            this.AppUtils.alert('请购数量为整数');
            applyNum=Math.floor(applyNum);
          }
        } else {
          applyNum = 1;
        }
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>10){
            this.AppUtils.alert('采购单价(含税)小数点位数最多十位');
            str=str.substring(0,str.length-1);
            unitPrice=parseFloat(str);
            }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购单价(含税)');
            unitPrice=0;
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购单价(含税)');
            unitPrice=0;
          }
        }
        if(unitPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('采购单价(含税)不能为负');
          unitPrice=Math.abs(unitPrice);
        }
        if((unitPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入采购单价(含税)');
          unitPrice=0;
        }
        this.saveUnitprice[id]=unitPrice;
        var totalPrice=this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(applyNum),unitPrice));//精度处理
        if(totalPrice||totalPrice==0){
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseApplyDetailDTOS[index]['applyNum']=applyNum;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['applyNum']=applyNum;
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=0;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      closeAddParts(){
        this.popUp=false;
      },
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      importHide(){
        this.importShow=false;
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allApplyNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
          if(val.applyNum<=0){
            num=1;
          }else{
            num=val.applyNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allApplyNum=_this.AppUtils.add(allApplyNum,parseFloat(num));//精度处理
          ////console.log(typeof val.applyNum);
          ////console.log(typeof val.totalPrice);
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,parseFloat(val.totalPrice));//精度处理
        });
        ////console.log(typeof allApplyNum);
        ////console.log(allApplyNum);
        if(allApplyNum){
          this.model.purchaseApplyInfoDTO.totalNum=allApplyNum;
        }
        ////console.log(allTotalPrice);
        if(allTotalPrice){
          this.model.purchaseApplyInfoDTO.orderTotalPrice=allTotalPrice;
        }
      },
      //获取供应商列表
      getSupplier(){
        this.$axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.suppliersList=data.value;
            /*this.suppliersList.forEach((item)=>{
              if(item['commonType']==1){
                item['commonTypeName']=item['supplierName']+'(通用)';
              }else{
                item['commonTypeName']=item['supplierName']+'(自用)';
              }
            });*/
          }
        })
      }
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
