<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser">(双击)选择配件</div>
          <div class="searchZone">
            <div class="group">
              <span class="left" >商品编码/名称:</span>
              <div class="right">
                <input type="text" class="input w170" placeholder="商品编码/名称" v-model.trim="model.likeName">
                <button type="button" class="btn ml10" @click="fetchData">查询</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="right parts">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll ">
                    <el-table
                      :data="dataList"
                      max-height="320"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                      @row-dblclick="dataBackFillGoods"
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        key="1"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        label="配件编码"
                        min-width="119"
                        show-overflow-tooltip
                        key="2"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件名称"
                        min-width="119"
                        show-overflow-tooltip
                        key="3"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="生产编码"
                        min-width="119"
                        show-overflow-tooltip
                        key="4"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsVendorNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件品牌"
                        min-width="120"
                        show-overflow-tooltip
                        key="5"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单位"
                        width="50"
                        show-overflow-tooltip
                        key="6"
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="成本单价"
                        min-width="60"
                        show-overflow-tooltip
                        key="7"
                      >
                        <template slot-scope="scope">
                          {{scope.row.averagePrice}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="库存数量"
                        min-width="60"
                        show-overflow-tooltip
                        key="8"
                      >
                        <template slot-scope="scope">
                          {{scope.row.currentStock}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="数量"
                        min-width="60"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <!--<input type="number" style="width: 55px;" v-model.number="scope.row.applyNum">-->
                          <el-input type="number"  v-model.number="scope.row.adjustmentNum"></el-input>
                        </template>
                      </el-table-column>
                      <!--<el-table-column-->
                        <!--label="操作"-->
                        <!--width="60"-->
                        <!--key="8"-->
                        <!--show-overflow-tooltip-->
                      <!--&gt;-->
                        <!--<template slot-scope="scope">-->
                          <!--<span class="text-btn"  @click="addParts(scope.row)">添加</span>-->
                        <!--</template>-->
                      <!--</el-table-column>-->
                    </el-table>
                  </div>
                  <div class="pagination paddingReset" v-if="dataList.length">
                    <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closeBtn">
          <button type="button" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'addParts',
    props:['waveId'],
    data() {
      return {
        model: {
          likeName: null,//搜索关键字
          warehouseId:null,//仓库id
          pageNo: 1,
          pageSize: 20
        },
        dataList: [],
      }
    },

    mounted() {
      this.model.warehouseId=this.waveId;
      this.fetchData();
    },
    methods: {
      dataBackFillGoods(data,event){
        // console.log(data);
        this.addParts(data);
      },
      addParts(data) {
        // console.log(data);
        // if (/^(-)?\d*$/.test(data.adjustmentNum)) {//配件数量为数字且大于一
        //   this.$emit('addParts', JSON.parse(JSON.stringify(data)));
        // } else {
        //   this.$message.error('请输入正确的配件数量');
        // }
        this.$emit('addParts', JSON.parse(JSON.stringify(data)));
      },
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/goods/goodsBaseInfo/adjustLayerList',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          // console.log(data);
          if(data) {
            this.dataList=data.value.data;
            // this.dataList=data.value.data.listInfo;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      cellStyle({row, column, rowIndex, columnIndex}) {
        return 'height:20px;font-size:12px;padding:5px 0px';
      },
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;font-size:13px;padding:10px 0px'
        }
      },

      //关闭新增配件弹窗
      close() {
        this.$emit('hidePartMask');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';

  .addform {
    width: 1000px;
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
      height: 400px;
      border-bottom: 1px solid #ECF1F4;
      .left {
        width: 210px;
        height: 400px;
        border-right: 1px solid #ECF1F4;
        float: left;
        overflow: scroll;
      }
      .right {
        width: 1000px;
        height: 400px;
        float: left;
        /*overflow-y: scroll;*/
        .tableZone {
          height: 399px;
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
    .breaking {
      width: 200px;
    }
    .w170{
      width: 170px !important;
    }
    .disabled{
      cursor: not-allowed;
      color: #999;

    }
  }
</style>
