<template>
  <div>
    <div class="title">当前上线状态：{{sMsg}}</div>
    <div class="textareaZone">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="model.msg"
        resize="none"
      >
      </el-input>
    </div>
    <div class="btnZone">
      <el-button @click="goLine" :disabled=!completeBtn>准备上线</el-button>
      <el-button type="info" @click="completeLine" :disabled=completeBtn>上线完成</el-button>
    </div>
    <div class="sub">
      上线提示效果：所有操作页面都会有上线弹窗公告【请谨慎操作，确认已在钉钉群发过通知】
    </div>
  </div>
</template>

<script>
  export default {
    name:'online',
    data(){
      return{
        model:{
          msg:'17:30系统更新，暂停使用10分钟，请在此期间尽量停止操作！',
          open:true,
        },
        judgeState:false,
        completeBtn:true,
        stateMsg:'',
      }
    },
    mounted(){
      this.status();
    },
    computed:{
      sMsg(){
        return this.stateMsg;
      }
    },
    methods:{
      status(){
        this.$axios.get('/admin/system/getSysUpdateMsg').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          // console.log(data)
          if(!data.value.open) {
            if(this.judgeState){
              this.model.open=true;
              this.stateMsg='上线完成';
              this.completeBtn=true;
            }
          }
        })
      },
      goLine(){
        this.completeBtn=false;
        this.$axios.post('/admin/system/setSysUpdateMsg',this.model).then(res=>{
         // console.log(res)
          if(res.data.code=10000){
             if(res.data.message=='授权权限不足'){
               this.AppUtils.alert(res.data.message);
               this.completeBtn=true;
               return false;
             }
             this.judgeState=true;
             this.stateMsg='正在上线';
             this.status();
          }
        })
      },
      completeLine(){
        this.model.open=false;
        this.goLine();
      }
    }
  }
</script>

<style lang="scss" scoped>
    .title{
      width: 600px;
      line-height: 40px;
      font-size: 20px;
      color:red;
      text-align: left;
      margin-left: 40px;
    }
    .textareaZone{
      width: 600px;
      margin: 20px 40px 40px 40px;
    }
    .btnZone{
      display: flex;
      width: 600px;
      margin: 40px 40px 20px 40px;
    }
    .sub{
      width: 600px;
      line-height: 40px;
      font-size: 14px;
      color:red;
      text-align: left;
      margin-left: 40px;
    }
</style>
