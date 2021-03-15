<template>
  <div>
    <Breadcrumb one="商品管理" two="商品参数"></Breadcrumb>
    <Paramstablat></Paramstablat>
  </div>
</template>

<script>
import Breadcrumb from "../gz/breadcrumb .vue";
import Paramstablat from "../home_params/params_tablat.vue";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: { Breadcrumb, Paramstablat },
  computed: {},
};
</script>

<style scoped lang="less">
</style>
