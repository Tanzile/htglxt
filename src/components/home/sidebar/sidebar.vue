<template>
  <el-menu
    default-active="124"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="isrouter"
  >
    <el-submenu
      :index="item.id + '-1' + ''"
      v-for="item in list"
      :key="item.id"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        v-for="i in item.children"
        :route="{ path: '/home/' + i.path }"
        :key="i.id"
        :index="i.id + '-6' + ''"
        >{{ i.authName }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template> 

<!--
-->
<script>
import http from "../../axios/axios.js";
export default {
  props: {},
  data() {
    return {
      list: [],
      isrouter: true,
    };
  },
  methods: {},
  components: {},
  computed: {},
  mounted() {
    http({
      url: "/login",
      method: "post",
      data: { username: "admin", password: "123456" },
    }).then((res) => {
      console.log(res);
      window.sessionStorage.setItem("token", res.data.token);
    });
    http({
      url: "menus",
      method: "get",
    }).then((res) => {
      console.log(res);
      this.list = res.data;
    });
  },
};
</script>

<style scoped>
</style>
