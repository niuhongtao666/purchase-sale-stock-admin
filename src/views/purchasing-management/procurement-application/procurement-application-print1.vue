<template>
  <div>
      <div class="mask">
        <div id="print" class="content">
          <div id="printTest">
            <div class="tableZonePrint">
              <div class="ulPrint" id="ulPrint">
                <div
                  class="titlePrint"
                  style="
                    text-align: center;
                    line-height: 47px;
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 18px;
                    color: #4a4a4a;
                    letter-spacing: 0;
                  ">商品采购单</div>
                <div class="extraInfo" style="line-height:40px;font-size: 14px;display: flex;">
                  <div class="application" style=" text-align: left;flex: 3;">采购申请：{{data.purchaseApplyInfoDTO.purchaseApplyNo}}</div>
                  <div class="store" style="text-align: left;flex: 2;text-indent: -33px;">申请门店：{{data.purchaseApplyInfoDTO.storeName}}</div>
                  <div class="person" style="flex: 2;text-align: right;">申请人：{{data.purchaseApplyInfoDTO.createUserName}}</div>
                </div>
                <div class="tableZone printTable" >
                 <table class="table" cellspacing="0" border >
                    <thead>
                    <tr style="text-align: center;height: 55px">
                      <th style="min-width:50px;">序号</th>
                      <th style="min-width:160px">商品编号</th>
                      <th style="min-width:160px">商品名称</th>
                      <th style="min-width:170px">生产编码</th>
                      <th style="min-width:50px">单位</th>
                      <th style="min-width:70px">请购数量</th>
                      <th style="min-width:70px">请购单价</th>
                      <th style="min-width:70px">请购总价</th>
                      <th style="min-width:80px">上次采购价</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data,index) in allData" :key="index" style="text-align: center;height: 45px;">
                      <td>{{index+1}}</td>
                      <td>{{data.goodsNo}}</td>
                      <td>{{data.goodsName}}</td>
                      <td>{{data.goodsVendorNo}}</td>
                      <td>{{data.goodsUnit}}</td>
                      <td>{{data.applyNum}}</td>
                      <td>{{data.unitPrice}}</td>
                      <td>{{data.totalPrice | decimalTofixed2}}</td>
                      <td>{{data.lastPrice | decimalTofixed2}}</td>
                    </tr>
                    <tr style="text-align: center;height: 45px; font-size: 12px">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>合计数量：</td>
                      <td>{{totalNum}}</td>
                      <td>合计金额：</td>
                      <td>{{totalPrice}}</td>
                      <td></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="printZ">
            <!--<button id="btn" @click="print1">打印</button>-->
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    name:'procurement-application-print',
    mounted(){
    },
    computed:{
      allData(){
        return this.data.purchaseApplyDetailDTOS;
      },
      totalNum(){
        var _this=this;
        var total=0;
        this.data.purchaseApplyDetailDTOS.forEach((val)=>{
          total=_this.AppUtils.add(total,val.applyNum);//精度处理
        });
        return total;
      },
      totalPrice(){
        var _this=this;
        var total=0;
        this.data.purchaseApplyDetailDTOS.forEach((val)=>{
          total=_this.AppUtils.add(total,_this.AppUtils.decimal2(val.totalPrice));//精度处理
        });
        return this.AppUtils.decimal2(total);
      },
    },
    props:{
      // 针对分页表格模式：传入的打印数据。
      data:{
        type:Object,
        default() {
          return undefined
        }
      },
    },
    methods:{
      closePrint(){
        this.$emit('hidePrintApplication')
      },
      print(){
        $('#printTest').print({
          // iframe : false,
          // stylesheet:'./table.css',
          globalStyles:true,
          mediaPrint:false,
          iframe:true,
        });
      },
      print1(){
        $('#printTest').printArea();
      },

      cellStyle({row, column, rowIndex, columnIndex}){
        return 'height:43.3px;color:#000';
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f5f7;color:#000;height:50px;'
        }else if(rowIndex==(this.data.purchaseApplyDetailDTOS.length+1)){
          alert(111)
          return 'background-color: #f4f5f7;color:#000;height:50px;'
        }
        ////console.log(rowIndex)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .closeZ{
    height: 30px;
    width: 30px;
    line-height: 30px;
    position: absolute;
    top: 9px;
    right: 13px;
    z-index: 100;
    cursor: pointer;
    font-size: 14px;
  }
  .zzc {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    color: #000;
  }
  .content{
    background: #fff;
  }
  .w995{
    width: 99.5% !important;
  }
  .printZ{
    width: 1100px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 102px;
    padding-right: 102px;
    /* margin-left: -400px; */
    /*background: rgba(0, 0, 0, 0.1);*/
  }
  .mask{
    position: absolute;
    width: 1100px;
    left: 50%;
    margin-left: -550px;
    top: 50%;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%); 	/* IE 9 */
    -moz-transform:translateY(-50%); 	/* Firefox */
    -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
    -o-transform:translateY(-50%); 	/* Opera */
  }
  #print{
    width: 1100px;
    /*height: 518px;*/
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    margin: 0 auto;
    position: relative;
  }
  #printTest{
    width:1000px;
    overflow-y: scroll;
    margin: 0 auto;
  }
  #printTest::-webkit-scrollbar {
    display:none
  }
  /*IE10,IE11,IE12*/
  #printTest{
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
  }
  .topTitle{
    width: 99.5%;
    height: 57px;
    border: 1px solid #4a4a4a;
    border-bottom: none;
    position: relative;
  }
  .titlePrint{
    text-align: center;
    font-size: 18px;
    line-height: 47px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 18px;
    color: #4a4a4a;
    letter-spacing: 0;
  }
  .extraInfo{
    line-height:40px;
    font-size: 14px;
    display: flex;
    .application{
      text-align: left;
      flex: 3;
    }
    .store{
      text-align: left;
      flex: 2;
      text-indent: -33px;
    }
    .person{
      flex: 2;
      text-align: right;
    }
  }
  .centerPrint{
    box-sizing: border-box;
    padding: 0px 6px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    margin: 0 auto;
    text-align: right;
    margin-bottom: 5px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
  }
  .tableZonePrint{
    /*width: 300px;*/
    /*height: 300px;*/
    box-sizing: border-box;
    /*padding: 0px 20px;*/
    margin: 0 auto;
    width: 1000px;
    /*border: 1px solid red;*/
  }
  .ulPrint{
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .tableZone{
    width: 100%;
  }
  .printTable{
    max-height: 361px;
    overflow-y: scroll;
    /*border: 2px solid #000;*/
  }
  .printTable::-webkit-scrollbar {
    display:none
  }
  .borderTopNone{
    border-top: 0px solid #ccc;
  }
  #btn{
    width: 100px;
    height: 30px;
    /*border: 1px solid #ccc;*/
    border-radius: 3px;
    cursor: pointer;
    background: #00BAFF;
    color: #fff;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .hei85{
    height: 85px!important;
    line-height: 85px!important;
  }
  @page {
    margin:0px;
    //控制是使用a4还是使用其它纸张规格
    size: auto;
  }
  /*@media print {
    .zzc {
      color: #000;
    }
    #printTest {
      width: 1300px;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      margin-left: -650px;
    }
    .content{
      background: #fff;
    }
    .printTable{
      height: 100%;
    }
    @page {
      margin:0px;
      //控制是使用a4还是使用其它纸张规格
      size: auto;
    }
  }*/
</style>

