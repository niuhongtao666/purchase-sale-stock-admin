<template>
  <div>
    <div class="zzc">
      <form action="" class="addform">
        <div class="addTitle">
          <div class="addUser">盘点清单</div>
          <div class="close" @click="addCancel">×</div>
        </div>
        <div class="form_item">

        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>盘点门店:</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.storeId"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              name="store"
              v-validate="'required'"
              @change="clearWave"
            >
              <el-option
                v-for="item in storesAttrs"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('store:required')" class="is-danger">请选择盘点门店</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>盘点仓库:</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.wavehouseIds"
              class="el_box ml16-wi299"
              placeholder="请选择"
              name="wavehouse"
              v-validate="'required'"
              multiple
              collapse-tags
              @visible-change="getWave"
            >
              <el-option
                v-for="item in waveList"
                :key="item.wavehouseId"
                :label="item.wavehouseName"
                :value="item.wavehouseId">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('wavehouse:required')" class="is-danger">请选择盘点仓库</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>一级分类:</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.firstClassId"
              class="el_box ml16-wi299"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in firstClassificationsList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>配件编号:</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入配件编号" v-model.trim="model.goodsNo" >
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>盘点类型:</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.checkType"
              class="el_box ml16-wi299"
              placeholder="请选择"
              name="checkType"
              v-validate="'required'"
              clearable
              filterable
            >
              <el-option
                v-for="item in checkTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('checkType:required')" class="is-danger">请选择盘点类型</p>
          </div>
        </div>
        <div class="form_item" v-if="model.checkType==1?true:false">
          <div class="form_left">
            <p><i class="required">*</i>盘点时段:</p>
          </div>
          <div class="form_right w302">
            <el-date-picker
              v-model.trim="model.startTime"
              type="date"
              format="yyyy-MM-dd"
              @change="initStartTime"
              placeholder="起始时间"
              class="activity-edit-date date-box"
            >
            </el-date-picker>
            <i> 至 </i>
            <el-date-picker
              v-model.trim="model.endTime"
              type="date"
              format="yyyy-MM-dd"
              placeholder="终止时间"
              @change="initEndTime"
              class="activity-edit-date date-box">
            </el-date-picker>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
          </div>
          <div class="form_right w302 position-re60">
            <label class="checkBox">
              <input type="checkbox" v-model="flag">
              <span></span>不含0库存
            </label>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="addSave">确认导出</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'exportData',
    data(){
      return{
        model:{
          storeId:null,//	是	整型	盘点门店
          wavehouseIds:[],//是	数组	盘点仓库多选
          firstClassId:null,//否	整型	一级分类
          goodsNo:null,//	否	字符	商品编号
          checkType:null,//是	整型	盘点类型(1-动态 2-静态)
          startTime:null,//否	字符	时间开始
          endTime:null,//否	字符	时间结束
          flag:null,//是	整型	是否含0库存（1-是 0-否）
        },
        waveList:[],//盘点仓库
        flag:true,
        checkTypeList:[
          {
            id:1,
            name:'动态'
          },
          {
            id:2,
            name:'静态'
          }
        ],
      }
    },
    props:{
      // maskData:Object,
      storesList:Array,//盘点门店
      // waveList:Array,//盘点仓库
      firstClassificationsList:Array,//一级分类
      dataList:Array,
    },
    computed:{
      storesAttrs(){
        this.storesList.shift();
        if(this.storesList.length==1){
          this.model.storeId=this.storesList[0]['storeId'];
        }
        return this.storesList;
      }
    },
    mounted(){
      var today=new Date();
      if(!this.model.startTime){
        this.model.startTime=this.AppUtils.formatDate(today);
      }
      if(!this.model.endTime){
        this.model.endTime=this.AppUtils.formatDate(today);
      }
    },
    methods:{
      clearWave(){
        this.model.wavehouseIds=[];
        this.waveList=[];
      },
      //获取盘点仓库
      getWave(arg){
        if(arg){
          if(this.model.storeId){
            this.$store.dispatch('fetchWarehousetByByStoreId',this.model.storeId).then(res=>{
              //console.dir(res);
              this.waveList=res.data.value;
            })
          }else{
            this.AppUtils.alert('请先选择盘点门店');
          }
        }
      },
      initStartTime(date){
        if(date){
          this.model.startTime=this.AppUtils.formatDate(date);
        }
      },
      initEndTime(date){
        if(date){
          this.model.endTime=this.AppUtils.formatDate(date);
        }
      },
      addSave(){
        this.$validator
          .validateAll()
          .then((result) => {
            if (result) {
              // this.$emit('hideMask',this.model);
              this.exportData();
              this.storesList.unshift({storeId:null,storeName:'全部'});
            } else {
              // this.AppUtils.alert("请正确填写信息");
            }
          })
          .catch(err => {
          });
      },
      //取消
      addCancel(){
        this.storesList.unshift({storeId:null,storeName:'全部'});
        this.$emit('hideExportMask');
      },
      exportData(){
        ////console.log(this.model);
        if(this.flag){
          this.model.flag=1;
        }else{
          this.model.flag=0;
        }
        if(!this.model.startTime||!this.model.endTime){
          this.AppUtils.alert('盘点时段不能为空')
        }else{
          this.$axios.post('/admin/stock/stockCheckOrderInfo/export', this.model,{responseType:'arraybuffer'}).then(res => {
            var myDate = new Date();
            var time = myDate.toLocaleDateString().split('/').join('-');
            let fileName = '盘点单'+time+'.xls';
            let blob = new Blob([res.data], { type: 'application/x-xls' })
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          });
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
</style>
