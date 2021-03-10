<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>3333</span>
      </template>
      <el-menu-item
      index="1-1"
      >333</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import http from "../../axios/axios.js";
export default {
  props: {},
  data() {
    return {};
  },
  setup(props) {
    let login = http({
      url: "/login",
      method: "post",
      data: { username: "admin", password: "123456" }
    }).then(res => {
      console.log(res);
      window.sessionStorage.setItem("token", res.data.token);
    });
    let sidebar = http({
      url: "menus",
      method: "get"
    }).then(res => {
      console.log(res);
    });

    return { login };
  },
  methods: {},
  components: {},
  computed: {}
  //   mounted() {
  //     http({
  //       url: "/login",
  //       method: "post",
  //       data: { username: "admin", password: "123456" }
  //     }).then(res => {
  //       console.log(res);
  //       window.sessionStorage.setItem("token", res.data.token);
  //     });
  //   }
};
</script>

<style scoped>
</style>
