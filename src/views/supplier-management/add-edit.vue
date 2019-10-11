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
            <p><i class="required">*</i>供应商名称</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入供应商名称" v-model.trim="model.supplierName" name="supplierName" v-validate="'required'">
            <p v-if="vaerrors.has('supplierName:required')" class="is-danger">请输入供应商名称</p>
            <p v-if="supplierMsg" class="is-danger">{{supplierMsg}}</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>供应商编码</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入供应商编码" v-model.trim="model.supplierNo" name="supplierNo" v-validate="'required'">
            <p v-if="vaerrors.has('supplierNo:required')" class="is-danger">请输入供应商编码</p>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>联系人</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入联系人" v-model.trim="model.contactPerson" name="contactPerson" >
            <!--<p v-if="vaerrors.has('contactPerson:required')" class="is-danger">请输入联系人</p>-->
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>联系电话</p>
          </div>
          <div class="form_right">
            <input class="el_box w288" placeholder="请输入联系电话" v-model.trim="model.phoneDecimal" name="phoneDecimal" v-validate="'telchk'">
            <p v-if="vaerrors.has('phoneDecimal:telchk')" class="is-danger">手机号码格式不正确</p>
            <!--<p v-if="vaerrors.has('phoneDecimal:required')" class="is-danger">请填写手机号码</p>-->
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p><i class="required">*</i>属性</p>
          </div>
          <div class="form_right w302">
            <el-select
              v-model="model.commonType"
              class="el_box ml16-wi299"
              clearable
              filterable
              placeholder="请选择"
              name="state"
              v-validate="'required'"
              :disabled="commonTypeStatus"
            >
              <el-option
                v-for="item in supplierAttrsList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-if="vaerrors.has('state:required')" class="is-danger">请选择属性</p>
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
            <p v-if="errSta" class="is-danger mt5">{{errMsg}}</p>
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
          supplierName:'',//供应商名称
          contactPerson:'',//联系人
          phoneDecimal:'',//联系人电话
          supplierNo:'',//供应商编码
          enabled:1,//状态
          commonType:1,//属性   '0'?'合作门店自己用''1'?'全平台通用'
        },
        commonTypeStatus:false,//新增编辑是否能选择属性
        supplierMsg:null,
        supplierAttrsList:[
          {
            id:1,
            name:"通用"
          },
          {
            id:0,
            name:"自用"
          }
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
      maskData:Object,
      // supplierAttrsList:Array,
      userInfos:Object,
      errMsg:String
    },
    computed:{
      errSta(){
        if(this.errMsg){
          return true;
        }else{
          return false;
        }
      },
      // supplierAttrs(){
      //   this.supplierAttrsList.shift();
      //   return this.supplierAttrsList;
      // }
    },
    created(){
      this.$validator.remove("telchk");
      this.$validator.extend("telchk", {
        validate: value => {
          // const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          const reg= /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
          return reg.test(value)
        }
      });
    },
    mounted(){
       if(this.maskData['id']){
         for(var key in this.model){
           this.model[key]=this.maskData[key];
         }
         console.dir(this.model);
         this.model.id=this.maskData.id;
         if(this.userInfos['storeType']!=1){
           this.commonTypeStatus=true;
         }else{
           this.commonTypeStatus=true;
         }
       }else{
         if(this.userInfos['storeType']!=1){
           this.model.commonType =0;
           this.commonTypeStatus=true;
         }else{
           this.commonTypeStatus=false;
         }
       }
     },
    methods:{
      setErr(msg){
        this.supplierMsg=msg;
      },
      testSupplier(){
        this.supplierMsg=null;
        if(this.model.supplierName){
          this.$axios.post('/admin/base/supplierInfo/judgeSupplierName',{supplierName:this.model.supplierName}).then(res=>{
            if(res.data.code!=10000){
              this.supplierMsg=res.data.subMessage
            }else{
              this.supplierMsg=null;
              let data = this.AppUtils.checkResponse(res);
              if(data){
                ////console.log(data);
              }
            }
          })
        }
      },
      addSave(){
        this.$validator
          .validateAll()
          .then((result) => {
            if (result) {
              this.$emit('hideMask',this.model);
              this.supplierMsg=null;
              // this.supplierAttrsList.unshift({id:'',name:'全部'});
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
        // this.supplierAttrsList.unshift({id:'',name:'全部'});
        this.supplierMsg=null;
        this.$emit('hideMask');
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/cover.css';
</style>
