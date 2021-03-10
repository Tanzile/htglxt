<template>
  <div class="head">
    <div class="title">{{title}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {}
};
</script>

<style scoped lang="less">
.head {
  width: 100%;
  height: 60px;
  background: #373d41;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.right {
  margin-right: 20px;
}
.title {
  margin-left: 20px;
  color: #ffffff;
}
.right {
  display: flex;
  align-items: center;
}
</style>
