
import Alertify from 'alertify.js'
// import scriptjs from 'scriptjs'
import dateFormat from "dateformat";
import Cookies from 'js-cookie'
const utils = {
  vm:null,
  authInit(vm) {
    this.vm=vm;
    return new Promise((resolve, reject) => {
      const token = Cookies.get('token');
      // console.log('看什么看=');
      // //console.log('登陆记忆'+Cookies.get('loginMemory'));
      //console.log(window.location.href)
      //console.log(token);
      if (token) {
        ////console.log('在看打你');
        // //console.log(Cookies.get('loginMemory'));
        // if(Cookies.get('loginMemory')){
        if(window.location.href.indexOf("token=")>-1||window.location.href.indexOf("&key=")>-1){
          this.removeCookie(token);
          //console.log('已经失效'+token);
        }else{
          this.fetchData();
        }
        // }
        // const permission =JSON.parse(Cookies.get('permission'));
        vm.$store.commit('TOKEN_INIT', { 'token': token});
        // vm.$store.dispatch('fetchCityList');
      }
      resolve()
    })
  },
 setCookieOut(name, value) {
    var Days = 30;
    var exp = new Date();
   // exp.setTime(exp.getTime() + 10 * 1000);//过期时间 2分钟
    exp.setTime(exp.getTime() + 60 * 1000*60*24*3);//过期时间 8小时
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  upper(value) {
    if (!value) return '';
    //console.log(value)
    value = value.toString();
    return value.toUpperCase();
  },
 fetchData(){
    this.vm.$axios.get('/admin/system/user/init').then(res => {
      let data = this.checkResponse(res);
      if(data){
        // this.menuList = data.value.menuInfo;
        // this.buttonInfos=data.value.buttonInfo;
        this.vm.$store.commit('MENULIST',data.value.menuInfo);
        this.vm.$store.commit('BUTTONPERMISSIONS',data.value.buttonInfo);
      }
    })
  },
  loginRedirect(cb, redirect = true) {
    if (this.$store.state.auth.token !== '') {
      // cb()fetchCityList
    }
    else {
      const str = redirect ? ('?returnUrl=' + this.$route.path) : '';
      this.$router.push('/login' + str);
    }
  },
  returnPermissions(routingId){
    let buttonPermissions=this.vm.$store.state.buttonPermissions;
    //console.log(buttonPermissions)
    let buttonInfo={};
    for(let val of buttonPermissions){
      if(val.routingId===routingId){
        buttonInfo=val.buttonInfo;
        break;
      }
    }
    return buttonInfo;
    // buttonPermissions.forEach(val)
    // alert(344);
    //   var buttonPermissions=this.vm.$store.state.buttonPermissions;
    //   //console.log(buttonPermissions);
    //   var newPath;
    //   var arr=this.vm.$route.path.split('/');
    //   ////console.log(arr)
    //   if(arr.length>=4){
    //     newPath=arr.splice(0,3).join('/')+'/';
    //   }else{
    //     newPath=arr.splice(0,3).join('/');
    //   }
    //   if(buttonPermissions.length){
    //     var arrNew=buttonPermissions;
    //     var buttonSpecial=arrNew.filter(item=>item.url==newPath);
    //     if(buttonSpecial.length){
    //       //console.log(buttonSpecial[0]['buttonInfo']);
    //       return buttonSpecial[0]['buttonInfo'];
    //     }
    //   };
  },
  setCookie(key, value) {
    Cookies.set(key, value)

  },
  getCookie(name) {
    return Cookies.get(name)
  },
  removeCookie(name){
    Cookies.remove(name);
  },
  autoSizeImage(w, h, slim = false) {
    // return `?imageMogr2/thumbnail/${w}x${h}/blur/1x0/quality/100${slim ? '|imageslim': ''}`
    return `?imageMogr2/auto-orient/thumbnail/!${w}x${h}r/gravity/Center/crop/${w}x${h}/blur/1x0/quality/100${slim ? '|imageslim' : ''}`
  },
  avatar(url, w, h) {
    return url + utils.autoSizeImage(w, h)
  },
  scrollTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  'alert': function () {
    Alertify.alert(...arguments)
  },

  'log': function () {
    Alertify.log(...arguments)
  },

  'confirm': function () {
    Alertify.confirm(...arguments)
  },
  'okBtn': function () {
    Alertify.okBtn(...arguments)
  },
  'cancelBtn': function () {
    Alertify.cancelBtn(...arguments)
  },
  'error': function () {
    Alertify.error(...arguments)
  },
  'checkResponse': function (res, showError = true) {
    // const err_msg = this.retrieve_err_msg(data)
    // let data=JSON.parse(res.data);
    // if (data.subMessage && showError) {
    //   this.alert(data.subMessage)
    // }
    // console.log(res.data)
    if (10000 === res.data.code) {
      return res.data;
    } else if(20001 === res.data.code) {//未登录 或者登录超时
      // 清空本地token跳转到登录页面
      // window.open('/auth/login');
      // this.vm.$router.push('/auth/login');
      // Cookies.remove('token' );
      if(window.location.href.indexOf('http://jk.n-cars.com.cn')>-1||window.location.href.indexOf('localhost')>-1){
        // window.open('http://yadianna.n-cars.com.cn/admin/login.html','_blank');
        window.location.href='http://yadianna.n-cars.com.cn/admin/login.html';
      }else{
        // window.open('http://athena.n-cars.com.cn','_blank');
        // alert(1);
        window.location.href='http://athena.n-cars.com.cn';
      }
      return false
    }else if(res.data.code==90001){
      // this.alert(res.data.value);
      return false
    }else{
      this.alert(res.data.subMessage);
      return false
    }
  },
  'retrieve_err_msg': function (data) {
    if ('object' === typeof data && 'string' === typeof data.err_msg && data.err_msg.length > 0) {
      return data.err_msg
    }
  },
  'formatDate':function (date) {
    return  dateFormat(date, "yyyy-mm-dd");
  },
  'formatYearMonth':function (date) {
    return  dateFormat(date, "yyyy-mm");
  },
  'formatDateToSecond':function (date) {
    if(date){
      return  dateFormat(date, "yyyy-mm-dd  HH:MM:ss");
    }else {
      return
    }
  },
  'form':function (date) {
    if(date){
      return  (new Date(date)).getTime();
    }else {
      return
    }
  },
  'initEndTime':function(time){//结束时间修改为当前时间23：59：59
      if(time) return time+24*60*60*1000-1000
  },
  'mathRound':function (num,dot) {
    var num1=Math.round(num*Math.pow(10,dot))/Math.pow(10,dot);
    return num1;
  },
  'decimal':function (num) {
    ////console.log(num)
    if(num){
      var str=num+'';
      var arr=str.split('.');
      if(arr[1]&&arr[1].length>2){
        num=num.toFixed(2);
        return num;
      }else if(!arr[1]){
        return num+'.00';
      }else if(arr[1].length==1){
        return num+'0';
      }else if(arr[1].length==2){
        return num
      }
    }else{
      return '0.00';
    }
  },
  'deLength':function (num) {
    ////console.log(num)
    if(num||num==0){
      var str=num+'';
      var arr=str.split('.');
      if(arr[1]&&arr[1].length>2){
        var num1 = new Number(num);
        num=num1.toFixed(2);
        return num;
      }else{
        return num;
      }
    }
  },
  'deLength4':function (num) {
    ////console.log(num)
    if(num||num==0){
      var str=num+'';
      var arr=str.split('.');
      if(arr[1]&&arr[1].length>4){
        var num1 = new Number(num);
        num=num1.toFixed(4);
        return num;
      }else{
        return num;
      }
    }
  },
  'decimal2':function (num) {
    ////console.log(num)
    if(num||num==0){
      var str=num+'';
      var arr=str.split('.');
      if(arr[1]&&arr[1].length>2){
        var num1 = new Number(num);
        num=num1.toFixed(2);
        // num=this.mathRound(num1,2);
        return num;
      }else{
        return num;
      }
    }else{
      return '0';
    }
  },
  'decimalTen':function (num) {
    ////console.log(num)
    if(num||num==0){
      var str=num+'';
      var arr=str.split('.');
      if(arr[1]&&arr[1].length>10){
        var num1 = new Number(num);
        num=num1.toFixed(10);
        // num=this.mathRound(num1,2);
        return num;
      }else{
        return num;
      }
    }else{
      return '0';
    }
  },
  //除法精度
  'accDiv':function(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""))
    r2=Number(arg2.toString().replace(".",""))
    return (r1/r2)*Math.pow(10,t2-t1);
  },
  //乘法精度
  'mul':function(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
  },
  //加法精度
  'add': function (num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    // //console.log('1是'+baseNum1);
    // //console.log('2是'+baseNum2);
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
  },
  //减法精度
  'numSub':function(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
  },
  'decimal4':function (num) {
    if(num){
      ////console.log(num)
      var str=num+'';
      var arr=str.split('.');
      ////console.log(arr);
      if(arr[1]&&arr[1].length>4){
        var num1 = new Number(num);
        // num=num1.toFixed(4);
        num=this.mathRound(num1,4);
        return num;
      }else if(arr[1]&&arr[1].length==4){
        return num;
      }else if(arr[1]&&arr[1].length==3){
        return num;
      }else if(arr[1]&&arr[1].length==2){
        return num;
      }else if(arr[1]&&arr[1].length==1){
        return num;
      }else if(!arr[1]){
        return num;
      };
    }else{
      return '0';
    }
  },
  'getChineseNumber':function(currencyDigits) {
    var back=true;
    if(currencyDigits<0){
      back=false;
    }
    currencyDigits=Math.abs(currencyDigits);
    // 转换数字到中文大写，请用prop传递给模版组件，这个函数在网上扣的。
    var MAXIMUM_NUMBER = 99999999999.99;
    // Predefine the radix characters and currency symbols for output:
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_SYMBOL = ""; // 可以设置前缀 比如 人民币
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

    // Variables:
    var integral; // Represent integral part of digit number.
    var decimal; // Represent decimal part of digit number.
    var outputCharacters; // The output result.
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;

    // Validate input string:
    if (currencyDigits === undefined) {
      return "";
    }
    currencyDigits = currencyDigits.toString();
    if (currencyDigits == "") {
      // alert("Empty input!");
      return "";
    }
    if (currencyDigits.match(/[^,.\d]/) != null) {
      // alert("Invalid characters in the input string!");
      return "";
    }
    if (
      currencyDigits.match(
        /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
      ) == null
    ) {
      // alert("Illegal format of digit number!");
      return "";
    }

    // Normalize the format of input digits:
    currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
    currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
    // Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
      alert("您输入的金额太大，请重新输入!");
      return "";
    }

    // Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split(".");
    if (parts.length > 1) {
      integral = parts[0];
      decimal = parts[1];
      // Cut down redundant decimal digits that are after the second.
      decimal = decimal.substr(0, 2);
    } else {
      integral = parts[0];
      decimal = "";
    }
    // Prepare the characters corresponding to the digits:
    digits = new Array(
      CN_ZERO,
      CN_ONE,
      CN_TWO,
      CN_THREE,
      CN_FOUR,
      CN_FIVE,
      CN_SIX,
      CN_SEVEN,
      CN_EIGHT,
      CN_NINE
    );
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
    // Start processing:
    outputCharacters = "";
    // Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
      zeroCount = 0;
      for (i = 0; i < integral.length; i++) {
        p = integral.length - i - 1;
        d = integral.substr(i, 1);
        quotient = p / 4;
        modulus = p % 4;
        if (d == "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            outputCharacters += digits[0];
          }
          zeroCount = 0;
          outputCharacters +=
            digits[Number(d)] + radices[modulus];
        }
        if (modulus == 0 && zeroCount < 4) {
          outputCharacters += bigRadices[quotient];
        }
      }
      outputCharacters += CN_DOLLAR;
    }
    // Process decimal part if there is:
    if (decimal != "") {
      for (i = 0; i < decimal.length; i++) {
        d = decimal.substr(i, 1);
        if (d != "0") {
          outputCharacters += digits[Number(d)] + decimals[i];
        }
      }
    }
    // Confirm and return the final output string:
    if (outputCharacters == "") {
      outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
      outputCharacters += CN_INTEGER;
    }
    outputCharacters = CN_SYMBOL + outputCharacters;
    if(!back){
      outputCharacters='负'+outputCharacters;
      return outputCharacters;
    }else{
      return outputCharacters;
    }
  }
}

export default utils
