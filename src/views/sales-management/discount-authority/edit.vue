<template>
  <div>
    <div class="zzc">
      <form class="addform">
        <div class="addTitle">
          <div class="addUser">{{model.id?'编辑折扣权限':'新增折扣权限'}}</div>
          <div class="close" @click="close">×</div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>适用门店:</p>
          </div>
          <div class="form_right w302">
            <el-select v-model="model.storeId" @change="storeInfoChange" filterable clearable class="el_box ml16-wi299" placeholder="请选择">
              <el-option
                v-for="item in storeList"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>用户角色:</p>
          </div>
          <div class="form_right w302">
            <el-select v-model="model.roleId" @change="roleInfoChange" filterable clearable class="el_box ml16-wi299" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>折扣权限:</p>
          </div>
          <div class="form_right">
            <div class="el_box w288 discount">
              <span>>=</span>
              <!--<span>-->
              <!--</span>-->
              <input class="" placeholder="请输入>=0的数字" v-model="model.discountNum" v-validate="'required'">
              <span class="percent">%</span>
            </div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_left">
            <p>状态:</p>
          </div>
          <div class="form_right">
            <el-select v-model="model.enabled" class="el_box ml16-wi299" placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form_item mtp10">
          <button class="serachBtn" type="button" @click="save">保存</button>
          <button class="cancelBtn" type="button" @click="close">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {isNumber} from '@/assets/js/logic'

  export default {
    name: 'edit',
    props: ['maskData'],
    data() {
      return {
        model: {
          storeId: null,//	适用门店
          storeName: null,//	适用门店
          roleId: null,
          roleName: null,
          enabled: 1,
          discountNum: null,//折扣范围 大于0小于1
        },
        storeList: [],
        rolesList: [],
        stateList: [{id: 0, name: '禁用'}, {id: 1, name: '启用'}]
      }
    },
    mounted() {
      if (this.maskData) {
        this.model = JSON.parse(JSON.stringify(this.maskData))
      }
      this.fetchStoreList();
      this.fetchRoleList();
    },
    methods: {
      fetchStoreList() {
        this.$store.dispatch('fetchStoreList').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.storeList = data.value;
          }
        })
      },
      fetchRoleList() {//获取用户角色列表
        this.$axios.get('/admin/system/role/list').then(res => {
          let data = this.AppUtils.checkResponse(res);
          if (data) {
            ////console.log(data);
            this.rolesList = data.value.data;
            this.roleInfoChange();
          }
        })
      },
      storeInfoChange() {
        for (let val of this.storeList) {
          if (val.storeId === this.model.storeId) {
            return this.model.storeName = val.storeName;
          }
        }
      },
      roleInfoChange() {
        for (let val of this.rolesList) {
          if (val.roleId === this.model.roleId) {
            return this.model.roleName = val.name;
          }
        }
      },
      close() {
        this.$emit('hideMask');
      },
      save() {
        if (!this.model.storeId) {
          return this.$message.error('请选择适用门店');
        }
        if (!this.model.roleId) {
          return this.$message.error('请选择用户角色');
        }
        if (this.model.discountNum === null || this.model.discountNum === '') {
          return this.$message.error('请输入折扣范围');
        }
        if (!isNumber(this.model.discountNum)) {
          return this.$message.error('折扣范围必须为数字');
        }
        if (this.model.discountNum < 0) {
          return this.$message.error('折扣范围必须大于0');
        }

        this.$emit('hideMask', this.model);
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';

  .discount {
    display: flex;
    span {
      line-height: 32px;
      margin-right: 10px;
    }
    position: relative;
    .percent{
      position: absolute;
      right: 0;
      top: 0;
    }
  }

</style>
