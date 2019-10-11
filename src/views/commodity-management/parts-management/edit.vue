<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">配件信息</div>
          <div class="close" @click="close">×</div>
        </div>

        <div class="edit" v-if="partId">
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>商品编码</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',model.id?'is-disabled':''] " placeholder="请输入商品编码"
                       v-model.trim="model.goodsNo" :disabled="model.id" name="goodsNo"
                       v-validate="'required|sameGoodsNo|twoSpace'"
                >
                <span v-if="vaerrors.has('goodsNo:required')" class="is-danger">请输入商品编码</span>
                <span v-if="vaerrors.has('goodsNo:twoSpace')" class="is-danger">不能包含两个连续空格</span>
                <!--<span v-if="vaerrors.has('goodsNo:sameGoodsNo')" class="is-danger">商品编码已经存在</span>-->
              <span v-if="errSta" class="is-danger">{{errMsg}}</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>商品名称</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled" placeholder="请输入商品名称"
                       v-model="model.goodsName" name="goodsName"
                       v-validate="'required'">
                <span class="is-danger" v-if="vaerrors.has('goodsName')">请输入商品名称</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>生产编码</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled?'is-disabled':'',upper]" :disabled="isDisabled" placeholder="请输入生产编码"
                       v-model="model.goodsVendorNo">

              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>配件属性</p>
              </div>
              <div class="form_right">
                <!--<el-select v-model="model.commonType" :class="['el_box',userInfo.storeId!=1?'is-disabled':'']"-->
                           <!--:disabled="userInfo.storeId!=1||isNewDisabled" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in accessoryPropertiesList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                <!--<input type="hidden" name="commonType" v-model="model.commonType" v-validate="'required'">-->
                <!--<span class="is-danger" v-if="vaerrors.has('commonType')">请选择配件属性</span>-->

                <el-select v-model="model.commonType" :class="['el_box','is-disabled']"
                           :disabled=true placeholder="请选择">
                  <el-option
                    v-for="item in accessoryPropertiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="commonType" v-model="model.commonType" v-validate="'required'" :disabled=true>
                <span class="is-danger" v-if="vaerrors.has('commonType')">请选择配件属性</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>单位</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.unit" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled"
                           placeholder="请选择">
                  <el-option
                    v-for="item in goodsUtilList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <input type="hidden" name="unit" v-validate="'required'" v-model="model.unit">
                <span class="is-danger" v-if="vaerrors.has('unit')">请选择单位</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>保质期</p>
              </div>
              <div class="form_right">
                <input type="text" placeholder="请输入保质期" :class="isDisabled?'is-disabled':''" :disabled="isDisabled"
                       v-validate="'chkNum'" name="goodsShelflife"
                       v-model="model.goodsShelflife">
                <span class="unit">月</span>
                <span v-if="vaerrors.has('goodsShelflife:chkNum')" class="is-danger">保质期必须为数字</span>
              </div>
            </div>
            <!--<div class="form_item">
              <div class="form_left">
                <p>仓库名称:</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入仓库名称" v-model="model.warehouse"  name="depName" v-validate="'required'">
              </div>
            </div>-->
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>配件品牌</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入配件品牌" v-model="model.goodsBrandName" name="goodsBrandName" v-validate="'max:20'" >
                <span class="is-danger" v-if="vaerrors.has('goodsBrandName:max')">品牌字符长度不超过20</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>产地</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入产地" v-model="model.goodsOriginArea" name="goodsOriginArea">
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>一级类别</p>
              </div>
              <div class="form_right">

                <el-select placeholder="请选择" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled"
                           @change="switchCategory(model.goodsFirstClass,'secondClassificationsList')"
                           v-model="model.goodsFirstClass">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsFirstClass" v-validate="'required'" v-model="model.goodsFirstClass">
                <span class="is-danger" v-if="vaerrors.has('goodsFirstClass')">请选一级类别</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>二级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled"
                           no-data-text="请选择一级分类"
                           @change="switchCategory(model.goodsSecondClass,'thirdClassificationsList')"
                           v-model="model.goodsSecondClass">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsSecondClass" v-validate="'required'"
                       v-model="model.goodsSecondClass">
                <span class="is-danger" v-if="vaerrors.has('goodsSecondClass')">请选二级类别</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>三级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" :class="['el_box',isDisabled?'is-disabled':'']" :disabled="isDisabled"
                           no-data-text="请选择二级分类" v-model="model.goodsThirdClass">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsThirdClass" v-validate="'required'" v-model="model.goodsThirdClass">
                <span class="is-danger" v-if="vaerrors.has('goodsThirdClass')">请选三级类别</span>

              </div>
            </div>
            <!--<div class="form_item">
              <div class="form_left">
                <p>仓库名称:</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入仓库名称" v-model="model.warehouse"  name="depName" v-validate="'required'">
              </div>
            </div>-->
          </div>

          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>状态</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.enabled" :class="['el_box',isDisabled?'is-disabled':'']"
                           :disabled="isDisabled" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="enabled" v-validate="'required'" v-model="model.enabled">
                <span class="is-danger" v-if="vaerrors.has('enabled')">请输入库位</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>仓库</p>
              </div>
              <div class="form_right">
                <input type="text" :disabled=isNewDisabled v-model="model.wavehouseName" v-if="isNewDisabled" :class="['el_box',isNewDisabled?'is-disabled':'']">
                <el-select v-model="model.wavehouseId" @change="wavehouseSwitch"
                           @focus="fetchWarehousetByUserId" class="el_box" placeholder="请选择" clearable filterable :disabled=isNewDisabled v-else>
                  <el-option
                    v-for="item in warehouseList"
                    :key="item.wavehouseId"
                    :label="item.wavehouseName"
                    :value="item.wavehouseId">
                  </el-option>
                </el-select>
                <input type="hidden" name="wavehouseId" v-validate="'required'" v-model="model.wavehouseId">
                <span class="is-danger" v-if="vaerrors.has('wavehouseId')">请选择仓库</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>库位</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.locationId" clearable filterable class="el_box" placeholder="请选择" :disabled=isNewDisabled>
                  <el-option
                    v-for="item in locationList"
                    :key="item.locationId"
                    :label="item.locationName"
                    :value="item.locationId">
                  </el-option>
                </el-select>
                <input type="hidden" name="locationId" v-validate="'required'" v-model="model.locationId">
                <span class="is-danger" v-if="vaerrors.has('locationId')">请选择库位</span>

              </div>
            </div>
          </div>
          <div class="stokeLine">

            <div class="form_item">
              <div class="form_left">
                <p>适用底盘</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isDisabled||isNewDisabled?'is-disabled':'']" :disabled="isDisabled||isNewDisabled" placeholder="请输入适用底盘"
                       v-model="model.chassisNo">

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>库存下限</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isNewDisabled?'is-disabled':'']" placeholder="请输入库存下限" v-model="model.stockFloor" :disabled=isNewDisabled>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>适用品牌</p>
              </div>
              <div class="form_right">

                <input type="text" @click="showBrandTree=true" :class="isDisabled||isNewDisabled?'is-disabled':''"
                       :disabled="isDisabled||isNewDisabled" readonly :value="model.carTypeDesc" placeholder="请选择适用品牌">

                <input type="hidden" v-model="model.carTypeDesc">


              </div>
            </div>
          </div>

          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>零售价</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isNewDisabled?'is-disabled':'']" placeholder="请输入零售价" v-model="model.retailPrice" name="retailPrice" :disabled=isNewDisabled
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('retailPrice:required')">请输入零售价</span>
                <span v-if="vaerrors.has('retailPrice:chkNum')" class="is-danger">零售价必须为数字</span>
                <span v-if="vaerrors.has('retailPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>保险价</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isNewDisabled?'is-disabled':'']" placeholder="请输入保险价" v-model="model.insurancePrice" name="insurancePrice" :disabled=isNewDisabled
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('insurancePrice:required')">请输入保险价</span>
                <span v-if="vaerrors.has('insurancePrice:chkNum')" class="is-danger">保险价必须为数字</span>
                <span v-if="vaerrors.has('insurancePrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>索赔价</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isNewDisabled?'is-disabled':'']" placeholder="请输入索赔价" v-model="model.claimPrice" name="claimPrice" :disabled=isNewDisabled
                       v-validate="'chkNum|chkFix2'"
                >
                <!--<span class="is-danger" v-if="vaerrors.has('claimPrice:required')">请输入索赔价</span>-->
                <span v-if="vaerrors.has('claimPrice:chkNum')" class="is-danger">索赔价必须为数字</span>
                <span v-if="vaerrors.has('claimPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>渠道价</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',isNewDisabled?'is-disabled':'']" placeholder="请输入渠道价" v-model="model.channelPrice" name="channelPrice" :disabled=isNewDisabled
                       v-validate="'chkNum|chkFix2'">
                <!--<span class="is-danger" v-if="vaerrors.has('channelPrice:required')">请输入渠道价</span>-->
                <span v-if="vaerrors.has('channelPrice:chkNum')" class="is-danger">渠道价必须为数字</span>
                <span v-if="vaerrors.has('channelPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
        </div>
        <div class="create" v-else>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>商品编码</p>
              </div>
              <div class="form_right">
                <input :class="['el_box',model.id?'is-disabled':'',upper] " placeholder="请输入商品编码"
                       v-model.trim="model.goodsNo" :disabled="model.id" name="goodsNo"
                       v-validate="'required|sameGoodsNo|twoSpace'">
                <span v-if="vaerrors.has('goodsNo:required')" class="is-danger">请输入商品编码</span>
                <span v-if="vaerrors.has('goodsNo:twoSpace')" class="is-danger">不能包含两个连续空格</span>
                <!--<span v-if="vaerrors.has('goodsNo:sameGoodsNo')" class="is-danger">商品编码已经存在</span>-->
                <span v-if="errSta" class="is-danger">{{errMsg}}</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>商品名称</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入商品名称" v-model="model.goodsName" name="goodsName"
                       v-validate="'required'">
                <span class="is-danger" v-if="vaerrors.has('goodsName')">请输入商品名称</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>生产编码</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入生产编码" v-model="model.goodsVendorNo" :class="[upper] ">
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>配件属性</p>
              </div>
              <div class="form_right">
                <!--<el-select v-model="model.commonType" :class="['el_box',userInfo.storeId!=1?'is-disabled':'']"-->
                           <!--:disabled="userInfo.storeId!=1" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in accessoryPropertiesList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                <!--<input type="hidden" name="commonType" v-model="model.commonType" v-validate="'required'">-->
                <!--<span class="is-danger" v-if="vaerrors.has('commonType')">请选择配件属性</span>-->
                <el-select v-model="model.commonType" :class="['el_box','is-disabled']"
                :disabled=true placeholder="请选择">
                <el-option
                v-for="item in accessoryPropertiesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
                </el-select>
                <input type="hidden" name="commonType" v-model="model.commonType" v-validate="'required'" disabled=true>
                <span class="is-danger" v-if="vaerrors.has('commonType')">请选择配件属性</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>单位</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.unit" class="el_box" placeholder="请选择">
                  <el-option
                    v-for="item in goodsUtilList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <input type="hidden" name="unit" v-validate="'required'" v-model="model.unit">
                <span class="is-danger" v-if="vaerrors.has('unit')">请选择单位</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>保质期</p>
              </div>
              <div class="form_right">
                <input type="text" placeholder="请输入保质期" v-validate="'chkNum'" name="goodsShelflife"
                       v-model="model.goodsShelflife">
                <span class="unit">月</span>
                <span v-if="vaerrors.has('goodsShelflife:chkNum')" class="is-danger">保质期必须为数字</span>
              </div>
            </div>
            <!--<div class="form_item">
              <div class="form_left">
                <p>仓库名称:</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入仓库名称" v-model="model.warehouse"  name="depName" v-validate="'required'">
              </div>
            </div>-->
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>配件品牌</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入配件品牌" v-model="model.goodsBrandName" name="goodsBrandName" v-validate="'max:20'">
                <span class="is-danger" v-if="vaerrors.has('goodsBrandName:max')">品牌字符长度不超过20</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>产地</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入产地" v-model="model.goodsOriginArea" name="goodsOriginArea">
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>一级类别</p>
              </div>
              <div class="form_right">

                <el-select placeholder="请选择" class="el_box"
                           @change="switchCategory(model.goodsFirstClass,'secondClassificationsList')"
                           v-model="model.goodsFirstClass">
                  <el-option
                    v-for="item in firstClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsFirstClass" v-validate="'required'" v-model="model.goodsFirstClass">
                <span class="is-danger" v-if="vaerrors.has('goodsFirstClass')">请选一级类别</span>
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
                <input type="hidden" name="goodsSecondClass" v-validate="'required'"
                       v-model="model.goodsSecondClass">
                <span class="is-danger" v-if="vaerrors.has('goodsSecondClass')">请选二级类别</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>三级类别</p>
              </div>
              <div class="form_right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择二级分类" v-model="model.goodsThirdClass">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="goodsThirdClass" v-validate="'required'" v-model="model.goodsThirdClass">
                <span class="is-danger" v-if="vaerrors.has('goodsThirdClass')">请选三级类别</span>

              </div>
            </div>
            <!--<div class="form_item">
              <div class="form_left">
                <p>仓库名称:</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入仓库名称" v-model="model.warehouse"  name="depName" v-validate="'required'">
              </div>
            </div>-->
          </div>

          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>状态</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.enabled" class="el_box" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <input type="hidden" name="enabled" v-validate="'required'" v-model="model.enabled">
                <span class="is-danger" v-if="vaerrors.has('enabled')">请输入库位</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>仓库</p>
              </div>
              <div class="form_right">

                <el-select v-model="model.wavehouseId" clearable filterable @change="wavehouseSwitch"
                           @focus="fetchWarehousetByUserId" class="el_box" placeholder="请选择">
                  <el-option
                    v-for="item in warehouseList"
                    :key="item.wavehouseId"
                    :label="item.wavehouseName"
                    :value="item.wavehouseId">
                  </el-option>
                </el-select>
                <input type="hidden" name="wavehouseId" v-validate="'required'" v-model="model.wavehouseId">
                <span class="is-danger" v-if="vaerrors.has('wavehouseId')">请选择仓库</span>

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>库位</p>
              </div>
              <div class="form_right">
                <el-select v-model="model.locationId" clearable filterable class="el_box" placeholder="请选择">
                  <el-option
                    v-for="item in locationList"
                    :key="item.locationId"
                    :label="item.locationName"
                    :value="item.locationId">
                  </el-option>
                </el-select>
                <input type="hidden" name="locationId" v-validate="'required'" v-model="model.locationId">
                <span class="is-danger" v-if="vaerrors.has('locationId')">请选择库位</span>

              </div>
            </div>
          </div>
          <div class="stokeLine">

            <div class="form_item">
              <div class="form_left">
                <p>适用底盘</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入适用底盘" v-model="model.chassisNo">

              </div>
            </div>

            <div class="form_item">
              <div class="form_left">
                <p>库存下限</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入库存下限" v-model="model.stockFloor">


              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>适用品牌</p>
              </div>
              <div class="form_right">

                <input type="text" @click="showBrandTree=true" readonly :value="model.carTypeDesc"
                       placeholder="请选择适用品牌">

                <input type="hidden" v-model="model.carTypeDesc">


              </div>
            </div>
          </div>

          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>零售价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入零售价" v-model.trim="model.retailPrice" name="retailPrice"
                       v-validate="'required|chkNum|chkFix2'">
                <span class="is-danger" v-if="vaerrors.has('retailPrice:required')">请输入零售价</span>
                <span v-if="vaerrors.has('retailPrice:chkNum')" class="is-danger">零售价必须为数字</span>
                <!--<span v-if="vaerrors.has('retailPrice:chkForm')" class="is-danger">零售价数字格式有误</span>-->
                <span v-if="vaerrors.has('retailPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
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
                <span v-if="vaerrors.has('insurancePrice:chkNum')" class="is-danger">保险价必须为数字</span>
                <span v-if="vaerrors.has('insurancePrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>索赔价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入索赔价" v-model="model.claimPrice" name="claimPrice" v-validate="'chkNum|chkFix2'">
                <!--<span class="is-danger" v-if="vaerrors.has('claimPrice:required')">请输入索赔价</span>-->
                <span v-if="vaerrors.has('claimPrice:chkNum')" class="is-danger">索赔价必须为数字</span>
                <span v-if="vaerrors.has('claimPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
          <div class="stokeLine">
            <div class="form_item">
              <div class="form_left">
                <p>渠道价</p>
              </div>
              <div class="form_right">
                <input class="el_box " placeholder="请输入渠道价" v-model="model.channelPrice" name="channelPrice"
                       v-validate="'chkNum|chkFix2'">
                <!--<span class="is-danger" v-if="vaerrors.has('channelPrice:required')">请输入渠道价</span>-->
                <span v-if="vaerrors.has('channelPrice:chkNum')" class="is-danger">渠道价必须为数字</span>
                <span v-if="vaerrors.has('channelPrice:chkFix2')" class="is-danger">价格有误且最多两位小数</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form_item mtp10">
          <button v-if="model.canEdit" class="serachBtn" type="button" @click="validateBeforeSubmit">
            {{partId?'保存':'新增配件'}}
          </button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>

    <brand-tree v-if="showBrandTree" :carTypeJson="model.carTypeJson" @hiedBrandList="hiedBrandList"></brand-tree>
  </div>
