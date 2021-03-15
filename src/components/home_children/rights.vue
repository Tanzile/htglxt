<template>
  <div id="rights">
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column type="index" label="#" width="50%"></el-table-column>
      <el-table-column prop="authName" label="权限名称" style="width:20%">
      </el-table-column>
      <el-table-column prop="path" label="路径" style="width:20%"> </el-table-column>
      <el-table-column label="权限等级" style="width:20%">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.level == 0">一级</el-tag>
          <el-tag type="success" size="small" v-else-if="scope.row.level == 1">二级</el-tag>
          <el-tag type="warning" size="small" v-else>三级</el-tag>
        </template>
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
  async mounted() {
    const { data: res } = await http({
      url: `rights/list`,
      method: "get",
    });
    this.tableData = res;
  },
};
</script>

<style scoped lang="less">
#rights {
  padding: 20px;
  border-radius: 5px;
  background: #fff;
}
</style>
