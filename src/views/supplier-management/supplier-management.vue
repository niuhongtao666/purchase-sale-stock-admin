<template>
  <div class="main_wrap">
    <div class="search-box">
      <form  @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group area">
              <span class="left">创建门店</span>
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
            <div class="group">
              <span class="left"></span>
              <!--<span class="left">供应商名称:</span>-->
              <div class="right">
                <input type="text" placeholder="请输入供应商名称" v-model.trim="model.supplierName">
              </div>
            </div>
            <div class="group">
              <span class="left">供应商属性</span>
              <div class="right">
                <el-select  class="el_box" v-model.trim="model.commonType" filterable clearable>
                  <el-option
                    v-for="item in supplierAttrsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group area">
              <span class="left">状态</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.enabled">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn" >搜索</button>
              <button type="button" class="btn" @click="showMask" v-if="buttonInfo.save">{{buttonInfo.save}}</button>
              <!--<button type="button" class="btn" @click="showMask">新增</button>-->
              <button type="button" class="btn" @click="exportData" v-if="buttonInfo.export">{{buttonInfo.export}}</button>
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
              key="1"
              width="50">
            </el-table-column>
            <el-table-column
              label="操作"
              width="50"
              key="2"
              v-if="buttonInfo.update"
            >
              <template slot-scope="scope">
                <span class="redact" @click="showMask(scope.row)">{{buttonInfo.update}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="supplierNo"
              label="供应商编号"
              min-width="150"
              key="3"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商名称"
              min-width="130"
              show-overflow-tooltip
              key="4"
            >
            </el-table-column>
            <el-table-column
              prop="contactPerson"
              label="联系人"
              min-width="55"
              show-overflow-tooltip
              key="5"
            >
            </el-table-column>
            <el-table-column
              prop="phoneDecimal"
              label="联系电话"
              min-width="85"
              key="6"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="updateUserName"
              label="修改人"
              min-width="55"
              key="7"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="最后修改时间"
              min-width="120"
              key="8"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.updateTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="属性"
              min-width="50"
              key="9"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.commonType=='0'?'自用':(scope.row.commonType=='1'?'通用':'')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="viewStoreName"
              label="创建门店"
              min-width="150"
              key="10"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="状态"
              width="50"
              key="11"
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
    <addit v-if="showMaskFlag" @hideMask="hideMask" :maskData="maskData" :userInfos="userInfos" :errMsg="errMsg" @hideErrMsg="hideErrMsg" @hide="hide" ref="edit"></addit>
  </div>
</template>

<script>
  import addit from './add-edit.vue'
  export default {
    name: "supplier-management",
    inject:['reload'],//注入reload方法
    data() {
      return{
        model:{
          commonType:'',//供应商属性
          enabled:'',//状态
          supplierName:'',//供应商
          storeId:null,//门店id
          pageNo:1,
          pageSize:20
        },
        maskData:null,
        dataList:[],//数据列表
        supplierId:'',//供应商id
        // buttonInfo:{},//按钮权限
        buttonInfos:[],
        errMsg:null,
        showMaskFlag:false,
        supplierAttrsList:[
          {
            id:'',
            name:'全部'
          },
          {
            id:1,
            name:"通用"
          },
          {
            id:0,
            name:"自用"
          }
        ],
        options:[
          {
            id:'',
            name:"全部",
          },
          {
            id: 0,
            name: '停用',
          },
          {
            id: 1,
            name: '启用',
          }
        ],
      }
    },
    components:{
      addit
    },
    mounted() {
      this.getButton();
      //获取列表
      // ////console.log(returnPermissions(this))
      // ////console.log(localStorage.getItem('button'));
      // this.buttonInfo=this.AppUtils.returnPermissions();
      // alert(this.buttonInfo)
      ////console.log(this.buttonInfo);
      this.userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.model.storeId=this.userInfos['storeId'];
      // this.fetchAccessoriesPropertyList();//供应商属性
      this.fetchData();
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(26);
      },
      storesList(){
        console.log(this.$store.state.storesList)
        return this.$store.state.storesList;
      },
    },
    methods:{
      hide(){
        this.showMaskFlag=false;
      },
      hideErrMsg(){
        this.errMsg=null;
      },
      getButton(){
          /*this.$axios.get('/admin/system/user/init').then(res => {
            let data = this.AppUtils.checkResponse(res);
            if(data){
              this.buttonInfos=data.value.buttonInfo;
              var buttonPermissions=this.buttonInfos;
              ////console.log(buttonPermissions);
              var newPath;
              var arr=this.$route.path.split('/');
              //////console.log(arr)
              if(arr.length>=4){
                newPath=arr.splice(0,3).join('/')+'/';
              }else{
                newPath=arr.splice(0,3).join('/');
              }
              if(buttonPermissions.length){
                var arrNew=buttonPermissions;
                var buttonSpecial=arrNew.filter(item=>item.url==newPath);
                if(buttonSpecial.length){
                  ////console.log(buttonSpecial[0]['buttonInfo']);
                  this.buttonInfo=buttonSpecial[0]['buttonInfo'];
                }
              };
            }
          })*/
        // this.buttonInfo=this.AppUtils.returnPermissions(26);
        ////console.log(this.buttonInfo)
      },
      fetchAccessoriesPropertyList(){
        this.$store.dispatch('fetchAccessoriesPropertyList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if(data){
            this.supplierAttrsList=data.value;
            // this.supplierAttrsList.unshift({id:'',name:'全部'})
          }
        })
      },
      exportData(){
        if(!this.dataList.length){
          return this.AppUtils.alert("暂无可导出数据");
        }
        this.$axios.post('/admin/base/supplierInfo/export', this.model,{responseType:'arraybuffer'}).then(res => {
          var myDate = new Date();
          var time = myDate.toLocaleDateString().split('/').join('-');
          let fileName = '供应商'+time+'.xls';
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
      // 修改table header的背景色,字体颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #333;font-weight:500'
        }
      },
      showMask(data){
        if(data['id']){
          this.maskData=data;
        }else{
          this.maskData={};
        }
        this.showMaskFlag=true;
      },
      hideMask(data){
        if(data){
          if(data['id']){
            this.edit(data);
          }else {
            this.add(data);
          }
        }
        // this.$store.commit('HIDE_MASK_LAYER');
      },
      add(data){
        this.$axios.post('/admin/base/supplierInfo/add',data).then(res=>{
          if(res.data.code!=10000){
            if(res.data.subMessage=="供应商的名称重复"){
              this.$refs.edit.setErr('供应商的名称重复');
            }else{
              this.errMsg=res.data.subMessage;
            }
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('保存成功');
              this.showMaskFlag=false;
              // this.supplierAttrsList.unshift({id: '', name: '全部'})
              this.fetchData();
            }
          }
        })
      },
      edit(data){
        this.$axios.post('/admin/base/supplierInfo/update',data).then(res=>{
          if(res.data.code!=10000){
            if(res.data.subMessage=="供应商的名称重复"){
              this.$refs.edit.setErr('供应商的名称重复');
            }else{
              this.errMsg=res.data.subMessage;
            }
          }else {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('保存成功');
              this.showMaskFlag=false;
              // this.supplierAttrsList.unshift({id: '', name: '全部'})
              this.fetchData();
            }
          }
        })
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
        this.$axios.post('/admin/base/supplierInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
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
