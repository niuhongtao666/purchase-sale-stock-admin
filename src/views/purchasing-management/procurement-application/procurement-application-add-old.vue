<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>申请信息</h2>
      </div>
      <div class="row">
        <div class="rowItem h-49 borderBottom">
            <div class="left h-49">
              <div class="leftZone">供应商</div>
              <div class="rightZone">
                <el-select placeholder="请选择" class="el_box" v-model="model.purchaseApplyInfoDTO.supplierId" filterable clearable @visible-change="setSupplierName">
                  <el-option
                    v-for="item in suppliersList"
                    :key="item.id"
                    :label="item.supplierName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="right h-49">
              <div class="leftZone">期望到货日</div>
              <div class="rightZone">
                <el-date-picker
                  v-model="model.purchaseApplyInfoDTO.expectedArrivalTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择到货日期"
                  default-time="12:00:00"
                  class="activity-edit-date date-box innerInput"
                >
                </el-date-picker>
              </div>
            </div>
        </div>
        <div class="rowItem h-49">
          <div class="left h-49">
            <div class="leftZone">备注</div>
            <div class="rightZone w480">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                resize="none"
                v-model="model.purchaseApplyInfoDTO.memo">
              </el-input>
            </div>
          </div>
          </div>
        </div>
    </div>
    <div class="applicationInfo">
      <div class="item">
        <i class="order-info_icon"></i>
        <h2>请购清单</h2>
      </div>
      <div class="btnZone">
        <button type="button" class="btn mr10" @click="addParts">新增</button>
        <button type="button" class="btn mr10"@click="importParts" >导入配件</button>
        <button type="button" class="cancelBtn" @click='deleteData'>删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding: 25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.purchaseApplyDetailDTOS"
              height="519"
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
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编号"
                width="180"
                key="3"
              >
                <template slot-scope="scope">
                    {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                width="180"
                key="4"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                width="180"
                key="5"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="60"
                key="6"
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="请购数量"
                width="100"
                key="7"
              >
                <template slot-scope="scope">
                  <input type="number" v-model.number="scope.row.applyNum" class="in" min="1" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="采购单价"
                width="100"
                key="8"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model.number="scope.row.unitPrice" class="in" @input="getTotal(scope.row.goodsId,scope.row.applyNum,scope.row.unitPrice)">
                </template>
              </el-table-column>
              <el-table-column
                label="总价"
                width="100"
                key="9"
              >
                <template slot-scope="scope">
                  {{scope.row.totalPrice | decimalTofixed2}}
                </template>
              </el-table-column>
              <el-table-column
                label="上次采购价"
                width="100"
                key="10"
              >
                <template slot-scope="scope">
                  {{scope.row.lastPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="可发料库存"
                width="100"
                key="11"
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock}}
                </template>
              </el-table-column>
              <el-table-column
                label="实际库存"
                width="100"
                key="12"
              >
                <template slot-scope="scope">
                  {{scope.row.currentStock}}
                </template>
              </el-table-column>
              <el-table-column
                label="锁定库存"
                width="100"
                key="13"
              >
                <template slot-scope="scope">
                 0
                </template>
              </el-table-column>
              <el-table-column
                label="已转采购数"
                width="100"
                key="14"
              >
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="已入库数"
                width="100"
                key="15"
              >
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="100"
                key="16"
              >
                <template slot-scope="scope">
                  <input type="text"  v-model="scope.row.memo" class="in">
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--<div v-if="!model.purchaseApplyDetailDTOS.length">-->
            <!--<nt-no-data></nt-no-data>-->
          <!--</div>-->
        </div>
      </div>
      </div>
      <div class="saveZone">
        <div class="saveBtn">
          <button type="button" class="btn" @click.prevent="saveInfo">保存</button>
        </div>
      </div>
    <addParts :popUp="popUp" @closeAddParts="closeAddParts" @getAddData="getAddData" ref="addParts" :saveUnitprice="saveUnitprice"></addParts>
    <importParts :importShow="importShow" @change="change"></importParts>
  </div>
</template>

<script>
  // import addParts from './add-parts'
  import importParts from './importParts1'
  export default {
    name:'procurement-application-add',
    components:{
      // addParts,
      importParts
    },
    computed:{
      checkAllStatus(){
        if(!this.status){
          return false;
        }else{
          return this.checkList.length===this.model.purchaseApplyDetailDTOS.length
        }
      },
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
              /*{
                applyNum:'',//请购数量
                currentStock:'',//当前库存
                goodsId:'',//商品ID
                goodsName:'',//配件名称
                goodsNo: '',//配件编号
                goodsUnit:'',//单位
                goodsVendorNo: '',//生产编码
                lastPrice:'',//上次采购价
                memo:'',//备注
                totalPrice: '',//总价
		            unitPrice: '',//单价
              },*/
            ],
            purchaseApplyInfoDTO: {
		          expectedArrivalTime:'',//期望到货日期
		          memo:'',//备注
              supplierId:'',//供应商id
              supplierName:'',//供应商名称
            }
          },
        popUp:false,//新增配件显示状态
        // checked:false,//全选按钮选中状态
        checkList:[],//选中列表
        importShow:false,//导入配件显示状态
        dataList:[],//认购清单列表
        suppliersList:[],
        // 初始化全选按钮, 默认不选
        isCheckedAll: false,
        checkStatus:false,
        status:false,
        cloneId:'',//克隆id
        savePrice:{},//保留原价
        saveUnitprice:{},//保存修改后的原价
      }
    },
    mounted(){
      //获取供应商
      this.getSupplier();
      // alert(this.$store.state.cloneId);
      this.cloneId=localStorage.getItem("cloneId");
      if(this.cloneId){
        this.getClone(this.cloneId);
      };
    },
    methods:{
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 4) {
            sums[index] = '总价';
            return;
          }else if(index === 6){
            var total=0;
            // alert(this.model.purchaseApplyInfoDTO.totalNum);
            // if(this.model.purchaseApplyInfoDTO.totalNum==0){
              ////console.log(this.model.purchaseApplyInfoDTO.totalNum)
              this.model.purchaseApplyDetailDTOS.forEach((val)=>{
                ////console.log(val);
                ////console.log(val.applyNum);
                if(val.applyNum<=0){
                  val.applyNum=1;
                }
                /*if(val.applyNum||val.applyNum==0){
                  ////console.log('11a')
                  total+=parseFloat(val.applyNum);
                }else{
                  ////console.log('21a')
                  val.applyNum=0;
                  total+=parseFloat(val.applyNum);
                }*/
                // total+=parseFloat(val.applyNum);//精度注释
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
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,val.totalPrice);//精度处理
            });
            this.model.purchaseApplyInfoDTO.orderTotalPrice=total;
            if(this.model.purchaseApplyInfoDTO.orderTotalPrice||this.model.purchaseApplyInfoDTO.orderTotalPrice==0){
              sums[index] =this.model.purchaseApplyInfoDTO.orderTotalPrice;
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
              // total+=parseFloat(val.currentStock);//精度注释
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
      handleSelectionChange(val) {
        ////console.log(val);
        val.forEach((val)=>{
          this.checkList.push(val.goodsId);
        });
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
           if(this.model.purchaseApplyDetailDTOS.length){
              this.model.purchaseApplyDetailDTOS.forEach((item)=>{
                ////console.log(item);
                this.$refs.addParts.getAlreadyGoodsId([item.goodsId,item.applyNum]);
                this.savePrice[item.goodsId]=item.unitPrice;
              });
            }
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
        }
      },
      checkedOne (goodsId) {
        ////console.log(this.checkList);
        let idIndex = this.checkList.indexOf(goodsId)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.checkList.splice(idIndex, 1)
        } else {
          // 选中该checkbox
          this.checkList.push(goodsId);
          this.status=true;
          ////console.log(this.checkList);
          ////console.log(this.status);
          ////console.log(this.model.purchaseApplyDetailDTOS);
        }
      },
      //选中所有
      checkedAll () {
        ////console.log(this.checkList.length);
        ////console.log(this.model.purchaseApplyDetailDTOS.length);
        this.status=true;
        if(this.checkList.length===this.model.purchaseApplyDetailDTOS.length){
          this.isCheckedAll=true;
        }
        this.isCheckedAll = !this.isCheckedAll
        ////console.log(this.isCheckedAll);
        if (this.isCheckedAll || this.checkList.length!==this.model.purchaseApplyDetailDTOS.length) {
          // 全选时
          this.checkList=[]
          ////console.log('选中');
          this.model.purchaseApplyDetailDTOS.forEach(function (val) {
            this.checkList.push(val.goodsId);
          }, this)
        } else {
          this.checkList=[];
        };
      },
      //删除
      deleteData(){
        ////console.log(this.checkList);
        var _this=this;
        if(this.checkList.length){
          this.checkList.forEach((value,index)=>{
            var valuee=value;
            var inde=index;
            _this.model.purchaseApplyDetailDTOS.forEach(function (val,ind) {
              if(valuee===val['goodsId']){
                _this.model.purchaseApplyDetailDTOS.splice(ind,1);
                 _this.$refs.addParts.getDeleteGoods(_this.checkList);
                 _this.checkList=[];
                // _this.checkList.splice(index,1);
                // this.status=false;
                ////console.log(_this.checkList.length);
                ////console.log(_this.checkList);
                if(!_this.checkList.length){
                  // this.status=true;
                  ////console.log(_this.checkList);
                  ////console.log(_this.model.purchaseApplyDetailDTOS);
                  _this.status=false;
                  if(_this.model.purchaseApplyDetailDTOS.length==0){
                    _this.$refs.addParts.clearGoods();
                  }
                }else{
                  _this.status=false;
                }
              }
            })
          })
        }else{
          // this.status=false;
        }
      },
      saveInfo(){
        ////console.log(this.model.purchaseApplyDetailDTOS);
        ////console.log(this.model);
          this.$axios.post('/admin/purchase/purchaseApply/add',this.model).then(res=>{
           let data = this.AppUtils.checkResponse(res);
           if(data) {
             ////console.log(data);
             this.$message.success('新增采购申请成功');
             this.$router.push('/purchasing-management/procurement-application/detail/'+data.value);
           }
         })
      },
      getTotal(id,applyNum,unitPrice) {
        var _this = this;
        ////console.log(typeof applyNum);
        ////console.log(applyNum);
        ////console.log(typeof unitPrice);
        ////console.log(unitPrice);
        if (applyNum) {
          if (applyNum <= 0) {
            applyNum = 1;
          }
          if (Math.floor(applyNum)!=applyNum) {
            ////console.log(applyNum);
            this.AppUtils.alert('请购数量为整数');
          }
        } else {
          applyNum = 1;
        }
        // unitPrice=unitPrice.toFixed(2);
        // unitPrice=this.AppUtils.deLength(unitPrice);
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            this.AppUtils.alert('采购单价小数点位数最多两位');
            unitPrice=unitPrice.toFixed(2);
            }
        }
        if(parseFloat(unitPrice)<0){
          this.AppUtils.alert('采购单价不能为负');
        }
        ////console.log(typeof unitPrice);
        ////console.log(unitPrice);
        if((typeof unitPrice!=='number')&&(unitPrice!=='')){
          ////console.log(unitPrice);
          ////console.log(typeof unitPrice);
          // this.AppUtils.alert('单价不能为数字之外的其他字符');
        }else if(unitPrice===''){
          this.AppUtils.alert('请输入采购单价');
        }
        this.saveUnitprice[id]=unitPrice;
        ////console.log(this.saveUnitprice);
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(applyNum),unitPrice);//精度处理
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=totalPrice;
              _this.model.purchaseApplyDetailDTOS[index]['unitPrice']=unitPrice;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }else{
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.model.purchaseApplyDetailDTOS[index]['totalPrice']=0;
              _this.$set(_this.model.purchaseApplyDetailDTOS,index,_this.model.purchaseApplyDetailDTOS[index])
            }
          });
        }
        this.changeNumPrice();
      },
      //新增配件
      addParts(){
        this.popUp=true;
      },
      closeAddParts(){
        this.popUp=false;
      },
      importParts(){
        this.importShow=true;
      },
      //关闭导入配件弹层
      change(){
        this.importShow=false;
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allApplyNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
          ////console.log(val);
          ////console.log(val.applyNum);
          ////console.log(val.totalPrice);
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
      //获取认购清单表格数据
      getAddData(data,exit){
        var _this=this;
        if(data){
          this.status=true;
        }
        ////console.log(exit);
        if(!exit){
          if(data){
            ////console.log(data);
            this.model.purchaseApplyDetailDTOS.push(data);
            //处理价格和数量随时变动
            this.changeNumPrice();
          }
        }else{
          ////console.log(data);
          ////console.log(this.savePrice);
          this.model.purchaseApplyDetailDTOS.forEach((val,index)=>{
            if(val['goodsId']==exit){
              if(_this.savePrice[val['goodsId']]){
                data.unitPrice=_this.savePrice[val['goodsId']];
              }else if(_this.savePrice[val['goodsId']]==0){
                data.unitPrice=_this.savePrice[val['goodsId']];
              }
              // data.totalPrice=parseFloat(data.unitPrice)*parseFloat(data.applyNum);//精度注释
              data.totalPrice=_this.AppUtils.mul(parseFloat(data.unitPrice),parseFloat(data.applyNum));//精度处理
              _this.model.purchaseApplyDetailDTOS.splice(index,1,data);
              //处理价格和数量随时变动
              _this.changeNumPrice();
            }
          });
        }
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
