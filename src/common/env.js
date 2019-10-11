/*
 * 配置编译环境和线上环境之间的切换
 * 以及静态变量
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */
let baseUrl = '';
let ynUrl='';
let routerMode = 'history';
let DEBUG = false;
let cancleHTTP = [];//取消请求头设置；
if (process.env.NODE_ENV == 'development') {
  // baseUrl = "http://10.165.107.92:8080/";
  baseUrl = "http://jk.n-cars.com.cn";
  // http://10.165.106.126:8080/admin/stock/inputInfo/printpdf/1
  //http://10.165.110.212:8080/admin/stock/inputInfo/printpdf/1
  // baseUrl ="http://10.165.104.113:8080";
  ynUrl='http://yadianna.n-cars.com.cn/admin';
  // baseUrl = "http://jxcadmin.n-cars.com.cn";
  // ynUrl='http://ydntest.n-cars.com.cn';
  // baseUrl = "http://jxc.n-cars.com.cn";
  // ynUrl='http://ydn.n-cars.com.cn';
  // baseUrl = "http://jxc.n-cars.com.cn";
  // // // ynUrl='http://ydn.n-cars.com.cn';/admin/login.html
  // ynUrl='http://athena.n-cars.com.cn';
  DEBUG = true;
} else if (process.env.NODE_ENV == 'testing') {
  baseUrl = "http://jxcadmin.n-cars.com.cn";
  ynUrl='http://ydntest.n-cars.com.cn';
  DEBUG = false;
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = "http://jxc.n-cars.com.cn";
  // ynUrl='http://ydn.n-cars.com.cn';/admin/login.html
  ynUrl='http://athena.n-cars.com.cn';
  DEBUG = false;
}else if (process.env.NODE_ENV == 'jk') {
  baseUrl = "http://jk.n-cars.com.cn";
  ynUrl='http://yadianna.n-cars.com.cn';
  DEBUG = false;
}

export default {
  baseUrl,
  ynUrl,
  routerMode,
  DEBUG,
  cancleHTTP
}
