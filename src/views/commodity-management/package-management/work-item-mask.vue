<template>
  <div>
    <div class="zzc" >
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser">选择工项</div>
          <div class="searchZone">
            <div class="group">
              <span class="left">工项编号/名称:</span>
              <div class="right">
                <input type="text" placeholder="工项编号/工项名称" v-model="model.likeName">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
             >
            </el-tree>
          </div>
          <div class="right">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll ">
                    <!--<table class="table">
                      <thead>
                      <tr>
                        <th>商品编码</th>
                        <th>商品名称</th>
                         <th>标准工时</th>
                        <th>零售价</th>
                        <th>数量</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(data,index) in dataList" :key="index">
                        <td>{{data.goodsNo}}</td>
                         <td class="omit" :title="data.goodsName">{{data.goodsName}}</td>
                        <td>{{data.standardWorkTime}}</td>
                         <td>{{data.unitPrice}}</td>
                        <td>
                          <input type="number" style="width: 39px;" v-model="data.applyNum">
                        </td>
                        <td class="text-btn" @click="addWorkItem(data)">添加</td>
                      </tr>
                      </tbody>
                    </table>-->
                    <el-table
                      :data="dataList"
                      max-height="295"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                    >
                      <el-table-column
                        label="商品编码"
                        min-width="140"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="商品名称"
                        min-width="140"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="标准工时"
                        min-width="80"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.standardWorkTime}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="零售价"
                        min-width="60"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <span v-if="scope.row.unitPrice==null">
                             暂无
                          </span>
                          <span v-else>
                            {{scope.row.unitPrice}}
                         </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="数量"
                        min-width="80"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <input type="number" style="width: 39px;" v-model.number="scope.row.applyNum">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        min-width="50"
                      >
                        <template slot-scope="scope">
                          <span class="disabled" v-if="scope.row.unitPrice===null">添加</span>

                          <span v-else class="text-btn" @click="addWorkItem(scope.row)">添加</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--<div v-if="!dataList.length">-->
                    <!--<nt-no-data></nt-no-data>-->
                  <!--</div>-->
                  <div class="pagination" v-if="dataList.length">
                    <nt-pagination ref="child" @fetchData="fetchData"></nt-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closeBtn">
          <button type="button" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'work-item-mask',
    data(){
      return{
        treeData:[],
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        model:{
          likeName:'',//搜索关键字
          categoryId:'',//分类id
          pageNo:1,
          pageSize:10
        },
        dataList:[],
      }
    },

    mounted(){
      this.fetchTree();
    },
    methods:{
      cellStyle({row, column, rowIndex, columnIndex}) {
        return 'height:20px;font-size:12px;padding:5px 0px';
      },
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;font-size:13px;padding:10px 0px'
        }
      },
      fetchTree(){
        this.$axios.get('/admin/goods/classInfo/classTree/4451').then(res=>{
          let data = this.AppUtils.checkResponse(res);
           if(data){
            this.treeData=data.value;
          }
        })
      },
      //根据id获取配件
      handleNodeClick(data) {
        if(data.id){
          this.model.categoryId=data.id;
          this.fetchData();
        }
      },
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =20;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/goods/goodsWorkItemInfo/partsLayerList',this.model).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data){
            ////console.log(data);
            this.dataList=data.value.data;
          }
          //初始化分页
          //initPage 参数：总条数 当前页数 每页多少条
          if(data.value.data.length){
            this.$nextTick(()=>{
              this.$refs.child.initPage(data.value.pageInfo.total,this.model.pageNo,this.model.pageSize)
            })
          }
        })
      },
      addWorkItem(data){
        this.$emit('addWorkItem',JSON.parse(JSON.stringify(data)));
      },
      //关闭新增配件弹窗
      close(){
        this.$emit('hideWorkItemMask');
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .addform{
    width: 900px;
    padding-bottom: 0px;
    .addTitle{
      margin-bottom: 0px;
      .searchZone{
        width: 391px;
        .group{
          .left{
            width: 86px;
            margin:0 10px;
          }
          .right{
            input{
              width: 200px;
              height: 30px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              padding-left: 10px;
            }
            .btn{
              margin-left: 10px;
            }
          }
        }
      }
    }
    .content{
      height: 400px;
      border-bottom: 1px solid #ECF1F4;
      .left{
        width: 250px;
        height: 400px;
        border-right: 1px solid #ECF1F4;
        float: left;
        overflow:scroll;
      }
      .right{
        width: 649px;
        height: 400px;
        float: left;
        overflow-y: scroll;
        .tableZone{
          height: 500px;
          .table_wrap{
            border-radius: 0px;
            margin-top: 0px;
          }
        }
      }
    }
    .closeBtn{
      height: 50px;
      position: relative;
      .btn{
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -15px;
      }
    }
    .omit{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300px;
    }
    .disabled{
      cursor: not-allowed;
      color: #999;

    }
  }
</style>
