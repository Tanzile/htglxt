<template>
  <homehead title="后台管理系统">
    <template #right>
      <div class="name">宇崎花花花</div>
      <el-button class="but">退出登录</el-button>
    </template>
  </homehead>
</template>

<script>
import homehead from "./home_head.vue";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    homehead
  },
  computed: {}
};
</script>

<style scoped>
.but {
  height: 30px;
}
.name{
  margin-right: 10px;
}
</style>
