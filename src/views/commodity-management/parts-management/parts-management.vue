<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">一级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box"
                           @change="fetchCategories(model.goodsFirstClass,'secondClassificationsList')"
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
            <div class="group">
              <span class="left">二级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择一级分类"
                           @change="fetchCategories(model.goodsSecondClass,'thirdClassificationsList')"
                           v-model="model.goodsSecondClass">
                  <el-option
                    v-for="item in secondClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">三级类别</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" no-data-text="请选择二级分类" v-model="model.goodsThirdClass">
                  <el-option
                    v-for="item in thirdClassificationsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">服务中心</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box w180" filterable clearable v-model="model.goodsStoreId">
                  <el-option
                    v-for="item in storeList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">配件属性</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" @focus="fetchAccessoriesPropertyList" clearable
                           v-model="model.commonType" :disabled=true
                >
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
        </div>
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <!--<span class="left">商品编码:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入商品编码" v-model.trim="model.goodsNo">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <!--<span class="left">商品名称:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入商品名称" v-model.trim="model.goodsName	">
              </div>
            </div>
            <div class="group">
              <span class="left"></span>
              <!--<span class="left">适用品牌:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入适用品牌" v-model.trim="model.carTypeDesc">
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button v-if="buttonInfo.save" type="button" class="btn" @click="showMask()">{{buttonInfo.save}}</button>
              <button v-if="buttonInfo.import" type="button" class="btn" @click="importModuleShow=true">{{buttonInfo.import}}</button>
              <button  v-if="buttonInfo.export" type="button" class="btn" @click="exportData">{{buttonInfo.export}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="table_wrap">
      <div class="table_layout">
        <div>
          <el-table
            :data="dataList"
            max-height="450"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              width="70"
              v-if="buttonInfo.update"
            >
              <template slot-scope="scope">
                <span class="text-btn" @click="showMask(scope.row.id)">{{buttonInfo.update}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品编码"
              min-width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
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
            <el-table-column
              prop="goodsOriginArea"
              label="产地"
              min-width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsVendorNo"
              label="生产编码"
              min-width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="50"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="零售价"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.retailPrice}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="保险价"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.insurancePrice}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="索赔价"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.claimPrice}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="渠道价"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.channelPrice}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="wavehouseName"
              label="仓库"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="locationName"
              label="库位"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              width="60"
              prop="enabledName"
              label="状态"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsFirstClassName"
              label="一级类别"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsSecondClassName"
              label="二级类别"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsThirdClassName"
              label="三级类别"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="适用品牌"
              min-width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="breaking" :title="scope.row.carTypeDesc">
                  {{scope.row.carTypeDesc}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsShelflife"
              label="保质期"
              min-width="70"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsStoreName"
              label="门店"
              min-width="200"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="commmonTypeName"
              label="类型"
              width="50"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
    <edit v-if="showMaskFlag" :partId="partId" @hideMask="hideMask" ref="edit" @hide="hide"></edit>
    <import-module v-if="importModuleShow" @hideImportModule="hideImportModule" :title="title" ref="importModule" @hideImport="hideImport"></import-module>
  </div>
</template>

<script>
  import edit from './edit.vue'
  import importModule from '../import-module'

  export default {
    name: "parts-management",
    components: {
      edit,
      importModule,
    },
    data() {
      return {
        title:'配件管理配件导入模版',
        importModuleShow:false,
        model: {
          goodsNo: null,//    商品编号
          goodsName: null,//    商品名
          goodsFirstClass: null,//  一级分类
          goodsSecondClass: null,//   二级分类
          goodsThirdClass: null,//  三级分类
          goodsStoreId: null,// 所属门店
          carTypeDesc: null,// 适用品牌
          commonType:1,//   通用类型
          pageSize: 20,//   页数
          pageNo: 1,//  页码
        },
        partId: null,
        dataList: [],//数据列表
        firstClassificationsList: [],//一级分类
        secondClassificationsList: [],//二级分类
        thirdClassificationsList: [],//三级分类
        storeList: [],
        accessoryPropertiesList: [
          {
            id:1,
            name:"通用"
          }
        ],
      }
    },
    computed: {
      showMaskFlag() {
        // alert(this.$store.state.showMaskFlag)
        return this.$store.state.showMaskFlag;
      },
      buttonInfo() {
        return this.AppUtils.returnPermissions(9);
      },
    },
    mounted() {
      this.fetchData();
      this.fetchCategories(0);
      this.fetchStoreList();

    },

    methods: {
      hideImport(){
        this.importModuleShow=false;
      },
      hide(){
        this.$store.commit('HIDE_MASK_LAYER');
      },
      fetchData(args) {
        this.model.pageNo = 1;
        this.model.pageSize = 20;
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }

        this.$axios.post('/admin/goods/goodsBaseInfo/list', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {

            this.dataList = data.value.data;

            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      fetchCategories(id, category = 'firstClassificationsList') {
        if (category === 'secondClassificationsList') {//一级分类切换的时候 清除二级 三级分类数据 二级分类切换同理
          this.secondClassificationsList = [];
          this.model.goodsSecondClass = null;

          this.thirdClassificationsList = [];
          this.model.goodsThirdClass = null;
        } else if (category === 'thirdClassificationsList') {
          this.thirdClassificationsList = [];
          this.model.goodsThirdClass = null;
        }
        if (id === null) {//当前分类选择全部的时候 不再请求下一级分类
          return false;
        }

        this.$store.dispatch('fetchCategories', id).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            let value = data.value;
            if (value.length) {
              value.unshift({id: null, name: '全部'})
              this[category] = data.value;
            }
          }
        })
      },
      fetchStoreList() {
        this.$store.dispatch('fetchStoreList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.storeList = data.value;
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
      showMask(data) {

        this.partId = data;

        this.$store.commit('SHOW_MASK_LAYER');
      },
      hideMask(data) {
        if (data) {
          if (data.id) {
            this.edit(data);
          } else {
            this.add(data);
          }
        }
      },
      add(data) {
        this.$axios.post('/admin/goods/goodsBaseInfo/add', data).then(res => {
          if(res.data.code!=10000&&res.data.subMessage=="商品编码已经存在"){
              this.$refs.edit.setErr('商品编码已经存在');
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('操作成功')
              this.$store.commit('HIDE_MASK_LAYER');
              this.fetchData();
            }
          }
        })
      },
      edit(data) {
        this.$axios.post('/admin/goods/goodsBaseInfo/update', data).then(res => {
          if(res.data.code!=10000){
            if(res.data.subMessage=="商品编码已经存在"){
              this.$refs.edit.setErr('商品编码已经存在');
            }
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('操作成功')
              this.$store.commit('HIDE_MASK_LAYER');
              this.fetchData();
            }
          }
        })
      },
      exportData() {
        if (!this.dataList.length) {
          return this.AppUtils.alert('暂无可导出数据');
        }
        this.$axios.post('/admin/goods/goodsBaseInfo/export', this.model, {responseType: 'arraybuffer'}).then(res => {
          let fileName = '配件列表.xls'
          let blob = new Blob([res.data], {type: 'application/x-xls'})
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
      },
      importData(file) {
        // ////console.log(e)
        // let file = e.target.files[0];
        // ////console.log(file);
        if(file.name.indexOf(this.title)==-1){
          this.$message.error('请选择正确的导入模版');
          this.$refs.importModule.empty();
          return false;
        }
        let formData = new FormData();
        formData.append("file", file);
        this.$axios.post('/admin/goods/goodsBaseInfo/import', formData).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.AppUtils.alert('导入成功', () => {
              this.importModuleShow=false;
              this.fetchData();
            })
          }
        })

      },
      hideImportModule(file){
        // this.importModuleShow=false;
        if(file){
          this.importData(file);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .select-wrap {
    padding-left: 20px;
    .date-box {
      width: 346px;
    }
    & > .group {
      margin-right: 50px;
      span.left {
        width: auto;
      }
      .el_box {
        width: 110px;
      }
      .group {
        margin-left: 20px;
      }
      .w180{
        width: 180px;
      }
    }
    .area {
      margin-left: 10px;
    }
  }

  .export-in-box {
    position: relative;
    overflow: hidden;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;

    }
  }
</style>
