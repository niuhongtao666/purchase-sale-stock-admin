import AppUtils from '../../utils'


let dateFormat = date => {// 日期 年-月-日
  return AppUtils.formatDate(date);
};
let dateFormatToSecond = date => {//日期  年-月-日 时：分： 秒
  return AppUtils.formatDateToSecond(date);
};


let saleOrderState = state => {//销售单状态
  const status = {
    100: "待发起收款",
    200: "待收款",
    300: "待发货",
    400: "已完成",
    500: "已取消",


  };
  return status[state];
};

let returnState = state => {//退货状态
  const status = {
    0: "待退货",
    100: "待退款",
    200: "已完成 ",
    300: "已取消",
  };
  return status[state];
};
let returnMoneyState = state => {//退货状态
  const status = {
    0: "待退款",
    100: "已退款",
    200: "已取消 ",

  };
  return status[state];
};


let materialOrderState = state => {//发料单状态
  const status = {
    0: "待发料",
    200: "已发料 ",
    300: "已取消",
    400: "创建发料单",
  };
  return status[state];
};

let billState = state => {//单据类型
  const status = {
    1: "一般维修",
    2: "事故维修",
    3: "首保",
    4: "二保",
    5: "定期保养",
    6: "厂家索赔",
    7: "售后精品",
    8: "洗车美容",
    9: "配件外销",
    10: "内部领用",
  };
  return status[state];
};


let businessState = state => {//业务类型
  const status = {
    1: "销售发料",
    2: "工单发料",
  };
  return status[state];
};
let discountState = state => {//打折状态
  const status = {
    0: "禁用",
    1: "启用",
  };
  return status[state];
};
let priceType = state => {//打折状态
  const status = {
    100: "成本价",
    101: "零售价",
    102: "保险价",
    103: "索赔价",
  };
  return status[state];
};

let receivableState = state => {//收款状态
  const status = {
    101: "待收款",
    102: "已收款",
    103: "已取消",
  };
  return status[state];
};

let allotState = state => {//收款状态
  const status = {
    100:"待确认调拨",
    200:"待调拨出库",
    300:"待调拨入库",
    400:"已完成",
    500:"已取消",
    600:"已撤销"
  };
  return status[state];
};
export {
  allotState,
  dateFormat,
  dateFormatToSecond,
  saleOrderState,
  returnState,
  materialOrderState,
  billState,
  businessState,
  discountState,
  priceType,
  receivableState,
  returnMoneyState,

}
