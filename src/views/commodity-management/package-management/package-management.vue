<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">

            <div class="group">
              <!--<span class="left">套餐编码</span>-->
              <span class="left ml0"></span>
              <div class="right">
                <input type="text" placeholder="请输入套餐编码" v-model.trim="model.goodsNo">
              </div>
            </div>
            <div class="group ml0">
              <!--<span class="left">套餐名称:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入套餐名称" v-model.trim="model.mealsName">
              </div>
            </div>
            <div class="group ml0">
              <!--<span class="left">适用品牌:</span>-->
              <span class="left"></span>
              <div class="right">
                <input type="text" placeholder="请输入适用品牌" v-model.trim="model.carTypeDesc">
              </div>
            </div>
             <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button v-if="buttonInfo.save" type="button"  class="btn" @click="toCreate()">{{buttonInfo.save}}</button>
               <button v-if="buttonInfo.import" type="button" class="btn"  @click="importModuleShow=true">{{buttonInfo.import}}</button>
               <button v-if="buttonInfo.export" type="button" class="btn" @click="exportData">{{buttonInfo.export}}</button>
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
            max-height="440"
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
                <!--<span class="text-btn"  @click="toEdit(scope.row.id)"> 编辑</span>-->
                <router-link class="text-btn" target="_blank" :to="'/commodity-management/package-management/edit/'+scope.row.id">
                  {{buttonInfo.update}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="套餐编码"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="mealsName"
              label="套餐名称"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="salePrice"
              label="零售价"
              width="90"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="commonTypeName"
              label="属性"
              width="60"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="mealsPrice"
              label="套餐价"
              width="90"
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
              prop="enabledName"
              label="状态"
              show-overflow-tooltip
              width="60"
            >
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
    <import-module v-if="importModuleShow" @hideImportModule="hideImportModule" :title="title" ref="importModule" @hideImport="hideImport"></import-module>

  </div>
</template>
<script>
  import importModule from '../import-module'

  export default {
    name: "package-management",
    components:{
      importModule
    },
    data() {
      return{
        title:'套餐管理套餐导入模版',
        importModuleShow:false,
        model:{
          goodsNo:null,//	 	套餐编码
          mealsName:null,//	套餐名称
          carTypeDesc:null,//	适用品牌
          pageSize:1,//	页数
          pageNo:20,//页码
        },
        dataList:[],//数据列表
      }
    },
     computed: {
       buttonInfo() {
         return this.AppUtils.returnPermissions(11);
       },
     },
    mounted() {
      this.fetchData();
    },

    methods:{
      hideImport(){
        this.importModuleShow=false;
      },
      fetchData(args){
        this.model.pageNo = 1;
        this.model.pageSize = 20;
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }

        this.$axios.post('/admin/goods/goodsMealsInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){

            this.dataList=data.value.data;

            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      toCreate(){
        let routeData = this.$router.resolve({path:'/commodity-management/package-management/add'});
        //////console.log(routeData)
        window.open(routeData.href,'_blank');
        // this.$router.push('/commodity-management/package-management/add')
      },
      // toEdit(id){
      //   this.$router.push(`/commodity-management/package-management/edit/${id}`);
      // },

      exportData() {
        if (!this.dataList.length) {
          return this.AppUtils.alert('暂无可导出数据');
        }
        this.$axios.post('/admin/goods/goodsMealsInfo/export', this.model, {responseType: 'arraybuffer'}).then(res => {
          let fileName = '套餐列表.xls'
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
        if(file.name.indexOf(this.title)==-1){
          this.$message.error('请选择正确的导入模版');
          this.$refs.importModule.empty();
          return false;
        }
        let formData = new FormData();
        formData.append("file", file);
        this.$axios.post('/admin/goods/goodsMealsInfo/import', formData).then(res => {
          let data = this.AppUtils.checkResponse(res);
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
  .select-wrap{
    padding-left: 20px;
    .date-box{
      width: 346px;
    }
    &>.group{
      margin-right: 50px;
      span.left{
        width: auto;
      }
      .el_box{
        width: 110px;
      }
      .group{
        margin-left: 20px;
      }
    }
    .area{
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
