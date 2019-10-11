<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle mb9">
          <div class="addUser">{{reasonId==1?'同意申请':(reasonId==2?'驳回申请':(reasonId==3?'提交申请':(reasonId==4?'取消申请':(reasonId==5?'取消采购单':(reasonId==6?'取消退货':(reasonId==7?'确认调整':(reasonId==8?'确认调整':(reasonId==9?'驳回申请':(reasonId==10?'撤销出库':(reasonId==11?'确认退货':(reasonId==12?'调拨退货':(reasonId==13?'请确认是否新增成本调整单?':(reasonId==14?'请确认是否新增异常调整单?':'')))))))))))))}}</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="form_item plr20" v-if="reasonId==1||reasonId==2||reasonId==4||reasonId==7||reasonId==8||reasonId==9">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入原因"
            v-model="model.reason"
            resize=none
            maxlength="500"
          >
          </el-input>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="save">确认</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    props: ['reasonId'],
    data() {
      return {
        model: {
          reason: null,//原因
        },
      }
    },
    mounted() {
    },
    methods: {
      close() {
        this.$emit('hideReason');
      },
      save() {
        if(this.reasonId==1||this.reasonId==2||this.reasonId==3||this.reasonId==4){
          this.$emit('getReason',this.model);
        }else if(this.reasonId==5){
          this.$emit('statusUpdate','cancelPurchaseOrder');
        }else if(this.reasonId==6){
          this.$emit('purchaseReturn');
        }else if(this.reasonId==7||this.reasonId==8||this.reasonId==9){
          this.$emit('checkInputStock',this.model);
        }else if(this.reasonId==10){
          this.$emit('confirmCancelOut');
        }else if(this.reasonId==11){
          this.$emit('confirmReturn');
        }else if(this.reasonId==12){
          this.$emit('confirmRen');
        }else if(this.reasonId==13){
          this.$emit('save');
        }else if(this.reasonId==14){
          this.$emit('addUnusualAdjust');
        }
        this.$emit('hideReason');
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/cover.css';

  .discount {
    display: flex;
    span {
      line-height: 32px;
      margin-right: 10px;
    }
  }
</style>
