<template>
  <div id="box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
html,
body {
  width: 100%;
  height: 100%;
  #box {
    width: 100%;
    height: 100%;
    background: #eaedf1;
  }
}
</style>
