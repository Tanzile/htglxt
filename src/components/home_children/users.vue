<template>
  <div>
    <Breadcrumb one="用户管理" two="用户列表"></Breadcrumb>
    <Userstable></Userstable>
  </div>
</template>

<script>
import Breadcrumb from "../gz/breadcrumb ";
import Userstable from "../home_users/users_table";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    Breadcrumb,
    Userstable
  },
  computed: {},
};
</script>

<style scoped lang="less">
</style>
