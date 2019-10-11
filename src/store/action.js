import axios from 'axios';

export default {

  fetchCategories({commit, state}, id){//获取分类 一级 二级 三级
    return new  Promise((resolve,reject)=>{
      axios.get(`/admin/goods/classInfo/child/${id}`).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  getAllUser({commit, state}){//获取当前门店的所有用户信息：
      return new  Promise((resolve,reject)=>{
        axios.get('/admin/system/user/allUser').then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
  },
  getUseTypes({commit, state}){//获取内领出库--新增用途
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/stock/insideUseOutputInfo/useType').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  allotOutputStores({commit, state}){//获取调拨出门店
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/storeInfo/getAllotOutputStore').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  allotInputStores({commit, state}){//获取调拨入门店
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/storeInfo/getAllotInputStore').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchStoresList({commit, state}){//获取门店列表
    return new  Promise((resolve,reject)=>{
      axios.post('/admin/base/storeInfo/list',{}).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchStoreList({commit, state}){//获取门店列表
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/storeInfo/listStoreInfo').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchStoreListNew({commit, state}){//获取门店列表
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/storeInfo/getUserDataSource').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchCarBrandList({commit, state}){//获取车辆品牌列表
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/goods/carBrandInfo/tree').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchAccessoriesPropertyList({commit, state}){//获取配件属性列表
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/goods/goodsBaseInfo/goodsCommonType').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchWarehousetByUserId({commit, state}){//获取当前用户的仓库列表
     return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/wavehouse/userStoreList').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchWarehousetByByStoreId({commit, state},storeId){//根据门店id的获取仓库列表
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/wavehouse/listByStoreId?storeId='+storeId).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchLocationInfoByWaveId({commit, state},waveId){//根据仓库id查找库位
    return new  Promise((resolve,reject)=>{
      axios.get(`/admin/base/locationInfo/listLocationByWaveId/${waveId}`).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  getProvinceList({commit, state}){//基础信息管理获取省
    return new  Promise((resolve,reject)=>{
      axios.post('/admin/sys/city/provinceList').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  getCityList({commit, state},provinceId){//基础信息管理获取市
    return new  Promise((resolve,reject)=>{
      axios.post('/admin/sys/city/cityList/'+provinceId).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchProvinceList({commit, state}){//获取省
    return new  Promise((resolve,reject)=>{
      axios.post('/admin/base/basePositionProvince/list').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchCityList({commit, state},provinceId){//获取市
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/basePositionCity/list?provinceId='+provinceId).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchDistrictList({commit, state},cityId){//获取区
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/basePositionCounty/list?cityId='+cityId).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchStores({commit, state}){//获取权限门店
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/storeInfo/getUserDataSource').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchStoreWave({commit, state},storeId){//
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/wavehouse/listByStoreId?storeId='+storeId).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  fetchSuppliersList({commit, state},cityId){//获取供应商
    return new  Promise((resolve,reject)=>{
      axios.get('/admin/base/supplierInfo/listSupplier').then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
    showMaskLayer({commit, state}, res) {
    commit('SHOW_MASK_LAYER', {
      res
    });

  },
  hideMaskLayer({commit, state}, res) {
    commit('HIDE_MASK_LAYER', {
      res
    });
  },
  updateToken({commit, state}, res) {
    commit('UPDATE_TOKEN', {
      res
    });
  },
};
