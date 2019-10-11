<template>
  <div>
    <div class="zzc">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser">选择配件</div>
          <div class="searchZone">
            <div class="group" v-if="billType">
              <span class="left">价格方案</span>
              <div class="right">
                <el-select v-model="model.priceType" class="el_box " placeholder="请选择">
                  <el-option
                    v-for="item in priceTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left" >配件编号/名称:</span>
              <div class="right">
                <input type="text" class="input w170" placeholder="配件编号/原厂编号/配件名称" v-model.trim="model.likeName">
              </div>
            </div>
            <div class="group">
              <span class="left">配件品牌:</span>
              <div class="right">
                <input type="text" class="input" placeholder="配件品牌" v-model.trim="model.goodsBrandName">
              </div>
            </div>
            <div class="group">
              <div class="left" v-if="isPartSale">
                <label class="checkBox">
                  <input type="checkbox" v-model="model.isStock">
                  <span></span>有库存
                </label>
              </div>
              <div class="right">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
               :expand-on-click-node="false"
            >
            </el-tree>
          </div>
          <div class="right parts">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll ">
                    <el-table
                      :data="dataList"
                      max-height="295"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                    >
                      <el-table-column
                        label="配件编号"
                        min-width="119"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件名称"
                        min-width="124"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件品牌"
                        min-width="124"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <!--<el-table-column-->
                        <!--label="产地"-->
                        <!--min-width="124"-->
                        <!--show-overflow-tooltip-->
                      <!--&gt;-->
                        <!--<template slot-scope="scope">-->
                          <!--{{scope.row.goodsOriginArea}}-->
                        <!--</template>-->
                      <!--</el-table-column>-->
                      <!--<el-table-column-->
                        <!--label="适用品牌"-->
                        <!--min-width="75"-->
                        <!--show-overflow-tooltip-->
                      <!--&gt;-->
                        <!--<template slot-scope="scope">-->
                          <!--{{scope.row.carTypeDesc}}-->
                        <!--</template>-->
                      <!--</el-table-column>-->
                      <!--<el-table-column
                        label="商品性能"
                        min-width="100"
                        key="5"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsFunc}}
                        </template>
                      </el-table-column>-->
                      <el-table-column
                        label="库存"
                        min-width="50"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.currentStock}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="锁定库存"
                        min-width="75"
                        show-overflow-tooltip
                        v-if="isPartSale"
                      >
                        <template slot-scope="scope">
                          {{scope.row.lockStock}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="成本价"
                        min-width="60"
                        show-overflow-tooltip
                        v-if="isNewPart"
                      >
                        <template slot-scope="scope">
                          {{scope.row.unitPrice}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="销售价"
                        min-width="70"
                        show-overflow-tooltip
                        v-if="isPartSale"
                      >
                        <template slot-scope="scope">
                          <span v-if="scope.row.unitPrice==null">
                             暂无
                          </span>
                         <span v-else>
                            {{scope.row.unitPrice}}
                         </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="上次进价"
                        min-width="75"
                        show-overflow-tooltip
                        v-if="!isPartSale&&!isNewPart"
                      >
                        <template slot-scope="scope">
                          {{scope.row.lastPrice}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="数量"
                        min-width="60"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <!--<input type="number" style="width: 55px;" v-model.number="scope.row.applyNum">-->
                          <el-input type="number"  v-model.number="scope.row.applyNum"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        min-width="60"
                        key="10"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                           <span class="disabled" v-if="isPartSale&&scope.row.unitPrice===null">添加</span>
                          <span class="text-btn" v-else @click="addParts(scope.row)">添加</span>
                        </template>
                      </el-table-column>
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
    props: ['isPartSale','billType','isNewPart','storeId'],//是否是销售配件弹窗
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        model: {
          likeName: null,//搜索关键字
          categoryId: null,//分类id
          // carTypeDesc: null,//车辆品牌
          goodsBrandName:null,//配件品牌
          priceType: 101,//价格方案
          isStock: true,//是否有库存
          goodsStoreId:null,//
          pageNo: 1,
          pageSize: 20
        },
        dataList: [],
        priceTypeList: [],
      }
    },

    mounted() {
      //console.log('门店id'+this.storeId);
      this.model.goodsStoreId=this.storeId;
      this.fetchTree();
      if (this.isPartSale) {
         switch (this.billType) {
          case 1://一般维修
            this.model.priceType = 101;//零售价
            break;
          case 2://事故维修
            this.model.priceType = 102;//保险价
            break;
          case 3://首保
            this.model.priceType = 103;//索赔价
            break;
          case 4://二保
            this.model.priceType = 101;//零售价
            break;
           case 5://定期保养
             this.model.priceType = 101;//零售
             break;
           case 6://厂家索赔
             this.model.priceType = 103;//索赔价
             break;
           case 7://售后精品
             this.model.priceType = 101;//零售价
             break;
           case 8://洗车美容
             this.model.priceType = 101;//零售价
             break;
          default://其他 销售价
            this.model.priceType = 101;
        }

        this.fetchPriceType();
      }
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}) {
        return 'height:20px;font-size:12px;padding:5px 0px';
      },
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;font-size:13px;padding:10px 0px'
        }
      },
      fetchTree() {
        this.$axios.get('/admin/goods/classInfo/partsTree').then(res => {
          let data = this.AppUtils.checkResponse(res);
          //console.log(data);
          if (data) {
            this.treeData = data.value;
          }
        })
      },
      fetchPriceType() {
        this.$axios.get('/admin/goods/goodsBaseInfo/goodsPriceType').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.priceTypeList = data.value;
          }
        })
      },
      //根据id获取配件
      handleNodeClick(data) {
        if (data.id) {
          this.model.categoryId = data.id;
          this.fetchData();
        }
      },
      fetchData(args) {
        //初始化分页
        this.model.pageNo = 1;
        this.model.pageSize = 20;
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }
        if (this.isPartSale) {//获取销售配件列表
          this.$axios.post('/admin/goods/goodsBaseInfo/saleLayerList', this.model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              //console.log(data);
              this.dataList = data.value.data;
            }
            //初始化分页
            //initPage 参数：总条数 当前页数 每页多少条
            if (data.value.data.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          })
        } else if(this.isNewPart){
          var obj=JSON.parse(JSON.stringify(this.model));
          delete obj['priceType'];
          delete obj['isStock'];
          this.$axios.post('/admin/goods/goodsBaseInfo/otherLayerList',obj).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              //console.log(data);
              this.dataList = data.value.data;
            }
            //初始化分页
            //initPage 参数：总条数 当前页数 每页多少条
            if (data.value.data.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          })
        }else {//获取采购配件列表
          this.$axios.post('/admin/goods/goodsBaseInfo/partsLayerList', this.model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              //console.log(data);
              this.dataList = data.value.data;
            }
            //初始化分页
            //initPage 参数：总条数 当前页数 每页多少条
            if (data.value.data.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          })
        }

      },
      addParts(data) {
        //console.log(data);
        //console.log(data.applyNum)
        if (/^[1-9]\d*$/.test(data.applyNum)) {//配件数量为数字且大于一
          this.$emit('addParts', JSON.parse(JSON.stringify(data)));
        } else {
          this.$message.error('请输入正确的配件数量');
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
  @import '../assets/css/cover.css';

  .addform {
    width: 1139px;
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
        width: 922px;
        height: 400px;
        float: left;
        overflow-y: scroll;
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
