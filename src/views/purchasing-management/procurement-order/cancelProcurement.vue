<template>
  <div>
    <div class="zzc" v-if="cancelProcurementShow">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle mb0">
          <div class="addUser" style="padding-right: 474px;">取消采购明细</div>
          <div class="searchZone" style="padding-left: 102px;">
            <div class="group">
              <div class="right">
                <input type="text" placeholder="配件编号" v-model.trim="goodsNo">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="stokeLine">
          <div class="table_wrap">
            <div class="table_layout">
              <div class="table_scroll add">
                <el-table
                  :data="cancelProList"
                  max-height="428"
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
                    min-width="145"
                    key="3"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.goodsNo}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="生产编码"
                    min-width="150"
                    key="4"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.goodsVendorNo}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="配件名称"
                    min-width="150"
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
                    min-width="50"
                    key="7"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.goodsUnit}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="取消数量"
                    min-width="80"
                    key="8"
                  >
                    <template slot-scope="scope">
                      <input type="number" v-model.number="scope.row.cancelNum" style="width: 39px;" min="0" @input="getTotal(scope.row.goodsId,scope.row.cancelNum,scope.row.unitPrice)">
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="采购单价(含税)"
                    min-width="115"
                    key="9"
                  >
                    <template slot-scope="scope">
                      <!--<input type="number"  v-model="scope.row.unitPrice" style="width: 39px;" min="0" step="0.1" @input="getTotal(scope.row.goodsId,scope.row.cancelNum,scope.row.unitPrice)">-->
                      <span>{{scope.row.unitPrice}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="采购总价(含税)"
                    min-width="115"
                    key="10"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.totalPrice | decimalTofixed4}}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn mb9" type="button" @click="addSave">确认取消</button>
        </div>

      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'cancelProcurement',
    data(){
      return{
        model:{
          purchaseOrderInfoDTO:{
            id:null,
          },
          purchaseOrderDetailDTOS:[],
        },
        goodsNo:null,//配件编号
      }
    },
    props:{
      cancelProcurementShow:Boolean,
      title:String,
      cancelProList:Array,
      purchaseOrderId:String
    },
    watch:{
      'cancelProcurementShow'(newVal,oldVal){
        if(newVal){
          this.goodsNo='';
        }
      }
    },
    methods:{
      fetchData(){
        if(!localStorage.getItem('cancelInfo')){
          localStorage.setItem('cancelInfo',JSON.stringify(this.cancelProList));
        }
        var arr=JSON.parse(localStorage.getItem('cancelInfo'));
        var _this=this;
        var arrGoodsNo=[];
        if(_this.goodsNo){
          arr.forEach((val)=>{
            arrGoodsNo.push(val['goodsNo']);
            if(val['goodsNo']==_this.goodsNo){
              _this.$emit('clearCancelProList');
              _this.$emit('setCancelProList',val);
            }
          });
          ////console.log(_this.goodsNo);
          ////console.log(arrGoodsNo);
          if(arrGoodsNo.indexOf(_this.goodsNo)==-1){
            _this.AppUtils.alert(`取消采购明细中配件`+_this.goodsNo+`不存在`);
          }
        }else{
          if(this.cancelProList.length==JSON.parse(localStorage.getItem('cancelInfo')).length){
            _this.AppUtils.alert('请输入配件编号');
          }
           // this.cancelProList=JSON.parse(localStorage.getItem('cancelInfo'));
          _this.$emit('cancelInfosAll');
        }
      },
      changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.cancelProList.forEach((val,index)=>{
          num=val.cancelNum;
          // allcancelNum+=parseFloat(num);//精度注释
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
      getTotal(id,cancelNum,unitPrice) {
        var _this = this;
        if (cancelNum) {
          if (cancelNum <0) {
            cancelNum = 0;
          }
          ////console.log(cancelNum);
          if (Math.floor(cancelNum)!=cancelNum) {
            this.AppUtils.alert('取消数量为正整数');
            cancelNum=Math.floor(cancelNum);
          }
          var arr=this.cancelProList;
          arr.forEach((val,index)=> {
            if(val['goodsId']==id){
              if(_this.AppUtils.numSub(val['orderNum'],val['alreadyInputNum'])<cancelNum){
                _this.AppUtils.alert('取消数量需<=配件数量-已入库数');
                val['cancelNum']=_this.AppUtils.numSub(val['orderNum'],val['alreadyInputNum']);
                cancelNum=val['cancelNum'];
              }
            }
          })
        } else {
          cancelNum = 0;
        }
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>2){
            this.AppUtils.alert('单价小数点位数最多两位');
            str=str.substring(0,str.length-1);
            unitPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
        }
        if(unitPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          unitPrice=Math.abs(unitPrice);
        }
        if((unitPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入单价');
          unitPrice=0;
        }
        // var totalPrice=parseFloat(cancelNum)*unitPrice;//精度注释
        var totalPrice=this.AppUtils.mul(parseFloat(cancelNum),unitPrice);//精度处理
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.cancelProList.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.cancelProList[index]['totalPrice']=totalPrice;
              _this.cancelProList[index]['unitPrice']=unitPrice;
              _this.cancelProList[index]['cancelNum']=cancelNum;
              _this.$set(_this.cancelProList,index,_this.cancelProList[index])
            }
          });
        }else{
          this.cancelProList.forEach((val,index)=>{
            if(val['goodsId']==id){
              _this.cancelProList[index]['totalPrice']=0;
              _this.$set(_this.cancelProList,index,_this.cancelProList[index])
            }
          });
        }
        this.changeNumPrice();
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
            ////console.log('咕咕');
            if (index === 3) {
              sums[index] = '合计:';
              return;
            }else if(index === 6){
              var total=0;
              this.cancelProList.forEach((val)=>{
                if(val.cancelNum<=0){
                  val.cancelNum=0;
                }
                total=_this.AppUtils.add(total,val.cancelNum);//精度处理
              });
              sums[index]=total;
              return
            }else if(index === 8){
              var total=0;
              this.cancelProList.forEach((val)=>{
                if(!val.totalPrice){
                  val.totalPrice=0;
                }
                // total+=parseFloat(val.totalPrice);//精度注释
                total=_this.AppUtils.add(total,val.totalPrice);//精度处理
              });
              sums[index]=total;
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
      //保存
      addSave(){
        this.model.purchaseOrderDetailDTOS=JSON.parse(JSON.stringify(this.cancelProList));
        this.model.purchaseOrderDetailDTOS.forEach((val)=>{
          val['cancelTotalPrice']=val['totalPrice'];
        });
        this.model.purchaseOrderInfoDTO['id']=parseFloat(this.purchaseOrderId);
        ////console.log(this.model);
        this.$axios.post('/admin/purchase/purchaseOrder/cancelPurchaseNum',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.$emit('cancelProHide');
            this.$message.success('取消采购成功');
            sessionStorage.removeItem('cancelInfo')
            this.$emit('fetchData');
          }
        })
      },
      //取消
      addCancel(){
        sessionStorage.removeItem('cancelInfo')
        this.$emit('cancelProHide');
        this.$emit('fetchData');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .addform{
    width: 800px;
  }
  .stokeLine{
    display: flex;
    .form_item{
      width: 33.3%;
    }
  }
  .form_left p{
    text-align: center;
  }
  .table_wrap{
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .addform{
    width: 1017px;
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
      height: 400px;
      border-bottom: 1px solid #ccc;
      .right{
        width: 900px;
        height: 400px;
        float: left;
        .tableZone{
          height: 500px;
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
