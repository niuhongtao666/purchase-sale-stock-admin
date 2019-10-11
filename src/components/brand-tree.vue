<template>
  <div class="mask-layer">
    <div class="tree-box posCent">
      <div class="top">
        <span>请选择</span>
        <el-input
          class="el_box"
          placeholder="请输入车辆品牌"
          v-model="filterText">
        </el-input>
      </div>
      <div class="tree-content">
        <el-tree
          class="filter-tree"
          :data="brandsList"
          :props="defaultProps"
          highlight-current
          node-key="id"
          show-checkbox
          :filter-node-method="filterNode"
          @check="handleNodeClick"
          ref="tree"
        >
        </el-tree>
      </div>
      <div class="btn-box">
        <button class="btn" @click="fetchBrandNameList">确定</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "brandTree",
    props: ['carTypeJson'],
    data() {
      return {
        filterText: '',
        brandsList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checkedNodes: [],
        brandKeyList: [],
        brandNameList: [],
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      this.fetchCarBrandList().then(res => {
        if (this.carTypeJson) {
          this.$refs.tree.setCheckedKeys(this.carTypeJson);
        }
      });
    },
    methods: {
      fetchCarBrandList() {//获取车辆品牌列表
        return new Promise((resolve, reject) => {
          this.$store.dispatch('fetchCarBrandList').then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.brandsList = data.value;
              resolve();
            }
          })
        })

      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      handleNodeClick(data, node) {
        this.brandKeyList = node.checkedKeys;
        this.checkedNodes = node.checkedNodes;
      },
      recursionFun(node) {//递归赋值
        if (Array.isArray(node)) {
          return node.forEach(val => {
            this.recursionFun(val);
          });
        }
        if (this.brandNameList.indexOf(node.label) < 0 && node.label) {
          this.brandNameList.push(node.label);
        }
        node.children && this.recursionFun(node.children);
      },
      fetchBrandNameList() {
        this.recursionFun(this.checkedNodes);
        this.$emit('hiedBrandList', {brandNameList: this.brandNameList, brandKeyList: this.brandKeyList})
      },
      close() {
        this.$emit('hiedBrandList');
      }
    }
  }
</script>

<style scoped lang="scss">
  .mask-layer{
    z-index: 2000!important;
  }
  .tree-box {
    width: 300px;
    height: 510px;
    background-color: #fff;
    .top {
      height: 50px;
      font-size: 14px;
      border-bottom: $border;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      color: #4A4A4A;
    }
    .tree-content {
      height: 400px;
      overflow-y: auto;
      padding: 5px 0;
    }
    .btn-box {
      border-top: $border;
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        margin-right: 10px;
      }
    }
  }
</style>
