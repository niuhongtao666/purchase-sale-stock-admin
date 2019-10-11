<template>
  <div>
    <div class="zzc">
      <form class="addform">
        <div class="addTitle">
          <div class="addUser"> 工项信息</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="edit" v-if="workItemId">

          <div class="stokeLine">
            <div class="form_item">

              <div class="form_left">
                <p><span class="required">*</span>工项编码</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',model.id?'is-disabled':'',upper] " :disabled="model.id"
                       placeholder="请输入工项编码"
                       v-model.trim="model.goodsNo" name="goodsNo"
                       v-validate="'required|sameGoodsNo|twoSpace'">
                <span v-if="vaerrors.has('goodsNo:required')" class="is-danger">请输入工项编码</span>
                <span v-if="vaerrors.has('goodsNo:twoSpace')" class="is-danger">不能包含两个连续空格</span>
                <span v-if="errSta" class="is-danger">{{errMsg}}</span>
                <!--<span v-if="vaerrors.has('goodsNo:sameGoodsNo')" class="is-danger">工项编码已经存在</span>-->
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>工项名称</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请输入工项名称" v-model="model.goodsName" name="goodsName"
                       v-validate="'required'">
                <span class="is-danger" v-if="vaerrors.has('goodsName')">请输入工项名称</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>属性</p>
              </div>
              <div class="form_right">
                <!--<el-select v-model="model.commonType" :class="['el_box',userInfo.storeId!=1?'is-disabled':'']" :disabled="userInfo.storeId!=1" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in accessoryPropertiesList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                <!--<input type="hidden" name="commonType" v-validate="'required'" v-model="model.commonType">-->
                <!--<span class="is-danger" v-if="vaerrors.has('commonType')">请选择属性</span>-->


                <el-select v-model="model.commonType" :class="['el_box','is-disabled']" :disabled=true placeholder="请选择">
                  <el-option
                    v-for="item in accessoryPropertiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="commonType" v-validate="'required'" v-model="model.commonType" :disabled=true>
                <span class="is-danger" v-if="vaerrors.has('commonType')">请选择属性</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>标准工时</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请输入标准工时" v-model="model.standardWorkTime" name="standardWorkTime"
                       v-validate="'required|chkNum'">
                <span class="is-danger" v-if="vaerrors.has('standardWorkTime:required')">请输入标准工时</span>
                <span class="is-danger" v-if="vaerrors.has('standardWorkTime:chkNum')">标准工时必须为数字</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>派工工时</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请输入标准工时" v-model="model.dispatchWorkTime" name="dispatchWorkTime"
                       v-validate="'required|chkNum'">
                <span class="is-danger" v-if="vaerrors.has('dispatchWorkTime:required')">请输入派工工时</span>
                <span class="is-danger" v-if="vaerrors.has('dispatchWorkTime:chkNum')">派工工时必须为数字</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>状态</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.enabled" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
                <input type="hidden" name="enabled" v-validate="'required'" v-model="model.enabled">
                <span class="is-danger" v-if="vaerrors.has('enabled')">请选择状态</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>一级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" class="el_box is-disabled" disabled
                           v-model="model.goodsFirstClass">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>二级类别1</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" no-data-text="请选择一级分类"
                           @change="switchCategory(model.goodsSecondClass,'thirdClassificationsList')"
                           v-model="model.goodsSecondClass">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsSecondClass" v-validate="'required'" v-model="model.goodsSecondClass">
                <span class="is-danger" v-if="vaerrors.has('goodsSecondClass')">请选择二级类别</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>三级类别</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.goodsThirdClass" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请选择" no-data-text="请选择二级类别">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsThirdClass" v-validate="'required'" v-model="model.goodsThirdClass">
                <span class="is-danger" v-if="vaerrors.has('goodsThirdClass')">请选择三级类别</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>零售价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入零售价" v-model="model.retailPrice" name="retailPrice"
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('retailPrice:required')">请输入零售价</span>
                <span class="is-danger" v-if="vaerrors.has('retailPrice:chkNum')">零售价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('retailPrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>保险价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入保险价" v-model="model.insurancePrice" name="insurancePrice"
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:required')">请输入保险价</span>
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:chkNum')">保险价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>索赔价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入索赔价" v-model="model.claimPrice" name="claimPrice"
                       v-validate="'chkNum|chkFix2'">
                <!--<span class="is-danger" v-if="vaerrors.has('claimPrice:required')">请输入索赔价</span>-->
                <span class="is-danger" v-if="vaerrors.has('claimPrice:chkNum')">索赔价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('claimPrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>适用品牌</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" type="text" @click="showBrandTree=true" readonly :value="model.carTypeDesc" placeholder="请选择适用品牌">
                <input type="hidden" name="carTypeDesc"  v-model=" model.carTypeDesc">
                <!--<span class="is-danger" v-if="vaerrors.has('carTypeDesc')">请选适用品牌</span>-->
              </div>
            </div>
          </div>
        </div>
        <div class="create" v-else>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>工项编码</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',model.id?'is-disabled':'',upper] " :disabled="model.id"
                       placeholder="请输入工项编码"
                       v-model.trim="model.goodsNo" name="goodsNo"
                       v-validate="'required|sameGoodsNo|twoSpace'">
                <span v-if="vaerrors.has('goodsNo:required')" class="is-danger">请输入工项编码</span>
                <span v-if="vaerrors.has('goodsNo:twoSpace')" class="is-danger">不能包含两个连续空格</span>
                <span v-if="errSta" class="is-danger">{{errMsg}}</span>
                <!--<span v-if="vaerrors.has('goodsNo:sameGoodsNo')" class="is-danger">工项编码已经存在</span>-->
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>工项名称</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入工项名称" v-model="model.goodsName" name="goodsName"
                       v-validate="'required'">
                <span class="is-danger" v-if="vaerrors.has('goodsName')">请输入工项名称</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>属性</p>
              </div>
              <div class="form_right">
                <!--<el-select v-model="model.commonType" :class="['el_box',userInfo.storeId!=1?'is-disabled':'']" :disabled="userInfo.storeId!=1" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in accessoryPropertiesList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                <!--<input type="hidden" name="commonType" v-validate="'required'" v-model="model.commonType">-->
                <!--<span class="is-danger" v-if="vaerrors.has('commonType')">请选择属性</span>-->


                <el-select v-model="model.commonType" :class="['el_box','is-disabled']" :disabled=true placeholder="请选择">
                  <el-option
                    v-for="item in accessoryPropertiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="commonType" v-validate="'required'" v-model="model.commonType" :disabled=true>
                <span class="is-danger" v-if="vaerrors.has('commonType')">请选择属性</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>标准工时</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入标准工时" v-model="model.standardWorkTime" name="standardWorkTime"
                       v-validate="'required|chkNum'">
                <span class="is-danger" v-if="vaerrors.has('standardWorkTime:required')">请输入标准工时</span>
                <span class="is-danger" v-if="vaerrors.has('standardWorkTime:chkNum')">标准工时必须为数字</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>派工工时</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入标准工时" v-model="model.dispatchWorkTime" name="dispatchWorkTime"
                       v-validate="'required|chkNum'">
                <span class="is-danger" v-if="vaerrors.has('dispatchWorkTime:required')">请输入派工工时</span>
                <span class="is-danger" v-if="vaerrors.has('dispatchWorkTime:chkNum')">派工工时必须为数字</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>状态</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.enabled" class="el_box" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
                <input type="hidden" name="enabled" v-validate="'required'" v-model="model.enabled">
                <span class="is-danger" v-if="vaerrors.has('enabled')">请选择状态</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>一级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" class="el_box is-disabled" disabled
                           v-model="model.goodsFirstClass">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>二级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择一级分类"
                           @change="switchCategory(model.goodsSecondClass,'thirdClassificationsList')"
                           v-model="model.goodsSecondClass">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsSecondClass" v-validate="'required'" v-model="model.goodsSecondClass">
                <span class="is-danger" v-if="vaerrors.has('goodsSecondClass')">请选择二级类别</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>三级类别</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.goodsThirdClass" class="el_box" placeholder="请选择" no-data-text="请选择二级类别">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsThirdClass" v-validate="'required'" v-model="model.goodsThirdClass">
                <span class="is-danger" v-if="vaerrors.has('goodsThirdClass')">请选择三级类别</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>零售价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入零售价" v-model="model.retailPrice" name="retailPrice"
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('retailPrice:required')">请输入零售价</span>
                <span class="is-danger" v-if="vaerrors.has('retailPrice:chkNum')">零售价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('retailPrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>保险价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入保险价" v-model="model.insurancePrice" name="insurancePrice"
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:required')">请输入保险价</span>
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:chkNum')">保险价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>索赔价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入索赔价" v-model="model.claimPrice" name="claimPrice"
                       v-validate="'chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('claimPrice:required')">请输入索赔价</span>
                <span class="is-danger" v-if="vaerrors.has('claimPrice:chkNum')">索赔价必须为数字</span>
                <span class="is-danger" v-if="vaerrors.has('claimPrice:chkFix2')">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>适用品牌</p>
              </div>
              <div class="form_right">
                <input type="text" @click="showBrandTree=true" readonly :value="model.carTypeDesc" placeholder="请选择适用品牌">
                <input type="hidden" name="carTypeDesc" v-model=" model.carTypeDesc">
                <!--<span class="is-danger" v-if="vaerrors.has('carTypeDesc')">请选适用品牌</span>-->
              </div>
            </div>
          </div>
        </div>


        <div class="form_item mtp10">
          <button class="serachBtn" v-if="model.canEdit" type="button" @click="validateBeforeSubmit">{{model.id?'保存编辑':'新增工项'}}</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
    <brand-tree v-if="showBrandTree" :carTypeJson="model.carTypeJson" @hiedBrandList="hiedBrandList"></brand-tree>

  </div>
</template>
<script>
  import {isNumber} from '@/assets/js/logic'

  export default {
    name: 'edit',
    props: ['workItemId'],
    data() {
      return {
        userInfo:{},
        showBrandTree: false,
        model: {
          canEdit:true,
          goodsNo: null,//商品编号
          goodsName: null,//商品名
          // goodsType: null,//商品类型
          goodsFirstClass: 4451,//一级分类
          goodsSecondClass: null,//	是	整型	二级分类
          goodsThirdClass: null,//三级分类
          standardWorkTime: null,//	标准工时
          dispatchWorkTime: null,//	派工工时
          carTypeJson: null,//适用车型id串
          carTypeDesc: null,//适用品牌名称
          commonType: 1,//属性
          enabled: 1,//状态
          insurancePrice: null,//	保险价
          retailPrice: null,//	零售价
          claimPrice: null,//索赔价
        },
        oldGoodsNo: null,//如果工项编码已经存在 存储工项编码
        // commodityTypes: [
        //   {
        //     id: 1,
        //     name: "商品类型1",
        //   },
        // ],
        upper:'upper',
        errMsg:null,//工项编码已存在错误提示
        firstClassificationsList: [{name: '工时', id: 4451}],
        secondClassificationsList: [],
        thirdClassificationsList: [],
        accessoryPropertiesList: [
          {
            id:1,
            name:'通用'
          }
        ],
        options: [
          {
            value: 1,
            text: '启用'
          },
          {
            value: 0,
            text: '停用'
          }
        ],
      }
    },

    created() {
      this.$validator.remove("sameGoodsNo");
      this.$validator.extend("sameGoodsNo", {
        validate: value => {
          ////console.log(value === this.oldGoodsNo);
          return value !== "" && value !== this.oldGoodsNo;
        },
        getMessage: field => "商品编码已经存在"
      });
      this.$validator.remove("twoSpace");
      this.$validator.extend("twoSpace", {
        validate: value => {

          return value && !(value.split('  ').length > 1);
        },
        getMessage: field => "商品编码已经存在"
      });
      this.$validator.remove("chkNum");
      this.$validator.extend("chkNum", {
        validate: value => {
          return isNumber(value);
        },
        getMessage: field => "请输入数字"
      });
      this.$validator.remove("chkFix2");
      this.$validator.extend("chkFix2", {
        validate: value => {
          // const reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
          const reg=/^(([1-9][0-9]*)|0|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/;
          return reg.test(value)
        },
      });
    },
    computed:{
      errSta(){
        if(this.errMsg){
          return true;
        }else{
          return false;
        }
      },
      isDisabled(){
        if(this.model.canEdit){
          // return this.userInfo.storeId!=1&&this.model.commonType===1;
        }
        return false;
      }
    },
    mounted() {
      this.userInfo=JSON.parse(localStorage.getItem('userInfos'));
      this.fetchCategories(4451, 'secondClassificationsList');
      // this.fetchAccessoriesPropertyList();
      if (this.workItemId) {
        this.fetchData();
      }else {
        if(this.userInfo.storeId!=1){
          this.model.commonType=1;
        }
      }
    },
    methods: {
      setErr(errMsg){
        this.errMsg=errMsg
      },
      fetchData() {
        this.$axios.get(`/admin/goods/goodsWorkItemInfo/detail/${this.workItemId}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.model = data.value;
            if (this.model.goodsSecondClass) {
              this.fetchCategories(this.model.goodsSecondClass, 'thirdClassificationsList')
            }
          }
        })
      },
      fetchCategories(id, category) {
        this.$store.dispatch('fetchCategories', id).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this[category] = data.value;
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
      judgeGoodsNo() {//校验商品编码唯一性

        if (this.model.goodsNo && this.model.goodsNo !== this.oldGoodsNo) {
          this.$axios.post('/admin/goods/goodsWorkItemInfo/judgeGoodsNo', {goodsNo: this.model.goodsNo}).then(res => {
            if (res.data.code === 20004) {
              this.oldGoodsNo = this.model.goodsNo;
            }
          })
        }
      },
      switchCategory(id, category,event) {
          if (category === 'secondClassificationsList') {//一级分类切换的时候 清除二级 三级分类数据 二级分类切换同理
            this.secondClassificationsList = [];
            this.model.goodsSecondClass = null;
            this.thirdClassificationsList = [];
            this.model.goodsThirdClass = null;
          } else if (category === 'thirdClassificationsList') {
            this.thirdClassificationsList = [];
            this.model.goodsThirdClass = null;
          }
          this.fetchCategories(id, category);
      },
      validateBeforeSubmit() {
        this.$validator
          .validateAll()
          .then((result) => {
            if (result) {
              this.save();
            }
          })
          .catch(err => {
          });
      },
      hiedBrandList(brandListInfo) {
        if (brandListInfo) {
          this.model.carTypeJson = brandListInfo.brandKeyList;//适用车型id串
          this.model.carTypeDesc = brandListInfo.brandNameList.join(',');//	适用车型字符串(报名,奥迪)
        }
        this.showBrandTree = false;
      },
      close() {
        this.$emit('hide');
      },
      save() {
        this.$emit('hideMask', this.model);
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';

  .addform {
    width: 800px;
  }

  .stokeLine {
    display: flex;
    .form_item {
      width: 33.3%;
    }
  }

  .form_left p {
    text-align: right;
  }

  .form_right {
    position: relative;
    .is-danger {
      position: absolute;
      bottom: 2px;
      left: 0;
    }
  }
</style>
