<template>
  <div>
    <div class="zzc" >
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser">选择配件</div>
          <div class="searchZone">
            <div class="group">
              <span class="left">配件编号/名称:</span>
              <div class="right">
                <input type="text" placeholder="配件编号/生产编码/配件名称" v-model="model.likeName">
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
              default-expand-all
            >
            </el-tree>
          </div>
          <div class="right">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll ">
                    <table class="table">
                      <thead>
                      <tr>
                        <th>配件编号</th>
                        <th>生产编码</th>
                        <th>配件名称</th>
                        <th>商品性能</th>
                        <th>库存</th>
                        <th>上次进价</th>
                        <th>数量</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(data,index) in dataList" :key="index">
                        <td>{{data.goodsNo}}</td>
                        <td>{{data.goodsVendorNo}}</td>
                        <td>{{data.goodsName}}</td>
                        <td>{{data.goodsFunc}}</td>
                        <td>{{data.currentStock}}</td>
                        <td>{{data.lastPrice}}</td>
                        <td>
                          <input type="number" style="width: 39px;" v-model="data.applyNum">
                        </td>
                        <td class="redact" @click="addData(data)">添加</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="!dataList.length">
                    <nt-no-data></nt-no-data>
                  </div>
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
    name:'addParts',
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
        // goodsId:'',
        goods:{},
        data:[],
      }
    },

    mounted(){
      this.fetchTree();
    },
    methods:{
      addData(data){
        // this.data=data;
        ////console.log(data.goodsId);
        ////console.log(this.goods);
        ////console.log(this.goods[data.goodsId]);
        if(this.goods.hasOwnProperty(data.goodsId)){
          ////console.log('存在');
          ////console.log(this.goods[data.goodsId]);
          ////console.log(parseFloat(data.applyNum));
          this.goods[data.goodsId]=parseFloat(this.goods[data.goodsId])+parseFloat(data.applyNum);
          data['applyNum']=this.goods[data.goodsId];
          ////console.log(data['applyNum']);
          data.totalPrice=data.applyNum*data.unitPrice;
          this.$emit('getAddData',data,data.goodsId);
          ////console.log(data.totalPrice)
        }else{
          ////console.log('不存在');
          if(!data.applyNum){
            data.applyNum=0;
          }
          this.goods[data.goodsId]=data.applyNum;
          data.totalPrice=data.applyNum*data.unitPrice
          this.$emit('getAddData',data);
        }
      },
      //详情获取已经存在的goodsId
      getAlreadyGoodsId(arg){
        if(arg){
          this.goods[arg[0]]=arg[1];
        }
        ////console.log(this.goods);
      },
      fetchTree(){
        this.$axios.get('/admin/goods/classInfo/list/tree').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if(data){
            this.treeData=data.value;
          }
        })
      },
      clearGoods(){
        this.goods=[];
      },
      getDeleteGoods(args){
        ////console.log(args);
        if(args.length){
          var _this=this;
          args.forEach((val)=>{
            delete _this.goods[val];
          });
        }
      },
      //根据id获取配件
      handleNodeClick(data) {
        ////console.log(data);
        ////console.log(typeof data);
        if(data['id']){
          this.model.categoryId=data.id;
          this.fetchData();
        }
      },
      fetchData(args){
        //初始化分页
        this.model.pageNo =1;
        this.model.pageSize =10;
        if(args){
          if(args.page){//分页
            this.model.pageNo=args.page;//当前页数
            this.model.pageSize=args.pageSize;//每页显示多少条
          }
        }
        this.$axios.post('/admin/goods/goodsBaseInfo/partsLayerList',this.model).then(res=>{
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
      //关闭新增配件弹窗
      close(){
        this.$emit('hideAddMask');
        this.dataList=[];
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
            margin-left: 10px;
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
      border-bottom: 1px solid #ccc;
      .left{
        width: 250px;
        height: 400px;
        border-right: 1px solid #ccc;
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
  }
</style>
