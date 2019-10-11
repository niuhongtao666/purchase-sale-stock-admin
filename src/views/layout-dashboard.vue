<template>
  <div :class="['section-inner',menuShow?'active':'']">
    <div class="left-side side-menu-wrap">
      <div :class="['switch-btn','switch-menu',menuShow?'active':'']" @click="openMenu"></div>
      <div :class="['side_menu',!menuShow?'active':'']">
        <div class="logo_bg">
          <!--<a href="javascript:;" class="logo"></a>-->
          <router-link to="/" class="logo"></router-link>
        </div>
        <div class="menu_wrap">
          <el-menu
            router
            unique-opened
            :default-active="path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#021D2B"
          >
            <el-submenu :index="menu.id+''" v-for="(menu,index) in menuList" :key="index">
              <template slot="title">
                <i :class="[menu.icon,'icon']"></i>
                <span slot="title">{{menu.name}}</span>
              </template>
              <el-menu-item-group v-if="menu.children.length">
                <el-menu-item :index='subMenu.url+""' v-for="subMenu in menu.children" :key="subMenu.id">
                  <!--<a :href="subMenu.url">{{subMenu.name}}</a>-->
                  <router-link :to="subMenu.url">{{subMenu.name}}</router-link>
                  <!--{{subMenu.name}}-->
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="wrap">
      <header class="header">
        <div class="left"></div>
        <div class="right">
          <div class="userInfo" v-if="userName"><img src="../assets/images/icon/user.png" alt="">{{userName}}</div>
          <div class="line"></div>
          <div class="loginOut" @click="signOut" @mouseenter="enter" @mouseleave="leave">
            <img src='../assets/images/icon/esc.png' alt="" v-if="src">
            <img src='../assets/images/icon/esc_blue.png' alt="" v-else>
            退出
          </div>
        </div>
      </header>
      <div class="crumb" v-if="crumbList&&crumbList.length">
        <span v-for="(item,index) in crumbList" class="crumb_item"><a :href=item.href>{{item.name}}</a><i
          class="el-icon-arrow-right"></i></span>
      </div>
      <div class="body">
        <!--<router-view v-if="userInfo" :key="/^\/(home)\/?/.test($route.path)?userInfo.cityId:''"></router-view>-->
        <transition name="fade" :key="$route.fullPath">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layout-dashboard',
    data() {
      return {
        menuList:[],//menu列表
        menuShow: true,
        userInfo: null,
        geocoder: null,
        isCollapse:false,
        pathWay:null,
        buttonInfos:[],
        userName:null,//用户名
        src:true
      }
    },
    computed: {
      state() {
        return this.$store.state;
      },
      crumbList() {
        return this.$route.meta.crumbList;
      },
      path(){
        ////console.log(this.$route.path);
        var newPath;
        var arr=this.$route.path.split('/');
        ////console.log(arr)
        if(arr.length>=4){
          newPath=arr.slice(0,3).join('/')+'/';
        }else{
          newPath=arr.slice(0,3).join('/');
        }
        ////console.log(arr);
        ////console.log(arr[2]);
        if(arr.length>3&&(arr[2]=='list'||arr[1]=='commodity-management')){
          newPath=newPath.substr(0,newPath.length-1);
        }
        ////console.log(newPath);
        this.pathWay=newPath;
        ////console.log('测试dot');
        /*if(this.buttonInfos.length){
          var arrNew=this.buttonInfos;
          ////console.log(arrNew);
          ////console.log(this.pathWay);
          var buttonSpecial=arrNew.filter(item=>item.url==this.pathWay);
          ////console.log(buttonSpecial);
          if(buttonSpecial.length){
            localStorage.setItem("buttonInfo",JSON.stringify(buttonSpecial[0]['buttonInfo']));
          }else{
            localStorage.removeItem("buttonInfo");
          }
        }*/
        return newPath;
      },
      // userInfosName(){
      //   var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      //   if(userInfos.name){
      //     return userInfos.name
      //   }
      // }
      // userName(){
      //   var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      //   return userInfos['name'];
      // },
      // menuList(){
      //   var menuList=JSON.parse(localStorage.getItem('MENULIST'));
      //   if(menuList&&menuList.length){
      //     return menuList;
      //   }
      // },
    },
    mounted() {
      ////console.log('就必然橄榄')
     var menuList=JSON.parse(localStorage.getItem('MENULIST'));
      //console.dir(menuList)
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      //console.dir(userInfos)
      this.userName=userInfos['name'];
      ////console.log('阿訇'+menuList)
     if(menuList&&menuList.length){
       this.menuList = menuList;
     }
    },
    methods: {
      enter(){
        this.src=false;
      },
      leave(){
        this.src=true;
      },
      //开关菜单
      openMenu(){
        this.menuShow=!this.menuShow;
        this.isCollapse=!this.isCollapse;
      },
      handleOpen(key, keyPath) {
        // ////console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // ////console.log(key, keyPath);
      },
      fetchData(){
        this.$axios.get('/admin/system/user/init').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if(data){
            this.menuList = data.value.menuInfo;
            this.buttonInfos=data.value.buttonInfo;
            this.$store.commit('BUTTONPERMISSIONS',this.buttonInfos);
          }
        })
      },
      signOut() {//退出登录
        var _this=this;
        // alert(this.YDN_URL);
        // alert(this.CODE_SERVER);
        // alert(window.location.href);
        this.AppUtils.confirm('是否退出登录?', () => {
          _this.AppUtils.removeCookie('token');
          localStorage.clear();
          // window.location.reload();
          // if(window.location.href.indexOf('http://jxc.n-cars.com.cn')>-1){
          //   // window.open('http://ydn.n-cars.com.cn');
          //   window.location.href='http://ydn.n-cars.com.cn';
          // }else if(window.location.href.indexOf('http://jxcadmin.n-cars.com.cn')>-1){
          //   // window.open('http://ydntest.n-cars.com.cn');
          //   window.location.href='http://ydntest.n-cars.com.cn';
          // }else if(window.location.href.indexOf('http://jk.n-cars.com.cn')>-1){
          //   // window.open('http://yadianna.n-cars.com.cn');
          //   window.location.href='http://yadianna.n-cars.com.cn/admin/login.html';
          // }else{
          //   window.location.href='http://ydn.n-cars.com.cn';
          // }
          if(window.location.href.indexOf('http://jk.n-cars.com.cn')>-1||window.location.href.indexOf('localhost')>-1){
              // window.open('http://yadianna.n-cars.com.cn');
              // window.location.href=this.YDN_URL+'/admin/login.html';
            window.location.href='http://yadianna.n-cars.com.cn/admin/login.html';
          }else {
              window.location.href=this.YDN_URL;
          }
        });
      },
    }
  }
