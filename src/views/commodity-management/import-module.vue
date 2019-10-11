<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">导入配件</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="content">
          <div class="row" style="border-bottom: 1px solid #ccc;">
            <div class="left">导入文件</div>
            <div class="right import-box">
              <!--<span> 选择文件</span>-->
              <!--<input type="file" accept='.xls,.xlsx' @change="uploadFile">-->
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
              <a :href='downUrl+title+".xls"'>下载导入模版</a>
              <span class="required">(模版中红色填充列为必填列)</span>
            </div>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="sendData">确定</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'import-module',
    props: ['title'],
    data() {
      return {
        file: null,
        downUrl: '/../../static/excel/',
        module: {
          saleOrderImportGoods: '销售单',
          stockDeliverImportGoods: '维修发料单',
          purchaseApplyImportGoods: '采购申请单',
        },
        fileList:[],
      }
    },
    methods: {
      empty(){
        this.fileList=[];
      },
      submitUpload(content) {
        this.file=content.file;
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
          // this.dataList=[];
          this.file=null;
        })
      },
      uploadFile(e){
        this.file=e.target.files[0];
      },
      sendData() {
        if(this.file){
          this.$emit('hideImportModule', this.file);
        }else{
          this.$message.error('请选择要导入的文件');
        }
      },
      //取消
      close() {
        this.$emit('hideImport');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/cover.css';

  /*.addform {
    .addTitle {
      margin-bottom: 0px;
    }
    .content {
      width: 456px;
      box-sizing: border-box;
      margin: 0 auto;
      margin-top: 20px;
      border: 1px solid #ccc;
      .row {
        height: 40px;
        display: flex;
        .left {
          flex: 1;
          line-height: 40px;
          background-color: #F4F5F7;
          text-align: center;
          border-right: 1px solid #ccc;
        }
        .right {
          flex: 2;
          .upload-demo {
            height: 40px;
          }
        }
        .rightDown {
          line-height: 40px;
          text-align: left;
          text-indent: 26px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .import-box {
      position: relative;
      text-align: left;
      text-indent: 26px;
      display: flex;
      align-items: center;
      color: #000;
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }*/
  .addform{
    .addTitle{
      margin-bottom: 0px;
    }
    .content{
      width: 456px;
      box-sizing: border-box;
      margin:0 auto ;
      margin-top: 20px;
      border: 1px solid #ccc;
      font-size: 12px;
      .row{
        height: 40px;
        display: flex;
        .left{
          flex: 1;
          line-height: 40px;
          background-color: #F4F5F7;
          text-align: center;
          border-right: 1px solid #ccc;
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
