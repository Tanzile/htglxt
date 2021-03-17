<template>
  <el-container>
    <el-header class="head">
      <homeHead></homeHead>
    </el-header>
    <el-container class="h">
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main class="head2"><router-view></router-view></el-main>
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
.head{
  padding: 0;
}
.head2{
  height: 100%;
}
.h{
  height: 100%;
}
</style>