</template>
<script>
  import brandTree from '../../../components/brand-tree'
  import {isNumber} from '@/assets/js/logic'

  export default {
    name: 'edit',
    props: ['partId'],
    components: {
      brandTree
    },
    data() {
      return {
        userInfo: {},
        model: {
          canEdit:true,
          id: null,
          goodsNo: null,//	商品编号
          goodsName: null,//	商品名
          goodsVendorNo: null,//	原厂家编号
          goodsType: null,//商品类型
          unit: null,//单位
          goodsShelflife: null,//保质期
          goodsFirstClass: null,//	一级分类
          goodsSecondClass: null,//	二级分类
          goodsThirdClass: null,//	三级分类
          retailPrice: null,//	零售价
          insurancePrice: null,//	保险价
          claimPrice: null,//索赔价
          channelPrice: null,//	渠道价
          stockFloor: null,//	库存下限
          wavehouseId: null,//仓库
          wavehouseName: null,//仓库名称
          locationId: null,//	库位
          locationName: null,//	库位名称
          carTypeJson: null,//适用车型id串
          carTypeDesc: null,//	适用车型字符串(报名,奥迪)
          chassisNo: null,//	适用底盘
          goodsBrandName:null,//配件品牌
          goodsOriginArea:null,//产地
          enabled: 1,//	状态
          commonType:1,//通用
        },
        upper:'upper',
        errMsg:null,//商品编码重复提示信息
        oldGoodsNo: null,//如果商品编号已经存在 存储商品编号
        accessoryPropertiesList: [
          {
            id:1,
            name:"通用"
          }
        ],
        firstClassificationsList: [],
        secondClassificationsList: [],
        thirdClassificationsList: [],
        warehouseList: [],//仓库
        locationList: [],//库位
        showBrandTree: false,
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
    created() {
      this.$validator.remove("sameGoodsNo");
      this.$validator.extend("sameGoodsNo", {
        validate: value => {

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
          // const reg = /(^[1-9]{1}[0-9]*$)|(^[1-9]*\.[0-9]{0,2}$)|(^[0]*\.[0-9]{0,2}$)|0/;
          const reg=/^(([1-9][0-9]*)|0|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/;
          return reg.test(value)
        },
      });
      this.$validator.remove("telchk");
      this.$validator.extend("telchk", {
        validate: value => {
          const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          return reg.test(value)
        }
      });
    },

    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfos'));


      if (this.partId) {
        this.fetchData();
      } else {
        // if (this.userInfo.storeId != 1) {
        //   this.model.commonType = 0;
        // }
      }
      // if (this.partId) {
      //   this.model = JSON.parse(JSON.stringify(this.partId))
      //   if (this.model.goodsFirstClass) {
      //     this.fetchCategories(this.model.goodsFirstClass, 'secondClassificationsList')
      //   }
      //   if (this.model.goodsSecondClass) {
      //     this.fetchCategories(this.model.goodsFirstClass, 'thirdClassificationsList')
      //   }
      //   if (this.model.wavehouseId) {
      //     this.fetchWarehousetByUserId()
      //     this.fetchLocationInfoByWaveId()
      //   }
      // }
      this.fetchCategories(0);
      // this.fetchAccessoriesPropertyList();
    },
    computed: {
      errSta(){
        if(this.errMsg){
          return true;
        }else{
          return false;
        }
      },
      'goodsUtilList'() {
        return this.$store.state.goodsUtilList;
        // return [];
      },
      isDisabled() {
        if (this.model.canEdit) {
          // return this.userInfo.storeId != 1 && this.model.commonType === 1;
          // return this.model.commonType === 1;
        }
        return false;
      },
      isNewDisabled() {
        if (this.model.canEdit) {
          return false;
        }
        return true;
      }
    },
    methods: {
      setErr(errMsg){
        this.errMsg=errMsg
      },
      fetchData() {
        this.$axios.get(`/admin/goods/goodsBaseInfo/detail/${this.partId}`).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.model = data.value;
            if (this.model.goodsFirstClass) {
              this.fetchCategories(this.model.goodsFirstClass, 'secondClassificationsList')
            }
            if (this.model.goodsSecondClass) {
              this.fetchCategories(this.model.goodsSecondClass, 'thirdClassificationsList')
            }
            if (this.model.wavehouseId) {
              this.fetchWarehousetByUserId();
              this.fetchLocationInfoByWaveId();
            }
          }
        })
      },
      fetchAccessoriesPropertyList() {
        this.$store.dispatch('fetchAccessoriesPropertyList').then(res => {
          let data = this.AppUtils.checkResponse(res);

          if (data) {
            this.accessoryPropertiesList = data.value;
          }
        })

      },
      fetchCategories(id, category = 'firstClassificationsList') {
        this.$store.dispatch('fetchCategories', id).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this[category] = data.value;
          }
        })
      },
      switchCategory(id, category) {
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
      fetchWarehousetByUserId() {
        if (!this.warehouseList.length) {
          this.$store.dispatch('fetchWarehousetByUserId').then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.warehouseList = data.value;
            }
          })
        }
      },
      wavehouseSwitch() {
        this.locationList = [];
        this.model.locationId = null;
        if (this.model.wavehouseId) {
          this.fetchLocationInfoByWaveId();
        }
      },
      fetchLocationInfoByWaveId() {

        this.$store.dispatch('fetchLocationInfoByWaveId', this.model.wavehouseId).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            this.locationList = data.value;
          }
        })
      },
     // toUp(){
     //    alert(1)
     //    // ////console.log(key);
     //    // ////console.log(val);
     //    // this.model[key]=this.AppUtils.upper(val);
     //  },
      judgeGoodsNo() {//校验商品编码唯一性
        ////console.log(this.model.goodsNo);
        // this.model.goodsNo=this.AppUtils.upper(this.model.goodsNo);
        if (this.model.goodsNo && this.model.goodsNo !== this.oldGoodsNo) {
          this.$axios.post('/admin/goods/goodsBaseInfo/judgeGoodsNo', {goodsNo: this.model.goodsNo}).then(res => {
            if (res.data.code === 20004) {
              this.oldGoodsNo = this.model.goodsNo;
            }
          })
        }
      },
      hiedBrandList(brandListInfo) {
        if (brandListInfo) {
          this.model.carTypeJson = brandListInfo.brandKeyList;//适用车型id串
          this.model.carTypeDesc = brandListInfo.brandNameList.join(',');//	适用车型字符串(报名,奥迪)
        }
        this.showBrandTree = false;
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
      close() {
        this.$emit('hide');
      },
      save() {
        var waves = this.warehouseList.filter(item => item.wavehouseId === this.model.wavehouseId);
        this.model.wavehouseName = waves[0]['wavehouseName'];
        var locations = this.locationList.filter(item => item.locationId === this.model.locationId);
        this.model.locationName = locations[0]['locationName'];
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
  }

  .unit {
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 33px;
  }

</style>
