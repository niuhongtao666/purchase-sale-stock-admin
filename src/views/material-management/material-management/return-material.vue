<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchDeliverPartsList">
        <div class="addTitle">
          <div class="addUser">选择配件</div>
          <div class="searchZone">

            <div class="group">
              <span class="left">配件编号/名称:</span>
              <div class="right">
                <input type="text" class="input w150" placeholder="配件编号/生产编码/配件名称" v-model.trim="selectNo">
              </div>
            </div>
            <div class="group">
              <div class="right">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
            <div class="close" @click="close">×</div>
          </div>
        </div>
        <div class="content">
          <div class="table-layout">
            <el-table
              ref="multipleTable"
              :data="dataList"
              tooltip-effect="dark"
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
              max-height="430">
              <el-table-column
                type="selection"
                width="70">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="goodsNo"
                label="配件编号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="goodsVendorNo"
                label="生产编码"
                width="200">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="配件名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="goodsUnit"
                label="单位"
                width="100">
              </el-table-column>
              <el-table-column
                label="退料数量"
                prop="returnNum"
                width="100">
                <template slot-scope="scope">
                  <div>
                    <input class="table-ipt-num" type="text" @change="returnNumChange(scope.row)"
                           v-model="scope.row.returnNum">
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="退料仓库"
                prop="outputWavehouseName"
                width="200">
              </el-table-column>
              <el-table-column
                label="退料库位"
                prop="outputLocationName"
                width="200">
              </el-table-column>
              <el-table-column
                prop="costPrice"
                label="退料单价"
                width="100">
              </el-table-column>
              <el-table-column
                prop="returnTotalPrice"
                label="退料金额"
                width="100">
                <template slot-scope="scope">
                  <span>{{Number((scope.row.returnNum*scope.row.costPrice).toFixed(2))}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="batchNo"
                label="批次号"
                width="200">
              </el-table-column>
            </el-table>

          </div>

        </div>
        <div class="closeBtn">
          <button type="button" class="btn" @click.prevent="returnMaterial" v-if="sale!='sale'">确认退料</button>
          <button type="button" class="btn" @click.prevent="returnGoods" v-if="sale=='sale'">确认退料</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {isInteger} from '@/assets/js/logic'

  export default {
    name: 'return-material',
    props: ['maskData','sale'],//是否是销售配件弹窗
    data() {
      return {
        selectNo: null,
        dataList: [],
        multiplePartSelection: [],
      }
    },

    mounted() {
      this.fetchDeliverPartsList();
    },
    methods: {
      fetchDeliverPartsList() {//获取已发料配件
        let maskData = this.maskData;
        if(this.sale=='sale'){
          this.$axios.post('/admin/stock/orderDeliverInfo/getSaleOutputList', {
            id: maskData.id,
            selectNo: this.selectNo,
            businessType: maskData.businessType
          }).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.dataList = data.value;
              // this.dataList.map(val => val.returnNum = val.num);
            }
          })
        }else{
          this.$axios.post('/admin/stock/orderDeliverInfo/getOutputList', {
            id: maskData.id,
            selectNo: this.selectNo,
            businessType: maskData.businessType
          }).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.dataList = data.value;
              // this.dataList.map(val => val.returnNum = val.num);
            }
          })
        }
      },
      close() {//关闭退料弹窗
        this.$emit('hideReturnMaterialMask');
      },
      returnNumChange(data) {

        if (!isInteger(data.returnNum)) {
          return this.$message.error(`配件${data.goodsNo}的退料数量必须为整数`);
        }
        // this.dataList[scope.$index].returnNum = toInteger(scope.row.returnNum);
        if (data.returnNum > data.num) {
          return this.$message.error(`配件${data.goodsNo}的退料数量不能大于可退数量`);
        }
      },
      returnMaterial() {
        if (!this.multiplePartSelection.length) {
          return this.$message.error('请选择要退料的配件');
        }
        let returnDetails = [];
        for (let val of  this.multiplePartSelection) {
          if (!isInteger(val.returnNum)) {
            return this.$message.error(`配件${val.goodsNo}的退料数量必须为整数`);
          }
          if (val.returnNum > val.num) {
            return this.$message.error('退料数量不能大于可退数量');
          }

          returnDetails.push({
            stockOrderDeliverDetailMatchLogId: val.id,
            returnNum: val.returnNum
          });
        }

        this.$axios.post('/admin/stock/outPutInfo/work/return', {
          stockOrderDeliverInfoId: this.maskData.id,
          returnDetails: returnDetails
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.$message.success('退料成功');
            this.$emit('hideReturnMaterialMask', true,data.value);
          }
        })
      },
      returnGoods(){
        if (!this.multiplePartSelection.length) {
          return this.$message.error('请选择要退料的配件');
        }
        let returnDetails = [];
        for (let val of  this.multiplePartSelection) {
          if (!isInteger(val.returnNum)) {
            return this.$message.error(`配件${val.goodsNo}的退料数量必须为整数`);
          }
          if (val.returnNum > val.num) {
            return this.$message.error('退料数量不能大于可退数量');
          }

          returnDetails.push({
            stockSaleOrderDetailMatchLogId: val.id,
            returnNum: val.returnNum
          });
        }

        this.$axios.post('/admin/stock/outPutInfo/sale/return', {
          saleDeliverInfoId: this.maskData.id,
          returnDetails: returnDetails
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.$message.success('退料成功');
            this.$emit('hideReturnMaterialMask', true,data.value);
          }
        })
      },
      handleSelectionChange(val) {
        this.multiplePartSelection = val;
       },
      getSummaries(param) {
        const {columns} = param;
        const data = this.multiplePartSelection;
        const sums = [];
        let values = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (column.property === 'returnNum') {
            values = data.map(item => Number(item.returnNum))
          } else if (column.property === 'returnTotalPrice') {
            values = data.map(item => Number(item.returnNum*item.costPrice))
          }
          const computedPropertyArr = ['returnNum', 'returnTotalPrice'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(prev)
              if (!isNaN(value)) {
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

    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';

  .addform {
    width: 900px;
    padding-bottom: 0px;
    .addTitle {
      margin-bottom: 0px;
      .searchZone {
        display: flex;
        .group {
          margin-right: 20px;
        }
        .el_box {
          width: 100px;
          height: 30px;
        }
        .left {
          width: auto;
          margin-right: 10px;
        }
        .input {
          width: 100px;
          height: 28px;
          border: $border;
        }
      }
    }
    .content {
      max-height: 460px;
      padding: 20px;
      /*border-bottom: 1px solid #ccc;*/
      .left {
        width: 250px;
        height: 400px;
        border-right: 1px solid #ccc;
        float: left;
        overflow: scroll;
      }
      .right {
        width: 649px;
        height: 400px;
        float: left;
        overflow-y: scroll;
        .tableZone {
          height: 500px;
          .table_wrap {
            border-radius: 0px;
            margin-top: 0px;
          }
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
    .table-layout {
      border: 1px solid #ecf1f4;
    }
    .w150{
      width: 180px !important;
    }
  }
</style>
