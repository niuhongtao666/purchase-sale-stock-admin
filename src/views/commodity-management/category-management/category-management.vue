<template>
  <div class="main_wrap">
    <div >
      <div class="choose">选择配件</div>
      <div class="zone">
        <div class="custom-tree-container">
          <div class="block">
            <!--<el-tree-->
            <!--:data="dataList"-->
            <!--node-key="id"-->
            <!--default-expand-all-->
            <!--:expand-on-click-node="false">-->
            <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
            <!--<span>{{ node.label }}</span>-->

            <!--</span>-->
            <!--</el-tree>-->
            <!--<el-tree-->
            <!--class="filter-tree"-->
            <!--:data="dataList"-->
            <!--:props="defaultProps"-->
            <!--highlight-current-->
            <!--default-expanded-keys-->
            <!--node-key="id"-->
            <!--ref="tree"-->
            <!--&gt;-->
            <!--</el-tree>-->
            <el-tree
              :data="dataList"
              :props="defaultProps"
              accordion
              node-key="id"
              highlight-current
              :default-expanded-keys="defaultExpandedArr"
              @node-click="handleNodeClick"
              ref="tree">
            </el-tree>
          </div>
        </div>
        <div class="editZone">
          <form action="" class="addform">
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>类别编码</p>
              </div>
              <div class="form_right w302  ">
                <!--<div class="el_box ml16-wi299 line-height32">{{items.classCode}}</div>-->
                <input placeholder="请输入类别编码" :class="['el_box','w288',  canEdit?'':'is-disabled']" :disabled="!canEdit"
                       v-model="items.classCode">
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>类别名称</p>
              </div>
              <div class="form_right">
                <input class="el_box w288" placeholder="请输入类别名称" v-model="items.className">
              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>一级分类</p>
              </div>
              <div class="form_right w302">
                <!--<input type="text">-->
                <input class="el_box w288 is-disabled" disabled v-model="items.className1">

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p>二级分类</p>
              </div>
              <div class="form_right w302">
                <!--<input type="text">-->
                <input class="el_box w288 is-disabled" disabled v-model="items.className2">

              </div>
            </div>
            <div class="form_item">
              <div class="form_left">
                <p><span class="required">*</span>状态</p>
              </div>
              <div class="form_right w302">
                <el-select v-model="items.enabled" class="el_box ml16-wi299" placeholder="请选择">
                  <el-option
                    v-for="item in enabledList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                    @node-click="handleNodeClick">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form_item mtp10">
              <button class="serachBtn" type="button"  v-if="!canEdit&&buttonInfo.save" @click="create">{{buttonInfo.save}}</button>
              <button class="serachBtn" v-if="createChdBtnShow&&!canEdit&&buttonInfo.save" type="button" @click="createChild">新增子类</button>
              <button class="serachBtn" v-if="buttonInfo.update||(buttonInfo.save&&this.canEdit)" type="button" @click="save">保存</button>
              <button class="serachBtn" v-if="canDel&&!canEdit&&buttonInfo.delete" type="button" @click="del">{{buttonInfo.delete}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'category-management',
    data() {

      return {
        dataList: [],
        defaultExpandedArr:[4770],//默认展开key集合
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        createChdBtnShow: true,//是否可以新增子类
        canDel: false,//是否可以删除分类
        canEdit: true,
        currentLevel: 1,//当前等级
        items: {
          classCode:null,
          className: null,
          classId1: null,
          className1: null,//一级分类
          classId2: null,
          className2: null,//二级分类
          classId3: null,
          className3: null,//三级分类
          enabled: 1,
        },

        enabledList: [
          {
            value: 1,
            text: '启用'
          },
          {
            value: 0,
            text: '停用'
          }
        ],
      }
    },
    watch: {
      'items.className'(val) {
        this.items['className' + this.currentLevel] = val;
      }
    },
    computed: {
      buttonInfo() {
        return this.AppUtils.returnPermissions(8);
      },

    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.$axios.get('/admin/goods/classInfo/list/tree', this.model).then(res => {
          let data = this.AppUtils.checkResponse(res);
          ////console.log(data);
          if (data) {
            this.dataList = data.value;
          }
        })
      },
      handleNodeClick() {
        this.canEdit = false;
        let node = this.$refs.tree.currentNode.node;
        ////console.log(node);
        this.currentLevel = node.level;
        node.level === 3 ? this.createChdBtnShow = false : this.createChdBtnShow = true;//假如是三级分类 不可以添加子分类
        node.childNodes.length ? this.canDel = false : this.canDel = true;//有子分类 隐藏删除按钮
        this.items.className = node.data.name;
        this.items.classCode = node.data.code;
        this.items.enabled = node.data.enabled;
        this.items.className1 = null;
        this.items.classId1 = null;
        this.items.className2 = null;
        this.items.classId2 = null;
        this.items.className3 = null;
        this.items.classId3 = null;
        this.defaultExpandedArr=[];
        this.recursionFun(node);
      },
      recursionFun(node) {//递归赋值
         if(node.key){
          this.defaultExpandedArr.push(node.key);
        }
        this.items['className' + node.level] = node.data.name;
        this.items['classId' + node.level] = node.data.id;
        if (node.level <= 1) return false;
        return this.recursionFun(node.parent);//当前类别的等级大于1的时候 递归获取父级信息
      },
      create() {//新增
        this.canEdit = true;
        if (this.createChdBtnShow) {//假如不是新增三级分类  新增二级分类 清空二级分类 新增一级分类 清空一级分类
          if (this.items.className2) {
            this.items.className2 = null;
          } else {
            this.items.className1 = null;
          }
        }
        this.initData();
      },
      createChild() {//新增子类
        this.canEdit = true;
        this.currentLevel += 1;
        this.initData();
      },
      save() {
        if (this.canEdit) {//新增
          this.add();
        } else {//修改
          this.edit();
        }

      },
      add() {//新增分类
        let model= {
          classLevel: this.currentLevel,
          className: this.items.className,
          parentId: this.items['classId' +(this.currentLevel-1)],
          classCode: this.items.classCode,
          enabled: this.items.enabled,
        };
        if(!model.classCode){
          return this.$message.error('类别编码不能为空');
        }

        if(!model.className){
          return this.$message.error('类别名称不能为空');
        }

        if(model.enabled===null||model.enabled===''){
          return this.$message.error('请选择状态');
        }
        this.AppUtils.confirm('是否确定新增分类', () => {
          this.$axios.post('/admin/goods/classInfo/add',model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('新增成功');
              this.fetchData();
            }
          })
        })
      },
      edit() {//修改分类
        let model={
          className: this.items.className,
          enabled: this.items.enabled,
          id: this.items['classId' + this.currentLevel],
        };
        if(!model.className){
          return this.$message.error('类别名称不能为空');
        }
        if(!model.id){
          return this.$message.error('id不能为空');
        }
        if(model.enabled===null||model.enabled===''){
          return this.$message.error('请选择状态');
        }
        this.AppUtils.confirm('是否确定保存当前修改', () => {
          this.$axios.post('/admin/goods/classInfo/update',model).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('修改成功');
              this.fetchData();
            }
          })
        })
      },
      initData() {//
        this.items.className = null;
        this.items.classCode = null;
        this.items.enabled = 1;
      },
      del() {//删除
        if (!this.canDel) {
          return this.AppUtils.alert('该类别下存在商品,不允许删除');
        }
        this.AppUtils.confirm('是否确定删除该类别', () => {
          this.$axios.post(`/admin/goods/classInfo/delete/${this.items['classId'+this.currentLevel]}`).then(res => {
            let data = this.AppUtils.checkResponse(res);
            if (data) {
              this.$message.success('删除成功');
              this.fetchData();
             }
          });
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/cover.css';
  .zone{
    display: flex;
    background-color: #fff;
    min-height: 651px;
    box-sizing: border-box;
    padding: 20px 0 20px 10px;
  }
  .choose{
    height: 48px;
    text-align: left;
    line-height: 48px;
    color: #00BAFF;
    box-sizing: border-box;
    padding-left: 10px;
    border-bottom: 0.5px solid #ecf1f4;
    background: #fff;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .custom-tree-container {
    width: 200px;
    float: left;
    min-height: 400px;
    /*padding: 10px;*/
    /*background-color: #fff;*/
  }

  .editZone {
    width: 50%;
    min-height: 400px;
    float: left;
    /*background: #fff;*/
    box-sizing: border-box;
    padding-top: 50px;
  }
</style>
