<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">{{model.id?'编辑':'新增'}}</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>门店</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.storeId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              v-validate="'required'"
              name="store"
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
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入仓库名称" v-model.trim="model.wavehouseName"  name="wavehouseName" v-validate="'required'">
            <p v-if="vaerrors.has('wavehouseName:required')" class="is-danger">请填写仓库名称</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>仓库类型</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.wavehouseType"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              name="wavehouseType"
              v-validate="'required'"
            >
              <el-option
                v-for="item in warehouseTypesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('wavehouseType:required')" class="is-danger">请选择仓库类型</p>
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
          storeId:'',//门店
          wavehouseName:'',//仓库
          wavehouseType:1,//仓库类型
          enabled:1,//状态
        },
        warehouseTypesList:[
          {
            id:1,
            name:"商品仓库",
          },
          // {
          //   id:2,
          //   name:"新车仓库",
          // },
        ],
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
    props:{
      storesList:Array,
      maskData:Object,
      errMsg:String
    },
    mounted(){
      if(this.maskData['id']){
        for(var key in this.model){
          this.model[key]=this.maskData[key];
        }
        this.model.id=this.maskData.id
      }else{
        var userInfos=JSON.parse(localStorage.getItem('userInfos'));
        //console.dir(userInfos);
        this.model.storeId=userInfos['storeId'];
      }
    },
    computed:{
      stores(){
        var newList=this.storesList.filter(item=>item.storeName=='全部');
        if(newList.length){
          this.storesList.shift();
        }
        return this.storesList;
      },
      errSta(){
        if(this.errMsg){
          return true;
        }else{
          return false;
        }
      },
    },
    methods:{
      //保存
      addSave(){
        this.$validator
          .validateAll()
          .then((result) => {
            if (result) {
              if(this){
                this.$emit('hideMask',this.model);
                this.storesList.unshift({storeId:null,storeName:'全部'});
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
        this.$emit('hideMask');
        this.storesList.unshift({storeId:null,storeName:'全部'});
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/cover.css';
</style>
