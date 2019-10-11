<template>
  <div>
    <div class="zzc">
      <form class="addform">
        <div class="addTitle">
          <div class="addUser" style="text-align: left">申请退款</div>
          <div class="searchZone" style="">
            <div class="group">
              <div class="left"></div>
              <div class="right">
                <input type="text" placeholder="配件编号/生产编码/配件名称" v-model.trim="searchText">
                <button type="button" class="btn" @click="search">搜索</button>
              </div>
            </div>
            <div class="close" @click="close">×</div>
          </div>
        </div>
        <div class="content">
          <div class="top-box">
            <div class="group">
              <div class="left">审批单号</div>
              <div class="right">
                <input class="input" placeholder="请输入审批单号" v-model="model.approveNo" type="text">
              </div>
            </div>
            <div class="group">
              <div class="left">退货原因</div>
              <div class="right">
                <input class="input" placeholder="请输入退货原因" maxlength="500" v-model="model.returnReason" type="text">
              </div>
            </div>
          </div>
          <el-table
            :data="model.saleReturnDetailDTOList"
            show-summary
            :summary-method="getSummaries"
            max-height="380"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsVendorNo"
              label="生产编码"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsBrandName"
              label="配件品牌"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="goodsOriginArea"-->
              <!--label="产地"-->
              <!--min-width="120"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
              label="销售数量"
              prop="saleOrderNum"
              width="80">
            </el-table-column>
            <el-table-column
              label="数量"
              prop="orderNum"
              width="100">
              <template slot-scope="scope">
                <div>
                  <input class="table-ipt-num" type="text" @change="orderNumChange(scope.row)" v-model="scope.row.orderNum" @input="testNum(scope.row,scope)">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="saleUnitPrice"
              label="单价"
              width="80">
            </el-table-column>
            <el-table-column
              label="退款金额"
              prop="refundPrice"
               >
              <template slot-scope="scope">
                <div>
                    {{scope.row.refundPrice}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="closeBtn">
          <button type="button" class="btn importBtn" @click="applyRefund">申请退款</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {isInteger} from '@/assets/js/logic'

  export default {
    name: 'refund-goods-money',
    props: ['orderId'],
    data() {
      return {
        searchText: '',
        originalDataList: [],//存储原始数据 用来做搜索的时候使用
        model: {
          saleReturnDetailDTOList: [],
          returnReason: null,
          approveNo: null,
        },
        saleTotalPrices:[],
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.$axios.get(`/admin/sale/saleOrderInfo/getSaleOrderDetails/${this.orderId}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.originalDataList = data.value;
            this.model.saleReturnDetailDTOList = JSON.parse(JSON.stringify(data.value));
            this.model.saleReturnDetailDTOList.map(val=>{
              val.saleOrderNum=val.orderNum;
              val.orderNum=0;
              val['refundPrice']=val['orderNum']*val['saleUnitPrice'];
              // val['saleTotalPrice']=val['orderNum']*val['saleUnitPrice'];
            })
          }
        })
      },
      search() {//搜索
        this.model.saleReturnDetailDTOList = this.originalDataList.filter(val => {
          if (JSON.stringify(val).indexOf(this.searchText) > -1) {
            return val;
          }
        })
      },
      //关闭新增配件弹窗
      close() {
        this.$emit('hideRefundGoodsMoneyMask');
      },
      orderNumChange(data) {
        if(!isInteger(data.orderNum)){
          return this.$message.error(`配件${data.goodsNo}的数量必须为整数`);
        }
        // this.model.saleReturnDetailDTOList[data.$index].orderNum = toInteger(data.row.orderNum);
      },
      testNum(data,index){
        //console.dir(this.saleTotalPrices)
        if(!this.saleTotalPrices[index.$index]){
          this.saleTotalPrices[index.$index]=data.saleTotalPrice;
        }
        if(data.orderNum){
          if(data.saleOrderNum<data.orderNum){
            this.AppUtils.alert(data.goodsNo+'数量不能超过销售数量');
            data.orderNum=data.saleOrderNum;
            ////console.log('超过了'+this.saleTotalPrices[index.$index]);
            this.model.saleReturnDetailDTOList[index.$index]['refundPrice']=this.saleTotalPrices[index.$index];
            this.model.saleReturnDetailDTOList[index.$index]['saleTotalPrice']=this.saleTotalPrices[index.$index];
          }else if(data.saleOrderNum==data.orderNum){
            data.orderNum=data.saleOrderNum;
            this.model.saleReturnDetailDTOList[index.$index]['refundPrice']=this.saleTotalPrices[index.$index];
            ////console.log('输入小乖乖'+this.model.saleReturnDetailDTOList[index.$index]['refundPrice']);
            this.model.saleReturnDetailDTOList[index.$index]['saleTotalPrice']=this.saleTotalPrices[index.$index]
          }else{
            this.model.saleReturnDetailDTOList[index.$index]['refundPrice']=data.orderNum*data.saleUnitPrice;
            this.model.saleReturnDetailDTOList[index.$index]['saleTotalPrice']=data.orderNum*data.saleUnitPrice;
          }
        }else{
          this.model.saleReturnDetailDTOList[index.$index]['refundPrice']='';
        }
        this.$set(this.model.saleReturnDetailDTOList,index.$index,this.model.saleReturnDetailDTOList[index.$index]);
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        let values = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
           if (column.property === 'saleOrderNum') {
            values = data.map(item => Number(item.saleOrderNum))
          } else if (column.property === 'orderNum') {
            values = data.map(item => Number(item.orderNum))
          } else if (column.property === 'refundPrice') {
            // alert(data.saleOrderNum)
            /*if(data.saleOrderNum>data.orderNum){
              values = data.map(item => Number(item.orderNum * item.saleUnitPrice));
            }else if(data.saleOrderNum===data.orderNum){
              alert(data.orderNum);
              values=[];
              var arrayList=data;
              arrayList.forEach((item)=>{
                ////console.log('价格'+item.saleTotalPrice);
                values.push(item.saleTotalPrice);
              })
              ////console.log('价格集合'+values);
            }*/
             var arrayList=data;
             ////console.log('数量'+data.length);
             ////console.log('1金额啊'+values)
             arrayList.forEach((item)=>{
               // ////console.log('价格'+item.saleTotalPrice);
               // values.push(item.saleTotalPrice);
               if(item.orderNum){
                 if(item.saleOrderNum>item.orderNum){
                   values.push(Number(item.orderNum * item.saleUnitPrice));
                  }else if(item.saleOrderNum===item.orderNum){
                   ////console.log('会不会呢1'+item.saleTotalPrice);
                   values.push(item.saleTotalPrice)
                 }else{
                   ////console.log('会不会呢2'+item.saleTotalPrice);
                   values.push(item.saleTotalPrice)
                 }
                }
              })
             var newArr=arrayList.filter(item=>item.orderNum);
             ////console.log('newArr'+newArr);
             ////console.log('处理一下'+values.slice(values.length-newArr.length))
             ////console.log('金额啊'+values)
             values=values.slice(values.length-newArr.length);
           }
          const computedPropertyArr = ['saleOrderNum','orderNum', 'refundPrice'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            if(column.property=='refundPrice'){
              // alert('哈哈哈哈')
              // ////console.log('你是'+values);
              // values.shift();
              // values.slice(data.length-1);

              ////console.log('处理过'+values)
            }
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(column.property=='refundPrice'){
              ////console.log(sums[index]);
            }
            sums[index] = Number(sums[index].toFixed(2));
          }

        });
        return sums;
      },

      applyRefund() {//申请退款

        let saleReturnDetailDTOList = this.model.saleReturnDetailDTOList;
        for (let i = 0, l = saleReturnDetailDTOList.length; i < l; i++) {
          if (!isInteger(saleReturnDetailDTOList[i].orderNum)) {
            return this.$message.error(`配件${saleReturnDetailDTOList[i].goodsNo}的数量必须为整数`);
          }
          if (saleReturnDetailDTOList[i].orderNum > saleReturnDetailDTOList[i].saleOrderNum) {
            return this.$message.error('退货数不能大于可退数');
          }
        }
        var filterArr=saleReturnDetailDTOList.filter(item=>item['orderNum']==0);
        //console.dir(filterArr);
        if(filterArr.length==saleReturnDetailDTOList.length){
          return this.AppUtils.alert('申请退款的配件数量不能全部为0');
        }
        this.model.saleOrderId = this.orderId;
        this.$axios.post('/admin/sale/saleReturnInfo/add', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.$message.success('申请退款成功');
            this.$emit('hideRefundGoodsMoneyMask', true);

            // this.AppUtils.alert('申请退款成功', () => {
            //   this.$emit('hideRefundGoodsMoneyMask', true);
            // })
          }
        })

      }

    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';

  .addform {
    width:1104px;
    padding-bottom: 0px;
    .addTitle {
      margin-bottom: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .searchZone {
        display: flex;
        align-items: center;
        .group {
          .left {
            width: 86px;
            margin-left: 10px;
          }
          .right {
            input {
              width: 200px;
              height: 30px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              padding-left: 10px;
            }
            .btn {
              margin-left: 10px;
            }
          }
        }
        .close {
          margin-top: 0;
          margin-left: 20px;
        }
      }
    }
    .content {
      max-height: 430px;
      padding: 10px;
      .top-box {
        display: flex;
        margin-bottom: 10px;
      }
      .group {
        align-items: center;
        flex: 1;
        .left {
          width: auto;
          margin-right: 10px;
          color: #4A4A4A;
        }
        .right {
          input {
            width: 100%;
            height: 30px;
            border: $border;
            border-radius: 3px;
            padding-left: 10px;
          }

        }
        &:last-child {
          margin-left: 30px;
        }
      }
    }
    .closeBtn {
      height: 50px;
      position: relative;
      .btn {
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -15px;
      }

    }
  }
</style>
