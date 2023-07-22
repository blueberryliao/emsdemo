<!-- @format -->

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
          <div class="info-item">Image Name:{{ info.imgName }}</div>
          <div class="info-item">Image Scan Time:{{ info.imgTime }}</div>
        </div>
        <div id="ballotCase" class="ballot-case">
          <canvas id="myCanvas" class="my-canvas"></canvas>
          <img id="myImg" class="ballot-image" :src="imgUrl" alt="" />
          <!-- <img id="test" src="../../../assets/img/ballot.jpg" /> -->
        </div>
        <div class="btn">
          <div class="btn-left">
            <el-button type="primary" size="small" @click="toSubmit"
              >Submit</el-button
            >
          </div>
          <div class="btn-right">
            <el-button-group>
              <!-- <el-button icon="el-icon-arrow-left" size="small"
                >Previous</el-button
              > -->
              <el-button type="primary" size="small" @click="nextBallot"
                >Next<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="info">
          <div class="info-item">Scanned by Device:{{ info.deviceType }}</div>
          <div class="info-item">Precinct ID:{{ info.precinctId }}</div>
        </div>
        <div class="contest-case">
          <div class="contest-header">
            <div class="contest">Contest</div>
            <div class="contest-btn">
              <el-button-group>
                <!-- <el-button
                  icon="el-icon-arrow-left"
                  size="small"
                  @click="handleContestPrevious"
                  :disabled="currenIndex == 0"
                  >Previous</el-button
                > -->
                <el-button
                  type="primary"
                  size="small"
                  @click="handleContestNext"
                  :disabled="
                    currenIndex == adjudicatorList.length - 1 ||
                    currentContest == null
                  "
                  >Next<i class="el-icon-arrow-right el-icon--right"></i
                ></el-button>
              </el-button-group>
            </div>
          </div>
          <div class="contest-content">
            <div class="has-contest" v-if="currentContest">
              <div class="contest-title">{{ currentContest.dutiesName }}</div>
              <div class="contest-subtitle">
                Vote for {{ currentContest.numberOfCandidates }}
              </div>
              <div class="contest-opt">
                <el-checkbox-group
                  v-model="checkList"
                  @change="handleCheckboxChange"
                >
                  <div
                    v-for="item in currentContest.candidateDataList"
                    :key="item.id"
                  >
                    <el-checkbox
                      :label="item.id"
                      :checked="item.status == 'Approve'"
                      >{{ item.candidateName }}</el-checkbox
                    >
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="no-contest" v-else>
              All valid.
              <i class="el-icon-check valid green"></i>
            </div>
          </div>
          <div class="contest-bottom">
            <el-button
              size="small"
              @click="undo"
              :disabled="currentContest == null"
              >Undo</el-button
            >
            <el-button
              type="primary"
              @click="toSave"
              size="small"
              :disabled="currentContest == null"
              >Save</el-button
            >
          </div>
        </div>
        <div class="detaile-case">
          <div
            class="detail-item"
            v-for="item in duties"
            :key="item.dutiesName"
          >
            <div class="detail-title">
              {{ item.dutiesName }}
            </div>
            <div
              class="details"
              v-for="i in item.candidateDataList"
              :key="i.candidateName"
            >
              <div
                class="detail-content"
                :class="{
                  red: item.status !== 'valid',
                  green: item.status == 'valid' && i.status == 'Approve',
                }"
              >
                {{ i.candidateName }}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          {{ info.count }} ballots remain to be adjudicated
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/img/ballot.jpg";
import {
  getBallotInfo,
  saveBallot,
  suspendBallot,
  saveContest,
  suspendContest,
} from "@/api/ballot";
export default {
  data() {
    return {
      info: null, //从后台获取的对象
      adjudicatorList: [], //右上框数据
      duties: null, //右下框数据
      redBlocks: [], //红框
      // count: 0,
      //contest 区域
      currentContest: null,
      currenIndex: 0,
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
      radio: "",
      checkList: [],
      //图片区域
      imgUrl: "",
      ballotCaseDom: null,
      canvasDom: null, //canvasDom 对象
      myCanvas: null, // canvas对象
      myImgDom: null,
      pixelWidth: 0, //图片实际的像素宽度
      pixelHeight: 0,
      showHeight: 0, //canvas区域的的视在高度
    };
  },
  computed: {
    //计算属性
    rate: {
      get() {
        return this.pixelHeight / this.showHeight;
      },
      set(val) {},
    },
    showWidth: {
      get() {
        return Math.round(this.pixelWidth / this.rate);
      },
    },
  },

  methods: {
    /** 选票信息更新 所有其他信息作相应更新 */
    async init() {
      this.info = null; //从后台获取的对象
      this.adjudicatorList = []; //右上框数据
      this.duties = null; //右下框数据
      this.redBlocks = [];
      this.currentContest = null;
      this.currenIndex = 0;
      this.checkList = [];
      //图片区域
      this.imgUrl = "";
      this.ballotCaseDom = null;
      this.canvasDom = null; //canvasDom 对象
      this.myCanvas = null; // canvas对象
      this.myImgDom = null;
      this.pixelWidth = 0; //图片实际的像素宽度
      this.pixelHeight = 0;
      this.showHeight = 0;
      //获取选票的实际像素尺寸
      await this.getInfo();
      // debugger;
      this.pixelWidth = this.info.maxWidth;
      this.pixelHeight = this.info.maxHeight;
      //右下区域数据
      this.duties = this.info.duties;
      //右上区域数据
      this.adjudicatorList = this.info.duties.filter((i) => {
        return i.status == "invalid";
      });
      console.log(this.adjudicatorList);
      if (this.adjudicatorList.length > 0) {
        this.currentContest = this.adjudicatorList[0];
        this.currenIndex = 0;
      }
      console.log("this.currentContest", this.currentContest);
      console.log("this.currenIndex", this.currenIndex);
      //获取红框的坐标尺寸
      this.redBlocks = [];
      if (this.adjudicatorList.length > 0) {
        this.adjudicatorList.map((i) => {
          this.redBlocks.push({
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height,
          });
        });
        console.log(this.redBlocks);
      }

      //给图片地址赋值
      this.imgUrl = `http://36.41.69.47:8899/prod-api/profile/upload${this.info.imgUrl}`;
      console.log("this.imgUrl", this.imgUrl);
      this.$nextTick(function () {
        //获取绘图相关DOM及canvas对象
        this.canvasDom = document.getElementById("myCanvas");
        this.ballotCaseDom = document.getElementById("ballotCase");
        console.log("this.ballotCaseDom", this.ballotCaseDom);
        this.myImgDom = document.getElementById("myImg");
        this.myCanvas = this.canvasDom.getContext("2d");
        //获取图片视高 不明原因，每次重绘都会增加16px 所以这里剪去16px
        this.showHeight = this.ballotCaseDom.scrollHeight - 16;
        //绘图
        this.drawImage();
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // this.pageNum = 1;
        // this.getInfo();
      }, 300);
    },
    handleCheckboxChange() {
      console.log("这是list");
      console.log(this.checkList);
      //实现单选
      // if (this.checkList.length > 1) {
      //   this.checkList.splice(0, 1);
      // }
    },
    /** 获取终端信息 */
    getInfo() {
      let query = {
        id: 1000,
      };
      return getBallotInfo().then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.data);
          this.info = res.data[0];
        }
      });
    },

    /** 绘制canvas图 */
    drawImage() {
      console.log("this.pixelWidth", this.pixelWidth);
      console.log("this.pixelHeight", this.pixelHeight);
      console.log("this.showWidth", this.showWidth);
      console.log("this.showHeight", this.showHeight);
      console.log("this.rate", this.rate);
      // 如果要设置行内样式的宽高，即实际像素的宽高，设置方式为：
      this.canvasDom.setAttribute("width", this.pixelWidth);
      this.canvasDom.setAttribute("height", this.pixelHeight);
      //有时也需要设置canvas的视在宽高，即实际显示的宽度和高度，设置方法为：
      this.canvasDom.style.setProperty("width", this.showWidth + "px");
      this.canvasDom.style.setProperty("height", this.showHeight + "px");
      //绘制底图
      this.myImgDom.onload = () => {
        this.myCanvas.drawImage(
          this.myImgDom,
          0,
          0,
          this.pixelWidth,
          this.pixelHeight
        );
        console.log("this.myCanvas", this.myCanvas);
        //只画第一个红框
        // this.redBlocks.forEach((element) => {
        this.drawRedBox(
          this.redBlocks[0].x,
          this.redBlocks[0].y,
          this.redBlocks[0].width,
          this.redBlocks[0].height
        );
        // });
        // this.myCanvas.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
        console.log("this.myCanvas", this.myCanvas);
      };
    },
    drawRedBox(x, y, w, h) {
      this.myCanvas.strokeStyle = "red";
      this.myCanvas.lineWidth = 5;
      this.myCanvas.lineJoin = "round";
      this.myCanvas.strokeRect(x, y, w, h);
    },
    handleContestPrevious() {
      if (this.currenIndex == 0) return;
      this.currenIndex--;
      console.log("this.currenIndex", this.currenIndex);
      this.checkList = [];
      this.currentContest = null;
      this.currentContest = this.adjudicatorList[this.currenIndex];
      // this.currentContest.candidateDataList.filter((i) => {
      //   if (i.status == "Approve") this.checkList.push(i.id);
      // });
      console.log("this.checkList", this.checkList);
      // this.$forceUpdate();
    },
    handleContestNext() {
      if (this.currenIndex == this.adjudicatorList.length - 1) return;
      this.currenIndex++;
      // console.log("this.currenIndex", this.currenIndex);
      // this.checkList = [];
      // this.currentContest = null;
      // this.currentContest = this.adjudicatorList[this.currenIndex];
      // console.log("this.checkList", this.checkList);
      let data = {
        id: this.currentContest.id,
      };
      suspendContest(data).then((res) => {
        console.log("res", res);
        if (res.code == "200") {
          //重新获取数据
          this.init();
        }
      });
    },
    /** 还原操作 */
    undo() {
      console.log("this.currentContest", this.currentContest);
      this.checkList = [];
      this.currentContest = null;
      this.currentContest = this.adjudicatorList[this.currenIndex];
      this.currentContest.candidateDataList.filter((i) => {
        if (i.status == "Approve") this.checkList.push(i.id);
      });
      console.log("this.checkList", this.checkList);
    },
    /** 保存验证操作 */
    toSave() {
      //判断勾选数量  n个只能选小于n个
      if (this.currentContest.numberOfCandidates < this.checkList.length) {
        this.currentContest.numberOfCandidates == 1
          ? this.$message.error(`Maximum of 1 candidate`)
          : this.$message.error(
              `Maximum of ${this.currentContest.numberOfCandidates} candidates`
            );
        return;
      }
      let data = {
        dutiesId: this.currentContest.id,
        candidateDataId: this.checkList,
      };
      saveContest(data).then((res) => {
        console.log("res", res);
        if (res.code == "200") {
          //重新获取数据
          this.init();
        }
      });
    },
    /** 提交选票操作 */
    toSubmit() {
      let data = {
        id: this.info.id,
      };
      saveBallot(data).then((res) => {
        console.log("res", res);
        if (res.code == "200") {
          //先清空canvas
          // this.myCanvas.delete("all");
          // this.myCanvas = null;
          this.myCanvas.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
          this.myCanvas.width = this.myCanvas.width;
          this.myCanvas.height = this.myCanvas.height;
          this.init();
        }
      });
    },

    nextBallot() {
      let data = {
        id: this.info.id,
      };
      suspendBallot(data).then((res) => {
        console.log("res", res);
        if (res.code == "200") {
          //先清空canvas
          // this.myCanvas.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
          this.init();
        }
      });
    },
  },
  created() {},
  async mounted() {
    this.init();
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
          .contest-title {
            font-size: 16px;
            font-weight: 900;
            line-height: 30px;
            height: 30px;
          }
          .contest-subtitle {
            font-size: 16px;
            padding-bottom: 10px;
          }
          .radio {
            display: block;
          }
          .opt-item {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
          }
        }
        .no-contest {
          padding-top: 20px;
          font-size: 24px;
          line-height: 30px;
        }
        .valid {
          font-size: 28px;
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
        overflow-y: auto;
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
