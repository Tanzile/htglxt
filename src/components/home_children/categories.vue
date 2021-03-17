<template>
  <div>
    <Breadcrumb one="商品管理" two="商品分类"></Breadcrumb>
    <Categoriestalbal></Categoriestalbal>
  </div>
</template>

<script>
import Breadcrumb from "../gz/breadcrumb ";
import Categoriestalbal from "../home_categories/categories_talbal.vue";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: { Categoriestalbal, Breadcrumb },
  computed: {},
};
</script>

<style scoped lang="less">
</style>
