<template>
  <div
    id="welcome"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card id="echarts_categories"></el-card>
    <div id="welcome_upside">
      <el-card id="echarts_roles"></el-card>
      <el-card id="echarts_rights"></el-card>
    </div>
  </div>
</template>

<script>
import http from "./../axios/axios";
import _ from "lodash";
import Breadcrumb from "../gz/breadcrumb ";
export default {
  props: {},
  data() {
    return {
      loading: true,
      categoriesOptions: {
        title: {
          text: "商品信息",
        },
        legend: {
          top: "bottom",
          type: "scroll",
          orient: "vertical",
          right: 100,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [10, 200],
            center: ["35%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
      rolesOptions: {
        title: {
          text: "用户图表",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            color: "#137981",
            backgroundStyle: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
      },
      rightsOptions: {
        title: {
          text: "权限类别",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: [5, 140],
            center: ["40%", "50%"],
            label: {
              show: false,
            },
            data: [],
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    var categoriesChart = this.$echarts.init(
      document.getElementById("echarts_categories")
    );
    var rolesChart = this.$echarts.init(
      document.getElementById("echarts_roles")
    );
    var rightsChart = this.$echarts.init(
      document.getElementById("echarts_rights")
    );
    // 商品饼图
    http({
      url: "categories",
      method: "get",
    }).then((res) => {
      if (res.meta.status !== 200) {
        this.$message.error("加载数据失败！");
      } else {
        res.data.forEach((item) => {
          this.categoriesOptions.series[0].data.push({
            value: item.cat_id,
            name: item.cat_name,
          });
          categoriesChart.setOption(this.categoriesOptions);
        });
      }
    });
    // 用户柱状图
    http({
      url: "roles",
      method: "get",
    }).then((res) => {
      if (res.meta.status !== 200) {
        this.$message.error("加载数据失败！");
      } else {
        res.data.forEach((item) => {
          this.rolesOptions.xAxis.data.push({
            value: item.roleName,
          });
          this.rolesOptions.series[0].data.push({
            value: item.id,
          });
          rolesChart.setOption(this.rolesOptions);
        });
      }
    });
    //权限折线图
    http({
      url: "rights/list",
      method: "get",
    }).then((res) => {
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("加载数据失败！");
      } else {
        res.data.forEach((item) => {
          this.rightsOptions.series[0].data.push({
            value: item.id,
            name: item.authName,
          });
          rightsChart.setOption(this.rightsOptions);
          this.loading = false;
        });
      }
    });

    window.addEventListener("resize", function () {
      categoriesChart.resize();
      rolesChart.resize();
      rightsChart.resize();
    });
  },
  components: {
    Breadcrumb,
  },
};
</script>

<style scoped lang="less">
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  background: #fff;
  margin-top: 20px;

  #echarts_categories {
    box-sizing: border-box;
    margin-right: 1%;
    padding: 20px 10px;
    width: 100%;
    height: 500px;
  }
  #welcome_upside {
    margin-top: 5px;
    display: flex;
    align-items: center;

    #echarts_roles {
      box-sizing: border-box;
      padding: 20px 10px;
      width: 50%;
      height: 500px;
    }

    #echarts_rights {
      margin-left: 5px;
      box-sizing: border-box;
      padding: 20px 10px;
      width: 50%;
      height: 500px;
    }
  }
}
.hh {
  position: absolute;
  z-index: 3;
  margin-top: -550px;
}
</style>
