<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">{{model.id?'编辑':'新增'}}</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <!--<div class="form_item">
          <div class="form_left">
            <p>省份</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.provinceId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              @change="clearCityList"
              v-validate="'required'"
              :disabled="noEdit"
            >
              <el-option
                v-for="item in provinces"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
           <p v-if="vaerrors.has('province:required')" class="is-danger">请选择省份</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>城市</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="changeZone.cityId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              @visible-change="getCityList"
              v-validate="'required'"
              :disabled="noEdit"
            >
              <el-option
                v-for="item in citiesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('city:required')" class="is-danger">请选择城市</p>
          </div>
        </div>-->
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>门店名称</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.storeId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              @change="clearWarehouse"
              name="store"
              v-validate="'required'"
              :disabled="noEdit"
            >
              <el-option
                v-for="item in stores"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('store:required')" class="is-danger">请选择门店</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>仓库名称</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="changeZone.wavehouseId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              @visible-change="getWavehouse"
              name="wavehouse"
              v-validate="'required'"
              :disabled="noEdit"
            >
              <el-option
                v-for="item in warehousesList"
                :key="item.wavehouseId"
                :label="item.wavehouseName"
                :value="item.wavehouseId">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('wavehouse:required')" class="is-danger">请选择仓库</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>库位名称</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入库位名称" v-model.trim="model.locationName"  name="locationName" v-validate="'required'">
            <p v-if="vaerrors.has('locationName:required')" class="is-danger">请输入库位名称</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>状态</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.enabled"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              name="enabled"
              v-validate="'required'"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('enabled:required')" class="is-danger">请选择状态</p>
            <p v-if="errMsg" class="is-danger mt5">{{errMsg}}</p>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="addSave">保存</button>
          <button class="cancelBtn" type="button" @click="addCancel">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'addit',
    data(){
      return{
        model:{
          provinceId:'',//省份id
          cityId:'',//城市id
          storeId:'',//门店id
          wavehouseId:'',//仓库名称
          locationName:'',//库位名称
          enabled:1,//状态
        },
        changeZone:{
          cityId:'',
          wavehouseId:''
        },
        noEdit:false,
        citiesList:[],//城市列表
        warehousesList:[],
        options:[
          {
            value:1,
            text:'启用'
          },
          {
            value:0,
            text:'停用'
          }
        ],
      }
    },
    computed:{
      errSta(){
        if(this.errMsg){
          return true;
        }else{
          return false;
        }
      },
      stores(){
        var newList=this.storesList.filter(item=>item.storeName=='全部');
        if(newList.length){
          this.storesList.shift();
        }
        //console.dir(newList);
        return this.storesList;
      },
      provinces(){
        this.provincesList.shift();
        ////console.log(this.provincesList);
        return this.provincesList;
      }
    },
    props:{
      provincesList:Array,
      maskData:Object,
      storesList:Array,
      errMsg:String
    },
    mounted(){
      if(this.maskData['id']){
        this.model=JSON.parse(JSON.stringify(this.maskData));
        this.noEdit=true;
        this.changeZone.cityId=this.model.cityName;
        this.changeZone.wavehouseId=this.model.wavehouseName;
      }else{
        var userInfos=JSON.parse(localStorage.getItem('userInfos'));
        //console.dir(userInfos);
        this.model.storeId=userInfos['storeId'];
      }
    },
    methods:{
      //保存
      addSave(){
        if(!this.model.id){
          this.model.cityId=this.changeZone.cityId;
          this.model.wavehouseId=this.changeZone.wavehouseId;
        }
        this.$validator
          .validateAll()
          .then((result) => {
            if (result) {
              if(this){
                  this.$emit('hideMask',this.model);
                  this.storesList.unshift({storeId:null,storeName:'全部'});
                  this.provincesList.unshift({id:null,name:'全部'});
              }
            } else {
              // this.AppUtils.alert("请正确填写信息");
            }
          })
          .catch(err => {
          });
      },
      //取消
      addCancel(){
        this.$emit('hide');
        this.$emit('hideErrMsg');
        this.storesList.unshift({storeId:null,storeName:'全部'});
        this.provincesList.unshift({id:null,name:'全部'});
      },
      clearCityList(arg){
        if(arg){
          this.changeZone.cityId='';
        }
      },
      //获取城市列表
      getCityList(arg){
        if(arg){
          if(this.model.provinceId){
            this.$store.dispatch('getCityList',this.model.provinceId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                ////console.log(data)
                this.citiesList=data.value;
              }
            });
          }else{
            this.AppUtils.alert('请先选择省份')
          }
        }
      },
      clearWarehouse(arg){
          this.changeZone.wavehouseId='';
      },
      //获取仓库名称列表
      getWavehouse(arg){
        if(arg){
          if(this.model.storeId==''){
            this.AppUtils.alert('请先选择门店');
          }else{
            this.$axios.get('/admin/base/wavehouse/listByStoreId?storeId='+this.model.storeId).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data) {
                 this.warehousesList=data.value;
              }
            })
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/cover.css';
</style>
