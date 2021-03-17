<template>
  <div id="rights">
    <div class="hh">
      <Breadcrumb one="权限管理" two="权限列表"></Breadcrumb>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column type="index" label="#" width="50%"></el-table-column>
      <el-table-column prop="authName" label="权限名称" style="width: 20%">
      </el-table-column>
      <el-table-column prop="path" label="路径" style="width: 20%">
      </el-table-column>
      <el-table-column label="权限等级" style="width: 20%">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.level == 0">一级</el-tag>
          <el-tag type="success" size="small" v-else-if="scope.row.level == 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="small" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "./../axios/axios";
import Breadcrumb from "../gz/breadcrumb ";
export default {
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {},
  components: {
    Breadcrumb,
  },
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
  margin-top: 20px;
}
.hh {
  position: absolute;
  margin-top: -50px;
}
</style>
