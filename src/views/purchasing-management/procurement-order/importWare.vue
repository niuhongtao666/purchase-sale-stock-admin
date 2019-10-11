<template>
  <div>
    <div class="zzc" v-if="importWareShow">
      <form action="" class="addform" @submit.prevent="fetchData1">
        <div class="addTitle">
          <div class="addUser" style="flex: 6;text-align: left">入库明细</div>
          <div class="searchZone" style="flex: 3;margin-right: 23px;">
            <div class="group">
              <span class="left" style="margin-right: 10px;">税率</span>
              <span class="right">
                <el-select placeholder="请选择" class="el_box" v-model.trim="model.taxRate" @visible-change="accAgain">
                  <el-option
                    v-for="item in taxRatesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </span>
            </div>
          </div>
          <div class="searchZone" style="flex: 4;">
            <div class="group">
              <div class="right">
                <input type="text" placeholder="配件编号" v-model.trim="model.goodsNo">
                <button type="submit" class="btn">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="right">
            <div class="tableZone">
              <div class="table_wrap">
                <div class="table_layout">
                  <div class="table_scroll add">
                    <el-table
                      :data="importWareList"
                      max-height="380"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      :header-cell-style="tableHeaderColor"
                      :cell-style="cellStyle"
                      :summary-method="getSummaries"
                      show-summary
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        key="2"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        label="配件编号"
                        min-width="140"
                        key="3"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsNo}}
                        </template>
                      </el-table-column>
                      <!--<el-table-column-->
                      <!--label="生产编码"-->
                      <!--min-width="140"-->
                      <!--key="4"-->
                      <!--show-overflow-tooltip-->
                      <!--&gt;-->
                      <!--<template slot-scope="scope">-->
                      <!--{{scope.row.goodsVendorNo}}-->
                      <!--</template>-->
                      <!--</el-table-column>-->
                      <el-table-column
                        label="配件名称"
                        min-width="160"
                        key="4"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="配件品牌"
                        min-width="120"
                        key="5"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsBrandName}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单位"
                        min-width="50"
                        key="6"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="数量"
                        min-width="80"
                        key="7"
                      >
                        <template slot-scope="scope">
                          <input type="number" v-model.number="scope.row.noWavehosueNum" style="width: 62px" min="0" @input="getTotal(scope.row.goodsId,scope.row.noWavehosueNum,scope.row.unitPrice)">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="采购单价"
                        min-width="100"
                        key="8"
                      >
                        <template slot-scope="scope">
                          <input type="number"  v-model="scope.row.unitPrice" style="width:83px" min="0" step="0.1" @input="getTotal(scope.row.goodsId,scope.row.noWavehosueNum,scope.row.unitPrice)">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="采购总价"
                        min-width="100"
                        key="9"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <!--{{scope.row.noWavehosuePrice | decimalTofixed4}}-->
                          <input type="number"  v-model="scope.row.noWavehosuePrice" style="width:77px" min="0" step='0.1' @input="getUnitPrice(scope.row.goodsId,scope.row.noWavehosuePrice)">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="成本单价"
                        min-width="100"
                        key="10"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.noTaxUnitPrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="成本总价"
                        min-width="100"
                        key="11"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          {{scope.row.noTaxWavehosuePrice | decimalTofixed4}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="仓库"
                        min-width="120"
                        key="12"
                      >
                        <template slot-scope="scope">
                          <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.wavehouseId" @change="clearLocation(scope.row.goodsId,scope.row.wavehouseId,$event)" clearable filterable style="width: 100px!important">
                            <el-option
                              v-for="item in waveList"
                              :key="item.wavehouseId"
                              :label="item.wavehouseName"
                              :value="item.wavehouseId">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="库位"
                        min-width="120"
                        key="13"
                      >
                        <template slot-scope="scope">
                          <!--<input type="text" @focus="fetchLocationInfoByWaveId(scope.row.wavehouseId,$event)" v-model.trim="scope.row.locationName">-->
                          <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName"  @change="locationChange(scope.row)" @visible-change="fetchLocationInfoByWaveId(scope.row.wavehouseId,$event)" v-el-select-loadmore="loadmore" @blur="reBack" style="width: 100px!important" filterable remote :remote-method="searchLocation">
                            <el-option
                              v-for="item in locals"
                              :key="item.locationId"
                              :label="item.locationName"
                              :value="item.locationName">
                            </el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--<div class="pagination" v-if="dataList.length">
                    <nt-pagination ref="child" ></nt-pagination>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closeBtn">
          <button type="submit" class="btn importBtn" @click.prevent="inputWave">确认入库</button>
          <button type="submit" class="btn" @click.prevent="close">关闭</button>
        </div>
      </form>
    </div>
    <positions :locationLists='locationLists' v-if="showPositions"></positions>
  </div>
</template>
<script>
  import {getArrEqual} from '@/assets/js/logic'
  export default {
    directives: {
      'el-select-loadmore': {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
          SELECTWRAP_DOM.addEventListener('scroll', function () {
            /**
             * scrollHeight 获取元素内容高度(只读)
             * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
             * clientHeight 读取元素的可见高度(只读)
             * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
             * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
             */
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            if (condition) {
              binding.value();
            }
          });
        }
      }
    },
    name:'importWare',
    components:{
    },
    data(){
      return{
        showPositions:false,
        loading: true,
        pageIndex:1,
        zeroPrice:false,
        model:{
          taxRate:null,//税率
          goodsNo:'',//搜索配件编号
          goodsIds:[],//入库商品集合
          purchaseOrderId:null,//采购单ID
          saveWave:[],//保存列表
        },
        dataList:[],
        taxRatesList:[
          {
            id:16,
            name:'16%'
          },
          {
            id:13,
            name:'13%'
          },
          {
            id:10,
            name:'10%'
          },
          {
            id:6,
            name:'6%'
          },
          {
            id:3,
            name:'3%'
          },
          {
            id:0,
            name:'0%'
          }
        ],
        locationList:'',//库位列表
        locationLists:[]
      }
    },
    mounted(){
      // alert(this.rate)
      // this.model.taxRate=this.rate;
    },
    computed:{
      locals(){
        //console.log(this.locationList);
        if(this.locationList!=''){
          var locals=JSON.parse(this.locationList);
          //console.log(locals);
          return locals;
        }else{
          var arr=[];
          return arr
        }
      }
    },
    props:{
      importWareShow:Boolean,
      importWareList:Array,
      purchaseOrderId:String,
      waveList:Array,
      rate:Number
    },
    methods:{
      getUnitPrice(goodsId,noWavehosuePrice){
        var _this=this;
        var str = '' + noWavehosuePrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('采购总价小数点位数最多四位');
            str=str.substring(0,str.length-1);
            noWavehosuePrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价');
            noWavehosuePrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入采购总价');
            noWavehosuePrice=0;
          }
        }
        if(noWavehosuePrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('采购总价不能为负');
          noWavehosuePrice=Math.abs(noWavehosuePrice);
        }
        if((noWavehosuePrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入采购总价');
          noWavehosuePrice=0;
        }
        var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.taxRate/100));
        this.importWareList.forEach((val,index)=>{
          if(val['goodsId']==goodsId){
            _this.importWareList[index]['noWavehosuePrice']=noWavehosuePrice;
            _this.importWareList[index]['unitPrice']=this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.importWareList[index]['noWavehosuePrice'],_this.importWareList[index]['noWavehosueNum']));
            _this.importWareList[index]['noTaxWavehosuePrice']=_this.AppUtils.decimal4(this.AppUtils.accDiv(_this.importWareList[index]['noWavehosuePrice'],rateCheck));
            _this.importWareList[index]['noTaxUnitPrice']=_this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.importWareList[index]['noTaxWavehosuePrice'],_this.importWareList[index]['noWavehosueNum']));
            _this.$set(_this.importWareList,index,_this.importWareList[index]);
          }
        });
      },
      searchLocation(query){
        if (query !== '') {
          this.locationList='';
          // this.loading = false;
          setTimeout(() => {
            this.loading = false;
            var locations=JSON.parse(sessionStorage.getItem('saveLocation'));
            var str = locations.filter(item => {
              //console.log(query);
              return item.locationName.indexOf(query)>-1;
            });
            sessionStorage.setItem('searchAll',JSON.stringify(str));
            this.pageIndex=1;
            this.locationList=JSON.stringify(str.slice(0,10));
          }, 200);
        } else {
          this.locationList='';
        }
      },
      reBack(){
        this.pageIndex=1;
      },
      loadmore() {
        this.pageIndex++;
        if(!this.loading){
          this.locationList='';
          var searchAllData=JSON.parse(sessionStorage.getItem('searchAll'));
          //console.log(searchAllData);
          var sliceSearchAll=searchAllData.slice(0,10*this.pageIndex);
          this.locationList=JSON.stringify(sliceSearchAll);
        }else{
          // alert(2);
          var wavehouseId=sessionStorage.getItem('waveId');
          this.fetchLocationInfoByWaveId(wavehouseId,true);
        };
      },
      fetchLocationInfoByWaveId(wavehouseId,event) {//获取库位
        if(event){
          // this.showPositions=true;
          this.loading=true;
          sessionStorage.setItem('waveId',wavehouseId);
          if (wavehouseId) {
            this.$store.dispatch('fetchLocationInfoByWaveId',wavehouseId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                if(data.value.length){
                  this.locationLists=data.value;
                  sessionStorage.setItem('saveLocation',JSON.stringify(data.value));
                  this.locationList =JSON.stringify(data.value.slice(0,10*this.pageIndex));
                }else{
                  this.locationList ='';
                  this.AppUtils.alert('该仓库下没有库位');
                }
              }
            })
          }
        }else{
          this.pageIndex=1;
        }
      },
      locationChange(data) {
        if(data.locationName){
          var locals=JSON.parse(this.locationList);
          for (let val of locals) {
            if (val.locationName === data.locationName) {
              data.locationId = val.locationId;
              // var sliceLo=(JSON.parse(this.locationList)).slice(0,10);
              this.locationList='';
              return;
              // return this.saveEditParts(data);//库位修改 保存配件
            }
          }
          this.pageIndex=1;
        }
      },
      inputWave(){
        ////console.log(this.importWareList);
        var _this=this;
        var arr=JSON.parse(JSON.stringify(this.importWareList));
        var zeroUnitPrice=[];
        var zeroUnitPriceArr=arr.filter(item=>item.unitPrice==0);
        // console.log(zeroUnitPriceArr);
        if(!this.zeroPrice){
          if(zeroUnitPriceArr.length){
            zeroUnitPriceArr.forEach((item)=>{
              zeroUnitPrice.push(item.goodsNo);
            });
            let newStr=zeroUnitPrice.join(',');
            this.AppUtils
              .confirm('配件'+newStr+'的采购单价为0，请确认是否继续?',
                () => {
                  this.zeroPrice=true;
                },()=>{
                  this.zeroPrice=false;
                });
            return false;
          }
        }
        arr=arr.filter(item=>item.noWavehosueNum!=0);
        ////console.log(arr);
        if(arr.length){
          this.model.purchaseOrderId=parseFloat(this.purchaseOrderId);
          var partName=[];
          var locationLoss=[];
          for(var i=0;i<arr.length;i++){
            ////console.log(val);
            var val=arr[i];
            var value=val;
            value['inputNum']=val['noWavehosueNum'];
            value['inputPrice']=val['unitPrice'];
            value['totalPrice']=_this.AppUtils.decimal4(_this.AppUtils.mul(value['inputNum'],value['inputPrice']));
            if(!value['wavehouseId']){
              partName.push(val['goodsNo']);
            }
            if(!value['locationName']){
              locationLoss.push(val['goodsNo']);
            }
          }
          if(partName.length||locationLoss.length){
            if(partName.length&&locationLoss.length){
              var arr=getArrEqual(partName,locationLoss);
              ////console.log(arr);
              if(arr.length){
                arr.forEach(function(key) {
                  partName.forEach((item,index)=>{
                    key === item? partName.splice(index,1) : '';
                  });
                  locationLoss.forEach((item,index)=>{
                    key === item? locationLoss.splice(index,1) : '';
                  });
                })
                var str2=arr.join(',');
                var str=partName.join(',');
                var str1=locationLoss.join(',');
                if(str&&str1){
                  _this.AppUtils.alert('配件'+str+'未选择仓库,'+'配件'+str1+'未选择库位,'+'配件'+str2+'未选择仓库和库位');
                }else if(str&&!str1){
                  _this.AppUtils.alert('配件'+str+'未选择仓库,'+'配件'+str2+'未选择仓库和库位');
                }else if(!str&&str1){
                  _this.AppUtils.alert('配件'+str1+'未选择库位,'+'配件'+str2+'未选择仓库和库位');
                }else{
                  _this.AppUtils.alert('配件'+str2+'未选择仓库和库位');
                }
              }else{
                var str=partName.join(',');
                var str1=locationLoss.join(',');
                _this.AppUtils.alert('配件'+str+'未选择仓库,'+'配件'+str1+'未选择库位');
              }
            }else if(partName.length&&!locationLoss.length){
              var str=partName.join(',');
              _this.AppUtils.alert('配件'+str+'未选择仓库');
            }else if(!partName.length&&locationLoss.length){
              var str1=locationLoss.join(',');
              _this.AppUtils.alert('配件'+str1+'未选择库位');
            }
          }else{
            ////console.log(arr)
            _this.model.goodsIds=JSON.parse(JSON.stringify(arr));
            ////console.log(this.model);
            this.$axios.post('/admin/stock/inputInfo/purchase/input',this.model).then(res=>{
              let data = this.AppUtils.checkResponse(res);
              ////console.log(data);
              if(data.value.inputInfoId) {
                _this.$emit('closeImportWare');
                _this.$message.success('入库成功');
                _this.$emit('fetchData');
                this.toDetail('/inventory-management/purchase-warehousing/detail/'+data.value.inputInfoId);
                sessionStorage.removeItem('waveInfo')
                // localStorage.setItem('sRate',this.model.taxRate);
                // localStorage.setItem('orderId',this.purchaseOrderId);
                localStorage.setItem(this.purchaseOrderId,this.model.taxRate);
              }
            })
          }
        }else{
          _this.AppUtils.alert('所有配件数量都是0，请重新选择');
        }
      },
      toDetail(arg){
        let routeData = this.$router.resolve({path:arg, query: {showPrint:true}});
        //////console.log(routeData)
        window.open(routeData.href,"_blank");
      },
      fetchData1(){
        if(!localStorage.getItem('waveInfo')){
          localStorage.setItem('waveInfo',JSON.stringify(this.importWareList));
        }
        var arr=JSON.parse(localStorage.getItem('waveInfo'));
        ////console.log(this.waveList);
        ////console.log(arr);
        var _this=this;
        var arrGoodsNo=[];
        if(_this.model.goodsNo){
          arr.forEach((val)=>{
            arrGoodsNo.push(val['goodsNo']);
            if(val['goodsNo']==_this.model.goodsNo){
              _this.$emit('clearImportWareList');
              _this.$emit('setImportWareList',val);
            }
          })
          if(arrGoodsNo.indexOf(_this.model.goodsNo)==-1){
            _this.AppUtils.alert(`入库明细中配件`+_this.model.goodsNo+`不存在`);
          }
        }else{
          if(JSON.parse(localStorage.getItem('waveInfo')).length==this.importWareList.length){
            _this.AppUtils.alert('请输入配件编号');
          }
          _this.$emit('selectAll');
        }
      },
      //改变税率重新计算
      accAgain(arg){
        if(!arg){
          // alert(this.model.taxRate);;
          var arr=JSON.parse(JSON.stringify(this.importWareList));
          var _this=this;
          ////console.log(arr);
          arr.forEach((val)=>{
            _this.getTotal(val['goodsId'],val['noWavehosueNum'],val['unitPrice']);
            ////console.log('哈哈哈哈');
          })
        }
      },
      //处理价格和数量随时变动
      changeNumPrice(){
        var allOrderNum=0;
        var allTotalPrice=0;
        var num;
        var _this=this;
        this.importWareList.forEach((val,index)=>{
          if(val.noWavehosueNum<=0){
            num=1;
          }else{
            num=val.noWavehosueNum;
          }
          // allApplyNum+=parseFloat(num);//精度注释
          allOrderNum=_this.AppUtils.add(allOrderNum,parseFloat(num));//精度处理
          // allTotalPrice+=parseFloat(val.totalPrice);//精度注释
          allTotalPrice=_this.AppUtils.add(allTotalPrice,val.noWavehosuePrice);//精度处理
        });
        if(allOrderNum){
          // this.importWareList.orderTotalNum=allOrderNum;
        }
        if(allTotalPrice){
          // this.importWareList.orderTotalPrice=allTotalPrice;
        }
      },
      getLocal(goodsId,id,e){
        ////console.log(id);
        ////console.log(e);
        var _this=this;
        if(e){
          if(this.locationList.length){
            this.locationList=[];
          }
          this.getLocation(id);
        }else{
          this.importWareList.forEach((val,index)=>{
            var value=val;
            var inde=index;
            if(val['goodsId']===goodsId){
              var local=val['locationName'];
              _this.locationList.forEach((val)=>{
                if(val.locationId==local){
                  ////console.log(val.locationId);
                  ////console.log(val.locationName);
                  value['locationId']=val.locationId;
                  value['locationName']=val.locationName;
                  ////console.log(inde);
                  ////console.log(val.locationName);
                  _this.$set(_this.importWareList,inde,value);
                }
              });
            }
          })
        }
      },
      clearLocation(goodsId,id,val){
        ////console.log(id);
        ////console.log(goodsId);
        var _this=this;
        // this.waveList
        if(val){
          this.importWareList.forEach((val,index)=>{
            var valu=val;
            if(val['goodsId']===goodsId){
              _this.waveList.forEach((val)=>{
                if(val.wavehouseId==id){
                  valu['wavehouseName']=val.wavehouseName;
                  valu['locationName']=''
                }
              });
            }
          })
        }
      },
      //获取库位
      getLocation(arg){
        if(!arg){
          this.AppUtils.alert('请先选择仓库');
        }else{
          this.$axios.get('/admin/base/locationInfo/listLocationByWaveId/'+arg).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            if(data) {
              ////console.log(data);
              this.locationList=JSON.parse(JSON.stringify(data.value))
            }
          })
        }
      },
      //获取仓库
      getWave(storeId){
        this.$axios.get('/admin/base/wavehouse/listByStoreId?storeId='+storeId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data) {
            ////console.log(data);
            this.waveList=JSON.parse(JSON.stringify(data.value))
          }
        })
      },
      //关闭新增配件弹窗
      close(){
        sessionStorage.removeItem('waveInfo');
        this.locationList=[];
        this.$emit('closeImportWare');
        this.$emit('fetchData');
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 2) {
            sums[index] = '合计';
            return;
          }else if(index === 5){
            var total=0;
            _this.importWareList.forEach((val)=>{
              ////console.log(val);
              ////console.log(val.noWavehosueNum);
              if(val.noWavehosueNum<0){
                val.noWavehosueNum=1;
              }
              total=_this.AppUtils.add(total,val.noWavehosueNum);//精度处理
            });
            ////console.log(typeof total);
            ////console.log(total);
            sums[index]=total;
            return
          }else if(index === 7){
            var total=0;
            this.importWareList.forEach((val)=>{
              if(!val.noWavehosuePrice){
                val.noWavehosuePrice=0;
              }
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.noWavehosuePrice));//精度处理
            });
            sums[index]=_this.AppUtils.decimal2(total);
            return ;
          }else if(index === 9){
            var total=0;
            this.importWareList.forEach((val)=>{
              if(!val.noTaxWavehosuePrice){
                val.noTaxWavehosuePrice=0;
              }
              // total+=parseFloat(val.totalPrice);//精度注释
              total=_this.AppUtils.add(total,_this.AppUtils.decimal4(val.noTaxWavehosuePrice));//精度处理
            });
            sums[index]=_this.AppUtils.decimal2(total);
            return ;
          }
        });
        return sums;
      },
      getTotal(id,noWavehosueNum,unitPrice) {
        var _this = this;
        if (noWavehosueNum) {
          if (noWavehosueNum < 0) {
            noWavehosueNum= 1;
          }
          ////console.log(noWavehosueNum);
          ////console.log(Math.floor(noWavehosueNum));
          if (Math.floor(noWavehosueNum)!=noWavehosueNum) {
            this.AppUtils.alert('请购数量为正整数');
            noWavehosueNum=Math.floor(noWavehosueNum);
          }
          ////console.log(this.importWareList);
          var arr=this.importWareList;
          arr.forEach((val,index)=> {
            ////console.log(val)
            ////console.log(val['goodsId']);
            ////console.log(id);
            ////console.log(_this.saveNoWavehosue);
            if(val['goodsId']==id){
              if(_this.AppUtils.numSub(val['orderNum'],val['alreadyInputNum'])<noWavehosueNum){
                _this.AppUtils.alert('入库数量需<=配件未入库数');
                val['noWavehosueNum']=_this.AppUtils.numSub(val['orderNum'],val['alreadyInputNum']);
                noWavehosueNum=val['noWavehosueNum'];
              }
            }
          })
        } else {
          noWavehosueNum= 0;
        }
        var str = '' + unitPrice;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>10){
            this.AppUtils.alert('单价小数点位数最多十位');
            str=str.substring(0,str.length-1);
            unitPrice=parseFloat(str);
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入单价');
            unitPrice=0;
          }
        }
        if(unitPrice!=0&&str.indexOf('-')>-1){
          this.AppUtils.alert('单价不能为负');
          unitPrice=Math.abs(unitPrice);
        }
        if((unitPrice==='')||(str=='-0')){
          this.AppUtils.alert('请正确输入单价');
          unitPrice=0;
        }
        // var totalPrice=parseFloat(applyNum)*unitPrice;//精度注释
        ////console.log(noWavehosueNum);
        var totalPrice=this.AppUtils.decimal4(this.AppUtils.mul(parseFloat(noWavehosueNum),unitPrice));//精度处理
        ////console.log(totalPrice);
        if(totalPrice||totalPrice==0){
          this.importWareList.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.taxRate/100));
              _this.importWareList[index]['noWavehosuePrice']=totalPrice;
              _this.importWareList[index]['unitPrice']=unitPrice;
              _this.importWareList[index]['noWavehosueNum']=noWavehosueNum;
              _this.importWareList[index]['noTaxWavehosuePrice']=_this.AppUtils.decimal4(this.AppUtils.accDiv(_this.importWareList[index]['noWavehosuePrice'],rateCheck));
              _this.importWareList[index]['noTaxUnitPrice']=_this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.importWareList[index]['noTaxWavehosuePrice'],_this.importWareList[index]['noWavehosueNum']));
              _this.$set(_this.importWareList,index,_this.importWareList[index]);
            }
          });
        }else{
          this.importWareList.forEach((val,index)=>{
            if(val['goodsId']==id){
              var rateCheck=this.AppUtils.add(1,parseFloat(_this.model.taxRate/100));
              _this.importWareList[index]['noWavehosuePrice']=0;
              _this.importWareList[index]['unitPrice']=unitPrice;
              _this.importWareList[index]['noWavehosueNum']=noWavehosueNum;
              _this.importWareList[index]['noTaxWavehosuePrice']=_this.AppUtils.decimal4(this.AppUtils.accDiv(_this.importWareList[index]['noWavehosuePrice'],rateCheck));
              _this.importWareList[index]['noTaxUnitPrice']=_this.AppUtils.decimalTen(this.AppUtils.accDiv(_this.importWareList[index]['noTaxWavehosuePrice'],_this.importWareList[index]['noWavehosueNum']));
              _this.$set(_this.importWareList,index,_this.importWareList[index]);
            }
          });
        }
        this.changeNumPrice();
      },
    },
    watch:{
      'importWareShow'(newVal,oldVal){
        if(newVal){
          ////console.log('确认入库弹层显示');
          this.model.goodsNo='';
          // alert(this.rate)
          var raty=localStorage.getItem(this.purchaseOrderId);
          // alert(raty)
          if(raty||raty==0){
              this.model.taxRate=parseFloat(raty);
          }else{
            // alert(3);
            this.model.taxRate=this.rate;
          }
          var arr=JSON.parse(JSON.stringify(this.importWareList));
          var _this=this;
          ////console.log(arr);
          arr.forEach((val)=>{
            _this.getTotal(val['goodsId'],val['noWavehosueNum'],val['unitPrice']);
          })
          // sessionStorage.setItem('orderId',this.purchaseOrderId);
          /*if(!saveRate&&saveRate!=0){

          }else{

          }*/
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .addform{
    width: 1177px;
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
              height: 33px;
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
      border-bottom: 1px solid #ccc;
      .right{
        width: 1177px;
        .tableZone{
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
      .importBtn{
        left: 50%;
        transform:translateX(-50%);
        -ms-transform:translateX(-50%); 	/* IE 9 */
        -moz-transform:translateX(-50%); 	/* Firefox */
        -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
        -o-transform:translateX(-50%); 	/* Opera */
      }
    }
  }
</style>
