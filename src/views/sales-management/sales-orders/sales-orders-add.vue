<template>
  <div>

    <div class="item">
      <div class="item-title">
        <i class="sale-info"></i>
        <h2>销售信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout">
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>客户电话</div>
                </div>
                <div class="right">
                  <!--<input class="input" @change="fetchCustomerInfoByNum" type="text" v-model="model.saleOrderInfoDTO.saleCustMobile">-->
                  <el-autocomplete
                    v-model="model.saleOrderInfoDTO.saleCustMobile"
                    :fetch-suggestions="fetchCustomerInfoByNum"
                     :hide-loading="true"
                     :trigger-on-focus="false"
                    label="请输入手机号"
                    placeholder="请输入手机号"
                    @select="handleSelect"
                    value-key="mobile"
                    @blur="getPerson(model.saleOrderInfoDTO.saleCustMobile)"
                    :popper-class="suggestionList.length?'':'hide-suggestion'"
                    class="el_box"
                  ></el-autocomplete>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>客户名称</div>
                </div>
                <div class="right">
                  <input class="input" placeholder="请输入客户名称" type="text" v-model="model.saleOrderInfoDTO.saleCustName">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>单据类型</div>
                </div>
                <div class="right">

                  <el-select placeholder="请选择" class="el_box" v-model="model.saleOrderInfoDTO.billType">
                    <el-option
                      v-for="item in billTypesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>车牌号码</div>
                </div>
                <div class="right">
                  <input class="input" placeholder="请选择车牌号码" type="text" v-model="model.saleOrderInfoDTO.carNumber">

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div>备注</div>
                </div>
                <div class="right">
                  <input class="input" maxlength="500" placeholder="请输入备注" type="text" v-model="model.saleOrderInfoDTO.memo">

                </div>
              </div>
            </div>
          </div>
          <div class="row-item">
            <div class="row address-box">
              <div class="column">
                <div class="left">
                  <div>客户地址</div>
                </div>
                <div class="right">

                  <el-select placeholder="请选择" class="el_box" clearable @change="provinceChange"
                             v-model="model.saleOrderInfoDTO.addressProvinceId">
                    <el-option
                      v-for="item in provinceList"
                      :key="item.provinceId"
                      :label="item.provinceName"
                      :value="item.provinceId">
                    </el-option>
                  </el-select>
                  <el-select placeholder="请选择" class="el_box" clearable @change="cityChange"
                             v-model="model.saleOrderInfoDTO.addressCityId">
                    <el-option
                      v-for="item in cityList"
                      :key="item.cityId"
                      :label="item.cityName"
                      :value="item.cityId">
                    </el-option>
                  </el-select>
                  <el-select placeholder="请选择" class="el_box" clearable @change="districtChange"
                             v-model="model.saleOrderInfoDTO.addressAreaId">
                    <el-option
                      v-for="item in districtList"
                      :key="item.countyId"
                      :label="item.countyName"
                      :value="item.countyId">
                    </el-option>
                  </el-select>
                  <input class="input" maxlength="100" placeholder="请输入详细地址" v-model="model.saleOrderInfoDTO.address" type="text">

                </div>
              </div>
            </div>
            <!--<div class="row">-->
            <!--<div class="column">-->
            <!--<div class="left">-->
            <!--<div><span class="required">*</span>详细地址</div>-->
            <!--</div>-->
            <!--<div class="right">-->

            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="item-title">
        <i class="sale-list"></i>
        <h2>销售清单</h2>
      </div>
      <div class="item-content ">
        <div class="btn-layout">
          <button type="button" class="btn" @click="partMaskShow=true">新增</button>
          <button type="button" class="btn" @click="importFlag=true">导入配件</button>
          <button type="button" class="btn" @click="delTableData">删除</button>
        </div>
        <div class="table-layout">
          <el-table
            ref="multipleTable"
            :data="model.saleOrderDetialDTOS"
            tooltip-effect="dark"
            max-height="560"
            style="width: 100%"
            show-summary
            border
            :summary-method="getSummaries"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="配件编号"
              min-width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsVendorNo"
              label="生产编码"
              min-width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="配件名称"
              min-width="220"
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
              prop="goodsUnit"
              label="单位"
              width="60"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="数量"
              prop="orderNum"
              min-width="100">
              <template slot-scope="scope">
                <div>
                  <input class="table-ipt-num" @change="orderNumChange(scope.row)" type="text"
                         v-model="scope.row.orderNum" @input="getTotalPrice(scope.row,scope)">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="currentStock"
              label="可发料库存"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.currentStock-scope.row.lockStock}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="销售单价"
              min-width="90"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="销售总价"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.totalPrice | decimalTofixed2}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="优惠金额"
              prop="favorablePrice"
              show-overflow-tooltip
              min-width="90">
              <template slot-scope="scope">
                <div>
                  0
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="应收金额"
              prop="receivePrice"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.orderNum*scope.row.unitPrice}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  <input class="table-ipt-num remark" maxlength="500" type="text" v-model.number="scope.row.memo">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="currentStock"
              label="实际库存"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="lockStock"
              label="锁定库存"
              width="80"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="validateBeforeSubmit">保存</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" :isPartSale="true" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId"></part-add>
    <!--<part-import v-if="importFlag"></part-import>-->
    <import-parts v-if='importFlag' @importHide="importHide" @getImportData="getImportData"
                  importType="saleOrderImportGoods"></import-parts>

  </div>
