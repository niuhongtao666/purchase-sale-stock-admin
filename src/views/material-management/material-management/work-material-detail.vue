<template>
  <div>
    <div class="item">
      <div class="item-title">
        <i class="business-info_icon"></i>
        <h2>业务信息</h2>
      </div>
      <div class="main-title">
        <span class="lColor">发料单号：<span class="rColor mr0">{{model.deliverInfoDTO.deliverOrderNo}}</span></span>
        <span class="lColor">状态：<span class="rColor mr0">{{model.deliverInfoDTO.orderState | materialOrderState}} </span></span>
        <span class="lColor mr0">创建时间：<span class="rColor mr0">{{model.deliverInfoDTO.createTime | dateFormatToSecond}} </span></span>
      </div>
      <div class="item-content ">
        <div class="table-layout setMinWidth">
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>客户名称</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.saleCustName}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 客户手机</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.saleCustMobile}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 业务单号</div>
                </div>
                <div class="right" style="padding-left: 5px;box-sizing: border-box">
                  {{model.deliverInfoDTO.dataSourceNo}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 业务人员</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.createUserName}}

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">

            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 车辆配置</div>
                </div>
                <div class="right ">
                  <div class="breaking"> {{model.deliverInfoDTO.carConfig}}</div>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 车牌号码</div>
                </div>
                <div class="right breaking">
                  {{model.deliverInfoDTO.carNumber}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> VIN码</div>
                </div>
                <div class="right" style="padding-left: 5px;box-sizing: border-box">
                  {{model.deliverInfoDTO.vinCode}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 发动机号</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.engineCode}}

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 单据类型</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.billType | billState}}

                </div>
              </div>
            </div>

            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 业务类型</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.businessType | businessState}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div> 配件数量</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.goodsNum}}

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>配件金额(含税)</div>
                </div>
                <div class="right">
                  {{model.deliverInfoDTO.totalPrice}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="item" v-if="model.deliverInfoDTO.orderState<200">
      <div class="item-title">
        <i class="wait-send_icon"></i>
        <h2>待发料配件</h2>
      </div>
      <div class="item-content">
        <div class="btn-layout">
          <el-select v-model="repairType" @change="fetchPartsList" filterable class="el_box " clearable
                     placeholder="请选择">
            <el-option
              v-for="item in repairTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <button type="button" class="btn  " v-if="buttonInfo.addGoods" @click="partMaskShow=true">
            {{buttonInfo.addGoods}}
          </button>
          <button type="button" class="btn" v-if="buttonInfo.addGoods" @click="importFlag=true">导入配件</button>
          <button type="button" class="btn" v-if="buttonInfo.outputOk" @click="sendMaterial">{{buttonInfo.outputOk}}
          </button>

          <button type="button" class="btn" v-if="buttonInfo.addGoods" @click="delParts">删除</button>
        </div>
        <div class="table-layout border-none">

          <el-table
            ref="multipleTable"
            :data="model.deliverDetailDTOS"
            tooltip-effect="dark"
            max-height="560"
            style="width: 100%"
            border
            show-summary
            :summary-method="getSummaries"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              min-width="150"
              show-overflow-tooltip
            >
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
              label="待发料数"
              prop="waitDeliverNum"
              min-width="100">
              <template slot-scope="scope">
                <div>
                  <input
                    v-if="(!scope.row.isMeal)&&buttonInfo.addGoods"
                    class="table-ipt-num" type="text" v-model="scope.row.waitDeliverNum"
                    @change="revampWaitDeliverNum(scope.row)">
                  <span v-else>{{scope.row.waitDeliverNum}}</span>

                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="本次发料数"
              prop="curOrderNum"
              min-width="100">
              <template slot-scope="scope">
                <div>
                  <input v-if="(model.deliverInfoDTO.orderState<200)&&buttonInfo.addGoods"
                         class="table-ipt-num" type="text" v-model="scope.row.curOrderNum"
                         @change="revampCurOrderNum(scope.row)">
                  <span v-else>{{scope.row.curOrderNum}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="仓库"
              min-width="160">
              <template slot-scope="scope">
                <div>
                  <el-select
                    v-if="(model.deliverInfoDTO.orderState<200||model.deliverInfoDTO.dataSourceType===210)&&buttonInfo.addGoods"
                    placeholder="请选择" class="el_box w140" @change="wavehouseSwitch(scope.row)"
                    v-model="scope.row.wavehouseName"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in warehouseList"
                      :key="item.wavehouseId"
                      :label="item.wavehouseName"
                      :value="item.wavehouseName">
                    </el-option>
                  </el-select>
                  <span v-else>{{scope.row.wavehouseName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="currentStock"
              label="实际库存"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="lockStock"
              label="锁定库存"
              width="80">
            </el-table-column>
            <el-table-column
              prop="goodsUnit"
              label="单位"
              min-width="60">
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="销售单价(含税)"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="销售总价(含税)"
              min-width="120">
              <template slot-scope="scope">
                <div>
                  {{ Number((scope.row.curOrderNum*scope.row.unitPrice).toFixed(2))}}
                </div>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="favourablePrice"-->
              <!--label="优惠金额"-->
              <!--min-width="80">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="averageCostPrice"
              label="成本单价(含税)"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="totalCastPrice"
              label="成本总价(含税)"
              min-width="120">
              <template slot-scope="scope">
                <div>
                  {{ Number((scope.row.curOrderNum*scope.row.averageCostPrice).toFixed(4))}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="价格方案"
              min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.priceType | priceType}}</span>
              </template>

            </el-table-column>

            <!--<el-table-column-->
            <!--label="库位"-->
            <!--min-width="200">-->
            <!--<template slot-scope="scope">-->
            <!--<div>-->
            <!--<el-select v-if="model.deliverInfoDTO.orderState<200" placeholder="请选择" class="el_box" @focus="fetchLocationInfoByWaveId(scope.row.wavehouseId)"-->
            <!--@change="locationChange(scope.row)" v-model="scope.row.locationName">-->
            <!--<el-option-->
            <!--v-for="item in locationList"-->
            <!--:key="item.locationId"-->
            <!--:label="item.locationName"-->
            <!--:value="item.locationName">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--<span v-else>{{scope.row.locationName}}</span>-->
            <!--</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="套餐ID"
              min-width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isMeal">{{scope.row.mealId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="repairTypeName"
              label="维修类型"
              min-width="100">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">
        <i class="send-log_icon"></i>
        <h2>发料配件（不含退料）</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="model.doneDeliverDetailDTOS"
            tooltip-effect="dark"
            show-summary
            :summary-method="getSummariesNew"
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
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              min-width="150"
              show-overflow-tooltip
            >
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
              prop="alreadySendNum"
              label="已发料数"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsUnit"
              label="单位"
              width="50">
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="销售单价(含税)"
              min-width="130">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="销售总价(含税)"
              min-width="130">
              <template slot-scope="scope">
                <div>
                  {{ Number((scope.row.alreadySendNum*scope.row.unitPrice).toFixed(2))}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="价格方案"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.priceType | priceType}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="套餐ID"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isMeal">{{scope.row.mealId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="repairTypeName"
              label="维修类型"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item" v-if="model.stockLogDTOS.length" style="margin-bottom: 50px">
      <div class="item-title">
        <i class="send-log_icon"></i>
        <h2>发料记录</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-none">
          <el-table
            :data="model.stockLogDTOS"
            tooltip-effect="dark"
            border
            style="width: 100%">
            <el-table-column
              label="操作"
              width="60">
              <template slot-scope="scope">
                <span class="text-btn" @click="print([scope.row.id])">打印</span>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="出库单号"
              show-overflow-tooltip
              min-width="200">
              <template slot-scope="scope">
                <router-link class="primary"
                             :to="'/inventory-management/material-out/detail/id/'+scope.row.id+'/businessType/2'">
                  {{scope.row.outputOrderNo}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalNum"
              label="出库数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="receivePrice"
              label="销售总价(含税)"
              min-width="105"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="totalCostPrice"
              label="成本总价(不含税)"
              min-width="110"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="outputUserName"
              label="出库人"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="出库状态"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>已出库</span>
              </template>
            </el-table-column>
            <el-table-column
              label="出库时间"
              show-overflow-tooltip
              min-width="200"
            >
              <template slot-scope="scope">
                <span>{{scope.row.createTime | dateFormatToSecond}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="saveBtn">
      <button type="button" v-if="model.deliverInfoDTO.orderState<200&&model.stockLogDTOS.length&&buttonInfo.retrunList"
              class="btn" @click="showReturnMaterialMask">{{buttonInfo.retrunList}}
      </button>
      <button type="button" v-if="buttonInfo.export" class="btn" @click="exportData">{{buttonInfo.export}}</button>
      <button type="button" v-if="model.stockLogDTOS&&model.stockLogDTOS.length&&buttonInfo.printAll" class="btn"
              @click="printAll">{{buttonInfo.printAll}}
      </button>
    </div>
    <import-parts v-if='importFlag' @importHide="importHide" @getImportData="getImportData"
                  importType="stockDeliverImportGoods" :storeId="storeId"></import-parts>
    <part-add v-if="partMaskShow" :isPartSale="true" :billType="model.deliverInfoDTO.billType"
              @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <return-material v-if="returnMaterialMaskShow" :maskData="maskData"
                     @hideReturnMaterialMask="hideReturnMaterialMask"></return-material>
    <print-box v-if="printMaskShow" @hidePrintMask="hidePrintMask">
      <template>
        <delivery-order-print :printData="printData" :vin="model.deliverInfoDTO.vinCode"></delivery-order-print>
      </template>
    </print-box>
  </div>
</template>

<script>
  import returnMaterial from './return-material'
  import {checkDataExit, isInteger} from '@/assets/js/logic'
  import printBox from '@/components/print-box'
  import deliveryOrderPrint from './delivery-order-print.vue'

  export default {
    name: 'work-material-detail',
    components: {
      returnMaterial,
      printBox,
      deliveryOrderPrint
    },
    data() {
      return {
        printMaskShow: false,//打印
        printData: null,
        partMaskShow: false,//新增配件
        importFlag: false,//导入
        returnMaterialMaskShow: false,//退料
        multiplePartSelection: [],// 配件多选
        categoryList: [],
        // goodsFirstClass: null,//配件一级分类id
        repairType:null,//维修类型
        maskData: null,
        businessType: 2,//
        materialOrderId: null,
        warehouseList: [],//仓库
        locationList: [],//库位
        model: {
          deliverInfoDTO: {},//销售信息
          deliverDetailDTOS: [],//待发料配件
          stockLogDTOS: [],//发料记录
          doneDeliverDetailDTOS:[],
        },
        repairTypes:[
          {
            id:1,
            name:'定期保养'
          },
          {
            id:2,
            name:'机修'
          },
          {
            id:3,
            name:'钣喷'
          },
          {
            id:4,
            name:'美容装饰'
          },
          {
            id:5,
            name:'售后精品'
          },
          {
            id:6,
            name:'其他'
          },
        ],
        storeId: null,//门店id
      }
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(15);
      },
    },
    mounted() {
      this.materialOrderId = this.$route.params.id;
      // this.fetchCategories();

      this.fetchData();
    },
    methods: {
      // getWave(arg){
      //   if(arg){
      //     this.fetchWarehousetByUserId();
      //   }
      // },
      fetchData() {
        this.$axios.get(`/admin/stock/orderDeliverInfo/detail/${this.materialOrderId}?businessType=${this.businessType}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.model = data.value;
            ////console.log(this.model.doneDeliverDetailDTOS);
            this.storeId = data.value.deliverInfoDTO.storeId;
            this.initCurOrderNum();
            this.fetchStoreWave();
          }
        })
      },
      fetchPartsList() {//获取发料单配件
        this.$axios.post('/admin/stock/orderDeliverInfo/goodsList', {
          id: this.materialOrderId,
          businessType: this.businessType,
          repairType: this.repairType
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);

          if (data) {
            this.model.deliverDetailDTOS = data.value;
            this.initCurOrderNum();
          }
        })
      },
      fetchCategories() {
        this.$store.dispatch('fetchCategories', 0).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.categoryList = data.value;
            this.categoryList.unshift({id: null, name: '全部一级分类'});
          }
        })
      },
      fetchStoreWave() {
        if (!this.warehouseList.length) {
          this.$store.dispatch('fetchStoreWave', this.storeId).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.warehouseList = data.value;
            }
          })
        }
      },
      wavehouseSwitch(data) {//选择仓库
        this.locationList = [];
        data.locationId = null;
        data.locationName = null;
        for (let val of this.warehouseList) {
          if (val.wavehouseName === data.wavehouseName) {
            data.wavehouseId = val.wavehouseId;
          }
        }

        // this.fetchLocationInfoByWaveId(data.wavehouseId);
        this.updatePartsList(data);

      },
      updatePartsList(orderDeliverDetailDTO) {
        this.$axios.post('/admin/stock/orderDeliverInfo/updateWavehouseInfo', {
          id: this.materialOrderId,
          businessType: this.businessType,
          orderDeliverDetailDTO: orderDeliverDetailDTO,
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.initData(data.value);
          }
        })
      },
      // fetchLocationInfoByWaveId(wavehouseId) {//获取库位
      //   if (wavehouseId) {
      //     this.$store.dispatch('fetchLocationInfoByWaveId', wavehouseId).then(res => {
      //       let data = this.AppUtils.checkResponse(res);
      //       if (data) {
      //         this.locationList = data.value;
      //       }
      //     })
      //   }
      // }
      // ,
      locationChange(data) {
        for (let val of this.locationList) {
          if (val.locationName === data.locationName) {
            data.locationId = val.locationId;
            // return this.saveEditParts(data);//库位修改 保存配件
          }
        }
      }
      ,
      sendMaterial() {//发料
        if (!this.multiplePartSelection.length) {
          return this.AppUtils.alert('请选择要发料的配件')
        }
        let outputDetails = [];

        for (let val of this.multiplePartSelection) {
          if (!isInteger(val.waitDeliverNum)) {
            return this.$message.error(`配件${val.goodsNo}的待发料数必须为整数`);
          }
          if (val.waitDeliverNum <= 0) {
            return this.$message.error(`配件${val.goodsNo}的待发料数必须大于0`);
          }

          if (!isInteger(val.curOrderNum)) {
            return this.$message.error(`配件${val.goodsNo}的本次发料数必须为整数`);
          }
          if (val.curOrderNum <= 0) {
            return this.$message.error(`配件${val.goodsNo}的本次发料数必须大于0`);
          }
          if (val.curOrderNum > val.waitDeliverNum) {
            return this.$message.error(`配件${val.goodsNo}的本次发料数不能大于待发料数`);
          }
          if (val.curOrderNum > val.currentStock) {
            return this.$message.error(`配件${val.goodsNo}的库存不足`);
          }

          if (!val.wavehouseId) {
            return this.$message.error(`配件${val.goodsNo}的仓库不能为空`);
          }
          // if (!val.locationId) {
          //   return this.$message.error('配件库位不能为空');
          // }
          let obj = {
            stockOrderDeliverDetailId: val.id,
            outputNum: val.curOrderNum,
            warehouseId: val.wavehouseId,
            // locationId: val.locationId
          };
          outputDetails.push(obj);
        }

        this.AppUtils.confirm('确认发料后将生成出库单，是否确认？', () => {
          this.$axios.post('/admin/stock/outPutInfo/work/output', {
            stockOrderDeliverInfoId: this.materialOrderId,
            outputDetails: outputDetails
          }).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              ////console.log(data)
                this.$message.success('发料成功');
              // this.AppUtils.alert('发料成功', () => {
                this.fetchData();
                this.print([data.value]);
              // });
            }
          })
        })

      },
      exportData() {//导出配件
        this.$axios.post('/admin/stock/orderDeliverInfo/export', {
          id: this.materialOrderId,
          businessType: this.businessType,
          goodsFirstClass: this.goodsFirstClass
        }, {responseType: 'arraybuffer'}).then(res => {
          let fileName = `发料单${this.model.deliverInfoDTO.deliverOrderNo}.xls`;

          let blob = new Blob([res.data], {type: 'application/x-xls'});
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        })

      }
      ,
      print(ids) {//打印
        this.printMaskShow = true;
        this.printData = {
          businessType: 2,
          ids: ids,
        };

      }
      ,
      printAll() {//整单打印
        let ids = [];
        this.model.stockLogDTOS.forEach(val => {
          ids.push(val.id);
        });
        this.print(ids)
      },
      hidePrintMask() {
        this.printMaskShow = false;

      },
      handleSelectionChange(val) {
        this.multiplePartSelection = val;
      }
      ,
      addParts(data) {
        data.orderNum = data.applyNum;
        let index = checkDataExit(this.model.deliverDetailDTOS, data);
        data.goodsType = 1;
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.saveAddParts(data);
          })
        } else {
          this.saveAddParts(data);
        }
      }
      ,
      saveAddParts(data) {//保存新增配件
        this.$axios.post('/admin/stock/orderDeliverInfo/addGoods',
          {
            id: this.materialOrderId,
            businessType: this.businessType,
            orderDeliverDetailDTO: data,
          }
        ).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.$message.success('添加成功');
            this.initData(data.value);

          }
        })
      }
      ,
      revampWaitDeliverNum(data) {//修改待发料数
        if (!isInteger(data.waitDeliverNum)) {
          return this.$message.error(`配件${data.goodsNo}的待发料数必须为整数`);
        }
        if (data.waitDeliverNum <= 0) {
          return this.$message.error(`配件${data.goodsNo}的待发料数必须大于0`);
        }
        if (data.curOrderNum > data.waitDeliverNum) {
          return this.$message.error(`配件${data.goodsNo}的待发料数不能小于本次发料数`);
        }
        this.saveEditParts(data);
      }
      ,
      revampCurOrderNum(data) {//修改本次发料数

        if (!isInteger(data.curOrderNum)) {
          return this.$message.error(`配件${data.goodsNo}的本次发料数必须为整数`);
        }
        if (data.curOrderNum > data.waitDeliverNum) {
          return this.$message.error(`配件${data.goodsNo}的本次发料数不能大于待发料数`);
        }
        // this.model.deliverDetailDTOS[scope.$index].curOrderNum = toInteger(scope.row.curOrderNum);


        // this.saveEditParts(data);


      }
      ,
      saveEditParts(data) {//保存修改配件
        let deliverDetailDTOS = this.model.deliverDetailDTOS;
        this.$axios.post('/admin/stock/orderDeliverInfo/updateGoods', {
          id: this.materialOrderId,
          businessType: this.businessType,
          orderDeliverDetailDTO: data,
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.initData(data.value);

          }
        })
      }
      ,
      exportInParts(orderDeliverDetailDTOS) {//导入配件
        this.$axios.post(`/admin/stock/orderDeliverInfo/bacthInsertGoods?id=${this.materialOrderId}`, orderDeliverDetailDTOS).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.$Message.success('导入成功');
            this.initData(data.value);

          }
        })
      },
      delParts() {//删除配件
        if (!this.multiplePartSelection.length) {
          return this.AppUtils.alert('请选择要删除的配件');
        }
        let detailIds = [];
        for (let val of  this.multiplePartSelection) {
          if (val.isMeal) {
            return this.AppUtils.alert('请联系业务删除套餐中的配件！');
          }
          detailIds.push(val.id)

        }
        this.$axios.post('/admin/stock/orderDeliverInfo/delete', {
          id: this.materialOrderId,
          businessType: this.businessType,
          detailIds: detailIds,
        }).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.$message.success('删除成功');
            this.initData(data.value);
          }
        })
      },
      initData(data) {
        this.model.deliverDetailDTOS = data.deliverDetailDTOS;
        this.model.deliverInfoDTO = data.deliverInfoDTO;
        this.initCurOrderNum();
      },
      initCurOrderNum() {//初始化本次发料数
        // waitDeliverNum  curOrderNum
        let deliverDetailDTOS = this.model.deliverDetailDTOS;
        deliverDetailDTOS.forEach(val => {
          if (val.waitDeliverNum > val.currentStock) {
            val.curOrderNum = val.currentStock;
          } else {
            val.curOrderNum = val.waitDeliverNum;
          }
        })
      },
      hidePartMask(refreshFlag) {//隐藏配件弹窗
        this.partMaskShow = false;
        if (refreshFlag) {
          this.fetchData();
        }
      },
      importHide() { //关闭导入配件弹层
        this.importFlag = false;
      },
      getImportData(data) {
        let exitFlag = false;
        for (let val of data) {
          let index = checkDataExit(this.model.deliverDetailDTOS, val);
          if (index > -1) {
            exitFlag = true;
            return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
          }
        }
        !exitFlag && this.exportInParts(data);
      },
      showReturnMaterialMask() {
        this.maskData = {
          businessType: this.businessType,
          id: this.materialOrderId,
        };
        this.returnMaterialMaskShow = true;
      },
      hideReturnMaterialMask(data,pr) {
        if (data) {
          this.fetchData();
          // alert(pr);
          this.print([pr]);
        }
        this.returnMaterialMaskShow = false;
      },
      showChkBox(row, index) {
        if (row.mealNo) {
          return false;
        } else {
          return true;
        }
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        let values = [];

        columns.forEach((column, index) => {
          if (index === 3) {
            sums[index] = '合计';
            return;
          }
          if (column.property === 'waitDeliverNum') {
            values = data.map(item => Number(item.waitDeliverNum))
          } else if (column.property === 'curOrderNum') {
            values = data.map(item => Number(item.curOrderNum))
          } else if (column.property === 'currentStock') {
            values = data.map(item => Number(item.currentStock));
          } else if (column.property === 'lockStock') {
            values = data.map(item => Number(item.lockStock));
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.totalPrice))
          } else if (column.property === 'totalCastPrice') {
            values = data.map(item => Number(item.totalCastPrice))
          }
          let computedPropertyArr = ['waitDeliverNum', 'curOrderNum', 'currentStock', 'lockStock', 'totalPrice', 'totalCastPrice'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
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
      },
      getSummariesNew(param) {
        const {columns, data} = param;
        const sums = [];
        let values = [];

        columns.forEach((column, index) => {
          if (index === 2) {
            sums[index] = '合计';
            return;
          }
          if (column.property === 'alreadySendNum') {
            values = data.map(item => Number(item.alreadySendNum));
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.totalPrice))
          }
          let computedPropertyArr = ['alreadySendNum', 'totalPrice'];
          if (computedPropertyArr.indexOf(column.property) > -1) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
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

    }
  }
</script>

<style lang="scss" scoped>
  .item-title {
    padding-left: 53px;
  }

  .item {
    margin: 0 20px 20px;
    background-color: #fff;
    border-radius: 4px;
    padding: 0 20px;
    min-width: 1200px;
    .item-content {
      padding-bottom: 20px;
      .top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: $color;
      }
      .top-info {
        padding-left: 15px;
        margin-left: 30px;
        position: relative;
        margin-bottom: 10px;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #e9e9e9;
        }
      }
    }
    .table-layout {
      border: 1px solid #ecf1f4;
    }

  }

  .row-item {
    height: 50px;
    .store-name {
      flex: 2;
    }
    &:last-child {
      border-bottom: 0;
    }
  }

  .h-120 {
    height: 120px;
  }

  .input {
    border: $border;
    height: 32px;
    width: 100%;
    border-radius: 3px;
  }

  .address-box {
    .el_box {
      width: 180px !important;
      margin-right: 10px;
    }
  }

  .btn-layout {
    display: flex;
    justify-content: flex-start;
    padding: 10px 0 10px 0px;
    .btn {
      margin-right: 20px;
      width: 80px;

      &:last-child {
        background-color: #fff;
        border: $border;
        color: #4A4A4A;
      }

    }
    .el_box {
      margin-right: 20px;
      height: 30px;
      width: 120px;
    }

  }

  .w140 {
    width: 140px;
  }

  .main-title {
    display: flex;
    justify-content: flex-end;
    text-align: left;
    font-size: 14px;
    span {
      margin-right: 20px;
    }
  }

  .saveBtn {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-40%);
    -ms-transform: translateX(-40%); /* IE 9 */
    -moz-transform: translateX(-40%); /* Firefox */
    -webkit-transform: translateX(-40%); /* Safari 和 Chrome */
    -o-transform: translateX(-40%); /* Opera */
    z-index: 100;
  }

  .business-info_icon {
    background: url("../../../assets/images/icon/business-info_icon.png");
    background-size: cover;
  }

  .wait-send_icon {
    background: url("../../../assets/images/icon/wait-send_icon.png");
    background-size: cover;
  }

  .send-log_icon {
    background: url("../../../assets/images/icon/send-log_icon.png");
    background-size: cover;
  }
</style>
