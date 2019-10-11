// import { EpolicyInit } from '@/assets/js/epolicyInit';

//显示弹框
const SHOW_MASK_LAYER = 'SHOW_MASK_LAYER';
const HIDE_MASK_LAYER = 'HIDE_MASK_LAYER';
//初始化信息
const AUTH_INIT = 'AUTH_INIT';
//退出登录
const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
// 初始token
const TOKEN_INIT = 'TOKEN_INIT';
const SHOW_PREVIEW_IMG = 'SHOW_PREVIEW_IMG';
const HIDE_PREVIEW_IMG = 'HIDE_PREVIEW_IMG';
const LNGLAT_INIT = 'LNGLAT_INIT';//初始化城市经纬度
const CLONEID='CLONEID';
const BUTTONINFO='BUTTONINFO';
const GETSTOREINFO='GETSTOREINFO';
const GETWAVEBYSTOREID='GETWAVEBYSTOREID';
const BUTTONPERMISSIONS='BUTTONPERMISSIONS';
const MENULIST='MENULIST';
export default {
  [GETSTOREINFO](state, payload) {
    payload.unshift({storeId:null,storeName:'全部'});
    state.storesList=payload;
  },
  /*[BUTTONINFO](state, payload) {
    //console.log(payload);
    state.buttonInfo = payload;
  },*/
  [MENULIST](state, payload) {
    //console.log(payload);
    state.menuList= payload;
  },
  [BUTTONPERMISSIONS](state, payload) {
    //console.log(payload);
    state.buttonPermissions= payload;
  },
  [GETWAVEBYSTOREID](state, payload) {
    //console.log(payload);
    state.waveHousesByStoreId = payload;
  },
  [SHOW_MASK_LAYER](state, payload) {
    state.showMaskFlag = true;
  },
  [HIDE_MASK_LAYER](state, payload) {
    state.showMaskFlag = false;
  },
  [TOKEN_INIT](state, payload) {
    state.token = payload.token;
  },
  [CLONEID](state, payload) {
    state.cloneId = payload;
  },
  [AUTH_INIT](state, payload) {
    state.userInfo = payload;
  },
  [AUTH_SIGN_OUT](state, payload) {
    state.userName = "";
    state.token = "";
    // state.shoppingInfo = [];
  },
  [SHOW_PREVIEW_IMG](state, payload) {
    state.previewImgUrl = payload;
  },
  [HIDE_PREVIEW_IMG](state, payload) {
    state.previewImgUrl = '';
  },
  [LNGLAT_INIT](state,payload){
    state.district=payload.district;
    state.center=[payload.center.lng,payload.center.lat];
  },
};
