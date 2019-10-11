<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">申请退款</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>退款金额:</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入退款金额" v-model="model.refundAmount" v-validate="'required'">
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>退款原因:</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入退款原因" v-model="model.refundReason" v-validate="'required'">
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click=" ">申请退款</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'refund-money',
    data() {
      return {
        model: {
          refundAmount: '',//退款金额
          refundReason: '',//退款原因
        },
      }
    },

    methods: {
      //保存
      close() {

        this.$emit('hideRefundMoneyMask');

      }

    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
</style>
