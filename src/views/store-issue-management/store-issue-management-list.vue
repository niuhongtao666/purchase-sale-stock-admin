<template>
  <div class="main_wrap">
    <div class="search-box">
      <form @submit.prevent="fetchData">
        <div class="select-wrap">
          <div class="group">
            <div class="group">
              <span class="left">
                创建日期
              </span>
              <div class="right">
                <el-date-picker
                  v-model="model.createStartTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="起始时间"
                  class="activity-edit-date date-box"
                >
                </el-date-picker>
                <i> 至 </i>
                <el-date-picker
                  v-model="model.createEndTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="终止时间"
                  class="activity-edit-date date-box">
                </el-date-picker>
              </div>
            </div>
            <div class="group">
              <span class="left">门店:</span>
              <div class="right">
                <el-select v-model="model.storeId" class="el_box"  placeholder="请选择">
                  <el-option
                    v-for="item in storeList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId">

                  </el-option>
                </el-select>              </div>
            </div>
            <div class="group">
              <span class="left">销售员:</span>
              <div class="right">
                <input type="text" placeholder="请输入销售员" v-model="model.roleName">
              </div>
            </div>
            <div class="group">
              <span class="left">状态:</span>
              <div class="right">
                <el-select placeholder="请选择" class="el_box" v-model="model.manageType">
                  <el-option
                    v-for="item in discountList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="group btn-box">
              <button type="submit" class="btn">搜索</button>
              <button type="button" class="btn" @click="showMask()">新增</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="table_wrap">
      <div class="table_layout">
        <div>
          <el-table
            :data="dataList"
            height="339"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <span class="text-btn"  @click="showMask(scope.row)"> 编辑</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="discountInfoNo"
              label="授权单号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色"
              width="180">
            </el-table-column>
            <el-table-column
              prop="discountNum"
              label="折扣范围"
              width="180">
              <template slot-scope="scope">
                <span>大于 {{scope.row.discountNum}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="enabled"
              label="状态"
              width="180">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="所属门店"
              width="180">
            </el-table-column>

            <el-table-column
              prop="createUserName"
              label="创建人"
              width="180">
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="180">
              <template slot-scope="scope">
                <span >{{ scope.row.createTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateUserName"
              label="修改人"
              width="180">
            </el-table-column>
            <el-table-column
              label="修改时间"
              width="180">
              <template slot-scope="scope">
                <span >{{ scope.row.updateTime | dateFormatToSecond }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="dataList.length">
          <nt-pagination ref="child" ></nt-pagination>
        </div>
      </div>
    </div>
    <edit v-if="showMaskFlag" :maskData="maskData" @hideMask="hideMask" ></edit>
  </div>
</template>

<script>
  import edit from './edit.vue'
  export default {
    name:'discount-authority',

    components:{
      edit
    },
    data(){
      return{
        model:{
          createStartTime:null,//	开始时间
          createEndTime:null,//		结束时间
          roleName:null,//		角色名称
          pageSize:10,//		页数
          pageNo:1,//	页码
        },
        storeList:[],
        dataList:[],//列表数据
        maskData:null,
        discountList:[{id:0,name:'禁用'},{id:1,name:'启用'}]
      }
    },
    computed:{
      showMaskFlag(){
        return this.$store.state.showMaskFlag;
      },
    },
    mounted() {
      this.fetchData();
      this.fetchStoreList();
    },
    methods:{
      fetchData(args){
        this.model.pageNo = 1;
        this.model.pageSize = 10;
        if (args) {
          if (args.page) {//分页
            this.model.pageNo = args.page;//当前页数
            this.model.pageSize = args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/sale/saleDiscountInfo/list',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            this.dataList=data.value.data;
            if (this.dataList.length) {
              this.$nextTick(() => {
                this.$refs.child.initPage(data.value.pageInfo.total, this.model.pageNo, this.model.pageSize)
              })
            }
          }
        })
      },
      fetchStoreList(){
        this.$store.dispatch('fetchStoreList').then(res=>{
          let data=this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.storeList=data.value;
          }
        })
      },
      showMask(data){
        if(data){
          this.maskData=data;
        }
        this.$store.commit('SHOW_MASK_LAYER');
      },
      hideMask(data){
        if(data){
          if(data.id){
            this.edit(data);
          }else {
            this.add(data);
          }
        }
        this.$store.commit('HIDE_MASK_LAYER');
      },
      add(data){
        this.$axios.post('/admin/sale/saleDiscountInfo/add',data).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);


          }
        })
      },
      edit(data){
        this.$axios.post('/admin/sale/saleDiscountInfo/update',data).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);


          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .select-wrap{
    padding-left: 20px;
    .date-box{
      width: 346px;
    }
    &>.group{
      margin-right: 50px;
      span.left{
        width: auto;
      }
      .el_box{
        width: 86px;
      }
      .group{
        margin-left: 20px;
      }
    }
    .area{
      margin-left: 10px;
    }
  }
  .el-date-editor{
    width: 135px!important;
  }
</style>
