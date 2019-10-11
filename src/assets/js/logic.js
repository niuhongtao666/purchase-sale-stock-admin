function checkDataExit(arrList, obj) {//添加配件或者工项前 校验是否已经添加过
  for (let i = 0; i < arrList.length; i++) {

    if (arrList[i].goodsId === obj.goodsId) {

      return i;
    }
  }
}

function delDataExit(arrList, delList) {//删除配件或者工项
  delList.forEach((delData) => {
    arrList.forEach((data, index) => {
      if (data.goodsId == delData.goodsId) {
        arrList.splice(index, 1)
      }
    });
  });
}

function isNumber(data) {//判断是否为数字
  return data - parseFloat( data ) >= 0;
}
function isRightForm(data) {//判断是否为数字
  // return data - parseFloat( data ) >= 0;
  console.log(data)
  // if(data){
  //   var dataArr=data.split('.');
  //   if(dataArr.length!=1){
  //     if(dataArr[0].length>1){
  //       var newData=dataArr[0];
  //       if(newData.indexOf('0')!=0){
  //         return true;
  //       }
  //       // return newData.indexOf('0')!==0;
  //     }
  //   }else{
      // var dataArr0=dataArr[0];
      // if(dataArr0.indexOf('0')==0&&dataArr0.length>1){
      //   return false;
      // }
  //   }
  // }
}
function isInteger(num) {//判断是不是整数
  if(parseInt(num)==num){
      return true;
  }
}
function toInteger(num){//
  if(isNumber(num)){//假如是数字 把数字转成整数
    num=parseInt(num);
  }else {//不是数字 初始化为1
    num=1
  }
  return num;
}
function checkCarNum(carNumber) {//校验车牌号
  carNumber = carNumber.toUpperCase().replace(/\s*/g, "");
   if (carNumber && /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(carNumber)) {
    return carNumber;
  }
  return false;
}

function checkPhoneNum(phoneNumber) {//校验手机号
  phoneNumber = phoneNumber.replace(/\s*/g, "");//去除空格
  if (phoneNumber && /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(phoneNumber)) {
    return phoneNumber;
  }
  return false;
}
function getArrEqual(arr1, arr2) {
  let newArr = [];
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if(arr1[j] === arr2[i]){
        newArr.push(arr1[j]);
      }
    }
  }
  return newArr;
}
//返回权限按钮
export {
  checkDataExit,
  delDataExit,
  isNumber,
  isRightForm,
  checkCarNum,
  checkPhoneNum,
  toInteger,
  isInteger,
  getArrEqual
}
