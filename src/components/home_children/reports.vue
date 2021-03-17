<template>
  <div>
    <Breadcrumb one="数据统计" two="数据列表"></Breadcrumb>
    <div
      id="reports"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div id="echarts_box"></div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../gz/breadcrumb ";
import http from "./../axios/axios";
import _ from "lodash";
export default {
  props: {},
  data() {
    return {
      loading: true,
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("echarts_box"));
    http("/reports/type/1").then((res) => {
      const result = _.merge(res.data, this.options);
      myChart.setOption(result);
      this.loading = false;
    });
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
  components: {
    Breadcrumb,
  },
};
</script>

<style scoped lang="less">
#reports {
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  margin-top: 20px;

  #echarts_box {
    width: 100%;
    height: 500px;
  }
}
</style>
