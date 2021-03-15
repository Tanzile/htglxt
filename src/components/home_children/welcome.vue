<template>
  <div id="welcome">
    <el-card id="echarts_user"></el-card>
    <el-card id="echarts_goods"></el-card>
  </div>
</template>

<script>
import http from "./../axios/axios";
import _ from "lodash";
export default {
  props: {},
  data() {
    return {
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
    var userChart = this.$echarts.init(document.getElementById("echarts_user"));
    var goodsChart = this.$echarts.init(
      document.getElementById("echarts_goods")
    );
    http("/reports/type/1").then((res) => {
      if (res.meta.status !== 200) {
        this.$message.error("加载数据失败！");
      } else {
        const result = _.merge(res.data, this.options);
        userChart.setOption(result);
        goodsChart.setOption(result);
        this.$message.success("加载数据成功！");
      }
    });
    window.addEventListener("resize", function () {
      userChart.resize();
      goodsChart.resize();
    });
  },
};
</script>

<style scoped lang="less">
#welcome {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background: #fff;

  #echarts_user {
    box-sizing: border-box;
    margin-right: 1%;
    padding:20px 10px;
    width: 50%;
    height: 500px;
  }

  #echarts_goods {
    box-sizing: border-box;
    padding:20px 10px;
    width: 50%;
    height: 500px;
  }
}
</style>
