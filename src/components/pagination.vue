<template>
  <div class="page_wrap">
    <!--<el-pagination-->
      <!--:background="true"-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="pageInfo.currentPage"-->
      <!--:page-sizes="[10, 20, 50, 100]"-->
      <!--:page-size="pageInfo.pageSize"-->
      <!--layout="total, sizes, prev, pager, next"-->
      <!--:total="pageInfo.total">-->
    <!--</el-pagination>-->
    <el-pagination
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[20, 50,100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pageInfo.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: "pagination",
    data() {
      return {
        model: {
          page: 1,
          pageSize: 20
        },
        pageInfo: {
          total: 0,//总共条数
          currentPage: 1,//当前页
          pageSize: 20//每页显示条数
        }
      };
    },
    methods: {
      handleSizeChange(val) {
        this.model.pageSize = val;
        this.switchPage(this.model)
      },
      handleCurrentChange(val) {
        this.model.page = val;
        this.switchPage(this.model)

      }
      ,
      switchPage(data) {
        this.$emit("fetchData", data)
      },
      initPage(total, currentPage, pageSize) {
        this.pageInfo.total = total;
        this.pageInfo.currentPage = currentPage;
        this.pageInfo.pageSize = pageSize;
      }
    },

  }
</script>

<style scoped lang="scss">
  .page_wrap {
    padding-top: 10px;
    position: relative;

  }

  .el-pagination {
    display: flex;
    font-size: 14px!important;
    justify-content: flex-end;
    font-weight: normal;
    /deep/ .el-pagination__total {
      position: absolute;
      left: 120px;
      top: 3px;
      bottom: 0;
      margin: auto 0;
    }
    /deep/ .el-pagination__sizes {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }

  }
</style>
