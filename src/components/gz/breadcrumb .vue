<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ one }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ two }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    one: String,
    two: String,
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
</style>
