<template>
  <div class="echarts_div">
    <div class="echart"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "echarts_div",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    years: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value_y: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      this.$nextTick(() => {
        var chartDom = document.getElementsByClassName("echart")[0];
        console.log(chartDom);
        // debugger;
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          xAxis: {
            type: "category",
            data: this.years,
            axisLine: {
              //y轴线的颜色以及宽度
              show: true,
              lineStyle: {
                color: "#999999",
                width: 1,
                type: "solid",
              },
            },
            axisLabel: {
              //y轴文字的配置
              show: true,
              textStyle: {
                color: "#000000",
              },
            },
          },
          yAxis: {
            type: "value",
            interval: 20,
            min: 0,
            max: 100,
            axisLine: {
              //y轴线的颜色以及宽度
              show: true,
              lineStyle: {
                color: "#999999",
                width: 1,
                type: "solid",
              },
            },
          },
          grid: {
            x: "5%", //x 偏移量

            y: "7%", // y 偏移量

            width: "87%", // 宽度

            height: "60%", // 高度
            top: "26%",
          },

          series: [
            {
              data: this.value_y,
              type: "line",
              itemStyle: {
                normal: {
                  color: "#0090FF",
                  lineStyle: {
                    color: "#0090FF",
                  },
                  label: {
                    show: true,
                  },
                },
              },
              label: {
                show: true,
                normal: {
                  formatter: (p) => {
                    return `{a|${this.data[p.dataIndex].ranking}}\n{b| ${
                      p.value
                    }分}`;
                  }, //自定义样式一
                  rich: {
                    a: {
                      color: "red",
                      display: "block",
                      backgroundColor: "#0090FF",
                      color: "white",
                      width: 16,
                      height: 16,
                      borderRadius: 16,
                      align: "center",
                    },
                    b: {
                      color: "#0090FF",
                      display: "block",
                    },
                  },
                },
              },
            },
          ],
        };
        // console.log("绘画图形");
        option && myChart.setOption(option);
        window.addEventListener("resize", () => {
          //监听浏览器窗口大小
          myChart.resize();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts_div {
}
</style>