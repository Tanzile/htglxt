<template>
  <div>
    <Breadcrumb one="商品管理" two="商品列表"></Breadcrumb>
    <Goodstable></Goodstable>
  </div>
</template>

<script>
import Breadcrumb from "../gz/breadcrumb ";
import Goodstable from "../home_goods/goods_table.vue";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    Goodstable,
    Breadcrumb,
  },
  computed: {},
};
</script>

<style scoped lang="less">
</style>
