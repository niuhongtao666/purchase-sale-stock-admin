<template>
  <div id="app">

    <transition name="fade">
      <router-view v-if="isRouterAlive" v-wechat-title="$route.meta.title"/>
    </transition>
    <div class="loading-box" v-if="isLoading">
      <nt-pulse-loader :loading="isLoading"></nt-pulse-loader>
    </div>
    <transition name="el-zoom-in-center">
      <nt-preview-image v-if="previewImgUrl"></nt-preview-image>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    provide(){
      return {
        reload:this.reload,
      }
    },
    watch:{
      stateCode(newVal,oldVal){
        console.log(newVal);
        console.log(oldVal);
        if(oldVal==12010&&newVal==12000){
          // this.$message.success('上线完成，请刷新页面后重新使用！')
        }
      }
    },
    created () {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
      Number.prototype.toFixed=function (n) {
        if (n > 20 || n < 0) {
          throw new RangeError('toFixed() digits argument must be between 0 and 20');
        }
        let number = this;
        var copyNumber=number;
        copyNumber=Math.abs(copyNumber);
        //console.log('取绝对值'+copyNumber)
        if (isNaN(copyNumber) || copyNumber >= Math.pow(10, 21)) {
          return copyNumber.toString();
        }
        if (typeof (n) == 'undefined' || n == 0) {
          if(number<0){
            copyNumber='-'+copyNumber;
          }
          //   return (Math.round(copyNumber)).toString();
          return copyNumber;
        }

        let result = copyNumber.toString();
        const arr = result.split('.');

        // 整数的情况
        if (arr.length < 2) {
          result += '.';
          for (let i = 0; i < n; i += 1) {
            result += '0';
          }
          if(number<0){
            result='-'+result;
          }
          return parseFloat(result);
        }
        const integer = arr[0];
        const decimal = arr[1];
        if (decimal.length == n) {
          if(number<0){
            result='-'+result;
          }
          return parseFloat(result);
        }
        if (decimal.length < n) {
          for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
          }
          if(number<0){
            result='-'+result;
          }
          return parseFloat(result);
        }
        result = integer + '.' + decimal.substr(0, n);
        const last = decimal.substr(n, 1);

        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last, 10) >= 5) {
          const x = Math.pow(10, n);
          result = (Math.round((parseFloat(result) * x)) + 1) / x;
          result = result.toFixed(n);
        }
        if(number<0){
          result='-'+result;
        }
        //console.log('最后结果'+result)
        return parseFloat(result);

      };
    },
    data(){
      return{
        isRouterAlive:true,
        timer:null,
        stateCode:12000,
      }
    },
    computed:{
      ...mapState(['isLoading','previewImgUrl'])
    },
    mounted(){
      localStorage.setItem('loginStatus','0');
      var today=new Date();
      var hours=today.getHours();
      if(this.timer){
        clearInterval(this.timer);
      }else{
        if((12<=hours&&hours<=14)||(16<=hours&&hours<=19)){
          var _this=this;
          this.timer=setInterval(function () {
            var loginStatus=localStorage.getItem('loginStatus');
            if(loginStatus=='0'){
              _this.getMsg();
            }
          },120000);
        };
      }
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(function () {
          this.isRouterAlive=true;
        })
      },
      getMsg(){
        var _this=this;
        this.$axios.get('/admin/system/msg').then(res=>{
          // console.log(res)
          _this.stateCode=res.data.code;
          if(res.data.code==12010){
            this.$message(
              {
                message:res.data.value,
                duration:15000,
                type:'warning'
              }
            );
          }else if(res.data.code==20001){
            localStorage.setItem('loginStatus','1');
          }
        })
      },
    }
  }
</script>

<style>
  #app {
    height: 100%;
    text-align: center;
    color: #000;

  }
  .loading-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /*opacity: 0.8;*/
    z-index: 1000;
    /*background: #fff;*/
  }
</style>
