<template>
  <div id="reports">
    <div id="echarts_box"></div>
  </div>
</template>

<script>
import http from "./../axios/axios";
import _ from "lodash"
export default {
  props: {},
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    };
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("echarts_box"));
    http("/reports/type/1").then((res) => {
      const result = _.merge(res.data,this.options)
      myChart.setOption(result);
    });
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
};
</script>

<style scoped lang="less">
#reports {
  padding: 20px;
  border-radius: 5px;
  background: #fff;

  #echarts_box {
    width: 100%;
    height: 500px;
  }
}
</style>
