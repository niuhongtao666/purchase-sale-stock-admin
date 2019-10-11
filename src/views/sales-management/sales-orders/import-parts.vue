<template>
  <div>
    <div class="zzc"  >
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">导入配件</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="content">
          <div class="row" style="border-bottom: 1px solid #ccc;">
            <div class="left">导入文件</div>
            <div class="right">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList3">
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="row">
            <div class="left">数据模版</div>
            <div class="right rightDown">下载导入模版</div>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="addSave">确定</button>
          <button class="cancelBtn" type="button" @click="addCancel">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'import-parts',
    data(){
      return{
        model:{
        },
        fileList3:[]
      }
    },

    methods:{
      //保存
      addSave(){
        this.$emit('change');
      },
      //取消
      addCancel(){
        this.$emit('change');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
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
