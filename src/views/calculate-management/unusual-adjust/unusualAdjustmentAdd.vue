<template>
  <div>
    <div class="applicationInfo">
      <div class="item">
        <i class="cal-info_list"></i>
        <h2>调整信息</h2>
      </div>
      <div class="row width900">
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone">调整单号</div>
            <div class="rightZone widthReset resetInput">
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整类型</div>
            <div class="rightZone resetInput">
              异常调整
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整分类</div>
            <div class="rightZone widthReset resetInput">
              <el-select placeholder="请选择" class="el_box" v-model.trim="model.adjustmentClass" filterable clearable>
                <el-option
                  v-for="item in adjustTypesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl0"><i class="required">*</i>仓库</div>
            <div class="rightZone widthReset resetInput">
              <el-select
                placeholder="请选择"
                class="el_box disabledTrans"
                v-model.trim="model.warehouseId"
                filterable
                clearable
                :disabled="waveStatus"
              >
                <el-option
                  v-for="item in wavehousesList"
                  :key="item.wavehouseId"
                  :label="item.wavehouseName"
                  :value="item.wavehouseId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整机构</div>
            <div class="rightZone resetInput">
              {{storeName}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">调整人</div>
            <div class="rightZone resetInput">
              {{userName}}
            </div>
          </div>
        </div>
        <div class="rowItem h-49 borderBottom">
          <div class="left h-49">
            <div class="leftZone pl0">调整日期</div>
            <div class="rightZone widthReset resetInput resetTimePadding">
              <!--<el-date-picker
                v-model.trim="model.adjustTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="请选择"
                value-format="timestamp"
                class="activity-edit-date date-box innerInput"
              >
              </el-date-picker>-->
              {{adjustTimeShow}}
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商编码</div>
            <div class="rightZone resetInput widthReset">
              <!--<el-input  placeholder="请输入供应商编码" v-model="model.supplierNo"></el-input>-->
              <el-autocomplete
                v-model="supplierNo"
                :fetch-suggestions="fetchSupplierByNo"
                :hide-loading="true"
                :trigger-on-focus="false"
                label="请输入供应商编码"
                placeholder="请输入供应商编码"
                @select="handleSelect"
                value-key="supplierNo"
                :popper-class="supplierNoOptions.length?'':'hide-suggestion'"
                class="el_box"
              ></el-autocomplete>
            </div>
          </div>
          <div class="left h-49">
            <div class="leftZone">供应商名称</div>
            <div class="rightZone resetInput widthReset">
              {{supplierName}}
            </div>
          </div>
        </div>
        <div class="rowItem  borderBottom h90">
          <div class="left">
            <div class="leftZone h89 line-height90">备注</div>
            <div class="rightZone w480" style="flex: 9;">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                resize="none"
                maxlength="500"
                v-model.trim="model.memo">
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applicationInfo" style="position: relative;">
      <div class="item">
        <i class="cal-list_icon"></i>
        <h2>调整清单</h2>
      </div>
      <div class="btnZone">
        <button type="button" class="btn mr10" @click="add">新增</button>
        <button type="button" class="cancelBtn" @click="delTableData">删除</button>
      </div>
      <div class="table_wrap">
        <div class="table_layout" style="padding:25px;">
          <div class="table_scroll add">
            <el-table
              :data="model.detail"
              max-height="582"
              border
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeaderColor"
              :cell-style="cellStyle"
              :summary-method="getSummaries"
              show-summary
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="50"
              >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                key="2"
                width="50">
              </el-table-column>
              <el-table-column
                label="配件编码"
                min-width="180"
                key="3"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称"
                min-width="180"
                key="4"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsName}}
                </template>
              </el-table-column>
              <el-table-column
                label="生产编码"
                min-width="180"
                key="5"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsVendorNo}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="配件品牌"-->
                <!--min-width="120"-->
                <!--key="6"-->
                <!--show-overflow-tooltip-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.goodsBrandName}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="单位"
                width="50"
                key="6"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.goodsUnit}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本单价"
                min-width="120"
                key="7"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.averagePrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="调整数量"
                min-width="120"
                key="8"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number" class="in" v-model="scope.row.adjustmentNum" @blur="getTotal(scope.row.id,scope.row.adjustmentMoney,scope.row.adjustmentNum,scope.row.goodsNo)">
                </template>
              </el-table-column>
              <el-table-column
                label="调整金额"
                min-width="120"
                key="9"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <input type="number" class="in" v-model="scope.row.adjustmentMoney" @blur="getTotal(scope.row.id,scope.row.adjustmentMoney,scope.row.adjustmentNum,scope.row.goodsNo)">
                </template>
              </el-table-column>
              <el-table-column
                label="库位"
                min-width="180"
                key="10"
              >
                <template slot-scope="scope">
                  <el-select placeholder="请选择" class="el_box" v-model.trim="scope.row.locationName"  @visible-change="getWaveLocation(model.warehouseId,$event)"  @change="locationChange(scope.row)" v-el-select-loadmore="loadmore" @blur="reBack" filterable remote :remote-method="searchLocation">
                    <el-option
                      v-for="item in locals"
                      :key="item.locationId"
                      :label="item.locationName"
                      :value="item.locationName"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="saveZone">
      <div class="saveBtn">
        <button type="button" class="btn" @click="getReasonShow">保存</button>
      </div>
    </div>
    <partsAdd v-if="partMaskShow" @hidePartMask="hidePartMask" :waveId="model.warehouseId" @addParts="addParts"></partsAdd>
    <nt-reason v-if="reasonShow" :reasonId="reasonId" @hideReason="hideReason" @addUnusualAdjust="addUnusualAdjust"></nt-reason>
  </div>
