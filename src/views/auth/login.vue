<template>
  <div>
    <div class="top">
      <div class="img">
        <img src="../../assets/images/logo/logo_1_icon.png" alt="">
      </div>
    </div>
    <div class="middle">
      <img src="../../assets/images/bg/login_bg.jpg" alt="">
      <form @submit.prevent="login">
        <div class="login-box">
          <div class="form-top">
            <div><i></i> <span>欢迎登录</span> <i></i></div>
            <!--<img src="../../icons/welcome.png" alt="">-->
            <p>WELCOMRE TO LOGIN</p>
          </div>
          <div class="form-group">
            <!--<img src="../../icons/2.png" alt="">-->
            <input type="text" placeholder="用户名" required v-model="userInfo.username">
          </div>
          <div class="form-group">
            <!--<img src="../../icons/1.png" alt="">-->
            <input type="password" placeholder="密码" required v-model="userInfo.password">
          </div>
          <div class="form-group flex">
            <input class="verCode" type="text" placeholder="验证码" required v-model="userInfo.verCode">
            <img class="verCodeImg" @click="getVerifyCode" :src="imgSrc" alt="">
          </div>
          <div class="form-group clearfix">
            <label class="fl_left checkBox">
              <input type="checkbox"v-model="rememberPassword">
              <span></span>记住密码
            </label>
          </div>
          <div class="bottom">
            <button class="serachBtn" ref="loginBtn" type="submit">立即登录</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>
<script>



  import Cookies from 'js-cookie'
  export default{
    data () {
      return {
        userInfo: {
          username: '',
          password: '',
          verCode: ''
        },
        inputFlag: '0',
        rememberPassword:false,
        imgSrc:''
      }
    },
    mounted(){
      this.getVerifyCode();
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo= JSON.parse(userInfo);
        this.rememberPassword = true;
        this.userInfo.username =userInfo.username;
        this.userInfo.password =userInfo.password;
      }
    },
    methods: {
      // 登录
      login(){
        let _loginBtn = this.$refs.loginBtn;
        _loginBtn.disabled = true;
        _loginBtn.innerText = "登录中..."
        this.$axios.post('/rescue-master/api/admin/user/login', this.userInfo).then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            if (this.rememberPassword) { //记住密码
              localStorage.setItem("userInfo", JSON.stringify({username:this.userInfo.username,password:this.userInfo.password}))
            } else {
              localStorage.setItem("userInfo", "")
            }
            this.AppUtils.setCookie("token", data.data.token);
            this.$store.commit("TOKEN_INIT", {
              token: data.data.token
            });
            this.$router.push("/");
            // this.$store.dispatch('fetchCityList');
          }
        }).catch((err) => {
          ////console.log(err)

        }).finally(()=>{
          _loginBtn.disabled = false;
          _loginBtn.innerText = "登录"
        });
      },
      getVerifyCode(){
        this.imgSrc=this.CODE_SERVER+'/rescue-master/api/admin/user/getVerifyCode?t='+new Date().getTime();
        // this.imgSrc='http://10.165.107.211:8080/rescue-master/api/admin/user/getVerifyCode?t='+new Date().getTime();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top {

    /*height: 82px;*/
    background-color: #fff;
  }

  .top .img {

    width: 1200px;
    margin: 0 auto;
    text-align: left;
    padding: 10px;
    /*margin-left: 428px;*/
  }

  .top img {
    width: 120px;
    height: 30px;
  }

  .middle {
    width: 100%;
    /*height:450px;*/
    position: relative;
  }

  .middle > img {
    width: 100%;
    /*height: 450px;*/
  }

  .middle form {
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 3px;
    background-color: #fff;
    right: 200px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }

  .login-box {
    width: 270px;
    margin: 0 auto;
  }

  .form-top {
    margin-bottom: 50px;
  }

  .form-top div {
    margin: 35px auto 5px;
    display: flex;
    align-items: center;
  }

  .form-top span {
    margin: 0 10px;
    color: #323C47;
  }

  .form-top i {
    height: 1px;
    background-color: #E9E9E9;
    flex: 1;
    opacity: 0.8;
  }

  .form-top p {
    color: #A3ABB9;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group input {
    width: 260px;
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    border-radius: 3px;
    align-items: center;
    border: 0;
    background-color: #F7F7F9;
    font-size: 14px;
    color: #000;
  }

  .form-group .checkBox {
    font-size: 12px;
    color: #ADADAD;
  }

  /*.userName img{*/
  /*width: 15px;*/
  /*height:17px;*/
  /*margin: 0 10px;*/
  /*}*/
  /*.password img{*/
  /*width: 15px;*/
  /*height: 21px;*/
  /*margin: 0 10px;*/
  /*}*/

  .bottom {
    display: flex;
    justify-content: center;;
    align-items: center;
  }

  .serachBtn {
    font-size: 14px;
    margin: 10px auto;
    height: 36px;
    width: 100%;
    background-color: $btnColor;
    color: #fff;
  }
  .verCode{
    margin-right: 20px;
    &+img{
      cursor: pointer;
    }
  }
</style>