</script>
<style lang="scss" socped>
  .section-inner {
    display: flex;
    height: 100%;
    .side-menu-wrap {
      position: relative;
      /*切换按钮*/
      .switch-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: url("../assets/images/icon/slide_icon.png") no-repeat;
        background-size: cover;
        width: 18px;
        height: 18px;
        z-index: 2;
        cursor: pointer;
        transform: rotate3d(0, -1, 0, 180deg);
        transition: transform .3s ease-in-out;

      }
      .switch-btn.active {
        transform: rotate3d(0, 0, 0, 180deg);
      }

    }
    .wrap {
      flex: 1;
    }

    .side_menu.active {
      width: 60px;

    }
    .menu_wrap {
      font-size: 14px;
      .menu {
        a {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          height: 20px;
          color: #5F758E;
          white-space: nowrap;
          i {
            height: 14px;
            min-width: 14px;
            margin: 0 23px;
            /*background-color: red;*/
          }
        }

      }
    }
  }

  .header {
    /*position: absolute;*/
    width: 100%;
    /*z-index: 1;*/
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 14px;
    border-bottom: $border;
    box-sizing: border-box;
    .left {
      margin-left: 20px;
      .create-order {
        width: 100px;
        background-color: #FF615B;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        span.el-icon-plus {
          /*margin-right: 20px ;*/
          /*font-size: 20px;*/
          margin-right: 15px;
          font-weight: bold;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
     &>div{
       margin-right: 50px;
       color: #4A4A4A;
       font-size: 12px;

     }
      .line{
        height: 20px;
      }
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
      .userInfo {
        img {
          width: 22px;
          height: 22px;
        }
      }
      .loginOut {
        cursor: pointer;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
    .address-box {
      position: relative;
      display: flex;
      align-items: center;
      a{
        margin-left: 20px;
        color: #4A4A4A;
        .el-icon-arrow-down{
          margin-left: 20px;
          transform: rotate(0deg);
          transition: transform .3s ease-in;
        }
      }
      .address_icon{
        background: url("../assets/images/icon/location-active_icon.png") no-repeat;
        height: 23px;
        width: 18px;
        background-size: cover;
      }
      &.active .el-icon-arrow-down{
        transform: rotate(-180deg);
      }
    }
    .address-list {
      position: absolute;
      z-index: 10;
      top: 36px;
      left: 50%;
      margin-left: -215px;
      width: 430px;
      height: 250px;
      border: $border;
      background-color: #fff;
      padding: 0 20px;
      text-align: left;
      .top-bar {
        border-bottom: $border;
        height: 40px;
        align-items: center;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
      .current-address {

      }
      li {
        display: inline-block;
        line-height: 30px;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: $color;
        }
      }
    }
  }

  .logo_bg .logo {
    display: block;
    margin: 10px auto 60px;
    background: url("../assets/images/logo/logo_1_icon.png") no-repeat;
    width: 140px;
    height: 26px;
    background-size: 140px 26px;
  }

  .side_menu.active .logo_bg .logo {
    background: url("../assets/images/logo/logo_icon.png") no-repeat;
    width: 25px;
    background-size: cover;
  }

  .home-menu {
    i {
      background: url("../assets/images/icon/home_icon.png");
      background-size: cover;
    }
    .router-link-active i {
      background: url("../assets/images/icon/home_active_icon.png");
      background-size: cover;
    }
  }

  .info-pool-menu {
    i {
      background: url("../assets/images/icon/info-pool_icon.png");
      background-size: cover;
    }
    .router-link-active-manual i {
      background: url("../assets/images/icon/info-pool_active_icon.png");
      background-size: cover;
    }
  }

  .work-order-menu {
    i {
      background: url("../assets/images/icon/work-order_icon.png");
      background-size: cover;
    }
    .router-link-active-manual i {
      background: url("../assets/images/icon/work-order_active_icon.png");
      background-size: cover;
    }
  }

  .employee-menu {
    i {
      background: url("../assets/images/icon/employee_icon.png");
      background-size: cover;
    }
    .router-link-active-manual i {
      background: url("../assets/images/icon/employee_active_icon.png");
      background-size: cover;
    }
  }
  .fixed-btn{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 200px;
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 0;
  }
</style>
