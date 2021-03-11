<template>
  <div id="roles">
    <el-table :data="tableData" style="width: 90%">
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作" prop="handle">
        <el-button>
          编辑
        </el-button>
        <el-button>
          删除
        </el-button>
        <el-button>
          分配权限
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "./../axios/axios";
export default {
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {},
  components: {},
  computed: {},
  mounted(){
    http("/roles").then(res=>{
      this.tableData = res.data
    })
  }
};
</script>

<style lang="less">
#roles {
  width: 100%;

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table td, .el-table th.is-leaf{
    border: 1px solid #ebeef5;
  }
  .el-table tr:nth-of-type(2n){
    background: #F5F7FA;
  }
}
</style>
