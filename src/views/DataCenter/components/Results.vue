<template>
  <div class="result">
    <div v-if="isFullscreen" class="header">
      <!-- <div class="left-btn"></div> -->
      <!-- <img
        src="@/assets/img/datacontrol@2x.png"
        alt=""
        @click="goToAllTaskView"
      /> -->
      <div class="fullscreen-title">
        <img src="@/assets/img/titlebg.png" alt="" />
        <div>INTEGELECT ELECTION</div>
      </div>
      <el-button
        type="primary"
        icon="el-icon-close"
        size="small"
        class="return-btn"
        @click="cancelFullScreen"
      ></el-button>
      <!-- <img
        src="@/assets/img/cancelfullscreen@2x.png"
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
          <div class="number-case">
            <div class="btn">
              <el-button
                type="primary"
                size="small"
                @click="toFullscreen"
                v-show="!isFullscreen"
                >Fullscreen</el-button
              >
            </div>

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
          </div>

          <div class="vote-bar">
            <div class="title">
              The election results for the candidates' votes
            </div>
            <div class="op">
              <i class="el-icon-download" />
              <i class="el-icon-full-screen" />
            </div>
            <!-- <div class="bar-row">
              <div class="bar-position">Mearsure A</div>
              <div class="bar-se"></div>
              <div class="bar-bar">
                <div
                  class="bar"
                  :style="{ width: '50%', backgroundColor: 'red' }"
                >
                  350
                </div>
                <div
                  class="bar"
                  :style="{ width: '40%', backgroundColor: 'pink' }"
                >
                  100
                </div>
              </div>
              <div class="bar-legend">
                <div class="legend-item">
                  <div class="legend-block"></div>
                  <div class="legend-word">YES</div>
                </div>
                <div class="legend-item">
                  <div class="legend-block"></div>
                  <div class="legend-word">No</div>
                </div>
              </div>
            </div> -->
            <div class="bar-row" v-for="item in barOpt" :key="item.name">
              <div class="bar-position">{{ item.name }}</div>
              <div class="bar-se"></div>
              <div class="bar-bar">
                <div
                  v-for="i in item.value"
                  :key="i.num"
                  class="bar"
                  :style="{ width: i.ratio, backgroundColor: i.color }"
                >
                  {{ i.num }}
                </div>
              </div>
              <div class="bar-legend">
                <div
                  class="legend-item"
                  v-for="j in item.legend"
                  :key="j.label"
                >
                  <div
                    class="legend-block"
                    :style="{ backgroundColor: j.color }"
                  ></div>
                  <div class="legend-word">{{ j.label }}</div>
                </div>
              </div>
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
          <div class="lists">
            <div class="list-row" v-for="item in barOpt" :key="item.name">
              <div class="list-img">
                <img src="../../../assets//img/photo.jpg" alt="" />
              </div>
              <div class="list-positon">{{ item.name }}</div>
              <div class="list-can">{{ item.legend[0].label }}</div>
              <div class="list-vote">{{ item.value[0].num }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="bottom-line"></div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import { graphic } from "echarts";
import screenfull from "screenfull";
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
              //地图区域的多边形 图形样式。
              normal: {
                opacity: 0.9,
              },
              emphasis: {
                areaColor: "#0090FF",
                opacity: 0.3,
              },
            },
            zoom: 1.1, //放大比例
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
      barOpt: [
        {
          name: "Measure A",
          value: [
            { num: 350, ratio: "78%", color: "#b5daff" },
            { num: 100, ratio: "22%", color: "#5eaeff" },
          ],
          legend: [
            { label: "Yes", color: "#b5daff" },
            { label: "No", color: "#5eaeff" },
          ],
        },
        {
          name: "Supervisor",
          value: [
            { num: 230, ratio: "51%", color: "#b5daff" },
            { num: 120, ratio: "27%", color: "#5eaeff" },
            { num: 100, ratio: "22%", color: "#158aff" },
          ],
          legend: [
            { label: "Candidate4", color: "#b5daff" },
            { label: "Candidate5", color: "#5eaeff" },
            { label: "Candidate6", color: "#158aff" },
          ],
        },
        {
          name: "Vice Mayor",
          value: [
            { num: 230, ratio: "51%", color: "#b5daff" },
            { num: 160, ratio: "36%", color: "#5eaeff" },
            { num: 60, ratio: "13%", color: "#158aff" },
          ],
          legend: [
            { label: "Candidate7", color: "#b5daff" },
            { label: "Candidate8", color: "#5eaeff" },
            { label: "Candidate9", color: "#158aff" },
          ],
        },
        {
          name: "Mayor",
          value: [
            { num: 205, ratio: "46%", color: "#b5daff" },
            { num: 155, ratio: "34%", color: "#5eaeff" },
            { num: 90, ratio: "20%", color: "#158aff" },
          ],
          legend: [
            { label: "Candidate10", color: "#b5daff" },
            { label: "Candidate11", color: "#5eaeff" },
            { label: "Candidate12", color: "#158aff" },
          ],
        },
        {
          name: "Senator",
          value: [
            { num: 211, ratio: "47%", color: "#b5daff" },
            { num: 139, ratio: "31%", color: "#5eaeff" },
            { num: 100, ratio: "22%", color: "#158aff" },
          ],
          legend: [
            { label: "Candidate13", color: "#b5daff" },
            { label: "Candidate14", color: "#5eaeff" },
            { label: "Candidate15", color: "#158aff" },
          ],
        },
      ],

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
    //全屏
    toFullscreen() {
      this.$router.push({ path: "/overviewPanel" });
      // screenfull.request(); // 全屏
      // screenfull.exit(); // 退出全屏
      // screenfull.toggle(); // 全屏切换
      // console.log(screenfull.isFullscreen); // 布尔值——当前页面是否全屏
      // screenfull.isEnabled; // 布尔值——当前浏览器是否支持全屏
      this.isFullscreen = true;
      screenfull.toggle(this.$refs.inner);
      this.mapChart.resize();
      this.barChart.resize();
      this.lineChart.resize();
    },
    //退出全屏
    cancelFullScreen() {
      if (this.$route.name == "overviewPanel") {
        this.$router.push({
          path: "/BallotCounting/DataCenter",
        });
      }
      this.isFullscreen = false;
      screenfull.exit();
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
  created() {
    console.log("this.$route", this.$route);
    let { name } = this.$route;
    if (name == "overviewPanel") {
      this.isFullscreen = true;
    }
  },
  mounted() {
    //时钟每秒变化一次
    setInterval(this.fnDate, 1000); //注意第一个参数是函数表达式，不要加（）
    //全屏
    window.addEventListener("fullscreenchange", (e) => {
      window.alert = function () {
        return false;
      };
      if (screenfull.isFullscreen) {
        this.isFullscreen = true;
      } else {
        this.isFullscreen = false;
      }
      //重绘echart图
      this.$nextTick(() => {
        this.barChart.resize();
        this.mapChart.resize();
        this.lineChart.resize();
      });
    });
    this.$nextTick(() => {
      this.drawBarChart(this.barOption);
      this.drawLineChart(this.lineOption);
      this.drawMapChart(this.mapOption);
    });
    //禁止esc
    document.onkeydown = function (evt) {
      // alert("1");
      if (evt.keyCode === 27 || evt.keyCode === 122) {
        evt.preventDefault();
        return false;
      }
      if (evt.key === "Escape") {
        evt.preventDefault();
        this.$router.push({
          path: "/BallotCounting/DataCenter",
        });
      }
    };
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
  position: relative;
  // height: calc(100% - 40px);
  .header {
    height: 140px;
    width: 100%;
    position: relative;
  }
  .return-btn {
    position: absolute;
    right: 2%;
    top: 15%;
    cursor: pointer;
  }
  .left-btn {
    position: absolute;
    left: 2%;
    top: 15%;
    padding: 4px 15px;
    background-color: #375788;
    font-size: 18px;
    color: #0e213e;
    text-align: center;
    line-height: 1; //根据该元素本身的字体大小 设置行高
    display: inline-block;
    cursor: pointer;
    min-width: 80px;
    height: 40px;
    width: 160px;
    transform: skew(50deg);
    &:hover {
      filter: alpha(Opacity=70);
      opacity: 0.7;
    }
  }
  .fullscreen-title {
    position: relative;
    img {
      // text-align: center;
      display: block;
      margin: 0 auto;
      height: 85px;
      opacity: 0.85;
    }
    div {
      font-size: 47px;
      // color: #f0f0f0;
      color: #fff;
      line-height: 80px;
      // margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    // background-image: url(~@/assets/img/titlebg.png);
    // zoom: 1;
    // opacity: 0.5;
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: contain;
    // text-align: center;
  }
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
        // height: 100%;
        border: 1px solid #d4d4d7;
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

        .number-case {
          height: 20%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 20px;
          .number {
            display: flex;
            justify-content: flex-end;
          }
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
          padding: 40px 20px;

          .bar-row {
            width: 100%;
            height: 40px;
            display: flex;
            // border: #0090ff 1px solid;
            // margin-bottom: 10px;
            .bar-position {
              width: 120px;
              height: 40px;
              line-height: 40px;
              text-align: right;
            }
            .bar-se {
              width: 4px;
              height: 100%;
              border-top: 1px solid #d4d4d7;
              border-right: 1px solid #d4d4d7;
              border-bottom: 1px solid #d4d4d7;
              margin-left: 20px;
            }
            .bar-bar {
              // width: calc(100% - 82px);
              width: 500px;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-left: 20px;
              .bar {
                height: 25px;
                text-align: center;
                line-height: 25px;
              }
            }
            .bar-legend {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-left: 20px;

              .legend-item {
                width: 120px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-right: 20px;
                .legend-block {
                  width: 22px;
                  height: 15px;
                  background-color: red;
                  border-radius: 3px;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
    .bottom {
      height: calc(60% - 20px);
      // border: 1px solid #d4d4d7;
      display: flex;
      .bottom-left-case {
        width: 60%;
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
        height: 100%;
        width: 40%;
        border: 1px solid #d4d4d7;
        position: relative;
        padding-top: 40px;
        .lists {
          height: 100%;
        }
        .list-row {
          height: 17%;
          display: flex;
          align-items: center;
          background-color: #f0f0f0;
          margin: 10px;
          // border: 1px springgreen solid;
          .list-img {
            height: 100%;
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 50px;
            }
          }
          .list-positon {
            width: 150px;
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 16px;
            // font-weight: 900;
            // color: #0090ff;
          }
          .list-can {
            height: 100%;
            width: 200px;
            display: flex;
            align-items: center;
            font-size: 16px;
            // font-weight: 900;
            // color: #0090ff;
          }
          .list-vote {
            height: 100%;
            width: 140px;
            display: flex;
            align-items: center;
            font-size: 16px;
            // font-weight: 900;
            // color: #0090ff;
          }
        }
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
  .bottom-line {
    height: 5px;
    width: 100%;
    border-bottom: 2px solid 375788;
  }
}
</style>
