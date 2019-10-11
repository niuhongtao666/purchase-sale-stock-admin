<template>

  <div class="">
    <el-date-picker
      v-model="dateRange.from"
      type="datetime"
      placeholder="开始时间"
      :picker-options="pickerOptions"
      default-time="12:00:00"
      class="activity-edit-date el_box"
    >
    </el-date-picker>
    <span class="to">至</span>
    <el-date-picker
      v-model="dateRange.to"
      type="datetime"
      placeholder="终止时间"
      :picker-options="pickerOptions"
      default-time="12:00:00"
      class="activity-edit-date el_box"
    >
    </el-date-picker>
  </div>



</template>

<style lang="scss" scoped>
  /*.el-date-editor /deep/ .el-input__inner {*/
    /*margin-left: 0!important;*/
    /*height: 32px !important;*/
  /*}*/
  /*.pos{*/
    /*position: relative;*/
    /*span{*/
      /*position: absolute;*/
      /*font-size: 12px;*/
      /*left: 197px;*/
      /*top: 0;*/
      /*bottom: 0;*/
      /*margin: auto;*/
    /*}*/
  /*}*/
</style>

<script>
  // import dateFormat from "dateformat";

  export default {
    props: {
      inline: {
        type: Boolean,
        default: () => true
      },
      value: {
        type: String,
        default: () => "day"
      },
      workOrderList: {
        type: Boolean,
        default: () => false
      },
      clear:{
        type: Boolean,
        default: () => false
      }
    },
    model: {
      prop: "value",
      event: "change"
    },
    data() {
      return {
        activeName: null,
        dateRange: {
          from: "",
          to: ""
        },
        // selectedIndex: -1,
        // selectors: [
        //   { value: "day", text: "日" },
        //   { value: "week", text: "周" },
        //   { value: "month", text: "月" }
        // ],
        pickerOptions: {
          disabledDate(time) {
            // 今天之后的日子都不可选择
            return time.getTime() > Date.now();
          }
        }
      };
    },
    mounted() {
      // this.mapValueToSelect();
      // const a = dateFormat(Date.now(), "yyyy-mm-dd");
      // if(this.workOrderList){
      //   let newDate=(new Date()).getTime();
      //   this.dateRange.from= newDate-(24 * 60 * 60 * 1000);
      //   this.dateRange.to=newDate;
      //   this.dateChange();
      // }
      //console.log(this.clear);
      if(!this.clear){
        let newDate=(new Date()).getTime();
        this.dateRange.from=new Date(new Date().setHours(0, 0, 0, 0));
        this.dateRange.to=newDate;
        this.dateChange();
      }


    },
    watch: {
      'dateRange.from':function(){
        this.dateChange();
      },
      'dateRange.to':function(){
        this.dateChange();
      },

    },
    methods: {
      // mapValueToSelect() {
      //   const index = this.selectors.findIndex(i => i.value === this.value);
      //   if (index > -1) {
      //     this.selectedIndex = index;
      //   }
      // },
      calculateDate(rangeName) {
        const to = Date.now();
        const daySpan = 3600000 * 24;
        let span = 0;
        switch (rangeName) {
          case "day":
            span = daySpan;
            break;
          case "week":
            span = daySpan * 7;
            break;
          case "month":
            span = daySpan * 30;
            break;
        }
        const from = to - span;
        return {
          from,
          to
        };
      },
      dateChange() {
        this.$emit("dateChange", {
          from: this.AppUtils.form(this.dateRange.from),
          to: this.AppUtils.form(this.dateRange.to)
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .to{
    margin: 0 5px;
  }
</style>
