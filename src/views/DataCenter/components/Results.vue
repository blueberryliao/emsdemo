<template>
  <div class="result">
    <div v-if="isFullscreen" class="fullscreen-title panorama-flex">
      <!-- <img
        src="@/assets/imgs/datacontrol@2x.png"
        alt=""
        @click="goToAllTaskView"
      /> -->
      <h1>INTEGELECT ELCTION</h1>
      <!-- <img
        src="@/assets/imgs/cancelfullscreen@2x.png"
        alt=""
        @click="cancelFullScreen"
      /> -->
    </div>
    <div class="inner" :class="[isFullscreen ? 'inner-line-fullscreen' : '']">
      <div class="top">
        <div class="map">
          <div ref="mapChart" class="map-chart"></div>
          <div class="op">
            <i class="el-icon-download" />
            <i class="el-icon-full-screen" />
          </div>
        </div>
        <div class="vote-case">
          <div class="number">
            <div class="statistic-item">
              <div class="statistic-title">{{ title1 }}</div>
              <div class="statistic-content">{{ value1 }}</div>
            </div>
            <div class="statistic-item">
              <div class="statistic-title">{{ title2 }}</div>
              <div class="statistic-content">{{ value2 }}</div>
            </div>
            <div class="statistic-item">
              <div class="statistic-title">{{ title3 }}</div>
              <div class="statistic-content">{{ value3 }}</div>
            </div>
            <div class="statistic-item">
              <div class="statistic-title">{{ title4 }}</div>
              <div class="statistic-content">{{ value4 }}</div>
            </div>
          </div>
          <div class="vote-bar">
            <div class="title">
              The election results for the candidates' votes
            </div>
            <div class="op">
              <i class="el-icon-download" />
              <i class="el-icon-full-screen" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left-case">
          <div class="bottom-left-top">
            <div ref="barChart" class="bar-chart"></div>
            <div class="title">Votes tallied per period</div>
          </div>
          <div class="bottom-left-bottom">
            <div ref="lineChart" class="line-chart"></div>
            <div class="title">Voter participation per period</div>
          </div>
          <div class="op">
            <i class="el-icon-download" />
            <i class="el-icon-full-screen" />
          </div>
        </div>
        <div class="bottom-right-case">
          <div class="title">List of elected candidates</div>
          <div class="op">
            <i class="el-icon-download" />
            <i class="el-icon-full-screen" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { graphic } from "echarts";
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  props: {
    toRender: {
      default: false,
    },
  },
  data() {
    return {
      isFullscreen: false,
      //数据区域
      value1: 1500,
      value2: 450,
      value3: 450,
      value4: "30%",
      title1: "Registered",
      title2: "Verified",
      title3: "Voted",
      title4: "Turnout",
      //地图区域
      mapChart: null, //echart地图对象
      mapOption: {
        toolbox: {
          show: false,
        },
        visualMap: {
          left: "left",
          min: 0,
          max: 50,
          inRange: {
            color: ["#e6f7ff", "#1890FF", "#0050b3"],
          },
        },
        series: [
          {
            name: "map",
            type: "map",
            roam: true,
            map: "map",
            emphasis: {
              label: {
                show: true,
              },
            },
            itemStyle: {
              //   //地图区域的多边形 图形样式。
              normal: {
                //     borderWidth: 1, //区域边框宽度
                //     borderColor: "#0090FF", //区域边框颜色
                //     areaColor: "#B5DAFF", //区域颜色
                opacity: 0.9,
              },
              emphasis: {
                areaColor: "#0090FF",
                opacity: 0.3,
              },
            },
            zoom: 1.1, //放大比例
            // aspectScale: 1 //长宽比
            //设置默认显示区域
            data: [
              {
                name: "Hannover",
                value: 300,
              },
              { name: "Kassel", value: 40 },
              { name: "Berlin", value: 11 },
              { name: "München", value: 38 },
              { name: "Frankfurt", value: 28 },
              { name: "Hamburg", value: 20 },
              { name: "Köln", value: 10 },
              { name: "Stuttgart", value: 30 },
              { name: "Düsseldorf", value: 15 },
              { name: "Brandenburg", value: 27 },
              { name: "Sachsen", value: 29 },
              { name: "Bayern", value: 8 },
              { name: "Hessen", value: 18 },
              { name: "Niedersachsen", value: 15 },
              { name: "Bremen", value: 40 },
              { name: "Saarland", value: 30 },
              { name: "Thüringen", value: 19 },
              { name: "Sachsen-Anhalt", value: 48 },
              { name: "Rheinland-Pfalz", value: 26 },
              { name: "Nordrhein-Westfalen", value: 20 },
            ],
          },
          1,
        ],
      },
      //右上区域

      //左下区域
      barChart: null,
      barOption: {
        xAxis: {
          type: "category",
          data: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
          ],
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["Votes"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "Votes",
            data: [0, 11, 120, 136, 160, 210, 230, 281, 320, 260, 450],
            itemStyle: {
              normal: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#0090FF" },
                  { offset: 0, color: "#4BCBEB" },
                ]),
                label: {
                  show: true,
                  position: "top",
                  // formatter: "{b}\n{c}%",
                  // formatter: "{b}",
                },
              },
            },
            type: "bar",
          },
        ],
      },
      lineChart: null,
      lineOption: {
        xAxis: {
          type: "category",
          data: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
          ],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            interval: "auto",
            formatter: "{value} %",
          },
          show: true,
        },
        legend: {
          data: ["Votes"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",

          containLabel: true,
        },
        series: [
          {
            name: "Votes",
            data: [0, 1, 9.1, 9.5, 10.1, 12, 13.5, 15.6, 21, 25, 30],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  // formatter: "{b}\n{c}%",
                  formatter: "{c}%",
                },
              },
            },
            lineStyle: {
              color: "#0090FF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(54,228,255,0)",
                },
                {
                  offset: 1,
                  color: "#0090FF",
                },
              ]),
              opacity: 0.3,
            },
            type: "line",
            smooth: true,
          },
        ],
      },

      //右下区域
    };
  },
  methods: {
    //js 获取当前时间
    fnDate() {
      let date = new Date();
      let year = date.getFullYear(); //当前年份
      let month = date.getMonth(); //当前月份
      let data = date.getDate(); //天
      let hours = date.getHours(); //小时
      let minute = date.getMinutes(); //分
      let second = date.getSeconds(); //秒
      let day = date.getDay(); //星期
      let weeks = new Array("Sun", "Mon", "Tue", "Thu", "Wed", "Fri", "Sat");
      let week = weeks[day];
      this.currentTime =
        year +
        "-" +
        this.fnW(month + 1) +
        "-" +
        this.fnW(data) +
        " " +
        week +
        " " +
        this.fnW(hours) +
        ":" +
        this.fnW(minute) +
        ":" +
        this.fnW(second);
    },
    //补位 当某个时间字段不是两位数时补0å
    fnW(str) {
      var num;
      str >= 10 ? (num = str) : (num = "0" + str);
      return num;
    },
    //全屏
    toFullscreen() {
      // this.$router.push({ path: '/overviewPanel' });
      // screenfull.request(); // 全屏
      // screenfull.exit(); // 退出全屏
      // screenfull.toggle(); // 全屏切换
      // screenfull.isFullscreen; // 布尔值——当前页面是否全屏
      // screenfull.isEnabled; // 布尔值——当前浏览器是否支持全屏
      this.isFullscreen = true;
      screenfull.toggle(this.$refs.inner);
    },
    //退出全屏
    cancelFullScreen() {
      if (this.$route.query.isFullscreen == "true") {
        this.$router.push({
          path: "/pageMenu",
        });
      }
      screenfull.exit();
    },
    drawMapChart(opt) {
      console.log(opt);
      //注册地图
      //注意require变量动态赋值的用法
      let mapJson = require(`../map/de.geo.json`);
      echarts.registerMap("map", mapJson);
      // 基于准备好的dom，初始化echarts实例 配置离线地图
      this.mapChart = echarts.init(this.$refs.mapChart);
      console.log("this.mapChart", this.mapChart);
      // 绘制图表
      this.mapChart.setOption(opt);
      this.mapChart.resize();
      //添加click事件
      //.off避免地图点击事件多次触发
      this.mapChart.off("click").on("click", (result) => {
        console.log("地图点击了", result.name);
      });
    },
    drawBarChart(opt) {
      this.barChart = echarts.init(this.$refs.barChart);
      // 绘制图表
      this.barChart.setOption(opt);
      this.barChart.resize();
    },
    drawLineChart(opt) {
      this.lineChart = echarts.init(this.$refs.lineChart);
      // 绘制图表
      this.lineChart.setOption(opt);
      this.lineChart.resize();
    },
  },
  watch: {
    toRender(newV) {
      console.log("newV", newV);
      this.mapChart.resize();
      this.barChart.resize();
      this.lineChart.resize();
    },
  },
  created() {},
  mounted() {
    //时钟每秒变化一次
    setInterval(this.fnDate, 1000); //注意第一个参数是函数表达式，不要加（）
    //全屏
    window.addEventListener("fullscreenchange", (e) => {
      if (screenfull.isFullscreen) {
        // console.log("screenfull.isFullscreen", screenfull.isFullscreen);
        this.isFullscreen = true;
      } else {
        // console.log("screenfull.isFullscreen", screenfull.isFullscreen);
        this.isFullscreen = false;
      }
      //重绘echart图
      this.$nextTick(() => {
        this.barChart.resize();
        this.mapChart.resize();
      });
    });
    this.drawMapChart(this.mapOption);
    this.drawBarChart(this.barOption);
    this.drawLineChart(this.lineOption);
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.result {
  width: 100%;
  height: 100%;
  // height: calc(100% - 40px);
  .inner {
    width: 100%;
    height: 100%;
    // background-color: #0f2443;
    .top {
      height: 40%;
      margin-bottom: 20px;
      // border: 1px solid #d4d4d7;
      display: flex;
      .map {
        width: 30%;
        height: 100%;
        border: 1px solid #d4d4d7;
        // width: 30%;
        // height: 70%;
        position: relative;
        .map-chart {
          width: 100%;
          height: 100%;
        }
      }
      .vote-case {
        width: 70%;
        height: 100%;
        // border: 1px solid #d4d4d7;
        .number {
          height: 20%;
          display: flex;
          justify-content: flex-end;
          .statistic-item {
            height: 100%;
            width: 100px;
            .statistic-title {
              left: 30px;
              height: 30px;
              font-size: 16px;
              font-weight: 900;
              color: #333;
            }
            .statistic-content {
              left: 50px;
              height: 50px;
              font-size: 24px;
              font-weight: 900;
              color: #0090ff;
            }
          }
        }
        .vote-bar {
          height: 80%;
          border: 1px solid #d4d4d7;
          margin-left: 20px;
          position: relative;
        }
      }
    }
    .bottom {
      height: calc(60% - 20px);
      // border: 1px solid #d4d4d7;
      display: flex;
      .bottom-left-case {
        width: 53%;
        border: 1px solid #d4d4d7;
        margin-right: 20px;
        position: relative;
        .bottom-left-top,
        .bottom-left-bottom {
          height: calc(50% - 10px);
          margin-top: 10px;
          width: 100%;
          position: relative;
          // padding: 20px;
        }
        .bar-chart,
        .line-chart {
          height: 100%;
          width: 100%;
          // border: 1px solid #d4d4d7;
        }
      }
      .bottom-right-case {
        width: 47%;
        border: 1px solid #d4d4d7;
        position: relative;
      }
    }
    .title {
      position: absolute;
      left: 10px;
      top: 10px;
      height: 30px;
      font-weight: 900;
      color: #333;
      font-size: 16px;
      // width: 100px;
      // border: 1px solid #d4d4d7;
    }
    .op {
      position: absolute;
      right: 10px;
      top: 10px;
      height: 30px;
      // width: 100px;
      // border: 1px solid #d4d4d7;
      font-size: 16px;
      i {
        margin-right: 10px;
        color: #0090ff;
      }
    }
  }
}
</style>
