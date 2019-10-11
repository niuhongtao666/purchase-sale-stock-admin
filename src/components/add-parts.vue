<template>
  <div>
    <div class="zzc" v-if="popUp">
      <form action="" class="addform" @submit.prevent="fetchData">
        <div class="addTitle">
          <div class="addUser">选择配件</div>
          <div class="searchZone">
            <div class="group">
              <span class="left">编号/名称:</span>
              <div class="left">
                <input type="text" placeholder="编号/原厂编号/名称" v-model.trim="model.likeName">
              </div>
              <span class="left">品牌/车型:</span>
              <div class="right">
                <input type="text" placeholder="品牌/车型" v-model.trim="model.carTypeDesc">
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
              :expand-on-click-node="false"
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
                        <th>原厂编号</th>
                        <th>配件名称</th>
                        <th>适用品牌</th>
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
                        <td>{{data.carTypeDesc}}</td>
                        <td>{{data.currentStock?data.currentStock:0}}</td>
                        <td>{{data.lastPrice}}</td>
                        <td>
                          <input type="number" style="width: 39px;" v-model.number="data.applyNum" min="1"  @input="changeNum(index,data.applyNum)">
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
          carTypeDesc:'',//品牌/车型
          pageNo:1,
          pageSize:10
        },
        dataList:[],
        // goodsId:'',
        goods:{},
        data:[],
      }
    },
    props:{
      popUp:Boolean,
      saveUnitprice:Object,//保存修改后的单价
    },
    mounted(){
      this.fetchTree();
    },
    watch:{
      popUp(newVal,oldVal){
        if(newVal){
          //console.log(this.dataList);
          this.model.likeName='';
          this.model.carTypeDesc='';
        }
      }
    },
    methods:{
      changeNum(index,num){
        //console.log(typeof num);
        //console.log(num);
        if(parseFloat(num)||(parseFloat(num)==0)){
          if(parseFloat(num)<=1){
            this.dataList[index]['applyNum']=1;
          }else{
            if(Math.floor(parseFloat(num))!==parseFloat(num)){
              this.AppUtils.alert('数量为正整数');
            }
          }
        }else if(!parseFloat(num)&&(parseFloat(num)!=0)){
          this.AppUtils.alert('请输入数量,数量为正整数');
        }
      },
      addData(data){
        // this.data=data;
        //console.log(data.goodsId);
        //console.log(this.goods);
        //console.log(this.goods[data.goodsId]);
        if(this.goods.hasOwnProperty(data.goodsId)){
            //console.log('存在');
            //console.log(this.goods[data.goodsId]);
            //console.log(this.saveUnitprice);
            if(!this.saveUnitprice[data.goodsId]){
              this.saveUnitprice[data.goodsId]=0;
            }
            data.unitPrice=this.saveUnitprice[data.goodsId];
            //console.log(parseFloat(data.applyNum));
            // this.goods[data.goodsId]=parseFloat(this.goods[data.goodsId])+parseFloat(data.applyNum);//精度注释
            this.goods[data.goodsId]=this.AppUtils.add(parseFloat(this.goods[data.goodsId]),parseFloat(data.applyNum));//精度处理
            data['applyNum']=this.goods[data.goodsId];
            //console.log(data['applyNum']);
            // data.totalPrice=data.applyNum*data.unitPrice;////精度注释
            data.totalPrice=this.AppUtils.mul(data.applyNum,data.unitPrice);//精度处理
            if(!data.totalPrice){
              data.totalPrice=0
            }
            this.$emit('getAddData',data,data.goodsId);
            //console.log(data.totalPrice)
        }else{
          //console.log('不存在');
          if(!data.applyNum){
            data.applyNum=1;
          }
          this.goods[data.goodsId]=data.applyNum;
          data.unitPrice=data.lastPrice;
          // data.totalPrice=data.applyNum*data.unitPrice//精度注释
          data.totalPrice=this.AppUtils.mul(data.applyNum,data.unitPrice);//精度处理
          if(!data.totalPrice){
            data.totalPrice=0
          }
          var obj=JSON.parse(JSON.stringify(data));
          //console.log(obj);
          this.$emit('getAddData',data);
        }
      },
      //详情获取已经存在的goodsId
      getAlreadyGoodsId(arg){
        if(arg){
          this.goods[arg[0]]=arg[1];
        }
        //console.log(this.goods);
      },
      fetchTree(){
        this.$axios.get('/admin/goods/classInfo/list/tree').then(res=>{
          let data = this.AppUtils.checkResponse(res);
          //console.log(data);
          if(data){
            this.treeData=data.value;
          }
        })
      },
      clearGoods(){
        this.goods=[];
      },
      getDeleteGoods(args){
        //console.log(args);
        if(args.length){
          var _this=this;
          args.forEach((val)=>{
            delete _this.goods[val];
          });
        }
      },
      //根据id获取配件
      handleNodeClick(data) {
        //console.log(data);
        //console.log(typeof data);
        this.model.likeName='';
        this.model.carTypeDesc='';
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
            //console.log(data);
            this.dataList=data.value.data;
            //console.log(this.dataList);
            this.dataList.forEach((val)=>{
              if(!val.applyNum){
                val.applyNum=1;
              }
            });
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
        this.$emit('closeAddParts');
        this.dataList=[];
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/cover.css';
  .addform{
    width: 900px;
    padding-bottom: 0px;
    .addTitle{
      margin-bottom: 0px;
      .searchZone{
        width: 669px;
        .group{
          .left{
            width: 86px;
            input{
              width: 200px;
              height: 30px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              padding-left: 10px;
            }
          }
          div.left{
            margin-right: 110px;
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
              line-height: 30px;
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
