<template>
  <div>
    初始化用户登陆信息
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  // import Alertify from 'alertify.js'
  export default{
    name:'init',
    data () {
      return {
        id:null,
      }
    },
    mounted(){
      // this.AppUtils.alert('第89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108行的仓库／库位在用户所属门店内不存在<br>第89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108行的仓库／库位在用户所属门店内不存在<br>第89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108行的仓库／库位在用户所属门店内不存在')
      // console.log('嘟嘟梦');
      // this.$message.error({
      //   message: '第89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108行的仓库／库位在用户所属门店内不存在,第89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108行的仓库／库位在用户所属门店内不存在',
      //   duration:4000,
      // })
      if(this.$route.query.token){
        var tokenn=this.$route.query.token;
        this.loginInit(tokenn)
      }else{
        //用户登陆
        if(this.$route.query.id&&this.$route.query.key){
          this.id=this.$route.query.id;
          this.login(this.id,this.$route.query.key);
        }else{
          // this.AppUtils.alert('请先登陆雅典娜(管理员账号jxcadmin,密码123456)');'请选择登陆账号(管理员账号jxcadmin,密码123456)
          /*this.AppUtils
            .confirm('点击确定以管理员账号登录，点击取消以其他账号登录!',
              () => {
                if(window.location.href.indexOf('jxc.n-cars.com.cn')>-1){
                  this.login(127);//线上super admin
                }else{
                  this.login(1273);//测试进销存 admin
                }
              },()=>{
                if(window.location.href.indexOf('jxc.n-cars.com.cn')>-1){
                  window.open('http://ydn.n-cars.com.cn/login.html','_blank');
                }else{
                  window.open('http://ydntest.n-cars.com.cn/login.html','_blank');
                }
              })*/
          if(this.CODE_SERVER==='http://jxc.n-cars.com.cn'){
            // window.open('http://ydn.n-cars.com.cn');
            window.location.href='http://athena.n-cars.com.cn';
          }else if(this.CODE_SERVER==='http://jxcadmin.n-cars.com.cn'){
            // window.open('http://ydntest.n-cars.com.cn');
            window.location.href='http://ydntest.n-cars.com.cn';
          }else if(this.CODE_SERVER==='http://jk.n-cars.com.cn'){
            // window.open('http://yadianna.n-cars.com.cn');
            window.location.href='http://yadianna.n-cars.com.cn/admin/login.html';
          }
        }
      }
    },
   methods:{
     login(arg,key){
       this.$axios.get('/admin/system/user/login/'+arg+'/'+key).then(res => {
          let data = this.AppUtils.checkResponse(res);
         if (data) {
           ////console.log('000')
           ////console.log(data);
           localStorage.setItem('userInfos',JSON.stringify(data.value.userInfo));
           var currentToken=this.AppUtils.getCookie('token');
           ////console.log('旧的token'+currentToken)
           if(currentToken){
             this.AppUtils.removeCookie('token');
           }
           ////console.log('新的token'+data.value.token);
           this.AppUtils.setCookieOut('token',data.value.token);
           // this.AppUtils.setCookie("token", data.value.token);
           this.$store.commit("TOKEN_INIT", {
             token: data.value.token
           });
           this.fetchData();
           this.$store.dispatch("fetchStoreList").then(res=>{
             let data = this.AppUtils.checkResponse(res);
             if(data.value.length){
               if(sessionStorage.getItem('storesList')){
                 sessionStorage.removeItem('storesList')
               }
               sessionStorage.setItem('storesList',JSON.stringify(data.value));
               this.$store.commit('GETSTOREINFO',data.value);
             };
           });
          /* this.$store.dispatch("fetchWarehousetByByStoreId",data.value.userInfo.storeId).then(res=>{
             let data = this.AppUtils.checkResponse(res);
             if(data.value.length){
               ////console.log(data.value);
               if(localStorage.getItem('WarehousesByStoreId')){
                 sessionStorage.removeItem('WarehousesByStoreId')
               }
               localStorage.setItem('WarehousesByStoreId',JSON.stringify(data.value));
               this.$store.commit('GETWAVEBYSTOREID',data.value);
             };
           });*/
         }
       }).catch((err) => {
         ////console.log(err)
       })
     },
     loginInit(arg){
       this.$axios.get('/admin/system/user/login?sign='+arg+'&&t='+new Date().getTime()).then(res => {
         let data = this.AppUtils.checkResponse(res);
         if (data) {
           ////console.log('000')
           ////console.log(data);
           // this.AppUtils.setCookie("token", data.value.token);
           localStorage.setItem('userInfos',JSON.stringify(data.value.userInfo));
           var currentToken=this.AppUtils.getCookie('token');
           ////console.log('旧的token'+currentToken)
           if(currentToken){
             this.AppUtils.removeCookie('token');
           }
           ////console.log('新的token'+data.value.token);
           this.AppUtils.setCookieOut('token',data.value.token);
           this.$store.commit("TOKEN_INIT", {
             token: data.value.token
           });
           this.fetchData();
           this.$store.dispatch("fetchStoreList").then(res=>{
             let data = this.AppUtils.checkResponse(res);
             if(data.value.length){
               if(sessionStorage.getItem('storesList')){
                 sessionStorage.removeItem('storesList')
               }
               sessionStorage.setItem('storesList',JSON.stringify(data.value));
               this.$store.commit('GETSTOREINFO',data.value);
             };
           });
           /*this.$store.dispatch("fetchWarehousetByByStoreId",data.value.userInfo.storeId).then(res=>{
             let data = this.AppUtils.checkResponse(res);
             if(data.value.length){
               ////console.log(data.value);
               if(localStorage.getItem('WarehousesByStoreId')){
                 sessionStorage.removeItem('WarehousesByStoreId')
               }
               localStorage.setItem('WarehousesByStoreId',JSON.stringify(data.value));
               this.$store.commit('GETWAVEBYSTOREID',data.value);
             };
           });*/
           // this.$router.push("/supplier-management");
         }
       }).catch((err) => {
         ////console.log(err)
       })
     },
     fetchData(){
       this.$axios.get('/admin/system/user/init').then(res => {
         let data = this.AppUtils.checkResponse(res);
         if(data){
           // this.menuList = data.value.menuInfo;
           // this.buttonInfos=data.value.buttonInfo;
           ////console.log('你是什么吗')
           localStorage.setItem('MENULIST',JSON.stringify(data.value.menuInfo));
           // localStorage.setItem('loginMemory',1);
           // this.AppUtils.setCookieOut('loginMemory',1);
           this.$store.commit('MENULIST',data.value.menuInfo);
           this.$store.commit('BUTTONPERMISSIONS',data.value.buttonInfo);
           this.$router.push("/home");
         }
       })
     },
   }
  }
</script>
<style lang="scss" scoped>
</style>

