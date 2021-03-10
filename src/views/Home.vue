<template>
  <el-container>
    <el-header>
      <homeHead></homeHead>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import homeHead from "../components/home/home_head/homeHead.vue";
import Aside from "../components/home/sidebar/sidebar.vue";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    homeHead,
    Aside,
  },
  computed: {},
};
</script>

<style scoped lang="less">
</style>
