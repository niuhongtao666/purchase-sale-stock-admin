import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';
// import {
//   objInit
// } from '../assets/js/objInit';
//
// const productInit = objInit.productInit();

Vue.use(Vuex);

const state = {
  showMaskFlag: false,
  token: '',
  cloneId:'',//克隆id

  isLoading: false,
  previewImgUrl:'',//图片预览
  userInfo: {},
  menuList:[],//menu
  // buttonInfo:[],//权限按钮
  buttonPermissions:[],//按钮权限
  storesList:[],//权限门店
  waveHousesByStoreId:[],//根据门店id获得的仓库
  goodsUtilList:[
    {
      id: 0, name: "个"
    },
    {
      id: 1, name: "包"
    },
    {
      id: 2, name: "盒"
    },
    {
      id: 3, name: "捆"
    },
    {
      id: 4, name: "桶"
    },
    {
      id: 5, name: "袋"
    },
    {
      id: 6, name: "对"
    },
    {
      id: 7, name: "份"
    },
    {
      id: 8, name: "付"
    },
    {
      id: 9, name: "根"
    },
    {
      id: 10, name: "罐"
    },
    {
      id: 11, name: "件"
    },
    {
      id: 12, name: "卷"
    },
    {
      id: 13, name: "克"
    },
    {
      id: 14, name: "块"
    },
    {
      id: 15, name: "盘"
    },
    {
      id: 16, name: "片"
    },
    {
      id: 17, name: "瓶"
    },
    {
      id: 18, name: "升"
    },
    {
      id: 19, name: "套"
    },
    {
      id: 20, name: "条"
    },
    {
      id: 21, name: "张"
    },
    {
      id: 22, name: "支"
    },
    {
      id: 23, name: "次"
    },
  ]

};

export default new Vuex.Store({
  state,
  actions,
  mutations
});


