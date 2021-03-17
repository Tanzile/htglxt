<template>
  <homehead title="后台管理系统">
    <template #right>
      <div class="name">{{ names }}</div>
      <el-button class="but" @click="tc">退出登录</el-button>
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
  methods: {
    tc() {
      window.sessionStorage.setItem("token", "");
      this.$router.replace("/");
    },
  },
  components: {
    homehead,
  },
  computed: {
    names() {
      return window.sessionStorage.getItem("username");
    },
  },
};
</script>

<style scoped>
.but {
  height: 30px;
}
.name {
  margin-right: 10px;
}
.tt {
  margin-bottom: 10px;
}
</style>
