import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import 'babel-polyfill'
import axios from 'axios';
import './assets/css/initialize.css'
import './assets/css/index.css'
import './assets/css/animate.css'
import Alertify from 'alertify.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AppUtils from './utils'
import VeeValidate, {Validator} from 'vee-validate'
import store from './store/index'
import * as filters from './assets/js/filter'
import envConfig  from './common/env';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Print from 'vue-print-nb'
// 加设置title插件
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)
Vue.use(Print); //注册
// import '../static/utils/jQuery.print.js'
// import '../static/utils/jquery.printarea.js'
// import '../static/utils/jquery.jqprint-0.3.js'
// import '../static/utils/jquery-migrate-1.2.1.min.js'
import Cookies from "js-cookie";
Vue.use(iView);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Alertify.logPosition('bottom right')
Alertify.maxLogItems(6)
Alertify.okBtn('确认')
Alertify.cancelBtn('取消')
axios.interceptors.request.use(
  function (config) {
    var url=config.url;
    var arr=url.split('/');
    if(arr.indexOf('msg')>-1){
      store.state.isLoading = false;
    }else{
      store.state.isLoading = true;
    }
    // 这里的config包含每次请求的内容
    config.headers['RM-Device'] = 101;
    // config.headers['Authorization'] = store.state.token;
    // return config;
    var testLogin=arr.filter(item=>item.indexOf('login?sign=')>-1);
    if(arr.indexOf('login')<0&&!testLogin.length){
      var useToken=Cookies.get('token');
      // console.log('可能要使用的'+useToken);
        if (useToken) {
          // alert(1)
          // //console.log(store.state.token)
          // //console.log(Cookies.get("token"));
          //console.log('使用的token'+useToken);
           config.headers['Authorization'] = useToken;
         }
         return config;
     }else{
      // //console.log('哈哈哈哈'+arr);
      return config;
    }
  },
  function (err) {
    return Promise.reject(err);
  },
);
// axios 统一处理网络错误
axios.interceptors.response.use(
  response => {
    store.state.isLoading = false;
    if (response.status == '200') {
      return response;
    } else if (response.status == '505') {
      Alertify.alert(response.data.message)
      return Promise.reject(response);
    } else if (response.status == '300') {
      Alertify.alert(response.data.message)
      return Promise.reject(response);
    } else if ([403, 404].indexOf(response.status) > -1) {
      this.$router.replace('/404')
    } else {
      Alertify.alert(response.data.message)
      return Promise.reject(response);
    }
  },
  error => {
    store.state.isLoading = false;
    Alertify.alert('网络请求失败');
    return Promise.reject(error);
  },
);

axios.defaults.baseURL = envConfig.baseUrl;
axios.defaults.withCredentials=true;
// axios.defaults.withCredentials=true;
//日期  年-月-日 时：分： 秒
Vue.filter('dateFormatToSecond', (date) => {
  if(date){
    return AppUtils.formatDateToSecond(date);
  }
});
Vue.filter('formatDate', (date) => {
  if(date){
    return AppUtils.formatDate(date);
  }
});
Vue.filter('getChineseNumber', (num) => {
    return AppUtils.getChineseNumber(num);
});
Vue.filter('decimalTofixed', (num) => {
  return AppUtils.decimal(num);
});
Vue.filter('decimalTofixed2', (num) => {
  return AppUtils.decimal2(num);
});
Vue.filter('decimalTofixed4', (num) => {
  return AppUtils.decimal4(num);
});
Vue.filter('decimalTofixed10', (num) => {
  return AppUtils.decimalTen(num);
});
Vue.filter('deLength4', (num) => {
  return AppUtils.deLength4(num);
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
  errorBagName: 'vaerrors',
  inject: true,
  enableAutoClasses: true,
  events: 'change',
  classNames: {
    invalid: 'invalid', // model is invalid
  },
});
Vue.component('nt-pagination', require('./components/pagination'));
Vue.component('nt-date-selector', require('./components/date-selector'));
Vue.component('nt-no-data', require('./components/no-data'));
Vue.component('nt-pulse-loader', require('./components/pulse-loader'));
Vue.component('nt-preview-image', require('./components/preview-image'));
Vue.component('nt-reason', require('./components/reason'));
Vue.component('addParts', require('./components/add-parts'));
Vue.component('partAdd', require('./components/part-add'));
Vue.component('importParts', require('./components/importParts'));
 Vue.component('brandTree', require('./components/brand-tree'));
Vue.component('positions', require('./components/wavePositon'));
Vue.prototype.AppUtils = AppUtils;
// Vue.prototype.Map = Map;
// Vue.prototype.VueAMap = VueAMap;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = new Vue();

Vue.mixin({
  data() {
    return {
      CODE_SERVER:envConfig.baseUrl,
      YDN_URL:envConfig.ynUrl,
    }
  },
})
new Vue({
  store,
  router,
  components: {App},
  template: '<App/>',
  beforeCreate(){
    // //console.log(111);
    // sessionStorage.removeItem('loginMemory');
  },
  created() {
    AppUtils.authInit(this)
      .then(() => this.$mount('#app'));
  },
})
