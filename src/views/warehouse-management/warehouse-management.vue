<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">省份</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.provinceId" @change="clearCity">
                  <el-option
                    v-for="item in provincesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group">
              <span class="left">城市</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.cityId" @visible-change="getCityList">
                  <el-option
                    v-for="item in citiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group area">
              <span class="left">门店</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.storeId" clearable filterable>
                  <el-option
                    v-for="item in storesList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group ml0">
              <span class="left"></span>
              <!--<span class="left">仓库:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入仓库名称" v-model.trim="model.wavehouseName">
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn ml20" @click="showMask" v-if="buttonInfo.add">{{buttonInfo.add}}</button>
              <button type="button" class="btn ml20" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <div class="table_scroll ">
          <el-table
            :data="dataList"
            max-height="440"
            border
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="操作"
              width="70"
              v-if="buttonInfo.update"
            >
              <template slot-scope="scope">
                <span class="redact" @click="showMask(scope.row)">{{buttonInfo.update}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              min-width="70"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              min-width="70"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="门店"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="wavehouseName"
              label="仓库名称"
              min-width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="类型"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.wavehouseType=='1'?'商品仓库':(scope.row.wavehouseType=='2'?'新车仓库':'')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="60"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.enabled=='0'?'停用':(scope.row.enabled=='1'?'启用':'')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
        </div>
      </div>
    </div>
    <addit v-if="showMaskFlag" @hideMask="hideMask" :storesList="storesList" :maskData="maskData" @hide="hide" :errMsg="errMsg" @hideErrMsg="hideErrMsg"></addit>
  </div>
</template>

<script>
  import addit from './add-edit.vue'
  export default {
    name: "warehouse-management",
    data() {
      return{
        model:{
          provinceId:null,//省份
          cityId:null,//城市
          storeId:null,//门店
          wavehouseName:null,//仓库名称
          pageNo:1,
          pageSize:20
        },
        maskData:null,
        errMsg:null,
        dataList:[],//数据列表
        provincesList:[],
        showMaskFlag:false,
        // buttonInfo:{},//按钮权限
        citiesList:[
          {
            id:null,
            name:"全部",
          },
        ],
        // storesList:[],
      }
    },
    components:{
      addit
    },
    mounted() {
      // this.storesList=this.$store.state.storesList;
      // ////console.log(this.storesList);
      //获取省份
      this.getProvince();
      //获取列表
       this.fetchData();
      // this.buttonInfo=this.AppUtils.returnPermissions(27);

    },
    computed:{
      storesList(){
        ////console.log(this.$store.state.storesList)
        return this.$store.state.storesList;
      },
      buttonInfo() {
        return this.AppUtils.returnPermissions(27);
      },
      // showMaskFlag(){
      //   return this.$store.state.showMaskFlag;
      // }
    },
    methods:{
      hide(){
        this.showMaskFlag=false;
      },
      hideErrMsg(){
        this.errMsg=null;
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        this.$axios.post('/admin/base/wavehouse/exportWavehouseInfo', this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '仓库'+time+'.xls';
          let blob = new Blob([res.data], { type: 'application/x-xls' })
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        });
      },
      clearCity(){
        this.model.cityId=null;
      },
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      showMask(data){
        if(data['id']){
          this.maskData=data;
        }else{
          this.maskData={};
        }
        // this.$store.commit('SHOW_MASK_LAYER');
        this.showMaskFlag=true;
      },
      hideMask(data){
        if(data){
          if(data.id){
            this.edit(data);
          }else {
            this.add(data);
          }
        }
        // this.$store.commit('HIDE_MASK_LAYER');
        // this.showMaskFlag=false;
      },
      edit(data){
        ////console.log('编辑');
        this.$axios.post('/admin/base/wavehouse/update',data).then(res=>{
          if(res.data.code!=10000){
            this.errMsg=res.data.subMessage;
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('保存成功');
              this.showMaskFlag = false;
              this.hideErrMsg();
              this.fetchData();
            }
          }
        })
      },
      add(data){
        ////console.log('新增');
        this.$axios.post('/admin/base/wavehouse/add',data).then(res=>{
          if(res.data.code!=10000){
            this.errMsg=res.data.subMessage;
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('保存仓库成功');
              this.showMaskFlag = false;
              this.hideErrMsg();
              this.fetchData();
            }
          }
        })
      },
      //获取省份
      getProvince(){
        this.$store.dispatch('getProvinceList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data)
            this.provincesList=data.value;
            this.provincesList.unshift({id:null,name:'全部'});
          }
        });
      },
      //获取搜索-城市列表
      getCityList(arg){
        if(arg){
          if(this.model.provinceId){
            this.$store.dispatch('getCityList',this.model.provinceId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.citiesList=data.value;
                this.citiesList.unshift({id:null,name:'全部'});
              }
            });
          }else{
            this.AppUtils.alert('请先选择省份')
          }
        }
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
        this.$axios.post('/admin/base/wavehouse/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data) {
            this.dataList=data.value.data;
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
</style>
