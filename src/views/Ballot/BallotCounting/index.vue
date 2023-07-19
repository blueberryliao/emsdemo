<template>
  <div class="ballot-counting">
    <div class="header">
      <div class="search-unit">
        <el-select
          v-model="contest"
          filterable
          size="small"
          class="search-item"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="info">
          <div class="info-item">Image Name:</div>
          <div class="info-item">Image Scan Time:</div>
        </div>
        <div id="ballotCase" class="ballot-case">
          <canvas id="myCanvas" class="my-canvas"></canvas>
          <img id="myImg" class="ballot-image" :src="imgUrl" alt="" />
          <!-- <img id="test" src="../../../assets/img/ballot.jpg" /> -->
        </div>
        <div class="btn">
          <div class="btn-left">
            <el-button type="primary" size="small">Submit</el-button>
          </div>
          <div class="btn-right">
            <el-button-group>
              <el-button icon="el-icon-arrow-left" size="small"
                >Previous</el-button
              >
              <el-button type="primary" size="small"
                >Next<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="info">
          <div class="info-item">Scanned by Device:</div>
          <div class="info-item">Precinct ID:</div>
        </div>
        <div class="contest-case">
          <div class="contest-header">
            <div class="contest">Contest</div>
            <div class="contest-btn">
              <el-button-group>
                <el-button icon="el-icon-arrow-left" size="small"
                  >Previous</el-button
                >
                <el-button type="primary" size="small"
                  >Next<i class="el-icon-arrow-right el-icon--right"></i
                ></el-button>
              </el-button-group>
            </div>
          </div>
          <div class="contest-content">
            <div class="content-title">State Representative Pos. 2</div>
            <div class="content-subtitle">Vote for One</div>
            <div class="contst-opt">
              <el-radio-group v-model="radio">
                <div>
                  <el-radio :label="3" class="opt-item"
                    >Teri Hichel (Prefer Republicaton Party)</el-radio
                  >
                </div>
                <div>
                  <el-radio :label="6" class="opt-item"
                    >Carol Gregory (Prefer Democratic Party)</el-radio
                  >
                </div>
                <div>
                  <el-radio :label="9" class="opt-item">Write-in</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
          <div class="contest-bottom">
            <el-button size="small">Back</el-button>
            <el-button type="primary" size="small">Save</el-button>
          </div>
        </div>
        <div class="detaile-case">
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content red">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content red">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>

          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content red">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content green">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content green">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
        </div>
        <div class="bottom">6 ballots remain to be adjudicated</div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/img/ballot.jpg";
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      contest: 1,
      typeOptions: [
        { label: "all", value: "" },
        {
          label: "Sample Election",
          value: 1,
        },
        {
          label: "President",
          value: 2,
        },
        {
          label: "Senator",
          value: 3,
        },
      ],
      radio: 3,
      // imgUrl: "../../../assets/img/ballot.jpg",
    };
  },
  //   computed: {
  //     //计算属性
  //     example: "",
  //     mainTabs: {
  //       get() {
  //         return this.$store.state.common.mainTabs;
  //       },
  //       set(val) {
  //         this.$store.commit("common/updateMainTabs", val);
  //       },
  //     },
  //   },
  //   watch: {
  //     //观察
  //     $route: "routeHandle",
  //     keywordSearch: {
  //       handler(nv) {},
  //     },
  //   },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.pageNum = 1;
        this.getUserList();
      }, 300);
    },
    drawImage() {
      let canvasDom = document.getElementById("myCanvas");
      let pixelwidth = 1728;
      let pixelheight = 2664;
      //获取canvas区域的的视在高度
      let showheight = document.getElementById("ballotCase").scrollHeight;
      let rate = 2664 / showheight;
      let showwidth = 1728 / rate;
      console.log("showheight", showheight);
      console.log("showwidth", showwidth);

      let myCanvas = canvasDom.getContext("2d");
      console.log("myCanvas", myCanvas);

      // 如果要设置行内样式的宽高，即实际像素的宽高，设置方式为：
      canvasDom.setAttribute("width", pixelwidth);
      canvasDom.setAttribute("height", pixelheight);
      // canvasDom.setAttribute("width", 1728);
      // canvasDom.setAttribute("height", 2664);
      //有时也需要设置canvas的视在宽高，即实际显示的宽度和高度，设置方法为：
      canvasDom.style.setProperty("width", showwidth + "px");
      canvasDom.style.setProperty("height", showheight + "px");
      let myImg = document.getElementById("myImg");
      myImg.src = `${imgUrl}`;
      myImg.onload = function () {
        myCanvas.drawImage(myImg, 0, 0, pixelwidth, pixelheight);

        myCanvas.fillStyle = "deeppink";
        myCanvas.strokeStyle = "red";
        myCanvas.lineWidth = 5;
        myCanvas.lineJoin = "round";

        let x = 181;
        let y = 662;
        let w = 1417;
        let h = 472;

        // myCanvas.strokeRect(80, 420, 140, 60);
        myCanvas.strokeRect(x, y, w, h);
      };
    },
    drawRedBox(x, y, w, h) {
      let canvas = document.querySelector("#test");
      console.log("canvas", canvas);
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "deeppink";
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.strokeRect(x, y, w, h);
      }
    },
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      this.drawImage();
      // Code that will run only after the entire view has been rendered
      // this.drawRedBox(181, 662, 1417, 472);
      // this.drawRedBox(11, 6, 14, 47);
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.ballot-counting {
  width: 100%;
  height: 100%;
  .red {
    color: #f56c6c;
  }
  .green {
    color: #67c23a;
  }
  .header {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .search-unit {
      margin-right: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-title {
        margin-right: 5px;
      }
      .search-item {
        width: 200px;
      }
    }
  }

  .content {
    height: calc(100% - 60px);
    display: flex;
    .content-left {
      width: 55%;
      height: 100%;
      padding: 10px 20px;
      .ballot-case {
        height: calc(100% - 80px);
        width: 100%;
        border: 2px #d4d4d7 solid;
        // padding: 10px;
        // img {
        //   height: 100%;
        //   text-align: center;
        // }
        .my-canvas {
          // height: 100%;
          display: block;
          margin: 0 auto;
        }
        .ballot-image {
          height: 0;
          width: 0;
        }
      }
      .btn {
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .content-right {
      width: 45%;
      height: 100%;
      padding: 10px 20px;
      .contest-case {
        height: 350px;
        border: 2px #d4d4d7 solid;
        .contest-header {
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          border-bottom: 1px dashed #d4d4d7;
          .contest {
            color: #5a9cf8;
            font-size: 18px;
            font-weight: 900;
          }
        }
        .contest-content {
          height: calc(100% - 120px);
          overflow: auto;
          padding: 0 20px;
          .content-title {
            font-size: 16px;
            font-weight: 900;
            line-height: 30px;
            height: 30px;
          }
          .content-subtitle {
            font-size: 16px;
            padding-bottom: 10px;
          }
          .opt-item {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
          }
        }
        .contest-bottom {
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 10px;
          border-top: 1px dashed #d4d4d7;
        }
      }
      .detaile-case {
        height: calc(100% - 350px - 20px - 60px - 20px);
        border: 2px #d4d4d7 solid;
        overflow: auto;
        padding: 10px 20px;
        margin-top: 20px;
        .detail-item {
          margin-bottom: 20px;
          .detail-title {
            font-size: 18px;
            font-weight: 900;
            line-height: 30px;
            height: 30px;
            text-decoration: underline;
          }
          .detail-content {
            padding-left: 20px;
            font-size: 18px;
            line-height: 30px;
            height: 30px;
          }
        }
      }
      .bottom {
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: 900;
        text-align: right;
      }
    }
    .info {
      display: flex;
      height: 20px;
      line-height: 20px;
      margin-bottom: 10px;
      .info-item {
        margin-right: 20px;
      }
    }
  }
}
</style>
