<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">导入配件</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="content">
          <div class="row" style="border-bottom: 1px solid #ebeef5;">
            <div class="left">导入文件</div>
            <div class="right">
              <el-upload
                :limit="1"
                ref="upload"
                class="upload-demo"
                :file-list="fileList"
                accept='.xls,.xlsx'
                :http-request='submitUpload'
                :before-remove="beforeRemove"
                action="http://10.165.5.167:8088/"
              >
                <el-button size="small" type="primary" style="font-weight: 400">选择文件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="row">
            <div class="left">数据模版</div>
            <div class="right rightDown" style="font-weight: 400">
              <a :href='downUrl+module[importType]+".xls"' style="color:#00BAFF;"  target="_self" :download='module[importType]+".xls"'>下载导入模版</a>
              <span class="required">(模版中红色填充列为必填列)</span>
              <!--<a :href="'/../../static/excel/销售单.xls'">下载导入模版</a>-->
            </div>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="sendData" :disabled="buttonShow">确定</button>
          <button class="cancelBtn" type="button" @click="addCancel">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'importParts',
    data(){
      return{
        model:{
        },
        dataList:[],
        fileList:[],
        downUrl:'/../../static/excel/',
        buttonShow:false,
        module:{
          wavehouseTy:'库位导入模版'
          // stockLossImportGoods:'盘点调整单导入模版'
         },
        errorShow:false,
        exportStatus:false,//是否导入成功
      }
    },
    props:{
      /*"purchaseApplyImportGoods", "采购申请导入配件  "purchaseOrderImportGoods", "采购单导入配件
      *"saleOrderImportGoods", "销售单导入配件    "stockDeliverImportGoods", "维修发料单导入配件"
      *"allotOrderImportGoods", "调拨导入配件"   innerReceiveImportGoods", "内领入库导入配件
      *"stockProfiitImportGoods", "盘盈入库导入配件"   "stockLossImportGoods", "盘亏出库导入配件"
      * */
      importType:String,
    },
    methods:{
      beforeUp(file){
        //console.log(file)
        if(file.name!=this.module[this.importType]+".xls"){
          this.$message.error('请选择正确的导入模版');
          this.fileList=[];
          return false;
        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
          this.dataList=[];
        })
      },
      sendData(){
        // if(this.dataList.length){
        //   this.$emit('getImportData',this.dataList);
        //   this.$emit('importHide');
        // }else{
        //   if(this.errorShow){
        //     this.$message.error('请重新导入文件');
        //   }else{
        //     this.$message.error('请选择要导入的文件');
        //   }
        // }
          if(!this.fileList.length&&!this.exportStatus){
            this.$message.error('请选择需要导入的文件');
          }else{
            if(this.errorShow){
              this.$message.error('请重新导入文件');
            }else{
              this.$emit('getImportData');
              this.$emit('importHide');
            }
          }
      },
      submitUpload(content) {
        if(content.file.name.indexOf(this.module[this.importType])==-1){
          this.$message.error('请选择正确的文件导入');
          this.fileList=[];
          return false;
        }
        //console.log(content)
        let formData = new FormData;
        formData.append('file', content.file);
        //console.log(formData);
        var _this=this;
        this.$axios.post('/admin/base/locationInfo/import',formData).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            //console.log(data);
            // _this.dataList=data.value;
            // if(_this.dataList.length){
              _this.exportStatus=true;
              _this.$message.success('文件导入成功');
              this.buttonShow=false;
            this.errorShow=false;
            // }
          }else{
            // this.AppUtils.alert('请重新导入文件');
            // this.buttonShow=true;
            this.errorShow=true;
          }
        })
          .catch(function(error) {
            //console.log(error);
          })
      },
      submitUp() {
        // //console.log(this.fileList)
        this.$refs.upload.submit();
      },
      //取消
      addCancel(){
        this.$emit('importHide');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/cover.css';
  .addform{
    font-size: 12px!important;
    .addTitle{
      margin-bottom: 0px;
    }
    .content{
      width: 456px;
      box-sizing: border-box;
      margin:0 auto ;
      margin-top: 20px;
      margin-bottom: 20px;
      border: 1px solid #ebeef5;
      .row{
        height: 40px;
        display: flex;
        .left{
          flex: 1;
          line-height: 40px;
          background-color: #F4F5F7;
          text-align: center;
          border-right: 1px solid #ebeef5;
        }
        .right{
          flex: 2;
          .upload-demo{
            height: 40px;
          }
        }
        .rightDown{
          line-height: 40px;
          text-align: left;
          text-indent: 26px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
</style>