</template>

<script>
  import {checkDataExit, delDataExit, checkCarNum, checkPhoneNum, isInteger} from '@/assets/js/logic'

  export default {
    name: 'sales-orders-detail',
    data() {
      return {
        suggestionList:[],
        provinceList: [],//省
        cityList: [],//市
        districtList: [],//区
        partMaskShow: false,//新增配件
        importFlag: false,//导入
        storeId:null,//门店id
        multiplePartSelection: [],
        model: {
          saleOrderInfoDTO: {//
             saleCustName: null,//客户姓名
            saleCustMobile: null,//	客户电话
            billType: null,//	账单类型 1售后精品 2配件外销
            carNumber: null,//	车牌号
            addressProvinceId: null,//	省份id
            addressProvinceName: null,//	省份名称
            addressCityId: null,//	城市id
            addressCityName: null,//	城市名称
            addressAreaId: null,//区级id
            addressAreaName: null,//	区级名称
            address: null,//	具体地址
            memo: null,//	备注
          },//销售信息
          saleOrderDetialDTOS: [],//销售清单
        },
        billTypesList: [

          {
            id: 7,
            name: "售后精品",
          },
          {
            id: 9,
            name: "配件外销",
          },
        ],

      }
    },
    mounted() {
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.storeId=userInfos['storeId'];
      this.fetchProvinceList();
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(13);
      },

    },
    methods: {
      getPerson(arg){
        const reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        if(reg.test(arg)){
          this.$axios.post('/admin/sale/saleOrderInfo/customerInfo', {mobile: arg}).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              ////console.log(data.value)
              this.model.saleOrderInfoDTO.saleCustName=data.value[0]['name'];
            }
          })
        }
      },
      fetchProvinceList() {
        this.$store.dispatch('fetchProvinceList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.provinceList = data.value.data;
          }
        });
      },
      fetchCityList(provinceId) {
        this.$store.dispatch('fetchCityList', provinceId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.cityList = data.value.data;
          }
        });
      },
      fetchDistrictList(cityId) {
        this.$store.dispatch('fetchDistrictList', cityId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.districtList = data.value.data;
          }
        });
      },
      fetchCustomerInfoByNum(queryString, cb) {//根据手机号获取用户信息
         if (queryString && queryString.length > 3) {
          this.$axios.post('/admin/sale/saleOrderInfo/customerInfo', {mobile: queryString}).then(res => {
             let data = this.AppUtils.checkResponse(res);
             if (data) {
               ////console.log(data.value)
              this.suggestionList=data.value;
               cb(data.value);
            }
          })
        }else {
           this.suggestionList=[];
         }
      },
      handleSelect(item) {
        ////console.log(item)
        if(item){
          this.model.saleOrderInfoDTO.saleCustName=item.name;
          this.model.saleOrderInfoDTO.saleCustMobile=item.mobile;
          this.model.saleOrderInfoDTO.carNumber=item.car_num;
        }

      },
      provinceChange(provinceId) {

        this.provinceList.find((val) => {
          if (val.provinceId === provinceId) {
            return this.model.saleOrderInfoDTO.addressProvinceName = val.provinceName;
          }
        });

        this.model.saleOrderInfoDTO.addressCityId = null;
        this.model.saleOrderInfoDTO.addressCityName = null;
        this.model.saleOrderInfoDTO.addressAreaId = null;
        this.model.saleOrderInfoDTO.addressAreaName = null;
        this.fetchCityList(provinceId)

      },
      cityChange(cityId) {
        this.cityList.find((val) => {
          if (val.cityId === cityId) {
            return this.model.saleOrderInfoDTO.addressCityName = val.cityName;
          }
        });
        this.model.saleOrderInfoDTO.addressAreaId = null;
        this.model.saleOrderInfoDTO.addressAreaName = null;
        this.fetchDistrictList(cityId)
      },
      districtChange(countyId) {
        this.districtList.find((val) => {
          if (val.countyId === countyId) {
            return this.model.saleOrderInfoDTO.addressAreaName = val.countyName;
          }
        })
      },
      orderNumChange(data) {
        if(!isInteger(data.orderNum)){
          return this.$message.error(`配件${data.goodsNo}的数量必须为整数`);
        }
      },
      getTotalPrice(data,index){
        ////console.log(data);
        ////console.log(index.$index);
        //console.dir(this.model.saleOrderDetialDTOS[index.$index])
        var unitPrice=this.model.saleOrderDetialDTOS[index.$index]['unitPrice'];
        var orderNum=this.model.saleOrderDetialDTOS[index.$index]['orderNum'];
        this.model.saleOrderDetialDTOS[index.$index].totalPrice =this.AppUtils.mul(unitPrice,orderNum);
        // // ////console.log('数据');
        // ////console.log('单价'+data.unitPrice);
        // ////console.log('数量'+data.orderNum);
        // //console.dir(this.model.saleOrderDetialDTOS[data.$index]);
      },
      validateBeforeSubmit() {

        if (!this.model.saleOrderInfoDTO.saleCustMobile || !checkPhoneNum(this.model.saleOrderInfoDTO.saleCustMobile)) {
          return this.$message.error('客户电话为空或不正确');
        }
        /*if (this.model.saleOrderInfoDTO.carNumber) {
          let carNumber = checkCarNum(this.model.saleOrderInfoDTO.carNumber);
          if (carNumber) {
            this.model.saleOrderInfoDTO.carNumber = carNumber;
          } else {
            return this.$message.error('车牌号不正确');
          }
        }*/

        if (!this.model.saleOrderInfoDTO.saleCustName) {
          return this.$message.error('客户姓名不能为空');
        }
        if (!this.model.saleOrderInfoDTO.billType) {
          return this.$message.error('单据类型不能为空');
        }
        let saleOrderDetialDTOS=this.model.saleOrderDetialDTOS;
        if (!saleOrderDetialDTOS.length) {
          return this.$message.error('销售清单不能为空');
        }
       for(let val of saleOrderDetialDTOS){
         if(!isInteger(val.orderNum)){
           return this.$message.error(`配件${val.goodsNo}的数量必须为整数`);
         }
       }
        this.save();
      },
      save() {//销售单修新增
        this.$axios.post('/admin/sale/saleOrderInfo/add', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.AppUtils.alert('新增成功', () => {
               this.$router.push(`/sales-management/sales-orders/detail/${data.value}`);
              // this.$router.push(`/sales-management/sales-orders/`);
            })

          }
        })
      },
      handleSelectionChange(val) {
        this.multiplePartSelection = val;
      },
      addParts(data) {
        ////console.log(data);
        data.orderNum = data.applyNum;
        data.totalPrice=this.AppUtils.mul(data.orderNum,data.unitPrice);
        let index = checkDataExit(this.model.saleOrderDetialDTOS, data);
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.saleOrderDetialDTOS[index].orderNum += data.orderNum;//计算总数量
            this.$message.success('添加成功');
          })
        } else {
          this.model.saleOrderDetialDTOS.push(data);
          this.$message.success('添加成功');
        }
      },
      delTableData(isPart) {//删除配件工项
        if (!this.multiplePartSelection.length) {
          return this.AppUtils.alert('请选择要删除的配件');
        }
        delDataExit(this.model.saleOrderDetialDTOS, this.multiplePartSelection);
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },

      importHide() { //关闭导入配件弹层
        this.importFlag = false;
      },
      getImportData(data) {
        let exitFlag = false;
        for (let val of data) {
          let index = checkDataExit(this.model.saleOrderDetialDTOS, val)
          if (index > -1) {
            exitFlag = true;
            return this.AppUtils.alert(`${val.goodsNo}配件已存在,请删除后重新导入`);
          }
        }
        !exitFlag && this.model.saleOrderDetialDTOS.push(...data);
        this.$message.success('导入成功');
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
            values = data.map(item => Number(0))
          } else if (column.property === 'receivePrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice - 0));
          } else if (column.property === 'totalPrice') {
            values = data.map(item => Number(item.orderNum * item.unitPrice));
          } else if (column.property === 'usableNum') {
            values = data.map(item => Number(item.currentStock-item.lockStock))
          } else if (column.property === 'currentStock') {
            values = data.map(item => Number(item.currentStock))
          } else if (column.property === 'lockStock') {
            values = data.map(item => Number(item.lockStock))
          }
          const computedPropertyArr = ['orderNum', 'favorablePrice', 'receivePrice', 'totalPrice', 'currentStock', 'lockStock'];
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

  }

  .remark {
    width: 160px;
  }

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

</style>