</template>

<script>
  import partsAdd from './part-add'
  import {checkDataExit,delDataExit,isNumber} from '@/assets/js/logic'
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
    name:'unusualAdjustmentAdd',
    components:{
      partsAdd
    },
    computed:{
      waveStatus(){
        if(this.model.detail.length){
          return true;
        }else{
          return false;
        }
      },
      locals(){
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
    data(){
      return{
        pageIndex:1,
        model:{
          detail:[],
          adjustmentClass:null,	//是	int	调整分类(1.采购入库；2.调拨入库；3.盘盈入库)
          warehouseId:null,//仓库id
          memo:null,//备注
          supplierId:null,//是	int	供应商ID
        },
        reasonShow:false,
        reasonId:14,
        supplierNo:null,//供应商编码
        partMaskShow: false,//新增配件
        adjustTypesList:[
          {
            id:1,
            name:'采购入库'
          },
          {
            id:2,
            name:'调拨入库'
          },
          {
            id:3,
            name:'盘盈入库'
          }
        ],
        wavehousesList:[],
        storeName:null,//当前用户的门店名
        storeId:null,//当前用户的门店Id
        userName:null,//当前用户名
        adjustTimeShow:null,//显示的调整时间
        supplierNoOptions:[],//供应商编码
        supplierName:null,//供应商名称
        total:'',//调整金额合计
        checkList:[],
        loading: true,
        locationList:'',//库位列表
      }
    },
    mounted(){
      var today=new Date();
      this.adjustTimeShow=this.AppUtils.formatDate(today);
      var userInfos=JSON.parse(localStorage.getItem('userInfos'));
      this.storeName=userInfos['storeName'];
      this.storeId=userInfos['storeId'];
      this.userName=userInfos['name'];
      if(this.storeId!==''){
        this.getWaveNew(this.storeId);
      }else{
        this.AppUtils.alert('当前用户的门店id为空');
      }
    },
    watch:{
      supplierNo(newVal,oldVal){
        console.log(newVal)
        if(newVal!==oldVal){
          // this.supplierName=null;
          // this.model.supplierId=null;
        }
      }
    },
    methods:{
      changeSupplier(){
        alert(1)
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
          this.getWaveLocation(wavehouseId,true);
        };
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
      getWaveLocation(wavehouseId,event){
        if(event){
          this.loading=true;
          sessionStorage.setItem('waveId',wavehouseId);
          if (wavehouseId) {
            this.$store.dispatch('fetchLocationInfoByWaveId',wavehouseId).then(res => {
              let data = this.AppUtils.checkResponse(res);
              if (data) {
                if(data.value.length){
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
      getReasonShow(){
        this.reasonShow=true;
      },
      hideReason(){
        this.reasonShow=false;
      },
      getTotal(id,adjustmentMoney,adjustmentNum,goodsNo){
        // if (/^(-)?[1-9]\d*$/.test(adjustmentNum)) {//配件数量为数字且大于一
        //
        // } else {
        //   this.$message.error('配件'+goodsNo+'的调整数量有误，请正确输入');
        // }
        var _this=this;
        // if(adjustmentMoney==''){
        //   _this.model.detail.forEach((val,index)=>{
        //     if(val['id']==id){
        //       _this.AppUtils.alert('配件'+val['goodsNo']+'的调整金额为必填项');
        //     }
        //   });
        // };
        adjustmentMoney=parseFloat(adjustmentMoney);
        var goodsNo;
        _this.model.detail.forEach((val,index)=>{
          if(val['id']==id){
            goodsNo=val['goodsNo'];
          }
        });
        // if(adjustmentMoney===0){
        //   _this.AppUtils.alert('配件'+goodsNo+'的调整金额不可以为0');
        //   adjustmentMoney='';
        // };
        var str = '' + adjustmentMoney;
        var arr = str.split('.');
        if (arr[1]) {
          if (arr[1].length>4){
            this.AppUtils.alert('配件'+goodsNo+'的调整金额小数点位数最多四位');
            arr[1]=arr[1].substring(0,4);
            str=arr.join('.');
            adjustmentMoney=parseFloat(str);
          }
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调整金额');
            adjustmentMoney='';
          }
        }else{
          if(arr[0].length!=1&&arr[0].indexOf('0')==0){
            this.AppUtils.alert('请正确输入调整金额');
            adjustmentMoney='';
          }
        }
        this.model.detail.forEach((val,index)=>{
          if(val['id']==id){
            _this.model.detail[index]['adjustmentNum']=adjustmentNum;
            _this.model.detail[index]['adjustmentMoney']=adjustmentMoney;
            _this.$set(_this.model.detail,index,_this.model.detail[index]);
          }
        });
        //console.log(_this.model.detail)
      },
      addUnusualAdjust(){
        //console.log(this.model);
        // if(!this.model.adjustmentClass){
        //   this.AppUtils.alert('调整分类不能为空');
        //   return false;
        // }
        if(!this.model.warehouseId){
          this.AppUtils.alert('仓库不能为空');
          return false;
        }
        var _this=this;
        var emptyArray=[];
        var alertArray=[];
        this.model.detail.forEach((val,index)=>{
          if(val['adjustmentMoney']===''){
            emptyArray.push(val);
          }
        });
        if(emptyArray.length){
          emptyArray.forEach((item,index)=>{
            alertArray.push(item['goodsNo']);
          });
          var str=alertArray.join(',');
          _this.AppUtils.alert('配件'+str+'的调整金额不能为空');
          return false;
        }else{
          console.log(this.model)
          this.$axios.post('/admin/stock/stockExceptionAdjustment/add',this.model).then(res=>{
            let data = this.AppUtils.checkResponse(res);
            //console.log(data);
            if(data) {
              this.$message.success('成功新增异常调整单');
              this.$router.push('/calculate-management/unusual-adjust/detail/'+data.value);
            }
          })
        }
      },
      addParts(data) {
        //console.log(data);
        data['goodsId']=data['id'];
        data['adjustmentMoney']='';
        // data['unitPrice']=this.AppUtils.decimalTen(data['lastPrice']);
        // data['totalPrice']=this.AppUtils.decimal4(this.AppUtils.mul(data['unitPrice'],data['applyNum']));
        let index = checkDataExit(this.model.detail, data);
        if (index > -1) {
          var goodsNo=this.model.detail[index]['goodsNo'];
          return this.AppUtils.alert('配件'+goodsNo+'已存在,请删除后重新添加');
        } else {
          this.model.detail.push(data);
        }
      },
      //新增配件
      add(){
        if(this.model.warehouseId){
          this.partMaskShow=true;
        }else{
          this.AppUtils.alert('请先选择仓库');
        }
      },
      handleSelect(item) {
        if(item){
          this.supplierNo=item.supplierNo;
          this.supplierName=item.supplierName;
          this.model.supplierId=item.id;
        }
      },
      fetchSupplierByNo(queryString, cb) {//根据手机号获取用户信息
        //console.log(queryString);
        if(queryString){
          this.$axios.post('/admin/base/supplierInfo/getSupplierName',{supplierNo: queryString}).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              // console.log(data.value);
              this.supplierNoOptions=data.value;
              if(!data.value.length){
                this.supplierName=null;
                this.supplierNo=null;
                this.model.supplierId=null;
              }else{
                cb(data.value);
              }
            }
          })
        }else{
          this.supplierNoOptions=[];
        }
      },
      getWaveNew(storeId){
        this.$store.dispatch("fetchWarehousetByByStoreId",storeId).then(res=>{
          let data = this.AppUtils.checkResponse(res);
          if(data.value.length){
            this.wavehousesList=data.value;
          };
        });
      },
      hidePartMask() {//隐藏配件弹窗
        this.partMaskShow = false;
      },
      handleSelectionChange(val) {
        //console.log(val)
        this.checkList=val;
      },
      delTableData(){
        if(this.checkList.length){
          delDataExit(this.model.detail,this.checkList);
        }else{
          this.AppUtils.alert('请先勾选需要删除的配件');
        }
      },
      getSummaries(param) {
        ////console.log(param)
        const { columns, data } = param;
        const sums = [];
        ////console.log(columns);
        var _this=this;
        columns.forEach((column, index) => {
          if (index === 4) {
            sums[index] = '合计';
            return;
          }else if(index === 7){
            var total=0;
            // _this.model.detail.forEach((val)=>{
            //
            //   total=_this.AppUtils.add(total,parseFloat(val.adjustmentMoney));//精度处理
            // });
            var arr=_this.model.detail;
            var newArr=arr.filter(item=>item['adjustmentNum']==='');
            if(arr.length) {
              if(arr.length==newArr.length){
                sums[index]='';
              }else{
                for(var i=0;i<arr.length;i++){
                  if(arr[i]['adjustmentNum']==''){
                    continue;
                  }
                  //console.log(arr[i]['adjustmentMoney']);
                  if(isNumber(arr[i]['adjustmentNum'])){
                    total=_this.AppUtils.add(total,parseFloat(arr[i]['adjustmentNum']));//精度处理
                  }
                }
                if(total||total===0){
                  sums[index]=total;
                }else {
                  sums[index]='';
                }
              }
            }
            return
          }else if(index === 8){
            var total=0;
            // _this.model.detail.forEach((val)=>{
            //
            //   total=_this.AppUtils.add(total,parseFloat(val.adjustmentMoney));//精度处理
            // });
            var arr=_this.model.detail;
            var newArr=arr.filter(item=>item['adjustmentMoney']==='');
            if(arr.length) {
              if(arr.length==newArr.length){
                sums[index]='';
              }else{
                for(var i=0;i<arr.length;i++){
                  if(arr[i]['adjustmentMoney']==''){
                    continue;
                  }
                  //console.log(arr[i]['adjustmentMoney']);
                  if(isNumber(arr[i]['adjustmentMoney'])){
                    total=_this.AppUtils.add(total,parseFloat(arr[i]['adjustmentMoney']));//精度处理
                  }
                }
                if(total||total===0){
                  sums[index]=total;
                }else {
                  sums[index]='';
                }
              }
            }
            return
          }
        });
        return sums;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:10px';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color: #4A4A4A;'
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .saveZone{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: fixed;
    left:0px;
    bottom: 0px;
  }
  .saveBtn{
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 55%;
    bottom: -17px;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%); 	/* IE 9 */
    -moz-transform:translateX(-50%); 	/* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%); 	/* Opera */
  }
  .titleZone{
    .zone{
      /*width: 800px;*/
      display: flex;
      padding-left: 30px;
      box-sizing: border-box;
      span{
        font-size: 14px;
      }
      span + span {
        margin-left: 20px;
      }
    }
  }
  .applicationInfo{
    padding-bottom: 23px;
    margin: 0 20px 20px;
    background: #fff;
    .saveBtn{
      .btn{
        margin-right: 10px;
      }
    }
    .btnZone{
      width: 188px;
      height: 30px;
    }
    .item {
      height: 70px;
      line-height: 70px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-left: 72px;
    }
    .row{
      border: 1px solid #ecf1f4;
      margin-left: 25px;
      margin-right: 25px;
      border-bottom: none;
      .rowItem{
        display: flex;
        color: #4A4A4A;
        height: 49px;
        line-height: 49px;
        .leftMark{
          flex: 2;
          height: 49px;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 11;
            line-height: 49px;
            height: 49px;
            float: left;
          }
        }
        .left{
          flex: 1;
          height: 49px;
          display: flex;
          .leftZone{
            flex: 1;
            height: 49px;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            line-height: 49px;
            height: 49px;
            float: left;
          }
        }
        .right{
          flex: 1;
          display: flex;
          .leftZone{
            flex: 1;
            line-height: 49px;
            background-color: #F4F5F7;
            text-align: center;
            float: left;
          }
          .rightZone{
            flex: 2;
            height: 49px;
            float: left;
          }
        }
      }
    }
  }
</style>
