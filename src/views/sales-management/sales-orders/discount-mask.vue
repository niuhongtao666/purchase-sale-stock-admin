<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">配件打折</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="row-group">
          <div class="form_item" style="justify-content: unset;">
            <div class="form_left">
              配件折扣：
            </div>
            <div class="form_right">
              <input class="input" placeholder="请输入配件折扣" type="text" @change="discountChange"
                     v-model.number="model.discount">
            </div>
          </div>
          <div class="form_item" style="justify-content: unset;">
            <div class="form_left">
              折扣金额：
            </div>
            <div class="form_right">
              <input class="input is-disabled" disabled type="text" v-model.number="model.orderFavorablePrice">

            </div>
          </div>
          <div class="form_item" style="justify-content: unset;">
            <div class="form_left">
              折后应收：
            </div>
            <div class="form_right mr0">
              <input class="input is-disabled" type="text" disabled v-model.number="model.orderReceivePrice">

            </div>
          </div>
        </div>
        <div class="row-group">
          <div class="form_item" style="justify-content: unset;">
            <div class="form_left">
              折扣原因：
            </div>
            <div class="form_right mr0">
              <input class="input reason" placeholder="请输入折扣原因" maxlength="500" type="text" v-model="model.orderDiscountReason">

            </div>
          </div>
        </div>
        <div class="row-group">
          <el-table
            :data="model.dataList"
            max-height="339"
            border
            show-summary
            :summary-method="getSummaries"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              width="170">
            </el-table-column>

            <el-table-column
              prop="goodsName"
              label="配件名称"
              width="170">
            </el-table-column>
            <el-table-column
              prop="goodsBrandName"
              label="配件品牌"
              width="120">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="goodsOriginArea"-->
              <!--label="产地"-->
              <!--width="120">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="orderNum"
              label="数量"
              width="69"
              >
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="销售单价"
              width="90">
            </el-table-column>
            <el-table-column
              label="销售总价"
              prop="totalPrice"
              width="100">
              <template slot-scope="scope">
                <div>
                  {{scope.row.orderNum*scope.row.unitPrice}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="favorablePrice"
              label="优惠金额"
              width="90">
              <template slot-scope="scope">
                <div>
                  {{scope.row.favorablePrice}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="应收金额"
              prop="receivePrice"
              width="100">
              <template slot-scope="scope">
                <div>
                  <input class="table-ipt-num" type="text" @focus="oldPartReceivePrice=scope.row.receivePrice"
                         @change="partReceiveChange(scope)" v-model.number="scope.row.receivePrice" style="width: 80px!important;">
                </div>
              </template>

            </el-table-column>


          </el-table>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="save">保存</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {isNumber} from '@/assets/js/logic'

  export default {
    name: "discount-mask",
    props: ['discountData'],
    data() {
      return {
        model: {
          discount: 1,
          orderFavorablePrice: 0,
          orderReceivePrice: 0,
          orderDiscountReason: null,
          dataList: [],
        },
        totalPartsPrice: null,
        oldPartReceivePrice: 0,//记住单个配件应收金额改变之前的值
        discountLimit:null,//折扣权限
      }
    },
    mounted() {
      this.model = this.discountData;
      console.dir(this.model['dataList'])
      // var a =this.model['dataList'][0];
      // alert(a['receivePrice'])
      this.computeTotalPartsPrice();
      this.fetchDiscountinfo();

    },
    methods: {
      fetchDiscountinfo(){
        this.$axios.get('/admin/sale/saleDiscountInfo/detail').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          if(data&&data.value.discountNum){
           this.discountLimit=Number((data.value.discountNum/100).toFixed(4));
          }

        })
      },
      computeTotalPartsPrice() {
        let num = 0;
        this.model.dataList.forEach(val => {
          num += val.unitPrice * val.orderNum;
          val.receivePrice = Number(val.unitPrice * val.orderNum-val.favorablePrice).toFixed(2) || 0;
        })
        this.totalPartsPrice = Number(num.toFixed(2));
        this.model.orderFavorablePrice?this.model.orderReceivePrice=Number((this.totalPartsPrice-this.model.orderFavorablePrice).toFixed(2)):this.model.orderReceivePrice=this.totalPartsPrice;

      },
      discountChange() {
        if (this.model.discount===null||this.model.discount==='') {
          // return this.$message.error('该用户未设置对应的折扣权限');
        }
        if (!isNumber(this.model.discount)) {
          // return this.$message.error('配件折扣必须为数字');
        }
        this.model.discount = Number(this.model.discount.toFixed(4));
        let orderReceivePrice = 0,//应收金额
          orderFavorablePrice = 0;//优惠金额
        for (let val of this.model.dataList) {
          let totalPrice = val.unitPrice * val.orderNum;
          val.receivePrice = Number((totalPrice * this.model.discount).toFixed(2));
          val.favorablePrice = Number((totalPrice - val.receivePrice).toFixed(2));
          orderFavorablePrice += val.favorablePrice;
          orderReceivePrice += val.receivePrice;
        }
        this.model.orderReceivePrice = Number(orderReceivePrice.toFixed(2));
        this.model.orderFavorablePrice = Number(orderFavorablePrice.toFixed(2));
        let lastPart = this.model.dataList[this.model.dataList.length - 1];
        lastPart.receivePrice += this.totalPartsPrice - this.model.orderReceivePrice - this.model.orderFavorablePrice;
        lastPart.receivePrice = Number(lastPart.receivePrice.toFixed(2));

      },
      partReceiveChange(partData) {
        let receivePrice=Number(partData.row.receivePrice.toFixed(2));
        this.model.dataList[partData.$index].receivePrice=receivePrice;
        this.model.dataList[partData.$index].favorablePrice=(partData.row.unitPrice*partData.row.orderNum- receivePrice).toFixed(2);
        this.$set(this.model.dataList,partData.$index,this.model.dataList[partData.$index]);
        this.model.orderReceivePrice += receivePrice - this.oldPartReceivePrice;
        this.model.orderReceivePrice = Number(this.model.orderReceivePrice.toFixed(2));
        this.model.discount = Number((this.model.orderReceivePrice / this.totalPartsPrice).toFixed(4));
        this.model.orderFavorablePrice = Number((this.totalPartsPrice - this.model.orderReceivePrice).toFixed(2));
       },
      close() {
        this.$emit('hideDiscountMask');
      },
      save() {
        if (this.model.discount===null||this.model.discount==='') {
          return this.$message.error('配件折扣不能为空');
        }else{
          if (!isNumber(this.model.discount)) {
            return this.$message.error('配件折扣必须为数字');
          }
          if(this.model.discount<this.discountLimit){
            return this.$message.error(`配件折扣不能小于${this.discountLimit}`);
          }
        }

        for (let val of this.model.dataList){
          if(!isNumber(val.receivePrice)){
            ////console.log(val.receivePrice);
            return this.$message.error(`配件${val.goodsNo}的应收金额必须为数字`);
          }
        }

        this.$emit('hideDiscountMask', this.model);
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
          if (column.property === 'orderNum') {
            values = data.map(item => Number(item.orderNum))
          } else if (column.property === 'favorablePrice') {
            values = data.map(item => Number(item.favorablePrice))
            ////console.log(values)
          } else if (column.property === 'receivePrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice - item.favorablePrice));
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice));
          }

          if (column.property === 'orderNum' || column.property === 'favorablePrice' || column.property === 'receivePrice' || column.property === 'totalPrice') {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                if(column.property === 'favorablePrice' ){
                  ////console.log(prev,curr)
                }
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = Number(sums[index].toFixed(2));
          }

        });
        return sums;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../assets/css/cover.css';

  .addform {
    width: 1020px;
  }

  .row-group {
    display: flex;
    padding: 0 30px;
    .form_item {
      flex: 1;
    }

  }

  .form_right {
    .input {
      border: $border;
      width: 180px;
      height: 32px;
    }
    .reason {
      width: 755px;
    }
  }

  .mr0 {
    margin-right: 0;
  }

</style>
