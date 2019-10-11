<template>
  <div>

    <div class="item">
      <div class="item-title">
        <i class="package-info_icon left15"></i>
        <h2>套餐信息</h2>
      </div>
      <div class="item-content ">
        <div class="table-layout border-add">
          <div class="row-item ">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>套餐编码</div>
                </div>
                <div class="right">
                  <input :class="['input',model.id?'is-disabled':'',upper] " placeholder="请输入套餐编码"
                         v-model.trim="model.goodsNo" :disabled="model.id" name="goodsNo">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>套餐名称</div>
                </div>
                <div class="right">
                  <input class="input" type="text" v-model="model.mealsName" placeholder="请输入套餐名称">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>套餐价格</div>
                </div>
                <div class="right">
                  <input class="input" type="text" v-model="model.mealsPrice ">

                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>状态</div>
                </div>
                <div class="right">

                  <el-select placeholder="请选择" v-model="model.enabled" class="el_box" >
                    <el-option
                      v-for="item in statusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>

                </div>
              </div>
            </div>

          </div>
          <div class="row-item">
            <div class="row">
              <div class="column">
                <div class="left">
                  <div><span class="required">*</span>套餐类别</div>
                </div>
                <div class="right">

                  <el-select placeholder="请选择" class="el_box" v-model="model.goodsThirdClass">
                    <el-option
                      v-for="item in goodsThirdClassList"
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
                  <div><span class="required">*</span>套餐属性</div>
                </div>
                <div class="right">

                  <!--<el-select placeholder="请选择" :class="['el_box',userInfo.storeType!=1?'is-disabled':'']" :disabled="userInfo.storeType!=1" v-model="model.commonType">-->
                    <!--<el-option-->
                      <!--v-for="item in accessoryPropertiesList"-->
                      <!--:key="item.id"-->
                      <!--:label="item.name"-->
                      <!--:value="item.id">-->
                    <!--</el-option>-->
                  <!--</el-select>-->

                  <el-select placeholder="请选择" :class="['el_box','is-disabled']" :disabled=true v-model="model.commonType">
                    <el-option
                      v-for="item in accessoryPropertiesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>

                </div>
              </div>
            </div>
            <div class="row" style="flex: 2;">
              <div class="column">
                <div class="left">
                  <div>适用品牌</div>
                </div>
                <div class="right">
                  <!--<input class="input" type="text" v-model="model.saleOrderInfoDTO.carNumber">-->
                  <input class="input" type="text" @click="brandTreeShow=true" readonly :value="model.carTypeDesc"
                         placeholder="请选择适用品牌">
                  <input type="hidden" name="carTypeDesc" v-validate="'required'" v-model=" model.carTypeDesc">
                  <span class="is-danger" v-if="vaerrors.has('carTypeDesc')">请选适用品牌</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="item-title">
        <i class="part-info_icon left15"></i>
        <h2>配件信息</h2>
      </div>
      <div class="item-content ">
        <div class="btn-layout">
          <button type="button" class="btn  " @click="partMaskShow=true">新增配件</button>
          <button type="button" class="btn" @click="delTableData(true)">删除</button>
        </div>

        <div class="table-layout">
          <el-table
            ref="multipleTable"
            :data="model.goodsDetailList"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="partSelectionChange">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品编码"
              min-width="200"
              >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              min-width="200"
              >
            </el-table-column>
            <el-table-column
              prop="goodsBrandName"
              label="商品品牌"
              min-width="120"
            >
            </el-table-column>
            <el-table-column
              prop="applyNum"
              label="数量"
              min-width="100"
              >
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="零售价"
              min-width="100"
              >
            </el-table-column>
            <el-table-column
               label="套餐价"
              min-width="100"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.mealsPrice" class="table-ipt-num" type="text">
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              label="合计">
              <template slot-scope="scope">
                <span>{{scope.row.totalMoney||Number((scope.row.unitPrice*scope.row.applyNum).toFixed(2))}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">
        <i class="item-info_icon left15"></i>
        <h2>工项信息</h2>
      </div>
      <div class="item-content pd54">
        <div class="btn-layout">
          <button type="button" class="btn  " @click=" workItemMaskShow=true">新增工项</button>
          <button type="button" class="btn" @click="delTableData()">删除</button>
        </div>
        <div class="table-layout">
          <el-table
            ref="multipleTable"
            :data="model.workItemDetailList"
            tooltip-effect="dark"
            style="width: 100%"
            border
            max-height="560"
             @selection-change="workItemSelectionChange">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              min-width="200"
              label="商品编码">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              min-width="200"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="applyNum"
              min-width="100"
              label="数量">
            </el-table-column>
            <el-table-column
              label="套餐价"
              min-width="100"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.mealsPrice" class="table-ipt-num" type="text">
              </template>
            </el-table-column>
            <el-table-column
              prop="standardWorkTime"
              min-width="100"
              label="标准工时">
            </el-table-column>
            <el-table-column
              min-width="100"
              label="总工时">
              <template slot-scope="scope">
                <span>{{scope.row.sumWorkTime||Number((scope.row.standardWorkTime*scope.row.applyNum).toFixed(2))}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--min-width="100"-->
              <!--label="工时费合计">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.totalMoney||scope.row.unitPrice*scope.row.applyNum}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="validateBeforeSubmit">保存</button>
      </div>
    </div>
    <part-add v-if="partMaskShow" @hidePartMask="hidePartMask" @addParts="addParts" :storeId="storeId" :isPartSale="true"></part-add>
    <brand-tree v-if="brandTreeShow" :carTypeJson="model.carTypeJson" @hiedBrandList="hiedBrandList"></brand-tree>
    <work-item-mask v-if=" workItemMaskShow" @addWorkItem="addWorkItem"
                    @hideWorkItemMask="hideWorkItemMask"></work-item-mask>
  </div>
</template>

<script>

  import workItemMask from './work-item-mask'
  import {checkDataExit,delDataExit,isNumber} from '@/assets/js/logic'

  export default {
    name: 'add',
    components: {
      workItemMask
    },
    data() {
      return {
        upper:'upper',
        userInfo:{},
        provinceList: [],//省
        cityList: [],//市
        districtList: [],//区
        goodsThirdClassList: [],//套餐类别
        accessoryPropertiesList: [
          {
            id:1,
            name:"通用"
          }
        ],
        partMaskShow: false,//新增配件
        brandTreeShow: false,
        goodNoExist: false,//如果套餐编号已经存在 存储套餐编号
        workItemMaskShow: false,//新增工项
        multiplePartSelection:[],//配件多选
        multipleWorkItemSelection:[],//工项多选
        model: {
          id: this.$route.params.id,
          goodsNo: null,//	套餐编码
          mealsName: null,//	套餐名称
          mealsPrice: null,//	套餐价格
          commonType: 1,//	套餐lei
          carTypeJson: null,//	适用品牌id
          carTypeDesc: null,//	适用品牌名称
          enabled: 1,//	状态
          goodsDetailList: [],//套餐明细(配件)
          workItemDetailList: [],//	套餐明细——工项
        },
        storeId:null,//门店id
        statusList: [
          {
            id: 1,
            name: '启用'
          },
          {
            id: 0,
            name: '停用'
          }
        ],

      }
    },

    mounted() {
      this.userInfo=JSON.parse(localStorage.getItem('userInfos'));
       this.storeId=this.userInfo['storeId'];
      // if(this.userInfo.storeType!=1){
      //   this.model.commonType=0;
      // }

      this.fetchGoodsThirdClassList( );
      // this.fetchAccessoriesPropertyList( );
    },
    methods: {

      fetchGoodsThirdClassList(){
        this.$axios.get('/admin/goods/classInfo/mealsTree').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          if(data){
            this.goodsThirdClassList=data.value;
          }
        })
      },
      fetchAccessoriesPropertyList() {
        if (!this.accessoryPropertiesList.length) {
          this.$store.dispatch('fetchAccessoriesPropertyList').then(res => {
            let data = this.AppUtils.checkResponse(res);

            if (data) {
              this.accessoryPropertiesList = data.value;
            }
          })
        }

      },
      judgeGoodsNo() {//校验套餐编码唯一性
        if (this.model.goodsNo) {
          this.$axios.post('/admin/goods/goodsMealsInfo/judgeGoodsNo', {goodsNo: this.model.goodsNo}).then(res => {
            if (res.data.code === 20004) {
              this.goodNoExist = true;
              this.$message.error('套餐编码已经存在');
            }
          })
        }
      },
      hiedBrandList(brandListInfo) {
        if (brandListInfo) {
          this.model.carTypeJson = brandListInfo.brandKeyList;//适用车型id串
          this.model.carTypeDesc = brandListInfo.brandNameList.join(',');//	适用车型字符串(报名,奥迪)
        }
        this.brandTreeShow = false;
      },
      partSelectionChange(val) {
         this.multiplePartSelection = val;
      },
      workItemSelectionChange(val){
        this.multipleWorkItemSelection = val;

      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      hideWorkItemMask() {//隐藏工项弹窗
        this.workItemMaskShow = false;
      },
      validateBeforeSubmit() {
        let model = this.model;
        if (!model.goodsNo) {
          this.$message.error('请输入套餐编码');
          return this.scrollTop();
        }
        if (model.goodsNo.split('  ').length>1) {
          this.$message.error('套餐编码不能存在两个连续空格');
          return this.scrollTop();
        }
        if (this.goodNoExist) {
          this.$message.error('套餐编码已经存在');
          return this.scrollTop();
        }
        if (!model.mealsName) {
          this.$message.error('请输入套餐名称');
          return this.scrollTop();

        }
        if (!model.mealsPrice) {
          this.$message.error('请输入套餐价格');
          return this.scrollTop();

        }
        if(!isNumber(model.mealsPrice)||model.mealsPrice<0){
          this.$message.error('套餐价格必须为不小于0的数字');
          return this.scrollTop();
        }
        if(!model.goodsThirdClass ){
          this.$message.error('请选择套餐类别');
          return this.scrollTop();
        }
        if(model.commonType===null||model.commonType==='' ){
          this.$message.error('请选择套餐属性');
          return this.scrollTop();
        }
        if (!model.goodsDetailList.length&&!model.workItemDetailList.length) {
          this.$message.error('请添加配件或工项');
          return this.scrollTop();

        }
        /* if (!model.goodsDetailList.length) {
          this.$message.error('请添加配件');
          return this.scrollTop();

        }
        if (!model.workItemDetailList.length) {
          this.$message.error('请添加工项');
          return this.scrollTop();

        }*/

        // model: {
        //   id: this.$route.params.id,
        //     goodsNo: null,//	套餐编码
        //     mealsName: null,//	套餐名称
        //     mealsPrice: null,//	套餐价格
        //     carTypeJson: null,//	适用品牌id
        //     carTypeDesc: null,//	适用品牌名称
        //     enabled: 1,//	状态
        //     goodsDetailList: [],//套餐明细(配件)
        //     workItemDetailList: [],//	套餐明细——工项
        // },
        for (let part of model.goodsDetailList) {
          if(!isNumber(part.mealsPrice)||part.mealsPrice<0){
           return this.$message.error(`配件${part.goodsNo}的套餐价格必须为不小于0的数字`);
          }
        }
        for (let item of model.workItemDetailList) {
          if(!isNumber(item.mealsPrice)||item.mealsPrice<0){
            return this.$message.error(`工项${item.goodsNo}的套餐价格必须为不小于0的数字`);
          }
        }
        if (model.id) {
           this.AppUtils.confirm('是否确定修改套餐?',()=>{
            this.update();
          });
        } else {
          this.AppUtils.confirm('是否确定新增套餐?',()=>{
            this.add();

          });
        }
      },
      scrollTop() {
        document.querySelector('.body').scrollTop = 0;
      },
      add() {
        this.$axios.post('/admin/goods/goodsMealsInfo/add', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.AppUtils.alert('新建成功',()=>{
              this.$router.push('/commodity-management/package-management');

            });

          }
        })
      },
      update() {
        this.$axios.post('/admin/goods/goodsMealsInfo/update', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
             this.AppUtils.alert('修改成功',()=>{
               this.$router.push('/commodity-management/package-management');
             });
          }
        })
      },
      addParts(data) {
        let index = checkDataExit(this.model.goodsDetailList, data);
        data.goodsType=1;
        data.mealsPrice=data.unitPrice;

        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.goodsDetailList[index].applyNum += data.applyNum;
          })
        } else {
          this.model.goodsDetailList.push(data);
        }
      },
      addWorkItem(data) {
        ////console.log(data);
        let index = checkDataExit(this.model.workItemDetailList, data);
        data.goodsType=2;
        data.mealsPrice=data.unitPrice;
        if (index > -1) {
          return this.AppUtils.confirm('当前配件已经添加,是否确定继续添加?', () => {
            this.model.workItemDetailList[index].applyNum += data.applyNum;
          })
        } else {
          this.model.workItemDetailList.push(data);
        }
      },
      delTableData(isPart){//删除配件工项
        if(isPart){
          if(!this.multiplePartSelection.length){
            return this.AppUtils.alert('请选择要删除的配件');
          }
          delDataExit(this.model.goodsDetailList,this.multiplePartSelection);
        }else {
          if(!this.multipleWorkItemSelection.length){
            return this.AppUtils.alert('请选择要删除的工项');
          }
          delDataExit(this.model.workItemDetailList,this.multipleWorkItemSelection);
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .item-title {
    padding-left: 70px;
    left: -16px;
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
    .table-layout-border {
      /*border: 1px solid #ecf1f4;*/
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
    padding: 10px 0 10px 15px;
    padding-left: 0px;
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
  .package-info_icon{
     background: url("../../../assets/images/icon/package-info_icon.png");
     background-size: cover;
   }
  .part-info_icon{
    background: url("../../../assets/images/icon/part-info_icon.png");
    background-size: cover;
  }
  .item-info_icon{
    background: url("../../../assets/images/icon/item-info_icon.png");
    background-size: cover;
  }
</style>
