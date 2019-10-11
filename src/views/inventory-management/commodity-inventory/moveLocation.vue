<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">移库库位选择</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>移库数量:</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入移库数量" v-model="model.moveNum" name="moveNum">
            <p v-if="moveNumShow" class="is-danger">请输入移库数量</p>
            <p v-if="model.moveNum>sendData.currentNum" class="is-danger">移库数量需校验<=当前批次的最大数量</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>移入仓库:</p>
          </div>
          <div class="form_right w302">
            <el-select placeholder="请选择" class="el_box ml16-wi299" v-model.trim="model.moveInputWavehouseId" clearable filterable @change="clearLocation">
              <el-option
                v-for="item in waveList"
                :key="item.wavehouseId"
                :label="item.wavehouseName"
                :value="item.wavehouseId"
              >
              </el-option>
            </el-select>
            <p v-if="moveInputWaveIdShow" class="is-danger">请选择移入仓库</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>移入库位:</p>
          </div>
          <div class="form_right w302">
            <el-select placeholder="请选择" class="el_box ml16-wi299" v-model.trim="model.moveInputLocationId" clearable filterable @visible-change="fetchLocationInfoByWaveId(model.moveInputWavehouseId,$event)">
              <el-option
                v-for="item in locationList"
                :key="item.locationId"
                :label="item.locationName"
                :value="item.locationId"
              >
              </el-option>
            </el-select>
            <p v-if="moveInputLocationIdShow" class="is-danger">请选择移入库位</p>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="addSave">确认移库</button>
          <button class="cancelBtn" type="button" @click="addCancel">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'movelocation',
    data(){
      return{
        model:{
          id:null,//是	整型	库存Id
          moveInputLocationId:null,//是	整型	移入库位Id
          moveInputWavehouseId:null,
          moveNum:null,//移库数量
        },
        waveList:[],
        locationList:[],
        moveNumShow:false,//移库数量显示状态
        moveInputWaveIdShow:false,
        moveInputLocationIdShow:false,//库位显示状态
      }
    },
    props:{
      sendData:Object
    },
    created(){
      this.$validator.remove("telchk");
      this.$validator.extend("telchk", {
        validate: value => {
          const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          return reg.test(value)
        }
      });
    },
    watch:{
      'model.moveInputLocationId'(newVal,oldVal){
        if(newVal){
          this.moveInputLocationIdShow=false;
        }else{
          this.moveInputLocationIdShow=true;
        }
      },
      'model.moveNum'(newVal,oldVal){
        if(newVal){
          this.moveNumShow=false;
        }else{
          this.moveNumShow=true;
        }
      },
      'model.moveInputWavehouseId'(newVal,oldVal){
        if(newVal){
          this.moveInputWaveIdShow=false;
        }else{
          this.moveInputWaveIdShow=true;
        }
      },
    },
    mounted(){
      this.getWaveNew(this.sendData.storeId);
    },
    methods:{
      clearLocation(arg){
        this.model.moveInputLocationId=null;
        this.locationList=[];
      },
      getWaveNew(storeId){
        this.$store.dispatch("fetchWarehousetByByStoreId",storeId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data.value.length){
            ////console.log(data.value);
            this.waveList=data.value;
            this.model.moveInputWavehouseId=this.sendData.wavehouseId;
          };
        });
      },
      fetchLocationInfoByWaveId(arg,event){
        if(event){
          if(arg){
            this.$store.dispatch('fetchLocationInfoByWaveId',arg).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              if(data){
                this.locationList=data.value;
              };
            })
          }else{
            this.AppUtils.alert('请先选择仓库');
          }
        }
      },
      addSave(){
        if(!this.model.moveInputLocationId){
          this.moveInputLocationIdShow=true;
        }
        if(!this.model.moveNum&&this.model.moveNum!=0){
          this.moveNumShow=true;
        }
        this.model.id=this.sendData.id;
        if((this.model.moveInputLocationId&&this.model.moveNum)||(this.model.moveInputLocationId&&this.model.moveNum===0)){
          this.$axios.post('/admin/stock/stockMoveOrderInfo/move', this.model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('移库成功');
              this.$emit('hideMoveMask');
              this.$emit('fetchData');
            }
          })
        }
      },
      //取消
      addCancel(){
        this.moveNumShow=false;
        this.moveInputLocationIdShow=false;
        this.$emit('hideMoveMask');
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
</style>
