<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchDeliverPartsList">
        <div class="addTitle">
          <div class="addUser">历史发料信息</div>
          <div class="searchZone">
            <div class="close" @click="close">×</div>
          </div>
        </div>
        <div class="content">
          <div class="table-layout">
            <el-table
              ref="multipleTable"
              :data="maskData.historyOrderDTO"
              tooltip-effect="dark"
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
              max-height="430"
              >
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
                prop="qty"
                label="数量"
                width="100">
              </el-table-column>
              <el-table-column
                label="仓库"
                prop="waveHouseName"
                width="200">
              </el-table-column>
              <el-table-column
                label="库位"
                prop="locationName"
                width="200">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="100">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="金额"
                width="100">
                <template slot-scope="scope">
                  <span>{{Number((scope.row.qty*scope.row.price).toFixed(2))}}</span>
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
          <button type="button" class="btn" @click="confirmSend">确认发料</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'history-send-material',
    props: ['maskData'],//是否是销售配件弹窗
    data() {
      return {
        selectNo: null,
        dataList: [],
        multiplePartSelection: [],
      }
    },

    mounted() {
    },
    methods: {
      confirmSend(){
        this.$emit('hideHistoryMask',true);
      },
      close() {//关闭退料弹窗
        this.$emit('hideHistoryMask');
      },
      getSummaries(param) {
        const {columns,data} = param;
         const sums = [];
        let values = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (column.property === 'qty') {
            values = data.map(item => Number(item.qty))
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.qty * item.price))
          }
          const computedPropertyArr = ['qty', 'totalPrice'];
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
  }
</style>
